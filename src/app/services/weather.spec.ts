import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return weather data for a valid city', async () => {
    const data = await service.getWeatherByCoords(51.5074, -0.1278);
    expect(data).toBeDefined();
    expect(data).toBe('London');

  });
});
