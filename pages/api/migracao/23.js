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

function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    const hours = (`0${d.getHours()}`).slice(-2);
    const minutes = (`0${d.getMinutes()}`).slice(-2);
    const seconds = (`0${d.getSeconds()}`).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}`;
    //return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function formatDate2(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    const hours = (`0${d.getHours()}`).slice(-2);
    const minutes = (`0${d.getMinutes()}`).slice(-2);
    const seconds = (`0${d.getSeconds()}`).slice(-2);
    return `${year}`;
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
            select
JSON_QUERY((SELECT 36134397 AS id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS responsavel,
JSON_QUERY((SELECT '2087643' AS id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS organograma,
JSON_QUERY((SELECT CASE 
                                            WHEN c.cd_unidorca = 20300 THEN 4878
                                                WHEN c.cd_unidorca = 20200 THEN 4877
                                                WHEN c.cd_unidorca = 20500 THEN 4880
                                                WHEN c.cd_unidorca = 20400 THEN 4879
                                                WHEN c.cd_unidorca = 20600 THEN 4881
                                                WHEN c.cd_unidorca = 20700 THEN 4882
                                                WHEN c.cd_unidorca = 21000 THEN 4885
                                                WHEN c.cd_unidorca = 20100 THEN 4832
                                                WHEN c.cd_unidorca = 20900 THEN 4884
                                   END AS id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS almoxarifado,
c.dt_requisicao as dataRequisicao
FROM COMPCotacaoRequisicoes cr
JOIN COMPRequisicao c ON c.nr_requisicao = cr.nr_requisicao
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const responsavelId = JSON.parse(record.responsavel).id;
            const organogramaId = JSON.parse(record.organograma).id;
            const almoxarifadoId = JSON.parse(record.almoxarifado).id;

            return {
                context: {
                    almoxarifado: almoxarifadoId.toString(),
                    exercicio: formatDate2(record.dataRequisicao)
                },
                conteudo:{
                responsavel: JSON.parse(record.responsavel),
                organograma: {
                    id: parseInt(organogramaId),
                },
                almoxarifado: JSON.parse(record.almoxarifado),
                dataRequisicao: formatDate(record.dataRequisicao)
            }};
        });

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            try {
                const response = await fetch('https://compras.betha.cloud/compras-services/api/conversoes/lotes/requisicoes', {
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
