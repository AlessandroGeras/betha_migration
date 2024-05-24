import { testDatabaseConnection } from '../../config/database.mjs';
const sql = require('mssql');
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { id } = req.body;

        try {
            // Criar uma conexão com o banco de dados
            const masterConnection = await testDatabaseConnection();
            
            // Selecionar o banco de dados "Scripts"
            const selectDatabaseQuery = 'USE Scripts';
            await masterConnection.query(selectDatabaseQuery);

            // Consultar a tabela "Script" para retornar o primeiro registro encontrado com o ID especificado
            const userQuery = 'SELECT TOP 1 * FROM Script WHERE id = @id'; // Usando TOP 1 para retornar apenas o primeiro registro
            const request = new sql.Request(masterConnection);
            request.input('id', sql.VarChar, id);  // Usando sql.VarChar para strings
            const remessa = await request.query(userQuery);

            // Retornar o primeiro registro encontrado da tabela "Script"
            return res.status(200).json({ success: remessa.recordset[0] });
        } catch (error) {
            console.error('Erro ao executar o banco de dados:', error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    } else {
        return res.status(405).json({ error: "Método não permitido" });
    }
}
