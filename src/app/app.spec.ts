import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { App } from './app';
import { ThemeService } from './services/theme.service';
import { PokemonService } from './services/pokemon.service';
import { WeatherService } from './services/weather.service';
import { PrimeNG } from 'primeng/config';

const mockThemeService = {
  loadTheme: jest.fn(),
};

const mockPokemonService = {
  loadPokemonNames: jest.fn(),
};

const mockWeatherService = {
  getWeatherByCoords: jest.fn(),
};

const mockPrimeNG = {
  ripple: {
    set: jest.fn(),
  },
};

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, RouterTestingModule],
      providers: [
        { provide: ThemeService, useValue: mockThemeService },
        { provide: PokemonService, useValue: mockPokemonService },
        { provide: WeatherService, useValue: mockWeatherService },
        { provide: PrimeNG, useValue: mockPrimeNG },
      ],
    })
      .overrideComponent(App, {
        set: {
          imports: [RouterOutlet, CommonModule],
          template: '<router-outlet></router-outlet>',
        },
      })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have a title signal with value pokedex-crud', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect((app as any).title()).toBe('pokedex-crud');
  });

  it('should render router outlet', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});

