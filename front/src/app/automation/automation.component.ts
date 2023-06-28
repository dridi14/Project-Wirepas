import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxMaterialTimepickerComponent } from 'ngx-material-timepicker';
import { DateTime } from 'luxon';


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

interface LocationData {
  name: string;
  building: string;
}

@Component({
  selector: 'app-automation',
  templateUrl: './automation.component.html',
  styleUrls: ['./automation.component.css']
})
export class AutomationComponent implements OnInit {
  @ViewChild('picker', { static: false }) picker!: any;


  automationForm: FormGroup;
  sensors: Sensor[] = [
    { name: 'Capteur d\'humidité 1', location: 'Cantine', type: 'humidité', status: true, data: [] },
    { name: 'Capteur de température 1', location: 'Classe1', type: 'température', status: false, data: [] },
    // Rest of the sensor data...
  ];
  automations: Automation[] = [
    { name: 'Temperature Control', type: 'Climate', status: true, activation: 'Temperature' },
    { name: 'Lighting Automation', type: 'Lighting', status: false, activation: 'Occupancy' },
    // Rest of the automation data...
  ];
  locations: LocationData[] = [
    { name: 'Cantine', building: 'Bâtiment A' },
    { name: 'Classe1', building: 'Bâtiment A' },
    // Rest of the location data...
  ];
  filteredSensors: Sensor[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.automationForm = this.formBuilder.group({
      name: ['', Validators.required],
      sensor: ['', Validators.required],
      value: ['', Validators.required],
      secondValue: ['', Validators.required], // Add the second value control
      timeValue: ['', Validators.required], // Add the time value control
      automation: ['', Validators.required],
      automationType: ['more', Validators.required],
      room: ['']
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
      value: ['', Validators.required],
      secondValue: ['', Validators.required], // Add the second value control
      timeValue: ['', Validators.required], // Add the time value control
      automation: ['', Validators.required],
      automationType: ['more', Validators.required],
      room: ['']
      // Add other form controls here
    });
    
  }

  onRoomSelectionChange(selectedRoom: string): void {
    if (selectedRoom) {
      this.filteredSensors = this.sensors.filter(sensor => sensor.location === selectedRoom);
    } else {
      this.filteredSensors = this.sensors;
    }
    this.automationForm.get('sensor')?.setValue(''); // Reset sensor selection when room changes
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
