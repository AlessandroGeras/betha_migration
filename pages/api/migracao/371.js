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

function formatarNumero(numero, nivel) {
    let numeroFormatado = '';
    const partes = [0, 0, 0, 0];

    partes[nivel - 1] = numero;

    partes[0] = partes[0].toString().padStart(3, '0');
    partes[1] = partes[1].toString().padStart(3, '0');
    partes[2] = partes[2].toString().padStart(4, '0');
    partes[3] = partes[3].toString().padStart(2, '0');

    numeroFormatado = partes.join('.');

    return numeroFormatado.replace(/\./g, '');
}

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "FOLHADB"
        const selectDatabaseQuery = 'USE FOLHADB';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
           select  ROW_NUMBER() OVER (ORDER BY cd_cecam) AS idIntegracao,
JSON_QUERY(
    (SELECT
    JSON_QUERY(
    (SELECT
   '4950' as id,
   'ORGANOGRAMA PARECIS 2024' as descricao
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS configuracao,
 cd_DivAdm as numero,
 cd_NivelEstrut as nivel,
 nm_DivAdm as descricao,
 nm_abrevdivadm as sigla
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS conteudo
from folhdivadm
where aa_exercicio = 2024
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const conteudo = JSON.parse(record.conteudo);

            return {
                idIntegracao: record.idIntegracao.toString(),
                conteudo: {
                    configuracao: {
                        id: parseInt(conteudo.configuracao.id),
                        descricao: conteudo.configuracao.descricao
                    },
                    numero: formatarNumero(conteudo.numero, conteudo.nivel),
                    nivel: parseInt(conteudo.nivel),
                    descricao: conteudo.descricao,
                    sigla: conteudo.sigla
                }
            };
        });

        // Salvar os resultados transformados em um arquivo JSON
        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const response = await fetch('https://pessoal.betha.cloud/service-layer/v1/api/organograma', {
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
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        sql.close();
    }
}

main();
