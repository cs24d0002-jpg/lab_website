import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Publication {
  id: string;
  type: 'Conferences' | 'Journals' | 'Patents';
  title: string;
  authors: string[];
  venue: string; // Conference name, Journal title, or Patent Office
  year: number;
  doiOrUrl?: string;
  patentNumber?: string;
  status?: 'Granted' | 'Published' | 'Under Review';
  indexing?: string; // e.g., 'IEEE', 'ACM', 'Springer', 'SCIE'
  abstract?: string;
}

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './publications.html',
  styleUrl: './publications.css'
})
export class PublicationsComponent {
  // Active Division Tab
  activeDivision = signal<'All' | 'Conferences' | 'Journals' | 'Patents'>('All');
  
  // Search & Filter Signals
  searchQuery = signal<string>('');
  selectedYear = signal<string>('All');

  // Master Publications List
  publications = signal<Publication[]>([
    // --- CONFERENCES ---
    {
      id: 'c1',
      type: 'Conferences',
      title: 'Membrane Computing Architectures for Graph Theoretical Bounds',
      authors: ['N. Sadagopan', 'PhD Scholar 1', 'PhD Scholar 2'],
      venue: 'International Conference on Membrane Computing (ICMC 2025)',
      year: 2025,
      doiOrUrl: 'https://doi.org/10.1000/icmc.2025.01',
      indexing: 'Springer LNCS',
      status: 'Published'
    },
    {
      id: 'c2',
      type: 'Conferences',
      title: 'Scalable Distributed Mining of Frequent Itemsets on Heterogeneous Clusters',
      authors: ['B. Sivaselvan', 'PhD Scholar 4', 'M.Tech Student 1'],
      venue: 'IEEE International Conference on Big Data (BigData 2024)',
      year: 2024,
      doiOrUrl: 'https://doi.org/10.1109/BigData2024.101',
      indexing: 'IEEE Xplore',
      status: 'Published'
    },
    {
      id: 'c3',
      type: 'Conferences',
      title: 'Formal Verification of Cellular P Systems Using Temporal Logic',
      authors: ['S. Raghavan', 'PhD Scholar 5'],
      venue: 'ACM Symposium on Theoretical Aspects of Computer Science (STACS 2024)',
      year: 2024,
      doiOrUrl: 'https://doi.org/10.1145/STACS.2024.08',
      indexing: 'ACM DL',
      status: 'Published'
    },

    // --- JOURNALS ---
    {
      id: 'j1',
      type: 'Journals',
      title: 'Structural Properties and Bounds in Graph Theory: A Bio-Inspired Approach',
      authors: ['N. Sadagopan', 'PhD Scholar 2'],
      venue: 'Theoretical Computer Science (TCS - Elsevier)',
      year: 2025,
      doiOrUrl: 'https://doi.org/10.1016/j.tcs.2025.02.011',
      indexing: 'SCIE / Scopus',
      status: 'Published'
    },
    {
      id: 'j2',
      type: 'Journals',
      title: 'Optimized Knowledge Graph Generation Using Deep Learning & RAG Architectures',
      authors: ['B. Sivaselvan', 'PhD Scholar 3', 'B.Tech Student 4'],
      venue: 'IEEE Transactions on Knowledge and Data Engineering (TKDE)',
      year: 2024,
      doiOrUrl: 'https://doi.org/10.1109/TKDE.2024.331002',
      indexing: 'IEEE / SCIE',
      status: 'Published'
    },

    // --- PATENTS ---
    {
      id: 'p1',
      type: 'Patents',
      title: 'A Hardware Accelerator System for High-Throughput P System Simulation',
      authors: ['N. Sadagopan', 'PhD Scholar 7', 'M.Tech Student 2'],
      venue: 'Indian Patent Office (IPO)',
      year: 2025,
      patentNumber: 'IN Patent App. 202541012345 A',
      status: 'Granted'
    },
    {
      id: 'p2',
      type: 'Patents',
      title: 'Method and Framework for Real-Time Heterogeneous Data Stream Anomaly Detection',
      authors: ['B. Sivaselvan', 'PhD Scholar 8'],
      venue: 'Indian Patent Office (IPO)',
      year: 2024,
      patentNumber: 'IN Patent App. 202441098765 A',
      status: 'Under Review'
    }
  ]);

  // Available Years Array for Filter Dropdown
  availableYears = computed(() => {
    const years = Array.from(new Set(this.publications().map(p => p.year)));
    return years.sort((a, b) => b - a);
  });

  // Filtered Publications Logic
  filteredPublications = computed(() => {
    const div = this.activeDivision();
    const query = this.searchQuery().toLowerCase().trim();
    const yr = this.selectedYear();

    return this.publications().filter(p => {
      const matchesDivision = div === 'All' || p.type === div;
      const matchesYear = yr === 'All' || p.year.toString() === yr;
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.venue.toLowerCase().includes(query) ||
        p.authors.some(a => a.toLowerCase().includes(query));

      return matchesDivision && matchesYear && matchesSearch;
    });
  });

  // Helper count methods
  getCount(type: 'Conferences' | 'Journals' | 'Patents'): number {
    return this.publications().filter(p => p.type === type).length;
  }

  setDivision(div: 'All' | 'Conferences' | 'Journals' | 'Patents') {
    this.activeDivision.set(div);
  }
}