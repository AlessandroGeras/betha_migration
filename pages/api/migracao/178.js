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

        // Selecionar o banco de dados "CONTABIL2024"
        const selectDatabaseQuery = 'USE CONTABIL2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
                ROW_NUMBER() OVER (ORDER BY cd_programa) AS idIntegracao,
                JSON_QUERY(
                    (SELECT
                        JSON_QUERY(
                            (SELECT '9569' as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                        ) AS ppa,
                        cd_programa as numero,
                        ds_programa as descricao,
                        ds_Justificativa as justificativa,
                        ds_Objetivo as objetivos,
                        'CONTINUO' as horizonteTemporal
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS content
            from CONT_PROGRAMAS
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const content = JSON.parse(record.content);
            return {
                idIntegracao: record.idIntegracao.toString().replace(/\D/g, ''), // Remove any non-alphanumeric characters
                content: {
                    ppa: {
                        id: parseInt(content.ppa.id, 10) // Convertendo para inteiro
                    },
                    numero: parseInt(content.numero, 10), // Convertendo para inteiro
                    descricao: content.descricao,
                    justificativa: content.justificativa,
                    objetivos: content.objetivos,
                    horizonteTemporal: content.horizonteTemporal
                }
            };
        });

        const chunkSize = 50;
        const chunks = [];
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            chunks.push(chunk);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar cada chunk de registros de uma vez para a rota desejada
        /* for (const chunk of chunks) {
            const response = await fetch('https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/programas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                },
                body: JSON.stringify(chunk)
            });

            if (response.ok) {
                console.log(`Dados do chunk enviados com sucesso para a rota.`);
            } else {
                console.error(`Erro ao enviar os dados do chunk para a rota:`, response.statusText);
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
