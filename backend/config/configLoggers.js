import path from 'path';
import morgan from 'morgan';
import rfs from 'rotating-file-stream';
import winston from 'winston';

const configLogs = (app) => {
    const __dirname = path.resolve()
    var accessLogStream = rfs.createStream('access.log', {
        interval: '1d', // rotate daily
        path: path.join(__dirname, 'public' ,'log')
    })   
    app.use(morgan('combined', { stream: accessLogStream }));
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service', time: new Date() },
    transports: [
        // - Write all logs with level `error` and below to `error.log`
        new winston.transports.File({ filename: 'public/log/error.log', level: 'error' }),
        // - Write all logs with level `info` and below to `combined.log
        new winston.transports.File({ filename: 'public/log/combined.log' })
    ]
});

if(process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
}

export {configLogs, logger};