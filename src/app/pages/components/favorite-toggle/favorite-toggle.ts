import { Component, inject, Input } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { NotificationService } from '../../../services/notification-service';
@Component({
  selector: 'app-favorite-toggle',
  standalone: true,
  templateUrl: './favorite-toggle.html',
  styleUrl: './favorite-toggle.scss',
  imports: [TooltipModule, ToastModule]
})
export class FavoriteToggle {
  @Input({ required: true })
  pokemonName!: string;
  constructor(public service: PokemonService,
    private notificationService: NotificationService
  ) {}

  toggle(event?: Event) {
    event?.stopPropagation();
    this.service.toggleFavorite(this.pokemonName);
    const isFavorite = this.service.isFavorite(this.pokemonName);
    if (isFavorite) {
      this.notificationService.success( 
        'Favorito', 
        `O Pokémon ${this.pokemonName} foi capturado!`);
    } else {
      this.notificationService.info(
        'Favorito', 
        `O Pokémon ${this.pokemonName} foi liberto!`);
    }
  }
}