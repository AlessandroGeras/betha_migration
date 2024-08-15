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
                                        when        12        then        1587462
when        13        then        1587463
when        14        then        1587464
when        15        then        1587465
when        16        then        1587466
when        17        then        1587467
when        18        then        1587468
when        19        then        1587469
when        20        then        1587470
when        21        then        1587471
when        22        then        1587472
when        23        then        1587473
when        24        then        1587474
when        25        then        1587475
when        26        then        1587476
when        27        then        1587477
when        28        then        1587478
when        29        then        1587479
when        3        then        1587480
when        31        then        1587481
when        32        then        1587482
when        33        then        1587483
when        34        then        1587484
when        35        then        1587485
when        36        then        1587486
when        37        then        1587487
when        38        then        1587488
when        39        then        1587489
when        40        then        1587490
when        41        then        1587491
when        42        then        1587492
when        44        then        1587493
when        45        then        1587494
when        46        then        1587495
when        47        then        1587496
when        48        then        1587497
when        49        then        1587498
when        50        then        1587499
when        51        then        1587500
when        52        then        1587501
when        53        then        1587502
when        54        then        1587503
when        55        then        1587504
when        56        then        1587505
when        57        then        1587506
when        58        then        1587507
when        59        then        1587508
when        60        then        1587509
when        61        then        1587510
when        62        then        1587515
when        63        then        1587516
when        64        then        1587517
when        65        then        1587518
when        66        then        1587519
when        67        then        1587520
when        68        then        1587521
when        69        then        1587522
when        70        then        1587523
when        71        then        1587524
when        72        then        1587525
when        73        then        1587526
when        74        then        1587527
when        75        then        1587528
when        76        then        1587529
when        77        then        1587530
when        78        then        1587531
when        79        then        1587532
when        80        then        1587533
when        81        then        1587534
when        82        then        1587535
when        83        then        1587536
when        84        then        1587537
when        85        then        1587538
when        86        then        1587539
when        87        then        1587540
when        88        then        1587541
when        89        then        1587542
when        90        then        1587543
when        91        then        1587544
when        92        then        1587545
when        93        then        1587546
when        94        then        1587547
when        95        then        1587548
when        96        then        1587549
when        97        then        1587550
when        98        then        1587551
when        99        then        1587552
when        100        then        1587553
when        101        then        1587554
when        102        then        1587555
when        103        then        1587556
when        104        then        1587557
when        105        then        1587558
when        106        then        1587559
when        107        then        1587560
when        108        then        1587561
when        109        then        1587562
when        110        then        1587563
when        111        then        1587564
when        112        then        1587566
when        113        then        1587567
when        114        then        1587568
when        115        then        1587569
when        116        then        1587570
when        117        then        1587571
when        118        then        1587572
when        119        then        1587573
when        120        then        1587574
when        121        then        1587575
when        122        then        1587576
when        123        then        1587577
when        124        then        1587578
when        125        then        1587579
when        126        then        1587580
when        127        then        1587581
when        128        then        1587582
when        129        then        1587583
when        130        then        1587584
when        131        then        1587585
when        132        then        1587586
when        133        then        1587587
when        134        then        1587588
when        135        then        1587589
when        136        then        1587590
when        137        then        1587591
when        138        then        1587592
when        139        then        1587593
when        140        then        1587594
when        141        then        1587595
when        142        then        1587596
when        143        then        1587597
when        144        then        1587598
when        145        then        1587599
when        146        then        1587600
when        147        then        1587601
when        148        then        1587602
when        149        then        1587603
when        150        then        1587604
when        151        then        1587605
when        152        then        1587606
when        153        then        1587607
when        154        then        1587608
when        155        then        1587609
when        156        then        1587610
when        157        then        1587611
when        158        then        1587612
when        159        then        1587613
when        160        then        1587614
when        161        then        1587615
when        162        then        1587616
when        163        then        1587617
when        164        then        1587618
when        165        then        1587619
when        318        then        1587620
when        323        then        1587621
when        324        then        1587622
when        325        then        1587623
when        326        then        1587624
when        327        then        1587625
when        336        then        1587626
when        337        then        1587627
when        338        then        1587628
when        340        then        1587629
when        348        then        1587630
when        166        then        1587631
when        167        then        1587632
when        168        then        1587633
when        169        then        1587634
when        170        then        1587635
when        171        then        1587636
when        172        then        1587637
when        173        then        1587638
when        174        then        1587639
when        175        then        1587640
when        176        then        1587641
when        177        then        1587642
when        178        then        1587643
when        179        then        1587644
when        180        then        1587645
when        181        then        1587646
when        182        then        1587647
when        183        then        1587648
when        185        then        1587649
when        186        then        1587650
when        187        then        1587651
when        188        then        1587652
when        189        then        1587653
when        190        then        1587654
when        191        then        1587655
when        192        then        1587656
when        193        then        1587657
when        194        then        1587658
when        195        then        1587659
when        196        then        1587660
when        197        then        1587661
when        198        then        1587662
when        199        then        1587663
when        200        then        1587664
when        201        then        1587665
when        202        then        1587666
when        203        then        1587667
when        204        then        1587668
when        205        then        1587669
when        206        then        1587670
when        207        then        1587671
when        208        then        1587672
when        209        then        1587673
when        210        then        1587674
when        211        then        1587675
when        212        then        1587676
when        213        then        1587677
when        214        then        1587678
when        215        then        1587679
when        216        then        1587680
when        217        then        1587681
when        218        then        1587682
when        219        then        1587683
when        220        then        1587684
when        221        then        1587685
when        222        then        1587686
when        223        then        1587687
when        224        then        1587688
when        225        then        1587689
when        226        then        1587690
when        227        then        1587691
when        228        then        1587692
when        229        then        1587693
when        230        then        1587694
when        231        then        1587695
when        232        then        1587696
when        233        then        1587697
when        234        then        1587698
when        235        then        1587699
when        236        then        1587700
when        237        then        1587701
when        238        then        1587702
when        239        then        1587703
when        240        then        1587704
when        241        then        1587705
when        319        then        1587706
when        320        then        1587707
when        321        then        1587708
when        322        then        1587709
when        329        then        1587710
when        330        then        1587711
when        331        then        1587712
when        332        then        1587713
when        333        then        1587714
when        334        then        1587715
when        335        then        1587716
when        344        then        1587717
when        345        then        1587718
when        346        then        1587719
when        347        then        1587720
when        242        then        1587721
when        244        then        1587722
when        245        then        1587723
when        246        then        1587724
when        247        then        1587725
when        248        then        1587726
when        249        then        1587727
when        250        then        1587728
when        251        then        1587729
when        252        then        1587730
when        253        then        1587731
when        254        then        1587732
when        255        then        1587733
when        256        then        1587734
when        257        then        1587735
when        258        then        1587736
when        259        then        1587737
when        260        then        1587738
when        261        then        1587739
when        262        then        1587740
when        263        then        1587741
when        264        then        1587742
when        265        then        1587743
when        266        then        1587744
when        267        then        1587745
when        268        then        1587746
when        269        then        1587747
when        270        then        1587748
when        271        then        1587749
when        272        then        1587750
when        273        then        1587751
when        274        then        1587752
when        275        then        1587753
when        276        then        1587754
when        277        then        1587755
when        278        then        1587756
when        279        then        1587757
when        280        then        1587758
when        281        then        1587759
when        282        then        1587760
when        283        then        1587761
when        284        then        1587762
when        285        then        1587763
when        286        then        1587764
when        287        then        1587765
when        288        then        1587766
when        289        then        1587767
when        290        then        1587768
when        291        then        1587769
when        292        then        1587770
when        293        then        1587771
when        294        then        1587772
when        295        then        1587773
when        296        then        1587774
when        297        then        1587775
when        298        then        1587776
when        299        then        1587777
when        300        then        1587778
when        301        then        1587779
when        302        then        1587780
when        303        then        1587781
when        304        then        1587782
when        305        then        1587783
when        306        then        1587784
when        307        then        1587785
when        308        then        1587786
when        309        then        1587787
when        310        then        1587788
when        311        then        1587789
when        312        then        1587790
when        313        then        1587791
when        314        then        1587792
when        315        then        1587793
when        342        then        1587794
when        1        then        1587795
when        2        then        1587796
when        3        then        1587797
when        4        then        1587798
when        5        then        1587799
when        6        then        1587800
when        7        then        1587801
when        8        then        1587802
when        9        then        1587803
when        1        then        1587804
when        11        then        1587805
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
                    valor: -Math.abs(parseFloat(content.valor)),
                    vencimentos: Array.isArray(content.vencimentos) ? content.vencimentos.map(v => ({
                        valor: parseFloat(v.valor),
                        data: formatDate(v.data),
                    })) : [{
                        valor: -Math.abs(parseFloat(content.vencimentos.valor)),
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
