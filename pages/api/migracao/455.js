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

        // Selecionar o banco de dados "CONTABIL2024"
        const selectDatabaseQuery = 'USE CONTABIL2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
ROW_NUMBER() OVER (ORDER BY ct.cd_empenho) AS idIntegracao,
JSON_QUERY(
(SELECT
            'false' as validaSaldo,
           ct. cd_exercicio as exercicio,
           ct. dt_emissao as data,
            ct.cd_empenho  as numeroCadastro,
                CONCAT('ANULAÇÃO DO EMPENHO Nº: ',ct.cd_empenho_base)  AS motivo,
               (ct. vl_empenho * -1) AS valor,
                        JSON_QUERY(
(SELECT 
case ct.cd_empenho_base
 when 1751 then 20646449
 when 536 then 20646564
 when 1578 then 20646566
 when 1698 then 20646607
 when 2148 then 20646660
 when 1888 then 20646694
 when 274 then 20646782
 when 653 then 20646803
 when 655 then 20646817
 when 751 then 20646824
 when 651 then 20646837
 when 904 then 20646838
 when 1997 then 20646867
 when 1998 then 20646876
 when 657 then 20646897
 when 658 then 20646912
 when 749 then 20646921
 when 654 then 20646933
 when 1472 then 20646934
 when 429 then 20646952
 when 40 then 20646969
 when 656 then 20646978
 when 1483 then 20647017
 when 1475 then 20647021
 when 462 then 20647051
 when 1476 then 20647054
 when 1479 then 20647059
 when 1473 then 20647060
 when 947 then 20647061
 when 1474 then 20647063
 when 1480 then 20647069
 when 752 then 20647071
 when 750 then 20647077
 when 949 then 20647087
 when 902 then 20647098
 when 652 then 20647115
 when 396 then 20647173
 when 1620 then 20647184
 when 69 then 20647211
 when 1619 then 20647215
 when 95 then 20647289
 when 88 then 20647298
 when 96 then 20647301
 when 335 then 20647323
 when 350 then 20647736
 when 97 then 20647753
 when 1420 then 20647801
 when 2140 then 20647908
 when 2138 then 20647911
 when 2139 then 20647927
 when 1434 then 20647941
 when 1481 then 20647954
 when 1603 then 20647974
 when 1820 then 20647988
 when 1821 then 20648081
 when 1993 then 20648110
 when 632 then 20648120
 when 957 then 20648176
 when 287 then 20648192
 when 263 then 20648374
 when 939 then 20648394
 when 621 then 20648459
 when 89 then 20648533
 when 1627 then 20648575
 when 2081 then 20648585
 when 56 then 20648589

end as id
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS empenho
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content        
from CONTEMPENHOS as ct
inner join CONTFORNECEDORES as a 
on ct.cd_fornecedor = a.cd_fornecedor
inner join CONTFICHADESPESA as d
on ct.cd_fichadesp = d.cd_fichadesp
and ct.cd_cecam = d.cd_cecam
WHERE ct.cd_cecam = 1995
and ct.cd_fichadesp < 5000
and ct.vl_empenho < 0
and cd_empenhob_base = 0
----and ct.cd_empenho = 431



        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            // Parse the JSON content (se necessário)
            const content = JSON.parse(record.content);

            return {
                idIntegracao: record.idIntegracao.toString(), // Convertendo idIntegracao para string
                content: {
                    validaSaldo: content.validaSaldo === "true", // Convertendo string "true"/"false" para booleano
                    exercicio: content.exercicio || 2024, // Usando o valor do conteúdo ou 2024 como padrão
                    empenho: {
                        id: content.empenho?.id || 20030321 // Coletando ID do empenho, com valor padrão
                    },
                    numeroCadastro: content.numeroCadastro || 100122, // Valor padrão 100122
                    data: formatDate(content.data || '2024-01-25'), // Formatando data no formato AAAA-MM-DD com padrão
                    valor: content.valor || 69485.0100, // Usando valor padrão se não houver valor
                    motivo: content.motivo || "ANULAÇÃO DO EMPENHO Nº: 88" // Motivo padrão
                }
            };
        }).filter(record => record !== null); // Filtrando registros nulos
        


/* 
         const chunkSize = 50;
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
        
                const response = await fetch(`https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/anulacoes-empenhos`, {
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