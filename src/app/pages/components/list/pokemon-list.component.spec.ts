import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { signal, NO_ERRORS_SCHEMA } from '@angular/core';

import { PokemonListComponent } from './pokemon-list.component';
import { PokemonService } from '../../../services/pokemon.service';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let mockRouter: jest.Mocked<Router>;
  let mockPokemonService: jest.Mocked<Partial<PokemonService>>;
  let showFavoritesOnly: any;

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn(),
    } as any;

    showFavoritesOnly = signal(false) as any;
    jest.spyOn(showFavoritesOnly, 'set');

    mockPokemonService = {
      pokemons: signal([]),
      favorites: signal([]),
      showFavoritesOnly,
      filteredPokemons: signal([]),
      loadPokemons: jest.fn(),
      deletePokemon: jest.fn(),
      selectedPokemon: signal(null),
      loadPokemonDetail: jest.fn(),
      loading: signal(false),
      hasMore: signal(true),
      clear: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: PokemonService, useValue: mockPokemonService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadPokemons on init when the pokemons list is empty', () => {
    component.ngOnInit();
    expect(mockPokemonService.loadPokemons).toHaveBeenCalled();
  });

  it('should not call loadPokemons on init when pokemons already exist', () => {
    mockPokemonService.pokemons = signal([{ name: 'pikachu', details: { id: 25 } }]) as any;
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;

    component.ngOnInit();

    expect(mockPokemonService.loadPokemons).not.toHaveBeenCalled();
  });

  it('should navigate to pokemon detail when openDetail is called', () => {
    component.openDetail('pikachu');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/pokemon', 'pikachu']);
  });

  it('should return pokemon details id for trackById when available', () => {
    const pokemon = { details: { id: 25 } };
    expect(component.trackById(0, pokemon)).toBe(25);
  });

  it('should return index for trackById when no id is available', () => {
    const pokemon = { name: 'unknown' };
    expect(component.trackById(5, pokemon)).toBe(5);
  });

  it('should update selectedFilter and showFavoritesOnly when onFilterChange is called', () => {
    component.onFilterChange(true);

    expect(component.selectedFilter).toBe(true);
    expect(mockPokemonService.showFavoritesOnly?.set).toHaveBeenCalledWith(true);
  });

  it('should load more pokemons on scroll when at bottom and not loading and hasMore is true', () => {
    jest.useFakeTimers();

    mockPokemonService.pokemons = signal([{ name: 'pikachu', details: { id: 25 } }]) as any;
    mockPokemonService.loading = signal(false) as any;
    mockPokemonService.hasMore = signal(true) as any;
    mockPokemonService.filteredPokemons = signal([{ name: 'pikachu', details: { id: 25 } }]) as any;

    Object.defineProperty(window, 'innerHeight', { value: 1000, configurable: true });
    Object.defineProperty(window, 'scrollY', { value: 1500, writable: true, configurable: true });
    Object.defineProperty(document.body, 'scrollHeight', { value: 2400, configurable: true });

    component.onScroll();

    expect(mockPokemonService.loadPokemons).toHaveBeenCalledWith(1, 30);

    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
});
