import documents from '../../models/documents';
import Sequelize from 'sequelize-oracle';
import Oracledb from 'oracledb';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

Oracledb.initOracleClient( {libdir: 'C:\\app\\instantclient_19_64Bits'} )

const getAllDocs = async (pageSize) => {
  let allDocs = [];
  let offset = 0;

  while (true) {
    try {
      const result = await documents.findAll({
        where: Sequelize.literal("TRUNC(VENCIMENTO) < TRUNC(SYSDATE)"),
        offset,
        limit: pageSize,
      });

      if (result.length === 0) {
        break; // Exit the loop if there are no more results
      }

      allDocs = [...allDocs, ...result];
      offset += pageSize;
    } catch (error) {
      console.error('Error fetching documents:', error);
      throw error; // Re-throw the error to be caught by the outer try-catch block
    }
  }

  return allDocs;
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token, getAll } = req.body;

    if (!token) {
      return res.redirect(302, '/login');
    }

    let connection;

    try {
      jwt.verify(token, process.env.SECRET);

      connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
        host: process.env.HOST,
        dialect: process.env.DIALECT || 'oracle',
        dialectOptions: {
          connectTimeout: 5000,
        },
      });

      const outsourcedCount = await documents.count();

      const pageSize = parseInt(req.query.pageSize) || 10;
      const page = parseInt(req.query.page) || 1;

      if (getAll) {
        try {
          const allDocs = await getAllDocs(pageSize);    

          res.status(200).json({
            success: true,
            message: 'Documentos encontrados',
            docs: {
              rows: allDocs,
              count: allDocs.length,
              outsourcedCount: allDocs.length,
            },
          });
        } catch (error) {
          console.error('Error fetching all documents:', error);
          res.status(500).json({ success: false, message: 'Erro ao obter todos os documentos' });
        }
      } else {
        try {
          const docs = await documents.findAndCountAll({
            where: Sequelize.literal("TRUNC(VENCIMENTO) < TRUNC(SYSDATE)"),
            offset: (page - 1) * pageSize,
            limit: pageSize,
          });

          if (docs) {
            res.status(200).json({
              success: true,
              message: 'Documentos encontrados',
              docs: {
                rows: docs.rows,
                count: docs.count,
                outsourcedCount: docs.count,
              },
            });
          } else {
            res.status(400).json({ success: false, message: 'Não foi possível obter os documentos.' });
          }
        } catch (error) {
          console.error('Error fetching paginated documents:', error);
          res.status(500).json({ success: false, message: 'Erro ao obter os documentos paginados' });
        }
      }
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        console.error('Token expired:', error);
        res.status(401).json({ success: false, message: 'Token expirado' });
      } else {
        console.error('Error contacting the server:', error);
        res.status(500).json({ success: false, message: 'Erro ao contatar o servidor' });
      }
    } finally {
      // Close the database connection if it was established
      if (connection) {
        await connection.close();
      }
    }
  }
}
