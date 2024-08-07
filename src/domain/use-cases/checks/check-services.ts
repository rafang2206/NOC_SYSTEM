import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

const ORIGIN_FILE ='use cases check-services'

interface IChechService {
    execute: (value: string) => Promise<boolean>
}

type SuccessCallback = (() => void) | null;
type ErrorCallback = ((error: string) => void) | null;

export class CheckService implements IChechService {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) {}

    async execute(url: string): Promise<boolean>{
        try {
            const req = await fetch(url);
            if(!req.ok){
                throw new Error(`Error on check service ${url}`);
            }
            const log = new LogEntity({
                level: LogSeverityLevel.low, 
                message: `Service ${url} worker`,
                origin: ORIGIN_FILE
            });
            this.logRepository.saveLog(log);
            if(this?.successCallback) this.successCallback();
            return true;
        } catch (error) {
            const errorMessage = `${error}`;
            const log = new LogEntity({
                level: LogSeverityLevel.high, 
                message: errorMessage,
                origin: ORIGIN_FILE
            });
            this.logRepository.saveLog(log);
            if(this.errorCallback) this.errorCallback(errorMessage);
            return false;   
        }
    }
}