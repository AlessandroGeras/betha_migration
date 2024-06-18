import { testDatabaseConnection } from '../../config/database.mjs';
const sql = require('mssql');
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Criar uma conexão com o banco de dados "BANCOS"
            const bancosConnection = await testDatabaseConnection();

            // Selecionar o banco de dados "BANCOS"
            const selectBancosDatabaseQuery = 'USE Bancos';
            await bancosConnection.query(selectBancosDatabaseQuery);

            // Consultar a tabela "banco" para retornar todos os registros em ordem alfabética crescente
            const bancoQuery = 'SELECT * FROM banco ORDER BY banco ASC';
            const bancoRequest = new sql.Request(bancosConnection);
            const bancos = await bancoRequest.query(bancoQuery);

            // Fechar a conexão com o banco de dados "BANCOS"
            //await bancosConnection.close();

            // Criar uma conexão com o banco de dados "SCRIPTS"
            const scriptsConnection = await testDatabaseConnection();

            // Selecionar o banco de dados "SCRIPTS"
            const selectScriptsDatabaseQuery = 'USE Scripts';
            await scriptsConnection.query(selectScriptsDatabaseQuery);

            // Para cada banco na tabela "banco"
            for (const banco of bancos.recordset) {
                // Consultar a tabela "script" para obter a soma dos valores do campo "tamanho" para este banco
                const scriptQuery = `SELECT SUM(tamanho) AS total FROM script WHERE banco = '${banco.banco}'`;
                const scriptRequest = new sql.Request(scriptsConnection);
                const scriptResult = await scriptRequest.query(scriptQuery);

                // Obter o total da soma dos valores de "tamanho" para este banco
                const totalTamanho = scriptResult.recordset[0].total;

                // Atualizar a resposta "bancos" com as informações do banco e o total da soma de tamanho
                banco.tamanho = totalTamanho;

                // Consultar a tabela "script" para obter todos os status para este banco
                const statusQuery = `SELECT status FROM script WHERE banco = '${banco.banco}'`;
                const statusRequest = new sql.Request(scriptsConnection);
                const statusResult = await statusRequest.query(statusQuery);

                // Verificar o status do banco
                if (statusResult.recordset.length === 0) {
                    banco.status = 'Não executado';
                } else {
                    const statuses = statusResult.recordset.map(record => record.status);
                    const uniqueStatuses = [...new Set(statuses)];

                    if (uniqueStatuses.length === 1 && uniqueStatuses[0] === 'Concluído') {
                        banco.status = 'Concluído';
                    } else if (uniqueStatuses.length === 1 && uniqueStatuses[0] === 'Não executado') {
                        banco.status = 'Não executado';
                    } else {
                        banco.status = 'Em execução';
                    }
                }
            }

            // Fechar a conexão com o banco de dados "SCRIPTS"
            //await scriptsConnection.close();

            // Retornar todos os registros da tabela "banco" com o total de tamanho para cada banco e seus status
            return res.status(200).json({ success: bancos.recordset });
        } catch (error) {
            console.error('Erro ao executar o banco de dados:', error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    } else {
        return res.status(405).json({ error: "Método não permitido" });
    }
}
