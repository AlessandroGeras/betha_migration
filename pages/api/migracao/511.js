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
    return `${year}-${month}-${day}`;
}

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "CONTABIL2024"
        const selectDatabaseQuery = 'USE CONTABIL2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
ROW_NUMBER() OVER(ORDER BY cd_MSCContaContabil) as idIntegracao,
JSON_QUERY(
(SELECT
2024 as exercicio,
JSON_QUERY(
                        (SELECT
                         case  cd_MSCContaContabil
  when 111111900 then 32921819
 when 111113000 then 32921820
 when 121110401 then 32932385
 when 121110504 then 32932395
 when 121119904 then 32932405
 when 121219899 then 32932637
 when 123110101 then 32932985
 when 123110102 then 32932989
 when 123110104 then 32932991
 when 123110105 then 32932993
 when 123110106 then 32932994
 when 123110107 then 32932995
 when 123110108 then 32932996
 when 123110109 then 32932997
 when 123110112 then 32933001
 when 123110120 then 32933012
 when 123110121 then 32933013
 when 123110201 then 32933016
 when 123110301 then 32933019
 when 123110302 then 32933021
 when 123110303 then 32933022
 when 123110304 then 32933023
 when 123110401 then 32933025
 when 123110402 then 32933026
 when 123110404 then 32933028
 when 123110405 then 32933029
 when 123110501 then 32933033
 when 123110503 then 32933035
 when 123110704 then 32933044
 when 123119999 then 32933058
 when 123210103 then 32933064
 when 123210104 then 32933065
 when 123210503 then 32933108
 when 123210504 then 32933109
 when 123210599 then 32933117
 when 123210601 then 32933119
 when 123210700 then 32933121
 when 123219999 then 32933130
 when 123810101 then 32933140
 when 123810102 then 32933141
 when 123810103 then 32933142
 when 123810104 then 32933143
 when 123810105 then 32933144
 when 211110101 then 32933242
 when 211110102 then 32933245
 when 211430101 then 32933432
 when 213210199 then 32933933
 when 218830104 then 32934581
 when 221110403 then 32934736
 when 221430101 then 32934851
 when 237110100 then 32935834
 when 237110200 then 32935835
 when 237120100 then 32935839
 when 237130100 then 32935844
 when 237130200 then 32935845
 when 237140100 then 32935849
 when 237150100 then 32935854
 when 531200000 then 32938544
 when 531700000 then 32938546
 when 532700000 then 32938551
 when 631100000 then 32938619
 when 632100000 then 32938632
 when 721110000 then 32939026
 when 721120000 then 32939027
 when 721130000 then 32939028
 when 732110000 then 32939059
 when 732120000 then 32939060
 when 791210000 then 32939112
 when 791290000 then 32939116
 when 821110100 then 32939904
 when 821120100 then 32939907
 when 821130100 then 32939910
 when 821130200 then 32939911
 when 832310200 then 32939994
 when 832320200 then 32939998
 when 891210100 then 32940208
 when 891290000 then 32940223

						   end as id
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS contaContabil,
JSON_QUERY(
                        (SELECT
                       
			10442 as id
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS saldoInicial,
IIF(Vl_MSCContaContabilInicial > 0 , 'DEBITO', 'CREDITO') as tipo,
IIF(Vl_MSCContaContabilInicial > 0 , Vl_MSCContaContabilInicial, Vl_MSCContaContabilInicial * -1) as valor,
JSON_QUERY(
                        (SELECT
                  129700  as id
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS fase,
'Abertura da escrituração do ano de 2024' as historico
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
from ContMSCMovimento
where mm_Periodo = 1
and Vl_MSCContaContabilInicial <> 0 
and cd_Entidade = 34
        `;
        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {        
            // Parse the content JSON string in the record
            const content = JSON.parse(record.content);
        
            // Map to the new structure
            return {
                idIntegracao: record.idIntegracao ? record.idIntegracao.toString() : null,
                content: {
                    exercicio: content.exercicio || null,
                    contaContabil: {
                        id: content.contaContabil && content.contaContabil.id ? content.contaContabil.id : null
                    },
                    saldoInicial: {
                        id: content.saldoInicial && content.saldoInicial.id ? content.saldoInicial.id : null
                    },
                    tipo: content.tipo || null,
                    valor: content.valor || null,
                    fase: {
                        id: content.fase && content.fase.id ? content.fase.id : null
                    },
                    historico: content.historico || null
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
        
                    const response = await fetch(`https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/saldos-iniciais-itens`, {
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