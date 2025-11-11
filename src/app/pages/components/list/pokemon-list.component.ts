import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PokemonService } from '../../../services/pokemon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  constructor(public service: PokemonService, private router: Router) {}

  ngOnInit() {
    this.service.loadPokemons();
  }

  openDetail(name: string) {
    this.router.navigate(['/pokemon', name]);
  }
}
