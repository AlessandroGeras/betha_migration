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

        // Selecionar o banco de dados "PATRIMONIO"
        const selectDatabaseQuery = 'USE PATRIMONIO';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            SELECT
                JSON_QUERY(
                    (SELECT
                        CASE B.cd_tipobem
                            WHEN 104 THEN 46492
                            WHEN 106 THEN 46493
                            WHEN 108 THEN 46494
                            WHEN 110 THEN 46495
                            WHEN 112 THEN 46496
                            WHEN 118 THEN 46497
                            WHEN 122 THEN 46498
                            WHEN 124 THEN 46499
                            WHEN 126 THEN 46500
                            WHEN 128 THEN 46501
                            WHEN 130 THEN 46502
                            WHEN 132 THEN 46503
                            WHEN 133 THEN 46504
                            WHEN 134 THEN 46505
                            WHEN 135 THEN 46506
                            WHEN 136 THEN 46507
                            WHEN 138 THEN 46508
                            WHEN 139 THEN 46509
                            WHEN 140 THEN 46510
                            WHEN 142 THEN 46511
                            WHEN 148 THEN 46512
                            WHEN 152 THEN 46513
                            WHEN 199 THEN 46516
                            WHEN 201 THEN 46517
                            WHEN 202 THEN 46518
                            WHEN 203 THEN 46519
                            WHEN 206 THEN 46522
                            WHEN 208 THEN 46524
                            WHEN 211 THEN 46527
                            WHEN 212 THEN 46528
                            WHEN 213 THEN 46529
                            WHEN 216 THEN 46529
                            WHEN 217 THEN 46515
                            WHEN 2003 THEN 46533
                        END AS id
                        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS grupoBem,
                C.ds_categoria AS descricao
            FROM PATRCategorias C
            JOIN PATRBensPatrimoniais B ON B.cd_categoria = C.cd_categoria
            JOIN PATRTiposBens T ON T.cd_tipobem = B.cd_tipobem
            GROUP BY B.cd_tipobem, C.ds_categoria
            ORDER BY B.cd_tipobem
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const grupoBem = JSON.parse(record.grupoBem);

            return {
                content: {
                    grupoBem: {
                        id: grupoBem.id
                    },
                    descricao: record.descricao
                }
            };
        });

        // Salvar os resultados transformados em um arquivo JSON
        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const response = await fetch('https://patrimonio.betha.cloud/patrimonio-services/api/conversoes/lotes/especies-bem', {
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
