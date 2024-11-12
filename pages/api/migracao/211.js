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
        const selectDatabaseQuery = 'USE COMP_ALMO';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
 SELECT 
id_tipopoderorgao as id,
ds_tipopoderorgao as descricao,
JSON_QUERY(
    (SELECT
        'DIRETO' as valor,
        ds_tipopoderorgao as descricao
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS tipoAdministracao,
JSON_QUERY(
    (SELECT
        case ds_tipopoderorgao
                when 'Legislativo' then 'LEGISLATIVO'
                when 'Executivo' then 'EXECUTIVO '
                end as valor,
        ds_tipopoderorgao as descricao
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS poder
FROM PNCP_TipoPoderOrgao where id_tipopoderorgao in (1,2)
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
        
            // Parse JSON fields and handle errors gracefully
            const parseJsonField = (field) => {
                try {
                    const parsedField = JSON.parse(field);
                    parsedField.valor = parsedField.valor.toUpperCase();
                    return parsedField;
                } catch (e) {
                    console.error(`Failed to parse field: ${field}`, e);
                    return { valor: '', descricao: '' };
                }
            };
        
            return {
                conteudo:{
                descricao: record.descricao.toUpperCase(),
                tipoAdministracao: parseJsonField(record.tipoAdministracao),
                poder: parseJsonField(record.poder),
            }};
        });

        /* const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        return   */
        
        // Function to split data into chunks
        const chunkArray = (array, size) => {
            const chunked = [];
            for (let i = 0; i < array.length; i += size) {
                chunked.push(array.slice(i, i + size));
            }
            return chunked;
        };
        
        // Batch the data and send to the API in chunks
        const batchedData = chunkArray(transformedData, 50);
        let report = [];
        let reportIds = [];
        
        for (const batch of batchedData) {
            try {
                console.log('Sending the following batch to the API:', JSON.stringify(batch, null, 2));
        
                const response = await fetch(`https://contratos.betha.cloud/contratacao-services/api/conversoes/lotes/tipos-administracao`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 25a840ae-b57a-4030-903a-bcccf2386f30'
                    },
                    body: JSON.stringify(batch)
                });
        
                const responseBody = await response.json();
        
                if (response.ok) {
                    console.log('Data successfully sent to the API.');
                    batch.forEach(record => {
                        report.push({ record, status: 'success', response: responseBody });
                    });
        
                    if (responseBody.idLote) {
                        reportIds.push(responseBody.idLote);
                    }
                } else {
                    console.error('Error sending data to the API:', response.statusText);
                    batch.forEach(record => {
                        report.push({ record, status: 'failed', response: responseBody });
                    });
                }
            } catch (err) {
                console.error('Error sending batch to the API:', err);
                batch.forEach(record => {
                    report.push({ record, status: 'error', error: err.message });
                });
            }
        }
        
        // Save the report and report IDs to JSON files
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));
        console.log('Report saved successfully in report.json.');
        
        fs.writeFileSync('report_id.json', JSON.stringify(reportIds, null, 2));
        console.log('report_id.json saved successfully.');

    } catch (error) {
        console.error('Erro no processo:', error);
    } finally {
        await sql.close(); // Close the connection with SQL Server
        console.log('Conexão com o SQL Server fechada.');
    }
}

// Execute the main function
main();