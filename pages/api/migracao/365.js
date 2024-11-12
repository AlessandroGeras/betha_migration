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
 ROW_NUMBER() OVER (ORDER BY cd_Cecam) AS idIntegracao,
JSON_QUERY(
    (SELECT
                                JSON_QUERY(
                                        (SELECT
                                                 15749 as id
                                 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                                ) AS loa,
                                 JSON_QUERY(
    (SELECT
   case cd_categoriaeconomicareceita
   when        1112500200        then        33500425
when        1112500400        then        33500426
when        1112500100        then        33500449
when        1112500300        then        33500450
when        1112530100        then        33500463
when        1113031100        then        33500502
when        1114511102        then        33500606
when        1114511300        then        33500607
when        1114511101        then        33500630
when        1114511200        then        33500631
when        1114511400        then        33500632
when        1121010102        then        33500661
when        1121010105        then        33500662
when        1121010107        then        33500663
when        1121010101        then        33500685
when        1121010104        then        33500686
when        1121010106        then        33500687
when        1122010102        then        33500776
when        1122010104        then        33500777
when        1121500100        then        33500790
when        1122010101        then        33500800
when        1122010103        then        33500801
when        1122010105        then        33500802
when        1122010106        then        33500803
when        1122010108        then        33500804
when        1122010107        then        33500828
when        1241500100        then        33502020
when        1321010101        then        33502071
when        1321010103        then        33502072
when        1321010105        then        33502073
when        1321010107        then        33502074
when        1321010109        then        33502075
when        1321010111        then        33502076
when        1321010113        then        33502077
when        1321010102        then        33502096
when        1321010104        then        33502097
when        1321010106        then        33502098
when        1321010108        then        33502099
when        1321010110        then        33502100
when        1321010112        then        33502101
when        1321010114        then        33502102
when        1321010115        then        33502103
when        1699990101        then        33503271
when        1699990102        then        33503296
when        1711511101        then        33503308
when        1711512102        then        33503315
when        1711512101        then        33503339
when        1711520101        then        33503345
when        1712510100        then        33503403
when        1712524100        then        33503446
when        1713501102        then        33503462
when        1713501104        then        33503463
when        1713501101        then        33503486
when        1713501103        then        33503487
when        1713502101        then        33503497
when        1713503101        then        33503503
when        1713503103        then        33503504
when        1713504101        then        33503510
when        1713503102        then        33503528
when        1713505102        then        33503540
when        1714530100        then        33503621
when        1714500100        then        33503632
when        1714520100        then        33503641
when        1716500101        then        33503753
when        1716500103        then        33503754
when        1716500105        then        33503755
when        1716500102        then        33503778
when        1719580101        then        33503871
when        1721500101        then        33503955
when        1721520101        then        33503966
when        1721530100        then        33503971
when        1721510101        then        33503985
when        1723500103        then        33504025
when        1723500102        then        33504049
when        1724500101        then        33504060
when        1724510101        then        33504065
when        1729510102        then        33504106
when        1729510101        then        33504130
when        1729510103        then        33504131
when        1729510105        then        33504132
when        1751500101        then        33504257
when        1759990101        then        33504263
when        1751500102        then        33504282
when        1922990101        then        33504769
when        1999992101        then        33505364
when        2422540101        then        33505695
   end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS natureza,
cd_exercicio as exercicio,
cd_ficharec as numero,
                                JSON_QUERY(
                                        (SELECT
                                                 case cd_cecam
                                                 when 1995 then 11241
 when 2783 then 11358
 when 3052 then 11357
 when 3068 then 11292
                                                 end as id
                                 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                                ) AS entidade,
                                JSON_QUERY(
    (SELECT
   case cd_unidorca
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
end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS organograma,
JSON_QUERY(
                                        (SELECT
        JSON_QUERY(
                                        (SELECT
        case cd_destinacaorecurso
when        150000000000         then        774231
when        150000150000         then        774232
when        150000250000         then        774233
when        150100000000         then        774234
when        150200000000         then        774235
when        150200150000         then        774236
when        150200250000         then        774237
when        154000000000         then        774238
when        154000300000         then        774239
when        154000700000         then        774240
when        154100000000         then        774241
when        154100300000         then        774242
when        154100700000         then        774243
when        154200000000         then        774244
when        154200300000         then        774245
when        154200700000         then        774246
when        154300000000         then        774247
when        154400000000         then        774248
when        155000000000         then        774249
when        155100000000         then        774250
when        155200000000         then        774251
when        155300000000         then        774252
when        156900000000         then        774253
when        157000000000         then        774254
when        157100000000         then        774255
when        157200000000         then        774256
when        157300000000         then        774257
when        157400000000         then        774258
when        157500000000         then        774259
when        157600000000         then        774260
when        159900000000         then        774261
when        160000000000         then        774262
when        160100000000         then        774263
when        160200000000         then        774264
when        160300000000         then        774265
when        160400000000         then        774266
when        160500000000         then        774267
when        162100000000         then        774268
when        162200000000         then        774269
when        163100000000         then        774270
when        163200000000         then        774271
when        163300000000         then        774272
when        163400000000         then        774273
when        163500000000         then        774274
when        163600000000         then        774275
when        165900000000         then        774276
when        166000000000         then        774277
when        166100000000         then        774278
when        166200000000         then        774279
when        166500000000         then        774280
when        166900000000         then        774281
when        170000000000         then        774282
when        170100000000         then        774283
when        170200000000         then        774284
when        170300000000         then        774285
when        170500000000         then        774286
when        170600000000         then        774287
when        170600003110         then        774288
when        170600003120         then        774289
when        170700000000         then        774290
when        170800000000         then        774291
when        170900000000         then        774292
when        171000000000         then        774293
when        171000003210         then        774294
when        171000003220         then        774295
when        171100000000         then        774296
when        171200000000         then        774297
when        171300000000         then        774298
when        171400000000         then        774299
when        171500000000         then        774300
when        171600000000         then        774301
when        171700000000         then        774302
when        171800000000         then        774303
when        171900000000         then        774304
when        171900250000         then        774305
when        172000000000         then        774306
when        172100000000         then        774307
when        174900000000         then        774308
when        175000000000         then        774309
when        175100000000         then        774310
when        175200000000         then        774311
when        175300000000         then        774312
when        175400000000         then        774313
when        175500000000         then        774314
when        175600000000         then        774315
when        175700000000         then        774316
when        175800000000         then        774317
when        175900000000         then        774318
when        176000000000         then        774319
when        176100000000         then        774320
when        179900000000         then        774321
when        180000000000         then        774322
when        180000001111         then        774323
when        180000001121         then        774324
when        180100000000         then        774325
when        180100002111         then        774326
when        180100002121         then        774327
when        180200000000         then        774328
when        180300000000         then        774329
when        186000000000         then        774330
when        186100000000         then        774331
when        186200000000         then        774332
when        186900000000         then        774333
when        188000000000         then        774334
when        189800000000         then        774335
when        189900000000         then        774336                                                
   end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS recurso
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS recursos,
   JSON_QUERY(
    (SELECT
        '20' as percentual,
        vl_orcado as valor,
           JSON_QUERY(
    (SELECT
   12448 as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS deducao,
   JSON_QUERY(
    (SELECT
  '20' as percentual,
        vl_orcado as valor,
           JSON_QUERY(
    (SELECT
   case cd_destinacaorecurso
when        150000000000         then        774231
when        150000150000         then        774232
when        150000250000         then        774233
when        150100000000         then        774234
when        150200000000         then        774235
when        150200150000         then        774236
when        150200250000         then        774237
when        154000000000         then        774238
when        154000300000         then        774239
when        154000700000         then        774240
when        154100000000         then        774241
when        154100300000         then        774242
when        154100700000         then        774243
when        154200000000         then        774244
when        154200300000         then        774245
when        154200700000         then        774246
when        154300000000         then        774247
when        154400000000         then        774248
when        155000000000         then        774249
when        155100000000         then        774250
when        155200000000         then        774251
when        155300000000         then        774252
when        156900000000         then        774253
when        157000000000         then        774254
when        157100000000         then        774255
when        157200000000         then        774256
when        157300000000         then        774257
when        157400000000         then        774258
when        157500000000         then        774259
when        157600000000         then        774260
when        159900000000         then        774261
when        160000000000         then        774262
when        160100000000         then        774263
when        160200000000         then        774264
when        160300000000         then        774265
when        160400000000         then        774266
when        160500000000         then        774267
when        162100000000         then        774268
when        162200000000         then        774269
when        163100000000         then        774270
when        163200000000         then        774271
when        163300000000         then        774272
when        163400000000         then        774273
when        163500000000         then        774274
when        163600000000         then        774275
when        165900000000         then        774276
when        166000000000         then        774277
when        166100000000         then        774278
when        166200000000         then        774279
when        166500000000         then        774280
when        166900000000         then        774281
when        170000000000         then        774282
when        170100000000         then        774283
when        170200000000         then        774284
when        170300000000         then        774285
when        170500000000         then        774286
when        170600000000         then        774287
when        170600003110         then        774288
when        170600003120         then        774289
when        170700000000         then        774290
when        170800000000         then        774291
when        170900000000         then        774292
when        171000000000         then        774293
when        171000003210         then        774294
when        171000003220         then        774295
when        171100000000         then        774296
when        171200000000         then        774297
when        171300000000         then        774298
when        171400000000         then        774299
when        171500000000         then        774300
when        171600000000         then        774301
when        171700000000         then        774302
when        171800000000         then        774303
when        171900000000         then        774304
when        171900250000         then        774305
when        172000000000         then        774306
when        172100000000         then        774307
when        174900000000         then        774308
when        175000000000         then        774309
when        175100000000         then        774310
when        175200000000         then        774311
when        175300000000         then        774312
when        175400000000         then        774313
when        175500000000         then        774314
when        175600000000         then        774315
when        175700000000         then        774316
when        175800000000         then        774317
when        175900000000         then        774318
when        176000000000         then        774319
when        176100000000         then        774320
when        179900000000         then        774321
when        180000000000         then        774322
when        180000001111         then        774323
when        180000001121         then        774324
when        180100000000         then        774325
when        180100002111         then        774326
when        180100002121         then        774327
when        180200000000         then        774328
when        180300000000         then        774329
when        186000000000         then        774330
when        186100000000         then        774331
when        186200000000         then        774332
when        186900000000         then        774333
when        188000000000         then        774334
when        189800000000         then        774335
when        189900000000         then        774336                                               
   end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS recurso
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS recursos
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS deducoes,
vl_orcado as metaFinanceira
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
from CONTFICHARECEITA
where cd_ReceitaPrevisaoTipo = 1
and vl_orcado > 0

        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Verificar os resultados da consulta

        const transformedData = resultData.map(record => {
            const content = JSON.parse(record.content);

            console.log(content);
        
            return {
                idIntegracao: record.idIntegracao.toString(),
                content: {
                    loa: {
                        id: content.loa.id
                    },
                    exercicio: content.exercicio,
                    numero: content.numero,
                    natureza: {
                        id: content.natureza.id
                    },
                    entidade: {
                        id: content.entidade.id
                    },
                    organograma: {
                        id: content.organograma.id
                    },
                    recursos: [
                        {
                            percentual: parseInt(content.deducoes.percentual),
                            valor: content.deducoes.valor,
                            recurso: {
                                id: content.recursos.recurso.id
                            }
                        }
                    ],
                    metaFinanceira: parseFloat(content.metaFinanceira)
                }
            };
        });
        

       /*  // Salvar os resultados transformados em um arquivo JSON
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

                const response = await fetch(`https://pla-sl-rest.betha.cloud/planejamento/service-layer/v2/api/receitas-loa`, {
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