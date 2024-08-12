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
        const selectDatabaseQuery = 'USE COMP_ALMO_CAM';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            SELECT 
    ROW_NUMBER() OVER (ORDER BY nr_cotacao) AS id,
    JSON_QUERY(
        (SELECT cd_usuario as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
    ) AS responsavel,
    nr_cotacao as numero,
    aa_cotacao as dataCotacao,
    ds_validade as dataValidade,
    '' as objeto,
    '' as observacao
FROM 
    COMPCotacaoFornecedores;
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            // Determinar o ID do parametroExerc com base no ano da cotação
            const dataCotacaoYear = record.dataCotacao; // Considerando que dataCotacao já é um número
            const parametroExercId = 
                dataCotacaoYear === 2024 ? 17573 :
                dataCotacaoYear === 2023 ? 18922 :
                dataCotacaoYear === 2013 ? 19066 :
                dataCotacaoYear === 2014 ? 19067 :
                dataCotacaoYear === 2017 ? 19068 :
                null;
            

            return {
                conteudo: {
                    numero: record.numero,
                    dataCotacao: record.dataCotacao,
                    dataValidade: record.dataValidade,
                    objeto: record.objeto,
                    observacao: record.observacao,
                    parametroExerc: {
                        id: parametroExercId
                    },
                    responsavel: JSON.parse(record.responsavel)
                },
                context: {
                    exercicio: dataCotacaoYear.toString() // Use o ano da dataCotacao
                }
            };
        });

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            try {
                const response = await fetch('https://compras.betha.cloud/compras-services/api/conversoes/lotes/cotacoes', {
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
            } catch (error) {
                console.error('Erro durante o envio do registro:', error);
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
