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

function removeFormatting(value) {
    if (typeof value === 'string') {
        const cleanedValue = value.replace(/[^\d]/g, '').trim();
        return cleanedValue.length > 0 ? cleanedValue : null;
    }
    return null;
}

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "COMP_ALMO"
        const selectDatabaseQuery = 'USE COMP_ALMO';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            SELECT 
                cd_fornecedor AS id,
                nm_fornecedor AS nome,
                JSON_QUERY(
                    (SELECT CASE fl_juridica
                        WHEN 1 THEN 'JURIDICA'
                        ELSE 'FISICA'
                    END AS VALOR FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS tipo,
                JSON_QUERY(
                    (SELECT CASE fl_juridica
                        WHEN 1 THEN 'ATIVO'
                        ELSE 'INATIVO'
                    END AS VALOR FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS situacao,
                nm_fantasia AS nomeFantasia,
                nr_cgc AS cpfCnpj,
                ds_inscricaoestadual AS inscricaoEstadual,
                JSON_QUERY(
                    (SELECT CASE ds_estado
                        WHEN 'AC' THEN 1
                        WHEN 'DF' THEN 7
                        WHEN 'ES' THEN 8
                        WHEN 'GO' THEN 9
                        WHEN 'MG' THEN 13
                        WHEN 'MS' THEN 12
                        WHEN 'MT' THEN 11
                        WHEN 'PR' THEN 14
                        WHEN 'RJ' THEN 21
                        WHEN 'RN' THEN 19
                        WHEN 'RO' THEN 22
                        WHEN 'RP' THEN 22
                        WHEN 'RS' THEN 20
                        WHEN 'SC' THEN 24
                        WHEN 'SP' THEN 26
                        WHEN 'TO' THEN 27
                        ELSE 22
                    END AS id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS estadoInscricao,
                ds_inscricaomunicipal AS inscricaoMunicipal,
                CASE dt_cadastro
                    WHEN NULL THEN '1900-01-01 00:00:00'
                    ELSE dt_cadastro
                END AS dataInclusao
            FROM COMPFornecedores
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            // Processando estadoInscricao
            let estadoInscricao = null;
            if (record.inscricaoEstadual && record.inscricaoEstadual.trim() && record.estadoInscricao) {
                estadoInscricao = {
                    id: JSON.parse(record.estadoInscricao).id
                };
            }

            // Convertendo dataInclusao para o formato desejado
            let dataInclusao = '1900-01-01';
            if (record.dataInclusao instanceof Date) {
                dataInclusao = record.dataInclusao.toISOString().split('T')[0];
            }

            return {
                conteudo:{
                nome: record.nome.trim() || null,
                cpfCnpj: removeFormatting(record.cpfCnpj),
                tipo: {
                    valor: JSON.parse(record.tipo).VALOR,
                    descricao: JSON.parse(record.tipo).VALOR
                },
                nomeFantasia: record.nomeFantasia ? record.nomeFantasia.trim() : null,
                inscricaoEstadual: record.inscricaoEstadual ? record.inscricaoEstadual.trim() : null,
                estadoInscricao: estadoInscricao,
                situacao: {
                    valor: JSON.parse(record.situacao).VALOR,
                    descricao: JSON.parse(record.situacao).VALOR
                },
                dataInclusao: dataInclusao,
            }
        };
        }).map(record => {
            // Remover campos vazios
            Object.keys(record).forEach(key => {
                if (record[key] === "") {
                    record[key] = null;
                }
            });
            return record;
        });

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

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

//Mandar para
//https://patrimonio.betha.cloud/patrimonio-services/api/conversoes/lotes/fornecedores
