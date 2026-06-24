import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { of } from 'rxjs';

import { PokemonDetailComponent } from './pokemon-detail.component';
import { PokemonService } from '../../../services/pokemon.service';

describe('PokemonDetailComponent', () => {
  let component: PokemonDetailComponent;
  let fixture: ComponentFixture<PokemonDetailComponent>;
  let mockActivatedRoute: any;
  let mockPokemonService: jest.Mocked<Partial<PokemonService>>;
  let mockRouter: jest.Mocked<Router>;

  beforeEach(async () => {
    mockActivatedRoute = {
      paramMap: of({ get: jest.fn((key: string) => 'pikachu') })
    };

    mockRouter = { navigate: jest.fn() } as any;

    mockPokemonService = {
      loadPokemonDetail: jest.fn(),
      selectedPokemon: signal(null),
      pokemons: signal([]),
      loadPokemons: jest.fn(),
      deletePokemon: jest.fn(),
      addPokemon: jest.fn(),
      editPokemon: jest.fn(),
      toggleFavorite: jest.fn(),
      isFavorite: jest.fn(() => false),
    } as any;

    await TestBed.configureTestingModule({
      imports: [PokemonDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: PokemonService, useValue: mockPokemonService },
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize pokemon as null', () => {
      expect(component.pokemon).toBeNull();
    });
  });

  describe('ngOnInit', () => {
    it('should load pokemon detail when route param exists', (done) => {
      const params = new Map([['name', 'pikachu']]);
      mockActivatedRoute.paramMap = of(params);

      component.ngOnInit();

      setTimeout(() => {
        expect(mockPokemonService.loadPokemonDetail).toHaveBeenCalledWith('pikachu');
        done();
      }, 100);
    });

    it('should not load pokemon detail when name param is null', (done) => {
      const params = new Map([['name', null]]);
      mockActivatedRoute.paramMap = of(params);

      component.ngOnInit();

      setTimeout(() => {
        expect(mockPokemonService.loadPokemonDetail).not.toHaveBeenCalled();
        done();
      }, 100);
    });
  });

  describe('getPokemonImage', () => {
    it('should return placeholder when pokemon is null', () => {
      const result = component.getPokemonImage(null);
      expect(result).toBe('/img/poke-ball.svg');
    });

    it('should return placeholder when pokemon is undefined', () => {
      const result = component.getPokemonImage(undefined);
      expect(result).toBe('/img/poke-ball.svg');
    });

    it('should return local url when pokemon url starts with "local://"', () => {
      const pokemon = { url: 'local://pokemon-image' };
      const result = component.getPokemonImage(pokemon);
      expect(result).toBe('local://pokemon-image');
    });

    it('should return pokemon url when it is valid', () => {
      const pokemon = { url: 'https://example.com/pokemon.png' };
      const result = component.getPokemonImage(pokemon);
      expect(result).toBe('https://example.com/pokemon.png');
    });

    it('should return placeholder when pokemon url is null or undefined', () => {
      const pokemon = { url: null };
      const result = component.getPokemonImage(pokemon);
      expect(result).toBe('/img/poke-ball.svg');
    });

    it('should return placeholder when pokemon has no url property', () => {
      const pokemon = { name: 'pikachu' };
      const result = component.getPokemonImage(pokemon);
      expect(result).toBe('/img/poke-ball.svg');
    });
  });

  describe('goBack', () => {
    it('should navigate to root path', () => {
      component.goBack();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });
  });

  describe('Effect - selectedPokemon', () => {
    it('should update pokemon property when selectedPokemon signal changes', () => {
      const mockPokemon = { name: 'pikachu', type: 'electric' };
      (mockPokemonService.selectedPokemon as any).set(mockPokemon);

      fixture.detectChanges();

      expect(component.pokemon).toEqual(mockPokemon);
    });
  });
});
