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

        // Selecionar o banco de dados "TRIBUTOS2024"
        const selectDatabaseQuery = 'USE FOLHA_CAM';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
JSON_QUERY(
    (SELECT
        ev.ds_Evento as tipo,
        em.dt_Emprestimo as dataInicial
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS conteudo,
JSON_QUERY(
    (SELECT
     em.cd_Funcionario as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS matricula,
em.dt_PrimeiraParcela as dataInicioDescont,
qt_Parcelas as numeroParcelas,
qt_Parcelas * vl_Parcelas as valorTotal,
JSON_QUERY(
    (SELECT
     vl_Parcelas as valorParcela
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS parcelas,
CASE 
        WHEN fl_quitacao = 'S' THEN 'QUITADO'
        WHEN fl_quitacao = 'N' THEN 'EM_ANDAMENTO'
        ELSE 'Status Desconhecido'
    END AS situacao
from FOLHEmprestimos em
join FOLHEvento ev on ev.cd_Evento = em.cd_Evento
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const conteudo = JSON.parse(record.conteudo); // Parse the JSON string to an object
            const matricula = JSON.parse(record.matricula);
            const parcelas = JSON.parse(record.parcelas);

            return {
                idIntegracao: matricula.id.toString(),
                conteudo: {
                    tipo: conteudo.tipo,
                    dataInicial: conteudo.dataInicial,
                    matricula: {
                        id: matricula.id
                    },
                    dataInicioDesconto: record.dataInicioDescont,
                    valorTotal: record.valorTotal,
                    numeroParcelas: record.numeroParcelas,
                    situacao: record.situacao,
                    parcelas: [
                        {
                            valorParcela: parcelas.valorParcela,                            
                        }
                    ]
                }
            };
        });

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        for (const record of transformedData) {
            const response = await fetch('https://pessoal.betha.cloud/service-layer/v1/api/emprestimo', {
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
