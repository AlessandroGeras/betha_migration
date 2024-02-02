import outsourceds from '../../models/outsourceds';
import Sequelize from 'sequelize-oracle';
import Oracledb from 'oracledb';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';  // Importe o módulo JWT


dotenv.config();

Oracledb.initOracleClient( {libdir: 'C:\\app\\instantclient_19_64Bits'} )

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      id,
      tipo_documento,
      nome_terceiro,
      token
    } = req.body;
    let connection;

    if (!token) {
      return res.redirect(302, '/login'); // Redireciona para a página de login
    }

    try {
      connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
        host: process.env.HOST,
        dialect: process.env.DIALECT || 'oracle',
      });  

      const docs = await outsourceds.findAndCountAll({
        attributes: ['NOME_TERCEIRO'],
      });

      const getAllEnterprises = async () => {
        let offset = 0;
        let limit = 100;
        let allEnterprises = [];

        while (true) {
          const result = await outsourceds.findAll({
            where: {NOME_TERCEIRO: nome_terceiro},
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
        .filter(outsourceds => outsourceds.NOME_TERCEIRO !== null && outsourceds.NOME_TERCEIRO !== 'N/A');

      // Obter valores distintos
      const uniqueEnterprises = [...new Set(filteredEnterprises.map(outsourceds => outsourceds.NOME_TERCEIRO))];

      if (!uniqueEnterprises) {
        return res.status(403).json({ error: 'Falha ao localizar colaboradores.' });
      }

      res.status(200).json({ outsourceds, docs, uniqueEnterprises });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        console.error('Token expirado:', error);
        res.status(401).json({ success: false, message: 'Token expirado' });
      }
      else {
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
