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
when 001then 'BANCO DO BRASIL S.A.'
when 033    then 'BANCO SANTANDER (BRASIL) S.A.'
when 077then 'BANCO INTER S.A.'
when 084then 'UNIPRIME DO BRASIL - COOPERATIVA DE CRÉDITO LTDA.'
when 097then 'CREDISIS CENTRAL DE COOPERATIVAS DE CRÉDITO LTDA.'
when 104then 'CAIXA ECONOMICA FEDERAL'
when 133    then 'CRESOL CONFEDERACAO'
when 237then 'BANCO BRADESCO S.A.'
when 260then 'NU PAGAMENTOS S.A. - INSTITUIÇÃO DE PAGAMENTO'
when 341then 'ITAÚ UNIBANCO S.A.'
when 748then 'BANCO COOPERATIVO SICREDI S.A.'
when 756then 'BANCO COOPERATIVO SICOOB S.A. - BANCO SICOOB'
end as nome,
JSON_QUERY(
(SELECT
case cd_Febraban
when 001 then 137
when 104 then 148
when 756 then 51
when 237 then 35
when 033 then 114
when 077then 74
when 084then 175
when 097then 474
when 133 then 483
when 260then 676
when 341then 165
when 748then 50
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
            // Parse the JSON content
            const content = JSON.parse(record.content);

            return {
                idIntegracao: record.idIntegracao.toString(), // Convert idIntegracao to string
                content: {
                    nome: content.nome,
                    banco: content.banco,
                    numero: content.numero,
                    digito: content.digito,
                    logradouro: content.logradouro,
                    numeroEndereco: content.numeroEndereco,
                    municipio: content.municipio,
                    bairro: content.bairro,
                    cep: content.cep
                }
            };
        }).filter(record => record !== null); // Filtrar registros nulos

        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const response = await fetch('https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/agencias-bancarias', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                },
                body: JSON.stringify(record)
            });

            if (response.ok) {
                console.log(`Dados do registro enviados com sucesso para a rota.`);
            } else {
                console.error(`Erro ao enviar os dados do registro para a rota:`, response.statusText);
            }
        } */

    } catch (error) {
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        sql.close();
    }
}

main();
