import connection from '../config/database.mjs';
import Sequelize from 'sequelize-oracle';

const categoria_colaboradores = connection.define(
  'CATEGORIA_COLABORADORES',
  {
    CATEGORIA: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    TIPO_DOCUMENTO: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    PERMISSAO: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'CATEGORIA_COLABORADORES',
    timestamps: false,
  }
);

export default categoria_colaboradores;
