import { Component } from '@angular/core';
import { BuildingService } from './building.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';

  constructor(  private buildingService: BuildingService ) { }


  onSelectBuilding(building: string): void {
    this.buildingService.changeBuilding(building);
  }
  ngOnDestroy(): void {
    this.buildingSub.unsubscribe();  // Don't forget to unsubscribe
  }
}
