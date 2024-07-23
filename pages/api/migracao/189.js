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
  '10069' as id
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
            let numeroStr = content.numero.toString();
            if (numeroStr.length > 8) {
                numeroStr = numeroStr.substring(0, 8);
            }
            return {
                idIntegracao: record.ididIntegracao.toString(),
                content: {
                    configuracao: {
                        id: parseInt(content.configuracao.id) // Convertendo para inteiro
                    },
                    numero: numeroStr, // Ajustar para no máximo 8 caracteres
                    descricao: content.descricao.substring(0, 150),
                    tipo: content.tipo
                }
            };
        });

        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);

            // Enviar o chunk para a API
            const response = await fetch('https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/naturezas-receitas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                },
                body: JSON.stringify(chunk)
            });

            const responseData = await response.json();
            logResponse(responseData, i / chunkSize + 1);

            if (response.ok) {
                console.log(`Dados do chunk ${i / chunkSize + 1} enviados com sucesso para a rota.`);
            } else {
                console.error(`Erro ao enviar os dados do chunk ${i / chunkSize + 1} para a rota:`, response.statusText);
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
