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
1 as idIntegracao,
JSON_QUERY(
    (SELECT
 cd_Exercicio as exercicio,
 JSON_QUERY(
    (SELECT
        '' as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS retencao,
        'LIQUIDACAO' as estagioEfetivacao,
        JSON_QUERY(
    (SELECT
        '' as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS receita,
        JSON_QUERY(
    (SELECT
        '' as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS recurso
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content 
from CONTRetencaoExercicioAnterior
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
                    exercicio: content.exercicio, // Use the exercicio value directly from content
                    retencao: {
                        id: parseInt(content.retencao.id) || 1, // Use 1 as a default if content.retencao.id is empty
                    },
                    estagioEfetivacao: content.estagioEfetivacao, // Use the estagioEfetivacao value directly from content
                    receita: {
                        id: parseInt(content.receita.id) || 1, // Use 1 as a default if content.receita.id is empty
                    },
                    recurso: {
                        id: parseInt(content.recurso.id) || 2249217, // Use 2249217 as a default if content.recurso.id is empty
                    }
                }
            };
        });

        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const response = await fetch('https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/retencoes-exercicios', {
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
        } */

    } catch (error) {
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        sql.close();
    }
}

main();
