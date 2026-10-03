import { Request, Response, NextFunction } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '../../utils/jwtUtils';

type UserRole = 'Faculty' | 'Student' | 'Admin';

type AuthUser = JwtPayload & {
  role: UserRole;
};

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

// 1. Authenticate JWT Token
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Attach decoded token payload to req.user
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token.',
    });
  }
};

// 2. Authorize Specific Roles (RBAC)
export const authorizeRoles = (...allowedRoles: Array<'Faculty' | 'Student' | 'Admin'>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthenticated user.' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden. Role '${req.user.role}' is not authorized to perform this action.`,
      });
    }

    next();
  };
};