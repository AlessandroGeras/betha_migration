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
        const selectDatabaseQuery = 'USE CONTABIL2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
 ROW_NUMBER() OVER (ORDER BY ae.cd_projativ) AS idIntegracao,
JSON_QUERY(
    (SELECT
   JSON_QUERY(
    (SELECT
   '9569' as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS ppa,
'2024' as exercicio,
JSON_QUERY(       (SELECT
   case ae.cd_unidorca
when        '01.00.00'        then        10769
when        '01.01.00'        then        10769
when        '01.02.00'        then        10769
when        '02.00.00'        then        10768
when        '02.01.00'        then        10768
when        '02.02.00'        then        10768
when        '02.03.00'        then        10768
when        '02.04.00'        then        10768
when        '02.05.00'        then        10768
when        '02.06.00'        then        10770
when        '02.07.00'        then        10768
when        '02.08.00'        then        10768
when        '02.09.00'        then        10771
when        '02.10.00'        then        10771
end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS entidade,
   JSON_QUERY(
    (SELECT
   case ae.cd_unidorca
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
end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS organograma,
JSON_QUERY(
    (SELECT
   case ae.cd_programa
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
when        ae.cd_funcao like        '%01.%'        then        35764
when        ae.cd_funcao like        '%02.%'        then        35765
when        ae.cd_funcao like        '%03.%'        then        35766
when        ae.cd_funcao like        '%04.%'        then        35767
when        ae.cd_funcao like        '%05.%'        then        35768
when        ae.cd_funcao like        '%06.%'        then        35769
when        ae.cd_funcao like        '%07.%'        then        35770
when        ae.cd_funcao like        '%08.%'        then        35771
when        ae.cd_funcao like        '%09.%'        then        35772
when        ae.cd_funcao like        '%10.%'        then        35773
when        ae.cd_funcao like        '%11.%'        then        35774
when        ae.cd_funcao like        '%12.%'        then        35775
when        ae.cd_funcao like        '%13.%'        then        35776
when        ae.cd_funcao like        '%14.%'        then        35777
when        ae.cd_funcao like        '%15.%'        then        35778
when        ae.cd_funcao like        '%16.%'        then        35779
when        ae.cd_funcao like        '%17.%'        then        35780
when        ae.cd_funcao like        '%18.%'        then        35781
when        ae.cd_funcao like        '%19.%'        then        35782
when        ae.cd_funcao like        '%20.%'        then        35783
when        ae.cd_funcao like        '%21.%'        then        35784
when        ae.cd_funcao like        '%22.%'        then        35785
when        ae.cd_funcao like        '%23.%'        then        35786
when        ae.cd_funcao like        '%24.%'        then        35787
when        ae.cd_funcao like        '%25.%'        then        35788
when        ae.cd_funcao like        '%26.%'        then        35789
when        ae.cd_funcao like        '%27.%'        then        35790
when        ae.cd_funcao like        '%28.%'        then        35791
when        ae.cd_funcao like        '%99.%'        then        35792
   end  as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS funcao,
JSON_QUERY(
    (SELECT
        case
when        ae.cd_funcao like        '%.031%'        then        156809
when        ae.cd_funcao like        '%.032%'        then        156810
when        ae.cd_funcao like        '%.061%'        then        156811
when        ae.cd_funcao like        '%.062%'        then        156812
when        ae.cd_funcao like        '%.091%'        then        156813
when        ae.cd_funcao like        '%.092%'        then        156814
when        ae.cd_funcao like        '%.121%'        then        156815
when        ae.cd_funcao like        '%.122%'        then        156816
when        ae.cd_funcao like        '%.123%'        then        156817
when        ae.cd_funcao like        '%.124%'        then        156818
when        ae.cd_funcao like        '%.125%'        then        156819
when        ae.cd_funcao like        '%.126%'        then        156820
when        ae.cd_funcao like        '%.127%'        then        156821
when        ae.cd_funcao like        '%.128%'        then        156822
when        ae.cd_funcao like        '%.129%'        then        156823
when        ae.cd_funcao like        '%.130%'        then        156824
when        ae.cd_funcao like        '%.131%'        then        156825
when        ae.cd_funcao like        '%.151%'        then        156826
when        ae.cd_funcao like        '%.152%'        then        156827
when        ae.cd_funcao like        '%.153%'        then        156828
when        ae.cd_funcao like        '%.181%'        then        156829
when        ae.cd_funcao like        '%.182%'        then        156830
when        ae.cd_funcao like        '%.183%'        then        156831
when        ae.cd_funcao like        '%.211%'        then        156832
when        ae.cd_funcao like        '%.212%'        then        156833
when        ae.cd_funcao like        '%.241%'        then        156834
when        ae.cd_funcao like        '%.242%'        then        156835
when        ae.cd_funcao like        '%.243%'        then        156836
when        ae.cd_funcao like        '%.244%'        then        156837
when        ae.cd_funcao like        '%.271%'        then        156838
when        ae.cd_funcao like        '%.272%'        then        156839
when        ae.cd_funcao like        '%.273%'        then        156840
when        ae.cd_funcao like        '%.274%'        then        156841
when        ae.cd_funcao like        '%.301%'        then        156842
when        ae.cd_funcao like        '%.302%'        then        156843
when        ae.cd_funcao like        '%.303%'        then        156844
when        ae.cd_funcao like        '%.304%'        then        156845
when        ae.cd_funcao like        '%.305%'        then        156846
when        ae.cd_funcao like        '%.306%'        then        156847
when        ae.cd_funcao like        '%.331%'        then        156848
when        ae.cd_funcao like        '%.332%'        then        156849
when        ae.cd_funcao like        '%.333%'        then        156850
when        ae.cd_funcao like        '%.334%'        then        156851
when        ae.cd_funcao like        '%.361%'        then        156852
when        ae.cd_funcao like        '%.362%'        then        156853
when        ae.cd_funcao like        '%.363%'        then        156854
when        ae.cd_funcao like        '%.364%'        then        156855
when        ae.cd_funcao like        '%.365%'        then        156856
when        ae.cd_funcao like        '%.366%'        then        156857
when        ae.cd_funcao like        '%.367%'        then        156858
when        ae.cd_funcao like        '%.368%'        then        156859
when        ae.cd_funcao like        '%.391%'        then        156860
when        ae.cd_funcao like        '%.392%'        then        156861
when        ae.cd_funcao like        '%.421%'        then        156862
when        ae.cd_funcao like        '%.422%'        then        156863
when        ae.cd_funcao like        '%.423%'        then        156864
when        ae.cd_funcao like        '%.451%'        then        156865
when        ae.cd_funcao like        '%.452%'        then        156866
when        ae.cd_funcao like        '%.453%'        then        156867
when        ae.cd_funcao like        '%.481%'        then        156868
when        ae.cd_funcao like        '%.482%'        then        156869
when        ae.cd_funcao like        '%.511%'        then        156870
when        ae.cd_funcao like        '%.512%'        then        156871
when        ae.cd_funcao like        '%.541%'        then        156872
when        ae.cd_funcao like        '%.542%'        then        156873
when        ae.cd_funcao like        '%.543%'        then        156874
when        ae.cd_funcao like        '%.544%'        then        156875
when        ae.cd_funcao like        '%.545%'        then        156876
when        ae.cd_funcao like        '%.571%'        then        156877
when        ae.cd_funcao like        '%.572%'        then        156878
when        ae.cd_funcao like        '%.573%'        then        156879
when        ae.cd_funcao like        '%.601%'        then        156880
when        ae.cd_funcao like        '%.602%'        then        156881
when        ae.cd_funcao like        '%.603%'        then        156882
when        ae.cd_funcao like        '%.604%'        then        156883
when        ae.cd_funcao like        '%.605%'        then        156884
when        ae.cd_funcao like        '%.606%'        then        156885
when        ae.cd_funcao like        '%.607%'        then        156886
when        ae.cd_funcao like        '%.608%'        then        156887
when        ae.cd_funcao like        '%.609%'        then        156888
when       ae.cd_funcao like        '%.631%'        then        156889
when        ae.cd_funcao like        '%.632%'        then        156890
when        ae.cd_funcao like        '%.661%'        then        156891
when        ae.cd_funcao like        '%.662%'        then        156892
when        ae.cd_funcao like        '%.663%'        then        156893
when        ae.cd_funcao like        '%.664%'        then        156894
when        ae.cd_funcao like        '%.665%'        then        156895
when        ae.cd_funcao like        '%.691%'        then        156896
when        ae.cd_funcao like        '%.692%'        then        156897
when        ae.cd_funcao like        '%.693%'        then        156898
when        ae.cd_funcao like        '%.694%'        then        156899
when        ae.cd_funcao like        '%.695%'        then        156900
when        ae.cd_funcao like        '%.721%'        then        156901
when        ae.cd_funcao like        '%.722%'        then        156902
when        ae.cd_funcao like        '%.751%'        then        156903
when        ae.cd_funcao like        '%.752%'        then        156904
when        ae.cd_funcao like        '%.753%'        then        156905
when        ae.cd_funcao like        '%.754%'        then        156906
when        ae.cd_funcao like        '%.781%'        then        156907
when        ae.cd_funcao like        '%.782%'        then        156908
when        ae.cd_funcao like        '%.783%'        then        156909
when        ae.cd_funcao like        '%.784%'        then        156910
when        ae.cd_funcao like        '%.785%'        then        156911
when        ae.cd_funcao like        '%.811%'        then        156912
when        ae.cd_funcao like        '%.812%'        then        156913
when        ae.cd_funcao like        '%.813%'        then        156914
when        ae.cd_funcao like        '%.841%'        then        156915
when        ae.cd_funcao like        '%.842%'        then        156916
when        ae.cd_funcao like        '%.843%'        then        156917
when        ae.cd_funcao like        '%.844%'        then        156918
when        ae.cd_funcao like        '%.845%'        then        156919
when        ae.cd_funcao like        '%.846%'        then        156920
when        ae.cd_funcao like        '%.847%'        then        156921
when        ae.cd_funcao like        '%.997%'        then        156922
when        ae.cd_funcao like        '%.999%'        then        156923
else 156920
   end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS subfuncao,
JSON_QUERY(
    (SELECT
   case ae.cd_projativ
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
) AS acao,
JSON_QUERY(
    (SELECT
JSON_QUERY(
    (SELECT
(vl_Meta1PPA + vl_Meta2PPA + vl_Meta3PPA + vl_Meta4PPA) as total,
 ae.vl_Meta1PPA as ano1,
 ae.vl_Meta2PPA as ano2,
 ae.vl_Meta3PPA as ano3,
 ae.vl_Meta4PPA as ano4
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS metaFisica,
JSON_QUERY(
    (SELECT
        case i.ds_Indicador
        when        'AÇOES PREVENTIVAS E EDUCATIVAS'        then        151402
when        'ADULTOS ATENDIDOS DE 18 A 59 ANOS'        then        151405
when        'ATENDIMENTO DAS EQUIPES ESF'        then        151408
when        'BENEFICIOS CONCEDIDOS'        then        151411
when        'CAMPANHA DE VACINAÇAO'        then        151414
when        'COLETA E DESTINAÇÃO DO LIXO - CIDADE'        then        151417
when        'CRIANÇAS ATENDIDAS 04 A 06 ANOS'        then        151420
when        'CURSOS OFERTADOS'        then        151423
when        'DISTRIBUIÇAO DE SEMEN BOVINO'        then        151426
when        'EXAMES LABORATORIAIS E ESPECIALIZADOS'        then        151429
when        'FESTA E COMEMORAÇÕES'        then        151432
when        'GESTÃO DA FOLHA - LEGISLATIVO'        then        151435
when        'INTERNAÇÃO E OBSERVAÇÃO'        then        151438
when        'MUDAS ESSENCIAS FLORESTAIS'        then        151441
when        'NOTIFICAÇAO COMPULSORIA'        then        151444
when        'PAGAMENTO DE OBRIGAÇÃO TRIBUTARIA'        then        151447
when        'PROCEDIMENTOS REALIZADOS'        then        151450
when        'PROJETOS EXECUTADOS FMDCA'        then        151453
when        'ACOLHIDOS ATENDIDOS'        then        151403
when        'ALUNOS ATENDIDOS'        then        151406
when        'ATENDIMENTO PRIORITARIO SAUDE BUCAL'        then        151409
when        'BENS IMOVEIS'        then        151412
when        'CAMPEONATOS ESPORTIVOS'        then        151415
when        'CONCIENTIZAÇÃO COLETA SELETIVA'        then        151418
when        'CRIANÇAS ATENDIDAS DE 0 A 3 ANOS'        then        151421
when        'DEMINUIR O INDICE DE CRIMINALIDADES'        then        151424
when        'ENVENTOS DE INTERAÇÃO'        then        151427
when        'FAMILIAS ATENDIDAS'        then        151430
when        'FISCALIZAÇAO AOS ESTABELECIMENTOS'        then        151433
when        'GESTÃO DA FOLHA EXECUTIVO'        then        151436
when        'LICENÇA AMBIENTAL DE BAIXO IMPACTO'        then        151439
when        'NÃO SE APLICA'        then        151442
when        'Obras e Instalações'        then        151445
when        'PAGAMENTO DE SENTEÇAS E/OU PARCELAMENTOS'        then        151448
when        'PRODUTORES ATENDIDOS'        then        151451
when        'REALIZAR/PARTICIPAR DE EVENTOS ESPORTIVOS'        then        151454
when        'SATISFAÇÃO DOS MUNICÍPIS QUANTO A SEGURANÇA'        then        151457
when        'SATISFAÇÃO DOS USUARIOS DO TRANSPORTE ESCOLAR'        then        151460
when        'UNIDADES ADMINISTRATIVAS MANTIDAS'        then        151463
when        'VISITA DOMICILIAR ACS'        then        151466
when        'ADOLESCENTES ATENDIDOS DE 15 A 17 ANOS'        then        151404
when        'ALUNOS DA FANFARRA'        then        151407
when        'ATLETAS DE RENDIMENTO'        then        151410
when        'BENS MOVEIS'        then        151413
when        'CAPACITAÇÕES'        then        151416
when        'CONSULTAS REALIZADAS'        then        151419
when        'CRIANÇAS ATENDIDAS DE 07 A 14 ANOS'        then        151422
when        'DISTRIBUIÇÃO DE MUDAS'        then        151425
when        'EVENTOS CULTURAIS'        then        151428
when        'FAMILIAS CADASTRADAS'        then        151431
when        'GESTANTES ATENDIDAS'        then        151434
when        'IDOSOS ATENDIDOS'        then        151437
when        'MANUTENÇÃO DAS UNIDADES ADMINISTRATIVAS'        then        151440
when        'NASCENTES REVITALIZADAS'        then        151443
when        'PACIENTES ATENDIDOS'        then        151446
when        'PONTOS DE ILUMINAÇAO PUBLICA'        then        151449
when        'PROJETOS APROVADOS FMDCA'        then        151452
when        'REFORMAS/AMPLIAÇÃO'        then        151455
when        'SATISFAÇÃO DOS PRODUTORES ATENDIDOS'        then        151458
when        'SESSOES LEGISLATIVAS EXTRAORDINARIAS'        then        151461
when        'UNIDADES AMPLIADAS/ REFORMADAS'        then        151464
when        'VISITA TECNICA NASCENTES DE RIOS'        then        151467
when        'SATISFAÇÃO DA PRESTAÇÃO DE LIMPEZA PÚBLICA'        then        151456
when        'SATISFAÇÃO DOS USUARIOS DA MERENDA ESCOLAR'        then        151459
when        'SESSOES LEGISLATIVAS ORDINARIAS'        then        151462
when        'VIAS VICINAIS MANTIDAS'        then        151465
        end as id
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS produto,
                             JSON_QUERY(
                (SELECT
                case i.cd_UnidadeDeMedida
                when        1        then        41879
when        2        then        41876
when        3        then        41877
when        4        then        42627
when        5        then        41878
when        6        then        41881
when        7        then        41880
when        8        then        42626
when        9        then        41882
                end as id
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS unidadeMedida,
                                             JSON_QUERY(
                (SELECT
                20800 as id
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS localizador
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS metasFisicas
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
from CONTAcaoExecucao  ae
join  CONTPROJETOATIVIDADE pa on pa.cd_projativ = ae.cd_ProjAtiv
JOIN contindicador I ON  i.cd_Indicador = pa.cd_Indicador
        `;

        const result = await masterConnection.query(userQuery);

        const resultData = result.recordset;

        const transformedData = resultData.map(record => {
            let parsedContent;
        
            // Verifique se o campo content existe e é uma string válida
            if (typeof record.content !== 'string') {
                console.error('Campo content ausente ou inválido:', record);
                return null; // Pula este registro
            }
        
            try {
                parsedContent = JSON.parse(record.content);
            } catch (error) {
                console.error('Erro ao fazer o parse do JSON:', error);
                console.error('Conteúdo do registro problemático:', record.content);
                return null; // Pula este registro
            }
        
            if (!parsedContent || !parsedContent.ppa || !parsedContent.entidade || !parsedContent.organograma || !parsedContent.programa || !parsedContent.acao || !parsedContent.funcao || !parsedContent.subfuncao) {
                console.error('Registro com conteúdo incompleto:', record);
                return null; // Pula este registro
            }
        
            return {
                idIntegracao: record.idIntegracao,
                content: {
                    ppa: {
                        id: parseInt(parsedContent.ppa.id, 10)
                    },
                    entidade: {
                        id: parsedContent.entidade.id
                    },
                    organograma: {
                        id: parsedContent.organograma.id
                    },
                    programa: {
                        id: parsedContent.programa.id
                    },
                    acao: {
                        id: parsedContent.acao.id
                    },
                    funcao: {
                        id: parsedContent.funcao.id
                    },
                    subfuncao: {
                        id: parsedContent.subfuncao.id
                    },
                    metasFisicas: [
                        {
                            metaFisica: {
                                total: parsedContent.metasFisicas?.metaFisica?.total,
                                ano1: parsedContent.metasFisicas?.metaFisica?.ano1,
                                ano2: parsedContent.metasFisicas?.metaFisica?.ano2,
                                ano3: parsedContent.metasFisicas?.metaFisica?.ano3,
                                ano4: parsedContent.metasFisicas?.metaFisica?.ano4
                            },
                            produto: {
                                id: parsedContent.metasFisicas?.produto?.id
                            },
                            unidadeMedida: {
                                id: parsedContent.metasFisicas?.unidadeMedida?.id
                            },
                            localizador: {
                                id: parsedContent.metasFisicas?.localizador?.id
                            }
                        }
                    ]
                }
            };
        }).filter(record => record !== null); // Filtra os registros que retornaram null
        

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
             const url = `https://pla-sl-rest.betha.cloud/planejamento/service-layer/v2/api/grupos-despesas-ppa`;
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
        // Lidar com erros de conexão ou consulta aqui
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        await sql.close();
    }
}

// Chamar a função principal
main();
