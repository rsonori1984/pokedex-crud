import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter, ActivatedRoute } from '@angular/router';
import { signal } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { PokemonListComponent } from './pokemon-list.component';
import { PokemonService } from '../../../services/pokemon.service';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let mockRouter: jest.Mocked<Router>;
  let mockPokemonService: jest.Mocked<PokemonService>;

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn(),
    } as any;

    // The real service exposes signals as properties (not functions).
    // Provide a mock with the same shape so the component can call .pokemons()/.loading() etc.
    mockPokemonService = {
      pokemons: signal([]),
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
        { provide: ActivatedRoute, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadPokemons on init', () => {
    component.ngOnInit();
    expect(mockPokemonService.loadPokemons).toHaveBeenCalled();
  });

  it('should navigate to pokemon detail when openDetail is called', () => {
    component.openDetail('pikachu');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/pokemon', 'pikachu']);
  });
});
