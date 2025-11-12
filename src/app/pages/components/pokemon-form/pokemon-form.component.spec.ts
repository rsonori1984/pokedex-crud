import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA, signal } from '@angular/core';

import { PokemonFormComponent } from './pokemon-form.component';
import { PokemonService } from '../../../services/pokemon.service';

describe('PokemonFormComponent', () => {
  let component: PokemonFormComponent;
  let fixture: ComponentFixture<PokemonFormComponent>;
  let mockRouter: jest.Mocked<Router>;
  let mockPokemonService: jest.Mocked<PokemonService>;

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn(),
    } as any;

    mockPokemonService = {
      addPokemon: jest.fn(),
      editPokemon: jest.fn(),
      // service exposes signals as properties
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
      imports: [PokemonFormComponent, ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: PokemonService, useValue: mockPokemonService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty name and description', () => {
    expect(component.form.get('name')?.value).toBe('');
    expect(component.form.get('description')?.value).toBe('');
  });

  it('should mark form as invalid when empty', () => {
    component.form.reset();
    expect(component.form.valid).toBeFalsy();
  });

  it('should mark form as valid when name is provided', () => {
    component.form.get('name')?.setValue('Pikachu');
    component.form.get('description')?.setValue('Electric type Pokemon');
    expect(component.form.valid).toBeTruthy();
  });

  it('should call addPokemon when submitting in add mode', () => {
    component.editMode = false;
    component.form.get('name')?.setValue('Pikachu');
    component.form.get('description')?.setValue('Electric type');
    component.onSubmit();
    expect(mockPokemonService.addPokemon).toHaveBeenCalledWith({
      name: 'Pikachu',
      description: 'Electric type'
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should call editPokemon when submitting in edit mode', () => {
    component.editMode = true;
    component.currentName = 'Pikachu';
    component.form.get('name')?.setValue('Raichu');
    component.form.get('description')?.setValue('Electric type');
    component.onSubmit();
    expect(mockPokemonService.editPokemon).toHaveBeenCalledWith('Pikachu', {
      name: 'Raichu',
      description: 'Electric type'
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
