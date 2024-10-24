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
m.cd_codigo AS idIntegracao,
JSON_QUERY(
(SELECT
'false' as validaSaldo,
e.cd_exercicio as exercicio,
JSON_QUERY(
(SELECT 

case m.cd_empenho

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
) AS empenho,
 m.dt_movto  as data,
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
                                    end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS recurso,
m.vl_movimento	as valor
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS recursos,

JSON_QUERY(
(SELECT
JSON_QUERY(
(SELECT

case e.cd_Liquidacao
 when 263 then 24357390
 when 303 then 24357391
 when 268 then 24357392
 when 307 then 24357393
 when 537 then 24357394
 when 584 then 24357395
 when 519 then 24357396
 when 516 then 24357397
 when 548 then 24357398
 when 196 then 24361282
 when 197 then 24361283
 when 259 then 24361284
 when 51 then 24361285
 when 198 then 24361286
 when 528 then 24361287
 when 200 then 24361288
 when 599 then 24361289
 when 308 then 24361290
 when 199 then 24361291
 when 250 then 24361292
 when 728 then 24361294
 when 555 then 24361295
 when 361 then 24361296
 when 597 then 24361297
 when 750 then 24361298
 when 603 then 24361299
 when 477 then 24361300
 when 319 then 24361301
 when 602 then 24361302
 when 719 then 24361303
 when 363 then 24361304
 when 608 then 24361306
 when 376 then 24361307
 when 39 then 24361308
 when 367 then 24361309
 when 242 then 24361310
 when 549 then 24361311
 when 362 then 24361312
 when 390 then 24361313
 when 647 then 24361314
 when 475 then 24361315
 when 252 then 24361316
 when 571 then 24361317
 when 609 then 24361318
 when 598 then 24361319
 when 735 then 24361320
 when 601 then 24361321
 when 393 then 24361322
 when 600 then 24361323
 when 739 then 24361324
 when 306 then 24361325
 when 251 then 24361326
 when 40 then 24361327
 when 73 then 24361328
 when 486 then 24361329
 when 491 then 24361330
 when 738 then 24361331
 when 611 then 24361332
 when 42 then 24361350
 when 375 then 24361351
 when 718 then 24361352
 when 43 then 24361353
 when 299 then 24361354
 when 201 then 24361355
 when 533 then 24361356
 when 41 then 24361357
 when 515 then 24361358
 when 523 then 24361359
 when 45 then 24361360
 when 558 then 24361361
 when 514 then 24361362
 when 83 then 24361363
 when 274 then 24361364
 when 281 then 24361365
 when 264 then 24361366
 when 202 then 24361367
 when 626 then 24361368
 when 275 then 24361369
 when 50 then 24361370
 when 249 then 24361371
 when 241 then 24361372
 when 511 then 24361373
 when 312 then 24361374
 when 311 then 24361375
 when 67 then 24361376
 when 65 then 24361377
 when 80 then 24361378
 when 302 then 24361379
 when 55 then 24361380
 when 82 then 24361381
 when 301 then 24361382
 when 342 then 24361383
 when 77 then 24361384
 when 260 then 24361385
 when 261 then 24361386
 when 75 then 24361387
 when 113 then 24361388
 when 56 then 24361389
 when 557 then 24361390
 when 349 then 24361391
 when 106 then 24361392
 when 204 then 24361393
 when 714 then 24361394
 when 627 then 24361395
 when 569 then 24361396
 when 186 then 24361397
 when 273 then 24361399
 when 300 then 24361402
 when 54 then 24361403
 when 93 then 24361405
 when 79 then 24361406
 when 48 then 24361407
 when 52 then 24361408
 when 66 then 24361410
 when 485 then 24361411
 when 310 then 24361412
 when 59 then 24361413
 when 101 then 24361414
 when 74 then 24361415
 when 753 then 24361416
 when 276 then 24361417
 when 84 then 24361418
 when 85 then 24361419
 when 752 then 24361420
 when 68 then 24361421
 when 277 then 24361422
 when 359 then 24361423
 when 108 then 24361424
 when 104 then 24361425
 when 624 then 24361426
 when 110 then 24361427
 when 90 then 24361428
 when 109 then 24361429
 when 98 then 24361430
 when 76 then 24361431
 when 53 then 24361432
 when 96 then 24361434
 when 78 then 24361435
 when 88 then 24361436
 when 95 then 24361437
 when 94 then 24361438
 when 513 then 24361439
 when 107 then 24361440
 when 278 then 24361441
 when 91 then 24361442
 when 89 then 24361443
 when 111 then 24361444
 when 203 then 24361445
 when 92 then 24361446
 when 105 then 24361447
 when 103 then 24361448
 when 630 then 24361449
 when 97 then 24361450
 when 112 then 24361451
 when 116 then 24361452
 when 114 then 24361453
 when 115 then 24361454
 when 121 then 24361455
 when 135 then 24361456
 when 129 then 24361457
 when 117 then 24361458
 when 120 then 24361459
 when 148 then 24361460
 when 118 then 24361461
 when 165 then 24361462
 when 123 then 24361463
 when 122 then 24361464
 when 131 then 24361465
 when 137 then 24361466
 when 125 then 24361467
 when 141 then 24361468
 when 138 then 24361469
 when 128 then 24361470
 when 134 then 24361471
 when 132 then 24361472
 when 143 then 24361473
 when 145 then 24361474
 when 153 then 24361475
 when 119 then 24361476
 when 133 then 24361477
 when 142 then 24361478
 when 146 then 24361479
 when 149 then 24361480
 when 232 then 24361481
 when 522 then 24361482
 when 205 then 24361483
 when 184 then 24361484
 when 136 then 24361485
 when 298 then 24361486
 when 179 then 24361487
 when 170 then 24361488
 when 151 then 24361489
 when 144 then 24361490
 when 733 then 24361491
 when 150 then 24361492
 when 631 then 24361493
 when 124 then 24361494
 when 139 then 24361495
 when 156 then 24361496
 when 155 then 24361497
 when 126 then 24361498
 when 159 then 24361499
 when 130 then 24361500
 when 147 then 24361501
 when 127 then 24361502
 when 160 then 24361503
 when 732 then 24361504
 when 161 then 24361505
 when 180 then 24361506
 when 140 then 24361507
 when 193 then 24361508
 when 492 then 24361509
 when 731 then 24361510
 when 188 then 24361511
 when 744 then 24361512
 when 482 then 24361513
 when 469 then 24361514
 when 178 then 24361515
 when 177 then 24361516
 when 154 then 24361517
 when 166 then 24361518
 when 158 then 24361519
 when 157 then 24361520
 when 284 then 24361521
 when 152 then 24361522
 when 163 then 24361523
 when 285 then 24361524
 when 162 then 24361525
 when 181 then 24361526
 when 468 then 24361527
 when 169 then 24361528
 when 729 then 24361529
 when 742 then 24361530
 when 171 then 24361531
 when 164 then 24361532
 when 286 then 24361533
 when 190 then 24361534
 when 730 then 24361535
 when 195 then 24361536
 when 167 then 24361537
 when 187 then 24361538
 when 360 then 24361539
 when 510 then 24361540
 when 168 then 24361541
 when 743 then 24361542
 when 183 then 24361543
 when 231 then 24361544
 when 272 then 24361545
 when 194 then 24361546
 when 233 then 24361547
 when 481 then 24361548
 when 593 then 24361549
 when 741 then 24361550
 when 483 then 24361551
 when 751 then 24361552
 when 484 then 24361553
 when 209 then 24361554
 when 207 then 24361555
 when 271 then 24361556
 when 222 then 24361557
 when 208 then 24361558
 when 206 then 24361559
 when 211 then 24361560
 when 210 then 24361561
 when 214 then 24361562
 when 212 then 24361563
 when 216 then 24361564
 when 215 then 24361565
 when 213 then 24361566
 when 239 then 24361567
 when 243 then 24361568
 when 338 then 24361569
 when 512 then 24361570
 when 217 then 24361571
 when 266 then 24361572
 when 331 then 24361573
 when 221 then 24361574
 when 327 then 24361575
 when 223 then 24361576
 when 328 then 24361577
 when 224 then 24361578
 when 238 then 24361579
 when 257 then 24361580
 when 265 then 24361581
 when 369 then 24361582
 when 330 then 24361583
 when 356 then 24361584
 when 314 then 24361585
 when 344 then 24361586
 when 218 then 24361587
 when 325 then 24361588
 when 219 then 24361589
 when 220 then 24361590
 when 355 then 24361591
 when 335 then 24361592
 when 225 then 24361593
 when 345 then 24361595
 when 226 then 24361596
 when 346 then 24361597
 when 230 then 24361598
 when 228 then 24361599
 when 254 then 24361600
 when 621 then 24361601
 when 227 then 24361602
 when 309 then 24361603
 when 343 then 24361604
 when 253 then 24361605
 when 622 then 24361606
 when 358 then 24361608
 when 280 then 24361609
 when 337 then 24361610
 when 317 then 24361611
 when 321 then 24361612
 when 288 then 24361613
 when 350 then 24361614
 when 229 then 24361615
 when 258 then 24361616
 when 313 then 24361617
 when 237 then 24361618
 when 279 then 24361619
 when 560 then 24361620
 when 267 then 24361621
 when 315 then 24361622
 when 368 then 24361623
 when 720 then 24361624
 when 305 then 24361625
 when 332 then 24361626
 when 559 then 24361627
 when 373 then 24361628
 when 287 then 24361629
 when 320 then 24361630
 when 490 then 24361631
 when 357 then 24361632
 when 334 then 24361633
 when 336 then 24361634
 when 347 then 24361635
 when 372 then 24361636
 when 351 then 24361638
 when 329 then 24361639
 when 316 then 24361640
 when 255 then 24361641
 when 348 then 24361642
 when 371 then 24361643
 when 488 then 24361644
 when 370 then 24361645
 when 623 then 24361646
 when 377 then 24361647
 when 339 then 24361648
 when 489 then 24361649
 when 374 then 24361650
 when 366 then 24361651
 when 379 then 24361652
 when 378 then 24361653
 when 381 then 24361654
 when 380 then 24361655
 when 383 then 24361656
 when 397 then 24361657
 when 395 then 24361658
 when 384 then 24361659
 when 394 then 24361660
 when 410 then 24361661
 when 382 then 24361662
 when 400 then 24361663
 when 568 then 24361664
 when 398 then 24361665
 when 385 then 24361666
 when 396 then 24361667
 when 387 then 24361668
 when 452 then 24361669
 when 403 then 24361670
 when 399 then 24361671
 when 415 then 24361672
 when 435 then 24361673
 when 401 then 24361674
 when 402 then 24361675
 when 427 then 24361677
 when 409 then 24361678
 when 499 then 24361679
 when 431 then 24361680
 when 429 then 24361681
 when 418 then 24361682
 when 434 then 24361683
 when 423 then 24361684
 when 438 then 24361685
 when 404 then 24361686
 when 441 then 24361687
 when 428 then 24361688
 when 449 then 24361689
 when 425 then 24361690
 when 471 then 24361691
 when 465 then 24361692
 when 406 then 24361693
 when 458 then 24361694
 when 386 then 24361695
 when 494 then 24361696
 when 408 then 24361697
 when 439 then 24361698
 when 405 then 24361699
 when 426 then 24361700
 when 451 then 24361701
 when 420 then 24361702
 when 412 then 24361703
 when 443 then 24361704
 when 464 then 24361705
 when 414 then 24361706
 when 501 then 24361707
 when 421 then 24361708
 when 407 then 24361709
 when 450 then 24361710
 when 417 then 24361711
 when 445 then 24361712
 when 566 then 24361713
 when 500 then 24361714
 when 424 then 24361715
 when 440 then 24361716
 when 433 then 24361717
 when 411 then 24361718
 when 436 then 24361719
 when 455 then 24361720
 when 453 then 24361721
 when 495 then 24361722
 when 446 then 24361723
 when 388 then 24361724
 when 419 then 24361725
 when 437 then 24361726
 when 459 then 24361727
 when 442 then 24361728
 when 413 then 24361729
 when 448 then 24361730
 when 432 then 24361731
 when 422 then 24361732
 when 457 then 24361733
 when 493 then 24361734
 when 460 then 24361735
 when 473 then 24361736
 when 496 then 24361737
 when 456 then 24361738
 when 498 then 24361739
 when 430 then 24361740
 when 462 then 24361741
 when 447 then 24361742
 when 454 then 24361743
 when 470 then 24361744
 when 466 then 24361745
 when 461 then 24361746
 when 474 then 24361747
 when 463 then 24361748
 when 472 then 24361749
 when 444 then 24361750
 when 497 then 24361751
 when 502 then 24361752
 when 503 then 24361753
 when 505 then 24361754
 when 508 then 24361755
 when 504 then 24361756
 when 527 then 24361757
 when 509 then 24361758
 when 565 then 24361759
 when 506 then 24361760
 when 547 then 24361761
 when 587 then 24361762
 when 521 then 24361763
 when 525 then 24361764
 when 517 then 24361765
 when 534 then 24361766
 when 529 then 24361767
 when 538 then 24361768
 when 530 then 24361769
 when 536 then 24361770
 when 531 then 24361771
 when 575 then 24361772
 when 664 then 24361773
 when 572 then 24361774
 when 581 then 24361775
 when 542 then 24361776
 when 674 then 24361777
 when 535 then 24361778
 when 594 then 24361779
 when 544 then 24361780
 when 564 then 24361781
 when 595 then 24361782
 when 540 then 24361783
 when 677 then 24361784
 when 651 then 24361785
 when 541 then 24361786
 when 576 then 24361787
 when 577 then 24361788
 when 590 then 24361789
 when 532 then 24361790
 when 659 then 24361791
 when 543 then 24361792
 when 670 then 24361793
 when 591 then 24361794
 when 545 then 24361795
 when 586 then 24361796
 when 589 then 24361797
 when 671 then 24361798
 when 607 then 24361799
 when 561 then 24361800
 when 605 then 24361801
 when 546 then 24361802
 when 654 then 24361803
 when 680 then 24361804
 when 661 then 24361805
 when 632 then 24361806
 when 663 then 24361807
 when 617 then 24361808
 when 551 then 24361809
 when 563 then 24361810
 when 604 then 24361811
 when 614 then 24361812
 when 578 then 24361813
 when 669 then 24361814
 when 573 then 24361815
 when 675 then 24361816
 when 625 then 24361817
 when 656 then 24361818
 when 588 then 24361819
 when 592 then 24361820
 when 672 then 24361821
 when 616 then 24361822
 when 610 then 24361823
 when 629 then 24361824
 when 596 then 24361825
 when 582 then 24361826
 when 678 then 24361827
 when 668 then 24361828
 when 657 then 24361829
 when 653 then 24361830
 when 618 then 24361831
 when 665 then 24361832
 when 658 then 24361833
 when 655 then 24361834
 when 619 then 24361835
 when 628 then 24361836
 when 574 then 24361837
 when 613 then 24361838
 when 679 then 24361839
 when 650 then 24361840
 when 676 then 24361841
 when 662 then 24361842
 when 606 then 24361843
 when 615 then 24361844
 when 666 then 24361845
 when 673 then 24361846
 when 667 then 24361847
 when 649 then 24361848
 when 660 then 24361849
 when 633 then 24361850
 when 652 then 24361851
 when 643 then 24361853
 when 646 then 24361854
 when 648 then 24361855
 when 645 then 24361856
 when 640 then 24361857
 when 695 then 24361858
 when 642 then 24361859
 when 644 then 24361860
 when 641 then 24361861
 when 639 then 24361862
 when 696 then 24361864
 when 694 then 24361865
 when 721 then 24361866
 when 634 then 24361867
 when 636 then 24361868
 when 703 then 24361869
 when 717 then 24361870
 when 705 then 24361871
 when 707 then 24361872
 when 701 then 24361873
 when 698 then 24361874
 when 681 then 24361875
 when 722 then 24361876
 when 710 then 24361877
 when 711 then 24361878
 when 687 then 24361879
 when 704 then 24361880
 when 635 then 24361881
 when 638 then 24361882
 when 688 then 24361883
 when 709 then 24361884
 when 715 then 24361885
 when 746 then 24361886
 when 727 then 24361887
 when 745 then 24361888
 when 708 then 24361889
 when 724 then 24361890
 when 706 then 24361891
 when 693 then 24361892
 when 699 then 24361893
 when 748 then 24361894
 when 684 then 24361895
 when 637 then 24361896
 when 712 then 24361897
 when 713 then 24361898
 when 686 then 24361899
 when 702 then 24361900
 when 749 then 24361901
 when 683 then 24361902
 when 725 then 24361903
 when 691 then 24361904
 when 700 then 24361905
 when 747 then 24361906
 when 685 then 24361907
 when 689 then 24361908
 when 692 then 24361909
 when 690 then 24361910
 when 682 then 24361911
 when 726 then 24361912
 when 697 then 24361913
 when 723 then 24361914
 when 716 then 24361915
 when 44 then 24368519
 when 416 then 24368520
 when 99 then 24368521
 when 86 then 24368522
 when 353 then 24368523
 when 102 then 24368524
 when 87 then 24368526
 when 100 then 24368527
 when 340 then 24368529


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
and e.cd_Pagamento = m.cd_codigo_inicial
inner join CONTFICHABANCOS  b
on m.cd_banco = b.cd_banco 
and m.cd_cecam = b.cd_cecam
where e.cd_cecam = 1995
and m.cd_banco <> 1 
and (e.dt_emissao <> '2024-01-01 00:00:00.000' and e.cd_fichadesp < 5000)
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            // Parse o conteúdo JSON retornado do SELECT
            const content = JSON.parse(record.content);
        
            return {
                idIntegracao: record.idIntegracao ? record.idIntegracao.toString() : "1", // Usando "1" como valor padrão
                content: {
                    validaSaldo: content.validaSaldo === "true" ? true : false, // Convertendo string para boolean
                    exercicio: content.exercicio || 2024, // Usando o valor do exercício ou 2024
                    empenho: {
                        id: content.empenho && content.empenho.id ? content.empenho.id : null // Garantindo que empenho.id exista
                    },
                    data: content.data ? formatDate(content.data) : null, // Formatando a data
                    baixa: {
                        transacaoFinanceira: {
                            id: content.transacaoFinanceira && content.transacaoFinanceira.id ? content.transacaoFinanceira.id : null
                        },
                        numeroDocumento: content.numeroDocumento.toString() || null, // Usando o número de documento ou null
                        valor: content.valor, // Usando o valor ou 0
                        contaBancariaEntidade: {
                            id: content.contaBancariaEntidade && content.contaBancariaEntidade.id ? content.contaBancariaEntidade.id : null
                        },
                        recursos: content.recursos ? [{
                            recurso: {
                                id: content.recursos.recurso && content.recursos.recurso.id ? content.recursos.recurso.id : null
                            },
                            valor: content.recursos.valor || 0 // Usando o valor do recurso ou 0
                        }] : []
                    },
                    liquidacoes: content.liquidacoes ? [{
                        liquidacao: {
                            id: content.liquidacoes.liquidacao && content.liquidacoes.liquidacao.id ? content.liquidacoes.liquidacao.id : null
                        },
                        valor: content.liquidacoes.valor// Usando o valor da liquidação ou 0
                    }] : [],
                    numeroCadastro: content.numeroCadastro || null // Usando o número de cadastro ou null
                }
            };
        }).filter(record => record !== null); // Filtrando registros nulos
        
        // Função para formatar data no formato "YYYY-MM-DD"
        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toISOString().split('T')[0]; // Retorna apenas a parte "YYYY-MM-DD"
        }
        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const response = await fetch('https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/pagamentos', {
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
