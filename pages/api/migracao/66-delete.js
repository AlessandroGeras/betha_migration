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

async function logResponse(id, responseText) {
    const logMessage = `ID: ${id}\nResposta: ${responseText}\n\n`;
    fs.appendFileSync('delete_log.txt', logMessage, (err) => {
        if (err) {
            console.error('Erro ao gravar no log:', err);
        }
    });
}

async function main() {
    const idsParaExcluir = [
        5287,
  5295,
  5288,
  5265,
  5266,
  5268,
  5243,
  5244,
  5245,
  5248,
  5267,
  5269,
  5261,
  5298,
  5478,
  5293,
  5270,
  5262,
  5290,
  5254,
  5246,
  5257,
  5252,
  5271,
  5279
    ];

    try {
        const masterConnection = await connectToSqlServer();
        await masterConnection.query('USE CONTABIL2024');

        for (const id of idsParaExcluir) {
            const deletePayload = [
                {
                    idIntegracao: id.toString(),
                    idGerado: { id: id },
                    content: { exercicio: 2024 }
                }
            ];

            console.log(JSON.stringify(deletePayload));

            const response = await fetch('https://patrimonio.betha.cloud/patrimonio-services/api/tipos-bem', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                },
                body: JSON.stringify(deletePayload)
            });

            const responseText = await response.text();

            if (response.ok) {
                console.log(`Registro com ID ${id} excluído com sucesso.`);
            } else {
                console.error(`Erro ao excluir o registro com ID ${id}:`, response.statusText, responseText);
            }

            // Registrar a resposta no log
            await logResponse(id, responseText);
        }

    } catch (error) {
        console.error('Erro durante a execução do programa:', error);
    } finally {
        await sql.close();
    }
}

main();