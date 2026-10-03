import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: { id: number; email: string; role: string };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  
  // Track user login state with Signals
  currentUser = signal<{ email: string; role: string } | null>(null);

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  register(credentials: { email: string; password: string; role?: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, credentials);
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => {
        if (res.success && res.token && res.user) {
          localStorage.setItem('tads_jwt_token', res.token);
          localStorage.setItem('tads_user', JSON.stringify(res.user));
          this.currentUser.set(res.user);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('tads_jwt_token');
    localStorage.removeItem('tads_user');
    this.currentUser.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem('tads_jwt_token');
  }

  private loadUserFromStorage(): void {
    const userStr = localStorage.getItem('tads_user');
    if (userStr) {
      this.currentUser.set(JSON.parse(userStr));
    }
  }
}