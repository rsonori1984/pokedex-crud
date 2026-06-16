import { Routes } from '@angular/router';
import { PokemonListComponent } from './components/list/pokemon-list.component';
import { PokemonDetailComponent } from './components/detail/pokemon-detail.component';

export const POKEMON_ROUTES: Routes = [
  { path: '', component: PokemonListComponent },
  { path: ':name', component: PokemonDetailComponent }
];
