import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../../services/weather.service';
import { ThemeToggle } from '../theme-toggle/theme-toggle';

@Component({
  selector: 'app-weather-component',
  imports: [CommonModule, ThemeToggle],
  templateUrl: './weather-component.html',
  styleUrl: './weather-component.scss',
  standalone: true,
})
export class WeatherComponent implements OnInit, OnDestroy {
  weatherData: any;
  day: any;
  clock: string = '';
  timer: any;

  owData: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.startClock();
    this.getLocation();
    // this.getOpenWeather();
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  startClock() {
    const updateClock = () => {
      const now = new Date();
      this.clock = now.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });
    };

    updateClock();
    this.timer = setInterval(updateClock, 1000);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        this.weatherService.getWeatherByCoords(lat, lon).subscribe((data: any) => {
          this.weatherData = data;
          this.day = data.forecast.forecastday[0].day;
        });
      });
    }
  }

  getOpenWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude; // -23.5854
        const lon = position.coords.longitude; // -46.6227
        this.weatherService.getOpenWeatherByCoords(lat, lon).subscribe((data: any) => {
          console.log('OpenWeather data:', data);
          this.owData = data;
        });
      });
    }
  }
}

// import { Component, NgModule, OnInit } from '@angular/core';
// import { WeatherService } from '../../../services/weather.service';
// // import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-weather-component',
//   imports: [CommonModule],
//   templateUrl: './weather-component.html',
//   styleUrl: './weather-component.scss',
//   standalone: true,
// })
// export class WeatherComponent {

//   weatherData: any;

//   constructor(private weatherService: WeatherService) {}

//   ngOnInit(): void {
//     this.getLocation();
//   }

//   getLocation() {

//     if (navigator.geolocation) {

//       navigator.geolocation.getCurrentPosition(position => {

//         const lat = position.coords.latitude;
//         const lon = position.coords.longitude;

//         this.weatherService.getWeatherByCoords(lat, lon)
//           .subscribe((data: any) => {
//             console.log('Weather data:', data);
//             this.weatherData = data;
//           });

//       });

//     }

//   }

// }
