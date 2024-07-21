import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prisma = new PrismaClient();

const enumLevel = {
    high: SeverityLevel.HIGH,
    medium: SeverityLevel.MEDIUM,
    low: SeverityLevel.LOW
}

export class PostgresDataSource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {
        const level = enumLevel[log.level];
        await prisma.logModel.create({
            data: {
                ...log,
                level
            }
        });
    }
    async getLogs(levelLog: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await prisma.logModel.findMany({
            where: {
                level: enumLevel[levelLog]
            }
        })
        return logs.map(log => LogEntity.fromObject(log));
    }
    
}