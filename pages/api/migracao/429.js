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
JSON_QUERY((SELECT CASE when cd_almoxa = 20400 THEN 5738
                   END AS id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS almoxarifado,
al.aa_movimento as exercicio
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS context,
JSON_QUERY(
    (SELECT
JSON_QUERY((SELECT CASE al.nr_docto
when        5728        then        25922934
when        256        then        25923021
when        3795        then        25923118
when        835        then        25922919
when        232        then        25923313
when        2244        then        25923215
when        828        then        25923119
when        252        then        25922920
when        3657        then        25923022
when        439        then        25923314
when        3147        then        25923216
when        240        then        25922921
when        726        then        25923120
when        2489        then        25923023
when        1137        then        25923217
when        1327        then        25923315
when        438        then        25922922
when        237        then        25923024
when        255        then        25923121
when        458        then        25923316
when        3333        then        25923218
when        238        then        25923122
when        459        then        25922923
when        146        then        25923025
when        3968        then        25923317
when        384        then        25923219
when        3797        then        25922924
when        3970        then        25923123
when        1808        then        25923026
when        4372        then        25923318
when        3796        then        25923220
when        234        then        25923027
when        246        then        25922925
when        4849        then        25923124
when        144        then        25923319
when        1803        then        25923221
when        4727        then        25923028
when        3977        then        25923125
when        3144        then        25922926
when        3140        then        25923320
when        4906        then        25923222
when        4909        then        25923029
when        4853        then        25923126
when        4904        then        25922927
when        4907        then        25923321
when        4567        then        25923223
when        4852        then        25923030
when        4854        then        25923127
when        4850        then        25922928
when        4910        then        25923322
when        4911        then        25923031
when        4912        then        25922929
when        4967        then        25923128
when        4086        then        25923224
when        4915        then        25923323
when        4913        then        25923032
when        4373        then        25923129
when        4916        then        25922930
when        4969        then        25923225
when        4966        then        25923324
when        4971        then        25923033
when        4972        then        25923130
when        4970        then        25922931
when        5032        then        25923226
when        5033        then        25923325
when        5270        then        25923034
when        4855        then        25923131
when        5086        then        25922932
when        4974        then        25923227
when        4905        then        25923035
when        4908        then        25923326
when        5277        then        25923132
when        4975        then        25922933
when        23884        then        25923228
when        7036        then        25923036
when        4914        then        25923327
when        4973        then        25923133
when        1957        then        25924086
when        383        then        25924087
when        4968        then        25924088
when        4851        then        25924089
when        21278        then        25924090
END AS  id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS saida,
al.dt_movimento as datasaida
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS conteudo
        from ALMOMovimentacao AL
        join ALMOProdutos pr on AL.cd_produto = pr.cd_produto
        WHERE al.sg_direcao = 'CD' and al.aa_movimento = '2024' and qt_movimento > 0 and al.fl_devolucao is null and cd_almoxa = 20400
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
        
                const response = await fetch(`https://almoxarifado.betha.cloud/estoque-services/api/conversoes/lotes/saidas-finalizacao`, {
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