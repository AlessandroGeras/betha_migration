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
        const selectDatabaseQuery = 'USE TRIBUTOS2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            with CTE_DECLARACAO AS (
SELECT 
cd_Contribuinte,
cd_Declaracao,
 ROW_NUMBER() OVER (ORDER BY cd_Contribuinte) AS idIntegracao,
JSON_QUERY(
    (SELECT
case cd_Contribuinte
when        329        then        15620796
when        299        then        15620793
when        318        then        15620797
when        307        then        15620798
when        308        then        15620799
when        224        then        15620804
when        23        then        15620814
when        13        then        15620815
when        24        then        15620816
when        9        then        15620800
when        257        then        15620817
when        11        then        15620801
when        10        then        15620805
when        25        then        15620806
when        259        then        15620807
when        249        then        15620819
when        316        then        15620820
when        304        then        15620818
when        139        then        15620821
when        244        then        15620808
when        27        then        15620809
when        273        then        15620822
when        19        then        15620823
when        22        then        15620825
when        122        then        15620824
when        333        then        15620826
when        26        then        15620810
when        14        then        15620811
when        272        then        15620827
when        262        then        15620828
when        12        then        15620829
when        16        then        15620830
when        269        then        15620831
when        320        then        15620802
when        95        then        15620813
when        325        then        15620812
when        17        then        15620832
when        52        then        15620833
when        332        then        15620834
when        205        then        15620835
when        191        then        15620836
when        330        then        15620837
when        317        then        15620838
when        199        then        15620839
when        188        then        15620840
when        305        then        15620803
when        182        then        15620841
when        301        then        15620973
when        331        then        15620974
when        298        then        15620975
when        166        then        15620842
when        310        then        15620976
when        286        then        15620977
when        315        then        15620983
when        45        then        15620984
when        203        then        15620985
when        261        then        15620986
when        237        then        15620978
when        319        then        15620979
when        312        then        15620987
when        172        then        15620988
when        223        then        15620989
when        207        then        15620990
when        208        then        15620991
when        47        then        15620992
when        125        then        15620993
when        30        then        15620994
when        198        then        15620995
when        209        then        15620996
when        49        then        15620982
when        85        then        15620997
when        135        then        15620998
when        137        then        15620999
when        32        then        15621000
when        213        then        15621001
when        31        then        15621002
when        29        then        15621003
when        152        then        15621004
when        222        then        15621005
when        190        then        15621006
when        18        then        15621007
when        48        then        15620980
when        335        then        15621008
when        180        then        15620981
when        5        then        15621009
when        6        then        15621014
when        50        then        15621015
when        214        then        15621010
when        276        then        15620794
when        131        then        15621016
when        144        then        15621017
when        7        then        15621018
when        4        then        15621019
when        146        then        15621011
when        1        then        15621020
when        247        then        15621021
when        288        then        15621022
when        179        then        15621023
when        21        then        15621013
when        133        then        15621012
when        8        then        15621024
when        51        then        15621025
when        220        then        15621026
when        15        then        15621027
when        290        then        15621035
when        53        then        15621028
when        3        then        15621034
when        151        then        15621036
when        243        then        15621037
when        54        then        15621030
when        263        then        15621029
when        38        then        15621038
when        148        then        15621039
when        225        then        15621040
when        2        then        15621041
when        282        then        15621042
when        162        then        15621043
when        165        then        15621044
when        174        then        15621045
when        167        then        15621046
when        55        then        15621031
when        241        then        15621032
when        334        then        15621047
when        218        then        15621048
when        242        then        15621033
when        216        then        15621049
when        215        then        15621050
when        43        then        15621051
when        267        then        15621052
when        271        then        15621053
when        158        then        15621054
when        39        then        15621055
when        41        then        15621056
when        42        then        15621057
when        245        then        15621058
when        44        then        15621059
when        277        then        15620795
when        136        then        15621060
when        143        then        15621061
when        46        then        15621062
when        33        then        15621063
when        196        then        15621064
when        248        then        15621065
when        226        then        15621066
when        34        then        15621067
when        37        then        15621068
when        154        then        15621069
when        35        then        15621070
when        281        then        15621071
when        270        then        15621072
when        36        then        15621093
when        155        then        15621094
when        210        then        15621095
when        177        then        15621106
when        68        then        15621107
when        67        then        15621108
when        323        then        15621109
when        187        then        15621097
when        69        then        15621098
when        160        then        15621101
when        150        then        15621102
when        328        then        15621103
when        65        then        15621110
when        64        then        15621111
when        56        then        15621112
when        189        then        15621113
when        236        then        15621114
when        126        then        15621115
when        157        then        15621116
when        195        then        15621117
when        230        then        15621118
when        284        then        15621119
when        66        then        15621121
when        178        then        15621122
when        58        then        15621123
when        59        then        15621124
when        57        then        15621134
when        295        then        15621125
when        129        then        15621126
when        61        then        15621127
when        63        then        15621128
when        127        then        15621129
when        128        then        15621130
when        212        then        15621131
when        171        then        15621120
when        287        then        15621132
when        300        then        15621133
when        278        then        15621135
when        233        then        15621099
when        268        then        15621104
when        327        then        15621100
when        302        then        15621096
when        141        then        15621105
when        62        then        15621136
when        124        then        15621137
when        60        then        15621138
when        28        then        15621139
when        145        then        15621140
when        169        then        15621141
when        78        then        15621142
when        303        then        15621143
when        227        then        15621146
when        202        then        15621147
when        83        then        15621148
when        81        then        15621149
when        256        then        15621144
when        80        then        15621150
when        292        then        15621151
when        159        then        15621152
when        185        then        15621173
when        258        then        15621174
when        164        then        15621175
when        79        then        15621176
when        82        then        15621177
when        260        then        15621145
when        134        then        15621182
when        153        then        15621183
when        87        then        15621184
when        86        then        15621185
when        163        then        15621186
when        197        then        15621187
when        84        then        15621188
when        76        then        15621189
when        138        then        15621180
when        70        then        15621190
when        75        then        15621191
when        170        then        15621192
when        168        then        15621193
when        291        then        15621194
when        74        then        15621195
when        186        then        15621196
when        140        then        15621181
when        73        then        15621197
when        72        then        15621198
when        201        then        15621199
when        77        then        15621200
when        173        then        15621179
when        309        then        15621201
when        275        then        15621202
when        71        then        15621203
when        123        then        15621204
when        254        then        15621178
when        121        then        15621205
when        206        then        15621206
when        89        then        15621207
when        88        then        15621208
when        297        then        15621209
when        217        then        15621210
when        90        then        15621211
when        211        then        15621212
when        232        then        15621213
when        324        then        15621215
when        326        then        15621214
when        92        then        15621216
when        130        then        15621217
when        93        then        15621218
when        91        then        15621219
when        283        then        15621220
when        229        then        15621221
when        94        then        15621222
when        181        then        15621223
when        176        then        15621224
when        314        then        15621225
when        40        then        15621227
when        108        then        15621235
when        96        then        15621228
when        239        then        15621229
when        99        then        15621230
when        98        then        15621231
when        238        then        15621232
when        306        then        15621236
when        183        then        15621237
when        97        then        15621238
when        184        then        15621239
when        285        then        15621240
when        293        then        15621241
when        161        then        15621242
when        322        then        15621243
when        107        then        15621244
when        266        then        15621226
when        234        then        15621233
when        100        then        15621234
when        279        then        15621245
when        101        then        15621252
when        105        then        15621254
when        104        then        15621253
when        132        then        15621255
when        142        then        15621251
when        103        then        15621256
when        246        then        15621247
when        250        then        15621248
when        102        then        15621257
when        20        then        15621258
when        274        then        15621259
when        200        then        15621260
when        313        then        15621261
when        255        then        15621246
when        204        then        15621262
when        175        then        15621293
when        192        then        15621294
when        321        then        15621295
when        221        then        15621249
when        235        then        15621250
when        311        then        15621296
when        106        then        15621298
when        265        then        15621299
when        228        then        15621300
when        194        then        15621301
when        109        then        15621302
when        251        then        15621303
when        294        then        15621304
when        110        then        15621297
when        115        then        15621308
when        120        then        15621309
when        113        then        15621310
when        280        then        15621311
when        116        then        15621312
when        119        then        15621313
when        118        then        15621305
when        296        then        15621314
when        149        then        15621315
when        193        then        15621316
when        117        then        15621317
when        147        then        15621306
when        156        then        15621318
when        253        then        15621307
when        114        then        15621320
when        240        then        15621321
when        111        then        15621322
when        252        then        15621323
when        264        then        15621324
when        112        then        15621319
when        289        then        15621325
when        219        then        15621326
else 1
end as idEconomico,
'ADICIONADO MANUALMENTE VIA SL' as descricao,
'SITUACAO' as tipoMovimentacao,
'INICIO' as situacaoEconomico,
dt_AberturaEmpresa as dtSituacao,
'migracao' as audCriadoPor
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS economicosMovimentacoes,
ROW_NUMBER() OVER (PARTITION BY cd_Cecam, cd_Contribuinte ORDER BY cd_Declaracao) AS nDeclaracao  
from ISSDeclaracoes
)
SELECT idIntegracao,economicosMovimentacoes FROM CTE_DECLARACAO DECLARACAO WHERE DECLARACAO.cd_Declaracao = (SELECT MAX(cd_Declaracao) from ISSDeclaracoes DECEXT WHERE  DECEXT.cd_Contribuinte = DECLARACAO.cd_Contribuinte)


`;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            console.log(record); // Verifique o conteúdo de `record` para debug
        
            // Tente analisar o campo `economicosMovimentacoes`
            let economicosMovimentacoes;
            try {
                economicosMovimentacoes = JSON.parse(record.economicosMovimentacoes);
            } catch (error) {
                console.error('Erro ao analisar economicosMovimentacoes:', error);
                economicosMovimentacoes = {}; // Define como um objeto vazio se houver erro
            }
        
            return {
                idIntegracao: record.idIntegracao ? record.idIntegracao.toString() : "INTEGRACAO1", // Usar idIntegracao ou valor padrão
                economicosMovimentacoes: {
                    audCriadoPor: economicosMovimentacoes.audCriadoPor || null, // Usar o valor do objeto analisado ou null
                    idEconomico: economicosMovimentacoes.idEconomico ? parseInt(economicosMovimentacoes.idEconomico) : null, // Garantir que idEconomico seja numérico
                    descricao: economicosMovimentacoes.descricao || null, // Usar o valor do objeto analisado ou null
                    dtSituacao: economicosMovimentacoes.dtSituacao ? formatDate(economicosMovimentacoes.dtSituacao) : null, // Formatar a data, ou null se não houver
                    tipoMovimentacao: economicosMovimentacoes.tipoMovimentacao || null, // Usar o valor do objeto analisado ou null
                    situacaoEconomico:economicosMovimentacoes.situacaoEconomico || null
                }
            };
        }).filter(record => record.economicosMovimentacoes.idEconomico !== null); // Filtrar registros com idEconomico válido
        
        



        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const response = await fetch('https://tributos.betha.cloud/service-layer-tributos/api/economicosMovimentacoes', {
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
        } */

    } catch (error) {
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        sql.close();
    }
}

main();
