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
        'INTEGRACAO1', 'INTEGRACAO2', 'INTEGRACAO3', 'INTEGRACAO4', 'INTEGRACAO5', 'INTEGRACAO6', 
  'INTEGRACAO7', 'INTEGRACAO8', 'INTEGRACAO9', 'INTEGRACAO10', 'INTEGRACAO11', 'INTEGRACAO12', 
  'INTEGRACAO13', 'INTEGRACAO14', 'INTEGRACAO15', 'INTEGRACAO16', 'INTEGRACAO17', 'INTEGRACAO18', 
  'INTEGRACAO19', 'INTEGRACAO20', 'INTEGRACAO21', 'INTEGRACAO22', 'INTEGRACAO23', 'INTEGRACAO24', 
  'INTEGRACAO25', 'INTEGRACAO26', 'INTEGRACAO27', 'INTEGRACAO28', 'INTEGRACAO29', 'INTEGRACAO30', 
  'INTEGRACAO31', 'INTEGRACAO32', 'INTEGRACAO33', 'INTEGRACAO34', 'INTEGRACAO35', 'INTEGRACAO36', 
  'INTEGRACAO37', 'INTEGRACAO38', 'INTEGRACAO39', 'INTEGRACAO40', 'INTEGRACAO41', 'INTEGRACAO42', 
  'INTEGRACAO43', 'INTEGRACAO44', 'INTEGRACAO45', 'INTEGRACAO46', 'INTEGRACAO47', 'INTEGRACAO48', 
  'INTEGRACAO49', 'INTEGRACAO50', 'INTEGRACAO51', 'INTEGRACAO52', 'INTEGRACAO53', 'INTEGRACAO54', 
  'INTEGRACAO55', 'INTEGRACAO56', 'INTEGRACAO57', 'INTEGRACAO58', 'INTEGRACAO59', 'INTEGRACAO60', 
  'INTEGRACAO61', 'INTEGRACAO62', 'INTEGRACAO63', 'INTEGRACAO64'
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
                idIntegracao: `INTEGRACAO${id}`,
                pessoas: {
                    idGerado: {
                        id: id
                    }
                }
            };

            const response = await fetch('https://tributos.betha.cloud/service-layer-tributos/api/livrosDividas/', {
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
