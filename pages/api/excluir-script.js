import sql from 'mssql';
import dotenv from 'dotenv';
import { authMiddleware } from '../middleware/auth';
import { testDatabaseConnection } from '../../config/database.mjs';

dotenv.config();

export default authMiddleware(async (req, res) => {
    if (req.method === 'POST') {
        const { id } = req.body;

        try {
            // Conectar ao banco de dados
            const masterConnection = await testDatabaseConnection();

            // Usar o banco de dados "Scripts"
            const selectDatabaseQuery = 'USE Scripts';
            await masterConnection.request().query(selectDatabaseQuery);

            // Excluir o script com o ID especificado
            const deleteQuery = `
                DELETE FROM script WHERE id = @id
            `;

            await masterConnection.request()
                .input('id', sql.Int, id)
                .query(deleteQuery);

            // Fechar a conexão
            await masterConnection.close();

            return res.status(200).json({ success: "Script excluído com sucesso." });
        } catch (error) {
            console.error('Erro ao excluir o script:', error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    } else {
        return res.status(405).json({ error: "Método não permitido" });
    }
});
