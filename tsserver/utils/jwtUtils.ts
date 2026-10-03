import jwt, { SignOptions } from 'jsonwebtoken';

export interface JwtPayload {
  userId: number;
  email: string;
  role: 'Faculty' | 'Student' | 'Admin';
}

const JWT_SECRET = process.env['JWT_SECRET'] || 'fallback_secret_key';
const JWT_EXPIRES_IN = process.env['JWT_EXPIRES_IN'] || '8h';

export const generateToken = (payload: JwtPayload): string => {
  // Cast options as SignOptions to satisfy @types/jsonwebtoken
  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};