import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Student {
  id: number;
  name: string;
  degree: 'PhD' | 'M.Tech' | 'B.Tech';
  rollNumber: string;
  researchTopic: string;
  advisor: string;
  email: string;
  year: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students.html',
  styleUrl: './students.css'
})
export class StudentsComponent {
  // Active Filter Signal
  activeCategory = signal<'All' | 'PhD' | 'M.Tech' | 'B.Tech'>('All');

  // Master Student List (9 PhD, 2 M.Tech, 10 B.Tech)
  students = signal<Student[]>([
    // --- 9 PhD SCHOLARS ---
    { id: 1, name: 'PhD Scholar 1', degree: 'PhD', rollNumber: 'CS21D001', researchTopic: 'Membrane Computing & Bio-Inspired Systems', advisor: 'Dr. N. Sadagopan', email: 'phd2101@iiitdm.ac.in', year: '2021 Batch' },
    { id: 2, name: 'PhD Scholar 2', degree: 'PhD', rollNumber: 'CS21D002', researchTopic: 'Algorithmic Graph Theory & Structural Bounds', advisor: 'Dr. N. Sadagopan', email: 'phd2102@iiitdm.ac.in', year: '2021 Batch' },
    { id: 3, name: 'PhD Scholar 3', degree: 'PhD', rollNumber: 'CS22D001', researchTopic: 'Large Language Models & Knowledge Graphs', advisor: 'Dr. B. Sivaselvan', email: 'phd2201@iiitdm.ac.in', year: '2022 Batch' },
    { id: 4, name: 'PhD Scholar 4', degree: 'PhD', rollNumber: 'CS22D002', researchTopic: 'Scalable Data Mining & Big Data Frameworks', advisor: 'Dr. B. Sivaselvan', email: 'phd2202@iiitdm.ac.in', year: '2022 Batch' },
    { id: 5, name: 'PhD Scholar 5', degree: 'PhD', rollNumber: 'CS23D001', researchTopic: 'Formal Verification & Computational Complexity', advisor: 'Dr. S. Raghavan', email: 'phd2301@iiitdm.ac.in', year: '2023 Batch' },
    { id: 6, name: 'PhD Scholar 6', degree: 'PhD', rollNumber: 'CS23D002', researchTopic: 'Combinatorial Optimization in Distributed Systems', advisor: 'Dr. S. Raghavan', email: 'phd2302@iiitdm.ac.in', year: '2023 Batch' },
    { id: 7, name: 'PhD Scholar 7', degree: 'PhD', rollNumber: 'CS24D001', researchTopic: 'P Systems Simulation on GPU Acceleration', advisor: 'Dr. N. Sadagopan', email: 'phd2401@iiitdm.ac.in', year: '2024 Batch' },
    { id: 8, name: 'PhD Scholar 8', degree: 'PhD', rollNumber: 'CS24D002', researchTopic: 'Deep Learning for Heterogeneous Data Streams', advisor: 'Dr. B. Sivaselvan', email: 'phd2402@iiitdm.ac.in', year: '2024 Batch' },
    { id: 9, name: 'PhD Scholar 9', degree: 'PhD', rollNumber: 'CS25D001', researchTopic: 'Automated Theorem Proving & Theoretical CS', advisor: 'Dr. S. Raghavan', email: 'phd2501@iiitdm.ac.in', year: '2025 Batch' },

    // --- 2 M.TECH STUDENTS ---
    { id: 10, name: 'M.Tech Student 1', degree: 'M.Tech', rollNumber: 'CS24M001', researchTopic: 'Distributed Computing Experimental Testbed Setup', advisor: 'Dr. B. Sivaselvan', email: 'mtech2401@iiitdm.ac.in', year: '2024-2026' },
    { id: 11, name: 'M.Tech Student 2', degree: 'M.Tech', rollNumber: 'CS24M002', researchTopic: 'Spiking Neural P Systems for Pattern Recognition', advisor: 'Dr. N. Sadagopan', email: 'mtech2402@iiitdm.ac.in', year: '2024-2026' },

    // --- 10 B.TECH STUDENTS ---
    { id: 12, name: 'B.Tech Student 1', degree: 'B.Tech', rollNumber: 'CS21B001', researchTopic: 'GATE CS AI Solving Assistant & Web Portal', advisor: 'TADS Lab', email: 'cs21b001@iiitdm.ac.in', year: 'Final Year' },
    { id: 13, name: 'B.Tech Student 2', degree: 'B.Tech', rollNumber: 'CS21B002', researchTopic: 'Local LLM Benchmarking on RTX A4000', advisor: 'TADS Lab', email: 'cs21b002@iiitdm.ac.in', year: 'Final Year' },
    { id: 14, name: 'B.Tech Student 3', degree: 'B.Tech', rollNumber: 'CS22B001', researchTopic: 'Graph Coloring Algorithms Implementation', advisor: 'Dr. N. Sadagopan', email: 'cs22b001@iiitdm.ac.in', year: '3rd Year' },
    { id: 15, name: 'B.Tech Student 4', degree: 'B.Tech', rollNumber: 'CS22B002', researchTopic: 'RAG Pipeline for Academic Document Search', advisor: 'Dr. B. Sivaselvan', email: 'cs22b002@iiitdm.ac.in', year: '3rd Year' },
    { id: 16, name: 'B.Tech Student 5', degree: 'B.Tech', rollNumber: 'CS22B003', researchTopic: 'Formal Language Grammar Parser', advisor: 'Dr. S. Raghavan', email: 'cs22b003@iiitdm.ac.in', year: '3rd Year' },
    { id: 17, name: 'B.Tech Student 6', degree: 'B.Tech', rollNumber: 'CS23B001', researchTopic: 'Multi-node Cluster Network Communication', advisor: 'TADS Lab', email: 'cs23b001@iiitdm.ac.in', year: '2nd Year' },
    { id: 18, name: 'B.Tech Student 7', degree: 'B.Tech', rollNumber: 'CS23B002', researchTopic: 'Data Visualization Dashboard for TCS Concepts', advisor: 'Dr. B. Sivaselvan', email: 'cs23b002@iiitdm.ac.in', year: '2nd Year' },
    { id: 19, name: 'B.Tech Student 8', degree: 'B.Tech', rollNumber: 'CS23B003', researchTopic: 'Cellular Automata Simulator', advisor: 'Dr. N. Sadagopan', email: 'cs23b003@iiitdm.ac.in', year: '2nd Year' },
    { id: 20, name: 'B.Tech Student 9', degree: 'B.Tech', rollNumber: 'CS24B001', researchTopic: 'GATE Question Bank Classification', advisor: 'TADS Lab', email: 'cs24b001@iiitdm.ac.in', year: '1st Year' },
    { id: 21, name: 'B.Tech Student 10', degree: 'B.Tech', rollNumber: 'CS24B002', researchTopic: 'Web Platform UI/UX Development', advisor: 'TADS Lab', email: 'cs24b002@iiitdm.ac.in', year: '1st Year' }
  ]);

  // Reactive Computed Filtered List
  filteredStudents = computed(() => {
    const category = this.activeCategory();
    if (category === 'All') return this.students();
    return this.students().filter(s => s.degree === category);
  });

  setCategory(category: 'All' | 'PhD' | 'M.Tech' | 'B.Tech') {
    this.activeCategory.set(category);
  }
}