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
ROW_NUMBER() OVER (ORDER BY cd_banco)  as idIntegracao,
JSON_QUERY(
            (SELECT
            ds_banco as nome,
            JSON_QUERY(
            (SELECT
            case cd_codbanco
when 001    then 137
when 104    then 148
when 756    then 51
when 237    then 35
when 033    then 114
when 077        then 74
when 084        then 175
when 097        then 474
when 133    then 483
when 260        then 676
when 341        then 165
when 748        then 50

            end as id
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
            ) AS banco,
            cd_codagencia as numero,
            cd_dig_agencia as digito,
            JSON_QUERY(                 
            (SELECT
            3017385 as id
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
            ) AS logradouro,
            '0' as numeroEndereco,
            JSON_QUERY(
            (SELECT
            9183 as id
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
            ) AS municipio,
            JSON_QUERY(
            (SELECT
            7571 as id
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
            ) AS bairro,
            '76979000' as cep
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
            ) AS content
from CONTFICHABANCOS
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
                    nome: content.nome,
                    banco: content.banco,
                    numero: content.numero,
                    digito: content.digito,
                    logradouro: content.logradouro,
                    numeroEndereco: content.numeroEndereco,
                    municipio: content.municipio,
                    bairro: content.bairro,
                    cep: content.cep
                }
            };
        }).filter(record => record !== null); // Filtrar registros nulos

        /* const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        return */

        const chunkArray = (array, size) => {
            const chunked = [];
            for (let i = 0; i < array.length; i += size) {
                chunked.push(array.slice(i, i + size));
            }
            return chunked;
        };
        
        // Processamento dos dados em lotes
        const batchedData = chunkArray(transformedData, 50);
        let report = [];
        let reportIds = [];
        
        for (const batch of batchedData) {
            try {
                console.log('Enviando o seguinte corpo para a API:', JSON.stringify(batch, null, 2));
        
                const response = await fetch(`https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/agencias-bancarias`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 25a840ae-b57a-4030-903a-bcccf2386f30'
                    },
                    body: JSON.stringify(batch)
                });
        
                const responseBody = await response.json();
                console.log('Resposta da API:', responseBody);
        
                if (response.ok) {
                    console.log('Dados enviados com sucesso para a API.');
                    batch.forEach(record => {
                        report.push({ record, status: 'success', response: responseBody });
                    });
        
                    if (responseBody.idLote) {
                        reportIds.push(responseBody.idLote);
                    } else if (responseBody.id) {
                        reportIds.push(responseBody.id);
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
        
        // Salvando o relatório e IDs em arquivos
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));
        console.log('Relatório salvo em report.json com sucesso.');
        
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