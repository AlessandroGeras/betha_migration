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
            SELECT
    m.cd_codigo_inicial AS idIntegracao,
    JSON_QUERY(
        (
            SELECT
                m.cd_exercicio AS exercicio,
                m.dt_movto AS data,
                m.vl_movimento AS valor,
                JSON_QUERY(
                    (
                        SELECT
                            CASE cb.cd_DestinacaoRecurso
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
                ) AS recursoOrigem,
				 JSON_QUERY(
                    (
                        SELECT
                             CASE cb1.cd_DestinacaoRecurso
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
                ) AS recursoDestino,
	'CONTA_BANCARIA'			as categoria,

                JSON_QUERY(
                    (
                        SELECT
                           CASE concat(cb.cd_codconta,cb.cd_dig_conta)
 when '86428' then 187618
 when '153699' then 187765
 when '86436' then 187619
 when '208310' then 187620
 when '121975' then 187621
 when '600288' then 187622
 when '131008' then 187623
 when '600490' then 187624
 when '600474' then 187625
 when '600156' then 187626
 when '117374' then 187627
 when '600482' then 187628
 when '13452X' then 187629
 when '135135' then 187630
 when '2831449' then 187631
 when '86452' then 187632
 when '133280' then 187633
 when '135488' then 187634
 when '135127' then 187635
 when '150517' then 187636
 when '600407' then 187637
 when '600245' then 187638
 when '133620' then 187639
 when '006710601' then 187640
 when '135526' then 187641
 when '60003123' then 187642
 when '135437' then 187643
 when '135445' then 187644
 when '13547X' then 187645
 when '120189' then 187646
 when '60003131' then 187647
 when '434884' then 187648
 when '434906' then 187649
 when '434914' then 187650
 when '434892' then 187651
 when '136328' then 187652
 when '135429' then 187653
 when '60027X' then 187654
 when '600237' then 187655
 when '13113X' then 187656
 when '600229' then 187657
 when '600369' then 187658
 when '13676X' then 187659
 when '600377' then 187660
 when '130486' then 187661
 when '600423' then 187662
 when '60710083' then 187663
 when '465348' then 187664
 when '78891' then 187665
 when '80306' then 187666
 when '600393' then 187667
 when '136891' then 187668
 when '81019' then 187669
 when '131032' then 187670
 when '141011' then 187671
 when '7909X' then 187672
 when '135380' then 187673
 when '79456' then 187674
 when '135402' then 187675
 when '13 5410' then 187676
 when '142530' then 187677
 when '133272' then 187678
 when '006000710636' then 187679
 when '0066472400' then 187680
 when '0066472567' then 187680
 when '143707' then 187681
 when '143855' then 187682
 when '0060710954' then 187683
 when '144401' then 187684
 when '144797' then 187685
 when '143693' then 187686
 when '143995' then 187687
 when '143987' then 187688
 when '143979' then 187689
 when '146854' then 187690
 when '146889' then 187691
 when '146897' then 187692
 when '146943' then 187693
 when '147087' then 187694
 when '146900' then 187695
 when '146935' then 187696
 when '146919' then 187697
 when '92088' then 187698
 when '146870' then 187699
 when '14715X' then 187700
 when '147117' then 187701
 when '135771' then 187702
 when '149209' then 187703
 when '149195' then 187704
 when '1310992' then 187705
 when '144789' then 187706
 when '149519' then 187707
 when '6720072' then 187708
 when '149357' then 187709
 when '149748' then 187710
 when '98965' then 187711
 when '151998' then 187712
 when '152714' then 187713
 when '153532' then 187714
 when '93106' then 187715
 when '154091' then 187716
 when '152498' then 187717
 when '15380X' then 187718
 when '154229' then 187719
 when '153508' then 187720
 when '157163' then 187721
 when '98817' then 187722
 when '115002' then 187723
 when '116238' then 187724
 when '600016' then 187725
 when '13015X' then 187726
 when '146862' then 187727
 when '130214' then 187728
 when '123242' then 187729
 when '123285' then 187730
 when '123269' then 187731
 when '142069' then 187732
 when '143103' then 187733
 when '147419' then 187734
 when '135763' then 187735
 when '144630' then 187736
 when '600180' then 187737
 when '440019' then 187738
 when '600415' then 187739
 when '600458' then 187740
 when '60044X' then 187741
 when '129038' then 187742
 when '845060' then 187743
 when '871656' then 187744
 when '135631' then 187745
 when '13564X' then 187746
 when '136417' then 187747
 when '150800' then 187748
 when '151610' then 187749
 when '154350' then 187750
 when '439975' then 187751
 when '122521' then 187785
                                ELSE NULL
                            END AS id
                        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
                    )
                ) AS contaBancariaEntidade,
                'CORRENTE' AS tipoContaOrigem,
				  'Ajuste do valor do recurso' AS finalidade		
            FROM CONT_MOVIMENTACAO m1
            INNER JOIN CONTFICHABANCOS cb1 ON m1.cd_banco = cb1.cd_banco
            AND m1.cd_cecam = cb1.cd_cecam
            WHERE m1.fl_tipo = 'B'
            AND m1.fl_depret = 'D'
			 and  m1.cd_codigo_inicial in (232,234,236,238,308,310,312,314,3540,4422)
            AND m1.cd_codigo_inicial = m.cd_codigo_inicial
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        )
    ) AS content
FROM CONT_MOVIMENTACAO m
INNER JOIN CONTFICHABANCOS cb ON m.cd_banco = cb.cd_banco
AND m.cd_cecam = cb.cd_cecam
WHERE m.fl_tipo = 'B'
AND m.fl_depret = 'R'
and m.cd_cecam= 1995
and  m.cd_codigo_inicial in (232,234,236,238,308,310,312,314,3540,4422)
ORDER BY m.cd_codigo_inicial;
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
                    data: content.data ? content.data.split('T')[0] : null, // Formatando a data sem o horário
                    valor: content.valor || null,
                    recursoOrigem: {
                        id: content.recursoOrigem && content.recursoOrigem.id ? content.recursoOrigem.id : null
                    },
                    recursoDestino: {
                        id: content.recursoDestino && content.recursoDestino.id ? content.recursoDestino.id : null
                    },
                    categoria: content.categoria || null,
                    contaBancariaEntidade: {
                        id: content.contaBancariaEntidade && content.contaBancariaEntidade.id ? content.contaBancariaEntidade.id : null
                    },
                    tipoConta: content.tipoContaOrigem || null, // Alterado para 'tipoContaOrigem' conforme o retorno do select
                    finalidade: content.finalidade || null
                }
            };
        });
        
        

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
        
                const response = await fetch(`https://tes-sl-rest.betha.cloud/tesouraria/service-layer/v2/api/ajustes-recursos`, {
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