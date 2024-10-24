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
    const year = d.getUTCFullYear();
    const month = (`0${d.getUTCMonth() + 1}`).slice(-2);
    const day = (`0${d.getUTCDate()}`).slice(-2);
    const hours = (`0${d.getUTCHours()}`).slice(-2);
    const minutes = (`0${d.getUTCMinutes()}`).slice(-2);
    const seconds = (`0${d.getUTCSeconds()}`).slice(-2);
    return `${year}-${month}-${day}`;
    //return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "COMP_ALMO"
        const selectDatabaseQuery = 'USE CONTABIL2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            	select ROW_NUMBER() OVER (ORDER BY cd_projativ) AS idIntegracao,
JSON_QUERY( (SELECT 
 cd_exercicio as exercicio, 
  JSON_QUERY( (SELECT 20800 as id 
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) ) AS localizador, 
 JSON_QUERY( (SELECT case cd_unidorca 
when        '01.00.00'        then        163356
when        '01.01.00'        then        163357
when        '01.02.00'        then        163358
when        '02.00.00'        then        163359
when        '02.01.00'        then        163360
when        '02.02.00'        then        163361
when        '02.03.00'        then        163362
when        '02.04.00'        then        163363
when        '02.05.00'        then        163364
when        '02.06.00'        then        164075
when        '02.07.00'        then        164078
when        '02.08.00'        then        164079
when        '02.09.00'        then        164077
when        '02.10.00'        then        164080
 end as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) ) AS organograma, 
 JSON_QUERY( (SELECT case cd_programa
 when 0 then 105413 
 when 2 then 105414 
 when 1 then 105415 
 when 9 then 105416 
 when 13 then 105417
 when 5 then 105418 
 when 15 then 105419 
 when 18 then 105420 
 when 17 then 105421 
 when 3 then 105422 
 when 8 then 105423 
 when 6 then 105424 
 when 12 then 105425
 when 21 then 105426
 when 4 then 105427 
 when 19 then 105428
 when 20 then 105429
 when 11 then 105430
 when 7 then 105431 
 when 14 then 105432
 when 22 then 105433
 when 23 then 105434
 when 10 then 105435
 when 16 then 105436
 when 9999 then 105437 
 end as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) ) AS programa,
 JSON_QUERY( (SELECT case 
 when cd_funcao like '%01.%' then 35764 
 when cd_funcao like '%02.%' then 35765 
 when cd_funcao like '%03.%' then 35766 
 when cd_funcao like '%04.%' then 35767
 when cd_funcao like '%05.%' then 35768
 when cd_funcao like '%06.%' then 35769
 when cd_funcao like '%07.%' then 35770
 when cd_funcao like '%08.%' then 35771
 when cd_funcao like '%09.%' then 35772
 when cd_funcao like '%10.%' then 35773
 when cd_funcao like '%11.%' then 35774 
 when cd_funcao like '%12.%' then 35775 
 when cd_funcao like '%13.%' then 35776 
 when cd_funcao like '%14.%' then 35777 
 when cd_funcao like '%15.%' then 35778 
 when cd_funcao like '%16.%' then 35779
 when cd_funcao like '%17.%' then 35780
 when cd_funcao like '%18.%' then 35781
 when cd_funcao like '%19.%' then 35782
 when cd_funcao like '%20.%' then 35783
 when cd_funcao like '%21.%' then 35784
 when cd_funcao like '%22.%' then 35785
 when cd_funcao like '%23.%' then 35786
 when cd_funcao like '%24.%' then 35787
 when cd_funcao like '%25.%' then 35788
 when cd_funcao like '%26.%' then 35789
 when cd_funcao like '%27.%' then 35790
 when cd_funcao like '%28.%' then 35791
 when cd_funcao like '%99.%' then 35792
 end as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) ) AS funcao,
 JSON_QUERY( (SELECT case 
 when cd_funcao like '%.031%' then 156809 
 when cd_funcao like '%.032%' then 156810
 when cd_funcao like '%.061%' then 156811
 when cd_funcao like '%.062%' then 156812
 when cd_funcao like '%.091%' then 156813
 when cd_funcao like '%.092%' then 156814
 when cd_funcao like '%.121%' then 156815
 when cd_funcao like '%.122%' then 156816
 when cd_funcao like '%.123%' then 156817
 when cd_funcao like '%.124%' then 156818
 when cd_funcao like '%.125%' then 156819
 when cd_funcao like '%.126%' then 156820
 when cd_funcao like '%.127%' then 156821
 when cd_funcao like '%.128%' then 156822
 when cd_funcao like '%.129%' then 156823
 when cd_funcao like '%.130%' then 156824
 when cd_funcao like '%.131%' then 156825
 when cd_funcao like '%.151%' then 156826
 when cd_funcao like '%.152%' then 156827
 when cd_funcao like '%.153%' then 156828
 when cd_funcao like '%.181%' then 156829
 when cd_funcao like '%.182%' then 156830
 when cd_funcao like '%.183%' then 156831
 when cd_funcao like '%.211%' then 156832
 when cd_funcao like '%.212%' then 156833
 when cd_funcao like '%.241%' then 156834
 when cd_funcao like '%.242%' then 156835
 when cd_funcao like '%.243%' then 156836
 when cd_funcao like '%.244%' then 156837
 when cd_funcao like '%.271%' then 156838
 when cd_funcao like '%.272%' then 156839
 when cd_funcao like '%.273%' then 156840
 when cd_funcao like '%.274%' then 156841
 when cd_funcao like '%.301%' then 156842
 when cd_funcao like '%.302%' then 156843
 when cd_funcao like '%.303%' then 156844
 when cd_funcao like '%.304%' then 156845
 when cd_funcao like '%.305%' then 156846
 when cd_funcao like '%.306%' then 156847
 when cd_funcao like '%.331%' then 156848
 when cd_funcao like '%.332%' then 156849
 when cd_funcao like '%.333%' then 156850
 when cd_funcao like '%.334%' then 156851
 when cd_funcao like '%.361%' then 156852
 when cd_funcao like '%.362%' then 156853
 when cd_funcao like '%.363%' then 156854
 when cd_funcao like '%.364%' then 156855
 when cd_funcao like '%.365%' then 156856
 when cd_funcao like '%.366%' then 156857
 when cd_funcao like '%.367%' then 156858
 when cd_funcao like '%.368%' then 156859
 when cd_funcao like '%.391%' then 156860
 when cd_funcao like '%.392%' then 156861
 when cd_funcao like '%.421%' then 156862
 when cd_funcao like '%.422%' then 156863
 when cd_funcao like '%.423%' then 156864 
 when cd_funcao like '%.451%' then 156865
 when cd_funcao like '%.452%' then 156866
 when cd_funcao like '%.453%' then 156867
 when cd_funcao like '%.481%' then 156868
 when cd_funcao like '%.482%' then 156869
 when cd_funcao like '%.511%' then 156870
 when cd_funcao like '%.512%' then 156871
 when cd_funcao like '%.541%' then 156872
 when cd_funcao like '%.542%' then 156873
 when cd_funcao like '%.543%' then 156874
 when cd_funcao like '%.544%' then 156875
 when cd_funcao like '%.545%' then 156876
 when cd_funcao like '%.571%' then 156877
 when cd_funcao like '%.572%' then 156878
 when cd_funcao like '%.573%' then 156879
 when cd_funcao like '%.601%' then 156880
 when cd_funcao like '%.602%' then 156881
 when cd_funcao like '%.603%' then 156882
 when cd_funcao like '%.604%' then 156883
 when cd_funcao like '%.605%' then 156884
 when cd_funcao like '%.606%' then 156885
 when cd_funcao like '%.607%' then 156886
 when cd_funcao like '%.608%' then 156887
 when cd_funcao like '%.609%' then 156888
 when cd_funcao like '%.631%' then 156889
 when cd_funcao like '%.632%' then 156890
 when cd_funcao like '%.661%' then 156891
 when cd_funcao like '%.662%' then 156892
 when cd_funcao like '%.663%' then 156893
 when cd_funcao like '%.664%' then 156894
 when cd_funcao like '%.665%' then 156895
 when cd_funcao like '%.691%' then 156896
 when cd_funcao like '%.692%' then 156897
 when cd_funcao like '%.693%' then 156898
 when cd_funcao like '%.694%' then 156899
 when cd_funcao like '%.695%' then 156900
 when cd_funcao like '%.721%' then 156901
 when cd_funcao like '%.722%' then 156902
 when cd_funcao like '%.751%' then 156903
 when cd_funcao like '%.752%' then 156904
 when cd_funcao like '%.753%' then 156905
 when cd_funcao like '%.754%' then 156906
 when cd_funcao like '%.781%' then 156907
 when cd_funcao like '%.782%' then 156908
 when cd_funcao like '%.783%' then 156909
 when cd_funcao like '%.784%' then 156910
 when cd_funcao like '%.785%' then 156911
 when cd_funcao like '%.811%' then 156912
 when cd_funcao like '%.812%' then 156913
 when cd_funcao like '%.813%' then 156914
 when cd_funcao like '%.841%' then 156915
 when cd_funcao like '%.842%' then 156916
 when cd_funcao like '%.843%' then 156917
 when cd_funcao like '%.844%' then 156918
 when cd_funcao like '%.845%' then 156919
 when cd_funcao like '%.846%' then 156920
 when cd_funcao like '%.847%' then 156921
 when cd_funcao like '%.997%' then 156922
 when cd_funcao like '%.999%' then 156923
 else 156920 end as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) ) AS subfuncao,
 JSON_QUERY( (SELECT case cd_projativ
 when 1002 then 454456
 when 1001 then 454457
 when 1005 then 454458
 when 1004 then 454459
 when 1006 then 454460
 when 1003 then 454461
 when 1007 then 454462
 when 1011 then 454463
 when 1010 then 454464
 when 1012 then 454465
 when 1008 then 454466
 when 1031 then 454467
 when 1009 then 454468
 when 1014 then 454469 
 when 1013 then 454470 
 when 1019 then 454471 
 when 1027 then 454472 
 when 1024 then 454473 
 when 1025 then 454474 
 when 1016 then 454475 
 when 1020 then 454476 
 when 1030 then 454477 
 when 1038 then 454478 
 when 1018 then 454479 
 when 1015 then 454480 
 when 1040 then 454481 
 when 1029 then 454482 
 when 1017 then 454483 
 when 1035 then 454484 
 when 1034 then 454485 
 when 1037 then 454486 
 when 1049 then 454487 
 when 1021 then 454488 
 when 1032 then 454489 
 when 1028 then 454490 
 when 1033 then 454491
 when 1023 then 454492
 when 1039 then 454493 
 when 1022 then 454494 
 when 1043 then 454495 
 when 1026 then 454496 
 when 1044 then 454497 
 when 1042 then 454498 
 when 1036 then 454499 
 when 1047 then 454500 
 when 1045 then 454501 
 when 1048 then 454502 
 when 1041 then 454503 
 when 1050 then 454504 
 when 1046 then 454505 
 when 1051 then 454506 
 when 1052 then 454507 
 when 1053 then 454508 
 when 1054 then 454509 
 when 1055 then 454510 
 when 1056 then 454511 
 when 1057 then 454512 
 when 1058 then 454513 
 when 1060 then 454514 
 when 1059 then 454515 
 when 1064 then 454516 
 when 1061 then 454517 
 when 1067 then 454518 
 when 1063 then 454519 
 when 1062 then 454520 
 when 1066 then 454521 
 when 1068 then 454522 
 when 1073 then 454523 
 when 1065 then 454524 
 when 1075 then 454525 
 when 1076 then 454526 
 when 1069 then 454527 
 when 1070 then 454528 
 when 1072 then 454529 
 when 1078 then 454530 
 when 2003 then 454531 
 when 1080 then 454532 
 when 1082 then 454533 
 when 1085 then 454534 
 when 1071 then 454535 
 when 1077 then 454536 
 when 1074 then 454537 
 when 1079 then 454538 
 when 1087 then 454539 
 when 1083 then 454540 
 when 1084 then 454541 
 when 1091 then 454542 
 when 1096 then 454543 
 when 1086 then 454544 
 when 2001 then 454545 
 when 2002 then 454546 
 when 1088 then 454547 
 when 1081 then 454548 
 when 1089 then 454549 
 when 1094 then 454550 
 when 2004 then 454551 
 when 1095 then 454552 
 when 1090 then 454553 
 when 1092 then 454554 
 when 1093 then 454555 
 when 2005 then 454556 
 when 2007 then 454557 
 when 2008 then 454558 
 when 2006 then 454559 
 when 2009 then 454560 
 when 2011 then 454561 
 when 2010 then 454562 
 when 2013 then 454563 
 when 2012 then 454564
 when 2018 then 454565
 when 2020 then 454566
 when 2022 then 454567
 when 2015 then 454568
 when 2014 then 454569
 when 2017 then 454570
 when 2019 then 454571
 when 2025 then 454572
 when 2021 then 454573
 when 2027 then 454574
 when 2032 then 454575
 when 2016 then 454576
 when 2023 then 454577
 when 2037 then 454578
 when 2024 then 454579
 when 2033 then 454580
 when 2028 then 454581
 when 2041 then 454582
 when 2065 then 454583
 when 2039 then 454584
 when 2031 then 454585 
 when 2055 then 454586 
 when 2036 then 454587 
 when 2048 then 454588
 when 2044 then 454589
 when 2050 then 454590
 when 2026 then 454591
 when 2029 then 454592
 when 2053 then 454593
 when 2034 then 454594
 when 2057 then 454595
 when 2040 then 454596
 when 2042 then 454597
 when 2046 then 454598
 when 2035 then 454599
 when 2045 then 454600
 when 2030 then 454601
 when 2063 then 454602
 when 2038 then 454603
 when 2062 then 454604
 when 2058 then 454605
 when 2052 then 454606
 when 2047 then 454607
 when 2054 then 454608
 when 2056 then 454609
 when 2089 then 454610
 when 2066 then 454611
 when 2067 then 454612
 when 2083 then 454613
 when 2069 then 454614
 when 2071 then 454615
 when 2049 then 454616 
 when 2060 then 454617 
 when 2064 then 454618 
 when 2061 then 454619 
 when 2068 then 454620 
 when 2072 then 454621 
 when 2073 then 454622 
 when 2084 then 454623 
 when 2074 then 454624 
 when 2070 then 454625 
 when 2075 then 454626 
 when 2076 then 454627 
 when 2086 then 454628 
 when 2077 then 454629 
 when 2078 then 454630 
 when 2080 then 454631 
 when 9999 then 454632 
 when 2043 then 454633 
 when 2087 then 454634 
 when 2051 then 454635 
 when 2079 then 454636 
 when 2059 then 454637 
 when 2091 then 454638 
 when 2094 then 454639 
 when 2081 then 454640 
 when 2082 then 454641 
 when 2085 then 454642 
 when 2092 then 454643 
 when 2088 then 454644 
 when 2090 then 454645 
 when 2093 then 454646 
 end as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) ) AS acao,
    JSON_QUERY(
    (SELECT
 case cd_CategoriaEconomicaDespesa
 when        30000000        then        14113431
when        31220000        then        14113432
when        31310000        then        14113433
when        31400000        then        14113434
when        31460000        then        14113435
when        31700000        then        14113436
when        31717000        then        14113437
when        31750000        then        14113438
when        31809900        then        14113439
when        31900106        then        14113440
when        31900126        then        14113441
when        31900199        then        14113442
when        31900303        then        14113443
when        31900351        then        14113444
when        31900400        then        14113445
when        31900414        then        14113446
when        31900700        then        14113447
when        31900799        then        14113448
when        31901104        then        14113449
when        31901109        then        14113450
when        31901131        then        14113451
when        31901143        then        14113452
when        31901149        then        14113453
when        31901173        then        14113454
when        31000000        then        14113480
when        31300000        then        14113481
when        31320000        then        14113482
when        31410000        then        14113483
when        31500000        then        14113484
when        31704100        then        14113485
when        31720000        then        14113486
when        31760000        then        14113487
when        31900000        then        14113488
when        31900118        then        14113489
when        31900151        then        14113490
when        31900300        then        14113491
when        31900304        then        14113492
when        31900352        then        14113493
when        31900401        then        14113494
when        31900415        then        14113495
when        31900701        then        14113496
when        31900800        then        14113497
when        31901105        then        14113498
when        31901110        then        14113499
when        31901133        then        14113500
when        31901144        then        14113501
when        31901150        then        14113502
when        31901174        then        14113503
when        31901200        then        14113504
when        31200000        then        14113530
when        31309900        then        14113531
when        31360000        then        14113532
when        31450000        then        14113533
when        31670000        then        14113534
when        31710000        then        14113535
when        31740000        then        14113536
when        31800400        then        14113537
when        31900101        then        14113538
when        31900123        then        14113539
when        31900189        then        14113540
when        31900302        then        14113541
when        31900308        then        14113542
when        31900399        then        14113543
when        31900413        then        14113544
when        31900499        then        14113545
when        31900704        then        14113546
when        31901101        then        14113547
when        31901108        then        14113548
when        31901113        then        14113549
when        31901142        then        14113550
when        31901147        then        14113551
when        31901152        then        14113552
when        31901177        then        14113553
when        31901242        then        14113554
when        31304100        then        14113555
when        31350000        then        14113556
when        31420000        then        14113557
when        31600000        then        14113558
when        31709900        then        14113559
when        31730000        then        14113560
when        31800000        then        14113561
when        31900100        then        14113562
when        31900121        then        14113563
when        31900152        then        14113564
when        31900301        then        14113565
when        31900305        then        14113566
when        31900389        then        14113567
when        31900410        then        14113568
when        31900451        then        14113569
when        31900702        then        14113570
when        31901100        then        14113571
when        31901107        then        14113572
when        31901111        then        14113573
when        31901137        then        14113574
when        31901145        then        14113575
when        31901151        then        14113576
when        31901175        then        14113577
when        31901201        then        14113578
when        31901252        then        14113579
when        31901199        then        14113580
when        31901243        then        14113581
when        31901300        then        14113582
when        31901307        then        14113583
when        31901311        then        14113584
when        31901600        then        14113585
when        31901636        then        14113586
when        31901699        then        14113587
when        31906700        then        14113588
when        31909102        then        14113589
when        31909111        then        14113590
when        31909115        then        14113591
when        31909119        then        14113592
when        31909125        then        14113593
when        31909129        then        14113594
when        31909137        then        14113595
when        31909201        then        14113596
when        31909211        then        14113597
when        31909217        then        14113598
when        31909298        then        14113599
when        31909402        then        14113600
when        31909413        then        14113601
when        31909499        then        14113602
when        31909699        then        14113603
when        31910800        then        14113604
when        31901245        then        14113605
when        31901301        then        14113606
when        31901308        then        14113607
when        31901318        then        14113608
when        31901608        then        14113609
when        31901644        then        14113610
when        31901700        then        14113611
when        31908600        then        14113612
when        31909108        then        14113613
when        31909112        then        14113614
when        31909116        then        14113615
when        31909120        then        14113616
when        31909126        then        14113617
when        31909130        then        14113618
when        31909197        then        14113619
when        31909203        then        14113620
when        31909212        then        14113621
when        31909291        then        14113622
when        31909299        then        14113623
when        31909403        then        14113624
when        31909414        then        14113625
when        31909600        then        14113626
when        31909900        then        14113627
when        31911300        then        14113628
when        31911309        then        14113629
when        31901299        then        14113630
when        31901304        then        14113631
when        31901310        then        14113632
when        31901399        then        14113633
when        31901634        then        14113634
when        31901676        then        14113635
when        31901799        then        14113636
when        31909101        then        14113637
when        31909110        then        14113638
when        31909114        then        14113639
when        31909118        then        14113640
when        31909124        then        14113641
when        31909128        then        14113642
when        31909136        then        14113643
when        31909200        then        14113644
when        31909207        then        14113645
when        31909216        then        14113646
when        31909296        then        14113647
when        31909401        then        14113648
when        31909406        then        14113649
when        31909498        then        14113650
when        31909602        then        14113651
when        31910400        then        14113652
when        31911304        then        14113653
when        31911311        then        14113654
when        31901302        then        14113655
when        31901309        then        14113656
when        31901340        then        14113657
when        31901632        then        14113658
when        31901645        then        14113659
when        31901702        then        14113660
when        31909100        then        14113661
when        31909109        then        14113662
when        31909113        then        14113663
when        31909117        then        14113664
when        31909123        then        14113665
when        31909127        then        14113666
when        31909131        then        14113667
when        31909199        then        14113668
when        31909204        then        14113669
when        31909213        then        14113670
when        31909294        then        14113671
when        31909400        then        14113672
when        31909404        then        14113673
when        31909415        then        14113674
when        31909601        then        14113675
when        31910000        then        14113676
when        31911302        then        14113677
when        31911310        then        14113678
when        31911321        then        14113679
when        31911308        then        14113680
when        31911312        then        14113681
when        31911323        then        14113682
when        31919151        then        14113683
when        31919199        then        14113684
when        31919206        then        14113685
when        31919210        then        14113686
when        31919251        then        14113687
when        31919299        then        14113688
when        31919499        then        14113689
when        31919900        then        14113690
when        31950000        then        14113691
when        31951300        then        14113692
when        31959200        then        14113693
when        31959600        then        14113694
when        31960700        then        14113695
when        31966700        then        14113696
when        31969498        then        14113697
when        31990000        then        14113698
when        32300000        then        14113699
when        32360000        then        14113700
when        32450000        then        14113701
when        32670000        then        14113702
when        32730000        then        14113703
when        32800000        then        14113704
when        31911320        then        14113705
when        31911399        then        14113706
when        31919152        then        14113707
when        31919200        then        14113708
when        31919207        then        14113709
when        31919211        then        14113710
when        31919291        then        14113711
when        31919400        then        14113712
when        31919600        then        14113713
when        31920000        then        14113714
when        31950400        then        14113715
when        31951600        then        14113716
when        31959400        then        14113717
when        31959900        then        14113718
when        31961100        then        14113719
when        31969100        then        14113720
when        31969499        then        14113721
when        32000000        then        14113722
when        32310000        then        14113723
when        32400000        then        14113724
when        32460000        then        14113725
when        32700000        then        14113726
when        32740000        then        14113727
when        32900000        then        14113728
when        32902199        then        14113729
when        31911322        then        14113730
when        31919100        then        14113731
when        31919154        then        14113732
when        31919205        then        14113733
when        31919209        then        14113734
when        31919213        then        14113735
when        31919298        then        14113736
when        31919498        then        14113737
when        31919699        then        14113738
when        31940000        then        14113739
when        31951100        then        14113740
when        31959100        then        14113741
when        31959499        then        14113742
when        31960400        then        14113743
when        31961600        then        14113744
when        31969400        then        14113745
when        31969900        then        14113746
when        32220000        then        14113747
when        32350000        then        14113748
when        32420000        then        14113749
when        32600000        then        14113750
when        32720000        then        14113751
when        32760000        then        14113752
when        32902101        then        14113753
when        32902201        then        14113754
when        31918600        then        14113755
when        31919153        then        14113756
when        31919204        then        14113757
when        31919208        then        14113758
when        31919212        then        14113759
when        31919296        then        14113760
when        31919451        then        14113761
when        31919601        then        14113762
when        31930000        then        14113763
when        31950700        then        14113764
when        31956700        then        14113765
when        31959498        then        14113766
when        31960000        then        14113767
when        31961300        then        14113768
when        31969200        then        14113769
when        31969600        then        14113770
when        32200000        then        14113771
when        32320000        then        14113772
when        32410000        then        14113773
when        32500000        then        14113774
when        32710000        then        14113775
when        32750000        then        14113776
when        32902100        then        14113777
when        32902200        then        14113778
when        32902300        then        14113779
when        32902102        then        14113780
when        32902202        then        14113781
when        32902302        then        14113782
when        32902400        then        14113783
when        32902500        then        14113784
when        32909100        then        14113785
when        32910000        then        14113786
when        32930000        then        14113787
when        32952200        then        14113788
when        32962100        then        14113789
when        32990000        then        14113790
when        33209900        then        14113791
when        33223500        then        14113792
when        33300000        then        14113793
when        33308102        then        14113794
when        33309900        then        14113795
when        33319900        then        14113796
when        33322000        then        14113797
when        33323500        then        14113798
when        33329200        then        14113799
when        33354100        then        14113800
when        33364100        then        14113801
when        33404100        then        14113802
when        33408103        then        14113803
when        33409200        then        14113804
when        32902299        then        14113805
when        32902303        then        14113806
when        32902401        then        14113807
when        32902501        then        14113808
when        32909200        then        14113809
when        32912100        then        14113810
when        32940000        then        14113811
when        32959200        then        14113812
when        32962200        then        14113813
when        33000000        then        14113814
when        33220000        then        14113815
when        33223600        then        14113816
when        33304100        then        14113817
when        33308199        then        14113818
when        33310000        then        14113819
when        33320000        then        14113820
when        33323000        then        14113821
when        33323600        then        14113822
when        33329300        then        14113823
when        33359200        then        14113824
when        33369200        then        14113825
when        33408100        then        14113826
when        33408104        then        14113827
when        33409300        then        14113828
when        33419200        then        14113829
when        32902301        then        14113830
when        32902399        then        14113831
when        32902499        then        14113832
when        32902600        then        14113833
when        32909900        then        14113834
when        32920000        then        14113835
when        32952100        then        14113836
when        32960000        then        14113837
when        32969900        then        14113838
when        33204100        then        14113839
when        33223000        then        14113840
when        33229900        then        14113841
when        33308101        then        14113842
when        33309300        then        14113843
when        33319200        then        14113844
when        33321800        then        14113845
when        33323300        then        14113846
when        33324700        then        14113847
when        33350000        then        14113848
when        33360000        then        14113849
when        33400000        then        14113850
when        33408102        then        14113851
when        33409100        then        14113852
when        33410000        then        14113853
when        33420000        then        14113854
when        32902304        then        14113855
when        32902402        then        14113856
when        32902599        then        14113857
when        32909300        then        14113858
when        32912200        then        14113859
when        32950000        then        14113860
when        32959900        then        14113861
when        32969200        then        14113862
when        33200000        then        14113863
when        33221400        then        14113864
when        33223900        then        14113865
when        33308100        then        14113866
when        33309200        then        14113867
when        33314100        then        14113868
when        33321400        then        14113869
when        33323200        then        14113870
when        33323900        then        14113871
when        33329900        then        14113872
when        33359900        then        14113873
when        33369900        then        14113874
when        33408101        then        14113875
when        33408199        then        14113876
when        33409900        then        14113877
when        33419900        then        14113878
when        33423000        then        14113879
when        33414100        then        14113880
when        33421400        then        14113881
when        33423300        then        14113882
when        33424700        then        14113883
when        33450000        then        14113884
when        33459900        then        14113885
when        33469200        then        14113886
when        33501800        then        14113887
when        33503300        then        14113888
when        33503951        then        14113889
when        33503955        then        14113890
when        33504300        then        14113891
when        33504308        then        14113892
when        33508500        then        14113893
when        33604500        then        14113894
when        33674500        then        14113895
when        33704100        then        14113896
when        33720000        then        14113897
when        33740000        then        14113898
when        33760000        then        14113899
when        33800400        then        14113900
when        33803400        then        14113901
when        33803900        then        14113902
when        33900000        then        14113903
when        33900602        then        14113904
when        33421800        then        14113905
when        33423500        then        14113906
when        33429200        then        14113907
when        33454100        then        14113908
when        33460000        then        14113909
when        33469900        then        14113910
when        33502000        then        14113911
when        33503500        then        14113912
when        33503952        then        14113913
when        33503956        then        14113914
when        33504305        then        14113915
when        33504399        then        14113916
when        33509200        then        14113917
when        33609200        then        14113918
when        33678200        then        14113919
when        33709900        then        14113920
when        33723900        then        14113921
when        33750000        then        14113922
when        33764100        then        14113923
when        33801400        then        14113924
when        33803500        then        14113925
when        33804100        then        14113926
when        33900400        then        14113927
when        33900603        then        14113928
when        33900800        then        14113929
when        33423200        then        14113930
when        33423900        then        14113931
when        33429900        then        14113932
when        33459200        then        14113933
when        33469100        then        14113934
when        33501400        then        14113935
when        33503100        then        14113936
when        33503900        then        14113937
when        33503954        then        14113938
when        33504100        then        14113939
when        33504307        then        14113940
when        33508100        then        14113941
when        33600000        then        14113942
when        33670000        then        14113943
when        33700000        then        14113944
when        33717000        then        14113945
when        33730000        then        14113946
when        33759900        then        14113947
when        33800000        then        14113948
when        33803300        then        14113949
when        33803700        then        14113950
when        33809900        then        14113951
when        33900601        then        14113952
when        33900605        then        14113953
when        33900805        then        14113954
when        33423600        then        14113955
when        33429300        then        14113956
when        33459100        then        14113957
when        33464100        then        14113958
when        33500000        then        14113959
when        33503000        then        14113960
when        33503600        then        14113961
when        33503953        then        14113962
when        33503999        then        14113963
when        33504306        then        14113964
when        33504700        then        14113965
when        33509900        then        14113966
when        33609900        then        14113967
when        33678300        then        14113968
when        33710000        then        14113969
when        33729900        then        14113970
when        33754100        then        14113971
when        33769900        then        14113972
when        33803000        then        14113973
when        33803600        then        14113974
when        33809200        then        14113975
when        33900600        then        14113976
when        33900604        then        14113977
when        33900801        then        14113978
when        33900813        then        14113979
when        33900699        then        14113980
when        33900809        then        14113981
when        33900815        then        14113982
when        33900853        then        14113983
when        33901001        then        14113984
when        33901500        then        14113985
when        33902700        then        14113986
when        33903001        then        14113987
when        33903011        then        14113988
when        33903020        then        14113989
when        33903035        then        14113990
when        33903098        then        14113991
when        33903202        then        14113992
when        33903300        then        14113993
when        33903607        then        14113994
when        33903632        then        14113995
when        33903646        then        14113996
when        33903800        then        14113997
when        33903932        then        14113998
when        33903950        then        14113999
when        33903965        then        14114000
when        33903978        then        14114001
when        33904001        then        14114002
when        33904099        then        14114003
when        33904700        then        14114004
when        33900811        then        14114005
when        33900846        then        14114006
when        33900856        then        14114007
when        33901008        then        14114008
when        33901800        then        14114009
when        33902800        then        14114010
when        33903007        then        14114011
when        33903014        then        14114012
when        33903021        then        14114013
when        33903036        then        14114014
when        33903099        then        14114015
when        33903203        then        14114016
when        33903400        then        14114017
when        33903608        then        14114018
when        33903634        then        14114019
when        33903648        then        14114020
when        33903900        then        14114021
when        33903943        then        14114022
when        33903953        then        14114023
when        33903970        then        14114024
when        33903990        then        14114025
when        33904006        then        14114026
when        33904100        then        14114027
when        33904800        then        14114028
when        33904900        then        14114029
when        33900814        then        14114030
when        33900848        then        14114031
when        33901000        then        14114032
when        33901400        then        14114033
when        33902000        then        14114034
when        33903000        then        14114035
when        33903010        then        14114036
when        33903017        then        14114037
when        33903028        then        14114038
when        33903060        then        14114039
when        33903200        then        14114040
when        33903299        then        14114041
when        33903600        then        14114042
when        33903630        then        14114043
when        33903645        then        14114044
when        33903700        then        14114045
when        33903925        then        14114046
when        33903947        then        14114047
when        33903964        then        14114048
when        33903977        then        14114049
when        33904000        then        14114050
when        33904014        then        14114051
when        33904600        then        14114052
when        33904807        then        14114053
when        33905400        then        14114054
when        33900847        then        14114055
when        33900899        then        14114056
when        33901099        then        14114057
when        33901900        then        14114058
when        33902900        then        14114059
when        33903009        then        14114060
when        33903016        then        14114061
when        33903023        then        14114062
when        33903039        then        14114063
when        33903100        then        14114064
when        33903204        then        14114065
when        33903500        then        14114066
when        33903623        then        14114067
when        33903635        then        14114068
when        33903699        then        14114069
when        33903917        then        14114070
when        33903944        then        14114071
when        33903954        then        14114072
when        33903972        then        14114073
when        33903999        then        14114074
when        33904012        then        14114075
when        33904500        then        14114076
when        33904806        then        14114077
when        33905300        then        14114078
when        33905700        then        14114079
when        33904899        then        14114080
when        33905500        then        14114081
when        33905900        then        14114082
when        33908600        then        14114083
when        33909103        then        14114084
when        33909125        then        14114085
when        33909200        then        14114086
when        33909210        then        14114087
when        33909220        then        14114088
when        33909233        then        14114089
when        33909237        then        14114090
when        33909245        then        14114091
when        33909249        then        14114092
when        33909256        then        14114093
when        33909267        then        14114094
when        33909295        then        14114095
when        33909301        then        14114096
when        33909307        then        14114097
when        33909500        then        14114098
when        33910000        then        14114099
when        33910800        then        14114100
when        33913100        then        14114101
when        33913900        then        14114102
when        33914700        then        14114103
when        33919104        then        14114104
when        33905600        then        14114105
when        33906200        then        14114106
when        33909100        then        14114107
when        33909104        then        14114108
when        33909134        then        14114109
when        33909204        then        14114110
when        33909214        then        14114111
when        33909230        then        14114112
when        33909234        then        14114113
when        33909238        then        14114114
when        33909246        then        14114115
when        33909250        then        14114116
when        33909257        then        14114117
when        33909291        then        14114118
when        33909296        then        14114119
when        33909302        then        14114120
when        33909308        then        14114121
when        33909600        then        14114122
when        33910400        then        14114123
when        33912800        then        14114124
when        33913200        then        14114125
when        33913925        then        14114126
when        33916200        then        14114127
when        33919105        then        14114128
when        33919233        then        14114129
when        33905800        then        14114130
when        33908100        then        14114131
when        33909102        then        14114132
when        33909120        then        14114133
when        33909199        then        14114134
when        33909208        then        14114135
when        33909218        then        14114136
when        33909232        then        14114137
when        33909236        then        14114138
when        33909240        then        14114139
when        33909248        then        14114140
when        33909254        then        14114141
when        33909259        then        14114142
when        33909293        then        14114143
when        33909300        then        14114144
when        33909305        then        14114145
when        33909399        then        14114146
when        33909900        then        14114147
when        33910499        then        14114148
when        33913000        then        14114149
when        33913500        then        14114150
when        33914000        then        14114151
when        33919100        then        14114152
when        33919200        then        14114153
when        33919247        then        14114154
when        33906700        then        14114155
when        33909101        then        14114156
when        33909105        then        14114157
when        33909197        then        14114158
when        33909206        then        14114159
when        33909215        then        14114160
when        33909231        then        14114161
when        33909235        then        14114162
when        33909239        then        14114163
when        33909247        then        14114164
when        33909253        then        14114165
when        33909258        then        14114166
when        33909292        then        14114167
when        33909299        then        14114168
when        33909303        then        14114169
when        33909314        then        14114170
when        33909800        then        14114171
when        33910415        then        14114172
when        33912900        then        14114173
when        33913400        then        14114174
when        33913999        then        14114175
when        33918600        then        14114176
when        33919199        then        14114177
when        33919239        then        14114178
when        33919293        then        14114179
when        33919230        then        14114180
when        33919291        then        14114181
when        33919300        then        14114182
when        33919900        then        14114183
when        33922000        then        14114184
when        33923500        then        14114185
when        33929200        then        14114186
when        33933009        then        14114187
when        33933036        then        14114188
when        33933299        then        14114189
when        33939200        then        14114190
when        33939900        then        14114191
when        33943010        then        14114192
when        33943099        then        14114193
when        33943900        then        14114194
when        33949230        then        14114195
when        33950000        then        14114196
when        33951800        then        14114197
when        33953010        then        14114198
when        33953099        then        14114199
when        33953299        then        14114200
when        33953600        then        14114201
when        33953950        then        14114202
when        33954600        then        14114203
when        33956700        then        14114204
when        33919292        then        14114205
when        33919600        then        14114206
when        33920000        then        14114207
when        33923000        then        14114208
when        33923600        then        14114209
when        33929900        then        14114210
when        33933010        then        14114211
when        33933099        then        14114212
when        33933900        then        14114213
when        33939230        then        14114214
when        33940000        then        14114215
when        33943011        then        14114216
when        33943200        then        14114217
when        33943950        then        14114218
when        33949239        then        14114219
when        33950400        then        14114220
when        33952000        then        14114221
when        33953011        then        14114222
when        33953100        then        14114223
when        33953300        then        14114224
when        33953700        then        14114225
when        33953999        then        14114226
when        33954700        then        14114227
when        33959100        then        14114228
when        33959299        then        14114229
when        33919299        then        14114230
when        33919800        then        14114231
when        33921800        then        14114232
when        33923300        then        14114233
when        33924000        then        14114234
when        33933000        then        14114235
when        33933035        then        14114236
when        33933202        then        14114237
when        33933999        then        14114238
when        33939299        then        14114239
when        33943009        then        14114240
when        33943036        then        14114241
when        33943299        then        14114242
when        33949200        then        14114243
when        33949900        then        14114244
when        33951400        then        14114245
when        33953009        then        14114246
when        33953036        then        14114247
when        33953202        then        14114248
when        33953500        then        14114249
when        33953900        then        14114250
when        33954500        then        14114251
when        33954900        then        14114252
when        33959230        then        14114253
when        33959600        then        14114254
when        33919700        then        14114255
when        33921400        then        14114256
when        33923200        then        14114257
when        33923900        then        14114258
when        33930000        then        14114259
when        33933011        then        14114260
when        33933200        then        14114261
when        33933950        then        14114262
when        33939239        then        14114263
when        33943000        then        14114264
when        33943035        then        14114265
when        33943202        then        14114266
when        33943999        then        14114267
when        33949299        then        14114268
when        33950800        then        14114269
when        33953000        then        14114270
when        33953035        then        14114271
when        33953200        then        14114272
when        33953400        then        14114273
when        33953800        then        14114274
when        33954100        then        14114275
when        33954800        then        14114276
when        33959200        then        14114277
when        33959300        then        14114278
when        33960400        then        14114279
when        33959239        then        14114280
when        33959900        then        14114281
when        33961400        then        14114282
when        33963009        then        14114283
when        33963036        then        14114284
when        33963202        then        14114285
when        33963500        then        14114286
when        33963900        then        14114287
when        33964500        then        14114288
when        33964900        then        14114289
when        33969230        then        14114290
when        33969600        then        14114291
when        44000000        then        14114292
when        44209900        then        14114293
when        44229200        then        14114294
when        44304100        then        14114295
when        44314100        then        14114296
when        44320000        then        14114297
when        44329200        then        14114298
when        44354100        then        14114299
when        44360000        then        14114300
when        44369900        then        14114301
when        44409200        then        14114302
when        44414200        then        14114303
when        44421400        then        14114304
when        33960000        then        14114305
when        33961800        then        14114306
when        33963010        then        14114307
when        33963099        then        14114308
when        33963299        then        14114309
when        33963600        then        14114310
when        33963950        then        14114311
when        33964600        then        14114312
when        33966700        then        14114313
when        33969239        then        14114314
when        33969900        then        14114315
when        44200000        then        14114316
when        44220000        then        14114317
when        44229300        then        14114318
when        44304200        then        14114319
when        44314200        then        14114320
when        44322000        then        14114321
when        44329300        then        14114322
when        44354200        then        14114323
when        44364100        then        14114324
when        44400000        then        14114325
when        44409900        then        14114326
when        44419200        then        14114327
when        44425100        then        14114328
when        44450000        then        14114329
when        33960800        then        14114330
when        33963000        then        14114331
when        33963035        then        14114332
when        33963200        then        14114333
when        33963400        then        14114334
when        33963800        then        14114335
when        33964100        then        14114336
when        33964800        then        14114337
when        33969200        then        14114338
when        33969300        then        14114339
when        40000000        then        14114340
when        44204200        then        14114341
when        44225200        then        14114342
when        44300000        then        14114343
when        44310000        then        14114344
when        44319900        then        14114345
when        44325200        then        14114346
when        44350000        then        14114347
when        44359900        then        14114348
when        44369200        then        14114349
when        44404200        then        14114350
when        44414100        then        14114351
when        44420000        then        14114352
when        44429200        then        14114353
when        44454200        then        14114354
when        33962000        then        14114355
when        33963011        then        14114356
when        33963100        then        14114357
when        33963300        then        14114358
when        33963700        then        14114359
when        33963999        then        14114360
when        33964700        then        14114361
when        33969100        then        14114362
when        33969299        then        14114363
when        33990000        then        14114364
when        44204100        then        14114365
when        44225100        then        14114366
when        44229900        then        14114367
when        44309900        then        14114368
when        44319200        then        14114369
when        44325100        then        14114370
when        44329900        then        14114371
when        44359200        then        14114372
when        44364200        then        14114373
when        44404100        then        14114374
when        44410000        then        14114375
when        44419900        then        14114376
when        44425200        then        14114377
when        44454100        then        14114378
when        44460000        then        14114379
when        44429900        then        14114380
when        44459200        then        14114381
when        44464200        then        14114382
when        44501400        then        14114383
when        44504100        then        14114384
when        44505200        then        14114385
when        44678200        then        14114386
when        44704200        then        14114387
when        44725100        then        14114388
when        44750000        then        14114389
when        44760000        then        14114390
when        44800000        then        14114391
when        44805200        then        14114392
when        44901400        then        14114393
when        44902000        then        14114394
when        44903035        then        14114395
when        44903500        then        14114396
when        44904000        then        14114397
when        44905191        then        14114398
when        44905242        then        14114399
when        44906100        then        14114400
when        44909215        then        14114401
when        44909237        then        14114402
when        44909293        then        14114403
when        44909900        then        14114404
when        44459900        then        14114405
when        44469200        then        14114406
when        44503000        then        14114407
when        44504200        then        14114408
when        44509900        then        14114409
when        44678300        then        14114410
when        44709900        then        14114411
when        44729900        then        14114412
when        44754100        then        14114413
when        44764100        then        14114414
when        44804100        then        14114415
when        44809900        then        14114416
when        44901500        then        14114417
when        44903000        then        14114418
when        44903036        then        14114419
when        44903600        then        14114420
when        44904700        then        14114421
when        44905199        then        14114422
when        44905248        then        14114423
when        44909100        then        14114424
when        44909230        then        14114425
when        44909239        then        14114426
when        44909299        then        14114427
when        44910000        then        14114428
when        44915200        then        14114429
when        44464100        then        14114430
when        44500000        then        14114431
when        44503900        then        14114432
when        44505100        then        14114433
when        44670000        then        14114434
when        44704100        then        14114435
when        44720000        then        14114436
when        44740000        then        14114437
when        44759900        then        14114438
when        44769900        then        14114439
when        44805100        then        14114440
when        44900400        then        14114441
when        44901800        then        14114442
when        44903010        then        14114443
when        44903300        then        14114444
when        44903900        then        14114445
when        44905180        then        14114446
when        44905208        then        14114447
when        44905299        then        14114448
when        44909214        then        14114449
when        44909236        then        14114450
when        44909252        then        14114451
when        44909500        then        14114452
when        44914700        then        14114453
when        44919900        then        14114454
when        44469900        then        14114455
when        44503600        then        14114456
when        44504700        then        14114457
when        44600000        then        14114458
when        44700000        then        14114459
when        44710000        then        14114460
when        44730000        then        14114461
when        44754200        then        14114462
when        44764200        then        14114463
when        44804200        then        14114464
when        44900000        then        14114465
when        44901700        then        14114466
when        44903009        then        14114467
when        44903099        then        14114468
when        44903700        then        14114469
when        44905100        then        14114470
when        44905200        then        14114471
when        44905252        then        14114472
when        44909200        then        14114473
when        44909235        then        14114474
when        44909251        then        14114475
when        44909300        then        14114476
when        44913900        then        14114477
when        44919100        then        14114478
when        44925100        then        14114479
when        44915100        then        14114480
when        44920000        then        14114481
when        44929900        then        14114482
when        44939900        then        14114483
when        44949900        then        14114484
when        44956100        then        14114485
when        44959900        then        14114486
when        44966100        then        14114487
when        44969900        then        14114488
when        45220000        then        14114489
when        45309900        then        14114490
when        45319900        then        14114491
when        45326500        then        14114492
when        45360000        then        14114493
when        45409900        then        14114494
when        45426600        then        14114495
when        45500000        then        14114496
when        45600000        then        14114497
when        45700000        then        14114498
when        45710000        then        14114499
when        45750000        then        14114500
when        45902700        then        14114501
when        45906400        then        14114502
when        45908400        then        14114503
when        45909262        then        14114504
when        44922000        then        14114505
when        44930000        then        14114506
when        44940000        then        14114507
when        44950000        then        14114508
when        44959100        then        14114509
when        44960000        then        14114510
when        44969100        then        14114511
when        44990000        then        14114512
when        45300000        then        14114513
when        45310000        then        14114514
when        45320000        then        14114515
when        45326600        then        14114516
when        45400000        then        14114517
when        45410000        then        14114518
when        45429900        then        14114519
when        45504200        then        14114520
when        45670000        then        14114521
when        45704100        then        14114522
when        45720000        then        14114523
when        45760000        then        14114524
when        45906100        then        14114525
when        45906500        then        14114526
when        45909100        then        14114527
when        45909263        then        14114528
when        45909267        then        14114529
when        44925200        then        14114530
when        44935200        then        14114531
when        44945200        then        14114532
when        44955200        then        14114533
when        44959300        then        14114534
when        44965200        then        14114535
when        44969300        then        14114536
when        45200000        then        14114537
when        45304200        then        14114538
when        45314200        then        14114539
when        45326400        then        14114540
when        45350000        then        14114541
when        45404200        then        14114542
when        45426400        then        14114543
when        45460000        then        14114544
when        45509900        then        14114545
when        45678300        then        14114546
when        45709900        then        14114547
when        45740000        then        14114548
when        45900000        then        14114549
when        45906300        then        14114550
when        45906700        then        14114551
when        45909261        then        14114552
when        45909265        then        14114553
when        45909299        then        14114554
when        44935100        then        14114555
when        44945100        then        14114556
when        44955100        then        14114557
when        44959200        then        14114558
when        44965100        then        14114559
when        44969200        then        14114560
when        45000000        then        14114561
when        45304100        then        14114562
when        45314100        then        14114563
when        45326100        then        14114564
when        45329900        then        14114565
when        45404100        then        14114566
when        45420000        then        14114567
when        45450000        then        14114568
when        45506600        then        14114569
when        45678200        then        14114570
when        45704200        then        14114571
when        45730000        then        14114572
when        45800000        then        14114573
when        45906200        then        14114574
when        45906600        then        14114575
when        45909200        then        14114576
when        45909264        then        14114577
when        45909291        then        14114578
when        45910000        then        14114579
when        45909266        then        14114580
when        45909300        then        14114581
when        45916100        then        14114582
when        45918400        then        14114583
when        45920000        then        14114584
when        45956100        then        14114585
when        45959300        then        14114586
when        45966700        then        14114587
when        45969900        then        14114588
when        46220000        then        14114589
when        46350000        then        14114590
when        46420000        then        14114591
when        46600000        then        14114592
when        46720000        then        14114593
when        46760000        then        14114594
when        46907100        then        14114595
when        46907199        then        14114596
when        46907203        then        14114597
when        46907500        then        14114598
when        46907603        then        14114599
when        46907702        then        14114600
when        46909200        then        14114601
when        46917100        then        14114602
when        46940000        then        14114603
when        46957700        then        14114604
when        45909900        then        14114605
when        45916200        then        14114606
when        45919100        then        14114607
when        45930000        then        14114608
when        45956700        then        14114609
when        45959900        then        14114610
when        45969100        then        14114611
when        45990000        then        14114612
when        46300000        then        14114613
when        46360000        then        14114614
when        46450000        then        14114615
when        46670000        then        14114616
when        46730000        then        14114617
when        46800000        then        14114618
when        46907101        then        14114619
when        46907200        then        14114620
when        46907299        then        14114621
when        46907600        then        14114622
when        46907699        then        14114623
when        46907703        then        14114624
when        46909300        then        14114625
when        46917102        then        14114626
when        46950000        then        14114627
when        46959100        then        14114628
when        46960000        then        14114629
when        45914700        then        14114630
when        45916600        then        14114631
when        45919900        then        14114632
when        45950000        then        14114633
when        45959200        then        14114634
when        45966100        then        14114635
when        45969300        then        14114636
when        46200000        then        14114637
when        46320000        then        14114638
when        46410000        then        14114639
when        46500000        then        14114640
when        46710000        then        14114641
when        46750000        then        14114642
when        46902600        then        14114643
when        46907103        then        14114644
when        46907202        then        14114645
when        46907400        then        14114646
when        46907602        then        14114647
when        46907701        then        14114648
when        46909100        then        14114649
when        46910000        then        14114650
when        46930000        then        14114651
when        46957300        then        14114652
when        46959300        then        14114653
when        46967300        then        14114654
when        45916500        then        14114655
when        45919200        then        14114656
when        45940000        then        14114657
when        45959100        then        14114658
when        45960000        then        14114659
when        45969200        then        14114660
when        46000000        then        14114661
when        46310000        then        14114662
when        46400000        then        14114663
when        46460000        then        14114664
when        46700000        then        14114665
when        46740000        then        14114666
when        46900000        then        14114667
when        46907102        then        14114668
when        46907201        then        14114669
when        46907300        then        14114670
when        46907601        then        14114671
when        46907700        then        14114672
when        46907799        then        14114673
when        46909900        then        14114674
when        46917199        then        14114675
when        46957100        then        14114676
when        46959200        then        14114677
when        46967100        then        14114678
when        46969200        then        14114679
when        46959900        then        14114680
when        46967700        then        14114681
when        46969900        then        14114682
when        99990000        then        14114683
when        46969100        then        14114705
when        46990000        then        14114706
when        99999900        then        14114707
when        46969300        then        14114730
when        99000000        then        14114731
when        90000000        then        14114755
when        99999999        then        14114756
 end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS natureza
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) ) AS content 
 from CONTFICHADESPESA 
 where cd_fichadesp < 5000  and vl_orcado = 0 and cd_cecam = 1995  and cd_projativ = 2006

        `;

        const result = await masterConnection.query(userQuery);

        const resultData = result.recordset;

        const transformedData = resultData.map(record => {
            // Log para verificar o que está sendo recebido em cada registro
            console.log("Registro original:", record);
            
            // Fazer o parse dos campos que vêm como strings JSON, se necessário
            const parsedContent = record.content ? JSON.parse(record.content) : {};
            
            // Montagem do JSON final com os valores do record e parsedContent
            return {
                idIntegracao: record.idIntegracao || null,  // Verifica se existe `idIntegracao`
                content: {
                    exercicio: parsedContent.exercicio || record.exercicio || null,  // Pega o campo `exercicio`
                    programa: {
                        id: parsedContent.programa?.id || record.programaId || null  // Pega o campo `programa.id`
                    },
                    acao: {
                        id: parsedContent.acao?.id || record.acaoId || null  // Pega o campo `acao.id`
                    },
                    localizador: {
                        id: parsedContent.localizador?.id || record.localizadorId || null  // Pega o campo `localizador.id`
                    },
                    organograma: {
                        id: parsedContent.organograma?.id || record.organogramaId || null  // Pega o campo `organograma.id`
                    },
                    funcao: {
                        id: parsedContent.funcao?.id || record.funcaoId || null  // Pega o campo `funcao.id`
                    },
                    subfuncao: {
                        id: parsedContent.subfuncao?.id || record.subfuncaoId || null  // Pega o campo `subfuncao.id`
                    },
                    natureza: {
                        id: parsedContent.natureza?.id || record.naturezaId || null  // Pega o campo `natureza.id`
                    }
                }
            };
        });
        

        // Exibir resultado transformado
        console.log("Dados transformados:", JSON.stringify(transformedData, null, 2));



        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar cada registro individualmente para a rota desejada
        // Armazenar as respostas do servidor
        const serverResponses = [];

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const url = `https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/despesas-nao-previstas`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                },
                body: JSON.stringify(record)
            });
     
            const responseBody = await response.json();
            serverResponses.push({
                url: url,
                status: response.status,
                statusText: response.statusText,
                responseBody: responseBody
            });
     
            if (response.ok) {
                console.log(`Dados do registro enviados com sucesso para ${url}.`);
            } else {
                console.error(`Erro ao enviar os dados do registro para ${url}:`, response.statusText);
            }
        } */

        //fs.writeFileSync('log_bens.json', JSON.stringify(serverResponses, null, 2));
        //console.log('Respostas do servidor salvas em log_bens.json');

    } catch (error) {
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        await sql.close();
    }
}

// Chamar a função principal
main();