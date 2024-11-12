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

function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
}

async function main() {
    try {
        const masterConnection = await connectToSqlServer();

        const selectDatabaseQuery = 'USE COMP_ALMO';
        await masterConnection.query(selectDatabaseQuery);

        const userQuery = `
            select
        JSON_QUERY(
        (SELECT
            CASE 
                WHEN nr_pedido = 1 THEN 5878418
                WHEN nr_pedido = 4 THEN 5894233
                WHEN nr_pedido = 12 THEN 5894233
                WHEN nr_pedido = 18 THEN 5894233
                WHEN nr_pedido = 19 THEN 5894233
                WHEN nr_pedido = 20 THEN 5894233
                WHEN nr_pedido = 21 THEN 5894233
                WHEN nr_pedido = 2 THEN 5878419
                WHEN nr_pedido = 3 THEN 5878419
                WHEN nr_pedido = 5 THEN 5894234
                WHEN nr_pedido = 15 THEN 5894234
                WHEN nr_pedido = 24 THEN 5894234
                WHEN nr_pedido = 40 THEN 5894234
                WHEN nr_pedido = 9 THEN 5894236
                WHEN nr_pedido = 10 THEN 5894236
                WHEN nr_pedido = 11 THEN 5894236
                WHEN nr_pedido = 13 THEN 5894236
                WHEN nr_pedido = 22 THEN 5894236
                WHEN nr_pedido = 23 THEN 5894236
                WHEN nr_pedido = 41 THEN 5894236
                WHEN nr_pedido = 43 THEN 5894236
                WHEN nr_pedido = 6 THEN 5894235
                WHEN nr_pedido = 7 THEN 5894235
                WHEN nr_pedido = 8 THEN 5894235
                WHEN nr_pedido = 14 THEN 5894235
                WHEN nr_pedido = 25 THEN 5894235
                WHEN nr_pedido = 26 THEN 5894235
                WHEN nr_pedido = 29 THEN 5894235
                WHEN nr_pedido = 32 THEN 5894235
                WHEN nr_pedido = 33 THEN 5894235
                WHEN nr_pedido = 42 THEN 5894235
                WHEN nr_pedido = 16 THEN 5894237
                WHEN nr_pedido = 17 THEN 5894237
                WHEN nr_pedido = 44 THEN 5894237
                WHEN nr_pedido = 45 THEN 5894237
                WHEN nr_pedido = 27 THEN 5878426
                WHEN nr_pedido = 28 THEN 5878426
                WHEN nr_pedido = 30 THEN 5878427
                WHEN nr_pedido = 31 THEN 5878427
                WHEN nr_pedido = 36 THEN 5878428
                WHEN nr_pedido = 37 THEN 5878428
                WHEN nr_pedido = 38 THEN 5878429
                WHEN nr_pedido = 39 THEN 5878429
            END AS id
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
    )as contratacao,
        JSON_QUERY(
        (SELECT
            CASE cd_unidorca
                WHEN 20100 THEN 2134004
                WHEN 20200 THEN 2134009 
                WHEN 20300 THEN 2134011
                WHEN 20400 THEN 2134013
                WHEN 20500 THEN 2134015
                WHEN 20600 THEN 2144353
                WHEN 20700 THEN 2134017
                WHEN 20800 THEN 2134022
                WHEN 20900 THEN 2144356
                WHEN 21000 THEN 2144358
            END AS id
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
    ) AS organograma,
        nr_pedido as numero,
        'Edivaldo' as nomeSolicitante,
        '2024-10-14' as data,
        JSON_QUERY(
        (SELECT
            CASE
                WHEN nr_pedido = 1 THEN 36134752
                WHEN nr_pedido IN (4, 12, 18, 18, 19, 20, 21) THEN 36134753
                WHEN nr_pedido IN (2, 3) THEN 36134722
                WHEN nr_pedido IN (5, 15, 24, 40) THEN 36134169
                WHEN nr_pedido IN (9, 10, 11, 13, 22, 23, 41, 43) THEN 36134173
                WHEN nr_pedido IN (6, 7, 8, 14, 25, 26, 29, 32, 33, 42) THEN 36134168
                WHEN nr_pedido IN (16, 17, 44, 45) THEN 36134171
                WHEN nr_pedido IN (27, 28) THEN 36134708
                WHEN nr_pedido IN (30, 31) THEN 36134439
                WHEN nr_pedido IN (36, 37) THEN 36134708
                WHEN nr_pedido IN (38, 39) THEN 36134708
            END AS id
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
    ) AS fornecedor
from COMPPedidos where aa_licitacao = 2024 and nr_pedido not in (34, 35);
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        const transformedData = resultData.map(record => {
            try {
                const contratacao = record.contratacao ? JSON.parse(record.contratacao) : null;
                const organograma = record.organograma ? JSON.parse(record.organograma) : null;
                const fornecedor = record.fornecedor ? JSON.parse(record.fornecedor) : null;
                const numero = record.numero ? JSON.parse(record.numero) : null;
                
                return {
                    contratacao: {
                        id: contratacao?.id || null
                    },
                    organograma: {
                        id: organograma?.id || null
                    },
                    numero: numero || null,
                    nomeSolicitante: record.nomeSolicitante,
                    data: record.data,
                    fornecedor: {
                        id: fornecedor?.id || null
                    }
                };
            } catch (err) {
                console.error('Erro ao processar registro:', err);
                return null;
            }
        }).filter(record => record !== null);

        let report = [];

        for (const record of transformedData) {
            const contratacaoId = record.contratacao.id;

            if (contratacaoId) {
                try {
                    const response = await fetch(`https://services.contratos.betha.cloud/contratacao-services/api/exercicios/2024/contratacoes/${contratacaoId}/solicitacoes`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                        },
                        body: JSON.stringify(record)
                    });

                    const responseBody = await response.json();

                    if (response.ok) {
                        console.log(`Dados enviados com sucesso para a rota.`);
                        report.push({ record, status: 'success', response: responseBody });
                    } else {
                        console.error(`Erro ao enviar os dados para a rota:`, response.statusText);
                        report.push({ record, status: 'failed', response: responseBody });
                    }
                } catch (err) {
                    console.error(`Erro ao enviar o registro para a rota:`, err);
                    report.push({ record, status: 'error', error: err.message });
                }
            } else {
                console.error('ID de contratação inválido. O registro será ignorado.');
                report.push({ record, status: 'invalid', error: 'ID de contratação inválido.' });
            }
        }

        // Salvar o relatório em 'report.json'
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));
        console.log('Relatório salvo em report.json');

    } catch (error) {
        console.error('Erro durante a execução do programa:', error);
    } finally {
        sql.close();
    }
}

main();
