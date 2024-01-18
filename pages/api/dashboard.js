import documents from '../../models/documents';
import users from '../../models/users';
import outsourceds from '../../models/outsourceds';
import Sequelize from 'sequelize-oracle';
import Oracledb from 'oracledb';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

Oracledb.initOracleClient({
  libDir: 'C:\\Users\\aless\\Downloads\\instantclient-basic-windows.x64-21.12.0.0.0dbru\\instantclient_21_12',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token } = req.body;

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

      // Consulta para obter o total de documentos ativos
      const activeDocumentsCount = await documents.count({
        where: { STATUS: 'Ativo' }, // Ajuste conforme sua estrutura de dados
      });

      // Consulta para obter o total de terceiros ativos
      const activeOutsourcedCount = await outsourceds.count({
        where: { STATUS: 'Ativo', COLABORADOR_TERCEIRO: 'N' }, // Ajuste conforme sua estrutura de dados
      });

      const missingDocsCount = await documents.count({
        where: { STATUS: 'Faltante' }, // Ajuste conforme sua estrutura de dados
      });

      const analiseDocsCount = await documents.count({
        where: { STATUS: 'Em análise' }, // Ajuste conforme sua estrutura de dados
      });

      // Consulta para obter o total de documentos com vencimento até 30 dias
      const dueDateCount = await connection.query(
        `SELECT COUNT(*) "count" FROM "DOCUMENTOS" WHERE "VENCIMENTO" BETWEEN SYSDATE AND SYSDATE + 30`,
        {
          type: Sequelize.QueryTypes.SELECT,
        }
      );

      const pastDueDateCount = await connection.query(
        `SELECT COUNT(*) "count" FROM "DOCUMENTOS" WHERE "VENCIMENTO" < SYSDATE AND "STATUS" = 'Ativo'`,
        {
          type: Sequelize.QueryTypes.SELECT,
        }
      );

      const employeesCount = await outsourceds.count({
        where: { STATUS: 'Ativo', COLABORADOR_TERCEIRO: 'S' }, // Ajuste conforme sua estrutura de dados
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
            activeOutsourcedCount: activeOutsourcedCount,
            due_date: dueDateCount[0].count,
            past_due_date: pastDueDateCount[0].count,
            missingCount: missingDocsCount,
            analiseCount: analiseDocsCount,
            employeesCount: employeesCount,
            activeDocumentsCount: activeDocumentsCount,
          },
        });
      } else {
        res.status(400).json({ success: false, message: 'Não foi possível obter os documentos.' });
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
      // Feche a conexão após a execução
      if (connection) {
        await connection.close();
      }
    }
  }
}
