import { Routes } from '@angular/router';


export const RECARGAS_ROUTES: Routes = [
  
  {
    path: '',
    loadComponent: () => import('./recargas.component').then(m => m.RecargasComponent),
  },
];