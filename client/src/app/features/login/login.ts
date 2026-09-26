import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  activeTab = signal<'login' | 'register'>('login');

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
  }

  onLogin() {
    console.log('Logging in with:', this.loginData);
    // TODO: Connect with Express backend authentication endpoint (/api/auth/login)
  }

  onRegister() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Registering user:', this.registerData);
    // TODO: Connect with Express backend registration endpoint (/api/auth/register)
  }
}