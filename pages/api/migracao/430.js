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
    return `${year}-${month}-${day}`;
    //return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "COMP_ALMO"
        const selectDatabaseQuery = 'USE CONTABIL2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            	select 
ROW_NUMBER() OVER (ORDER BY Numero) AS idIntegracao,
JSON_QUERY((SELECT Numero as numero,
                                   publicacao as dataPublicacao,
                                   data as dataSancao,
                                   JSON_QUERY((SELECT 23370 as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS tipo,
                                   JSON_QUERY((SELECT 24315 as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS naturezaTextoJuridico,
                                   JSON_QUERY((SELECT 15126 as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS fontesDivulgacoes FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS content
from CONTLEI
where ano in (2021,2022,2023,2024)
order by ano
        `;

        const result = await masterConnection.query(userQuery);

        const resultData = result.recordset;

        const transformedData = resultData.map(record => {
            
            return {
                idIntegracao: record.idIntegracao.toString(), // Convertendo para string se necessário
                content: {
                    numero: JSON.parse(record.content).numero.toString(), // Extraindo o campo 'numero' de 'content'
                    dataPublicacao: formatDate(JSON.parse(record.content).dataPublicacao), // Extraindo e formatando 'dataPublicacao'
                    dataSancao: formatDate(JSON.parse(record.content).dataSancao), // Extraindo e formatando 'dataPublicacao'
                    dataVigorar: formatDate(JSON.parse(record.content).dataSancao), // Extraindo e formatando 'dataPublicacao'
                    tipo: {
                        id: JSON.parse(record.content).tipo.id // Extraindo o campo 'id' de 'tipo'
                    },
                    naturezaTextoJuridico: {
                        id: JSON.parse(record.content).naturezaTextoJuridico.id // Extraindo o campo 'id' de 'naturezaTextoJuridico'
                    },
                    fontesDivulgacoes: [{
                        id: JSON.parse(record.content).fontesDivulgacoes.id // Extraindo o campo 'id' de 'naturezaTextoJuridico'
                    }]
                }
            };
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

                const response = await fetch(`https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/atos`, {
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