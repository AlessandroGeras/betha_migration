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
                cd_Contribuinte as idIntegracao,
                JSON_QUERY(
                    (SELECT
                        nr_CGCCPF as cpfCnpj,
                        nr_InscricaoMunicipal as inscricaoMunicipal,
                        '1' AS idPessoas,
                        '1' AS idEnderecoPrincipal,
                        nm_Contribuinte as nome,
                        nm_Contribuinte as nomeFantasia,
                        'www.betha.com.br' as site,
                        'ATIVO' as situacao,
                        CASE fl_FisicaJuridica
                            WHEN 'F' THEN 'FISICA'
                            WHEN 'J' THEN 'JURIDICA'
                            ELSE 'FISICA'
                        END AS descricao_tipo_pessoa
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS pessoas
            from CECAMContribuintes
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const pessoas = JSON.parse(record.pessoas); // Parse the JSON string to an object
            
            return {
                idIntegracao: record.idIntegracao,
                pessoas: {
                    cpfCnpj: pessoas.cpfCnpj,
                    inscricaoMunicipal: pessoas.inscricaoMunicipal,
                    idPessoas: pessoas.idPessoas || '1',  // Constant value
                    idEnderecoPrincipal: pessoas.idEnderecoPrincipal || '1',  // Constant value
                    nome: pessoas.nome,
                    nomeFantasia: pessoas.nomeFantasia,
                    site: pessoas.site || 'www.betha.com.br',  // Constant value
                    situacao: pessoas.situacao || 'ATIVO',  // Constant value
                    descricao_tipo_pessoa: pessoas.descricao_tipo_pessoa
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
        // Lidar com erros de conexão ou consulta aqui
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        await sql.close();
    }
}

// Chamar a função principal
main();
