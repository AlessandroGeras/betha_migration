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
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    const hours = (`0${d.getHours()}`).slice(-2);
    const minutes = (`0${d.getMinutes()}`).slice(-2);
    const seconds = (`0${d.getSeconds()}`).slice(-2);
    return `${year}-${month}-${day}`;
    //return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "CONTABIL2024"
        const selectDatabaseQuery = 'USE COMP_ALMO';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select
                CASE 
                WHEN nr_pedido = 1 THEN 1
                WHEN nr_pedido = 2 THEN 3
                WHEN nr_pedido = 4 THEN 2
                WHEN nr_pedido = 5 THEN 4
                WHEN nr_pedido = 9 THEN 5
                WHEN nr_pedido = 6 THEN 6
                WHEN nr_pedido = 16 THEN 7
                WHEN nr_pedido = 27 THEN 8
                WHEN nr_pedido = 30 THEN 9
                WHEN nr_pedido = 36 THEN 10
                WHEN nr_pedido = 38 THEN 11
                END AS sequencial,
        JSON_QUERY(
        (SELECT
            JSON_QUERY(
                        (SELECT
                                10768 AS id
                        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS entidade,
                CASE
                WHEN pedido.nr_pedido = 1 THEN 28
                                WHEN pedido.nr_pedido IN (4, 12, 18, 18, 19, 20, 21) THEN 20
                                WHEN pedido.nr_pedido IN (2, 3) THEN 18
                                WHEN pedido.nr_pedido IN (5, 15, 24, 40) THEN 31
                                WHEN pedido.nr_pedido IN (9, 10, 11, 13, 22, 23, 41, 43) THEN 30
                                WHEN pedido.nr_pedido IN (6, 7, 8, 14, 25, 26, 29, 32, 33, 42) THEN 33
                                WHEN pedido.nr_pedido IN (16, 17, 44, 45) THEN 29
                                WHEN pedido.nr_pedido IN (27, 28) THEN 216
                                WHEN pedido.nr_pedido IN (30, 31) THEN 333
                                WHEN pedido.nr_pedido IN (36, 37) THEN 334
                                WHEN pedido.nr_pedido IN (38, 39) THEN 335
            END AS numero,
                2024 as ano
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
    ) AS tipoControleSaldo,
        JSON_QUERY(
        (SELECT
            CASE
                WHEN pedido.nr_pedido = 1 THEN 36134752
                WHEN pedido.nr_pedido IN (4, 12, 18, 18, 19, 20, 21) THEN 36134753
                WHEN pedido.nr_pedido IN (2, 3) THEN 36134722
                WHEN pedido.nr_pedido IN (5, 15, 24, 40) THEN 36134169
                WHEN pedido.nr_pedido IN (9, 10, 11, 13, 22, 23, 41, 43) THEN 36134173
                WHEN pedido.nr_pedido IN (6, 7, 8, 14, 25, 26, 29, 32, 33, 42) THEN 36134168
                WHEN pedido.nr_pedido IN (16, 17, 44, 45) THEN 36134171
                WHEN pedido.nr_pedido IN (27, 28) THEN 36134708
                WHEN pedido.nr_pedido IN (30, 31) THEN 36134439
                WHEN pedido.nr_pedido IN (36, 37) THEN 36134708
                WHEN pedido.nr_pedido IN (38, 39) THEN 36134708
            END AS id
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
    ) AS fornecedor,
        JSON_QUERY(
        (SELECT
            26 AS id
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
    ) AS tipoInstrumento,
        JSON_QUERY(
        (SELECT
            10 AS id
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
    ) AS tipoObjeto,
        JSON_QUERY(
        (SELECT
            'EXECUCAO' AS valor,
                        'EXECUCAO' as descricao
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
    ) AS situacao,
        'false' as formaJulgamentoPercentual,
        'false' as destinatarioEducacao,
        'false' as destinatarioSaude,
        'false' as destinatarioCovid,
        'false' as controlaSaldoOrganograma,
        'false' as orcamentoSigiloso,
        JSON_QUERY(
        (SELECT
            'PROCESSO_ADMINISTRATIVO' AS valor,
                        'PROCESSO_ADMINISTRATIVO' as descricao
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
    ) AS origem,
        pedido.ds_objeto as objetoContratacao,
        format(licitacao.dt_ValidadeInicial, 'yyyy-MM-dd') as dataInicioVigencia,
        format(licitacao.dt_ValidadeFinal, 'yyyy-MM-dd') as dataFimVigencia,
                JSON_QUERY(
        (SELECT
            CASE 
                                WHEN nr_pedido IN (2, 1, 27, 30, 36, 38) THEN 'QUANTIDADE'
                                ELSE 'VALOR' END as valor,
                        CASE
                                WHEN nr_pedido IN (2, 1, 27, 30, 36, 38) THEN 'QUANTIDADE'
                                ELSE 'VALOR' END as descricao
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
    ) AS tipoControleSaldo
from COMPPedidos pedido
INNER JOIN COMPLicitacaoFornecedores licitacao ON licitacao.nr_licitacao = pedido.nr_licitacao
where pedido.aa_licitacao = 2024 and licitacao.aa_licitacao = 2024 and pedido.nr_pedido not in (34, 35) and pedido.nr_pedido in (4, 5, 6, 9, 16);
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            try {
                console.log(record);
                // Parse o conteúdo JSON retornado do SELECT, se estiver presente
                const fornecedor = record.fornecedor ? JSON.parse(record.fornecedor) : null;
                const tipoInstrumento = record.tipoInstrumento ? JSON.parse(record.tipoInstrumento) : null;
                const tipoObjeto = record.tipoObjeto ? JSON.parse(record.tipoObjeto) : null;
                const situacao = record.situacao ? JSON.parse(record.situacao) : null;
                const origem = record.origem ? JSON.parse(record.origem) : null;
        
                // Verifique se o tipoControleSaldo é um array e faça o parse de seus elementos
                let tipoControleSaldo = null;
                if (Array.isArray(record.tipoControleSaldo)) {
                    tipoControleSaldo = record.tipoControleSaldo.map(item => JSON.parse(item));
                }
        
                // O primeiro item do array 'tipoControleSaldo' contém o 'processoAdministrativo'
                const processoAdministrativo = tipoControleSaldo && tipoControleSaldo.length > 0 ? tipoControleSaldo[0] : null;
                // O segundo item do array 'tipoControleSaldo' contém os detalhes do 'tipoControleSaldo'
                const tipoControleSaldoDetalhes = tipoControleSaldo && tipoControleSaldo.length > 1 ? tipoControleSaldo[1] : null;
        
                return {
                    sequencial: record.sequencial,
                    processoAdministrativo: {
                        entidade: {
                            id: processoAdministrativo?.entidade?.id || null // Garantindo que entidade.id exista
                        },
                        numero: processoAdministrativo?.numero || null, // Usando o número ou null
                        ano: processoAdministrativo?.ano // Usando o ano ou 2024
                    },
                    fornecedor: {
                        id: fornecedor?.id || null // Garantindo que fornecedor.id exista
                    },
                    formaJulgamentoPercentual: record.formaJulgamentoPercentual === 'true', // Convertendo para booleano
                    tipoInstrumento: {
                        id: tipoInstrumento?.id || null // Garantindo que tipoInstrumento.id exista
                    },
                    tipoObjeto: {
                        id: tipoObjeto?.id || null // Garantindo que tipoObjeto.id exista
                    },
                    objetoContratacao: record.objetoContratacao || "", // Usando o objetoContratacao ou string vazia
                    situacao: {
                        valor: situacao?.valor || "", // Usando o valor ou string vazia
                        descricao: situacao?.descricao || "" // Usando a descrição ou string vazia
                    },
                    dataAssinatura: "2024-10-14", // Valor fixo
                    origem: {
                        valor: origem?.valor || "", // Usando o valor ou string vazia
                        descricao: origem?.descricao || "" // Usando a descrição ou string vazia
                    },
                    destinatarioEducacao: record.destinatarioEducacao === 'true', // Convertendo para booleano
                    destinatarioSaude: record.destinatarioSaude === 'true', // Convertendo para booleano
                    destinatarioCovid: record.destinatarioCovid === 'true', // Convertendo para booleano
                    controlaSaldoOrganograma: record.controlaSaldoOrganograma === 'true', // Convertendo para booleano
                    orcamentoSigiloso: record.orcamentoSigiloso === 'true', // Convertendo para booleano
                    tipoControleSaldo: {
                        valor: tipoControleSaldoDetalhes?.valor || "", // Usando o valor ou string vazia
                        descricao: tipoControleSaldoDetalhes?.descricao || "" // Usando a descrição ou string vazia
                    },
                    dataInicioVigencia: record.dataInicioVigencia, // Usando a data ou valor padrão
                    dataFimVigencia: record.dataFimVigencia // Usando a data ou valor padrão
                };
            } catch (err) {
                console.error('Erro ao processar registro:', err);
                return null; // Ignora registros inválidos
            }
        }).filter(record => record !== null); // Filtrando registros nulos
        



        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar cada registro individualmente para a rota desejada
        for (const record of transformedData) {
            const response = await fetch('https://services.contratos.betha.cloud/contratacao-services/api/exercicios/2024/contratacoes', {
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
