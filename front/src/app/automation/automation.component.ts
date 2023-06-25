import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



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
  selector: 'app-automation',
  templateUrl: './automation.component.html',
  styleUrls: ['./automation.component.css']
})
export class AutomationComponent implements OnInit {

  automationForm: FormGroup;
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
  ]
      automations: Automation[] = [
        { name: 'Automation 1', type: 'Type 1', status: true, activation: 'Temperature'},
        { name: 'Automation 2', type: 'Type 2', status: false, activation: 'Humidity' },
        { name: 'Automation 3', type: 'Type 3', status: true, activation: 'Motion'},
        
  ]; 

  constructor(private formBuilder: FormBuilder) {
    this.automationForm = this.formBuilder.group({
      name: ['', Validators.required],
      sensor: ['', Validators.required],
      value: ['', Validators.required] ,
      automation: ['', Validators.required],
      // Add other form controls here
    });
  }

  
  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.automationForm = this.formBuilder.group({
      name: ['', Validators.required],
    sensor: ['', Validators.required],
    value: ['', Validators.required] ,
    automation: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.automationForm.valid) {
      const { sensor } = this.automationForm.value;
      
      // Perform additional processing and validation if needed
      // Example: Check if the selected sensor exists in the sensor data array
      const selectedSensor = this.sensors.find(s => s.name === sensor);
      if (selectedSensor) {
        // Sensor exists, proceed with saving the automation data
        
        // TODO: Save the automation data to a database or trigger actions based on the automation
        
        // Example: Logging the automation data to the console
        console.log('Automation Data:', this.automationForm.value);
        
        // Reset form after successful submission
        this.automationForm.reset();
      } else {
        // Selected sensor doesn't exist, handle the error
        console.error('Selected sensor does not exist');
      }
    } else {
      // Handle form validation errors
      // Example: Marking the form controls as touched to show validation errors
      Object.keys(this.automationForm.controls).forEach(key => {
        this.automationForm.get(key)?.markAsTouched();
      });
    }
  }
  

}
