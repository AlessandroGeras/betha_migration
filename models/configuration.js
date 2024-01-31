import Sequelize from 'sequelize-oracle';
import connection from "../config/database.mjs";

const documento = connection.define(
  "CONFIGURACAO",
  {
    NOTIFICACAO: {
      type: Sequelize.INTEGER, // ou outro tipo apropriado para sua chave primária
      allowNull: false, // Garanta que a coluna não aceite valores nulos
    },   
  },
  {
    tableName: "CONFIGURACAO",
    timestamps: false,
  }
);

export default documento;
