import Sequelize from 'sequelize-oracle';
import Oraclebd from 'oracledb';
import dotenv from 'dotenv';

dotenv.config();

Oraclebd.initOracleClient({ libDir: '../../../opt/oracle/instantclient_19_16' });

const connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT || 'oracle', // Default to 'oracle' if DIALECT is not defined
});

export default connection;