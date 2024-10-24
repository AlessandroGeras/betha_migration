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
    const hours = (`0${d.getHours()}`).slice(-2);
    const minutes = (`0${d.getMinutes()}`).slice(-2);
    const seconds = (`0${d.getSeconds()}`).slice(-2);
    return `${year}-${month}-${day}`;
    //return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function formatDate2(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    const hours = (`0${d.getHours()}`).slice(-2);
    const minutes = (`0${d.getMinutes()}`).slice(-2);
    const seconds = (`0${d.getSeconds()}`).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    //return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function parseJsonSafe(data) {
    try {
        return JSON.parse(data);
    } catch (error) {
        console.error('Erro ao parsear JSON:', error);
        return null;
    }
}

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "COMP_ALMO"
        const selectDatabaseQuery = 'USE COMP_ALMO';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            SELECT 
    JSON_QUERY(
        (SELECT 
            CASE nr_processo
                WHEN 28 THEN 1240881
                WHEN 20 THEN 1240882
                WHEN 18 THEN 1240883
                WHEN 31 THEN 1240884
                WHEN 30 THEN 1240885
                WHEN 33 THEN 1240886
                WHEN 29 THEN 1240887
                WHEN 216 THEN 1240888
                WHEN 333 THEN 1240889
                WHEN 334 THEN 1240890
                WHEN 335 THEN 1240891
            END AS id
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
    ) AS processoAdm,
         JSON_QUERY(
                (SELECT 
                    18 AS id
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
            ) AS tipoSessaoJulgamento
FROM 
    COMPLicitacao
WHERE 
    aa_licitacao = 2024 AND fl_finalizado = 1;


        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            // Parse JSON strings
            const processoAdm = parseJsonSafe(record.processoAdm); // Retornar o valor de processoAdm do SELECT
            const tipoSessaoJulgamento = parseJsonSafe(record.tipoSessaoJulgamento); // Retornar o valor de tipoSessaoJulgamento do SELECT
        
            return {
                conteudo:{
                processoAdministrativo: {
                    id: processoAdm?.id
                },
                tipoSessaoJulgamento: {
                    id: tipoSessaoJulgamento?.id
                }}
            };
        });

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const response = await fetch('https://compras.betha.cloud/compras-services/api/conversoes/lotes/sessao-julgamento', {
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
        console.error('Erro durante o processamento:', error);
    } finally {
        await sql.close();
    }
}

main();
