import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { PokemonDetailComponent } from './pokemon-detail.component';
import { PokemonService } from '../../../services/pokemon.service';

describe('PokemonDetailComponent', () => {
  let component: PokemonDetailComponent;
  let fixture: ComponentFixture<PokemonDetailComponent>;
  let mockActivatedRoute: any;
  let mockPokemonService: jest.Mocked<PokemonService>;

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jest.fn((param: string) => {
            if (param === 'name') return 'pikachu';
            return null;
          })
        }
      }
    };

    mockPokemonService = {
      loadPokemonDetail: jest.fn(),
      pokemons: jest.fn(() => []),
      selectedPokemon: jest.fn(() => null),
      loadPokemons: jest.fn(),
      deletePokemon: jest.fn(),
      addPokemon: jest.fn(),
      editPokemon: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [PokemonDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: PokemonService, useValue: mockPokemonService },
        provideRouter([])
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load pokemon detail on init', () => {
    component.ngOnInit();
    expect(mockActivatedRoute.snapshot.paramMap.get).toHaveBeenCalledWith('name');
    expect(mockPokemonService.loadPokemonDetail).toHaveBeenCalledWith('pikachu');
  });

  it('should not load pokemon detail if name param is null', () => {
    mockActivatedRoute.snapshot.paramMap.get.mockReturnValue(null);
    component.ngOnInit();
    expect(mockPokemonService.loadPokemonDetail).not.toHaveBeenCalled();
  });
});
