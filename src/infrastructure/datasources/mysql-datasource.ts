import { LogModel } from "../../data/mysql/models/LogModel";
import { LogDataSource } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class MysqlDataSource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {
        await LogModel.create({
            ...log
        });
    }
    async getLogs(levelLog: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.findAll({
            where: {
                level: levelLog
            }
        })
        return logs.map(log => LogEntity.fromObject(log));
    }
    
}