import { Routes } from '@angular/router';
import { PublicShowcaseComponent } from './features/public-showcase/public-showcase';
import { GatePrepComponent } from './features/gate-prep/gate-prep';
import { LoginComponent } from './features/login/login';
export const routes: Routes = [
  {
    path: '',
    component: PublicShowcaseComponent,
    title: 'Home | Research Lab'
  },
  { path: 'gate-prep', component: GatePrepComponent, title: 'GATE Preparation | Research Lab' },
  { path: 'login', component: LoginComponent, title: 'Login | Research Lab' },

  {
    path: '**',
    redirectTo: '' // Redirect unknown URLs back to the home page
  }
];