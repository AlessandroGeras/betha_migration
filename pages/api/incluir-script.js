import sql from 'mssql';
import dotenv from 'dotenv';
import { authMiddleware } from '../middleware/auth';
import { testDatabaseConnection } from '../../config/database.mjs';

dotenv.config();

export default authMiddleware(async (req, res) => {
    if (req.method === 'POST') {
        const { status, observacao, query, api, banco } = req.body;

        try {
            // Conectar ao banco de dados
            const masterConnection = await testDatabaseConnection();

            // Usar o banco de dados "Scripts"
            const selectDatabaseQuery = 'USE Scripts';
            await masterConnection.request().query(selectDatabaseQuery);

            // Inserir dados na tabela "script"
            const insertQuery = `
                INSERT INTO script (status, observacao, query, api, banco)
                VALUES (@status, @observacao, @query, @api, @banco)
            `;

            await masterConnection.request()
                .input('status', sql.VarChar, status)
                .input('observacao', sql.VarChar, observacao)
                .input('query', sql.VarChar, query)
                .input('api', sql.VarChar, api)
                .input('banco', sql.VarChar, banco)
                .query(insertQuery);

            // Fechar a conexão
            await masterConnection.close();

            return res.status(200).json({ success: "Dados inseridos com sucesso." });
        } catch (error) {
            console.error('Erro ao inserir dados:', error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    } else {
        return res.status(405).json({ error: "Método não permitido" });
    }
});
