import config from '@/config';
import winston from 'winston';
import expressWinston from 'express-winston';

let transports = [];
if (process.env.NODE_ENV !== 'development') {
  transports = [new winston.transports.Console()];
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.timestamp(), winston.format.cli(), winston.format.splat()),
    }),
    new winston.transports.File({
      level: 'info',
      filename: 'log.info.log',
    }),
    new winston.transports.File({
      level: 'warn',
      filename: 'log.warn.log',
    }),
    new winston.transports.File({
      level: 'error',
      filename: 'log.error.log',
    }),
  );
}

const LoggerInstance = expressWinston.logger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(winston.format.timestamp(), winston.format.json(), winston.format.colorize()),
  // meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  // msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  // expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  // colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  // ignoreRoute: function (req, res) {
  //     return false;
  // }, // optional: allows to skip some log messages based on request and/or response
});

export default LoggerInstance;
