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
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "COMP_ALMO"
        const selectDatabaseQuery = 'USE COMP_ALMO';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            SELECT 
                cd_fornecedor as id,
                nm_fornecedor as nome,
                nm_fantasia as nomeFantasia,
                nr_cgc as cpfCnpj,
                ds_inscricaoestadual as inscricaoEstadual,
                ds_inscricaomunicipal AS inscricaoMunicipal,
                dt_cadastro AS dataInclusao,
                JSON_QUERY(
                    (SELECT CASE fl_juridica
                        WHEN 1 THEN 'JURIDICA'
                        ELSE 'FISICA'
                    END AS valor
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS tipo,
                JSON_QUERY(
                    (SELECT CASE fl_juridica
                        WHEN 1 THEN 'A'
                        ELSE 'I'
                    END AS valor
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS situacao
            FROM COMPFornecedores
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => ({
            nome: record.nome,
            cpfCnpj: removeFormatting(record.cpfCnpj), // Remove formatting from cpfCnpj
            tipo: {
                valor: JSON.parse(record.tipo).valor === 'JURIDICA' ? 'JURIDICA' : 'FISICA',
                descricao: JSON.parse(record.tipo).valor === 'JURIDICA' ? 'JURIDICA' : 'FISICA'
            },
            nomeFantasia: record.nomeFantasia,
            inscricaoEstadual: record.inscricaoEstadual || null,
            estadoInscricao: null,
            inscricaoMunicipal: record.inscricaoMunicipal || null,
            municipioInscricao: null,
            situacao: {
                valor: JSON.parse(record.situacao).valor === 'A' ? 'A' : 'I',
                descricao: JSON.parse(record.situacao).valor === 'A' ? 'A' : 'I'
            },
            dataSituacao: null,
            dataInclusao: record.dataInclusao,
            responsavel: null,
            orgaoRegistroEmpresa: null,
            dataRegistro: null,
            numeroRegistro: null,
            porteEmpresa: {
                valor: null,
                descricao: null
            },
            optanteSimples: null,
            naturezaJuridica: {
                id: null
            },
            naturezaJuridicaQualificacao: null,
            endereco: null,
            telefone: null,
            email: null,
            identificadorDesktopTransparencia: null,
            contasBancarias: []
        }));

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        for (const record of transformedData) {
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
