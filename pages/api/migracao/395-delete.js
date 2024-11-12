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

async function logResponse(id, responseText) {
    const logMessage = `ID: ${id}\nResposta: ${responseText}\n\n`;
    fs.appendFileSync('delete_log.txt', logMessage, (err) => {
        if (err) {
            console.error('Erro ao gravar no log:', err);
        }
    });
}

async function main() {
    const idsParaExcluir = [
        127011,
        127061,
        127063,
        127013,
        127065,
        127015,
        127062,
        127012,
        127066,
        127016,
        127017,
        127067,
        127014,
        127064,
        127068,
        127018,
        127026,
        127076,
        127078,
        127028,
        127074,
        127024,
        127075,
        127025,
        127086,
        127036,
        127020,
        127070,
        127035,
        127085,
        127029,
        127079,
        127038,
        127088,
        127077,
        127027,
        127032,
        127082,
        127072,
        127022,
        127080,
        127030,
        127083,
        127033,
        127069,
        127019,
        127044,
        127094,
        127090,
        127040,
        127093,
        127043,
        127092,
        127042,
        127071,
        127021,
        127096,
        127046,
        127023,
        127073,
        127102,
        127052,
        127084,
        127034,
        127081,
        127031,
        127125,
        127089,
        127039,
        127111,
        127047,
        127097,
        127138,
        127137,
        127101,
        127051,
        127041,
        127091,
        127118,
        127114,
        127056,
        127106,
        127050,
        127100,
        127115,
        127128,
        127132,
        127053,
        127103,
        127131,
        127105,
        127055,
        127087,
        127037,
        127098,
        127048,
        127095,
        127045,
        127107,
        127057,
        127117,
        127099,
        127049,
        127141,
        127139,
        127140,
        127149,
        127059,
        127110,
        127060,
        127109,
        127108,
        127058,
        127104,
        127054,
        127142,
        127120,
        127151,
        127147,
        127143,
        127119,
        127122,
        127127,
        127154,
        127124,
        127121,
        127194,
        127153,
        127112,
        127130,
        127205,
        127126,
        127173,
        127210,
        127133,
        127135,
        127129,
        127175,
        127148,
        127134,
        127113,
        127146,
        127179,
        127145,
        127136,
        127213,
        127150,
        127160,
        127234,
        127161,
        127237,
        127158,
        127152,
        127238,
        127183,
        127116,
        127186,
        127193,
        127155,
        127164,
        127157,
        127178,
        127123,
        127203,
        127184,
        127187,
        127166,
        127221,
        127144,
        127227,
        127224,
        127239,
        127159,
        127259,
        127162,
        127188,
        127156,
        127167,
        127230,
        127165,
        127163,
        127190,
        127176,
        127233,
        127235,
        127171,
        127172,
        127189,
        127177,
        127181,
        127260,
        127192,
        127168,
        127256,
        127169,
        127198,
        127170,
        127204,
        127264,
        127262,
        127202,
        127182,
        127174,
        127191,
        127265,
        127211,
        127206,
        127216,
        127180,
        127197,
        127185,
        127214,
        127199,
        127217,
        127195,
        127219,
        127200,
        127196,
        127207,
        127209,
        127222,
        127208,
        127218,
        127201,
        127225,
        127212,
        127231,
        127228,
        127220,
        127215,
        127232,
        127229,
        127245,
        127223,
        127236,
        127240,
        127250,
        127246,
        127251,
        127226,
        127242,
        127243,
        127261,
        127241,
        127252,
        127254,
        127255,
        127244,
        127258,
        127267,
        127247,
        127248,
        127263,
        127257,
        127249,
        127253,
        127266
    ];

    try {
        const masterConnection = await connectToSqlServer();
        await masterConnection.query('USE CONTABIL2024');

        for (const id of idsParaExcluir) {
            const deletePayload = [
                {
                    idIntegracao: id.toString(),
                    idGerado: { id: id },
                    content: { exercicio: 2024 }
                }
            ];

            console.log(JSON.stringify(deletePayload));

            const response = await fetch('https://pla-sl-rest.betha.cloud/planejamento/service-layer/v2/api/grupos-despesas-ppa', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 25a840ae-b57a-4030-903a-bcccf2386f30'
                },
                body: JSON.stringify(deletePayload)
            });

            const responseText = await response.text();

            if (response.ok) {
                console.log(`Registro com ID ${id} excluído com sucesso.`);
            } else {
                console.error(`Erro ao excluir o registro com ID ${id}:`, response.statusText, responseText);
            }

            // Registrar a resposta no log
            await logResponse(id, responseText);
        }

    } catch (error) {
        console.error('Erro durante a execução do programa:', error);
    } finally {
        await sql.close();
    }
}

main();
