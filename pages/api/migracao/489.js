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
l.cd_Liquidacao as idIntegracao,
JSON_QUERY(
(SELECT
'false' as validaSaldo,
e.cd_exercicio as exercicio,
JSON_QUERY(
(SELECT 

case e.cd_empenho_rp

    when 2412 then 20297222
  when 2404 then 20297223
  when 2415 then 20297224
  when 2423 then 20297225
  when 2438 then 20297226
  when 2455 then 20297227
  when 2463 then 20297228
  when 2416 then 20297229
  when 2407 then 20297230
  when 2333 then 20297231
  when 2337 then 20297232
  when 2405 then 20297233
  when 2330 then 20297234
  when 2326 then 20297235
  when 2359 then 20297236
  when 2350 then 20297237
  when 2365 then 20297238
  when 2445 then 20297239
  when 2364 then 20297240
  when 2446 then 20297242
  when 2355 then 20297243
  when 2462 then 20297244
  when 2327 then 20297245
  when 2334 then 20297246
  when 2331 then 20297247
  when 1072 then 20297248
  when 2356 then 20297249
  when 2269 then 20297250
  when 2347 then 20297251
  when 2351 then 20297252
  when 2439 then 20297253
  when 2296 then 20297254
  when 2408 then 20297255
  when 2273 then 20297256
  when 2099 then 20297258
  when 2130 then 20297259
  when 2413 then 20297260
  when 1065 then 20297261
  when 2338 then 20297262
  when 1071 then 20297263
  when 1451 then 20297264
  when 2189 then 20297265
  when 2424 then 20297266
  when 2456 then 20297268
  when 2346 then 20297269
  when 2360 then 20297272
  when 2268 then 20297273
  when 1074 then 20297275
  when 2295 then 20297276
  when 1553 then 20297278
  when 1444 then 20297305
  when 2181 then 20297306
  when 1882 then 20297307
  when 2310 then 20297311
  when 678 then 20297312
  when 1443 then 20297314
  when 1914 then 20297315
  when 1663 then 20297316
  when 2387 then 20297317
  when 1881 then 20297318
  when 1440 then 20297319
  when 1664 then 20297320
  when 2263 then 20297321
  when 1557 then 20297322
  when 2174 then 20297323
  when 2167 then 20297324
  when 2386 then 20297325
  when 1439 then 20297326
  when 2136 then 20297327
  when 2145 then 20297328
  when 2375 then 20297329
  when 2390 then 20297330
  when 1880 then 20297331
  when 206 then 20297332
  when 2122 then 20297333
  when 2152 then 20297334
  when 1446 then 20297335
  when 2383 then 20297336
  when 1879 then 20297337
  when 2311 then 20297338
  when 2182 then 20297339
  when 2123 then 20297340
  when 2376 then 20297341
  when 1980 then 20297342
  when 2288 then 20297343
  when 2138 then 20297344
  when 1436 then 20297345
  when 1913 then 20297346
  when 1441 then 20297347
  when 2382 then 20297348
  when 2394 then 20297349
  when 988 then 20297353
  when 2369 then 20297354
  when 2153 then 20297355
  when 1763 then 20297356
  when 2151 then 20297358
  when 2294 then 20297359
  when 812 then 20297360
  when 1917 then 20297361
  when 1445 then 20297362
  when 2476 then 20297363
  when 798 then 20297364
  when 803 then 20297365
  when 2384 then 20297366
  when 480 then 20297367
  when 801 then 20297368
  when 2385 then 20297369
  when 2097 then 20297370
 

end as id
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS empenho,
l.dt_Liquida as data,
l.vl_Empenho              as valor,
l.ds_Liquidacao   as especificacao,
l.cd_Liquidacao as numeroCadastro
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
FROM CONTEMPENHOLIQUIDACAO l
INNER JOIn CONTLIQUIDACAODOCTO dc
on l.cd_Liquidacao = dc.cd_Liquidacao
and l.cd_Cecam = dc.cd_Cecam
inner join CONTEMPENHOS e 
on l.cd_Liquidacao = e.cd_Liquidacao
and l.cd_Cecam = e.cd_cecam
where l.fl_tipo = 'L'
AND l.cd_Cecam = 1995
and l.cd_Empenho in (select cd_empenho from CONTEMPENHOS
where  cd_Cecam = 1995
and  cd_fichadesp > 6000
and e.cd_empenhoa_rp = 2023)
and dt_Liquida_RP is null


        `;
        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const content = JSON.parse(record.content);
        
            return {
                idIntegracao: record.idIntegracao ? record.idIntegracao.toString() : null,
                content: {
                    validaSaldo: content.validaSaldo === "true", // Convertendo string para booleano
                    exercicio: content.exercicio || null,
                    empenho: {
                        id: content.empenho && content.empenho.id ? content.empenho.id : null
                    },
                    data: content.data ? content.data.split('T')[0] : null, // Pegando apenas a parte da data
                    valor: content.valor || null,
                    especificacao: content.especificacao || null,
                    numeroCadastro: content.numeroCadastro || null
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
         const response = await fetch(' https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/liquidacoes', {
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
