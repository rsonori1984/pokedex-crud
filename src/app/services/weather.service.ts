import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  openweathermapApiKey = '55fdad8f4074e6343768cc7ccef003ba';
  openweathermapBaseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
  // lat={lat}&lon={lon}&appid={API key}

  private apiKey = '5d8d2bc975c14939b4b132053252209';
  private baseUrl = 'https://api.weatherapi.com/v1';

  constructor(private http: HttpClient) {}

  getWeatherByCoords(lat: number, lon: number) {
    return this.http.get(
      `${this.baseUrl}/forecast.json?key=${this.apiKey}&q=${lat},${lon}&days=3&lang=pt`,
    );
  }

  getOpenWeatherByCoords(lat: number, lon: number): Observable<any> {
    // const query = `${lat},${lon}`;
    return this.http.get(
      `${this.openweathermapBaseUrl}lat=${lat}&lon=${lon}&appid=${this.openweathermapApiKey}&units=metric&lang=pt`,
    );
  }
  // getWeatherByCoords(lat: number, lon: number): Observable<any> {

  //   const query = `${lat},${lon}`;

  //   return this.http.get(
  //     `${this.baseUrl}/current.json?key=${this.apiKey}&q=${query}&lang=pt&aqi=no`
  //   );
  // }
}
