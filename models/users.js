import Sequelize from 'sequelize-oracle';
import connection from "../config/database.mjs";

const web_usuario = connection.define(
  "WEB_USUARIO",
  {
    ID_USUARIO: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    NM_USUARIO: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ID_CAD_PRODUTO: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    ID_CAD_ORCAMENTO: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    ST_EMAIL: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ID_USUARIO_INTERNO: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "WEB_USUARIO",
    timestamps: false,
    //para tabelas
  }
);

// Exporte o modelo usando a sintaxe ESM
export default web_usuario;
