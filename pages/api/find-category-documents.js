import categoria_documentos from '../../models/categoryDocuments';
import Sequelize from 'sequelize-oracle';
import Oracledb from 'oracledb';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

Oracledb.initOracleClient({
  libDir: 'C:\\Users\\aless\\Downloads\\instantclient-basic-windows.x64-21.12.0.0.0dbru\\instantclient_21_12',
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

      const docs = await categoria_documentos.findOne({
        where: {
          CATEGORIA: id
        },
      });

      if (!docs) {
        return res.status(403).json({ error: 'Falha ao localizar o usuário.' });
      }

      res.status(200).json({ docs });
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
