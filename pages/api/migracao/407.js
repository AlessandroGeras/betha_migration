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
JSON_QUERY((SELECT 9984 AS id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS ppa,
'2024' as exercicio,
JSON_QUERY((SELECT 
case cd_ProjAtiv
when        1001        then        127268
when        1003        then        127270
when        1005        then        127272
when        1002        then        127269
when        1006        then        127273
when        1007        then        127274
when        1004        then        127271
when        1008        then        127275
when        1016        then        127283
when        1018        then        127285
when        1014        then        127281
when        1015        then        127282
when        1026        then        127293
when        1010        then        127277
when        1025        then        127292
when        1019        then        127286
when        1028        then        127295
when        1017        then        127284
when        1022        then        127289
when        1012        then        127279
when        1020        then        127287
when        1023        then        127290
when        1009        then        127276
when        1034        then        127301
when        1030        then        127297
when        1033        then        127300
when        1032        then        127299
when        1011        then        127278
when        1036        then        127303
when        1013        then        127280
when        1042        then        127309
when        1024        then        127291
when        1021        then        127288
when        1064        then        127332
when        1029        then        127296
when        1050        then        127318
when        1037        then        127304
when        1077        then        127345
when        1076        then        127344
when        1041        then        127308
when        1031        then        127298
when        1057        then        127325
when        1053        then        127321
when        1046        then        127313
when        1040        then        127307
when        1054        then        127322
when        1067        then        127335
when        1071        then        127339
when        1043        then        127310
when        1070        then        127338
when        1045        then        127312
when        1027        then        127294
when        1038        then        127305
when        1035        then        127302
when        1047        then        127314
when        1056        then        127324
when        1039        then        127306
when        1080        then        127348
when        1078        then        127346
when        1079        then        127347
when        1088        then        127356
when        1049        then        127316
when        1049        then        127317
when        1048        then        127315
when        1044        then        127311
when        1081        then        127349
when        1059        then        127327
when        1090        then        127358
when        1086        then        127354
when        1082        then        127350
when        1058        then        127326
when        1061        then        127329
when        1066        then        127334
when        1093        then        127361
when        1063        then        127331
when        1060        then        127328
when        2022        then        127401
when        1092        then        127360
when        1051        then        127319
when        1069        then        127337
when        2033        then        127412
when        1065        then        127333
when        2001        then        127380
when        2038        then        127417
when        1072        then        127340
when        1074        then        127342
when        1068        then        127336
when        2003        then        127382
when        1087        then        127355
when        1073        then        127341
when        1052        then        127320
when        1085        then        127353
when        2007        then        127386
when        1084        then        127352
when        1075        then        127343
when        2041        then        127420
when        1089        then        127357
when        1099        then        127367
when        2062        then        127441
when        1100        then        127368
when        2065        then        127444
when        1097        then        127365
when        1091        then        127359
when        2066        then        127445
when        2011        then        127390
when        1055        then        127323
when        2014        then        127393
when        2021        then        127400
when        1094        then        127362
when        1103        then        127371
when        1096        then        127364
when        2006        then        127385
when        1062        then        127330
when        2031        then        127410
when        2012        then        127391
when        2015        then        127394
when        1105        then        127373
when        2049        then        127428
when        1083        then        127351
when        2055        then        127434
when        2052        then        127431
when        2067        then        127446
when        1098        then        127366
when        2087        then        127466
when        1101        then        127369
when        2016        then        127395
when        1095        then        127363
when        1106        then        127374
when        2058        then        127437
when        1104        then        127372
when        1102        then        127370
when        2018        then        127397
when        2004        then        127383
when        2061        then        127440
when        2063        then        127442
when        1110        then        127378
when        1111        then        127379
when        2017        then        127396
when        2005        then        127384
when        2009        then        127388
when        2088        then        127467
when        2020        then        127399
when        1107        then        127375
when        2084        then        127463
when        1108        then        127376
when        2026        then        127405
when        1109        then        127377
when        2032        then        127411
when        2092        then        127471
when        2090        then        127469
when        2030        then        127409
when        2010        then        127389
when        2002        then        127381
when        2019        then        127398
when        2093        then        127472
when        2039        then        127418
when        2034        then        127413
when        2044        then        127423
when        2008        then        127387
when        2025        then        127404
when        2013        then        127392
when        2042        then        127421
when        2027        then        127406
when        2045        then        127424
when        2023        then        127402
when        2047        then        127426
when        2028        then        127407
when        2024        then        127403
when        2035        then        127414
when        2037        then        127416
when        2050        then        127429
when        2036        then        127415
when        2046        then        127425
when        2029        then        127408
when        2053        then        127432
when        2040        then        127419
when        2059        then        127438
when        2056        then        127435
when        2048        then        127427
when        2043        then        127422
when        2060        then        127439
when        2057        then        127436
when        2073        then        127452
when        2051        then        127430
when        2064        then        127443
when        2068        then        127447
when        2078        then        127457
when        2074        then        127453
when        2079        then        127458
when        2054        then        127433
when        2070        then        127449
when        2071        then        127450
when        2089        then        127468
when        2069        then        127448
when        2080        then        127459
when        2082        then        127461
when        2083        then        127462
when        2072        then        127451
when        2086        then        127465
when        9999        then        127474
when        2075        then        127454
when        2076        then        127455
when        2091        then        127470
when        2085        then        127464
when        2077        then        127456
when        2081        then        127460
when        2094        then        127473
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

        /* // Dividir os dados em chunks e salvar em arquivos JSON
        const chunkSize = 50;
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
        
                const response = await fetch(`https://pla-sl-rest.betha.cloud/planejamento/service-layer/v2/api/despesas-ppa`, {
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