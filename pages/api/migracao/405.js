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
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "COMP_ALMO_CAM"
        const selectDatabaseQuery = 'USE COMP_ALMO';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
ROW_NUMBER() OVER (ORDER BY cd_almoxa) AS id,
JSON_QUERY((SELECT CASE WHEN cd_almoxa = 20100 THEN 5415
                        WHEN cd_almoxa = 20200 THEN 5416
                        WHEN cd_almoxa = 20300 THEN 5418
                        WHEN cd_almoxa = 20500 THEN 5420
                        WHEN cd_almoxa = 20600 THEN 5417
                        WHEN cd_almoxa = 20800 THEN 5421
                        WHEN cd_almoxa = 20900 THEN 5419
                   END as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS almoxarifado,
JSON_QUERY((SELECT CASE WHEN  cd_almoxa = 20100  THEN  2137536
                        WHEN  cd_almoxa = 20200  THEN  2137538
                        WHEN  cd_almoxa = 20300   THEN 2137540
                        WHEN  cd_almoxa =  20500 THEN 2137542
                        WHEN  cd_almoxa = 20600  THEN 2137544
                        WHEN  cd_almoxa = 20800  THEN 2194157
                        WHEN  cd_almoxa = 20900  THEN 2194153
                         END as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS organograma,
12165 AS naturezaMovimentacao,
2024 as Ano,
dt_movimento as dataSaida,
nr_docto as observacao
from ALMOMovimentacao
WHERE sg_direcao = 'CD' and aa_movimento = '2024' and qt_movimento < 0 and fl_devolucao is null 
and (cd_almoxa = 20500)-- or cd_almoxa = 20200 or  cd_almoxa = 20300 or  cd_almoxa = 20500 or  cd_almoxa = 20600 or  cd_almoxa = 20800 or  cd_almoxa = 20900 )
GROUP BY  nr_docto, cd_almoxa, cd_tipomovimento, dt_movimento
order by dt_movimento asc
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            
            return {
                context: {
					almoxarifado: (JSON.parse(record.almoxarifado).id).toString(),
					exercicio: record.Ano.toString(),
				},
                conteudo:{
                almoxarifado: {
                    id: JSON.parse(record.almoxarifado).id
                },
                organograma: {
                    id: JSON.parse(record.organograma).id
                },
                naturezaMovimentacao: {
                    id: JSON.parse(record.naturezaMovimentacao)
                },
                dataSaida: formatDate(record.dataSaida),
                observacao: record.observacao.toString()
            }};
        });

        /* const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        return */

        const chunkArray = (array, size) => {
            const chunked = [];
            for (let i = 0; i < array.length; i += size) {
                chunked.push(array.slice(i, i + size));
            }
            return chunked;
        };
        
        const batchedData = chunkArray(transformedData, 50);
        let report = [];
        let reportIds = [];
        
        for (const batch of batchedData) {
            try {
                console.log('Enviando o seguinte corpo para a API:', JSON.stringify(batch, null, 2));
        
                const response = await fetch(`https://services.almoxarifado.betha.cloud/estoque-services/api/conversoes/lotes/saidas`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 25a840ae-b57a-4030-903a-bcccf2386f30'
                    },
                    body: JSON.stringify(batch)
                });
        
                const responseBody = await response.json();
        
                if (response.ok) {
                    console.log('Dados enviados com sucesso para a API.');
                    batch.forEach(record => {
                        report.push({ record, status: 'success', response: responseBody });
                    });
        
                    if (responseBody.idLote) {
                        reportIds.push(responseBody.idLote);
                    }
                } else {
                    console.error('Erro ao enviar os dados para a API:', response.statusText);
                    batch.forEach(record => {
                        report.push({ record, status: 'failed', response: responseBody });
                    });
                }
            } catch (err) {
                console.error('Erro ao enviar o batch para a API:', err);
                batch.forEach(record => {
                    report.push({ record, status: 'error', error: err.message });
                });
            }
        }
        
        // Save the report in 'report.json'
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));
        console.log('Relatório salvo em report.json com sucesso.');
        
        // Save the reportIds in the 'report_id.json' file
        fs.writeFileSync('report_id.json', JSON.stringify(reportIds, null, 2));
        console.log('report_id.json salvo com sucesso.');

    } catch (error) {
        console.error('Erro no processo:', error);
    } finally {
        await sql.close(); // Close the connection with SQL Server
        console.log('Conexão com o SQL Server fechada.');
    }
}

// Execute the main function
main();