import { Routes } from '@angular/router';
import { PokemonListComponent } from './components/list/pokemon-list.component';
import { PokemonDetailComponent } from './components/detail/pokemon-detail.component';
import { PokemonFormComponent } from './components/pokemon-form/pokemon-form.component';

export const POKEMON_ROUTES: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'new', component: PokemonFormComponent },
  { path: 'edit/:name', component: PokemonFormComponent, data: { edit: true } },
  { path: ':name', component: PokemonDetailComponent }
];
