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
            select 
                cd_receita as idIntegracao,
                JSON_QUERY(
                    (SELECT
                        cd_receita as iReceitas,
                        NULL as idIndexadores,
                        null as abreviatura,
                        ds_receita as descricao,
                        null as calculaImoveisRurais,
                        'SIM' AS emUso,
                        'SIM' AS flyProtocolo,
                        NULL AS tipoCadastro
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS creditosTributarios
            from CONTFichaReceita
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const creditosTributarios = JSON.parse(record.creditosTributarios); // Parse the JSON string to an object
            
            return {
                idIntegracao: record.idIntegracao,
                creditosTributarios: {
                    iReceitas: creditosTributarios.iReceitas,
                    idIndexadores: creditosTributarios.idIndexadores,
                    abreviatura: creditosTributarios.abreviatura,
                    descricao: creditosTributarios.descricao,
                    calculaImoveisRurais: creditosTributarios.calculaImoveisRurais,
                    emUso: creditosTributarios.emUso || 'SIM',  // Constant value
                    flyProtocolo: creditosTributarios.flyProtocolo || 'SIM',  // Constant value
                    tipoCadastro: creditosTributarios.tipoCadastro
                }
            };
        });

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        for (const record of transformedData) {
            const response = await fetch('https://tributos.betha.cloud/service-layer-tributos/api/creditosTributarios', {
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
