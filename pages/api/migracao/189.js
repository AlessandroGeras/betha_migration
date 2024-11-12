const sql = require('mssql');
const dotenv = require('dotenv');
const fs = require('fs');
const fetch = require('node-fetch');

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

function logResponse(response, chunkIndex) {
    const logEntry = `Chunk ${chunkIndex}: ${JSON.stringify(response)}\n`;
    fs.appendFileSync('log_responses.txt', logEntry);
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
 ROW_NUMBER() OVER (ORDER BY cd_CategoriaEconomicaReceita) AS ididIntegracao,
JSON_QUERY(
    (SELECT
        JSON_QUERY(
    (SELECT
  '10480' as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS configuracao,
 cd_CategoriaEconomicaReceita as numero,
nm_CategoriaEconomicaReceita as descricao,
case fl_AceitaLancamento
when  'N' then 'SINTETICO'
ELSE 'ANALITICO'
END AS tipo
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
from CONTCategoriaEconomicaReceita
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const content = JSON.parse(record.content);

            return {
                idIntegracao: record.ididIntegracao.toString(),
                content: {
                    configuracao: {
                        id: parseInt(content.configuracao.id) // Convertendo para inteiro
                    },
                    numero: content.numero.toString(), // Ajustar para no máximo 8 caracteres
                    descricao: content.descricao.substring(0, 150),
                    tipo: content.tipo
                }
            };
        });
        

        let report = [];
        let reportIds = [];

        // Function to divide data into chunks of specified size
        const chunkArray = (array, size) => {
            const chunked = [];
            for (let i = 0; i < array.length; i += size) {
                chunked.push(array.slice(i, i + size));
            }
            return chunked;
        };

        const batchedData = chunkArray(transformedData, 50);

        for (const batch of batchedData) {
            try {
                console.log('Enviando o seguinte corpo para a API:', JSON.stringify(batch, null, 2));

                const response = await fetch(`https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/naturezas-receitas`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 25a840ae-b57a-4030-903a-bcccf2386f30'
                    },
                    body: JSON.stringify(batch)
                });

                const responseBody = await response.json();

                if (response.ok) {
                    console.log('Dados enviados com sucesso para a API.');
                    batch.forEach(record => {
                        report.push({ record, status: 'success', response: responseBody });
                    });

                    if (responseBody.idLote) {
                        reportIds.push(responseBody.idLote);
                    }
                } else {
                    console.error('Erro ao enviar os dados para a API:', response.statusText);
                    batch.forEach(record => {
                        report.push({ record, status: 'failed', response: responseBody });
                    });
                }
            } catch (err) {
                console.error('Erro ao enviar o batch para a API:', err);
                batch.forEach(record => {
                    report.push({ record, status: 'error', error: err.message });
                });
            }
        }

        // Salvar o relatório em 'report.json'
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));
        console.log('Relatório salvo em report.json com sucesso.');

        // Salvar os reportIds no arquivo 'report_id.json'
        fs.writeFileSync('report_id.json', JSON.stringify(reportIds, null, 2));
        console.log('report_id.json salvo com sucesso.');

    } catch (error) {
        console.error('Erro no processo:', error);
    } finally {
        await sql.close(); // Fechar a conexão com o SQL Server
        console.log('Conexão com o SQL Server fechada.');
    }
}

// Executar a função principal
main();
