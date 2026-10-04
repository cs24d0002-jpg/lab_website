import * as crypto from 'crypto';

export interface EncryptedPayload {
  payload: string;
  iv: string;
}

const ALGORITHM = 'aes-256-gcm';
// Key must be exactly 32 bytes (256 bits). Ensure this matches the frontend key.
const SECRET_KEY = Buffer.from('12345678901234567890123456789012', 'utf-8');

/**
 * Encrypts a JavaScript object or string into Base64 ciphertext + IV using AES-256-GCM.
 */
export function encrypt(data: unknown): EncryptedPayload {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);

  const text = typeof data === 'string' ? data : JSON.stringify(data);
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  const authTag = cipher.getAuthTag();

  // Combine ciphertext and authTag (Web Crypto expects the 16-byte authTag at the end of the ciphertext buffer)
  const ciphertextWithTag = Buffer.concat([
    Buffer.from(encrypted, 'base64'),
    authTag
  ]).toString('base64');

  return {
    payload: ciphertextWithTag,
    iv: iv.toString('base64')
  };
}

/**
 * Decrypts a Base64 AES-256-GCM payload and IV back to a JavaScript object.
 */
export function decrypt<T = unknown>(encryptedPayload: string, ivBase64: string): T {
  const iv = Buffer.from(ivBase64, 'base64');
  const buffer = Buffer.from(encryptedPayload, 'base64');

  // Extract the trailing 16-byte authentication tag
  const authTag = buffer.subarray(buffer.length - 16);
  const ciphertext = buffer.subarray(0, buffer.length - 16);

  const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(ciphertext, undefined, 'utf8');
  decrypted += decipher.final('utf8');

  return JSON.parse(decrypted) as T;
}