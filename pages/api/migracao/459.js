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
ct.cd_codigo as idIntegracao,
JSON_QUERY(
(SELECT
ct.cd_exercicio as exercicio,
'false' as validaSaldo,
JSON_QUERY(
                        (SELECT
                                                case  ct. cd_MovimentacaoAnulada

 when 155 then 14604558
 when 159 then 14604560
 when 163 then 14604561
 when 241 then 14604563
 when 209 then 14604565
 when 395 then 14604567
 when 435 then 14604568
 when 513 then 14604570
 when 729 then 14604572
 when 818 then 14604574
 when 917 then 14604576
 when 1130 then 14604578
 when 1188 then 14604580
 when 1451 then 14604581
 when 1345 then 14604583
 when 1507 then 14604585
 when 1508 then 14604586
 when 1509 then 14604588
 when 1510 then 14604590
 when 1511 then 14604592
 when 1512 then 14604594
 when 1452 then 14604595
 when 1257 then 14604597
 when 1258 then 14604599
 when 1259 then 14604601
 when 1260 then 14604602
 when 1261 then 14604604
 when 1262 then 14604606
 when 1263 then 14604608
 when 1264 then 14604609
 when 1265 then 14604610
 when 1266 then 14604612
 when 1267 then 14604615
 when 1268 then 14604617
 when 1269 then 14604619
 when 1270 then 14604621
 when 1271 then 14604623
 when 1272 then 14604625
 when 1273 then 14604627
 when 1274 then 14604629
 when 1275 then 14604631
 when 1276 then 14604633
 when 1277 then 14604635
 when 1278 then 14604637
 when 1279 then 14604638
 when 1280 then 14604640
 when 1281 then 14604642
 when 1282 then 14604644
 when 1283 then 14604645
 when 1284 then 14604648
 when 1285 then 14604652
 when 1286 then 14604654
 when 1287 then 14604655
 when 1288 then 14604657
 when 1289 then 14604659
 when 1290 then 14604661
 when 1291 then 14604663
 when 1292 then 14604666
 when 1293 then 14604668
 when 1294 then 14604670
 when 1295 then 14604673
 when 1296 then 14604675
 when 1297 then 14604677
 when 1248 then 14604678
 when 1249 then 14604680
 when 1381 then 14604683
 when 821 then 14604685
 when 822 then 14604686
 when 823 then 14604688
 when 824 then 14604691
 when 825 then 14604692
 when 826 then 14604694
 when 827 then 14604696
 when 828 then 14604699
 when 829 then 14604701
 when 830 then 14604703
 when 792 then 14604704
 when 793 then 14604706
 when 794 then 14604708
 when 795 then 14604710
 when 796 then 14604712
 when 797 then 14604714
 when 798 then 14604716
 when 799 then 14604718
 when 800 then 14604719
 when 801 then 14604721
 when 802 then 14604722
 when 803 then 14604724
 when 804 then 14604725
 when 805 then 14604727
 when 806 then 14604729
 when 807 then 14604731
 when 808 then 14604733
 when 809 then 14604735
 when 699 then 14604736
 when 491 then 14604737
 when 492 then 14604739
 when 493 then 14604741
 when 494 then 14604743
 when 495 then 14604745
 when 496 then 14604749
 when 497 then 14604751
 when 498 then 14604753
 when 499 then 14604755
 when 500 then 14604758
 when 501 then 14604760
 when 502 then 14604762
 when 503 then 14604764
 when 504 then 14604766
 when 505 then 14604768
 when 384 then 14604770
 when 371 then 14604772
 when 372 then 14604774
 when 316 then 14604775
 when 317 then 14604777
 when 318 then 14604779
 when 320 then 14604781
 when 321 then 14604783
 when 322 then 14604785
 when 323 then 14604786
 when 324 then 14604787
 when 325 then 14604790
 when 326 then 14604792
 when 327 then 14604794
 when 328 then 14604796
 when 243 then 14604797
 when 244 then 14604799
 when 144 then 14604801
 when 145 then 14604803
 when 147 then 14604805
 when 140 then 14604806
 when 150 then 14604808
 when 152 then 14604811
 when 240 then 14604812
 when 737 then 14604814
 when 739 then 14604816
 when 508 then 14604817
 when 510 then 14604819
 when 413 then 14604820
 when 415 then 14604822
 when 831 then 14604824
 when 1425 then 14604826
 when 1427 then 14604829
 when 1181 then 14604831
 when 1183 then 14604832
 when 1048 then 14604833
 when 1050 then 14604835
 when 1453 then 14604838
 when 1454 then 14604841
 when 832 then 14604842
 when 246 then 14604844
 when 247 then 14604846
 when 833 then 14604848
 when 1455 then 14604849
 when 1456 then 14604851
 when 1432 then 14604852
 when 1055 then 14604854
 when 1191 then 14604856
 when 834 then 14604858
 when 517 then 14604860
 when 744 then 14604862
 when 248 then 14604864
 when 408 then 14604866
 when 168 then 14604868
 when 172 then 14604870
 when 193 then 14604872
 when 249 then 14604874
 when 835 then 14604876
 when 751 then 14604878
 when 1437 then 14604881
 when 1457 then 14604882
 when 1458 then 14604885
 when 1441 then 14604887
 when 836 then 14604889
 when 837 then 14604891
 when 250 then 14604894
 when 251 then 14604895
 when 253 then 14604897
 when 177 then 14604899
 when 178 then 14604901
 when 843 then 14604903
 when 731 then 14604906
 when 1436 then 14604908
 when 1347 then 14604909
 when 1459 then 14604911
 when 1460 then 14604913
 when 748 then 14604914
 when 1461 then 14604916
 when 844 then 14604918
 when 254 then 14604920
 when 373 then 14604921
 when 374 then 14604923
 when 375 then 14604925
 when 376 then 14604927
 when 377 then 14604928
 when 378 then 14604930
 when 379 then 14604932
 when 380 then 14604934
 when 381 then 14604936
 when 382 then 14604937
 when 383 then 14604939
 when 329 then 14604941
 when 330 then 14604943
 when 331 then 14604946
 when 332 then 14604949
 when 333 then 14604950
 when 334 then 14604952
 when 335 then 14604954
 when 336 then 14604956
 when 337 then 14604958
 when 338 then 14604960
 when 339 then 14604962
 when 340 then 14604965
 when 341 then 14604967
 when 342 then 14604969
 when 343 then 14604970
 when 344 then 14604972
 when 345 then 14604974
 when 346 then 14604976
 when 347 then 14604978
 when 348 then 14604979
 when 349 then 14604981
 when 350 then 14604983
 when 351 then 14604985
 when 352 then 14604987
 when 353 then 14604989
 when 354 then 14604991
 when 355 then 14604993
 when 356 then 14604996
 when 357 then 14604997
 when 358 then 14604999
 when 359 then 14605001
 when 360 then 14605003
 when 361 then 14605005
 when 362 then 14605007
 when 363 then 14605009
 when 364 then 14605012
 when 365 then 14605014
 when 366 then 14605015
 when 367 then 14605017
 when 368 then 14605019
 when 845 then 14605021
 when 846 then 14605024
 when 847 then 14605026
 when 848 then 14605027
 when 849 then 14605029
 when 850 then 14605031
 when 851 then 14605033
 when 852 then 14605035
 when 853 then 14605037
 when 854 then 14605040
 when 855 then 14605042
 when 856 then 14605043
 when 857 then 14605045
 when 810 then 14605047
 when 811 then 14605049
 when 812 then 14605052
 when 813 then 14605054
 when 814 then 14605056
 when 815 then 14605058
 when 816 then 14605059
 when 817 then 14605061
 when 460 then 14605063
 when 461 then 14605064
 when 462 then 14605066
 when 463 then 14605068
 when 464 then 14605070
 when 465 then 14605071
 when 466 then 14605073
 when 467 then 14605076
 when 468 then 14605077
 when 469 then 14605079
 when 470 then 14605081
 when 471 then 14605083
 when 472 then 14605085
 when 473 then 14605087
 when 474 then 14605089
 when 475 then 14605091
 when 476 then 14605093
 when 477 then 14605095
 when 478 then 14605097
 when 479 then 14605099
 when 480 then 14605100
 when 481 then 14605102
 when 482 then 14605103
 when 483 then 14605105
 when 484 then 14605107
 when 485 then 14605109
 when 486 then 14605111
 when 487 then 14605113
 when 488 then 14605115
 when 489 then 14605117
 when 490 then 14605118
 when 1513 then 14605120
 when 1514 then 14605122
 when 1515 then 14605123
 when 1516 then 14605125
 when 1517 then 14605127
 when 1519 then 14605129
 when 1439 then 14605132
 when 787 then 14605133
 when 788 then 14605135
 when 789 then 14605137
 when 790 then 14605139
 when 791 then 14605141
 when 1201 then 14605144
 when 1202 then 14605146
 when 1203 then 14605148
 when 1204 then 14605150
 when 1205 then 14605152
 when 1206 then 14605154
 when 1207 then 14605156
 when 1208 then 14605158
 when 1209 then 14605160
 when 1210 then 14605162
 when 1211 then 14605164
 when 1212 then 14605166
 when 1213 then 14605168
 when 1214 then 14605170
 when 1215 then 14605172
 when 1216 then 14605174
 when 1217 then 14605176
 when 1218 then 14605177
 when 1219 then 14605179
 when 1220 then 14605180
 when 1221 then 14605182
 when 1222 then 14605184
 when 1223 then 14605186
 when 1224 then 14605188
 when 1225 then 14605189
 when 1226 then 14605190
 when 1227 then 14605192
 when 1228 then 14605194
 when 1229 then 14605196
 when 1230 then 14605197
 when 1231 then 14605199
 when 1232 then 14605200
 when 1233 then 14605202
 when 1234 then 14605204
 when 1235 then 14605206
 when 1236 then 14605208
 when 1237 then 14605209
 when 1238 then 14605211
 when 1239 then 14605213
 when 1240 then 14605215
 when 1241 then 14605216
 when 1242 then 14605218
 when 1243 then 14605220
 when 1244 then 14605221
 when 1245 then 14605223
 when 1246 then 14605225
 when 1247 then 14605226
 when 1250 then 14605228
 when 1251 then 14605230
 when 1252 then 14605232
 when 1253 then 14605234
 when 1254 then 14605235
 when 1255 then 14605237
 when 1256 then 14605238
 when 1356 then 14605240
 when 1357 then 14605242
 when 1358 then 14605244
 when 1359 then 14605245
 when 1360 then 14605247
 when 1361 then 14605248
 when 1362 then 14605249
 when 1363 then 14605251
 when 1364 then 14605253
 when 1365 then 14605255
 when 1366 then 14605256
 when 1367 then 14605258
 when 1368 then 14605261
 when 1369 then 14605262
 when 1370 then 14605264
 when 1371 then 14605266
 when 1372 then 14605268
 when 1373 then 14605270
 when 1374 then 14605272
 when 1375 then 14605274
 when 1376 then 14605276
 when 1377 then 14605278
 when 1378 then 14605280
 when 1379 then 14605282
 when 1380 then 14605285
 when 1298 then 14605287
 when 1299 then 14605288
 when 1300 then 14605290
 when 1301 then 14605292
 when 1302 then 14605294
 when 1462 then 14605295
 when 858 then 14605297
 when 255 then 14605299
 when 256 then 14605301
 when 139 then 14605303
 when 859 then 14605304
 when 612 then 14605306
 when 1463 then 14605308
 when 1200 then 14605310
 when 1464 then 14605312
 when 1465 then 14605314
 when 860 then 14605316
 when 257 then 14605318
 when 258 then 14605320
 when 167 then 14605322
 when 861 then 14605324
 when 1466 then 14605326
 when 1467 then 14605328
 when 862 then 14605330
 when 259 then 14605333
 when 260 then 14605335
 when 863 then 14605338
 when 1468 then 14605339
 when 1469 then 14605341
 when 864 then 14605343
 when 261 then 14605346
 when 262 then 14605348
 when 865 then 14605350
 when 1470 then 14605352
 when 1471 then 14605354
 when 869 then 14605356
 when 263 then 14605358
 when 264 then 14605360
 when 870 then 14605361
 when 1472 then 14605363
 when 1473 then 14605365
 when 871 then 14605366
 when 265 then 14605368
 when 266 then 14605371
 when 872 then 14605373
 when 1474 then 14605374
 when 725 then 14605376
 when 267 then 14605379
 when 268 then 14605381
 when 734 then 14605382
 when 736 then 14605384
 when 873 then 14605386
 when 269 then 14605388
 when 1475 then 14605391
 when 1476 then 14605393
 when 270 then 14605394
 when 874 then 14605396
 when 875 then 14605399
 when 839 then 14605401
 when 840 then 14605402
 when 841 then 14605404
 when 842 then 14605407
 when 746 then 14605409
 when 740 then 14605410
 when 742 then 14605412
 when 700 then 14605415
 when 519 then 14605425
 when 511 then 14605427
 when 515 then 14605428
 when 416 then 14605431
 when 437 then 14605433
 when 438 then 14605434
 when 271 then 14605436
 when 272 then 14605438
 when 273 then 14605440
 when 274 then 14605442
 when 275 then 14605444
 when 276 then 14605446
 when 165 then 14605448
 when 161 then 14605450
 when 162 then 14605451
 when 157 then 14605452
 when 153 then 14605454
 when 142 then 14605455
 when 148 then 14605457
 when 174 then 14605459
 when 170 then 14605461
 when 410 then 14605463
 when 412 then 14605465
 when 203 then 14605468
 when 397 then 14605470
 when 211 then 14605471
 when 1477 then 14605473
 when 1434 then 14605475
 when 1443 then 14605477
 when 1444 then 14605480
 when 1445 then 14605481
 when 1446 then 14605482
 when 1186 then 14605484
 when 1190 then 14605486
 when 1143 then 14605488
 when 1144 then 14605491
 when 1057 then 14605494
 when 1058 then 14605495
 when 1051 then 14605497
 when 1053 then 14605499
 when 905 then 14605501
 when 906 then 14605503
 when 1193 then 14605504
 when 1194 then 14605506
 when 1428 then 14605507
 when 1430 then 14605509
 when 1431 then 14605511
 when 1184 then 14605513
 when 1478 then 14605515
 when 277 then 14605517
 when 876 then 14605519
 when 878 then 14605522
 when 278 then 14605524
 when 1479 then 14605526
 when 1480 then 14605528
 when 279 then 14605530
 when 879 then 14605532
 when 369 then 14605534
 when 1506 then 14605537
 when 907 then 14605540
 when 1481 then 14605541
 when 280 then 14605543
 when 880 then 14605545
 when 881 then 14605546
 when 440 then 14605548
 when 281 then 14605550
 when 1482 then 14605552
 when 957 then 14605554
 when 958 then 14605556
 when 1483 then 14605558
 when 282 then 14605560
 when 882 then 14605561
 when 883 then 14605563
 when 283 then 14605564
 when 389 then 14605566
 when 1485 then 14605568
 when 1486 then 14605569
 when 1348 then 14605571
 when 1047 then 14605573
 when 749 then 14605575
 when 750 then 14605577
 when 919 then 14605578
 when 920 then 14605581
 when 1127 then 14605583
 when 1128 then 14605584
 when 1195 then 14605586
 when 1196 then 14605588
 when 1303 then 14605590
 when 1328 then 14605591
 when 1329 then 14605592
 when 390 then 14605594
 when 391 then 14605597
 when 392 then 14605598
 when 393 then 14605600
 when 394 then 14605602
 when 216 then 14605604
 when 217 then 14605606
 when 406 then 14605608
 when 284 then 14605610
 when 179 then 14605612
 when 180 then 14605614
 when 181 then 14605616
 when 182 then 14605618
 when 183 then 14605620
 when 184 then 14605622
 when 185 then 14605624
 when 186 then 14605626
 when 187 then 14605629
 when 188 then 14605631
 when 189 then 14605633
 when 190 then 14605635
 when 191 then 14605637
 when 192 then 14605639
 when 884 then 14605642
 when 885 then 14605644
 when 434 then 14605646
 when 701 then 14605647
 when 702 then 14605649
 when 607 then 14605651
 when 732 then 14605654
 when 506 then 14605655
 when 507 then 14605657
 when 886 then 14605659
 when 285 then 14605661
 when 1487 then 14605663
 when 1488 then 14605665
 when 286 then 14605667
 when 887 then 14605669
 when 888 then 14605671
 when 287 then 14605673
 when 1489 then 14605676
 when 1505 then 14605678
 when 908 then 14605680
 when 370 then 14605682
 when 889 then 14605684
 when 525 then 14605686
 when 1490 then 14605687
 when 1491 then 14605690
 when 1492 then 14605692
 when 1493 then 14605694
 when 1494 then 14605695
 when 890 then 14605697
 when 288 then 14605700
 when 289 then 14605702
 when 891 then 14605703
 when 1495 then 14605705
 when 1496 then 14605708
 when 892 then 14605710
 when 290 then 14605711
 when 291 then 14605713
 when 215 then 14605715
 when 194 then 14605719
 when 893 then 14605720
 when 439 then 14605723
 when 703 then 14605724
 when 1497 then 14605727
 when 1498 then 14605730
 when 1438 then 14605732
 when 921 then 14605733
 when 1197 then 14605735
 when 1500 then 14605738
 when 894 then 14605740
 when 292 then 14605742
 when 293 then 14605744
 when 176 then 14605746
 when 407 then 14605747
 when 895 then 14605749
 when 521 then 14605751
 when 1501 then 14605753
 when 1129 then 14605756
 when 1502 then 14605758
 when 896 then 14605760
 when 898 then 14605761
 when 294 then 14605763
 when 295 then 14605765
 when 195 then 14605768
 when 196 then 14605769
 when 899 then 14605771
 when 900 then 14605774
 when 1503 then 14605776
                         
                                                end as id
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS arrecadacao,
ct.dt_movto       as data,
ct.vl_movimento  as valor,
CONCAT('ANULAÇÃO MIGRAÇÃO DA RECEITA: ', r.ds_receita)        as motivo,
JSON_QUERY(
(SELECT
JSON_QUERY(
                        (SELECT
                        case  r.cd_CategoriaEconomicaReceita
   when 1112500100 then 675129
 when 1112500200 then 675130
 when 1112500300 then 675131
 when 1112500400 then 675132
 when 1112530100 then 675133
 when 1113031100 then 675134
 when 1114511101 then 675135
 when 1114511102 then 675136
 when 1114511200 then 675137
 when 1114511300 then 675138
 when 1114511400 then 675139
 when 1121010101 then 675140
 when 1121010102 then 675141
 when 1121010104 then 675142
 when 1121010105 then 675143
 when 1121010106 then 675144
 when 1121010107 then 675145
 when 1121500100 then 675146
 when 1122010101 then 675147
 when 1122010102 then 675148
 when 1122010103 then 675149
 when 1122010104 then 675150
 when 1122010105 then 675151
 when 1122010106 then 675152
 when 1122010107 then 675153
 when 1122010108 then 675154
 when 1241500100 then 675155
 when 1321010101 then 675156
 when 1321010104 then 675157
 when 1321010105 then 675158
 when 1321010106 then 675159
 when 1321010107 then 675160
 when 1321010108 then 675161
 when 1321010111 then 675162
 when 1321010112 then 675163
 when 1321010113 then 675164
 when 1321010114 then 675165
 when 1321010115 then 675166
 when 1699990101 then 675167
 when 1699990102 then 675168
 when 1711511101 then 675169
 when 1711512101 then 675170
 when 1711512102 then 675171
 when 1711520101 then 675172
 when 1712510100 then 675173
 when 1712524100 then 675174
 when 1714500100 then 675175
 when 1714520100 then 675176
 when 1714530100 then 675177
 when 1719580101 then 675178
 when 1721500101 then 675179
 when 1721510101 then 675180
 when 1721520101 then 675181
 when 1721530100 then 675182
 when 1724510101 then 675183
 when 1751500101 then 675184
 when 1751500102 then 675185
 when 1759990101 then 675186
 when 1922990100 then 675187
 when 1999992101 then 675188
 when 2422540101 then 675189
 when 1321010102 then 675190
 when 1321010110 then 675191
 when 1713501101 then 675192
 when 1713501102 then 675193
 when 1713501103 then 675194
 when 1713501104 then 675195
 when 1713502101 then 675196
 when 1713503101 then 675197
 when 1713503102 then 675198
 when 1713503103 then 675199
 when 1713504101 then 675200
 when 1713505102 then 675201
 when 1723500102 then 675202
 when 1723500103 then 675203
 when 1724500101 then 675204
 when 1321010103 then 675205
 when 1321010109 then 675206
 when 1716500101 then 675207
 when 1716500102 then 675208
 when 1716500103 then 675209
 when 1716500105 then 675210
 when 1729510101 then 675211
 when 1729510102 then 675212
 when 1729510103 then 675213
 when 1729510105 then 675214
  when 1923990404 then 678176
 when 1923990406 then 678180
 when 1923990407 then 678184
 when 1923990408 then 678189
 when 1923990409 then 678192
 when 1923990410 then 678194
 when 1923990411 then 678195
 when 1923990412 then 678198
 when 1923990413 then 678200
 when 1923990414 then 678202
 when 1923990415 then 678204
 when 1321010116 then 678206
 when 1321010117 then 678208
 when 1321010118 then 678210
 when 1321010119 then 678212
 when 1321010120 then 678214
 when 1321010121 then 678216
 when 1714990101 then 678218
 when 1714990102 then 678220
 when 1113034101 then 678222
 when 1113034102 then 678224
 when 1922011101 then 678226
 when 1923990101 then 678228
 when 1923990102 then 678230
 when 1923990103 then 678231
 when 1923990104 then 678233
 when 1923990301 then 678235
 when 1923990302 then 678237
 when 1923990303 then 678239
 when 1923990304 then 678241
 when 1923990305 then 678243
 when 1923990306 then 678245
 when 1923990307 then 678247
 when 1923990308 then 678249
 when 1923990309 then 678251
 when 1923990310 then 678253
 when 1923990311 then 678255
 when 1923990312 then 678257
 when 1923990313 then 678258
 when 1923990314 then 678260
 when 1923990315 then 678262
 when 1923990401 then 678264
 when 1923990402 then 678266
 when 1923990403 then 678268
 when 1711511104 then 678270
 when 1321010131 then 678272
 when 1321010132 then 678274
 when 2429990101 then 678276
                                    end as id
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS receitaArrecadacao,
ct.vl_movimento  as valor,
JSON_QUERY(
                        (SELECT

                   JSON_QUERY(
                        (SELECT
                        case  r.cd_DestinacaoRecurso
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
                ) AS recursoArrecadacao,
        ct.vl_movimento as valor
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS recursos
                                 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS receitas
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
from CONT_MOVIMENTACAO ct
inner join CONTFICHABANCOS  b
on ct.cd_banco = b.cd_banco 
and ct.cd_cecam = b.cd_cecam
inner join contfichareceita r 
on ct.cd_ficharec = r.cd_ficharec
-----where ct.cd_ficharec in (41,46,54,56,58)
where ct.cd_cecam = 1995
and r.cd_receitaPrevisaoTipo not in (95,99)
and ct.fl_depret = 'R'
and ct.fl_tipo = 'R'
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            // Parse o conteúdo JSON retornado do SELECT
            const content = JSON.parse(record.content);
        
            return {
                idIntegracao: record.idIntegracao.toString(), // Convertendo idIntegracao para string
                content: {
                    exercicio: content.exercicio, // Usando o valor retornado do SELECT
                    validaSaldo: content.validaSaldo === "true", // Convertendo string "true"/"false" para booleano
                    arrecadacao: {
                        id: content.arrecadacao?.id // Usando o id da arrecadação
                    },
                    data: formatDate(content.data), // Formatando a data no formato AAAA-MM-DD
                    valor: content.valor, // Usando o valor retornado
                    motivo: content.motivo, // Usando o valor retornado para o motivo
                    receitas: [
                        {
                            receitaArrecadacao: {
                                id: content.receitas?.receitaArrecadacao?.id // Usando o id da receita de arrecadação
                            },
                            valor: content.receitas?.valor, // Usando o valor da receita
                            recursos: [
                                {
                                    recursoArrecadacao: {
                                        id: content.receitas?.recursos?.recursoArrecadacao?.id // Usando o id do recurso de arrecadação
                                    },
                                    valor: content.receitas?.recursos?.valor // Usando o valor do recurso de arrecadação
                                }
                            ]
                        }
                    ]
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
            const response = await fetch('https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/anulacoes-arrecadacoes-orcamentarias', {
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
