import { Router } from 'express';
import auth from './routes/auth.router';
import listing from './routes/listing.router';

const routers = Router();

routers.use('/auth', auth);
routers.use('/listing', listing);

export default routers;
