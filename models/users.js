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
    ID_USUARIO_MEGA: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ID_ADM_RESERVA_SALA: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ID_ADM_VENDA: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ID_ADM_CONTRATO: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ID_GER_VENDA: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ID_ADM_SALA: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ID_ADM_BENS_TERCEIRO: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ID_CON_BENS_TERCEIRO: {
      type: Sequelize.STRING,
      allowNull: false,
    },    
    ID_RECEBE_MATERIAL_OBRA: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    ID_VISUALIZAR_NOTAS: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    ID_CON_GESTAO_TERCEIROS: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    ID_ADM_GESTAO_TERCEIROS: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "WEB_USUARIO",
    timestamps: false,
  }
);

export default web_usuario;
