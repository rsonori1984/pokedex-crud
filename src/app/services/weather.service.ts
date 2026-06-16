import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private baseUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {}

  getWeatherByCoords(lat: number, lon: number) {
    return this.http.get(
      `${this.baseUrl}?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
    );
  }
}

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class WeatherService {
//   // openweathermapApiKey = '[REDACTED]';
//   // openweathermapBaseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
//   // lat={lat}&lon={lon}&appid={API key}

//   private apiKey = '[REDACTED]';
//   private baseUrl = 'https://api.weatherapi.com/v1';

//   constructor(private http: HttpClient) {}

//   getWeatherByCoords(lat: number, lon: number) {
//     return this.http.get(
//       `${this.baseUrl}/forecast.json?key=${this.apiKey}&q=${lat},${lon}&days=3&lang=pt`,
//     );
//   }

//   // getOpenWeatherByCoords(lat: number, lon: number): Observable<any> {
//   //   return this.http.get(
//   //     `${this.openweathermapBaseUrl}lat=${lat}&lon=${lon}&appid=${this.openweathermapApiKey}&units=metric&lang=pt`,
//   //   );
//   // }
// }
