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
    path: 'faculties',
    loadComponent: () => import('./features/faculties/faculties').then(m => m.FacultiesComponent)
  },
  {
    path: 'students',
    loadComponent: () => import('./features/students/students').then(m => m.StudentsComponent)
  },
  {
    path: 'courses',
    loadComponent: () => import('./features/courses/courses').then(m => m.CoursesComponent)
  },
  {
    path: 'publications',
    loadComponent: () => import('./features/publications/publications').then(m => m.PublicationsComponent)
  },
  {
    path: '**',
    redirectTo: '' // Redirect unknown URLs back to the home page
  }
];