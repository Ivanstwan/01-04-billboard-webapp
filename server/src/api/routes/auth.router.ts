import config from '@/config';
import pool from '@/database';
import { sendLinkToEmail } from '@/services/mailer';
import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { Logger } from 'winston';

import middlewares from '../middlewares';
import { checkEmailExist, createUser, getUserData } from '../queries/auth.queries';
import { CreateUserSchema, LoginSchema, RegisterSchema } from '../schema/auth.schema';
import { hashPassword } from '@/utils/utils-password';
import { generateAccessToken, generateRefreshToken } from '@/utils/utils-token';

const router = Router();

router.post('/register', middlewares.validateData(RegisterSchema), async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const result = await checkEmailExist(email);

    if (result.rows.length === 0) {
      const payload = {
        email: email,
      };
      const token = jwt.sign(payload, config.jwtSecret, {
        expiresIn: '30m',
      });

      // logic for sending email to user
      sendLinkToEmail(email, `http://localhost:3000/register/create?token=${token}`);

      return res.status(StatusCodes.OK).json({
        message: 'Registration link sent to email',
      });
    }

    return res.status(StatusCodes.CONFLICT).json({
      error: getReasonPhrase(StatusCodes.CONFLICT),
      message: 'Email already exist',
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    });
  }
});

type CustomJwtEmail = {
  email: string;
};

router.post(
  '/register/create-user',
  middlewares.validateData(CreateUserSchema),
  async (req: Request, res: Response) => {
    const { token, password } = req.body;

    try {
      let jwtDecoded;

      jwt.verify(token, config.jwtSecret, (err, decoded: CustomJwtEmail) => {
        if (err) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            message: 'Fail to create account, token expired',
          });
          throw Error;
        } else {
          jwtDecoded = decoded;
        }
      });

      const userEmail = jwtDecoded.email;

      const hashPwd = await hashPassword(password);
      const result = await createUser(userEmail, hashPwd);

      if (result.rowCount > 0) {
        return res.status(StatusCodes.OK).json({
          message: 'Account created',
        });
      }

      return res.status(StatusCodes.CONFLICT).json({
        error: getReasonPhrase(StatusCodes.CONFLICT),
        message: 'Fail to create account',
      });
    } catch (error) {
      if (!res.headersSent) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
          message: 'Fail to create account',
        });
      }
    }
  },
);

type UserDbResponse = {
  email: string;
  id: number;
  img: string | null;
  pwd: string;
  username: string | null;
};

router.post('/login', middlewares.validateData(LoginSchema), async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await checkEmailExist(email);

    if (result.rows.length === 1) {
      const userData: UserDbResponse = result.rows[0];
      const { email: userEmail, id: userId, pwd: userPwd, username: userUsername, img: userImage } = userData;
      const match = await bcrypt.compare(password, userPwd);

      if (match) {
        const accessToken = await generateAccessToken({
          email: userEmail,
          id: userId,
          username: userUsername,
          image: userImage,
        });

        const refreshToken = await generateRefreshToken({
          id: userId,
        });

        res.cookie('refresh_token', refreshToken, {
          httpOnly: true,
          // maxAge = 1 day (x1000 because milisecond)
          maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(StatusCodes.OK).json({
          message: 'Login successful',
          accessToken,
        });
      }

      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'Email / Password not match',
      });
    }

    return res.status(StatusCodes.NOT_FOUND).json({
      error: getReasonPhrase(StatusCodes.NOT_FOUND),
      message: 'Email not found',
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      message: 'Login failed',
    });
  }
  res.status(200).json({ route: 'auth' });
});

type RefreshToken = {
  id: number;
  exp: number;
  iat: number;
};

router.get('/refreshtoken', async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refresh_token;

    if (!refreshToken)
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: 'Invalid refresh token',
      });

    const jwtVerify = jwt.verify(refreshToken, config.jwtSecret) as RefreshToken;

    const { id } = jwtVerify;

    const result = await getUserData(id);

    if (result.rows.length === 1) {
      const { id, username, email, img } = result.rows[0];

      const accessToken = await generateAccessToken({
        email: email,
        id: id,
        username: username,
        image: img,
      });

      return res.status(StatusCodes.OK).json({
        message: 'Access extended',
        accessToken,
      });
    }

    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: 'No user data',
    });
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: 'Invalid refresh token / Internal server error',
    });
  }
});

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ route: 'auth' });
});

export default router;
