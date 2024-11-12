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

function removeFormatting(value) {
    return value.replace(/[^\d]/g, ''); // Remove tudo que não for número
}

async function main() {
    try {
        const masterConnection = await connectToSqlServer();
        const selectDatabaseQuery = 'USE COMP_ALMO';
        await masterConnection.query(selectDatabaseQuery);

        const userQuery = `
            select 
cd_fornecedor as id,
nm_fornecedor as nome,
JSON_QUERY(
    (SELECT
CASE fl_juridica
        WHEN 1 THEN 'JURIDICA'
                ELSE 'FISICA'
                END AS VALOR
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS tipo,
JSON_QUERY(
    (SELECT
CASE fl_juridica
        WHEN 1 THEN 'ATIVO'
                ELSE 'INATIVO'
                END AS VALOR
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS situacao,
nm_fantasia as nomeFantasia,
nr_cgc as cpfCnpj,
ds_inscricaoestadual as inscricaoEstadual,
JSON_QUERY(
    (SELECT
CASE ds_estado
        WHEN  'AC' THEN 1
        WHEN  'DF' THEN 7
        WHEN  'ES' THEN 8
        WHEN  'GO' THEN 9
        WHEN  'MG' THEN 13
        WHEN  'MS' THEN 12
        WHEN  'MT' THEN 11
        WHEN  'PR' THEN 14
        WHEN  'RJ' THEN 21
        WHEN  'RN' THEN 19
        WHEN  'RO' THEN 22
        WHEN  'RP' THEN 22
        WHEN  'RS' THEN 20
        WHEN  'SC' THEN 24
        WHEN  'SP' THEN 26
        WHEN  'TO' THEN 27
        ELSE 22
        END AS id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS estadoInscricao,
ds_inscricaomunicipal AS inscricaoMunicipal,
 CASE dt_cadastro
        WHEN  NULL THEN '1900-01-01 00:00:00'
        ELSE dt_cadastro
    END AS dataInclusao,
        null as identificadorDesktopTransparencia
from COMPFornecedores
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        console.log('Dados recebidos da consulta:', resultData);

        const transformedData = resultData.map(record => {
            console.log(record);
        
            return {
                conteudo:{
                nome: record.nome.trim() || null,
                cpfCnpj: removeFormatting(record.cpfCnpj), 
                tipo: {
                    valor: JSON.parse(record.tipo)?.VALOR || 'FISICA', // Extrair o valor de tipo
                    descricao: JSON.parse(record.tipo)?.VALOR || 'FISICA'
                },
                nomeFantasia: record.nomeFantasia ? record.nomeFantasia.trim() : null,
                inscricaoEstadual: record.inscricaoEstadual ? record.inscricaoEstadual.trim() : null,
                estadoInscricao: {
                    id: JSON.parse(record.estadoInscricao)?.id || 0 // Extrair o id de estadoInscricao
                },
                situacao: {
                    valor: JSON.parse(record.situacao)?.VALOR || 'A', // Extrair o valor de situacao
                    descricao: JSON.parse(record.situacao)?.VALOR || 'A' // Preencher com string vazia ou valor adequado
                },
                dataInclusao: record.dataInclusao ? record.dataInclusao.toISOString().split('T')[0] : '1900-01-01',
                optanteSimples: false, // Valor fixo conforme o modelo
                identificadorDesktopTransparencia: record.identificadorDesktopTransparencia || null
            }};
        }).filter(record => record !== null); // Filtrar registros nulos

        /* const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        return */


        
        const chunkArray = (array, size) => {
            const chunked = [];
            for (let i = 0; i < array.length; i += size) {
                chunked.push(array.slice(i, i + size));
            }
            return chunked;
        };
        
        const batchedData = chunkArray(transformedData, 50);
        let report = [];
        let reportIds = [];
        
        for (const batch of batchedData) {
            try {
                console.log('Enviando o seguinte corpo para a API:', JSON.stringify(batch, null, 2));
        
                const response = await fetch(`https://compras.betha.cloud/compras-services/api/conversoes/lotes/fornecedores`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 25a840ae-b57a-4030-903a-bcccf2386f30'
                    },
                    body: JSON.stringify(batch)
                });
        
                const responseBody = await response.json();
        
                if (response.ok) {
                    console.log('Dados enviados com sucesso para a API.');
                    batch.forEach(record => {
                        report.push({ record, status: 'success', response: responseBody });
                    });
        
                    if (responseBody.idLote) {
                        reportIds.push(responseBody.idLote);
                    }
                } else {
                    console.error('Erro ao enviar os dados para a API:', response.statusText);
                    batch.forEach(record => {
                        report.push({ record, status: 'failed', response: responseBody });
                    });
                }
            } catch (err) {
                console.error('Erro ao enviar o batch para a API:', err);
                batch.forEach(record => {
                    report.push({ record, status: 'error', error: err.message });
                });
            }
        }
        
        // Save the report in 'report.json'
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));
        console.log('Relatório salvo em report.json com sucesso.');
        
        // Save the reportIds in the 'report_id.json' file
        fs.writeFileSync('report_id.json', JSON.stringify(reportIds, null, 2));
        console.log('report_id.json salvo com sucesso.');

    } catch (error) {
        console.error('Erro no processo:', error);
    } finally {
        await sql.close(); // Close the connection with SQL Server
        console.log('Conexão com o SQL Server fechada.');
    }
}

// Execute the main function
main();