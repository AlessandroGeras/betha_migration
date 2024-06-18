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
        const selectDatabaseQuery = 'USE COMP_ALMO_CAM';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
 ROW_NUMBER() OVER (ORDER BY cd_exercicio) AS id,
 cd_unidorca as numeroOrganograma,
 ds_unidorca as descricao,
 cd_orgao as nivel
from CONTUnidadeOrcamentaria where cd_exercicio = 2024
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const conteudo = JSON.parse(record.conteudo); // Parse the JSON string to an object

            return {
                idIntegracao: record.idIntegracao,
                idGerado: record.idIntegracao.toString(), // Assuming idGerado is same as idIntegracao, adjust as needed
                conteudo: {
                    ...conteudo,
                    inicioVigencia: new Date(conteudo.inicioVigencia).toISOString(),
                    dataNascimento: new Date(conteudo.dataNascimento).toISOString(),
                    dataEmissaoIdentidade: conteudo.dataEmissaoIdentidade ? new Date(conteudo.dataEmissaoIdentidade).toISOString() : null,
                    dataEmissaoCtps: conteudo.dataEmissaoCtps ? new Date(conteudo.dataEmissaoCtps).toISOString() : null,
                    dataVencimentoCnh: conteudo.dataVencimentoCnh ? new Date(conteudo.dataVencimentoCnh).toISOString() : null,
                    filiacoes: [conteudo.filiacaoPai, conteudo.filiacaoMae],
                    telefones: [conteudo.telefoneFixo, conteudo.telefoneCelular],
                    enderecos: [conteudo.enderecoPrincipal]
                }
            };
        });

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        for (const record of transformedData) {
            const response = await fetch('https://contratos.betha.cloud/contratacao-services/api/organogramas', {
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
