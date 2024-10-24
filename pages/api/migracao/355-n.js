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
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    //return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function formatDate2(date) {
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

        // Selecionar o banco de dados
        const selectDatabaseQuery = 'USE TRIBUTOS2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
/*imoveisInfComplemOp*/

WITH UltimosBic AS (
    SELECT
        cd_Imovel,
        MAX(nr_Bic) AS UltimoBic
    FROM
        IPTUBicCaractImoveis
    GROUP BY
        cd_Imovel
),
RegistrosComNumero AS (
    SELECT
        case
		 when cd_InscricaoImovel = '0030040005' then 27629133
 when cd_InscricaoImovel = '0030040006' then 27629134
 when cd_InscricaoImovel = '0030040007' then 27629135
 when cd_InscricaoImovel = '0030040008' then 27629136
 when cd_InscricaoImovel = '0030040009' then 27629137
 when cd_InscricaoImovel = '0030040010' then 27629138
 when cd_InscricaoImovel = '0030040011' then 27629139
 when cd_InscricaoImovel = '0030040012' then 27629140
 when cd_InscricaoImovel = '0030040013' then 27629141
 when cd_InscricaoImovel = '0030040014' then 27629142
 when cd_InscricaoImovel = '0030040015' then 27629143
 when cd_InscricaoImovel = '0030040016' then 27629144
 when cd_InscricaoImovel = '0030040017' then 27629145
 when cd_InscricaoImovel = '0030050001' then 27629146
 when cd_InscricaoImovel = '0030050002' then 27629147
 when cd_InscricaoImovel = '0030050003' then 27629148
 when cd_InscricaoImovel = '0030050004' then 27629149
 when cd_InscricaoImovel = '0030050005' then 27629150
 when cd_InscricaoImovel = '0030050006' then 27629151
 when cd_InscricaoImovel = '0030050007' then 27629152
 when cd_InscricaoImovel = '0030050008' then 27629153
 when cd_InscricaoImovel = '0030050009' then 27629154
 when cd_InscricaoImovel = '0030050010' then 27629155
 when cd_InscricaoImovel = '0030050011' then 27629156
 when cd_InscricaoImovel = '0030050012' then 27629157
 when cd_InscricaoImovel = '0030050013' then 27629158
 when cd_InscricaoImovel = '0030050014' then 27629159
 when cd_InscricaoImovel = '0030060001' then 27629160
 when cd_InscricaoImovel = '0030060002' then 27629161
 when cd_InscricaoImovel = '0030060003' then 27629162
 when cd_InscricaoImovel = '0030060010' then 27629169
 when cd_InscricaoImovel = '0030060004' then 27629163
 when cd_InscricaoImovel = '0030060005' then 27629164
 when cd_InscricaoImovel = '0030060006' then 27629165
 when cd_InscricaoImovel = '0030060007' then 27629166
 when cd_InscricaoImovel = '0030060008' then 27629167
 when cd_InscricaoImovel = '0030060009' then 27629168
 when cd_InscricaoImovel = '0030060011' then 27629170
 when cd_InscricaoImovel = '0030060012' then 27629171
 when cd_InscricaoImovel = '0030070001' then 27629173
 when cd_InscricaoImovel = '0030060013' then 27629172
 when cd_InscricaoImovel = '003007001A' then 27629174
 when cd_InscricaoImovel = '0030070002' then 27629175
 when cd_InscricaoImovel = '0030070003' then 27629176
 when cd_InscricaoImovel = '0030070004' then 27629177
 when cd_InscricaoImovel = '0030070006' then 27629179
 when cd_InscricaoImovel = '0030070005' then 27629178
 when cd_InscricaoImovel = '0030070007' then 27629180
 when cd_InscricaoImovel = '0030070008' then 27629181
 when cd_InscricaoImovel = '0030070009' then 27629182
 when cd_InscricaoImovel = '0030080001' then 27629183
 when cd_InscricaoImovel = '0030080002' then 27629184
 when cd_InscricaoImovel = '0030080003' then 27629185
 when cd_InscricaoImovel = '0030080004' then 27629186
 when cd_InscricaoImovel = '0030080005' then 27629187
 when cd_InscricaoImovel = '0030080006' then 27629188
 when cd_InscricaoImovel = '0030080007' then 27629189
 when cd_InscricaoImovel = '0030080008' then 27629190
 when cd_InscricaoImovel = '0030080009' then 27629191
 when cd_InscricaoImovel = '0030080010' then 27629192
 when cd_InscricaoImovel = '0030080011' then 27629193
 when cd_InscricaoImovel = '0030080012' then 27629194
 when cd_InscricaoImovel = '0030090001' then 27629195
 when cd_InscricaoImovel = '0030090002' then 27629196
 when cd_InscricaoImovel = '0030090003' then 27629197
 when cd_InscricaoImovel = '0030090004' then 27629198
 when cd_InscricaoImovel = '0030090005' then 27629199
 when cd_InscricaoImovel = '0030090006' then 27629200
 when cd_InscricaoImovel = '0030090007' then 27629201
 when cd_InscricaoImovel = '0030090008' then 27629202
 when cd_InscricaoImovel = '0030090009' then 27629203
 when cd_InscricaoImovel = '0030090010' then 27629204
 when cd_InscricaoImovel = '0030090011' then 27629205
 when cd_InscricaoImovel = '0030090012' then 27629206
 when cd_InscricaoImovel = '0030100001' then 27629207
 when cd_InscricaoImovel = '0030100002' then 27629208
 when cd_InscricaoImovel = '0030100003' then 27629209
 when cd_InscricaoImovel = '0030100004' then 27629210
 when cd_InscricaoImovel = '0030100005' then 27629211
 when cd_InscricaoImovel = '0030100006' then 27629212
 when cd_InscricaoImovel = '0030100007' then 27629213
 when cd_InscricaoImovel = '0030100008' then 27629214
 when cd_InscricaoImovel = '0030100009' then 27629215
 when cd_InscricaoImovel = '0030110001' then 27629216
 when cd_InscricaoImovel = '0030110002' then 27629217
 when cd_InscricaoImovel = '0030120003' then 27629220
 when cd_InscricaoImovel = '0030120001' then 27629218
 when cd_InscricaoImovel = '0030120002' then 27629219
 when cd_InscricaoImovel = '0030120004' then 27629221
 when cd_InscricaoImovel = '0030120005' then 27629222
 when cd_InscricaoImovel = '0030120006' then 27629223
 when cd_InscricaoImovel = '0030130001' then 27629225
 when cd_InscricaoImovel = '0030120007' then 27629224
 when cd_InscricaoImovel = '0010300001' then 27629226
 when cd_InscricaoImovel = '0010300002' then 27629227
 when cd_InscricaoImovel = '00127B0002' then 27629231
 when cd_InscricaoImovel = '0020090007' then 27629246
 when cd_InscricaoImovel = '0010300003' then 27629228
 when cd_InscricaoImovel = '0010300004' then 27629229
 when cd_InscricaoImovel = '00127B0001' then 27629230
 when cd_InscricaoImovel = '00127B0011' then 27629240
 when cd_InscricaoImovel = '00127B0012' then 27629241
 when cd_InscricaoImovel = '00127B0003' then 27629232
 when cd_InscricaoImovel = '00127B0004' then 27629233
 when cd_InscricaoImovel = '00127B0005' then 27629234
 when cd_InscricaoImovel = '00127B0006' then 27629235
 when cd_InscricaoImovel = '00127B0007' then 27629236
 when cd_InscricaoImovel = '00127B0008' then 27629237
 when cd_InscricaoImovel = '00127B0009' then 27629238
 when cd_InscricaoImovel = '00127B0010' then 27629239
 when cd_InscricaoImovel = '00127B0013' then 27629242
 when cd_InscricaoImovel = '00127B0014' then 27629243
 when cd_InscricaoImovel = '0020140007' then 27629244
 when cd_InscricaoImovel = '0020090006' then 27629245
 when cd_InscricaoImovel = '0010220015' then 27629247
 when cd_InscricaoImovel = '002004001A' then 27629248
 when cd_InscricaoImovel = '0020060014' then 27629249
 when cd_InscricaoImovel = '002006002A' then 27629250
 when cd_InscricaoImovel = '0010230015' then 27629251
 when cd_InscricaoImovel = '0010230021' then 27629257
 when cd_InscricaoImovel = '0030060014' then 27629261
 when cd_InscricaoImovel = '001022001A' then 27629263
 when cd_InscricaoImovel = '0020160001' then 27629268
 when cd_InscricaoImovel = '001019008A' then 27629270
 when cd_InscricaoImovel = '001016021A' then 27629271
 when cd_InscricaoImovel = '001013012A' then 27629283
 when cd_InscricaoImovel = '0010230016' then 27629252
 when cd_InscricaoImovel = '0010230017' then 27629253
 when cd_InscricaoImovel = '0010230018' then 27629254
 when cd_InscricaoImovel = '0010220014' then 27629272
 when cd_InscricaoImovel = '0010220017' then 27629274
 when cd_InscricaoImovel = '001023024A' then 27629282
 when cd_InscricaoImovel = '00113A0001' then 27629285
 when cd_InscricaoImovel = '001013026A' then 27629286
 when cd_InscricaoImovel = '0010230019' then 27629255
 when cd_InscricaoImovel = '0010230020' then 27629256
 when cd_InscricaoImovel = '0010230022' then 27629258
 when cd_InscricaoImovel = '0010230023' then 27629259
 when cd_InscricaoImovel = '0010230024' then 27629260
 when cd_InscricaoImovel = '002008012A' then 27629262
 when cd_InscricaoImovel = '001016023A' then 27629264
 when cd_InscricaoImovel = '00201A004A' then 27629265
 when cd_InscricaoImovel = '003001003A' then 27629266
 when cd_InscricaoImovel = '001009001A' then 27629267
 when cd_InscricaoImovel = '0020140006' then 27629269
 when cd_InscricaoImovel = '0010220018' then 27629275
 when cd_InscricaoImovel = '0020060015' then 27629278
 when cd_InscricaoImovel = '0020060016' then 27629279
 when cd_InscricaoImovel = '0030140001' then 27629280
 when cd_InscricaoImovel = '001017001A' then 27629281
 when cd_InscricaoImovel = '001018017A' then 27629290
 when cd_InscricaoImovel = '0749' then 27629291
 when cd_InscricaoImovel = '001016011A' then 27629294
 when cd_InscricaoImovel = '001028009A' then 27629297
 when cd_InscricaoImovel = '002006020' then 27629299
 when cd_InscricaoImovel = '002006021' then 27629301
 when cd_InscricaoImovel = '001028002A' then 27629307
 when cd_InscricaoImovel = '0010220016' then 27629273
 when cd_InscricaoImovel = '0010220019' then 27629276
 when cd_InscricaoImovel = '0010280024' then 27629277
 when cd_InscricaoImovel = '0020060018' then 27629284
 when cd_InscricaoImovel = '001010023A' then 27629296
 when cd_InscricaoImovel = '003012003A' then 27629298
 when cd_InscricaoImovel = '003009004A' then 27629300
 when cd_InscricaoImovel = '003005006B' then 27629302
 when cd_InscricaoImovel = '001022009A' then 27629304
 when cd_InscricaoImovel = '001026005A' then 27629305
 when cd_InscricaoImovel = '00201A004B' then 27629306
 when cd_InscricaoImovel = '002003010A' then 27629311
 when cd_InscricaoImovel = '002006014A' then 27629315
 when cd_InscricaoImovel = '003012007A' then 27629318
 when cd_InscricaoImovel = '003002005A' then 27629322
 when cd_InscricaoImovel = '001022010A' then 27629323
 when cd_InscricaoImovel = '002006004A' then 27629332
 when cd_InscricaoImovel = '002004013A' then 27629333
 when cd_InscricaoImovel = '001028009B' then 27629335
 when cd_InscricaoImovel = '001022017A' then 27629287
 when cd_InscricaoImovel = '001014001A' then 27629288
 when cd_InscricaoImovel = '003005006A' then 27629289
 when cd_InscricaoImovel = '0750' then 27629292
 when cd_InscricaoImovel = '003002009A' then 27629293
 when cd_InscricaoImovel = '001026009' then 27629295
 when cd_InscricaoImovel = '001027021A' then 27629303
 when cd_InscricaoImovel = '002016001A' then 27629309
 when cd_InscricaoImovel = '001018007A' then 27629310
 when cd_InscricaoImovel = '002013001A' then 27629312
 when cd_InscricaoImovel = '002013001B' then 27629313
 when cd_InscricaoImovel = '002002004A' then 27629314
 when cd_InscricaoImovel = '003010002B' then 27629316
 when cd_InscricaoImovel = '002014008' then 27629308
 when cd_InscricaoImovel = '002027016A' then 27629317
 when cd_InscricaoImovel = '001029001' then 27629325
 when cd_InscricaoImovel = '003009009' then 27629327
 when cd_InscricaoImovel = '003002009B' then 27629328
 when cd_InscricaoImovel = '003002009C' then 27629329
 when cd_InscricaoImovel = '002018001' then 27629330
 when cd_InscricaoImovel = '001011017A' then 27629331
 when cd_InscricaoImovel = '001027018A' then 27629319
 when cd_InscricaoImovel = '003001001A' then 27629320
 when cd_InscricaoImovel = '002006014B' then 27629321
 when cd_InscricaoImovel = '001017001B' then 27629324
 when cd_InscricaoImovel = '003026001A' then 27629326
 when cd_InscricaoImovel = '001020007A' then 27629334
 when cd_InscricaoImovel = '00400609' then 27629339
 when cd_InscricaoImovel = '00400905' then 27629340
 when cd_InscricaoImovel = '004007002' then 27629342
 when cd_InscricaoImovel = '004014003' then 27629344
 when cd_InscricaoImovel = '004006010' then 27629360
 when cd_InscricaoImovel = '004008005' then 27629336
 when cd_InscricaoImovel = '00401208' then 27629338
 when cd_InscricaoImovel = '00401005' then 27629337
 when cd_InscricaoImovel = '004004013' then 27629345
 when cd_InscricaoImovel = '004003003' then 27629346
 when cd_InscricaoImovel = '004007005' then 27629348
 when cd_InscricaoImovel = '004011010' then 27629341
 when cd_InscricaoImovel = '004013005' then 27629343
 when cd_InscricaoImovel = '004004014' then 27629347
 when cd_InscricaoImovel = '004013012' then 27629350
 when cd_InscricaoImovel = '004007020' then 27629351
 when cd_InscricaoImovel = '004013006' then 27629352
 when cd_InscricaoImovel = '004003007' then 27629363
 when cd_InscricaoImovel = '004002015' then 27629369
 when cd_InscricaoImovel = '004013010' then 27629371
 when cd_InscricaoImovel = '004007028' then 27629373
 when cd_InscricaoImovel = '004012006' then 27629349
 when cd_InscricaoImovel = '004012004' then 27629353
 when cd_InscricaoImovel = '001003016' then 27629354
 when cd_InscricaoImovel = '001025005' then 27629355
 when cd_InscricaoImovel = '004002009' then 27629356
 when cd_InscricaoImovel = '004004002' then 27629357
 when cd_InscricaoImovel = '004012002' then 27629358
 when cd_InscricaoImovel = '004006012' then 27629359
 when cd_InscricaoImovel = '004006008' then 27629361
 when cd_InscricaoImovel = '004011008' then 27629362
 when cd_InscricaoImovel = '002004011' then 27629364
 when cd_InscricaoImovel = '003001006' then 27629365
 when cd_InscricaoImovel = '004004017' then 27629366
 when cd_InscricaoImovel = '004004018' then 27629367
 when cd_InscricaoImovel = '004011006' then 27629368
 when cd_InscricaoImovel = '004007014' then 27629370
 when cd_InscricaoImovel = '004013009' then 27629372
 when cd_InscricaoImovel = '002015005' then 27629382
 when cd_InscricaoImovel = '001002006' then 27629383
 when cd_InscricaoImovel = '003004009' then 27629386
 when cd_InscricaoImovel = '004011012' then 27629388
 when cd_InscricaoImovel = '002015007' then 27629389
 when cd_InscricaoImovel = '003004008' then 27629391
 when cd_InscricaoImovel = '01B009004' then 27629394
 when cd_InscricaoImovel = '1137' then 27629395
 when cd_InscricaoImovel = '004002001C' then 27629398
 when cd_InscricaoImovel = '004006004' then 27629399
 when cd_InscricaoImovel = '004004012' then 27629402
 when cd_InscricaoImovel = '004014001' then 27629374
 when cd_InscricaoImovel = '004012007' then 27629375
 when cd_InscricaoImovel = '004010005' then 27629381
 when cd_InscricaoImovel = '004011007' then 27629384
 when cd_InscricaoImovel = '001014012' then 27629385
 when cd_InscricaoImovel = '002015008' then 27629390
 when cd_InscricaoImovel = '1138' then 27629396
 when cd_InscricaoImovel = '0040060007' then 27629397
 when cd_InscricaoImovel = '001004003' then 27629376
 when cd_InscricaoImovel = '004007012' then 27629377
 when cd_InscricaoImovel = '004011001' then 27629378
 when cd_InscricaoImovel = '004010004' then 27629379
 when cd_InscricaoImovel = '004010001' then 27629380
 when cd_InscricaoImovel = '003011011' then 27629387
 when cd_InscricaoImovel = '001007017' then 27629392
 when cd_InscricaoImovel = '010011004' then 27629393
 when cd_InscricaoImovel = '004012012' then 27629401
 when cd_InscricaoImovel = '08B003002' then 27629405
 when cd_InscricaoImovel = '001022001' then 27629406
 when cd_InscricaoImovel = '001004004' then 28930494
 when cd_InscricaoImovel = '004010008' then 27629400
 when cd_InscricaoImovel = '002002007' then 27629407
 when cd_InscricaoImovel = '004008008' then 27629403
 when cd_InscricaoImovel = '002006004' then 27629404
 when cd_InscricaoImovel = '002016004' then 27629408
 when cd_InscricaoImovel = '270007004' then 28930495
 when cd_InscricaoImovel = '0010090004' then 27628049
 when cd_InscricaoImovel = '0010090006' then 27628051
 when cd_InscricaoImovel = '0010090007' then 27628052
 when cd_InscricaoImovel = '0010090003' then 27628048
 when cd_InscricaoImovel = '0010090005' then 27628050
 when cd_InscricaoImovel = '0010090010' then 28930356
 when cd_InscricaoImovel = '0010090008' then 27628053
 when cd_InscricaoImovel = '0010090015' then 27628059
 when cd_InscricaoImovel = '0010090020' then 27628065
 when cd_InscricaoImovel = '0010100008' then 27628073
 when cd_InscricaoImovel = '0010100009' then 27628074
 when cd_InscricaoImovel = '0010100010' then 27628075
 when cd_InscricaoImovel = '0010100012' then 27628077
 when cd_InscricaoImovel = '0010100014' then 28930357
 when cd_InscricaoImovel = '0010100015' then 27628080
 when cd_InscricaoImovel = '0010090014' then 28930336
 when cd_InscricaoImovel = '0010090012' then 27628057
 when cd_InscricaoImovel = '0010090017' then 27628062
 when cd_InscricaoImovel = '0010100002' then 27628067
 when cd_InscricaoImovel = '0010090002' then 27628047
 when cd_InscricaoImovel = '0010090011' then 27628056
 when cd_InscricaoImovel = '0010090009' then 27628054
 when cd_InscricaoImovel = '0010090016' then 27628060
 when cd_InscricaoImovel = '0010090013' then 27628058
 when cd_InscricaoImovel = '001009016A' then 27628061
 when cd_InscricaoImovel = '0010090018' then 27628063
 when cd_InscricaoImovel = '0010090001' then 27628064
 when cd_InscricaoImovel = '0010100001' then 27628066
 when cd_InscricaoImovel = '0010100006' then 27628071
 when cd_InscricaoImovel = '0010100007' then 27628072
 when cd_InscricaoImovel = '0010100003' then 27628068
 when cd_InscricaoImovel = '0010100004' then 27628069
 when cd_InscricaoImovel = '0010100005' then 27628070
 when cd_InscricaoImovel = '0010100011' then 27628076
 when cd_InscricaoImovel = '0010100013' then 27628078
 when cd_InscricaoImovel = '0010100016' then 27628081
 when cd_InscricaoImovel = '0010100020' then 27628085
 when cd_InscricaoImovel = '0010100027' then 27628092
 when cd_InscricaoImovel = '0010110002' then 27628094
 when cd_InscricaoImovel = '0010110003' then 27628095
 when cd_InscricaoImovel = '0010110013' then 27628105
 when cd_InscricaoImovel = '0010110022' then 27628113
 when cd_InscricaoImovel = '0010110025' then 27628116
 when cd_InscricaoImovel = '0010130001' then 27628119
 when cd_InscricaoImovel = '0010130003' then 27628121
 when cd_InscricaoImovel = '0010130005' then 27628123
 when cd_InscricaoImovel = '0010100017' then 27628082
 when cd_InscricaoImovel = '0010100018' then 27628083
 when cd_InscricaoImovel = '0010100019' then 28930337
 when cd_InscricaoImovel = '0010100021' then 27628086
 when cd_InscricaoImovel = '0010100024' then 27628089
 when cd_InscricaoImovel = '0010100025' then 27628090
 when cd_InscricaoImovel = '0010100026' then 27628091
 when cd_InscricaoImovel = '0010110005' then 27628097
 when cd_InscricaoImovel = '0010100022' then 27628087
 when cd_InscricaoImovel = '0010100023' then 28930376
 when cd_InscricaoImovel = '0010110001' then 27628093
 when cd_InscricaoImovel = '0010110004' then 27628096
 when cd_InscricaoImovel = '0010110007' then 27628099
 when cd_InscricaoImovel = '0010110008' then 27628100
 when cd_InscricaoImovel = '0010110014' then 27628106
 when cd_InscricaoImovel = '0010110015' then 27628107
 when cd_InscricaoImovel = '0010110017' then 27628316
 when cd_InscricaoImovel = '0010110018' then 27628109
 when cd_InscricaoImovel = '0010110019' then 27628110
 when cd_InscricaoImovel = '0010110020' then 27628111
 when cd_InscricaoImovel = '0010110021' then 27628112
 when cd_InscricaoImovel = '0010110023' then 27628114
 when cd_InscricaoImovel = '0010110024' then 27628115
 when cd_InscricaoImovel = '0010110026' then 27628117
 when cd_InscricaoImovel = '0010110027' then 27628118
 when cd_InscricaoImovel = '0010130008' then 27628125
 when cd_InscricaoImovel = '0010110006' then 27628098
 when cd_InscricaoImovel = '0010110009' then 27628101
 when cd_InscricaoImovel = '0010110010' then 27628102
 when cd_InscricaoImovel = '0010110011' then 27628103
 when cd_InscricaoImovel = '0010110012' then 27628104
 when cd_InscricaoImovel = '0010110016' then 27628108
 when cd_InscricaoImovel = '0010130002' then 27628120
 when cd_InscricaoImovel = '0010130004' then 27628122
 when cd_InscricaoImovel = '0010130010' then 27628126
 when cd_InscricaoImovel = '0010130012' then 27628128
 when cd_InscricaoImovel = '0010130015' then 27628131
 when cd_InscricaoImovel = '0010130018' then 27628134
 when cd_InscricaoImovel = '0010130019' then 27628135
 when cd_InscricaoImovel = '0010130007' then 27628124
 when cd_InscricaoImovel = '0010130017' then 27628133
 when cd_InscricaoImovel = '0010130024' then 27628140
 when cd_InscricaoImovel = '0010130025' then 27628141
 when cd_InscricaoImovel = '0010130026' then 27628142
 when cd_InscricaoImovel = '0010140001' then 27628143
 when cd_InscricaoImovel = '0010140004' then 27628318
 when cd_InscricaoImovel = '0010140012' then 27628326
 when cd_InscricaoImovel = '0010140014' then 27628328
 when cd_InscricaoImovel = '0010140017' then 27628331
 when cd_InscricaoImovel = '0010140019' then 27628332
 when cd_InscricaoImovel = '0010140020' then 28930358
 when cd_InscricaoImovel = '0010140021' then 27628334
 when cd_InscricaoImovel = '0010140022' then 27628335
 when cd_InscricaoImovel = '0010130011' then 27628127
 when cd_InscricaoImovel = '0010130013' then 28930377
 when cd_InscricaoImovel = '0010130014' then 27628130
 when cd_InscricaoImovel = '0010130016' then 27628132
 when cd_InscricaoImovel = '0010130020' then 27628136
 when cd_InscricaoImovel = '0010130023' then 27628139
 when cd_InscricaoImovel = '0010140002' then 27628144
 when cd_InscricaoImovel = '0010140003' then 27628317
 when cd_InscricaoImovel = '0010140007' then 27628321
 when cd_InscricaoImovel = '0010140008' then 27628322
 when cd_InscricaoImovel = '0010140009' then 27628323
 when cd_InscricaoImovel = '0010140010' then 27628324
 when cd_InscricaoImovel = '0010140016' then 27628330
 when cd_InscricaoImovel = '0010150002' then 28930378
 when cd_InscricaoImovel = '0010150010' then 28930379
 when cd_InscricaoImovel = '001015010B' then 27628366
 when cd_InscricaoImovel = '0010150012' then 27628368
 when cd_InscricaoImovel = '0010130021' then 27628137
 when cd_InscricaoImovel = '0010130022' then 27628138
 when cd_InscricaoImovel = '0010140005' then 27628319
 when cd_InscricaoImovel = '0010140006' then 27628320
 when cd_InscricaoImovel = '0010140011' then 27628325
 when cd_InscricaoImovel = '0010140013' then 27628327
 when cd_InscricaoImovel = '0010140015' then 27628329
 when cd_InscricaoImovel = '0010150003' then 27628358
 when cd_InscricaoImovel = '0010150005' then 27628360
 when cd_InscricaoImovel = '0010150011' then 27628367
 when cd_InscricaoImovel = '0010150017' then 27628373
 when cd_InscricaoImovel = '0010150001' then 27628356
 when cd_InscricaoImovel = '0010150004' then 27628359
 when cd_InscricaoImovel = '0010150006' then 27628361
 when cd_InscricaoImovel = '0010150007' then 27628362
 when cd_InscricaoImovel = '0010150008' then 27628363
 when cd_InscricaoImovel = '0010150009' then 27628364
 when cd_InscricaoImovel = '0010150014' then 27628370
 when cd_InscricaoImovel = '0010150016' then 27628372
 when cd_InscricaoImovel = '0010150020' then 27628376
 when cd_InscricaoImovel = '0010150022' then 28930359
 when cd_InscricaoImovel = '0010160005' then 27628385
 when cd_InscricaoImovel = '0010160019' then 27628689
 when cd_InscricaoImovel = '0010160021' then 27628691
 when cd_InscricaoImovel = '0010150013' then 27628369
 when cd_InscricaoImovel = '0010150015' then 27628371
 when cd_InscricaoImovel = '0010150021' then 27628377
 when cd_InscricaoImovel = '0010150023' then 27628379
 when cd_InscricaoImovel = '0010150024' then 28930380
 when cd_InscricaoImovel = '0010160001' then 28930381
 when cd_InscricaoImovel = '0010160003' then 27628383
 when cd_InscricaoImovel = '0010160004' then 27628384
 when cd_InscricaoImovel = '0010160006' then 27628676
 when cd_InscricaoImovel = '0010160007' then 27628677
 when cd_InscricaoImovel = '0010160009' then 27628679
 when cd_InscricaoImovel = '0010160010' then 27628680
 when cd_InscricaoImovel = '0010160012' then 27628682
 when cd_InscricaoImovel = '0010160013' then 27628683
 when cd_InscricaoImovel = '0010150018' then 27628374
 when cd_InscricaoImovel = '0010150019' then 27628375
 when cd_InscricaoImovel = '0010160002' then 27628382
 when cd_InscricaoImovel = '0010160008' then 27628678
 when cd_InscricaoImovel = '0010160011' then 27628681
 when cd_InscricaoImovel = '0010160014' then 27628684
 when cd_InscricaoImovel = '0010160024' then 27628694
 when cd_InscricaoImovel = '0010170003' then 27628717
 when cd_InscricaoImovel = '0010170006' then 27628720
 when cd_InscricaoImovel = '0010170008' then 27628722
 when cd_InscricaoImovel = '0010170015' then 27628729
 when cd_InscricaoImovel = '0010180004' then 27628742
 when cd_InscricaoImovel = '0010180012' then 27628749
 when cd_InscricaoImovel = '0010180015' then 27628752
 when cd_InscricaoImovel = '0010180017' then 27628754
 when cd_InscricaoImovel = '0010160015' then 27628685
 when cd_InscricaoImovel = '0010160016' then 27628686
 when cd_InscricaoImovel = '0010160017' then 27628687
 when cd_InscricaoImovel = '0010160018' then 27628688
 when cd_InscricaoImovel = '0010160020' then 27628690
 when cd_InscricaoImovel = '0010170001' then 27628695
 when cd_InscricaoImovel = '0010170004' then 27628718
 when cd_InscricaoImovel = '0010170005' then 28930382
 when cd_InscricaoImovel = '0010170014' then 27628728
 when cd_InscricaoImovel = '0010160022' then 27628692
 when cd_InscricaoImovel = '0010160023' then 27628693
 when cd_InscricaoImovel = '0010170002' then 27628716
 when cd_InscricaoImovel = '0010170007' then 27628721
 when cd_InscricaoImovel = '0010170009' then 27628723
 when cd_InscricaoImovel = '0010170010' then 27628724
 when cd_InscricaoImovel = '0010170011' then 27628725
 when cd_InscricaoImovel = '0010170012' then 27628726
 when cd_InscricaoImovel = '0010170013' then 27628727
 when cd_InscricaoImovel = '0010170020' then 28930360
 when cd_InscricaoImovel = '0010170021' then 27628735
 when cd_InscricaoImovel = '0010170022' then 27628736
 when cd_InscricaoImovel = '0010170023' then 27628737
 when cd_InscricaoImovel = '0010170024' then 27628738
 when cd_InscricaoImovel = '0010180001' then 28930361
 when cd_InscricaoImovel = '0010170016' then 27628730
 when cd_InscricaoImovel = '0010170017' then 27628731
 when cd_InscricaoImovel = '0010170018' then 27628732
 when cd_InscricaoImovel = '0010170019' then 28930383
 when cd_InscricaoImovel = '0010180002' then 27628740
 when cd_InscricaoImovel = '0010180003' then 28930384
 when cd_InscricaoImovel = '0010180005' then 27628743
 when cd_InscricaoImovel = '0010180013' then 28930385
 when cd_InscricaoImovel = '0010180014' then 28930386
 when cd_InscricaoImovel = '0010180018' then 27628755
 when cd_InscricaoImovel = '0010180019' then 27628756
 when cd_InscricaoImovel = '0010190001' then 27628757
 when cd_InscricaoImovel = '0010190002' then 27628758
 when cd_InscricaoImovel = '0010190008' then 27628764
 when cd_InscricaoImovel = '0010190009' then 27628765
 when cd_InscricaoImovel = '0010190010' then 27628766
 when cd_InscricaoImovel = '0010180007' then 27628744
 when cd_InscricaoImovel = '0010180008' then 27628745
 when cd_InscricaoImovel = '0010180009' then 27628746
 when cd_InscricaoImovel = '0010180010' then 27628747
 when cd_InscricaoImovel = '0010180011' then 27628748
 when cd_InscricaoImovel = '0010180016' then 27628753
 when cd_InscricaoImovel = '0010190003' then 27628759
 when cd_InscricaoImovel = '0010190004' then 27628760
 when cd_InscricaoImovel = '0010190005' then 27628761
 when cd_InscricaoImovel = '0010190006' then 27628762
 when cd_InscricaoImovel = '0010190012' then 27628768
 when cd_InscricaoImovel = '0010200001' then 27628771
 when cd_InscricaoImovel = '0010200002' then 27628772
 when cd_InscricaoImovel = '0010200003' then 27628773
 when cd_InscricaoImovel = '0010200004' then 28930362
 when cd_InscricaoImovel = '0010200005' then 28930363
 when cd_InscricaoImovel = '0010190007' then 27628763
 when cd_InscricaoImovel = '0010190013' then 28930338
 when cd_InscricaoImovel = '0010190014' then 27628770
 when cd_InscricaoImovel = '0010220003' then 27628781
 when cd_InscricaoImovel = '0010220012' then 27628790
 when cd_InscricaoImovel = '0010230005' then 27628795
 when cd_InscricaoImovel = '0010230006' then 27628796
 when cd_InscricaoImovel = '0010230011' then 27628801
 when cd_InscricaoImovel = '0010230013' then 28930339
 when cd_InscricaoImovel = '0010240003' then 27628807
 when cd_InscricaoImovel = '0010240006' then 28930340
 when cd_InscricaoImovel = '0010240008' then 28930341
 when cd_InscricaoImovel = '0010260002' then 28930342
 when cd_InscricaoImovel = '0010260005' then 27628820
 when cd_InscricaoImovel = '0010260008' then 27628822
 when cd_InscricaoImovel = '0010190011' then 27628767
 when cd_InscricaoImovel = '0010210001' then 27628778
 when cd_InscricaoImovel = '0010220005' then 27628783
 when cd_InscricaoImovel = '0010220006' then 27628784
 when cd_InscricaoImovel = '0010220007' then 27628785
 when cd_InscricaoImovel = '0010220008' then 27628786
 when cd_InscricaoImovel = '0010220009' then 27628787
 when cd_InscricaoImovel = '0010220010' then 28930387
 when cd_InscricaoImovel = '0010220011' then 27628789
 when cd_InscricaoImovel = '0010230001' then 27628791
 when cd_InscricaoImovel = '0010230002' then 28930388
 when cd_InscricaoImovel = '0010230003' then 27628793
 when cd_InscricaoImovel = '0010230004' then 28930389
 when cd_InscricaoImovel = '0010230008' then 27628798
 when cd_InscricaoImovel = '0010240001' then 27628805
 when cd_InscricaoImovel = '0010240002' then 28930390
 when cd_InscricaoImovel = '0010240007' then 27628811
 when cd_InscricaoImovel = '0010240009' then 27628813
 when cd_InscricaoImovel = '0010260004' then 27628819
 when cd_InscricaoImovel = '0010200006' then 27628776
 when cd_InscricaoImovel = '0010200007' then 27628777
 when cd_InscricaoImovel = '0010220001' then 28930364
 when cd_InscricaoImovel = '0010220002' then 27628780
 when cd_InscricaoImovel = '0010220004' then 27628782
 when cd_InscricaoImovel = '0010230007' then 27628797
 when cd_InscricaoImovel = '0010230009' then 27628799
 when cd_InscricaoImovel = '0010230010' then 28930365
 when cd_InscricaoImovel = '0010230012' then 27628802
 when cd_InscricaoImovel = '0010230014' then 28930366
 when cd_InscricaoImovel = '0010240004' then 27628808
 when cd_InscricaoImovel = '0010240005' then 27628809
 when cd_InscricaoImovel = '0010240010' then 28930367
 when cd_InscricaoImovel = '0010250001' then 27628815
 when cd_InscricaoImovel = '0010260001' then 27628816
 when cd_InscricaoImovel = '0010260003' then 28930368
 when cd_InscricaoImovel = '0010260007' then 27628821
 when cd_InscricaoImovel = '0010260009' then 27628823
 when cd_InscricaoImovel = '0010260019' then 27628833
 when cd_InscricaoImovel = '0010270007' then 27628842
 when cd_InscricaoImovel = '0010270008' then 27628843
 when cd_InscricaoImovel = '001027009A' then 27628845
 when cd_InscricaoImovel = '0010270011' then 27628847
 when cd_InscricaoImovel = '0010270013' then 27628849
 when cd_InscricaoImovel = '0010270014' then 27628850
 when cd_InscricaoImovel = '0010270015' then 28930369
 when cd_InscricaoImovel = '0010270018' then 27628854
 when cd_InscricaoImovel = '0010270019' then 27628855
 when cd_InscricaoImovel = '0010270021' then 27628857
 when cd_InscricaoImovel = '0010270022' then 27628858
 when cd_InscricaoImovel = '0010270026' then 28930370
 when cd_InscricaoImovel = '0010280001' then 27628863
 when cd_InscricaoImovel = '0010280004' then 28930371
 when cd_InscricaoImovel = '0010280006' then 28930372
 when cd_InscricaoImovel = '0010280009' then 28930373
 when cd_InscricaoImovel = '0010280011' then 28930374
 when cd_InscricaoImovel = '0010280012' then 28930375
 when cd_InscricaoImovel = '0010280014' then 28930396
 when cd_InscricaoImovel = '0010260010' then 27628824
 when cd_InscricaoImovel = '0010260012' then 28930343
 when cd_InscricaoImovel = '0010260013' then 27628827
 when cd_InscricaoImovel = '0010260016' then 27628830
 when cd_InscricaoImovel = '0010260018' then 27628832
 when cd_InscricaoImovel = '0010270002' then 27628836
 when cd_InscricaoImovel = '001027002A' then 27628837
 when cd_InscricaoImovel = '0010270003' then 27628838
 when cd_InscricaoImovel = '0010270016' then 27628852
 when cd_InscricaoImovel = '0010270020' then 27628856
 when cd_InscricaoImovel = '0010270023' then 27628859
 when cd_InscricaoImovel = '0010270024' then 27628860
 when cd_InscricaoImovel = '0010270025' then 27628861
 when cd_InscricaoImovel = '0010280002' then 28930345
 when cd_InscricaoImovel = '0010280005' then 28930346
 when cd_InscricaoImovel = '0010280007' then 28930347
 when cd_InscricaoImovel = '0010280008' then 28930348
 when cd_InscricaoImovel = '0010280010' then 27628872
 when cd_InscricaoImovel = '0010260011' then 27628825
 when cd_InscricaoImovel = '0010260014' then 27628828
 when cd_InscricaoImovel = '0010260015' then 27628829
 when cd_InscricaoImovel = '0010260017' then 27628831
 when cd_InscricaoImovel = '001026001A' then 28930391
 when cd_InscricaoImovel = '0010270001' then 27628835
 when cd_InscricaoImovel = '0010270004' then 27628839
 when cd_InscricaoImovel = '0010270005' then 28930392
 when cd_InscricaoImovel = '0010270006' then 27628841
 when cd_InscricaoImovel = '0010270009' then 28930393
 when cd_InscricaoImovel = '0010270010' then 28930394
 when cd_InscricaoImovel = '0010270012' then 27628848
 when cd_InscricaoImovel = '0010270017' then 27628853
 when cd_InscricaoImovel = '0010280003' then 28930395
 when cd_InscricaoImovel = '0020010001' then 28930416
 when cd_InscricaoImovel = '0020010002' then 28930417
 when cd_InscricaoImovel = '0020010003' then 28930418
 when cd_InscricaoImovel = '0020010004' then 28930419
 when cd_InscricaoImovel = '0010280013' then 27628875
 when cd_InscricaoImovel = '0010280016' then 28930350
 when cd_InscricaoImovel = '0010280017' then 28930351
 when cd_InscricaoImovel = '0010280018' then 28930352
 when cd_InscricaoImovel = '0020020006' then 27628902
 when cd_InscricaoImovel = '0020020012' then 27628908
 when cd_InscricaoImovel = '0020020016' then 28930355
 when cd_InscricaoImovel = '0020030001' then 28930436
 when cd_InscricaoImovel = '0020030002' then 28930437
 when cd_InscricaoImovel = '0010280015' then 28930397
 when cd_InscricaoImovel = '0010280019' then 28930398
 when cd_InscricaoImovel = '0020010006' then 28930399
 when cd_InscricaoImovel = '0020010008' then 28930400
 when cd_InscricaoImovel = '0020090009' then 28930401
 when cd_InscricaoImovel = '0020010010' then 28930402
 when cd_InscricaoImovel = '0020010011' then 27628892
 when cd_InscricaoImovel = '0020010012' then 28930403
 when cd_InscricaoImovel = '0020010013' then 28930404
 when cd_InscricaoImovel = '0020010014' then 27628895
 when cd_InscricaoImovel = '0020010015' then 28930405
 when cd_InscricaoImovel = '0020020001' then 28930406
 when cd_InscricaoImovel = '0020020002' then 27628898
 when cd_InscricaoImovel = '0020020003' then 27628899
 when cd_InscricaoImovel = '0020010005' then 28930420
 when cd_InscricaoImovel = '0020010007' then 28930421
 when cd_InscricaoImovel = '0020020010' then 28930422
 when cd_InscricaoImovel = '0020020011' then 28930423
 when cd_InscricaoImovel = '0020020014' then 28930424
 when cd_InscricaoImovel = '0020020015' then 28930425
 when cd_InscricaoImovel = '0020030013' then 28930426
 when cd_InscricaoImovel = '0020030014' then 28930427
 when cd_InscricaoImovel = '0020030017' then 27628929
 when cd_InscricaoImovel = '0020040006' then 28930428
 when cd_InscricaoImovel = '0020040008' then 28930429
 when cd_InscricaoImovel = '0020040015' then 27628945
 when cd_InscricaoImovel = '0020060002' then 28930430
 when cd_InscricaoImovel = '0020060003' then 28930431
 when cd_InscricaoImovel = '0020060004' then 28930432
 when cd_InscricaoImovel = '0020060005' then 28930433
 when cd_InscricaoImovel = '0020060010' then 28930434
 when cd_InscricaoImovel = '0020060013' then 28930435
 when cd_InscricaoImovel = '0020070002' then 28930476
 when cd_InscricaoImovel = '0020070008' then 28930477
 when cd_InscricaoImovel = '0020070012' then 27628974
 when cd_InscricaoImovel = '0020020004' then 27628900
 when cd_InscricaoImovel = '0020020005' then 28930407
 when cd_InscricaoImovel = '0020020007' then 28930408
 when cd_InscricaoImovel = '0020020008' then 28930409
 when cd_InscricaoImovel = '0020020009' then 28930410
 when cd_InscricaoImovel = '0020020013' then 28930411
 when cd_InscricaoImovel = '0020030003' then 28930412
 when cd_InscricaoImovel = '0020030005' then 27628917
 when cd_InscricaoImovel = '0020030004' then 27628916
 when cd_InscricaoImovel = '0020030006' then 28930413
 when cd_InscricaoImovel = '0020030007' then 28930414
 when cd_InscricaoImovel = '0020030008' then 28930415
 when cd_InscricaoImovel = '0020030009' then 28930456
 when cd_InscricaoImovel = '0020030010' then 28930457
 when cd_InscricaoImovel = '0020030011' then 27628923
 when cd_InscricaoImovel = '0020030018' then 28930458
 when cd_InscricaoImovel = '0020040001' then 27628931
 when cd_InscricaoImovel = '0020040004' then 28930459
 when cd_InscricaoImovel = '0020040005' then 28930460
 when cd_InscricaoImovel = '0020040007' then 27628937
 when cd_InscricaoImovel = '0020040009' then 28930461
 when cd_InscricaoImovel = '0020040010' then 28930462
 when cd_InscricaoImovel = '0020040011' then 28930463
 when cd_InscricaoImovel = '0020030012' then 28930439
 when cd_InscricaoImovel = '0020030015' then 28930440
 when cd_InscricaoImovel = '0020030016' then 28930441
 when cd_InscricaoImovel = '0020040002' then 28930442
 when cd_InscricaoImovel = '0020040003' then 28930443
 when cd_InscricaoImovel = '0020040016' then 28930444
 when cd_InscricaoImovel = '0020040018' then 28930445
 when cd_InscricaoImovel = '0020060011' then 28930446
 when cd_InscricaoImovel = '0020060012' then 27628961
 when cd_InscricaoImovel = '0020070001' then 28930447
 when cd_InscricaoImovel = '0020070004' then 27628966
 when cd_InscricaoImovel = '0020070011' then 28930448
 when cd_InscricaoImovel = '0020080001' then 28930450
 when cd_InscricaoImovel = '0020080003' then 28930451
 when cd_InscricaoImovel = '0020080004' then 28930452
 when cd_InscricaoImovel = '0020080007' then 28930453
 when cd_InscricaoImovel = '0020040012' then 28930464
 when cd_InscricaoImovel = '0020040013' then 28930465
 when cd_InscricaoImovel = '0020040014' then 28930466
 when cd_InscricaoImovel = '0020040017' then 27628947
 when cd_InscricaoImovel = '0020050001' then 28930467
 when cd_InscricaoImovel = '0020060001' then 28930468
 when cd_InscricaoImovel = '0020060006' then 28930469
 when cd_InscricaoImovel = '0020060007' then 28930470
 when cd_InscricaoImovel = '0020060008' then 28930471
 when cd_InscricaoImovel = '0020060009' then 28930472
 when cd_InscricaoImovel = '0020070003' then 28930473
 when cd_InscricaoImovel = '0020070005' then 27628967
 when cd_InscricaoImovel = '0020070006' then 28930474
 when cd_InscricaoImovel = '0020070007' then 27628969
 when cd_InscricaoImovel = '0020070009' then 28930475
 when cd_InscricaoImovel = '0020070010' then 28930496
 when cd_InscricaoImovel = '0020070015' then 28930497
 when cd_InscricaoImovel = '0020080005' then 28930498
 when cd_InscricaoImovel = '0020070013' then 28930478
 when cd_InscricaoImovel = '0020070014' then 28930479
 when cd_InscricaoImovel = '0020070016' then 27628978
 when cd_InscricaoImovel = '0020070017' then 28930480
 when cd_InscricaoImovel = '0020080002' then 28930482
 when cd_InscricaoImovel = '0020080006' then 28930483
 when cd_InscricaoImovel = '0020080008' then 28930499
 when cd_InscricaoImovel = '0020080009' then 27628988
 when cd_InscricaoImovel = '0020080010' then 28930500
 when cd_InscricaoImovel = '0020080012' then 28930517
 when cd_InscricaoImovel = '0020090001' then 28930518
 when cd_InscricaoImovel = '0020100001' then 28930521
 when cd_InscricaoImovel = '0020110005' then 28930523
 when cd_InscricaoImovel = '0020110008' then 28930525
 when cd_InscricaoImovel = '0020110010' then 28930526
 when cd_InscricaoImovel = '0020110011' then 28930527
 when cd_InscricaoImovel = '0020110013' then 28930528
 when cd_InscricaoImovel = '0020110015' then 28930529
 when cd_InscricaoImovel = '0020080011' then 28930501
 when cd_InscricaoImovel = '0020080013' then 28930484
 when cd_InscricaoImovel = '0020080014' then 28930502
 when cd_InscricaoImovel = '0020080015' then 28930485
 when cd_InscricaoImovel = '0020080016' then 28930486
 when cd_InscricaoImovel = '0020090002' then 28930487
 when cd_InscricaoImovel = '0020090003' then 28930503
 when cd_InscricaoImovel = '0020090004' then 28930488
 when cd_InscricaoImovel = '0020090005' then 28930489
 when cd_InscricaoImovel = '0020100002' then 28930504
 when cd_InscricaoImovel = '0020100003' then 28930505
 when cd_InscricaoImovel = '0020100004' then 28930506
 when cd_InscricaoImovel = '0020100006' then 28930507
 when cd_InscricaoImovel = '0020100008' then 27629008
 when cd_InscricaoImovel = '0020100009' then 27629009
 when cd_InscricaoImovel = '0020100010' then 27629010
 when cd_InscricaoImovel = '0020100011' then 28930508
 when cd_InscricaoImovel = '0020100012' then 28930509
 when cd_InscricaoImovel = '0020100014' then 28930510
 when cd_InscricaoImovel = '0020100005' then 28930490
 when cd_InscricaoImovel = '0020100007' then 27629007
 when cd_InscricaoImovel = '0020100013' then 28930491
 when cd_InscricaoImovel = '0020100015' then 28930511
 when cd_InscricaoImovel = '0020110001' then 27629016
 when cd_InscricaoImovel = '0020110002' then 28930512
 when cd_InscricaoImovel = '0020110003' then 28930513
 when cd_InscricaoImovel = '0020110004' then 28930514
 when cd_InscricaoImovel = '0020110007' then 28930515
 when cd_InscricaoImovel = '0020110006' then 28930492
 when cd_InscricaoImovel = '0020110009' then 28930536
 when cd_InscricaoImovel = '0020110012' then 28930537
 when cd_InscricaoImovel = '0020110014' then 28930538
 when cd_InscricaoImovel = '0020110016' then 27629031
 when cd_InscricaoImovel = '0020010019' then 28930530
 when cd_InscricaoImovel = '0020110020' then 28930539
 when cd_InscricaoImovel = '0020110021' then 28930493
 when cd_InscricaoImovel = '0020110022' then 28930532
 when cd_InscricaoImovel = '0020110023' then 28930540
 when cd_InscricaoImovel = '0020120001' then 28930541
 when cd_InscricaoImovel = '0020120002' then 28930542
 when cd_InscricaoImovel = '0020120003' then 28930543
 when cd_InscricaoImovel = '0020120008' then 27629044
 when cd_InscricaoImovel = '0020120011' then 27629047
 when cd_InscricaoImovel = '0020120013' then 27629049
 when cd_InscricaoImovel = '0020120014' then 27629050
 when cd_InscricaoImovel = '0020120015' then 27629051
 when cd_InscricaoImovel = '0020120016' then 27629052
 when cd_InscricaoImovel = '0020120017' then 27629053
 when cd_InscricaoImovel = '0020120004' then 27629040
 when cd_InscricaoImovel = '0020120005' then 27629041
 when cd_InscricaoImovel = '0020120007' then 27629043
 when cd_InscricaoImovel = '0020120009' then 27629045
 when cd_InscricaoImovel = '0020120010' then 27629046
 when cd_InscricaoImovel = '0020120018' then 27629054
 when cd_InscricaoImovel = '0020120022' then 27629058
 when cd_InscricaoImovel = '0020120023' then 27629059
 when cd_InscricaoImovel = '0020130005' then 27629065
 when cd_InscricaoImovel = '0020130011' then 27629071
 when cd_InscricaoImovel = '0020120006' then 27629042
 when cd_InscricaoImovel = '0020120012' then 27629048
 when cd_InscricaoImovel = '0020190019' then 27629055
 when cd_InscricaoImovel = '0020120020' then 27629056
 when cd_InscricaoImovel = '0020120021' then 27629057
 when cd_InscricaoImovel = '0020120024' then 27629060
 when cd_InscricaoImovel = '0020130002' then 27629062
 when cd_InscricaoImovel = '0020130004' then 27629064
 when cd_InscricaoImovel = '0020130006' then 27629066
 when cd_InscricaoImovel = '0020130007' then 27629067
 when cd_InscricaoImovel = '0020130008' then 27629068
 when cd_InscricaoImovel = '0020130010' then 27629070
 when cd_InscricaoImovel = '0020130001' then 27629061
 when cd_InscricaoImovel = '0020130003' then 27629063
 when cd_InscricaoImovel = '0020130009' then 27629069
 when cd_InscricaoImovel = '0020130012' then 27629072
 when cd_InscricaoImovel = '0020140001' then 27629073
 when cd_InscricaoImovel = '0020140003' then 27629075
 when cd_InscricaoImovel = '0020140002' then 27629074
 when cd_InscricaoImovel = '0020140004' then 27629076
 when cd_InscricaoImovel = '0020140005' then 27629077
 when cd_InscricaoImovel = '0020150001' then 27629078
 when cd_InscricaoImovel = '0020150003' then 27629080
 when cd_InscricaoImovel = '0020150004' then 27629081
 when cd_InscricaoImovel = '0020150011' then 27629089
 when cd_InscricaoImovel = '0030010002' then 27629097
 when cd_InscricaoImovel = '0020150002' then 27629079
 when cd_InscricaoImovel = '0020150005' then 27629082
 when cd_InscricaoImovel = '0020150006' then 27629083
 when cd_InscricaoImovel = '0020150007' then 27629084
 when cd_InscricaoImovel = '0020150008' then 27629085
 when cd_InscricaoImovel = '0020150009' then 27629086
 when cd_InscricaoImovel = '00201A0001' then 27629087
 when cd_InscricaoImovel = '0020150010' then 27629088
 when cd_InscricaoImovel = '00201A0002' then 27629091
 when cd_InscricaoImovel = '0020150012' then 27629090
 when cd_InscricaoImovel = '00201A0005' then 27629094
 when cd_InscricaoImovel = '00201A0003' then 27629092
 when cd_InscricaoImovel = '00201A0004' then 27629093
 when cd_InscricaoImovel = '00201A0006' then 27629095
 when cd_InscricaoImovel = '0030020001' then 27629099
 when cd_InscricaoImovel = '0030020002' then 27629100
 when cd_InscricaoImovel = '0030010001' then 27629096
 when cd_InscricaoImovel = '0030010003' then 27629098
 when cd_InscricaoImovel = '0030020003' then 27629101
 when cd_InscricaoImovel = '0030020004' then 27629102
 when cd_InscricaoImovel = '0030020005' then 27629103
 when cd_InscricaoImovel = '0030020006' then 27629104
 when cd_InscricaoImovel = '0030030009' then 27629119
 when cd_InscricaoImovel = '0030020007' then 27629105
 when cd_InscricaoImovel = '0030020008' then 27629106
 when cd_InscricaoImovel = '0030020010' then 27629108
 when cd_InscricaoImovel = '0030020009' then 27629107
 when cd_InscricaoImovel = '0030020011' then 27629109
 when cd_InscricaoImovel = '0030020012' then 27629110
 when cd_InscricaoImovel = '0030030001' then 27629111
 when cd_InscricaoImovel = '0030030002' then 27629112
 when cd_InscricaoImovel = '0030030003' then 27629113
 when cd_InscricaoImovel = '0030030004' then 27629114
 when cd_InscricaoImovel = '0030030005' then 27629115
 when cd_InscricaoImovel = '0030030006' then 27629116
 when cd_InscricaoImovel = '0030030007' then 27629117
 when cd_InscricaoImovel = '0030030008' then 27629118
 when cd_InscricaoImovel = '0030030010' then 27629120
 when cd_InscricaoImovel = '0030030011' then 27629121
 when cd_InscricaoImovel = '0030030012' then 27629122
 when cd_InscricaoImovel = '0030030015' then 27629125
 when cd_InscricaoImovel = '0030030017' then 27629127
 when cd_InscricaoImovel = '0030030018' then 27629128
 when cd_InscricaoImovel = '0030030013' then 27629123
 when cd_InscricaoImovel = '0030030014' then 27629124
 when cd_InscricaoImovel = '0030030016' then 27629126
 when cd_InscricaoImovel = '0030040001' then 27629129
 when cd_InscricaoImovel = '0030040002' then 27629130
 when cd_InscricaoImovel = '0030040003' then 28930544
 when cd_InscricaoImovel = '0030040004' then 27629132

		end AS idImoveis, -- id do imóvel
		ROW_NUMBER() OVER (ORDER BY case
		 when cd_InscricaoImovel = '0030040005' then 27629133
 when cd_InscricaoImovel = '0030040006' then 27629134
 when cd_InscricaoImovel = '0030040007' then 27629135
 when cd_InscricaoImovel = '0030040008' then 27629136
 when cd_InscricaoImovel = '0030040009' then 27629137
 when cd_InscricaoImovel = '0030040010' then 27629138
 when cd_InscricaoImovel = '0030040011' then 27629139
 when cd_InscricaoImovel = '0030040012' then 27629140
 when cd_InscricaoImovel = '0030040013' then 27629141
 when cd_InscricaoImovel = '0030040014' then 27629142
 when cd_InscricaoImovel = '0030040015' then 27629143
 when cd_InscricaoImovel = '0030040016' then 27629144
 when cd_InscricaoImovel = '0030040017' then 27629145
 when cd_InscricaoImovel = '0030050001' then 27629146
 when cd_InscricaoImovel = '0030050002' then 27629147
 when cd_InscricaoImovel = '0030050003' then 27629148
 when cd_InscricaoImovel = '0030050004' then 27629149
 when cd_InscricaoImovel = '0030050005' then 27629150
 when cd_InscricaoImovel = '0030050006' then 27629151
 when cd_InscricaoImovel = '0030050007' then 27629152
 when cd_InscricaoImovel = '0030050008' then 27629153
 when cd_InscricaoImovel = '0030050009' then 27629154
 when cd_InscricaoImovel = '0030050010' then 27629155
 when cd_InscricaoImovel = '0030050011' then 27629156
 when cd_InscricaoImovel = '0030050012' then 27629157
 when cd_InscricaoImovel = '0030050013' then 27629158
 when cd_InscricaoImovel = '0030050014' then 27629159
 when cd_InscricaoImovel = '0030060001' then 27629160
 when cd_InscricaoImovel = '0030060002' then 27629161
 when cd_InscricaoImovel = '0030060003' then 27629162
 when cd_InscricaoImovel = '0030060010' then 27629169
 when cd_InscricaoImovel = '0030060004' then 27629163
 when cd_InscricaoImovel = '0030060005' then 27629164
 when cd_InscricaoImovel = '0030060006' then 27629165
 when cd_InscricaoImovel = '0030060007' then 27629166
 when cd_InscricaoImovel = '0030060008' then 27629167
 when cd_InscricaoImovel = '0030060009' then 27629168
 when cd_InscricaoImovel = '0030060011' then 27629170
 when cd_InscricaoImovel = '0030060012' then 27629171
 when cd_InscricaoImovel = '0030070001' then 27629173
 when cd_InscricaoImovel = '0030060013' then 27629172
 when cd_InscricaoImovel = '003007001A' then 27629174
 when cd_InscricaoImovel = '0030070002' then 27629175
 when cd_InscricaoImovel = '0030070003' then 27629176
 when cd_InscricaoImovel = '0030070004' then 27629177
 when cd_InscricaoImovel = '0030070006' then 27629179
 when cd_InscricaoImovel = '0030070005' then 27629178
 when cd_InscricaoImovel = '0030070007' then 27629180
 when cd_InscricaoImovel = '0030070008' then 27629181
 when cd_InscricaoImovel = '0030070009' then 27629182
 when cd_InscricaoImovel = '0030080001' then 27629183
 when cd_InscricaoImovel = '0030080002' then 27629184
 when cd_InscricaoImovel = '0030080003' then 27629185
 when cd_InscricaoImovel = '0030080004' then 27629186
 when cd_InscricaoImovel = '0030080005' then 27629187
 when cd_InscricaoImovel = '0030080006' then 27629188
 when cd_InscricaoImovel = '0030080007' then 27629189
 when cd_InscricaoImovel = '0030080008' then 27629190
 when cd_InscricaoImovel = '0030080009' then 27629191
 when cd_InscricaoImovel = '0030080010' then 27629192
 when cd_InscricaoImovel = '0030080011' then 27629193
 when cd_InscricaoImovel = '0030080012' then 27629194
 when cd_InscricaoImovel = '0030090001' then 27629195
 when cd_InscricaoImovel = '0030090002' then 27629196
 when cd_InscricaoImovel = '0030090003' then 27629197
 when cd_InscricaoImovel = '0030090004' then 27629198
 when cd_InscricaoImovel = '0030090005' then 27629199
 when cd_InscricaoImovel = '0030090006' then 27629200
 when cd_InscricaoImovel = '0030090007' then 27629201
 when cd_InscricaoImovel = '0030090008' then 27629202
 when cd_InscricaoImovel = '0030090009' then 27629203
 when cd_InscricaoImovel = '0030090010' then 27629204
 when cd_InscricaoImovel = '0030090011' then 27629205
 when cd_InscricaoImovel = '0030090012' then 27629206
 when cd_InscricaoImovel = '0030100001' then 27629207
 when cd_InscricaoImovel = '0030100002' then 27629208
 when cd_InscricaoImovel = '0030100003' then 27629209
 when cd_InscricaoImovel = '0030100004' then 27629210
 when cd_InscricaoImovel = '0030100005' then 27629211
 when cd_InscricaoImovel = '0030100006' then 27629212
 when cd_InscricaoImovel = '0030100007' then 27629213
 when cd_InscricaoImovel = '0030100008' then 27629214
 when cd_InscricaoImovel = '0030100009' then 27629215
 when cd_InscricaoImovel = '0030110001' then 27629216
 when cd_InscricaoImovel = '0030110002' then 27629217
 when cd_InscricaoImovel = '0030120003' then 27629220
 when cd_InscricaoImovel = '0030120001' then 27629218
 when cd_InscricaoImovel = '0030120002' then 27629219
 when cd_InscricaoImovel = '0030120004' then 27629221
 when cd_InscricaoImovel = '0030120005' then 27629222
 when cd_InscricaoImovel = '0030120006' then 27629223
 when cd_InscricaoImovel = '0030130001' then 27629225
 when cd_InscricaoImovel = '0030120007' then 27629224
 when cd_InscricaoImovel = '0010300001' then 27629226
 when cd_InscricaoImovel = '0010300002' then 27629227
 when cd_InscricaoImovel = '00127B0002' then 27629231
 when cd_InscricaoImovel = '0020090007' then 27629246
 when cd_InscricaoImovel = '0010300003' then 27629228
 when cd_InscricaoImovel = '0010300004' then 27629229
 when cd_InscricaoImovel = '00127B0001' then 27629230
 when cd_InscricaoImovel = '00127B0011' then 27629240
 when cd_InscricaoImovel = '00127B0012' then 27629241
 when cd_InscricaoImovel = '00127B0003' then 27629232
 when cd_InscricaoImovel = '00127B0004' then 27629233
 when cd_InscricaoImovel = '00127B0005' then 27629234
 when cd_InscricaoImovel = '00127B0006' then 27629235
 when cd_InscricaoImovel = '00127B0007' then 27629236
 when cd_InscricaoImovel = '00127B0008' then 27629237
 when cd_InscricaoImovel = '00127B0009' then 27629238
 when cd_InscricaoImovel = '00127B0010' then 27629239
 when cd_InscricaoImovel = '00127B0013' then 27629242
 when cd_InscricaoImovel = '00127B0014' then 27629243
 when cd_InscricaoImovel = '0020140007' then 27629244
 when cd_InscricaoImovel = '0020090006' then 27629245
 when cd_InscricaoImovel = '0010220015' then 27629247
 when cd_InscricaoImovel = '002004001A' then 27629248
 when cd_InscricaoImovel = '0020060014' then 27629249
 when cd_InscricaoImovel = '002006002A' then 27629250
 when cd_InscricaoImovel = '0010230015' then 27629251
 when cd_InscricaoImovel = '0010230021' then 27629257
 when cd_InscricaoImovel = '0030060014' then 27629261
 when cd_InscricaoImovel = '001022001A' then 27629263
 when cd_InscricaoImovel = '0020160001' then 27629268
 when cd_InscricaoImovel = '001019008A' then 27629270
 when cd_InscricaoImovel = '001016021A' then 27629271
 when cd_InscricaoImovel = '001013012A' then 27629283
 when cd_InscricaoImovel = '0010230016' then 27629252
 when cd_InscricaoImovel = '0010230017' then 27629253
 when cd_InscricaoImovel = '0010230018' then 27629254
 when cd_InscricaoImovel = '0010220014' then 27629272
 when cd_InscricaoImovel = '0010220017' then 27629274
 when cd_InscricaoImovel = '001023024A' then 27629282
 when cd_InscricaoImovel = '00113A0001' then 27629285
 when cd_InscricaoImovel = '001013026A' then 27629286
 when cd_InscricaoImovel = '0010230019' then 27629255
 when cd_InscricaoImovel = '0010230020' then 27629256
 when cd_InscricaoImovel = '0010230022' then 27629258
 when cd_InscricaoImovel = '0010230023' then 27629259
 when cd_InscricaoImovel = '0010230024' then 27629260
 when cd_InscricaoImovel = '002008012A' then 27629262
 when cd_InscricaoImovel = '001016023A' then 27629264
 when cd_InscricaoImovel = '00201A004A' then 27629265
 when cd_InscricaoImovel = '003001003A' then 27629266
 when cd_InscricaoImovel = '001009001A' then 27629267
 when cd_InscricaoImovel = '0020140006' then 27629269
 when cd_InscricaoImovel = '0010220018' then 27629275
 when cd_InscricaoImovel = '0020060015' then 27629278
 when cd_InscricaoImovel = '0020060016' then 27629279
 when cd_InscricaoImovel = '0030140001' then 27629280
 when cd_InscricaoImovel = '001017001A' then 27629281
 when cd_InscricaoImovel = '001018017A' then 27629290
 when cd_InscricaoImovel = '0749' then 27629291
 when cd_InscricaoImovel = '001016011A' then 27629294
 when cd_InscricaoImovel = '001028009A' then 27629297
 when cd_InscricaoImovel = '002006020' then 27629299
 when cd_InscricaoImovel = '002006021' then 27629301
 when cd_InscricaoImovel = '001028002A' then 27629307
 when cd_InscricaoImovel = '0010220016' then 27629273
 when cd_InscricaoImovel = '0010220019' then 27629276
 when cd_InscricaoImovel = '0010280024' then 27629277
 when cd_InscricaoImovel = '0020060018' then 27629284
 when cd_InscricaoImovel = '001010023A' then 27629296
 when cd_InscricaoImovel = '003012003A' then 27629298
 when cd_InscricaoImovel = '003009004A' then 27629300
 when cd_InscricaoImovel = '003005006B' then 27629302
 when cd_InscricaoImovel = '001022009A' then 27629304
 when cd_InscricaoImovel = '001026005A' then 27629305
 when cd_InscricaoImovel = '00201A004B' then 27629306
 when cd_InscricaoImovel = '002003010A' then 27629311
 when cd_InscricaoImovel = '002006014A' then 27629315
 when cd_InscricaoImovel = '003012007A' then 27629318
 when cd_InscricaoImovel = '003002005A' then 27629322
 when cd_InscricaoImovel = '001022010A' then 27629323
 when cd_InscricaoImovel = '002006004A' then 27629332
 when cd_InscricaoImovel = '002004013A' then 27629333
 when cd_InscricaoImovel = '001028009B' then 27629335
 when cd_InscricaoImovel = '001022017A' then 27629287
 when cd_InscricaoImovel = '001014001A' then 27629288
 when cd_InscricaoImovel = '003005006A' then 27629289
 when cd_InscricaoImovel = '0750' then 27629292
 when cd_InscricaoImovel = '003002009A' then 27629293
 when cd_InscricaoImovel = '001026009' then 27629295
 when cd_InscricaoImovel = '001027021A' then 27629303
 when cd_InscricaoImovel = '002016001A' then 27629309
 when cd_InscricaoImovel = '001018007A' then 27629310
 when cd_InscricaoImovel = '002013001A' then 27629312
 when cd_InscricaoImovel = '002013001B' then 27629313
 when cd_InscricaoImovel = '002002004A' then 27629314
 when cd_InscricaoImovel = '003010002B' then 27629316
 when cd_InscricaoImovel = '002014008' then 27629308
 when cd_InscricaoImovel = '002027016A' then 27629317
 when cd_InscricaoImovel = '001029001' then 27629325
 when cd_InscricaoImovel = '003009009' then 27629327
 when cd_InscricaoImovel = '003002009B' then 27629328
 when cd_InscricaoImovel = '003002009C' then 27629329
 when cd_InscricaoImovel = '002018001' then 27629330
 when cd_InscricaoImovel = '001011017A' then 27629331
 when cd_InscricaoImovel = '001027018A' then 27629319
 when cd_InscricaoImovel = '003001001A' then 27629320
 when cd_InscricaoImovel = '002006014B' then 27629321
 when cd_InscricaoImovel = '001017001B' then 27629324
 when cd_InscricaoImovel = '003026001A' then 27629326
 when cd_InscricaoImovel = '001020007A' then 27629334
 when cd_InscricaoImovel = '00400609' then 27629339
 when cd_InscricaoImovel = '00400905' then 27629340
 when cd_InscricaoImovel = '004007002' then 27629342
 when cd_InscricaoImovel = '004014003' then 27629344
 when cd_InscricaoImovel = '004006010' then 27629360
 when cd_InscricaoImovel = '004008005' then 27629336
 when cd_InscricaoImovel = '00401208' then 27629338
 when cd_InscricaoImovel = '00401005' then 27629337
 when cd_InscricaoImovel = '004004013' then 27629345
 when cd_InscricaoImovel = '004003003' then 27629346
 when cd_InscricaoImovel = '004007005' then 27629348
 when cd_InscricaoImovel = '004011010' then 27629341
 when cd_InscricaoImovel = '004013005' then 27629343
 when cd_InscricaoImovel = '004004014' then 27629347
 when cd_InscricaoImovel = '004013012' then 27629350
 when cd_InscricaoImovel = '004007020' then 27629351
 when cd_InscricaoImovel = '004013006' then 27629352
 when cd_InscricaoImovel = '004003007' then 27629363
 when cd_InscricaoImovel = '004002015' then 27629369
 when cd_InscricaoImovel = '004013010' then 27629371
 when cd_InscricaoImovel = '004007028' then 27629373
 when cd_InscricaoImovel = '004012006' then 27629349
 when cd_InscricaoImovel = '004012004' then 27629353
 when cd_InscricaoImovel = '001003016' then 27629354
 when cd_InscricaoImovel = '001025005' then 27629355
 when cd_InscricaoImovel = '004002009' then 27629356
 when cd_InscricaoImovel = '004004002' then 27629357
 when cd_InscricaoImovel = '004012002' then 27629358
 when cd_InscricaoImovel = '004006012' then 27629359
 when cd_InscricaoImovel = '004006008' then 27629361
 when cd_InscricaoImovel = '004011008' then 27629362
 when cd_InscricaoImovel = '002004011' then 27629364
 when cd_InscricaoImovel = '003001006' then 27629365
 when cd_InscricaoImovel = '004004017' then 27629366
 when cd_InscricaoImovel = '004004018' then 27629367
 when cd_InscricaoImovel = '004011006' then 27629368
 when cd_InscricaoImovel = '004007014' then 27629370
 when cd_InscricaoImovel = '004013009' then 27629372
 when cd_InscricaoImovel = '002015005' then 27629382
 when cd_InscricaoImovel = '001002006' then 27629383
 when cd_InscricaoImovel = '003004009' then 27629386
 when cd_InscricaoImovel = '004011012' then 27629388
 when cd_InscricaoImovel = '002015007' then 27629389
 when cd_InscricaoImovel = '003004008' then 27629391
 when cd_InscricaoImovel = '01B009004' then 27629394
 when cd_InscricaoImovel = '1137' then 27629395
 when cd_InscricaoImovel = '004002001C' then 27629398
 when cd_InscricaoImovel = '004006004' then 27629399
 when cd_InscricaoImovel = '004004012' then 27629402
 when cd_InscricaoImovel = '004014001' then 27629374
 when cd_InscricaoImovel = '004012007' then 27629375
 when cd_InscricaoImovel = '004010005' then 27629381
 when cd_InscricaoImovel = '004011007' then 27629384
 when cd_InscricaoImovel = '001014012' then 27629385
 when cd_InscricaoImovel = '002015008' then 27629390
 when cd_InscricaoImovel = '1138' then 27629396
 when cd_InscricaoImovel = '0040060007' then 27629397
 when cd_InscricaoImovel = '001004003' then 27629376
 when cd_InscricaoImovel = '004007012' then 27629377
 when cd_InscricaoImovel = '004011001' then 27629378
 when cd_InscricaoImovel = '004010004' then 27629379
 when cd_InscricaoImovel = '004010001' then 27629380
 when cd_InscricaoImovel = '003011011' then 27629387
 when cd_InscricaoImovel = '001007017' then 27629392
 when cd_InscricaoImovel = '010011004' then 27629393
 when cd_InscricaoImovel = '004012012' then 27629401
 when cd_InscricaoImovel = '08B003002' then 27629405
 when cd_InscricaoImovel = '001022001' then 27629406
 when cd_InscricaoImovel = '001004004' then 28930494
 when cd_InscricaoImovel = '004010008' then 27629400
 when cd_InscricaoImovel = '002002007' then 27629407
 when cd_InscricaoImovel = '004008008' then 27629403
 when cd_InscricaoImovel = '002006004' then 27629404
 when cd_InscricaoImovel = '002016004' then 27629408
 when cd_InscricaoImovel = '270007004' then 28930495
 when cd_InscricaoImovel = '0010090004' then 27628049
 when cd_InscricaoImovel = '0010090006' then 27628051
 when cd_InscricaoImovel = '0010090007' then 27628052
 when cd_InscricaoImovel = '0010090003' then 27628048
 when cd_InscricaoImovel = '0010090005' then 27628050
 when cd_InscricaoImovel = '0010090010' then 28930356
 when cd_InscricaoImovel = '0010090008' then 27628053
 when cd_InscricaoImovel = '0010090015' then 27628059
 when cd_InscricaoImovel = '0010090020' then 27628065
 when cd_InscricaoImovel = '0010100008' then 27628073
 when cd_InscricaoImovel = '0010100009' then 27628074
 when cd_InscricaoImovel = '0010100010' then 27628075
 when cd_InscricaoImovel = '0010100012' then 27628077
 when cd_InscricaoImovel = '0010100014' then 28930357
 when cd_InscricaoImovel = '0010100015' then 27628080
 when cd_InscricaoImovel = '0010090014' then 28930336
 when cd_InscricaoImovel = '0010090012' then 27628057
 when cd_InscricaoImovel = '0010090017' then 27628062
 when cd_InscricaoImovel = '0010100002' then 27628067
 when cd_InscricaoImovel = '0010090002' then 27628047
 when cd_InscricaoImovel = '0010090011' then 27628056
 when cd_InscricaoImovel = '0010090009' then 27628054
 when cd_InscricaoImovel = '0010090016' then 27628060
 when cd_InscricaoImovel = '0010090013' then 27628058
 when cd_InscricaoImovel = '001009016A' then 27628061
 when cd_InscricaoImovel = '0010090018' then 27628063
 when cd_InscricaoImovel = '0010090001' then 27628064
 when cd_InscricaoImovel = '0010100001' then 27628066
 when cd_InscricaoImovel = '0010100006' then 27628071
 when cd_InscricaoImovel = '0010100007' then 27628072
 when cd_InscricaoImovel = '0010100003' then 27628068
 when cd_InscricaoImovel = '0010100004' then 27628069
 when cd_InscricaoImovel = '0010100005' then 27628070
 when cd_InscricaoImovel = '0010100011' then 27628076
 when cd_InscricaoImovel = '0010100013' then 27628078
 when cd_InscricaoImovel = '0010100016' then 27628081
 when cd_InscricaoImovel = '0010100020' then 27628085
 when cd_InscricaoImovel = '0010100027' then 27628092
 when cd_InscricaoImovel = '0010110002' then 27628094
 when cd_InscricaoImovel = '0010110003' then 27628095
 when cd_InscricaoImovel = '0010110013' then 27628105
 when cd_InscricaoImovel = '0010110022' then 27628113
 when cd_InscricaoImovel = '0010110025' then 27628116
 when cd_InscricaoImovel = '0010130001' then 27628119
 when cd_InscricaoImovel = '0010130003' then 27628121
 when cd_InscricaoImovel = '0010130005' then 27628123
 when cd_InscricaoImovel = '0010100017' then 27628082
 when cd_InscricaoImovel = '0010100018' then 27628083
 when cd_InscricaoImovel = '0010100019' then 28930337
 when cd_InscricaoImovel = '0010100021' then 27628086
 when cd_InscricaoImovel = '0010100024' then 27628089
 when cd_InscricaoImovel = '0010100025' then 27628090
 when cd_InscricaoImovel = '0010100026' then 27628091
 when cd_InscricaoImovel = '0010110005' then 27628097
 when cd_InscricaoImovel = '0010100022' then 27628087
 when cd_InscricaoImovel = '0010100023' then 28930376
 when cd_InscricaoImovel = '0010110001' then 27628093
 when cd_InscricaoImovel = '0010110004' then 27628096
 when cd_InscricaoImovel = '0010110007' then 27628099
 when cd_InscricaoImovel = '0010110008' then 27628100
 when cd_InscricaoImovel = '0010110014' then 27628106
 when cd_InscricaoImovel = '0010110015' then 27628107
 when cd_InscricaoImovel = '0010110017' then 27628316
 when cd_InscricaoImovel = '0010110018' then 27628109
 when cd_InscricaoImovel = '0010110019' then 27628110
 when cd_InscricaoImovel = '0010110020' then 27628111
 when cd_InscricaoImovel = '0010110021' then 27628112
 when cd_InscricaoImovel = '0010110023' then 27628114
 when cd_InscricaoImovel = '0010110024' then 27628115
 when cd_InscricaoImovel = '0010110026' then 27628117
 when cd_InscricaoImovel = '0010110027' then 27628118
 when cd_InscricaoImovel = '0010130008' then 27628125
 when cd_InscricaoImovel = '0010110006' then 27628098
 when cd_InscricaoImovel = '0010110009' then 27628101
 when cd_InscricaoImovel = '0010110010' then 27628102
 when cd_InscricaoImovel = '0010110011' then 27628103
 when cd_InscricaoImovel = '0010110012' then 27628104
 when cd_InscricaoImovel = '0010110016' then 27628108
 when cd_InscricaoImovel = '0010130002' then 27628120
 when cd_InscricaoImovel = '0010130004' then 27628122
 when cd_InscricaoImovel = '0010130010' then 27628126
 when cd_InscricaoImovel = '0010130012' then 27628128
 when cd_InscricaoImovel = '0010130015' then 27628131
 when cd_InscricaoImovel = '0010130018' then 27628134
 when cd_InscricaoImovel = '0010130019' then 27628135
 when cd_InscricaoImovel = '0010130007' then 27628124
 when cd_InscricaoImovel = '0010130017' then 27628133
 when cd_InscricaoImovel = '0010130024' then 27628140
 when cd_InscricaoImovel = '0010130025' then 27628141
 when cd_InscricaoImovel = '0010130026' then 27628142
 when cd_InscricaoImovel = '0010140001' then 27628143
 when cd_InscricaoImovel = '0010140004' then 27628318
 when cd_InscricaoImovel = '0010140012' then 27628326
 when cd_InscricaoImovel = '0010140014' then 27628328
 when cd_InscricaoImovel = '0010140017' then 27628331
 when cd_InscricaoImovel = '0010140019' then 27628332
 when cd_InscricaoImovel = '0010140020' then 28930358
 when cd_InscricaoImovel = '0010140021' then 27628334
 when cd_InscricaoImovel = '0010140022' then 27628335
 when cd_InscricaoImovel = '0010130011' then 27628127
 when cd_InscricaoImovel = '0010130013' then 28930377
 when cd_InscricaoImovel = '0010130014' then 27628130
 when cd_InscricaoImovel = '0010130016' then 27628132
 when cd_InscricaoImovel = '0010130020' then 27628136
 when cd_InscricaoImovel = '0010130023' then 27628139
 when cd_InscricaoImovel = '0010140002' then 27628144
 when cd_InscricaoImovel = '0010140003' then 27628317
 when cd_InscricaoImovel = '0010140007' then 27628321
 when cd_InscricaoImovel = '0010140008' then 27628322
 when cd_InscricaoImovel = '0010140009' then 27628323
 when cd_InscricaoImovel = '0010140010' then 27628324
 when cd_InscricaoImovel = '0010140016' then 27628330
 when cd_InscricaoImovel = '0010150002' then 28930378
 when cd_InscricaoImovel = '0010150010' then 28930379
 when cd_InscricaoImovel = '001015010B' then 27628366
 when cd_InscricaoImovel = '0010150012' then 27628368
 when cd_InscricaoImovel = '0010130021' then 27628137
 when cd_InscricaoImovel = '0010130022' then 27628138
 when cd_InscricaoImovel = '0010140005' then 27628319
 when cd_InscricaoImovel = '0010140006' then 27628320
 when cd_InscricaoImovel = '0010140011' then 27628325
 when cd_InscricaoImovel = '0010140013' then 27628327
 when cd_InscricaoImovel = '0010140015' then 27628329
 when cd_InscricaoImovel = '0010150003' then 27628358
 when cd_InscricaoImovel = '0010150005' then 27628360
 when cd_InscricaoImovel = '0010150011' then 27628367
 when cd_InscricaoImovel = '0010150017' then 27628373
 when cd_InscricaoImovel = '0010150001' then 27628356
 when cd_InscricaoImovel = '0010150004' then 27628359
 when cd_InscricaoImovel = '0010150006' then 27628361
 when cd_InscricaoImovel = '0010150007' then 27628362
 when cd_InscricaoImovel = '0010150008' then 27628363
 when cd_InscricaoImovel = '0010150009' then 27628364
 when cd_InscricaoImovel = '0010150014' then 27628370
 when cd_InscricaoImovel = '0010150016' then 27628372
 when cd_InscricaoImovel = '0010150020' then 27628376
 when cd_InscricaoImovel = '0010150022' then 28930359
 when cd_InscricaoImovel = '0010160005' then 27628385
 when cd_InscricaoImovel = '0010160019' then 27628689
 when cd_InscricaoImovel = '0010160021' then 27628691
 when cd_InscricaoImovel = '0010150013' then 27628369
 when cd_InscricaoImovel = '0010150015' then 27628371
 when cd_InscricaoImovel = '0010150021' then 27628377
 when cd_InscricaoImovel = '0010150023' then 27628379
 when cd_InscricaoImovel = '0010150024' then 28930380
 when cd_InscricaoImovel = '0010160001' then 28930381
 when cd_InscricaoImovel = '0010160003' then 27628383
 when cd_InscricaoImovel = '0010160004' then 27628384
 when cd_InscricaoImovel = '0010160006' then 27628676
 when cd_InscricaoImovel = '0010160007' then 27628677
 when cd_InscricaoImovel = '0010160009' then 27628679
 when cd_InscricaoImovel = '0010160010' then 27628680
 when cd_InscricaoImovel = '0010160012' then 27628682
 when cd_InscricaoImovel = '0010160013' then 27628683
 when cd_InscricaoImovel = '0010150018' then 27628374
 when cd_InscricaoImovel = '0010150019' then 27628375
 when cd_InscricaoImovel = '0010160002' then 27628382
 when cd_InscricaoImovel = '0010160008' then 27628678
 when cd_InscricaoImovel = '0010160011' then 27628681
 when cd_InscricaoImovel = '0010160014' then 27628684
 when cd_InscricaoImovel = '0010160024' then 27628694
 when cd_InscricaoImovel = '0010170003' then 27628717
 when cd_InscricaoImovel = '0010170006' then 27628720
 when cd_InscricaoImovel = '0010170008' then 27628722
 when cd_InscricaoImovel = '0010170015' then 27628729
 when cd_InscricaoImovel = '0010180004' then 27628742
 when cd_InscricaoImovel = '0010180012' then 27628749
 when cd_InscricaoImovel = '0010180015' then 27628752
 when cd_InscricaoImovel = '0010180017' then 27628754
 when cd_InscricaoImovel = '0010160015' then 27628685
 when cd_InscricaoImovel = '0010160016' then 27628686
 when cd_InscricaoImovel = '0010160017' then 27628687
 when cd_InscricaoImovel = '0010160018' then 27628688
 when cd_InscricaoImovel = '0010160020' then 27628690
 when cd_InscricaoImovel = '0010170001' then 27628695
 when cd_InscricaoImovel = '0010170004' then 27628718
 when cd_InscricaoImovel = '0010170005' then 28930382
 when cd_InscricaoImovel = '0010170014' then 27628728
 when cd_InscricaoImovel = '0010160022' then 27628692
 when cd_InscricaoImovel = '0010160023' then 27628693
 when cd_InscricaoImovel = '0010170002' then 27628716
 when cd_InscricaoImovel = '0010170007' then 27628721
 when cd_InscricaoImovel = '0010170009' then 27628723
 when cd_InscricaoImovel = '0010170010' then 27628724
 when cd_InscricaoImovel = '0010170011' then 27628725
 when cd_InscricaoImovel = '0010170012' then 27628726
 when cd_InscricaoImovel = '0010170013' then 27628727
 when cd_InscricaoImovel = '0010170020' then 28930360
 when cd_InscricaoImovel = '0010170021' then 27628735
 when cd_InscricaoImovel = '0010170022' then 27628736
 when cd_InscricaoImovel = '0010170023' then 27628737
 when cd_InscricaoImovel = '0010170024' then 27628738
 when cd_InscricaoImovel = '0010180001' then 28930361
 when cd_InscricaoImovel = '0010170016' then 27628730
 when cd_InscricaoImovel = '0010170017' then 27628731
 when cd_InscricaoImovel = '0010170018' then 27628732
 when cd_InscricaoImovel = '0010170019' then 28930383
 when cd_InscricaoImovel = '0010180002' then 27628740
 when cd_InscricaoImovel = '0010180003' then 28930384
 when cd_InscricaoImovel = '0010180005' then 27628743
 when cd_InscricaoImovel = '0010180013' then 28930385
 when cd_InscricaoImovel = '0010180014' then 28930386
 when cd_InscricaoImovel = '0010180018' then 27628755
 when cd_InscricaoImovel = '0010180019' then 27628756
 when cd_InscricaoImovel = '0010190001' then 27628757
 when cd_InscricaoImovel = '0010190002' then 27628758
 when cd_InscricaoImovel = '0010190008' then 27628764
 when cd_InscricaoImovel = '0010190009' then 27628765
 when cd_InscricaoImovel = '0010190010' then 27628766
 when cd_InscricaoImovel = '0010180007' then 27628744
 when cd_InscricaoImovel = '0010180008' then 27628745
 when cd_InscricaoImovel = '0010180009' then 27628746
 when cd_InscricaoImovel = '0010180010' then 27628747
 when cd_InscricaoImovel = '0010180011' then 27628748
 when cd_InscricaoImovel = '0010180016' then 27628753
 when cd_InscricaoImovel = '0010190003' then 27628759
 when cd_InscricaoImovel = '0010190004' then 27628760
 when cd_InscricaoImovel = '0010190005' then 27628761
 when cd_InscricaoImovel = '0010190006' then 27628762
 when cd_InscricaoImovel = '0010190012' then 27628768
 when cd_InscricaoImovel = '0010200001' then 27628771
 when cd_InscricaoImovel = '0010200002' then 27628772
 when cd_InscricaoImovel = '0010200003' then 27628773
 when cd_InscricaoImovel = '0010200004' then 28930362
 when cd_InscricaoImovel = '0010200005' then 28930363
 when cd_InscricaoImovel = '0010190007' then 27628763
 when cd_InscricaoImovel = '0010190013' then 28930338
 when cd_InscricaoImovel = '0010190014' then 27628770
 when cd_InscricaoImovel = '0010220003' then 27628781
 when cd_InscricaoImovel = '0010220012' then 27628790
 when cd_InscricaoImovel = '0010230005' then 27628795
 when cd_InscricaoImovel = '0010230006' then 27628796
 when cd_InscricaoImovel = '0010230011' then 27628801
 when cd_InscricaoImovel = '0010230013' then 28930339
 when cd_InscricaoImovel = '0010240003' then 27628807
 when cd_InscricaoImovel = '0010240006' then 28930340
 when cd_InscricaoImovel = '0010240008' then 28930341
 when cd_InscricaoImovel = '0010260002' then 28930342
 when cd_InscricaoImovel = '0010260005' then 27628820
 when cd_InscricaoImovel = '0010260008' then 27628822
 when cd_InscricaoImovel = '0010190011' then 27628767
 when cd_InscricaoImovel = '0010210001' then 27628778
 when cd_InscricaoImovel = '0010220005' then 27628783
 when cd_InscricaoImovel = '0010220006' then 27628784
 when cd_InscricaoImovel = '0010220007' then 27628785
 when cd_InscricaoImovel = '0010220008' then 27628786
 when cd_InscricaoImovel = '0010220009' then 27628787
 when cd_InscricaoImovel = '0010220010' then 28930387
 when cd_InscricaoImovel = '0010220011' then 27628789
 when cd_InscricaoImovel = '0010230001' then 27628791
 when cd_InscricaoImovel = '0010230002' then 28930388
 when cd_InscricaoImovel = '0010230003' then 27628793
 when cd_InscricaoImovel = '0010230004' then 28930389
 when cd_InscricaoImovel = '0010230008' then 27628798
 when cd_InscricaoImovel = '0010240001' then 27628805
 when cd_InscricaoImovel = '0010240002' then 28930390
 when cd_InscricaoImovel = '0010240007' then 27628811
 when cd_InscricaoImovel = '0010240009' then 27628813
 when cd_InscricaoImovel = '0010260004' then 27628819
 when cd_InscricaoImovel = '0010200006' then 27628776
 when cd_InscricaoImovel = '0010200007' then 27628777
 when cd_InscricaoImovel = '0010220001' then 28930364
 when cd_InscricaoImovel = '0010220002' then 27628780
 when cd_InscricaoImovel = '0010220004' then 27628782
 when cd_InscricaoImovel = '0010230007' then 27628797
 when cd_InscricaoImovel = '0010230009' then 27628799
 when cd_InscricaoImovel = '0010230010' then 28930365
 when cd_InscricaoImovel = '0010230012' then 27628802
 when cd_InscricaoImovel = '0010230014' then 28930366
 when cd_InscricaoImovel = '0010240004' then 27628808
 when cd_InscricaoImovel = '0010240005' then 27628809
 when cd_InscricaoImovel = '0010240010' then 28930367
 when cd_InscricaoImovel = '0010250001' then 27628815
 when cd_InscricaoImovel = '0010260001' then 27628816
 when cd_InscricaoImovel = '0010260003' then 28930368
 when cd_InscricaoImovel = '0010260007' then 27628821
 when cd_InscricaoImovel = '0010260009' then 27628823
 when cd_InscricaoImovel = '0010260019' then 27628833
 when cd_InscricaoImovel = '0010270007' then 27628842
 when cd_InscricaoImovel = '0010270008' then 27628843
 when cd_InscricaoImovel = '001027009A' then 27628845
 when cd_InscricaoImovel = '0010270011' then 27628847
 when cd_InscricaoImovel = '0010270013' then 27628849
 when cd_InscricaoImovel = '0010270014' then 27628850
 when cd_InscricaoImovel = '0010270015' then 28930369
 when cd_InscricaoImovel = '0010270018' then 27628854
 when cd_InscricaoImovel = '0010270019' then 27628855
 when cd_InscricaoImovel = '0010270021' then 27628857
 when cd_InscricaoImovel = '0010270022' then 27628858
 when cd_InscricaoImovel = '0010270026' then 28930370
 when cd_InscricaoImovel = '0010280001' then 27628863
 when cd_InscricaoImovel = '0010280004' then 28930371
 when cd_InscricaoImovel = '0010280006' then 28930372
 when cd_InscricaoImovel = '0010280009' then 28930373
 when cd_InscricaoImovel = '0010280011' then 28930374
 when cd_InscricaoImovel = '0010280012' then 28930375
 when cd_InscricaoImovel = '0010280014' then 28930396
 when cd_InscricaoImovel = '0010260010' then 27628824
 when cd_InscricaoImovel = '0010260012' then 28930343
 when cd_InscricaoImovel = '0010260013' then 27628827
 when cd_InscricaoImovel = '0010260016' then 27628830
 when cd_InscricaoImovel = '0010260018' then 27628832
 when cd_InscricaoImovel = '0010270002' then 27628836
 when cd_InscricaoImovel = '001027002A' then 27628837
 when cd_InscricaoImovel = '0010270003' then 27628838
 when cd_InscricaoImovel = '0010270016' then 27628852
 when cd_InscricaoImovel = '0010270020' then 27628856
 when cd_InscricaoImovel = '0010270023' then 27628859
 when cd_InscricaoImovel = '0010270024' then 27628860
 when cd_InscricaoImovel = '0010270025' then 27628861
 when cd_InscricaoImovel = '0010280002' then 28930345
 when cd_InscricaoImovel = '0010280005' then 28930346
 when cd_InscricaoImovel = '0010280007' then 28930347
 when cd_InscricaoImovel = '0010280008' then 28930348
 when cd_InscricaoImovel = '0010280010' then 27628872
 when cd_InscricaoImovel = '0010260011' then 27628825
 when cd_InscricaoImovel = '0010260014' then 27628828
 when cd_InscricaoImovel = '0010260015' then 27628829
 when cd_InscricaoImovel = '0010260017' then 27628831
 when cd_InscricaoImovel = '001026001A' then 28930391
 when cd_InscricaoImovel = '0010270001' then 27628835
 when cd_InscricaoImovel = '0010270004' then 27628839
 when cd_InscricaoImovel = '0010270005' then 28930392
 when cd_InscricaoImovel = '0010270006' then 27628841
 when cd_InscricaoImovel = '0010270009' then 28930393
 when cd_InscricaoImovel = '0010270010' then 28930394
 when cd_InscricaoImovel = '0010270012' then 27628848
 when cd_InscricaoImovel = '0010270017' then 27628853
 when cd_InscricaoImovel = '0010280003' then 28930395
 when cd_InscricaoImovel = '0020010001' then 28930416
 when cd_InscricaoImovel = '0020010002' then 28930417
 when cd_InscricaoImovel = '0020010003' then 28930418
 when cd_InscricaoImovel = '0020010004' then 28930419
 when cd_InscricaoImovel = '0010280013' then 27628875
 when cd_InscricaoImovel = '0010280016' then 28930350
 when cd_InscricaoImovel = '0010280017' then 28930351
 when cd_InscricaoImovel = '0010280018' then 28930352
 when cd_InscricaoImovel = '0020020006' then 27628902
 when cd_InscricaoImovel = '0020020012' then 27628908
 when cd_InscricaoImovel = '0020020016' then 28930355
 when cd_InscricaoImovel = '0020030001' then 28930436
 when cd_InscricaoImovel = '0020030002' then 28930437
 when cd_InscricaoImovel = '0010280015' then 28930397
 when cd_InscricaoImovel = '0010280019' then 28930398
 when cd_InscricaoImovel = '0020010006' then 28930399
 when cd_InscricaoImovel = '0020010008' then 28930400
 when cd_InscricaoImovel = '0020090009' then 28930401
 when cd_InscricaoImovel = '0020010010' then 28930402
 when cd_InscricaoImovel = '0020010011' then 27628892
 when cd_InscricaoImovel = '0020010012' then 28930403
 when cd_InscricaoImovel = '0020010013' then 28930404
 when cd_InscricaoImovel = '0020010014' then 27628895
 when cd_InscricaoImovel = '0020010015' then 28930405
 when cd_InscricaoImovel = '0020020001' then 28930406
 when cd_InscricaoImovel = '0020020002' then 27628898
 when cd_InscricaoImovel = '0020020003' then 27628899
 when cd_InscricaoImovel = '0020010005' then 28930420
 when cd_InscricaoImovel = '0020010007' then 28930421
 when cd_InscricaoImovel = '0020020010' then 28930422
 when cd_InscricaoImovel = '0020020011' then 28930423
 when cd_InscricaoImovel = '0020020014' then 28930424
 when cd_InscricaoImovel = '0020020015' then 28930425
 when cd_InscricaoImovel = '0020030013' then 28930426
 when cd_InscricaoImovel = '0020030014' then 28930427
 when cd_InscricaoImovel = '0020030017' then 27628929
 when cd_InscricaoImovel = '0020040006' then 28930428
 when cd_InscricaoImovel = '0020040008' then 28930429
 when cd_InscricaoImovel = '0020040015' then 27628945
 when cd_InscricaoImovel = '0020060002' then 28930430
 when cd_InscricaoImovel = '0020060003' then 28930431
 when cd_InscricaoImovel = '0020060004' then 28930432
 when cd_InscricaoImovel = '0020060005' then 28930433
 when cd_InscricaoImovel = '0020060010' then 28930434
 when cd_InscricaoImovel = '0020060013' then 28930435
 when cd_InscricaoImovel = '0020070002' then 28930476
 when cd_InscricaoImovel = '0020070008' then 28930477
 when cd_InscricaoImovel = '0020070012' then 27628974
 when cd_InscricaoImovel = '0020020004' then 27628900
 when cd_InscricaoImovel = '0020020005' then 28930407
 when cd_InscricaoImovel = '0020020007' then 28930408
 when cd_InscricaoImovel = '0020020008' then 28930409
 when cd_InscricaoImovel = '0020020009' then 28930410
 when cd_InscricaoImovel = '0020020013' then 28930411
 when cd_InscricaoImovel = '0020030003' then 28930412
 when cd_InscricaoImovel = '0020030005' then 27628917
 when cd_InscricaoImovel = '0020030004' then 27628916
 when cd_InscricaoImovel = '0020030006' then 28930413
 when cd_InscricaoImovel = '0020030007' then 28930414
 when cd_InscricaoImovel = '0020030008' then 28930415
 when cd_InscricaoImovel = '0020030009' then 28930456
 when cd_InscricaoImovel = '0020030010' then 28930457
 when cd_InscricaoImovel = '0020030011' then 27628923
 when cd_InscricaoImovel = '0020030018' then 28930458
 when cd_InscricaoImovel = '0020040001' then 27628931
 when cd_InscricaoImovel = '0020040004' then 28930459
 when cd_InscricaoImovel = '0020040005' then 28930460
 when cd_InscricaoImovel = '0020040007' then 27628937
 when cd_InscricaoImovel = '0020040009' then 28930461
 when cd_InscricaoImovel = '0020040010' then 28930462
 when cd_InscricaoImovel = '0020040011' then 28930463
 when cd_InscricaoImovel = '0020030012' then 28930439
 when cd_InscricaoImovel = '0020030015' then 28930440
 when cd_InscricaoImovel = '0020030016' then 28930441
 when cd_InscricaoImovel = '0020040002' then 28930442
 when cd_InscricaoImovel = '0020040003' then 28930443
 when cd_InscricaoImovel = '0020040016' then 28930444
 when cd_InscricaoImovel = '0020040018' then 28930445
 when cd_InscricaoImovel = '0020060011' then 28930446
 when cd_InscricaoImovel = '0020060012' then 27628961
 when cd_InscricaoImovel = '0020070001' then 28930447
 when cd_InscricaoImovel = '0020070004' then 27628966
 when cd_InscricaoImovel = '0020070011' then 28930448
 when cd_InscricaoImovel = '0020080001' then 28930450
 when cd_InscricaoImovel = '0020080003' then 28930451
 when cd_InscricaoImovel = '0020080004' then 28930452
 when cd_InscricaoImovel = '0020080007' then 28930453
 when cd_InscricaoImovel = '0020040012' then 28930464
 when cd_InscricaoImovel = '0020040013' then 28930465
 when cd_InscricaoImovel = '0020040014' then 28930466
 when cd_InscricaoImovel = '0020040017' then 27628947
 when cd_InscricaoImovel = '0020050001' then 28930467
 when cd_InscricaoImovel = '0020060001' then 28930468
 when cd_InscricaoImovel = '0020060006' then 28930469
 when cd_InscricaoImovel = '0020060007' then 28930470
 when cd_InscricaoImovel = '0020060008' then 28930471
 when cd_InscricaoImovel = '0020060009' then 28930472
 when cd_InscricaoImovel = '0020070003' then 28930473
 when cd_InscricaoImovel = '0020070005' then 27628967
 when cd_InscricaoImovel = '0020070006' then 28930474
 when cd_InscricaoImovel = '0020070007' then 27628969
 when cd_InscricaoImovel = '0020070009' then 28930475
 when cd_InscricaoImovel = '0020070010' then 28930496
 when cd_InscricaoImovel = '0020070015' then 28930497
 when cd_InscricaoImovel = '0020080005' then 28930498
 when cd_InscricaoImovel = '0020070013' then 28930478
 when cd_InscricaoImovel = '0020070014' then 28930479
 when cd_InscricaoImovel = '0020070016' then 27628978
 when cd_InscricaoImovel = '0020070017' then 28930480
 when cd_InscricaoImovel = '0020080002' then 28930482
 when cd_InscricaoImovel = '0020080006' then 28930483
 when cd_InscricaoImovel = '0020080008' then 28930499
 when cd_InscricaoImovel = '0020080009' then 27628988
 when cd_InscricaoImovel = '0020080010' then 28930500
 when cd_InscricaoImovel = '0020080012' then 28930517
 when cd_InscricaoImovel = '0020090001' then 28930518
 when cd_InscricaoImovel = '0020100001' then 28930521
 when cd_InscricaoImovel = '0020110005' then 28930523
 when cd_InscricaoImovel = '0020110008' then 28930525
 when cd_InscricaoImovel = '0020110010' then 28930526
 when cd_InscricaoImovel = '0020110011' then 28930527
 when cd_InscricaoImovel = '0020110013' then 28930528
 when cd_InscricaoImovel = '0020110015' then 28930529
 when cd_InscricaoImovel = '0020080011' then 28930501
 when cd_InscricaoImovel = '0020080013' then 28930484
 when cd_InscricaoImovel = '0020080014' then 28930502
 when cd_InscricaoImovel = '0020080015' then 28930485
 when cd_InscricaoImovel = '0020080016' then 28930486
 when cd_InscricaoImovel = '0020090002' then 28930487
 when cd_InscricaoImovel = '0020090003' then 28930503
 when cd_InscricaoImovel = '0020090004' then 28930488
 when cd_InscricaoImovel = '0020090005' then 28930489
 when cd_InscricaoImovel = '0020100002' then 28930504
 when cd_InscricaoImovel = '0020100003' then 28930505
 when cd_InscricaoImovel = '0020100004' then 28930506
 when cd_InscricaoImovel = '0020100006' then 28930507
 when cd_InscricaoImovel = '0020100008' then 27629008
 when cd_InscricaoImovel = '0020100009' then 27629009
 when cd_InscricaoImovel = '0020100010' then 27629010
 when cd_InscricaoImovel = '0020100011' then 28930508
 when cd_InscricaoImovel = '0020100012' then 28930509
 when cd_InscricaoImovel = '0020100014' then 28930510
 when cd_InscricaoImovel = '0020100005' then 28930490
 when cd_InscricaoImovel = '0020100007' then 27629007
 when cd_InscricaoImovel = '0020100013' then 28930491
 when cd_InscricaoImovel = '0020100015' then 28930511
 when cd_InscricaoImovel = '0020110001' then 27629016
 when cd_InscricaoImovel = '0020110002' then 28930512
 when cd_InscricaoImovel = '0020110003' then 28930513
 when cd_InscricaoImovel = '0020110004' then 28930514
 when cd_InscricaoImovel = '0020110007' then 28930515
 when cd_InscricaoImovel = '0020110006' then 28930492
 when cd_InscricaoImovel = '0020110009' then 28930536
 when cd_InscricaoImovel = '0020110012' then 28930537
 when cd_InscricaoImovel = '0020110014' then 28930538
 when cd_InscricaoImovel = '0020110016' then 27629031
 when cd_InscricaoImovel = '0020010019' then 28930530
 when cd_InscricaoImovel = '0020110020' then 28930539
 when cd_InscricaoImovel = '0020110021' then 28930493
 when cd_InscricaoImovel = '0020110022' then 28930532
 when cd_InscricaoImovel = '0020110023' then 28930540
 when cd_InscricaoImovel = '0020120001' then 28930541
 when cd_InscricaoImovel = '0020120002' then 28930542
 when cd_InscricaoImovel = '0020120003' then 28930543
 when cd_InscricaoImovel = '0020120008' then 27629044
 when cd_InscricaoImovel = '0020120011' then 27629047
 when cd_InscricaoImovel = '0020120013' then 27629049
 when cd_InscricaoImovel = '0020120014' then 27629050
 when cd_InscricaoImovel = '0020120015' then 27629051
 when cd_InscricaoImovel = '0020120016' then 27629052
 when cd_InscricaoImovel = '0020120017' then 27629053
 when cd_InscricaoImovel = '0020120004' then 27629040
 when cd_InscricaoImovel = '0020120005' then 27629041
 when cd_InscricaoImovel = '0020120007' then 27629043
 when cd_InscricaoImovel = '0020120009' then 27629045
 when cd_InscricaoImovel = '0020120010' then 27629046
 when cd_InscricaoImovel = '0020120018' then 27629054
 when cd_InscricaoImovel = '0020120022' then 27629058
 when cd_InscricaoImovel = '0020120023' then 27629059
 when cd_InscricaoImovel = '0020130005' then 27629065
 when cd_InscricaoImovel = '0020130011' then 27629071
 when cd_InscricaoImovel = '0020120006' then 27629042
 when cd_InscricaoImovel = '0020120012' then 27629048
 when cd_InscricaoImovel = '0020190019' then 27629055
 when cd_InscricaoImovel = '0020120020' then 27629056
 when cd_InscricaoImovel = '0020120021' then 27629057
 when cd_InscricaoImovel = '0020120024' then 27629060
 when cd_InscricaoImovel = '0020130002' then 27629062
 when cd_InscricaoImovel = '0020130004' then 27629064
 when cd_InscricaoImovel = '0020130006' then 27629066
 when cd_InscricaoImovel = '0020130007' then 27629067
 when cd_InscricaoImovel = '0020130008' then 27629068
 when cd_InscricaoImovel = '0020130010' then 27629070
 when cd_InscricaoImovel = '0020130001' then 27629061
 when cd_InscricaoImovel = '0020130003' then 27629063
 when cd_InscricaoImovel = '0020130009' then 27629069
 when cd_InscricaoImovel = '0020130012' then 27629072
 when cd_InscricaoImovel = '0020140001' then 27629073
 when cd_InscricaoImovel = '0020140003' then 27629075
 when cd_InscricaoImovel = '0020140002' then 27629074
 when cd_InscricaoImovel = '0020140004' then 27629076
 when cd_InscricaoImovel = '0020140005' then 27629077
 when cd_InscricaoImovel = '0020150001' then 27629078
 when cd_InscricaoImovel = '0020150003' then 27629080
 when cd_InscricaoImovel = '0020150004' then 27629081
 when cd_InscricaoImovel = '0020150011' then 27629089
 when cd_InscricaoImovel = '0030010002' then 27629097
 when cd_InscricaoImovel = '0020150002' then 27629079
 when cd_InscricaoImovel = '0020150005' then 27629082
 when cd_InscricaoImovel = '0020150006' then 27629083
 when cd_InscricaoImovel = '0020150007' then 27629084
 when cd_InscricaoImovel = '0020150008' then 27629085
 when cd_InscricaoImovel = '0020150009' then 27629086
 when cd_InscricaoImovel = '00201A0001' then 27629087
 when cd_InscricaoImovel = '0020150010' then 27629088
 when cd_InscricaoImovel = '00201A0002' then 27629091
 when cd_InscricaoImovel = '0020150012' then 27629090
 when cd_InscricaoImovel = '00201A0005' then 27629094
 when cd_InscricaoImovel = '00201A0003' then 27629092
 when cd_InscricaoImovel = '00201A0004' then 27629093
 when cd_InscricaoImovel = '00201A0006' then 27629095
 when cd_InscricaoImovel = '0030020001' then 27629099
 when cd_InscricaoImovel = '0030020002' then 27629100
 when cd_InscricaoImovel = '0030010001' then 27629096
 when cd_InscricaoImovel = '0030010003' then 27629098
 when cd_InscricaoImovel = '0030020003' then 27629101
 when cd_InscricaoImovel = '0030020004' then 27629102
 when cd_InscricaoImovel = '0030020005' then 27629103
 when cd_InscricaoImovel = '0030020006' then 27629104
 when cd_InscricaoImovel = '0030030009' then 27629119
 when cd_InscricaoImovel = '0030020007' then 27629105
 when cd_InscricaoImovel = '0030020008' then 27629106
 when cd_InscricaoImovel = '0030020010' then 27629108
 when cd_InscricaoImovel = '0030020009' then 27629107
 when cd_InscricaoImovel = '0030020011' then 27629109
 when cd_InscricaoImovel = '0030020012' then 27629110
 when cd_InscricaoImovel = '0030030001' then 27629111
 when cd_InscricaoImovel = '0030030002' then 27629112
 when cd_InscricaoImovel = '0030030003' then 27629113
 when cd_InscricaoImovel = '0030030004' then 27629114
 when cd_InscricaoImovel = '0030030005' then 27629115
 when cd_InscricaoImovel = '0030030006' then 27629116
 when cd_InscricaoImovel = '0030030007' then 27629117
 when cd_InscricaoImovel = '0030030008' then 27629118
 when cd_InscricaoImovel = '0030030010' then 27629120
 when cd_InscricaoImovel = '0030030011' then 27629121
 when cd_InscricaoImovel = '0030030012' then 27629122
 when cd_InscricaoImovel = '0030030015' then 27629125
 when cd_InscricaoImovel = '0030030017' then 27629127
 when cd_InscricaoImovel = '0030030018' then 27629128
 when cd_InscricaoImovel = '0030030013' then 27629123
 when cd_InscricaoImovel = '0030030014' then 27629124
 when cd_InscricaoImovel = '0030030016' then 27629126
 when cd_InscricaoImovel = '0030040001' then 27629129
 when cd_InscricaoImovel = '0030040002' then 27629130
 when cd_InscricaoImovel = '0030040003' then 28930544
 when cd_InscricaoImovel = '0030040004' then 27629132

		end) AS idIntegracao,
        CASE 
            when BC.cd_Caracteristica =  1 and BC.cd_ItCaracteristica = 1 then 1261350
						when BC.cd_Caracteristica =  1 and BC.cd_ItCaracteristica = 2 then 1261351
						when BC.cd_Caracteristica =  1 and BC.cd_ItCaracteristica = 3 then 1261352
						when BC.cd_Caracteristica =  1 and BC.cd_ItCaracteristica = 4 then 1261353
						when BC.cd_Caracteristica =  1 and BC.cd_ItCaracteristica = 5 then 1261354
						when BC.cd_Caracteristica =  1 and BC.cd_ItCaracteristica = 6 then 1261355
						when BC.cd_Caracteristica =  2 and BC.cd_ItCaracteristica = 1 then 1261370
						when BC.cd_Caracteristica =  2 and BC.cd_ItCaracteristica = 2 then 1261371
						when BC.cd_Caracteristica =  2 and BC.cd_ItCaracteristica = 3 then 1261372
						when BC.cd_Caracteristica =  3 and BC.cd_ItCaracteristica = 1 then 1261390
						when BC.cd_Caracteristica =  3 and BC.cd_ItCaracteristica = 2 then 1261391
						when BC.cd_Caracteristica =  3 and BC.cd_ItCaracteristica = 3 then 1261392
						when BC.cd_Caracteristica =  3 and BC.cd_ItCaracteristica = 4 then 1261393
						when BC.cd_Caracteristica =  3 and BC.cd_ItCaracteristica = 5 then 1261394
						when BC.cd_Caracteristica =  3 and BC.cd_ItCaracteristica = 6 then 1261395
						when BC.cd_Caracteristica =  4 and BC.cd_ItCaracteristica = 1 then 1261410
						when BC.cd_Caracteristica =  4 and BC.cd_ItCaracteristica = 2 then 1261411
						when BC.cd_Caracteristica =  5 and BC.cd_ItCaracteristica = 1 then 1261430
						when BC.cd_Caracteristica =  5 and BC.cd_ItCaracteristica = 2 then 1261431
						when BC.cd_Caracteristica =  6 and BC.cd_ItCaracteristica = 1 then 1261450
						when BC.cd_Caracteristica =  6 and BC.cd_ItCaracteristica = 2 then 1261451
						when BC.cd_Caracteristica =  6 and BC.cd_ItCaracteristica = 3 then 1261452
						when BC.cd_Caracteristica =  7 and BC.cd_ItCaracteristica = 1 then 1261470
						when BC.cd_Caracteristica =  7 and BC.cd_ItCaracteristica = 2 then 1261471
						when BC.cd_Caracteristica =  8 and BC.cd_ItCaracteristica = 1 then 1261490
						when BC.cd_Caracteristica =  8 and BC.cd_ItCaracteristica = 2 then 1261491
						when BC.cd_Caracteristica =  8 and BC.cd_ItCaracteristica = 3 then 1261492
						when BC.cd_Caracteristica =  8 and BC.cd_ItCaracteristica = 4 then 1261493
						when BC.cd_Caracteristica =  8 and BC.cd_ItCaracteristica = 5 then 1261494
						when BC.cd_Caracteristica =  9 and BC.cd_ItCaracteristica = 1 then 1261510
						when BC.cd_Caracteristica =  9 and BC.cd_ItCaracteristica = 2 then 1261511
						when BC.cd_Caracteristica =  9 and BC.cd_ItCaracteristica = 3 then 1261512
						when BC.cd_Caracteristica =  9 and BC.cd_ItCaracteristica = 4 then 1261513
						when BC.cd_Caracteristica = 10 and BC.cd_ItCaracteristica = 1 then 1261530
						when BC.cd_Caracteristica = 10 and BC.cd_ItCaracteristica = 2 then 1261531
						when BC.cd_Caracteristica = 10 and BC.cd_ItCaracteristica = 3 then 1261532
						when BC.cd_Caracteristica = 10 and BC.cd_ItCaracteristica = 4 then 1261533
						when BC.cd_Caracteristica = 11 and BC.cd_ItCaracteristica = 1 then 1261550
						when BC.cd_Caracteristica = 11 and BC.cd_ItCaracteristica = 2 then 1261551
						when BC.cd_Caracteristica = 11 and BC.cd_ItCaracteristica = 3 then 1261552
						when BC.cd_Caracteristica = 11 and BC.cd_ItCaracteristica = 4 then 1261553
						when BC.cd_Caracteristica = 11 and BC.cd_ItCaracteristica = 5 then 1261554
						when BC.cd_Caracteristica = 11 and BC.cd_ItCaracteristica = 6 then 1261555
						when BC.cd_Caracteristica = 11 and BC.cd_ItCaracteristica = 7 then 1261556
						when BC.cd_Caracteristica = 11 and BC.cd_ItCaracteristica = 8 then 1261557
						when BC.cd_Caracteristica = 12 and BC.cd_ItCaracteristica = 1 then 1261570
						when BC.cd_Caracteristica = 12 and BC.cd_ItCaracteristica = 2 then 1261571
						when BC.cd_Caracteristica = 13 and BC.cd_ItCaracteristica = 1 then 1261590
						when BC.cd_Caracteristica = 13 and BC.cd_ItCaracteristica = 2 then 1261591
						when BC.cd_Caracteristica = 13 and BC.cd_ItCaracteristica = 3 then 1261592
						when BC.cd_Caracteristica = 14 and BC.cd_ItCaracteristica = 1 then 1261610
						when BC.cd_Caracteristica = 14 and BC.cd_ItCaracteristica = 2 then 1261611
						when BC.cd_Caracteristica = 15 and BC.cd_ItCaracteristica = 1 then 1261630
						when BC.cd_Caracteristica = 15 and BC.cd_ItCaracteristica = 2 then 1261631
						when BC.cd_Caracteristica = 15 and BC.cd_ItCaracteristica = 3 then 1261632
						when BC.cd_Caracteristica = 15 and BC.cd_ItCaracteristica = 4 then 1261633
						when BC.cd_Caracteristica = 16 and BC.cd_ItCaracteristica = 1 then 1261650
						when BC.cd_Caracteristica = 16 and BC.cd_ItCaracteristica = 2 then 1261651
						when BC.cd_Caracteristica = 16 and BC.cd_ItCaracteristica = 3 then 1261652
						when BC.cd_Caracteristica = 16 and BC.cd_ItCaracteristica = 4 then 1261653
						when BC.cd_Caracteristica = 16 and BC.cd_ItCaracteristica = 5 then 1261654
						when BC.cd_Caracteristica = 17 and BC.cd_ItCaracteristica = 1 then 1261670
						when BC.cd_Caracteristica = 17 and BC.cd_ItCaracteristica = 2 then 1261671
						when BC.cd_Caracteristica = 17 and BC.cd_ItCaracteristica = 3 then 1261672
						when BC.cd_Caracteristica = 17 and BC.cd_ItCaracteristica = 4 then 1261673
						when BC.cd_Caracteristica = 17 and BC.cd_ItCaracteristica = 5 then 1261674
						when BC.cd_Caracteristica = 18 and BC.cd_ItCaracteristica = 1 then 1261656
						when BC.cd_Caracteristica = 18 and BC.cd_ItCaracteristica = 2 then 1261657
						when BC.cd_Caracteristica = 18 and BC.cd_ItCaracteristica = 3 then 1261658
						when BC.cd_Caracteristica = 18 and BC.cd_ItCaracteristica = 4 then 1261659
						when BC.cd_Caracteristica = 18 and BC.cd_ItCaracteristica = 5 then 1261660
						when BC.cd_Caracteristica = 19 and BC.cd_ItCaracteristica = 1 then 1261690
						when BC.cd_Caracteristica = 19 and BC.cd_ItCaracteristica = 2 then 1261691
						when BC.cd_Caracteristica = 19 and BC.cd_ItCaracteristica = 3 then 1261692
						when BC.cd_Caracteristica = 19 and BC.cd_ItCaracteristica = 4 then 1261693
						when BC.cd_Caracteristica = 19 and BC.cd_ItCaracteristica = 5 then 1261694
						when BC.cd_Caracteristica = 20 and BC.cd_ItCaracteristica = 1 then 1261710
						when BC.cd_Caracteristica = 20 and BC.cd_ItCaracteristica = 2 then 1261711
						when BC.cd_Caracteristica = 20 and BC.cd_ItCaracteristica = 3 then 1261712
						when BC.cd_Caracteristica = 20 and BC.cd_ItCaracteristica = 4 then 1261713
						when BC.cd_Caracteristica = 20 and BC.cd_ItCaracteristica = 5 then 1261714
						when BC.cd_Caracteristica = 21 and BC.cd_ItCaracteristica = 1 then 1261730
						when BC.cd_Caracteristica = 21 and BC.cd_ItCaracteristica = 2 then 1261731
						when BC.cd_Caracteristica = 21 and BC.cd_ItCaracteristica = 3 then 1261732
						when BC.cd_Caracteristica = 22 and BC.cd_ItCaracteristica = 1 then 1261750
						when BC.cd_Caracteristica = 22 and BC.cd_ItCaracteristica = 2 then 1261751
						when BC.cd_Caracteristica = 22 and BC.cd_ItCaracteristica = 3 then 1261752
						when BC.cd_Caracteristica = 22 and BC.cd_ItCaracteristica = 4 then 1261753
						when BC.cd_Caracteristica = 22 and BC.cd_ItCaracteristica = 5 then 1261754
						when BC.cd_Caracteristica = 22 and BC.cd_ItCaracteristica = 6 then 1261755
						when BC.cd_Caracteristica = 22 and BC.cd_ItCaracteristica = 7 then 1261756
						when BC.cd_Caracteristica = 23 and BC.cd_ItCaracteristica = 1 then 1261770
						when BC.cd_Caracteristica = 23 and BC.cd_ItCaracteristica = 2 then 1261771
						when BC.cd_Caracteristica = 23 and BC.cd_ItCaracteristica = 3 then 1261772
						when BC.cd_Caracteristica = 23 and BC.cd_ItCaracteristica = 4 then 1261772
        END AS idCamposAdicionaisFilho,
        ROW_NUMBER() OVER (PARTITION BY IM.cd_Imovel ORDER BY BC.cd_Caracteristica) AS rn
    FROM
        IPTUImoveis IM
    JOIN
        IPTUBicCaractImoveis BC ON IM.cd_Imovel = BC.cd_Imovel
    JOIN
        UltimosBic UB ON BC.cd_Imovel = UB.cd_Imovel AND BC.nr_Bic = UB.UltimoBic
)


SELECT

    ROW_NUMBER() OVER (ORDER BY idImoveis) AS idIntegracao,
    JSON_QUERY((SELECT  
						case 
						    when idIntegracao =  18093 then 3146972703
    when idIntegracao =  18094 then 3146972689
    when idIntegracao =  18095 then 3146972725
    when idIntegracao =  18096 then 3146972806
    when idIntegracao =  18097 then 3146972813
    when idIntegracao =  18098 then 3146972807
    when idIntegracao =  18099 then 3146972726
    when idIntegracao =  18100 then 3146972767
    when idIntegracao =  18101 then 3146972651
    when idIntegracao =  18102 then 3146972745
    when idIntegracao =  18103 then 3146972814
    when idIntegracao =  18104 then 3146972779
    when idIntegracao =  18105 then 3146972587
    when idIntegracao =  18106 then 3146972808
    when idIntegracao =  18107 then 3146972727
    when idIntegracao =  18108 then 3146972832
    when idIntegracao =  18109 then 3146972704
    when idIntegracao =  18110 then 3146972549
    when idIntegracao =  18111 then 3146972768
    when idIntegracao =  18112 then 3146972668
    when idIntegracao =  18113 then 3146972833
    when idIntegracao =  18114 then 3146972809
    when idIntegracao =  18115 then 3146972669
    when idIntegracao =  18116 then 3146972769
    when idIntegracao =  18117 then 3146972780
    when idIntegracao =  18118 then 3146972834
    when idIntegracao =  18119 then 3146972781
    when idIntegracao =  18120 then 3146972810
    when idIntegracao =  18121 then 3146972728
    when idIntegracao =  18122 then 3146972835
    when idIntegracao =  18123 then 3146972770
    when idIntegracao =  18124 then 3146972690
    when idIntegracao =  18125 then 3146972811
    when idIntegracao =  18126 then 3146972670
    when idIntegracao =  18127 then 3146972705
    when idIntegracao =  18128 then 3146972671
    when idIntegracao =  18129 then 3146972550
    when idIntegracao =  18130 then 3146972771
    when idIntegracao =  18131 then 3146972836
    when idIntegracao =  18132 then 3146972551
    when idIntegracao =  18133 then 3146972837
    when idIntegracao =  18134 then 3146972746
    when idIntegracao =  18135 then 3146972852
    when idIntegracao =  18136 then 3146972872
    when idIntegracao =  18137 then 3146972838
    when idIntegracao =  18138 then 3146972853
    when idIntegracao =  18139 then 3146972747
    when idIntegracao =  18140 then 3146972691
    when idIntegracao =  18141 then 3146972892
    when idIntegracao =  18142 then 3146972839
    when idIntegracao =  18143 then 3146972729
    when idIntegracao =  18144 then 3146972912
    when idIntegracao =  18145 then 3146972893
    when idIntegracao =  18146 then 3146972815
    when idIntegracao =  18147 then 3146972873
    when idIntegracao =  18148 then 3146972816
    when idIntegracao =  18149 then 3146972874
    when idIntegracao =  18150 then 3146972840
    when idIntegracao =  18151 then 3146972875
    when idIntegracao =  18152 then 3146972913
    when idIntegracao =  18153 then 3146972817
    when idIntegracao =  18154 then 3146972588
    when idIntegracao =  18155 then 3146972894
    when idIntegracao =  18156 then 3146972841
    when idIntegracao =  18157 then 3146972730
    when idIntegracao =  18158 then 3146972932
    when idIntegracao =  18159 then 3146972914
    when idIntegracao =  18160 then 3146972854
    when idIntegracao =  18161 then 3146972895
    when idIntegracao =  18162 then 3146972842
    when idIntegracao =  18163 then 3146972589
    when idIntegracao =  18164 then 3146972933
    when idIntegracao =  18165 then 3146972896
    when idIntegracao =  18166 then 3146972855
    when idIntegracao =  18167 then 3146972856
    when idIntegracao =  18168 then 3146972818
    when idIntegracao =  18169 then 3146972857
    when idIntegracao =  18170 then 3146972843
    when idIntegracao =  18171 then 3146972915
    when idIntegracao =  18172 then 3146972819
    when idIntegracao =  18173 then 3146972916
    when idIntegracao =  18174 then 3146972706
    when idIntegracao =  18175 then 3146972897
    when idIntegracao =  18176 then 3146972707
    when idIntegracao =  18177 then 3146972917
    when idIntegracao =  18178 then 3146972858
    when idIntegracao =  18179 then 3146972918
    when idIntegracao =  18180 then 3146972859
    when idIntegracao =  18181 then 3146972934
    when idIntegracao =  18182 then 3146972935
    when idIntegracao =  18183 then 3146972782
    when idIntegracao =  18184 then 3146972936
    when idIntegracao =  18185 then 3146972820
    when idIntegracao =  18186 then 3146972844
    when idIntegracao =  18187 then 3146972937
    when idIntegracao =  18188 then 3146972821
    when idIntegracao =  18189 then 3146972860
    when idIntegracao =  18190 then 3146972845
    when idIntegracao =  18191 then 3146972876
    when idIntegracao =  18192 then 3146972919
    when idIntegracao =  18193 then 3146972898
    when idIntegracao =  18194 then 3146972748
    when idIntegracao =  18195 then 3146972708
    when idIntegracao =  18196 then 3146972899
    when idIntegracao =  18197 then 3146972783
    when idIntegracao =  18198 then 3146972920
    when idIntegracao =  18199 then 3146972784
    when idIntegracao =  18200 then 3146972590
    when idIntegracao =  18201 then 3146972785
    when idIntegracao =  18202 then 3146972786
    when idIntegracao =  18203 then 3146972846
    when idIntegracao =  18204 then 3146972847
    when idIntegracao =  18205 then 3146972900
    when idIntegracao =  18206 then 3146972749
    when idIntegracao =  18207 then 3146972787
    when idIntegracao =  18208 then 3146972861
    when idIntegracao =  18209 then 3146972822
    when idIntegracao =  18210 then 3146972862
    when idIntegracao =  18211 then 3146972901
    when idIntegracao =  18212 then 3146972709
    when idIntegracao =  18213 then 3146972921
    when idIntegracao =  18214 then 3146972938
    when idIntegracao =  18215 then 3146972877
    when idIntegracao =  18216 then 3146972939
    when idIntegracao =  18217 then 3146972823
    when idIntegracao =  18218 then 3146972878
    when idIntegracao =  18219 then 3146972788
    when idIntegracao =  18220 then 3146972863
    when idIntegracao =  18221 then 3146972864
    when idIntegracao =  18222 then 3146972865
    when idIntegracao =  18223 then 3146972824
    when idIntegracao =  18224 then 3146972940
    when idIntegracao =  18225 then 3146972866
    when idIntegracao =  18226 then 3146972879
    when idIntegracao =  18227 then 3146972750
    when idIntegracao =  18228 then 3146972867
    when idIntegracao =  18229 then 3146972731
    when idIntegracao =  18230 then 3146972868
    when idIntegracao =  18231 then 3146972751
    when idIntegracao =  18232 then 3146972789
    when idIntegracao =  18233 then 3146972952
    when idIntegracao =  18234 then 3146972710
    when idIntegracao =  18235 then 3146972880
    when idIntegracao =  18236 then 3146972825
    when idIntegracao =  18237 then 3146972711
    when idIntegracao =  18238 then 3146972922
    when idIntegracao =  18239 then 3146972902
    when idIntegracao =  18240 then 3146972591
    when idIntegracao =  18241 then 3146972869
    when idIntegracao =  18242 then 3146972923
    when idIntegracao =  18243 then 3146972941
    when idIntegracao =  18244 then 3146972870
    when idIntegracao =  18245 then 3146972881
    when idIntegracao =  18246 then 3146972972
    when idIntegracao =  18247 then 3146972942
    when idIntegracao =  18248 then 3146972882
    when idIntegracao =  18249 then 3146972943
    when idIntegracao =  18250 then 3146972871
    when idIntegracao =  18251 then 3146972903
    when idIntegracao =  18252 then 3146972883
    when idIntegracao =  18253 then 3146972953
    when idIntegracao =  18254 then 3146972826
    when idIntegracao =  18255 then 3146972924
    when idIntegracao =  18256 then 3146972992
    when idIntegracao =  18257 then 3146972848
    when idIntegracao =  18258 then 3146972884
    when idIntegracao =  18259 then 3146972827
    when idIntegracao =  18260 then 3146972954
    when idIntegracao =  18261 then 3146972973
    when idIntegracao =  18262 then 3146972790
    when idIntegracao =  18263 then 3146973012
    when idIntegracao =  18264 then 3146972791
    when idIntegracao =  18265 then 3146972849
    when idIntegracao =  18266 then 3146972955
    when idIntegracao =  18267 then 3146972850
    when idIntegracao =  18268 then 3146972885
    when idIntegracao =  18269 then 3146972956
    when idIntegracao =  18270 then 3146972904
    when idIntegracao =  18271 then 3146972944
    when idIntegracao =  18272 then 3146972905
    when idIntegracao =  18273 then 3146973052
    when idIntegracao =  18274 then 3146973072
    when idIntegracao =  18275 then 3146972906
    when idIntegracao =  18276 then 3146973073
    when idIntegracao =  18277 then 3146972957
    when idIntegracao =  18278 then 3146973074
    when idIntegracao =  18279 then 3146972851
    when idIntegracao =  18280 then 3146972886
    when idIntegracao =  18281 then 3146972974
    when idIntegracao =  18282 then 3146972945
    when idIntegracao =  18283 then 3146972907
    when idIntegracao =  18284 then 3146972975
    when idIntegracao =  18285 then 3146972976
    when idIntegracao =  18286 then 3146973092
    when idIntegracao =  18287 then 3146972946
    when idIntegracao =  18288 then 3146972977
    when idIntegracao =  18289 then 3146972887
    when idIntegracao =  18290 then 3146972925
    when idIntegracao =  18291 then 3146972947
    when idIntegracao =  18292 then 3146972828
    when idIntegracao =  18293 then 3146972926
    when idIntegracao =  18294 then 3146972908
    when idIntegracao =  18295 then 3146972993
    when idIntegracao =  18296 then 3146973053
    when idIntegracao =  18297 then 3146972948
    when idIntegracao =  18298 then 3146972958
    when idIntegracao =  18299 then 3146972978
    when idIntegracao =  18300 then 3146973075
    when idIntegracao =  18301 then 3146972927
    when idIntegracao =  18302 then 3146973093
    when idIntegracao =  18303 then 3146972928
    when idIntegracao =  18304 then 3146972909
    when idIntegracao =  18305 then 3146973076
    when idIntegracao =  18306 then 3146972994
    when idIntegracao =  18307 then 3146972910
    when idIntegracao =  18308 then 3146973013
    when idIntegracao =  18309 then 3146972949
    when idIntegracao =  18310 then 3146973054
    when idIntegracao =  18311 then 3146972829
    when idIntegracao =  18312 then 3146972950
    when idIntegracao =  18313 then 3146973094
    when idIntegracao =  18314 then 3146972979
    when idIntegracao =  18315 then 3146972995
    when idIntegracao =  18316 then 3146972830
    when idIntegracao =  18317 then 3146972911
    when idIntegracao =  18318 then 3146972888
    when idIntegracao =  18319 then 3146973095
    when idIntegracao =  18320 then 3146973055
    when idIntegracao =  18321 then 3146972959
    when idIntegracao =  18322 then 3146972889
    when idIntegracao =  18323 then 3146973077
    when idIntegracao =  18324 then 3146972831
    when idIntegracao =  18325 then 3146973078
    when idIntegracao =  18326 then 3146972951
    when idIntegracao =  18327 then 3146973112
    when idIntegracao =  18328 then 3146973079
    when idIntegracao =  18329 then 3146973132
    when idIntegracao =  18330 then 3146973080
    when idIntegracao =  18331 then 3146972980
						end as idImoveisInfComplem,
						idCamposAdicionaisFilho
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS imoveisInfComplemOp
FROM
    RegistrosComNumero
WHERE
    rn <= 23
`;
        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData
        .filter(record => {
            try {
                const imoveisInfComplemOp = JSON.parse(record.imoveisInfComplemOp);
                return imoveisInfComplemOp.idImoveisInfComplem; // Filtra registros que têm idImoveisInfComplem
            } catch (error) {
                console.warn(`Erro ao processar o registro com idIntegracao: ${record.idIntegracao}`, error);
                return false;
            }
        })
        .map(record => {
            const imoveisInfComplemOp = JSON.parse(record.imoveisInfComplemOp);

                return {
                    idIntegracao: record.idIntegracao.toString(),
                    imoveisInfComplemOp: {
                        idCamposAdicionaisFilho: imoveisInfComplemOp.idCamposAdicionaisFilho, // Usando idCamposAdicionaisFilho
                        idImoveisInfComplem: imoveisInfComplemOp.idImoveisInfComplem // Mapeando idImoveisInfComplem
                    }
                };
            });

        // Dividindo os dados em chunks de 50 e salvando em arquivos JSON
        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Relatórios e IDs de retorno da API
        let report = [];
        let reportIds = [];

         for (const record of transformedData) {
            const idIntegracao = record.idIntegracao; // ID dinâmico da integração

            if (idIntegracao) { // Verifica se o ID da integração é válido
                try {
                    // Coloca o registro dentro de um array
                    const requestBody = [record];

                    // Exibir o corpo da requisição antes de enviá-la
                    console.log('Enviando o seguinte corpo para a API:', JSON.stringify(requestBody, null, 2));

                    const response = await fetch(`https://tributos.betha.cloud/service-layer-tributos/api/imoveisInfComplemOp`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806' // Atualize seu token se necessário
                        },
                        body: JSON.stringify(requestBody) // Envia o registro dentro de um array
                    });

                    const responseBody = await response.json();
                    console.log('Corpo da resposta da API:', responseBody); // Log da resposta

                    if (response.ok) {
                        console.log('Dados enviados com sucesso para a API.');
                        report.push({ record, status: 'success', response: responseBody });

                        // Armazenar o ID retornado pela API no reportIds
                        if (responseBody.idLote) { // Acessando idLote em vez de id
                            reportIds.push(responseBody.idLote);
                        }
                    } else {
                        console.error('Erro ao enviar os dados para a API:', response.statusText);
                        console.error('Corpo da resposta de erro:', responseBody);
                        report.push({ record, status: 'failed', response: responseBody });
                    }

                } catch (err) {
                    console.error('Erro ao enviar o registro para a API:', err);
                    report.push({ record, status: 'error', error: err.message });
                }
            } else {
                console.warn('ID de integração inválido. O registro será ignorado.', record);
                report.push({ record, status: 'invalid', error: 'ID de integração inválido.' });
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