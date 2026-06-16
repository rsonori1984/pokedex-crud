import { Routes } from '@angular/router';

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
];