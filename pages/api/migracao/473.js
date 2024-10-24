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
l.cd_LiquidacaoAnulada as idIntegracao,
JSON_QUERY(
(SELECT
'false' as validaSaldo,
l.cd_Exercicio as exercicio,
l.cd_Liquidacao numeroCadastro,
l.dt_Liquida  as data,
l.vl_Empenho              as valor,       
l.ds_Liquidacao   as motivo,

JSON_QUERY(
(SELECT 

case l.cd_LiquidacaoAnulada

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



                        

JSON_QUERY(
(SELECT
 l.vl_Empenho   as valor,
l.dt_Liquida  as data  
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS vencimentos,
JSON_QUERY(
(SELECT
JSON_QUERY(
(SELECT

case l.cd_LiquidacaoAnulada

  when   42 then 41131172
  when   39 then 41131173
  when   43 then 41131174
  when   41 then 41131175
  when   48 then 41131176
  when   40 then 41131177
  when   51 then 41131178
  when   45 then 41131179
  when   54 then 41131180
  when   50 then 41131182
  when   76 then 41131183
  when   66 then 41131184
  when   84 then 41131185
  when   52 then 41131186
  when   44 then 41131187
  when   88 then 41131188
  when   82 then 41131189
  when   78 then 41131190
  when   74 then 41131191
  when   55 then 41131192
  when   86 then 41131193
  when   53 then 41131194
  when   56 then 41131195
  when   59 then 41131196
  when   77 then 41131197
  when   73 then 41131198
  when   83 then 41131199
  when   65 then 41131201
  when   67 then 41131202
  when   80 then 41131203
  when   94 then 41131204
  when   91 then 41131205
  when   90 then 41131206
  when   68 then 41131207
  when   87 then 41131208
  when   93 then 41131209
  when   79 then 41131210
  when   100 then 41131211
  when   85 then 41131212
  when   75 then 41131213
  when   101 then 41131214
  when   89 then 41131215
  when   103 then 41131216
  when   95 then 41131217
  when   97 then 41131219
  when   102 then 41131220
  when   96 then 41131221
  when   92 then 41131222
  when   99 then 41131224
  when   98 then 41131225
  when   106 then 41131327
  when   107 then 41131328
  when   105 then 41131329
  when   104 then 41131330
  when   109 then 41131331
  when   112 then 41131332
  when   110 then 41131333
  when   108 then 41131334
  when   111 then 41131335
  when   116 then 41131336
  when   114 then 41131337
  when   142 then 41131338
  when   119 then 41131339
  when   127 then 41131340
  when   118 then 41131341
  when   115 then 41131342
  when   134 then 41131343
  when   113 then 41131344
  when   143 then 41131345
  when   147 then 41131346
  when   120 then 41131348
  when   135 then 41131349
  when   129 then 41131350
  when   117 then 41131351
  when   121 then 41131352
  when   124 then 41131353
  when   126 then 41131354
  when   128 then 41131355
  when   125 then 41131356
  when   131 then 41131357
  when   137 then 41131358
  when   132 then 41131359
  when   150 then 41131360
  when   133 then 41131361
  when   141 then 41131362
  when   122 then 41131363
  when   140 then 41131364
  when   158 then 41131365
  when   138 then 41131366
  when   144 then 41131367
  when   139 then 41131368
  when   157 then 41131369
  when   155 then 41131370
  when   123 then 41131371
  when   149 then 41131372
  when   168 then 41131373
  when   148 then 41131374
  when   171 then 41131375
  when   156 then 41131376
  when   169 then 41131377
  when   152 then 41131378
  when   165 then 41131379
  when   162 then 41131380
  when   178 then 41131381
  when   145 then 41131382
  when   160 then 41131383
  when   183 then 41131384
  when   199 then 41131385
  when   190 then 41131386
  when   167 then 41131387
  when   146 then 41131388
  when   164 then 41131389
  when   203 then 41131390
  when   130 then 41131391
  when   181 then 41131392
  when   180 then 41131393
  when   161 then 41131394
  when   211 then 41131395
  when   210 then 41131396
  when   200 then 41131397
  when   154 then 41131398
  when   184 then 41131399
  when   159 then 41131400
  when   163 then 41131401
  when   194 then 41131402
  when   136 then 41131403
  when   197 then 41131404
  when   188 then 41131405
  when   151 then 41131406
  when   195 then 41131407
  when   153 then 41131408
  when   204 then 41131409
  when   213 then 41131410
  when   206 then 41131411
  when   166 then 41131412
  when   170 then 41131413
  when   205 then 41131414
  when   177 then 41131415
  when   186 then 41131416
  when   196 then 41131417
  when   209 then 41131418
  when   187 then 41131419
  when   202 then 41131420
  when   179 then 41131421
  when   198 then 41131422
  when   201 then 41131423
  when   193 then 41131424
  when   208 then 41131425
  when   207 then 41131426
  when   212 then 41131427
  when   215 then 41131431
  when   214 then 41131432
  when   217 then 41131433
  when   216 then 41131434
  when   219 then 41131436
  when   225 then 41131437
  when   220 then 41131438
  when   218 then 41131439
  when   221 then 41131440
  when   224 then 41131441
  when   229 then 41131442
  when   233 then 41131443
  when   230 then 41131444
  when   239 then 41131445
  when   226 then 41131446
  when   227 then 41131447
  when   222 then 41131448
  when   237 then 41131449
  when   251 then 41131450
  when   223 then 41131451
  when   242 then 41131452
  when   232 then 41131453
  when   265 then 41131454
  when   228 then 41131455
  when   238 then 41131456
  when   249 then 41131457
  when   254 then 41131458
  when   257 then 41131459
  when   258 then 41131460
  when   267 then 41131461
  when   231 then 41131462
  when   243 then 41131463
  when   263 then 41131464
  when   261 then 41131465
  when   259 then 41131466
  when   250 then 41131467
  when   241 then 41131468
  when   255 then 41131469
  when   277 then 41131470
  when   285 then 41131471
  when   252 then 41131472
  when   253 then 41131473
  when   260 then 41131474
  when   266 then 41131475
  when   278 then 41131476
  when   280 then 41131477
  when   286 then 41131478
  when   279 then 41131479
  when   273 then 41131480
  when   298 then 41131481
  when   305 then 41131482
  when   268 then 41131483
  when   288 then 41131484
  when   307 then 41131485
  when   311 then 41131486
  when   303 then 41131487
  when   310 then 41131488
  when   264 then 41131489
  when   312 then 41131490
  when   338 then 41131491
  when   299 then 41131492
  when   308 then 41131493
  when   275 then 41131494
  when   320 then 41131495
  when   315 then 41131496
  when   301 then 41131497
  when   271 then 41131498
  when   342 then 41131499
  when   330 then 41131500
  when   329 then 41131501
  when   344 then 41131502
  when   313 then 41131503
  when   316 then 41131504
  when   309 then 41131505
  when   281 then 41131506
  when   325 then 41131507
  when   314 then 41131508
  when   319 then 41131509
  when   272 then 41131510
  when   317 then 41131511
  when   339 then 41131512
  when   327 then 41131513
  when   321 then 41131514
  when   328 then 41131515
  when   274 then 41131516
  when   331 then 41131517
  when   335 then 41131519
  when   334 then 41131520
  when   340 then 41131521
  when   343 then 41131522
  when   276 then 41131523
  when   300 then 41131524
  when   345 then 41131525
  when   284 then 41131526
  when   306 then 41131527
  when   287 then 41131528
  when   336 then 41131529
  when   337 then 41131530
  when   302 then 41131531
  when   332 then 41131532
  when   346 then 41131536
  when   350 then 41131537
  when   348 then 41131538
  when   347 then 41131539
  when   353 then 41131540
  when   349 then 41131541
  when   355 then 41131542
  when   357 then 41131543
  when   368 then 41131544
  when   351 then 41131545
  when   361 then 41131546
  when   376 then 41131547
  when   359 then 41131548
  when   362 then 41131549
  when   358 then 41131550
  when   360 then 41131551
  when   381 then 41131552
  when   366 then 41131553
  when   379 then 41131555
  when   378 then 41131556
  when   369 then 41131557
  when   387 then 41131558
  when   367 then 41131559
  when   363 then 41131560
  when   370 then 41131561
  when   372 then 41131562
  when   384 then 41131563
  when   356 then 41131564
  when   377 then 41131565
  when   375 then 41131566
  when   383 then 41131567
  when   371 then 41131568
  when   390 then 41131569
  when   385 then 41131570
  when   373 then 41131571
  when   395 then 41131572
  when   394 then 41131573
  when   374 then 41131574
  when   398 then 41131575
  when   396 then 41131576
  when   401 then 41131577
  when   411 then 41131578
  when   402 then 41131579
  when   400 then 41131580
  when   412 then 41131581
  when   380 then 41131582
  when   414 then 41131583
  when   417 then 41131584
  when   418 then 41131585
  when   399 then 41131586
  when   424 then 41131587
  when   422 then 41131588
  when   429 then 41131589
  when   382 then 41131590
  when   420 then 41131591
  when   388 then 41131592
  when   415 then 41131593
  when   405 then 41131594
  when   445 then 41131595
  when   393 then 41131596
  when   408 then 41131597
  when   397 then 41131598
  when   386 then 41131599
  when   419 then 41131600
  when   447 then 41131601
  when   423 then 41131603
  when   425 then 41131604
  when   427 then 41131605
  when   430 then 41131606
  when   439 then 41131607
  when   426 then 41131608
  when   407 then 41131609
  when   428 then 41131610
  when   452 then 41131611
  when   433 then 41131612
  when   409 then 41131613
  when   444 then 41131614
  when   410 then 41131615
  when   413 then 41131616
  when   459 then 41131617
  when   435 then 41131618
  when   440 then 41131619
  when   493 then 41131620
  when   455 then 41131621
  when   446 then 41131622
  when   451 then 41131623
  when   403 then 41131624
  when   421 then 41131625
  when   448 then 41131626
  when   404 then 41131627
  when   406 then 41131628
  when   504 then 41131629
  when   505 then 41131630
  when   434 then 41131631
  when   456 then 41131632
  when   460 then 41131633
  when   416 then 41131634
  when   438 then 41131635
  when   432 then 41131636
  when   436 then 41131637
  when   458 then 41131638
  when   462 then 41131639
  when   431 then 41131640
  when   437 then 41131641
  when   469 then 41131642
  when   443 then 41131644
  when   441 then 41131645
  when   464 then 41131646
  when   471 then 41131647
  when   466 then 41131648
  when   449 then 41131649
  when   486 then 41131650
  when   482 then 41131651
  when   484 then 41131652
  when   477 then 41131653
  when   470 then 41131654
  when   494 then 41131655
  when   492 then 41131656
  when   453 then 41131657
  when   442 then 41131658
  when   498 then 41131659
  when   509 then 41131660
  when   506 then 41131661
  when   481 then 41131662
  when   454 then 41131663
  when   463 then 41131664
  when   468 then 41131665
  when   450 then 41131666
  when   461 then 41131667
  when   474 then 41131668
  when   497 then 41131669
  when   500 then 41131670
  when   499 then 41131671
  when   496 then 41131672
  when   483 then 41131673
  when   475 then 41131674
  when   457 then 41131675
  when   502 then 41131676
  when   488 then 41131677
  when   501 then 41131678
  when   465 then 41131679
  when   508 then 41131680
  when   485 then 41131681
  when   490 then 41131682
  when   489 then 41131683
  when   472 then 41131684
  when   503 then 41131685
  when   473 then 41131686
  when   495 then 41131687
  when   491 then 41131688
  when   512 then 41131691
  when   511 then 41131692
  when   510 then 41131693
  when   515 then 41131694
  when   514 then 41131695
  when   522 then 41131696
  when   516 then 41131697
  when   517 then 41131698
  when   513 then 41131699
  when   528 then 41131700
  when   527 then 41131701
  when   521 then 41131702
  when   540 then 41131703
  when   529 then 41131704
  when   557 then 41131705
  when   537 then 41131706
  when   533 then 41131707
  when   563 then 41131708
  when   525 then 41131709
  when   538 then 41131710
  when   559 then 41131711
  when   588 then 41131712
  when   545 then 41131713
  when   584 then 41131714
  when   519 then 41131715
  when   535 then 41131716
  when   523 then 41131717
  when   560 then 41131718
  when   596 then 41131719
  when   531 then 41131720
  when   534 then 41131721
  when   598 then 41131722
  when   532 then 41131723
  when   536 then 41131724
  when   602 then 41131725
  when   572 then 41131726
  when   566 then 41131727
  when   555 then 41131728
  when   569 then 41131729
  when   607 then 41131730
  when   542 then 41131731
  when   578 then 41131732
  when   530 then 41131733
  when   573 then 41131734
  when   541 then 41131735
  when   589 then 41131736
  when   546 then 41131737
  when   581 then 41131738
  when   575 then 41131739
  when   543 then 41131740
  when   587 then 41131741
  when   558 then 41131742
  when   594 then 41131743
  when   603 then 41131744
  when   544 then 41131745
  when   564 then 41131746
  when   547 then 41131747
  when   548 then 41131748
  when   609 then 41131749
  when   605 then 41131750
  when   600 then 41131751
  when   549 then 41131752
  when   565 then 41131753
  when   617 then 41131754
  when   568 then 41131755
  when   574 then 41131756
  when   551 then 41131757
  when   561 then 41131758
  when   576 then 41131759
  when   582 then 41131760
  when   593 then 41131761
  when   615 then 41131762
  when   591 then 41131763
  when   606 then 41131764
  when   586 then 41131765
  when   608 then 41131766
  when   616 then 41131767
  when   571 then 41131768
  when   590 then 41131769
  when   618 then 41131770
  when   613 then 41131771
  when   611 then 41131772
  when   625 then 41131773
  when   621 then 41131774
  when   597 then 41131775
  when   614 then 41131776
  when   592 then 41131777
  when   599 then 41131778
  when   577 then 41131779
  when   623 then 41131780
  when   626 then 41131781
  when   619 then 41131782
  when   624 then 41131783
  when   622 then 41131784
  when   601 then 41131785
  when   595 then 41131786
  when   610 then 41131787
  when   604 then 41131788
  when   628 then 41131789
  when   627 then 41131790
  when   632 then 41131794
  when   630 then 41131795
  when   631 then 41131796
  when   629 then 41131797
  when   636 then 41131798
  when   634 then 41131799
  when   638 then 41131800
  when   633 then 41131801
  when   635 then 41131802
  when   648 then 41131803
  when   641 then 41131804
  when   649 then 41131805
  when   642 then 41131806
  when   661 then 41131807
  when   652 then 41131808
  when   656 then 41131809
  when   675 then 41131810
  when   669 then 41131811
  when   640 then 41131812
  when   645 then 41131813
  when   681 then 41131814
  when   668 then 41131815
  when   662 then 41131816
  when   687 then 41131817
  when   655 then 41131818
  when   637 then 41131819
  when   639 then 41131821
  when   651 then 41131822
  when   644 then 41131823
  when   696 then 41131824
  when   695 then 41131825
  when   676 then 41131826
  when   654 then 41131827
  when   700 then 41131828
  when   647 then 41131829
  when   658 then 41131830
  when   660 then 41131831
  when   703 then 41131832
  when   643 then 41131833
  when   705 then 41131834
  when   646 then 41131835
  when   650 then 41131836
  when   715 then 41131838
  when   680 then 41131839
  when   659 then 41131840
  when   653 then 41131841
  when   670 then 41131842
  when   666 then 41131843
  when   685 then 41131844
  when   664 then 41131845
  when   688 then 41131846
  when   672 then 41131847
  when   690 then 41131848
  when   671 then 41131849
  when   673 then 41131850
  when   694 then 41131851
  when   657 then 41131853
  when   665 then 41131854
  when   702 then 41131855
  when   713 then 41131856
  when   716 then 41131857
  when   682 then 41131858
  when   718 then 41131859
  when   674 then 41131860
  when   726 then 41131861
  when   667 then 41131862
  when   745 then 41131863
  when   663 then 41131864
  when   735 then 41131865
  when   742 then 41131866
  when   707 then 41131867
  when   710 then 41131868
  when   699 then 41131869
  when   728 then 41131870
  when   679 then 41131871
  when   751 then 41131872
  when   691 then 41131873
  when   711 then 41131874
  when   712 then 41131875
  when   721 then 41131876
  when   684 then 41131877
  when   692 then 41131878
  when   683 then 41131879
  when   686 then 41131880
  when   739 then 41131881
  when   722 then 41131882
  when   743 then 41131883
  when   677 then 41131884
  when   697 then 41131885
  when   698 then 41131886
  when   744 then 41131887
  when   747 then 41131888
  when   678 then 41131889
  when   704 then 41131890
  when   749 then 41131891
  when   693 then 41131892
  when   714 then 41131893
  when   708 then 41131894
  when   709 then 41131895
  when   752 then 41131896
  when   720 then 41131897
  when   727 then 41131898
  when   725 then 41131899
  when   717 then 41131900
  when   689 then 41131901
  when   729 then 41131902
  when   701 then 41131903
  when   750 then 41131904
  when   719 then 41131905
  when   732 then 41131906
  when   753 then 41131907
  when   706 then 41131908
  when   723 then 41131909
  when   733 then 41131910
  when   724 then 41131911
  when   741 then 41131912
  when   731 then 41131913
  when   730 then 41131914
  when   738 then 41131915
  when   748 then 41131916
  when   746 then 41131917

                            end as id


FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS comprovante,
dc.vl_LiquidaDocto        as valor 
                                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS comprovantes
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
FROM CONTEMPENHOLIQUIDACAO l
INNER JOIn CONTLIQUIDACAODOCTO dc
on l.cd_LiquidacaoAnulada = dc.cd_Liquidacao
and l.cd_Cecam = dc.cd_Cecam
inner join CONTEMPENHOS e 
on l.cd_LiquidacaoAnulada = e.cd_Liquidacao
and l.cd_Cecam = e.cd_cecam
where l.fl_tipo = 'A'
AND l.cd_Cecam = 1995
and l.cd_Empenho not in (select cd_empenho from CONTEMPENHOS
where  cd_Cecam = 1995
and (dt_emissao = '2024-01-01 00:00:00.000' or cd_fichadesp > 5000))
and l.cd_Liquidacao not in (
SELECT L.CD_LIQUIDACAO FROM CONTEMPENHOLIQUIDACAO l
inner join CONTEMPENHOLIQUIDACAORETENCAO rt
on  l.cd_Liquidacao = rt.cd_Liquidacao 
where l.cd_Cecam = rt.cd_Cecam
and l.fl_Tipo = 'A'
AND l.cd_Cecam = 1995
)
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
                    exercicio: content.exercicio, // Usando o valor do exercício ou 2024
                    numeroCadastro: content.numeroCadastro || null, // Usando o número de cadastro ou null
                    data: content.data ? formatDate(content.data) : null, // Formatando a data
                    valor: content.valor, // Usando o valor ou 0
                    motivo: content.motivo, // Usando o valor de motivo ou string vazia
                    liquidacao: {
                        id: content.liquidacao && content.liquidacao.id ? content.liquidacao.id : null // Garantindo que liquidacao.id exista
                    },
                    comprovantes: content.comprovantes ? [{
                        comprovante: {
                            id: content.comprovantes.comprovante && content.comprovantes.comprovante.id ? content.comprovantes.comprovante.id : null
                        },
                        valor: content.comprovantes.valor // Usando o valor do comprovante ou 0
                    }] : []
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
            const response = await fetch('https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/anulacoes-liquidacoes', {
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
