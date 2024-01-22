import connection from '../config/database.mjs';
import Sequelize from 'sequelize-oracle';

const categoria_documentos = connection.define(
  'CATEGORIA_DOCUMENTOS',
  {
    CATEGORIA: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    NUMERACAO: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    FORMATO_VENCIMENTO: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    AUDITORIA: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    NOTIFICACAO: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'CATEGORIA_DOCUMENTOS',
    timestamps: false,   
  }
);

export default categoria_documentos;
