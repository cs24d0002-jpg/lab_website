import { Request, Response, NextFunction } from 'express';
import { encrypt, decrypt, EncryptedPayload } from '../../utils/cryptoUtils';

// export function cryptoMiddleware(req: Request, res: Response, next: NextFunction): void {
//   // 1. Decrypt incoming request payload if it contains encrypted payload and iv
//   if (req.body && typeof req.body.payload === 'string' && typeof req.body.iv === 'string') {
//     try {
//       req.body = decrypt(req.body.payload, req.body.iv);
//     } catch (err) {
//       res.status(400).json({ error: 'Invalid or corrupted encrypted payload' });
//       return;
//     }
//   }

//   // 2. Intercept res.json to automatically encrypt outgoing response data
//   const originalJson = res.json.bind(res);

//   res.json = function (data: unknown): Response {
//     // Avoid encrypting error responses or payloads that are already errors
//     if (data && typeof data === 'object' && 'error' in (data as Record<string, unknown>)) {
//       return originalJson(data);
//     }

//     const encryptedData: EncryptedPayload = encrypt(data);
//     return originalJson(encryptedData);
//   };

//   next();
// }

// crypto.middleware.ts
export function cryptoMiddleware(req: Request, res: Response, next: NextFunction): void {
  // 1. Decrypt ONLY IF the payload is encrypted
  if (req.body && typeof req.body.payload === 'string' && typeof req.body.iv === 'string') {
    try {
      req.body = decrypt(req.body.payload, req.body.iv);
    } catch (err) {
      res.status(400).json({ error: 'Invalid or corrupted encrypted payload' });
      return;
    }
  }
  // If req.body is plain JSON (not containing payload/iv), it passes through untouched!

  const originalJson = res.json.bind(res);

  res.json = function (data: unknown): Response {
    // Exclude health checks or error responses from response encryption if needed
    if (req.path.includes('/health') || (data && typeof data === 'object' && 'error' in data)) {
      return originalJson(data);
    }

    const encryptedData: EncryptedPayload = encrypt(data);
    return originalJson(encryptedData);
  };

  next();
}