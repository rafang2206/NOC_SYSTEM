import { PROPERTIES } from "./config/properties";
import { MongoDatabase } from "./data/mongo";
import { MysqlDatabase } from "./data/mysql";
import { Server } from "./presentation/server";
import { LogModel } from "./data/mysql/models/LogModel";

(async() => {
    await main();
})()

async function main(){
    if(PROPERTIES){
        console.log('Env Load Successfully...');
    }
    await MongoDatabase.connect({mongoUrl: PROPERTIES.MONGO_URL, dbName: PROPERTIES.MONGO_DB_NAME});
    const db = await MysqlDatabase.connect({
        database: PROPERTIES.MYSQL_DB,
        port: PROPERTIES.MYSQL_PORT,
        username: PROPERTIES.MYSQL_USER, 
        password: PROPERTIES.MYSQL_PASSWORD
    });
    await initModels();
    db.sync();
    Server.start();
    console.log('Server Started...');
}

async function initModels(){
    LogModel.initialize(MysqlDatabase.db);
}