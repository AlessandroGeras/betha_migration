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
    return `${year}-${month}-${day} ${hours}:${minutes}`;
    //return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "COMP_ALMO_CAM"
        const selectDatabaseQuery = 'USE COMP_ALMO';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
JSON_QUERY(
    (SELECT
  case nr_licitacao
  when        1        then 1240881
when        2        then 1240882
when        3        then 1240883
when        4        then 1240884
when        5        then 1240885
when        6        then 1240886
when        7        then 1240887
when        8        then 1240888
when        9        then 1240889
when        10        then 1240890
when        11        then 1240891
  end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS processoAdministrativo,
JSON_QUERY(
    (SELECT
   case cd_fornecedor
   when        15        then        36134168
when        16        then        36134169
when        18        then        36134171
when        21        then        36134173
when        703        then        36134439
when        968        then        36134708
when        981        then        36134722
when        1009        then        36134752
when        1010        then        36134753
   end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS fornecedor,
JSON_QUERY(
    (SELECT
   'INDIVIDUAL' as valor,
   'INDIVIDUAL' as descricao
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS tipoParticipacao,
'false' as representanteLegal,
'false' as declaracaoMPE,
dt_ValidadeInicial as dhCredenciamento,
JSON_QUERY(
    (SELECT
   'HABILITADO' as valor,
   'HABILITADO' as descricao
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS situacaoDocumentacao
from COMPLicitacaoFornecedores
where aa_licitacao = 2024
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            return {
                conteudo:{
                processoAdministrativo: {
                    id: JSON.parse(record.processoAdministrativo).id
                },
                fornecedor: {
                    id: JSON.parse(record.fornecedor).id
                },
                tipoParticipacao: JSON.parse(record.tipoParticipacao),
                representanteLegal: JSON.parse(record.representanteLegal),
                declaracaoMPE: JSON.parse(record.declaracaoMPE),
                dhCredenciamento: formatDate(record.dhCredenciamento),
                situacaoDocumentacao: JSON.parse(record.situacaoDocumentacao)
            }};
        });

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        /*  for (const record of transformedData) {
             const response = await fetch('https://compras.betha.cloud/compras-services/api/conversoes/lotes/participante-licitacao', {
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
        // Lidar com erros de conexão ou consulta aqui
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        await sql.close();
    }
}

// Chamar a função principal
main();
