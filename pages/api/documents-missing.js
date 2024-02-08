import documents from '../../models/documents';
import outsourceds from '../../models/outsourceds';
import Sequelize from 'sequelize-oracle';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const getAllDocs = async (pageSize, findOutsourced) => {
  let allDocs = [];
  let offset = 0;

  while (true) {
    try {
      const result = await documents.findAll({
        where: Sequelize.or(
          { STATUS: 'Pendente' },
          { STATUS: 'Reprovado' }
        ),
        ...(findOutsourced ? { TERCEIRO: findOutsourced.NOME_TERCEIRO } : {}), // Adiciona a condição se findOutsourced existir        
        offset,
        limit: pageSize,
      });

      if (result.length === 0) {
        break; // Sai do loop se não houver mais resultados
      }

      allDocs = [...allDocs, ...result];
      offset += pageSize;
    } catch (error) {
      console.error('Erro ao obter documentos:', error);
      throw error; // Re-lança o erro para ser capturado pelo bloco try-catch externo
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


      const outsourcedCount = await documents.count();

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
          console.error('Erro ao obter todos os documentos:', error);
          res.status(500).json({ success: false, message: 'Erro ao obter todos os documentos' });
        }
      } else {
        try {
          const docs = await documents.findAndCountAll({
            where: Sequelize.or(
              { STATUS: 'Pendente' },
              { STATUS: 'Reprovado' }
            ),
            ...(findOutsourced ? { TERCEIRO: findOutsourced.NOME_TERCEIRO } : {}), // Adiciona a condição se findOutsourced existir           
            offset: (page - 1) * pageSize,
            limit: pageSize,
          });

          if (docs) {
            res.status(200).json({
              success: true,
              message: 'Documentos pendentes encontrados',
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
          console.error('Erro ao obter os documentos paginados:', error);
          res.status(500).json({ success: false, message: 'Erro ao obter os documentos paginados' });
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
    } finally {
      // Fecha a conexão do banco de dados se estiver estabelecida
      
    }
  }
}
