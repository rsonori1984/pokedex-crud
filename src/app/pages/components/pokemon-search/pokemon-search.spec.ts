import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Router } from '@angular/router';

import { PokemonSearch } from './pokemon-search';
import { PokemonService } from '../../../services/pokemon.service';

describe('PokemonSearch', () => {
  let component: PokemonSearch;
  let fixture: ComponentFixture<PokemonSearch>;
  let mockPokemonService: jest.Mocked<Pick<PokemonService, 'pokemonNames'>>;
  let mockRouter: jest.Mocked<Router>;

  beforeEach(async () => {
    mockPokemonService = {
      pokemonNames: signal([
        { name: 'Pikachu' },
        { name: 'Charmander' },
        { name: 'Squirtle' },
      ]),
    } as any;

    mockRouter = {
      navigate: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [PokemonSearch],
      providers: [
        { provide: PokemonService, useValue: mockPokemonService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter suggestions by query case-insensitively', () => {
    component.searchPokemon({ query: 'PIKA' });
    expect(component.suggestions).toEqual([{ name: 'Pikachu' }]);
  });

  it('should trim query before searching', () => {
    component.searchPokemon({ query: '  char  ' });
    expect(component.suggestions).toEqual([{ name: 'Charmander' }]);
  });

  it('should limit suggestions to 15 items', () => {
    const names = Array.from({ length: 20 }, (_, index) => ({ name: `pokemon-${index}` }));
    mockPokemonService.pokemonNames = signal(names);

    component.searchPokemon({ query: 'pokemon' });

    expect(component.suggestions.length).toBe(15);
  });

  it('should navigate to detail and reset state on select', () => {
    component.selectedPokemon = { name: 'Pikachu' };
    component.suggestions = [{ name: 'Pikachu' }];

    component.onSelectPokemon({ value: { name: 'Pikachu' } });

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/pokemon', 'Pikachu']);
    expect(component.selectedPokemon).toBeNull();
    expect(component.suggestions).toEqual([]);
  });
});
