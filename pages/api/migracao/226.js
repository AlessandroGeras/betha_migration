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
            SELECT 
                JSON_QUERY((SELECT cd_cecam AS id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS entidadeGestora,
                JSON_QUERY((SELECT cd_unidorca AS id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS localEntrega,
                nr_requisicao as codigo,
                dt_requisicao as data,
                cd_usuario as nomeSolicitante,
                ds_aplicacao as assunto,
                JSON_QUERY((SELECT CASE WHEN ds_aplicacao LIKE 'CONTRATAÇÃO%' OR ds_aplicacao LIKE 'ATENDER%' THEN 'SERVIÇO'
                                        ELSE 'MATERIAL'
                                   END AS valor FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS tipoNecessidade,
                ds_justificativa as objeto,
                ds_justificativa as justificativa,
                JSON_QUERY((SELECT 'EM_COTACAO' AS valor FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS status,
                JSON_QUERY((SELECT 'OK' AS valor FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS situacaoCadastral
            FROM COMPRequisicao
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const entidadeGestora = JSON.parse(record.entidadeGestora);
            const localEntrega = JSON.parse(record.localEntrega);
            const tipoNecessidade = JSON.parse(record.tipoNecessidade);
            const status = JSON.parse(record.status);
            const situacaoCadastral = JSON.parse(record.situacaoCadastral);

            // Formatar data no formato desejado "1899-12-30"
            const formattedDate = record.data ? new Date(record.data).toISOString().split('T')[0] : "1899-12-30";

            // Truncar o campo assunto para garantir que tenha no máximo 100 caracteres
            let assunto = record.assunto;
            if (assunto.length > 100) {
                assunto = assunto.substring(0, 100);
            }

            return {
                entidadeGestora: {
                    id: entidadeGestora.id
                },
                localEntrega: {
                    id: localEntrega.id
                },
                codigo: record.codigo,
                data: formattedDate,
                nomeSolicitante: record.nomeSolicitante,
                assunto: assunto,
                tipoNecessidade: {
                    valor: tipoNecessidade.valor
                },
                objeto: record.objeto,
                justificativa: record.justificativa,
                status: {
                    valor: status.valor
                },
                situacaoCadastral: {
                    valor: situacaoCadastral.valor
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
        /* for (const record of transformedData) {
            const response = await fetch('https://compras.betha.cloud/compras-services/api/conversoes/lotes/solicitacoes', {
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
