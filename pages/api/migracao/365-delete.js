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
    // Lista de IDs para exclusão
    const idsParaExcluir = [
        638708,
  638707,
  638710,
  638709,
  638712,
  638711,
  638714,
  638713,
  638706,
  638705,
  638724,
  638723,
  638726,
  638725,
  638728,
  638727,
  638730,
  638729,
  638716,
  638715,
  638718,
  638717,
  638720,
  638719,
  638722,
  638721,
  638740,
  638739,
  638742,
  638741,
  638744,
  638743,
  638746,
  638745,
  638732,
  638731,
  638734,
  638733,
  638736,
  638735,
  638738,
  638737,
  638756,
  638755,
  638758,
  638757,
  638760,
  638759,
  638762,
  638761,
  638748,
  638747,
  638750,
  638749,
  638752,
  638751,
  638754,
  638753,
  638772,
  638771,
  638774,
  638773,
  638776,
  638775,
  638778,
  638777,
  638764,
  638763,
  638766,
  638765,
  638768,
  638767,
  638770,
  638769,
  638788,
  638787,
  638790,
  638789,
  638792,
  638791,
  638794,
  638793,
  638780,
  638779,
  638782,
  638781,
  638784,
  638783,
  638786,
  638785,
  638803,
  638806,
  638805,
  638808,
  638823,
  638826,
  638825,
  638812,
  638811,
  638814
    ];

    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "TRIBUTOS2024"
        const selectDatabaseQuery = 'USE CONTABIL2024';
        await masterConnection.query(selectDatabaseQuery);

        // Iterar sobre a lista de IDs e enviar uma solicitação de exclusão para cada um
        for (const id of idsParaExcluir) {
            const deletePayload = {
                idIntegracao: id.toString(),
                idGerado: {
                    id: id
                },
                content: {
                    exercicio: 2024
                }
            };

            console.log(JSON.stringify(deletePayload));

            const response = await fetch('https://pla-sl-rest.betha.cloud/planejamento/service-layer/v2/api/receitas-loa', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                },
                body: JSON.stringify(deletePayload)
            });

            if (response.ok) {
                console.log(`Registro com ID ${id} excluído com sucesso.`);
            } else {
                console.error(`Erro ao excluir o registro com ID ${id}:`, response.statusText);
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
