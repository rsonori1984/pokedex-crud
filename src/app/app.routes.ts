import { Routes } from '@angular/router';
import { PokemonListComponent } from './pages/components/list/pokemon-list.component';
import { PokemonDetailComponent } from './pages/components/detail/pokemon-detail.component';
import { PokemonFormComponent } from './pages/components/pokemon-form/pokemon-form.component';

export const routes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'pokemon/:name', component: PokemonDetailComponent },
  { path: 'new', component: PokemonFormComponent },
  { path: 'edit/:name', component: PokemonFormComponent, data: { edit: true } }
];
