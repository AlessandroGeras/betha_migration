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
            select ROW_NUMBER() OVER (ORDER BY cd_projativ) AS idIntegracao,
JSON_QUERY( (SELECT JSON_QUERY( (SELECT '15749' as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) ) AS loa,
 cd_exercicio as exercicio, 
 JSON_QUERY( (SELECT case cd_cecam
 when 1995 then 11241
 when 2783 then 11358
 when 3052 then 11357
 when 3068 then 11292
 end as id 
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) ) AS entidade, 
 JSON_QUERY( (SELECT case cd_unidorca 
when        '01.00.00'        then        163496
when        '01.01.00'        then        163497
when        '01.02.00'        then        163498
when        '02.00.00'        then        163499
when        '02.01.00'        then        163500
when        '02.02.00'        then        163501
when        '02.03.00'        then        163502
when        '02.04.00'        then        163503
when        '02.05.00'        then        163504
when        '02.06.00'        then        165807
when        '02.07.00'        then        165803
when        '02.08.00'        then        165804
when        '02.09.00'        then        165809
when        '02.10.00'        then        165810
 end as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) ) AS organograma, 
 JSON_QUERY( (SELECT case cd_programa
  when        '0001'        then        110771
when        '0000'        then        110772
when        '0004'        then        110773
when        '0005'        then        110774
when        '0002'        then        110775
when        '0003'        then        110776
when        '0006'        then        110777
when        '0007'        then        110778
when        '0015'        then        110779
when        '0009'        then        110780
when        '0011'        then        110781
when        '0012'        then        110782
when        '0018'        then        110783
when        '0017'        then        110784
when        '0013'        then        110785
when        '0020'        then        110786
when        '0016'        then        110787
when        '0019'        then        110788
when        '0021'        then        110789
when        '0008'        then        110790
when        '0010'        then        110791
when        '0022'        then        110792
when        '0023'        then        110793
when        '9999'        then        110794
when        '0014'        then        110795 
 end as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) ) AS programa,
 JSON_QUERY( (SELECT case 
when        cd_funcao like        '%01.%'        then        40100
when        cd_funcao like        '%02.%'        then        40101
when        cd_funcao like        '%03.%'        then        40102
when        cd_funcao like        '%04.%'        then        40103
when        cd_funcao like        '%05.%'        then        40104
when        cd_funcao like        '%06.%'        then        40105
when        cd_funcao like        '%07.%'        then        40106
when        cd_funcao like        '%08.%'        then        40107
when        cd_funcao like        '%09.%'        then        40108
when        cd_funcao like        '%10.%'        then        40109
when        cd_funcao like        '%11.%'        then        40110
when        cd_funcao like        '%12.%'        then        40111
when        cd_funcao like        '%13.%'        then        40112
when        cd_funcao like        '%14.%'        then        40113
when        cd_funcao like        '%15.%'        then        40114
when        cd_funcao like        '%16.%'        then        40115
when        cd_funcao like        '%17.%'        then        40116
when        cd_funcao like        '%18.%'        then        40117
when        cd_funcao like        '%19.%'        then        40118
when        cd_funcao like        '%20.%'        then        40119
when        cd_funcao like        '%21.%'        then        40120
when        cd_funcao like        '%22.%'        then        40121
when        cd_funcao like        '%23.%'        then        40122
when        cd_funcao like        '%24.%'        then        40123
when        cd_funcao like        '%25.%'        then        40124
when        cd_funcao like        '%26.%'        then        40125
when        cd_funcao like        '%27.%'        then        40126
when        cd_funcao like        '%28.%'        then        40127
when        cd_funcao like        '%99.%'        then        40128
 end as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) ) AS funcao,
 JSON_QUERY( (SELECT case 
when        cd_funcao like        '%.031%'        then        175917
when        cd_funcao like        '%.032%'        then        175918
when        cd_funcao like        '%.061%'        then        175919
when        cd_funcao like        '%.062%'        then        175920
when        cd_funcao like        '%.091%'        then        175921
when        cd_funcao like        '%.092%'        then        175922
when        cd_funcao like        '%.121%'        then        175923
when        cd_funcao like        '%.122%'        then        175924
when        cd_funcao like        '%.123%'        then        175925
when        cd_funcao like        '%.124%'        then        175926
when        cd_funcao like        '%.125%'        then        175927
when        cd_funcao like        '%.126%'        then        175928
when        cd_funcao like        '%.127%'        then        175929
when        cd_funcao like        '%.128%'        then        175930
when        cd_funcao like        '%.129%'        then        175931
when        cd_funcao like        '%.130%'        then        175932
when        cd_funcao like        '%.131%'        then        175933
when        cd_funcao like        '%.151%'        then        175934
when        cd_funcao like        '%.152%'        then        175935
when        cd_funcao like        '%.153%'        then        175936
when        cd_funcao like        '%.181%'        then        175937
when        cd_funcao like        '%.182%'        then        175938
when        cd_funcao like        '%.183%'        then        175939
when        cd_funcao like        '%.211%'        then        175940
when        cd_funcao like        '%.212%'        then        175941
when        cd_funcao like        '%.241%'        then        175942
when        cd_funcao like        '%.242%'        then        175943
when        cd_funcao like        '%.243%'        then        175944
when        cd_funcao like        '%.244%'        then        175945
when        cd_funcao like        '%.271%'        then        175946
when        cd_funcao like        '%.272%'        then        175947
when        cd_funcao like        '%.273%'        then        175948
when        cd_funcao like        '%.274%'        then        175949
when        cd_funcao like        '%.301%'        then        175950
when        cd_funcao like        '%.302%'        then        175951
when        cd_funcao like        '%.303%'        then        175952
when        cd_funcao like        '%.304%'        then        175953
when        cd_funcao like        '%.305%'        then        175954
when        cd_funcao like        '%.306%'        then        175955
when        cd_funcao like        '%.331%'        then        175956
when        cd_funcao like        '%.332%'        then        175957
when        cd_funcao like        '%.333%'        then        175958
when        cd_funcao like        '%.334%'        then        175959
when        cd_funcao like        '%.361%'        then        175960
when        cd_funcao like        '%.362%'        then        175961
when        cd_funcao like        '%.363%'        then        175962
when        cd_funcao like        '%.364%'        then        175963
when        cd_funcao like        '%.365%'        then        175964
when        cd_funcao like        '%.366%'        then        175965
when        cd_funcao like        '%.367%'        then        175966
when        cd_funcao like        '%.368%'        then        175967
when        cd_funcao like        '%.391%'        then        175968
when        cd_funcao like        '%.392%'        then        175969
when        cd_funcao like        '%.421%'        then        175970
when        cd_funcao like        '%.422%'        then        175971
when        cd_funcao like        '%.423%'        then        175972
when        cd_funcao like        '%.451%'        then        175973
when        cd_funcao like        '%.452%'        then        175974
when        cd_funcao like        '%.453%'        then        175975
when        cd_funcao like        '%.481%'        then        175976
when        cd_funcao like        '%.482%'        then        175977
when        cd_funcao like        '%.511%'        then        175978
when        cd_funcao like        '%.512%'        then        175979
when        cd_funcao like        '%.541%'        then        175980
when        cd_funcao like        '%.542%'        then        175981
when        cd_funcao like        '%.543%'        then        175982
when        cd_funcao like        '%.544%'        then        175983
when        cd_funcao like        '%.545%'        then        175984
when        cd_funcao like        '%.571%'        then        175985
when        cd_funcao like        '%.572%'        then        175986
when        cd_funcao like        '%.573%'        then        175987
when        cd_funcao like        '%.601%'        then        175988
when        cd_funcao like        '%.602%'        then        175989
when        cd_funcao like        '%.603%'        then        175990
when        cd_funcao like        '%.604%'        then        175991
when        cd_funcao like        '%.605%'        then        175992
when        cd_funcao like        '%.606%'        then        175993
when        cd_funcao like        '%.607%'        then        175994
when        cd_funcao like        '%.608%'        then        175995
when        cd_funcao like        '%.609%'        then        175996
when        cd_funcao like        '%.631%'        then        175997
when        cd_funcao like        '%.632%'        then        175998
when        cd_funcao like        '%.661%'        then        175999
when        cd_funcao like        '%.662%'        then        176000
when        cd_funcao like        '%.663%'        then        176001
when        cd_funcao like        '%.664%'        then        176002
when        cd_funcao like        '%.665%'        then        176003
when        cd_funcao like        '%.691%'        then        176004
when        cd_funcao like        '%.692%'        then        176005
when        cd_funcao like        '%.693%'        then        176006
when        cd_funcao like        '%.694%'        then        176007
when        cd_funcao like        '%.695%'        then        176008
when        cd_funcao like        '%.721%'        then        176009
when        cd_funcao like        '%.722%'        then        176010
when        cd_funcao like        '%.751%'        then        176011
when        cd_funcao like        '%.752%'        then        176012
when        cd_funcao like        '%.753%'        then        176013
when        cd_funcao like        '%.754%'        then        176014
when        cd_funcao like        '%.781%'        then        176015
when        cd_funcao like        '%.782%'        then        176016
when        cd_funcao like        '%.783%'        then        176017
when        cd_funcao like        '%.784%'        then        176018
when        cd_funcao like        '%.785%'        then        176019
when        cd_funcao like        '%.811%'        then        176020
when        cd_funcao like        '%.812%'        then        176021
when        cd_funcao like        '%.813%'        then        176022
when        cd_funcao like        '%.841%'        then        176023
when        cd_funcao like        '%.842%'        then        176024
when        cd_funcao like        '%.843%'        then        176025
when        cd_funcao like        '%.844%'        then        176026
when        cd_funcao like        '%.845%'        then        176027
when        cd_funcao like        '%.846%'        then        176028
when        cd_funcao like        '%.847%'        then        176029
when        cd_funcao like        '%.997%'        then        176030
when        cd_funcao like        '%.999%'        then        176031
 else 156920 end as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) ) AS subfuncao,
 JSON_QUERY( (SELECT case cd_projativ
 when        1001        then        471609
when        1003        then        471610
when        1005        then        471611
when        1002        then        471612
when        1006        then        471613
when        1007        then        471614
when        1004        then        471615
when        1008        then        471616
when        1016        then        471617
when        1018        then        471618
when        1014        then        471619
when        1015        then        471620
when        1026        then        471621
when        1010        then        471622
when        1025        then        471623
when        1019        then        471624
when        1028        then        471625
when        1017        then        471626
when        1022        then        471627
when        1012        then        471628
when        1020        then        471629
when        1023        then        471630
when        1009        then        471631
when        1034        then        471632
when        1030        then        471633
when        1033        then        471634
when        1032        then        471635
when        1011        then        471636
when        1036        then        471637
when        1013        then        471638
when        1042        then        471639
when        1024        then        471640
when        1021        then        471641
when        1064        then        471642
when        1029        then        471643
when        1050        then        471644
when        1037        then        471645
when        1077        then        471646
when        1076        then        471647
when        1041        then        471648
when        1031        then        471649
when        1057        then        471650
when        1053        then        471651
when        1046        then        471652
when        1040        then        471653
when        1054        then        471654
when        1067        then        471655
when        1071        then        471656
when        1043        then        471657
when        1070        then        471658
when        1045        then        471659
when        1027        then        471660
when        1038        then        471661
when        1035        then        471662
when        1047        then        471663
when        1056        then        471664
when        1039        then        471665
when        1080        then        471666
when        1078        then        471667
when        1079        then        471668
when        1088        then        471669
when        1049        then        471670
when        1048        then        471671
when        1044        then        471672
when        1081        then        471673
when        1059        then        471674
when        1090        then        471675
when        1086        then        471676
when        1082        then        471677
when        1058        then        471678
when        1061        then        471679
when        1066        then        471680
when        1093        then        471681
when        1063        then        471682
when        1060        then        471683
when        2022        then        471684
when        1092        then        471685
when        1051        then        471686
when        1069        then        471687
when        2033        then        471688
when        1065        then        471689
when        2001        then        471690
when        2038        then        471691
when        1072        then        471692
when        1074        then        471693
when        1068        then        471694
when        2003        then        471695
when        1087        then        471696
when        1073        then        471697
when        1052        then        471698
when        1085        then        471699
when        2007        then        471700
when        1084        then        471701
when        1075        then        471702
when        2041        then        471703
when        1089        then        471704
when        1099        then        471705
when        2062        then        471706
when        1100        then        471707
when        2065        then        471708
when        1097        then        471709
when        1091        then        471710
when        2066        then        471711
when        2011        then        471712
when        1055        then        471713
when        2014        then        471714
when        2021        then        471715
when        1094        then        471716
when        1103        then        471717
when        1096        then        471718
when        2006        then        471719
when        1062        then        471720
when        2031        then        471721
when        2012        then        471722
when        2015        then        471723
when        1105        then        471724
when        2049        then        471725
when        1083        then        471726
when        2055        then        471727
when        2052        then        471728
when        2067        then        471729
when        1098        then        471730
when        2087        then        471731
when        1101        then        471732
when        2016        then        471733
when        1095        then        471734
when        1106        then        471735
when        2058        then        471736
when        1104        then        471737
when        1102        then        471738
when        2018        then        471739
when        2004        then        471740
when        2061        then        471741
when        2063        then        471742
when        1110        then        471743
when        1111        then        471744
when        2017        then        471745
when        2005        then        471746
when        2009        then        471747
when        2088        then        471748
when        2020        then        471749
when        1107        then        471750
when        2084        then        471751
when        1108        then        471752
when        2026        then        471753
when        1109        then        471754
when        2032        then        471755
when        2092        then        471756
when        2090        then        471757
when        2030        then        471758
when        2010        then        471759
when        2002        then        471760
when        2019        then        471761
when        2093        then        471762
when        2039        then        471763
when        2034        then        471764
when        2044        then        471765
when        2008        then        471766
when        2025        then        471767
when        2013        then        471768
when        2042        then        471769
when        2027        then        471770
when        2045        then        471771
when        2023        then        471772
when        2047        then        471773
when        2028        then        471774
when        2024        then        471775
when        2035        then        471776
when        2037        then        471777
when        2050        then        471778
when        2036        then        471779
when        2046        then        471780
when        2029        then        471781
when        2053        then        471782
when        2040        then        471783
when        2059        then        471784
when        2056        then        471785
when        2048        then        471786
when        2043        then        471787
when        2060        then        471788
when        2057        then        471789
when        2073        then        471790
when        2051        then        471791
when        2064        then        471792
when        2068        then        471793
when        2078        then        471794
when        2074        then        471795
when        2079        then        471796
when        2054        then        471797
when        2070        then        471798
when        2071        then        471799
when        2089        then        471800
when        2069        then        471801
when        2080        then        471802
when        2082        then        471803
when        2083        then        471804
when        2072        then        471805
when        2086        then        471806
when        9999        then        471807
when        2075        then        471808
when        2076        then        471809
when        2091        then        471810
when        2085        then        471811
when        2077        then        471812
when        2081        then        471813
when        2094        then        471814
 end as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) ) AS acao
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) ) AS content 
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
        /* const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        return */

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
                console.log('Enviando o seguinte corpo para a API:', JSON.stringify(batch, null, 2));
        
                const response = await fetch(`https://pla-sl-rest.betha.cloud/planejamento/service-layer/v2/api/grupos-despesas-loa`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 25a840ae-b57a-4030-903a-bcccf2386f30'
                    },
                    body: JSON.stringify(batch)
                });
        
                const responseBody = await response.json();
        
                if (response.ok) {
                    console.log('Dados enviados com sucesso para a API.');
                    batch.forEach(record => {
                        report.push({ record, status: 'success', response: responseBody });
                    });
        
                    if (responseBody.idLote) {
                        reportIds.push(responseBody.idLote);
                    }
                } else {
                    console.error('Erro ao enviar os dados para a API:', response.statusText);
                    batch.forEach(record => {
                        report.push({ record, status: 'failed', response: responseBody });
                    });
                }
            } catch (err) {
                console.error('Erro ao enviar o batch para a API:', err);
                batch.forEach(record => {
                    report.push({ record, status: 'error', error: err.message });
                });
            }
        }
        
        // Salvar o relatório em 'report.json'
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));
        console.log('Relatório salvo em report.json com sucesso.');
        
        // Salvar os reportIds no arquivo 'report_id.json'
        fs.writeFileSync('report_id.json', JSON.stringify(reportIds, null, 2));
        console.log('report_id.json salvo com sucesso.');
        

    } catch (error) {
        console.error('Erro no processo:', error);
    } finally {
        await sql.close(); // Fechar a conexão com o SQL Server
        console.log('Conexão com o SQL Server fechada.');
    }
}

// Executar a função principal
main();