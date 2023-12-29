import connection from '../config/database.mjs';
import Sequelize from 'sequelize-oracle';

const categoria_terceiros = connection.define(
  'CATEGORIA_TERCEIROS',
  {
    CATEGORIA: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'CATEGORIA_TERCEIROS',
    timestamps: false,   
  }
);

export default categoria_terceiros;
