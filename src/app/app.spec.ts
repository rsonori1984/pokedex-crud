import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterOutlet } from '@angular/router';
import { NgComponentOutlet } from '@angular/common';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { App } from './app';
import { ThemeService } from './services/theme.service';
import { PokemonService } from './services/pokemon.service';
import { PrimeNG } from 'primeng/config';

jest.mock('@angular-architects/native-federation', () => ({
  loadRemoteModule: jest.fn(),
}));

const mockLoadRemoteModule = loadRemoteModule as jest.Mock;

@Component({ selector: 'app-fake-weather', template: '<span class="fake-weather">clima</span>' })
class FakeWeatherComponent {}

const mockThemeService = {
  loadTheme: jest.fn(),
};

const mockPokemonService = {
  loadPokemonNames: jest.fn(),
};

const mockPrimeNG = {
  ripple: {
    set: jest.fn(),
  },
};

describe('App', () => {
  beforeEach(async () => {
    mockLoadRemoteModule.mockReset();
    mockLoadRemoteModule.mockResolvedValue({ WeatherComponent: FakeWeatherComponent });

    await TestBed.configureTestingModule({
      imports: [App, RouterTestingModule],
      providers: [
        { provide: ThemeService, useValue: mockThemeService },
        { provide: PokemonService, useValue: mockPokemonService },
        { provide: PrimeNG, useValue: mockPrimeNG },
      ],
    })
      .overrideComponent(App, {
        set: {
          imports: [RouterOutlet, NgComponentOutlet],
          template:
            '@if (weatherComponent(); as weather) { <ng-container *ngComponentOutlet="weather" /> }' +
            '<router-outlet></router-outlet>',
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

  it('should load the weather widget from the mfe-weather remote', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(mockLoadRemoteModule).toHaveBeenCalledWith('mfe-weather', './WeatherComponent');
    expect((fixture.nativeElement as HTMLElement).querySelector('.fake-weather')).toBeTruthy();
  });

  it('should keep working without the weather widget when the remote fails to load', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    mockLoadRemoteModule.mockRejectedValue(new Error('remote offline'));

    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.fake-weather')).toBeNull();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockRestore();
  });
});
