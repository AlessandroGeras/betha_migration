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
cd_TipoCancelamento as idIntegracao,
JSON_QUERY(
    (SELECT
        ds_TipoCancelamento as descricao,
        case cd_TipoCancelamento
        when 1 then 'REQUERIMENTOS'
        when 2 then 'ESTORNO_PAGAMENTO'
        when 3 then 'REQUERIMENTOS'
        when 4 then 'SIMPLES_NACIONAL'
        when 5 then 'ESTORNO_PAGAMENTO'
        when 6 then 'CANCELAMENTO_DOCUMENTOS'
        when 7 then 'CANCELAMENTO_DOCUMENTOS'
        when 8 then 'SIMPLES_NACIONAL'
        end as tipoMotivo,
        'SIM' AS erroFalha
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS motivos
from DVATTipoCancelamento
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const motivos = JSON.parse(record.motivos); // Parse the JSON string to an object
            
            return {
                idIntegracao: record.idIntegracao,
                motivos: {
                    descricao: motivos.descricao,
                    tipoMotivo: motivos.tipoMotivo,
                    erroFalha: motivos.erroFalha,
                }
            };
        });

        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        for (const record of transformedData) {
            const response = await fetch('https://tributos.betha.cloud/service-layer-tributos/api/motivos', {
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
