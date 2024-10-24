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

function formatDate(date) {
    const d = new Date(date);
    const year = d.getUTCFullYear();
    const month = (`0${d.getUTCMonth() + 1}`).slice(-2);
    const day = (`0${d.getUTCDate()}`).slice(-2);
    const hours = (`0${d.getUTCHours()}`).slice(-2);
    const minutes = (`0${d.getUTCMinutes()}`).slice(-2);
    const seconds = (`0${d.getUTCSeconds()}`).slice(-2);
    return `${year}-${month}-${day}`;
    //return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "COMP_ALMO"
        const selectDatabaseQuery = 'USE CONTABIL2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            	SELECT 
    CAST(ROW_NUMBER() OVER (ORDER BY cd_cecam) AS VARCHAR) AS idIntegracao,
    JSON_QUERY(
        (SELECT
            cd_codconta AS numero,
            cd_dig_conta AS digito,
            JSON_QUERY(
                (SELECT 
                    CASE 
                        WHEN cd_codagencia = 04006 THEN 186794
                                                WHEN cd_codagencia = 00406 THEN 186794
                                                WHEN cd_codagencia = 04406 THEN 186794
                        WHEN cd_codagencia = 27553 THEN 186803
                        WHEN cd_codagencia = 27550 AND cd_dig_agencia = 0 THEN 186800
                        WHEN cd_codagencia = 27550 AND cd_dig_agencia = 6 THEN 186798
                        WHEN cd_codagencia = 2755 THEN 186799
                        WHEN cd_codagencia = 03271 THEN 186795
                                                else 186794
                    END AS id
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
                ) 
            ) AS agencia,
            JSON_QUERY(
                (SELECT 
                    CASE 
                        WHEN cd_codbanco = 001 THEN 137
                        WHEN cd_codbanco = 104 THEN 148
                        WHEN cd_codbanco = 756 THEN 51
                                                else 137
                    END AS id
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
                ) 
            ) AS banco,
            ds_banco AS descricao,
            JSON_QUERY(
                (SELECT 
                    'CORRENTE' AS tipo
                FOR JSON PATH
                )
            ) AS tiposContas,
            JSON_QUERY(
                (SELECT 
                    11920 AS id
                FOR JSON PATH
                )
            ) AS tiposAplicacoes,
            JSON_QUERY(
                (SELECT 
                    FORMAT(dt_cadastro, 'yyyy-MM-dd') AS dataInicial,
                    'Inicio da conta' AS motivoInicial
                FOR JSON PATH
                )
            ) AS vigencias
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        )
    ) AS content
FROM CONTFICHABANCOS 
where cd_cecam = 2783
and ds_banco not like  '%TESOU%'
        `;

        const result = await masterConnection.query(userQuery);

        const resultData = result.recordset;

        const transformedData = resultData.map(record => {
            // Log para verificar o que está sendo recebido em cada registro
            console.log(record);  // Verificar o que está sendo recebido
        
            // Fazer o parse dos campos que vêm como strings JSON
            const parsedContent = record.content ? JSON.parse(record.content) : {};
        
            // Montagem do JSON final seguindo o novo modelo
            return {
                idIntegracao: record.idIntegracao,  // Verificar se existe `idIntegracao`
                content: {
                    numero: parsedContent.numero,  // Usar fallback se valor não existir
                    digito: parsedContent.digito,  // Fallback
                    agencia: {
                        id: parsedContent.agencia?.id || null  // Extrair id da agência, com fallback para null
                    },
                    banco: {
                        id: parsedContent.banco?.id || null  // Extrair id do banco, com fallback para null
                    },
                    descricao: parsedContent.descricao,  // Descrição do banco
                    tiposContas: [
                        {
                            tipo: parsedContent.tiposContas[0]?.tipo || null  // Extrair tipo da conta, com fallback
                        }
                    ],
                    vigencias: parsedContent.vigencias?.map(vigencia => ({
                        dataInicial: vigencia.dataInicial || null,  // Data de vigência
                        motivoInicial: vigencia.motivoInicial || null  // Motivo
                    })) || []  // Fallback para array vazio se vigencias não existir
                }
            };
        });
        
        
        // Exibir resultado transformado
        console.log("Dados transformados:", JSON.stringify(transformedData, null, 2));
        
        
        
        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar cada registro individualmente para a rota desejada
        // Armazenar as respostas do servidor
        const serverResponses = [];

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const url = `https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/contas-bancarias-entidades`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                },
                body: JSON.stringify(record)
            });
     
            const responseBody = await response.json();
            serverResponses.push({
                url: url,
                status: response.status,
                statusText: response.statusText,
                responseBody: responseBody
            });
     
            if (response.ok) {
                console.log(`Dados do registro enviados com sucesso para ${url}.`);
            } else {
                console.error(`Erro ao enviar os dados do registro para ${url}:`, response.statusText);
            }
        } */

        //fs.writeFileSync('log_bens.json', JSON.stringify(serverResponses, null, 2));
        //console.log('Respostas do servidor salvas em log_bens.json');

    } catch (error) {
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        await sql.close();
    }
}

// Chamar a função principal
main();