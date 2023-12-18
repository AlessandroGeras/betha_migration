import Sequelize from 'sequelize-oracle';
import Oraclebd from 'oracledb';
import dotenv from 'dotenv';

dotenv.config();

Oraclebd.initOracleClient({ libDir: 'C:\\Users\\aless\\Downloads\\instantclient-basic-windows.x64-21.12.0.0.0dbru\\instantclient_21_12' });

const connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT || 'oracle',
});

// Função para testar a conexão
async function testarConexao() {
  try {
    // Testar a conexão
    await connection.authenticate();
    console.log('Conexão bem-sucedida.');
  } catch (erro) {
    console.error('Erro ao conectar:', erro);
  } finally {
    // Feche a conexão após o teste (opcional, dependendo do seu caso)
    await connection.close();
  }
}

// Chamar a função de teste
testarConexao();
