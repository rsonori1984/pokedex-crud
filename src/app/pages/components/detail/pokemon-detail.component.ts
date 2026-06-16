import { Component, OnInit, effect } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../../services/pokemon.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, ChipModule ],
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

  // ngOnInit() {
  //   const name = this.route.snapshot.paramMap.get('name');
  //   if (name) {
  //     this.service.loadPokemonDetail(name);
  //   }
  // }

  ngOnInit() {
  this.route.paramMap.subscribe(params => {
    const name = params.get('name');

    if (name) {
      this.service.loadPokemonDetail(name);
    }
  });
}

  // getPokemonImage(p: any) {
  //   if (!p) return '/img/poke-ball.svg';
  //   return p.url?.startsWith('local://')
  //     ? '/img/poke-ball.svg'
  //     : p.url ?? '/img/poke-ball.svg';
  // }

getPokemonImage(p: any) {
  return p?.url || '/img/poke-ball.svg';
}

  goBack() {
    this.router.navigate(['/']);
  }
}