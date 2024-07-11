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

        // Selecionar o banco de dados "COMP_ALMO_CAM"
        const selectDatabaseQuery = 'USE TRIBUTOS2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select
i.cd_Imovel as idIntegracao,
JSON_QUERY(
        (SELECT
o.ds_Observ as campo10,
i.cd_Imovel as idImovel,
'4102199' as idBairro,
nm_CEP as cep,
'IMOVEL' as enderecoCorrespondencia,
ds_complemento as complemento,
cd_InscricaoAnterior as inscricaoAnterior,
case ds_logradouroent
        WHEN 'LINHA 75, KM 08 FAZENDA VIDA NOVA' THEN 14461462
        WHEN 'AGUIA BRANCA' THEN 14461469
        WHEN 'BEIRA RIO' THEN 14461463
        WHEN 'CARLOS GOMES' THEN 14461464
        WHEN 'DAS GARÇAS' THEN 14461475
        WHEN 'DAS LARANJEIRAS' THEN 14461467
        WHEN 'DOS PIONEIROS' THEN 14461474
        WHEN 'IGUAÇU' THEN 14461476
        WHEN 'LINHA 75' THEN 14461479
        WHEN 'P 06 KM 01' THEN 14461468
        WHEN 'P-14, KM 05' THEN 14461470
        WHEN ',' THEN 14461478
        WHEN 'ALMIRANTE TAMANDARE' THEN 14461482
        WHEN 'ALMIRANTE TAMANDARÉ' THEN 14461465
        WHEN 'ANTÔNIO JESUS DE OLIVEIRA' THEN 14461466
        WHEN 'ARARAS' THEN 14461473
        WHEN 'AV BEIJA FLOR' THEN 14461471
        WHEN 'AV CARLOS GOMES' THEN 14461481
        WHEN 'AV. CARLOS GOMES N. 772' THEN 14461483
        WHEN 'AV. SALVADOR N. 5531' THEN 14461495
        WHEN 'BENEDITO LAURINDO GONÇALVES' THEN 14461484
        WHEN 'BENTEVI' THEN 14461472
        WHEN 'CANARIO' THEN 14461477
        WHEN 'CANINDÉ' THEN 14461485
        WHEN 'CARLOS DRUMMOND DE ANDRADE' THEN 14461488
        WHEN 'CASTELO BRANCO' THEN 14461480
        WHEN 'DA MATRIZ' THEN 14461489
        WHEN 'DAS ARARAS' THEN 14461486
        WHEN 'DOS IMIGRANTES' THEN 14461507
        WHEN 'DOS PIONEIROS' THEN 14461474
        WHEN 'DOS PIRIQUITOS' THEN 14461512
        WHEN 'DUQUE DE CAIXIAS' THEN 14461501
        WHEN 'DUQUE DE CAXIAS' THEN 14461493
        WHEN 'ÉRICO VERÍSSIMO' THEN 14461498
        WHEN 'EURICO  VERICIO' THEN 14461502
        WHEN 'GETÚLIO DORNELES VARGAS' THEN 14461503
        WHEN 'GETÚLIO DORNELLES VARGAS' THEN 14461497
        WHEN 'GRACILIANO RAMOS' THEN 14461500
        WHEN 'JAIR DIAS' THEN 14461505
        WHEN 'JAIR DIAS ESQUINA C/ LINHA 75' THEN 14461487
        WHEN 'JORGE AMADO' THEN 14461492
        WHEN 'JOSÉ RODRIGUES DE OLIVEIRA' THEN 14461506
        WHEN 'JUDITE JESUS DE OLIVEIRA PARUSSULO' THEN 14461515
        WHEN 'LINHA 75' THEN 14461479
        WHEN 'MACHADO DE ASSIS' THEN 14461494
        WHEN 'MANOEL ANTÔNIO DE OLIVEIRA' THEN 14461517
        WHEN 'MANOEL RIBAS' THEN 14461509
        WHEN 'MONTEIRO LOBATO' THEN 14461511
        WHEN 'ORLANDINO JESUS DE OLIVEIRA' THEN 14461491
        WHEN 'PERIQUITO' THEN 14461496
        WHEN 'RUA JUDITE JESUS DE O PARUSSUL' THEN 14461499
        WHEN 'RUA ORLANDINO JESUS DE OLIVEIRA' THEN 14461514
        WHEN 'SABIÁ' THEN 14461508
        WHEN 'SETE DE SETEMBRO' THEN 14461510
        WHEN 'TUIUIU' THEN 14461513
        WHEN 'YPE' THEN 14461504
end as idLogradouro,
case i.cd_Proprietario
when        7        then        77020381
when        10        then        77020362
when        11        then        77020363
when        15        then        77020383
when        23        then        77020370
when        24        then        77020371
when        27        then        77020374
when        29        then        77020376
when        30        then        77020377
when        35        then        77020462
when        37        then        77020464
when        45        then        77020472
when        48        then        77020475
when        50        then        77020477
when        52        then        77020479
when        53        then        77020480
when        59        then        77020427
when        60        then        77020428
when        63        then        77020431
when        71        then        77020439
when        72        then        77020500
when        74        then        77020502
when        75        then        77020503
when        78        then        77020506
when        80        then        77020508
when        83        then        77020511
when        84        then        77020512
when        86        then        77020514
when        87        then        77020515
when        88        then        77020516
when        89        then        77020517
when        92        then        77020520
when        93        then        77020521
when        96        then        77020524
when        101        then        77020529
when        102        then        77020530
when        103        then        77020531
when        107        then        77020535
when        111        then        77020539
when        112        then        77020540
when        113        then        77020541
when        116        then        77020544
when        118        then        77020546
when        121        then        77020549
when        123        then        77020551
when        127        then        77020555
when        130        then        77020558
when        134        then        77020562
when        135        then        77020563
when        137        then        77020565
when        138        then        77020566
when        141        then        77020569
when        142        then        77020570
when        144        then        77020572
when        146        then        77020574
when        147        then        77020575
when        151        then        77020579
when        153        then        77020581
when        157        then        77020406
when        158        then        77020407
when        159        then        77020408
when        160        then        77020409
when        161        then        77020410
when        164        then        77020413
when        165        then        77020414
when        172        then        77020601
when        174        then        77020603
when        183        then        77020612
when        191        then        77020620
when        192        then        77020621
when        196        then        77020625
when        198        then        77020627
when        200        then        77020629
when        201        then        77020630
when        202        then        77020631
when        204        then        77020441
when        206        then        77020443
when        216        then        77020453
when        218        then        77020455
when        220        then        77020457
when        224        then        77020641
when        225        then        77020642
when        227        then        77020644
when        228        then        77020645
when        230        then        77020647
when        233        then        77020650
when        234        then        77020651
when        235        then        77020652
when        239        then        77020656
when        240        then        77020657
when        242        then        77020659
when        243        then        77020660
when        245        then        77020662
when        247        then        77020664
when        252        then        77020669
when        257        then        77020387
when        258        then        77020388
when        264        then        77020394
when        269        then        77020399
when        272        then        77020682
when        273        then        77020683
when        278        then        77020688
when        280        then        77020690
when        283        then        77020693
when        284        then        77020694
when        288        then        77020698
when        289        then        77020699
when        290        then        77020700
when        291        then        77020701
when        292        then        77020702
when        296        then        77020706
when        298        then        77020708
when        300        then        77020710
when        301        then        77020711
when        303        then        77020713
when        313        then        77020720
when        316        then        77020723
when        317        then        77020724
when        320        then        77020727
when        326        then        77020733
when        329        then        77020736
when        331        then        77020738
when        333        then        77020740
when        335        then        77020742
when        339        then        77020746
when        340        then        77020747
when        345        then        77020752
when        346        then        77020753
when        352        then        77020759
when        353        then        77020760
when        354        then        77020633
when        361        then        77020639
when        365        then        77020783
when        367        then        77020785
when        371        then        77020789
when        372        then        77020790
when        373        then        77020791
when        378        then        77020796
when        379        then        77020797
when        381        then        77020799
when        386        then        77020804
when        388        then        77020806
when        395        then        77020813
when        401        then        77020819
when        402        then        77020820
when        404        then        77020822
when        406        then        77020715
when        414        then        77020863
when        419        then        77020868
when        421        then        77020870
when        422        then        77020871
when        425        then        77020874
when        426        then        77020875
when        429        then        77020878
when        432        then        77020881
when        433        then        77020882
when        438        then        77020886
when        441        then        77020889
when        451        then        77020899
when        454        then        77020902
when        458        then        77020763
when        463        then        77020768
when        465        then        77020770
when        467        then        77020772
when        471        then        77020776
when        472        then        77020777
when        477        then        77020922
when        479        then        77020924
when        482        then        77020927
when        483        then        77020928
when        484        then        77020929
when        491        then        77020936
when        495        then        77020940
when        496        then        77020941
when        497        then        77020942
when        501        then        77020946
when        504        then        77020949
when        510        then        77020485
when        511        then        77020486
when        513        then        77020488
when        514        then        77020489
when        521        then        77020496
when        524        then        77020499
when        526        then        77020981
when        527        then        77020982
when        530        then        77020985
when        531        then        77020986
when        534        then        77020989
when        538        then        77020993
when        542        then        77020997
when        543        then        77020998
when        544        then        77020999
when        550        then        77021005
when        551        then        77021006
when        558        then        77020825
when        560        then        77020827
when        562        then        77020829
when        568        then        77020835
when        571        then        77020838
when        574        then        77021021
when        577        then        77021024
when        578        then        77021025
when        580        then        77021027
when        582        then        77021029
when        584        then        77021031
when        586        then        77021033
when        587        then        77021034
when        589        then        77021036
when        590        then        77021037
when        591        then        77021038
when        594        then        77021041
when        599        then        77021046
when        601        then        77021048
when        603        then        77021050
when        604        then        77021051
when        611        then        77021058
when        613        then        77021060
when        619        then        77021066
when        623        then        77021070
when        625        then        77021072
when        634        then        77021081
when        635        then        77021082
when        636        then        77021083
when        641        then        77021088
when        642        then        77021089
when        648        then        77021095
when        649        then        77021096
when        652        then        77021099
when        655        then        77021102
when        658        then        77020906
when        660        then        77020908
when        661        then        77020909
when        665        then        77020913
when        672        then        77020919
when        673        then        77021120
when        674        then        77021121
when        681        then        77021128
when        683        then        77021130
when        688        then        77021135
when        689        then        77021136
when        690        then        77021137
when        691        then        77021138
when        693        then        77021140
when        694        then        77021141
when        695        then        77021142
when        696        then        77021143
when        698        then        77021144
when        703        then        77021150
when        704        then        77021151
when        706        then        77021103
when        710        then        77021107
when        711        then        77021108
when        716        then        77021113
when        718        then        77021115
when        719        then        77021116
when        720        then        77021117
when        726        then        77021163
when        727        then        77021164
when        728        then        77021165
when        730        then        77021167
when        731        then        77021168
when        733        then        77021170
when        736        then        77021173
when        738        then        77021175
when        741        then        77021178
when        742        then        77021179
when        745        then        77021182
when        748        then        77021185
when        750        then        77021187
when        751        then        77021188
when        753        then        77021190
when        754        then        77021191
when        756        then        77020951
when        757        then        77020952
when        763        then        77020958
when        765        then        77021220
when        766        then        77021221
when        770        then        77021225
when        771        then        77021226
when        779        then        77021234
when        781        then        77021236
when        782        then        77021237
when        784        then        77021239
when        785        then        77021240
when        788        then        77021243
when        793        then        77021248
when        794        then        77021249
when        796        then        77021251
when        800        then        77021255
when        804        then        77021258
when        805        then        77021259
when        806        then        77021774
when        807        then        77021775
when        809        then        77021777
when        814        then        77021962
when        815        then        77021963
when        817        then        77021965
when        820        then        77021968
when        822        then        77021970
when        823        then        77021971
when        824        then        77021972
when        825        then        77021973
when        826        then        77021974
when        827        then        77021975
when        829        then        77021977
when        830        then        77021978
when        831        then        77021979
when        832        then        77021980
when        834        then        77021982
when        836        then        77021984
when        838        then        77021986
when        839        then        77021987
when        846        then        77021994
when        847        then        77021995
when        852        then        77022000
when        853        then        77022001
when        854        then        77022002
when        855        then        77022003
when        859        then        77021482
when        862        then        77021485
when        864        then        77021487
when        867        then        77021490
when        870        then        77021493
when        872        then        77021494
when        873        then        77021495
when        876        then        77021498
when        877        then        77021499
when        880        then        77021502
when        883        then        77021505
when        887        then        77021509
when        888        then        77021510
when        890        then        77021512
when        891        then        77021513
when        894        then        77021516
when        895        then        77021517
when        897        then        77021519
when        901        then        77021523
when        902        then        77021524
when        903        then        77021525
when        904        then        77021526
when        906        then        77021280
when        908        then        77021282
when        909        then        77021283
when        913        then        77021286
when        914        then        77021287
when        915        then        77021288
when        916        then        77021289
when        917        then        77021290
when        918        then        77021291
when        920        then        77021293
when        923        then        77021296
when        924        then        77021297
when        925        then        77021298
when        926        then        77021299
when        927        then        77021300
when        928        then        77021301
when        929        then        77021302
when        931        then        77021304
when        932        then        77021305
when        934        then        77021307
when        935        then        77021308
when        936        then        77021309
when        937        then        77021310
when        939        then        77021312
when        941        then        77021314
when        944        then        77021317
when        945        then        77021318
when        949        then        77021322
when        950        then        77021323
when        951        then        77021324
when        954        then        77021327
when        955        then        77021328
when        958        then        77021381
when        959        then        77021382
when        960        then        77021383
when        963        then        77021386
when        964        then        77021387
when        970        then        77021393
when        972        then        77021395
when        974        then        77021397
when        977        then        77021400
when        978        then        77021401
when        979        then        77021402
when        980        then        77021403
when        982        then        77021405
when        984        then        77021407
when        986        then        77021409
when        987        then        77021410
when        988        then        77021411
when        989        then        77021412
when        991        then        77021414
when        992        then        77021415
when        993        then        77021416
when        994        then        77021417
when        995        then        77021418
when        996        then        77021419
when        997        then        77021420
when        998        then        77021421
when        1000        then        77021423
when        1001        then        77021424
when        1002        then        77021425
when        1003        then        77021426
when        1004        then        77021427
when        1005        then        77021428
when        1006        then        77021528
when        1007        then        77021529
when        1008        then        77021530
when        1009        then        77021531
when        1010        then        77021532
when        1012        then        77021534
when        1014        then        77021536
when        1015        then        77021537
when        1016        then        77021538
when        1017        then        77021539
when        1018        then        77021540
when        1019        then        77021541
when        1021        then        77021543
when        1022        then        77021544
when        1023        then        77021545
when        1027        then        77021549
when        1029        then        77021551
when        1030        then        77021552
when        1031        then        77021553
when        1035        then        77021557
when        1036        then        77021558
when        1037        then        77021559
when        1038        then        77021560
when        1039        then        77021561
when        1040        then        77021562
when        1041        then        77021563
when        1043        then        77021565
when        1044        then        77021566
when        1045        then        77021567
when        1046        then        77021568
when        1047        then        77021569
when        1048        then        77021570
when        1049        then        77021571
when        1050        then        77021572
when        1052        then        77021574
when        1053        then        77021575
when        1054        then        77021576
when        1056        then        77021329
when        1057        then        77021330
when        1060        then        77021333
when        1061        then        77021334
when        1063        then        77021336
when        1065        then        77021338
when        1066        then        77021339
when        1067        then        77021340
when        1068        then        77021341
when        1069        then        77021342
when        1070        then        77021343
when        1071        then        77021344
when        1073        then        77021346
when        1074        then        77021347
when        1075        then        77021348
when        1076        then        77021349
when        1078        then        77021351
when        1079        then        77021352
when        1081        then        77021354
when        1082        then        77021355
when        1083        then        77021356
when        1084        then        77021357
when        1085        then        77021358
when        1087        then        77021360
when        1088        then        77021361
when        1089        then        77021362
when        1090        then        77021363
when        1091        then        77021364
when        1093        then        77021366
when        1094        then        77021367
when        1095        then        77021368
when        1097        then        77021370
when        1099        then        77021372
when        1100        then        77021373
when        1101        then        77021374
when        1102        then        77021375
when        1103        then        77021376
when        1104        then        77021377
when        1106        then        77021429
when        1107        then        77021430
when        1108        then        77021431
when        1109        then        77021432
when        1111        then        77021434
when        1112        then        77021435
when        1113        then        77021436
when        1114        then        77021437
when        1115        then        77021438
when        1116        then        77021439
when        1117        then        77021440
when        1118        then        77021441
when        1119        then        77021442
when        1120        then        77021443
when        1121        then        77021444
when        1122        then        77021445
when        1123        then        77021446
when        1124        then        77021447
when        1126        then        77021449
when        1127        then        77021450
when        1128        then        77021451
when        1130        then        77021453
when        1131        then        77021454
when        1132        then        77021455
when        1134        then        77021457
when        1135        then        77021458
when        1136        then        77021459
when        1137        then        77021460
when        1138        then        77021461
when        1139        then        77021462
when        1140        then        77021463
when        1141        then        77021464
when        1143        then        77021466
when        1144        then        77021467
when        1145        then        77021468
when        1146        then        77021469
when        1147        then        77021470
when        1148        then        77021471
when        1149        then        77021472
when        1150        then        77021473
when        1151        then        77021474
when        1152        then        77021475
when        1153        then        77021476
when        1154        then        77021477
when        1155        then        77021478
when        1156        then        77021578
when        1157        then        77021579
when        1158        then        77021580
when        1159        then        77021581
when        1160        then        77021582
when        1161        then        77021583
when        1162        then        77021584
when        1163        then        77021585
when        1164        then        77021586
when        1165        then        77021587
when        1166        then        77021588
when        1167        then        77021589
when        1169        then        77021591
when        1170        then        77021592
when        1171        then        77021593
when        1172        then        77021594
when        1173        then        77021595
when        1174        then        77021596
when        1175        then        77021597
when        1176        then        77021598
when        1177        then        77021599
when        1178        then        77021600
when        1179        then        77021601
when        1180        then        77021602
when        1181        then        77021603
when        1182        then        77021604
when        1183        then        77021605
when        1184        then        77021606
when        1185        then        77021607
when        1186        then        77021608
when        1187        then        77021609
when        1188        then        77021610
when        1189        then        77021611
when        1190        then        77021612
when        1191        then        77021613
when        1192        then        77021614
when        1193        then        77021615
when        1194        then        77021616
when        1195        then        77021617
when        1197        then        77021619
when        1199        then        77021620
when        1200        then        77021621
when        1201        then        77021622
when        1202        then        77021623
when        1203        then        77021624
when        1204        then        77021625
when        1205        then        77021626
when        1206        then        77021627
when        1207        then        77021628
when        1208        then        77021629
when        1210        then        77021631
when        1211        then        77021632
when        1212        then        77021633
when        1213        then        77021634
when        1214        then        77021635
when        1215        then        77021636
when        1216        then        77021637
when        1217        then        77021638
when        1218        then        77021639
when        1219        then        77021660
when        1220        then        77021661
when        1221        then        77021662
when        1222        then        77021663
when        1223        then        77021664
when        1224        then        77021665
when        1225        then        77021666
when        1226        then        77021667
when        1228        then        77021669
when        1229        then        77021670
when        1230        then        77021671
when        1231        then        77021672
when        1232        then        77021673
when        1233        then        77021674
when        1234        then        77021675
when        1235        then        77021676
when        1236        then        77021677
when        1237        then        77021678
when        1238        then        77021679
when        1239        then        77021680
when        1240        then        77021681
when        1241        then        77021682
when        1242        then        77021683
when        1243        then        77021684
when        1244        then        77021685
when        1245        then        77021686
when        1246        then        77021687
when        1247        then        77021688
when        1248        then        77021689
when        1249        then        77021690
when        1252        then        77021693
when        1253        then        77021694
when        1254        then        77021695
when        1255        then        77021696
when        1256        then        77021697
when        1257        then        77021698
when        1258        then        77021699
when        1259        then        77021700
when        1260        then        77021701
when        1261        then        77021702
when        1262        then        77021703
when        1263        then        77021704
when        1264        then        77021705
when        1265        then        77021706
when        1266        then        77021707
when        1267        then        77021708
when        1268        then        77021709
when        1269        then        77021710
when        1270        then        77021711
when        1271        then        77021712
when        1272        then        77021713
when        1273        then        77021714
when        1274        then        77021715
when        1275        then        77021716
when        1276        then        77021717
when        1277        then        77021718
when        1278        then        77021719
when        1279        then        77021720
when        1280        then        77021721
when        1281        then        77021722
when        1282        then        77021723
when        1283        then        77021724
when        1284        then        77021725
when        1285        then        77021726
when        1286        then        77021727
when        1287        then        77021728
when        1288        then        77021729
when        1289        then        77021730
when        1290        then        77021731
when        1291        then        77021732
when        1292        then        77021733
when        1293        then        77021734
when        1294        then        77021735
when        1295        then        77021736
when        1296        then        77021737
when        1297        then        77021738
when        1298        then        77021739
when        1299        then        77021740
when        1300        then        77021741
when        1301        then        77021742
when        1302        then        77021743
when        1303        then        77021744
when        1304        then        77021745
when        1305        then        77021746
when        1306        then        77021747
when        1307        then        77021748
when        1308        then        77021749
when        1309        then        77021750
when        1310        then        77021751
when        1311        then        77021752
when        1312        then        77021753
when        1313        then        77021754
when        1314        then        77021755
when        1315        then        77021756
when        1316        then        77021757
when        1317        then        77021758
when        1318        then        77021759
when        1319        then        77021760
when        1320        then        77021761
when        1321        then        77021762
when        1322        then        77021763
when        1323        then        77021764
when        1324        then        77021765
when        1325        then        77021766
when        1326        then        77021767
when        1327        then        77021768
when        1328        then        77021769
when        1329        then        77021770
when        1330        then        77021771
when        1331        then        77021772
when        1332        then        77021773
else null
end as idPessoa,
cd_Lote as lote,
CASE Cd_Bairro
WHEN  1 THEN 'URBANO' 
WHEN  2 THEN 'URBANO'
WHEN  4 THEN 'URBANO'
WHEN  23 THEN 'URBANO'
WHEN  24 THEN 'URBANO'
WHEN  25 THEN 'URBANO'
WHEN  264 THEN 'URBANO'
ELSE 'RURAL'
END AS tipoImovel,
case cd_cobranca
when '5' then 'DESATIVADO'
else 'ATIVO'
END AS situacao,
cd_Setor as setor,
nm_apto as apartamento,
nm_numero as nroImovel,
cd_InscricaoImovel as matricula,
nr_inscricaoIncra as inscricaoIncra
         FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
        ) AS imoveis
from IPTUImoveis i 
left join IPTUTipoConstrucao tc on tc.cd_TipoConstrucao = i.cd_TipoConstrucao
left join IPTUObservacoes o on o.cd_Imovel = i.cd_Imovel
where o.cd_Observ = 1 or o.cd_Observ is null
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData
            .filter(record => {
                const imoveis = JSON.parse(record.imoveis);
                return !imoveis.inscricaoMunicipal && imoveis.idPessoa; // Filtrar registros sem 'inscrição municipal' e com 'idPessoa' válido
            })
            .map(record => {
                const imoveis = JSON.parse(record.imoveis);
                return {
                    idIntegracao: record.idIntegracao.toString(),
                    imoveis: {
                        campo10: imoveis.campo10 ? imoveis.campo10.slice(0, 10) : null,
                        apartamento: imoveis.apartamento,
                        idBairro: imoveis.idBairro,
                        cep: imoveis.cep,
                        complemento: imoveis.complemento,
                        idImovel: imoveis.idImovel,
                        inscricaoAnterior: imoveis.inscricaoAnterior,
                        idLogradouro: imoveis.idLogradouro,
                        matricula: imoveis.matricula,
                        nroImovel: imoveis.nroImovel || "0",
                        idPessoa: imoveis.idPessoa,
                        situacao: imoveis.situacao,
                        tipoImovel: imoveis.tipoImovel,
                        enderecoCorrespondencia: imoveis.enderecoCorrespondencia,
                        setor: imoveis.setor
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

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const response = await fetch('https://tributos.betha.cloud/service-layer-tributos/api/imoveis', {
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
        // Lidar com erros de conexão ou consulta aqui
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        await sql.close();
    }
}

// Chamar a função principal
main();