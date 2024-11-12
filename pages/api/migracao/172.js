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
mc.cd_modalidade as id,
mc.ds_modalidade as descricao,
JSON_QUERY(
    (SELECT
        case mc.cd_modalidade
        WHEN  2 THEN 'DIALOGO_COMPETITIVO'
        WHEN  3 THEN 'CONCURSO'
        WHEN  4 THEN 'CONCORRENCIA'
        WHEN  5 THEN 'CONCORRENCIA'
        WHEN  6 THEN 'PREGAO_ELETRONICO'
        WHEN  7 THEN 'PREGAO_PRESENCIAL'
        WHEN  8 THEN 'DISPENSA_LICITACAO'
        WHEN  9 THEN 'INEXIGIBILIDADE'
        WHEN  10 THEN 'MANIFESTACAO_INTERESSE'
        WHEN  11 THEN 'OUTRO'
        WHEN  12 THEN 'OUTRO'
        end as valor,
        mc.ds_modalidade descricao
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS modalidadeLegal,
  case mc.cd_modalidade
        WHEN  2 THEN 'DIC'
        WHEN  3 THEN 'CON'
        WHEN  4 THEN 'COE'
        WHEN  5 THEN 'COP'
        WHEN  6 THEN 'PRE'
        WHEN  7 THEN 'PRP'
        WHEN  8 THEN 'DIL'
        WHEN  9 THEN 'INE'
        WHEN  10 THEN 'MAI'
        WHEN  11 THEN 'PRQ'
        WHEN  12 THEN 'CRE'
        end  as sigla,
 '999999999999.99' as valorCompras,
 '999999999999.99' as valorObras
FROM PNCP_ModalidadeCompra mc
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        console.log('Dados recebidos da consulta:', resultData);

        const transformedData = resultData.map(record => {
            console.log(record);
        
            // Safely parse modalidadeLegal JSON with fallback to a default structure if undefined
            const modalidadeLegal = record.modalidadeLegal ? JSON.parse(record.modalidadeLegal) : { valor: null, descricao: null };
        
            return {
               conteudo:{
                descricao: record.descricao || "string", // Fallback to "string" if descricao is undefined
                modalidadeLegal: {
                    valor: modalidadeLegal.valor || "CONVITE", // Default value if not provided
                    descricao: modalidadeLegal.descricao || "string" // Default value if not provided
                },
                sigla: record.sigla || "string", // Fallback to "string" if sigla is undefined
                valorCompras: parseFloat(record.valorCompras) || 0, // Fallback to 0 if valorCompras is undefined
                valorObras: parseFloat(record.valorObras) || 0 // Fallback to 0 if valorObras is undefined
            }};
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

                const response = await fetch(`https://compras.betha.cloud/compras-services/api/conversoes/lotes/modalidades-licitacao`, {
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