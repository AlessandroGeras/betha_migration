import connection from '../config/database.mjs';
import Sequelize from 'sequelize-oracle';

const categoria_documentos = connection.define(
  'CATEGORIA_DOCUMENTOS',
  {
    CATEGORIA: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'CATEGORIA_DOCUMENTOS',
    timestamps: false,   
  }
);

export default categoria_documentos;
