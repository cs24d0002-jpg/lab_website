import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="toast-card" [ngClass]="toast.type">
          <span class="icon">
            @switch (toast.type) {
              @case ('success') { ✅ }
              @case ('error') { ⚠️ }
              @case ('warning') { 🔔 }
              @default { ℹ️ }
            }
          </span>
          <span class="message">{{ toast.message }}</span>
          <button class="close-btn" (click)="toastService.remove(toast.id)">✕</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 380px;
      pointer-events: none;
    }

    .toast-card {
      pointer-events: auto;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border-radius: 8px;
      color: #ffffff;
      font-size: 0.9rem;
      font-weight: 500;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .toast-card.success { background-color: #059669; } /* Green */
    .toast-card.error   { background-color: #dc2626; } /* Red */
    .toast-card.warning { background-color: #d97706; } /* Amber */
    .toast-card.info    { background-color: #0284c7; } /* Blue */

    .message {
      flex: 1;
      line-height: 1.4;
    }

    .close-btn {
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.8);
      font-size: 1rem;
      cursor: pointer;
      padding: 0 4px;
    }

    .close-btn:hover {
      color: #ffffff;
    }

    @keyframes slideIn {
      from {
        transform: translateY(100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `]
})
export class ToastComponent {
  public toastService = inject(ToastService);
}