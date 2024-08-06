import config from '@/config';
import jwt from 'jsonwebtoken';

// Function to generate Access Token
const generateAccessToken = async (payload: Record<string, any>): Promise<string> => {
  const token = await jwt.sign(payload, config.jwtSecret, {
    expiresIn: '10m',
  });
  return token;
};

const generateRefreshToken = async (payload: Record<string, any>): Promise<string> => {
  const token = await jwt.sign(payload, config.jwtSecret, {
    expiresIn: '1d',
  });
  return token;
};

export { generateAccessToken, generateRefreshToken };
