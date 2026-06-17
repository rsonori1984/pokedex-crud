import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './back-to-top.html',
  styleUrl: './back-to-top.scss'
})
export class BackToTopComponent {

  visible = signal(false);

  randomPokemonId =
    Math.floor(Math.random() * 151) + 1;

  pokemonImage =
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.randomPokemonId}.png`;

  @HostListener('window:scroll')
  onScroll() {
    this.visible.set(window.scrollY > 500);
  }

  scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  this.randomPokemonId =
    Math.floor(Math.random() * 151) + 1;

  this.pokemonImage =
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.randomPokemonId}.png`;
}
}