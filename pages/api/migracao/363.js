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

        // Selecionar o banco de dados "CONTABIL2024"
        const selectDatabaseQuery = 'USE CONTABIL2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
 ROW_NUMBER() OVER (ORDER BY cd_projativ) AS idIntegracao,
JSON_QUERY(
    (SELECT
   JSON_QUERY(
    (SELECT
   '15063' as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS loa,
cd_exercicio as exercicio,
JSON_QUERY(
    (SELECT
    case cd_cecam
                                                 when 1995 then 10768
                                                 when 2783 then 10770
                                                 when 3052 then 10771
                                                 when 3068 then 10769
                                                 end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS entidade,
   JSON_QUERY(
    (SELECT
   case cd_unidorca
when        '01.00.00'        then        156832
when        '01.01.00'        then        157058
when        '01.02.00'        then        157059
when        '02.00.00'        then        156835
when        '02.01.00'        then        157060
when        '02.02.00'        then        157061
when        '02.03.00'        then        157062
when        '02.04.00'        then        157063
when        '02.05.00'        then        157064
when        '02.06.00'        then        157065
when        '02.07.00'        then        157066
when        '02.08.00'        then        157067
when        '02.09.00'        then        157068
when        '02.10.00'        then        157069
end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS organograma,
JSON_QUERY(
    (SELECT
   case cd_programa
   when        0        then        105413
when        2        then        105414
when        1        then        105415
when        9        then        105416
when        13        then        105417
when        5        then        105418
when        15        then        105419
when        18        then        105420
when        17        then        105421
when        3        then        105422
when        8        then        105423
when        6        then        105424
when        12        then        105425
when        21        then        105426
when        4        then        105427
when        19        then        105428
when        20        then        105429
when        11        then        105430
when        7        then        105431
when        14        then        105432
when        22        then        105433
when        23        then        105434
when        10        then        105435
when        16        then        105436
when        9999        then        105437
   end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS programa,
JSON_QUERY(
    (SELECT
        case
when        cd_funcao like        '%1.%'        then        35764
when        cd_funcao like        '%2.%'        then        35765
when        cd_funcao like        '%3.%'        then        35766
when        cd_funcao like        '%4.%'        then        35767
when        cd_funcao like        '%5.%'        then        35768
when        cd_funcao like        '%6.%'        then        35769
when        cd_funcao like        '%7.%'        then        35770
when        cd_funcao like        '%8.%'        then        35771
when        cd_funcao like        '%9.%'        then        35772
when        cd_funcao like        '%10.%'        then        35773
when        cd_funcao like        '%11.%'        then        35774
when        cd_funcao like        '%12.%'        then        35775
when        cd_funcao like        '%13.%'        then        35776
when        cd_funcao like        '%14.%'        then        35777
when        cd_funcao like        '%15.%'        then        35778
when        cd_funcao like        '%16.%'        then        35779
when        cd_funcao like        '%17.%'        then        35780
when        cd_funcao like        '%18.%'        then        35781
when        cd_funcao like        '%19.%'        then        35782
when        cd_funcao like        '%20.%'        then        35783
when        cd_funcao like        '%21.%'        then        35784
when        cd_funcao like        '%22.%'        then        35785
when        cd_funcao like        '%23.%'        then        35786
when        cd_funcao like        '%24.%'        then        35787
when        cd_funcao like        '%25.%'        then        35788
when        cd_funcao like        '%26.%'        then        35789
when        cd_funcao like        '%27.%'        then        35790
when        cd_funcao like        '%28.%'        then        35791
when        cd_funcao like        '%99.%'        then        35792
   end  as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS funcao,
JSON_QUERY(
    (SELECT
        case
when        cd_funcao like        '%.31%'        then        156809
when        cd_funcao like        '%.32%'        then        156810
when        cd_funcao like        '%.61%'        then        156811
when        cd_funcao like        '%.62%'        then        156812
when        cd_funcao like        '%.91%'        then        156813
when        cd_funcao like        '%.92%'        then        156814
when        cd_funcao like        '%.121%'        then        156815
when        cd_funcao like        '%.122%'        then        156816
when        cd_funcao like        '%.123%'        then        156817
when        cd_funcao like        '%.124%'        then        156818
when        cd_funcao like        '%.125%'        then        156819
when        cd_funcao like        '%.126%'        then        156820
when        cd_funcao like        '%.127%'        then        156821
when        cd_funcao like        '%.128%'        then        156822
when        cd_funcao like        '%.129%'        then        156823
when        cd_funcao like        '%.130%'        then        156824
when        cd_funcao like        '%.131%'        then        156825
when        cd_funcao like        '%.151%'        then        156826
when        cd_funcao like        '%.152%'        then        156827
when        cd_funcao like        '%.153%'        then        156828
when        cd_funcao like        '%.181%'        then        156829
when        cd_funcao like        '%.182%'        then        156830
when        cd_funcao like        '%.183%'        then        156831
when        cd_funcao like        '%.211%'        then        156832
when        cd_funcao like        '%.212%'        then        156833
when        cd_funcao like        '%.241%'        then        156834
when        cd_funcao like        '%.242%'        then        156835
when        cd_funcao like        '%.243%'        then        156836
when        cd_funcao like        '%.244%'        then        156837
when        cd_funcao like        '%.271%'        then        156838
when        cd_funcao like        '%.272%'        then        156839
when        cd_funcao like        '%.273%'        then        156840
when        cd_funcao like        '%.274%'        then        156841
when        cd_funcao like        '%.301%'        then        156842
when        cd_funcao like        '%.302%'        then        156843
when        cd_funcao like        '%.303%'        then        156844
when        cd_funcao like        '%.304%'        then        156845
when        cd_funcao like        '%.305%'        then        156846
when        cd_funcao like        '%.306%'        then        156847
when        cd_funcao like        '%.331%'        then        156848
when        cd_funcao like        '%.332%'        then        156849
when        cd_funcao like        '%.333%'        then        156850
when        cd_funcao like        '%.334%'        then        156851
when        cd_funcao like        '%.361%'        then        156852
when        cd_funcao like        '%.362%'        then        156853
when        cd_funcao like        '%.363%'        then        156854
when        cd_funcao like        '%.364%'        then        156855
when        cd_funcao like        '%.365%'        then        156856
when        cd_funcao like        '%.366%'        then        156857
when        cd_funcao like        '%.367%'        then        156858
when        cd_funcao like        '%.368%'        then        156859
when        cd_funcao like        '%.391%'        then        156860
when        cd_funcao like        '%.392%'        then        156861
when        cd_funcao like        '%.421%'        then        156862
when        cd_funcao like        '%.422%'        then        156863
when        cd_funcao like        '%.423%'        then        156864
when        cd_funcao like        '%.451%'        then        156865
when        cd_funcao like        '%.452%'        then        156866
when        cd_funcao like        '%.453%'        then        156867
when        cd_funcao like        '%.481%'        then        156868
when        cd_funcao like        '%.482%'        then        156869
when        cd_funcao like        '%.511%'        then        156870
when        cd_funcao like        '%.512%'        then        156871
when        cd_funcao like        '%.541%'        then        156872
when        cd_funcao like        '%.542%'        then        156873
when        cd_funcao like        '%.543%'        then        156874
when        cd_funcao like        '%.544%'        then        156875
when        cd_funcao like        '%.545%'        then        156876
when        cd_funcao like        '%.571%'        then        156877
when        cd_funcao like        '%.572%'        then        156878
when        cd_funcao like        '%.573%'        then        156879
when        cd_funcao like        '%.601%'        then        156880
when        cd_funcao like        '%.602%'        then        156881
when        cd_funcao like        '%.603%'        then        156882
when        cd_funcao like        '%.604%'        then        156883
when        cd_funcao like        '%.605%'        then        156884
when        cd_funcao like        '%.606%'        then        156885
when        cd_funcao like        '%.607%'        then        156886
when        cd_funcao like        '%.608%'        then        156887
when        cd_funcao like        '%.609%'        then        156888
when        cd_funcao like        '%.631%'        then        156889
when        cd_funcao like        '%.632%'        then        156890
when        cd_funcao like        '%.661%'        then        156891
when        cd_funcao like        '%.662%'        then        156892
when        cd_funcao like        '%.663%'        then        156893
when        cd_funcao like        '%.664%'        then        156894
when        cd_funcao like        '%.665%'        then        156895
when        cd_funcao like        '%.691%'        then        156896
when        cd_funcao like        '%.692%'        then        156897
when        cd_funcao like        '%.693%'        then        156898
when        cd_funcao like        '%.694%'        then        156899
when        cd_funcao like        '%.695%'        then        156900
when        cd_funcao like        '%.721%'        then        156901
when        cd_funcao like        '%.722%'        then        156902
when        cd_funcao like        '%.751%'        then        156903
when        cd_funcao like        '%.752%'        then        156904
when        cd_funcao like        '%.753%'        then        156905
when        cd_funcao like        '%.754%'        then        156906
when        cd_funcao like        '%.781%'        then        156907
when        cd_funcao like        '%.782%'        then        156908
when        cd_funcao like        '%.783%'        then        156909
when        cd_funcao like        '%.784%'        then        156910
when        cd_funcao like        '%.785%'        then        156911
when        cd_funcao like        '%.811%'        then        156912
when        cd_funcao like        '%.812%'        then        156913
when        cd_funcao like        '%.813%'        then        156914
when        cd_funcao like        '%.841%'        then        156915
when        cd_funcao like        '%.842%'        then        156916
when        cd_funcao like        '%.843%'        then        156917
when        cd_funcao like        '%.844%'        then        156918
when        cd_funcao like        '%.845%'        then        156919
when        cd_funcao like        '%.846%'        then        156920
when        cd_funcao like        '%.847%'        then        156921
when        cd_funcao like        '%.997%'        then        156922
when        cd_funcao like        '%.999%'        then        156923
else 156920
   end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS subfuncao,
JSON_QUERY(
    (SELECT
   case cd_projativ
when        1002        then        454456
when        1001        then        454457
when        1005        then        454458
when        1004        then        454459
when        1006        then        454460
when        1003        then        454461
when        1007        then        454462
when        1011        then        454463
when        1010        then        454464
when        1012        then        454465
when        1008        then        454466
when        1031        then        454467
when        1009        then        454468
when        1014        then        454469
when        1013        then        454470
when        1019        then        454471
when        1027        then        454472
when        1024        then        454473
when        1025        then        454474
when        1016        then        454475
when        1020        then        454476
when        1030        then        454477
when        1038        then        454478
when        1018        then        454479
when        1015        then        454480
when        1040        then        454481
when        1029        then        454482
when        1017        then        454483
when        1035        then        454484
when        1034        then        454485
when        1037        then        454486
when        1049        then        454487
when        1021        then        454488
when        1032        then        454489
when        1028        then        454490
when        1033        then        454491
when        1023        then        454492
when        1039        then        454493
when        1022        then        454494
when        1043        then        454495
when        1026        then        454496
when        1044        then        454497
when        1042        then        454498
when        1036        then        454499
when        1047        then        454500
when        1045        then        454501
when        1048        then        454502
when        1041        then        454503
when        1050        then        454504
when        1046        then        454505
when        1051        then        454506
when        1052        then        454507
when        1053        then        454508
when        1054        then        454509
when        1055        then        454510
when        1056        then        454511
when        1057        then        454512
when        1058        then        454513
when        1060        then        454514
when        1059        then        454515
when        1064        then        454516
when        1061        then        454517
when        1067        then        454518
when        1063        then        454519
when        1062        then        454520
when        1066        then        454521
when        1068        then        454522
when        1073        then        454523
when        1065        then        454524
when        1075        then        454525
when        1076        then        454526
when        1069        then        454527
when        1070        then        454528
when        1072        then        454529
when        1078        then        454530
when        2003        then        454531
when        1080        then        454532
when        1082        then        454533
when        1085        then        454534
when        1071        then        454535
when        1077        then        454536
when        1074        then        454537
when        1079        then        454538
when        1087        then        454539
when        1083        then        454540
when        1084        then        454541
when        1091        then        454542
when        1096        then        454543
when        1086        then        454544
when        2001        then        454545
when        2002        then        454546
when        1088        then        454547
when        1081        then        454548
when        1089        then        454549
when        1094        then        454550
when        2004        then        454551
when        1095        then        454552
when        1090        then        454553
when        1092        then        454554
when        1093        then        454555
when        2005        then        454556
when        2007        then        454557
when        2008        then        454558
when        2006        then        454559
when        2009        then        454560
when        2011        then        454561
when        2010        then        454562
when        2013        then        454563
when        2012        then        454564
when        2018        then        454565
when        2020        then        454566
when        2022        then        454567
when        2015        then        454568
when        2014        then        454569
when        2017        then        454570
when        2019        then        454571
when        2025        then        454572
when        2021        then        454573
when        2027        then        454574
when        2032        then        454575
when        2016        then        454576
when        2023        then        454577
when        2037        then        454578
when        2024        then        454579
when        2033        then        454580
when        2028        then        454581
when        2041        then        454582
when        2065        then        454583
when        2039        then        454584
when        2031        then        454585
when        2055        then        454586
when        2036        then        454587
when        2048        then        454588
when        2044        then        454589
when        2050        then        454590
when        2026        then        454591
when        2029        then        454592
when        2053        then        454593
when        2034        then        454594
when        2057        then        454595
when        2040        then        454596
when        2042        then        454597
when        2046        then        454598
when        2035        then        454599
when        2045        then        454600
when        2030        then        454601
when        2063        then        454602
when        2038        then        454603
when        2062        then        454604
when        2058        then        454605
when        2052        then        454606
when        2047        then        454607
when        2054        then        454608
when        2056        then        454609
when        2089        then        454610
when        2066        then        454611
when        2067        then        454612
when        2083        then        454613
when        2069        then        454614
when        2071        then        454615
when        2049        then        454616
when        2060        then        454617
when        2064        then        454618
when        2061        then        454619
when        2068        then        454620
when        2072        then        454621
when        2073        then        454622
when        2084        then        454623
when        2074        then        454624
when        2070        then        454625
when        2075        then        454626
when        2076        then        454627
when        2086        then        454628
when        2077        then        454629
when        2078        then        454630
when        2080        then        454631
when        9999        then        454632
when        2043        then        454633
when        2087        then        454634
when        2051        then        454635
when        2079        then        454636
when        2059        then        454637
when        2091        then        454638
when        2094        then        454639
when        2081        then        454640
when        2082        then        454641
when        2085        then        454642
when        2092        then        454643
when        2088        then        454644
when        2090        then        454645
when        2093        then        454646
end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS acao
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
from CONTFICHADESPESA
where cd_fichadesp < 5000 
group by cd_projativ, cd_exercicio, cd_unidorca,cd_programa, cd_funcao, cd_cecam

        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const content = JSON.parse(record.content);

            console.log(content);
            return {
                idIntegracao: record.idIntegracao.toString(),
                content: {
                    loa: {
                        id: parseInt(content.loa.id)
                    },
                    exercicio: content.exercicio,
                    entidade: {
                        id: content.entidade.id
                    },
                    organograma: {
                        id: content.organograma.id
                    },
                    programa: {
                        id: content.programa.id
                    },
                    acao: {
                        id: content.acao.id
                    },
                    funcao: {
                        id: content.funcao.id
                    },
                    subfuncao: {
                        id: content.subfuncao.id
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
            const response = await fetch('https://pla-sl-rest.betha.cloud/planejamento/service-layer/v2/api/grupos-despesas-loa', {
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
