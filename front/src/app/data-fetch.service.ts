import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataFetchService {
  private baseUrl = 'http://localhost:4200/api'; // Replace with your Django backend URL

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
    const url = `${this.baseUrl}/sensordata/${sensorDataId}/`;
    return this.http.get<any>(url);
  }
}
