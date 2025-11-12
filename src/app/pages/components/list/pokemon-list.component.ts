import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
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
      return 'https://github.com/rsonori1984/pokedex-crud/blob/master/src/app/assets/pokeball-placeholder.png';
    }
    const id = pokemon.url?.split('/').filter(Boolean).pop();
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  // 🔹 Scroll infinito otimizado
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



// import { Component, HostListener, OnInit } from '@angular/core';
// import { Router, RouterLink } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { PokemonService } from '../../../services/pokemon.service';

// @Component({
//   selector: 'app-pokemon-list',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterLink],
//   templateUrl: './pokemon-list.component.html',
//   styleUrls: ['./pokemon-list.component.scss']
// })
// export class PokemonListComponent implements OnInit {
//   searchTerm = '';

//   constructor(public service: PokemonService, private router: Router) {}

//   ngOnInit() {
//     this.service.loadPokemons();
//   }

//   ngOnDestroy() {
//     this.service.pokemons.set([]); // limpa o estado
//   }

//   filteredPokemons() {
//     const term = this.searchTerm.toLowerCase();
//     return this.service.pokemons().filter(p => p.name.toLowerCase().includes(term));
//   }

//   getPokemonImage(pokemon: any) {
//     // Extrai o ID da URL da API e monta a imagem oficial
//     const id = pokemon.url.split('/').filter(Boolean).pop();
//     return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
//   }

//   openDetail(name: string) {
//     this.router.navigate(['/pokemon', name]);
//   }

//   //   // Detecta scroll no final da tela
//   // @HostListener('window:scroll', [])
//   // onScroll(): void {
//   //   const scrollPosition = window.innerHeight + window.scrollY;
//   //   const scrollHeight = document.body.scrollHeight;

//   //   if (scrollPosition >= scrollHeight - 200 && this.service.hasMore() && !this.service.loading()) {
//   //     const offset = this.service.pokemons().length;
//   //     this.service.loadPokemons(offset, 30);
//   //   }
//   // }
// }
