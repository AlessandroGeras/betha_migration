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

        // Selecionar o banco de dados "TRIBUTOS2024"
        const selectDatabaseQuery = 'USE COMP_ALMO_CAM';
        await masterConnection.query(selectDatabaseQuery);

        function formatDate(date) {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = (`0${d.getMonth() + 1}`).slice(-2);
            const day = (`0${d.getDate()}`).slice(-2);
            const hours = (`0${d.getHours()}`).slice(-2);
            const minutes = (`0${d.getMinutes()}`).slice(-2);
            const seconds = (`0${d.getSeconds()}`).slice(-2);
            return `${year}-${month}-${day}`;
        }

        // Executar a consulta SQL
        const userQuery = `
            SELECT
                JSON_QUERY(
                    (SELECT '17573' AS id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS parametroExerc,
                dt_abertura AS dataProcesso,
                nr_processo AS numeroProcesso,
                aa_processo AS anoProtocolo,
                'false' AS previsaoSubcontratacao,
                JSON_QUERY(
                    (SELECT 'QUANTIDADE' AS valor, 'QUANTIDADE' AS descricao FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS controleSaldo,
                'false' AS orcamentoSigiloso,
                ds_justificativa AS justificativa,
                ds_objeto AS objeto
            FROM COMPLicitacao
            WHERE aa_processo = 2024
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => ({
            conteudo:{
            parametroExerc: {
                id: parseInt(JSON.parse(record.parametroExerc).id)
            },
            dataProcesso: formatDate(record.dataProcesso),
            numeroProcesso: record.numeroProcesso,
            anoProtocolo: record.anoProtocolo,
            controleSaldo: {
                valor: JSON.parse(record.controleSaldo).valor,
                descricao: JSON.parse(record.controleSaldo).descricao
            },
            previsaoSubcontratacao: record.previsaoSubcontratacao === 'false' ? false : true,
            orcamentoSigiloso: record.orcamentoSigiloso === 'false' ? false : true,
            justificativa: record.justificativa,
            objeto: record.objeto
    }}));

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const response = await fetch('https://compras.betha.cloud/compras-services/api/conversoes/lotes/processos-administrativo', {
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
