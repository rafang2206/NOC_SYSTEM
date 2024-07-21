import 'dotenv/config';
import * as env from 'env-var';

export const PROPERTIES = {
    PORT: env.get('PORT').required().asPortNumber(),
    MONGO_URL: env.get('MONGO_URL').required().asString(),
    MONGO_DB_NAME: env.get('MONGO_DB_NAME').required().asString(),
    MONGO_USER: env.get('MONGO_USER').required().asString(),
    MONGO_PASS: env.get('MONGO_PASS').required().asString(),
    MYSQL_DB: env.get('MYSQL_DB').required().asString(),
    MYSQL_PORT: env.get('MYSQL_PORT').required().asPortNumber(),
    MYSQL_USER: env.get('MYSQL_USER').required().asString(),
    MYSQL_PASSWORD: env.get('MYSQL_PASSWORD').required().asString(),
}