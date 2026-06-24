import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
    });

    service = TestBed.inject(WeatherService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return weather data for valid coordinates', () => {
    const mockResponse = {
      current: { weather_code: 1, temperature_2m: 20 },
      daily: { temperature_2m_max: [22], temperature_2m_min: [15] },
    };

    service.getWeatherByCoords(51.5074, -0.1278).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne((request) =>
      request.url.startsWith('https://api.open-meteo.com/v1/forecast')
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
