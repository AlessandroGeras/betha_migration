import Sequelize, { DataTypes } from 'sequelize-oracle'; // Importe DataTypes junto com Sequelize
import connection from "../config/database.mjs";

const documento = connection.define(
  "CONFIGURACAO",
  {
    NOTIFICACAO: {
      type: Sequelize.INTEGER,
      primaryKey: true, // Definindo a coluna NOTIFICACAO como a chave primária
      allowNull: false,
    },   
    CREATED_AT: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "CONFIGURACAO",
    timestamps: false,
  }
);

export default documento;
