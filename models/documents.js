import Sequelize from 'sequelize-oracle';
import connection from "../config/database.mjs";

const documento = connection.define(
  "DOCUMENTOS",
  {
    ID_DOCUMENTO: {
      type: Sequelize.INTEGER, // ou outro tipo apropriado para sua chave primária
      primaryKey: true,
      autoIncrement: true, // Defina como true se deseja que seja autoincrementável
    },
    STATUS: {
      type: Sequelize.STRING,
      allowNull: false,
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
    VENCIMENTO: {
      type: Sequelize.DATE,
      allowNull: true,
    },    
  },
  {
    tableName: "DOCUMENTOS",
    timestamps: false,
  }
);

export default documento;
