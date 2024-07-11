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

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "FOLHADB"
        const selectDatabaseQuery = 'USE FOLHA_FMS';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
cd_cargofuncao as idIntegracao,
JSON_QUERY(
    (SELECT
        ds_CargoFuncao as descricao,
        'MENSALISTA' as unidadePagamento,
        '1900-01-01 20:46:10.389' as inicioVigencia,
        JSON_QUERY(
    (SELECT
        '5175235' as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS ato,
        JSON_QUERY(
    (SELECT
        '11621' as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS tipo,
        JSON_QUERY(
    (SELECT
        case nr_CBO 
        WHEN  111220 THEN 2595
        WHEN  111250 THEN 2194
        WHEN  111255 THEN 3405
        WHEN  111415 THEN 753
        WHEN  123105 THEN 676
        WHEN  141605 THEN 1128
        WHEN  142405 THEN 1110
        WHEN  214205 THEN 859
        WHEN  223232 THEN 409
        WHEN  223505 THEN 837
        WHEN  225125 THEN 1608
        WHEN  232105 THEN 2315
        WHEN  232120 THEN 2333
        WHEN  232140 THEN 2357
        WHEN  232155 THEN 2382
        WHEN  232165 THEN 2401
        WHEN  234624 THEN 2377
        WHEN  239405 THEN 508
        WHEN  239415 THEN 2097
        WHEN  241225 THEN 2235
        WHEN  251505 THEN 2486
        WHEN  251605 THEN 178
        WHEN  254410 THEN 1017
        WHEN  321110 THEN 3152
        WHEN  322205 THEN 3167
        WHEN  322230 THEN 217
        WHEN  331205 THEN 2390
        WHEN  334105 THEN 1222
        WHEN  334110 THEN 1223
        WHEN  351105 THEN 3164
        WHEN  372205 THEN 1932
        WHEN  410105 THEN 2635
        WHEN  411005 THEN 220
        WHEN  411010 THEN 173
        WHEN  412110 THEN 675
        WHEN  513205 THEN 548
        WHEN  514120 THEN 3423
        WHEN  514225 THEN 2963
        WHEN  514325 THEN 2948
        WHEN  515105 THEN 41
        WHEN  515120 THEN 3418
        WHEN  516610 THEN 2601
        WHEN  517420 THEN 3412
        WHEN  519935 THEN 1305
        WHEN  632120 THEN 1850
        WHEN  715115 THEN 1790
        WHEN  715125 THEN 1892
        WHEN  715130 THEN 1848
        WHEN  715210 THEN 2099
        WHEN  715505 THEN 324
        WHEN  782305 THEN 1572
        WHEN  782410 THEN 1577
        WHEN  782510 THEN 1571
        WHEN  841408 THEN 4217
        WHEN  919205 THEN 1407
        WHEN  951105 THEN 808
        WHEN  992115 THEN 287
                WHEN  9921   THEN 287
                WHEN  223410 THEN 989
                WHEN  141420 THEN 7628
    WHEN  142335 THEN 3876
    WHEN  223305 THEN 1652
    WHEN  223705 THEN 674
    WHEN  223710 THEN 1667
    WHEN  231210 THEN 2392
    WHEN  231340 THEN 2381
    WHEN  232135 THEN 2353
    WHEN  234810 THEN 2304
    WHEN  241005 THEN 24
    WHEN  252205 THEN 203
    WHEN  252305 THEN 2592
    WHEN  254420 THEN 3210
    WHEN  261110 THEN 172
    WHEN  261210 THEN 3870
    WHEN  321105 THEN 3153
    WHEN  511205 THEN 1015
    WHEN  514215 THEN 3389
        WHEN 142105 THEN 1102
        WHEN 513425 THEN 509
                end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS cbo,
'true' as pagaDecimoTerceiroSalario,
'NAO' AS contagemEspecial,
'NAO_ACUMULAVEL' AS acumuloCargos,
'true' AS dedicacaoExclusiva,
 qt_VagasCargo AS quantidadeVagas,
 qt_VagasReser AS quantidadeVagasPcd
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS conteudo
from FOLHCargoFuncao 
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const conteudo = JSON.parse(record.conteudo);

            return {
                idIntegracao: record.idIntegracao, // ID de integração
                conteudo: {
                    descricao: conteudo.descricao,
                    unidadePagamento: conteudo.unidadePagamento,
                    inicioVigencia: conteudo.inicioVigencia,
                    ato: {
                        id: parseInt(conteudo.ato.id)
                    },
                    tipo: {
                        id: parseInt(conteudo.tipo.id)
                    },
                    cbo: {
                        id: parseInt(conteudo.cbo.id)
                    },
                    pagaDecimoTerceiroSalario: conteudo.pagaDecimoTerceiroSalario === 'true',
                    contagemEspecial: conteudo.contagemEspecial,
                    acumuloCargos: conteudo.acumuloCargos,
                    dedicacaoExclusiva: conteudo.dedicacaoExclusiva === 'true',
                    quantidadeVagas: parseInt(conteudo.quantidadeVagas),
                    quantidadeVagasPcd: parseInt(conteudo.quantidadeVagasPcd)
                }
            };
        });

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        for (const record of transformedData) {
            const response = await fetch('https://pessoal.betha.cloud/service-layer/v1/api/cargo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                },
                body: JSON.stringify(record)
            });

            if (response.ok) {
                console.log(`Dados do registro enviados com sucesso para a rota.`);
            } else {
                console.error(`Erro ao enviar os dados do registro para a rota:`, response.statusText);
            }
        }

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
