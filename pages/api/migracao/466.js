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
when        299        then        101643098
when        276        then        101643075
when        277        then        101643076
when        329        then        101643128
when        318        then        101643117
when        307        then        101643106
when        308        then        101643107
when        9        then        101642565
when        11        then        101642567
when        320        then        101643119
when        305        then        101643104
when        224        then        101643024
when        10        then        101642566
when        25        then        101642821
when        259        then        101643058
when        244        then        101643043
when        27        then        101642823
when        26        then        101642822
when        14        then        101642570
when        325        then        101643124
when        95        then        101642895
when        23        then        101642819
when        13        then        101642569
when        24        then        101642820
when        257        then        101643056
when        304        then        101643103
when        249        then        101643048
when        316        then        101643115
when        139        then        101642939
when        273        then        101643072
when        19        then        101642815
when        122        then        101642922
when        22        then        101642818
when        333        then        101643132
when        272        then        101643071
when        262        then        101643061
when        12        then        101642568
when        16        then        101642812
when        269        then        101643068
when        17        then        101642813
when        52        then        101642852
when        332        then        101643131
when        205        then        101643005
when        191        then        101642991
when        330        then        101643129
when        317        then        101643116
when        199        then        101642999
when        188        then        101642988
when        182        then        101642982
when        166        then        101642966
when        301        then        101643100
when        331        then        101643130
when        298        then        101643097
when        310        then        101643109
when        286        then        101643085
when        237        then        101643036
when        319        then        101643118
when        48        then        101642844
when        180        then        101642980
when        49        then        101642845
when        315        then        101643114
when        45        then        101642841
when        203        then        101643003
when        261        then        101643060
when        312        then        101643111
when        172        then        101642972
when        223        then        101643023
when        207        then        101643007
when        208        then        101643008
when        47        then        101642843
when        125        then        101642925
when        30        then        101642826
when        198        then        101642998
when        209        then        101643009
when        85        then        101642885
when        135        then        101642935
when        137        then        101642937
when        32        then        101642828
when        213        then        101643013
when        31        then        101642827
when        29        then        101642825
when        152        then        101642952
when        222        then        101643022
when        190        then        101642990
when        18        then        101642814
when        335        then        101643134
when        5        then        101642561
when        214        then        101643014
when        146        then        101642946
when        133        then        101642933
when        21        then        101642817
when        6        then        101642562
when        50        then        101642846
when        131        then        101642931
when        144        then        101642944
when        7        then        101642563
when        4        then        101642560
when        1        then        101642557
when        247        then        101643046
when        288        then        101643087
when        179        then        101642979
when        8        then        101642564
when        51        then        101642851
when        220        then        101643020
when        15        then        101642811
when        53        then        101642853
when        263        then        101643062
when        54        then        101642854
when        55        then        101642855
when        241        then        101643040
when        242        then        101643041
when        3        then        101642559
when        290        then        101643089
when        151        then        101642951
when        243        then        101643042
when        38        then        101642834
when        148        then        101642948
when        225        then        101643025
when        2        then        101642558
when        282        then        101643081
when        162        then        101642962
when        165        then        101642965
when        174        then        101642974
when        167        then        101642967
when        334        then        101643133
when        218        then        101643018
when        216        then        101643016
when        215        then        101643015
when        43        then        101642839
when        267        then        101643066
when        271        then        101643070
when        158        then        101642958
when        39        then        101642835
when        41        then        101642837
when        42        then        101642838
when        245        then        101643044
when        44        then        101642840
when        136        then        101642936
when        143        then        101642943
when        46        then        101642842
when        33        then        101642829
when        196        then        101642996
when        248        then        101643047
when        226        then        101643026
when        34        then        101642830
when        37        then        101642833
when        154        then        101642954
when        35        then        101642831
when        281        then        101643080
when        270        then        101643069
when        36        then        101642832
when        155        then        101642955
when        210        then        101643010
when        302        then        101643101
when        187        then        101642987
when        69        then        101642869
when        233        then        101643032
when        327        then        101643126
when        160        then        101642960
when        150        then        101642950
when        328        then        101643127
when        268        then        101643067
when        141        then        101642941
when        177        then        101642977
when        68        then        101642868
when        67        then        101642867
when        323        then        101643122
when        65        then        101642865
when        64        then        101642864
when        56        then        101642856
when        189        then        101642989
when        236        then        101643035
when        126        then        101642926
when        157        then        101642957
when        195        then        101642995
when        230        then        101643030
when        284        then        101643083
when        171        then        101642971
when        66        then        101642866
when        178        then        101642978
when        58        then        101642858
when        59        then        101642859
when        295        then        101643094
when        129        then        101642929
when        61        then        101642861
when        63        then        101642863
when        127        then        101642927
when        128        then        101642928
when        212        then        101643012
when        287        then        101643086
when        300        then        101643099
when        57        then        101642857
when        278        then        101643077
when        62        then        101642862
when        124        then        101642924
when        60        then        101642860
when        28        then        101642824
when        145        then        101642945
when        169        then        101642969
when        78        then        101642878
when        303        then        101643102
when        256        then        101643055
when        260        then        101643059
when        227        then        101643027
when        202        then        101643002
when        83        then        101642883
when        81        then        101642881
when        80        then        101642880
when        292        then        101643091
when        159        then        101642959
when        185        then        101642985
when        258        then        101643057
when        164        then        101642964
when        79        then        101642879
when        82        then        101642882
when        254        then        101643053
when        173        then        101642973
when        138        then        101642938
when        140        then        101642940
when        134        then        101642934
when        153        then        101642953
when        87        then        101642887
when        86        then        101642886
when        163        then        101642963
when        197        then        101642997
when        84        then        101642884
when        76        then        101642876
when        70        then        101642870
when        75        then        101642875
when        170        then        101642970
when        168        then        101642968
when        291        then        101643090
when        74        then        101642874
when        186        then        101642986
when        73        then        101642873
when        72        then        101642872
when        201        then        101643001
when        77        then        101642877
when        309        then        101643108
when        275        then        101643074
when        71        then        101642871
when        123        then        101642923
when        121        then        101642921
when        206        then        101643006
when        89        then        101642889
when        88        then        101642888
when        297        then        101643096
when        217        then        101643017
when        90        then        101642890
when        211        then        101643011
when        232        then        101643031
when        326        then        101643125
when        324        then        101643123
when        92        then        101642892
when        130        then        101642930
when        93        then        101642893
when        91        then        101642891
when        283        then        101643082
when        229        then        101643029
when        94        then        101642894
when        181        then        101642981
when        176        then        101642976
when        314        then        101643113
when        266        then        101643065
when        40        then        101642836
when        96        then        101642896
when        239        then        101643038
when        99        then        101642899
when        98        then        101642898
when        238        then        101643037
when        234        then        101643033
when        100        then        101642900
when        108        then        101642908
when        306        then        101643105
when        183        then        101642983
when        97        then        101642897
when        184        then        101642984
when        285        then        101643084
when        293        then        101643092
when        161        then        101642961
when        322        then        101643121
when        107        then        101642907
when        279        then        101643078
when        255        then        101643054
when        246        then        101643045
when        250        then        101643049
when        221        then        101643021
when        235        then        101643034
when        142        then        101642942
when        101        then        101642901
when        104        then        101642904
when        105        then        101642905
when        132        then        101642932
when        103        then        101642903
when        102        then        101642902
when        20        then        101642816
when        274        then        101643073
when        200        then        101643000
when        313        then        101643112
when        204        then        101643004
when        175        then        101642975
when        192        then        101642992
when        321        then        101643120
when        311        then        101643110
when        110        then        101642910
when        106        then        101642906
when        265        then        101643064
when        228        then        101643028
when        194        then        101642994
when        109        then        101642909
when        251        then        101643050
when        294        then        101643093
when        118        then        101642918
when        147        then        101642947
when        253        then        101643052
when        115        then        101642915
when        120        then        101642920
when        113        then        101642913
when        280        then        101643079
when        116        then        101642916
when        119        then        101642919
when        296        then        101643095
when        149        then        101642949
when        193        then        101642993
when        117        then        101642917
when        156        then        101642956
when        112        then        101642912
when        114        then        101642914
when        240        then        101643039
when        111        then        101642911
when        252        then        101643051
when        264        then        101643063
when        289        then        101643088
when        219        then        101643019
else 1
end as idMovimentacao,
'ADICIONADO MANUALMENTE VIA SL' as descricao,
'ATIVADO' as situacao,
dt_AberturaEmpresa as dhMovimentacao,
'vitor.lamarque' as audCriadoPor
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
        
            // Verifique se economicosMovimentacoes existe e se tem os campos necessários
            if (!economicosMovimentacoes || typeof economicosMovimentacoes !== 'object') {
                console.error('economicosMovimentacoes não é um objeto válido.');
                return null; // Retorna null para registros inválidos
            }
        
            return {
                idIntegracao: record.idIntegracao ? record.idIntegracao.toString() : "INTEGRACAO1", // Usar idIntegracao ou valor padrão
                economicosMovimentacoesHistorico: {
                    idMovimentacao: economicosMovimentacoes.idMovimentacao || null, // Usar o valor do objeto analisado ou null
                    descricao: economicosMovimentacoes.descricao || null, // Usar o valor do objeto analisado ou null
                    situacao: economicosMovimentacoes.situacao || null, // Usar o valor do objeto analisado ou null
                    dhMovimentacao: economicosMovimentacoes.dhMovimentacao || null, // Usar o valor do objeto analisado ou null
                    usuarioMovimentacao: economicosMovimentacoes.audCriadoPor || null // Usar o valor de audCriadoPor
                }
            };
        }).filter(record => record !== null && record.economicosMovimentacoesHistorico.idMovimentacao !== null); // Filtrar registros inválidos e com idMovimentacao válido
        
        



        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const response = await fetch('https://tributos.betha.cloud/service-layer-tributos/api/economicosMovimentacoesHistorico', {
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
