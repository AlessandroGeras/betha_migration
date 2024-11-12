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
cd_taxa as idIntegracao,
JSON_QUERY((SELECT
49218 as idIndexadores,
sg_taxa AS abreviatura,
ds_taxa as descricao,
'NAO' as calculaImoveisRurais,
'SIM' AS emUso,
'NAO' AS flyProtocolo,
'ECONOMICOS' AS tipoCadastro FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS creditosTributarios
from isstaxas where ds_taxa != 'TAXA DE CEMITERIO ADULTO' and ds_taxa != 'TAXA DE EXPEDIENTE' and ds_taxa != 'FISCALIZAÇÃO SANITÁRIA' and ds_taxa != 'AUT. IMPRESSÃO DOCUMENTOS FISCAIS' and ds_taxa != 'CERTIDÃO NEGATIVA' and ds_taxa != 'FORNECIMENTO DE 2ª VIA' and ds_taxa != 'TAXA DE HORA MAQUINA' and ds_taxa != 'VALORES DE JUROS E MULTAS'
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            if (!record.creditosTributarios) {
                console.error('Record without creditosTributarios:', record);
                return null;
            }
            
            const creditosTributarios = JSON.parse(record.creditosTributarios);

            return {
                idIntegracao: record.idIntegracao.toString(), // Convert idIntegracao to string
                creditosTributarios: {
                    idIndexadores: creditosTributarios.idIndexadores,
                    abreviatura: creditosTributarios.abreviatura,
                    descricao: creditosTributarios.descricao,
                    calculaImoveisRurais: creditosTributarios.calculaImoveisRurais,
                    emUso: creditosTributarios.emUso,
                    flyProtocolo: creditosTributarios.flyProtocolo,
                    tipoCadastro: creditosTributarios.tipoCadastro,
                }
            };
        });

        // Salvar os resultados transformados em um arquivo JSON
        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

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
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        sql.close();
    }
}

main();
