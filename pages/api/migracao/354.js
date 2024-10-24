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

        // Selecionar o banco de dados "TRIBUTOS2024"
        const selectDatabaseQuery = 'USE TRIBUTOS2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
 ROW_NUMBER() OVER (ORDER BY fl_TipoPessoa) AS idIntegracao,
 JSON_QUERY(
                (SELECT
                nr_CGCCPF as inscricao, -- desconsiderar um zero a esquerda para cnpj,
                '' as codigo, -- iniciar o numero a aprtir de 340,
                ds_inscricao_municipal as inscricaoMunicipal,
                ds_razaosocial as nome,
ds_razaosocial as nomeSocialFantasia,
                'EM_ATIVIDADE' AS situacaoEconomico,
                CASE fl_TipoPessoa
                WHEN '0'  THEN 'JURIDICA'
                WHEN '1' THEN 'FISICA'
                END AS tipoPessoa
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS pessoas
  from  ISSTomador
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        let codigo = 340;
        const transformedData = resultData.map(record => {
            const pessoas = JSON.parse(record.pessoas);

            const transformedRecord = {
                idIntegracao: record.idIntegracao,
                pessoas: {
                    codigo: codigo++,  // Incrementar o valor de codigo
                    tipoPessoa: pessoas.tipoPessoa,
                    inscricao: pessoas.inscricao,
                    inscricaoMunicipal: pessoas.inscricaoMunicipal || "0000000000000",
                    nome: pessoas.nome,
                    nomeSocialFantasia: pessoas.nomeSocialFantasia,  // Valor estático conforme estrutura desejada
                }
            };

            return transformedRecord;
        });

        // Salvar os resultados transformados em um arquivo JSON
        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const response = await fetch('https://nota-eletronica.betha.cloud/service-layer/api/pessoas', {
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
