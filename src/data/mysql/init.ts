import { Sequelize } from "sequelize";

interface IConnectionDatabaseOptions {
    database: string;
    username: string;
    password: string;
    port: number;
}

export class MysqlDatabase {
    static db: Sequelize;
    static async connect(option: IConnectionDatabaseOptions): Promise<Sequelize>{
        const { database, username, password, port } = option;
        try {
            const sequelize = new Sequelize(database, username, password, {
                host: 'localhost',
                dialect: 'mysql',
                port: port,
                define: {
                    timestamps: false,
                },
                logging: false,
            });
            sequelize.authenticate();
            console.log('Sequelize authenticate successfully');
            
            this.db = sequelize;

            return sequelize;
        } catch (error) {
            console.log('Connection Sequelize Error');
            throw error;
        }
    }
}