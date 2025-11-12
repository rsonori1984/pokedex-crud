// import { Routes } from '@angular/router';

// export const routes: Routes = [
//   {
//     path: '',
//     loadChildren: () =>
//       import('./pages/pokemon.routes').then((m) => m.POKEMON_ROUTES),
//   },
//   { path: '**', redirectTo: '' },
// ];
import { Routes } from '@angular/router';
import { PokemonListComponent } from './pages/components/list/pokemon-list.component';
import { PokemonDetailComponent } from './pages/components/detail/pokemon-detail.component';
import { PokemonFormComponent } from './pages/components/pokemon-form/pokemon-form.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/components/list/pokemon-list.component')
        .then(m => m.PokemonListComponent),
  },
  {
    path: 'pokemon/:name',
    loadComponent: () =>
      import('./pages/components/detail/pokemon-detail.component')
        .then(m => m.PokemonDetailComponent),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./pages/components/pokemon-form/pokemon-form.component')
        .then(m => m.PokemonFormComponent),
  },
  {
    path: 'edit/:name',
    loadComponent: () =>
      import('./pages/components/pokemon-form/pokemon-form.component')
        .then(m => m.PokemonFormComponent),
    data: { edit: true },
  },
];