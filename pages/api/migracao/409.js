const sql = require('mssql');
const dotenv = require('dotenv');
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
    return `${year}-${month}-${day}`;
}

async function main() {
    try {
        const masterConnection = await connectToSqlServer();

        const selectDatabaseQuery = 'USE CONTABIL2024';
        await masterConnection.query(selectDatabaseQuery);

        const userQuery = `
        select
 ROW_NUMBER() OVER (ORDER BY cd_cecam) AS idIntegracao,
JSON_QUERY(
    (SELECT
 cd_Exercicio as exercicio,
 cd_PassivoNaoFinanceiro as numero,
 '2024-01-01' as data,
vl_PassivoNaoFinanceiro as valor,
JSON_QUERY(
    (SELECT
   22276 as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS tipo,
JSON_QUERY(
    (SELECT
  case cd_Fornecedor
when        38        then        6446110
when        910        then        6445310
when        914        then        6445329
when        1382        then        6447652
when        1412        then        6445408
when        1423        then        6447582
when        1512        then        6447650
when        1513        then        6445437
when        1514        then        6447662
when        1515        then        6445374
when        1516        then        6447557
when        1544        then        6445393
when        1545        then        6447665
when        1546        then        6447594
when        1661        then        6445500
when        1859        then        6447649
when        2179        then        6445546
end   as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS credor,
ds_PassivoNaoFinanceiro as especificacao,
JSON_QUERY(
    (SELECT
   '1' as numero,
   '2024-12-31' as dataVencimento,
   vl_PassivoNaoFinanceiro as valorPrincipal
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS parcelas
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
from CONTPASSIVONAOFINANCEIRO

        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        const transformedData = resultData.map(record => {
            const content = JSON.parse(record.content);

            return {
                idIntegracao: record.idIntegracao.toString(),
                content: {
                    exercicio: content.exercicio,
                    numero: content.numero.toString(),
                    data: content.data,
                    valor: content.valor <= 0 ? 0.01 : content.valor,
                    tipo: {
                        id: content.tipo.id
                    },
                    credor: {
                        id: content.credor.id
                    },
                    especificacao: content.especificacao,
                    parcelas: [{
                        numero: parseInt(content.parcelas.numero),
                        dataVencimento: content.parcelas.dataVencimento,
                        valor: content.parcelas.valorPrincipal <= 0 ? 0.01 : content.parcelas.valorPrincipal
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
        
                const response = await fetch(`https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/precatorios`, {
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