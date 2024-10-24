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
    return `${year}-${month}-${day}`;
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
ROW_NUMBER() OVER(ORDER BY a.cd_Exercicio) as idIntegracao,
JSON_QUERY(
(SELECT
a.cd_Exercicio as exercicio,
a.dt_alteracaoorcamentaria,

JSON_QUERY(
(SELECT
case a.cd_Lei
 
  when 877 then 597429
  when 1060 then 605336
  when 1074 then 605414
  when 969 then 605897
  when 970 then 605898
  when 971 then 605899
  when 972 then 605900
  when 973 then 605901
  when 974 then 605902
  when 975 then 605903
  when 976 then 605904
  when 977 then 605905
  when 978 then 605906
  when 979 then 605907
  when 980 then 605908
  when 981 then 605909
  when 982 then 605910
  when 983 then 605911
  when 985 then 605912
  when 986 then 605913
  when 987 then 605914
  when 989 then 605915
  when 990 then 605916
  when 991 then 605917
  when 992 then 605918
  when 993 then 605919
  when 994 then 605920
  when 995 then 605921
  when 1000 then 605922
  when 1001 then 605923
  when 1002 then 605924
  when 1003 then 605925
  when 1006 then 605926
  when 1007 then 605927
  when 1008 then 605928
  when 1009 then 605929
  when 1010 then 605930
  when 1011 then 605931
  when 1012 then 605932
  when 1013 then 605933
  when 1015 then 605934
  when 1016 then 605935
  when 1017 then 605936
  when 1018 then 605937
  when 1019 then 605938
  when 1021 then 605939
  when 1022 then 605940
  when 1024 then 605941
  when 1025 then 605942
  when 1026 then 605943
  when 1027 then 605944
  when 1028 then 605945
  when 1029 then 605946
  when 1030 then 605949
  when 1031 then 605950
  when 1032 then 605951
  when 1034 then 605952
  when 1035 then 605953
  when 1036 then 605954
  when 1037 then 605955
  when 1038 then 605956
  when 1039 then 605957
  when 1040 then 605958
  when 1041 then 605959
  when 1042 then 605960
  when 1043 then 605961
  when 1044 then 605962
  when 1045 then 605963
  when 1046 then 605964
  when 1047 then 605965
  when 1048 then 605966
  when 1049 then 605967
  when 1050 then 605968
  when 1051 then 605969
  when 1052 then 605970
  when 1053 then 605971
  when 1054 then 605972
  when 1055 then 605973
  when 1056 then 605974
  when 1057 then 605975
  when 1058 then 605976
  when 1059 then 605977
  when 1061 then 605978
  when 1062 then 605979
  when 1063 then 605980
  when 1064 then 605981
  when 1065 then 605982
  when 1066 then 605983
  when 1067 then 605984
  when 1068 then 605985
  when 1069 then 605986
  when 1070 then 605987
  when 1071 then 605988
  when 1072 then 605989
  when 1073 then 605990
  when 1077 then 605991
  when 1078 then 605992
  when 1079 then 605993
  when 1080 then 605994
  when 1081 then 605995
  when 1082 then 605996
  when 1083 then 605997
  when 1084 then 605999
  when 1085 then 606000
  when 1086 then 606001
  when 1087 then 606002
  when 1088 then 606003
  when 1089 then 606004
  when 1090 then 606005
  when 1091 then 606006
  when 1092 then 606007
  when 1093 then 606008
  when 1094 then 606009
  when 1095 then 606010
  when 1096 then 606011
  when 1097 then 606012
  when 1099 then 606013
  when 1101 then 606014


 ELSE NULL
 end  as id
  FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
                    )
                ) AS atoAutorizativo,
				JSON_QUERY(
(SELECT
 
 case a.cd_AlteracaoOrcamentaria
 
  when 583 then 619142
  when 584 then 619157
  when 585 then 619158
  when 589 then 619159
  when 590 then 619160
  when 591 then 619161
  when 592 then 619162
  when 593 then 619163
  when 594 then 619164
  when 595 then 619165
  when 596 then 619166
  when 597 then 619167
  when 599 then 619168
  when 600 then 619169
  when 601 then 619170
  when 602 then 619171
  when 603 then 619172
  when 604 then 619173
  when 605 then 619174
  when 606 then 619175
  when 607 then 619176
  when 608 then 619177
  when 609 then 619178
  when 610 then 619179
  when 611 then 619180
  when 612 then 619181
  when 613 then 619182
  when 614 then 619183


 ELSE NULL
 end  as id
  FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
                    )
                ) AS atoAbertura,

				JSON_QUERY(
(SELECT
 case at.vl_AlteracaoOrcamentaria
 
when 26800.74 then 1348186
  when 20000 then 1348187
  when 20000 then 1348188
  when 30078.35 then 1348189
  when 2000 then 1348190
  when 7000 then 1348191
  when 335403.58 then 1348493
  when 101135.34 then 1348494
  when 96639.95 then 1348495
  when 141959.91 then 1348496
  when 160551.14 then 1348497
  when 125375.6 then 1348498
  when 187931.54 then 1348499
  when 6438.67 then 1348500
  when 35186.52 then 1348501
  when 40742.62 then 1348502
  when 762.71 then 1348503
  when 509213.97 then 1348537
  when 1196.03 then 1348538
  when 750.8 then 1348539
  when 1938.57 then 1348540

 ELSE NULL
 end  as id
  FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
                    )
                ) AS creditos
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
from CONTALTERACAOORCAMENTARIAITEM at
inner join CONTALTERACAOORCAMENTARIA a
on a. cd_Exercicio = at.cd_Exercicio
and a.cd_AlteracaoOrcamentaria = at.cd_AlteracaoOrcamentaria
inner join CONTAlteracaoOrcamentariaTipo t
on t.cd_AlteracaoOrcamentariaTipo = at.cd_AlteracaoOrcamentariaTipo
where t.cd_AlteracaoOrcamentariaTipo in (1,2,3)
and at.cd_Cecam = 1995
        `;
        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const content = JSON.parse(record.content);
        
            return {
                idIntegracao: record.idIntegracao ? record.idIntegracao.toString() : null,
                content: {
                    exercicio: content.exercicio || null,
                    dataSancao: formatDate(content.dt_alteracaoorcamentaria) || null,
                    atoAutorizativo: {
                        id: content.atoAutorizativo && content.atoAutorizativo.id ? content.atoAutorizativo.id : null
                    },
                    atoAbertura: {
                        id: content.atoAbertura && content.atoAbertura.id ? content.atoAbertura.id : null
                    },
                    creditos: Array.isArray(content.creditos)
                        ? content.creditos.map(credito => ({ id: credito.id }))
                        : [{ id: content.creditos.id }]
                }
            };
        });         
        

        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }
        

        /* // Enviar todos os registros de uma vez
         const response = await fetch('https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/creditos-orcamentarios-sancoes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
            },
            body: JSON.stringify(transformedData)
        }); */

        /* if (response.ok) {
            const apiResponse = await response.json();

            // Gravar a resposta da API no arquivo report.json
            fs.writeFileSync('report.json', JSON.stringify(apiResponse, null, 2));
            console.log('Dados enviados com sucesso e resposta salva em report.json');
        } else {
            console.error('Erro ao enviar os dados:', response.statusText);
        } */

    } catch (error) {
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        sql.close();
    }
}

main();
