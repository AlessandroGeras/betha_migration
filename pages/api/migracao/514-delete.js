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
        140405313, 140405314, 140405315, 140405316, 140405317, 140405318, 140405319, 140405320, 140405321, 140405322, 
        140405323, 140405324, 140405325, 140405326, 140405327, 140405328, 140405329, 140405330, 140405331, 140405332, 
        140405433, 140405434, 140405435, 140405436, 140405437, 140405438, 140405439, 140405440, 140405441, 140405442, 
        140405443, 140405444, 140405445, 140405446, 140405447, 140405448, 140405449, 140405450, 140405451, 140405452, 
        140405453, 140405454, 140405455, 140405456, 140405457, 140405458, 140405459, 140405460, 140405461, 140405462, 
        140405463, 140405464, 140405465, 140405466, 140405467, 140405468, 140405469, 140405470, 140405471, 140405472, 
        140405493, 140405494, 140405495, 140405496, 140405497, 140405498, 140405499, 140405500, 140405501, 140405502, 
        140405503, 140405504, 140405505, 140405506, 140405507, 140405508, 140405509, 140405510
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
                idIntegracao: id,
                receitasDiversas: {
                    idGerado: {
                        id: id
                    }
                }
            };

            // Log do corpo da requisição
            console.log(`Corpo da requisição para o registro com ID ${id}:`, JSON.stringify(deletePayload, null, 2));

            const response = await fetch('https://tributos.betha.cloud/service-layer-tributos/api/receitasDiversas', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                },
                body: JSON.stringify(deletePayload)
            });

            const apiResponse = await response.json();
            console.log(`Retorno da API para o registro com ID ${id}:`, apiResponse);
        }

    } catch (error) {
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        await sql.close();
    }
}

// Chamar a função principal
main();
