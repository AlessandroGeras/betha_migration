import outsourceds from '../../models/outsourceds';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const getAllDocs = async (pageSize, user, role) => {
  let allDocs = [];
  let offset = 0;
  let whereClause = {
    COLABORADOR_TERCEIRO: 'S'
  };

  if (role === 'external' && user) {
    whereClause.NOME_TERCEIRO = user.NOME_TERCEIRO;
  }

  while (true) {
    const result = await outsourceds.findAll({
      where: whereClause,
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
    const { token, getAll, id, role } = req.body;

    if (!token) {
      return res.redirect(302, '/login'); // Redireciona para a página de login
    }

    try {
      jwt.verify(token, process.env.SECRET);      

      const outsourcedCount = await outsourceds.count({
        where: { COLABORADOR_TERCEIRO: 'S' },
      });

      // Verifica se o papel é "external"
      if (role === 'external' && id) {
        // Busca o usuário pelo ID
        const user = await outsourceds.findOne({
          where: { ID_USUARIO: id },
        });

        if (!user) {
          return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
        }

        const pageSize = parseInt(req.query.pageSize) || 10; // Itens por página
        const allDocs = await getAllDocs(pageSize, user, role);

        return res.status(200).json({
          success: true,
          message: 'Todos os usuários encontrados',
          docs: {
            rows: allDocs,
            count: allDocs.length,
            outsourcedCount: outsourcedCount,
          },
        });
      }

      // Se o papel não for "external" ou se getAll for verdadeiro, mantenha o código existente
      if (!getAll) {
        const pageSize = parseInt(req.query.pageSize) || 10; // Itens por página
        const page = parseInt(req.query.page) || 1; // Página atual

        const docs = await outsourceds.findAndCountAll({
          where: {
            COLABORADOR_TERCEIRO: 'S', // Filtro padrão
            ...(role === 'external' && { NOME_TERCEIRO: user.NOME_TERCEIRO }) // Adiciona filtro apenas se o papel for "external"
          },
          offset: (page - 1) * pageSize,
          limit: pageSize,
        });

        if (docs) {
          res.status(200).json({
            success: true,
            message: 'Colaboradores encontrados',
            docs: {
              rows: docs.rows,
              count: docs.count,
              outsourcedCount: outsourcedCount,
            },
          });
        } else {
          res.status(400).json({ success: false, message: 'Não foi possível obter a lista de colaboradores.' });
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
