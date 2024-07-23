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
        const selectDatabaseQuery = 'USE COMP_ALMO_CAM';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            WITH CTE AS (
    SELECT 
        JSON_QUERY((SELECT nr_requisicao AS id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS solicitacao,
        JSON_QUERY((SELECT COMPRequisicaoItens.cd_produto AS id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS material,
        nr_requisicao AS numero,
        qt_requisicao AS quantidade,
        ALMOProdutos.vl_precoatual AS valorUnitario,
        COALESCE(qt_aprovada, qt_requisicao) * ALMOProdutos.vl_precoatual AS valorTotal,
        JSON_QUERY((SELECT 'EM_COTACAO' AS valor FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS status,
        qt_aprovada AS qtdAprovada,
        ROW_NUMBER() OVER (PARTITION BY nr_requisicao ORDER BY nr_requisicao) AS row_num
    FROM COMPRequisicaoItens
    JOIN ALMOProdutos ON COMPRequisicaoItens.cd_produto = ALMOProdutos.cd_produto
)
SELECT 
    solicitacao,
    material,
    numero,
    quantidade,
    valorUnitario,
    valorTotal,
    status,
    qtdAprovada
FROM CTE
WHERE row_num = 1;
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const solicitacao = JSON.parse(record.solicitacao);
            const material = JSON.parse(record.material);
            const status = JSON.parse(record.status);

            return {
                conteudo:{
                //idGerado:parseInt(solicitacao.id, 10),
                solicitacao: {
                    id: parseInt(solicitacao.id, 10)
                },
                material: {
                    id: parseInt(material.id, 10)
                },
                numero: record.numero,
                quantidade: record.quantidade,
                valorUnitario: record.valorUnitario,
                valorTotal: record.valorTotal,
                status: {
                    valor: status.valor
                },
                qtdAprovada: record.qtdAprovada
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
            const response = await fetch('https://compras.betha.cloud/compras-services/api/conversoes/lotes/solicitacao-itens', {
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
