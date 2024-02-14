import Sequelize from 'sequelize-oracle';
import connection from "../config/database.mjs";

const nf = connection.define(
  "WEB_NOTA_FISCAL_MEDICOES_OLD_09022024",
  {
    ORG_IN_CODIGO: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    FIL_IN_CODIGO: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    CTO_IN_CODIGO: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    CTO_CH_STATUS: {
      type: Sequelize.CHAR(1),
    },
    CTO_DT_INICIO: {
      type: Sequelize.DATE,
    },
    CTO_DT_FINAL: {
      type: Sequelize.DATE,
    },
    AGN_IN_CODIGO: {
      type: Sequelize.INTEGER,
    },
    AGN_ST_NOME: {
      type: Sequelize.STRING(100),
    },
    AGN_ST_CGC: {
      type: Sequelize.CHAR(18),
    },
    PRO_IN_REDUZIDO: {
      type: Sequelize.INTEGER,
    },
    PRO_ST_DESCRICAO: {
      type: Sequelize.STRING(100),
    },
    CTO_VL_CONTRATO: {
      type: Sequelize.DECIMAL,
    },
    CTO_VL_SALDO_CONTRATO: {
      type: Sequelize.DECIMAL,
    },
    CTO_BO_LIBERADOAPPROVO: {
      type: Sequelize.STRING(1),
    },
    MED_IN_CODIGO: {
      type: Sequelize.BIGINT,
    },
    MED_IN_NROFORMULARIO: {
      type: Sequelize.INTEGER,
    },
    MED_DT_MEDICAO: {
      type: Sequelize.DATE,
    },
    MED_DT_PAGAMENTO: {
      type: Sequelize.DATE,
    },
    MED_CH_SITUACAO: {
      type: Sequelize.CHAR(1),
    },
    NF_ST_NOTA: {
      type: Sequelize.STRING(20),
    },
    NF_ST_SERIE: {
      type: Sequelize.STRING(5),
    },
    NF_DT_EMISSAO: {
      type: Sequelize.DATE,
    },
    NF_DT_ENTRADA: {
      type: Sequelize.DATE,
    },
    NF_RE_VALOR: {
      type: Sequelize.DECIMAL(22, 8),
    },
    SITUACAO: {
      type: Sequelize.STRING(6),
    },
  },
  {
    tableName: "WEB_NOTA_FISCAL_MEDICOES_OLD_09022024",
    timestamps: false,
  }
);

export default nf;
