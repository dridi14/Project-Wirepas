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
    { name: 'Cantine B', building: 'Bâtiment B' },
    { name: 'Classe1 B', building: 'Bâtiment B' },
    { name: 'Classe2 B', building: 'Bâtiment B' },
    { name: 'Salle de bains B', building: 'Bâtiment B' },
    { name: 'Cave B', building: 'Bâtiment B' },
    { name: 'Bureau B', building: 'Bâtiment B' },
    { name: 'Classe3 B', building: 'Bâtiment B' },
    { name: 'Hall d\'entrée B', building: 'Bâtiment B' },
    { name: 'Toit B', building: 'Bâtiment B' },
    { name: 'Classe4 B', building: 'Bâtiment B' },
    { name: 'Cuisine B', building: 'Bâtiment B' },
    { name: 'BDE B', building: 'Bâtiment B' },
  ];
    
  selectedBuilding = 'Bâtiment A';  // default selected building

  constructor(private router: Router,  private buildingService: BuildingService ) { }

  ngOnInit(): void {
    this.buildingService.selectedBuilding$.subscribe(
      building => this.selectedBuilding = building
    );
  }
 
  viewSensors(room: string) {
    this.router.navigate(['/sensors', room]);
  }


}
