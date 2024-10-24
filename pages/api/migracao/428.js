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
JSON_QUERY((SELECT CASE when cd_almoxa = 20700 THEN 5268
                   END AS id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS almoxarifado,
al.aa_movimento as exercicio
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
 ) AS context,
JSON_QUERY(
    (SELECT
JSON_QUERY((SELECT CASE al.nr_docto
when        975        then        25213486
when        1187        then        25214086
when        1002        then        25213288
when        978        then        25214286
when        1198        then        25213389
when        151        then        25214386
when        1194        then        25213788
when        1186        then        25213888
when        153        then        25213789
when        1189        then        25213392
when        1869        then        25213689
when        225        then        25213490
when        4612        then        25213393
when        733        then        25214188
when        154        then        25213987
when        632        then        25213589
when        155        then        25213395
when        1183        then        25213294
when        156        then        25214088
when        195        then        25213492
when        221        then        25213891
when        976        then        25213396
when        603        then        25214287
when        54        then        25214288
when        147        then        25213590
when        609        then        25213591
when        4828        then        25213494
when        637        then        25213397
when        226        then        25213398
when        602        then        25214388
when        731        then        25213990
when        4827        then        25214090
when        419        then        25213592
when        610        then        25213496
when        4615        then        25213695
when        1192        then        25214190
                                                END AS  id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS saida,
al.dt_movimento as datasaida
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS conteudo
        from ALMOMovimentacao AL
        join ALMOProdutos pr on AL.cd_produto = pr.cd_produto
        WHERE al.sg_direcao = 'CD' and al.aa_movimento = '2024' and qt_movimento > 0 and al.fl_devolucao is null and cd_almoxa = 20700
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