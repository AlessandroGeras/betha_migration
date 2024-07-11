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

        // Selecionar o banco de dados "COMP_ALMO_CAM"
        const selectDatabaseQuery = 'USE COMP_ALMO_CAM';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
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
                ) AS tipo, 
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
                            ELSE 'OUTROS'
                        END as valor,
                        ds_tipomovimento as descricao
                        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS classificacao        
            FROM ALMOTipoMovimento
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData
            .map(record => {
                let tipo, classificacao;
                try {
                    tipo = JSON.parse(record.tipo);
                    classificacao = JSON.parse(record.classificacao);
                } catch (error) {
                    console.error('Erro ao fazer parse dos campos:', record.tipo, record.classificacao, error);
                    throw error;
                }

                return {
                    descricao: record.descricao,
                    tipo: {
                        valor: tipo.valor,
                        descricao: tipo.descricao,
                    },
                    classificacao: {
                        valor: classificacao.valor,
                        descricao: classificacao.valor
                    }
                };
            })
            .filter(record => record.classificacao.valor !== 'TRANSFERENCIA');

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        for (const record of transformedData) {
            const response = await fetch('https://almoxarifado.betha.cloud/estoque-services/api/naturezas-movimentacao', {
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
