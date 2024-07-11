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

        // Selecionar o banco de dados "CONTABIL2024"
        const selectDatabaseQuery = 'USE CONTABIL2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
1 AS idIntegracao,
JSON_QUERY(
    (SELECT
JSON_QUERY(
    (SELECT
        '' as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS despesaLdo,
    vl_Despesa as projecaoFinanceiraAno1
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
from CONTMetaFiscal
where aa_MetaFiscal = 2022
union all
select 
2 AS idIntegracao,
JSON_QUERY(
    (SELECT
JSON_QUERY(
    (SELECT
        '' as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS despesaLdo,
    vl_Despesa as projecaoFinanceiraAno2
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
from CONTMetaFiscal
where aa_MetaFiscal = 2024
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            // Parse the JSON content
            const content = JSON.parse(record.content);

            return {
                idIntegracao: record.idIntegracao.toString(), // Convert idIntegracao to string
                content: {
                    despesaLdo: {
                        id: 184488
                    },
                    projecaoFinanceiraAno1: content.projecaoFinanceiraAno1 || content.projecaoFinanceiraAno2,
                    projecaoFinanceiraAno2: content.projecaoFinanceiraAno2 || content.projecaoFinanceiraAno1,
                }
            };
        });

        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        for (const record of transformedData) {
            const response = await fetch('https://pla-sl-rest.betha.cloud/planejamento/service-layer/v2/api/metas-fiscais-despesas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                },
                body: JSON.stringify(record)
            });

            if (response.ok) {
                console.log(`Dados do registro enviados com sucesso para a rota.`);
            } else {
                console.error(`Erro ao enviar os dados do registro para a rota:`, response.statusText);
            }
        }

    } catch (error) {
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        sql.close();
    }
}

main();
