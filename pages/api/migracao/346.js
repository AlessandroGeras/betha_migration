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

        // Selecionar o banco de dados "TRIBUTOS2024"
        const selectDatabaseQuery = 'USE TRIBUTOS2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            SELECT 
                ROW_NUMBER() OVER (ORDER BY Nr_Parcela) AS idIntegracao,
                JSON_QUERY(
                    (SELECT
                        '181504' AS idCalculosTributarios,
                        Dt_Vencimento AS dataVcto,
                        Nr_Parcela AS parcela,
                        Pct_Desconto AS percDesconto,
                        CASE Nr_Parcela
                            WHEN 0 THEN 'SIM'
                            ELSE 'NAO'
                        END AS unica
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS parcelasCalculo
            FROM IPTUVenctosInscricoes
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            // Parse the JSON content
            const content = JSON.parse(record.parcelasCalculo);

            return {
                idIntegracao: record.idIntegracao.toString(), // Prefixing idIntegracao with "INTEGRACAO"
                parcelasCalculo: {
                    idCalculosTributarios: content.idCalculosTributarios,
                    dataVcto: content.dataVcto,
                    parcela: content.parcela,
                    percDesconto: content.percDesconto,
                    unica: content.unica
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
            const response = await fetch('https://tributos.betha.cloud/service-layer-tributos/api/parcelasCalculo', {
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
                const errorResponse = await response.json();
                console.error('Erro detalhado:', errorResponse);
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
