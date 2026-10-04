import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  // Key must be exactly 32 bytes (256 bits) for AES-256.
  // In a production environment, derive this key dynamically or via exchange protocol.
  private readonly SECRET_KEY_STRING = '12345678901234567890123456789012';

  /**
   * Imports the secret key string into a CryptoKey object usable by Web Crypto API
   */
  private async getCryptoKey(): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(this.SECRET_KEY_STRING);
    
    return await window.crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'AES-GCM' },
      false,
      ['encrypt', 'decrypt']
    );
  }

  /**
   * Encrypts any data payload (Object or String) using AES-256-GCM
   * @param data Data payload to encrypt
   * @returns Base64 encoded payload and initialization vector (IV)
   */
  async encrypt(data: any): Promise<{ payload: string; iv: string }> {
    const key = await this.getCryptoKey();
    
    // Generate a fresh, random 12-byte IV for every encryption operation
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    
    const jsonString = typeof data === 'string' ? data : JSON.stringify(data);
    const plaintext = new TextEncoder().encode(jsonString);

    const encryptedBuffer = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      plaintext
    );

    return {
      payload: btoa(String.fromCharCode(...new Uint8Array(encryptedBuffer))),
      iv: btoa(String.fromCharCode(...iv))
    };
  }

  /**
   * Decrypts a Base64 encoded AES-256-GCM encrypted payload back to JavaScript object
   * @param encryptedPayload Base64 encoded ciphertext (includes authentication tag appended)
   * @param ivBase64 Base64 encoded initialization vector
   * @returns Parsed JSON object/data
   */
  async decrypt(encryptedPayload: string, ivBase64: string): Promise<any> {
    const key = await this.getCryptoKey();
    
    const ciphertext = Uint8Array.from(atob(encryptedPayload), c => c.charCodeAt(0));
    const iv = Uint8Array.from(atob(ivBase64), c => c.charCodeAt(0));

    const decryptedBuffer = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      ciphertext
    );

    const jsonString = new TextDecoder().decode(decryptedBuffer);
    return JSON.parse(jsonString);
  }
}