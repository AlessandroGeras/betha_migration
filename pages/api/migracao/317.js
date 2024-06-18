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

        // Selecionar o banco de dados "FOLHA_FMAS"
        const selectDatabaseQuery = 'USE FOLHA_FMAS';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
                ROW_NUMBER() OVER (ORDER BY cd_funcionario) AS idIntegracao,
                JSON_QUERY(
                    (SELECT
                        JSON_QUERY(
                            (SELECT
                                cd_funcionario as id
                            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                        ) AS matricula,
                        anomescalculo as competencia,
                        dt_iniciogozo as dataInicialGozo,
                        dt_terminogozo as dataFinalGozo,
                        qt_diasabono as diasAbono,
                        (qt_dias - qt_diasabono) as diasGozo,
                        CASE fl_adto13sal
                            WHEN 'N' THEN 'FALSE'
                            WHEN 'S' THEN 'TRUE'
                            ELSE 'FALSE'
                        END AS pagarDecimoTerceiroSalario
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS conteudo
            from FOLHFuncProgFerias
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const conteudo = JSON.parse(record.conteudo); // Parse the JSON string to an object

            return {
                idIntegracao: record.idIntegracao.toString(), // Convert idIntegracao to string
                conteudo: {
                    matricula: conteudo.matricula,
                    competencia: conteudo.competencia,
                    dataInicialGozo: conteudo.dataInicialGozo,
                    dataFinalGozo: conteudo.dataFinalGozo,
                    pagarDecimoTerceiroSalario: conteudo.pagarDecimoTerceiroSalario === 'TRUE',
                    pagarUmTercoIntegral: true, // Assuming this is always true as per your template
                    diasAbono: conteudo.diasAbono,
                    diasGozo: conteudo.diasGozo
                }
            };
        });

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        for (const record of transformedData) {
            const response = await fetch('https://pessoal.betha.cloud/service-layer/v1/api/programacao-ferias', {
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
