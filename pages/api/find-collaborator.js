import users from '../../models/users';
import categoria_colaboradores from '../../models/categoryCollaborators';
import Sequelize from 'sequelize-oracle';
import Oracledb from 'oracledb';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';  // Importe o módulo JWT


dotenv.config();

Oracledb.initOracleClient({
  libDir: 'C:\\Users\\aless\\Downloads\\instantclient-basic-windows.x64-21.12.0.0.0dbru\\instantclient_21_12',
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

      const user = await users.findOne({
        where: {
          ID_USUARIO: id
        },
      });

      const docs = await categoria_colaboradores.findAndCountAll({
        attributes: ['CATEGORIA'],
      });

      const getAllEnterprises = async () => {
        let offset = 0;
        let limit = 100;
        let allEnterprises = [];
      
        while (true) {
          const result = await users.findAll({
            limit,
            offset,
          });
      
          if (result.length === 0) {
            break; // Saia do loop se não houver mais resultados
          }
      
          allEnterprises = [...allEnterprises, ...result];
          offset += limit;
        }
      
        return allEnterprises;
      };
      
      const enterprise = await getAllEnterprises();
      
      // Filtrar os valores nulos e "N/A"
      const filteredEnterprises = enterprise
        .filter(user => user.NOME_TERCEIRO !== null && user.NOME_TERCEIRO !== 'N/A');
      
      // Obter valores distintos
      const uniqueEnterprises = [...new Set(filteredEnterprises.map(user => user.NOME_TERCEIRO))];

      if (!user) {
        return res.status(403).json({ error: 'Falha ao localizar o usuário.' });
      }

      res.status(200).json({ user, docs, uniqueEnterprises});
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
