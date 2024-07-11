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
        const selectDatabaseQuery = 'USE FOLHA_FMS';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
JSON_QUERY(
    (SELECT
        id_AtoLegal as id,
        nr_AtoLegal as numeroOficial,
        JSON_QUERY(
    (SELECT
        case cd_AtoLegalTipo
                WHEN  1 THEN 50218
    WHEN 2 THEN 50219
    WHEN 3 THEN 50220
    WHEN 4 THEN 50229
    WHEN 5 THEN 50221
    WHEN 6 THEN 50223
    WHEN 7 THEN 50231
    WHEN 8 THEN 50232
    WHEN 9 THEN 50233
    WHEN 10 THEN 50225
    WHEN 11 THEN 50234
    WHEN 12 THEN 50227
    WHEN 13 THEN 50235
    WHEN 14 THEN 50236
    WHEN 99 THEN 50237
                end as id 
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
        ) AS tipo,
        ds_Ementa as ementa,
        JSON_QUERY(
    (SELECT
        '16196' as id
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
        ) AS naturezaTextoJuridico,
     dt_Publicacao as dataCriacao,
        dt_Publicacao as dataVigorar,
        dt_Publicacao as dataPublicacao
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
        ) AS conteudo
from FOLHAtoLegal


        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const conteudo = JSON.parse(record.conteudo);

            return {
                idIntegracao: conteudo.id.toString(), // ID de integração
                conteudo: {
                    id: conteudo.id,
                    numeroOficial: conteudo.numeroOficial,
                    tipo: {
                        id: conteudo.tipo.id
                    },
                    ementa: conteudo.ementa,
                    naturezaTextoJuridico: {
                        id: conteudo.naturezaTextoJuridico.id
                    },
                    dataCriacao: conteudo.dataCriacao,
                    dataVigorar: conteudo.dataVigorar,
                    dataPublicacao: conteudo.dataPublicacao,
                }
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
