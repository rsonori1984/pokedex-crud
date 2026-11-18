import { Component } from '@angular/core';
import { WeatherComponent } from './weather-component/weather-component';

/**
 * Shell usado apenas quando o remote roda sozinho (`npm run start:weather`).
 * Quando carregado pelo host, quem é consumido é o WeatherComponent exposto
 * em federation.config.js — este componente não é carregado.
 */
@Component({
  selector: 'app-root',
  imports: [WeatherComponent],
  template: '<app-weather-component />',
})
export class App {}
