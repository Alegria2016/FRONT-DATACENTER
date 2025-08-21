import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: 'recargas',
    loadChildren: () => import('./features/recargas/recargas.routes').then(m => m.RECARGAS_ROUTES),
  },

];
