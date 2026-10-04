// src/app/core/guards/auth.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Check for JWT token or authentication state
  const token = localStorage.getItem('jwt_token');

  if (token) {
    // Optional: Add logic to check if token is expired before returning true
    return true;
  }

  // Preserve attempted URL to redirect back after login (optional)
  return router.createUrlTree(['/login'], { 
    queryParams: { returnUrl: state.url } 
  });
};