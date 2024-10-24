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
JSON_QUERY((SELECT CASE  WHEN cd_almoxa = 20100 THEN 4832
                        WHEN cd_almoxa = 20200 THEN 4877
                        WHEN cd_almoxa = 20300 THEN 4878
                        WHEN cd_almoxa = 20500 THEN 4880
                        WHEN cd_almoxa = 20600 THEN 4881
                        WHEN cd_almoxa = 20800 THEN 4883
                        WHEN cd_almoxa = 20900 THEN 4884
                        WHEN cd_almoxa = 21000 THEN 4885
                        WHEN cd_almoxa = 1 THEN 4830
                   END as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS almoxarifado,
JSON_QUERY((SELECT CASE al.nr_docto
when        1346        then        11557868
when        2218        then        11557869
when        2232        then        11557870
when        2720        then        11557871
when        4002        then        11557872
when        4619        then        11557873
when        4816        then        11557874
when        4817        then        11557875
when        4830        then        11557876
when        4840        then        11557877
when        4841        then        11557878
when        4842        then        11557879
when        4843        then        11557880
when        5145        then        11557881
when        5166        then        11557882
when        11193        then        11557883
when        20815        then        11557884
when        652406        then        11557885
when        148        then        11558760
when        149        then        11558761
when        150        then        11558762
when        152        then        11558763
when        157        then        11558764
when        158        then        11558765
when        159        then        11558766
when        160        then        11558767
when        161        then        11558768
when        162        then        11558769
when        163        then        11558770
when        223        then        11558771
when        224        then        11558772
when        227        then        11558773
when        228        then        11558774
when        230        then        11558775
when        238        then        11558776
when        239        then        11558777
when        422        then        11558778
when        431        then        11558779
when        591        then        11558780
when        592        then        11558781
when        594        then        11558782
when        605        then        11558783
when        607        then        11558784
when        608        then        11558785
when        612        then        11558786
when        613        then        11558787
when        641        then        11558788
when        642        then        11558789
when        643        then        11558790
when        644        then        11558791
when        718        then        11558792
when        723        then        11558793
when        725        then        11558794
when        728        then        11558795
when        734        then        11558796
when        737        then        11558797
when        747        then        11558798
when        757        then        11558799
when        1201        then        11558800
when        1203        then        11558801
when        1204        then        11558802
when        1207        then        11558803
when        1208        then        11558804
when        1209        then        11558805
when        1210        then        11558806
when        1212        then        11558807
when        1214        then        11558808
when        1215        then        11558809
                                                END AS  id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS entrada,
al.dt_movimento as dataEntrada,
'2024' as ano
        from ALMOMovimentacao AL
        join ALMOProdutos pr on AL.cd_produto = pr.cd_produto
        WHERE al.sg_direcao = 'CD' and al.aa_movimento = '2024' and qt_movimento > 0 and al.fl_devolucao is null and (cd_almoxa = 20100 or cd_almoxa = 20200 or  cd_almoxa = 20300 or  cd_almoxa = 20500 or  cd_almoxa = 20600 or  cd_almoxa = 20800 or  cd_almoxa = 20900 )
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
