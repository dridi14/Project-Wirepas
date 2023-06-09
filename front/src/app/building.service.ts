import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BuildingService {
  private _selectedBuilding = new BehaviorSubject<string>('Bâtiment A');
  selectedBuilding$ = this._selectedBuilding.asObservable();

  changeBuilding(building: string): void {
    this._selectedBuilding.next(building);
  }
}
