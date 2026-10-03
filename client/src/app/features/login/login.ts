import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private toastService = inject(ToastService);
  private authService = inject(AuthService);
  private router = inject(Router);

  activeTab = signal<'login' | 'register'>('login');
  
  // UI Feedback Signals
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');
  successMessage = signal<string>('');

  // Login Form State
  loginData = {
    email: '',
    password: '',
    role: 'STUDENT'
  };

  // Register Form State
  registerData = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'PROJECT_STUDENT'
  };

  switchTab(tab: 'login' | 'register') {
    this.activeTab.set(tab);
    this.clearMessages();
  }

  clearMessages() {
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  private getErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof HttpErrorResponse) {
      const body: unknown = error.error;
      if (body && typeof body === 'object' && 'message' in body && typeof body.message === 'string') {
        return body.message;
      }
    }
    return fallback;
  }

  onLogin() {
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage.set('Please provide both email and password.');
      return;
    }

    this.isLoading.set(true);
    this.clearMessages();

    this.authService.login({
      email: this.loginData.email.trim(),
      password: this.loginData.password
    }).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success) {
          // Navigate to publications/dashboard upon successful authentication
          this.toastService.success('Login successful! Welcome back.');
          this.router.navigate(['/publications']);
        }
      },
      error: (err: unknown) => {
        this.isLoading.set(false);
        this.errorMessage.set(this.getErrorMessage(
          err,
          'Login failed. Please check your credentials and server connection.'
        ));
      }
    });
  }

  onRegister() {
    this.clearMessages();

    if (!this.registerData.email || !this.registerData.password || !this.registerData.fullName) {
      this.errorMessage.set('All fields are required for registration.');
      return;
    }

    if (this.registerData.password.length < 6) {
      this.errorMessage.set('Password must be at least 6 characters long.');
      return;
    }

    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.errorMessage.set('Passwords do not match!');
      return;
    }

    this.isLoading.set(true);

    // Map UI role selection to Express PostgreSQL Enum ('Student' | 'Faculty')
    const mappedRole = this.registerData.role === 'FACULTY' ? 'Faculty' : 'Student';

    this.authService.register({
      email: this.registerData.email.trim(),
      password: this.registerData.password,
      role: mappedRole
    }).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success) {
          this.successMessage.set('Account created successfully! Switching to login...');
          
          // Populate login email and switch tab automatically
          this.loginData.email = this.registerData.email;
          
          setTimeout(() => {
            this.switchTab('login');
          }, 1500);
        }
      },
      error: (err: unknown) => {
        this.isLoading.set(false);
        this.errorMessage.set(this.getErrorMessage(
          err,
          'Registration failed. This email may already be registered.'
        ));
      }
    });
  }
}