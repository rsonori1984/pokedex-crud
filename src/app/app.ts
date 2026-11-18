import { Component, OnInit, Type, signal } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { ThemeService } from "../app/services/theme.service";
import { HeaderComponent } from "../app/pages/components/header/header.component"
import { PokemonService } from './services/pokemon.service';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgComponentOutlet, HeaderComponent,
    ToastModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit  {
  protected readonly title = signal('pokedex-crud');

  /** Widget de clima, carregado em runtime do microfrontend `mfe-weather`. */
  protected readonly weatherComponent = signal<Type<unknown> | null>(null);

  constructor(private primeng: PrimeNG,
              private themeService: ThemeService,
              private pokemonService: PokemonService
  ) {}

  ngOnInit() {
      this.themeService.loadTheme();
      this.pokemonService.loadPokemonNames();
      this.loadWeatherWidget();
        // this.primeng.ripple.set(true);
  }

  /**
   * Se o remote estiver fora do ar, a Pokédex continua funcionando
   * normalmente, apenas sem o widget de clima.
   */
  private async loadWeatherWidget(): Promise<void> {
    try {
      const { WeatherComponent } = await loadRemoteModule('mfe-weather', './WeatherComponent');
      this.weatherComponent.set(WeatherComponent);
    } catch (error) {
      console.error('Não foi possível carregar o microfrontend de clima (mfe-weather).', error);
    }
  }
}
