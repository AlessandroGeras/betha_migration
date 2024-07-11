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

        // Selecionar o banco de dados "COMP_ALMO"
        const selectDatabaseQuery = 'USE FOLHA_CAM';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            SELECT 
                cd_VincEmpr AS idIntegracao,
                JSON_QUERY(
                    (SELECT
                        ds_VincEmpr AS descricao,
                        CASE cd_RAIS
                            WHEN 0 THEN 'OUTROS'
                            ELSE 'CLT'
                        END AS tipo,
                        'null' AS descricaoRegimePrevidenciario,
                        CASE cd_vincempr
                            WHEN 10 THEN 'EMPREGADO'
                            WHEN 11 THEN 'EMPREGADO'
                            WHEN 12 THEN 'EMPREGADO'
                            WHEN 13 THEN 'CONTRATO_PRAZO_DETERMINADO'
                            WHEN 14 THEN 'EMPREGADO'
                            WHEN 21 THEN 'SERVIDOR_PUBLICO_EFETIVO'
                            WHEN 22 THEN 'SERVIDOR_PUBLICO_EFETIVO'
                            WHEN 23 THEN 'EMPREGADO'
                            WHEN 25 THEN 'SERVIDOR_PUBLICO_COMISSAO'
                            WHEN 26 THEN 'SERVIDOR_PUBLICO_COMISSAO'
                            WHEN 27 THEN 'EMPREGADO'
                            WHEN 28 THEN 'EMPREGADO'
                            WHEN 29 THEN 'SERVIDOR_PUBLICO_COMISSAO'
                            WHEN 30 THEN 'SERVIDOR_PUBLICO_COMISSAO'
                            WHEN 31 THEN 'AGENTE_POLITICO'
                            WHEN 32 THEN 'AGENTE_POLITICO'
                            WHEN 41 THEN 'CONTRATO_PRAZO_DETERMINADO'
                            WHEN 81 THEN 'AGENTE_PUBLICO'
                            WHEN 91 THEN 'AGENTE_PUBLICO'
                            WHEN 92 THEN 'AGENTE_PUBLICO'
                            WHEN 95 THEN 'AGENTE_PUBLICO'
                        END AS sefip,
                        CASE cd_vincempr
                            WHEN 10 THEN 'CONTRATO_TRABALHO_PRAZO_DETERMINADO_LEI_N9601_21_JANEIRO_1998'
                            WHEN 11 THEN 'TRABALHADOR_URBANO_VINCULADO_PESSOA_JURIDICA_CONTRATO_TRABALHO_CLT_PRAZO_INDETERMINADO'
                            WHEN 12 THEN 'CONTRATO_TRABALHO_PRAZO_DETERMINADO_LEI_N9601_21_JANEIRO_1998'
                            WHEN 13 THEN 'TRABALHADOR_TEMPORARIO_REGIDO_LEI_NO_6019_3_JANEIRO_1974'
                            WHEN 14 THEN 'TRABALHADOR_TEMPORARIO_REGIDO_LEI_NO_6019_3_JANEIRO_1974'
                            WHEN 21 THEN 'SERVIDOR_REGIME_JURIDICO_UNICO_VINCULADO_REGIME_PROPRIO_DE_PREVIDENCIA'
                            WHEN 22 THEN 'SERVIDOR_REGIME_JURIDICO_UNICO_VINCULADO_REGIME_GERAL_DE_PREVIDENCIA_SOCIAL'
                            WHEN 23 THEN 'TRABALHADOR_AVULSO_DEVIDO_DEPOSITO_FGTS_CF_88_ART_7O_INCISO_III'
                            WHEN 25 THEN 'SERVIDOR_REGIME_JURIDICO_UNICO_VINCULADO_REGIME_GERAL_DE_PREVIDENCIA_SOCIAL'
                            WHEN 26 THEN 'SERVIDOR_REGIME_JURIDICO_UNICO_VINCULADO_REGIME_PROPRIO_DE_PREVIDENCIA'
                            WHEN 27 THEN 'SERVIDOR_REGIME_JURIDICO_UNICO_VINCULADO_REGIME_GERAL_DE_PREVIDENCIA_SOCIAL'
                            WHEN 28 THEN 'SERVIDOR_REGIME_JURIDICO_UNICO_VINCULADO_REGIME_PROPRIO_DE_PREVIDENCIA'
                            WHEN 29 THEN 'SERVIDOR_REGIME_JURIDICO_UNICO_VINCULADO_REGIME_GERAL_DE_PREVIDENCIA_SOCIAL'
                            WHEN 30 THEN 'SERVIDOR_REGIME_JURIDICO_UNICO_VINCULADO_REGIME_PROPRIO_DE_PREVIDENCIA'
                            WHEN 31 THEN 'SERVIDOR_REGIME_JURIDICO_UNICO_VINCULADO_REGIME_GERAL_DE_PREVIDENCIA_SOCIAL'
                            WHEN 32 THEN 'SERVIDOR_REGIME_JURIDICO_UNICO_VINCULADO_REGIME_PROPRIO_DE_PREVIDENCIA'
                            WHEN 41 THEN 'CONTRATO_TRABALHO_PRAZO_DETERMINADO_LEI_N9601_21_JANEIRO_1998'
                            WHEN 81 THEN 'SERVIDOR_PUBLICO_NAO_EFETIVO_DEMISSIVEL_AD_NUTUM'
                            WHEN 91 THEN 'SERVIDOR_PUBLICO_NAO_EFETIVO_DEMISSIVEL_AD_NUTUM'
                            WHEN 92 THEN 'SERVIDOR_PUBLICO_NAO_EFETIVO_DEMISSIVEL_AD_NUTUM'
                            WHEN 95 THEN 'SERVIDOR_PUBLICO_NAO_EFETIVO_DEMISSIVEL_AD_NUTUM'
                        END AS rais,
                        JSON_QUERY(
                            (SELECT
                                CASE cd_vincempr
                                    WHEN 10 THEN 14474
                                    WHEN 11 THEN 14474
                                    WHEN 12 THEN 14474
                                    WHEN 13 THEN 14479
                                    WHEN 14 THEN 14474
                                    WHEN 21 THEN 14484
                                    WHEN 22 THEN 14484
                                    WHEN 23 THEN 14474
                                    WHEN 25 THEN 14485
                                    WHEN 26 THEN 14485
                                    WHEN 27 THEN 14474
                                    WHEN 28 THEN 14474
                                    WHEN 29 THEN 14485
                                    WHEN 30 THEN 14485
                                    WHEN 31 THEN 14484
                                    WHEN 32 THEN 14484
                                    WHEN 41 THEN 14479
                                    WHEN 81 THEN 14484
                                    WHEN 91 THEN 14484
                                    WHEN 92 THEN 14484
                                    WHEN 95 THEN 14484
                                END AS id
                            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                        ) AS categoriaTrabalhador,
                        'true' AS geraRais,
                        CASE fl_TrabTemporario 
                            WHEN 'N' THEN 'false'
                            ELSE 'true'
                        END AS vinculoTemporario
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS conteudo
            FROM FOLHVincEmpr
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const conteudo = JSON.parse(record.conteudo); // Parse the JSON string to an object

            // Construct the conteudo object with conditional motivoRescisao
            const conteudoTransformed = {
                descricao: conteudo.descricao,
                tipo: conteudo.tipo,
                descricaoRegimePrevidenciario: null,
                sefip: conteudo.sefip,
                categoriaTrabalhador: conteudo.categoriaTrabalhador, // Including the id directly
                geraRais: conteudo.geraRais,
                rais: conteudo.rais,
                vinculoTemporario: conteudo.vinculoTemporario,
                dataFinalObrigatoria: false,
            };

            if (conteudo.vinculoTemporario === 'true') {
                conteudoTransformed.motivoRescisao = { id: 42701 };
            }

            return {
                idIntegracao: record.idIntegracao.toString(), // Convert idIntegracao to string
                conteudo: conteudoTransformed
            };
        });

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        for (const record of transformedData) {
            const response = await fetch('https://pessoal.betha.cloud/service-layer/v1/api/vinculo-empregaticio', {
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
