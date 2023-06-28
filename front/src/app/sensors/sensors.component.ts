import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataFetchService } from '../data-fetch.service';
import { take } from 'rxjs/operators';

interface Sensor {
  id: number;
  sensor_id: number | null;
  sensor_type: string;
  room: {
    id: number;
    name: string;
  };
  data: number[];
}

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css']
})
export class SensorsComponent implements OnInit {
  room: string | null = null;
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
        this.dataFetchService.getSensorDataById(sensor.id).pipe(take(1)).subscribe(data => {
          sensor.data = data;
          this.generateChart(sensor);
        });
      });
    });
  }

  generateChart(sensor: Sensor): void {
    // Generate chart for the sensor using the sensor data
    // Update the implementation according to your chart library or requirements
    console.log(`Generating chart for sensor ${sensor.id}`);
    console.log('Sensor Data:', sensor.data);
  }

  getSensorStatus(status: boolean): string {
    return status ? 'green' : 'red';
  }

  navigateToSensorDetail(sensor: Sensor): void {
    this.router.navigate(['/sensor-detail', sensor.id]);
  }
}
