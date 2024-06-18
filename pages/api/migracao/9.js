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
        const masterConnection = await connectToSqlServer();
        const selectDatabaseQuery = 'USE COMP_ALMO';
        await masterConnection.query(selectDatabaseQuery);

        const userQuery = `
         SELECT
    ROW_NUMBER() OVER (ORDER BY cd_unidade) AS id,
cd_unidade as simbolo,
ds_unidade as nome,
ds_unidade as nomePlural,
JSON_QUERY(
    (SELECT
'OUTROS' as valor,
'OUTROS' AS descricao
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS grandeza,
 'true' AS fracionaria
FROM ALMOUnidadesDeMedida
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        console.log('Dados recebidos da consulta:', resultData);

        const transformedData = resultData.map(record => ({
            simbolo: record.simbolo,
            nome: record.nome,
            nomePlural: record.nomePlural,
            grandeza: JSON.parse(record.grandeza),
            fracionaria: record.fracionaria
        }));

        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        for (const record of transformedData) {
            const response = await fetch('https://compras.betha.cloud/compras-services/api/unidades-medida', {
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
        await sql.close();
    }
}

main();
