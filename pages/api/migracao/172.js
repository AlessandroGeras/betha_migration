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

        // Selecionar o banco de dados "COMP_ALMO_CAM"
        const selectDatabaseQuery = 'USE COMP_ALMO';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            SELECT 
mc.cd_modalidade as id,
mc.ds_modalidade as descricao,
JSON_QUERY(
    (SELECT
        case mc.cd_modalidade
        WHEN  2 THEN 'DIALOGO_COMPETITIVO'
        WHEN  3 THEN 'CONCURSO'
        WHEN  4 THEN 'CONCORRENCIA'
        WHEN  5 THEN 'CONCORRENCIA'
        WHEN  6 THEN 'PREGAO_ELETRONICO'
        WHEN  7 THEN 'PREGAO_PRESENCIAL'
        WHEN  8 THEN 'DISPENSA_LICITACAO'
        WHEN  9 THEN 'INEXIGIBILIDADE'
        WHEN  10 THEN 'MANIFESTACAO_INTERESSE'
        WHEN  11 THEN 'OUTRO'
        WHEN  12 THEN 'OUTRO'
        end as valor,
        mc.ds_modalidade descricao
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS modalidadeLegal,
  case mc.cd_modalidade
        WHEN  2 THEN 'DIC'
        WHEN  3 THEN 'CON'
        WHEN  4 THEN 'COE'
        WHEN  5 THEN 'COP'
        WHEN  6 THEN 'PRE'
        WHEN  7 THEN 'PRP'
        WHEN  8 THEN 'DIL'
        WHEN  9 THEN 'INE'
        WHEN  10 THEN 'MAI'
        WHEN  11 THEN 'PRQ'
        WHEN  12 THEN 'CRE'
        end  as sigla,
 '999999999999.99' as valorCompras,
 '999999999999.99' as valorObras
FROM PNCP_ModalidadeCompra mc
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const modalidadeLegal = JSON.parse(record.modalidadeLegal);
            return {
                descricao: record.descricao,
                modalidadeLegal: modalidadeLegal,
                sigla: record.sigla,
                valorCompras: parseFloat(record.valorCompras),
                valorObras: parseFloat(record.valorObras)
            };
        });

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        for (const record of transformedData) {
            const response = await fetch('https://compras.betha.cloud/compras-services/api/modalidades-licitacao', {
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
