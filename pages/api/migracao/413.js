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
JSON_QUERY((SELECT CASE  WHEN cd_almoxa = 20100 THEN 4832
                        WHEN cd_almoxa = 20200 THEN 4877
                        WHEN cd_almoxa = 20300 THEN 4878
                        WHEN cd_almoxa = 20500 THEN 4880
                        WHEN cd_almoxa = 20600 THEN 4881
                        WHEN cd_almoxa = 20800 THEN 4883
                        WHEN cd_almoxa = 20900 THEN 4884
                        WHEN cd_almoxa = 21000 THEN 4885
                        WHEN cd_almoxa = 1 THEN 4830
                   END AS id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS almoxarifado,
al.aa_movimento as exercicio
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
 ) AS context,
JSON_QUERY(
    (SELECT
JSON_QUERY((SELECT CASE al.nr_docto
     when	54	then	23477386
when	147	then	23477387
when	151	then	23477388
when	153	then	23477389
when	154	then	23477390
when	155	then	23477391
when	156	then	23477392
when	195	then	23477393
when	221	then	23477394
when	225	then	23477395
when	419	then	23477397
when	226	then	23477396
when	602	then	23477398
when	603	then	23477399
when	609	then	23477400
when	610	then	23477401
when	632	then	23477402
when	637	then	23477403
when	731	then	23477404
when	733	then	23477405
when	975	then	23477406
when	976	then	23477407
when	978	then	23477408
when	1002	then	23477409
when	1183	then	23477410
when	1186	then	23477411
when	1187	then	23477412
when	1189	then	23477413
when	1192	then	23477414
when	1194	then	23477415
when	1198	then	23477416
when	1869	then	23477417
when	4612	then	23477418
when	4615	then	23477419
when	4827	then	23477420
when	4828	then	23477421
when	150	then	25213386
when	152	then	25213287
when	238	then	25213586
when	1207	then	25213587
when	757	then	25213786
when	228	then	25213787
when	1203	then	25213686
when	4002	then	25213387
when	594	then	25213388
when	2232	then	25213986
when	1346	then	25214186
when	1214	then	25213487
when	734	then	25213887
when	1201	then	25213289
when	1215	then	25213390
when	160	then	25213488
when	613	then	25213290
when	728	then	25213291
when	1210	then	25213688
when	607	then	25213391
when	161	then	25213489
when	605	then	25213889
when	163	then	25213890
when	747	then	25213790
when	230	then	25213292
when	608	then	25214187
when	159	then	25213690
when	725	then	25213791
when	157	then	25213588
when	1208	then	25213394
when	2720	then	25213293
when	4619	then	25213691
when	1212	then	25213892
when	592	then	25214387
when	2218	then	25213988
when	1209	then	25213793
when	641	then	25213493
when	223	then	25213692
when	718	then	25214089
when	224	then	25213693
when	239	then	25213694
when	591	then	25213893
when	149	then	25214389
when	1204	then	25213295
when	431	then	25213989
when	158	then	25213795
when	642	then	25213495
when	227	then	25214091
when	162	then	25214189
when	737	then	25213296
when	643	then	25213297
when	148	then	25213894
when	723	then	25213796
when	5145	then	25213797
when	422	then	25213895
when	612	then	25214390
when	652406	then	25214391
when	644	then	25214289
when	4830	then	25213497
when	20815	then	25213400
when	5166	then	25213298
when	4840	then	25213696
when	11193	then	25213896
when	4842	then	25213593
when	4817	then	25214092
when	4843	then	25213991
when	4841	then	25214191
when	4816	then	25214290
when	602	then	25171186
when	978	then	25171187
when	733	then	25171286
when	610	then	25171386
when	147	then	25171387
when	609	then	25171388
when	226	then	25171389
when	4827	then	25171486
when	603	then	25171287
when	637	then	25171288
when	153	then	25171289
when	976	then	25171487
when	1187	then	25171488
when	4828	then	25171489
when	4612	then	25171290
when	1002	then	25171291
when	632	then	25171292
when	225	then	25171390
when	4615	then	25171391
when	419	then	25171490
when	975	then	25171293
when	1192	then	25171392
when	195	then	25171393
when	731	then	25171294
when	1194	then	25171295
when	1186	then	25171491
when	1189	then	25171492
when	154	then	25171493
when	54	then	25171296
when	1183	then	25171394
when	1198	then	25171297
when	156	then	25171298
when	155	then	25171395
when	151	then	25171494
when	221	then	25171396
when	1869	then	25171495
when	2244	then	25171188
when	1137	then	25171397
when	240	then	25171496
when	144	then	25171686
when	726	then	25171786
when	5032	then	25171886
when	146	then	25171986
when	5033	then	25171299 
END AS  id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS saida,
al.dt_movimento as datasaida
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS conteudo
        from ALMOMovimentacao AL
        join ALMOProdutos pr on AL.cd_produto = pr.cd_produto
        WHERE al.sg_direcao = 'CD' and al.aa_movimento = '2024' and qt_movimento > 0 and al.fl_devolucao is null and cd_almoxa in (20100,20200, 20300,20500,20600,20800,20900,21000,1)
        group by nr_docto, dt_movimento, al.aa_movimento, cd_almoxa
        `;

        const result = await masterConnection.query(userQuery);
const resultData = result.recordset;

const transformedData = resultData.map(record => {

    console.log(record);

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
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        await sql.close();
    }
}

// Chamar a função principal
main();