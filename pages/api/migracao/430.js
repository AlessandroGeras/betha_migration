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
    const hours = (`0${d.getHours()}`).slice(-2);
    const minutes = (`0${d.getMinutes()}`).slice(-2);
    const seconds = (`0${d.getSeconds()}`).slice(-2);
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
ROW_NUMBER() OVER (ORDER BY CD_LEI) AS idIntegracao,
JSON_QUERY((SELECT CD_LEI as numero,
                                   DT_LEI as dataPublicacao,
                                   DT_LEI as dataSancao,
                                   DT_LEI as dataVigorar,
                                   JSON_QUERY((SELECT 23066 as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS tipo,
                                   JSON_QUERY((SELECT 23838 as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS naturezaTextoJuridico,
                                   JSON_QUERY((SELECT 14873 as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS fontesDivulgacoes FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS content
from CONT_LOA_LEI
where aa_Lei in (2023,2024)
        `;

        const result = await masterConnection.query(userQuery);

        const resultData = result.recordset;

        const transformedData = resultData.map(record => {
            
            return {
                idIntegracao: record.idIntegracao.toString(), // Convertendo para string se necessário
                content: {
                    numero: JSON.parse(record.content).numero.toString(), // Extraindo o campo 'numero' de 'content'
                    dataPublicacao: formatDate(JSON.parse(record.content).dataPublicacao), // Extraindo e formatando 'dataPublicacao'
                    dataSancao: formatDate(JSON.parse(record.content).dataSancao), // Extraindo e formatando 'dataPublicacao'
                    dataVigorar: formatDate(JSON.parse(record.content).dataVigorar), // Extraindo e formatando 'dataPublicacao'
                    tipo: {
                        id: JSON.parse(record.content).tipo.id // Extraindo o campo 'id' de 'tipo'
                    },
                    naturezaTextoJuridico: {
                        id: JSON.parse(record.content).naturezaTextoJuridico.id // Extraindo o campo 'id' de 'naturezaTextoJuridico'
                    },
                    fontesDivulgacoes: [{
                        id: JSON.parse(record.content).fontesDivulgacoes.id // Extraindo o campo 'id' de 'naturezaTextoJuridico'
                    }]
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

        // Enviar cada registro individualmente para a rota desejada
        // Armazenar as respostas do servidor
        const serverResponses = [];

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const url = `https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/atos`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                },
                body: JSON.stringify(record)
            });
     
            const responseBody = await response.json();
            serverResponses.push({
                url: url,
                status: response.status,
                statusText: response.statusText,
                responseBody: responseBody
            });
     
            if (response.ok) {
                console.log(`Dados do registro enviados com sucesso para ${url}.`);
            } else {
                console.error(`Erro ao enviar os dados do registro para ${url}:`, response.statusText);
            }
        } */

        //fs.writeFileSync('log_bens.json', JSON.stringify(serverResponses, null, 2));
        //console.log('Respostas do servidor salvas em log_bens.json');

    } catch (error) {
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        await sql.close();
    }
}

// Chamar a função principal
main();