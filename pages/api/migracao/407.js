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
JSON_QUERY((SELECT 9569 AS id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS ppa,
'2024' as exercicio,
JSON_QUERY((SELECT 
case cd_ProjAtiv
when        1002        then        124916
when        1001        then        124915
when        1005        then        124919
when        1004        then        124918
when        1006        then        124920
when        1003        then        124917
when        1007        then        124921
when        1011        then        124925
when        1010        then        124924
when        1012        then        124926
when        1008        then        124922
when        1031        then        124945
when        1009        then        124923
when        1014        then        124928
when        1013        then        124927
when        1019        then        124933
when        1027        then        124941
when        1024        then        124938
when        1025        then        124939
when        1016        then        124930
when        1020        then        124934
when        1030        then        124944
when        1038        then        124952
when        1018        then        124932
when        1015        then        124929
when        1040        then        124954
when        1029        then        124943
when        1017        then        124931
when        1035        then        124949
when        1034        then        124948
when        1037        then        124951
when        1049        then        124963
when        1049        then        124964
when        1021        then        124935
when        1032        then        124946
when        1028        then        124942
when        1033        then        124947
when        1023        then        124937
when        1039        then        124953
when        1022        then        124936
when        1043        then        124957
when        1026        then        124940
when        1044        then        124958
when        1042        then        124956
when        1036        then        124950
when        1047        then        124961
when        1045        then        124959
when        1048        then        124962
when        1041        then        124955
when        1050        then        124965
when        1046        then        124960
when        1051        then        124966
when        1052        then        124967
when        1053        then        124968
when        1054        then        124969
when        1055        then        124970
when        1056        then        124971
when        1057        then        124972
when        1058        then        124973
when        1060        then        124975
when        1059        then        124974
when        1064        then        124979
when        1061        then        124976
when        1067        then        124982
when        1063        then        124978
when        1062        then        124977
when        1066        then        124981
when        1068        then        124983
when        1073        then        124988
when        1065        then        124980
when        1075        then        124990
when        1076        then        124991
when        1069        then        124984
when        1070        then        124985
when        1072        then        124987
when        1078        then        124993
when        2003        then        125014
when        1080        then        124995
when        1082        then        124997
when        1085        then        125000
when        1071        then        124986
when        1077        then        124992
when        1074        then        124989
when        1079        then        124994
when        1087        then        125002
when        1083        then        124998
when        1084        then        124999
when        1091        then        125006
when        1096        then        125011
when        1086        then        125001
when        2001        then        125012
when        2002        then        125013
when        1088        then        125003
when        1081        then        124996
when        1089        then        125004
when        1094        then        125009
when        2004        then        125015
when        1095        then        125010
when        1090        then        125005
when        1092        then        125007
when        1093        then        125008
when        2005        then        125016
when        2007        then        125018
when        2008        then        125019
when        2006        then        125017
when        2009        then        125020
when        2011        then        125022
when        2010        then        125021
when        2013        then        125024
when        2012        then        125023
when        2018        then        125029
when        2020        then        125031
when        2022        then        125033
when        2015        then        125026
when        2014        then        125025
when        2017        then        125028
when        2019        then        125030
when        2025        then        125036
when        2021        then        125032
when        2027        then        125038
when        2032        then        125043
when        2016        then        125027
when        2023        then        125034
when        2037        then        125048
when        2024        then        125035
when        2033        then        125044
when        2028        then        125039
when        2041        then        125052
when        2065        then        125076
when        2039        then        125050
when        2031        then        125042
when        2055        then        125066
when        2036        then        125047
when        2048        then        125059
when        2044        then        125055
when        2050        then        125061
when        2026        then        125037
when        2029        then        125040
when        2053        then        125064
when        2034        then        125045
when        2057        then        125068
when        2040        then        125051
when        2042        then        125053
when        2046        then        125057
when        2035        then        125046
when        2045        then        125056
when        2030        then        125041
when        2063        then        125074
when        2038        then        125049
when        2062        then        125073
when        2058        then        125069
when        2052        then        125063
when        2047        then        125058
when        2054        then        125065
when        2056        then        125067
when        2089        then        125100
when        2066        then        125077
when        2067        then        125078
when        2083        then        125094
when        2069        then        125080
when        2071        then        125082
when        2049        then        125060
when        2060        then        125071
when        2064        then        125075
when        2061        then        125072
when        2068        then        125079
when        2072        then        125083
when        2073        then        125084
when        2084        then        125095
when        2074        then        125085
when        2070        then        125081
when        2075        then        125086
when        2076        then        125087
when        2086        then        125097
when        2077        then        125088
when        2078        then        125089
when        2080        then        125091
when        9999        then        125106
when        2043        then        125054
when        2087        then        125098
when        2051        then        125062
when        2079        then        125090
when        2059        then        125070
when        2091        then        125102
when        2094        then        125105
when        2081        then        125092
when        2082        then        125093
when        2085        then        125096
when        2092        then        125103
when        2088        then        125099
when        2090        then        125101
when        2093        then        125104
end as id
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS grupo,
JSON_QUERY((SELECT 
vl_Ano1PPA as ano1,
vl_Ano2PPA as ano2,
vl_Ano3PPA as ano3,
vl_Ano4PPA as ano4,
(vl_Ano1PPA + vl_Ano2PPA + vl_Ano3PPA + vl_Ano4PPA) as total
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS metafinanceira
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS content
from CONTAcaoExecucao
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => ({
            idIntegracao: record.idIntegracao,
            content: {
                ppa: {
                    id: parseInt(JSON.parse(record.content).ppa.id) // Extrai o valor de id dentro do ppa JSON
                },
                exercicio: parseInt(JSON.parse(record.content).exercicio), // Extrai o valor de exercicio dentro do JSON
                grupo: {
                    id: parseInt(JSON.parse(record.content).grupo.id) // Extrai o valor de id dentro do grupo JSON
                },
                /* natureza: {
                    id: parseInt(JSON.parse(record.content).natureza.id) // Extrai o valor de id dentro do natureza JSON
                }, */
                metaFinanceira: {
                    ano1: JSON.parse(record.content).metafinanceira.ano1, // Extrai o valor de ano1 dentro do metaFinanceira JSON
                    ano2: JSON.parse(record.content).metafinanceira.ano2, // Extrai o valor de ano2 dentro do metaFinanceira JSON
                    ano3: JSON.parse(record.content).metafinanceira.ano3, // Extrai o valor de ano3 dentro do metaFinanceira JSON
                    ano4: JSON.parse(record.content).metafinanceira.ano4, // Extrai o valor de ano4 dentro do metaFinanceira JSON
                    total: JSON.parse(record.content).metafinanceira.total // Extrai o valor de total dentro do metaFinanceira JSON
                }
            }
        }));

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
            const response = await fetch('https://pla-sl-rest.betha.cloud/planejamento/service-layer/v2/api/despesas-ppa', {
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
