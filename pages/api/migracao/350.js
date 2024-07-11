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
            select
 ROW_NUMBER() OVER (ORDER BY ds_tipoLogradouroEnt) AS idIntegracao,
 JSON_QUERY(
    (SELECT
case ds_tipoLogradouroEnt
when 'AV' THEN 14
when 'LINHA' THEN 3562
ELSE 143 
END AS idTipoLogradouro,
ds_logradouroent AS nome,
'3573' as idMunicipio,
'76979000' as cep
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS logradouros
from  IPTUImoveis
group by ds_tipoLogradouroEnt, ds_logradouroent
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Initialize idLogradouro with a fixed value of 2
        let currentIdLogradouro = 2;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const logradouros = JSON.parse(record.logradouros);

            const transformedRecord = {
                idIntegracao: record.idIntegracao,
                logradouros: {
                    idLogradouro: currentIdLogradouro, // Use the current value of idLogradouro
                    idTipoLogradouro: logradouros.idTipoLogradouro,
                    idMunicipio: logradouros.idMunicipio,
                    cep: logradouros.cep,
                    nome: logradouros.nome
                }
            };

            // Increment idLogradouro for the next record
            currentIdLogradouro++;

            return transformedRecord;
        });

        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar cada registro individualmente para a rota desejada
        for (const record of transformedData) {
            const response = await fetch('https://tributos.betha.cloud/service-layer-tributos/api/logradouros', {
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
