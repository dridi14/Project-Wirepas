// sensors.component.ts
import { Component, OnInit,  } from '@angular/core';
import { AfterViewInit, ElementRef, ViewChild , QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, ChartConfiguration, ChartScales } from 'chart.js';
import { Router } from '@angular/router';



interface Sensor {
  name: string;
  location: string;
  type: string;
  status: boolean;
  data: number[];
}




@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css']
})
export class SensorsComponent implements OnInit, AfterViewInit {
  room: string | null = null;
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
    
  roomSensors: Sensor[] = [];

  constructor(private route: ActivatedRoute, private router: Router ) {
  
   }

   @ViewChildren('chartCanvas') chartCanvases!: QueryList<ElementRef>;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
    this.room = params.get('room');
    if (this.room) {
      this.roomSensors = this.sensors.filter(sensor => sensor.location === this.room);
    } else {
      this.roomSensors = this.sensors;
    }
  
    this.roomSensors.forEach(sensor => {
      const randomData = this.generateChartData(sensor);
      sensor.data = randomData;
    });
  });
    
  }

  ngAfterViewInit() {
    this.roomSensors.forEach((sensor, index) => {
      const chartData = this.generateChartData(sensor);
      const chartCanvas = this.chartCanvases.toArray()[index].nativeElement;
      this.createChart(chartCanvas, chartData);
    });
  }
  
  
  

  getSensorStatus(status: boolean): string {
    // Change the colors as per your requirements
    return status ? 'green' : 'red'; 
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
  
  navigateToSensorDetail(sensor: Sensor) {
    this.router.navigate(['/sensor-detail', sensor.name]); // Navigate to the SensorDetailComponent with the sensor name as a parameter
  }
  
}