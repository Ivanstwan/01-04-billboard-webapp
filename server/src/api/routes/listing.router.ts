import pool from '@/database';
import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Logger } from 'winston';

import middlewares from '../middlewares';
import { MapBoundSchema } from '../schema/listing.schema';

const router = Router();

router.post(
    '/',
    middlewares.validateData(MapBoundSchema),
    async (req: Request, res: Response) => {
        res.status(StatusCodes.OK).json({
            message: 'Map Bounds OK',
        });
    }
);

router.get('/', (req: Request, res: Response) => {
    pool.query('SELECT * FROM actor;', (error, results) => {
        if (error) console.log(error, '[error]');
    });
    res.status(200).json({ route: 'listing' });
});

export default router;
