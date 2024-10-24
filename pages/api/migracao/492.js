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
ROW_NUMBER() OVER(ORDER BY e.cd_exercicio)  AS idIntegracao,
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
 m.dt_movto  as data,
JSON_QUERY(
(SELECT
JSON_QUERY(
(SELECT
25442 as id
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS transacaoFinanceira,
m.cd_codigo   as numeroDocumento,		
m.vl_movimento     as valor,
JSON_QUERY(
(SELECT
case  b.cd_codconta
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
                                    end as id
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS contaBancariaEntidade,
JSON_QUERY(
(SELECT
JSON_QUERY(
(SELECT
case  e.cd_DestinacaoRecurso
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
when        150000150000        then        744143
when        170600003110        then        744254
when        250000250000        then        744356
when        255300000000        then        744394
when        155300000000        then        744183
when        250000000000        then        744353
                                    end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS recurso,
m.vl_movimento	as valor
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS recursos
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS baixa,
JSON_QUERY(
(SELECT
JSON_QUERY(
(SELECT

case l.cd_Liquidacao
   when 3 then 24493363
  when 4 then 24493364
  when 1 then 24493365
  when 13 then 24493366
  when 8 then 24493367
  when 2 then 24493368
  when 10 then 24493369
  when 5 then 24493370
  when 11 then 24493371
  when 36 then 24493372
  when 26 then 24493373
  when 22 then 24493374
  when 7 then 24493375
  when 6 then 24493376
  when 15 then 24493377
  when 16 then 24493378
  when 12 then 24493379
  when 9 then 24493380
  when 20 then 24493381
  when 18 then 24493382
  when 19 then 24493383
  when 25 then 24493384
  when 27 then 24493385
  when 21 then 24493386
  when 17 then 24493387
  when 23 then 24493388
  when 37 then 24493389
  when 35 then 24493390
  when 14 then 24493391
  when 28 then 24493392
  when 33 then 24493393
  when 24 then 24493394
  when 31 then 24493395
  when 32 then 24493396
  when 34 then 24493397
  when 30 then 24493398
  when 29 then 24493399
  when 57 then 24514482
  when 58 then 24514484
  when 46 then 24514485
  when 47 then 24514486
  when 64 then 24514487
  when 70 then 24514488
  when 71 then 24514489
  when 191 then 24514490
  when 182 then 24514491
  when 62 then 24514492
  when 63 then 24514493
  when 246 then 24514494
  when 192 then 24514495
  when 245 then 24514497
  when 236 then 24514498
  when 269 then 24514499
  when 189 then 24514500
  when 234 then 24514501
  when 550 then 24514502
  when 290 then 24514503
  when 244 then 24514504
  when 283 then 24514505
  when 296 then 24514506
  when 391 then 24514507
  when 262 then 24514508
  when 247 then 24514509
  when 289 then 24514510
  when 282 then 24514511
  when 235 then 24514512
  when 507 then 24514513
  when 364 then 24514514
  when 365 then 24514515
  when 270 then 24514516
  when 479 then 24514517
  when 291 then 24514518
  when 293 then 24514519
  when 295 then 24514520
  when 256 then 24514521
  when 389 then 24514522
  when 292 then 24514523
  when 248 then 24514524
  when 297 then 24514525
  when 294 then 24514526
  when 556 then 24514527
  when 478 then 24514528
  when 467 then 24514529
  when 392 then 24514530
  when 304 then 24514531
  when 487 then 24514532
  when 480 then 24514533
  when 570 then 24514550
  when 612 then 24514551
  when 579 then 24514552
  when 736 then 24514553
  when 734 then 24514554
  when 737 then 24514556
  when 620 then 24514557
  when 740 then 24514558


                            end as id
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS liquidacao,
m.vl_movimento        as valor 
				FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS liquidacoes,
m.cd_codigo  as numeroCadastro
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
from CONTEMPENHOS e 
inner join CONT_MOVIMENTACAO m
on e.cd_cecam = m.cd_cecam
and e.cd_empenho = m.cd_empenho
and e.cd_empenhob = m.cd_empenhob
---and e.cd_Pagamento = m.cd_codigo_inicial
inner join CONTFICHABANCOS  b
on m.cd_banco = b.cd_banco 
and m.cd_cecam = b.cd_cecam
inner join CONTEMPENHOLIQUIDACAO l
on l.cd_Liquidacao = e.cd_Liquidacao
and l.cd_Cecam = e.cd_cecam
where e.cd_cecam = 1995
 and e.cd_fichadesp  > 6000
 and m.cd_banco <> 1
and m.cd_MovimentacaoAnulada is null

        `;
        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const content = JSON.parse(record.content);
        
            console.log(content);
        
            return {
                idIntegracao: record.idIntegracao ? record.idIntegracao.toString() : null,
                content: {
                    validaSaldo: content.validaSaldo === "true", // Convertendo string para booleano
                    exercicio: content.exercicio || null,
                    empenho: {
                        id: content.empenho && content.empenho.id ? content.empenho.id : null
                    },
                    data: content.data ? content.data.split('T')[0] : null, // Pegando apenas a parte da data
                    baixa: {
                        transacaoFinanceira: {
                            id: content.baixa.transacaoFinanceira && content.baixa.transacaoFinanceira.id ? content.baixa.transacaoFinanceira.id : null
                        },
                        numeroDocumento: content.baixa.numeroDocumento.toString() || null,
                        valor: content.baixa.valor || null,
                        contaBancariaEntidade: {
                            id: content.baixa.contaBancariaEntidade && content.baixa.contaBancariaEntidade.id ? content.baixa.contaBancariaEntidade.id : null
                        },
                        recursos: [{
                            recurso: {
                                id: content.baixa.recursos && content.baixa.recursos.recurso && content.baixa.recursos.recurso.id ? content.baixa.recursos.recurso.id : null
                            },
                            valor: content.baixa.recursos ? content.baixa.recursos.valor : null
                        }]
                    },
                    liquidacoes: [{
                        liquidacao: {
                            id: content.liquidacoes && content.liquidacoes.liquidacao ? content.liquidacoes.liquidacao.id : null
                        },
                        valor: content.liquidacoes ? content.liquidacoes.valor : null
                    }],
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
         const response = await fetch(' https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/pagamentos', {
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
