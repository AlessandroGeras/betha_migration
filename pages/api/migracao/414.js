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
JSON_QUERY(
    (SELECT
JSON_QUERY((SELECT CASE WHEN cd_almoxa = 20100 THEN 5415
                        WHEN cd_almoxa = 20200 THEN 5416
                        WHEN cd_almoxa = 20300 THEN 5418
                        WHEN cd_almoxa = 20500 THEN 5420
                        WHEN cd_almoxa = 20600 THEN 5417
                        WHEN cd_almoxa = 20800 THEN 5421
                        WHEN cd_almoxa = 20900 THEN 5419
                   END AS id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS almoxarifado,
al.aa_movimento as exercicio
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
 ) AS context,
JSON_QUERY(
    (SELECT
JSON_QUERY((SELECT CASE al.nr_docto 
when	3177	then	25984490
when	2698	then	25984491
when	163	then	25984486
when	148	then	25984487
when	2696	then	25984488
when	3176	then	25984489
when	2699	then	25984492
when	2700	then	25984493
when	238	then	25984494
when	1956	then	25984495
when	1845	then	25984496
when	5166	then	25984497
when	747	then	25984498
when	607	then	25984499
when	643	then	25984500
when	3811	then	25984501
when	162	then	25984502
when	757	then	25984503
when	641	then	25984504
when	591	then	25984505
when	608	then	25984506
when	4890	then	25984507
when	652406	then	25984508
when	1844	then	25984509
when	2506	then	25984510
when	3980	then	25984511
when	5274	then	25984512
when	1846	then	25984513
when	661926	then	25984514
when	1324	then	25984515
when	594	then	25984516
when	5514	then	25984517
when	667361	then	25984518
when	1951	then	25984519
when	3336	then	25984520
when	2504	then	25984521
when	3810	then	25984522
when	1214	then	25984523
when	1212	then	25984524
when	5276	then	25984525
when	5103	then	25984526
when	4391	then	25984527
when	3	then	25984528
when	3337	then	25984529
when	2505	then	25984530
when	3178	then	25984531
when	5145	then	25984532
when	5275	then	25984533
when	4389	then	25984534
when	1323	then	25984535
when	230	then	25984536
when	1215	then	25984537
when	1322	then	25984538
when	1952	then	25984539
when	3458	then	25984540
when	3976	then	25984541
when	3981	then	25984542
when	5622	then	25984543
when	1953	then	25984544
when	3979	then	25984545
when	1016	then	25984546
when	3808	then	25984547
when	3809	then	25984548
when	161	then	25984549
when	1	then	25984550
when	613	then	25984551
when	3339	then	25984552
when	592	then	25984553
when	4565	then	25984554
when	642	then	25984555
when	4574	then	25984556
when	4891	then	25984557
when	3801	then	25984558
when	4997	then	25984559
when	5283	then	25984560
when	3807	then	25984561
when	3661	then	25984562
when	612	then	25984563
when	5840	then	25984564
when	3803	then	25984565
when	3802	then	25984566
when	3796	then	25984567
when	5733	then	25984568
when	5842	then	25984569
when	5	then	25984570
when	4996	then	25984571
when	3795	then	25984572
when	4576	then	25984573
when	3800	then	25984574
when	5849	then	25984575
when	5848	then	25984576
when	4566	then	25984577
when	5841	then	25984578
when	4390	then	25984579
END AS  id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS saida,
al.dt_movimento as datasaida
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS conteudo
        from ALMOMovimentacao AL
        join ALMOProdutos pr on AL.cd_produto = pr.cd_produto
        WHERE al.sg_direcao = 'CD' and al.aa_movimento = '2024' and qt_movimento > 0 and al.fl_devolucao is null 
		and  (cd_almoxa = 20500)-- or cd_almoxa = 20200 or  cd_almoxa = 20300 or  cd_almoxa = 20500 or  cd_almoxa = 20600 or  cd_almoxa = 20800 or  cd_almoxa = 20900 )
        group by nr_docto, dt_movimento, al.aa_movimento, cd_almoxa
		order by dt_movimento asc
        `;

        const result = await masterConnection.query(userQuery);
const resultData = result.recordset;

const transformedData = resultData.map(record => {


    let almoxarifado, conteudo, exercicio;

    try {
        // Extrai e analisa o conteúdo de 'almoxarifado' e 'exercicio'
        if (record.context) {
            const parsedContext = JSON.parse(record.context);
            almoxarifado = parsedContext.almoxarifado ? parsedContext.almoxarifado.id : null; // Extrai o ID do almoxarifado
            exercicio = parsedContext.exercicio ? parsedContext.exercicio : null; // Extrai o exercício
        }

        // Extrai e analisa o conteúdo de 'saida'
        if (record.conteudo) {
            const parsedConteudo = JSON.parse(record.conteudo);
            conteudo = parsedConteudo.saida ? parsedConteudo.saida.id : null; // Pega o id de 'saida'
        }

    } catch (error) {
        console.error("Erro ao parsear JSON: ", error);
        return null; // Pula registros inválidos
    }

    // Valida se as variáveis foram corretamente extraídas
    if (!almoxarifado || !conteudo || !exercicio) {
        console.error("Dados faltando no registro: ", record);
        return null; // Pula registros com dados incompletos
    }

    console.log("Almoxarifado ID:", almoxarifado);
    console.log("Conteúdo ID (Saída):", conteudo);
    console.log("Exercício:", exercicio);

    // Retorna o formato desejado
    return {
        conteudo: {
            id: conteudo.toString() // Certifique-se de que aqui você está pegando o id correto do JSON
        },
        context: {
            almoxarifado: almoxarifado.toString(), // Almoxarifado extraído
            exercicio: exercicio.toString() // Exercício extraído
        }
    };
}).filter(record => record !== null); // Filtra os registros nulos/inválidos



/* 
         const chunkSize = 50;
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
        
                const response = await fetch(`https://almoxarifado.betha.cloud/estoque-services/api/conversoes/lotes/saidas-finalizacao`, {
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