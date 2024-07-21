import { LogDataSource } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";


export class LogRepositoryImpl implements LogRepository {
    constructor(
        private readonly logDataSource: LogDataSource
    ){}
    saveLog(log: LogEntity): Promise<void> {
        return this.logDataSource.saveLog(log);
    }
    getLogs(levelLog: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDataSource.getLogs(levelLog);
    }
}