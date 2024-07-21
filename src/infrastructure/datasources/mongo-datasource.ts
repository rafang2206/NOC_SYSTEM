import { LogModel } from "../../data/mongo";
import { LogDataSource } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class MongoDataSource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {
        await LogModel.create(log);
    }
    async getLogs(levelLog: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({
            level: levelLog
        });
        return logs.map(log => LogEntity.fromObject(log));
    }
    
}