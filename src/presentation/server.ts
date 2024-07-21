import { CheckServiceMultiple } from "../domain/use-cases/checks/check-services-multiple";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasources";
import { MongoDataSource } from "../infrastructure/datasources/mongo-datasource";
import { MysqlDataSource } from "../infrastructure/datasources/mysql-datasource";
import { PostgresDataSource } from "../infrastructure/datasources/postgres-datasorce";
import { LogRepositoryImpl } from "../infrastructure/repository/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
);
const mongoLogRepository = new LogRepositoryImpl(
    new MongoDataSource()
);
const postgresLogRepository = new LogRepositoryImpl(
    new PostgresDataSource()
);
const mysqlLogRepository = new LogRepositoryImpl(
    new MysqlDataSource()
);

export class Server {
    public static start(){
        const url = 'https://google.com'
        CronService.createJob(
            '*/5 * * * * *',
           () => new CheckServiceMultiple(
                [
                    fileSystemLogRepository, 
                    mongoLogRepository, 
                    postgresLogRepository, 
                    mysqlLogRepository
                ],
                () => console.log('Log entity save'), 
                () => console.log('Log entity Failed'), 
           ).execute(url)
        );
    }
}