import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuildingService } from '../building.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sensors = [
    { name: 'Capteur d\'humidité 1', location: 'Cantine', type: 'humidité', status: true },
    { name: 'Capteur de température 1', location: 'Classe1', type: 'température', status: false },
    { name: 'Capteur de luminosité 1', location: 'Classe2', type: 'luminosité', status: true },
    { name: 'Capteur de mouvement 1', location: 'Salle de bains', type: 'mouvement', status: false },
    { name: 'Détecteur de fuite d\'eau 1', location: 'Cave', type: 'fuite d\'eau', status: true },
    { name: 'Capteur de CO2 1', location: 'Bureau', type: 'CO2', status: false },
    { name: 'Relais (interrupteur) 1', location: 'Classe3', type: 'interrupteur', status: true },
    { name: 'Bouton poussoir 1', location: 'Hall d\'entrée', type: 'bouton poussoir', status: false },
    { name: 'Capteur de pression atmosphérique 1', location: 'Toit', type: 'pression atmosphérique', status: true },
    { name: 'Capteur d\'humidité 2', location: 'Classe4', type: 'humidité', status: false },
    { name: 'Capteur de température 2', location: 'Cuisine', type: 'température', status: true },
    { name: 'Capteur de luminosité 2', location: 'BDE', type: 'luminosité', status: false },
    { name: 'Capteur de présence 1', location: 'Cantine', type: 'présence', status: true },
    { name: 'Capteur de CO2 2', location: 'Cantine', type: 'CO2', status: true },
    { name: 'Capteur de température 3', location: 'Classe1', type: 'température', status: false },
    { name: 'Capteur de luminosité 3', location: 'Classe1', type: 'luminosité', status: true },
    { name: 'Capteur d\'humidité 3', location: 'Classe2', type: 'humidité', status: false },
    { name: 'Capteur de présence 2', location: 'Salle de bains', type: 'présence', status: true },
    { name: 'Capteur d\'humidité 4', location: 'Salle de bains', type: 'humidité', status: true },
    { name: 'Détecteur de fuite d\'eau 2', location: 'Cave', type: 'fuite d\'eau', status: false },
    { name: 'Capteur de température 4', location: 'Bureau', type: 'température', status: true },
    { name: 'Capteur de présence 3', location: 'Bureau', type: 'présence', status: true },
    { name: 'Capteur de pression atmosphérique 2', location: 'Toit', type: 'pression atmosphérique', status: false },
    { name: 'Capteur de température 5', location: 'Classe4', type: 'température', status: true },
    { name: 'Capteur de luminosité 4', location: 'Classe4', type: 'luminosité', status: false },
    { name: 'Capteur de présence 4', location: 'Classe4', type: 'présence', status: true },
    { name: 'Capteur de température 6', location: 'Cuisine', type: 'température', status: false },
    { name: 'Capteur de luminosité 5', location: 'Cuisine', type: 'luminosité', status: true },
    { name: 'Capteur de CO2 3', location: 'BDE', type: 'CO2', status: true }
  ];
  

  locations = [
    { name: 'Cantine', building: 'Bâtiment A' },
    { name: 'Classe1', building: 'Bâtiment A' },
    { name: 'Classe2', building: 'Bâtiment A' },
    { name: 'Salle de bains', building: 'Bâtiment A' },
    { name: 'Cave', building: 'Bâtiment A' },
    { name: 'Bureau', building: 'Bâtiment A' },
    { name: 'Classe3', building: 'Bâtiment A' },
    { name: 'Hall d\'entrée', building: 'Bâtiment A' },
    { name: 'Toit', building: 'Bâtiment A' },
    { name: 'Classe4', building: 'Bâtiment A' },
  
  ];
    

  constructor(private router: Router,  private buildingService: BuildingService ) { }

  ngOnInit(): void {
    
     }
  
     viewSensors(room: string) {
      this.router.navigate(['/sensors', room]);
    }
    
  
    getRoomStatus(room: string): string {
      const roomSensors = this.sensors.filter(sensor => sensor.location === room);
      const activeSensors = roomSensors.filter(sensor => sensor.status === true).length;
    
      if (activeSensors === roomSensors.length) {
        return 'green';
      } else if (activeSensors === 0) {
        return 'red';
      } else {
        return 'orange';
      }
    }

    getSensorCount(room: string): number {
      return this.sensors.filter(sensor => sensor.location === room).length;
    }
  
    getSensorTypes(room: string): string {
      const sensorTypes = this.sensors
        .filter(sensor => sensor.location === room)
        .map(sensor => sensor.type);
      return sensorTypes.join(', ');
    }
    

}
