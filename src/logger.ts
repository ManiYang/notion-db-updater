import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
    level: 'info',
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize({ all: true }),
                format.timestamp({ format: 'MM-DD HH:mm:ss.SSS'}),
                format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
            )
        }),
        new transports.File({
            filename: 'logs/log',
            maxsize: 102400,
            maxFiles: 20,
            format: format.combine(
                format.timestamp({ format: 'MM-DD HH:mm:ss.SSS'}),
                format.json()
            )
        }),
    ],
    exceptionHandlers: [
        new transports.File({
            filename: 'logs/exceptions',
            maxsize: 102400,
            maxFiles: 20,
            format: format.combine(
                format.timestamp({ format: 'MM-DD HH:mm:ss.SSS'}),
                format.json()
            )
        })
    ],
    rejectionHandlers: [
        new transports.File({
            filename: 'logs/rejections',
            maxsize: 102400,
            maxFiles: 20,
            format: format.combine(
                format.timestamp({ format: 'MM-DD HH:mm:ss.SSS'}),
                format.json()
            )
        })
    ]
});
