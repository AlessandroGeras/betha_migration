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
when        163        then        22704867
when        195        then        22704868
when        221        then        22704869
when        223        then        22704870
when        224        then        22704871
when        225        then        22704872
when        226        then        22704873
when        227        then        22704874
when        228        then        22704875
when        230        then        22704876
when        238        then        22704877
when        239        then        22704878
when        240        then        22704879
when        419        then        22704880
when        422        then        22704881
when        431        then        22704882
when        591        then        22704883
when        592        then        22704884
when        594        then        22704885
when        602        then        22704986
when        603        then        22704987
when        605        then        22704988
when        607        then        22704989
when        608        then        22704990
when        609        then        22704991
when        610        then        22704992
when        612        then        22704993
when        613        then        22704994
when        632        then        22704995
when        637        then        22704996
when        641        then        22704997
when        642        then        22704936
when        643        then        22704937
when        644        then        22704938
when        718        then        22704939
when        723        then        22704940
when        725        then        22704941
when        726        then        22704942
when        728        then        22704943
when        731        then        22704944
when        733        then        22704945
when        734        then        22704946
when        737        then        22704947
when        747        then        22704948
when        975        then        22704950
when        757        then        22704949
when        978        then        22704952
when        976        then        22704951
when        1002        then        22704953
when        1137        then        22704954
when        1183        then        22704955
when        1186        then        22704956
when        1189        then        22704958
when        1187        then        22704957
when        1192        then        22704959
when        1194        then        22704960
when        1198        then        22704961
when        1201        then        22704962
when        1203        then        22704963
when        1207        then        22704965
when        1204        then        22704964
when        1209        then        22704967
when        1208        then        22704966
when        1210        then        22704968
when        1212        then        22704969
when        1214        then        22704970
when        1346        then        22704972
when        1215        then        22704971
when        1869        then        22704973
when        2218        then        22704974
when        2232        then        22704975
when        2244        then        22704976
when        2720        then        22704977
when        4002        then        22704978
when        4612        then        22704979
when        4615        then        22704980
when        4619        then        22704981
when        4816        then        22704982
when        4827        then        22704984
when        4817        then        22704983
when        4828        then        22704985
when        4840        then        22705087
when        4830        then        22705086
when        4841        then        22705088
when        4842        then        22705089
when        4843        then        22705090
when        5032        then        22705091
when        5145        then        22705093
when        5033        then        22705092
when        5166        then        22705094
when        11193        then        22705095
when        20815        then        22705096
when        652406        then        22705097
when        54        then        22704848
when        144        then        22704849
when        146        then        22704850
when        147        then        22704851
when        148        then        22704852
when        149        then        22704853
when        150        then        22704854
when        151        then        22704855
when        152        then        22704856
when        153        then        22704857
when        154        then        22704858
when        155        then        22704859
when        156        then        22704860
when        157        then        22704861
when        158        then        22704862
when        159        then        22704863
when        160        then        22704864
when        161        then        22704865
when        162        then        22704866
                                                END AS  id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS saida,
al.dt_movimento as datasaida,
'2024' as ano
        from ALMOMovimentacao AL
        join ALMOProdutos pr on AL.cd_produto = pr.cd_produto
        WHERE al.sg_direcao = 'CD' and al.aa_movimento = '2024' and qt_movimento > 0 and al.fl_devolucao is null
        group by nr_docto, dt_movimento, cd_almoxa
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
                    id: JSON.parse(record.saida).id
                    //dataSaida: formatDate(record.datasaida),
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
            const url = `https://almoxarifado.betha.cloud/estoque-services/api/conversoes/lotes/saidas-finalizacao`;
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
