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
            
            // Selecionar o banco de dados "Bancos"
            const selectDatabaseQuery = 'USE Bancos';
            await masterConnection.query(selectDatabaseQuery);

            // Consultar o banco de dados "Bancos" para encontrar o banco desejado
            const userQuery = 'SELECT * FROM Banco WHERE banco = @id';
            const request = new sql.Request(masterConnection);
            request.input('id', sql.VarChar, id);  // Usando sql.VarChar para strings
            let remessas = await request.query(userQuery);

            // Verificar se o banco de dados foi encontrado
            if (remessas.recordset.length > 0) {
                // Mudar para o banco de dados "Scripts"
                const useScriptsQuery = 'USE Scripts';
                await masterConnection.query(useScriptsQuery);

                // Consultar a tabela "Script" para encontrar os tamanhos relacionados a esse banco
                const scriptQuery = 'SELECT tamanho FROM SCRIPT WHERE banco = @id';
                const scriptRequest = new sql.Request(masterConnection);
                scriptRequest.input('id', sql.VarChar, id);
                const scripts = await scriptRequest.query(scriptQuery);

                // Somar os tamanhos encontrados
                let tamanhoTotal = 0;
                scripts.recordset.forEach(script => {
                    tamanhoTotal += script.tamanho;
                });

                // Atualizar o campo "tamanho" do objeto remessas
                remessas.recordset[0].tamanho = tamanhoTotal;

                // Retornar os registros atualizados
                return res.status(200).json({ success: remessas.recordset });
            } else {
                return res.status(404).json({ error: "Banco de dados não encontrado" });
            }
        } catch (error) {
            console.error('Erro ao executar o banco de dados:', error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    } else {
        return res.status(405).json({ error: "Método não permitido" });
    }
}
