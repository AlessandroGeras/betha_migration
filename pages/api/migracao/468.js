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

        // Selecionar o banco de dados "COMP_ALMO"
        const selectDatabaseQuery = 'USE PATRIMONIO';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            SELECT
ROW_NUMBER() OVER (ORDER BY BP.cd_Cecam) as id,
JSON_QUERY((SELECT 3332532 as id  FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS baixa,
JSON_QUERY((SELECT case  when BP.nr_chapa = 1 then 16285502
 when BP.nr_chapa = 2 then 16285504
 when BP.nr_chapa = 3 then 16285507
 when BP.nr_chapa = 4 then 16285510
 when BP.nr_chapa = 5 then 16285512
 when BP.nr_chapa = 6 then 16285515
 when BP.nr_chapa = 7 then 16285517
 when BP.nr_chapa = 8 then 16285519
 when BP.nr_chapa = 9 then 16285521
 when BP.nr_chapa = 10 then 16285523
 when BP.nr_chapa = 12 then 16285525
 when BP.nr_chapa = 13 then 16285527
 when BP.nr_chapa = 14 then 16285529
 when BP.nr_chapa = 15 then 16285531
 when BP.nr_chapa = 16 then 16285533
 when BP.nr_chapa = 17 then 16285535
 when BP.nr_chapa = 18 then 16285537
 when BP.nr_chapa = 19 then 16285539
 when BP.nr_chapa = 20 then 16285541
 when BP.nr_chapa = 21 then 16285543
 when BP.nr_chapa = 22 then 16285546
 when BP.nr_chapa = 23 then 16285548
 when BP.nr_chapa = 24 then 16285550
 when BP.nr_chapa = 27 then 16285552
 when BP.nr_chapa = 29 then 16285554
 when BP.nr_chapa = 30 then 16285556
 when BP.nr_chapa = 31 then 16285558
 when BP.nr_chapa = 32 then 16285560
 when BP.nr_chapa = 33 then 16285562
 when BP.nr_chapa = 34 then 16285564
 when BP.nr_chapa = 41 then 16285566
 when BP.nr_chapa = 42 then 16285568
 when BP.nr_chapa = 43 then 16285570
 when BP.nr_chapa = 44 then 16285572
 when BP.nr_chapa = 46 then 16285574
 when BP.nr_chapa = 55 then 16285576
 when BP.nr_chapa = 56 then 16285578
 when BP.nr_chapa = 64 then 16285580
 when BP.nr_chapa = 65 then 16285582
 when BP.nr_chapa = 66 then 16285584
 when BP.nr_chapa = 67 then 16285586
 when BP.nr_chapa = 68 then 16285588
 when BP.nr_chapa = 69 then 16285590
 when BP.nr_chapa = 77 then 16285592
 when BP.nr_chapa = 78 then 16285594
 when BP.nr_chapa = 79 then 16285596
 when BP.nr_chapa = 80 then 16285598
 when BP.nr_chapa = 81 then 16285601
 when BP.nr_chapa = 82 then 16285603
 when BP.nr_chapa = 83 then 16285606
 when BP.nr_chapa = 84 then 16285608
 when BP.nr_chapa = 85 then 16285610
 when BP.nr_chapa = 86 then 16285612
 when BP.nr_chapa = 87 then 16285614
 when BP.nr_chapa = 88 then 16285616
 when BP.nr_chapa = 89 then 16285618
 when BP.nr_chapa = 90 then 16285620
 when BP.nr_chapa = 91 then 16285622
 when BP.nr_chapa = 92 then 16285624
 when BP.nr_chapa = 93 then 16285626
 when BP.nr_chapa = 94 then 16285628
 when BP.nr_chapa = 95 then 16285630
 when BP.nr_chapa = 96 then 16285632
 when BP.nr_chapa = 97 then 16285634
 when BP.nr_chapa = 99 then 16285636
 when BP.nr_chapa = 100 then 16285638
 when BP.nr_chapa = 101 then 16285640
 when BP.nr_chapa = 102 then 16285643
 when BP.nr_chapa = 104 then 16285645
 when BP.nr_chapa = 105 then 16285647
 when BP.nr_chapa = 106 then 16285649
 when BP.nr_chapa = 107 then 16285651
 when BP.nr_chapa = 108 then 16285653
 when BP.nr_chapa = 109 then 16285655
 when BP.nr_chapa = 110 then 16285657
 when BP.nr_chapa = 111 then 16285659
 when BP.nr_chapa = 112 then 16285661
 when BP.nr_chapa = 113 then 16285663
 when BP.nr_chapa = 114 then 16285665
 when BP.nr_chapa = 115 then 16285667
 when BP.nr_chapa = 116 then 16285669
 when BP.nr_chapa = 130 then 16285671
 when BP.nr_chapa = 131 then 16285673
 when BP.nr_chapa = 132 then 16285675
 when BP.nr_chapa = 134 then 16285677
 when BP.nr_chapa = 157 then 16285679
 when BP.nr_chapa = 159 then 16285681
 when BP.nr_chapa = 167 then 16285684
 when BP.nr_chapa = 168 then 16285686
 when BP.nr_chapa = 170 then 16285688
 when BP.nr_chapa = 177 then 16285690
 when BP.nr_chapa = 178 then 16285692
 when BP.nr_chapa = 226 then 16285694
 when BP.nr_chapa = 227 then 16285696
 when BP.nr_chapa = 229 then 16285698
 when BP.nr_chapa = 232 then 16285700
 when BP.nr_chapa = 233 then 16285702
 when BP.nr_chapa = 234 then 16285704
 when BP.nr_chapa = 235 then 16285706
 when BP.nr_chapa = 237 then 16285709
 when BP.nr_chapa = 238 then 16285737
 when BP.nr_chapa = 239 then 16285739
 when BP.nr_chapa = 240 then 16285744
 when BP.nr_chapa = 241 then 16285745
 when BP.nr_chapa = 242 then 16285746
 when BP.nr_chapa = 243 then 16285747
 when BP.nr_chapa = 244 then 16285748
 when BP.nr_chapa = 245 then 16285749
 when BP.nr_chapa = 246 then 16285750
 when BP.nr_chapa = 247 then 16285751
 when BP.nr_chapa = 248 then 16285752
 when BP.nr_chapa = 249 then 16285753
 when BP.nr_chapa = 250 then 16285755
 when BP.nr_chapa = 251 then 16285757
 when BP.nr_chapa = 252 then 16285759
 when BP.nr_chapa = 253 then 16285761
 when BP.nr_chapa = 254 then 16285762
 when BP.nr_chapa = 255 then 16285764
 when BP.nr_chapa = 256 then 16285766
 when BP.nr_chapa = 257 then 16285768
 when BP.nr_chapa = 258 then 16285770
 when BP.nr_chapa = 259 then 16285772
 when BP.nr_chapa = 260 then 16285774
 when BP.nr_chapa = 261 then 16285776
 when BP.nr_chapa = 262 then 16285778
 when BP.nr_chapa = 263 then 16285780
 when BP.nr_chapa = 264 then 16285782
 when BP.nr_chapa = 265 then 16285783
 when BP.nr_chapa = 266 then 16285785
 when BP.nr_chapa = 267 then 16285788
 when BP.nr_chapa = 268 then 16285790
 when BP.nr_chapa = 278 then 16285793
 when BP.nr_chapa = 279 then 16285795
 when BP.nr_chapa = 280 then 16285797
 when BP.nr_chapa = 281 then 16285799
 when BP.nr_chapa = 282 then 16285801
 when BP.nr_chapa = 283 then 16285803
 when BP.nr_chapa = 284 then 16285805
 when BP.nr_chapa = 285 then 16285807
 when BP.nr_chapa = 286 then 16285809
 when BP.nr_chapa = 287 then 16285811
 when BP.nr_chapa = 288 then 16285812
 when BP.nr_chapa = 293 then 16285814
 when BP.nr_chapa = 294 then 16285816
 when BP.nr_chapa = 295 then 16285818
 when BP.nr_chapa = 296 then 16285820
 when BP.nr_chapa = 297 then 16285822
 when BP.nr_chapa = 298 then 16285824
 when BP.nr_chapa = 299 then 16285826
 when BP.nr_chapa = 300 then 16285833
 when BP.nr_chapa = 301 then 16285837
 when BP.nr_chapa = 302 then 16285839
 when BP.nr_chapa = 303 then 16285841
 when BP.nr_chapa = 305 then 16285843
 when BP.nr_chapa = 306 then 16285845
 when BP.nr_chapa = 307 then 16285848
 when BP.nr_chapa = 308 then 16285850
 when BP.nr_chapa = 309 then 16285851
 when BP.nr_chapa = 310 then 16285853
 when BP.nr_chapa = 311 then 16285855
 when BP.nr_chapa = 313 then 16285857
 when BP.nr_chapa = 315 then 16285859
 when BP.nr_chapa = 316 then 16285861
 when BP.nr_chapa = 317 then 16285863
 when BP.nr_chapa = 318 then 16285865
 when BP.nr_chapa = 319 then 16285867
 when BP.nr_chapa = 320 then 16285869
 when BP.nr_chapa = 321 then 16285872
 when BP.nr_chapa = 322 then 16285874
 when BP.nr_chapa = 323 then 16285875
 when BP.nr_chapa = 325 then 16285877
 when BP.nr_chapa = 326 then 16285879
 when BP.nr_chapa = 327 then 16285881
 when BP.nr_chapa = 328 then 16285883
 when BP.nr_chapa = 329 then 16285886
 when BP.nr_chapa = 330 then 16285888
 when BP.nr_chapa = 331 then 16285890
 when BP.nr_chapa = 332 then 16285892
 when BP.nr_chapa = 333 then 16285894
 when BP.nr_chapa = 334 then 16285896
 when BP.nr_chapa = 335 then 16285898
 when BP.nr_chapa = 336 then 16285900
 when BP.nr_chapa = 337 then 16285902
 when BP.nr_chapa = 338 then 16285904
 when BP.nr_chapa = 339 then 16285906
 when BP.nr_chapa = 340 then 16285908
 when BP.nr_chapa = 341 then 16285910
 when BP.nr_chapa = 342 then 16285912
 when BP.nr_chapa = 343 then 16285915
 when BP.nr_chapa = 344 then 16285917
 when BP.nr_chapa = 345 then 16285919
 when BP.nr_chapa = 346 then 16285921
 when BP.nr_chapa = 347 then 16285923
 when BP.nr_chapa = 348 then 16285925
 when BP.nr_chapa = 349 then 16285927
 when BP.nr_chapa = 350 then 16285929
 when BP.nr_chapa = 351 then 16285931
 when BP.nr_chapa = 352 then 16285933
 when BP.nr_chapa = 353 then 16285938
 when BP.nr_chapa = 354 then 16285940
 when BP.nr_chapa = 355 then 16285942
 when BP.nr_chapa = 356 then 16285944
 when BP.nr_chapa = 357 then 16285946
 when BP.nr_chapa = 358 then 16285949
 when BP.nr_chapa = 359 then 16285951
 when BP.nr_chapa = 360 then 16285953
 when BP.nr_chapa = 361 then 16285955
 when BP.nr_chapa = 362 then 16285957
 when BP.nr_chapa = 363 then 16285959
 when BP.nr_chapa = 364 then 16285961
 when BP.nr_chapa = 365 then 16285963
 when BP.nr_chapa = 366 then 16285965
 when BP.nr_chapa = 367 then 16285967
 when BP.nr_chapa = 368 then 16285970
 when BP.nr_chapa = 369 then 16285972
 when BP.nr_chapa = 370 then 16285974
 when BP.nr_chapa = 371 then 16285975
 when BP.nr_chapa = 372 then 16285978
 when BP.nr_chapa = 373 then 16285980
 when BP.nr_chapa = 374 then 16285982
 when BP.nr_chapa = 375 then 16285984
 when BP.nr_chapa = 376 then 16285986
 when BP.nr_chapa = 377 then 16285988
 when BP.nr_chapa = 378 then 16285990
 when BP.nr_chapa = 379 then 16285992
 when BP.nr_chapa = 380 then 16285994
 when BP.nr_chapa = 381 then 16285996
 when BP.nr_chapa = 382 then 16285998
 when BP.nr_chapa = 383 then 16286000
 when BP.nr_chapa = 384 then 16286002
 when BP.nr_chapa = 385 then 16286004
 when BP.nr_chapa = 386 then 16286006
 when BP.nr_chapa = 387 then 16286008
 when BP.nr_chapa = 388 then 16286011
 when BP.nr_chapa = 389 then 16286013
 when BP.nr_chapa = 390 then 16286015
 when BP.nr_chapa = 391 then 16286017
 when BP.nr_chapa = 392 then 16286019
 when BP.nr_chapa = 393 then 16286021
 when BP.nr_chapa = 394 then 16286023
 when BP.nr_chapa = 395 then 16286025
 when BP.nr_chapa = 396 then 16286027
 when BP.nr_chapa = 397 then 16286029
 when BP.nr_chapa = 398 then 16286031
 when BP.nr_chapa = 399 then 16286034
 when BP.nr_chapa = 400 then 16286036
 when BP.nr_chapa = 401 then 16286038
 when BP.nr_chapa = 402 then 16286040
 when BP.nr_chapa = 403 then 16286042
 when BP.nr_chapa = 404 then 16286044
 when BP.nr_chapa = 405 then 16286046
 when BP.nr_chapa = 406 then 16286048
 when BP.nr_chapa = 407 then 16286050
 when BP.nr_chapa = 408 then 16286052
 when BP.nr_chapa = 409 then 16286054
 when BP.nr_chapa = 410 then 16286056
 when BP.nr_chapa = 411 then 16286058
 when BP.nr_chapa = 412 then 16286060
 when BP.nr_chapa = 413 then 16286062
 when BP.nr_chapa = 414 then 16286064
 when BP.nr_chapa = 415 then 16286066
 when BP.nr_chapa = 416 then 16286069
 when BP.nr_chapa = 417 then 16286074
 when BP.nr_chapa = 418 then 16286077
 when BP.nr_chapa = 419 then 16286079
 when BP.nr_chapa = 420 then 16286081
 when BP.nr_chapa = 421 then 16286083
 when BP.nr_chapa = 422 then 16286085
 when BP.nr_chapa = 423 then 16286087
 when BP.nr_chapa = 424 then 16286089
 when BP.nr_chapa = 425 then 16286091
 when BP.nr_chapa = 426 then 16286093
 when BP.nr_chapa = 427 then 16286095
 when BP.nr_chapa = 428 then 16286097
 when BP.nr_chapa = 429 then 16286099
 when BP.nr_chapa = 430 then 16286101
 when BP.nr_chapa = 431 then 16286103
 when BP.nr_chapa = 432 then 16286105
 when BP.nr_chapa = 433 then 16286107
 when BP.nr_chapa = 434 then 16286110
 when BP.nr_chapa = 435 then 16286112
 when BP.nr_chapa = 436 then 16286114
 when BP.nr_chapa = 437 then 16286116
 when BP.nr_chapa = 438 then 16286119
 when BP.nr_chapa = 439 then 16286121
 when BP.nr_chapa = 440 then 16286123
 when BP.nr_chapa = 441 then 16286125
 when BP.nr_chapa = 442 then 16286127
 when BP.nr_chapa = 443 then 16286129
 when BP.nr_chapa = 444 then 16286131
 when BP.nr_chapa = 445 then 16286133
 when BP.nr_chapa = 446 then 16286135
 when BP.nr_chapa = 447 then 16286137
 when BP.nr_chapa = 448 then 16286139
 when BP.nr_chapa = 449 then 16286141
 when BP.nr_chapa = 450 then 16286143
 when BP.nr_chapa = 451 then 16286145
 when BP.nr_chapa = 452 then 16286147
 when BP.nr_chapa = 453 then 16286149
 when BP.nr_chapa = 454 then 16286151
 when BP.nr_chapa = 455 then 16286153
 when BP.nr_chapa = 456 then 16286155
 when BP.nr_chapa = 457 then 16286158
 when BP.nr_chapa = 458 then 16286160
 when BP.nr_chapa = 459 then 16286162
 when BP.nr_chapa = 460 then 16286164
 when BP.nr_chapa = 461 then 16286166
 when BP.nr_chapa = 462 then 16286168
 when BP.nr_chapa = 463 then 16286170
 when BP.nr_chapa = 464 then 16286172
 when BP.nr_chapa = 465 then 16286183
 when BP.nr_chapa = 466 then 16286185
 when BP.nr_chapa = 467 then 16286187
 when BP.nr_chapa = 468 then 16286189
 when BP.nr_chapa = 469 then 16286191
 when BP.nr_chapa = 470 then 16286193
 when BP.nr_chapa = 471 then 16286195
 when BP.nr_chapa = 472 then 16286197
 when BP.nr_chapa = 473 then 16286199
 when BP.nr_chapa = 474 then 16286201
 when BP.nr_chapa = 475 then 16286203
 when BP.nr_chapa = 476 then 16286205
 when BP.nr_chapa = 477 then 16286207
 when BP.nr_chapa = 478 then 16286209
 when BP.nr_chapa = 479 then 16286211
 when BP.nr_chapa = 480 then 16286213
 when BP.nr_chapa = 481 then 16286215
 when BP.nr_chapa = 482 then 16286217
 when BP.nr_chapa = 483 then 16286220
 when BP.nr_chapa = 484 then 16286222
 when BP.nr_chapa = 485 then 16286224
 when BP.nr_chapa = 486 then 16286226
 when BP.nr_chapa = 487 then 16286228
 when BP.nr_chapa = 488 then 16286230
 when BP.nr_chapa = 489 then 16286232
 when BP.nr_chapa = 490 then 16286234
 when BP.nr_chapa = 491 then 16286236
 when BP.nr_chapa = 492 then 16286238
 when BP.nr_chapa = 493 then 16286240
 when BP.nr_chapa = 494 then 16286242
 when BP.nr_chapa = 495 then 16286244
 when BP.nr_chapa = 496 then 16286246
 when BP.nr_chapa = 497 then 16286248
 when BP.nr_chapa = 498 then 16286251
 when BP.nr_chapa = 499 then 16286252
 when BP.nr_chapa = 500 then 16286254
 when BP.nr_chapa = 501 then 16286256
 when BP.nr_chapa = 502 then 16286259
 when BP.nr_chapa = 503 then 16286261
 when BP.nr_chapa = 504 then 16286263
 when BP.nr_chapa = 505 then 16286265
 when BP.nr_chapa = 506 then 16286267
 when BP.nr_chapa = 507 then 16286270
 when BP.nr_chapa = 508 then 16286272
 when BP.nr_chapa = 509 then 16286275
 when BP.nr_chapa = 510 then 16286277
 when BP.nr_chapa = 511 then 16286279
 when BP.nr_chapa = 512 then 16286281
 when BP.nr_chapa = 513 then 16286283
 when BP.nr_chapa = 514 then 16286285
 when BP.nr_chapa = 515 then 16286287
 when BP.nr_chapa = 516 then 16286288
 when BP.nr_chapa = 517 then 16286289
 when BP.nr_chapa = 518 then 16286291
 when BP.nr_chapa = 519 then 16286292
 when BP.nr_chapa = 520 then 16286293
 when BP.nr_chapa = 521 then 16286294
 when BP.nr_chapa = 522 then 16286295
 when BP.nr_chapa = 523 then 16286297
 when BP.nr_chapa = 524 then 16286298
 when BP.nr_chapa = 525 then 16286299
 when BP.nr_chapa = 526 then 16286300
 when BP.nr_chapa = 527 then 16286301
 when BP.nr_chapa = 531 then 16286302
 when BP.nr_chapa = 566 then 16286303
 when BP.nr_chapa = 755 then 16286304
 when BP.nr_chapa = 756 then 16286305
 when BP.nr_chapa = 757 then 16286306
 when BP.nr_chapa = 758 then 16286307
 when BP.nr_chapa = 759 then 16286308
 when BP.nr_chapa = 760 then 16286309
 when BP.nr_chapa = 779 then 16286310
 when BP.nr_chapa = 812 then 16286311
 when BP.nr_chapa = 813 then 16286312
 when BP.nr_chapa = 814 then 16286313
 when BP.nr_chapa = 815 then 16286314
 when BP.nr_chapa = 822 then 16286315
 when BP.nr_chapa = 825 then 16286316
 when BP.nr_chapa = 842 then 16286317
 when BP.nr_chapa = 843 then 16286318
 when BP.nr_chapa = 844 then 16286319
 when BP.nr_chapa = 845 then 16286320
 when BP.nr_chapa = 846 then 16286321
 when BP.nr_chapa = 847 then 16286322
 when BP.nr_chapa = 849 then 16286323
 when BP.nr_chapa = 850 then 16286325
 when BP.nr_chapa = 851 then 16286326
 when BP.nr_chapa = 853 then 16286327
 when BP.nr_chapa = 854 then 16286328
 when BP.nr_chapa = 856 then 16286329
 when BP.nr_chapa = 857 then 16286331
 when BP.nr_chapa = 858 then 16286333
 when BP.nr_chapa = 859 then 16286335
 when BP.nr_chapa = 860 then 16286337
 when BP.nr_chapa = 861 then 16286339
 when BP.nr_chapa = 865 then 16286341
 when BP.nr_chapa = 878 then 16286342
 when BP.nr_chapa = 879 then 16286345
 when BP.nr_chapa = 881 then 16286347
 when BP.nr_chapa = 883 then 16286349
 when BP.nr_chapa = 885 then 16286350
 when BP.nr_chapa = 886 then 16286353
 when BP.nr_chapa = 887 then 16286355
 when BP.nr_chapa = 888 then 16286356
 when BP.nr_chapa = 889 then 16286358
 when BP.nr_chapa = 890 then 16286360
 when BP.nr_chapa = 891 then 16286362
 when BP.nr_chapa = 892 then 16286364
 when BP.nr_chapa = 893 then 16286366
 when BP.nr_chapa = 894 then 16286369
 when BP.nr_chapa = 895 then 16286371
 when BP.nr_chapa = 896 then 16286373
 when BP.nr_chapa = 897 then 16286375
 when BP.nr_chapa = 898 then 16286377
 when BP.nr_chapa = 899 then 16286379
 when BP.nr_chapa = 900 then 16286381
 when BP.nr_chapa = 901 then 16286383
 when BP.nr_chapa = 902 then 16286385
 when BP.nr_chapa = 903 then 16286387
 when BP.nr_chapa = 904 then 16286388
 when BP.nr_chapa = 905 then 16286390
 when BP.nr_chapa = 906 then 16286392
 when BP.nr_chapa = 907 then 16286395
 when BP.nr_chapa = 908 then 16286397
 when BP.nr_chapa = 909 then 16286399
 when BP.nr_chapa = 910 then 16286401
 when BP.nr_chapa = 911 then 16286403
 when BP.nr_chapa = 912 then 16286406
 when BP.nr_chapa = 913 then 16286407
 when BP.nr_chapa = 914 then 16286410
 when BP.nr_chapa = 915 then 16286412
 when BP.nr_chapa = 916 then 16286414
 when BP.nr_chapa = 917 then 16286416
 when BP.nr_chapa = 918 then 16286418
 when BP.nr_chapa = 919 then 16286420
 when BP.nr_chapa = 920 then 16286422
 when BP.nr_chapa = 921 then 16286424
 when BP.nr_chapa = 922 then 16286426
 when BP.nr_chapa = 923 then 16286428
 when BP.nr_chapa = 924 then 16286430
 when BP.nr_chapa = 925 then 16286432
 when BP.nr_chapa = 926 then 16286434
 when BP.nr_chapa = 927 then 16286436
 when BP.nr_chapa = 928 then 16286438
 when BP.nr_chapa = 929 then 16286440
 when BP.nr_chapa = 930 then 16286442
 when BP.nr_chapa = 931 then 16286444
 when BP.nr_chapa = 932 then 16286446
 when BP.nr_chapa = 933 then 16286448
 when BP.nr_chapa = 934 then 16286451
 when BP.nr_chapa = 935 then 16286453
 when BP.nr_chapa = 936 then 16286455
 when BP.nr_chapa = 937 then 16286457
 when BP.nr_chapa = 938 then 16286459
 when BP.nr_chapa = 939 then 16286461
 when BP.nr_chapa = 940 then 16286463
 when BP.nr_chapa = 941 then 16286465
 when BP.nr_chapa = 942 then 16286467
 when BP.nr_chapa = 943 then 16286469
 when BP.nr_chapa = 944 then 16286471
 when BP.nr_chapa = 945 then 16286473
 when BP.nr_chapa = 946 then 16286475
 when BP.nr_chapa = 947 then 16286477
 when BP.nr_chapa = 948 then 16286479
 when BP.nr_chapa = 949 then 16286481
 when BP.nr_chapa = 950 then 16286483
 when BP.nr_chapa = 951 then 16286485
 when BP.nr_chapa = 952 then 16286487
 when BP.nr_chapa = 953 then 16286489
 when BP.nr_chapa = 954 then 16286491
 when BP.nr_chapa = 955 then 16286493
 when BP.nr_chapa = 956 then 16286495
 when BP.nr_chapa = 957 then 16286497
 when BP.nr_chapa = 958 then 16286499
 when BP.nr_chapa = 959 then 16286501
 when BP.nr_chapa = 960 then 16286503
 when BP.nr_chapa = 961 then 16286505
 when BP.nr_chapa = 962 then 16286507
 when BP.nr_chapa = 963 then 16286509
 when BP.nr_chapa = 964 then 16286511
 when BP.nr_chapa = 965 then 16286513
 when BP.nr_chapa = 966 then 16286515
 when BP.nr_chapa = 967 then 16286517
 when BP.nr_chapa = 968 then 16286519
 when BP.nr_chapa = 969 then 16286523
 when BP.nr_chapa = 970 then 16286525
 when BP.nr_chapa = 971 then 16286527
 when BP.nr_chapa = 972 then 16286529
 when BP.nr_chapa = 973 then 16286531
 when BP.nr_chapa = 974 then 16286533
 when BP.nr_chapa = 975 then 16286535
 when BP.nr_chapa = 976 then 16286537
 when BP.nr_chapa = 977 then 16286539
 when BP.nr_chapa = 978 then 16286541
 when BP.nr_chapa = 997 then 16286542
 when BP.nr_chapa = 998 then 16286544
 when BP.nr_chapa = 999 then 16286546
 when BP.nr_chapa = 1130 then 16286548
 when BP.nr_chapa = 1131 then 16286550
 when BP.nr_chapa = 1132 then 16286552
 when BP.nr_chapa = 1138 then 16286554
 when BP.nr_chapa = 1139 then 16286556
 when BP.nr_chapa = 1140 then 16286558
 when BP.nr_chapa = 1144 then 16286560
 when BP.nr_chapa = 1158 then 16286562
 when BP.nr_chapa = 1159 then 16286564
 when BP.nr_chapa = 1160 then 16286566
 when BP.nr_chapa = 1170 then 16286569
 when BP.nr_chapa = 1180 then 16286571
 when BP.nr_chapa = 1181 then 16286573
 when BP.nr_chapa = 1426 then 16286575
 when BP.nr_chapa = 1444 then 16286577
 when BP.nr_chapa = 1445 then 16286579
 when BP.nr_chapa = 1501 then 16286581
 when BP.nr_chapa = 1561 then 16286583
 when BP.nr_chapa = 1783 then 16286585
 when BP.nr_chapa = 1804 then 16286587
 when BP.nr_chapa = 1832 then 16286589
 when BP.nr_chapa = 1915 then 16286590
 when BP.nr_chapa = 1959 then 16286592
 when BP.nr_chapa = 1986 then 16286594
 when BP.nr_chapa = 1987 then 16286596
 when BP.nr_chapa = 1988 then 16286598
 when BP.nr_chapa = 1989 then 16286600
 when BP.nr_chapa = 1990 then 16286602
 when BP.nr_chapa = 1991 then 16286604
 when BP.nr_chapa = 1992 then 16286606
 when BP.nr_chapa = 2109 then 16286608
 when BP.nr_chapa = 2175 then 16286610
 when BP.nr_chapa = 2215 then 16286612
 when BP.nr_chapa = 2250 then 16286615
 when BP.nr_chapa = 2267 then 16286617
 when BP.nr_chapa = 2604 then 16286619
 when BP.nr_chapa = 2730 then 16286621
 when BP.nr_chapa = 3464 then 16286622
 when BP.nr_chapa = 4645 then 16286624
 when BP.nr_chapa = 4715 then 16286626
 when BP.nr_chapa = 4806 then 16286628
 when BP.nr_chapa = 4807 then 16286630
 when BP.nr_chapa = 4920 then 16286635
 when BP.nr_chapa = 4972 then 16286638
 when BP.nr_chapa = 4980 then 16286640
 when BP.nr_chapa = 4996 then 16286642
 when BP.nr_chapa = 4997 then 16286644
 when BP.nr_chapa = 4999 then 16286646
 when BP.nr_chapa = 5050 then 16286648
 when BP.nr_chapa = 5075 then 16286650
 when BP.nr_chapa = 5077 then 16286652
 when BP.nr_chapa = 5101 then 16286654
 when BP.nr_chapa = 5147 then 16286656
 when BP.nr_chapa = 5148 then 16286658
 when BP.nr_chapa = 5161 then 16286660
 when BP.nr_chapa = 5162 then 16286662
 when BP.nr_chapa = 5163 then 16286664
 when BP.nr_chapa = 5185 then 16286666
 when BP.nr_chapa = 5186 then 16286668
 when BP.nr_chapa = 5187 then 16286670
 when BP.nr_chapa = 5208 then 16286672
 when BP.nr_chapa = 5209 then 16286674
 when BP.nr_chapa = 5235 then 16286676
 when BP.nr_chapa = 1161 then 16289138
 end as id  FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS bem,
 'Conversao de dados' as notaExplicativa
FROM PATRBensPatrimoniais  BP where BP.cd_situacao = 2 and BP.cd_EntidadeContabil = 1
        `;

        const result = await masterConnection.query(userQuery);

        const resultData = result.recordset;

        console.log(resultData);

        const transformedData = resultData.map(record => {
            return {
                id: record.id ? parseInt(record.id, 10) : 0, // Assume que existe um campo `id` no resultado do select
                baixa: {
                    id: record.baixa ? JSON.parse(record.baixa).id : 0
                },
                bem: {
                    id: record.bem ? JSON.parse(record.bem).id : 0
                },
                notaExplicativa: record.notaExplicativa ? record.notaExplicativa : "Conversao de dados"
            };
        });
       


        // Enviar cada registro individualmente para a rota desejada
        for (const record of transformedData) {
            const response = await fetch('https://patrimonio.betha.cloud/patrimonio-services/api/baixas/3332532/bens', {
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
        }

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