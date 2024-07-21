import { DataTypes, Model, Sequelize } from "sequelize";
import { MysqlDatabase } from "../init";

export class LogModel extends Model {
    public id!: number;
    public level!: string;
    public message!: string;
    public createdAt!: Date;
    public origin!: string;

    // Método estático para inicializar el modelo
    static initialize(sequelize: Sequelize) {
        LogModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                level: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                message: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                createdAt: {
                    type: DataTypes.DATEONLY,
                    defaultValue: new Date(),
                },
                origin: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'LogModel',
            }
        );
    }
}
