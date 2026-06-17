import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../../services/pokemon.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Pokemon } from '../../../models/pokemon.model';
import { FavoriteToggle } from '../favorite-toggle/favorite-toggle';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, ButtonModule,CardModule, FavoriteToggle,SelectButtonModule,FormsModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit, OnDestroy {
  private scrollLock = false; // trava pra evitar chamadas duplas

  get filterOptions() {
  return [
    { label: 'Todos', value: false },
    {
      label: `Favoritos (${this.service.favorites().length})`,
      value: true
    }
  ];
}

selectedFilter: boolean = false;

  constructor(public service: PokemonService, private router: Router) {}

  ngOnInit() {
    // Se a lista estiver vazia, carrega
    if (this.service.pokemons().length === 0) {
      this.service.loadPokemons();
    }
  }

  ngOnDestroy() {
    // Ao sair da página, limpa pra forçar recarregar ao voltar
    this.service.clear();
  }

  openDetail(name: string) {
    this.router.navigate(['/pokemon', name]);
  }

  trackById(index: number, pokemon: Pokemon | any): number {
    return pokemon.details?.id || index; // Usa o ID se disponível, senão o índice como fallback  
  }

  // Scroll infinito otimizado
  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const scrollHeight = document.body.scrollHeight;

    if (
      !this.scrollLock &&
      scrollPosition >= scrollHeight - 300 &&
      this.service.hasMore() &&
      !this.service.loading()
    ) {
      this.scrollLock = true;
      const offset = this.service.pokemons().length;
      this.service.loadPokemons(offset, 30);

      // destrava após um pequeno delay
      setTimeout(() => (this.scrollLock = false), 800);
    }
  }

  onFilterChange(value: boolean) {
    this.selectedFilter = value;
    this.service.showFavoritesOnly.set(value);
  }
}