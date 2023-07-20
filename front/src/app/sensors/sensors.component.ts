import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataFetchService } from '../data-fetch.service';
import { take, timestamp } from 'rxjs/operators';
import { Chart, ChartConfiguration, ChartScales } from 'chart.js';

interface Sensor {
  id: number;
  sensor_id: number | null;
  sensor_type: string;
  room: {
    id: number;
    name: string | null; // Change the type of name to string | null
  };
  data: number[];
  status: boolean; // Add the status property
}


@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css']
})
export class SensorsComponent implements OnInit {
  room: string | null = null; // Change the type of room to string | null
  sensors: Sensor[] = [];
  roomSensors: Sensor[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataFetchService: DataFetchService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.room = params.get('room');
      this.fetchSensorData();
    });
  }

  fetchSensorData() {
    this.dataFetchService.getSensors().pipe(take(1)).subscribe(response => {
      this.sensors = response;

      if (this.room) {
        this.roomSensors = this.sensors.filter(sensor => sensor.room.name === this.room);
      } else {
        this.roomSensors = this.sensors;
      }

      this.roomSensors.forEach(sensor => {
        this.dataFetchService.getRoomSensorData(this.roomSensors[0]?.room.id, sensor.sensor_id)
          .pipe(take(1))
          .subscribe(dataResponse => {

            let datas = dataResponse;
            const values: number[] = [];
            const timeStamp: any[] = [];
            // reverse data
            datas = datas.reverse();
            datas.forEach((data: any) => {
              Object.values(data.data).forEach((value: any) => {
                values.push(value);
              });
              timeStamp.push(data.tx_time_ms_epoch);
            });


            sensor.data = values;

            const canvas = document.getElementById(`chartCanvas${sensor.id}`) as HTMLCanvasElement;
            this.createChart(canvas, values, timeStamp); // Pass the array values to createChart
          }, error => {
            console.error(`Error retrieving data for Sensor ${sensor.id}:`, error);
          });
      });
    });
  }


  createChart(canvas: HTMLCanvasElement, data: number[], timestamps: any[]): void {
      const ctx = canvas.getContext('2d');
      const labels = timestamps.map(timestamp => this.formatTimestamp(timestamp));
      if(ctx) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Sensor Data',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            } as ChartScales,
          },
        });
      }
    }

  formatTimestamp(timestamp: any): string {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes()}`;
  }

  getRoomName(roomId: any): string {
      switch(roomId) {
      case 1:
      return 'Room 1';
      case 2:
      return 'Room 2';
      case 3:
      return 'Room 3';
      default:
        return 'Unknown Room';
    }
  }


  // getSensorStatus(sensor: Sensor | boolean): string {
  //   if (typeof sensor === 'boolean') {
  //     return sensor ? 'green' : 'red';
  //   }
  //   // Assuming `sensor` is of type `Sensor` when it's not a boolean
  //   return sensor.status ? 'green' : 'red';
  // }

  navigateToSensorDetail(sensor: Sensor): void {
    console.log(sensor.room.id, 'test');
    this.router.navigate(['/sensor-detail', sensor.sensor_id, sensor.room.id])
  }

}
