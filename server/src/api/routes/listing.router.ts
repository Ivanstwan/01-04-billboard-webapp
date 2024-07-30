import pool from '@/database';
import { Router, Request, Response, NextFunction } from 'express';
import { Logger } from 'winston';

import middlewares from '../middlewares';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    pool.query('SELECT * FROM actor;', (error, results) => {
        if (error) console.log(error, '[error]');
    });
    res.status(200).json({ route: 'listing' });
});

export default router;
