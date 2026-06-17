import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../../services/weather.service';
// import { ThemeToggle } from '../theme-toggle/theme-toggle';

@Component({
  selector: 'app-weather-component',
  imports: [CommonModule],
  templateUrl: './weather-component.html',
  styleUrl: './weather-component.scss',
  standalone: true,
})
export class WeatherComponent implements OnInit, OnDestroy {
getWeatherDescription(code: number): string {
  const codes: Record<number, string> = {
    0: '☀️ Céu limpo',
    1: '🌤️ Principalmente limpo',
    2: '⛅ Parcialmente nublado',
    3: '☁️ Nublado',
    45: '🌫️ Névoa',
    48: '🌫️ Névoa intensa',
    51: '🌦️ Garoa leve',
    53: '🌦️ Garoa moderada',
    55: '🌦️ Garoa forte',
    61: '🌧️ Chuva leve',
    63: '🌧️ Chuva moderada',
    65: '🌧️ Chuva forte',
    71: '❄️ Neve leve',
    73: '❄️ Neve moderada',
    75: '❄️ Neve forte',
    95: '⛈️ Tempestade'
  };

  return codes[code] || '🌍 Clima indisponível';
}

  weatherData: any;
  day: any;
  clock: string = '';
  timer: any;
  owData: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.startClock();
    this.getLocation();
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

      this.weatherService.getWeatherByCoords(lat, lon)
        .subscribe((data: any) => {
          this.weatherData = data;
        });
    });
  }
}
}