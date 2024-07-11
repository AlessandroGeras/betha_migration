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

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "FOLHA_CAM"
        const selectDatabaseQuery = 'USE FOLHA_CAM';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
               select 
   cd_NivelEstrut as idIntegracao,
   JSON_QUERY(
    (SELECT
        ds_NivelEstrut as descricao,
        'true' as emUso,
           JSON_QUERY(
    (SELECT
    cd_NivelEstrut as nivel,
        ds_NivelEstrut as descricao,
        'PONTO' as separador,
        CASE cd_NivelEstrut
        WHEN 1 THEN 3
        WHEN 2 THEN 3
        WHEN 3 THEN 4
        WHEN 4 THEN 2
        END AS quantidadeDigitos
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS niveis
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS conteudo
   from FOLHNivelEstrut
   where aa_Exercicio = 2024 and cd_NivelEstrut < 5
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            // Parse the JSON content
            const content = JSON.parse(record.conteudo);

            // Ensure 'niveis' is an array
            const niveisArray = Array.isArray(content.niveis) ? content.niveis : [content.niveis];

            return {
                idIntegracao: record.idIntegracao.toString(), // Convert idIntegracao to string
                conteudo: {
                    descricao: content.descricao,
                    emUso: content.emUso, // Convert emUso to boolean
                    niveis: niveisArray.map(nivel => ({
                        nivel: nivel.nivel,
                        descricao: nivel.descricao,
                        quantidadeDigitos: nivel.quantidadeDigitos,
                        separador: nivel.separador
                    }))
                }
            };
        });

        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const response = await fetch('https://pessoal.betha.cloud/service-layer/v1/api/configuracao-organograma', {
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
        // Fechar a conexão com o SQL Server
        sql.close();
    }
}

main();
