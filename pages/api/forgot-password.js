import outsourceds from '../../models/outsourceds';
import Sequelize from 'sequelize-oracle';
import Oracledb from 'oracledb';
import dotenv from 'dotenv';

dotenv.config();

//Oracle Instant Client
Oracledb.initOracleClient({
  libDir: '../../instantclient_21_12',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Obtenha os dados do corpo da solicitação
    const { username, password } = req.body;
    console.log(req.body);

    let connection;

    try {
      // Estabeleça a conexão com o Oracle
      connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
        host: process.env.HOST,
        dialect: process.env.DIALECT || 'oracle',
      });

      const usuario = await outsourceds.findOne({
        where: {
          ID_USUARIO: username,
          ID_USUARIO_INTERNO: 'N', // Add this condition to check for "S"
        },
      });

      if (usuario) {
        // Usuário existe no banco de dados
        res.status(200).json({sucess:"Usuário encontrado"});

      } else {
        // Usuário não encontrado
        res.status(404).json({ error: 'Somente usuários autorizados ao portal gestão de terceiros podem recuperar senha.' });
      }
    } catch (error) {
      console.error('Erro ao consultar o banco de dados:', error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    } finally {
      // Feche a conexão após a execução
      if (connection) {
        await connection.close();
      }
    }
  } else {
    res.status(405).json({ error: 'Método não permitido.' });
  }
}
