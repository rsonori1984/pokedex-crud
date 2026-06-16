import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PokemonService } from '../../../services/pokemon.service';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-pokemon-search',
  standalone: true,
  imports: [FormsModule, AutoCompleteModule, FloatLabelModule],
  templateUrl: './pokemon-search.html',
  styleUrl: './pokemon-search.scss'
})
export class PokemonSearch {

  suggestions: any[] = [];
  selectedPokemon: any = null;

  constructor(
    private service: PokemonService,
    private router: Router
  ) {}

  searchPokemon(event: any) {
    const query = event.query.toLowerCase().trim();

    this.suggestions = this.service.pokemonNames()
      .filter(p =>
        p.name.toLowerCase().includes(query)
      )
      .slice(0, 15);
  }

  onSelectPokemon(event: any) {
    this.router.navigate(['/pokemon', event.value.name]);

    this.selectedPokemon = null;
    this.suggestions = [];
  }
}