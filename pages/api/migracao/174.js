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

function removeFormatting(value) {
    return value.replace(/[^\d]/g, ''); // Remove tudo que não for número
}

async function main() {
    try {
        const masterConnection = await connectToSqlServer();
        const selectDatabaseQuery = 'USE COMP_ALMO';
        await masterConnection.query(selectDatabaseQuery);

        const userQuery = `
            SELECT 
ds_tipomovimento as descricao,
        JSON_QUERY(
    (SELECT
case sg_direcao
    when 'AJ' Then 'ENTRADA'
        when 'E' Then 'ENTRADA'
        when 'S' Then 'SAIDA'
        when 'CD' Then 'SAIDA'
        when 'EE' Then 'ENTRADA'
        when 'EE' Then 'ENTRADA'
        when 'ES' Then 'SAIDA'
        when 'SI' Then 'ENTRADA'
        when 'SI' Then 'SAIDA'
        end as valor,
case sg_direcao
    when 'AJ' Then 'ENTRADA'
        when 'E' Then 'ENTRADA'
        when 'S' Then 'SAIDA'
        when 'CD' Then 'SAIDA'
        when 'EE' Then 'ENTRADA'
        when 'EE' Then 'ENTRADA'
        when 'ES' Then 'SAIDA'
        when 'SI' Then 'ENTRADA'
        when 'SI' Then 'SAIDA'
        end as descricao
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
        ) AS descricao, 
JSON_QUERY(
    (SELECT
CASE cd_tipomovimento
        WHEN  'AJ' THEN 'AJUSTE_ESTOQUE'
        WHEN  'AJE' THEN 'AJUSTE_ESTOQUE'
        WHEN  'AJS' THEN 'AJUSTE_ESTOQUE'
        WHEN  'AQ' THEN 'COMPRA'
        WHEN  'AQI' THEN 'COMPRA'
        WHEN  'BP' THEN 'OUTROS'
        WHEN  'CD' THEN 'OUTROS'
        WHEN  'CDI' THEN 'OUTROS'
        WHEN  'CO' THEN 'REQUISICAO'
        WHEN  'CS' THEN 'OUTROS'
        WHEN  'DE' THEN 'ESTORNO'
        WHEN  'DS' THEN 'ESTORNO'
        WHEN  'SI' THEN 'OUTROS'
        WHEN  'TC' THEN 'TRANSFERENCIA'
        ELSE 'DESCONHECIDO'
    END  as valor,
ds_tipomovimento as descricao
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
        ) AS classificacao        
FROM ALMOTipoMovimento
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        console.log('Dados recebidos da consulta:', resultData);

        const transformedData = resultData.map(record => {
            console.log(record);
        
            // Extrair a descrição e tipo a partir do array
            const descricaoArray = record.descricao;
            const descricao = descricaoArray[0]; // Pega a primeira string do array
            const tipo = descricaoArray[1] ? JSON.parse(descricaoArray[1]) : { valor: "E", descricao: "string" }; // Analisando a string JSON para tipo
        
            // Safely parse classificacao JSON
            const classificacao = record.classificacao ? JSON.parse(record.classificacao) : { valor: "AJUSTE_ESTOQUE", descricao: "string" };
        
            return {
                conteudo:{
                descricao, // Usa a descrição extraída
                tipo: {
                    valor: tipo.valor, // Default to "E" if valor is not provided
                    descricao: tipo.descricao // Default to "string" if descricao is not provided
                },
                classificacao: {
                    valor: classificacao.valor, // Default to "AJUSTE_ESTOQUE" if valor is not provided
                    descricao: classificacao.descricao // Default to "string" if descricao is not provided
                }
            }};
        }).filter(record => record !== null); // Filter out null records
        
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
        
        const batchedData = chunkArray(transformedData, 50);
        let report = [];
        let reportIds = [];
        
        for (const batch of batchedData) {
            try {
                console.log('Enviando o seguinte corpo para a API:', JSON.stringify(batch, null, 2));
        
                const response = await fetch(`https://almoxarifado.betha.cloud/estoque-services/api/conversoes/lotes/naturezas-movimentacao`, {
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
        
        // Save the report in 'report.json'
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));
        console.log('Relatório salvo em report.json com sucesso.');
        
        // Save the reportIds in the 'report_id.json' file
        fs.writeFileSync('report_id.json', JSON.stringify(reportIds, null, 2));
        console.log('report_id.json salvo com sucesso.');

    } catch (error) {
        console.error('Erro no processo:', error);
    } finally {
        await sql.close(); // Close the connection with SQL Server
        console.log('Conexão com o SQL Server fechada.');
    }
}

// Execute the main function
main();