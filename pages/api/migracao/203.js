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

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "CONTABIL2024"
        const selectDatabaseQuery = 'USE CONTABIL2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            SELECT
ROW_NUMBER() OVER (ORDER BY AOI.cd_Cecam) as idIntegracao,
 JSON_QUERY(
        (SELECT 
                        AO.cd_Exercicio as exercicio,
                        AO.ds_Justificativa  as finalidade,
            JSON_QUERY((SELECT 2260 AS id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS tipo,
                        JSON_QUERY((SELECT CASE 
                                                   WHEN AOI.cd_AlteracaoOrcamentariaTipo = 2 THEN 'DIMINUTIVO'
                                                   ELSE 'AUMENTATIVO' 
                                           END AS impacto, AOI.vl_AlteracaoOrcamentaria AS valor,
                                           JSON_QUERY((SELECT 70152 AS id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS receita,
                                JSON_QUERY((SELECT JSON_QUERY((SELECT AOI.cd_DestinacaoRecursoDestino AS id, 
                                                                      AOI.vl_AlteracaoOrcamentaria as valor FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS recurso FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS recursos FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS receitas
         FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
    ) AS content
FROM CONTALTERACAOORCAMENTARIA  AO
LEFT JOIN CONTALTERACAOORCAMENTARIAITEM AOI ON AOI.cd_AlteracaoOrcamentaria = AO.cd_AlteracaoOrcamentaria  
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const content = JSON.parse(record.content); // Parse the JSON string to an object

            const recursosArray = content.receitas.recursos && content.receitas.recursos.recurso 
                ? [content.receitas.recursos.recurso] 
                : [];

            const receitasArray = content.receitas
                ? [{
                    receita: content.receitas.receita,
                    impacto: content.receitas.impacto,
                    valor: content.receitas.valor,
                    recursos: recursosArray.map(recurso => ({
                        recurso: {
                            id: parseInt(recurso.id), // Convert id to integer
                        },
                        valor: recurso.valor
                    }))
                }]
                : [];

            return {
                idIntegracao: record.idIntegracao.toString().replace(/\D/g, ''), // Remove any non-alphanumeric characters
                content: {
                    exercicio: content.exercicio,
                    tipo: {
                        id: content.tipo.id
                    },
                    finalidade: content.finalidade.substring(0, 255), // Truncate finalidade to 255 characters
                    receitas: receitasArray
                }
            };
        });

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const response = await fetch('https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/alteracoes-orcamentarias-receitas', {
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
        // Lidar com erros de conexão ou consulta aqui
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        await sql.close();
    }
}

// Chamar a função principal
main();
