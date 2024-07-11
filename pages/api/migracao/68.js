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

        // Selecionar o banco de dados "PATRIMONIO_CAM"
        const selectDatabaseQuery = 'USE PATRIMONIO';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            SELECT 
    ds_tipoaquisicao as descricao,
    JSON_QUERY(
        (SELECT
            CASE 
                WHEN ds_tipoaquisicao = 'Aquisicao' THEN 'COMPRAS'
                WHEN ds_tipoaquisicao = 'Incorporacao' THEN 'OUTRAS_INCORPORACOES'
                WHEN ds_tipoaquisicao = 'Locacao' THEN 'LOCACAO'
                WHEN ds_tipoaquisicao = 'Comodato' THEN 'COMODATO'
                WHEN ds_tipoaquisicao = 'OUTRAS_INCORPORACOES' THEN 'Consignacao'
                ELSE 'OUTRAS_INCORPORACOES'
            END AS valor,
            ds_tipoaquisicao as descricao
         FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
    ) AS classificacao
FROM PATRTipoAquisicao;
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const classificacao = JSON.parse(record.classificacao);

            return {
                conteudo: {
                    descricao: record.descricao,
                    classificacao: {
                        valor: classificacao.valor,
                        descricao: classificacao.descricao
                    }
                }
            };
        });

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const response = await fetch('https://patrimonio.betha.cloud/patrimonio-services/api/tipos-aquisicao', {
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
        // Lidar com erros de conexão ou consulta aqui
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        await sql.close();
    }
}

// Chamar a função principal
main();

//Mandar para
//https://patrimonio.betha.cloud/patrimonio-services/api/conversoes/lotes/tipos-aquisicao
