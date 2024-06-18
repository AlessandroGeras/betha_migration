import sql from 'mssql';
import dotenv from 'dotenv';
import { authMiddleware } from '../middleware/auth';
import { testDatabaseConnection } from '../../config/database.mjs';

dotenv.config();

export default authMiddleware(async (req, res) => {
    if (req.method === 'POST') {
        const { status, observacao, query, api, banco,tamanho } = req.body;

        try {
            // Conectar ao banco de dados
            const masterConnection = await testDatabaseConnection();

            // Usar o banco de dados "Scripts"
            const selectDatabaseQuery = 'USE Scripts';
            await masterConnection.request().query(selectDatabaseQuery);

            // Verificar se a query e a api já existem no mesmo registro
            const checkDuplicateQuery = `
                SELECT COUNT(*) AS count
                FROM script
                WHERE query = @query AND api = @api AND banco = @banco
            `;

            const result = await masterConnection.request()
                .input('query', sql.VarChar, query)
                .input('api', sql.VarChar, api)
                .input('banco', sql.VarChar, banco)
                .query(checkDuplicateQuery);

            if (result.recordset[0].count > 0) {
                await masterConnection.close();
                return res.status(400).json({ error: "Esse registro já existe no banco " + (banco)+"." });
            }

            // Inserir dados na tabela "script"
            const insertQuery = `
                INSERT INTO script (status, observacao, query, api, banco, tamanho)
                VALUES (@status, @observacao, @query, @api, @banco, @tamanho)
            `;

            await masterConnection.request()
                .input('status', sql.VarChar, status)
                .input('observacao', sql.VarChar, observacao)
                .input('query', sql.VarChar, query)
                .input('api', sql.VarChar, api)
                .input('banco', sql.VarChar, banco)
                .input('tamanho', sql.VarChar, tamanho)
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
