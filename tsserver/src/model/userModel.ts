import { executeQuery } from '../../utils/dbUtils';

export interface UserEntity {
  id: number;
  email: string;
  password_hash: string;
  role: 'Faculty' | 'Student' | 'Admin';
  created_at?: Date;
}

export interface RegisterUserInput {
  email: string;
  passwordHash: string;
  role?: 'Faculty' | 'Student' | 'Admin';
}

export class UserModel {
  // Check if email already exists
  static async findByEmail(email: string): Promise<UserEntity | null> {
    const query = `SELECT id, email, password_hash, role FROM users WHERE email = $1;`;
    const rows = await executeQuery<UserEntity>(query, [email]);
    return rows[0] || null;
  }

  // Create a new user record
  static async createUser(data: RegisterUserInput): Promise<Omit<UserEntity, 'password_hash'>> {
    const { email, passwordHash, role = 'Student' } = data;
    const query = `
      INSERT INTO users (email, password_hash, role)
      VALUES ($1, $2, $3)
      RETURNING id, email, role, created_at;
    `;
    const rows = await executeQuery<Omit<UserEntity, 'password_hash'>>(query, [
      email,
      passwordHash,
      role,
    ]);
    return rows[0];
  }
}