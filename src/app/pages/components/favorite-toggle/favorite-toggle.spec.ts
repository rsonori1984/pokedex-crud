import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FavoriteToggle } from './favorite-toggle';
import { PokemonService } from '../../../services/pokemon.service';

describe('FavoriteToggle', () => {
  let component: FavoriteToggle;
  let fixture: ComponentFixture<FavoriteToggle>;
  let mockPokemonService: jest.Mocked<Pick<PokemonService, 'toggleFavorite' | 'isFavorite'>>;

  beforeEach(async () => {
    mockPokemonService = {
      toggleFavorite: jest.fn(),
      isFavorite: jest.fn(() => false),
    } as any;

    await TestBed.configureTestingModule({
      imports: [FavoriteToggle],
      providers: [{ provide: PokemonService, useValue: mockPokemonService }],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteToggle);
    component = fixture.componentInstance;
    component.pokemonName = 'pikachu';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call toggleFavorite with pokemonName when clicked', () => {
    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    button.click();
    expect(mockPokemonService.toggleFavorite).toHaveBeenCalledWith('pikachu');
  });

  it('should render black pokeball when not favorite', () => {
    mockPokemonService.isFavorite.mockReturnValue(false);
    fixture.detectChanges();

    const image = fixture.debugElement.query(By.css('img')).nativeElement as HTMLImageElement;
    expect(image.src).toContain('/img/pokeball-bw.svg');
  });

  it('should render colored pokeball when favorite', () => {
    mockPokemonService.isFavorite.mockReturnValue(true);
    fixture.detectChanges();

    const image = fixture.debugElement.query(By.css('img')).nativeElement as HTMLImageElement;
    expect(image.src).toContain('/img/pokeball-color.svg');
  });
});
