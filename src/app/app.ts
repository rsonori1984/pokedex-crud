import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './pages/components/weather-component/weather-component';
import { ThemeToggle } from './pages/components/theme-toggle/theme-toggle';
import { ThemeService } from "../app/services/theme.service";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, WeatherComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit  {
  protected readonly title = signal('pokedex-crud');

  constructor(private primeng: PrimeNG,
              private themeService: ThemeService
  ) {}

ngOnInit() {
      this.themeService.loadTheme();
        // this.primeng.ripple.set(true);
    }
}
