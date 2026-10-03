import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (spinnerService.isLoading()) {
      <div class="spinner-overlay">
        <div class="spinner-container">
          <div class="loading-spinner"></div>
          <p class="spinnerText">Loading, please wait...</p>
        </div>
      </div>
    }
  `,
  styles: [`
    .spinner-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(15, 23, 42, 0.65); /* Semi-transparent dark backdrop */
      backdrop-filter: blur(4px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999; /* Ensure overlay stays on top */
    }

    .spinner-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #ffffff;
      padding: 2rem 2.5rem;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }

    .loading-spinner {
      width: 48px;
      height: 48px;
      border: 5px solid #e2e8f0;
      border-top: 5px solid #0284c7; /* Matching TADS Lab primary blue */
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    .spinnerText {
      margin-top: 1rem;
      font-size: 0.95rem;
      font-weight: 600;
      color: #0f172a;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class SpinnerComponent {
  public spinnerService = inject(SpinnerService);
}