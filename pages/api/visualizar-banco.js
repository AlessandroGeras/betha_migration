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
            const selectDatabaseQuery = 'USE Bancos';
            await masterConnection.query(selectDatabaseQuery);

            // Consultar a tabela "Script" para retornar os registros com o banco especificado
            const userQuery = 'SELECT * FROM Banco WHERE banco = @id';
            const request = new sql.Request(masterConnection);
            request.input('id', sql.VarChar, id);  // Usando sql.VarChar para strings
            const remessas = await request.query(userQuery);

            console.log(remessas);

            // Retornar todos os registros da tabela "Script"
            return res.status(200).json({ success: remessas.recordset });
        } catch (error) {
            console.error('Erro ao executar o banco de dados:', error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    } else {
        return res.status(405).json({ error: "Método não permitido" });
    }
}
