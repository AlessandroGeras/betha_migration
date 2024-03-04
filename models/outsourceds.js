import Sequelize from 'sequelize-oracle';
import connection from "../config/database.mjs";

const web_terceiro = connection.define(
  "WEB_TERCEIRO",
  {
    ID_USUARIO: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    NM_USUARIO: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ST_EMAIL: {
      type: Sequelize.STRING,
      allowNull: true,
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
    CNPJ: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ENDEREÇO: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    CIDADE: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    UF: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    TELEFONE: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    NOME_TERCEIRO: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    STATUS: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    OBS_STATUS: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    CATEGORIA_PRINCIPAL: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    FUNCAO: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    COLABORADOR_TERCEIRO: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    CPF: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    PERIODO_INICIAL: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    PERIODO_FINAL: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "WEB_TERCEIRO",
    timestamps: false,
  }
);

export default web_terceiro;
