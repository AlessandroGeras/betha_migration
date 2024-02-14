import documents from '../../models/documents';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import outsourceds from '../../models/outsourceds';
import Sequelize from 'sequelize-oracle';

dotenv.config();

const getAllDocs = async (pageSize, user) => {
  let allDocs = [];
  let offset = 0;

  while (true) {
    try {
      const result = await documents.findAll({
        where: {
          VENCIMENTO: Sequelize.literal("TRUNC(VENCIMENTO) < TRUNC(SYSDATE)"),
          ...(user && { TERCEIRO: user.NOME_TERCEIRO }) // Adiciona filtro por NOME_TERCEIRO se user não for null ou undefined
        },
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
    const { token, getAll, id, role } = req.body;

    if (!token) {
      return res.redirect(302, '/login');
    }

    try {
      jwt.verify(token, process.env.SECRET);

      const pageSize = parseInt(req.query.pageSize) || 10;
      const page = parseInt(req.query.page) || 1;

      if (role === "external" && id) {
        // Verificar o usuário pelo ID
        const user = await outsourceds.findOne({
          where: {
            ID_USUARIO: id
          }
        });

        if (!user) {
          return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
        }

        if (getAll) {
          try {
            const allDocs = await getAllDocs(pageSize, user);

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
              where: {
                VENCIMENTO: Sequelize.literal("TRUNC(VENCIMENTO) < TRUNC(SYSDATE)"),
                TERCEIRO: user.NOME_TERCEIRO // Adiciona filtro por NOME_TERCEIRO
              },
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
      } else {
        // Manter o código original
        if (getAll) {
          try {
            const allDocs = await getAllDocs(pageSize, null);

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
              where: {
                VENCIMENTO: Sequelize.literal("TRUNC(VENCIMENTO) < TRUNC(SYSDATE)")
              },
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

    }
  }
}
