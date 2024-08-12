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
            select
JSON_QUERY(
    (SELECT
   3111103 as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS Baixa,
JSON_QUERY(
    (SELECT
 Case bp.nr_chapa
 when        42        then        15598769
when        43        then        15598770
when        44        then        15598771
when        46        then        15598772
when        134        then        15598825
when        151        then        15598831
when        288        then        15598896
when        303        then        15598907
when        312        then        15598915
when        528        then        15599129
when        566        then        15599131
when        865        then        15599164
when        978        then        15599262
when        997        then        15599263
when        998        then        15599264
when        999        then        15599265
when        1131        then        15599268
when        1132        then        15599269
when        1144        then        15599276
when        1158        then        15599277
when        1159        then        15599278
when        1160        then        15599279
when        1180        then        15599282
when        1181        then        15599283
when        1356        then        15599284
when        1376        then        15599285
when        1396        then        15599286
when        1397        then        15599287
when        1398        then        15599288
when        1399        then        15599289
when        1400        then        15599290
when        1402        then        15599291
when        1414        then        15599292
when        1424        then        15599293
when        1425        then        15599294
when        1426        then        15599295
when        1444        then        15599296
when        1445        then        15599297
when        1561        then        15599299
when        1783        then        15599300
when        1798        then        15599301
when        1804        then        15599302
when        1832        then        15599303
when        1915        then        15599304
when        1957        then        15599305
when        1959        then        15599306
when        1966        then        15599307
when        1968        then        15599308
when        1969        then        15599309
when        1970        then        15599310
when        1971        then        15599311
when        1972        then        15599312
when        1973        then        15599313
when        1974        then        15599314
when        1975        then        15599315
when        1976        then        15599316
when        1986        then        15599317
when        1987        then        15599318
when        1988        then        15599319
when        1989        then        15599320
when        1990        then        15599321
when        1991        then        15599322
when        1992        then        15599323
when        1993        then        15599324
when        2109        then        15599325
when        2175        then        15599326
when        2215        then        15599327
when        2250        then        15599328
when        2267        then        15599329
when        2805        then        15599332
when        3383        then        15599333
when        3464        then        15599334
when        1        then        15599461
when        2        then        15599462
when        3        then        15599463
when        4        then        15599465
when        5        then        15599466
when        6        then        15599467
when        7        then        15599468
when        8        then        15599469
when        9        then        15599471
when        10        then        15599472
when        12        then        15599473
when        13        then        15599474
when        14        then        15599475
when        15        then        15599476
when        16        then        15599478
when        17        then        15599479
when        18        then        15599480
when        19        then        15599481
when        20        then        15599482
when        21        then        15599483
when        22        then        15599484
when        23        then        15599486
when        24        then        15599487
when        27        then        15599488
when        29        then        15599489
when        30        then        15599490
when        31        then        15599491
when        32        then        15599493
when        33        then        15599494
when        34        then        15599495
when        41        then        15599496
when        55        then        15599497
when        56        then        15599498
when        64        then        15599500
when        65        then        15599501
when        66        then        15599502
when        67        then        15599503
when        68        then        15599504
when        69        then        15599505
when        77        then        15599507
when        78        then        15599508
when        79        then        15599509
when        80        then        15599510
when        81        then        15599511
when        82        then        15599512
when        83        then        15599513
when        84        then        15599515
when        85        then        15599516
when        86        then        15599517
when        87        then        15599518
when        88        then        15599519
when        89        then        15599520
when        90        then        15599521
when        91        then        15599523
when        92        then        15599524
when        93        then        15599525
when        94        then        15599526
when        95        then        15599527
when        96        then        15599528
when        97        then        15599529
when        99        then        15599531
when        100        then        15599532
when        101        then        15599533
when        102        then        15599534
when        104        then        15599535
when        105        then        15599536
when        106        then        15599537
when        107        then        15599539
when        108        then        15599540
when        109        then        15599541
when        110        then        15599542
when        111        then        15599543
when        112        then        15599544
when        113        then        15599546
when        114        then        15599547
when        115        then        15599548
when        116        then        15599549
when        120        then        15599550
when        121        then        15599551
when        127        then        15599552
when        130        then        15599554
when        131        then        15599555
when        132        then        15599556
when        135        then        15599557
when        136        then        15599558
when        137        then        15599559
when        138        then        15599560
when        139        then        15599562
when        152        then        15599563
when        153        then        15599564
when        154        then        15599565
when        155        then        15599566
when        156        then        15599567
when        157        then        15599568
when        159        then        15599570
when        167        then        15599571
when        168        then        15599572
when        170        then        15599573
when        177        then        15599574
when        178        then        15599575
when        216        then        15599576
when        219        then        15599578
when        222        then        15599579
when        226        then        15599580
when        227        then        15599581
when        229        then        15599582
when        232        then        15599583
when        233        then        15599584
when        234        then        15599586
when        235        then        15599587
when        237        then        15599588
when        238        then        15599589
when        239        then        15599590
when        240        then        15599591
when        241        then        15599592
when        242        then        15599593
when        243        then        15599595
when        244        then        15599596
when        245        then        15599597
when        246        then        15599598
when        247        then        15599599
when        248        then        15599600
when        249        then        15599601
when        250        then        15599603
when        251        then        15599604
when        252        then        15599605
when        253        then        15599606
when        254        then        15599607
when        255        then        15599608
when        256        then        15599609
when        257        then        15599610
when        258        then        15599612
when        259        then        15599613
when        260        then        15599614
when        261        then        15599615
when        262        then        15599616
when        263        then        15599617
when        264        then        15599618
when        265        then        15599620
when        266        then        15599621
when        267        then        15599622
when        268        then        15599623
when        278        then        15599624
when        279        then        15599625
when        280        then        15599626
when        281        then        15599627
when        282        then        15599629
when        283        then        15599630
when        284        then        15599631
when        285        then        15599632
when        286        then        15599633
when        287        then        15599634
when        293        then        15599635
when        294        then        15599637
when        295        then        15599638
when        296        then        15599639
when        297        then        15599640
when        298        then        15599641
when        299        then        15599642
when        300        then        15599643
when        301        then        15599644
when        302        then        15599646
when        305        then        15599647
when        306        then        15599648
when        307        then        15599649
when        308        then        15599650
when        309        then        15599651
when        310        then        15599652
when        311        then        15599653
when        313        then        15599655
when        315        then        15599656
when        316        then        15599657
when        317        then        15599658
when        318        then        15599659
when        319        then        15599660
when        320        then        15599661
when        321        then        15599662
when        322        then        15599664
when        323        then        15599665
when        325        then        15599666
when        326        then        15599667
when        327        then        15599668
when        328        then        15599669
when        329        then        15599670
when        330        then        15599671
when        331        then        15599673
when        332        then        15599674
when        333        then        15599675
when        334        then        15599676
when        335        then        15599677
when        336        then        15599678
when        337        then        15599679
when        338        then        15599680
when        339        then        15599682
when        340        then        15599683
when        341        then        15599684
when        342        then        15599685
when        343        then        15599686
when        344        then        15599687
when        345        then        15599688
when        346        then        15599689
when        347        then        15599691
when        348        then        15599692
when        349        then        15599693
when        350        then        15599694
when        351        then        15599695
when        352        then        15599696
when        353        then        15599697
when        354        then        15599698
when        355        then        15599700
when        356        then        15599701
when        357        then        15599702
when        358        then        15599703
when        359        then        15599704
when        360        then        15599705
when        361        then        15599706
when        362        then        15599707
when        363        then        15599708
when        364        then        15599710
when        365        then        15599711
when        366        then        15599712
when        367        then        15599714
when        368        then        15599715
when        369        then        15599716
when        370        then        15599717
when        371        then        15599718
when        372        then        15599719
when        373        then        15599720
when        374        then        15599721
when        375        then        15599723
when        376        then        15599724
when        377        then        15599725
when        378        then        15599726
when        379        then        15599727
when        380        then        15599728
when        381        then        15599729
when        382        then        15599730
when        383        then        15599732
when        384        then        15599733
when        385        then        15599734
when        386        then        15599735
when        387        then        15599736
when        388        then        15599737
when        389        then        15599738
when        390        then        15599739
when        391        then        15599741
when        392        then        15599742
when        393        then        15599743
when        394        then        15599744
when        395        then        15599745
when        396        then        15599746
when        397        then        15599747
when        398        then        15599748
when        399        then        15599749
when        400        then        15599751
when        401        then        15599752
when        402        then        15599753
when        403        then        15599754
when        404        then        15599755
when        405        then        15599756
when        406        then        15599757
when        407        then        15599759
when        408        then        15599760
when        409        then        15599761
when        410        then        15599762
when        411        then        15599763
when        412        then        15599764
when        413        then        15599765
when        414        then        15599766
when        415        then        15599768
when        416        then        15599769
when        417        then        15599770
when        418        then        15599771
when        419        then        15599772
when        420        then        15599773
when        421        then        15599774
when        422        then        15599775
when        423        then        15599776
when        424        then        15599778
when        425        then        15599779
when        426        then        15599780
when        427        then        15599781
when        428        then        15599782
when        429        then        15599783
when        430        then        15599784
when        431        then        15599785
when        432        then        15599786
when        433        then        15599788
when        434        then        15599789
when        435        then        15599790
when        436        then        15599791
when        437        then        15599792
when        438        then        15599793
when        439        then        15599794
when        440        then        15599795
when        441        then        15599796
when        442        then        15599798
when        443        then        15599799
when        444        then        15599800
when        445        then        15599801
when        446        then        15599802
when        447        then        15599803
when        448        then        15599804
when        449        then        15599805
when        450        then        15599806
when        451        then        15599808
when        452        then        15599809
when        453        then        15599810
when        454        then        15599811
when        455        then        15599812
when        456        then        15599813
when        457        then        15599814
when        458        then        15599815
when        459        then        15599816
when        460        then        15599818
when        461        then        15599819
when        462        then        15599820
when        463        then        15599821
when        464        then        15599822
when        465        then        15599823
when        466        then        15599824
when        467        then        15599825
when        468        then        15599826
when        469        then        15599828
when        470        then        15599829
when        471        then        15599830
when        472        then        15599831
when        473        then        15599832
when        474        then        15599833
when        475        then        15599834
when        476        then        15599835
when        477        then        15599836
when        478        then        15599838
when        479        then        15599839
when        480        then        15599840
when        481        then        15599841
when        482        then        15599842
when        483        then        15599843
when        484        then        15599844
when        485        then        15599845
when        486        then        15599846
when        487        then        15599848
when        488        then        15599849
when        489        then        15599850
when        490        then        15599851
when        491        then        15599852
when        492        then        15599853
when        493        then        15599854
when        494        then        15599855
when        495        then        15599856
when        496        then        15599858
when        497        then        15599859
when        498        then        15599860
when        499        then        15599861
when        500        then        15599862
when        501        then        15599863
when        502        then        15599864
when        503        then        15599865
when        504        then        15599866
when        505        then        15599867
when        506        then        15599869
when        507        then        15599870
when        508        then        15599871
when        509        then        15599872
when        510        then        15599873
when        511        then        15599874
when        512        then        15599875
when        513        then        15599876
when        514        then        15599877
when        515        then        15599878
when        516        then        15599880
when        517        then        15599881
when        518        then        15599882
when        519        then        15599883
when        520        then        15599884
when        521        then        15599885
when        522        then        15599886
when        523        then        15599887
when        524        then        15599888
when        525        then        15599889
when        526        then        15599891
when        527        then        15599892
when        531        then        15599893
when        755        then        15599894
when        756        then        15599895
when        757        then        15599896
when        758        then        15599897
when        759        then        15599898
when        760        then        15599899
when        779        then        15599901
when        810        then        15599902
when        811        then        15599903
when        812        then        15599905
when        813        then        15599906
when        814        then        15599907
when        815        then        15599908
when        822        then        15599909
when        825        then        15599910
when        842        then        15599911
when        843        then        15599913
when        844        then        15599914
when        845        then        15599915
when        846        then        15599916
when        847        then        15599917
when        849        then        15599918
when        850        then        15599919
when        851        then        15599920
when        853        then        15599921
when        854        then        15599922
when        856        then        15599924
when        857        then        15599925
when        858        then        15599926
when        859        then        15599927
when        860        then        15599928
when        861        then        15599929
when        878        then        15599930
when        879        then        15599931
when        881        then        15599932
when        883        then        15599934
when        885        then        15599935
when        886        then        15599936
when        887        then        15599937
when        888        then        15599938
when        889        then        15599939
when        890        then        15599940
when        891        then        15599941
when        892        then        15599942
when        893        then        15599943
when        894        then        15599945
when        895        then        15599946
when        896        then        15599947
when        897        then        15599948
when        898        then        15599949
when        899        then        15599950
when        900        then        15599951
when        901        then        15599952
when        902        then        15599953
when        903        then        15599954
when        904        then        15599956
when        905        then        15599957
when        906        then        15599958
when        907        then        15599959
when        908        then        15599960
when        909        then        15599961
when        910        then        15599962
when        911        then        15599963
when        912        then        15599964
when        913        then        15599966
when        914        then        15599967
when        915        then        15599968
when        916        then        15599969
when        917        then        15599970
when        918        then        15599971
when        919        then        15599972
when        920        then        15599973
when        921        then        15599974
when        922        then        15599975
when        923        then        15599977
when        924        then        15599978
when        925        then        15599980
when        926        then        15599981
when        927        then        15599982
when        928        then        15599983
when        929        then        15599984
when        930        then        15599985
when        931        then        15599986
when        932        then        15599987
when        933        then        15599989
when        934        then        15599990
when        935        then        15599991
when        936        then        15599992
when        937        then        15599993
when        938        then        15599994
when        939        then        15599995
when        940        then        15599996
when        941        then        15599997
when        942        then        15599998
when        943        then        15600000
when        944        then        15600001
when        945        then        15600002
when        946        then        15600003
when        947        then        15600004
when        948        then        15600005
when        949        then        15600006
when        950        then        15600007
when        951        then        15600008
when        952        then        15600009
when        953        then        15600011
when        954        then        15600012
when        955        then        15600013
when        956        then        15600014
when        957        then        15600015
when        958        then        15600016
when        959        then        15600017
when        960        then        15600018
when        961        then        15600019
when        962        then        15600020
when        963        then        15600022
when        964        then        15600023
when        965        then        15600024
when        966        then        15600025
when        967        then        15600026
when        968        then        15600027
when        969        then        15600028
when        970        then        15600029
when        971        then        15600030
when        972        then        15600031
when        973        then        15600033
when        974        then        15600034
when        975        then        15600035
when        976        then        15600036
when        977        then        15600037
when        1130        then        15600038
when        1138        then        15600039
when        1139        then        15600040
when        1140        then        15600042
when        1170        then        15600044
when        1501        then        15600045
when        2604        then        15600047
when        2730        then        15600048
when        4323        then        15600049
when        4645        then        15600322
when        4715        then        15600324
when        4806        then        15600325
when        4807        then        15600326
when        4920        then        15600327
when        4972        then        15600328
when        4980        then        15600329
when        4982        then        15600330
when        4988        then        15600331
when        4996        then        15600332
when        4997        then        15600333
when        4999        then        15600334
when        5050        then        15600335
when        5075        then        15600336
when        5077        then        15600337
when        5101        then        15600338
when        5147        then        15600339
when        5148        then        15600340
when        5161        then        15600341
when        5162        then        15600343
when        5163        then        15600344
when        5185        then        15600345
when        5186        then        15600346
when        5187        then        15600347
when        5208        then        15600348
when        5209        then        15600349
when        5235        then        15600350
 end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS bem,
'conversao de dados' as notaExplicativa
from PATRBensPatrimoniais BP
left  join PATRVeiculo V ON V.nr_Chapa = BP.nr_chapa
join PATRTiposBens TB ON TB.cd_tipobem = bp.cd_tipobem
where BP.cd_situacao = 2

        `;

        const result = await masterConnection.query(userQuery);

        const resultData = result.recordset;

        const transformedData = resultData.map(record => {
            // Extrair e parsear os valores do JSON
            const baixa = JSON.parse(record.Baixa);
            const bem = JSON.parse(record.bem);

            return {
                baixa: {
                    id: baixa.id
                },
                bem: {
                    id: bem.id
                },
                notaExplicativa: record.notaExplicativa
            };
        });

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
         // Armazenar as respostas do servidor
         const serverResponses = [];

         // Enviar cada registro individualmente para a rota desejada
         for (const record of transformedData) {
             const url = `https://patrimonio.betha.cloud/patrimonio-services/api/baixas/${record.bem.id}/bens`;
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
         }

         fs.writeFileSync('log_bens.json', JSON.stringify(serverResponses, null, 2));
         console.log('Respostas do servidor salvas em log_bens.json');

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
