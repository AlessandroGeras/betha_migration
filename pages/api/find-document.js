import documents from '../../models/documents';
import configuration from '../../models/configuration';
import Sequelize from 'sequelize-oracle';
import Oracledb from 'oracledb';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

Oracledb.initOracleClient({
  libDir: '../../instantclient_21_12',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, token } = req.body;
    let connection;

    if (!token) {
      return res.redirect(302, '/login');
    }

    try {
      jwt.verify(token, process.env.SECRET);

      connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
        host: process.env.HOST,
        dialect: process.env.DIALECT || 'oracle',
      });

      const docs = await documents.findOne({
        where: {
          ID_DOCUMENTO: id
        },
      });

      const notificacao = await configuration.findOne({
        attributes: ['NOTIFICACAO'],
        order: [['NOTIFICACAO', 'DESC']], // Ordenar em ordem decrescente pela coluna ULTIMA_COBRANÇA
      });

      if (!docs) {
        return res.status(403).json({ error: 'Falha ao localizar o documento.' });
      }

      res.status(200).json({ docs,notificacao });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        console.error('Token expirado:', error);
        res.status(401).json({ success: false, message: 'Token expirado' });
      } else {
        console.error('Falha ao consultar o banco de dados:', error);
        res.status(500).json({ error: 'Erro ao consultar o banco de dados:' + error });
      }
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }
}
