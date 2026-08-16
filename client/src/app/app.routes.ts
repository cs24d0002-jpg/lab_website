import { Routes } from '@angular/router';
import { PublicShowcaseComponent } from './features/public-showcase/public-showcase';

export const routes: Routes = [
  {
    path: '',
    component: PublicShowcaseComponent,
    title: 'Home | Research Lab'
  },
  {
    path: '**',
    redirectTo: '' // Redirect unknown URLs back to the home page
  }
];