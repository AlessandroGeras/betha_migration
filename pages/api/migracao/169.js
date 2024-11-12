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

function removeFormatting(value) {
    return value.replace(/[^\d]/g, ''); // Remove tudo que não for número
}

async function main() {
    try {
        const masterConnection = await connectToSqlServer();
        const selectDatabaseQuery = 'USE COMP_ALMO';
        await masterConnection.query(selectDatabaseQuery);

        const userQuery = `
            SELECT 
cd_criteriojulgamento as id,
ds_criteriojulgamento as descricao,
JSON_QUERY(
    (SELECT
        'ITEM' as valor,
        'ITEM' as descricao
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS tipoJulgamento,
JSON_QUERY(
    (SELECT
        case cd_criteriojulgamento
         WHEN  1 THEN 'MENOR_PRECO'
        WHEN  2 THEN 'MELHOR_LANCE_OFERTA'
        WHEN  3 THEN 'MELHOR_TECNICA'
        WHEN  4 THEN 'TECNICA_PRECO'
        WHEN  5 THEN 'MAIOR_LANCE'
        WHEN  6 THEN 'MAIOR_RETORNO'
        WHEN  7 THEN 'NAO_APLICA'
                end as valor,
                ds_criteriojulgamento as descricao
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS tipoLicitacao,
JSON_QUERY(
    (SELECT
        'NENHUMA' as valor,
        'NENHUMA' as descricao
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS formaEspecial
FROM PNCP_CriterioJulgamento
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        console.log('Dados recebidos da consulta:', resultData);

        const transformedData = resultData.map(record => {
            console.log(record);
        
            // Parse JSON fields
            const tipoLicitacao = JSON.parse(record.tipoLicitacao);
            const tipoJulgamento = JSON.parse(record.tipoJulgamento);
            const formaEspecial = JSON.parse(record.formaEspecial);
        
            return {
                conteudo: {
                    descricao: record.descricao,
                    tipoLicitacao: {
                        valor: tipoLicitacao.valor,
                        descricao: tipoLicitacao.descricao
                    },
                    tipoJulgamento: {
                        valor: tipoJulgamento.valor,
                        descricao: tipoJulgamento.descricao
                    },
                    formaEspecial: {
                        valor: formaEspecial.valor,
                        descricao: formaEspecial.descricao
                    }
                }
            };
        }).filter(record => record !== null); // Filter out null records
        
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
        
                const response = await fetch(`https://compras.betha.cloud/compras-services/api/conversoes/lotes/formas-julgamento`, {
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