import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../../services/pokemon.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule,CardModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit, OnDestroy {
  private scrollLock = false; // trava pra evitar chamadas duplas

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

  getPokemonImage(pokemon: any) {
    if (pokemon.url?.startsWith('local://')) {
      return '/img/poke-ball.png';
    }
    const id = pokemon.url?.split('/').filter(Boolean).pop();
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
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
}