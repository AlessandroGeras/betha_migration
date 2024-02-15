import Sequelize from 'sequelize-oracle';
import connection from "../config/database.mjs";

const documento = connection.define(
  "DOCUMENTOS",
  {
    ID_DOCUMENTO: {
      type: Sequelize.INTEGER, // ou outro tipo apropriado para sua chave primária
      primaryKey: true,
      autoIncrement: true, // Defina como true se deseja que seja autoincrementável
      allowNull: false, // Garanta que a coluna não aceite valores nulos
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
    VENCIMENTO: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    NOTIFICACAO: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    DOCUMENTO: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    ANEXO: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    FORMATO_VENCIMENTO: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    USUARIO_INCLUSAO: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    USUARIO_ANALISE: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    DATA_INCLUSAO: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    DATA_ANALISE: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    MOTIVO: {
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
