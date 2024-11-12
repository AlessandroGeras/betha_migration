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
JSON_QUERY((SELECT 13934 AS id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS ldo,
'2024' as exercicio,
JSON_QUERY((SELECT 
case cd_ProjAtiv
when        1001        then        429223
when        1003        then        429225
when        1005        then        429227
when        1002        then        429224
when        1006        then        429228
when        1007        then        429229
when        1004        then        429226
when        1008        then        429230
when        1016        then        429238
when        1018        then        429240
when        1014        then        429236
when        1015        then        429237
when        1026        then        429248
when        1010        then        429232
when        1025        then        429247
when        1019        then        429241
when        1028        then        429250
when        1017        then        429239
when        1022        then        429244
when        1012        then        429234
when        1020        then        429242
when        1023        then        429245
when        1009        then        429231
when        1034        then        429256
when        1030        then        429252
when        1033        then        429255
when        1032        then        429254
when        1011        then        429233
when        1036        then        429258
when        1013        then        429235
when        1042        then        429264
when        1024        then        429246
when        1021        then        429243
when        1064        then        429286
when        1029        then        429251
when        1050        then        429273
when        1037        then        429259
when        1077        then        429299
when        1076        then        429298
when        1041        then        429263
when        1031        then        429253
when        1057        then        429280
when        1053        then        429276
when        1046        then        429268
when        1040        then        429262
when        1054        then        429277
when        1067        then        429289
when        1071        then        429293
when        1043        then        429265
when        1070        then        429292
when        1045        then        429267
when        1027        then        429249
when        1038        then        429260
when        1035        then        429257
when        1047        then        429269
when        1056        then        429279
when        1039        then        429261
when        1080        then        429301
when        1078        then        429300
when        1079        then        429424
when        1088        then        429309
when        1049        then        429271
when        1049        then        429272
when        1048        then        429270
when        1044        then        429266
when        1081        then        429302
when        1059        then        429423
when        1090        then        429311
when        1086        then        429307
when        1082        then        429303
when        1058        then        429281
when        1061        then        429283
when        1066        then        429288
when        1093        then        429314
when        1063        then        429285
when        1060        then        429282
when        2022        then        429354
when        1092        then        429313
when        1051        then        429274
when        1069        then        429291
when        2033        then        429365
when        1065        then        429287
when        2001        then        429333
when        2038        then        429370
when        1072        then        429294
when        1074        then        429296
when        1068        then        429290
when        2003        then        429335
when        1087        then        429308
when        1073        then        429295
when        1052        then        429275
when        1085        then        429306
when        2007        then        429339
when        1084        then        429305
when        1075        then        429297
when        2041        then        429373
when        1089        then        429310
when        1099        then        429320
when        2062        then        429394
when        1100        then        429321
when        2065        then        429397
when        1097        then        429318
when        1091        then        429312
when        2066        then        429398
when        2011        then        429343
when        1055        then        429278
when        2014        then        429346
when        2021        then        429353
when        1094        then        429315
when        1103        then        429324
when        1096        then        429317
when        2006        then        429338
when        1062        then        429284
when        2031        then        429363
when        2012        then        429344
when        2015        then        429347
when        1105        then        429326
when        2049        then        429381
when        1083        then        429304
when        2055        then        429387
when        2052        then        429384
when        2067        then        429399
when        1098        then        429319
when        2087        then        429417
when        1101        then        429322
when        2016        then        429348
when        1095        then        429316
when        1106        then        429327
when        2058        then        429390
when        1104        then        429325
when        1102        then        429323
when        2018        then        429350
when        2004        then        429336
when        2061        then        429393
when        2063        then        429395
when        1110        then        429331
when        1111        then        429332
when        2017        then        429349
when        2005        then        429337
when        2009        then        429341
when        2088        then        429418
when        2020        then        429352
when        1107        then        429328
when        2084        then        429426
when        1108        then        429329
when        2026        then        429358
when        1109        then        429330
when        2032        then        429364
when        2092        then        429428
when        2090        then        429427
when        2030        then        429362
when        2010        then        429342
when        2002        then        429334
when        2019        then        429351
when        2093        then        429421
when        2039        then        429371
when        2034        then        429366
when        2044        then        429376
when        2008        then        429340
when        2025        then        429357
when        2013        then        429345
when        2042        then        429374
when        2027        then        429359
when        2045        then        429377
when        2023        then        429355
when        2047        then        429379
when        2028        then        429360
when        2024        then        429356
when        2035        then        429367
when        2037        then        429369
when        2050        then        429382
when        2036        then        429368
when        2046        then        429378
when        2029        then        429361
when        2053        then        429385
when        2040        then        429372
when        2059        then        429391
when        2056        then        429388
when        2048        then        429380
when        2043        then        429375
when        2060        then        429392
when        2057        then        429389
when        2073        then        429405
when        2051        then        429383
when        2064        then        429396
when        2068        then        429400
when        2078        then        429410
when        2074        then        429406
when        2079        then        429411
when        2054        then        429386
when        2070        then        429402
when        2071        then        429403
when        2089        then        429419
when        2069        then        429401
when        2080        then        429412
when        2082        then        429414
when        2083        then        429425
when        2072        then        429404
when        2086        then        429416
when        9999        then        429429
when        2075        then        429407
when        2076        then        429408
when        2091        then        429420
when        2085        then        429415
when        2077        then        429409
when        2081        then        429413
when        2094        then        429422
end as id
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS grupo,
vl_Ano3LDO AS metafinanceira,
JSON_QUERY(
    (SELECT
   '15169780' as id
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
        
                const response = await fetch(`https://pla-sl-rest.betha.cloud/planejamento/service-layer/v2/api/despesas-ldo`, {
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