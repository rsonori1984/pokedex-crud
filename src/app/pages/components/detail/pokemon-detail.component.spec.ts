import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { NO_ERRORS_SCHEMA, signal } from '@angular/core';

import { PokemonDetailComponent } from './pokemon-detail.component';
import { PokemonService } from '../../../services/pokemon.service';

describe('PokemonDetailComponent', () => {
  let component: PokemonDetailComponent;
  let fixture: ComponentFixture<PokemonDetailComponent>;
  let mockActivatedRoute: any;
  let mockPokemonService: jest.Mocked<PokemonService>;
  let mockRouter: jest.Mocked<Router>;
  let originalConfirm: any;

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

    mockRouter = { navigate: jest.fn() } as any;

    mockPokemonService = {
      loadPokemonDetail: jest.fn(),
      // signals as properties
      pokemons: signal([]),
      selectedPokemon: signal(null),
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
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailComponent);
    component = fixture.componentInstance;
    // keep original confirm to restore after tests
    originalConfirm = (global as any).confirm;
  });

  afterEach(() => {
    // restore global confirm if it was mocked
    (global as any).confirm = originalConfirm;
    jest.clearAllMocks();
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

  it('should navigate to edit when editPokemon is called', () => {
    // set the selected pokemon signal so the effect updates component.pokemon
    (mockPokemonService.selectedPokemon as any).set({ name: 'pikachu' });
    fixture.detectChanges();

    component.editPokemon();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/edit', 'pikachu']);
  });

  it('should delete pokemon and go back when confirmed', () => {
    (mockPokemonService.selectedPokemon as any).set({ name: 'pikachu' });

  (global as any).confirm = jest.fn(() => true);
  fixture.detectChanges();

  component.deletePokemon();

    expect((global as any).confirm).toHaveBeenCalled();
    expect(mockPokemonService.deletePokemon).toHaveBeenCalledWith('pikachu');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should not delete pokemon when confirmation is cancelled', () => {
    (mockPokemonService.selectedPokemon as any).set({ name: 'pikachu' });

  (global as any).confirm = jest.fn(() => false);
  fixture.detectChanges();

  component.deletePokemon();

    expect((global as any).confirm).toHaveBeenCalled();
    expect(mockPokemonService.deletePokemon).not.toHaveBeenCalled();
  });
});
