import users from '../../models/users';
import Sequelize from 'sequelize-oracle';
import Oracledb from 'oracledb';
import dotenv from 'dotenv';

dotenv.config();

Oracledb.initOracleClient({
  libDir: 'C:\\Users\\aless\\Downloads\\instantclient-basic-windows.x64-21.12.0.0.0dbru\\instantclient_21_12',
});

export default async function handler(req, res) {
    let connection;
  
    try {
      // Estabeleça a conexão com o Oracle
      connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
        host: process.env.HOST,
        dialect: process.env.DIALECT || 'oracle',
      });        
  
      const outsourcedCount = await users.count({
        where: { ID_ADM_GESTAO_TERCEIROS: 'N' },
      });
  
      // Configuração da paginação
      const page = parseInt(req.query.page) || 1; // Página atual
      const pageSize = parseInt(req.query.pageSize) || 10; // Itens por página
  
      // Consulta paginada usando Sequelize com filtro
      const docs = await users.findAndCountAll({
        where: { ID_ADM_GESTAO_TERCEIROS: 'N' }, // Adicionando a condição de filtro
        offset: (page - 1) * pageSize,
        limit: pageSize,
      });
  
      if (docs) {
        res.status(200).json({
          success: true,
          message: 'Terceiros encontrados',
          docs: {
            rows: docs.rows,
            count: docs.count,
            outsourcedCount: outsourcedCount,
          },
        });
      } else {
        res.status(400).json({ success: false, message: 'Não foi possível obter os usuários terceirizados.' });
      }
    } catch (error) {
      console.error('Erro ao contatar o servidor:', error);
      res.status(500).json({ success: false, message: 'Erro ao contatar o servidor' });
    }
  }
  