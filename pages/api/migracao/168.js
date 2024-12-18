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

        // Selecionar o banco de dados "FOLHA_CAM"
        const selectDatabaseQuery = 'USE COMP_ALMO_CAM';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            SELECT 
cd_criteriojulgamento as id,
ds_criteriojulgamento as descricao,
JSON_QUERY(
    (SELECT
        'ITEM' as valor,
        'ITEM' as descricao
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS tipoJulgamento,
JSON_QUERY(
    (SELECT
        case cd_criteriojulgamento
         WHEN  1 THEN 'MENOR_PRECO'
        WHEN  2 THEN 'MELHOR_LANCE_OFERTA'
        WHEN  3 THEN 'MELHOR_TECNICA'
        WHEN  4 THEN 'TECNICA_PRECO'
        WHEN  5 THEN 'MAIOR_LANCE'
        WHEN  6 THEN 'MAIOR_RETORNO'
        WHEN  7 THEN 'NAO_APLICA'
                end as valor,
                ds_criteriojulgamento as descricao
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS tipoLicitacao,
JSON_QUERY(
    (SELECT
        'NENHUMA' as valor,
        'NENHUMA' as descricao
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS formaEspecial
FROM PNCP_CriterioJulgamento
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const tipoJulgamento = JSON.parse(record.tipoJulgamento);
            const tipoLicitacao = JSON.parse(record.tipoLicitacao);
            const formaEspecial = JSON.parse(record.formaEspecial);

            return {
                descricao: record.descricao,
                tipoLicitacao: tipoLicitacao,
                tipoJulgamento: tipoJulgamento,
                formaEspecial: formaEspecial
            };
        });

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        for (const record of transformedData) {
            const response = await fetch('https://compras.betha.cloud/compras-services/api/formas-julgamento', {
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
