import Sequelize from 'sequelize-oracle';
import Oraclebd from 'oracledb';
import dotenv from 'dotenv';

dotenv.config();

Oracledb.initOracleClient( {libdir: 'C:\\app\\instantclient_19_64Bits'} )

const connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT || 'oracle', // Default to 'oracle' if DIALECT is not defined
});

export default connection;