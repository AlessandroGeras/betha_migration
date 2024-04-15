import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Configuração da conexão com o banco de dados MySQL
const dbConfig = {
  host: 'localhost',
  user: 'root', // O usuário padrão do MySQL no XAMPP
  password: '', // Deixe em branco se você não definiu uma senha
  database: process.env.database, // Substitua pelo nome do seu banco de dados
};

// Função para testar a conexão com o banco de dados
export async function testDatabaseConnection() {
  try {
    // Criando uma conexão com o banco de dados usando a configuração
    const connection = await mysql.createConnection(dbConfig);
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    return connection; // Retornando a conexão
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    throw error; // Lançando o erro para ser capturado onde a função for chamada
  }
}
