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

        // Selecionar o banco de dados "COMP_ALMO_CAM"
        const selectDatabaseQuery = 'USE FOLHA_CAM';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            SELECT 
    cd_AfastamentoMotivo AS idIntegracao,
    JSON_QUERY(
        (
            SELECT
                ds_AfastamentoMotivo AS descricao,
                CASE cd_AfastamentoMotivo
                    WHEN 1 THEN 'ACIDENTE_DE_TRABALHO_EMPREGADOR'
                    WHEN 3 THEN 'ACIDENTE_DE_TRABALHO_EMPREGADOR'
                    WHEN 5 THEN 'LICENCA_SEM_VENCIMENTOS'
                    WHEN 6 THEN 'APOSENTADORIA_POR_INVALIDEZ'
                    WHEN 7 THEN 'ACOMPANHAR_MEMBRO_DA_FAMILIA_ENFERMO'
                    WHEN 10 THEN 'LICENCA_COM_VENCIMENTOS'
                    WHEN 11 THEN 'CARCERE'
                    WHEN 12 THEN 'CANDIDATO_A_CARGO_ELETIVO_CELETISTA'
                    WHEN 13 THEN 'CANDIDATO_A_CARGO_ELETIVO_CELETISTA'
                    WHEN 15 THEN 'FERIAS'
                    WHEN 16 THEN 'LICENCA_COM_VENCIMENTOS'
                    WHEN 17 THEN 'LICENCA_MATERNIDADE'
                    WHEN 18 THEN 'PRORROGACAO_DA_LICENCA_MATERNIDADE_11_770'
                    WHEN 19 THEN 'ABORTO_NAO_CRIMINOSO'
                    WHEN 20 THEN 'LICENCA_MATERNIDADE'
                    WHEN 21 THEN 'LICENCA_NAO_REMUNERADA'
                    WHEN 22 THEN 'MANDATO_ELEITORAL_SEM_REMUNERACAO'
                    WHEN 23 THEN 'MANDATO_ELEITORAL_COM_REMUNERACAO'
                    WHEN 24 THEN 'MANDATO_SINDICAL'
                    WHEN 25 THEN 'MULHER_VITIMA_DE_VIOLENCIA_LEI_MARIA_DA_PENHA'
                    WHEN 26 THEN 'PARTICIPACAO_CONSELHO_CNPS_LEI_8_213_1991'
                    WHEN 27 THEN 'SUSPENSAO_DO_CONTRATO_ART476_CLT'
                    WHEN 28 THEN 'REPRESENTANTE_SINDICAL'
                    WHEN 29 THEN 'SERVICO_MILITAR'
                    WHEN 30 THEN 'SUSPENSAO_DISCIPLINAR_ART474_CLT'
                    WHEN 31 THEN 'SERVIDOR_PUBLICO_EM_DISPONIBILIDADE'
                    WHEN 34 THEN 'TRABALHADOR_AVULSO_INATIVIDADE_DE_TRABALHO_MAIOR_QUE_90_DIAS'
                    WHEN 35 THEN 'LICENCA_MATERNIDADE'
                    WHEN 36 THEN 'MANDATO_ELETIVO_PARA_CARGO_EM_COMISSAO'
                    WHEN 37 THEN 'SUSPENSAO_DO_CONTRATO_LEI_14_020_2020_CORONAVIRUS'
                    WHEN 38 THEN 'TRABALHADOR_AVULSO_IMPEDIMENTO_DE_CONCORRENCIA_A_ESCALA'
                    WHEN 39 THEN 'SUSPENSAO_DE_PAGAMENTO_DE_SERVIDOR_PUBLICO_POR_NAO_RECADASTRAMENTO'
                    WHEN 40 THEN 'EXERCICIO_EM_OUTRO_ORGAO_DE_SERVIDOR_OU_EMPREGADO_PUBLICO_CEDIDO'
                    WHEN 41 THEN 'QUALIFICACAO_AFASTAMENTO_POR_SUSPENSAO_DO_CONTRATO_DE_ACORDO_COM_ARTIGO_17'
                    WHEN 42 THEN 'QUALIFICACAO_AFASTAMENTO_POR_SUSPENSAO_DO_CONTRATO_DE_ACORDO_COM_ARTIGO_19'
                    ELSE 'FALTA'
                END AS classificacao,
                '0' AS diasPrevistos
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        )
    ) AS conteudo
FROM FOLHESAfastamentoMotivo;
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const conteudo = JSON.parse(record.conteudo);
            return {
                idIntegracao: record.idIntegracao,
                conteudo: {
                    descricao: conteudo.descricao.length > 100 ? conteudo.descricao.substring(0, 100) : conteudo.descricao,
                    classificacao: conteudo.classificacao,
                }
            };
        });

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        for (const record of transformedData) {
            const response = await fetch('https://pessoal.betha.cloud/service-layer/v1/api/tipo-afastamento', {
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
        await sql.close();
    }
}

// Chamar a função principal
main();
