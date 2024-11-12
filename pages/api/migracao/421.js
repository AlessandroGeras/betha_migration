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
JSON_QUERY((SELECT CASE WHEN cd_almoxa = 20100 THEN 5415
                        WHEN cd_almoxa = 20200 THEN 5416
                        WHEN cd_almoxa = 20300 THEN 5418
                        WHEN cd_almoxa = 20500 THEN 5420
                        WHEN cd_almoxa = 20600 THEN 5417
                        WHEN cd_almoxa = 20800 THEN 5421
                        WHEN cd_almoxa = 20900 THEN 5419
                   END as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS almoxarifado,
JSON_QUERY((SELECT CASE al.nr_docto
when 3800	then 13244660
when 643	then 13244661
when 652406	then 13244662
when 5849	then 13244663
when 1324	then 13244664
when 667361	then 13244665
when 5	then 13244666
when 3339	then 13244667
when 5841	then 13244668
when 2698	then 13244669
when 2504	then 13244670
when 1953	then 13244671
when 3981	then 13244672
when 3976	then 13244673
when 3808	then 13244674
when 642	then 13244675
when 613	then 13244676
when 3795	then 13244677
when 641	then 13244678
when 661926	then 13244679
when 4389	then 13244680
when 162	then 13244681
when 5514	then 13244682
when 4890	then 13244683
when 230	then 13244684
when 1844	then 13244685
when 148	then 13244686
when 3796	then 13244687
when 4576	then 13244688
when 3336	then 13244689
when 5283	then 13244690
when 1952	then 13244691
when 5842	then 13244692
when 2506	then 13244693
when 3809	then 13244694
when 4390	then 13244695
when 1	then 13244696
when 5840	then 13244697
when 3176	then 13244698
when 3803	then 13244699
when 594	then 13244700
when 1956	then 13244701
when 5733	then 13244702
when 5276	then 13244703
when 608	then 13244704
when 3979	then 13244705
when 163	then 13244706
when 591	then 13244707
when 5848	then 13244708
when 238	then 13244709
when 5275	then 13244710
when 4996	then 13244711
when 5622	then 13244712
when 607	then 13244713
when 1845	then 13244714
when 4997	then 13244715
when 1214	then 13244716
when 5274	then 13244717
when 5145	then 13244718
when 3807	then 13244719
when 3802	then 13244720
when 161	then 13244721
when 1322	then 13244722
when 3811	then 13244723
when 1215	then 13244724
when 3801	then 13244725
when 3178	then 13244726
when 4565	then 13244727
when 4566	then 13244728
when 757	then 13244729
when 2699	then 13244730
when 747	then 13244731
when 2505	then 13244732
when 3810	then 13244733
when 1323	then 13244734
when 3	then 13244735
when 4574	then 13244736
when 612	then 13244737
when 3337	then 13244738
when 4891	then 13244739
when 1016	then 13244740
when 1846	then 13244741
when 4391	then 13244742
when 2696	then 13244743
when 592	then 13244744
when 2700	then 13244745
when 5103	then 13244746
when 3458	then 13244747
when 3661	then 13244748
when 1212	then 13244749
when 3980	then 13244750
when 3177	then 13244751
when 5166	then 13244752
when 1951	then 13244753
                                                END AS  id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS entrada,
al.dt_movimento as dataEntrada,
'2024' as ano
        from ALMOMovimentacao AL
        join ALMOProdutos pr on AL.cd_produto = pr.cd_produto
        WHERE al.sg_direcao = 'CD' and al.aa_movimento = '2024' and qt_movimento > 0 and al.fl_devolucao is null 
		and (cd_almoxa = 20500) --or cd_almoxa = 20200 or  cd_almoxa = 20300 or  cd_almoxa = 20500 or  cd_almoxa = 20600 or  cd_almoxa = 20800 or  cd_almoxa = 20900 )
        group by cd_almoxa,nr_docto, dt_movimento
		order by al.dt_movimento asc
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

        /*   const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        return  */

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