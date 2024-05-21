require('dotenv').config();

const winston = require('winston');

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        winston.format.colorize(),
        winston.format.simple(),
        myFormat
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.Console()
    ]
});


module.exports = logger;