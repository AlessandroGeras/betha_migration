import outsourceds from '../../models/outsourceds';
import categoria_terceiros from '../../models/categoryOutsourced';
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
      id,
      tipo_documento,
      token
    } = req.body;
    let connection;

    try {
      connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
        host: process.env.HOST,
        dialect: process.env.DIALECT || 'oracle',
      });

      const user = await outsourceds.findOne({
        where: {
          ID_USUARIO: id
        },
      });

      const docs = await categoria_terceiros.findAndCountAll({
        attributes: ['CATEGORIA'],        
      });

      if(!user){
        return res.status(403).json({ error: 'Falha ao localizar o usuário.' });
      }

      res.status(200).json({ user, docs });
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
