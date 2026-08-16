import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Faculty { id: string; name: string; designation: string; email: string; researchInterests: string[]; scholarUrl?: string; }
export interface Student { id: string; name: string; program: string; researchFocus: string; githubUrl?: string; }
export interface Publication { id: string; title: string; authors: string[]; venue: string; year: number; doiUrl?: string; }

@Injectable({ providedIn: 'root' })
export class PublicLabService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/public';

  getFaculty(): Observable<Faculty[]> {
    return this.http.get<Faculty[]>(`${this.baseUrl}/faculty`);
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/students`);
  }

  getPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.baseUrl}/publications`);
  }
}