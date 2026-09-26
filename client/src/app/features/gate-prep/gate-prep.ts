import { Component, signal } from '@angular/core';

export interface GateSubject {
  id: number;
  name: string;
  code: string;
  icon: string;
  topicsCount: number;
}

@Component({
  selector: 'app-gate-prep',
  standalone: true,
  templateUrl: './gate-prep.html',
  styleUrl: './gate-prep.css'
})
export class GatePrepComponent {
  // Currently selected subject (null shows grid view)
  selectedSubject = signal<GateSubject | null>(null);

  subjects: GateSubject[] = [
    { id: 1, name: 'Engineering Mathematics', code: 'EM', icon: '📐', topicsCount: 5 },
    { id: 2, name: 'Digital Logic', code: 'DL', icon: '⚡', topicsCount: 4 },
    { id: 3, name: 'Computer Organization and Architecture', code: 'COA', icon: '💻', topicsCount: 6 },
    { id: 4, name: 'Programming and Data Structures', code: 'DS', icon: '🌳', topicsCount: 8 },
    { id: 5, name: 'Algorithms', code: 'ALGO', icon: '⚡', topicsCount: 6 },
    { id: 6, name: 'Theory of Computation', code: 'TOC', icon: '⚙️', topicsCount: 4 },
    { id: 7, name: 'Compiler Design', code: 'CD', icon: '🛠️', topicsCount: 5 },
    { id: 8, name: 'Operating System', code: 'OS', icon: '🖥️', topicsCount: 7 },
    { id: 9, name: 'Databases', code: 'DBMS', icon: '🗄️', topicsCount: 5 },
    { id: 10, name: 'Computer Networks', code: 'CN', icon: '🌐', topicsCount: 6 }
  ];

  selectSubject(subject: GateSubject) {
    this.selectedSubject.set(subject);
  }

  clearSelection() {
    this.selectedSubject.set(null);
  }
}