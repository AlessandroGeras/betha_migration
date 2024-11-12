const sql = require('mssql');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const fs = require('fs');

dotenv.config();

async function connectToSqlServer() {
    try {
        const config = {
            user: process.env.USERNAME_SQLSERVER,
            password: process.env.PASSWORD,
            server: process.env.SERVER,
            database: process.env.DATABASE,
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
        const masterConnection = await connectToSqlServer();
        await masterConnection.query('USE TRIBUTOS2024');

        const userQuery = `
            SELECT 
                ROW_NUMBER() OVER (ORDER BY cd_taxa) AS idIntegracao,
                JSON_QUERY(
                    (SELECT
                        ds_Taxa as descricao,
                        sg_Taxa as abreviatura,
                        'NAO' AS calculaImoveisRurais,
                        'SIM' AS emUso,
                        'NAO' AS flyProtocolo,
                        49218 as idIndexadores,
                        'ECONOMICOS' as tipoCadastro
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS creditosTributarios
            FROM issprecopublico
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        const transformedData = resultData.map(record => {
            const creditosTributarios = JSON.parse(record.creditosTributarios);

            return {
                idIntegracao: record.idIntegracao,
                creditosTributarios: {
                    idIndexadores: creditosTributarios.idIndexadores,
                    abreviatura: creditosTributarios.abreviatura,
                    descricao: creditosTributarios.descricao,
                    calculaImoveisRurais: creditosTributarios.calculaImoveisRurais,
                    emUso: creditosTributarios.emUso,
                    flyProtocolo: creditosTributarios.flyProtocolo,
                    tipoCadastro: creditosTributarios.tipoCadastro
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
        console.error('Erro durante a execução do programa:', error);
    } finally {
        await sql.close();
    }
}

main();
