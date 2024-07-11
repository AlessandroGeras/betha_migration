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

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function cleanCpf(cpf) {
    return cpf.replace(/[^\d]/g, '');
}

function convertToBoolean(value) {
    return value === 'true';
}

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "TRIBUTOS2024"
        const selectDatabaseQuery = 'USE CONTABIL2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
cd_fornecedor as idIntegracao,
JSON_QUERY(
    (SELECT
        case 
        WHEN LEN(ds_cgc) < 17 THEN 'FISICA' 
    ELSE 'JURIDICA'
        END AS tipo,
        ds_nome as nome,
        JSON_QUERY(
    (SELECT
        case fl_ProdutorRural
        when 'N' then 'false'
        when 'S' then 'true'
        end as produtorRural,
        case fl_INSSFolhaProdutorRural
        when 'N' then 'false'
        when 'S' then 'true'
        end as contribuicaoPrevidenciariaFolha,
        'false' as prestadorServico,
        'false' as contribuicaoReceitaBruta,
        'false' as beneficiarioPagamento,
        JSON_QUERY(
    (SELECT
        ds_cgc as cpf
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS fisica
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS credorReinf,
DT_CADASTRO as dataInclusao
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
from CONTFORNECEDORES
where LEN(ds_cgc) < 17
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            // Parse the JSON content
            const content = JSON.parse(record.content);
            
            // Ensure 'cpf' exists and is not null before calling cleanCpf
            const cpf = content.credorReinf.fisica?.cpf ? cleanCpf(content.credorReinf.fisica.cpf) : null;

            return {
                idIntegracao: record.idIntegracao.toString(), // Convert idIntegracao to string
                content: {
                    tipo: content.tipo,
                    nome: content.nome,
                    credorReinf: {
                        produtorRural: convertToBoolean(content.credorReinf.produtorRural),
                        contribuicaoPrevidenciariaFolha: convertToBoolean(content.credorReinf.contribuicaoPrevidenciariaFolha),
                        prestadorServico: convertToBoolean(content.credorReinf.prestadorServico),
                        contribuicaoReceitaBruta: convertToBoolean(content.credorReinf.contribuicaoReceitaBruta),
                        beneficiarioPagamento: convertToBoolean(content.credorReinf.beneficiarioPagamento),
                    },
                    fisica: {
                        cpf: cpf
                    },
                    dataInclusao: formatDate(content.dataInclusao)
                }
            };
        });

        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar cada registro individualmente para a rota desejada
        for (const record of transformedData) {
            const response = await fetch('https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/credores', {
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
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        sql.close();
    }
}

main();
