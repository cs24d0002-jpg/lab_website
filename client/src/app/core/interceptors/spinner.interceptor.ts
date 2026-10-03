import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(SpinnerService);

  // Show spinner on request start
  spinnerService.show();

  return next(req).pipe(
    // Hide spinner when request completes or errors
    finalize(() => {
      spinnerService.hide();
    })
  );
};