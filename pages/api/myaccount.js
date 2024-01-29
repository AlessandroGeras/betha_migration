import users from '../../models/users';
import Sequelize from 'sequelize-oracle';
import Oracledb from 'oracledb';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';  // Importe o módulo JWT


dotenv.config();

Oracledb.initOracleClient({
  libDir: '../../instantclient_21_12',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      nome,
      tipo_documento,
      token
    } = req.body;
    let connection;

    try {
      connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
        host: process.env.HOST,
        dialect: process.env.DIALECT || 'oracle',
      });

      const user = await users.findOne({
        where: {
          ID_USUARIO: nome
        },
      });


      if (user) {
        res.status(200).json({ user });
      } else {
        res.status(403).json({ error: 'Usuário não tem permissão para acessar.' });
      }

    } catch (error) {
      console.error('Falha ao consultar o banco de dados:', error);
      res.status(500).json({ error: 'Erro ao consultar o banco de dados:' + error });
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }
}
