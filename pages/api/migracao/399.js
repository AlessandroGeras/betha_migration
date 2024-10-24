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
JSON_QUERY((SELECT CASE WHEN cd_almoxa = 20100 THEN 4832
                        WHEN cd_almoxa = 20200 THEN 4877
                        WHEN cd_almoxa = 20300 THEN 4878
                        WHEN cd_almoxa = 20400 THEN 4879
                        WHEN cd_almoxa = 20500 THEN 4880
                        WHEN cd_almoxa = 20600 THEN 4881
                        WHEN cd_almoxa = 20700 THEN 4882
                        WHEN cd_almoxa = 20900 THEN 4884
                        WHEN cd_almoxa = 21000 THEN 4885
                   END AS id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS almoxarifado,
JSON_QUERY((SELECT CASE al.nr_docto
when        54        then        10770560
when        144        then        10770561
when        146        then        10770562
when        147        then        10770563
when        148        then        10770564
when        149        then        10770565
when        150        then        10770566
when        151        then        10770567
when        152        then        10770568
when        153        then        10770569
when        154        then        10770570
when        155        then        10770571
when        156        then        10770572
when        157        then        10770573
when        158        then        10770574
when        159        then        10770575
when        160        then        10770576
when        161        then        10770577
when        162        then        10770578
when        163        then        10770579
when        195        then        10770580
when        221        then        10770581
when        223        then        10770582
when        224        then        10770583
when        225        then        10770584
when        226        then        10770585
when        227        then        10770586
when        228        then        10770587
when        230        then        10770588
when        238        then        10770589
when        239        then        10770590
when        240        then        10770591
when        419        then        10770592
when        422        then        10770593
when        431        then        10770594
when        591        then        10770595
when        592        then        10770596
when        594        then        10770597
when        602        then        10770598
when        603        then        10770599
when        605        then        10770600
when        607        then        10770601
when        608        then        10770602
when        609        then        10770603
when        610        then        10770604
when        612        then        10770605
when        613        then        10770606
when        632        then        10770607
when        637        then        10770608
when        641        then        10770609
when        642        then        10770610
when        643        then        10770611
when        644        then        10770612
when        718        then        10770613
when        723        then        10770614
when        725        then        10770615
when        726        then        10770616
when        728        then        10770617
when        731        then        10770618
when        733        then        10770619
when        734        then        10770620
when        737        then        10770621
when        747        then        10770622
when        757        then        10770623
when        975        then        10770624
when        976        then        10770625
when        978        then        10770626
when        1002        then        10770627
when        1137        then        10770628
when        1183        then        10770629
when        1186        then        10770630
when        1187        then        10770631
when        1189        then        10770632
when        1192        then        10770633
when        1194        then        10770634
when        1198        then        10770635
when        1201        then        10770636
when        1203        then        10770637
when        1204        then        10770638
when        1207        then        10770639
when        1208        then        10770640
when        1209        then        10770641
when        1210        then        10770642
when        1212        then        10770643
when        1214        then        10770644
when        1215        then        10770645
when        1346        then        10770646
when        1869        then        10770647
when        2218        then        10770648
when        2232        then        10770649
when        2244        then        10770650
when        2720        then        10770651
when        4002        then        10770652
when        4612        then        10770653
when        4615        then        10770654
when        4619        then        10770655
when        4816        then        10770656
when        4817        then        10770657
when        4827        then        10770658
when        4828        then        10770659
when        4830        then        10770660
when        4840        then        10770661
when        4841        then        10770662
when        4842        then        10770663
when        4843        then        10770664
when        5032        then        10770665
when        5033        then        10770666
when        5145        then        10770667
when        5166        then        10770668
when        11193        then        10770669
when        20815        then        10770670
when        652406        then        10770671
                                                END AS  id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS entrada,
al.dt_movimento as dataEntrada,
'2024' as ano
        from ALMOMovimentacao AL
        join ALMOProdutos pr on AL.cd_produto = pr.cd_produto
        WHERE al.sg_direcao = 'CD' and al.aa_movimento = '2024' and qt_movimento > 0 and al.fl_devolucao is null
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
