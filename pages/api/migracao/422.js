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
JSON_QUERY((SELECT CASE WHEN cd_almoxa = 20400 THEN 5738
                   END as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS almoxarifado,
JSON_QUERY((SELECT CASE al.nr_docto
when        383        then        13121360
when        146        then        13121361
when        234        then        13121362
when        439        then        13121363
when        1327        then        13121364
when        232        then        13121365
when        4914        then        13121366
when        384        then        13121367
when        4916        then        13121368
when        240        then        13121369
when        256        then        13121370
when        252        then        13121371
when        459        then        13121372
when        726        then        13121373
when        4972        then        13121374
when        4910        then        13121375
when        7036        then        13121376
when        4966        then        13121377
when        4913        then        13121378
when        1957        then        13121379
when        144        then        13121380
when        4905        then        13121381
when        246        then        13121382
when        21278        then        13121383
when        4967        then        13121384
when        458        then        13121385
when        4968        then        13121386
when        4904        then        13121387
when        4567        then        13121388
when        3333        then        13121389
when        2489        then        13121390
when        4971        then        13121391
when        4855        then        13121392
when        3147        then        13121393
when        835        then        13121394
when        5032        then        13121395
when        23884        then        13121396
when        4970        then        13121397
when        4975        then        13121398
when        5033        then        13121399
when        438        then        13121400
when        238        then        13121401
when        237        then        13121402
when        255        then        13121403
when        5728        then        13121404
when        5270        then        13121405
when        4853        then        13121406
when        4851        then        13121407
when        4973        then        13121408
when        3140        then        13121409
when        1137        then        13121410
when        5277        then        13121411
when        5086        then        13121412
when        4086        then        13121413
when        3657        then        13121414
when        4906        then        13121415
when        4974        then        13121416
when        4969        then        13121417
when        3796        then        13121418
when        3795        then        13121419
when        3968        then        13121420
when        3970        then        13121421
when        4849        then        13121422
when        4909        then        13121423
when        4727        then        13121424
when        4908        then        13121425
when        4915        then        13121426
when        3977        then        13121427
when        4912        then        13121428
when        4850        then        13121429
when        4852        then        13121430
when        3144        then        13121431
when        1803        then        13121432
when        2244        then        13121433
when        4854        then        13121434
when        1808        then        13121435
when        4911        then        13121436
when        828        then        13121437
when        4373        then        13121438
when        4907        then        13121439
when        4372        then        13121440
when        3797        then        13121441
                                                END AS  id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS entrada,
al.dt_movimento as dataEntrada,
'2024' as ano
        from ALMOMovimentacao AL
        join ALMOProdutos pr on AL.cd_produto = pr.cd_produto
        WHERE al.sg_direcao = 'CD' and al.aa_movimento = '2024' and qt_movimento > 0 and al.fl_devolucao is null and cd_almoxa = 20400
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
        
                const response = await fetch(`https://almoxarifado.betha.cloud/estoque-services/api/conversoes/lotes/entradas-finalizacao`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 0604a028-245d-4640-9ed2-f6c101463b45'
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