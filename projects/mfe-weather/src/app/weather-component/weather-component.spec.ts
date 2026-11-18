import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { WeatherComponent } from './weather-component';
import { WeatherService } from '../services/weather.service';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let mockWeatherService: jest.Mocked<Pick<WeatherService, 'getWeatherByCoords'>>;
  const originalNavigator = global.navigator;

  beforeEach(async () => {
    mockWeatherService = {
      getWeatherByCoords: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [WeatherComponent],
      providers: [{ provide: WeatherService, useValue: mockWeatherService }],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    Object.defineProperty(global, 'navigator', {
      value: originalNavigator,
      configurable: true,
    });
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the correct weather description for known codes', () => {
    expect(component.getWeatherDescription(0)).toBe('☀️ Céu limpo');
    expect(component.getWeatherDescription(3)).toBe('☁️ Nublado');
    expect(component.getWeatherDescription(95)).toBe('⛈️ Tempestade');
  });

  it('should return default description for unknown codes', () => {
    expect(component.getWeatherDescription(999)).toBe('🌍 Clima indisponível');
  });

  it('should start the clock and set timer on ngOnInit', () => {
    jest.useFakeTimers();
    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    component.ngOnInit();

    expect(setIntervalSpy).toHaveBeenCalled();
    expect(component.timer).toBeDefined();
    expect(component.clock).toBeTruthy();
  });

  it('should set weatherError when geolocation is unsupported', () => {
    Object.defineProperty(global, 'navigator', {
      value: {},
      configurable: true,
    });

    component.getLocation();

    expect(component.weatherError).toBe('📡 Geolocalização não suportada.');
    expect(component.loadingWeather).toBe(false);
  });

  it('should load weather data when geolocation succeeds', () => {
    const fakePosition = {
      coords: {
        latitude: 10,
        longitude: 20,
      },
    } as GeolocationPosition;

    Object.defineProperty(global, 'navigator', {
      value: {
        geolocation: {
          getCurrentPosition: jest.fn((success) => success(fakePosition)),
        },
      },
      configurable: true,
    });

    const weatherResponse = {
      current: { weather_code: 1, temperature_2m: 23 },
      daily: { temperature_2m_max: [28], temperature_2m_min: [18] },
    };

    mockWeatherService.getWeatherByCoords.mockReturnValue(of(weatherResponse));

    component.getLocation();

    expect(mockWeatherService.getWeatherByCoords).toHaveBeenCalledWith(10, 20);
    expect(component.weatherData).toEqual(weatherResponse);
    expect(component.loadingWeather).toBe(false);
  });

  it('should set weatherError when geolocation permission is denied', () => {
    const positionError = {
      code: 1,
      PERMISSION_DENIED: 1,
    } as GeolocationPositionError;

    Object.defineProperty(global, 'navigator', {
      value: {
        geolocation: {
          getCurrentPosition: jest.fn((_, error) => error(positionError)),
        },
      },
      configurable: true,
    });

    component.getLocation();

    expect(component.weatherError).toBe('📍 Permita a localização para visualizar o clima.');
    expect(component.loadingWeather).toBe(false);
  });
});
