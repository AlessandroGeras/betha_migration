const sql = require('mssql');
const dotenv = require('dotenv');
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
    return `${year}-${month}-${day}`;
}

async function main() {
    try {
        const masterConnection = await connectToSqlServer();

        const selectDatabaseQuery = 'USE CONTABIL2024';
        await masterConnection.query(selectDatabaseQuery);

        const userQuery = `select
 ROW_NUMBER() OVER (ORDER BY cd_cecam) AS idIntegracao,
JSON_QUERY(
    (SELECT
 cd_Exercicio as exercicio,
 cd_PassivoNaoFinanceiro as numero,
 '2024-01-01' as data,
vl_PassivoNaoFinanceiro as valor,
JSON_QUERY(
    (SELECT
   22201 as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS tipo,
JSON_QUERY(
    (SELECT
  case cd_Fornecedor
  when        38        then        6114633
when        914        then        6113378
when        1382        then        6113563
when        1412        then        6113592
when        1423        then        6113603
when        1512        then        6113654
when        1513        then        6113658
when        1514        then        6113655
when        1515        then        6113659
when        1516        then        6113657
when        1544        then        6113685
when        1545        then        6113689
when        1546        then        6113690
when        1661        then        6113742
when        1859        then        6113889
end   as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS credor,
ds_PassivoNaoFinanceiro as especificacao,
JSON_QUERY(
    (SELECT
   '1' as numero,
   '2024-12-31' as dataVencimento,
   vl_PassivoNaoFinanceiro as valorPrincipal
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS parcelas
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
from CONTPASSIVONAOFINANCEIRO
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        const transformedData = resultData.map(record => {
            const content = JSON.parse(record.content);

            return {
                idIntegracao: record.idIntegracao.toString(),
                content: {
                    exercicio: content.exercicio,
                    numero: content.numero.toString(),
                    data: content.data,
                    valor: content.valor <= 0 ? 0.01 : content.valor,
                    tipo: {
                        id: content.tipo.id
                    },
                    credor: {
                        id: content.credor.id
                    },
                    especificacao: content.especificacao,
                    parcelas: [{
                        numero: parseInt(content.parcelas.numero),
                        dataVencimento: content.parcelas.dataVencimento,
                        valor: content.parcelas.valorPrincipal <= 0 ? 0.01 : content.parcelas.valorPrincipal
                    }]
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

        // Enviar cada registro individualmente para a rota desejada (comentar a seguir caso não precise)
        /*
        for (const record of transformedData) {
            const response = await fetch('https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/precatorios', {
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
        */

    } catch (error) {
        console.error('Erro durante a execução do programa:', error);
    } finally {
        await sql.close();
    }
}

main();
