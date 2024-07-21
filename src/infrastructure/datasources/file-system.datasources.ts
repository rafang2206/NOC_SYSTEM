import fs from "node:fs";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogDataSource } from "../../domain/datasources/log.datasources";


export class FileSystemDataSource implements LogDataSource {

    private readonly logPath = 'logs/';
    private readonly logLowPath = 'logs/logs-low.log';
    private readonly logMediumPath = 'logs/logs-medium.log';
    private readonly logHighPath = 'logs/logs-high.log';

    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles(){
        if(!fs.existsSync(this.logPath)){
            fs.mkdirSync(this.logPath);
        }
        [
            this.logLowPath,
            this.logMediumPath,
            this.logHighPath
        ].forEach(path => {
            if( !fs.existsSync(path) ){
                fs.writeFileSync(path, '');
            }
        })
    }

    private getLogsFromFile(path: string): LogEntity[]{
        const content = fs.readFileSync(path, 'utf-8');
        const logs = content.split('\n').map(log => LogEntity.fromJson(log));
        return logs;
    }

    async saveLog(log: LogEntity): Promise<void> {
        const lowsPath = {
            [LogSeverityLevel.low]: this.logLowPath,
            [LogSeverityLevel.medium]: this.logMediumPath,
            [LogSeverityLevel.high]: this.logHighPath
        }
        const logData = `${JSON.stringify(log)}\n`;
        fs.appendFileSync(lowsPath[log.level], logData);
    }

    async getLogs(levelLog: LogSeverityLevel): Promise<LogEntity[]> {
        const lowsPath = {
            [LogSeverityLevel.low]: this.logLowPath,
            [LogSeverityLevel.medium]: this.logMediumPath,
            [LogSeverityLevel.high]: this.logHighPath
        }
        const logs = this.getLogsFromFile(lowsPath[levelLog]);
        return logs;
    }

}