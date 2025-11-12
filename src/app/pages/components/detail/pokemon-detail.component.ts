import { Component, OnInit, effect } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule],
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
    if (!p) return '../assets/pokeball-placeholder.png';
    return p.url?.startsWith('local://')
      ? '../assets/pokeball-placeholder.png'
      : p.url ?? '../assets/pokeball-placeholder.png';
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


// import { Component, OnInit, effect } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { PokemonService } from '../../../services/pokemon.service';

// @Component({
//   selector: 'app-pokemon-detail',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './pokemon-detail.component.html',
//   styleUrls: ['./pokemon-detail.component.scss']
// })
// export class PokemonDetailComponent implements OnInit {
//   pokemon: any = null;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private service: PokemonService
//   ) {
//     effect(() => {
//       this.pokemon = this.service.selectedPokemon();
//     });
//   }

//   ngOnInit() {
//     const name = this.route.snapshot.paramMap.get('name');
//     if (name) {
//       this.service.loadPokemonDetail(name);
//     }
//   }

//   getPokemonImage(p: any) {
//     if (!p) return 'assets/pokeball-placeholder.png';
//     return p.url?.startsWith('local://')
//       ? 'assets/pokeball-placeholder.png'
//       : p.url ?? 'assets/pokeball-placeholder.png';
//   }

//   goBack() {
//     this.router.navigate(['/']);
//   }
// }



// import { Component, effect, OnInit, signal } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { PokemonService, Pokemon } from '../../../services/pokemon.service';

// @Component({
//   selector: 'app-pokemon-detail',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './pokemon-detail.component.html',
//   styleUrls: ['./pokemon-detail.component.scss']
// })
// export class PokemonDetailComponent implements OnInit {
//   pokemon = signal<Pokemon | null>(null);

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private service: PokemonService
//   ) {
//     // cria um efeito reativo que atualiza automaticamente quando o service mudar
//       effect(() => {
//         this.pokemon.set(this.service.selectedPokemon());
//       });
//     }

//   ngOnInit() {
//     const name = this.route.snapshot.paramMap.get('name');

//     if (name) {
//       // carrega o detalhe do Pokémon (API ou localStorage)
//       this.service.loadPokemonDetail(name);

      
//     }
//   }

//   getPokemonImage(pokemon: Pokemon | null) {
//     if (!pokemon) return 'assets/pokeball-placeholder.png';
//     return pokemon.url?.startsWith('local://')
//       ? 'assets/pokeball-placeholder.png'
//       : pokemon.url ?? 'assets/pokeball-placeholder.png';
//   }

//   editPokemon() {
//     const current = this.pokemon();
//     if (current) {
//       this.router.navigate(['/edit', current.name]);
//     }
//   }

//   deletePokemon() {
//     const current = this.pokemon();
//     if (current) {
//       const confirmDelete = confirm(`Deseja excluir ${current.name}?`);
//       if (confirmDelete) {
//         this.service.deletePokemon(current.name);
//         this.goBack();
//       }
//     }
//   }

//   goBack() {
//     this.router.navigate(['/']);
//   }
// }




// import { Component, OnInit, computed, effect } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { PokemonService, Pokemon } from '../../../services/pokemon.service';

// @Component({
//   selector: 'app-pokemon-detail',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './pokemon-detail.component.html',
//   styleUrls: ['./pokemon-detail.component.scss'],
// })
// export class PokemonDetailComponent implements OnInit {
//   pokemon: Pokemon | null = null;
//   originalName = '';

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private service: PokemonService
//   ) {
//     // 👇 aqui usamos `effect` dentro do construtor — contexto válido
//     effect(() => {
//       const selected = this.service.selectedPokemon();
//       if (selected) {
//         this.pokemon = { ...selected };
//         this.originalName = selected.name;
//       }
//     });
//   }

//   ngOnInit() {
//     const name = this.route.snapshot.paramMap.get('name');
//     if (name) {
//       this.service.loadPokemonDetail(name);
//     }
//   }


//   getPokemonImage(pokemon: Pokemon) {
//   return pokemon.url?.startsWith('local://')
//     ? 'assets/pokeball-placeholder.png'
//     : pokemon.url ?? 'assets/pokeball-placeholder.png';
// }
//   // getPokemonImage(pokemon: Pokemon) {
//   //   if (pokemon.url?.startsWith('local://')) {
//   //     return 'assets/pokeball-placeholder.png';
//   //   }
//   //   const id = pokemon.url?.split('/').filter(Boolean).pop();
//   //   return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
//   // }

//   save() {
//     if (!this.pokemon) return;
//     this.service.editPokemon(this.originalName, this.pokemon);
//     alert('Pokémon atualizado!');
//     this.router.navigate(['/']);
//   }

//   back() {
//     this.router.navigate(['/']);
//   }
// }



// import { Component, OnInit, effect } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute, Router } from '@angular/router';
// import { PokemonService } from '../../../services/pokemon.service';

// @Component({
//   selector: 'app-pokemon-detail',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './pokemon-detail.component.html',
//   styleUrls: ['./pokemon-detail.component.scss']
// })
// export class PokemonDetailComponent implements OnInit {
//   pokemon: any;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private service: PokemonService
//   ) {
//     // efeito que "ouve" o signal selectedPokemon
//     effect(() => {
//       this.pokemon = this.service.selectedPokemon();
//     });
//   }

//   ngOnInit() {
//     const name = this.route.snapshot.paramMap.get('name');
//     if (name) {
//       this.service.loadPokemonDetail(name);
//     }
//   }

//   goBack() {
//     this.router.navigate(['/']);
//   }

//   getSprite(pokemon: any) {
//     return pokemon?.sprites?.other?.['official-artwork']?.front_default || '';
//   }
// }
