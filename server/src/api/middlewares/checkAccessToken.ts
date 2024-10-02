import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '@/config';
import { StatusCodes } from 'http-status-codes';

type User = {
  email: string;
  id: number;
  username: string | null;
  image: string | null;
  iat: number;
  exp: number;
};

// Extend the Request interface directly
export interface AuthRequest extends Request {
  decoded?: User;
}

// Middleware to check for valid access token
const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers?.authorization;
  if (!authHeader)
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: 'No access token found.',
    });

  try {
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: 'Token not found in authorization header.',
      });
    }

    const decoded = jwt.verify(token, config.jwtSecret) as User;

    // Adding access token back, because needed in auth provider (client side)
    req.decoded = { ...decoded };
    next(); // Token is valid, proceed to the next middleware or route
  } catch (error) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED); // Send 401 if token is invalid
  }
};

export default authenticateToken;
