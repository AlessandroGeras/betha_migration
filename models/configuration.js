import Sequelize from 'sequelize-oracle';
import connection from "../config/database.mjs";

const documento = connection.define(
  "CONFIGURACAO",
  {
    NOTIFICACAO: {
      type: Sequelize.INTEGER,
      primaryKey: true, // Definindo a coluna NOTIFICACAO como a chave primária
      allowNull: false,
    },   
    createdAt: {
      type: DataTypes.TIMESTAMP,
      allowNull: false,
    },
  },
  {
    tableName: "CONFIGURACAO",
    timestamps: false,
  }
);

export default documento;
