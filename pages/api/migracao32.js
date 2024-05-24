const sql = require('mssql');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const fs = require('fs');

dotenv.config();

async function connectToSqlServer() {
    try {
        const server = process.env.SERVER;
        const database = process.env.DATABASE;
        const username = process.env.USERNAME_SQLSERVER;
        const password = process.env.PASSWORD;

        const config = {
            user: username,
            password: password,
            server: server,
            database: database,
            options: {
                encrypt: false
            }
        };

        const pool = await sql.connect(config);
        console.log("Conectado ao SQL Server");
        return pool;
    } catch (error) {
        console.error('Erro ao conectar ao SQL Server:', error);
        throw error;
    }
}

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "COMP_ALMO"
        const selectDatabaseQuery = 'USE COMP_ALMO';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
        SELECT 
    ROW_NUMBER() OVER (ORDER BY m.ds_modalidade) AS id,
    m.ds_modalidade AS descricao,
    m.cd_modalidade AS sigla,
    am.nm_AudespModalidade AS valor
FROM COMPModalidades m
JOIN COMPAudespModalidade am ON am.cd_AudespModalidade = m.cd_ModalidadeAudesp;
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Salvar os resultados da consulta em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(resultData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        for (const record of resultData) {
            const response = await fetch('https://compras.betha.cloud/compras-services/api/modalidades-licitacao', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                },
                body: JSON.stringify(record)
            });

            if (response.ok) {
                console.log(`Dados do registro ID ${record.id} enviados com sucesso para a rota.`);
            } else {
                console.error(`Erro ao enviar os dados do registro ID ${record.id} para a rota:`, response.statusText);
            }
        }

    } catch (error) {
        // Lidar com erros de conexão ou consulta aqui
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        await sql.close();
    }
}

// Chamar a função principal
main();
