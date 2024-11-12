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
    // Lista de IDs para exclusão
    const idsParaExcluir = [
        16883598,
        16883585,
        16883588,
        16883594,
        16883601,
        16883600,
        16883622,
        16883606,
        16883596,
        16883621,
        16883610,
        16883608,
        16883599,
        16883597,
        16883602,
        16883635,
        16883616,
        16883605,
        16883617,
        16883651,
        16883584,
        16883583,
        16883643,
        16883642,
        16883587,
        16883654,
        16883656,
        16883644,
        16883593,
        16883645,
        16883650,
        16883655,
        16883649,
        16883586,
        16883624,
        16883646,
        16883638,
        16883640,
        16883628,
        16883647,
        16883590,
        16883639,
        16883626,
        16883652,
        16883641,
        16883615,
        16883660,
        16883625,
        16883648,
        16883636,
        16883634,
        16883659,
        16883657,
        16883632,
        16883603,
        16883591,
        16883619,
        16883677,
        16883618,
        16883633,
        16883612,
        16883637,
        16883613,
        16883629,
        16883607,
        16883663,
        16883680,
        16883658,
        16883623,
        16883664,
        16883653,
        16883666,
        16883630,
        16883662,
        16883675,
        16883668,
        16883631,
        16883678,
        16883676,
        16883627,
        16883614,
        16883679,
        16883673,
        16883670,
        16883672,
        16883671,
        16883609,
        16883665,
        16883667,
        16883661,
        16883620,
        16883604,
        16883674,
        16883669,
        16883688,
        16883691,
        16883779,
        16883692,
        16883695,
        16883694,
        16883685,
        16883716,
        16883696,
        16883698,
        16883682,
        16883723,
        16883726,
        16883734,
        16883770,
        16883736,
        16883731,
        16883733,
        16883681,
        16883693,
        16883720,
        16883687,
        16883713,
        16883780,
        16883721,
        16883769,
        16883724,
        16883732,
        16883745,
        16883717,
        16883730,
        16883684,
        16883738,
        16883725,
        16883750,
        16883727,
        16883737,
        16883722,
        16883729,
        16883714,
        16883718,
        16883728,
        16883700,
        16883759,
        16883751,
        16883706,
        16883710,
        16883701,
        16883744,
        16883703,
        16883704,
        16883760,
        16883763,
        16883683,
        16883771,
        16883767,
        16883773,
        16883705,
        16883697,
        16883755,
        16883689,
        16883761,
        16883765,
        16883753,
        16883743,
        16883758,
        16883686,
        16883711,
        16883756,
        16883741,
        16883715,
        16883764,
        16883702,
        16883699,
        16883749,
        16883777,
        16883707,
        16883768,
        16883740,
        16883754,
        16883747,
        16883748,
        16883719,
        16883774,
        16883766,
        16883709,
        16883775,
        16883752,
        16883772,
        16883739,
        16883690,
        16883776,
        16883735,
        16883778,
        16883757,
        16883746,
        16883762,
        16883712,
        16883708,
        16883742,
        16883796,
        16883852,
        16883792,
        16883794,
        16883795,
        16883814,
        16883786,
        16883797,
        16883838,
        16883785,
        16883833,
        16883789,
        16883835,
        16883871,
        16883836,
        16883831,
        16883790,
        16883830,
        16883820,
        16883845,
        16883840,
        16883834,
        16883822,
        16883783,
        16883818,
        16883782,
        16883781,
        16883798,
        16883825,
        16883793,
        16883851,
        16883788,
        16883875,
        16883832,
        16883829,
        16883817,
        16883801,
        16883827,
        16883848,
        16883815,
        16883837,
        16883800,
        16883791,
        16883811,
        16883843,
        16883804,
        16883816,
        16883807,
        16883823,
        16883844,
        16883861,
        16883819,
        16883867,
        16883821,
        16883869,
        16883824,
        16883872,
        16883858,
        16883880,
        16883826,
        16883870,
        16883828,
        16883803,
        16883860,
        16883805,
        16883808,
        16883876,
        16883853,
        16883857,
        16883787,
        16883881,
        16883813,
        16883799,
        16883810,
        16883862,
        16883865,
        16883856,
        16883863,
        16883846,
        16883802,
        16883847,
        16883842,
        16883879,
        16883841,
        16883806,
        16883866,
        16883864,
        16883854,
        16883784,
        16883839,
        16883868,
        16883849,
        16883859,
        16883874,
        16883812,
        16883873,
        16883855,
        16883877,
        16883850,
        16883809,
        16883878,
        16883888,
        16883902,
        16883899,
        16883889,
        16883891,
        16883894,
        16883885,
        16883886,
        16883932,
        16883929,
        16883890,
        16883884,
        16883883,
        16883930,
        16883887,
        16883912,
        16883904,
        16883918,
        16883927,
        16883914,
        16883915,
        16883931,
        16883945,
        16883923,
        16883908,
        16883933,
        16883916,
        16883920,
        16883910,
        16883917,
        16883922,
        16883903,
        16883900,
        16883957,
        16883906,
        16883971,
        16883973,
        16883944,
        16883896,
        16883911,
        16883913,
        16883952,
        16883997,
        16883977,
        16883897,
        16883972,
        16883967,
        16883936,
        16883955,
        16883968,
        16883976,
        16883975,
        16883948,
        16883949,
        16883907,
        16883893,
        16883961,
        16883934,
        16883942,
        16883946,
        16883892,
        16883898,
        16883954,
        16883937,
        16883924,
        16883895,
        16883979,
        16883960,
        16883926,
        16883964,
        16883943,
        16883965,
        16883935,
        16883969,
        16883919,
        16883951,
        16883953,
        16883966,
        16883905,
        16883909,
        16883941,
        16883940,
        16883974,
        16883950,
        16883959,
        16883978,
        16883970,
        16883938,
        16883962,
        16883958,
        16883939,
        16883956,
        16883947,
        16883901,
        16883963,
        16884075,
        16883993,
        16883988,
        16883985,
        16883981,
        16883982,
        16883986,
        16883994,
        16883992,
        16883990,
        16883984,
        16883989,
        16883983,
        16883991,
        16883996,
        16884133,
        16884027,
        16884002,
        16884028,
        16884005,
        16884000,
        16884017,
        16884270,
        16884229,
        16884263,
        16884208,
        16884191,
        16884250,
        16884235,
        16884194,
        16884219,
        16884254,
        16884278,
        16884265,
        16884218,
        16884200,
        16884214,
        16884246,
        16884197,
        16884204,
        16884205,
        16884276,
        16884199,
        16884272,
        16884210,
        16884207,
        16884266,
        16884198,
        16884242,
        16884274,
        16884243,
        16884237,
        16884257,
        16884221,
        16884240,
        16884230,
        16884275,
        16884244,
        16884256,
        16884248,
        16884258,
        16884245,
        16884279,
        16884287,
        16884286,
        16884284,
        16884297,
        16884288,
        16884313,
        16884299,
        16884289,
        16884292,
        16884296,
        16884343,
        16884294,
        16884337,
        16884314,
        16884345,
        16884328,
        16884347,
        16884341,
        16884301,
        16884344,
        16884322,
        16884350,
        16884331,
        16884332,
        16884330,
        16884311,
        16884353,
        16884361,
        16884349,
        16884326,
        16884298,
        16884370,
        16884362,
        16884317,
        16884372,
        16884379,
        16884374,
        16884375,
        16884369,
        16884316,
        16884365,
        16884378,
        16884303,
        16884355,
        16884312,
        16884318,
        16884360,
        16884310,
        16884373,
        16884358,
        16884384,
        16884407,
        16884396,
        16884387,
        16884416,
        16884390,
        16884403,
        16884402,
        16884406,
        16884428,
        16884415,
        16884438,
        16884448,
        16884427,
        16884408,
        16884404,
        16884451,
        16884409,
        16884472,
        16884395,
        16884509,
        16884469,
        16884392,
        16884419,
        16884460,
        16884467,
        16884461,
        16884389,
        16884417,
        16884441,
        16884410,
        16884431,
        16884393,
        16884388,
        16884466,
        16884397,
        16884462,
        16884459,
        16884464,
        16884453,
        16884455,
        16884383,
        16884445,
        16884457,
        16884463,
        16884456,
        16884386,
        16884473,
        16884458,
        16884465,
        16884452,
        16884401,
        16884399,
        16884450,
        16884475,
        16884418,
        16884443,
        16884434,
        16884421,
        16884426,
        16884454,
        16884449,
        16884411,
        16884468,
        16884432,
        16884474,
        16884423,
        16884437,
        16884478,
        16884440,
        16884400,
        16884444,
        16884442,
        16884422,
        16884405,
        16884429,
        16884447,
        16884430,
        16884476,
        16884436,
        16884435,
        16884471,
        16884425,
        16884391,
        16884420,
        16884470,
        16884439,
        16884413,
        16884446,
        16884477,
        16884487,
        16884480,
        16884479,
        16884489,
        16884528,
        16884485,
        16884486,
        16884495,
        16884511,
        16884510,
        16884504,
        16884488,
        16884540,
        16884515,
        16884497,
        16884519,
        16884541,
        16884508,
        16884537,
        16884498,
        16884513,
        16884578,
        16884500,
        16884484,
        16884512,
        16884482,
        16884506,        
    ];

    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        const selectDatabaseQuery = 'USE PATRIMONIO';
        await masterConnection.query(selectDatabaseQuery);

        // Iterar sobre a lista de IDs e enviar uma solicitação de exclusão para cada um
        for (const id of idsParaExcluir) {
            const deletePayload = {
                idIntegracao: id.toString(),
                idGerado: {
                    id: id
                },
                content: {
                    exercicio: 2024
                }
            };

            console.log(JSON.stringify(deletePayload));

            const response = await fetch(`https://patrimonio.betha.cloud/patrimonio-services/api/bens/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 25a840ae-b57a-4030-903a-bcccf2386f30'
                },
                body: JSON.stringify(deletePayload)
            });

            if (response.ok) {
                console.log(`Registro com ID ${id} excluído com sucesso.`);
            } else {
                console.error(`Erro ao excluir o registro com ID ${id}:`, response.statusText);
            }
        }

        // Escrever os registros a serem excluídos no arquivo delete.json
        fs.writeFileSync('delete.json', JSON.stringify(registrosParaExcluir, null, 2), 'utf-8');
        console.log('Registros para exclusão foram salvos em delete.json');

    } catch (error) {
        // Lidar com erros de conexão ou consulta aqui
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        await sql.close();
    }
}

// Chamar a função principal
main();