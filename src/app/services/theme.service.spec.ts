import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should toggle theme', () => {
    const initialTheme = document.body.classList.contains('dark-theme');
    service.toggleTheme();
    const newTheme = document.body.classList.contains('dark-theme');
    expect(newTheme).toBe(!initialTheme);
  });
  it('should load theme from localStorage', () => {
    localStorage.setItem('theme', 'dark');
    service.loadTheme();
    expect(document.body.classList.contains('dark-theme')).toBe(true);
  });
});
