import sql from 'mssql';
import dotenv from 'dotenv';
import { authMiddleware } from '../middleware/auth';
import { testDatabaseConnection } from '../../config/database.mjs';

dotenv.config();

export default authMiddleware(async (req, res) => {
    if (req.method === 'POST') {
        const { id, status, observacao, query, api, banco } = req.body;

        console.log(id);
        console.log(status);
        console.log(observacao);
        console.log(query);
        console.log(api);
        console.log(banco);

        try {
            // Conectar ao banco de dados
            const masterConnection = await testDatabaseConnection();

            // Usar o banco de dados "Scripts"
            const selectDatabaseQuery = 'USE Scripts';
            await masterConnection.request().query(selectDatabaseQuery);

            // Atualizar dados na tabela "script"
            const updateQuery = `
                UPDATE script 
                SET status = @status, 
                    observacao = @observacao, 
                    query = @query, 
                    api = @api, 
                    banco = @banco
                WHERE id = @id
            `;

            await masterConnection.request()
                .input('id', sql.Int, id)
                .input('status', sql.VarChar, status)
                .input('observacao', sql.VarChar, observacao)
                .input('query', sql.VarChar, query)
                .input('api', sql.VarChar, api)
                .input('banco', sql.VarChar, banco)
                .query(updateQuery);

            // Fechar a conexão
            await masterConnection.close();

            return res.status(200).json({ success: "Dados atualizados com sucesso." });
        } catch (error) {
            console.error('Erro ao atualizar dados:', error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    } else {
        return res.status(405).json({ error: "Método não permitido" });
    }
});
