const sql = require('mssql');
const dotenv = require('dotenv');
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
        const selectDatabaseQuery = 'USE CONTABIL2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
select 
ROW_NUMBER() OVER (ORDER BY vl_Meta1PPA) AS idIntegracao,
JSON_QUERY((SELECT
JSON_QUERY((SELECT 13369 AS id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS ldo,
'2024' as exercicio,
JSON_QUERY((SELECT 
case cd_ProjAtiv
when        1002        then        413682
when        1001        then        413681
when        1005        then        413685
when        1004        then        413684
when        1006        then        413686
when        1003        then        413683
when        1007        then        413687
when        1011        then        413691
when        1010        then        413690
when        1012        then        413692
when        1008        then        413688
when        1031        then        413711
when        1009        then        413689
when        1014        then        413694
when        1013        then        413693
when        1019        then        413699
when        1027        then        413707
when        1024        then        413704
when        1025        then        413705
when        1016        then        413696
when        1020        then        413700
when        1030        then        413710
when        1038        then        413718
when        1018        then        413698
when        1015        then        413695
when        1040        then        413720
when        1029        then        413709
when        1017        then        413697
when        1035        then        413715
when        1034        then        413714
when        1037        then        413717
when        1049        then        413730
when        1049        then        413729
when        1021        then        413701
when        1032        then        413712
when        1028        then        413708
when        1033        then        413713
when        1023        then        413703
when        1039        then        413719
when        1022        then        413702
when        1043        then        413723
when        1026        then        413706
when        1044        then        413724
when        1042        then        413722
when        1036        then        413716
when        1047        then        413727
when        1045        then        413725
when        1048        then        413728
when        1041        then        413721
when        1050        then        413731
when        1046        then        413726
when        1051        then        413732
when        1052        then        413733
when        1053        then        413734
when        1054        then        413735
when        1055        then        413736
when        1056        then        413737
when        1057        then        413738
when        1058        then        413739
when        1060        then        413741
when        1059        then        413740
when        1064        then        413745
when        1061        then        413742
when        1067        then        413748
when        1063        then        413744
when        1062        then        413743
when        1066        then        413747
when        1068        then        413749
when        1073        then        413754
when        1065        then        413746
when        1075        then        413756
when        1076        then        413757
when        1069        then        413750
when        1070        then        413751
when        1072        then        413753
when        1078        then        413759
when        2003        then        413780
when        1080        then        413761
when        1082        then        413763
when        1085        then        413766
when        1071        then        413752
when        1077        then        413758
when        1074        then        413755
when        1079        then        413760
when        1087        then        413768
when        1083        then        413764
when        1084        then        413765
when        1091        then        413772
when        1096        then        413777
when        1086        then        413767
when        2001        then        413778
when        2002        then        413779
when        1088        then        413769
when        1081        then        413762
when        1089        then        413770
when        1094        then        413775
when        2004        then        413781
when        1095        then        413776
when        1090        then        413771
when        1092        then        413773
when        1093        then        413774
when        2005        then        413782
when        2007        then        413784
when        2008        then        413785
when        2006        then        413783
when        2009        then        413786
when        2011        then        413788
when        2010        then        413787
when        2013        then        413790
when        2012        then        413789
when        2018        then        413795
when        2020        then        413797
when        2022        then        413799
when        2015        then        413792
when        2014        then        413791
when        2017        then        413794
when        2019        then        413796
when        2025        then        413802
when        2021        then        413798
when        2027        then        413804
when        2032        then        413809
when        2016        then        413793
when        2023        then        413800
when        2037        then        413814
when        2024        then        413801
when        2033        then        413810
when        2028        then        413805
when        2041        then        413818
when        2065        then        413842
when        2039        then        413816
when        2031        then        413808
when        2055        then        413832
when        2036        then        413813
when        2048        then        413825
when        2044        then        413821
when        2050        then        413827
when        2026        then        413803
when        2029        then        413806
when        2053        then        413830
when        2034        then        413811
when        2057        then        413834
when        2040        then        413817
when        2042        then        413819
when        2046        then        413823
when        2035        then        413812
when        2045        then        413822
when        2030        then        413807
when        2063        then        413840
when        2038        then        413815
when        2062        then        413839
when        2058        then        413835
when        2052        then        413829
when        2047        then        413824
when        2054        then        413831
when        2056        then        413833
when        2089        then        413866
when        2066        then        413843
when        2067        then        413844
when        2083        then        413860
when        2069        then        413846
when        2071        then        413848
when        2049        then        413826
when        2060        then        413837
when        2064        then        413841
when        2061        then        413838
when        2068        then        413845
when        2072        then        413849
when        2073        then        413850
when        2084        then        413861
when        2074        then        413851
when        2070        then        413847
when        2075        then        413852
when        2076        then        413853
when        2086        then        413863
when        2077        then        413854
when        2078        then        413855
when        2080        then        413857
when        9999        then        413872
when        2043        then        413820
when        2087        then        413864
when        2051        then        413828
when        2079        then        413856
when        2059        then        413836
when        2091        then        413868
when        2094        then        413871
when        2081        then        413858
when        2082        then        413859
when        2085        then        413862
when        2092        then        413869
when        2088        then        413865
when        2090        then        413867
when        2093        then        413870
end as id
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS grupo,
vl_Ano3LDO AS metafinanceira,
JSON_QUERY(
    (SELECT
   '14113431' as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS natureza,
'true' as priorizada
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS content
from CONTAcaoExecucao
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        const transformedData = resultData.map(record => {
            const parsedContent = JSON.parse(record.content);

            return {
                idIntegracao: record.idIntegracao,
                content: {
                    ldo: {
                        id: parseInt(parsedContent.ldo.id) // Extracting id from ldo
                    },
                    exercicio: parseInt(parsedContent.exercicio), // Extracting exercicio
                    grupo: {
                        id: parseInt(parsedContent.grupo.id) // Extracting id from grupo
                    },
                    natureza: {
                        id: parseInt(JSON.parse(record.content).natureza.id) // Extrai o valor de id dentro do natureza JSON
                    },
                    metaFinanceira: parseFloat(parsedContent.metafinanceira), // Extracting metaFinanceira
                    priorizada: parsedContent.priorizada === 'true' // Converting to boolean
                }
            };
        });

        // Dividir os dados em chunks e salvar em arquivos JSON
        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar cada registro individualmente para a rota desejada (comentar a seguir caso não precise)
        /*
        for (const record of transformedData) {
            const response = await fetch('https://pla-sl-rest.betha.cloud/planejamento/service-layer/v2/api/despesas-ldo', {
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
        }
        */

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
