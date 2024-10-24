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
            SELECT
    m.cd_codigo_inicial AS idIntegracao,
    JSON_QUERY(
        (
            SELECT
                m.cd_exercicio AS exercicio,
                m.dt_movto AS data,
                m.vl_movimento AS valor,
                JSON_QUERY(
                    (
                        SELECT
                            CASE cb.cd_DestinacaoRecurso
                                when         155200000000       then        744181
when         155300000000       then        744183
when         156900000000       then        744185
when         157100000000       then        744189
when         159900000000       then        744201
when         170500000000       then        744251
when         170600003110       then        744255
when         170800000000       then        744261
when         175000000000       then        744297
when        175100000000        then        744299
when        150000000000        then        744141
when        150000150000        then        744143
when        150000250000        then        744145
when        160000000000        then        744203
when        166100000000        then        744235
when        154000000000        then        744155
when        154000700000        then        744159
when        155000000000        then        744177
when        170000000000        then        744243
when        170100000000        then        744245
when        257100000000        then        744401
when        270000000000        then        744455
when        270100000000        then        744457
when        257100000000        then        744401
when        270000000000        then        744455
when        270100000000        then        744457
when        250000000000        then        744353
when        250000250000        then        744357
when        255300000000        then        744395
when        250000150000        then        744355
when        260000000000         then       744415

                                ELSE NULL
                            END AS id
                        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
                    )
                ) AS recursoOrigem,
                                 JSON_QUERY(
                    (
                        SELECT
                             CASE cb1.cd_DestinacaoRecurso
                                when         155200000000       then        744181
when         155300000000       then        744183
when         156900000000       then        744185
when         157100000000       then        744189
when         159900000000       then        744201
when         170500000000       then        744251
when         170600003110       then        744255
when         170800000000       then        744261
when         175000000000       then        744297
when        175100000000        then        744299
when        150000000000        then        744141
when        150000150000        then        744143
when        150000250000        then        744145
when        160000000000        then        744203
when        166100000000        then        744235
when        154000000000        then        744155
when        154000700000        then        744159
when        155000000000        then        744177
when        170000000000        then        744243
when        170100000000        then        744245
when        257100000000        then        744401
when        270000000000        then        744455
when        270100000000        then        744457
when        257100000000        then        744401
when        270000000000        then        744455
when        270100000000        then        744457
when        250000000000        then        744353
when        250000250000        then        744357
when        255300000000        then        744395
when        250000150000        then        744355
when        260000000000         then       744415

                                ELSE NULL
                               
                            END AS id
                        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
                    )
                ) AS recursoDestino,
        'CONTA_BANCARIA'                        as categoria,

                JSON_QUERY(
                    (
                        SELECT
                            CASE cb.cd_codconta
                               when 43997 then 185530
 when 8642 then 185314
 when 8643 then 185315
 when 20831 then 185316
 when 12197 then 185317
 when 60028 then 185318
 when 13100 then 185319
 when 60049 then 185320
 when 60047 then 185321
 when 60015 then 185322
 when 11737 then 185323
 when 60048 then 185324
 when 13452 then 185325
 when 13513 then 185326
 when 283144 then 185327
 when 8645 then 185328
 when 13328 then 185329
 when 13548 then 185330
 when 13512 then 185331
 when 15051 then 185332
 when 60040 then 185333
 when 60024 then 185334
 when 13362 then 185335
 when 00671060 then 185336
 when 13552 then 185337
 when 6000312 then 185338
 when 13543 then 185339
 when 13544 then 185340
 when 13547 then 185341
 when 12018 then 185342
 when 6000313 then 185343
 when 43488 then 185344
 when 43490 then 185345
 when 43491 then 185346
 when 43489 then 185347
 when 13632 then 185348
 when 13542 then 185349
 when 60027 then 185350
 when 60023 then 185351
 when 13113 then 185352
 when 60022 then 185353
 when 60036 then 185354
 when 13676 then 185355
 when 60037 then 185356
 when 13048 then 185357
 when 60042 then 185358
 when 6071008 then 185359
 when 46534 then 185360
 when 7889 then 185361
 when 8030 then 185362
 when 60039 then 185363
 when 13689 then 185364
 when 8101 then 185365
 when 13103 then 185366
 when 14101 then 185367
 when 7909 then 185368
 when 13538 then 185369
 when 7945 then 185370
 when 13540 then 185371
 when 13541 then 185372
 when 14253 then 185373
 when 13327 then 185374
 when 00600071063 then 185375
 when 006647240 then 185376
 when 14370 then 185377
 when 14385 then 185378
 when 006071095 then 185379
 when 14440 then 185380
 when 14479 then 185381
 when 14369 then 185382
 when 14399 then 185383
 when 14398 then 185384
 when 14397 then 185385
 when 14685 then 185386
 when 14688 then 185387
 when 14689 then 185388
 when 14694 then 185389
 when 14708 then 185390
 when 14690 then 185391
 when 14693 then 185392
 when 14691 then 185393
 when 9208 then 185394
 when 14687 then 185395
 when 14715 then 185396
 when 14711 then 185397
 when 13577 then 185398
 when 14920 then 185399
 when 14919 then 185400
 when 131099 then 185401
 when 14478 then 185402
 when 14951 then 185403
 when 672007 then 185404
 when 14935 then 185405
 when 14974 then 185406
 when 9896 then 185407
 when 15199 then 185408
 when 15271 then 185409
 when 15353 then 185410
 when 9310 then 185411
 when 15409 then 185412
 when 15249 then 185413
 when 15332 then 185414
 when 15277 then 185415
 when 006647256 then 185416
 when 006647252 then 185417
 when 10162 then 185418
 when 10163 then 185419
 when 10164 then 185420
 when 006647253 then 185421
 when 006647258 then 185422
 when 15369 then 185423
 when 15490 then 185424
 when 10219 then 185425
 when 11058 then 185426
 when 11525 then 185427
 when 18223 then 185428
 when 11383 then 185429
 when 11542 then 185430
 when 12252 then 185431
 when 12177 then 185432
 when 03013 then 185433
 when 03014 then 185434
 when 60006 then 185435
 when 60001 then 185436
 when 60002 then 185437
 when 60003 then 185438
 when 60004 then 185439
 when 13647 then 185440
 when 60005 then 185441
 when 6624088 then 185442
 when 6000315 then 185443
 when 13015 then 185444
 when 13021 then 185445
 when 44010 then 185446
 when 14365 then 185447
 when 14480 then 185448
 when 14536 then 185449
 when 14487 then 185450
 when 14686 then 185451
 when 15209 then 185452
 when 15264 then 185453
 when 15380 then 185454
 when 15422 then 185455
 when 15350 then 185456
 when 9881 then 185457
 when 11500 then 185458
 when 11623 then 185459
 when 43997 then 185460
 when 12324 then 185507
 when 12328 then 185508
 when 13632 then 185509
 when 12326 then 185510
 when 14206 then 185511
 when 14310 then 185512
 when 14741 then 185513
 when 13576 then 185514
 when 14463 then 185515
 when 60018 then 185516
 when 44001 then 185517
 when 60041 then 185518
 when 60045 then 185519
 when 60044 then 185520
 when 12903 then 185521
 when 84506 then 185522
 when 87165 then 185523
 when 13563 then 185524
 when 13564 then 185525
 when 13641 then 185526
 when 15080 then 185527
 when 15161 then 185528
 when 15435 then 185529
 when 43997 then 185530
                                ELSE NULL
                            END AS id
                        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
                    )
                ) AS contaBancariaEntidade,
                'CORRENTE' AS tipoContaOrigem,
                                  'Ajuste do valor do recurso' AS finalidade                
            FROM CONT_MOVIMENTACAO m1
            INNER JOIN CONTFICHABANCOS cb1 ON m1.cd_banco = cb1.cd_banco
            AND m1.cd_cecam = cb1.cd_cecam
            WHERE m1.fl_tipo = 'B'
            AND m1.fl_depret = 'D'
                         and  m1.cd_codigo_inicial in (232, 
234,
236, 
238, 
308, 
310, 
312, 
314 )
            AND m1.cd_codigo_inicial = m.cd_codigo_inicial
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        )
    ) AS content
FROM CONT_MOVIMENTACAO m
INNER JOIN CONTFICHABANCOS cb ON m.cd_banco = cb.cd_banco
AND m.cd_cecam = cb.cd_cecam
WHERE m.fl_tipo = 'B'
AND m.fl_depret = 'R'
and m.cd_cecam= 1995
and  m.cd_codigo_inicial in (232, 
234,
236, 
238, 
308, 
310, 
312, 
314 )
ORDER BY m.cd_codigo_inicial;
        `;
        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const content = JSON.parse(record.content);
            
            return {
                idIntegracao: record.idIntegracao ? record.idIntegracao.toString() : null,
                content: {
                    exercicio: content.exercicio || null,
                    data: content.data ? content.data.split('T')[0] : null, // Formatando a data sem o horário
                    valor: content.valor || null,
                    recursoOrigem: {
                        id: content.recursoOrigem && content.recursoOrigem.id ? content.recursoOrigem.id : null
                    },
                    recursoDestino: {
                        id: content.recursoDestino && content.recursoDestino.id ? content.recursoDestino.id : null
                    },
                    categoria: content.categoria || null,
                    contaBancariaEntidade: {
                        id: content.contaBancariaEntidade && content.contaBancariaEntidade.id ? content.contaBancariaEntidade.id : null
                    },
                    tipoConta: content.tipoContaOrigem || null, // Alterado para 'tipoContaOrigem' conforme o retorno do select
                    finalidade: content.finalidade || null
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
         const response = await fetch('https://tes-sl-rest.betha.cloud/tesouraria/service-layer/v2/api/ajustes-recursos', {
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
