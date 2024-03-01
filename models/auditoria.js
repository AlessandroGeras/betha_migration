import Sequelize from 'sequelize-oracle';
import connection from "../config/database.mjs";

const documento = connection.define(
    "AUDITORIA",
    {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        DIA_FIXO: {
            type: Sequelize.INTEGER, // ou outro tipo apropriado para sua chave primária
            allowNull: false, // Garanta que a coluna não aceite valores nulos
        },
    },
    {
        tableName: "AUDITORIA",
        timestamps: false,
    }
);

export default documento;
