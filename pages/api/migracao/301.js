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

        // Selecionar o banco de dados "FOLHA_CAM"
        const selectDatabaseQuery = 'USE FOLHA_CAM';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select
JSON_QUERY(
    (SELECT
                 JSON_QUERY(
    (SELECT
           fo.cd_Funcionario as id
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
        ) AS matricula,        
fo.dh_Afastamento as inicioAfastamento,
fo.dh_Retorno as fimAfastamento,
fo.ds_Historico as motivo,
fo.id_Ocorrencia as numeroProcesso,
am.ds_AfastamentoMotivo as observacao
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS conteudo
from FOLHFuncOcorrencia fo
join FOLHESAfastamentoMotivo am on am.cd_AfastamentoMotivo = fo.cd_SitAfastamento
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const conteudo = JSON.parse(record.conteudo); // Parse the JSON string to an object

            return {
                idIntegracao: conteudo.funcionario.id.toString(),
                idGerado: conteudo.funcionario.id.toString(), // Assuming id is used as idGerado
                conteudo: {
                    id: conteudo.funcionario.id, // Default value
                    funcionario: {
                        id: conteudo.funcionario.id
                    },
                    configuracaoLicencaPremio: {
                        id: conteudo.configuracaoLicencaPremio.id,
                    },
                    dataInicial: conteudo.dataInicial,
                    dataFinal: conteudo.dataFinal,
                }
            };
        });

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        for (const record of transformedData) {
            const response = await fetch('https://pessoal.betha.cloud/service-layer/v1/api/ocorrencias', {
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
