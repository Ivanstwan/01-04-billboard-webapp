import { Router, Request, Response, NextFunction } from 'express';
import { Logger } from 'winston';

import middlewares from '../middlewares';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({ route: 'auth' });
});

export default router;
