import Sequelize from 'sequelize-oracle';
import connection from "../config/database.mjs";

const documento = connection.define(
  "DOCUMENTOS",
  {
    STATUS: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    TIPO_DOCUMENTO: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    TERCEIRO: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    COLABORADOR: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "DOCUMENTOS",
    timestamps: false,
  }
);

export default documento;
