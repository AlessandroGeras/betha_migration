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
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
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
ROW_NUMBER() OVER (ORDER BY a.cd_alteracaoorcamentaria) AS idIntegracao,
JSON_QUERY((SELECT a.cd_alteracaoorcamentaria as numero,
                                   a.dt_AlteracaoOrcamentaria as dataPublicacao,
                                   a.dt_AlteracaoOrcamentariaAtualizacao as dataVigorar,
                                   a.dt_AlteracaoOrcamentariaAtualizacao as dataSancao,
                                   JSON_QUERY((SELECT 23340 as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS tipo,
                                   JSON_QUERY((SELECT 24081 as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS naturezaTextoJuridico,
                                   JSON_QUERY((SELECT 14873 as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS fontesDivulgacoes FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS content
from CONTALTERACAOORCAMENTARIA a 
where aa_Lei in (2023,2024)
        `;
        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const content = JSON.parse(record.content);
        
            return {
                idIntegracao: record.idIntegracao ? record.idIntegracao.toString() : null,
                content: {
                    numero: content.numero ? content.numero.toString() : null,
                    dataPublicacao: formatDate(content.dataPublicacao) || null,
                    dataVigorar: formatDate(content.dataVigorar) || null,
                    dataSancao: formatDate(content.dataSancao) || null,
                    tipo: {
                        id: content.tipo && content.tipo.id ? content.tipo.id : null
                    },
                    naturezaTextoJuridico: {
                        id: content.naturezaTextoJuridico && content.naturezaTextoJuridico.id ? content.naturezaTextoJuridico.id : null
                    },
                    fontesDivulgacoes: content.fontesDivulgacoes && !Array.isArray(content.fontesDivulgacoes)
                        ? [{ id: content.fontesDivulgacoes.id }]
                        : content.fontesDivulgacoes.map(fonte => ({
                            id: fonte.id
                        }))
                }
            };
        });
         
        

        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }
        

        /* // Enviar todos os registros de uma vez
         const response = await fetch('https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/atos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
            },
            body: JSON.stringify(transformedData)
        }); */

        /* if (response.ok) {
            const apiResponse = await response.json();

            // Gravar a resposta da API no arquivo report.json
            fs.writeFileSync('report.json', JSON.stringify(apiResponse, null, 2));
            console.log('Dados enviados com sucesso e resposta salva em report.json');
        } else {
            console.error('Erro ao enviar os dados:', response.statusText);
        } */

    } catch (error) {
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        sql.close();
    }
}

main();
