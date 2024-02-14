import documents from '../../models/documents';
import outsourceds from '../../models/outsourceds';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize-oracle';

dotenv.config();

const getAllDocs = async (pageSize, findOutsourced) => {
  let allDocs = [];
  let offset = 0;

  while (true) {
    try {
      const result = await documents.findAll({
        where: {
          [Sequelize.literal("TRUNC(VENCIMENTO) >= TRUNC(SYSDATE) AND TRUNC(VENCIMENTO) <= TRUNC(SYSDATE) + 30")]:
            findOutsourced ? { TERCEIRO: findOutsourced.NOME_TERCEIRO } : {}, // Adiciona a condição se findOutsourced existir
        },
        offset,
        limit: pageSize,
      });

      if (result.length === 0) {
        break;
      }

      allDocs = [...allDocs, ...result];
      offset += pageSize;
    } catch (error) {
      console.error('Error fetching all documents:', error);
      throw error;
    }
  }

  return allDocs;
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token, getAll, id, role } = req.body;
    let findOutsourced = null;

    if (!token) {
      return res.redirect(302, '/login');
    }

    try {
      jwt.verify(token, process.env.SECRET);

      if (role == "external") {
        findOutsourced = await outsourceds.findOne({
          where: {
            ID_USUARIO: id,
            ID_USUARIO_INTERNO: 'N',
          },
        });
      }

      const pageSize = parseInt(req.query.pageSize) || 10;
      const page = parseInt(req.query.page) || 1;

      if (getAll) {
        try {
          const allDocs = await getAllDocs(pageSize, findOutsourced);

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
          res.status(500).json({ success: false, message: 'Erro ao obter todos os documentos', error: error.message });
        }
      } else {
        try {
          const docs = await documents.findAndCountAll({
            where: {
              [Sequelize.literal("TRUNC(VENCIMENTO) >= TRUNC(SYSDATE) AND TRUNC(VENCIMENTO) <= TRUNC(SYSDATE) + 30")]:
                findOutsourced ? { TERCEIRO: findOutsourced.NOME_TERCEIRO } : {}, // Adiciona a condição se findOutsourced existir
            },
            offset: (page - 1) * pageSize,
            limit: pageSize,
          });

          if (docs.rows.length > 0) {
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
          res.status(500).json({ success: false, message: 'Erro ao obter os documentos paginados', error: error.message });
        }
      }
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        console.error('Token expired:', error);
        res.status(401).json({ success: false, message: 'Token expirado' });
      } else {
        console.error('Error contacting the server:', error);
        res.status(500).json({ success: false, message: 'Erro ao contatar o servidor', error: error.message });
      }
    }
  }
}
