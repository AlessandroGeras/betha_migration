import connection from '../config/database.mjs';
import Sequelize from 'sequelize-oracle';

const categoria_colaboradores = connection.define(
  'CATEGORIA_COLABORADORES',
  {
    CATEGORIA: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'CATEGORIA_COLABORADORES',
    timestamps: false,   
  }
);

export default categoria_colaboradores;
