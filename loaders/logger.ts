import winston from 'winston'

export class Logger {
    static instance : winston.Logger | Console

    static Loader() : void {
        const loggerFormat = winston.format.combine(
            winston.format.cli(),
            winston.format.splat(),
            winston.format.errors({ stack: true })
        )

        
        Logger.instance = winston.createLogger({
            format: loggerFormat,
            level: 'info',
            defaultMeta: { service: 'user-service' },
            transports: [
                new winston.transports.Console
            ]
        })
    }
}