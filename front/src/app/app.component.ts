import { Component, OnDestroy, OnInit } from '@angular/core';
import { BuildingService } from './building.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnDestroy {
  title = 'front';
  selectedBuilding = 'Bâtiment A';
  private buildingSub!: Subscription; // This is used to track our subscription

  constructor(  private buildingService: BuildingService ) { }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
   
  }

  isLoggedIn = true; // Set to true when the user is logged in

  logout(): void {
    // Implement logout functionality here
    // Reset the user session and redirect to the login page
  }
}
