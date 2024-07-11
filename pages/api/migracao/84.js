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

        // Selecionar o banco de dados "COMP_ALMO"
        const selectDatabaseQuery = 'USE COMP_ALMO';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            SELECT 
                cd_prazoentrega AS id,
                ds_prazoentrega AS descricao,
                JSON_QUERY(
                    (SELECT 'UNICA' AS valor, 'UNICA' AS descricao FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS tipoExecucao,
                JSON_QUERY(
                    (SELECT 'DIAS' AS valor, 'DIAS' AS descricao FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS unidadeEntrega,
                CASE cd_prazoentrega 
                    WHEN 1 THEN '0'
                    WHEN 2 THEN '05'
                    WHEN 3 THEN '10'
                    WHEN 4 THEN '15'
                    WHEN 5 THEN '20'
                    WHEN 6 THEN '25'
                    WHEN 7 THEN '30'
                    WHEN 8 THEN '0'
                    WHEN 9 THEN '0'
                    WHEN 60 THEN '60'
                END AS numDiasMeses
            FROM COMPPrazosEntrega
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            return {
                descricao: record.descricao ? record.descricao.trim() : null,
                tipoExecucao: {
                    valor: JSON.parse(record.tipoExecucao).valor,
                    descricao: JSON.parse(record.tipoExecucao).descricao
                },
                unidadeEntrega: {
                    valor: JSON.parse(record.unidadeEntrega).valor,
                    descricao: JSON.parse(record.unidadeEntrega).descricao
                },
                numDiasMeses: record.numDiasMeses && parseInt(record.numDiasMeses) !== 0 ? parseInt(record.numDiasMeses) : null
            };
        });

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        for (const record of transformedData) {
            const response = await fetch('https://pessoal.betha.cloud/service-layer/v1/api/ato', {
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
        // Lidar com erros de conexão ou consulta aqui
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        await sql.close();
    }
}

// Chamar a função principal
main();
