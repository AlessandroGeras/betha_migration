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
        722977,
        722995,
        723007,
        723008,
        723021,
        723022,
        723016,
        721667,
        721668,
        721669,
        721670,
        721671,
        721672,
        721673,
        721674,
        721675,
        721676,
        721677,
        721678,
        721679,
        721680,
        722820,
        722827,
        722828,
        722835,
        722836,
        722923,
        722924,
        722931,
        721681,
        721682,
        721689,
        722838,
        722840,
        722843,
        722844,
        722845,
        722846,
        722847,
        722848,
        721683,
        721684,
        721691,
        721692,
        721699,
        721700,
        721707,
        721708,
        721715,
        721716,
        721723,
        721724,
        721731,
        721732,
        722851,
        721685,
        721686,
        721693,
        721694,
        721701,
        721702,
        721709,
        721710,
        721717,
        721718,
        721725,
        721726,
        721733,
        721734,
        721741,
        721742,
        721749,
        721750,
        721757,
        721758,
        721687,
        721688,
        721695,
        721696,
        721703,
        721704,
        721711,
        721712,
        721719,
        721720,
        721727,
        721728,
        721735,
        721736,
        721743,
        721744,
        721751,
        721752,
        721759,
        721760,
        721767,
        721768,
        721775,
        721776,
        721783
    ];

    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "TRIBUTOS2024"
        const selectDatabaseQuery = 'USE TRIBUTOS2024';
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

            const response = await fetch('https://patrimonio.betha.cloud/patrimonio-services/api/bens', {
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

        // Escrever os registros a serem excluídos no arquivo delete.json
        fs.writeFileSync('delete.json', JSON.stringify(registrosParaExcluir, null, 2), 'utf-8');
        console.log('Registros para exclusão foram salvos em delete.json');

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
