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

        // Selecionar o banco de dados "PATRIMONIO"
        const selectDatabaseQuery = 'USE PATRIMONIO';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
              select
  JSON_QUERY( (SELECT
 case B.cd_tipobem
 when        104        then        46492
when        106        then        46493
when        108        then        46494
when        110        then        46495
when        112        then        46496
when        118        then        46497
when        122        then        46498
when        124        then        46499
when        126        then        46500
when        128        then        46501
when        130        then        46502
when        132        then        46503
when        133        then        46504
when        134        then        46505
when        135        then        46506
when        136        then        46507
when        138        then        46508
when        139        then        46509
when        140        then        46510
when        142        then        46511
when        148        then        46512
when        152        then        46513
when        199        then        46516
when        201        then        46517
when        202        then        46518
when        203        then        46519
when        206        then        46522
when        208        then        46524
when        211        then        46527
when        212        then        46528
when        213        then        46529
when        216        then        46529
when        217        then        46515
when        2003        then        46533
end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS grupoBem,
   C.ds_categoria as descricao
   from PATRCategorias C 
  JOIN PATRBensPatrimoniais B ON B.cd_categoria = C.cd_categoria
 JOIN  PATRTiposBens T ON T.cd_tipobem = B.cd_tipobem
 GROUP BY B.cd_tipobem, C.ds_categoria
 order by B.cd_tipobem
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const grupoBem = JSON.parse(record.grupoBem);

            return {
                conteudo: {
                    grupoBem: {
                        id: grupoBem.id
                    },
                    descricao: record.descricao
                }
            };
        });

        // Salvar os resultados transformados em um arquivo JSON
        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const response = await fetch('https://patrimonio.betha.cloud/patrimonio-services/api/conversoes/lotes/especies-bem', {
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
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        sql.close();
    }
}

main();
