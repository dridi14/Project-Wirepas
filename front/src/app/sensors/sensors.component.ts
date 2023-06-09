// sensors.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Sensor {
  name: string;
  location: string;
  type: string;
}

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css']
})
export class SensorsComponent implements OnInit {
  room: string | null = null;
  sensors = [
    { name: 'Capteur d\'humidité 1', location: 'Cantine', type: 'humidité' },
    { name: 'Capteur de température 1', location: 'Classe1', type: 'température' },
    { name: 'Capteur de luminosité 1', location: 'Classe2', type: 'luminosité' },
    { name: 'Capteur de mouvement 1', location: 'Salle de bains', type: 'mouvement' },
    { name: 'Détecteur de fuite d\'eau 1', location: 'Cave', type: 'fuite d\'eau' },
    { name: 'Capteur de CO2 1', location: 'Bureau', type: 'CO2' },
    { name: 'Relais (interrupteur) 1', location: 'Classe3', type: 'interrupteur' },
    { name: 'Bouton poussoir 1', location: 'Hall d\'entrée', type: 'bouton poussoir' },
    { name: 'Capteur de pression atmosphérique 1', location: 'Toit', type: 'pression atmosphérique' },
    { name: 'Capteur d\'humidité 2', location: 'Classe4', type: 'humidité' },
    { name: 'Capteur de température 2', location: 'Cuisine', type: 'température' },
    { name: 'Capteur de luminosité 2', location: 'BDE', type: 'luminosité' },
    { name: 'Capteur de présence 1', location: 'Cantine', type: 'présence' },
    { name: 'Capteur de CO2 2', location: 'Cantine', type: 'CO2' },
    { name: 'Capteur de température 3', location: 'Classe1', type: 'température' },
    { name: 'Capteur de luminosité 3', location: 'Classe1', type: 'luminosité' },
    { name: 'Capteur d\'humidité 3', location: 'Classe2', type: 'humidité' },
    { name: 'Capteur de présence 2', location: 'Salle de bains', type: 'présence' },
    { name: 'Capteur d\'humidité 4', location: 'Salle de bains', type: 'humidité' },
    { name: 'Détecteur de fuite d\'eau 2', location: 'Cave', type: 'fuite d\'eau' },
    { name: 'Capteur de température 4', location: 'Bureau', type: 'température' },
    { name: 'Capteur de présence 3', location: 'Bureau', type: 'présence' },
    { name: 'Capteur de pression atmosphérique 2', location: 'Toit', type: 'pression atmosphérique' },
    { name: 'Capteur de température 5', location: 'Classe4', type: 'température' },
    { name: 'Capteur de luminosité 4', location: 'Classe4', type: 'luminosité' },
    { name: 'Capteur de présence 4', location: 'Classe4', type: 'présence' },
    { name: 'Capteur de température 6', location: 'Cuisine', type: 'température' },
    { name: 'Capteur de luminosité 5', location: 'Cuisine', type: 'luminosité' },
    { name: 'Capteur de CO2 3', location: 'BDE', type: 'CO2' },
  ];
  roomSensors: Sensor[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.room = this.route.snapshot.paramMap.get('room');

    if(this.room) {
      this.roomSensors = this.sensors.filter(sensor => sensor.location === this.room);
    } else {
      this.roomSensors = this.sensors;
    }
  }
}