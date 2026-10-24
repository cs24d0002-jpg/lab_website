import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FacultyAdminComponent } from './faculty/faculty';
import { MemberAdminComponent } from './members/members';
import { StudentTrackerComponent } from './student-tracker/student-tracker';
// Import other admin components as needed:
// import { CourseAdminComponent } from './course-admin/course-admin.component';
// import { ProjectAdminComponent } from './project-admin/project-admin.component';
// import { PublicationAdminComponent } from './publication-admin/publication-admin.component';

export interface ModuleTile {
  id: string;
  title: string;
  description: string;
  icon: string;
  badgeCount?: number;
}

@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FacultyAdminComponent, 
    MemberAdminComponent,
    StudentTrackerComponent
  ],
  templateUrl: './portal.html',
  styleUrl: './portal.css'
})
export class PortalComponent {
  // Navigation Signals
  activeModule = signal<string>('dashboard');
  activeManagementSubModule = signal<string | null>(null);

  user = signal<{ name: string; role: string }>({ 
    name: 'Admin User', 
    role: 'System Administrator' 
  });

  // Consolidated Sidebar Menu
  sidebarModules = [
    { id: 'dashboard', name: 'ERP Dashboard', icon: '📊' },
    { id: 'management', name: 'Data Management', icon: '🗂️' },
    { id: 'task-tracker', name: 'Task & Research Tracker', icon: '📝' }, // NEW TAB
    { id: 'gate-prep', name: 'GATE Preparation', icon: '🎓' },
    { id: 'users', name: 'User Access Control', icon: '👥' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ];

  // 5 Management Hub Tiles
  managementTiles: ModuleTile[] = [
    {
      id: 'faculties',
      title: 'Faculty Management',
      description: 'Manage professors, designations, research focus, and contact details.',
      icon: '👨‍🏫'
    },
    {
      id: 'members',
      title: 'Lab Members & Scholars',
      description: 'Manage Ph.D. scholars, M.Tech/B.Tech students, and research associates.',
      icon: '🎓'
    },
    {
      id: 'courses',
      title: 'Course Management',
      description: 'Manage department course offerings, syllabus materials, and schedules.',
      icon: '📚'
    },
    {
      id: 'projects',
      title: 'Research Projects',
      description: 'Track ongoing lab projects, grants, industry sponsors, and timelines.',
      icon: '🚀'
    },
    {
      id: 'publications',
      title: 'Publications & Papers',
      description: 'Catalog lab conference proceedings, journal papers, and patents.',
      icon: '📄'
    }
  ];

  constructor(private router: Router) {}

  selectSidebarModule(moduleId: string): void {
    this.activeModule.set(moduleId);
    // Reset sub-module view when switching main tabs
    if (moduleId !== 'management') {
      this.activeManagementSubModule.set(null);
    }
  }

  openManagementSubModule(subModuleId: string): void {
    this.activeManagementSubModule.set(subModuleId);
  }

  backToManagementHub(): void {
    this.activeManagementSubModule.set(null);
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    this.router.navigate(['/login']);
  }
}