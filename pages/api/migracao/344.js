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

        // Selecionar o banco de dados "TRIBUTOS2024"
        const selectDatabaseQuery = 'USE TRIBUTOS2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            SELECT 
    cd_ficharec AS idIntegracao,
    JSON_QUERY(
        (
            SELECT
                ds_receita AS descricao,
                CASE CAST(cd_receita AS VARCHAR)
                    WHEN '1112500100' THEN 'IPTU'
                    WHEN '1112500200' THEN 'IPTPMJ'
                    WHEN '1112500300' THEN 'IPTDIV'
                    WHEN '1112500400' THEN 'IPDMJ'
                    WHEN '1112530100' THEN 'ITBI'
                    WHEN '1113031100' THEN 'IRRFT'
                    WHEN '1113034101' THEN 'IRFPF'
                    WHEN '1113034102' THEN 'IRFPJ'
                    WHEN '1114511101' THEN 'ISSQN'
                    WHEN '1114511102' THEN 'ISSNSN'
                    WHEN '1114511200' THEN 'ISSMJ'
                    WHEN '1114511300' THEN 'ISSDV'
                    WHEN '1114511400' THEN 'ISSDMJ'
                    WHEN '1121010101' THEN 'TXFUN'
                    WHEN '1121010102' THEN 'TXPUB'
                    WHEN '1121010104' THEN 'TXEXO'
                    WHEN '1121010105' THEN 'TXHBI'
                    WHEN '1121010106' THEN 'TXLFUN'
                    WHEN '1121010107' THEN 'TXCEOB'
                    WHEN '1121500100' THEN 'TXFVGS'
                    WHEN '1122010101' THEN 'TXSCAD'
                    WHEN '1122010102' THEN 'TXCEM'
                    WHEN '1122010103' THEN 'TXLIPU'
                    WHEN '1122010104' THEN 'TXEXP'
                    WHEN '1122010105' THEN 'TXTRNC'
                    WHEN '1122010106' THEN 'TXSEVC'
                    WHEN '1122010107' THEN 'TXCOLI'
                    WHEN '1122010108' THEN 'TXTIUR'
                    WHEN '1922011101' THEN 'RESTC'
                    WHEN '1922990100' THEN 'OURSTP'
                    WHEN '1923990101' THEN 'RESCA'
                    WHEN '1923990102' THEN 'RESTVJ'
                    WHEN '1923990103' THEN 'RESTVJ'
                    WHEN '1923990104' THEN 'RESTVD'
                    WHEN '1923990301' THEN 'DNTADI'
                    WHEN '1923990302' THEN 'DNTRRI'
                    WHEN '1923990303' THEN 'DNTMAC'
                    WHEN '1923990304' THEN 'DNTMAC'
                    WHEN '1923990305' THEN 'DNTRBI'
                    WHEN '1923990306' THEN 'DNTCEB'
                    WHEN '1923990307' THEN 'DVANT'
                    WHEN '1923990308' THEN 'DNT'
                    WHEN '1923990309' THEN 'DNTCEB'
                    WHEN '1923990310' THEN 'DNTAFG'
                    WHEN '1923990311' THEN 'DNTMAC'
                    WHEN '1923990312' THEN 'DNTCRS'
                    WHEN '1923990313' THEN 'DNTRRI'
                    WHEN '1923990314' THEN 'DNTMAC'
                    WHEN '1923990315' THEN 'DNTJC'
                    WHEN '1923990401' THEN 'DNTAAB'
                    WHEN '1923990402' THEN 'DNTAIA'
                    WHEN '1923990403' THEN 'DNTEAS'
                    WHEN '1923990404' THEN 'DNTJCF'
                    WHEN '1923990406' THEN 'DNTRRI'
                    WHEN '1923990407' THEN 'DNTCRS'
                    WHEN '1923990408' THEN 'DNTRBI'
                    WHEN '1923990409' THEN 'DNTAFG'
                    WHEN '1923990410' THEN 'DNTNPN'
                    WHEN '1923990411' THEN 'DNTDMB'
                    WHEN '1923990412' THEN 'DNTOBP'
                    WHEN '1923990413' THEN 'DNTMC'
                    WHEN '1923990414' THEN 'DNTMCI'
                    WHEN '1923990415' THEN 'DNTMC'
                    WHEN '21883010400' THEN 'IRPJ'
                    WHEN '21883010400' THEN 'IRPF'
                END AS abreviatura,
                CAST(cd_receita AS VARCHAR) AS codigoTCE,
                CASE 
                    WHEN cd_receita LIKE '111%' THEN 'IMPOSTO'
                    WHEN cd_receita LIKE '112%' THEN 'TAXA'
                    WHEN cd_receita LIKE '192%' THEN 'NAO_TRIBUTARIA'
                    WHEN cd_receita LIKE '218830104%' THEN 'IMPOSTO'
                END AS classificacao,
                CASE 
                    WHEN cd_receita LIKE '111%' THEN 'SIM'
                    WHEN cd_receita LIKE '112%' THEN 'SIM'
                    WHEN cd_receita LIKE '192%' THEN 'NAO'
                    WHEN cd_receita LIKE '218830104%' THEN 'SIM'
                END AS inscDividaAtiva,
                'true' AS naoContabilizavel
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        )
    ) AS receitas
FROM 
    contfichareceita
WHERE 
    CAST(cd_receita AS VARCHAR) LIKE '111%' 
    OR CAST(cd_receita AS VARCHAR) LIKE '112%' 
    OR CAST(cd_receita AS VARCHAR) LIKE '192%' 
    OR CAST(cd_receita AS VARCHAR) LIKE '218830104%'
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            // Parse the JSON content
            const content = JSON.parse(record.receitas);
        
            return {
                idIntegracao: record.idIntegracao.toString(), // Convert idIntegracao to string
                receitas: {
                    descricao: content.descricao,
                    abreviatura: content.abreviatura,
                    codigoTCE: content.codigoTCE,
                    classificacao: content.classificacao,
                    inscDividaAtiva: content.inscDividaAtiva,
                    naoContabilizavel: content.naoContabilizavel === "true" // Convert to boolean
                }
            };
        });
        
        let report = [];
        let reportIds = [];
        
        for (const record of transformedData) {
            const idIntegracao = record.idIntegracao;
        
            if (idIntegracao) {
                try {
                    const requestBody = [record];
        
                    console.log('Enviando o seguinte corpo para a API:', JSON.stringify(requestBody, null, 2));
        
                    const response = await fetch(`https://tributos.betha.cloud/service-layer-tributos/api/receitas`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                        },
                        body: JSON.stringify(requestBody)
                    });
        
                    const responseBody = await response.json();
        
                    if (response.ok) {
                        console.log('Dados enviados com sucesso para a API.');
                        report.push({ record, status: 'success', response: responseBody });
        
                        if (responseBody.idLote) {
                            reportIds.push(responseBody.idLote);
                        }
                    } else {
                        console.error('Erro ao enviar os dados para a API:', response.statusText);
                        report.push({ record, status: 'failed', response: responseBody });
                    }
        
                } catch (err) {
                    console.error('Erro ao enviar o registro para a API:', err);
                    report.push({ record, status: 'error', error: err.message });
                }
            } else {
                console.warn('ID de integração inválido. O registro será ignorado.', record);
                report.push({ record, status: 'invalid', error: 'ID de integração inválido.' });
            }
        }
        
        // Salvar o relatório em 'report.json'
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));
        console.log('Relatório salvo em report.json com sucesso.');
        
        // Salvar os reportIds no arquivo 'report_id.json'
        fs.writeFileSync('report_id.json', JSON.stringify(reportIds, null, 2));
        console.log('report_id.json salvo com sucesso.');
        

    } catch (error) {
        console.error('Erro no processo:', error);
    } finally {
        await sql.close(); // Fechar a conexão com o SQL Server
        console.log('Conexão com o SQL Server fechada.');
    }
}

// Executar a função principal
main();