// src/app/core/services/faculty.service.ts
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Faculty } from '../models/faculty.model';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  private api = inject(ApiService);
  private readonly endpoint = '/faculties';

  getFaculties(): Observable<Faculty[]> {
    return this.api.get<Faculty[]>(this.endpoint);
  }

  addFaculty(faculty: Faculty): Observable<Faculty> {
    return this.api.post<Faculty>(this.endpoint, faculty);
  }

  updateFaculty(id: number, faculty: Faculty): Observable<Faculty> {
    return this.api.put<Faculty>(`${this.endpoint}/${id}`, faculty);
  }

  deleteFaculty(id: number): Observable<{ success: boolean }> {
    return this.api.delete<{ success: boolean }>(`${this.endpoint}/${id}`);
  }
}