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
    return `${year}-${month}-${day} 00:00`;
    //return `${year}-${month}-${day}`;
}

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "FOLHADB"
        const selectDatabaseQuery = 'USE COMP_ALMO';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
JSON_QUERY((SELECT JSON_QUERY((SELECT case nr_processo
when 399 then 1312187
when 475 then 1312188
when 1123 then 1312189
when 1194 then 1312190
when 1240 then 1312191
when 620 then 1312192
when 1400 then 1312193
when 18 then 1312239
when 20 then 1312240
when 28 then 1312241
when 29 then 1312242
when 30 then 1312243
when 31 then 1312244
when 33 then 1312245
when 192 then 1312246
when 216 then 1312247
when 333 then 1312248
when 334 then 1312249
when 335 then 1312250
when 398 then 1312251
when 401 then 1312252
when 461 then 1312253
when 464 then 1312254
when 582 then 1312255
when 588 then 1312256
when 589 then 1312257
when 625 then 1312258
when 744 then 1312260
when 784 then 1312261
when 877 then 1312262
when 878 then 1312263
when 992 then 1312264
when 1046 then 1312265
when 1185 then 1312266
when 1203 then 1312267
when 1218 then 1312268
when 1306 then 1312269
when 1317 then 1312270
when 1331 then 1312271
when 1341 then 1312272
when 1451 then 1312273
when 1503 then 1312274
when 1517 then 1312275
when 1566 then 1312348
when 629 then 1312350
when 3 then 1312414
when 5 then 1312432
when 22 then 1312433
when 34 then 1312436
when 40 then 1312437
when 51 then 1312438
when 86 then 1312439
when 626 then 1312605
when 879 then 1312631
when 16 then 1312640

end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS processoAdm,
JSON_QUERY((SELECT 37588195 as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS responsavel,
JSON_QUERY((SELECT case fl_finalizado 
                                       when 1 then 'HOMOLOGACAO_E_ADJUDICACAO'
                                   end as valor,
case fl_finalizado
when        1        then        'HOMOLOGACAO_E_ADJUDICACAO'
end as descricao FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS tipo,
dt_encerramento as data FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS conteudo
from COMPLicitacao
where aa_licitacao = 2024 and fl_finalizado = 1
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const conteudo = JSON.parse(record.conteudo);
        
            return {
                conteudo: {
                processoAdm: {
                    id: parseInt(conteudo.processoAdm.id) // Coletando o ID de processo administrativo
                },
                responsavel: {
                    id: parseInt(conteudo.responsavel.id) // Coletando o ID do responsável
                },
                tipo: {
                    valor: conteudo.tipo.valor, // Coletando o valor ou atribuindo 'ADJUDICACAO'
                    descricao: conteudo.tipo.descricao // Coletando a descrição ou atribuindo 'string'
                },
                data: formatDate(conteudo.data) // Coletando a data ou usando a data atual no formato ISO
            },
        };
        });
        

        // Salvar os resultados transformados em um arquivo JSON
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
        
                const response = await fetch(`https://compras.betha.cloud/compras-services/api/conversoes/lotes/processo-administrativo-atos-finais`, {
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