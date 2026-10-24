import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
// Ensure SECRET_KEY is exactly 32 bytes/characters
const SECRET_KEY = Buffer.from(process.env['ENCRYPTION_KEY'] || '12345678901234567890123456789012', 'utf-8');

export function cryptoMiddleware(req: Request, res: Response, next: NextFunction): void {
  // 1. Decrypt Incoming Request Body
  if (req.body && req.body.payload && req.body.iv) {
    try {
      const iv = Buffer.from(req.body.iv, 'hex');
      const [encryptedText, authTagHex] = req.body.payload.split(':');
      const authTag = Buffer.from(authTagHex, 'hex');

      const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);
      decipher.setAuthTag(authTag);

      let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
      decrypted += decipher.final('utf-8');

      req.body = JSON.parse(decrypted);
    } catch (err) {
      res.status(400).json({ error: 'Invalid or corrupted encrypted payload' });
      return;
    }
  }

  // 2. Intercept res.json to Encrypt Outgoing Payload
  const originalJson = res.json.bind(res);
  res.json = (data: any): Response => {
    // Skip encryption for plain error messages if needed, or encrypt all JSON payloads
    try {
      const iv = crypto.randomBytes(12);
      const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);

      let encrypted = cipher.update(JSON.stringify(data), 'utf-8', 'hex');
      encrypted += cipher.final('hex');
      const authTag = cipher.getAuthTag().toString('hex');

      return originalJson({
        payload: `${encrypted}:${authTag}`,
        iv: iv.toString('hex')
      });
    } catch (err) {
      return originalJson(data);
    }
  };

  next();
}