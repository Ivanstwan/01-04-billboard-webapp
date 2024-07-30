import { sendLinkToEmail } from '@/services/mailer';
import { Router, Request, Response, NextFunction } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { Logger } from 'winston';

import middlewares from '../middlewares';
import { checkEmailExist } from '../queries/auth.queries';
import { RegisterSchema } from '../schema/auth.schema';

const router = Router();

router.post(
    '/register',
    middlewares.validateData(RegisterSchema),
    async (req: Request, res: Response) => {
        const { email } = req.body;
        try {
            const result = await checkEmailExist(email);

            if (result.rows.length === 0) {
                
                // logic for sending email to user
                sendLinkToEmail(email, 'google.com');

                res.status(StatusCodes.OK).json({
                    message: 'Registration link sent to email',
                });
            }

            res.status(StatusCodes.CONFLICT).json({
                error: getReasonPhrase(StatusCodes.CONFLICT),
                message: 'Email already exist',
            });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            });
        }
    }
);

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({ route: 'auth' });
});

export default router;
