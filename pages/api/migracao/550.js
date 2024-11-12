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
    const year = d.getUTCFullYear();
    const month = (`0${d.getUTCMonth() + 1}`).slice(-2);
    const day = (`0${d.getUTCDate()}`).slice(-2);
    const hours = (`0${d.getUTCHours()}`).slice(-2);
    const minutes = (`0${d.getUTCMinutes()}`).slice(-2);
    const seconds = (`0${d.getUTCSeconds()}`).slice(-2);
    return `${year}-${month}-${day}`;
    //return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "COMP_ALMO"
        const selectDatabaseQuery = 'USE CONTABIL2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            	select 
 ROW_NUMBER() OVER (ORDER BY cd_Cecam) AS idIntegracao,
JSON_QUERY(
    (SELECT
        cd_exercicio as exercicio,
                                 JSON_QUERY(
    (SELECT
   case cd_categoriaeconomicareceita
  when	1113034102	then		33500517
when	1113034101	then		33500541
when	1121040102	then		33500717
when	1121040104	then		33500718
when	1121040403	then		33500724
when	1121040101	then		33500741
when	1321010117	then		33502104
when	1321010119	then		33502105
when	1321010121	then		33502106
when	1321010123	then		33502107
when	1321010125	then		33502108
when	1321010127	then		33502109
when	1321010129	then		33502110
when	1321010131	then		33502111
when	1321010133	then		33502112
when	1321010135	then		33502113
when	1321010116	then		33502128
when	1321010118	then		33502129
when	1321010120	then		33502130
when	1321010122	then		33502131
when	1321010124	then		33502132
when	1321010126	then		33502133
when	1321010128	then		33502134
when	1321010130	then		33502135
when	1321010132	then		33502136
when	1321010134	then		33502137
when	1321010136	then		33502138
when	1711511104	then		33503334
when	1711512103	then		33503340
when	1713501106	then		33503464
when	1713501110	then		33503466
when	1713501112	then		33503467
when	1713502102	then		33503473
when	1713501105	then		33503488
when	1713501107	then		33503489
when	1713501109	then		33503490
when	1713501111	then		33503491
when	1713501113	then		33503492
when	1713505103	then		33503516
when	1713503104	then		33503529
when	1713504102	then		33503535
when	1714990101	then		33503708
when	1714990102	then		33503733
when	1719570101	then		33503866
when	1729990101	then		33504122
when	1729990103	then		33504123
when	1729990102	then		33504147
when	1922011101	then		33504571
when	1921030101	then		33504580
when	1921030201	then		33504581
when	1922063101	then		33504678
when	1922500101	then		33504759
when	1922510101	then		33504764
when	1922990103	then		33504770
when	1922990105	then		33504771
when	1922990107	then		33504772
when	1922990109	then		33504773
when	1922990102	then		33504794
when	1922990104	then		33504795
when	1922990106	then		33504796
when	1922990108	then		33504797
when	1922990110	then		33504798
when	1923990102	then		33504827
when	1923990101	then		33504851
when	1923990103	then		33504852
when	1923990104	then		33504853
when	1923990302	then		33504860
when	1923990304	then		33504861
when	1923990306	then		33504862
when	1923990308	then		33504863
when	1923990310	then		33504864
when	1923990312	then		33504865
when	1923990314	then		33504866
when	1923990402	then		33504868
when	1923990404	then		33504869
when	1923990406	then		33504870
when	1923990408	then		33504871
when	1923990410	then		33504872
when	1923990412	then		33504873
when	1923990414	then		33504874
when	1923990416	then		33504875
when	1923990418	then		33504876
when	1923990301	then		33504884
when	1923990303	then		33504885
when	1923990305	then		33504886
when	1923990307	then		33504887
when	1923990309	then		33504888
when	1923990311	then		33504889
when	1923990313	then		33504890
when	1923990315	then		33504891
when	1923990401	then		33504892
when	1923990403	then		33504893
when	1923990407	then		33504895
when	1923990409	then		33504896
when	1923990411	then		33504897
when	1923990413	then		33504898
when	1923990415	then		33504899
when	1923990417	then		33504900
when	1999122101	then		33505267
when	1999992102	then		33505389
when	2411513101	then		33505590
when	2412509101	then		33505602
when	2414990108	then		33505643
when	2419510101	then		33505647
when	2429990101	then		33505702
   end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS natureza,
                                JSON_QUERY(
    (SELECT
   case cd_unidorca
when        '01.00.00'        then        163496
when        '01.01.00'        then        163497
when        '01.02.00'        then        163498
when        '02.00.00'        then        163499
when        '02.01.00'        then        163500
when        '02.02.00'        then        163501
when        '02.03.00'        then        163502
when        '02.04.00'        then        163503
when        '02.05.00'        then        163504
when        '02.06.00'        then        165807
when        '02.07.00'        then        165803
when        '02.08.00'        then        165804
when        '02.09.00'        then        165809
when        '02.10.00'        then        165810
end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS organograma
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
from CONTFICHARECEITA
where cd_ReceitaPrevisaoTipo = 1
and vl_orcado = 0
and cd_cecam = 2783


        `;

        const result = await masterConnection.query(userQuery);

        const resultData = result.recordset;

        const transformedData = resultData.map(record => {
            // Log para verificar o que está sendo recebido em cada registro
            console.log("Registro original:", record);

            // Parse do campo `content`, se necessário
            const parsedContent = record.content ? JSON.parse(record.content) : {};

            // Montagem do JSON final
            return {
                idIntegracao: record.idIntegracao || null,  // Verifica se existe `idIntegracao`
                content: {
                    exercicio: parsedContent.exercicio || record.exercicio || null,  // Pega o campo `exercicio`
                    natureza: {
                        id: parsedContent.natureza?.id || record.naturezaId || null  // Pega o campo `natureza.id`
                    },
                    organograma: {
                        id: parsedContent.organograma?.id || record.organogramaId || null  // Pega o campo `organograma.id`
                    }
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
        
                const response = await fetch(`https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/receitas-nao-previstas`, {
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
        
        // Salvar o relatório em 'report.json'
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));
        console.log('Relatório salvo em report.json com sucesso.');
        
        // Salvar os reportIds no arquivo 'report_id.json'
        fs.writeFileSync('report_id.json', JSON.stringify(reportIds, null, 2));
        console.log('report_id.json salvo com sucesso.');
        

    } catch (error) {
        console.error('Erro no processo:', error);
    } finally {
        await sql.close(); // Fechar a conexão com o SQL Server
        console.log('Conexão com o SQL Server fechada.');
    }
}

// Executar a função principal
main();