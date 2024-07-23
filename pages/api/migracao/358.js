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
                ROW_NUMBER() OVER (ORDER BY cd_CategoriaEconomicaDespesa) AS idIntegracao,
                JSON_QUERY(
                    (SELECT
                        'false' as validaSaldo,
                        cd_exercicio as exercicio,
                        dt_emissao as data,
                        'PRINCIPAL' as tipoAmortizacao,
                        CONCAT(cd_empenho, cd_empenhob) as numeroCadastro,
                        'GLOBAL' as tipo,
                        'Empenho de Divida' AS especificacao,
                        vl_empenho AS valor,
                        JSON_QUERY(
                            (SELECT
                                vl_empenho AS valor,
                                dt_vencimento AS data
                                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                        ) AS vencimentos,
                        'false' as despesaLancada,
                        JSON_QUERY(
                            (SELECT
                                JSON_QUERY(
                                    (SELECT
                                        '1143390' as id
                                        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                                ) AS credor,
                                vl_empenho as valor1,
                                '100' as valor
                                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                        ) AS entesConsorciados
                        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS content
            from CONTEMPENHOS 
            WHERE cd_CategoriaEconomicaDespesa LIKE '%4690%'
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const content = JSON.parse(record.content);
            return {
                idIntegracao: record.idIntegracao.toString(),
                content: {
                    validaSaldo: content.validaSaldo,
                    exercicio: content.exercicio,
                    numeroCadastro: content.numeroCadastro,
                    data: content.data,
                    tipoAmortizacao: content.tipoAmortizacao,
                    tipo: content.tipo,
                    especificacao: content.especificacao,
                    valor: content.valor,
                    vencimentos: content.vencimentos,
                    despesaLancada: content.despesaLancada,
                    entesConsorciados: content.entesConsorciados
                }
            };
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
            const response = await fetch('https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/empenhos/dividas', {
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
