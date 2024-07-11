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
 ROW_NUMBER() OVER (ORDER BY ex.nr_Processo) AS idIntegracao,
 JSON_QUERY(
    (SELECT
ex.nr_Processo as codigoExecucao,
ex.nr_Processo as processo,
p.dt_Processo as dataCadastro,
'T' as situacao,
'34521' as idTribunal,
'1707361' as idComarca,
'120961' as idVara,
case p.nm_Requerente
WHEN 'CATT NICOLAU DE SOUZA' THEN 35821416
        WHEN 'CHRISTINA STRELOW HAMMER' THEN 35821526
        WHEN 'CLEOSDETE G DE ANDRADE' THEN 35821527
        WHEN 'DENIVALDO FERNANDES DA SILVA' THEN 35821422
        WHEN 'DIRCE PEREIRA DA SILVA' THEN 35821423
        WHEN 'EDELSON SETTE' THEN 35821508
        WHEN 'ELIZANGELA SOUSA SANTOS' THEN 35821528
        WHEN 'JOAQUIM ALVES MARTINS' THEN 35821532
        WHEN 'MANOEL GONÇALVES DA SILVA' THEN 35821424
        WHEN 'MARIA APARECIDA DE AMORIM' THEN 35821485
        WHEN 'MARIA MUNIZ DE OLIVEIRA' THEN 35821465
end as idExecutado,
'2024' as anoPeticao,
'32001' as idPeticao,
'35804605' as idAdvogado,
'35821285' as idExequente,
'35804585' as idProcurador,
'993901' as idArea,
'993921' as idAssunto,
'197721' as idClasse,
'295' as idGrupoTrabalho,
 'SM' as procedimento,
 'N' as segredoJustica,
'N' as pedidoUrgencia,
'0' as valorCausa,
'0' as honorarios,
'enviado' as msgForum,
'E' as sistemaEnvio
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS execucoesFiscais
from DVATExecucaoJudicial ex
join DVATProcesso p on p.nr_Processo = ex.nr_Processo
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const content = JSON.parse(record.execucoesFiscais);

            return {
                idIntegracao: record.idIntegracao.toString(), // Convert idIntegracao to string
                execucoesFiscais: {
                    codigoExecucao: content.codigoExecucao,
                    processo: content.processo,
                    dataCadastro: content.dataCadastro,
                    situacao: content.situacao,
                    idTribunal: content.idTribunal,
                    idComarca: content.idComarca,
                    idVara: content.idVara,
                    idExecutado: content.idExecutado,
                    anoPeticao: content.anoPeticao,
                    idPeticao: content.idPeticao,
                    idAdvogado: content.idAdvogado,
                    idExequente: content.idExequente,
                    idProcurador: content.idProcurador,
                    idArea: content.idArea,
                    idAssunto: content.idAssunto,
                    idClasse: content.idClasse,
                    idGrupoTrabalho: content.idGrupoTrabalho,
                    procedimento: content.procedimento,
                    segredoJustica: content.segredoJustica,
                    pedidoUrgencia: content.pedidoUrgencia,
                    valorCausa: parseFloat(content.valorCausa),
                    honorarios: parseFloat(content.honorarios),
                    msgForum: content.msgForum,
                    sistemaEnvio: content.sistemaEnvio
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
        /* for (const record of transformedData) {
            const response = await fetch('https://procuradoria.betha.cloud/service-layer-procuradoria/api/execucoesFiscais', {
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
