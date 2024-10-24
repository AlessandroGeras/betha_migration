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
}

function formatDate2(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    const hours = (`0${d.getHours()}`).slice(-2);
    const minutes = (`0${d.getMinutes()}`).slice(-2);
    const seconds = (`0${d.getSeconds()}`).slice(-2);
    return `${year}`;
}

async function main() {
    try {
        const masterConnection = await connectToSqlServer();

        const selectDatabaseQuery = 'USE COMP_ALMO';
        await masterConnection.query(selectDatabaseQuery);

        const userQuery = `
            select 
ROW_NUMBER() OVER (ORDER BY cd_almoxa) AS id,
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
JSON_QUERY((SELECT '2087643' as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS organograma,
JSON_QUERY((SELECT case when cd_tipomovimento = 'CO' then 11099
                                                when cd_tipomovimento = 'CD' then 11097
                                                when cd_tipomovimento = 'AJS' then 11093
                                                when cd_tipomovimento = 'DS' then 11108
                                                when cd_tipomovimento = 'CDI' then 11106
                                                when cd_tipomovimento = 'BP' then 11096
                                   end as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS naturezaMovimentacao,
aa_movimento as dataSaida
from ALMOMovimentacao
where sg_direcao = 'S'
GROUP BY  cd_almoxa, cd_tipomovimento, aa_movimento
order by cd_almoxa asc
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;
        

        const transformedData = resultData.map(record => {
        
            return {
                context: {
                    almoxarifado: JSON.parse(record.almoxarifado).id.toString(),
                    exercicio: record.dataSaida.toString(),
                },
                conteudo: {                
                    almoxarifado: JSON.parse(record.almoxarifado),
                    organograma: {
                        id: parseInt(JSON.parse(record.organograma).id)
                    },
                    naturezaMovimentacao: {
                        id: parseInt(JSON.parse(record.naturezaMovimentacao).id, 10)
                    },
                    dataSaida: record.dataSaida+"-12-31 00:00:00"
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
        /* for (const record of transformedData) {
            const response = await fetch('https://almoxarifado.betha.cloud/estoque-services/api/conversoes/lotes/saidas', {
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
        } */

    } catch (error) {
        console.error('Erro durante a execução do programa:', error);
    } finally {
        await sql.close();
    }
}

main();
