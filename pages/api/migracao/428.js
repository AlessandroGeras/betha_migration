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
JSON_QUERY((SELECT CASE when cd_almoxa = 20700 THEN 5739
                   END AS id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS almoxarifado,
al.aa_movimento as exercicio
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
 ) AS context,
JSON_QUERY(
    (SELECT
JSON_QUERY((SELECT CASE al.nr_docto
when        204        then        25923289
when        603        then        25922892
when        1137        then        25922992
when        133        then        25923091
when        3154        then        25923204
when        3163        then        25922908
when        3160        then        25923302
when        2790        then        25923010
when        3973        then        25923108
when        3798        then        25922909
when        3974        then        25923205
when        3556        then        25923303
when        2697        then        25923011
when        3975        then        25923109
when        3338        then        25922910
when        3165        then        25923206
when        3149        then        25923304
when        3698        then        25923012
when        3335        then        25923110
when        3452        then        25922911
when        3156        then        25923207
when        5090        then        25923305
when        5001        then        25923013
when        4377        then        25923111
when        4892        then        25922912
when        4828        then        25923306
when        4572        then        25923208
when        4612        then        25923014
when        4571        then        25923112
when        4375        then        25922913
when        3799        then        25923307
when        4374        then        25923209
when        4570        then        25923015
when        3978        then        25923113
when        5092        then        25922914
when        3797        then        25923308
when        5093        then        25923210
when        5088        then        25923016
when        4569        then        25923114
when        4933        then        25922915
when        4894        then        25923309
when        5730        then        25923017
when        5732        then        25923211
when        6012        then        25923115
when        5846        then        25922916
when        4895        then        25923310
when        4934        then        25923018
when        5282        then        25923212
when        4896        then        25923116
when        5281        then        25922917
when        4935        then        25923311
when        14091        then        25923019
when        5847        then        25923213
when        4827        then        25923117
when        4575        then        25922918
when        4893        then        25923312
when        4615        then        25923020
when        4672        then        25923214
when        1103        then        25922893
when        602        then        25923290
when        1096        then        25922993
when        441        then        25923092
when        419        then        25923191
when        1023        then        25922994
when        1095        then        25922894
when        1192        then        25923093
when        1097        then        25923291
when        609        then        25922995
when        12        then        25922895
when        976        then        25923192
when        975        then        25923094
when        731        then        25922996
when        156        then        25922896
when        632        then        25923292
when        136        then        25923193
when        637        then        25923095
when        1186        then        25922997
when        1088        then        25922897
when        1104        then        25923194
when        1189        then        25923293
when        978        then        25923096
when        206        then        25922998
when        733        then        25922898
when        1006        then        25923195
when        1316        then        25923097
when        147        then        25923294
when        1194        then        25922999
when        1320        then        25922899
when        1187        then        25923196
when        173        then        25923098
when        1002        then        25923000
when        1183        then        25922900
when        1198        then        25923295
when        1321        then        25923197
when        1435        then        25923099
when        1325        then        25923001
when        1485        then        25922901
when        1120        then        25923296
when        1828        then        25923198
when        1837        then        25923002
when        1812        then        25923100
when        1821        then        25922902
when        1824        then        25923199
when        1833        then        25923297
when        1869        then        25923003
when        1816        then        25923101
when        1955        then        25922903
when        1954        then        25923004
when        1484        then        25923200
when        1950        then        25923102
when        1949        then        25922904
when        1948        then        25923298
when        1835        then        25923005
when        2284        then        25923103
when        1813        then        25923201
when        2017        then        25922905
when        2024        then        25923299
when        2016        then        25923006
when        2491        then        25923104
when        2492        then        25923202
when        2495        then        25922906
when        2497        then        25923007
when        2494        then        25923300
when        2493        then        25923105
when        2694        then        25923203
when        2498        then        25922907
when        2496        then        25923008
when        2573        then        25923301
when        2695        then        25923106
when        3151        then        25923009
when        2969        then        25923107
when        2        then        25922886
when        97        then        25922887
when        149        then        25922986
when        54        then        25922987
when        190        then        25923086
when        103        then        25923087
when        13        then        25923186
when        151        then        25923286
when        85        then        25923287
when        123        then        25923187
when        18        then        25922888
when        155        then        25922988
when        195        then        25922989
when        11        then        25923088
when        154        then        25923089
when        153        then        25923090
when        153        then        25922889
when        111        then        25923188
when        19        then        25922890
when        221        then        25922990
when        610        then        25922991
when        130        then        25923288
when        199        then        25923189
when        226        then        25923190
when        225        then        25922891
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