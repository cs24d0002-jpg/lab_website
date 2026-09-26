import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface CourseMaterial {
  id: string;
  title: string;
  type: 'Slides' | 'Assignment' | 'Tutorial' | 'Scribe' | 'PYQ';
  downloadUrl: string;
  uploadDate: string;
  fileSize?: string;
}

export interface Course {
  code: string;
  name: string;
  instructor: string;
  semester: string;
  academicYear: string;
  description: string;
  materials: CourseMaterial[];
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})
export class CoursesComponent {
  // Active Filters
  selectedCategory = signal<'All' | 'Slides' | 'Assignment' | 'Tutorial' | 'Scribe' | 'PYQ'>('All');
  searchQuery = signal<string>('');
  expandedCourseCode = signal<string>('CS3010'); // Default expanded course

  // Master Courses Data
  courses = signal<Course[]>([
    {
      code: 'CS3010',
      name: 'Design and Analysis of Algorithms',
      instructor: 'Dr. N. Sadagopan',
      semester: 'Odd Semester',
      academicYear: '2025-2026',
      description: 'Foundations of algorithm design, divide-and-conquer, greedy strategies, dynamic programming, NP-completeness, and graph algorithms.',
      materials: [
        { id: 'm1', title: 'Lecture 01 - Asymptotic Notations & Recurrence', type: 'Slides', downloadUrl: '#', uploadDate: 'Aug 10, 2025', fileSize: '2.4 MB' },
        { id: 'm2', title: 'Lecture 08 - Dynamic Programming & Matrix Chain Multiplication', type: 'Slides', downloadUrl: '#', uploadDate: 'Sep 02, 2025', fileSize: '3.1 MB' },
        { id: 'm3', title: 'Assignment 1 - Recurrences and Divide & Conquer', type: 'Assignment', downloadUrl: '#', uploadDate: 'Aug 20, 2025', fileSize: '450 KB' },
        { id: 'm4', title: 'Tutorial Sheet 1 - Structural Properties of Trees & Graphs', type: 'Tutorial', downloadUrl: '#', uploadDate: 'Aug 25, 2025', fileSize: '620 KB' },
        { id: 'm5', title: 'Scribe - Amortized Analysis & Potential Method', type: 'Scribe', downloadUrl: '#', uploadDate: 'Sep 15, 2025', fileSize: '1.1 MB' },
        { id: 'm6', title: 'End-Sem Exam Question Paper (2023-24)', type: 'PYQ', downloadUrl: '#', uploadDate: 'Jul 05, 2025', fileSize: '890 KB' }
      ]
    },
    {
      code: 'CS5020',
      name: 'Advanced Data Mining and Analytics',
      instructor: 'Dr. B. Sivaselvan',
      semester: 'Even Semester',
      academicYear: '2025-2026',
      description: 'Big Data architectures, frequent itemset mining, stream processing, graph analytics, and scalable machine learning frameworks.',
      materials: [
        { id: 'm7', title: 'Lecture 03 - Association Rule Mining & Apriori Algorithm', type: 'Slides', downloadUrl: '#', uploadDate: 'Jan 15, 2026', fileSize: '4.2 MB' },
        { id: 'm8', title: 'Assignment 2 - Implementing FP-Growth on Spark', type: 'Assignment', downloadUrl: '#', uploadDate: 'Feb 10, 2026', fileSize: '510 KB' },
        { id: 'm9', title: 'Tutorial Sheet 2 - MapReduce Dataflow Design', type: 'Tutorial', downloadUrl: '#', uploadDate: 'Feb 18, 2026', fileSize: '380 KB' },
        { id: 'm10', title: 'Mid-Sem Question Paper with Solutions (2024-25)', type: 'PYQ', downloadUrl: '#', uploadDate: 'Jan 05, 2026', fileSize: '1.5 MB' }
      ]
    },
    {
      code: 'CS4015',
      name: 'Formal Languages and Automata Theory',
      instructor: 'Dr. S. Raghavan',
      semester: 'Odd Semester',
      academicYear: '2025-2026',
      description: 'Finite automata, regular expressions, context-free grammars, pushdown automata, Turing machines, and undecidability.',
      materials: [
        { id: 'm11', title: 'Lecture 05 - NFA to DFA Conversion and Minimization', type: 'Slides', downloadUrl: '#', uploadDate: 'Aug 18, 2025', fileSize: '1.8 MB' },
        { id: 'm12', title: 'Tutorial Sheet 3 - Pumping Lemma for Regular Languages', type: 'Tutorial', downloadUrl: '#', uploadDate: 'Sep 10, 2025', fileSize: '420 KB' },
        { id: 'm13', title: 'Scribe - Undecidability & Halting Problem Proofs', type: 'Scribe', downloadUrl: '#', uploadDate: 'Oct 02, 2025', fileSize: '950 KB' },
        { id: 'm14', title: 'GATE-Pattern Quiz & Previous Year Questions', type: 'PYQ', downloadUrl: '#', uploadDate: 'Aug 01, 2025', fileSize: '1.2 MB' }
      ]
    }
  ]);

  toggleCourse(code: string) {
    if (this.expandedCourseCode() === code) {
      this.expandedCourseCode.set('');
    } else {
      this.expandedCourseCode.set(code);
    }
  }

  setCategory(category: 'All' | 'Slides' | 'Assignment' | 'Tutorial' | 'Scribe' | 'PYQ') {
    this.selectedCategory.set(category);
  }

  getFilteredMaterials(materials: CourseMaterial[]): CourseMaterial[] {
    const cat = this.selectedCategory();
    const query = this.searchQuery().toLowerCase().trim();

    return materials.filter(m => {
      const matchesCategory = cat === 'All' || m.type === cat;
      const matchesSearch = !query || m.title.toLowerCase().includes(query) || m.type.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }
}