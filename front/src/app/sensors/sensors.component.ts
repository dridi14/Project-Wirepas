import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataFetchService } from '../data-fetch.service';
import { take } from 'rxjs/operators';
import { Chart, ChartConfiguration, ChartScales } from 'chart.js';

interface Sensor {
  id: number;
  sensor_id: number | null;
  sensor_type: string;
  room: {
    id: number;
    name: string;
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
  room: any | null = null;
  sensors: Sensor[] = [];
  roomSensors: Sensor[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataFetchService: DataFetchService
  ) {}

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
        this.dataFetchService.getSensorDataById(sensor.id).pipe(take(1)).subscribe(response => {
          const data = response.data;
          const values = Object.values(data) as number[]; // Cast the array as number[]
          const canvas = document.getElementById(`chartCanvas${sensor.id}`) as HTMLCanvasElement;
          this.createChart(canvas, values); // Pass the array values to createChart
        });
      });
    });
  }
  
  
  
  
  createChart(canvas: HTMLCanvasElement, data: number[]): void {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
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
  
  

  navigateToSensorDetail(sensor: Sensor): void {
    this.router.navigate(['/sensor-detail', sensor.id]);
  }

  getRoomName(roomId: any): string {
    switch (roomId) {
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
  
}
