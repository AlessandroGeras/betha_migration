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
JSON_QUERY((SELECT CASE WHEN cd_almoxa = 20700 THEN 5739
                   END as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS almoxarifado,
JSON_QUERY((SELECT CASE al.nr_docto
when        111        then        13120557
when        147        then        13120558
when        151        then        13120559
when        133        then        13120760
when        11        then        13120761
when        136        then        13120762
when        97        then        13120763
when        13        then        13120764
when        153        then        13120765
when        18        then        13120766
when        54        then        13120767
when        123        then        13120768
when        155        then        13120769
when        19        then        13120770
when        12        then        13120771
when        85        then        13120772
when        149        then        13120773
when        130        then        13120774
when        1002        then        13120775
when        2        then        13120776
when        154        then        13120777
when        441        then        13120778
when        103        then        13120779
when        976        then        13120780
when        978        then        13120781
when        975        then        13120782
when        632        then        13120783
when        733        then        13120784
when        731        then        13120785
when        609        then        13120786
when        610        then        13120787
when        603        then        13120788
when        226        then        13120789
when        602        then        13120790
when        419        then        13120791
when        173        then        13120792
when        204        then        13120793
when        199        then        13120794
when        221        then        13120795
when        153        then        13120796
when        190        then        13120797
when        195        then        13120798
when        206        then        13120799
when        156        then        13120800
when        225        then        13120801
when        1088        then        13120802
when        1023        then        13120803
when        1006        then        13120804
when        637        then        13120805
when        1120        then        13120806
when        1096        then        13120807
when        1103        then        13120808
when        1095        then        13120809
when        1097        then        13120810
when        1104        then        13120811
when        1821        then        13120812
when        1198        then        13120813
when        1192        then        13120814
when        1321        then        13120815
when        1194        then        13120816
when        1137        then        13120817
when        1183        then        13120818
when        1189        then        13120819
when        1812        then        13120820
when        1187        then        13120821
when        1325        then        13120822
when        1186        then        13120823
when        1316        then        13120824
when        1816        then        13120825
when        1485        then        13120826
when        1813        then        13120827
when        1484        then        13120828
when        1320        then        13120829
when        1828        then        13120830
when        1833        then        13120831
when        1824        then        13120832
when        1435        then        13120833
when        1869        then        13120834
when        1837        then        13120835
when        1835        then        13120836
when        1949        then        13120837
when        2016        then        13120838
when        1948        then        13120839
when        2491        then        13120840
when        1950        then        13120841
when        1954        then        13120842
when        2284        then        13120843
when        2495        then        13120844
when        2493        then        13120845
when        2492        then        13120846
when        2494        then        13120847
when        2017        then        13120848
when        2498        then        13120849
when        2024        then        13120850
when        2573        then        13120851
when        2496        then        13120852
when        1955        then        13120853
when        2694        then        13120854
when        2497        then        13120855
when        2695        then        13120856
when        2697        then        13120857
when        3154        then        13120858
when        3149        then        13120859
when        3151        then        13120860
when        2969        then        13120861
when        2790        then        13120862
when        3156        then        13120863
when        3160        then        13120864
when        3163        then        13120865
when        3338        then        13120866
when        3165        then        13120867
when        3698        then        13120868
when        3335        then        13120869
when        3556        then        13120870
when        3452        then        13120871
when        4571        then        13120872
when        3798        then        13120873
when        4933        then        13120874
when        4575        then        13120875
when        4827        then        13120876
when        4892        then        13120877
when        4896        then        13120878
when        4672        then        13120879
when        4572        then        13120880
when        4615        then        13120881
when        4612        then        13120882
when        4934        then        13120883
when        3799        then        13120884
when        4935        then        13120885
when        3974        then        13120886
when        5847        then        13120887
when        6012        then        13120888
when        5092        then        13120889
when        5281        then        13120890
when        4374        then        13120891
when        4570        then        13120892
when        4377        then        13120893
when        5846        then        13120894
when        5088        then        13120895
when        3797        then        13120896
when        5090        then        13120897
when        4894        then        13120898
when        3975        then        13120899
when        4895        then        13120900
when        14091        then        13120901
when        4893        then        13120902
when        3978        then        13120903
when        4375        then        13120904
when        3973        then        13120905
when        5001        then        13120906
when        4828        then        13120907
when        5282        then        13120908
when        5730        then        13120909
when        5732        then        13120910
when        4569        then        13120911
when        5093        then        13120912
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
                        'Authorization': 'Bearer 4dfb70a8-62e5-4ec2-9028-622e50d1f4d1'
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