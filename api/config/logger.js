const winston = require('winston');

exports.Winstonlogger = new winston.Logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: process.env.LOG_FILE }),
  ],
});
