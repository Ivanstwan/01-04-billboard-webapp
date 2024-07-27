import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import Logger from './loaders/logger';
import config from './config';

async function startServer() {
  const app = express();

  app.get('/status', (req, res) => {
    res.status(200).json({ status: 'on' });
  });

  // security config, for protection against some CSRF, XSS, and clickjacking
  app.use(helmet());

  // cors enabled
  app.use(cors());
  // no need to use body-parser library anymore, express already include body-parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app
    .listen(config.port, () => {
      Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
    })
    .on('error', err => {
      Logger.error(err);
      process.exit(1);
    });
}

startServer();
