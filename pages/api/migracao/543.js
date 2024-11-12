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

function unifyRetencoes(data) {
    const recordMap = new Map();

    data.forEach(record => {
        const idIntegracao = record.idIntegracao;
        
        if (!recordMap.has(idIntegracao)) {
            // Add the record if it's not already in the map
            recordMap.set(idIntegracao, {
                ...record,
                content: {
                    ...record.content,
                    retencoes: [...record.content.retencoes] // Copy the retencoes array
                }
            });
        } else {
            // If duplicate found, merge 'retencoes' arrays
            const existingRecord = recordMap.get(idIntegracao);
            existingRecord.content.retencoes.push(...record.content.retencoes);
        }
    });

    // Convert the map back to an array
    return Array.from(recordMap.values());
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

 l.cd_Liquidacao  as idIntegracao,

JSON_QUERY(
(SELECT
'false' as validaSaldo,
l.cd_Exercicio as exercicio,
JSON_QUERY(
(SELECT 

case l.cd_Empenho

when 1182 then 20646377
 when 41 then 20646378
 when 1183 then 20646379
 when 2016 then 20646380
 when 102 then 20646381
 when 2021 then 20646382
 when 1920 then 20646383
 when 106 then 20646384
 when 108 then 20646385
 when 583 then 20646386
 when 85 then 20646387
 when 103 then 20646388
 when 2087 then 20646389
 when 594 then 20646390
 when 2020 then 20646391
 when 1916 then 20646392
 when 1697 then 20646393
 when 1917 then 20646394
 when 1577 then 20646395
 when 1289 then 20646396
 when 1669 then 20646397
 when 769 then 20646398
 when 2102 then 20646399
 when 399 then 20646400
 when 1113 then 20646401
 when 2094 then 20646402
 when 2095 then 20646403
 when 2031 then 20646404
 when 151 then 20646405
 when 1931 then 20646406
 when 1045 then 20646407
 when 2086 then 20646408
 when 1936 then 20646409
 when 1046 then 20646410
 when 1514 then 20646411
 when 2012 then 20646412
 when 155 then 20646413
 when 1287 then 20646414
 when 2014 then 20646415
 when 1053 then 20646416
 when 1311 then 20646417
 when 782 then 20646418
 when 585 then 20646419
 when 1028 then 20646420
 when 537 then 20646421
 when 540 then 20646422
 when 1769 then 20646423
 when 764 then 20646424
 when 394 then 20646425
 when 319 then 20646426
 when 1701 then 20646427
 when 1302 then 20646428
 when 113 then 20646429
 when 327 then 20646430
 when 121 then 20646431
 when 1684 then 20646432
 when 2026 then 20646433
 when 1293 then 20646434
 when 1935 then 20646435
 when 1688 then 20646436
 when 784 then 20646437
 when 1681 then 20646438
 when 1581 then 20646439
 when 774 then 20646440
 when 1891 then 20646441
 when 2101 then 20646442
 when 1495 then 20646443
 when 1689 then 20646444
 when 1078 then 20646445
 when 1680 then 20646446
 when 1884 then 20646447
 when 1304 then 20646448
 when 1751 then 20646449
 when 1675 then 20646450
 when 1696 then 20646451
 when 1513 then 20646452
 when 1047 then 20646453
 when 1064 then 20646454
 when 1511 then 20646455
 when 1492 then 20646456
 when 508 then 20646457
 when 771 then 20646458
 when 1499 then 20646459
 when 1512 then 20646460
 when 768 then 20646461
 when 1076 then 20646462
 when 1887 then 20646463
 when 404 then 20646464
 when 1516 then 20646465
 when 773 then 20646466
 when 1850 then 20646467
 when 1693 then 20646468
 when 1281 then 20646469
 when 1502 then 20646470
 when 1305 then 20646471
 when 541 then 20646472
 when 1297 then 20646473
 when 1855 then 20646474
 when 1070 then 20646475
 when 1169 then 20646476
 when 1077 then 20646477
 when 1845 then 20646478
 when 354 then 20646479
 when 1573 then 20646480
 when 1574 then 20646481
 when 397 then 20646482
 when 1491 then 20646483
 when 1061 then 20646484
 when 1298 then 20646485
 when 2023 then 20646486
 when 1300 then 20646487
 when 1071 then 20646488
 when 1690 then 20646489
 when 1029 then 20646490
 when 777 then 20646491
 when 1279 then 20646492
 when 1576 then 20646493
 when 1918 then 20646494
 when 758 then 20646495
 when 1674 then 20646496
 when 1497 then 20646497
 when 1050 then 20646498
 when 1026 then 20646499
 when 1889 then 20646500
 when 593 then 20646501
 when 331 then 20646502
 when 1853 then 20646503
 when 779 then 20646504
 when 1282 then 20646505
 when 1280 then 20646506
 when 1699 then 20646507
 when 776 then 20646508
 when 533 then 20646509
 when 1503 then 20646510
 when 1500 then 20646511
 when 763 then 20646512
 when 2029 then 20646513
 when 1284 then 20646514
 when 317 then 20646515
 when 580 then 20646516
 when 755 then 20646517
 when 589 then 20646518
 when 321 then 20646519
 when 1934 then 20646520
 when 578 then 20646521
 when 1023 then 20646522
 when 761 then 20646523
 when 401 then 20646524
 when 1504 then 20646525
 when 315 then 20646526
 when 2099 then 20646527
 when 322 then 20646528
 when 1021 then 20646529
 when 1507 then 20646530
 when 352 then 20646531
 when 766 then 20646532
 when 1310 then 20646533
 when 110 then 20646534
 when 402 then 20646536
 when 531 then 20646537
 when 109 then 20646538
 when 2015 then 20646539
 when 1290 then 20646540
 when 1075 then 20646541
 when 316 then 20646542
 when 325 then 20646543
 when 405 then 20646544
 when 2028 then 20646545
 when 318 then 20646546
 when 753 then 20646547
 when 1671 then 20646548
 when 1309 then 20646549
 when 1295 then 20646550
 when 1052 then 20646551
 when 592 then 20646552
 when 539 then 20646553
 when 765 then 20646554
 when 1055 then 20646555
 when 1030 then 20646556
 when 1180 then 20646557
 when 1515 then 20646558
 when 328 then 20646559
 when 1024 then 20646560
 when 780 then 20646561
 when 786 then 20646562
 when 119 then 20646563
 when 536 then 20646564
 when 754 then 20646565
 when 1578 then 20646566
 when 535 then 20646567
 when 353 then 20646568
 when 1852 then 20646569
 when 1501 then 20646570
 when 762 then 20646571
 when 1679 then 20646572
 when 955 then 20646573
 when 1700 then 20646574
 when 2088 then 20646575
 when 1079 then 20646576
 when 538 then 20646577
 when 534 then 20646578
 when 104 then 20646579
 when 1682 then 20646580
 when 1505 then 20646581
 when 1672 then 20646582
 when 1048 then 20646583
 when 1886 then 20646584
 when 1579 then 20646585
 when 1299 then 20646586
 when 1677 then 20646587
 when 1286 then 20646588
 when 1288 then 20646589
 when 577 then 20646590
 when 2025 then 20646591
 when 579 then 20646592
 when 398 then 20646593
 when 114 then 20646594
 when 757 then 20646595
 when 320 then 20646596
 when 1847 then 20646597
 when 1417 then 20646598
 when 756 then 20646599
 when 1919 then 20646600
 when 1673 then 20646601
 when 330 then 20646602
 when 1691 then 20646603
 when 149 then 20646604
 when 1624 then 20646605
 when 543 then 20646606
 when 1698 then 20646607
 when 1257 then 20646608
 when 1140 then 20646609
 when 1678 then 20646610
 when 1020 then 20646611
 when 111 then 20646612
 when 1494 then 20646613
 when 1937 then 20646614
 when 1849 then 20646615
 when 1938 then 20646616
 when 1970 then 20646617
 when 115 then 20646618
 when 329 then 20646619
 when 1157 then 20646620
 when 1848 then 20646621
 when 1145 then 20646622
 when 1308 then 20646623
 when 2119 then 20646624
 when 152 then 20646625
 when 1025 then 20646626
 when 1763 then 20646627
 when 1049 then 20646628
 when 351 then 20646629
 when 313 then 20646630
 when 770 then 20646631
 when 156 then 20646632
 when 120 then 20646633
 when 960 then 20646634
 when 326 then 20646635
 when 1179 then 20646636
 when 1063 then 20646637
 when 506 then 20646638
 when 157 then 20646639
 when 1147 then 20646640
 when 1632 then 20646641
 when 1294 then 20646642
 when 477 then 20646643
 when 235 then 20646644
 when 1292 then 20646645
 when 480 then 20646646
 when 1012 then 20646647
 when 47 then 20646648
 when 441 then 20646649
 when 223 then 20646650
 when 582 then 20646651
 when 1510 then 20646652
 when 781 then 20646653
 when 1692 then 20646654
 when 255 then 20646655
 when 400 then 20646656
 when 785 then 20646657
 when 1640 then 20646658
 when 1633 then 20646659
 when 2148 then 20646660
 when 153 then 20646661
 when 1580 then 20646662
 when 442 then 20646663
 when 1206 then 20646664
 when 509 then 20646665
 when 230 then 20646666
 when 116 then 20646667
 when 2019 then 20646668
 when 1890 then 20646669
 when 1148 then 20646670
 when 1149 then 20646671
 when 1303 then 20646672
 when 595 then 20646673
 when 2155 then 20646674
 when 542 then 20646675
 when 2018 then 20646676
 when 497 then 20646677
 when 775 then 20646678
 when 1683 then 20646679
 when 1138 then 20646680
 when 692 then 20646681
 when 1597 then 20646682
 when 2024 then 20646683
 when 1642 then 20646684
 when 1989 then 20646685
 when 2103 then 20646686
 when 1641 then 20646687
 when 1054 then 20646688
 when 783 then 20646689
 when 976 then 20646690
 when 576 then 20646691
 when 1496 then 20646692
 when 952 then 20646693
 when 1888 then 20646694
 when 1150 then 20646695
 when 974 then 20646696
 when 1990 then 20646697
 when 1802 then 20646698
 when 112 then 20646699
 when 1687 then 20646700
 when 1988 then 20646701
 when 1015 then 20646702
 when 1065 then 20646703
 when 1599 then 20646704
 when 122 then 20646705
 when 1301 then 20646706
 when 1854 then 20646707
 when 1985 then 20646708
 when 478 then 20646709
 when 1027 then 20646710
 when 584 then 20646711
 when 482 then 20646712
 when 2104 then 20646713
 when 2030 then 20646714
 when 105 then 20646715
 when 332 then 20646716
 when 2017 then 20646717
 when 1457 then 20646718
 when 1506 then 20646719
 when 2089 then 20646720
 when 219 then 20646721
 when 1312 then 20646722
 when 851 then 20646723
 when 694 then 20646724
 when 1634 then 20646725
 when 498 then 20646726
 when 977 then 20646727
 when 220 then 20646728
 when 2117 then 20646729
 when 1283 then 20646730
 when 953 then 20646731
 when 1598 then 20646732
 when 234 then 20646733
 when 39 then 20646734
 when 1258 then 20646735
 when 82 then 20646736
 when 951 then 20646737
 when 481 then 20646738
 when 233 then 20646739
 when 1760 then 20646740
 when 1139 then 20646741
 when 1984 then 20646742
 when 898 then 20646743
 when 1986 then 20646744
 when 1454 then 20646745
 when 280 then 20646746
 when 479 then 20646747
 when 1458 then 20646748
 when 221 then 20646749
 when 627 then 20646750
 when 1010 then 20646751
 when 1016 then 20646752
 when 1014 then 20646753
 when 81 then 20646754
 when 1762 then 20646755
 when 1460 then 20646756
 when 227 then 20646757
 when 1453 then 20646758
 when 1452 then 20646759
 when 229 then 20646760
 when 1459 then 20646761
 when 242 then 20646762
 when 226 then 20646763
 when 1451 then 20646764
 when 271 then 20646765
 when 850 then 20646766
 when 1208 then 20646767
 when 228 then 20646768
 when 1205 then 20646769
 when 1212 then 20646770
 when 232 then 20646771
 when 861 then 20646772
 when 225 then 20646773
 when 222 then 20646774
 when 224 then 20646775
 when 1207 then 20646776
 when 272 then 20646777
 when 693 then 20646778
 when 1456 then 20646779
 when 273 then 20646780
 when 1211 then 20646781
 when 274 then 20646782
 when 1759 then 20646783
 when 1933 then 20646784
 when 1455 then 20646785
 when 241 then 20646786
 when 231 then 20646787
 when 289 then 20646788
 when 2097 then 20646789
 when 1761 then 20646790
 when 15 then 20646791
 when 42 then 20646792
 when 591 then 20646793
 when 760 then 20646794
 when 900 then 20646795
 when 492 then 20646796
 when 1074 then 20646797
 when 1184 then 20646798
 when 714 then 20646799
 when 1686 then 20646800
 when 1307 then 20646801
 when 37 then 20646802
 when 653 then 20646803
 when 1965 then 20646804
 when 454 then 20646805
 when 2001 then 20646806
 when 1765 then 20646807
 when 1166 then 20646808
 when 60 then 20646809
 when 214 then 20646810
 when 1255 then 20646811
 when 1233 then 20646812
 when 963 then 20646813
 when 676 then 20646814
 when 324 then 20646815
 when 238 then 20646816
 when 655 then 20646817
 when 2130 then 20646818
 when 1509 then 20646819
 when 1611 then 20646820
 when 1779 then 20646821
 when 853 then 20646822
 when 216 then 20646823
 when 751 then 20646824
 when 811 then 20646825
 when 659 then 20646826
 when 661 then 20646827
 when 729 then 20646828
 when 2152 then 20646829
 when 212 then 20646830
 when 1470 then 20646831
 when 53 then 20646832
 when 468 then 20646833
 when 118 then 20646834
 when 1646 then 20646835
 when 1254 then 20646836
 when 651 then 20646837
 when 904 then 20646838
 when 170 then 20646839
 when 31 then 20646840
 when 665 then 20646841
 when 54 then 20646842
 when 1400 then 20646843
 when 244 then 20646844
 when 279 then 20646845
 when 73 then 20646846
 when 892 then 20646847
 when 278 then 20646848
 when 243 then 20646849
 when 930 then 20646850
 when 2121 then 20646851
 when 609 then 20646852
 when 1192 then 20646853
 when 311 then 20646854
 when 297 then 20646855
 when 30 then 20646856
 when 962 then 20646857
 when 1777 then 20646858
 when 203 then 20646859
 when 944 then 20646860
 when 2092 then 20646861
 when 2002 then 20646862
 when 1191 then 20646863
 when 715 then 20646864
 when 2122 then 20646865
 when 1612 then 20646866
 when 1997 then 20646867
 when 906 then 20646868
 when 1411 then 20646869
 when 455 then 20646870
 when 310 then 20646871
 when 2124 then 20646872
 when 809 then 20646873
 when 980 then 20646874
 when 868 then 20646875
 when 1998 then 20646876
 when 869 then 20646877
 when 1275 then 20646878
 when 1252 then 20646879
 when 1811 then 20646880
 when 649 then 20646881
 when 708 then 20646882
 when 415 then 20646883
 when 908 then 20646884
 when 808 then 20646885
 when 2000 then 20646886
 when 1277 then 20646887
 when 894 then 20646888
 when 218 then 20646889
 when 946 then 20646890
 when 1329 then 20646891
 when 448 then 20646892
 when 298 then 20646893
 when 857 then 20646894
 when 810 then 20646895
 when 961 then 20646896
 when 657 then 20646897
 when 412 then 20646898
 when 1402 then 20646899
 when 1413 then 20646900
 when 710 then 20646901
 when 880 then 20646902
 when 982 then 20646903
 when 717 then 20646904
 when 419 then 20646905
 when 901 then 20646906
 when 209 then 20646907
 when 613 then 20646908
 when 948 then 20646909
 when 1605 then 20646910
 when 1999 then 20646911
 when 658 then 20646912
 when 1645 then 20646913
 when 210 then 20646914
 when 1269 then 20646915
 when 1826 then 20646916
 when 2160 then 20646917
 when 472 then 20646918
 when 1812 then 20646919
 when 2004 then 20646920
 when 749 then 20646921
 when 2129 then 20646922
 when 2010 then 20646923
 when 711 then 20646924
 when 25 then 20646925
 when 1196 then 20646926
 when 2151 then 20646927
 when 1274 then 20646928
 when 1773 then 20646929
 when 635 then 20646930
 when 473 then 20646931
 when 2011 then 20646932
 when 654 then 20646933
 when 1472 then 20646934
 when 1268 then 20646935
 when 1782 then 20646936
 when 1768 then 20646937
 when 981 then 20646938
 when 62 then 20646939
 when 677 then 20646940
 when 32 then 20646941
 when 660 then 20646942
 when 1780 then 20646943
 when 616 then 20646944
 when 1401 then 20646945
 when 1230 then 20646946
 when 67 then 20646947
 when 1256 then 20646948
 when 1231 then 20646949
 when 1767 then 20646950
 when 411 then 20646951
 when 429 then 20646952
 when 2093 then 20646953
 when 2157 then 20646954
 when 1276 then 20646955
 when 942 then 20646956
 when 728 then 20646957
 when 932 then 20646958
 when 888 then 20646959
 when 611 then 20646960
 when 61 then 20646961
 when 633 then 20646962
 when 409 then 20646963
 when 747 then 20646964
 when 719 then 20646965
 when 11 then 20646966
 when 612 then 20646967
 when 619 then 20646968
 when 40 then 20646969
 when 413 then 20646970
 when 1128 then 20646971
 when 471 then 20646972
 when 410 then 20646973
 when 237 then 20646974
 when 1806 then 20646975
 when 855 then 20646976
 when 1228 then 20646977
 when 656 then 20646978
 when 618 then 20646979
 when 897 then 20646980
 when 663 then 20646981
 when 1606 then 20646982
 when 709 then 20646983
 when 2131 then 20646984
 when 964 then 20646985
 when 662 then 20646986
 when 1167 then 20646987
 when 288 then 20646988
 when 614 then 20646989
 when 1477 then 20646990
 when 421 then 20646991
 when 716 then 20646992
 when 1186 then 20646993
 when 303 then 20646994
 when 215 then 20646995
 when 881 then 20646996
 when 940 then 20646997
 when 1194 then 20646998
 when 1816 then 20646999
 when 889 then 20647000
 when 1185 then 20647001
 when 2150 then 20647002
 when 1810 then 20647003
 when 854 then 20647004
 when 1925 then 20647005
 when 718 then 20647006
 when 698 then 20647007
 when 1785 then 20647008
 when 1784 then 20647009
 when 2003 then 20647010
 when 449 then 20647011
 when 1783 then 20647012
 when 664 then 20647013
 when 66 then 20647014
 when 2133 then 20647015
 when 2050 then 20647016
 when 1483 then 20647017
 when 217 then 20647018
 when 852 then 20647019
 when 1195 then 20647020
 when 1475 then 20647021
 when 724 then 20647022
 when 1190 then 20647023
 when 301 then 20647024
 when 2132 then 20647025
 when 65 then 20647026
 when 302 then 20647027
 when 470 then 20647028
 when 1478 then 20647029
 when 941 then 20647030
 when 2158 then 20647031
 when 1778 then 20647032
 when 727 then 20647033
 when 469 then 20647034
 when 1187 then 20647035
 when 1229 then 20647036
 when 624 then 20647037
 when 2161 then 20647038
 when 437 then 20647039
 when 1803 then 20647040
 when 945 then 20647041
 when 1943 then 20647042
 when 943 then 20647043
 when 1471 then 20647044
 when 2009 then 20647045
 when 1966 then 20647046
 when 422 then 20647047
 when 1436 then 20647048
 when 2149 then 20647049
 when 1804 then 20647050
 when 462 then 20647051
 when 1188 then 20647052
 when 1437 then 20647053
 when 1476 then 20647054
 when 636 then 20647055
 when 650 then 20647056
 when 27 then 20647057
 when 26 then 20647058
 when 1479 then 20647059
 when 1473 then 20647060
 when 947 then 20647061
 when 933 then 20647062
 when 1474 then 20647063
 when 856 then 20647064
 when 730 then 20647065
 when 634 then 20647066
 when 1805 then 20647067
 when 909 then 20647068
 when 1480 then 20647069
 when 427 then 20647070
 when 752 then 20647071
 when 299 then 20647072
 when 1189 then 20647073
 when 1927 then 20647074
 when 928 then 20647075
 when 1647 then 20647076
 when 750 then 20647077
 when 931 then 20647078
 when 420 then 20647079
 when 34 then 20647080
 when 1667 then 20647081
 when 1774 then 20647082
 when 896 then 20647083
 when 1 then 20647084
 when 2 then 20647085
 when 428 then 20647086
 when 949 then 20647087
 when 430 then 20647088
 when 1926 then 20647089
 when 417 then 20647090
 when 440 then 20647091
 when 1272 then 20647092
 when 28 then 20647093
 when 304 then 20647094
 when 70 then 20647095
 when 615 then 20647096
 when 1832 then 20647097
 when 902 then 20647098
 when 2156 then 20647099
 when 33 then 20647100
 when 1976 then 20647101
 when 1253 then 20647102
 when 1330 then 20647103
 when 71 then 20647104
 when 35 then 20647105
 when 646 then 20647106
 when 45 then 20647107
 when 899 then 20647108
 when 707 then 20647109
 when 907 then 20647110
 when 666 then 20647111
 when 1193 then 20647112
 when 184 then 20647113
 when 423 then 20647114
 when 652 then 20647115
 when 22 then 20647116
 when 29 then 20647117
 when 1960 then 20647118
 when 699 then 20647119
 when 1072 then 20647120
 when 44 then 20647121
 when 458 then 20647122
 when 2005 then 20647123
 when 1285 then 20647124
 when 2154 then 20647125
 when 83 then 20647126
 when 1670 then 20647127
 when 1119 then 20647128
 when 182 then 20647129
 when 80 then 20647130
 when 1932 then 20647131
 when 36 then 20647132
 when 1648 then 20647133
 when 1398 then 20647134
 when 1498 then 20647135
 when 1073 then 20647136
 when 1668 then 20647137
 when 300 then 20647138
 when 195 then 20647139
 when 1575 then 20647140
 when 1831 then 20647141
 when 211 then 20647142
 when 459 then 20647143
 when 1676 then 20647144
 when 2027 then 20647145
 when 1296 then 20647146
 when 1291 then 20647147
 when 438 then 20647148
 when 1466 then 20647149
 when 177 then 20647150
 when 2096 then 20647151
 when 433 then 20647152
 when 4 then 20647153
 when 107 then 20647154
 when 1493 then 20647155
 when 1851 then 20647156
 when 1685 then 20647157
 when 1846 then 20647158
 when 2013 then 20647159
 when 2022 then 20647160
 when 1306 then 20647161
 when 1694 then 20647162
 when 1508 then 20647163
 when 1885 then 20647164
 when 1695 then 20647165
 when 1062 then 20647167
 when 1051 then 20647168
 when 778 then 20647169
 when 767 then 20647170
 when 1022 then 20647171
 when 772 then 20647172
 when 396 then 20647173
 when 590 then 20647174
 when 323 then 20647175
 when 507 then 20647176
 when 314 then 20647177
 when 150 then 20647178
 when 117 then 20647179
 when 1013 then 20647180
 when 1358 then 20647181
 when 395 then 20647182
 when 759 then 20647183
 when 1620 then 20647184
 when 629 then 20647185
 when 720 then 20647186
 when 532 then 20647187
 when 403 then 20647188
 when 911 then 20647189
 when 812 then 20647190
 when 154 then 20647191
 when 3 then 20647192
 when 849 then 20647193
 when 1951 then 20647194
 when 859 then 20647195
 when 581 then 20647196
 when 738 then 20647197
 when 721 then 20647198
 when 1952 then 20647199
 when 722 then 20647200
 when 1440 then 20647201
 when 2123 then 20647202
 when 739 then 20647203
 when 1204 then 20647204
 when 68 then 20647205
 when 1957 then 20647206
 when 1956 then 20647207
 when 1844 then 20647208
 when 601 then 20647209
 when 1137 then 20647210
 when 69 then 20647211
 when 723 then 20647212
 when 1955 then 20647213
 when 1954 then 20647214
 when 1619 then 20647215
 when 38 then 20647216
 when 737 then 20647217
 when 691 then 20647218
 when 1953 then 20647219
 when 1958 then 20647220
 when 295 then 20647221
 when 1950 then 20647222
 when 1959 then 20647223
 when 491 then 20647224
 when 296 then 20647225
 when 1210 then 20647270
 when 860 then 20647271
 when 1815 then 20647272
 when 882 then 20647273
 when 1197 then 20647274
 when 858 then 20647275
 when 1175 then 20647276
 when 1399 then 20647277
 when 1176 then 20647278
 when 1122 then 20647279
 when 1017 then 20647280
 when 1209 then 20647281
 when 90 then 20647285
 when 91 then 20647286
 when 92 then 20647287
 when 93 then 20647288
 when 95 then 20647289
 when 124 then 20647290
 when 98 then 20647291
 when 131 then 20647292
 when 86 then 20647293
 when 94 then 20647294
 when 125 then 20647295
 when 123 then 20647296
 when 99 then 20647297
 when 88 then 20647298
 when 132 then 20647299
 when 145 then 20647300
 when 96 then 20647301
 when 140 then 20647302
 when 166 then 20647303
 when 138 then 20647304
 when 87 then 20647305
 when 141 then 20647306
 when 127 then 20647307
 when 101 then 20647308
 when 130 then 20647309
 when 143 then 20647310
 when 133 then 20647311
 when 144 then 20647312
 when 172 then 20647313
 when 348 then 20647314
 when 137 then 20647315
 when 160 then 20647316
 when 162 then 20647317
 when 355 then 20647318
 when 147 then 20647319
 when 168 then 20647320
 when 333 then 20647321
 when 174 then 20647322
 when 335 then 20647323
 when 134 then 20647324
 when 360 then 20647325
 when 341 then 20647326
 when 334 then 20647327
 when 378 then 20647328
 when 136 then 20647329
 when 175 then 20647330
 when 337 then 20647331
 when 362 then 20647332
 when 349 then 20647333
 when 148 then 20647334
 when 384 then 20647335
 when 364 then 20647336
 when 158 then 20647337
 when 361 then 20647338
 when 161 then 20647339
 when 381 then 20647340
 when 367 then 20647341
 when 370 then 20647342
 when 374 then 20647343
 when 347 then 20647344
 when 386 then 20647345
 when 379 then 20647346
 when 164 then 20647347
 when 392 then 20647348
 when 380 then 20647349
 when 167 then 20647350
 when 513 then 20647351
 when 373 then 20647352
 when 388 then 20647353
 when 165 then 20647354
 when 383 then 20647355
 when 339 then 20647356
 when 393 then 20647357
 when 387 then 20647358
 when 359 then 20647359
 when 514 then 20647360
 when 390 then 20647361
 when 515 then 20647362
 when 338 then 20647363
 when 510 then 20647364
 when 366 then 20647365
 when 518 then 20647366
 when 369 then 20647367
 when 525 then 20647368
 when 548 then 20647369
 when 520 then 20647370
 when 545 then 20647371
 when 561 then 20647372
 when 550 then 20647373
 when 567 then 20647374
 when 523 then 20647375
 when 788 then 20647376
 when 526 then 20647377
 when 817 then 20647378
 when 872 then 20647379
 when 838 then 20647380
 when 377 then 20647381
 when 551 then 20647382
 when 559 then 20647383
 when 371 then 20647384
 when 570 then 20647385
 when 794 then 20647386
 when 803 then 20647387
 when 521 then 20647388
 when 895 then 20647389
 when 528 then 20647390
 when 389 then 20647391
 when 529 then 20647392
 when 797 then 20647393
 when 546 then 20647394
 when 562 then 20647395
 when 575 then 20647396
 when 565 then 20647397
 when 566 then 20647398
 when 628 then 20647399
 when 382 then 20647400
 when 790 then 20647401
 when 375 then 20647402
 when 571 then 20647403
 when 793 then 20647404
 when 516 then 20647405
 when 1031 then 20647406
 when 800 then 20647407
 when 818 then 20647408
 when 802 then 20647409
 when 801 then 20647410
 when 798 then 20647411
 when 572 then 20647412
 when 568 then 20647413
 when 821 then 20647414
 when 787 then 20647415
 when 835 then 20647416
 when 1042 then 20647417
 when 511 then 20647418
 when 1060 then 20647419
 when 823 then 20647420
 when 524 then 20647421
 when 1082 then 20647422
 when 557 then 20647423
 when 544 then 20647424
 when 553 then 20647425
 when 827 then 20647426
 when 563 then 20647427
 when 830 then 20647428
 when 1083 then 20647429
 when 558 then 20647430
 when 840 then 20647431
 when 1088 then 20647432
 when 564 then 20647433
 when 574 then 20647434
 when 792 then 20647435
 when 843 then 20647436
 when 804 then 20647437
 when 806 then 20647438
 when 844 then 20647439
 when 826 then 20647440
 when 1069 then 20647441
 when 831 then 20647442
 when 795 then 20647443
 when 847 then 20647444
 when 814 then 20647445
 when 828 then 20647446
 when 1043 then 20647447
 when 845 then 20647448
 when 1067 then 20647449
 when 789 then 20647450
 when 848 then 20647451
 when 1036 then 20647452
 when 839 then 20647453
 when 807 then 20647454
 when 1084 then 20647455
 when 1104 then 20647456
 when 846 then 20647457
 when 819 then 20647458
 when 820 then 20647459
 when 1087 then 20647460
 when 824 then 20647461
 when 1039 then 20647462
 when 878 then 20647463
 when 1040 then 20647464
 when 1041 then 20647465
 when 876 then 20647466
 when 1056 then 20647467
 when 890 then 20647468
 when 1058 then 20647469
 when 842 then 20647470
 when 1109 then 20647471
 when 1066 then 20647472
 when 874 then 20647473
 when 1095 then 20647474
 when 1348 then 20647475
 when 1341 then 20647476
 when 1098 then 20647477
 when 875 then 20647478
 when 1093 then 20647479
 when 1096 then 20647480
 when 1361 then 20647481
 when 1110 then 20647482
 when 1100 then 20647483
 when 1111 then 20647484
 when 1371 then 20647485
 when 1107 then 20647486
 when 1105 then 20647487
 when 1331 then 20647488
 when 1313 then 20647489
 when 1094 then 20647490
 when 1333 then 20647491
 when 879 then 20647492
 when 1112 then 20647493
 when 1338 then 20647494
 when 1340 then 20647495
 when 1319 then 20647496
 when 1352 then 20647497
 when 1370 then 20647498
 when 1353 then 20647499
 when 1034 then 20647500
 when 1033 then 20647501
 when 1350 then 20647502
 when 1314 then 20647503
 when 1372 then 20647504
 when 1335 then 20647505
 when 1375 then 20647506
 when 1373 then 20647507
 when 1374 then 20647508
 when 1080 then 20647509
 when 1356 then 20647510
 when 1364 then 20647511
 when 1518 then 20647512
 when 1534 then 20647513
 when 1365 then 20647514
 when 1526 then 20647515
 when 1544 then 20647516
 when 1035 then 20647517
 when 1558 then 20647518
 when 1559 then 20647519
 when 1520 then 20647520
 when 1369 then 20647522
 when 1525 then 20647523
 when 1037 then 20647524
 when 1108 then 20647525
 when 1086 then 20647526
 when 1057 then 20647527
 when 1533 then 20647528
 when 1540 then 20647529
 when 1317 then 20647530
 when 1092 then 20647531
 when 1318 then 20647532
 when 1099 then 20647533
 when 1537 then 20647534
 when 1553 then 20647535
 when 1562 then 20647536
 when 1557 then 20647537
 when 1366 then 20647538
 when 1563 then 20647539
 when 1529 then 20647540
 when 1543 then 20647541
 when 1527 then 20647542
 when 1546 then 20647543
 when 1554 then 20647544
 when 1564 then 20647545
 when 1705 then 20647546
 when 1565 then 20647547
 when 1547 then 20647548
 when 1548 then 20647549
 when 1568 then 20647550
 when 1103 then 20647551
 when 1342 then 20647552
 when 1569 then 20647553
 when 1550 then 20647554
 when 1708 then 20647555
 when 1344 then 20647556
 when 1572 then 20647557
 when 1706 then 20647558
 when 1345 then 20647559
 when 1552 then 20647560
 when 1621 then 20647561
 when 1347 then 20647562
 when 1702 then 20647563
 when 1721 then 20647564
 when 1517 then 20647565
 when 1316 then 20647566
 when 1725 then 20647567
 when 1571 then 20647568
 when 1334 then 20647569
 when 1320 then 20647570
 when 1745 then 20647571
 when 1727 then 20647572
 when 1535 then 20647573
 when 1536 then 20647574
 when 1719 then 20647575
 when 1545 then 20647576
 when 1336 then 20647577
 when 1726 then 20647578
 when 1747 then 20647579
 when 1748 then 20647580
 when 1749 then 20647581
 when 1530 then 20647582
 when 1707 then 20647583
 when 1337 then 20647584
 when 1567 then 20647585
 when 1346 then 20647586
 when 1730 then 20647587
 when 1354 then 20647588
 when 1717 then 20647589
 when 1570 then 20647590
 when 1740 then 20647591
 when 1750 then 20647592
 when 1704 then 20647593
 when 1746 then 20647594
 when 1357 then 20647595
 when 1756 then 20647596
 when 1722 then 20647597
 when 1376 then 20647598
 when 1367 then 20647599
 when 1737 then 20647600
 when 1379 then 20647601
 when 1741 then 20647602
 when 1754 then 20647603
 when 1755 then 20647604
 when 1521 then 20647605
 when 1524 then 20647606
 when 1522 then 20647607
 when 1856 then 20647608
 when 1864 then 20647609
 when 1871 then 20647610
 when 1870 then 20647611
 when 1867 then 20647612
 when 1865 then 20647613
 when 1709 then 20647614
 when 1743 then 20647615
 when 1895 then 20647616
 when 1882 then 20647617
 when 1910 then 20647618
 when 1712 then 20647619
 when 1896 then 20647620
 when 1714 then 20647621
 when 1532 then 20647622
 when 1911 then 20647623
 when 1728 then 20647624
 when 1735 then 20647625
 when 1736 then 20647626
 when 2045 then 20647627
 when 1539 then 20647628
 when 1733 then 20647629
 when 1742 then 20647630
 when 1541 then 20647631
 when 2049 then 20647632
 when 1857 then 20647633
 when 2039 then 20647634
 when 1732 then 20647635
 when 1859 then 20647636
 when 1555 then 20647637
 when 1912 then 20647638
 when 1622 then 20647639
 when 1940 then 20647640
 when 1872 then 20647641
 when 1866 then 20647642
 when 1879 then 20647643
 when 1946 then 20647644
 when 1892 then 20647645
 when 1876 then 20647646
 when 1713 then 20647647
 when 2040 then 20647648
 when 2053 then 20647649
 when 1878 then 20647650
 when 1901 then 20647651
 when 1900 then 20647652
 when 1880 then 20647653
 when 1868 then 20647654
 when 1715 then 20647655
 when 1905 then 20647656
 when 1897 then 20647657
 when 1906 then 20647658
 when 1903 then 20647659
 when 1944 then 20647660
 when 1718 then 20647661
 when 1909 then 20647662
 when 1883 then 20647663
 when 1724 then 20647664
 when 1898 then 20647665
 when 2033 then 20647666
 when 2032 then 20647667
 when 2035 then 20647668
 when 1902 then 20647669
 when 1904 then 20647670
 when 2046 then 20647671
 when 1913 then 20647672
 when 2042 then 20647673
 when 2036 then 20647674
 when 2044 then 20647675
 when 1860 then 20647676
 when 2043 then 20647677
 when 1863 then 20647678
 when 2048 then 20647679
 when 1873 then 20647680
 when 1908 then 20647681
 when 1875 then 20647682
 when 1939 then 20647683
 when 1941 then 20647684
 when 2037 then 20647685
 when 2055 then 20647686
 when 2056 then 20647687
 when 2057 then 20647688
 when 2060 then 20647689
 when 2061 then 20647690
 when 2115 then 20647691
 when 2059 then 20647692
 when 2066 then 20647693
 when 2070 then 20647694
 when 1097 then 20647695
 when 2068 then 20647696
 when 2065 then 20647697
 when 2069 then 20647698
 when 2114 then 20647699
 when 1339 then 20647700
 when 2064 then 20647701
 when 2073 then 20647702
 when 2106 then 20647703
 when 2105 then 20647704
 when 1549 then 20647705
 when 1349 then 20647706
 when 1152 then 20647707
 when 2034 then 20647708
 when 1156 then 20647709
 when 2071 then 20647710
 when 556 then 20647711
 when 1315 then 20647712
 when 1321 then 20647713
 when 2072 then 20647714
 when 357 then 20647715
 when 2109 then 20647716
 when 1556 then 20647717
 when 2111 then 20647718
 when 2112 then 20647719
 when 1377 then 20647720
 when 1942 then 20647721
 when 2113 then 20647722
 when 2067 then 20647723
 when 1538 then 20647724
 when 2058 then 20647725
 when 1869 then 20647726
 when 1858 then 20647727
 when 873 then 20647728
 when 1729 then 20647729
 when 1711 then 20647730
 when 1899 then 20647731
 when 1146 then 20647732
 when 176 then 20647733
 when 1153 then 20647734
 when 2107 then 20647735
 when 350 then 20647736
 when 522 then 20647737
 when 1154 then 20647738
 when 1734 then 20647739
 when 512 then 20647740
 when 1151 then 20647741
 when 1155 then 20647742
 when 1744 then 20647743
 when 163 then 20647744
 when 129 then 20647745
 when 1091 then 20647746
 when 816 then 20647747
 when 1181 then 20647748
 when 1528 then 20647749
 when 1566 then 20647750
 when 1519 then 20647751
 when 1523 then 20647752
 when 97 then 20647753
 when 841 then 20647754
 when 1368 then 20647755
 when 1106 then 20647756
 when 1914 then 20647757
 when 1322 then 20647758
 when 1355 then 20647759
 when 829 then 20647760
 when 2047 then 20647761
 when 2038 then 20647762
 when 1947 then 20647763
 when 391 then 20647764
 when 1044 then 20647765
 when 2116 then 20647766
 when 1874 then 20647767
 when 1395 then 20647768
 when 1757 then 20647769
 when 1461 then 20647770
 when 1059 then 20647771
 when 1881 then 20647772
 when 126 then 20647773
 when 1720 then 20647774
 when 135 then 20647775
 when 1716 then 20647776
 when 1251 then 20647777
 when 1710 then 20647778
 when 146 then 20647779
 when 1199 then 20647780
 when 368 then 20647781
 when 1038 then 20647782
 when 363 then 20647783
 when 139 then 20647784
 when 100 then 20647785
 when 436 then 20647786
 when 1928 then 20647787
 when 1085 then 20647788
 when 340 then 20647789
 when 954 then 20647790
 when 1397 then 20647791
 when 560 then 20647792
 when 547 then 20647793
 when 573 then 20647794
 when 791 then 20647795
 when 1462 then 20647796
 when 336 then 20647797
 when 1114 then 20647798
 when 1250 then 20647799
 when 1421 then 20647800
 when 1420 then 20647801
 when 1425 then 20647802
 when 1463 then 20647803
 when 527 then 20647804
 when 1972 then 20647805
 when 1973 then 20647806
 when 1200 then 20647807
 when 517 then 20647808
 when 376 then 20647809
 when 552 then 20647810
 when 1213 then 20647811
 when 805 then 20647812
 when 1618 then 20647813
 when 1930 then 20647814
 when 1115 then 20647815
 when 822 then 20647816
 when 732 then 20647817
 when 1202 then 20647818
 when 813 then 20647819
 when 1003 then 20647820
 when 796 then 20647821
 when 1004 then 20647822
 when 695 then 20647823
 when 1005 then 20647824
 when 997 then 20647825
 when 1423 then 20647826
 when 2108 then 20647827
 when 1394 then 20647828
 when 877 then 20647829
 when 696 then 20647830
 when 495 then 20647831
 when 1002 then 20647832
 when 1201 then 20647833
 when 914 then 20647834
 when 1617 then 20647836
 when 1396 then 20647837
 when 265 then 20647838
 when 269 then 20647839
 when 1000 then 20647840
 when 1971 then 20647841
 when 1929 then 20647842
 when 1006 then 20647843
 when 2085 then 20647844
 when 2091 then 20647845
 when 2074 then 20647846
 when 870 then 20647847
 when 266 then 20647848
 when 2075 then 20647849
 when 864 then 20647850
 when 1422 then 20647851
 when 996 then 20647852
 when 270 then 20647853
 when 1974 then 20647854
 when 267 then 20647855
 when 205 then 20647856
 when 1363 then 20647857
 when 555 then 20647858
 when 2142 then 20647859
 when 731 then 20647860
 when 1464 then 20647861
 when 2159 then 20647862
 when 1739 then 20647863
 when 1203 then 20647864
 when 1141 then 20647865
 when 1142 then 20647866
 when 2063 then 20647867
 when 2079 then 20647868
 when 733 then 20647869
 when 998 then 20647870
 when 1001 then 20647871
 when 2141 then 20647872
 when 1561 then 20647873
 when 891 then 20647874
 when 1102 then 20647875
 when 2146 then 20647876
 when 1127 then 20647877
 when 871 then 20647878
 when 999 then 20647879
 when 2147 then 20647880
 when 893 then 20647881
 when 863 then 20647882
 when 264 then 20647883
 when 913 then 20647884
 when 2134 then 20647885
 when 1133 then 20647886
 when 1136 then 20647887
 when 496 then 20647888
 when 358 then 20647889
 when 837 then 20647890
 when 912 then 20647891
 when 1235 then 20647892
 when 1168 then 20647893
 when 1236 then 20647894
 when 2080 then 20647895
 when 1238 then 20647896
 when 2008 then 20647897
 when 1894 then 20647898
 when 2090 then 20647899
 when 1171 then 20647900
 when 1261 then 20647901
 when 1260 then 20647902
 when 2136 then 20647903
 when 2076 then 20647904
 when 1222 then 20647905
 when 2135 then 20647906
 when 1241 then 20647907
 when 2140 then 20647908
 when 2137 then 20647909
 when 1247 then 20647910
 when 2138 then 20647911
 when 1271 then 20647912
 when 2125 then 20647913
 when 2153 then 20647914
 when 1224 then 20647915
 when 1447 then 20647916
 when 1116 then 20647917
 when 1430 then 20647918
 when 2077 then 20647919
 when 1227 then 20647920
 when 1117 then 20647921
 when 2083 then 20647922
 when 1126 then 20647923
 when 1490 then 20647924
 when 1170 then 20647925
 when 1243 then 20647926
 when 2139 then 20647927
 when 1259 then 20647928
 when 1248 then 20647929
 when 1223 then 20647930
 when 1225 then 20647931
 when 1237 then 20647932
 when 1226 then 20647933
 when 1240 then 20647934
 when 1234 then 20647935
 when 1469 then 20647936
 when 1328 then 20647937
 when 1482 then 20647938
 when 1327 then 20647939
 when 1246 then 20647940
 when 1434 then 20647941
 when 1239 then 20647942
 when 1245 then 20647943
 when 2145 then 20647944
 when 2144 then 20647945
 when 1432 then 20647946
 when 1442 then 20647947
 when 1263 then 20647948
 when 1443 then 20647949
 when 1467 then 20647950
 when 1486 then 20647951
 when 1488 then 20647952
 when 1387 then 20647953
 when 1481 then 20647954
 when 2126 then 20647955
 when 1134 then 20647956
 when 1415 then 20647957
 when 1242 then 20647958
 when 1427 then 20647959
 when 1593 then 20647960
 when 1403 then 20647961
 when 1428 then 20647962
 when 1489 then 20647963
 when 1135 then 20647964
 when 1244 then 20647965
 when 1265 then 20647966
 when 1385 then 20647967
 when 1616 then 20647968
 when 1386 then 20647969
 when 1267 then 20647970
 when 1270 then 20647971

end as id
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS empenho1,

JSON_QUERY(
(SELECT 

case l.cd_Empenho
 when 1249 then 20647972
 when 1419 then 20647973
 when 1603 then 20647974
 when 1409 then 20647975
 when 1426 then 20647976
 when 1614 then 20647977
 when 1615 then 20647978
 when 1637 then 20647979
 when 1638 then 20647980
 when 1404 then 20647981
 when 1809 then 20647982
 when 1431 then 20647983
 when 1406 then 20647984
 when 1608 then 20647985
 when 1408 then 20647986
 when 1664 then 20647987
 when 1820 then 20647988
 when 1653 then 20647989
 when 1610 then 20647990
 when 1628 then 20647991
 when 1654 then 20647992
 when 1264 then 20647993
 when 1758 then 20647994
 when 1266 then 20647995
 when 1790 then 20647996
 when 1433 then 20647997
 when 1326 then 20647998
 when 1418 then 20647999
 when 1837 then 20648000
 when 1771 then 20648001
 when 1652 then 20648002
 when 1607 then 20648003
 when 1799 then 20648004
 when 1435 then 20648005
 when 1439 then 20648006
 when 1801 then 20648007
 when 530 then 20648008
 when 1994 then 20648009
 when 1468 then 20648010
 when 1609 then 20648011
 when 640 then 20648012
 when 620 then 20648013
 when 1818 then 20648014
 when 1770 then 20648015
 when 1663 then 20648016
 when 1405 then 20648017
 when 1407 then 20648018
 when 1819 then 20648019
 when 597 then 20648020
 when 1800 then 20648021
 when 1639 then 20648022
 when 1808 then 20648023
 when 701 then 20648024
 when 1828 then 20648025
 when 1412 then 20648026
 when 1438 then 20648027
 when 1829 then 20648028
 when 1441 then 20648029
 when 1594 then 20648030
 when 1384 then 20648031
 when 1629 then 20648032
 when 1410 then 20648033
 when 1807 then 20648034
 when 1814 then 20648035
 when 1843 then 20648036
 when 1817 then 20648037
 when 1600 then 20648038
 when 702 then 20648039
 when 1833 then 20648040
 when 1922 then 20648041
 when 1414 then 20648042
 when 1839 then 20648043
 when 678 then 20648044
 when 1840 then 20648045
 when 1915 then 20648046
 when 1601 then 20648047
 when 1921 then 20648048
 when 1838 then 20648049
 when 1834 then 20648050
 when 1991 then 20648051
 when 1595 then 20648052
 when 1835 then 20648053
 when 1841 then 20648054
 when 1992 then 20648055
 when 1996 then 20648056
 when 680 then 20648057
 when 1604 then 20648058
 when 1602 then 20648059
 when 1836 then 20648060
 when 1662 then 20648061
 when 1982 then 20648062
 when 1630 then 20648063
 when 2006 then 20648064
 when 1948 then 20648065
 when 1967 then 20648066
 when 1781 then 20648067
 when 586 then 20648068
 when 1764 then 20648069
 when 605 then 20648070
 when 688 then 20648071
 when 606 then 20648072
 when 608 then 20648073
 when 1776 then 20648074
 when 671 then 20648075
 when 685 then 20648076
 when 1813 then 20648077
 when 673 then 20648078
 when 1788 then 20648079
 when 742 then 20648080
 when 1821 then 20648081
 when 2051 then 20648082
 when 1825 then 20648083
 when 1789 then 20648084
 when 622 then 20648085
 when 690 then 20648086
 when 734 then 20648087
 when 743 then 20648088
 when 735 then 20648089
 when 736 then 20648090
 when 588 then 20648091
 when 1827 then 20648092
 when 603 then 20648093
 when 596 then 20648094
 when 741 then 20648095
 when 1977 then 20648096
 when 1995 then 20648097
 when 1968 then 20648098
 when 1964 then 20648099
 when 641 then 20648100
 when 1969 then 20648101
 when 604 then 20648102
 when 704 then 20648103
 when 1830 then 20648104
 when 713 then 20648105
 when 712 then 20648106
 when 642 then 20648107
 when 1983 then 20648108
 when 1987 then 20648109
 when 1993 then 20648110
 when 684 then 20648111
 when 687 then 20648112
 when 607 then 20648113
 when 1963 then 20648114
 when 610 then 20648115
 when 630 then 20648116
 when 700 then 20648117
 when 689 then 20648118
 when 672 then 20648119
 when 632 then 20648120
 when 631 then 20648121
 when 637 then 20648122
 when 681 then 20648123
 when 626 then 20648124
 when 587 then 20648125
 when 686 then 20648126
 when 602 then 20648127
 when 645 then 20648128
 when 703 then 20648129
 when 675 then 20648130
 when 674 then 20648131
 when 679 then 20648132
 when 682 then 20648133
 when 683 then 20648134
 when 744 then 20648136
 when 746 then 20648137
 when 745 then 20648138
 when 834 then 20648139
 when 883 then 20648140
 when 866 then 20648141
 when 885 then 20648142
 when 917 then 20648143
 when 867 then 20648144
 when 1007 then 20648145
 when 915 then 20648146
 when 862 then 20648147
 when 1009 then 20648148
 when 832 then 20648149
 when 887 then 20648150
 when 972 then 20648151
 when 1011 then 20648152
 when 903 then 20648153
 when 937 then 20648154
 when 916 then 20648155
 when 833 then 20648156
 when 1008 then 20648157
 when 956 then 20648158
 when 927 then 20648159
 when 886 then 20648160
 when 959 then 20648161
 when 968 then 20648162
 when 971 then 20648163
 when 918 then 20648164
 when 342 then 20648165
 when 938 then 20648166
 when 286 then 20648167
 when 983 then 20648168
 when 984 then 20648169
 when 884 then 20648170
 when 275 then 20648171
 when 905 then 20648172
 when 277 then 20648173
 when 973 then 20648174
 when 985 then 20648175
 when 957 then 20648176
 when 309 then 20648177
 when 494 then 20648178
 when 305 then 20648179
 when 987 then 20648180
 when 967 then 20648181
 when 268 then 20648182
 when 276 then 20648183
 when 312 then 20648184
 when 467 then 20648185
 when 958 then 20648186
 when 500 then 20648187
 when 979 then 20648188
 when 464 then 20648189
 when 466 then 20648190
 when 975 then 20648191
 when 287 then 20648192
 when 453 then 20648193
 when 483 then 20648194
 when 986 then 20648195
 when 484 then 20648196
 when 343 then 20648197
 when 501 then 20648198
 when 978 then 20648199
 when 344 then 20648200
 when 934 then 20648201
 when 281 then 20648202
 when 306 then 20648203
 when 285 then 20648204
 when 503 then 20648205
 when 487 then 20648206
 when 308 then 20648207
 when 213 then 20648208
 when 416 then 20648209
 when 451 then 20648210
 when 465 then 20648211
 when 476 then 20648212
 when 457 then 20648213
 when 250 then 20648214
 when 485 then 20648215
 when 169 then 20648216
 when 171 then 20648217
 when 434 then 20648218
 when 493 then 20648219
 when 450 then 20648220
 when 447 then 20648221
 when 260 then 20648222
 when 256 then 20648223
 when 208 then 20648224
 when 425 then 20648225
 when 486 then 20648226
 when 251 then 20648227
 when 475 then 20648228
 when 504 then 20648229
 when 406 then 20648230
 when 55 then 20648231
 when 193 then 20648232
 when 236 then 20648233
 when 239 then 20648234
 when 247 then 20648235
 when 72 then 20648236
 when 452 then 20648237
 when 414 then 20648238
 when 59 then 20648239
 when 424 then 20648240
 when 64 then 20648241
 when 43 then 20648242
 when 74 then 20648243
 when 79 then 20648244
 when 1589 then 20648245
 when 5 then 20648246
 when 6 then 20648247
 when 456 then 20648248
 when 204 then 20648249
 when 426 then 20648250
 when 262 then 20648251
 when 13 then 20648252
 when 259 then 20648253
 when 246 then 20648254
 when 192 then 20648255
 when 50 then 20648256
 when 194 then 20648257
 when 8 then 20648258
 when 75 then 20648259
 when 245 then 20648260
 when 965 then 20648261
 when 1216 then 20648262
 when 77 then 20648263
 when 1590 then 20648264
 when 1658 then 20648265
 when 1219 then 20648266
 when 196 then 20648267
 when 1659 then 20648268
 when 9 then 20648269
 when 1586 then 20648270
 when 14 then 20648271
 when 1643 then 20648272
 when 1218 then 20648273
 when 725 then 20648274
 when 1644 then 20648275
 when 667 then 20648276
 when 207 then 20648277
 when 188 then 20648278
 when 1424 then 20648279
 when 1979 then 20648280
 when 1656 then 20648281
 when 1657 then 20648282
 when 240 then 20648283
 when 12 then 20648284
 when 1796 then 20648285
 when 1981 then 20648286
 when 181 then 20648287
 when 190 then 20648288
 when 407 then 20648289
 when 1444 then 20648290
 when 1217 then 20648291
 when 1585 then 20648292
 when 1660 then 20648293
 when 1961 then 20648294
 when 1388 then 20648295
 when 51 then 20648296
 when 726 then 20648297
 when 76 then 20648298
 when 189 then 20648299
 when 1215 then 20648300
 when 1391 then 20648301
 when 2163 then 20648302
 when 1787 then 20648303
 when 1359 then 20648304
 when 78 then 20648305
 when 1797 then 20648306
 when 185 then 20648307
 when 1980 then 20648308
 when 1360 then 20648309
 when 1613 then 20648310
 when 1791 then 20648311
 when 7 then 20648312
 when 10 then 20648313
 when 191 then 20648314
 when 1795 then 20648315
 when 966 then 20648316
 when 186 then 20648317
 when 1381 then 20648318
 when 1588 then 20648319
 when 1794 then 20648320
 when 1592 then 20648321
 when 1220 then 20648322
 when 1392 then 20648323
 when 1962 then 20648324
 when 1382 then 20648325
 when 1214 then 20648326
 when 1661 then 20648327
 when 52 then 20648328
 when 1793 then 20648329
 when 2162 then 20648330
 when 187 then 20648331
 when 1978 then 20648332
 when 183 then 20648333
 when 1383 then 20648334
 when 1390 then 20648335
 when 1583 then 20648336
 when 1923 then 20648337
 when 1584 then 20648338
 when 197 then 20648339
 when 489 then 20648340
 when 740 then 20648341
 when 499 then 20648342
 when 431 then 20648343
 when 293 then 20648344
 when 488 then 20648345
 when 1798 then 20648346
 when 460 then 20648347
 when 2127 then 20648348
 when 23 then 20648349
 when 20 then 20648350
 when 935 then 20648351
 when 294 then 20648352
 when 992 then 20648353
 when 1587 then 20648354
 when 925 then 20648355
 when 2098 then 20648356
 when 994 then 20648357
 when 178 then 20648358
 when 432 then 20648359
 when 291 then 20648360
 when 179 then 20648361
 when 201 then 20648362
 when 16 then 20648363
 when 697 then 20648364
 when 2100 then 20648365
 when 18 then 20648366
 when 1172 then 20648367
 when 84 then 20648368
 when 920 then 20648369
 when 668 then 20648370
 when 283 then 20648371
 when 1174 then 20648372
 when 923 then 20648373
 when 263 then 20648374
 when 919 then 20648375
 when 284 then 20648376
 when 1792 then 20648377
 when 1591 then 20648378
 when 1949 then 20648379
 when 1631 then 20648380
 when 1623 then 20648381
 when 292 then 20648382
 when 1450 then 20648383
 when 1449 then 20648384
 when 282 then 20648385
 when 21 then 20648386
 when 1842 then 20648387
 when 1160 then 20648388
 when 1446 then 20648389
 when 1161 then 20648390
 when 253 then 20648391
 when 1445 then 20648392
 when 1158 then 20648393
 when 939 then 20648394
 when 1162 then 20648395
 when 1159 then 20648396
 when 2164 then 20648397
 when 254 then 20648398
 when 2082 then 20648399
 when 19 then 20648400
 when 1165 then 20648401
 when 1163 then 20648402
 when 669 then 20648403
 when 623 then 20648404
 when 1666 then 20648405
 when 1766 then 20648406
 when 2084 then 20648407
 when 1485 then 20648408
 when 929 then 20648409
 when 252 then 20648410
 when 1164 then 20648411
 when 200 then 20648412
 when 670 then 20648413
 when 1173 then 20648414
 when 1448 then 20648415
 when 249 then 20648416
 when 261 then 20648417
 when 17 then 20648418
 when 63 then 20648419
 when 463 then 20648420
 when 1124 then 20648421
 when 198 then 20648422
 when 206 then 20648423
 when 625 then 20648424
 when 180 then 20648425
 when 418 then 20648426
 when 926 then 20648427
 when 1665 then 20648428
 when 1484 then 20648429
 when 307 then 20648430
 when 258 then 20648431
 when 257 then 20648432
 when 199 then 20648433
 when 988 then 20648434
 when 248 then 20648435
 when 202 then 20648436
 when 290 then 20648437
 when 1596 then 20648438
 when 922 then 20648439
 when 24 then 20648440
 when 346 then 20648441
 when 48 then 20648442
 when 990 then 20648443
 when 49 then 20648444
 when 408 then 20648445
 when 1389 then 20648446
 when 345 then 20648447
 when 435 then 20648448
 when 993 then 20648449
 when 991 then 20648450
 when 46 then 20648451
 when 2007 then 20648452
 when 1118 then 20648453
 when 2052 then 20648454
 when 617 then 20648455
 when 1924 then 20648456
 when 924 then 20648457
 when 439 then 20648458
 when 621 then 20648459
 when 505 then 20648460
 when 461 then 20648461
 when 1487 then 20648462
 when 474 then 20648463
 when 2118 then 20648464
 when 502 then 20648465
 when 1393 then 20648466
 when 1019 then 20648467
 when 490 then 20648468
 when 1429 then 20648469
 when 2078 then 20648470
 when 1262 then 20648471
 when 1278 then 20648472
 when 910 then 20648473
 when 1877 then 20648474
 when 950 then 20648475
 when 995 then 20648476
 when 647 then 20648477
 when 1131 then 20648478
 when 1582 then 20648479
 when 1178 then 20648480
 when 921 then 20648481
 when 1465 then 20648482
 when 865 then 20648483
 when 1738 then 20648484
 when 1893 then 20648485
 when 1132 then 20648486
 when 936 then 20648487
 when 969 then 20648488
 when 989 then 20648489
 when 2054 then 20648490
 when 1120 then 20648491
 when 2041 then 20648492
 when 1655 then 20648493
 when 1731 then 20648494
 when 1018 then 20648495
 when 1125 then 20648496
 when 1221 then 20648497
 when 1723 then 20648498
 when 2120 then 20648499
 when 1081 then 20648500
 when 1542 then 20648501
 when 648 then 20648502
 when 1129 then 20648503
 when 1143 then 20648504
 when 569 then 20648505
 when 1772 then 20648506
 when 1101 then 20648507
 when 1177 then 20648508
 when 1343 then 20648509
 when 815 then 20648510
 when 1380 then 20648511
 when 1130 then 20648512
 when 142 then 20648513
 when 1822 then 20648514
 when 1531 then 20648515
 when 1325 then 20648516
 when 443 then 20648517
 when 1273 then 20648518
 when 1144 then 20648519
 when 1121 then 20648520
 when 799 then 20648521
 when 1123 then 20648522
 when 1625 then 20648523
 when 1775 then 20648524
 when 1823 then 20648525
 when 2110 then 20648526
 when 1824 then 20648527
 when 970 then 20648528
 when 1861 then 20648529
 when 2128 then 20648530
 when 1089 then 20648531
 when 1416 then 20648532
 when 89 then 20648533
 when 1907 then 20648534
 when 1362 then 20648535
 when 519 then 20648536
 when 1786 then 20648537
 when 2062 then 20648538
 when 1862 then 20648539
 when 1332 then 20648540
 when 1649 then 20648541
 when 372 then 20648542
 when 1351 then 20648543
 when 445 then 20648544
 when 385 then 20648545
 when 1560 then 20648546
 when 1945 then 20648547
 when 554 then 20648548
 when 159 then 20648549
 when 1323 then 20648550
 when 599 then 20648551
 when 1650 then 20648552
 when 1752 then 20648553
 when 644 then 20648554
 when 1651 then 20648555
 when 598 then 20648556
 when 1626 then 20648557
 when 748 then 20648558
 when 600 then 20648559
 when 825 then 20648560
 when 1975 then 20648561
 when 2143 then 20648562
 when 1703 then 20648563
 when 1090 then 20648564
 when 1551 then 20648565
 when 836 then 20648566
 when 549 then 20648567
 when 1635 then 20648568
 when 1232 then 20648569
 when 1198 then 20648570
 when 1032 then 20648571
 when 444 then 20648572
 when 446 then 20648573
 when 356 then 20648574
 when 1627 then 20648575
 when 706 then 20648576
 when 365 then 20648577
 when 1636 then 20648578
 when 128 then 20648579
 when 705 then 20648580
 when 173 then 20648581
 when 643 then 20648582
 when 1324 then 20648583
 when 1753 then 20648584
 when 2081 then 20648585
 when 639 then 20648586
 when 638 then 20648587
 when 57 then 20648588
 when 56 then 20648589
 when 58 then 20648590
 when 1068 then 20648604
 when 1378 then 20648606

end as id
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS empenho2,
l.dt_Liquida  as data,
l.vl_Empenho              as valor,
l.ds_Liquidacao   as especificacao,
l.cd_Liquidacao as numeroCadastro,
JSON_QUERY(
                        (SELECT


JSON_QUERY(
                        (SELECT
                        case  r.ds_receita
when 'CONSIGANDO SICOOB CREDIP - PMP' then 67051
when 'CONSIGNADO BANCO BRADESCO - PMP' then 67049
when 'CONSIGNADO BANCO CAIXA ECONÔMICA FEDERAL - PMP' then 67050
when 'DESCONTO COMPRA SINSEZMAT - PMP' then 67054
when 'CONTRIBUIÇÃO MENSAL SINSEZMAT - PMP' then 67052
when 'CONTRIBUIÇÃO MENSAL SINTERO - PMP' then 67053
when 'IMPOSTO DE RENDA RETIDO NA FONTE - PMP' then 67055
when 'INSS EMPREGADO - PMP' then 67056
when 'PENSÃO JUDICIAL ALIMENTÍCIA - PMP' then 67057
when 'RETENÇÃO JUDICIAL RETIDO DE SERVIDOR - PMP' then 67060
when 'RETENÇÃO - IRPJ' then 67059
when 'RETENÇÃO - IRPF' then 67058
when 'CAMARA MUNICIPAL' then 16618
when 'DESPESAS FUNDO MUNICIPAL DE SAUDE' then 16619
when 'FUNDO MUN. DE ASSISTENCIA SOCIAL'  then 16620
when 'RETENÇÃO DE ISS - PESSOA JURÍDICA' then 67139
when 'SENAR - PREST. DE SERV. PESSOA FÍSICA PROD. RURAL' then 67143
when 'CONSIGNADO BANCO BRADESCO - PMP' then 67049
when 'CONSIGNADO BANCO CAIXA ECONÔMICA FEDERAL - PMP' then 67050
when 'CONSIGNADO SICOOB CREDIP - PMP' then 67051
when 'CONTRIBUIÇÃO MENSAL SINSEZMAT - PMP' then 67052
when 'CONTRIBUIÇÃO MENSAL SINTERO - PMP' then 67053
when 'DESCONTO COMPRA SINSEZMAT - PMP' then 67054
when 'IMPOSTO DE RENDA RETIDO NA FONTE - PMP' then 67055
when 'INSS EMPREGADO - PMP' then 67056
when 'PENSÃO JUDICIAL ALIMENTÍCIA - PMP' then 67057
when 'RETENÇÃO - IRPF' then 67058
when 'RETENÇÃO - IRPJ' then 67059
when 'RETENÇÃO JUDICIAL RETIDO DE SERVIDOR - PMP' then 67060
when 'RETENÇÃO DE ISS - PESSOA JURIDICA' then 67139
when 'RETENÇÃO DE ISS - PESSOA FÍSICA' then 67140
when 'INSS - PREST. DE SERVIÇOS PESSOA JURIDICA' then 67141
when 'INSS - PREST. DE SERV. PESSOA FÍSICA PROD. RURAL'then 67142
when 'SENAR - PREST. DE SERV. PESSOA FÍSICA PROD. RURAL' then 67143
when 'RAT - PREST. DE SERV. PESSOA FÍSICA PROD. RURAL' then 67144
when 'INSS - PREST. DE SERV. PESSOA JURIDICA PROD. RURAL' then 67145
when 'RAT - PREST. DE SERV. PESSOA JURIDICA PROD. RURAL' then 67146
when 'SENAR - PREST. DE SERV. PESSOA JURIDICA PROD. RURA' then 67147
when 'INSS - PRESTAÇÃO DE SERV. ADICIONAL 2%' then 67148
when 'INSS - PRESTAÇÃO DE SERV. ADICIONAL 3%' then 67149
when 'INSS - PRESTAÇÃO DE SERV. ADICIONAL 4%' then 67150
when 'INSS - FOLHA DE PAGAMENTO' then 67151
when 'TAXA NEGATIVA - PM PARECIS' then 67206
when 'TAXA NEGATIVA - EDUCAÇÃO 25% PM PARECIS' then 67207

                                    end as id
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS retencao,
	 rt.vl_Retencao as valor,
JSON_QUERY(
(SELECT

JSON_QUERY(
(SELECT
case e.cd_DestinacaoRecurso

 when 250000000000 then 774124
 when 250000150000 then 774125
 when 250000250000 then 774126
 when 250100000000 then 774127
 when 250200000000 then 774128
 when 250200150000 then 774129
 when 250200250000 then 774130
 when 254000000000 then 774131
 when 254000300000 then 774132
 when 254000700000 then 774133
 when 254100000000 then 774134
 when 254100300000 then 774135
 when 254100700000 then 774136
 when 254200000000 then 774137
 when 254200300000 then 774138
 when 254200700000 then 774139
 when 254300000000 then 774140
 when 254400000000 then 774141
 when 255000000000 then 774142
 when 255100000000 then 774143
 when 255200000000 then 774144
 when 255300000000 then 774145
 when 256900000000 then 774146
 when 257000000000 then 774147
 when 257100000000 then 774148
 when 257200000000 then 774149
 when 257300000000 then 774150
 when 257400000000 then 774151
 when 257500000000 then 774152
 when 257600000000 then 774153
 when 259900000000 then 774154
 when 260000000000 then 774155
 when 260100000000 then 774156
 when 260200000000 then 774157
 when 260300000000 then 774158
 when 260400000000 then 774159
 when 260500000000 then 774160
 when 262100000000 then 774161
 when 262200000000 then 774162
 when 263100000000 then 774163
 when 263200000000 then 774164
 when 263300000000 then 774165
 when 263400000000 then 774166
 when 263500000000 then 774167
 when 263600000000 then 774168
 when 265900000000 then 774169
 when 266000000000 then 774170
 when 266100000000 then 774171
 when 266200000000 then 774172
 when 266500000000 then 774173
 when 266900000000 then 774174
 when 270000000000 then 774175
 when 270100000000 then 774176
 when 270200000000 then 774177
 when 270300000000 then 774178
 when 270500000000 then 774179
 when 270600000000 then 774180
 when 270600003110 then 774181
 when 270600003120 then 774182
 when 270700000000 then 774183
 when 270800000000 then 774184
 when 270900000000 then 774185
 when 271000000000 then 774186
 when 271000003210 then 774187
 when 271000003220 then 774188
 when 271100000000 then 774189
 when 271200000000 then 774190
 when 271300000000 then 774191
 when 271400000000 then 774192
 when 271500000000 then 774193
 when 271600000000 then 774194
 when 271700000000 then 774195
 when 271800000000 then 774196
 when 271900000000 then 774197
 when 271900250000 then 774198
 when 272000000000 then 774199
 when 272100000000 then 774200
 when 274900000000 then 774201
 when 275000000000 then 774202
 when 275100000000 then 774203
 when 275200000000 then 774204
 when 275300000000 then 774205
 when 275400000000 then 774206
 when 275500000000 then 774207
 when 275600000000 then 774208
 when 275700000000 then 774209
 when 275800000000 then 774210
 when 275900000000 then 774211
 when 276000000000 then 774212
 when 276100000000 then 774213
 when 279900000000 then 774214
 when 280000000000 then 774215
 when 280000001111 then 774216
 when 280000001121 then 774217
 when 280100000000 then 774218
 when 280100002111 then 774219
 when 280100002121 then 774220
 when 280200000000 then 774221
 when 280300000000 then 774223
 when 286000000000 then 774224
 when 286100000000 then 774225
 when 286200000000 then 774226
 when 286900000000 then 774227
 when 288000000000 then 774228
 when 289800000000 then 774229
 when 289900000000 then 774230
 when 150000000000 then 774231
 when 150000150000 then 774232
 when 150000250000 then 774233
 when 150100000000 then 774234
 when 150200000000 then 774235
 when 150200150000 then 774236
 when 150200250000 then 774237
 when 154000000000 then 774238
 when 154000300000 then 774239
 when 154000700000 then 774240
 when 154100000000 then 774241
 when 154100300000 then 774242
 when 154100700000 then 774243
 when 154200000000 then 774244
 when 154200300000 then 774245
 when 154200700000 then 774246
 when 154300000000 then 774247
 when 154400000000 then 774248
 when 155000000000 then 774249
 when 155100000000 then 774250
 when 155200000000 then 774251
 when 155300000000 then 774252
 when 156900000000 then 774253
 when 157000000000 then 774254
 when 157100000000 then 774255
 when 157200000000 then 774256
 when 157300000000 then 774257
 when 157400000000 then 774258
 when 157500000000 then 774259
 when 157600000000 then 774260
 when 159900000000 then 774261
 when 160000000000 then 774262
 when 160100000000 then 774263
 when 160200000000 then 774264
 when 160300000000 then 774265
 when 160400000000 then 774266
 when 160500000000 then 774267
 when 162100000000 then 774268
 when 162200000000 then 774269
 when 163100000000 then 774270
 when 163200000000 then 774271
 when 163300000000 then 774272
 when 163400000000 then 774273
 when 163500000000 then 774274
 when 163600000000 then 774275
 when 165900000000 then 774276
 when 166000000000 then 774277
 when 166100000000 then 774278
 when 166200000000 then 774279
 when 166500000000 then 774280
 when 166900000000 then 774281
 when 170000000000 then 774282
 when 170100000000 then 774283
 when 170200000000 then 774284
 when 170300000000 then 774285
 when 170500000000 then 774286
 when 170600000000 then 774287
 when 170600003110 then 774288
 when 170600003120 then 774289
 when 170700000000 then 774290
 when 170800000000 then 774291
 when 170900000000 then 774292
 when 171000000000 then 774293
 when 171000003210 then 774294
 when 171000003220 then 774295
 when 171100000000 then 774296
 when 171200000000 then 774297
 when 171300000000 then 774298
 when 171400000000 then 774299
 when 171500000000 then 774300
 when 171600000000 then 774301
 when 171700000000 then 774302
 when 171800000000 then 774303
 when 171900000000 then 774304
 when 171900250000 then 774305
 when 172000000000 then 774306
 when 172100000000 then 774307
 when 174900000000 then 774308
 when 175000000000 then 774309
 when 175100000000 then 774310
 when 175200000000 then 774311
 when 175300000000 then 774312
 when 175400000000 then 774313
 when 175500000000 then 774314
 when 175600000000 then 774315
 when 175700000000 then 774316
 when 175800000000 then 774317
 when 175900000000 then 774318
 when 176000000000 then 774319
 when 176100000000 then 774320
 when 179900000000 then 774321
 when 180000000000 then 774322
 when 180000001111 then 774323
 when 180000001121 then 774324
 when 180100000000 then 774325
 when 180100002111 then 774326
 when 180100002121 then 774327
 when 180200000000 then 774328
 when 180300000000 then 774329
 when 186000000000 then 774330
 when 186100000000 then 774331
 when 186200000000 then 774332
 when 186900000000 then 774333
 when 188000000000 then 774334
 when 189800000000 then 774335
 when 189900000000 then 774336
                            end as id

   FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS recurso,
		rt.vl_Retencao	as	valor
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS recursos
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS retencoes,
JSON_QUERY(
(SELECT
JSON_QUERY(
(SELECT

case dc.cd_Liquidacao

  when 263 then 41584506
when 303 then 41584516
when 268 then 41584557
when 307 then 41584580
when 519 then 41584699
when 548 then 41584721
when 537 then 41584803
when 584 then 41584828
when 516 then 41584831
when 794 then 41584978
when 780 then 41584999
when 786 then 41585008
when 1134 then 41585228
when 1182 then 41585263
when 1171 then 41585264
when 1141 then 41585281
when 1172 then 41585335
when 1232 then 41585383
when 1443 then 41585530
when 1550 then 41585562
when 1445 then 41585586
when 1485 then 41585638
when 1546 then 41585642
when 1444 then 41585653
when 1483 then 41585655
when 1619 then 41585724
when 1917 then 41585821
when 1940 then 41585922
when 1919 then 41585956
when 1823 then 41585959
when 1920 then 41585974
when 1929 then 41585976
when 1829 then 41585981
when 1862 then 41585983
when 1824 then 41585991
when 1938 then 41586013
when 1913 then 41586021
when 1914 then 41586026
when 1816 then 41586033
when 1960 then 41586040
when 1962 then 41586047
when 1933 then 41586059
when 2154 then 41586115
when 2094 then 41586134
when 2076 then 41586154
when 2077 then 41586155
when 2136 then 41586166
when 2138 then 41586171
when 2140 then 41586173
when 2152 then 41586175
when 2116 then 41586177
when 2221 then 41586178
when 2135 then 41586186
when 2134 then 41586189
when 2151 then 41586200
when 2160 then 41586205
when 2085 then 41586218
when 2179 then 41586222
when 2127 then 41586226
when 2128 then 41586231
when 2130 then 41586235
when 2132 then 41586247
when 2159 then 41586252
when 2153 then 41586254
when 2161 then 41586259
when 2251 then 41586261
when 2249 then 41586275
when 2222 then 41586291
when 2212 then 41586295
when 2250 then 41586326
when 2223 then 41586329
when 2377 then 41586375
when 2380 then 41586390
when 2378 then 41586392
when 2376 then 41586401
when 2384 then 41586406
when 2373 then 41586408
when 2375 then 41586411
when 2374 then 41586415
when 2389 then 41586417
when 2391 then 41586419
when 2392 then 41586423
when 2395 then 41586424
when 2396 then 41586426
when 2397 then 41586427
when 2429 then 41586431
when 2399 then 41586436
when 2442 then 41586438
when 2400 then 41586442
when 2430 then 41586454
when 2538 then 41586459
when 2552 then 41586462
when 2443 then 41586463
when 2431 then 41586466
when 2509 then 41586467
when 2466 then 41586474
when 2464 then 41586480
when 2441 then 41586493
when 2502 then 41586532
when 2465 then 41586534
when 2501 then 41586554
when 2553 then 41586573
when 2614 then 41586582
when 2671 then 41586604
when 2685 then 41586618
when 2683 then 41586638
when 2760 then 41586643
when 2695 then 41586645
when 2693 then 41586664
when 2681 then 41586671
when 2756 then 41586679
when 2802 then 41586685
when 2801 then 41586688
when 2675 then 41586695
when 2561 then 41586697
when 2800 then 41586700
when 2737 then 41586712
when 2771 then 41586717
when 2670 then 41586718
when 2724 then 41586723
when 2807 then 41586739
when 2696 then 41586746
when 2677 then 41586750
when 2682 then 41586751
when 2813 then 41586754
when 2723 then 41586756
when 2734 then 41586758
when 2772 then 41586759
when 2773 then 41586764
when 2777 then 41586765
when 2834 then 41586775
when 2837 then 41586777
when 2835 then 41586781
when 2920 then 41586804
when 2926 then 41586805
when 2914 then 41586809
when 2917 then 41586819
when 2929 then 41586828
when 2928 then 41586834
when 2921 then 41586835
when 2939 then 41586840
when 2940 then 41586843
when 2922 then 41586846
when 2919 then 41586849
when 2925 then 41586852
when 2931 then 41586859
when 2935 then 41586863
when 2949 then 41586871
when 2937 then 41586874
when 2918 then 41586875
when 2916 then 41586880
when 2943 then 41586882
when 2924 then 41586887
when 2933 then 41586902
when 2941 then 41586914
when 2938 then 41586916
when 2965 then 41586921
when 2936 then 41586926
when 2964 then 41586927
when 2923 then 41586935
when 2948 then 41586940
when 2947 then 41586941

 

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
on l.cd_Liquidacao = dc.cd_Liquidacao
and l.cd_Cecam = dc.cd_Cecam
inner join CONTEMPENHOLIQUIDACAORETENCAO rt
on  l.cd_Liquidacao = rt.cd_Liquidacao 
AND l.cd_Cecam = rt.cd_Cecam
inner join CONTFICHARECEITA r
on rt.cd_FichaRec = r.cd_ficharec
and rt.cd_Cecam = r.cd_cecam
inner join CONTEMPENHOS e 
on l.cd_Liquidacao = e.cd_Liquidacao
and l.cd_Cecam = e.cd_cecam
where l.fl_tipo = 'L'
AND l.cd_Cecam = 1995
and l.cd_Empenho not in (select cd_empenho from CONTEMPENHOS
where  cd_Cecam = 1995
and (dt_emissao = '2024-01-01 00:00:00.000' or cd_fichadesp > 5000))
--and r.cd_ficharec not like '53%'
and dc.cd_Liquidacao  in (1913,
1914,
1917,
1940,
2249,
2250,
2251,
2442,
2443,
2502,
2552,
2553,
2561,
2670,
2671,
2723,
2724,
2771,
2772,
2773,
2801,
2802,
2813,
2837,
2916,
2917,
2920,
2923,
2924,
2925,
2926,
2928,
2929,
2931,
2933,
2935,
2936,
2937,
2938,
2939,
2940,
2941,
2943,
2947,
2964)
order by dc.cd_Liquidacao
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        let transformedData = resultData.map(record => {
            try {
                // Parse the JSON content field
                const content = JSON.parse(record.content);
                
                // Determine the valid empenho field
                const empenhoId = content.empenho1 && content.empenho1.id
                    ? content.empenho1.id
                    : (content.empenho2 && content.empenho2.id ? content.empenho2.id : null);
        
                // Determine the valid comprovante field
                const comprovanteId = content.comprovantes.comprovante && content.comprovantes.comprovante.id
                    ? content.comprovantes.comprovante.id
                    : null;
        
                return {
                    idIntegracao: record.idIntegracao ? record.idIntegracao.toString() : "1",
                    content: {
                        validaSaldo: content.validaSaldo === "true",
                        exercicio: content.exercicio || 2024,
                        empenho: {
                            id: empenhoId
                        },
                        data: content.data ? formatDate(content.data) : null,
                        valor: content.valor || 0,
                        especificacao: content.especificacao || "",
                        numeroCadastro: content.numeroCadastro || null,
                        retencoes: content.retencoes ? [{
                            retencao: {
                                id: content.retencoes.retencao.id
                            },
                            valor: content.retencoes.valor || 0,
                            recursos: [{
                                recurso: {
                                    id: content.retencoes.recursos.recurso.id
                                },
                                valor: content.retencoes.recursos.valor || 0
                            }]
                        }] : [],
                        comprovantes: comprovanteId ? [{
                            comprovante: {
                                id: comprovanteId
                            },
                            valor: content.comprovantes.valor || 0
                        }] : []
                    }
                };
            } catch (error) {
                console.error('Erro ao processar registro:', error);
                return null;
            }
        }).filter(record => record !== null);

        // Unify 'retencoes' for duplicate idIntegracao
        transformedData = unifyRetencoes(transformedData);

        /* const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        return  */

        const chunkArray = (array, size) => {
            const chunked = [];
            for (let i = 0; i < array.length; i += size) {
                chunked.push(array.slice(i, i + size));
            }
            return chunked;
        };
        
        const batchedData = chunkArray(transformedData, 50);
        let report = [];
        let reportIds = [];
        
        for (const batch of batchedData) {
            try {
                console.log('Sending the following payload to the API:', JSON.stringify(batch, null, 2));
        
                const response = await fetch(`https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/liquidacoes`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 25a840ae-b57a-4030-903a-bcccf2386f30'
                    },
                    body: JSON.stringify(batch)
                });
        
                const responseBody = await response.json();
        
                if (response.ok) {
                    console.log('Data successfully sent to the API.');
                    batch.forEach(record => {
                        report.push({ record, status: 'success', response: responseBody });
                    });
        
                    if (responseBody.idLote) {
                        reportIds.push(responseBody.idLote);
                    }
                } else {
                    console.error('Error sending data to API:', response.statusText);
                    batch.forEach(record => {
                        report.push({ record, status: 'failed', response: responseBody });
                    });
                }
            } catch (err) {
                console.error('Error sending batch to API:', err);
                batch.forEach(record => {
                    report.push({ record, status: 'error', error: err.message });
                });
            }
        }
        
        // Save the report in 'report.json'
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));
        console.log('Report saved to report.json successfully.');
        
        // Save the reportIds in 'report_id.json'
        fs.writeFileSync('report_id.json', JSON.stringify(reportIds, null, 2));
        console.log('report_id.json saved successfully.');
        
    } catch (error) {
        console.error('Erro no processo:', error);
    } finally {
        await sql.close();
        console.log('Conexão com o SQL Server fechada.');
    }
}

// Execute the main function
main();