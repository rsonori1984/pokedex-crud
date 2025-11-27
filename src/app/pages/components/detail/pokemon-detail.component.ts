import { Component, OnInit, effect } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../../services/pokemon.service';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PokemonService
  ) {
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

  getPokemonImage(p: any) {
    if (!p) return '/assets/pokeball-placeholder.png';
    return p.url?.startsWith('local://')
      ? '/assets/pokeball-placeholder.png'
      : p.url ?? '/assets/pokeball-placeholder.png';
  }

  goBack() {
    this.router.navigate(['/']);
  }

  editPokemon() {
    if (this.pokemon?.name) {
      this.router.navigate(['/edit', this.pokemon.name]);
    }
  }

  deletePokemon() {
    if (this.pokemon?.name) {
      if (confirm(`Tem certeza que deseja excluir ${this.pokemon.name}?`)) {
        this.service.deletePokemon(this.pokemon.name);
        this.goBack();
      }
    }
  }
}