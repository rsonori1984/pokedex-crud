import { Component, Input } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { TooltipModule } from 'primeng/tooltip';
@Component({
  selector: 'app-favorite-toggle',
  standalone: true,
  templateUrl: './favorite-toggle.html',
  styleUrl: './favorite-toggle.scss',
  imports: [TooltipModule]
})
export class FavoriteToggle {

  @Input({ required: true })
  pokemonName!: string;

  constructor(public service: PokemonService) {}

  toggle(event?: Event) {
    event?.stopPropagation();
    this.service.toggleFavorite(this.pokemonName);
  }
}