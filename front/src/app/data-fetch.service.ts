import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataFetchService {
  commands = [
    { id: 201, name: 'HEATER_UP', sensor_id: 1},
    { id: 202, name: 'HEATER_DOWN', sensor_id: 1 },
    { id: 203, name: 'AC_UP', sensor_id: 2 },
    { id: 204, name: 'AC_DOWN', sensor_id: 2 },
    { id: 205, name: 'VENT_UP', sensor_id: 3 },
    { id: 206, name: 'VENT_DOWN', sensor_id: 3 },
    { id: 207, name: 'LIGHT_ON', sensor_id: 4 },
    { id: 208, name: 'LIGHT_OFF', sensor_id: 4 },
  ]
  private baseUrl = 'http://localhost:4200/api';

  constructor(private http: HttpClient) { }

  getRooms(): Observable<any> {
    const url = `${this.baseUrl}/rooms/`;
    return this.http.get<any>(url);
  }

  getRoomById(roomId: number): Observable<any> {
    const url = `${this.baseUrl}/rooms/${roomId}/`;
    return this.http.get<any>(url);
  }

  getSensors(): Observable<any> {
    const url = `${this.baseUrl}/sensors/`;
    return this.http.get<any>(url);
  }

  getSensorById(sensorId: number): Observable<any> {
    const url = `${this.baseUrl}/sensors/${sensorId}/`;
    return this.http.get<any>(url);
  }

  getSensorData(): Observable<any> {
    const url = `${this.baseUrl}/sensordata/`;
    return this.http.get<any>(url);
  }

  getSensorDataById(sensorDataId: number): Observable<any> {
    const url = `${this.baseUrl}/sensor_data/${sensorDataId}/`;
    return this.http.get<any>(url);
  }

  getCommands(): any[] {
    return this.commands;
  }

  getRoomSensors(roomId: number): Observable<any> {
    const url = `${this.baseUrl}/room/${roomId}/sensors/`;
    return this.http.get<any>(url);
  }

  createAutomation(formData: any): Observable<any> {
    const url = `${this.baseUrl}/automation/`;
    return this.http.post<any>(url, formData);
  }

  deleteAutomation(automationId: number): Observable<any> {
    const url = `${this.baseUrl}/automation/${automationId}/`;
    return this.http.delete<any>(url);
  }

  getAutomations(): Observable<any> {
    const url = `${this.baseUrl}/automation/`;
    return this.http.get<any>(url);
  }
}
