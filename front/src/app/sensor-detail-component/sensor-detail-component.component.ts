import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, ChartConfiguration, ChartScales } from 'chart.js';

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

  @ViewChild('chartCanvas') chartCanvas!: ElementRef;

  constructor(private route: ActivatedRoute) { }

 ngOnInit() {
  this.route.paramMap.subscribe(params => {
    const sensorName = params.get('sensorName');
    this.sensor = this.sensors.find((sensor: Sensor) => sensor.name === sensorName);
    if (this.sensor) {
      this.chartData = this.generateChartData(this.sensor);
      this.automations = sensorName ? this.getAutomationsBySensorName(sensorName) : [];
    }
  });
}


  ngAfterViewInit() {
    if (this.chartData.length > 0) {
      const chartData = this.chartData;
      const chartCanvas = this.chartCanvas.nativeElement;
      this.createChart(chartCanvas, chartData);
    }
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

  generateChartData(sensor: Sensor): number[] {
    const data: number[] = [];
    for (let i = 0; i < 7; i++) {
      const randomValue = Math.floor(Math.random() * 100); // Generate a random value between 0 and 100
      data.push(randomValue);
    }
    sensor.data = data; // Assign the generated data to the sensor's data property
    return data;
  }

  // The sensors array should include all the sensors from the SensorsComponent
    sensors: Sensor[]  = [
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
