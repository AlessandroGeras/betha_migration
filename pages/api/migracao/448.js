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

        // Selecionar o banco de dados "CONTABIL2024"
        const selectDatabaseQuery = 'USE CONTABIL2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
ROW_NUMBER() OVER (ORDER BY cd_Febraban)  as idIntegracao,
JSON_QUERY(
(SELECT
case cd_Febraban
when 001        then 'BANCO DO BRASIL S.A.'
when 033    then 'BANCO SANTANDER (BRASIL) S.A.'
when 077        then 'BANCO INTER S.A.'
when 084        then 'UNIPRIME DO BRASIL - COOPERATIVA DE CRÉDITO LTDA.'
when 097        then 'CREDISIS CENTRAL DE COOPERATIVAS DE CRÉDITO LTDA.'
when 104        then 'CAIXA ECONOMICA FEDERAL'
when 133    then 'CRESOL CONFEDERACAO'
when 237        then 'BANCO BRADESCO S.A.'
when 260        then 'NU PAGAMENTOS S.A. - INSTITUIÇÃO DE PAGAMENTO'
when 341        then 'ITAÚ UNIBANCO S.A.'
when 748        then 'BANCO COOPERATIVO SICREDI S.A.'
when 756        then 'BANCO COOPERATIVO SICOOB S.A. - BANCO SICOOB'
        end as nome,
JSON_QUERY(
(SELECT
case cd_Febraban
when 001 then 137
when 104 then 148
when 756 then 51
when 237 then 35
when 033 then 114
when 077        then 74
when 084        then 175
when 097        then 474
when 133 then 483
when 260        then 676
when 341        then 165
when 748        then 50
    end as id
    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
    ) AS banco,
    nr_agencia as numero,
    dv_agencia as digito
    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
    ) AS content
from CONTFornecedorContaBancaria
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            // Corrige o nome do campo 'conten' para 'content' e converte para JSON
            const content = JSON.parse(record.content);

            return {
                idIntegracao: record.idIntegracao.toString(), // Converte idIntegracao para string
                content: {
                    nome: content.nome,
                    banco: {
                        id: content.banco.id
                    },
                    numero: content.numero,
                    digito: content.digito
                }
            };
        }).filter(record => record !== null); // Filtra registros nulos

        // Divide os dados em chunks de 50 e salva em arquivos JSON
        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

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
        
                const response = await fetch(`https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/agencias-bancarias`, {
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
        
        // Salvar o relatório em 'report.json'
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));
        console.log('Relatório salvo em report.json com sucesso.');
        
        // Salvar os reportIds no arquivo 'report_id.json'
        fs.writeFileSync('report_id.json', JSON.stringify(reportIds, null, 2));
        console.log('report_id.json salvo com sucesso.');
        

    } catch (error) {
        console.error('Erro no processo:', error);
    } finally {
        await sql.close(); // Fechar a conexão com o SQL Server
        console.log('Conexão com o SQL Server fechada.');
    }
}

// Executar a função principal
main();