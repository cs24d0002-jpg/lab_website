import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, switchMap, map } from 'rxjs';
import { CryptoService } from '../services/crypto.service';

export const encryptionInterceptor: HttpInterceptorFn = (req, next) => {
  const cryptoService = inject(CryptoService);

  // Skip encryption for GET/DELETE requests or requests without a body
  const shouldEncrypt = ['POST', 'PUT', 'PATCH'].includes(req.method) && !!req.body;

  const prepareRequest$ = shouldEncrypt
    ? from(cryptoService.encrypt(req.body)).pipe(
        map(encrypted => req.clone({ body: encrypted }))
      )
    : from(Promise.resolve(req));

  return prepareRequest$.pipe(
    switchMap(clonedReq => next(clonedReq)),
    switchMap(event => {
      // Intercept incoming HTTP responses with encrypted body
      if (event instanceof HttpResponse) {
        const encryptedBody = event.body as { payload?: string; iv?: string } | null;
        if (encryptedBody?.payload && encryptedBody.iv) {
          return from(cryptoService.decrypt(encryptedBody.payload, encryptedBody.iv)).pipe(
            map(decryptedBody => event.clone({ body: decryptedBody }))
          );
        }
      }
      return [event];
    })
  );
};