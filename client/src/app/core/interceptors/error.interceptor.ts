import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error) => {
      let errorMsg = 'An unexpected error occurred.';

      if (error.error?.message) {
        errorMsg = error.error.message;
      } else if (error.status === 0) {
        errorMsg = 'Cannot connect to server. Check your network or Express backend.';
      }

      // Automatically trigger red error toast
      toastService.error(errorMsg);

      return throwError(() => error);
    })
  );
};