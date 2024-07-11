const sql = require('mssql');
const dotenv = require('dotenv');
const fs = require('fs');
const { parseISO, format } = require('date-fns');

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

function formatDate(date) {
    if (!date) return "1900-01-01"; // Data padrão se não houver data

    try {
        const parsedDate = typeof date === 'string' ? parseISO(date) : new Date(date);
        if (isNaN(parsedDate.getTime())) {
            console.error(`Data inválida após parsing: ${date}`);
            return "1900-01-01"; // Data padrão se a data for inválida após parsing
        }
        
        return format(parsedDate, 'yyyy-MM-dd'); // Formato padrão: '1900-01-01'
    } catch (error) {
        console.error('Erro ao formatar data:', error);
        return "1900-01-01"; // Retornar data padrão em caso de erro
    }
}

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "PATRIMONIO"
        const selectDatabaseQuery = 'USE PATRIMONIO';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
                cd_fornecedor as id,
                nm_fornecedor as nome,
                nm_fantasia as nomeFantasia,
                nr_cgc as cpfCnpj,
                JSON_QUERY(
                    (SELECT
                        case fl_juridica
                        when 0 then 'FISICA'
                        when 1 then 'JURIDICA'
                        ELSE 'OUTRO'
                    END AS valor,
                    case fl_juridica
                        when 0 then 'FISICA'
                        when 1 then 'JURIDICA'
                        ELSE 'OUTRO'
                    END AS descricao
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS tipo,
                ds_inscricaoestadual as inscricaoEstadual,
                ds_inscricaomunicipal as inscricaoMunicipal,
                JSON_QUERY(
                    (SELECT
                        CASE ds_estado
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
                    END AS id
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS estadoInscricao,
                JSON_QUERY(
                    (SELECT
                        'A' as valor,
                        'ATIVO' as descricao
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS situacao,
                'false' as optanteSimples,
                dt_cadastro as dataInclusao
            from COMPFornecedores
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Verificar e logar datas de inclusão antes de transformá-las
        resultData.forEach(record => {
            console.log(`Data de Inclusão Original: ${record.dataInclusao}`);
        });

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const cpfCnpj = removeFormatting(record.cpfCnpj);
            if (cpfCnpj.length !== 14) {
                console.log(`Registro ignorado devido a CPF/CNPJ inválido: ${record.cpfCnpj}`);
                return null; // Ignorar registros com CPF ou CNPJ inválidos
            }

            if (record.cpfCnpj !== "00.000.000/0000-00") {
                const tipo = JSON.parse(record.tipo);
                const situacao = JSON.parse(record.situacao);

                let estadoInscricao = null;
                if (record.inscricaoEstadual) {
                    estadoInscricao = {
                        id: JSON.parse(record.estadoInscricao).id
                    };
                }

                const transformedRecord = {
                    conteudo: {
                        nome: record.nome,
                        cpfCnpj: removeFormatting(record.cpfCnpj),
                        tipo: {
                            valor: tipo.valor,
                            descricao: tipo.descricao
                        },
                        nomeFantasia: record.nomeFantasia || undefined,
                        inscricaoEstadual: record.inscricaoEstadual || undefined,
                        estadoInscricao: estadoInscricao || undefined,
                        situacao: situacao.valor === 'A' ? { valor: 'ATIVO', descricao: situacao.descricao } : undefined,
                        dataInclusao: formatDate(record.dataInclusao),
                        optanteSimples: false,
                    }
                };

                // Remover campos indefinidos
                Object.keys(transformedRecord).forEach(key => {
                    if (transformedRecord[key] === undefined) {
                        delete transformedRecord[key];
                    }
                });

                return transformedRecord;
            }
            return null; // Retornar null para registros inválidos
        }).filter(record => record !== null); // Filtrar registros nulos

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const response = await fetch('https://patrimonio.betha.cloud/patrimonio-services/api/fornecedores', {
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
        await sql.close();
    }
}

// Chamar a função principal
main();
