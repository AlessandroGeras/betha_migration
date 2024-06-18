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

        // Selecionar o banco de dados "FOLHA_FMAS"
        const selectDatabaseQuery = 'USE TRIBUTOS2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            SELECT
cd_Contribuinte as idIntegracao,
JSON_QUERY(
                (SELECT
                nr_CGCCPF as cpfCnpj,
                cd_Contribuinte as idPessoas,
                '1' as idEnderecoPrincipal,
                ds_inscricao_municipal as inscricaoMunicipal,
                ds_razaosocial as nome,
                ds_fantasia as nomeFantasia,
                '' as site,
                'ATIVO' AS situacao,
                CASE fl_FisicaJuridica
                WHEN 'J'  THEN 'JURIDICA'
                WHEN 'F' THEN 'FISICA'
                END AS tipoPessoa
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS pessoas
FROM ISSContribuintes
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const conteudo = JSON.parse(record.pessoas); // Parse the JSON string to an object

            return {
                idIntegracao: record.idIntegracao.toString(), // Convert idIntegracao to string
                pessoas: {
                    cpfCnpj: conteudo.cpfCnpj,
                    idPessoas: conteudo.idPessoas,
                    idEnderecoPrincipal: conteudo.idEnderecoPrincipal,
                    inscricaoMunicipal:conteudo.inscricaoMunicipal,
                    nome:conteudo.nome,
                    nomeFantasia:conteudo.nomeFantasia,
                    site:conteudo.site,
                    situacao:conteudo.situacao,
                    tipoPessoa:conteudo.tipoPessoa,
                }
            };
        });

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        for (const record of transformedData) {
            const response = await fetch('https://tributos.betha.cloud/service-layer-tributos/api/pessoas', {
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
        }

    } catch (error) {
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        sql.close();
    }
}

main();
