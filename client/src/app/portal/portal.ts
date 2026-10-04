import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

export interface ModuleItem {
  id: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './portal.html',
  styleUrl: './portal.css'
})
export class PortalComponent {
  activeModule = signal<string>('dashboard');
  user = signal<{ name: string; role: string }>({ name: 'Admin User', role: 'System Administrator' });

  modules: ModuleItem[] = [
    { id: 'dashboard', name: 'ERP Dashboard', icon: '📊' },
    { id: 'gate-prep', name: 'GATE Preparation', icon: '🎓' },
    { id: 'academic', name: 'Academic Records', icon: '📚' },
    { id: 'users', name: 'User Management', icon: '👥' },
    { id: 'settings', name: 'System Settings', icon: '⚙️' }
  ];

  constructor(private router: Router) {}

  selectModule(moduleId: string) {
    this.activeModule.set(moduleId);
  }

  logout() {
    localStorage.removeItem('jwt_token');
    this.router.navigate(['/login']);
  }
}