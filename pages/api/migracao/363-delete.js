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
        516410,
  516413,
  516416,
  516419,
  516422,
  516428,
  516411,
  516414,
  516417,
  516420,
  516423,
  516426,
  516412,
  516415,
  516418,
  516421,
  516424,
  516427
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

            const response = await fetch('https://pla-sl-rest.betha.cloud/planejamento/service-layer/v2/api/grupos-despesas-loa', {
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
