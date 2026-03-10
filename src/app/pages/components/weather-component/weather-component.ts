import { Component, NgModule, OnInit } from '@angular/core';
import { WeatherService } from '../../../services/weather.service';
// import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-component',
  imports: [CommonModule],
  templateUrl: './weather-component.html',
  styleUrl: './weather-component.scss',
  standalone: true,
})
export class WeatherComponent {

  weatherData: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getLocation();
  }

  getLocation() {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(position => {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        this.weatherService.getWeatherByCoords(lat, lon)
          .subscribe((data: any) => {
            console.log('Weather data:', data);
            this.weatherData = data;
          });

      });

    }

  }

}
