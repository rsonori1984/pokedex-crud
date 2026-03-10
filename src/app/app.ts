import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './pages/components/weather-component/weather-component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, WeatherComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit  {
  protected readonly title = signal('pokedex-crud');

  constructor(private primeng: PrimeNG) {}

    ngOnInit() {
        // this.primeng.ripple.set(true);
    }
}
