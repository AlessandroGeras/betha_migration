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
        const selectDatabaseQuery = 'USE TRIBUTOS2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
 ROW_NUMBER() OVER (ORDER BY sg_Estado) AS idIntegracao,
JSON_QUERY(
    (SELECT
 '1'  as idPaises,
 ds_Estado as nome,
 sg_Estado as uf,
 case sg_Estado
 WHEN 'AC' THEN 12  -- Acre
        WHEN 'AL' THEN 27  -- Alagoas
        WHEN 'AM' THEN 13  -- Amazonas
        WHEN 'AP' THEN 16  -- Amapá
        WHEN 'BA' THEN 29  -- Bahia
        WHEN 'CE' THEN 23  -- Ceará
        WHEN 'DF' THEN 53  -- Distrito Federal
        WHEN 'ES' THEN 32  -- Espírito Santo
        WHEN 'GO' THEN 52  -- Goiás
        WHEN 'MA' THEN 21  -- Maranhão
        WHEN 'MG' THEN 31  -- Minas Gerais
        WHEN 'MS' THEN 50  -- Mato Grosso do Sul
        WHEN 'MT' THEN 51  -- Mato Grosso
        WHEN 'PA' THEN 15  -- Pará
        WHEN 'PB' THEN 25  -- Paraíba
        WHEN 'PE' THEN 26  -- Pernambuco
        WHEN 'PI' THEN 22  -- Piauí
        WHEN 'PR' THEN 41  -- Paraná
        WHEN 'RJ' THEN 33  -- Rio de Janeiro
        WHEN 'RN' THEN 24  -- Rio Grande do Norte
        WHEN 'RO' THEN 11  -- Rondônia
        WHEN 'RR' THEN 14  -- Roraima
        WHEN 'RS' THEN 43  -- Rio Grande do Sul
        WHEN 'SC' THEN 42  -- Santa Catarina
        WHEN 'SE' THEN 28  -- Sergipe
        WHEN 'SP' THEN 35  -- São Paulo
        WHEN 'TO' THEN 17  -- Tocantins
        ELSE 0
                end as codigoIBGE,
 1 as idTemplate,
 1 as versionTemplate
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS estados
from CECAMEstados
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        console.log(resultData);

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => ({
            idIntegracao: record.idIntegracao, // substitua "INTEGRACAO1" pelo valor desejado
            estados: (() => {
                const estadosObj = JSON.parse(record.estados);
                return {
                    idPaises: estadosObj.idPaises ? parseInt(estadosObj.idPaises) : null,
                    nome: estadosObj.nome,
                    uf: estadosObj.uf,
                    codigoIBGE: estadosObj.codigoIBGE ? parseInt(estadosObj.codigoIBGE) : null,
                };
            })()
        }));


        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        for (const record of transformedData) {
            const response = await fetch('https://pessoal.betha.cloud/service-layer/v1/api/estado', {
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
