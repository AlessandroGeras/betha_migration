import documents from '../../models/documents';
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

    // Consulta para obter o total de documentos ativos
    const activeDocsCount = await documents.count({
      where: { STATUS: 'Ativo' }, // Ajuste conforme sua estrutura de dados
    });

    // Configuração da paginação
    const page = parseInt(req.query.page) || 1; // Página atual
    const pageSize = parseInt(req.query.pageSize) || 10; // Itens por página

    // Consulta paginada usando Sequelize
    const docs = await documents.findAndCountAll({
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
          activeCount: activeDocsCount,
        },
      });
    } else {
      res.status(400).json({ success: false, message: 'Não foi possível obter os documentos.' });
    }
  } catch (error) {
    console.error('Erro ao contatar o servidor:', error);
    res.status(500).json({ success: false, message: 'Erro ao contatar o servidor' });
  }
}
