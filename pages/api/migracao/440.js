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
    return `${year}-${month}-${day} 00:00`;
    //return `${year}-${month}-${day}`;
}

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "FOLHADB"
        const selectDatabaseQuery = 'USE COMP_ALMO';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
JSON_QUERY(
    (SELECT
JSON_QUERY(
    (SELECT
case nr_processo
when        28        then        1240881
when        20        then        1240882
when        18        then        1240883
when        31        then        1240884
when        30        then        1240885
when        33        then        1240886
when        29        then        1240887
when        216        then        1240888
when        333        then        1240889
when        334        then        1240890
when        335        then        1240891
end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS processoAdm,
JSON_QUERY(
    (SELECT
36840849 as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS responsavel,
JSON_QUERY(
    (SELECT
case fl_finalizado
when        1        then        'HOMOLOGACAO_E_ADJUDICACAO'
end as valor,
case fl_finalizado
when        1        then        'HOMOLOGACAO_E_ADJUDICACAO'
end as descricao
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS tipo,
dt_encerramento as data
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS conteudo
from COMPLicitacao
where aa_licitacao = 2024 and fl_finalizado = 1
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const conteudo = JSON.parse(record.conteudo);
        
            return {
                conteudo: {
                processoAdm: {
                    id: parseInt(conteudo.processoAdm.id) // Coletando o ID de processo administrativo
                },
                responsavel: {
                    id: parseInt(conteudo.responsavel.id) // Coletando o ID do responsável
                },
                tipo: {
                    valor: conteudo.tipo.valor, // Coletando o valor ou atribuindo 'ADJUDICACAO'
                    descricao: conteudo.tipo.descricao // Coletando a descrição ou atribuindo 'string'
                },
                data: formatDate(conteudo.data) // Coletando a data ou usando a data atual no formato ISO
            },
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
            const response = await fetch('https://compras.betha.cloud/compras-services/api/conversoes/lotes/processo-administrativo-atos-finais', {
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
