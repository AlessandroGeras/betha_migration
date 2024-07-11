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
ROW_NUMBER() OVER (ORDER BY cd_exercicio) AS id,
JSON_QUERY(
    (SELECT
        '76979000' as cep,
        '0' as digAgencia,
        4102199 as idBairros,
        CASE cd_banco
        when 001 then 137
        when 104 then 148
        when 756 then 51
        else 137
        end as idBancos,
        14424402 as idLogradouros,
        3573 as idMunicipios,
        ds_banco as nome,
        cd_codagencia as nroAgencia
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS agenciasBancarias
from CONTFichaBancos
where cd_exercicio = 2024
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map((record, index) => {
            const agenciasBancarias = JSON.parse(record.agenciasBancarias);
            
            return {
                idIntegracao: record.id, // substitua "INTEGRACAO1" pelo valor desejado
                agenciasBancarias: {
                    cep: agenciasBancarias.cep,
                    digAgencia: agenciasBancarias.digAgencia,
                    idBairros: agenciasBancarias.idBairros,
                    idBancos: agenciasBancarias.idBancos,
                    idLogradouros: agenciasBancarias.idLogradouros,
                    idMunicipios: agenciasBancarias.idMunicipios,
                    nome: agenciasBancarias.nome,
                    nroAgencia: agenciasBancarias.nroAgencia || "4006-1",
                }
            };
        });

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        for (const record of transformedData) {
            const response = await fetch('https://tributos.betha.cloud/service-layer-tributos/api/agenciasBancarias', {
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
