import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';

export interface Student {
  id: number;
  name: string;
  degree: 'PhD' | 'M.Tech' | 'B.Tech' | string;
  rollNumber: string;
  researchTopic: string;
  advisor: string;
  email: string;
  year: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

// Interface matching DB/API return shape
export interface ApiMember {
  id: number;
  name: string;
  role?: string;
  email: string;
  degree: string;
  research_topic?: string;
  image_url?: string;
  roll_number?: string;
  year?: string;
  advisor?: string;
}

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students.html',
  styleUrl: './students.css'
})
export class StudentsComponent implements OnInit {
  private api = inject(ApiService);

  // Active Filter Signal
  activeCategory = signal<'All' | 'PhD' | 'M.Tech' | 'B.Tech'>('All');
  
  // Data & Loading Signals
  students = signal<Student[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.isLoading.set(true);
    this.api.get<ApiMember[]>('/members').subscribe({
      next: (data) => {
        const mappedStudents: Student[] = data.map((item) => ({
          id: item.id,
          name: item.name,
          degree: this.normalizeDegree(item.degree),
          rollNumber: item.roll_number || item.role || 'CS Scholar',
          researchTopic: item.research_topic || 'Research Scholar',
          advisor: item.advisor || 'TADS Lab',
          email: item.email,
          year: item.year || 'Research Scholar'
        }));

        this.students.set(mappedStudents);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to fetch members:', err);
        this.isLoading.set(false);
      }
    });
  }

  // Normalizes degree string to match UI badges
  private normalizeDegree(degreeStr: string): string {
    if (!degreeStr) return 'PhD';
    const lower = degreeStr.toLowerCase();
    if (lower.includes('phd') || lower.includes('ph.d')) return 'PhD';
    if (lower.includes('m.tech') || lower.includes('mtech')) return 'M.Tech';
    if (lower.includes('b.tech') || lower.includes('btech')) return 'B.Tech';
    return degreeStr;
  }

  // Dynamic Category Counts
  allCount = computed(() => this.students().length);
  phdCount = computed(() => this.students().filter(s => s.degree === 'PhD').length);
  mtechCount = computed(() => this.students().filter(s => s.degree === 'M.Tech').length);
  btechCount = computed(() => this.students().filter(s => s.degree === 'B.Tech').length);

  // Reactive Computed Filtered List
  filteredStudents = computed(() => {
    const category = this.activeCategory();
    if (category === 'All') return this.students();
    return this.students().filter((s) => s.degree === category);
  });

  setCategory(category: 'All' | 'PhD' | 'M.Tech' | 'B.Tech'): void {
    this.activeCategory.set(category);
  }
}