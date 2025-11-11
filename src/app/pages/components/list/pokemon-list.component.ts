import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  searchTerm = '';

  constructor(public service: PokemonService, private router: Router) {}

  ngOnInit() {
    this.service.loadPokemons();
  }

  filteredPokemons() {
    const term = this.searchTerm.toLowerCase();
    return this.service.pokemons().filter(p => p.name.toLowerCase().includes(term));
  }

  getPokemonImage(pokemon: any) {
    // Extrai o ID da URL da API e monta a imagem oficial
    const id = pokemon.url.split('/').filter(Boolean).pop();
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  openDetail(name: string) {
    this.router.navigate(['/pokemon', name]);
  }

    // Detecta scroll no final da tela
  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const scrollHeight = document.body.scrollHeight;

    if (scrollPosition >= scrollHeight - 200 && this.service.hasMore() && !this.service.loading()) {
      const offset = this.service.pokemons().length;
      this.service.loadPokemons(offset, 30);
    }
  }
}
