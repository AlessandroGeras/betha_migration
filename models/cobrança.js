import Sequelize from 'sequelize-oracle';
import connection from "../config/database.mjs";

const cobrança = connection.define(
  "EVENTOS_COBRANCA",
  {
    ULTIMA_COBRANCA: {
        type: Sequelize.DATE,
        allowNull: false,
      },
  },
  {
    tableName: "EVENTOS_COBRANCA",
    timestamps: false,
  }
);

export default cobrança;
