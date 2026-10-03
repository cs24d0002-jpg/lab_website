import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  // Signal tracking whether the spinner should be visible
  isLoading = signal<boolean>(false);
  
  private activeRequests = 0;

  show(): void {
    if (this.activeRequests === 0) {
      this.isLoading.set(true);
    }
    this.activeRequests++;
  }

  hide(): void {
    this.activeRequests--;
    if (this.activeRequests <= 0) {
      this.activeRequests = 0;
      this.isLoading.set(false);
    }
  }
}