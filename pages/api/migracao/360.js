const sql = require('mssql');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const fs = require('fs');
const { isNull } = require('util');

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
                         case cd_Empenhotipo
                                                 when 1 then 'GLOBAL' 
                                                 when 2 then 'ESTIMATIVO'
                                                 when 3 then 'ORDINARIO'
                                                 END as tipo,
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
case cd_fornecedor
when        3339        then        6114354
when        1404        then        6113585
when        379        then        6113246
when        1801        then        6113179
when        69        then        6113097
when        1144        then        6113446
when        1524        then        6113668
when        407        then        6113255
when        1718        then        6113778
when        1127        then        6113440
when        1240        then        6113508
when        46        then        6113075
when        381        then        6113243
when        1656        then        6113737
when        1156        then        6113454
when        250        then        6113191
when        291        then        6113215
when        1445        then        6113609
when        135        then        6113171
when        1919        then        6113923
when        1526        then        6113670
when        1124        then        6113439
when        1178        then        6113482
when        706        then        6113324
when        2139        then        6114009
when        321        then        6113217
when        1355        then        6113547
when        1624        then        6113726
when        555        then        6113271
when        1317        then        6113523
when        1489        then        6113642
when        676        then        6113318
when        1390        then        6113573
when        421        then        6113257
when        1662        then        6113741
when        1799        then        6113841
when        799        then        6113369
when        371        then        6113237
when        101        then        6113095
when        1476        then        6113634
when        660        then        6113302
when        270        then        6113207
when        1867        then        6113896
when        1952        then        6113938
when        1034        then        6113404
when        1812        then        6113852
when        1490        then        6113645
when        131        then        6113168
when        237        then        6113190
when        3328        then        6114307
when        2022        then        6113990
when        1607        then        6113718
when        1678        then        6113753
when        913        then        6113380
when        405        then        6113253
when        265        then        6113201
when        3348        then        6114356
when        267        then        6113204
when        1050        then        6113409
when        1008        then        6113388
when        4        then        6113038
when        293        then        6113214
when        662        then        6113309
when        1395        then        6113575
when        1516        then        6113657
when        1515        then        6113659
when        1436        then        6113604
when        1661        then        6113742
when        2059        then        6114000
when        1299        then        6113518
when        793        then        6113367
when        642        then        6113291
when        1460        then        6113610
when        1826        then        6113872
when        1091        then        6113426
when        513        then        6113267
when        1152        then        6113457
when        1860        then        6113887
when        1010        then        6113384
when        1041        then        6113407
when        1541        then        6113687
when        477        then        6113256
when        787        then        6113362
when        1408        then        6113580
when        1730        then        6113790
when        17        then        6113055
when        3330        then        6114303
when        1640        then        6113727
when        1923        then        6113918
when        1189        then        6113484
when        193        then        6113186
when        3350        then        6114357
when        1466        then        6113626
when        86        then        6113102
when        1410        then        6113590
   end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS credor,
JSON_QUERY(
                                        (SELECT
                                        case         cd_fichadesp
                                        when        1        then        1688241
when        2        then        1688242
when        3        then        1688243
when        4        then        1688244
when        5        then        1688245
when        6        then        1688246
when        7        then        1688247
when        8        then        1688248
when        9        then        1688249
when        1        then        1688250
when        11        then        1688251
when        12        then        1688252
when        13        then        1688253
when        14        then        1688254
when        15        then        1688255
when        16        then        1688256
when        17        then        1688257
when        18        then        1688258
when        19        then        1688259
when        2        then        1688260
when        21        then        1688261
when        22        then        1688262
when        23        then        1688263
when        24        then        1688264
when        25        then        1688265
when        26        then        1688266
when        27        then        1688267
when        28        then        1688268
when        29        then        1688269
when        3        then        1688270
when        32        then        1688272
when        33        then        1688273
when        34        then        1688274
when        35        then        1688275
when        36        then        1688276
when        37        then        1688277
when        38        then        1688278
when        39        then        1688279
when        4        then        1688280
when        41        then        1688281
when        42        then        1688282
when        43        then        1688283
when        44        then        1688284
when        45        then        1688285
when        46        then        1688286
when        47        then        1688287
when        48        then        1688288
when        49        then        1688289
when        5        then        1688291
when        51        then        1688292
when        52        then        1688293
when        53        then        1688294
when        54        then        1688295
when        55        then        1688296
when        56        then        1688297
when        57        then        1688298
when        58        then        1688299
when        59        then        1688300
when        6        then        1688301
when        61        then        1688302
when        62        then        1688303
when        63        then        1688304
when        64        then        1688305
when        65        then        1688306
when        66        then        1688307
when        67        then        1688308
when        68        then        1688309
when        69        then        1688310
when        7        then        1688311
when        71        then        1688312
when        72        then        1688313
when        73        then        1688314
when        74        then        1688315
when        75        then        1688316
when        76        then        1688317
when        77        then        1688318
when        78        then        1688319
when        79        then        1688320
when        8        then        1688321
when        81        then        1688322
when        82        then        1688323
when        83        then        1688324
when        84        then        1688325
when        85        then        1688326
when        86        then        1688327
when        87        then        1688328
when        88        then        1688329
when        89        then        1688330
when        9        then        1688331
when        91        then        1688332
when        92        then        1688333
when        93        then        1688334
when        94        then        1688335
when        95        then        1688336
when        96        then        1688337
when        97        then        1688338
when        98        then        1688339
when        99        then        1688340
when        1        then        1688342
when        101        then        1688343
when        102        then        1688344
when        103        then        1688345
when        104        then        1688346
when        105        then        1688347
when        106        then        1688348
when        107        then        1688349
when        108        then        1688350
when        109        then        1688351
when        11        then        1688352
when        111        then        1688353
when        112        then        1688354
when        113        then        1688355
when        114        then        1688356
when        115        then        1688357
when        116        then        1688358
when        117        then        1688359
when        118        then        1688360
when        119        then        1688361
when        12        then        1688362
when        121        then        1688363
when        122        then        1688364
when        123        then        1688365
when        124        then        1688366
when        125        then        1688367
when        126        then        1688368
when        127        then        1688369
when        128        then        1688370
when        129        then        1688371
when        13        then        1688372
when        131        then        1688373
when        132        then        1688374
when        133        then        1688375
when        134        then        1688376
when        135        then        1688377
when        136        then        1688378
when        137        then        1688379
when        138        then        1688380
when        139        then        1688381
when        14        then        1688382
when        141        then        1688383
when        142        then        1688384
when        143        then        1688385
when        144        then        1688386
when        145        then        1688387
when        146        then        1688388
when        147        then        1688389
when        148        then        1688390
when        149        then        1688391
when        15        then        1688392
when        151        then        1688393
when        152        then        1688394
when        153        then        1688395
when        1        then        1688407
when        2        then        1688408
when        3        then        1688409
when        4        then        1688410
when        5        then        1688411
when        6        then        1688412
when        7        then        1688413
when        8        then        1688414
when        9        then        1688415
when        1        then        1688416
when        11        then        1688417
when        12        then        1688418
when        13        then        1688419
when        14        then        1688420
when        15        then        1688421
when        16        then        1688422
when        17        then        1688423
when        18        then        1688424
when        19        then        1688425
when        2        then        1688426
when        21        then        1688427
when        22        then        1688428
when        23        then        1688429
when        24        then        1688430
when        25        then        1688431
when        26        then        1688432
when        27        then        1688433
when        28        then        1688434
when        29        then        1688435
when        3        then        1688436
when        31        then        1688437
when        32        then        1688438
when        33        then        1688439
when        34        then        1688440
when        35        then        1688441
when        36        then        1688442
when        37        then        1688443
when        38        then        1688444
when        39        then        1688445
when        4        then        1688446
when        41        then        1688447
when        42        then        1688448
when        43        then        1688449
when        44        then        1688450
when        45        then        1688451
when        46        then        1688452
when        47        then        1688453
when        48        then        1688454
when        49        then        1688455
when        5        then        1688456
when        51        then        1688457
when        52        then        1688458
when        53        then        1688459
when        54        then        1688460
when        55        then        1688461
when        56        then        1688462
when        57        then        1688463
when        58        then        1688464
when        59        then        1688465
when        6        then        1688466
when        61        then        1688467
when        62        then        1688468
when        63        then        1688469
when        64        then        1688470
when        65        then        1688471
when        66        then        1688472
when        67        then        1688473
when        68        then        1688474
when        69        then        1688475
when        7        then        1688476
when        71        then        1688477
when        72        then        1688478
when        73        then        1688479
when        74        then        1688480
when        75        then        1688481
when        1        then        1688497
when        2        then        1688498
when        3        then        1688499
when        4        then        1688500
when        5        then        1688501
when        6        then        1688502
when        7        then        1688503
when        8        then        1688504
when        9        then        1688505
when        1        then        1688506
when        11        then        1688507
when        12        then        1688508
when        13        then        1688509
when        14        then        1688510
when        15        then        1688511
when        16        then        1688512
when        17        then        1688513
when        18        then        1688514
when        19        then        1688515
when        2        then        1688516
when        21        then        1688517
when        22        then        1688518
when        23        then        1688519
when        24        then        1688520
when        25        then        1688521
when        26        then        1688522
when        27        then        1688523
when        28        then        1688524
when        29        then        1688525
when        3        then        1688526
when        31        then        1688527
when        32        then        1688528
when        33        then        1688529
when        34        then        1688530
when        35        then        1688531
when        36        then        1688532
when        37        then        1688533
when        38        then        1688535
when        39        then        1688536
when        4        then        1688537
when        41        then        1688538
when        42        then        1688539
when        43        then        1688540
when        44        then        1688541
when        45        then        1688542
when        46        then        1688543
when        47        then        1688544
when        48        then        1688545
when        49        then        1688546
when        5        then        1688547
when        51        then        1688548
when        52        then        1688549
when        53        then        1688550
when        54        then        1688551
when        55        then        1688552
when        56        then        1688553
when        57        then        1688554
when        58        then        1688555
when        59        then        1688556
when        6        then        1688557
when        61        then        1688558
when        62        then        1688559
when        63        then        1688560
when        64        then        1688561
when        65        then        1688562
when        66        then        1688563
when        67        then        1688564
when        68        then        1688565
when        69        then        1688566
when        7        then        1688567
when        71        then        1688568
when        72        then        1688569
when        73        then        1688570
when        1        then        1688572
when        2        then        1688573
when        3        then        1688574
when        4        then        1688575
when        5        then        1688576
when        6        then        1688577
when        7        then        1688578
when        8        then        1688579
when        9        then        1688580
when        1        then        1688581
when        11        then        1688582
when        31        then        1703345
                                        end as id
                                 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                                ) AS despesa,
                                JSON_QUERY(
                                        (SELECT
                                        case cd_DestinacaoRecurso
when        150000000000        then        744141
when        150000150000        then        744143
when        150000250000        then        744145
when        160000000000        then        744203
when        166100000000        then        744235
                                        end as id
                                 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                                ) AS natureza,
                                                                JSON_QUERY(
                                        (SELECT
                                        case cd_CategoriaEconomicaDespesa
                                        when        33901400        then        14114033
                                                                                when        33903300        then        14113993
                                                 end as id
                                 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                                ) AS recurso
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content        
from CONTEMPENHOS 
WHERE fl_adiantamento = 'S'
and cd_cecam = 1995

        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };        


        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const content = JSON.parse(record.content);

            if(parseInt(content.despesa.id==null)){
                console.log();
            }

            return {
                idIntegracao: record.idIntegracao.toString(),
                content: {
                    validaSaldo: content.validaSaldo === 'true',
                    exercicio: parseInt(content.exercicio),
                    numeroCadastro: parseInt(content.numeroCadastro),
                    data: formatDate(content.data),
                    tipo: content.tipo,
                    especificacao: content.especificacao,
                    valor: +Math.abs(parseFloat(content.valor)),
                    vencimentos: Array.isArray(content.vencimentos) ? content.vencimentos.map(v => ({
                        valor: +Math.abs(parseFloat(v.valor)),
                        data: formatDate(v.data),
                    })) : [{
                        valor: Math.abs(parseFloat(content.vencimentos.valor)),
                        data: formatDate(content.vencimentos.data),
                    }],
                    despesaLancada: content.despesaLancada === 'true',
                    despesa: {
                        id: parseInt(content.despesa.id)
                    },
                    natureza: {
                        id: parseInt(content.natureza.id)
                    },
                    recurso: {
                        id: parseInt(content.recurso.id)
                    },
                    credor: {
                        id: parseInt(content.credor.id)
                    }
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
            const response = await fetch('https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/empenhos/adiantamentos', {
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
