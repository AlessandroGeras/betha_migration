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
    // Lista de IDs para exclusão
    const idsParaExcluir = [
        156832,
        156845,
        156834,
        156835,
        156837,
        156840,
        156842,
        156844,
        156838,
        156833,
        156836,
        156839,
        156841,
        156843
    ];

    // Lista para armazenar os registros a serem excluídos
    const registrosParaExcluir = [];

    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "TRIBUTOS2024"
        const selectDatabaseQuery = 'USE CONTABIL2024';
        await masterConnection.query(selectDatabaseQuery);

        // Iterar sobre a lista de IDs e criar a payload para cada um
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

            // Adicionar o registro à lista
            registrosParaExcluir.push(deletePayload);
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
