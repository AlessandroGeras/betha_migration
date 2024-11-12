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
    const hours = (`0${d.getHours()}`).slice(-2);
    const minutes = (`0${d.getMinutes()}`).slice(-2);
    const seconds = (`0${d.getSeconds()}`).slice(-2);
    return `${year}-${month}-${day}`;
    //return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
ct.cd_codigo as idIntegracao,
JSON_QUERY(
(SELECT
ct.cd_exercicio as exercicio,
'false' as validaSaldo,
ct.dt_movto       as data,
ct.cd_codigo  as numeroDocumento,
JSON_QUERY(
                        (SELECT
                        25596 as id
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS transacaoFinanceira,
ct.vl_movimento  as valor,
CONCAT('ARRECADAÇÃO MIGRACAO DA RECEITA: ', r.ds_receita)	as especificacao,
JSON_QUERY(
                        (SELECT
                        case  b.cd_codconta
when '00672010' then 188009
 when '15490' then 188008
 when '8642' then 187618
 when '8643' then 187619
 when '20831' then 187620
 when '12197' then 187621
 when '60049' then 187624
 when '11737' then 187627
 when '13452' then 187629
 when '283144' then 187631
 when '8645' then 187632
 when '15051' then 187636
 when '12018' then 187646
 when '43489' then 187651
 when '13542' then 187653
 when '46534' then 187664
 when '7889' then 187665
 when '8030' then 187666
 when '8101' then 187669
 when '7909' then 187672
 when '7945' then 187674
 when '14253' then 187677
 when '006647240' then 187680
 when '14398' then 187688
 when '14685' then 187690
 when '14689' then 187692
 when '14708' then 187694
 when '14690' then 187695
 when '14693' then 187696
 when '14691' then 187697
 when '14711' then 187701
 when '13577' then 187702
 when '14920' then 187703
 when '14919' then 187704
 when '131099' then 187705
 when '14478' then 187706
 when '14951' then 187707
 when '672007' then 187708
 when '14935' then 187709
 when '9896' then 187711
 when '15199' then 187712
 when '15353' then 187714
 when '9310' then 187715
 when '15409' then 187716
 when '15249' then 187717
 when '15369' then 187765
 when '15332' then 187766
 when '006647256' then 187768
 when '10219' then 187779
 when '11058' then 187780
 when '11525' then 187781
 when '18223' then 187782
 when '11383' then 187783
 when '12252' then 187785
 when '12177' then 187786
 when '008030' then 187787
 when '60028' then 187868
 when '13100' then 187869
 when '60047' then 187870
 when '60015' then 187871
 when '60048' then 187872
 when '13513' then 187873
 when '13328' then 187874
 when '13548' then 187875
 when '13512' then 187876
 when '60040' then 187877
 when '60024' then 187878
 when '13362' then 187879
 when '00671060' then 187880
 when '13552' then 187881
 when '6000312' then 187882
 when '13543' then 187883
 when '13544' then 187884
 when '13547' then 187885
 when '6000313' then 187886
 when '43488' then 187887
 when '43490' then 187888
 when '43491' then 187889
 when '13632' then 187890
 when '60027' then 187891
 when '60023' then 187892
 when '13113' then 187893
 when '60022' then 187894
 when '60036' then 187895
 when '13676' then 187896
 when '60037' then 187897
 when '13048' then 187898
 when '60042' then 187899
 when '6071008' then 187900
 when '60039' then 187901
 when '13689' then 187902
 when '13103' then 187903
 when '14101' then 187904
 when '13538' then 187905
 when '13540' then 187906
 when '13 541' then 187907
 when '13327' then 187908
 when '00600071063' then 187909
 when '14370' then 187910
 when '14385' then 187911
 when '006071095' then 187912
 when '14440' then 187913
 when '14479' then 187914
 when '14369' then 187915
 when '14399' then 187916
 when '14397' then 187917
 when '14688' then 187918
 when '14694' then 187919
 when '9208' then 187920
 when '14687' then 187921
 when '14715' then 187922
 when '14974' then 187923
 when '15271' then 187924
 when '15380' then 187925
 when '15422' then 187926
 when '15350' then 187927
 when '15716' then 187928
 when '9881' then 187929
 when '11500' then 187930
 when '11623' then 187931
 when '60001' then 187932
 when '13015' then 187933
 when '14686' then 187934
 when '13021' then 187935
 when '12324' then 187936
 when '12328' then 187937
 when '12326' then 187938
 when '14206' then 187939
 when '14310' then 187940
 when '14741' then 187941
 when '13576' then 187942
 when '14463' then 187943
 when '60018' then 187944
 when '44001' then 187945
 when '60041' then 187946
 when '60045' then 187947
 when '60044' then 187948
 when '12903' then 187949
 when '84506' then 187950
 when '87165' then 187951
 when '13563' then 187952
 when '13564' then 187953
 when '13641' then 187954
 when '15080' then 187955
 when '15161' then 187956
 when '15435' then 187957
 when '43997' then 187958
 when '60006' then 187959
 when '60001' then 187960
 when '60002' then 187961
 when '60003' then 187962
 when '60004' then 187963
 when '13647' then 187964
 when '60005' then 187965
 when '6624088' then 187966
 when '6000315' then 187967
 when '13015' then 187968
 when '13021' then 187969
 when '44010' then 187970
 when '14365' then 187971
 when '14480' then 187972
 when '14536' then 187973
 when '14487' then 187974
 when '14686' then 187975
 when '15209' then 187976
 when '15264' then 187977
 when '15380' then 187978
 when '15422' then 187979
 when '15350' then 187980
 when '15716' then 187981
 when '9881' then 187982
 when '11500' then 187983
 when '11623' then 187984
 when '12324' then 187985
 when '12328' then 187986
 when '13632' then 187987
 when '12326' then 187988
 when '14206' then 187989
 when '14310' then 187990
 when '14741' then 187991
 when '13576' then 187992
 when '14463' then 187993
 when '60018' then 187994
 when '44001' then 187995
 when '60041' then 187996
 when '60045' then 187997
 when '60044' then 187998
 when '12903' then 187999
 when '84506' then 188000
 when '87165' then 188001
 when '13563' then 188002
 when '13564' then 188003
 when '13641' then 188004
 when '15080' then 188005
 when '15161' then 188006
 when '15435' then 188007
 when '15622' then 188187
 
                                    end as id
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS contaBancaria,
'CORRENTE' as tipoConta,
JSON_QUERY(
                        (SELECT
                        ct.vl_movimento as valor,
						'false'  as lancada,
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
 when 1922990102 then 707851
 when 1922990103 then 707852
 when 1321010132 then 710127
 when 2429990101 then 710128
 when 2414990108 then 710129
 when 1719570101 then 710130
 when 2419510101 then 710131
 when 2412509101 then 710132
 when 1923990404 then 710337
 when 1923990406 then 710338
 when 1923990407 then 710339
 when 1923990408 then 710340
 when 1923990409 then 710341
 when 1923990410 then 710342
 when 1923990411 then 710343
 when 1923990412 then 710344
 when 1923990413 then 710345
 when 1923990414 then 710346
 when 1923990415 then 710347
 when 1321010116 then 710348
 when 1321010117 then 710349
 when 1321010118 then 710350
 when 1321010119 then 710351
 when 1321010120 then 710352
 when 1321010121 then 710353
 when 1714990101 then 710354
 when 1714990102 then 710355
 when 1113034101 then 710356
 when 1113034102 then 710357
 when 1922011101 then 710358
 when 1923990101 then 710359
 when 1923990102 then 710360
 when 1923990103 then 710361
 when 1923990104 then 710362
 when 1923990301 then 710363
 when 1923990302 then 710364
 when 1923990303 then 710365
 when 1923990304 then 710366
 when 1923990305 then 710367
 when 1923990306 then 710368
 when 1923990307 then 710369
 when 1923990308 then 710370
 when 1923990309 then 710371
 when 1923990310 then 710372
 when 1923990311 then 710373
 when 1923990312 then 710374
 when 1923990313 then 710375
 when 1923990314 then 710376
 when 1923990315 then 710377
 when 1923990401 then 710378
 when 1923990402 then 710379
 when 1923990403 then 710380
 when 1711511104 then 710381
 when 1321010131 then 710382
 when 1923990416 then 710383
 when 1923990417 then 710384
 when 1923990418 then 710385
 when 1999122101 then 710386
 when 1922063101 then 710387
 when 1121040101 then 710388
 when 1121040102 then 710389
 when 1121040403 then 710390
 when 1121040104 then 710391
 when 1711512103 then 710392
 when 1922990104 then 710393
 when 1922990105 then 710394
 when 1922990106 then 710395
 when 1922510101 then 710396
 when 1999992102 then 710397
 when 1922990110 then 710398





                                    end as id
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS receita,
										JSON_QUERY(
                        (SELECT
                        case  r.cd_DestinacaoRecurso
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

                                    end as id,
			  ct.vl_movimento		 as valor
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS recursos

                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS receitas

FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
from CONT_MOVIMENTACAO ct
inner join CONTFICHABANCOS  b
on ct.cd_banco = b.cd_banco 
and ct.cd_cecam = b.cd_cecam
inner join contfichareceita r 
on ct.cd_ficharec = r.cd_ficharec
-----where ct.cd_ficharec in (41,46,54,56,58)
where ct.cd_cecam = 1995
and ct.fl_depret = 'D'
and ct.fl_tipo <> 'B'
and r.cd_receitaPrevisaoTipo not in (95,99)
and  b.cd_banco  <> 1
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            // Parse o conteúdo JSON retornado do SELECT
            const content = JSON.parse(record.content);
        
            return {
                idIntegracao: record.idIntegracao.toString(), // Convertendo idIntegracao para string
                content: {
                    exercicio: content.exercicio, // Usando o valor retornado do SELECT
                    validaSaldo: content.validaSaldo === "true", // Convertendo string "true"/"false" para booleano
                    data: formatDate(content.data), // Formatando a data no formato AAAA-MM-DD
                    numeroDocumento: content.numeroDocumento.toString(), // Convertendo número do documento para string
                    transacaoFinanceira: {
                        id: content.transacaoFinanceira?.id // Usando o id da transação financeira
                    },
                    valor: content.valor, // Usando o valor retornado
                    especificacao: content.especificacao, // Usando a especificação retornada
                    contaBancaria: {
                        id: content.contaBancaria?.id // Usando o id da conta bancária
                    },
                    tipoConta: content.tipoConta, // Usando o tipo de conta retornado
                    receitas: [
                        {
                            valor: content.receitas.valor, // Usando o valor da receita
                            lancada: content.receitas.lancada === "true", // Convertendo string "true"/"false" para booleano
                            receita: {
                                id: content.receitas.receita?.id // Usando o id da receita
                            },
                            recursos: [
                                {
                                    recurso: {
                                        id: content.receitas.recursos?.id // Usando o id do recurso
                                    },
                                    valor: content.receitas.recursos?.valor // Usando o valor do recurso
                                }
                            ],                            
                        }
                    ]
                }
            };
        }).filter(record => record !== null); // Filtrando registros nulos
        
        
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
        
                const response = await fetch(`https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/arrecadacoes-orcamentarias`, {
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