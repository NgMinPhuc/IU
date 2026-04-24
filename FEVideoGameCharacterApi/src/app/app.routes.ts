import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'characters',
    loadComponent: () =>
      import('./libs/features/character/feature/character-list/character-list').then(
        (m) => m.CharacterListComponent,
      ),
    data: { title: 'Characters' },
  },
  {
    path: 'games',
    loadComponent: () =>
      import('./libs/features/game/feature/game-list/game-list').then(
        (m) => m.GameListComponent,
      ),
    data: { title: 'Games' },
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./libs/shared/placeholder/placeholder.component').then(
        (m) => m.PlaceholderComponent,
      ),
    data: { title: 'Dashboard' },
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./libs/shared/placeholder/placeholder.component').then(
        (m) => m.PlaceholderComponent,
      ),
    data: { title: 'Settings' },
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
