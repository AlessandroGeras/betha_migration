import categoria_colaboradores from '../../models/categoryCollaborators';
import outsourceds from '../../models/outsourceds';
import Sequelize from 'sequelize-oracle';
import Oracledb from 'oracledb';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

Oracledb.initOracleClient({
  libDir: '../../../opt/oracle/instantclient_19_16',
});

const getAllDocs = async (pageSize) => {
  let allDocs = [];
  let offset = 0;

  while (true) {
    const result = await categoria_colaboradores.findAll({
      attributes: ['CATEGORIA'],
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

const getAllEnterprises = async () => {
  let offset = 0;
  let limit = 100;
  let allEnterprises = [];

  while (true) {
    const result = await outsourceds.findAll({
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

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token,getAll } = req.body;

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
      });

      const outsourcedCount = await categoria_colaboradores.count();

      // Configuração da paginação
      const page = parseInt(req.query.page) || 1; // Página atual
      const pageSize = parseInt(req.query.pageSize) || 10; // Itens por página

      if (getAll) {
        // Se getAll for true, busca todos os registros
        const allDocs = await getAllDocs(pageSize);
        const enterprise = await getAllEnterprises();

        // Filtrar os valores nulos e "N/A"
      const filteredEnterprises = enterprise
      .filter(user => user.NOME_TERCEIRO !== null && user.NOME_TERCEIRO !== 'N/A');
    
    // Obter valores distintos
    const uniqueEnterprises = [...new Set(filteredEnterprises.map(user => user.NOME_TERCEIRO))];

        res.status(200).json({
          success: true,
          message: 'Todos as categorias encontradas',
          docs: {
            rows: allDocs,
            count: allDocs.length,
            outsourcedCount: outsourcedCount,
          },
          uniqueEnterprises,
        });
      }

      else{

      // Consulta paginada usando Sequelize com filtro
      const docs = await categoria_colaboradores.findAndCountAll({
        attributes: ['CATEGORIA'],
        offset: (page - 1) * pageSize,
        limit: pageSize,
      });

      if (docs) {
        res.status(200).json({
          success: true,
          message: 'Categorias encontradas',
          docs: {
            rows: docs.rows,
            count: docs.count,
            outsourcedCount: outsourcedCount,
          },
        });
      } else {
        res.status(400).json({ success: false, message: 'Não foi possível obter a lista de categorias.' });
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
