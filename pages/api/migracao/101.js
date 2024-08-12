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

        // Selecionar o banco de dados "FOLHA_CAM"
        const selectDatabaseQuery = 'USE FOLHA_CAM';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
cd_TipoRescisao as idIntegracao,
JSON_QUERY(
    (SELECT ds_TipoRescisao as descricao,
        case cd_TipoRescisao 
        WHEN  11 THEN 'INICIATIVA_EMPREGADOR'
        WHEN  12 THEN 'DISSOLUCAO_CONTRATO_TRABALHO'
        WHEN  21 THEN 'INICIATIVA_EMPREGADO'
        WHEN  30 THEN 'INICIATIVA_EMPREGADOR'
        WHEN  32 THEN 'INICIATIVA_EMPREGADOR'
        WHEN  40 THEN 'INICIATIVA_EMPREGADOR'
        WHEN  60 THEN 'INICIATIVA_EMPREGADOR'
        WHEN  70 THEN 'INICIATIVA_EMPREGADOR'
        WHEN  72 THEN 'DISSOLUCAO_CONTRATO_TRABALHO'
        WHEN  73 THEN 'DISSOLUCAO_CONTRATO_TRABALHO'
        WHEN  74 THEN 'DISSOLUCAO_CONTRATO_TRABALHO'
        WHEN  80 THEN 'DISSOLUCAO_CONTRATO_TRABALHO'     
    END AS tipo,
    case cd_TipoRescisao 
        WHEN  11 THEN 'RESCISAO_COM_JUSTA_CAUSA_INICIATIVA_EMPREGADOR'
        WHEN  12 THEN 'RESCISAO_POR_TERMINO_CONTRATO'
        WHEN  21 THEN 'RESCISAO_ANTECIPADA_INICIATIVA_EMPREGADO'
        WHEN  30 THEN 'TRANSFERENCIA_EMPREGADO_PARA_CONSORCIO_TENHA_ASSUMIDO_ENCARGOS_TRABALHISTAS_SEM_RESCISAO'
        WHEN  32 THEN 'RESCISAO_COM_JUSTA_CAUSA_INICIATIVA_EMPREGADOR'
        WHEN  40 THEN 'MUDANCA_REGIME_TRABALHISTA'
        WHEN  60 THEN 'FALECIMENTO_EMPREGADO_OUTROS_MOTIVOS'
        WHEN  70 THEN 'APOSENTADORIA_TEMPO_SERVICO'
        WHEN  72 THEN 'APOSENTADORIA_IDADE'
        WHEN  73 THEN 'APOSENTADORIA_INVALIDEZ'
        WHEN  74 THEN 'APOSENTADORIA_INVALIDEZ'
        WHEN  80 THEN 'ACORDO_ENTRE_PARTES'     
    END AS classificacao,
        case cd_TipoRescisao 
        WHEN  11 THEN 'RESCISAO_SEM_JUSTA_CAUSA_EMPREGADOR_INCLUSIVE_ANTECIPADA'
        WHEN  12 THEN 'RESCISAO_TERMINO_CONTRATO'
        WHEN  21 THEN 'RESCISAO_CONTRATO_INICIATIVA_EMPREGADO'
        WHEN  30 THEN 'TRANSFERENCIA_MESMA_EMPRESA'
        WHEN  32 THEN 'RESCISAO_COM_JUSTA_CAUSA_INICIATIVA_EMPREGADOR'
        WHEN  40 THEN 'MUDANCA_REGIME_ESTATUTARIO'
        WHEN  60 THEN 'FALECIMENTO'
        WHEN  70 THEN 'APOSENTADORIA'
        WHEN  72 THEN 'APOSENTADORIA'
        WHEN  73 THEN 'APOSENTADORIA_INVALIDEZ'
        WHEN  74 THEN 'APOSENTADORIA_INVALIDEZ'
        WHEN  80 THEN 'OUTROS_MOTIVOS_RESCISAO'     
    END AS  classificacaoSefip,
        JSON_QUERY(
    (SELECT
    case cd_TipoRescisao 
        WHEN  11 THEN 'DEMITIDO'
        WHEN  12 THEN 'DEMITIDO'
        WHEN  21 THEN 'DEMITIDO'
        WHEN  30 THEN 'CEDENCIA'
        WHEN  32 THEN 'DEMITIDO'
        WHEN  40 THEN 'CEDENCIA'
        WHEN  60 THEN 'AUSENCIA_LEGAL'
        WHEN  70 THEN 'APOSENTADO'
        WHEN  72 THEN 'APOSENTADO'
        WHEN  73 THEN 'APOSENTADORIA_POR_INVALIDEZ'
        WHEN  74 THEN 'APOSENTADORIA_POR_INVALIDEZ'
        WHEN  80 THEN 'AUSENCIA_LEGAL'     
    END AS  descricao,
    case cd_TipoRescisao 
                WHEN  11 THEN 'DEMITIDO'
        WHEN  12 THEN 'DEMITIDO'
        WHEN  21 THEN 'DEMITIDO'
        WHEN  30 THEN 'CEDENCIA'
        WHEN  32 THEN 'DEMITIDO'
        WHEN  40 THEN 'CEDENCIA'
        WHEN  60 THEN 'AUSENCIA_LEGAL'
        WHEN  70 THEN 'APOSENTADO'
        WHEN  72 THEN 'APOSENTADO'
        WHEN  73 THEN 'APOSENTADORIA_POR_INVALIDEZ'
        WHEN  74 THEN 'APOSENTADORIA_POR_INVALIDEZ'
        WHEN  80 THEN 'AUSENCIA_LEGAL'     
    END AS  classificacao
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS tipoAfastamento,
                JSON_QUERY(
    (SELECT
    case cd_TipoRescisao 
        WHEN  11 THEN 'DEMITIDO'
        WHEN  12 THEN 'DEMITIDO'
        WHEN  21 THEN 'DEMITIDO'
        WHEN  30 THEN 'CEDENCIA'
        WHEN  32 THEN 'DEMITIDO'
        WHEN  40 THEN 'CEDENCIA'
        WHEN  60 THEN 'AUSENCIA_LEGAL'
        WHEN  70 THEN 'APOSENTADO'
        WHEN  72 THEN 'APOSENTADO'
        WHEN  73 THEN 'APOSENTADORIA_POR_INVALIDEZ'
        WHEN  74 THEN 'APOSENTADORIA_POR_INVALIDEZ'
        WHEN  80 THEN 'AUSENCIA_LEGAL'     
    END AS  descricao,
    case cd_TipoRescisao 
                WHEN  11 THEN 'DEMITIDO'
        WHEN  12 THEN 'DEMITIDO'
        WHEN  21 THEN 'DEMITIDO'
        WHEN  30 THEN 'CEDENCIA'
        WHEN  32 THEN 'DEMITIDO'
        WHEN  40 THEN 'CEDENCIA'
        WHEN  60 THEN 'AUSENCIA_LEGAL'
        WHEN  70 THEN 'APOSENTADO'
        WHEN  72 THEN 'APOSENTADO'
        WHEN  73 THEN 'APOSENTADORIA_POR_INVALIDEZ'
        WHEN  74 THEN 'APOSENTADORIA_POR_INVALIDEZ'
        WHEN  80 THEN 'AUSENCIA_LEGAL'     
    END AS  classificacao
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS tipoMovimentacaoPessoal
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
        ) AS conteudo 
from FOLHTipoRescisao
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            let conteudo;
            try {
                conteudo = JSON.parse(record.conteudo);
            } catch (error) {
                console.error('Erro ao fazer parse de conteudo:', record.conteudo, error);
                throw error;
            }
        
            const tipoAfastamento = conteudo.tipoAfastamento;
            const tipoMovimentacaoPessoal = conteudo.tipoMovimentacaoPessoal;
        
            return {
                idIntegracao: record.idIntegracao.toString(), // Convertendo para string
                conteudo: {
                    descricao: conteudo.descricao,
                    tipo: conteudo.tipo,
                    classificacao: conteudo.classificacao,
                    classificacaoSefip: conteudo.classificacaoSefip,
                    tipoAfastamento: {
                        id: parseInt(record.idIntegracao), // Convertendo para número
                        descricao: tipoAfastamento.descricao,
                        classificacao: tipoAfastamento.classificacao
                    },
                    tipoMovimentacaoPessoal: {
                        descricao: tipoMovimentacaoPessoal.descricao,
                        classificacao: tipoMovimentacaoPessoal.classificacao
                    }
                }
            };
        });

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const response = await fetch('https://pessoal.betha.cloud/service-layer/v1/api/motivo-rescisao', {
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
        // Lidar com erros de conexão ou consulta aqui
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        await sql.close();
    }
}

// Chamar a função principal
main();
