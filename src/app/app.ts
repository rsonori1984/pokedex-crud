import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './pages/components/weather-component/weather-component';
import { ThemeToggle } from './pages/components/theme-toggle/theme-toggle';
import { ThemeService } from "../app/services/theme.service";
import { HeaderComponent } from "../app/pages/components/header/header.component"
import { PokemonService } from './services/pokemon.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, WeatherComponent, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit  {
  protected readonly title = signal('pokedex-crud');

  constructor(private primeng: PrimeNG,
              private themeService: ThemeService,
              private pokemonService: PokemonService
  ) {}

ngOnInit() {
      this.themeService.loadTheme();
      this.pokemonService.loadPokemonNames();
        // this.primeng.ripple.set(true);
    }
}
