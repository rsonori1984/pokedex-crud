import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = '5d8d2bc975c14939b4b132053252209';
  private baseUrl = 'https://api.weatherapi.com/v1';

  constructor(private http: HttpClient) {}

getWeatherByCoords(lat: number, lon: number) {
  return this.http.get(
    `${this.baseUrl}/forecast.json?key=${this.apiKey}&q=${lat},${lon}&days=3&lang=pt`
  );
}

  // getWeatherByCoords(lat: number, lon: number): Observable<any> {

  //   const query = `${lat},${lon}`;

  //   return this.http.get(
  //     `${this.baseUrl}/current.json?key=${this.apiKey}&q=${query}&lang=pt&aqi=no`
  //   );
  // }

}