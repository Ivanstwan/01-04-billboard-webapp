// middlewares/checkRefreshTokenInRedis.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import config from '@/config';
import redisClient from '@/services/redisClient';

interface RefreshToken {
  id: string;
}

const checkRefreshTokenInRedis = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies?.refresh_token;

    if (!refreshToken) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: 'Invalid refresh token',
      });
    }

    // Verify the JWT
    const jwtVerify = jwt.verify(refreshToken, config.jwtSecret) as RefreshToken;
    const { id } = jwtVerify;
    const checkTest = await redisClient.get(String(id));

    if (!checkTest)
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: 'Refresh token not found or expired',
      });

    if (checkTest === refreshToken) {
      //   // Token exists in Redis, proceed to the next middleware
      req.body.userId = id; // Pass the user ID to the next handler

      next();
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: 'Refresh token not found or expired',
      });
    }
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: 'Invalid refresh token / Internal server error',
    });
  }
};

export default checkRefreshTokenInRedis;
