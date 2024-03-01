import Sequelize, { DataTypes } from 'sequelize-oracle'; // Importe DataTypes junto com Sequelize
import connection from "../config/database.mjs";

const documento = connection.define(
  "CONFIGURACAO",
  {
    ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,  
    },
    NOTIFICACAO: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "CONFIGURACAO",
    timestamps: false,
  }
);

export default documento;
