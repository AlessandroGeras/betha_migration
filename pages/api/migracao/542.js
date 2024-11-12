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
            	select * from (

select ROW_NUMBER() OVER (ORDER BY cd_projativ) AS idIntegracao,
JSON_QUERY( (SELECT 
 '2024' as exercicio, 
  JSON_QUERY( (SELECT 20986 as id 
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) ) AS localizador, 
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

 end as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) ) AS acao,
    JSON_QUERY(
    (SELECT
 case cd_CategoriaEconomicaDespesa
when	30000000	then	15169780
when	31300000	then	15169781
when	31320000	then	15169782
when	31410000	then	15169783
when	31500000	then	15169784
when	31704100	then	15169785
when	31720000	then	15169786
when	31760000	then	15169787
when	31900000	then	15169788
when	31900118	then	15169789
when	31900151	then	15169790
when	31900300	then	15169791
when	31900304	then	15169792
when	31900352	then	15169793
when	31900401	then	15169794
when	31900415	then	15169795
when	31900701	then	15169796
when	31900800	then	15169797
when	31901105	then	15169798
when	31901110	then	15169799
when	31901133	then	15169800
when	31901144	then	15169801
when	31901150	then	15169802
when	31901174	then	15169803
when	31901200	then	15169804
when	31000000	then	15169805
when	31304100	then	15169806
when	31350000	then	15169807
when	31420000	then	15169808
when	31600000	then	15169809
when	31709900	then	15169810
when	31730000	then	15169811
when	31800000	then	15169812
when	31900100	then	15169813
when	31900121	then	15169814
when	31900152	then	15169815
when	31900301	then	15169816
when	31900305	then	15169817
when	31900389	then	15169818
when	31900410	then	15169819
when	31900451	then	15169820
when	31900702	then	15169821
when	31901100	then	15169822
when	31901107	then	15169823
when	31901111	then	15169824
when	31901137	then	15169825
when	31901145	then	15169826
when	31901151	then	15169827
when	31901175	then	15169828
when	31901201	then	15169829
when	31200000	then	15169830
when	31309900	then	15169831
when	31360000	then	15169832
when	31450000	then	15169833
when	31670000	then	15169834
when	31710000	then	15169835
when	31740000	then	15169836
when	31800400	then	15169837
when	31900101	then	15169838
when	31900123	then	15169839
when	31900189	then	15169840
when	31900302	then	15169841
when	31900308	then	15169842
when	31900399	then	15169843
when	31900413	then	15169844
when	31900499	then	15169845
when	31900704	then	15169846
when	31901101	then	15169847
when	31901108	then	15169848
when	31901113	then	15169849
when	31901142	then	15169850
when	31901147	then	15169851
when	31901152	then	15169852
when	31901177	then	15169853
when	31901242	then	15169854
when	31220000	then	15169855
when	31310000	then	15169856
when	31400000	then	15169857
when	31460000	then	15169858
when	31700000	then	15169859
when	31717000	then	15169860
when	31750000	then	15169861
when	31809900	then	15169862
when	31900106	then	15169863
when	31900126	then	15169864
when	31900199	then	15169865
when	31900303	then	15169866
when	31900351	then	15169867
when	31900400	then	15169868
when	31900414	then	15169869
when	31900700	then	15169870
when	31900799	then	15169871
when	31901104	then	15169872
when	31901109	then	15169873
when	31901131	then	15169874
when	31901143	then	15169875
when	31901149	then	15169876
when	31901173	then	15169877
when	31901199	then	15169878
when	31901243	then	15169879
when	31901245	then	15169880
when	31901301	then	15169881
when	31901308	then	15169882
when	31901318	then	15169883
when	31901608	then	15169884
when	31901644	then	15169885
when	31901700	then	15169886
when	31908600	then	15169887
when	31909108	then	15169888
when	31909112	then	15169889
when	31909116	then	15169890
when	31909120	then	15169891
when	31909126	then	15169892
when	31909130	then	15169893
when	31909197	then	15169894
when	31909203	then	15169895
when	31909212	then	15169896
when	31909291	then	15169897
when	31909299	then	15169898
when	31909403	then	15169899
when	31909414	then	15169900
when	31909600	then	15169901
when	31909900	then	15169902
when	31911300	then	15169903
when	31911309	then	15169904
when	31901252	then	15169905
when	31901302	then	15169906
when	31901309	then	15169907
when	31901340	then	15169908
when	31901632	then	15169909
when	31901645	then	15169910
when	31901702	then	15169911
when	31909100	then	15169912
when	31909109	then	15169913
when	31909113	then	15169914
when	31909117	then	15169915
when	31909123	then	15169916
when	31909127	then	15169917
when	31909131	then	15169918
when	31909199	then	15169919
when	31909204	then	15169920
when	31909213	then	15169921
when	31909294	then	15169922
when	31909400	then	15169923
when	31909404	then	15169924
when	31909415	then	15169925
when	31909601	then	15169926
when	31910000	then	15169927
when	31911302	then	15169928
when	31911310	then	15169929
when	31901299	then	15169930
when	31901304	then	15169931
when	31901310	then	15169932
when	31901399	then	15169933
when	31901634	then	15169934
when	31901676	then	15169935
when	31901799	then	15169936
when	31909101	then	15169937
when	31909110	then	15169938
when	31909114	then	15169939
when	31909118	then	15169940
when	31909124	then	15169941
when	31909128	then	15169942
when	31909136	then	15169943
when	31909200	then	15169944
when	31909207	then	15169945
when	31909216	then	15169946
when	31909296	then	15169947
when	31909401	then	15169948
when	31909406	then	15169949
when	31909498	then	15169950
when	31909602	then	15169951
when	31910400	then	15169952
when	31911304	then	15169953
when	31911311	then	15169954
when	31901300	then	15169955
when	31901307	then	15169956
when	31901311	then	15169957
when	31901600	then	15169958
when	31901636	then	15169959
when	31901699	then	15169960
when	31906700	then	15169961
when	31909102	then	15169962
when	31909111	then	15169963
when	31909115	then	15169964
when	31909119	then	15169965
when	31909125	then	15169966
when	31909129	then	15169967
when	31909137	then	15169968
when	31909201	then	15169969
when	31909211	then	15169970
when	31909217	then	15169971
when	31909298	then	15169972
when	31909402	then	15169973
when	31909413	then	15169974
when	31909499	then	15169975
when	31909699	then	15169976
when	31910800	then	15169977
when	31911308	then	15169978
when	31911312	then	15169979
when	31911320	then	15169980
when	31911399	then	15169981
when	31919152	then	15169982
when	31919200	then	15169983
when	31919207	then	15169984
when	31919211	then	15169985
when	31919291	then	15169986
when	31919400	then	15169987
when	31919600	then	15169988
when	31920000	then	15169989
when	31950400	then	15169990
when	31951600	then	15169991
when	31959400	then	15169992
when	31959900	then	15169993
when	31961100	then	15169994
when	31969100	then	15169995
when	31969499	then	15169996
when	32000000	then	15169997
when	32310000	then	15169998
when	32400000	then	15169999
when	32460000	then	15170000
when	32700000	then	15170001
when	32740000	then	15170002
when	32900000	then	15170003
when	32902199	then	15170004
when	31911321	then	15170005
when	31918600	then	15170006
when	31919153	then	15170007
when	31919204	then	15170008
when	31919208	then	15170009
when	31919212	then	15170010
when	31919296	then	15170011
when	31919451	then	15170012
when	31919601	then	15170013
when	31930000	then	15170014
when	31950700	then	15170015
when	31956700	then	15170016
when	31959498	then	15170017
when	31960000	then	15170018
when	31961300	then	15170019
when	31969200	then	15170020
when	31969600	then	15170021
when	32200000	then	15170022
when	32320000	then	15170023
when	32410000	then	15170024
when	32500000	then	15170025
when	32710000	then	15170026
when	32750000	then	15170027
when	32902100	then	15170028
when	32902200	then	15170029
when	31911322	then	15170030
when	31919100	then	15170031
when	31919154	then	15170032
when	31919205	then	15170033
when	31919209	then	15170034
when	31919213	then	15170035
when	31919298	then	15170036
when	31919498	then	15170037
when	31919699	then	15170038
when	31940000	then	15170039
when	31951100	then	15170040
when	31959100	then	15170041
when	31959499	then	15170042
when	31960400	then	15170043
when	31961600	then	15170044
when	31969400	then	15170045
when	31969900	then	15170046
when	32220000	then	15170047
when	32350000	then	15170048
when	32420000	then	15170049
when	32600000	then	15170050
when	32720000	then	15170051
when	32760000	then	15170052
when	32902101	then	15170053
when	32902201	then	15170054
when	31911323	then	15170055
when	31919151	then	15170056
when	31919199	then	15170057
when	31919206	then	15170058
when	31919210	then	15170059
when	31919251	then	15170060
when	31919299	then	15170061
when	31919499	then	15170062
when	31919900	then	15170063
when	31950000	then	15170064
when	31951300	then	15170065
when	31959200	then	15170066
when	31959600	then	15170067
when	31960700	then	15170068
when	31966700	then	15170069
when	31969498	then	15170070
when	31990000	then	15170071
when	32300000	then	15170072
when	32360000	then	15170073
when	32450000	then	15170074
when	32670000	then	15170075
when	32730000	then	15170076
when	32800000	then	15170077
when	32902102	then	15170078
when	32902202	then	15170079
when	32902299	then	15170080
when	32902303	then	15170081
when	32902401	then	15170082
when	32902501	then	15170083
when	32909200	then	15170084
when	32912100	then	15170085
when	32940000	then	15170086
when	32959200	then	15170087
when	32962200	then	15170088
when	33000000	then	15170089
when	33220000	then	15170090
when	33223600	then	15170091
when	33304100	then	15170092
when	33308199	then	15170093
when	33310000	then	15170094
when	33320000	then	15170095
when	33323000	then	15170096
when	33323600	then	15170097
when	33329300	then	15170098
when	33359200	then	15170099
when	33369200	then	15170100
when	33408100	then	15170101
when	33408104	then	15170102
when	33409300	then	15170103
when	33419200	then	15170104
when	32902300	then	15170105
when	32902304	then	15170106
when	32902402	then	15170107
when	32902599	then	15170108
when	32909300	then	15170109
when	32912200	then	15170110
when	32950000	then	15170111
when	32959900	then	15170112
when	32969200	then	15170113
when	33200000	then	15170114
when	33221400	then	15170115
when	33223900	then	15170116
when	33308100	then	15170117
when	33309200	then	15170118
when	33314100	then	15170119
when	33321400	then	15170120
when	33323200	then	15170121
when	33323900	then	15170122
when	33329900	then	15170123
when	33359900	then	15170124
when	33369900	then	15170125
when	33408101	then	15170126
when	33408199	then	15170127
when	33409900	then	15170128
when	33419900	then	15170129
when	32902301	then	15170130
when	32902399	then	15170131
when	32902499	then	15170132
when	32902600	then	15170133
when	32909900	then	15170134
when	32920000	then	15170135
when	32952100	then	15170136
when	32960000	then	15170137
when	32969900	then	15170138
when	33204100	then	15170139
when	33223000	then	15170140
when	33229900	then	15170141
when	33308101	then	15170142
when	33309300	then	15170143
when	33319200	then	15170144
when	33321800	then	15170145
when	33323300	then	15170146
when	33324700	then	15170147
when	33350000	then	15170148
when	33360000	then	15170149
when	33400000	then	15170150
when	33408102	then	15170151
when	33409100	then	15170152
when	33410000	then	15170153
when	33420000	then	15170154
when	32902302	then	15170155
when	32902400	then	15170156
when	32902500	then	15170157
when	32909100	then	15170158
when	32910000	then	15170159
when	32930000	then	15170160
when	32952200	then	15170161
when	32962100	then	15170162
when	32990000	then	15170163
when	33209900	then	15170164
when	33223500	then	15170165
when	33300000	then	15170166
when	33308102	then	15170167
when	33309900	then	15170168
when	33319900	then	15170169
when	33322000	then	15170170
when	33323500	then	15170171
when	33329200	then	15170172
when	33354100	then	15170173
when	33364100	then	15170174
when	33404100	then	15170175
when	33408103	then	15170176
when	33409200	then	15170177
when	33414100	then	15170178
when	33421400	then	15170179
when	33421800	then	15170180
when	33423500	then	15170181
when	33429200	then	15170182
when	33454100	then	15170183
when	33460000	then	15170184
when	33469900	then	15170185
when	33502000	then	15170186
when	33503500	then	15170187
when	33503952	then	15170188
when	33503956	then	15170189
when	33504305	then	15170190
when	33504399	then	15170191
when	33509200	then	15170192
when	33609200	then	15170193
when	33678200	then	15170194
when	33709900	then	15170195
when	33723900	then	15170196
when	33750000	then	15170197
when	33764100	then	15170198
when	33801400	then	15170199
when	33803500	then	15170200
when	33804100	then	15170201
when	33900400	then	15170202
when	33900603	then	15170203
when	33900800	then	15170204
when	33423000	then	15170205
when	33423600	then	15170206
when	33429300	then	15170207
when	33459100	then	15170208
when	33464100	then	15170209
when	33500000	then	15170210
when	33503000	then	15170211
when	33503600	then	15170212
when	33503953	then	15170213
when	33503999	then	15170214
when	33504306	then	15170215
when	33504700	then	15170216
when	33509900	then	15170217
when	33609900	then	15170218
when	33678300	then	15170219
when	33710000	then	15170220
when	33729900	then	15170221
when	33754100	then	15170222
when	33769900	then	15170223
when	33803000	then	15170224
when	33803600	then	15170225
when	33809200	then	15170226
when	33900600	then	15170227
when	33900604	then	15170228
when	33900801	then	15170229
when	33423200	then	15170230
when	33423900	then	15170231
when	33429900	then	15170232
when	33459200	then	15170233
when	33469100	then	15170234
when	33501400	then	15170235
when	33503100	then	15170236
when	33503900	then	15170237
when	33503954	then	15170238
when	33504100	then	15170239
when	33504307	then	15170240
when	33508100	then	15170241
when	33600000	then	15170242
when	33670000	then	15170243
when	33700000	then	15170244
when	33717000	then	15170245
when	33730000	then	15170246
when	33759900	then	15170247
when	33800000	then	15170248
when	33803300	then	15170249
when	33803700	then	15170250
when	33809900	then	15170251
when	33900601	then	15170252
when	33900605	then	15170253
when	33900805	then	15170254
when	33423300	then	15170255
when	33424700	then	15170256
when	33450000	then	15170257
when	33459900	then	15170258
when	33469200	then	15170259
when	33501800	then	15170260
when	33503300	then	15170261
when	33503951	then	15170262
when	33503955	then	15170263
when	33504300	then	15170264
when	33504308	then	15170265
when	33508500	then	15170266
when	33604500	then	15170267
when	33674500	then	15170268
when	33704100	then	15170269
when	33720000	then	15170270
when	33740000	then	15170271
when	33760000	then	15170272
when	33800400	then	15170273
when	33803400	then	15170274
when	33803900	then	15170275
when	33900000	then	15170276
when	33900602	then	15170277
when	33900699	then	15170278
when	33900809	then	15170279
when	33900811	then	15170280
when	33900846	then	15170281
when	33900856	then	15170282
when	33901008	then	15170283
when	33901800	then	15170284
when	33902800	then	15170285
when	33903007	then	15170286
when	33903014	then	15170287
when	33903021	then	15170288
when	33903036	then	15170289
when	33903099	then	15170290
when	33903203	then	15170291
when	33903400	then	15170292
when	33903608	then	15170293
when	33903634	then	15170294
when	33903648	then	15170295
when	33903900	then	15170296
when	33903943	then	15170297
when	33903953	then	15170298
when	33903970	then	15170299
when	33903990	then	15170300
when	33904006	then	15170301
when	33904100	then	15170302
when	33904800	then	15170303
when	33904900	then	15170304
when	33900813	then	15170305
when	33900847	then	15170306
when	33900899	then	15170307
when	33901099	then	15170308
when	33901900	then	15170309
when	33902900	then	15170310
when	33903009	then	15170311
when	33903016	then	15170312
when	33903023	then	15170313
when	33903039	then	15170314
when	33903100	then	15170315
when	33903204	then	15170316
when	33903500	then	15170317
when	33903623	then	15170318
when	33903635	then	15170319
when	33903699	then	15170320
when	33903917	then	15170321
when	33903944	then	15170322
when	33903954	then	15170323
when	33903972	then	15170324
when	33903999	then	15170325
when	33904012	then	15170326
when	33904500	then	15170327
when	33904806	then	15170328
when	33905300	then	15170329
when	33900814	then	15170330
when	33900848	then	15170331
when	33901000	then	15170332
when	33901400	then	15170333
when	33902000	then	15170334
when	33903000	then	15170335
when	33903010	then	15170336
when	33903017	then	15170337
when	33903028	then	15170338
when	33903060	then	15170339
when	33903200	then	15170340
when	33903299	then	15170341
when	33903600	then	15170342
when	33903630	then	15170343
when	33903645	then	15170344
when	33903700	then	15170345
when	33903925	then	15170346
when	33903947	then	15170347
when	33903964	then	15170348
when	33903977	then	15170349
when	33904000	then	15170350
when	33904014	then	15170351
when	33904600	then	15170352
when	33904807	then	15170353
when	33905400	then	15170354
when	33900815	then	15170355
when	33900853	then	15170356
when	33901001	then	15170357
when	33901500	then	15170358
when	33902700	then	15170359
when	33903001	then	15170360
when	33903011	then	15170361
when	33903020	then	15170362
when	33903035	then	15170363
when	33903098	then	15170364
when	33903202	then	15170365
when	33903300	then	15170366
when	33903607	then	15170367
when	33903632	then	15170368
when	33903646	then	15170369
when	33903800	then	15170370
when	33903932	then	15170371
when	33903950	then	15170372
when	33903965	then	15170373
when	33903978	then	15170374
when	33904001	then	15170375
when	33904099	then	15170376
when	33904700	then	15170377
when	33904899	then	15170378
when	33905500	then	15170379
when	33905600	then	15170380
when	33906200	then	15170381
when	33909100	then	15170382
when	33909104	then	15170383
when	33909134	then	15170384
when	33909204	then	15170385
when	33909214	then	15170386
when	33909230	then	15170387
when	33909234	then	15170388
when	33909238	then	15170389
when	33909246	then	15170390
when	33909250	then	15170391
when	33909257	then	15170392
when	33909291	then	15170393
when	33909296	then	15170394
when	33909302	then	15170395
when	33909308	then	15170396
when	33909600	then	15170397
when	33910400	then	15170398
when	33912800	then	15170399
when	33913200	then	15170400
when	33913925	then	15170401
when	33916200	then	15170402
when	33919105	then	15170403
when	33919233	then	15170404
when	33905700	then	15170405
when	33906700	then	15170406
when	33909101	then	15170407
when	33909105	then	15170408
when	33909197	then	15170409
when	33909206	then	15170410
when	33909215	then	15170411
when	33909231	then	15170412
when	33909235	then	15170413
when	33909239	then	15170414
when	33909247	then	15170415
when	33909253	then	15170416
when	33909258	then	15170417
when	33909292	then	15170418
when	33909299	then	15170419
when	33909303	then	15170420
when	33909314	then	15170421
when	33909800	then	15170422
when	33910415	then	15170423
when	33912900	then	15170424
when	33913400	then	15170425
when	33913999	then	15170426
when	33918600	then	15170427
when	33919199	then	15170428
when	33919239	then	15170429
when	33905800	then	15170430
when	33908100	then	15170431
when	33909102	then	15170432
when	33909120	then	15170433
when	33909199	then	15170434
when	33909208	then	15170435
when	33909218	then	15170436
when	33909232	then	15170437
when	33909236	then	15170438
when	33909240	then	15170439
when	33909248	then	15170440
when	33909254	then	15170441
when	33909259	then	15170442
when	33909293	then	15170443
when	33909300	then	15170444
when	33909305	then	15170445
when	33909399	then	15170446
when	33909900	then	15170447
when	33910499	then	15170448
when	33913000	then	15170449
when	33913500	then	15170450
when	33914000	then	15170451
when	33919100	then	15170452
when	33919200	then	15170453
when	33919247	then	15170454
when	33905900	then	15170455
when	33908600	then	15170456
when	33909103	then	15170457
when	33909125	then	15170458
when	33909200	then	15170459
when	33909210	then	15170460
when	33909220	then	15170461
when	33909233	then	15170462
when	33909237	then	15170463
when	33909245	then	15170464
when	33909249	then	15170465
when	33909256	then	15170466
when	33909267	then	15170467
when	33909295	then	15170468
when	33909301	then	15170469
when	33909307	then	15170470
when	33909500	then	15170471
when	33910000	then	15170472
when	33910800	then	15170473
when	33913100	then	15170474
when	33913900	then	15170475
when	33914700	then	15170476
when	33919104	then	15170477
when	33919230	then	15170478
when	33919291	then	15170479
when	33919292	then	15170480
when	33919600	then	15170481
when	33920000	then	15170482
when	33923000	then	15170483
when	33923600	then	15170484
when	33929900	then	15170485
when	33933010	then	15170486
when	33933099	then	15170487
when	33933900	then	15170488
when	33939230	then	15170489
when	33940000	then	15170490
when	33943011	then	15170491
when	33943200	then	15170492
when	33943950	then	15170493
when	33949239	then	15170494
when	33950400	then	15170495
when	33952000	then	15170496
when	33953011	then	15170497
when	33953100	then	15170498
when	33953300	then	15170499
when	33953700	then	15170500
when	33953999	then	15170501
when	33954700	then	15170502
when	33959100	then	15170503
when	33959299	then	15170504
when	33919293	then	15170505
when	33919700	then	15170506
when	33921400	then	15170507
when	33923200	then	15170508
when	33923900	then	15170509
when	33930000	then	15170510
when	33933011	then	15170511
when	33933200	then	15170512
when	33933950	then	15170513
when	33939239	then	15170514
when	33943000	then	15170515
when	33943035	then	15170516
when	33943202	then	15170517
when	33943999	then	15170518
when	33949299	then	15170519
when	33950800	then	15170520
when	33953000	then	15170521
when	33953035	then	15170522
when	33953200	then	15170523
when	33953400	then	15170524
when	33953800	then	15170525
when	33954100	then	15170526
when	33954800	then	15170527
when	33959200	then	15170528
when	33959300	then	15170529
when	33919299	then	15170530
when	33919800	then	15170531
when	33921800	then	15170532
when	33923300	then	15170533
when	33924000	then	15170534
when	33933000	then	15170535
when	33933035	then	15170536
when	33933202	then	15170537
when	33933999	then	15170538
when	33939299	then	15170539
when	33943009	then	15170540
when	33943036	then	15170541
when	33943299	then	15170542
when	33949200	then	15170543
when	33949900	then	15170544
when	33951400	then	15170545
when	33953009	then	15170546
when	33953036	then	15170547
when	33953202	then	15170548
when	33953500	then	15170549
when	33953900	then	15170550
when	33954500	then	15170551
when	33954900	then	15170552
when	33959230	then	15170553
when	33959600	then	15170554
when	33919300	then	15170555
when	33919900	then	15170556
when	33922000	then	15170557
when	33923500	then	15170558
when	33929200	then	15170559
when	33933009	then	15170560
when	33933036	then	15170561
when	33933299	then	15170562
when	33939200	then	15170563
when	33939900	then	15170564
when	33943010	then	15170565
when	33943099	then	15170566
when	33943900	then	15170567
when	33949230	then	15170568
when	33950000	then	15170569
when	33951800	then	15170570
when	33953010	then	15170571
when	33953099	then	15170572
when	33953299	then	15170573
when	33953600	then	15170574
when	33953950	then	15170575
when	33954600	then	15170576
when	33956700	then	15170577
when	33959239	then	15170578
when	33959900	then	15170579
when	33960000	then	15170580
when	33961800	then	15170581
when	33963010	then	15170582
when	33963099	then	15170583
when	33963299	then	15170584
when	33963600	then	15170585
when	33963950	then	15170586
when	33964600	then	15170587
when	33966700	then	15170588
when	33969239	then	15170589
when	33969900	then	15170590
when	44200000	then	15170591
when	44220000	then	15170592
when	44229300	then	15170593
when	44304200	then	15170594
when	44314200	then	15170595
when	44322000	then	15170596
when	44329300	then	15170597
when	44354200	then	15170598
when	44364100	then	15170599
when	44400000	then	15170600
when	44409900	then	15170601
when	44419200	then	15170602
when	44425100	then	15170603
when	44450000	then	15170604
when	33960400	then	15170605
when	33962000	then	15170606
when	33963011	then	15170607
when	33963100	then	15170608
when	33963300	then	15170609
when	33963700	then	15170610
when	33963999	then	15170611
when	33964700	then	15170612
when	33969100	then	15170613
when	33969299	then	15170614
when	33990000	then	15170615
when	44204100	then	15170616
when	44225100	then	15170617
when	44229900	then	15170618
when	44309900	then	15170619
when	44319200	then	15170620
when	44325100	then	15170621
when	44329900	then	15170622
when	44359200	then	15170623
when	44364200	then	15170624
when	44404100	then	15170625
when	44410000	then	15170626
when	44419900	then	15170627
when	44425200	then	15170628
when	44454100	then	15170629
when	33960800	then	15170630
when	33963000	then	15170631
when	33963035	then	15170632
when	33963200	then	15170633
when	33963400	then	15170634
when	33963800	then	15170635
when	33964100	then	15170636
when	33964800	then	15170637
when	33969200	then	15170638
when	33969300	then	15170639
when	40000000	then	15170640
when	44204200	then	15170641
when	44225200	then	15170642
when	44300000	then	15170643
when	44310000	then	15170644
when	44319900	then	15170645
when	44325200	then	15170646
when	44350000	then	15170647
when	44359900	then	15170648
when	44369200	then	15170649
when	44404200	then	15170650
when	44414100	then	15170651
when	44420000	then	15170652
when	44429200	then	15170653
when	44454200	then	15170654
when	33961400	then	15170655
when	33963009	then	15170656
when	33963036	then	15170657
when	33963202	then	15170658
when	33963500	then	15170659
when	33963900	then	15170660
when	33964500	then	15170661
when	33964900	then	15170662
when	33969230	then	15170663
when	33969600	then	15170664
when	44000000	then	15170665
when	44209900	then	15170666
when	44229200	then	15170667
when	44304100	then	15170668
when	44314100	then	15170669
when	44320000	then	15170670
when	44329200	then	15170671
when	44354100	then	15170672
when	44360000	then	15170673
when	44369900	then	15170674
when	44409200	then	15170675
when	44414200	then	15170676
when	44421400	then	15170677
when	44429900	then	15170678
when	44459200	then	15170679
when	44459900	then	15170680
when	44469200	then	15170681
when	44503000	then	15170682
when	44504200	then	15170683
when	44509900	then	15170684
when	44678300	then	15170685
when	44709900	then	15170686
when	44729900	then	15170687
when	44754100	then	15170688
when	44764100	then	15170689
when	44804100	then	15170690
when	44809900	then	15170691
when	44901500	then	15170692
when	44903000	then	15170693
when	44903036	then	15170694
when	44903600	then	15170695
when	44904700	then	15170696
when	44905199	then	15170697
when	44905248	then	15170698
when	44909100	then	15170699
when	44909230	then	15170700
when	44909239	then	15170701
when	44909299	then	15170702
when	44910000	then	15170703
when	44915200	then	15170704
when	44460000	then	15170705
when	44469900	then	15170706
when	44503600	then	15170707
when	44504700	then	15170708
when	44600000	then	15170709
when	44700000	then	15170710
when	44710000	then	15170711
when	44730000	then	15170712
when	44754200	then	15170713
when	44764200	then	15170714
when	44804200	then	15170715
when	44900000	then	15170716
when	44901700	then	15170717
when	44903009	then	15170718
when	44903099	then	15170719
when	44903700	then	15170720
when	44905100	then	15170721
when	44905200	then	15170722
when	44905252	then	15170723
when	44909200	then	15170724
when	44909235	then	15170725
when	44909251	then	15170726
when	44909300	then	15170727
when	44913900	then	15170728
when	44919100	then	15170729
when	44464100	then	15170730
when	44500000	then	15170731
when	44503900	then	15170732
when	44505100	then	15170733
when	44670000	then	15170734
when	44704100	then	15170735
when	44720000	then	15170736
when	44740000	then	15170737
when	44759900	then	15170738
when	44769900	then	15170739
when	44805100	then	15170740
when	44900400	then	15170741
when	44901800	then	15170742
when	44903010	then	15170743
when	44903300	then	15170744
when	44903900	then	15170745
when	44905180	then	15170746
when	44905208	then	15170747
when	44905299	then	15170748
when	44909214	then	15170749
when	44909236	then	15170750
when	44909252	then	15170751
when	44909500	then	15170752
when	44914700	then	15170753
when	44919900	then	15170754
when	44464200	then	15170755
when	44501400	then	15170756
when	44504100	then	15170757
when	44505200	then	15170758
when	44678200	then	15170759
when	44704200	then	15170760
when	44725100	then	15170761
when	44750000	then	15170762
when	44760000	then	15170763
when	44800000	then	15170764
when	44805200	then	15170765
when	44901400	then	15170766
when	44902000	then	15170767
when	44903035	then	15170768
when	44903500	then	15170769
when	44904000	then	15170770
when	44905191	then	15170771
when	44905242	then	15170772
when	44906100	then	15170773
when	44909215	then	15170774
when	44909237	then	15170775
when	44909293	then	15170776
when	44909900	then	15170777
when	44915100	then	15170778
when	44920000	then	15170779
when	44922000	then	15170780
when	44930000	then	15170781
when	44940000	then	15170782
when	44950000	then	15170783
when	44959100	then	15170784
when	44960000	then	15170785
when	44969100	then	15170786
when	44990000	then	15170787
when	45300000	then	15170788
when	45310000	then	15170789
when	45320000	then	15170790
when	45326600	then	15170791
when	45400000	then	15170792
when	45410000	then	15170793
when	45429900	then	15170794
when	45504200	then	15170795
when	45670000	then	15170796
when	45704100	then	15170797
when	45720000	then	15170798
when	45760000	then	15170799
when	45906100	then	15170800
when	45906500	then	15170801
when	45909100	then	15170802
when	45909263	then	15170803
when	45909267	then	15170804
when	44925100	then	15170805
when	44935100	then	15170806
when	44945100	then	15170807
when	44955100	then	15170808
when	44959200	then	15170809
when	44965100	then	15170810
when	44969200	then	15170811
when	45000000	then	15170812
when	45304100	then	15170813
when	45314100	then	15170814
when	45326100	then	15170815
when	45329900	then	15170816
when	45404100	then	15170817
when	45420000	then	15170818
when	45450000	then	15170819
when	45506600	then	15170820
when	45678200	then	15170821
when	45704200	then	15170822
when	45730000	then	15170823
when	45800000	then	15170824
when	45906200	then	15170825
when	45906600	then	15170826
when	45909200	then	15170827
when	45909264	then	15170828
when	45909291	then	15170829
when	44925200	then	15170830
when	44935200	then	15170831
when	44945200	then	15170832
when	44955200	then	15170833
when	44959300	then	15170834
when	44965200	then	15170835
when	44969300	then	15170836
when	45200000	then	15170837
when	45304200	then	15170838
when	45314200	then	15170839
when	45326400	then	15170840
when	45350000	then	15170841
when	45404200	then	15170842
when	45426400	then	15170843
when	45460000	then	15170844
when	45509900	then	15170845
when	45678300	then	15170846
when	45709900	then	15170847
when	45740000	then	15170848
when	45900000	then	15170849
when	45906300	then	15170850
when	45906700	then	15170851
when	45909261	then	15170852
when	45909265	then	15170853
when	45909299	then	15170854
when	44929900	then	15170855
when	44939900	then	15170856
when	44949900	then	15170857
when	44956100	then	15170858
when	44959900	then	15170859
when	44966100	then	15170860
when	44969900	then	15170861
when	45220000	then	15170862
when	45309900	then	15170863
when	45319900	then	15170864
when	45326500	then	15170865
when	45360000	then	15170866
when	45409900	then	15170867
when	45426600	then	15170868
when	45500000	then	15170869
when	45600000	then	15170870
when	45700000	then	15170871
when	45710000	then	15170872
when	45750000	then	15170873
when	45902700	then	15170874
when	45906400	then	15170875
when	45908400	then	15170876
when	45909262	then	15170877
when	45909266	then	15170878
when	45909300	then	15170879
when	45909900	then	15170880
when	45916200	then	15170881
when	45919100	then	15170882
when	45930000	then	15170883
when	45956700	then	15170884
when	45959900	then	15170885
when	45969100	then	15170886
when	45990000	then	15170887
when	46300000	then	15170888
when	46360000	then	15170889
when	46450000	then	15170890
when	46670000	then	15170891
when	46730000	then	15170892
when	46800000	then	15170893
when	46907101	then	15170894
when	46907200	then	15170895
when	46907299	then	15170896
when	46907600	then	15170897
when	46907699	then	15170898
when	46907703	then	15170899
when	46909300	then	15170900
when	46917102	then	15170901
when	46950000	then	15170902
when	46959100	then	15170903
when	46960000	then	15170904
when	45910000	then	15170905
when	45916500	then	15170906
when	45919200	then	15170907
when	45940000	then	15170908
when	45959100	then	15170909
when	45960000	then	15170910
when	45969200	then	15170911
when	46000000	then	15170912
when	46310000	then	15170913
when	46400000	then	15170914
when	46460000	then	15170915
when	46700000	then	15170916
when	46740000	then	15170917
when	46900000	then	15170918
when	46907102	then	15170919
when	46907201	then	15170920
when	46907300	then	15170921
when	46907601	then	15170922
when	46907700	then	15170923
when	46907799	then	15170924
when	46909900	then	15170925
when	46917199	then	15170926
when	46957100	then	15170927
when	46959200	then	15170928
when	46967100	then	15170929
when	45914700	then	15170930
when	45916600	then	15170931
when	45919900	then	15170932
when	45950000	then	15170933
when	45959200	then	15170934
when	45966100	then	15170935
when	45969300	then	15170936
when	46200000	then	15170937
when	46320000	then	15170938
when	46410000	then	15170939
when	46500000	then	15170940
when	46710000	then	15170941
when	46750000	then	15170942
when	46902600	then	15170943
when	46907103	then	15170944
when	46907202	then	15170945
when	46907400	then	15170946
when	46907602	then	15170947
when	46907701	then	15170948
when	46909100	then	15170949
when	46910000	then	15170950
when	46930000	then	15170951
when	46957300	then	15170952
when	46959300	then	15170953
when	46967300	then	15170954
when	45916100	then	15170955
when	45918400	then	15170956
when	45920000	then	15170957
when	45956100	then	15170958
when	45959300	then	15170959
when	45966700	then	15170960
when	45969900	then	15170961
when	46220000	then	15170962
when	46350000	then	15170963
when	46420000	then	15170964
when	46600000	then	15170965
when	46720000	then	15170966
when	46760000	then	15170967
when	46907100	then	15170968
when	46907199	then	15170969
when	46907203	then	15170970
when	46907500	then	15170971
when	46907603	then	15170972
when	46907702	then	15170973
when	46909200	then	15170974
when	46917100	then	15170975
when	46940000	then	15170976
when	46957700	then	15170977
when	46959900	then	15170978
when	46967700	then	15170979
when	46969100	then	15170980
when	46990000	then	15170981
when	99999900	then	15170982
when	46969200	then	15171005
when	90000000	then	15171006
when	99999999	then	15171007
when	46969300	then	15171030
when	99000000	then	15171031
when	46969900	then	15171055
when	99990000	then	15171056

 end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS natureza
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) ) AS content 
 from CONTFICHADESPESA 
 where cd_fichadesp < 5000  and vl_orcado = 0 and cd_cecam = 2783
 ----and aa_FichaDesp = 2024
 ) as tot

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
                    exercicio: parsedContent.exercicio ? parseInt(parsedContent.exercicio, 10) : null,  // Converte `exercicio` para int
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

        
        /*   const chunkSize = 50;
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

                const response = await fetch(`https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/despesas-nao-previstas`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 4dfb70a8-62e5-4ec2-9028-622e50d1f4d1'
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

        // Save the report in 'report.json'
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));
        console.log('Relatório salvo em report.json com sucesso.');

        // Save the reportIds in the 'report_id.json' file
        fs.writeFileSync('report_id.json', JSON.stringify(reportIds, null, 2));
        console.log('report_id.json salvo com sucesso.');

    } catch (error) {
        console.error('Erro no processo:', error);
    } finally {
        await sql.close(); // Close the connection with SQL Server
        console.log('Conexão com o SQL Server fechada.');
    }
}

// Execute the main function
main();