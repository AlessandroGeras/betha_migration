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

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "COMP_ALMO"
        const selectDatabaseQuery = 'USE COMP_ALMO';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            	select 
JSON_QUERY((SELECT CASE WHEN cd_almoxa = 20700 THEN 5268
                   END as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS almoxarifado,
JSON_QUERY((SELECT CASE al.nr_docto
when        54        then        11558460
when        147        then        11558461
when        151        then        11558462
when        153        then        11558463
when        154        then        11558464
when        155        then        11558465
when        156        then        11558466
when        195        then        11558467
when        221        then        11558468
when        225        then        11558469
when        226        then        11558470
when        419        then        11558471
when        602        then        11558472
when        603        then        11558473
when        609        then        11558474
when        610        then        11558475
when        632        then        11558476
when        637        then        11558477
when        731        then        11558478
when        733        then        11558479
when        975        then        11558480
when        976        then        11558481
when        978        then        11558482
when        1002        then        11558483
when        1183        then        11558484
when        1186        then        11558485
when        1187        then        11558486
when        1189        then        11558487
when        1192        then        11558488
when        1194        then        11558489
when        1198        then        11558490
when        1869        then        11558491
when        4612        then        11558492
when        4615        then        11558493
when        4827        then        11558494
when        4828        then        11558495

                                                END AS  id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS entrada,
al.dt_movimento as dataEntrada,
'2024' as ano
        from ALMOMovimentacao AL
        join ALMOProdutos pr on AL.cd_produto = pr.cd_produto
        WHERE al.sg_direcao = 'CD' and al.aa_movimento = '2024' and qt_movimento > 0 and al.fl_devolucao is null and cd_almoxa = 20700
        group by cd_almoxa,nr_docto, dt_movimento
        `;

        const result = await masterConnection.query(userQuery);

        const resultData = result.recordset;

        const transformedData = resultData.map(record => {
			console.log(record);
		
			return {
				context: {
					almoxarifado: JSON.parse(record.almoxarifado).id.toString(),
					exercicio: record.ano.toString(), // Corrected from record.anoMovimento to record.ano
				},
				conteudo: {
					id: JSON.parse(record.entrada).id,
					dataEntrada: formatDate(record.dataEntrada),
				}
			};
		});

        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar cada registro individualmente para a rota desejada
        // Armazenar as respostas do servidor
        const serverResponses = [];

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const url = `https://almoxarifado.betha.cloud/estoque-services/api/conversoes/lotes/entradas-finalizacao`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                },
                body: JSON.stringify(record)
            });
     
            const responseBody = await response.json();
            serverResponses.push({
                url: url,
                status: response.status,
                statusText: response.statusText,
                responseBody: responseBody
            });
     
            if (response.ok) {
                console.log(`Dados do registro enviados com sucesso para ${url}.`);
            } else {
                console.error(`Erro ao enviar os dados do registro para ${url}:`, response.statusText);
            }
        } */

        //fs.writeFileSync('log_bens.json', JSON.stringify(serverResponses, null, 2));
        //console.log('Respostas do servidor salvas em log_bens.json');

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
