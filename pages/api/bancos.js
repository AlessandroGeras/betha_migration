import { testDatabaseConnection } from '../../config/database.mjs';
const sql = require('mssql');
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Criar uma conexão com o banco de dados
            const masterConnection = await testDatabaseConnection();
            
            // Selecionar o banco de dados "bancos"
            const selectDatabaseQuery = 'USE Bancos';
            await masterConnection.query(selectDatabaseQuery);

            // Consultar a tabela "Banco" para retornar todos os registros
            const userQuery = 'SELECT * FROM Banco';
            const request = new sql.Request(masterConnection);
            const remessas = await request.query(userQuery);

            // Retornar todos os registros da tabela "Banco"
            return res.status(200).json({ success: remessas.recordset });
        } catch (error) {
            console.error('Erro ao executar o banco de dados:', error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    } else {
        return res.status(405).json({ error: "Método não permitido" });
    }
}
