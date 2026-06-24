import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';
import { PokemonService } from '../../../services/pokemon.service';
import { ThemeService } from '../../../services/theme.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterTestingModule],
      providers: [
        { provide: PokemonService, useValue: { pokemonNames: signal([]) } },
        { provide: ThemeService, useValue: { toggleTheme: jest.fn() } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo link', () => {
    const anchor = fixture.nativeElement.querySelector('a.logo-link');
    expect(anchor).toBeTruthy();
    expect(anchor.querySelector('img').alt).toBe('PokeDex');
  });

  it('should include pokemon search and theme toggle elements', () => {
    expect(fixture.nativeElement.querySelector('app-pokemon-search')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-theme-toggle')).toBeTruthy();
  });
});
