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
'false' as validaSaldo,
JSON_QUERY(
(SELECT
                        case  at.cd_FichaDespDestino
when 389 then  1798586	
when 12 then  1798473	
when 13 then  1798474	
when 14 then  1798475	
when 15 then  1798476	
when 16 then  1798477	
when 17 then  1798478	
when 18 then  1798479	
when 19 then  1798480	
when 20 then  1798481	
when 21 then  1798482	
when 22 then  1798483	
when 23 then  1798484	
when 24 then  1798485	
when 25 then  1798486	
when 26 then  1798487	
when 27 then  1798488	
when 28 then  1798489	
when 29 then  1798490	
when 30 then  1798491	
when 31 then  1798492	
when 32 then  1798493	
when 33 then  1798494	
when 34 then  1798495	
when 35 then  1798496	
when 36 then  1798497	
when 37 then  1798498	
when 38 then  1798499	
when 39 then  1798500	
when 40 then  1798501	
when 41 then  1798502	
when 42 then  1798503	
when 43 then  1798503	
when 44 then  1798504	
when 45 then  1798505	
when 46 then  1798506	
when 47 then  1798507	
when 48 then  1798508	
when 49 then  1798509	
when 50 then  1798510	
when 51 then  1798511	
when 52 then  1798512	
when 53 then  1798513	
when 54 then  1798514	
when 55 then  1798515	
when 56 then  1798516	
when 57 then  1798517	
when 58 then  1798518	
when 59 then  1798519	
when 60 then  1798520	
when 61 then  1798521	
when 62 then  1798522	
when 63 then  1798523	
when 64 then  1798524	
when 65 then  1798525	
when 66 then  1798526	
when 67 then  1798527	
when 68 then  1798528	
when 69 then  1798529	
when 70 then  1798530	
when 71 then  1798531	
when 72 then  1798532	
when 73 then  1798533	
when 74 then  1798534	
when 75 then  1798535	
when 76 then  1798536	
when 77 then  1798537	
when 78 then  1798538	
when 79 then  1798539	
when 80 then  1798540	
when 81 then  1798541	
when 82 then  1798542	
when 83 then  1798543	
when 84 then  1798544	
when 85 then  1798545	
when 86 then  1798546	
when 87 then  1798547	
when 88 then  1798548	
when 89 then  1798549	
when 90 then  1798550	
when 91 then  1798551	
when 92 then  1798552	
when 93 then  1798553	
when 94 then  1798554	
when 95 then  1798555	
when 96 then  1798556	
when 97 then  1798557	
when 98 then  1798558	
when 99 then  1798559	
when 100 then  1798560	
when 101 then  1798561	
when 102 then  1798562	
when 103 then  1798563	
when 104 then  1798564	
when 105 then  1798565	
when 106 then  1798566	
when 107 then  1798567	
when 108 then  1798568	
when 109 then  1798569	
when 110 then  1798570	
when 111 then  1798571	
when 112 then  1798572	
when 113 then  1798573	
when 114 then  1798574	
when 115 then  1798575	
when 116 then  1798576	
when 117 then  1798577	
when 118 then  1798578	
when 119 then  1798579	
when 120 then  1798580	
when 121 then  1798581	
when 122 then  1798582	
when 123 then  1798583	
when 124 then  1798584	
when 125 then  1798585	
when 126 then  1798586	
when 127 then  1798587	
when 128 then  1798588	
when 129 then  1798589	
when 130 then  1798590	
when 131 then  1798591	
when 132 then  1798592	
when 133 then  1798593	
when 134 then  1798594	
when 135 then  1798595	
when 136 then  1798596	
when 137 then  1798597	
when 138 then  1798598	
when 139 then  1798599	
when 140 then  1798600	
when 141 then  1798601	
when 142 then  1798602	
when 143 then  1798603	
when 144 then  1798604	
when 145 then  1798605	
when 146 then  1798606	
when 147 then  1798607	
when 148 then  1798608	
when 149 then  1798609	
when 150 then  1798610	
when 151 then  1798611	
when 152 then  1798612	
when 153 then  1798613	
when 154 then  1798614	
when 155 then  1798615	
when 156 then  1798616	
when 157 then  1798617	
when 158 then  1798618	
when 159 then  1798619	
when 160 then  1798620	
when 161 then  1798621	
when 162 then  1798622	
when 163 then  1798623	
when 164 then  1798624	
when 165 then  1798625
when 361 then  1798474
when 362 then  1798475
when 363 then  1798477
when 364 then  1798478
when 365 then  1798479
when 366 then  1798482
when 367 then  1798493
when 368 then  1798494
when 369 then  1798496
when 370 then  1798497
when 371 then  1798500
when 328 then  1798502
when 356 then  1798502
when 357 then  1798502
when 372 then  1798504
when 373 then  1798505
when 374 then  1798509
when 375 then  1798522
when 376 then  1798527
when 377 then  1798528
when 378 then  1798529
when 379 then  1798531
when 360 then  1798537
when 380 then  1798551
when 381 then  1798561
when 382 then  1798562
when 383 then  1798564
when 384 then  1798567
when 385 then  1798568
when 386 then  1798571
when 387 then  1798581
when 388 then  1798582
when 389 then  1798585
when 390 then  1798590
when 391 then  1798594
when 392 then  1798597
when 393 then  1798601
when 394 then  1798605
when 395 then  1798606
when 396 then  1798611
when 397 then  1798612
when 398 then  1798613
when 399 then  1798614
when 400 then  1798617
when 401 then  1798622
when 402 then  1798624
when 351 then  1801442
when 352 then  1801442
when 464 then  1801443
when 465 then  1801443
when 353 then  1801444
when 324 then  1801445
when 325 then  1801446
when 452 then  1801447
when 453 then  1801447
when 407 then  1801448
when 408 then  1801449
when 338 then  1801450
when 339 then  1801450
when 340 then  1801451
when 341 then  1801451
when 318 then  1801452
when 348 then  1801453
when 349 then  1801453
when 470 then  1801454
when 471 then  1801454
when 350 then  1801455
when 446 then  1801456
when 447 then  1801456
when 354 then  1801457
when 323 then  1801458
when 326 then  1801459
when 327 then  1801460
when 336 then  1801461
when 337 then  1801462
when 475 then  1801462
when 440 then  1801463
when 441 then  1801464
when 442 then  1801465
when 443 then  1801466
when 444 then  1801467
when 445 then  1801468
when 458 then  1801469
when 460 then  1801470
when 461 then  1801470
when 462 then  1801471
when 463 then  1801472
when 476 then  1801473
when 472 then  1801474

	
                                    end as id
									
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS despesa,
			at.vl_AlteracaoOrcamentaria	valor,
			'ABERTURA_CREDITO_ADICIONAL_SUPLEMENTAR' as via,
			     a.ds_Justificativa                                    as finalidade,
				 'true' as desconsideraLimite,
				  'DESPESA' as tipo,
JSON_QUERY(
                        (SELECT

'DESPESA' as tipo,
JSON_QUERY(
                        (SELECT
						11217 as id

FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS origem,
			at.vl_AlteracaoOrcamentaria	as valor,
               
			JSON_QUERY(
                (SELECT	
                    		   
			   
			JSON_QUERY(
                (
                    SELECT
                        CASE at.cd_DestinacaoRecursoDestino
when 250000000000 then 774124
 when 250000150000 then 774125
 when 250000250000 then 774126
 when 250100000000 then 774127
 when 250200000000 then 774128
 when 250200150000 then 774129
 when 250200250000 then 774130
 when 254000000000 then 774131
 when 254000300000 then 774132
 when 254000700000 then 774133
 when 254100000000 then 774134
 when 254100300000 then 774135
 when 254100700000 then 774136
 when 254200000000 then 774137
 when 254200300000 then 774138
 when 254200700000 then 774139
 when 254300000000 then 774140
 when 254400000000 then 774141
 when 255000000000 then 774142
 when 255100000000 then 774143
 when 255200000000 then 774144
 when 255300000000 then 774145
 when 256900000000 then 774146
 when 257000000000 then 774147
 when 257100000000 then 774148
 when 257200000000 then 774149
 when 257300000000 then 774150
 when 257400000000 then 774151
 when 257500000000 then 774152
 when 257600000000 then 774153
 when 259900000000 then 774154
 when 260000000000 then 774155
 when 260100000000 then 774156
 when 260200000000 then 774157
 when 260300000000 then 774158
 when 260400000000 then 774159
 when 260500000000 then 774160
 when 262100000000 then 774161
 when 262200000000 then 774162
 when 263100000000 then 774163
 when 263200000000 then 774164
 when 263300000000 then 774165
 when 263400000000 then 774166
 when 263500000000 then 774167
 when 263600000000 then 774168
 when 265900000000 then 774169
 when 266000000000 then 774170
 when 266100000000 then 774171
 when 266200000000 then 774172
 when 266500000000 then 774173
 when 266900000000 then 774174
 when 270000000000 then 774175
 when 270100000000 then 774176
 when 270200000000 then 774177
 when 270300000000 then 774178
 when 270500000000 then 774179
 when 270600000000 then 774180
 when 270600003110 then 774181
 when 270600003120 then 774182
 when 270700000000 then 774183
 when 270800000000 then 774184
 when 270900000000 then 774185
 when 271000000000 then 774186
 when 271000003210 then 774187
 when 271000003220 then 774188
 when 271100000000 then 774189
 when 271200000000 then 774190
 when 271300000000 then 774191
 when 271400000000 then 774192
 when 271500000000 then 774193
 when 271600000000 then 774194
 when 271700000000 then 774195
 when 271800000000 then 774196
 when 271900000000 then 774197
 when 271900250000 then 774198
 when 272000000000 then 774199
 when 272100000000 then 774200
 when 274900000000 then 774201
 when 275000000000 then 774202
 when 275100000000 then 774203
 when 275200000000 then 774204
 when 275300000000 then 774205
 when 275400000000 then 774206
 when 275500000000 then 774207
 when 275600000000 then 774208
 when 275700000000 then 774209
 when 275800000000 then 774210
 when 275900000000 then 774211
 when 276000000000 then 774212
 when 276100000000 then 774213
 when 279900000000 then 774214
 when 280000000000 then 774215
 when 280000001111 then 774216
 when 280000001121 then 774217
 when 280100000000 then 774218
 when 280100002111 then 774219
 when 280100002121 then 774220
 when 280200000000 then 774221
 when 280300000000 then 774223
 when 286000000000 then 774224
 when 286100000000 then 774225
 when 286200000000 then 774226
 when 286900000000 then 774227
 when 288000000000 then 774228
 when 289800000000 then 774229
 when 289900000000 then 774230
 when 150000000000 then 774231
 when 150000150000 then 774232
 when 150000250000 then 774233
 when 150100000000 then 774234
 when 150200000000 then 774235
 when 150200150000 then 774236
 when 150200250000 then 774237
 when 154000000000 then 774238
 when 154000300000 then 774239
 when 154000700000 then 774240
 when 154100000000 then 774241
 when 154100300000 then 774242
 when 154100700000 then 774243
 when 154200000000 then 774244
 when 154200300000 then 774245
 when 154200700000 then 774246
 when 154300000000 then 774247
 when 154400000000 then 774248
 when 155000000000 then 774249
 when 155100000000 then 774250
 when 155200000000 then 774251
 when 155300000000 then 774252
 when 156900000000 then 774253
 when 157000000000 then 774254
 when 157100000000 then 774255
 when 157200000000 then 774256
 when 157300000000 then 774257
 when 157400000000 then 774258
 when 157500000000 then 774259
 when 157600000000 then 774260
 when 159900000000 then 774261
 when 160000000000 then 774262
 when 160100000000 then 774263
 when 160200000000 then 774264
 when 160300000000 then 774265
 when 160400000000 then 774266
 when 160500000000 then 774267
 when 162100000000 then 774268
 when 162200000000 then 774269
 when 163100000000 then 774270
 when 163200000000 then 774271
 when 163300000000 then 774272
 when 163400000000 then 774273
 when 163500000000 then 774274
 when 163600000000 then 774275
 when 165900000000 then 774276
 when 166000000000 then 774277
 when 166100000000 then 774278
 when 166200000000 then 774279
 when 166500000000 then 774280
 when 166900000000 then 774281
 when 170000000000 then 774282
 when 170100000000 then 774283
 when 170200000000 then 774284
 when 170300000000 then 774285
 when 170500000000 then 774286
 when 170600000000 then 774287
 when 170600003110 then 774288
 when 170600003120 then 774289
 when 170700000000 then 774290
 when 170800000000 then 774291
 when 170900000000 then 774292
 when 171000000000 then 774293
 when 171000003210 then 774294
 when 171000003220 then 774295
 when 171100000000 then 774296
 when 171200000000 then 774297
 when 171300000000 then 774298
 when 171400000000 then 774299
 when 171500000000 then 774300
 when 171600000000 then 774301
 when 171700000000 then 774302
 when 171800000000 then 774303
 when 171900000000 then 774304
 when 171900250000 then 774305
 when 172000000000 then 774306
 when 172100000000 then 774307
 when 174900000000 then 774308
 when 175000000000 then 774309
 when 175100000000 then 774310
 when 175200000000 then 774311
 when 175300000000 then 774312
 when 175400000000 then 774313
 when 175500000000 then 774314
 when 175600000000 then 774315
 when 175700000000 then 774316
 when 175800000000 then 774317
 when 175900000000 then 774318
 when 176000000000 then 774319
 when 176100000000 then 774320
 when 179900000000 then 774321
 when 180000000000 then 774322
 when 180000001111 then 774323
 when 180000001121 then 774324
 when 180100000000 then 774325
 when 180100002111 then 774326
 when 180100002121 then 774327
 when 180200000000 then 774328
 when 180300000000 then 774329
 when 186000000000 then 774330
 when 186100000000 then 774331
 when 186200000000 then 774332
 when 186900000000 then 774333
 when 188000000000 then 774334
 when 189800000000 then 774335
 when 189900000000 then 774336
                                ELSE NULL
                            END AS id
                        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
                    )
                ) AS recurso,

at.vl_AlteracaoOrcamentaria	as valor,
		JSON_QUERY(
            (SELECT	
		 		JSON_QUERY(
            (SELECT	    
			 
			                        case  r.cd_CategoriaEconomicaReceita
 when 1112500200 then 707028
 when 1112500400 then 707030
 when 1113031100 then 707032
 when 1114511102 then 707034
 when 1114511200 then 707035
 when 1114511300 then 707036
 when 1114511400 then 707037
 when 1121010102 then 707039
 when 1121010104 then 707040
 when 1121010105 then 707041
 when 1121010106 then 707042
 when 1121010107 then 707043
 when 1121500100 then 707044
 when 1122010101 then 707045
 when 1122010102 then 707046
 when 1122010103 then 707047
 when 1122010104 then 707048
 when 1122010105 then 707049
 when 1122010106 then 707050
 when 1122010107 then 707051
 when 1122010108 then 707052
 when 1241500100 then 707053
 when 1321010101 then 707054
 when 1321010104 then 707055
 when 1321010105 then 707056
 when 1321010106 then 707057
 when 1321010107 then 707058
 when 1321010108 then 707059
 when 1321010111 then 707060
 when 1321010112 then 707061
 when 1321010113 then 707062
 when 1321010114 then 707063
 when 1321010115 then 707064
 when 1699990101 then 707065
 when 1699990102 then 707066
 when 1711511101 then 707067
 when 1711512101 then 707068
 when 1711512102 then 707069
 when 1711520101 then 707070
 when 1712510100 then 707071
 when 1712524100 then 707072
 when 1714500100 then 707073
 when 1714520100 then 707074
 when 1714530100 then 707075
 when 1719580101 then 707076
 when 1721520101 then 707079
 when 1721530100 then 707080
 when 1724510101 then 707081
 when 1751500101 then 707082
 when 1751500102 then 707083
 when 1759990101 then 707084
 when 1922990101 then 707085
 when 1999992101 then 707086
 when 2422540101 then 707087
 when 1112500100 then 707120
 when 1112500300 then 707121
 when 1112530100 then 707122
 when 1114511101 then 707123
 when 1121010101 then 707124
 when 1721500101 then 707126
 when 1721510101 then 707127
 when 1000000000 then 709907
 when 1000000000 then 709908

  when 1321010132 then 710127
  when 2429990101 then 710128
  when 2414990108 then 710129
  when 1719570101 then 710130

  when 2419510101 then 710131
  when 2412509101 then 710132
 
                                    end as id

			 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
                )
            ) AS receita,
			at.vl_AlteracaoOrcamentaria	as valor

FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
                )
            ) AS receitas
  FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
                    )
                ) AS recursos

     FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS origens,
			JSON_QUERY(
                (SELECT	
                    		   
			   
			JSON_QUERY(
                (
                    SELECT
                        CASE at.cd_DestinacaoRecursoDestino
when 250000000000 then 774124
 when 250000150000 then 774125
 when 250000250000 then 774126
 when 250100000000 then 774127
 when 250200000000 then 774128
 when 250200150000 then 774129
 when 250200250000 then 774130
 when 254000000000 then 774131
 when 254000300000 then 774132
 when 254000700000 then 774133
 when 254100000000 then 774134
 when 254100300000 then 774135
 when 254100700000 then 774136
 when 254200000000 then 774137
 when 254200300000 then 774138
 when 254200700000 then 774139
 when 254300000000 then 774140
 when 254400000000 then 774141
 when 255000000000 then 774142
 when 255100000000 then 774143
 when 255200000000 then 774144
 when 255300000000 then 774145
 when 256900000000 then 774146
 when 257000000000 then 774147
 when 257100000000 then 774148
 when 257200000000 then 774149
 when 257300000000 then 774150
 when 257400000000 then 774151
 when 257500000000 then 774152
 when 257600000000 then 774153
 when 259900000000 then 774154
 when 260000000000 then 774155
 when 260100000000 then 774156
 when 260200000000 then 774157
 when 260300000000 then 774158
 when 260400000000 then 774159
 when 260500000000 then 774160
 when 262100000000 then 774161
 when 262200000000 then 774162
 when 263100000000 then 774163
 when 263200000000 then 774164
 when 263300000000 then 774165
 when 263400000000 then 774166
 when 263500000000 then 774167
 when 263600000000 then 774168
 when 265900000000 then 774169
 when 266000000000 then 774170
 when 266100000000 then 774171
 when 266200000000 then 774172
 when 266500000000 then 774173
 when 266900000000 then 774174
 when 270000000000 then 774175
 when 270100000000 then 774176
 when 270200000000 then 774177
 when 270300000000 then 774178
 when 270500000000 then 774179
 when 270600000000 then 774180
 when 270600003110 then 774181
 when 270600003120 then 774182
 when 270700000000 then 774183
 when 270800000000 then 774184
 when 270900000000 then 774185
 when 271000000000 then 774186
 when 271000003210 then 774187
 when 271000003220 then 774188
 when 271100000000 then 774189
 when 271200000000 then 774190
 when 271300000000 then 774191
 when 271400000000 then 774192
 when 271500000000 then 774193
 when 271600000000 then 774194
 when 271700000000 then 774195
 when 271800000000 then 774196
 when 271900000000 then 774197
 when 271900250000 then 774198
 when 272000000000 then 774199
 when 272100000000 then 774200
 when 274900000000 then 774201
 when 275000000000 then 774202
 when 275100000000 then 774203
 when 275200000000 then 774204
 when 275300000000 then 774205
 when 275400000000 then 774206
 when 275500000000 then 774207
 when 275600000000 then 774208
 when 275700000000 then 774209
 when 275800000000 then 774210
 when 275900000000 then 774211
 when 276000000000 then 774212
 when 276100000000 then 774213
 when 279900000000 then 774214
 when 280000000000 then 774215
 when 280000001111 then 774216
 when 280000001121 then 774217
 when 280100000000 then 774218
 when 280100002111 then 774219
 when 280100002121 then 774220
 when 280200000000 then 774221
 when 280300000000 then 774223
 when 286000000000 then 774224
 when 286100000000 then 774225
 when 286200000000 then 774226
 when 286900000000 then 774227
 when 288000000000 then 774228
 when 289800000000 then 774229
 when 289900000000 then 774230
 when 150000000000 then 774231
 when 150000150000 then 774232
 when 150000250000 then 774233
 when 150100000000 then 774234
 when 150200000000 then 774235
 when 150200150000 then 774236
 when 150200250000 then 774237
 when 154000000000 then 774238
 when 154000300000 then 774239
 when 154000700000 then 774240
 when 154100000000 then 774241
 when 154100300000 then 774242
 when 154100700000 then 774243
 when 154200000000 then 774244
 when 154200300000 then 774245
 when 154200700000 then 774246
 when 154300000000 then 774247
 when 154400000000 then 774248
 when 155000000000 then 774249
 when 155100000000 then 774250
 when 155200000000 then 774251
 when 155300000000 then 774252
 when 156900000000 then 774253
 when 157000000000 then 774254
 when 157100000000 then 774255
 when 157200000000 then 774256
 when 157300000000 then 774257
 when 157400000000 then 774258
 when 157500000000 then 774259
 when 157600000000 then 774260
 when 159900000000 then 774261
 when 160000000000 then 774262
 when 160100000000 then 774263
 when 160200000000 then 774264
 when 160300000000 then 774265
 when 160400000000 then 774266
 when 160500000000 then 774267
 when 162100000000 then 774268
 when 162200000000 then 774269
 when 163100000000 then 774270
 when 163200000000 then 774271
 when 163300000000 then 774272
 when 163400000000 then 774273
 when 163500000000 then 774274
 when 163600000000 then 774275
 when 165900000000 then 774276
 when 166000000000 then 774277
 when 166100000000 then 774278
 when 166200000000 then 774279
 when 166500000000 then 774280
 when 166900000000 then 774281
 when 170000000000 then 774282
 when 170100000000 then 774283
 when 170200000000 then 774284
 when 170300000000 then 774285
 when 170500000000 then 774286
 when 170600000000 then 774287
 when 170600003110 then 774288
 when 170600003120 then 774289
 when 170700000000 then 774290
 when 170800000000 then 774291
 when 170900000000 then 774292
 when 171000000000 then 774293
 when 171000003210 then 774294
 when 171000003220 then 774295
 when 171100000000 then 774296
 when 171200000000 then 774297
 when 171300000000 then 774298
 when 171400000000 then 774299
 when 171500000000 then 774300
 when 171600000000 then 774301
 when 171700000000 then 774302
 when 171800000000 then 774303
 when 171900000000 then 774304
 when 171900250000 then 774305
 when 172000000000 then 774306
 when 172100000000 then 774307
 when 174900000000 then 774308
 when 175000000000 then 774309
 when 175100000000 then 774310
 when 175200000000 then 774311
 when 175300000000 then 774312
 when 175400000000 then 774313
 when 175500000000 then 774314
 when 175600000000 then 774315
 when 175700000000 then 774316
 when 175800000000 then 774317
 when 175900000000 then 774318
 when 176000000000 then 774319
 when 176100000000 then 774320
 when 179900000000 then 774321
 when 180000000000 then 774322
 when 180000001111 then 774323
 when 180000001121 then 774324
 when 180100000000 then 774325
 when 180100002111 then 774326
 when 180100002121 then 774327
 when 180200000000 then 774328
 when 180300000000 then 774329
 when 186000000000 then 774330
 when 186100000000 then 774331
 when 186200000000 then 774332
 when 186900000000 then 774333
 when 188000000000 then 774334
 when 189800000000 then 774335
 when 189900000000 then 774336
                                ELSE NULL
                            END AS id
                        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
                    )
                ) AS recurso,
at.vl_AlteracaoOrcamentaria	as valor

  FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
                    )
                ) AS recursos

FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
from CONTALTERACAOORCAMENTARIAITEM at
inner join CONTALTERACAOORCAMENTARIA a
on a. cd_Exercicio = at.cd_Exercicio
and a.cd_AlteracaoOrcamentaria = at.cd_AlteracaoOrcamentaria
inner join CONTAlteracaoOrcamentariaTipo t
on t.cd_AlteracaoOrcamentariaTipo = at.cd_AlteracaoOrcamentariaTipo
inner join CONTFICHARECEITA r
on r.cd_cecam = at.cd_Cecam
and at.CD_FichaRecOrigem = r.cd_ficharec
where t.cd_AlteracaoOrcamentariaTipo in (2)
and at.cd_Cecam = 1995






--


        `;
        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const content = JSON.parse(record.content);
        
            return {
                idIntegracao: record.idIntegracao ? record.idIntegracao.toString() : null,
                content: {
                    exercicio: content.exercicio,
                    validaSaldo: content.validaSaldo === "true", // Converte string para boolean
                    despesa: {
                        id: content.despesa && content.despesa.id ? content.despesa.id : null
                    },
                    valor: content.valor ? parseFloat(content.valor) : null,
                    via: content.via,
                    finalidade: content.finalidade || null,
                    desconsideraLimite: content.desconsideraLimite === "true", // Converte string para boolean
                    tipo: content.tipo,
        
                    // Tratamento de origens
                    origens: content.origens && !Array.isArray(content.origens)
                        ? [{
                            tipo: content.origens.tipo,
                            origem: {
                                id: content.origens.origem && content.origens.origem.id ? content.origens.origem.id : null
                            },
                            valor: content.origens.valor ? parseFloat(content.origens.valor) : null,
        
                            // Tratamento de recursos dentro de origens (com receitas)
                            recursos: content.origens.recursos && !Array.isArray(content.origens.recursos)
                                ? [{
                                    recurso: {
                                        id: content.origens.recursos.recurso && content.origens.recursos.recurso.id ? content.origens.recursos.recurso.id : null
                                    },
                                    valor: content.origens.recursos.valor ? parseFloat(content.origens.recursos.valor) : null,
                                    receitas: content.origens.recursos.receitas && !Array.isArray(content.origens.recursos.receitas)
                                        ? [{
                                            receita: {
                                                id: content.origens.recursos.receitas.receita && content.origens.recursos.receitas.receita.id ? content.origens.recursos.receitas.receita.id : null
                                            },
                                            valor: content.origens.recursos.receitas.valor ? parseFloat(content.origens.recursos.receitas.valor) : null
                                        }]
                                        : Array.isArray(content.origens.recursos.receitas) ? content.origens.recursos.receitas.map(receita => ({
                                            receita: {
                                                id: receita.receita && receita.receita.id ? receita.receita.id : null
                                            },
                                            valor: receita.valor ? parseFloat(receita.valor) : null
                                        })) : []
                                }]
                                : Array.isArray(content.origens.recursos) ? content.origens.recursos.map(recurso => ({
                                    recurso: {
                                        id: recurso.recurso && recurso.recurso.id ? recurso.recurso.id : null
                                    },
                                    valor: recurso.valor ? parseFloat(recurso.valor) : null,
                                    receitas: recurso.receitas && !Array.isArray(recurso.receitas)
                                        ? [{
                                            receita: {
                                                id: recurso.receitas.receita && recurso.receitas.receita.id ? recurso.receitas.receita.id : null
                                            },
                                            valor: recurso.receitas.valor ? parseFloat(recurso.receitas.valor) : null
                                        }]
                                        : Array.isArray(recurso.receitas) ? recurso.receitas.map(receita => ({
                                            receita: {
                                                id: receita.receita && receita.receita.id ? receita.receita.id : null
                                            },
                                            valor: receita.valor ? parseFloat(receita.valor) : null
                                        })) : []
                                })) : []
                        }]
                        : Array.isArray(content.origens) ? content.origens.map(origem => ({
                            tipo: origem.tipo,
                            origem: {
                                id: origem.origem && origem.origem.id ? origem.origem.id : null
                            },
                            valor: origem.valor ? parseFloat(origem.valor) : null,
        
                            // Tratamento de recursos dentro de origens (com receitas)
                            recursos: origem.recursos && !Array.isArray(origem.recursos)
                                ? [{
                                    recurso: {
                                        id: origem.recursos.recurso && origem.recursos.recurso.id ? origem.recursos.recurso.id : null
                                    },
                                    valor: origem.recursos.valor ? parseFloat(origem.recursos.valor) : null,
                                    receitas: origem.recursos.receitas && !Array.isArray(origem.recursos.receitas)
                                        ? [{
                                            receita: {
                                                id: origem.recursos.receitas.receita && origem.recursos.receitas.receita.id ? origem.recursos.receitas.receita.id : null
                                            },
                                            valor: origem.recursos.receitas.valor ? parseFloat(origem.recursos.receitas.valor) : null
                                        }]
                                        : Array.isArray(origem.recursos.receitas) ? origem.recursos.receitas.map(receita => ({
                                            receita: {
                                                id: receita.receita && receita.receita.id ? receita.receita.id : null
                                            },
                                            valor: receita.valor ? parseFloat(receita.valor) : null
                                        })) : []
                                }]
                                : Array.isArray(origem.recursos) ? origem.recursos.map(recurso => ({
                                    recurso: {
                                        id: recurso.recurso && recurso.recurso.id ? recurso.recurso.id : null
                                    },
                                    valor: recurso.valor ? parseFloat(recurso.valor) : null,
                                    receitas: recurso.receitas && !Array.isArray(recurso.receitas)
                                        ? [{
                                            receita: {
                                                id: recurso.receitas.receita && recurso.receitas.receita.id ? recurso.receitas.receita.id : null
                                            },
                                            valor: recurso.receitas.valor ? parseFloat(recurso.receitas.valor) : null
                                        }]
                                        : Array.isArray(recurso.receitas) ? recurso.receitas.map(receita => ({
                                            receita: {
                                                id: receita.receita && receita.receita.id ? receita.receita.id : null
                                            },
                                            valor: receita.valor ? parseFloat(receita.valor) : null
                                        })) : []
                                })) : []
                        })) : [],
        
                    // Tratamento de recursos no nível principal (sem receitas)
                    recursos: content.recursos && !Array.isArray(content.recursos)
                        ? [{
                            recurso: {
                                id: content.recursos.recurso && content.recursos.recurso.id ? content.recursos.recurso.id : null
                            },
                            valor: content.recursos.valor ? parseFloat(content.recursos.valor) : null
                        }]
                        : Array.isArray(content.recursos) ? content.recursos.map(recurso => ({
                            recurso: {
                                id: recurso.recurso && recurso.recurso.id ? recurso.recurso.id : null
                            },
                            valor: recurso.valor ? parseFloat(recurso.valor) : null
                        })) : []
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
        
                const response = await fetch(`https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/creditos-orcamentarios`, {
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