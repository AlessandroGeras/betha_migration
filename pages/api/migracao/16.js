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

        // Selecionar o banco de dados "COMP_ALMO"
        const selectDatabaseQuery = 'USE COMP_ALMO_CAM';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
nr_cotacao as numero,
dt_abertura as dataCotacao,
dt_limite as dataValidade,
ds_objeto as objeto,
JSON_QUERY(
    (SELECT
fj.cd_formajulgamento as valor,
case fj.cd_formajulgamento 
when 1 then 'MENOR_PRECO_GLOBAL'
else 'MENOR_PRECO_POR_ITEM'
end as descricao
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS formaClassificacao,
JSON_QUERY(
    (SELECT
'VALOR_MEDIO' as valor,
'VALOR_MEDIO' as descricao
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS tipoPreco
from COMPCotacao c
join COMPLicitacaoFormaJulgamento fj on fj.cd_formajulgamento = c.cd_formajulgamento
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const formaClassificacao = JSON.parse(record.formaClassificacao);
            const tipoPreco = JSON.parse(record.tipoPreco);
            return {
                conteudo: {
                    numero: record.numero,
                    dataCotacao: record.dataCotacao,
                    dataValidade: record.dataValidade,
                    objeto: record.objeto,
                    formaClassificacao: {
                        valor: String(formaClassificacao.valor), // Ensure the valor is a string
                        descricao: formaClassificacao.descricao
                    },
                    tipoPreco: {
                        valor: tipoPreco.valor,
                        descricao: tipoPreco.descricao
                    }
                }
            };
        });

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        for (const record of transformedData) {
            try {
                const response = await fetch('https://compras.betha.cloud/compras-services/api/conversoes/lotes/cotacoes', {
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
            } catch (error) {
                console.error('Erro durante o envio do registro:', error);
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
