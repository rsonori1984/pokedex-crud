import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ThemeToggle } from './theme-toggle';
import { ThemeService } from '../../../services/theme.service';

describe('ThemeToggle', () => {
  let component: ThemeToggle;
  let fixture: ComponentFixture<ThemeToggle>;
  let mockThemeService: jest.Mocked<Pick<ThemeService, 'toggleTheme'>>;

  beforeEach(async () => {
    mockThemeService = {
      toggleTheme: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [ThemeToggle],
      providers: [{ provide: ThemeService, useValue: mockThemeService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeToggle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call themeService.toggleTheme when toggleTheme is invoked', () => {
    component.toggleTheme();
    expect(mockThemeService.toggleTheme).toHaveBeenCalled();
  });

  it('should call themeService.toggleTheme when button is clicked', () => {
    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    button.click();
    expect(mockThemeService.toggleTheme).toHaveBeenCalled();
  });
});
