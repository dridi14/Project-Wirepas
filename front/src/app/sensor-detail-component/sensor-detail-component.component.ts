// sensor-detail-component.component.ts
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, ChartConfiguration, ChartScales } from 'chart.js';
import { DataFetchService } from '../data-fetch.service';

interface Sensor {
  name: string;
  location: string;
  type: string;
  status: boolean;
  data: number[];
}

interface Automation {
  name: string;
  type: string;
  status: boolean;
  activation: string;
}

@Component({
  selector: 'app-sensor-detail-component',
  templateUrl: './sensor-detail-component.component.html',
  styleUrls: ['./sensor-detail-component.component.css']
})
export class SensorDetailComponent implements OnInit, AfterViewInit {
  sensor: Sensor | undefined;
  chartData: number[] = [];
  selectedTimeRange: string = 'week';

  @ViewChild('chartCanvas') chartCanvas!: ElementRef;

  constructor(private route: ActivatedRoute, private apiservice: DataFetchService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const sensorID = params.get('sensorName');
      const sensorRoom = params.get('room');
      this.apiservice.getRoomSensorData(<any>sensorRoom, sensorID).subscribe((data) => {
        this.sensor = data;
      });
      if (this.sensor) {
        this.chartData = this.generateChartData(this.sensor, 7);
        this.onTimeRangeChange(this.selectedTimeRange);
      }
    });
  }

  ngAfterViewInit() {
    if (this.chartCanvas && this.chartData.length > 0) {
      const chartData = this.chartData;
      const chartCanvas = this.chartCanvas.nativeElement;
      const labels: string[] = this.generateWeekLabels();
      this.createChart(chartCanvas, chartData, labels);
    }
  }

  createChart(canvas: HTMLCanvasElement, data: number[], labels: string[]): void {
    const ctx = canvas.getContext('2d');
    if (ctx) {
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

  onTimeRangeChange(event: any): void {
    const selectedValue = event.target.value;

    let labels: string[] = [];
    if (selectedValue === 'week') {
      if (this.sensor) {
        this.chartData = this.generateChartData(this.sensor, 7);
        labels = this.generateWeekLabels();
      }
    } else if (selectedValue === 'day') {
      const data = this.sensor?.data;
      if (data) {
        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        const numDataPoints = 24;
        const reversedData = data.slice(0, currentHour + 1).reverse();
        const filteredData = reversedData.slice(0, numDataPoints);
        this.chartData = filteredData;
        labels = Array.from({ length: numDataPoints }, (_, index) => {
          const hour = currentHour - index;
          return `${hour >= 0 ? hour : hour + 24}h`;
        }).reverse();
        this.chartData = this.generateChartData(this.sensor!, numDataPoints);
      }
    } else if (selectedValue === 'hour') {
      const data = this.sensor?.data;
      if (data) {
        const numDataPoints = 60;
        this.chartData = data.slice(-numDataPoints);
        labels = Array.from({ length: numDataPoints }, (_, index) => {
          const currentDate = new Date();
          currentDate.setMinutes(currentDate.getMinutes() - index);
          const hour = currentDate.getHours();
          const minute = currentDate.getMinutes();
          const hourString = hour < 10 ? `0${hour}` : `${hour}`;
          const minuteString = minute < 10 ? `0${minute}` : `${minute}`;
          return `${hourString}:${minuteString}`;
        }).reverse();
        this.chartData = this.generateChartData(this.sensor!, numDataPoints);
      }
    }

    if (this.chartCanvas && this.chartData.length > 0) {
      const chartCanvas = this.chartCanvas.nativeElement;
      this.createChart(chartCanvas, this.chartData, labels);
    }
  }

  generateWeekLabels(): string[] {
    const labels: string[] = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      labels.push(date.toLocaleDateString());
    }
    return labels;
  }

  generateChartData(sensor: Sensor, numDataPoints: number): number[] {
    const data: number[] = [];
    const maxValue = 100; // Maximum value for the generated data
    const minValue = 0; // Minimum value for the generated data

    let previousValue = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    data.push(previousValue);

    for (let i = 1; i < numDataPoints; i++) {
      const increment = Math.floor(Math.random() * 6) - 3; // Generates a random increment between -3 and 3
      const newValue = previousValue + increment;

      // Ensure the generated value is within the specified range
      const clampedValue = Math.max(minValue, Math.min(maxValue, newValue));

      data.push(clampedValue);
      previousValue = clampedValue;
    }

    sensor.data = data; // Assign the generated data to the sensor's data property
    return data;
  }




  sensors: Sensor[] = [
    { name: 'Capteur d\'humidité 1', location: 'Cantine', type: 'humidité', status: true, data: [] },
    { name: 'Capteur de température 1', location: 'Classe1', type: 'température', status: false, data: [] },
    { name: 'Capteur de luminosité 1', location: 'Classe2', type: 'luminosité', status: true, data: [] },
    { name: 'Capteur de mouvement 1', location: 'Salle de bains', type: 'mouvement', status: false, data: [] },
    { name: 'Détecteur de fuite d\'eau 1', location: 'Cave', type: 'fuite d\'eau', status: true, data: [] },
    { name: 'Capteur de CO2 1', location: 'Bureau', type: 'CO2', status: false, data: [] },
    { name: 'Relais (interrupteur) 1', location: 'Classe3', type: 'interrupteur', status: true, data: [] },
    { name: 'Bouton poussoir 1', location: 'Hall d\'entrée', type: 'bouton poussoir', status: false, data: [] },
    { name: 'Capteur de pression atmosphérique 1', location: 'Toit', type: 'pression atmosphérique', status: true, data: [] },
    { name: 'Capteur d\'humidité 2', location: 'Classe4', type: 'humidité', status: false, data: [] },
    { name: 'Capteur de température 2', location: 'Cuisine', type: 'température', status: true, data: [] },
    { name: 'Capteur de luminosité 2', location: 'BDE', type: 'luminosité', status: false, data: [] },
    { name: 'Capteur de présence 1', location: 'Cantine', type: 'présence', status: true, data: [] },
    { name: 'Capteur de CO2 2', location: 'Cantine', type: 'CO2', status: true, data: [] },
    { name: 'Capteur de température 3', location: 'Classe1', type: 'température', status: false, data: [] },
    { name: 'Capteur de luminosité 3', location: 'Classe1', type: 'luminosité', status: true, data: [] },
    { name: 'Capteur d\'humidité 3', location: 'Classe2', type: 'humidité', status: false, data: [] },
    { name: 'Capteur de présence 2', location: 'Salle de bains', type: 'présence', status: true, data: [] },
    { name: 'Capteur d\'humidité 4', location: 'Salle de bains', type: 'humidité', status: true, data: [] },
    { name: 'Détecteur de fuite d\'eau 2', location: 'Cave', type: 'fuite d\'eau', status: false, data: [] },
    { name: 'Capteur de température 4', location: 'Bureau', type: 'température', status: true, data: [] },
    { name: 'Capteur de présence 3', location: 'Bureau', type: 'présence', status: true, data: [] },
    { name: 'Capteur de pression atmosphérique 2', location: 'Toit', type: 'pression atmosphérique', status: false, data: [] },
    { name: 'Capteur de température 5', location: 'Classe4', type: 'température', status: true, data: [] },
    { name: 'Capteur de luminosité 4', location: 'Classe4', type: 'luminosité', status: false, data: [] },
    { name: 'Capteur de présence 4', location: 'Classe4', type: 'présence', status: true, data: [] },
    { name: 'Capteur de température 6', location: 'Cuisine', type: 'température', status: false, data: [] },
    { name: 'Capteur de luminosité 5', location: 'Cuisine', type: 'luminosité', status: true, data: [] },
    { name: 'Capteur de CO2 3', location: 'BDE', type: 'CO2', status: true, data: [] }
  ];

  // The automations array should include the automation data
  automations: Automation[] = [
    { name: 'Automation 1', type: 'Type 1', status: true, activation: '8:00 AM' },
    { name: 'Automation 2', type: 'Type 2', status: false, activation: '12:00 PM' },
    { name: 'Automation 3', type: 'Type 3', status: true, activation: '6:00 PM' },
    // ... your automation data here
  ];

  getAutomationsBySensorName(sensorName: string): Automation[] {
    return this.automations.filter((automation: Automation) => automation.name === sensorName);
  }
}
