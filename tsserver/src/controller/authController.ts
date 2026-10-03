import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { executeQuery } from '../../utils/dbUtils';
import { generateToken } from '../../utils/jwtUtils';
import { UserModel } from '../model/userModel';

interface UserRecord {
  id: number;
  email: string;
  password_hash: string;
  role: 'Faculty' | 'Student' | 'Admin';
}

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    console.log('Login request received with body:', req.body); // Debugging log
    const { email, password } = req.body;
    console.log('Login attempt for email: %s', email); // Debugging log

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    // 1. Fetch user from PostgreSQL
    const query = `SELECT id, email, password_hash, role FROM users WHERE email = $1;`;
    const users = await executeQuery<UserRecord>(query, [email]);
    const user = users[0];

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // 2. Validate Password with bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // 3. Generate JWT Token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message,
    });
  }
};

export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password, role } = req.body;

    // 1. Basic Field Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.',
      });
    }

    // 2. Validate Role (Default to 'Student' if invalid or missing)
    const validRoles = ['Faculty', 'Student', 'Admin'];
    const userRole = validRoles.includes(role) ? role : 'Student';

    // 3. Check if user already exists
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'A user with this email address already exists.',
      });
    }

    // 4. Hash Password with bcrypt
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 5. Save to Database
    const newUser = await UserModel.createUser({
      email,
      passwordHash,
      role: userRole,
    });

    return res.status(201).json({
      success: true,
      message: 'User registered successfully. You can now log in.',
      data: newUser,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Registration failed due to server error.',
      error: error.message,
    });
  }
};