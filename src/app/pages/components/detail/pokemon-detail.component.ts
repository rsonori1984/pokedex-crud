import { Component, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PokemonService
  ) {
    // efeito que "ouve" o signal selectedPokemon
    effect(() => {
      this.pokemon = this.service.selectedPokemon();
    });
  }

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.service.loadPokemonDetail(name);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  getSprite(pokemon: any) {
    return pokemon?.sprites?.other?.['official-artwork']?.front_default || '';
  }
}
