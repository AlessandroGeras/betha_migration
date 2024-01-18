import documents from '../../models/documents';
import Sequelize from 'sequelize-oracle';
import Oracledb from 'oracledb';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

Oracledb.initOracleClient({
  libDir: 'C:\\Users\\aless\\Downloads\\instantclient-basic-windows.x64-21.12.0.0.0dbru\\instantclient_21_12',
});

const getAllDocs = async (pageSize) => {
  let allDocs = [];
  let offset = 0;

  while (true) {
    const result = await documents.findAll({
            offset,
      limit: pageSize,
    });

    if (result.length === 0) {
      break; // Saia do loop se não houver mais resultados
    }

    allDocs = [...allDocs, ...result];
    offset += pageSize;
  }

  return allDocs;
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token, getAll } = req.body; // Adicionando um parâmetro getAll

    if (!token) {
      return res.redirect(302, '/login'); // Redireciona para a página de login
    }

    let connection;

    try {
      jwt.verify(token, process.env.SECRET);

      // Estabeleça a conexão com o Oracle
      connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
        host: process.env.HOST,
        dialect: process.env.DIALECT || 'oracle',
        dialectOptions: {
          connectTimeout: 5000, // Tempo limite em milissegundos (5 segundos)
        },
      });

      const outsourcedCount = await documents.count();

      // Configuração da paginação
      const pageSize = parseInt(req.query.pageSize) || 10; // Itens por página
      const page = parseInt(req.query.page) || 1; // Página atual

      if (getAll) {
        // Se getAll for true, busca todos os registros
        const allDocs = await getAllDocs(pageSize);

        res.status(200).json({
          success: true,
          message: 'Documentos encontrados',
          docs: {
            rows: allDocs,
            count: allDocs.length,
            outsourcedCount: outsourcedCount,
          },
        });
      } else {
        // Consulta paginada usando Sequelize com filtro
        const docs = await documents.findAndCountAll({         
          offset: (page - 1) * pageSize,
          limit: pageSize,
        });

        if (docs) {
          res.status(200).json({
            success: true,
            message: 'Documentos encontrados 1',
            docs: {
              rows: docs.rows,
              count: docs.count,
              outsourcedCount: outsourcedCount,
            },
          });
        } else {
          res.status(400).json({ success: false, message: 'Não foi possível obter os documentos.' });
        }
      }
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        console.error('Token expirado:', error);
        res.status(401).json({ success: false, message: 'Token expirado' });
      } else {
        console.error('Erro ao contatar o servidor:', error);
        res.status(500).json({ success: false, message: 'Erro ao contatar o servidor' });
      }
    }
  }
}
