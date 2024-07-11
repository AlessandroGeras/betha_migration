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

        // Selecionar o banco de dados "TRIBUTOS2024"
        const selectDatabaseQuery = 'USE TRIBUTOS2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            SELECT 
                Cd_Taxa AS idIntegracao,
                JSON_QUERY(
                    (SELECT
                        '133902' AS idAtoExecucaoFiscal,
                        '133902' AS idAtoInscrito,
                        '133902' AS idAtoNaoInscrito,
                        ds_Taxa AS descricao,
                        sg_Taxa AS abreviatura,
                        '34' AS codigoTCE,
                        CASE 
                            WHEN CD_TAXA IN (30,31,32,33,34,35,36,37,38,39,40,41,45,50,52,53,54,59,62,63,64,65,66,67,68,69,70,71,72) THEN 'NAO_TRIBUTARIA'
                            ELSE 'TAXA'
                        END AS classificacao, 
                        'AMBOS' AS tipoVinculoAtoInscrito,
                        'AMBOS' AS tipoVinculoAtoNaoInscrito,
                        'SIM' AS inscDividaAtiva,
                        'false' AS cobancaCompartilhada,
                        'false' AS naoContabilizavel
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS receitas
            FROM ISSTaxas
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            // Parse the JSON content
            const content = JSON.parse(record.receitas);

            return {
                idIntegracao: record.idIntegracao.toString(), // Convert idIntegracao to string
                receitas: {
                    idAtoExecucaoFiscal: content.idAtoExecucaoFiscal,
                    idAtoInscrito: content.idAtoInscrito,
                    idAtoNaoInscrito: content.idAtoNaoInscrito,
                    descricao: content.descricao,
                    abreviatura: content.abreviatura.substring(0, 6), // Truncate abreviatura to 6 characters
                    codigoTCE: content.codigoTCE,
                    classificacao: content.classificacao,
                    tipoVinculoAtoInscrito: content.tipoVinculoAtoInscrito,
                    tipoVinculoAtoNaoInscrito: content.tipoVinculoAtoNaoInscrito,
                    inscDividaAtiva: content.inscDividaAtiva,
                    cobancaCompartilhada: content.cobancaCompartilhada,
                    naoContabilizavel: content.naoContabilizavel,
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
        for (const record of transformedData) {
            const response = await fetch('https://tributos.betha.cloud/service-layer-tributos/api/receitas', {
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
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        sql.close();
    }
}

main();
