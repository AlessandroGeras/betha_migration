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
CAST(lp.nm_funcionario AS varchar(max)) AS nome,
lp.ds_qualificacao AS complementofuncao,
CAST(1 AS BIT) AS ativo,
CASE 
    WHEN CAST(lp.nm_funcionario AS varchar(max)) = 'LUTERO ROSA PARAISO' THEN '698.686.462-00'
    WHEN CAST(lp.nm_funcionario AS varchar(max)) = 'JOSE AUREO TECHIO' THEN '319.101.673-20'
    WHEN CAST(lp.nm_funcionario AS varchar(max)) = 'FRANCIELE SIMINHUK' THEN '009.196.192-07'
        WHEN CAST(lp.nm_funcionario AS varchar(max)) = 'JULISNEI RODRIGUES LAURO' THEN '025.045.092-51'
    ELSE CAST(lp.nm_funcionario AS varchar(max))
END AS cpf
FROM COMPLicitacaoPregaoEquipe lp;
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            // Remover pontos e hifens do CPF
            const cleanedCpf = record.cpf.replace(/[.\-]/g, '');

            return {
                conteudo:{
                    nome: record.nome,
                    cpf: cleanedCpf,
                    ativo: record.ativo,
                    complementofuncao: record.complementofuncao
            }};
        });

        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const response = await fetch('https://services.almoxarifado.betha.cloud/estoque-services/api/conversoes/lotes/responsaveis', {
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
