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

        // Selecionar o banco de dados "CONTABIL2024"
        const selectDatabaseQuery = 'USE CONTABIL2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
ROW_NUMBER() OVER (ORDER BY ct.cd_empenho) AS idIntegracao,
JSON_QUERY(
(SELECT
            'false' as validaSaldo,
           ct. cd_exercicio as exercicio,
           ct. dt_emissao as data,
            ct.cd_empenho  as numeroCadastro,
                CONCAT('ANULAÇÃO MIGRAÇÃO : ',ct.cd_empenho_base)  AS motivo,
               (ct. vl_empenho * -1) AS valor,
                        JSON_QUERY(
(SELECT 

case ct.cd_empenho_base

 when 41 then 20019369
 when 94 then 20030302
 when 388 then 20030303
 when 378 then 20030304
 when 165 then 20030305
 when 524 then 20030306
 when 85 then 20030307
 when 567 then 20030308
 when 90 then 20030309
 when 589 then 20030310
 when 562 then 20030311
 when 86 then 20030312
 when 578 then 20030313
 when 91 then 20030315
 when 580 then 20030316
 when 577 then 20030317
 when 539 then 20030318
 when 593 then 20030319
 when 510 then 20030320
 when 88 then 20030321
 when 579 then 20030322
 when 533 then 20030323
 when 570 then 20030324
 when 576 then 20030325
 when 513 then 20030326
 when 585 then 20030327
 when 574 then 20030328
 when 541 then 20030329
 when 568 then 20030330
 when 514 then 20030331
 when 558 then 20030332
 when 531 then 20030333
 when 535 then 20030334
 when 540 then 20030335
 when 525 then 20030336
 when 557 then 20030337
 when 553 then 20030338
 when 544 then 20030339
 when 402 then 20030340
 when 548 then 20030341
 when 520 then 20030342
 when 386 then 20030343
 when 521 then 20030344
 when 566 then 20030345
 when 545 then 20030346
 when 529 then 20030347
 when 550 then 20030349
 when 401 then 20030350
 when 518 then 20030351
 when 506 then 20030352
 when 389 then 20030405
 when 374 then 20030406
 when 394 then 20030407
 when 393 then 20030408
 when 384 then 20030409
 when 373 then 20030410
 when 353 then 20030411
 when 369 then 20030412
 when 383 then 20030413
 when 354 then 20030414
 when 382 then 20030415
 when 153 then 20030416
 when 338 then 20030417
 when 140 then 20030418
 when 143 then 20030419
 when 317 then 20030420
 when 371 then 20030421
 when 355 then 20030422
 when 352 then 20030423
 when 337 then 20030424
 when 333 then 20030425
 when 361 then 20030426
 when 351 then 20030427
 when 127 then 20030428
 when 313 then 20030429
 when 130 then 20030430
 when 157 then 20030431
 when 326 then 20030432
 when 133 then 20030433
 when 161 then 20030434
 when 160 then 20030435
 when 149 then 20030436
 when 347 then 20030437
 when 158 then 20030438
 when 348 then 20030439
 when 136 then 20030440
 when 147 then 20030441
 when 341 then 20030442
 when 329 then 20030443
 when 330 then 20030444
 when 108 then 20030445
 when 141 then 20030446
 when 364 then 20030447
 when 172 then 20030448
 when 174 then 20030449
 when 315 then 20030450
 when 321 then 20030451
 when 322 then 20030452
 when 116 then 20030454
 when 137 then 20030455
 when 111 then 20030459
 when 92 then 20030461
 when 109 then 20030462
 when 99 then 20030463
 when 101 then 20030464
 when 95 then 20030465
 when 106 then 20030466
 when 120 then 20030467
 when 115 then 20030468
 when 397 then 20030469
 when 144 then 20030470
 when 102 then 20030471
 when 131 then 20030472
 when 572 then 20030473
 when 103 then 20030474
 when 537 then 20030475
 when 316 then 20030476
 when 123 then 20030477
 when 325 then 20030478
 when 360 then 20030479
 when 164 then 20030480
 when 124 then 20030481
 when 359 then 20030482
 when 166 then 20030483
 when 534 then 20030484
 when 110 then 20030485
 when 93 then 20030486
 when 515 then 20030487
 when 575 then 20030488
 when 564 then 20030489
 when 119 then 20030490
 when 87 then 20030491
 when 113 then 20030492
 when 571 then 20030493
 when 511 then 20030494
 when 377 then 20030495
 when 387 then 20030496
 when 559 then 20030497
 when 390 then 20030498
 when 582 then 20030499
 when 592 then 20030500
 when 98 then 20030501
 when 349 then 20030502
 when 523 then 20030503
 when 320 then 20030504
 when 379 then 20030505
 when 114 then 20030507
 when 538 then 20030508
 when 327 then 20030509
 when 175 then 20030510
 when 370 then 20030511
 when 528 then 20030512
 when 583 then 20030513
 when 96 then 20030514
 when 556 then 20030515
 when 335 then 20030516
 when 331 then 20030517
 when 542 then 20030518
 when 134 then 20030519
 when 561 then 20030520
 when 148 then 20030521
 when 104 then 20030522
 when 508 then 20030523
 when 381 then 20030524
 when 516 then 20030525
 when 125 then 20030526
 when 167 then 20030527
 when 392 then 20030528
 when 121 then 20030529
 when 319 then 20030530
 when 366 then 20030531
 when 399 then 20030532
 when 97 then 20030533
 when 551 then 20030534
 when 357 then 20030535
 when 168 then 20030536
 when 375 then 20030537
 when 339 then 20030538
 when 398 then 20030539
 when 563 then 20030540
 when 129 then 20030541
 when 132 then 20030542
 when 380 then 20030543
 when 404 then 20030544
 when 151 then 20030545
 when 100 then 20030546
 when 594 then 20030547
 when 565 then 20030548
 when 112 then 20030549
 when 526 then 20030550
 when 367 then 20030551
 when 546 then 20030553
 when 362 then 20030554
 when 522 then 20030555
 when 155 then 20030556
 when 145 then 20030557
 when 138 then 20030558
 when 517 then 20030559
 when 334 then 20030560
 when 162 then 20030561
 when 126 then 20030569
 when 135 then 20030570
 when 152 then 20030571
 when 122 then 20030572
 when 176 then 20030573
 when 146 then 20030574
 when 350 then 20030575
 when 328 then 20030576
 when 163 then 20030577
 when 156 then 20030578
 when 336 then 20030579
 when 139 then 20030580
 when 255 then 20030581
 when 332 then 20030583
 when 436 then 20030584
 when 479 then 20030585
 when 482 then 20030586
 when 573 then 20030587
 when 543 then 20030588
 when 376 then 20030589
 when 495 then 20030590
 when 480 then 20030591
 when 39 then 20030592
 when 47 then 20030593
 when 340 then 20030594
 when 363 then 20030595
 when 481 then 20030596
 when 391 then 20030597
 when 478 then 20030598
 when 233 then 20030599
 when 405 then 20030600
 when 536 then 20030601
 when 442 then 20030602
 when 280 then 20030603
 when 318 then 20030604
 when 527 then 20030605
 when 368 then 20030606
 when 400 then 20030607
 when 584 then 20030608
 when 265 then 20030609
 when 497 then 20030610
 when 266 then 20030611
 when 358 then 20030612
 when 269 then 20030613
 when 305 then 20030614
 when 509 then 20030615
 when 234 then 20030616
 when 43 then 20030617
 when 324 then 20030618
 when 496 then 20030619
 when 450 then 20030620
 when 231 then 20030621
 when 512 then 20030622
 when 498 then 20030623
 when 270 then 20030624
 when 596 then 20030625
 when 82 then 20030626
 when 441 then 20030627
 when 37 then 20030628
 when 220 then 20030629
 when 81 then 20030630
 when 552 then 20030631
 when 59 then 20030632
 when 271 then 20030633
 when 224 then 20030634
 when 221 then 20030635
 when 272 then 20030636
 when 64 then 20030637
 when 229 then 20030638
 when 464 then 20030639
 when 219 then 20030640
 when 406 then 20030641
 when 595 then 20030642
 when 242 then 20030643
 when 501 then 20030644
 when 222 then 20030645
 when 193 then 20030646
 when 343 then 20030647
 when 76 then 20030648
 when 434 then 20030649
 when 226 then 20030650
 when 547 then 20030651
 when 227 then 20030652
 when 560 then 20030653
 when 485 then 20030654
 when 105 then 20030655
 when 487 then 20030656
 when 273 then 20030657
 when 235 then 20030658
 when 412 then 20030659
 when 236 then 20030660
 when 170 then 20030661
 when 477 then 20030662
 when 208 then 20030663
 when 415 then 20030664
 when 274 then 20030665
 when 205 then 20030666
 when 289 then 20030667
 when 73 then 20030668
 when 241 then 20030669
 when 588 then 20030670
 when 308 then 20030671
 when 225 then 20030672
 when 42 then 20030673
 when 267 then 20030674
 when 230 then 20030675
 when 228 then 20030676
 when 169 then 20030677
 when 15 then 20030678
 when 232 then 20030679
 when 223 then 20030680
 when 75 then 20030681
 when 424 then 20030682
 when 264 then 20030683
 when 454 then 20030684
 when 493 then 20030685
 when 31 then 20030686
 when 473 then 20030687
 when 207 then 20030688
 when 118 then 20030689
 when 247 then 20030690
 when 555 then 20030691
 when 466 then 20030692
 when 344 then 20030693
 when 591 then 20030694
 when 78 then 20030695
 when 72 then 20030696
 when 447 then 20030697
 when 79 then 20030698
 when 342 then 20030699
 when 213 then 20030700
 when 475 then 20030701
 when 457 then 20030702
 when 256 then 20030703
 when 500 then 20030704
 when 297 then 20030705
 when 203 then 20030706
 when 268 then 20030707
 when 309 then 20030708
 when 60 then 20030709
 when 453 then 20030710
 when 504 then 20030711
 when 238 then 20030712
 when 240 then 20030713
 when 492 then 20030714
 when 311 then 20030715
 when 243 then 20030716
 when 212 then 20030717
 when 214 then 20030718
 when 278 then 20030719
 when 250 then 20030723
 when 530 then 20030724
 when 275 then 20030725
 when 194 then 20030726
 when 245 then 20030727
 when 259 then 20030728
 when 597 then 20030729
 when 209 then 20030730
 when 587 then 20030731
 when 467 then 20030732
 when 53 then 20030733
 when 310 then 20030734
 when 196 then 20030735
 when 425 then 20030736
 when 416 then 20030737
 when 216 then 20030738
 when 468 then 20030740
 when 244 then 20030741
 when 62 then 20030742
 when 421 then 20030743
 when 51 then 20030744
 when 171 then 20030745
 when 204 then 20030746
 when 483 then 20030747
 when 419 then 20030748
 when 306 then 20030749
 when 215 then 20030750
 when 411 then 20030751
 when 210 then 20030752
 when 239 then 20030753
 when 452 then 20030754
 when 288 then 20030755
 when 10 then 20030756
 when 470 then 20030757
 when 77 then 20030758
 when 251 then 20030759
 when 50 then 20030760
 when 192 then 20030761
 when 298 then 20030762
 when 276 then 20030763
 when 414 then 20030764
 when 260 then 20030765
 when 246 then 20030766
 when 312 then 20030767
 when 61 then 20030768
 when 301 then 20030769
 when 30 then 20030770
 when 476 then 20030771
 when 52 then 20030772
 when 484 then 20030773
 when 409 then 20030774
 when 277 then 20030775
 when 472 then 20030776
 when 279 then 20030777
 when 451 then 20030778
 when 494 then 20030779
 when 54 then 20030780
 when 486 then 20030781
 when 413 then 20030782
 when 586 then 20030783
 when 448 then 20030784
 when 65 then 20030785
 when 25 then 20030786
 when 8 then 20030787
 when 218 then 20030788
 when 237 then 20030789
 when 427 then 20030790
 when 5 then 20030791
 when 13 then 20030792
 when 285 then 20030794
 when 12 then 20030795
 when 455 then 20030796
 when 426 then 20030797
 when 287 then 20030798
 when 281 then 20030799
 when 74 then 20030800
 when 6 then 20030801
 when 286 then 20030802
 when 503 then 20030803
 when 217 then 20030804
 when 40 then 20030805
 when 32 then 20030806
 when 189 then 20030807
 when 456 then 20030808
 when 7 then 20030809
 when 9 then 20030810
 when 11 then 20030811
 when 188 then 20030812
 when 430 then 20030813
 when 465 then 20030814
 when 262 then 20030815
 when 407 then 20030816
 when 185 then 20030817
 when 55 then 20030818
 when 302 then 20030819
 when 67 then 20030820
 when 429 then 20030821
 when 428 then 20030822
 when 14 then 20030823
 when 183 then 20030824
 when 181 then 20032292
 when 303 then 20032293
 when 179 then 20032294
 when 201 then 20032295
 when 282 then 20032296
 when 186 then 20032297
 when 499 then 20032298
 when 187 then 20032299
 when 291 then 20032300
 when 191 then 20032301
 when 471 then 20032302
 when 488 then 20032303
 when 437 then 20032304
 when 293 then 20032305
 when 23 then 20032306
 when 190 then 20032307
 when 420 then 20032308
 when 283 then 20032310
 when 422 then 20032311
 when 20 then 20032312
 when 462 then 20032313
 when 66 then 20032314
 when 16 then 20032315
 when 460 then 20032316
 when 292 then 20032317
 when 263 then 20032318
 when 489 then 20032319
 when 18 then 20032320
 when 307 then 20032321
 when 28 then 20032322
 when 29 then 20032323
 when 294 then 20032324
 when 432 then 20032325
 when 84 then 20032326
 when 197 then 20032327
 when 284 then 20032328
 when 299 then 20032329
 when 19 then 20032330
 when 431 then 20032331
 when 178 then 20032332
 when 449 then 20032333
 when 304 then 20032334
 when 410 then 20032335
 when 418 then 20032336
 when 22 then 20032337
 when 26 then 20032338
 when 17 then 20032339
 when 254 then 20032340
 when 469 then 20032341
 when 21 then 20032342
 when 253 then 20032348
 when 83 then 20032349
 when 261 then 20032350
 when 71 then 20032351
 when 45 then 20032352
 when 44 then 20032353
 when 417 then 20032354
 when 435 then 20032355
 when 48 then 20032356
 when 198 then 20032357
 when 36 then 20032358
 when 46 then 20032359
 when 459 then 20032360
 when 257 then 20032361
 when 70 then 20032362
 when 502 then 20032363
 when 249 then 20032364
 when 423 then 20032365
 when 33 then 20032366
 when 24 then 20032367
 when 439 then 20032368
 when 1 then 20032369
 when 49 then 20032370
 when 200 then 20032371
 when 27 then 20032372
 when 4 then 20032373
 when 211 then 20032374
 when 202 then 20032375
 when 569 then 20032376
 when 2 then 20032377
 when 444 then 20032378
 when 438 then 20032379
 when 199 then 20032380
 when 182 then 20032381
 when 445 then 20032382
 when 440 then 20032383
 when 345 then 20032384
 when 600 then 20032385
 when 408 then 20032386
 when 248 then 20032387
 when 490 then 20032388
 when 505 then 20032389
 when 180 then 20032390
 when 184 then 20032391
 when 296 then 20032392
 when 474 then 20032393
 when 323 then 20032394
 when 356 then 20032395
 when 403 then 20032396
 when 300 then 20032397
 when 433 then 20032398
 when 258 then 20032399
 when 598 then 20032400
 when 463 then 20032401
 when 34 then 20032402
 when 3 then 20032403
 when 206 then 20032404
 when 346 then 20032405
 when 458 then 20032406
 when 63 then 20032407
 when 290 then 20032408
 when 554 then 20032409
 when 581 then 20032410
 when 314 then 20032411
 when 80 then 20032412
 when 173 then 20032413
 when 177 then 20032414
 when 461 then 20032415
 when 142 then 20032416
 when 128 then 20032417
 when 395 then 20032418
 when 590 then 20032419
 when 159 then 20032420
 when 252 then 20032422
 when 195 then 20032423
 when 365 then 20032424
 when 372 then 20032425
 when 89 then 20032426
 when 396 then 20032427
 when 295 then 20032428
 when 154 then 20032429
 when 35 then 20032430
 when 117 then 20032431
 when 150 then 20032432
 when 443 then 20032433
 when 507 then 20032434
 when 599 then 20032435
 when 519 then 20032436
 when 385 then 20032437
 when 446 then 20032438
 when 601 then 20032439
 when 549 then 20032440
 when 68 then 20032441
 when 532 then 20032442
 when 58 then 20032443
 when 56 then 20032444
 when 69 then 20032445
 when 491 then 20032446
 when 57 then 20032447
 when 107 then 20032448
 when 38 then 20032455
 

end as id
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS empenho
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content        
from CONTEMPENHOS as ct
inner join CONTFORNECEDORES as a 
on ct.cd_fornecedor = a.cd_fornecedor
WHERE ct.cd_cecam = 1995
and ct.cd_fichadesp < 5000
and ct.vl_empenho < 0
and cd_empenhob_base = 0
----and ct.cd_empenho = 431
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            // Parse the JSON content (se necessário)
            const content = JSON.parse(record.content);

            return {
                idIntegracao: record.idIntegracao.toString(), // Convertendo idIntegracao para string
                content: {
                    validaSaldo: content.validaSaldo === "true", // Convertendo string "true"/"false" para booleano
                    exercicio: content.exercicio || 2024, // Usando o valor do conteúdo ou 2024 como padrão
                    empenho: {
                        id: content.empenho?.id || 20030321 // Coletando ID do empenho, com valor padrão
                    },
                    numeroCadastro: content.numeroCadastro || 100122, // Valor padrão 100122
                    data: formatDate(content.data || '2024-01-25'), // Formatando data no formato AAAA-MM-DD com padrão
                    valor: content.valor || 69485.0100, // Usando valor padrão se não houver valor
                    motivo: content.motivo || "ANULAÇÃO DO EMPENHO Nº: 88" // Motivo padrão
                }
            };
        }).filter(record => record !== null); // Filtrando registros nulos
        



        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const response = await fetch('https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/anulacoes-empenhos', {
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
