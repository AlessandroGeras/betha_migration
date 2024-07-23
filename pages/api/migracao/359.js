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
                        CONCAT(cd_empenho, cd_empenhob)  as numeroCadastro,
                         'ORDINARIO' as tipo,
                         'PRINCIPAL' as tipoAmortizacao,
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
        case cd_Credor
        when        3333        then        6114352
when        1850        then        6113886
when        1917        then        6113919
when        1558        then        6115271
when        721        then        6114835
when        52        then        6114624
when        1240        then        6113508
when        1979        then        6113959
when        3309        then        6115683
when        2184        then        6115650
when        26        then        6114613
when        3331        then        6114348
when        1355        then        6113547
when        3347        then        6114358
when        421        then        6113257
when        3342        then        6114351
when        1529        then        6113676
when        1874        then        6113901
when        511        then        6114823
when        270        then        6113207
when        785        then        6114879
when        1111        then        6115012
when        1490        then        6113645
when        786        then        6113359
when        38        then        6114633
when        1559        then        6115242
when        3346        then        6114353
when        913        then        6113380
when        3332        then        6114349
when        1729        then        6113788
when        1554        then        6113699
when        3334        then        6114350
when        1436        then        6113604
when        1534        then        6113678
when        623        then        6114811
when        1880        then        6113907
when        1010        then        6113384
when        2183        then        6114015
when        1444        then        6115215
when        1109        then        6115015
when        1115        then        6115019
when        1928        then        6113926
when        1523        then        6113666
   end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS credor,
JSON_QUERY(
                                         (SELECT
                      67457 as id
                                                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                                        ) AS marcadores,
vl_empenho as valor1,
'100' as valor
                                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                                ) AS entesConsorciados
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
from CONTEMPENHOS 
WHERE cd_CategoriaEconomicaDespesa LIKE '%31%'
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
                    tipo: content.tipo,
                    especificacao: content.especificacao,
                    valor: content.valor,
                    vencimentos: Array.isArray(content.vencimentos) ? content.vencimentos : [content.vencimentos],
                    despesaLancada: content.despesaLancada,
                    marcadores: content.entesConsorciados.marcadores,
                    entesConsorciados: [
                        {
                            credor: content.entesConsorciados.credor,
                            valor: content.entesConsorciados.valor1,
                            percentual: content.entesConsorciados.valor
                        }
                    ]
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
            const response = await fetch('https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/empenhos/diarias', {
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
