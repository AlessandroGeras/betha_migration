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
    const year = d.getUTCFullYear();
    const month = (`0${d.getUTCMonth() + 1}`).slice(-2);
    const day = (`0${d.getUTCDate()}`).slice(-2);
    const hours = (`0${d.getUTCHours()}`).slice(-2);
    const minutes = (`0${d.getUTCMinutes()}`).slice(-2);
    const seconds = (`0${d.getUTCSeconds()}`).slice(-2);
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
ROW_NUMBER() OVER (ORDER BY cd_cecam) AS idIntegracao,
JSON_QUERY(
    (SELECT
        cd_Exercicio as exercicio,
        JSON_QUERY(
(SELECT
   case cd_passivonaofinanceiro
   when 17 then 9923
   when 18 then 9924
   when 19 then 9925
    when 20 then 9926
    when 21 then 9927
  when 22 then 9928
          end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS precatorio,
dt_PassivoNaoFinanceiroAtualizacao as data,
vl_PassivoNaoFinanceiroAtualizacao as valor,
ds_PassivoNaoFinanceiroAtualizacao as especificacao
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
from CONTPASSIVONAOFINANCEIROATUALIZACAO
where  cd_passivonaofinanceiro > 10
        `;

        const result = await masterConnection.query(userQuery);

        const resultData = result.recordset;

        const transformedData = resultData.map(record => {
            // Log para verificar o que está sendo recebido em cada registro
            console.log("Registro original:", record);
        
            // Fazer o parse dos campos que vêm como strings JSON
            const parsedContent = record.content ? JSON.parse(record.content) : {};
        
            // Extração dos valores com fallback para valores padrão
            const exercicio = parsedContent.exercicio || "Exercício não disponível";
            const precatorio = parsedContent.precatorio && parsedContent.precatorio.id
                ? { id: parsedContent.precatorio.id }
                : {};
            const data = parsedContent.data ? formatDate(parsedContent.data) : "Data não disponível";
            const valor = parsedContent.valor !== null && parsedContent.valor !== undefined 
                ? parseFloat(parsedContent.valor) 
                : null;
                const especificacao = parsedContent.especificacao 
                ? parsedContent.especificacao.substring(0, 100) 
                : "Especificação não disponível";
        
            // Montagem do JSON final
            return {
                idIntegracao: record.idIntegracao || null,  // Verificar se existe `idIntegracao`
                content: {
                    exercicio: exercicio,
                    precatorio: precatorio,
                    data: data,
                    valor: valor,
                    especificacao: especificacao
                }
            };
        });
        
        // Exibir resultado transformado
        console.log("Dados transformados:", JSON.stringify(transformedData, null, 2));
        
        
        
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
        
                const response = await fetch(`https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/acrescimos-precatorios`, {
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