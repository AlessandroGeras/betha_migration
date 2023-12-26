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
    DS_TOKEN_VALIDACAO: {
      type: Sequelize.STRING,
    },
    DS_SENHA: {
      type: Sequelize.STRING,
    },
    ID_ADM_GESTAO_TERCEIROS: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    CNPJ: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ENDEREÇO: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    CIDADE: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    UF: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    TELEFONE: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    NOME_TERCEIRO: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    STATUS: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "WEB_USUARIO",
    timestamps: false,
  }
);


export default web_usuario;
