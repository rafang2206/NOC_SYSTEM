
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
} 

export interface ILogOptions {
    level : LogSeverityLevel;
    message: string;
    createdAt?: Date;
    origin: string;
}

export class LogEntity {
    public level : LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options: ILogOptions) {
        const { level, message, createdAt = new Date(), origin } = options;
        this.level = level;
        this.message = message;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    static fromJson(json: string) : LogEntity{
        const { level, message, createdAt, origin } =  JSON.parse(json);
        const log = new LogEntity({
            level, 
            message, 
            createdAt, 
            origin
        });
        return log;
    }

    static fromObject(object: { [key: string]: any }) : LogEntity {
        const { level, message, createdAt, origin  } = object;
        return new LogEntity({
            level,
            message,
            createdAt,
            origin
        })
    }
}