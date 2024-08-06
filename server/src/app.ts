import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import config from './config';
import routers from './api';
import LoggerInstance from './loaders/logger';
import { logger } from 'express-winston';

async function startServer() {
  const app = express();

  app.get('/status', (req, res) => {
    res.status(200).json({ on: true });
  });

  // security config, for protection against some CSRF, XSS, and clickjacking
  app.use(helmet());

  app.use(cors());

  // parse cookie
  app.use(cookieParser());
  // no need to use body-parser library anymore, express already include body-parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // winston logger
  app.use(LoggerInstance);

  // all the api routers
  app.use('/api', routers);

  app
    .listen(config.port, () => {
      console.log(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
    })
    .on('error', err => {
      console.log(err);
      process.exit(1);
    });
}

startServer();
