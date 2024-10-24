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
        151290, 151293, 151296, 151299, 151302, 151305, 151308, 151311, 151314,
        151317, 151320, 151323, 151325, 151326, 151327, 151328, 151329, 151330,
        151331, 151332, 151333, 151334, 151335, 151336, 151337, 151338, 151339,
        151340, 151341, 151342, 151343, 151344, 151345, 151346, 151347, 151348,
        151351, 151354, 151357, 151360, 151363, 151366, 151369, 151373, 151376,
        151379, 151382, 151385, 151388, 151391, 151393, 151349, 151352, 151355,
        151358, 151361, 151364, 151367, 151370, 151371, 151374, 151377, 151380,
        151383, 151386, 151389, 151350, 151353, 151356, 151359, 151362, 151365,
        151368, 151372, 151375, 151378, 151381, 151384
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

            const response = await fetch('https://pla-sl-rest.betha.cloud/planejamento/service-layer/v2/api/produtos', {
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
