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
        const masterConnection = await connectToSqlServer();

        const selectDatabaseQuery = 'USE COMP_ALMO';
        await masterConnection.query(selectDatabaseQuery);

        const userQuery = `
            select
        CASE 
                        WHEN nr_pedido = 1 THEN 21272135
                        WHEN nr_pedido IN (4, 12, 18, 18, 19, 20, 21) THEN 21272149
                        WHEN nr_pedido IN (2, 3) THEN 21272136
                        WHEN nr_pedido IN (5, 15, 24, 40) THEN 21272150
                        WHEN nr_pedido IN (9, 10, 11, 13, 22, 23, 41, 43) THEN 21272152
                        WHEN nr_pedido IN (6, 7, 8, 14, 25, 26, 29, 32, 33, 42) THEN 21272151
                        WHEN nr_pedido IN (16, 17, 44, 45) THEN 21272153
                        WHEN nr_pedido IN (27, 28) THEN 21272154
                        WHEN nr_pedido IN (30, 31) THEN 21272173
                        WHEN nr_pedido IN (36, 37) THEN 21272183
                        WHEN nr_pedido IN (38, 39) THEN 21272211
                        END AS contratacaoId,
        JSON_QUERY(
        (SELECT
            CASE
                                WHEN nr_pedido = 1 THEN 12040161
                WHEN nr_pedido = 2 THEN 12040067
                WHEN nr_pedido = 3 THEN 12040068
                                WHEN nr_pedido = 4 THEN 12040070
                WHEN nr_pedido = 5 THEN 12040072
                WHEN nr_pedido = 6 THEN 12040073
                WHEN nr_pedido = 7 THEN 12040074
                WHEN nr_pedido = 8 THEN 12040075
                WHEN nr_pedido = 9 THEN 12040076
                WHEN nr_pedido = 10 THEN 12040078
                WHEN nr_pedido = 11 THEN 12040079
                                WHEN nr_pedido = 12 THEN 12040081
                WHEN nr_pedido = 13 THEN 12040082
                WHEN nr_pedido = 14 THEN 12040083
                WHEN nr_pedido = 15 THEN 12040085
                WHEN nr_pedido = 16 THEN 12040086
                WHEN nr_pedido = 17 THEN 12040087
                                WHEN nr_pedido = 18 THEN 12040088
                                WHEN nr_pedido = 19 THEN 12040090
                WHEN nr_pedido = 20 THEN 12040091
                WHEN nr_pedido = 21 THEN 12040092
                WHEN nr_pedido = 22 THEN 12040094
                WHEN nr_pedido = 23 THEN 12040095
                WHEN nr_pedido = 24 THEN 12040097
                WHEN nr_pedido = 25 THEN 12040098
                WHEN nr_pedido = 26 THEN 12040099
                WHEN nr_pedido = 27 THEN 12040100
                WHEN nr_pedido = 28 THEN 12040102
                WHEN nr_pedido = 29 THEN 12040104
                WHEN nr_pedido = 30 THEN 12040107
                WHEN nr_pedido = 31 THEN 12040108
                WHEN nr_pedido = 32 THEN 12040109
                WHEN nr_pedido = 33 THEN 12040110
                WHEN nr_pedido = 36 THEN 12040111
                WHEN nr_pedido = 37 THEN 12040113
                WHEN nr_pedido = 38 THEN 12040114
                WHEN nr_pedido = 39 THEN 12040115
                WHEN nr_pedido = 40 THEN 12040117
                WHEN nr_pedido = 41 THEN 12040118
                WHEN nr_pedido = 42 THEN 12040119
                WHEN nr_pedido = 43 THEN 12040120
                WHEN nr_pedido = 44 THEN 12040122
                WHEN nr_pedido = 45 THEN 12040124
                END AS id
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
    ) as solicitacao,
        CASE
            WHEN nr_pedido IN (1) THEN 28
        WHEN nr_pedido IN (4, 12, 18, 19, 20, 21) THEN 20
        WHEN nr_pedido IN (2, 3) THEN 18
        WHEN nr_pedido IN (5, 15, 24, 40) THEN 31
        WHEN nr_pedido IN (9, 10, 11, 13, 22, 23, 41, 43) THEN 30
        WHEN nr_pedido IN (6, 7, 8, 14, 25, 26, 29, 32, 33, 42) THEN 33
        WHEN nr_pedido IN (16, 17, 44, 45) THEN 29
        WHEN nr_pedido IN (27, 28) THEN 216
        WHEN nr_pedido IN (30, 31) THEN 333
        WHEN nr_pedido IN (36, 37) THEN 334
        WHEN nr_pedido IN (38, 39) THEN 335
        END as numero,
        'false' as houveDesconto,
        'false' as houveRetencaoTributaria,
        '2024-10-14' as dataProvisoria,
        'Edvaldo' as nomeResponsavel
from COMPPedidos where aa_pedido = 2024 and nr_pedido not in (34, 35);
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        const transformedData = resultData.map(record => {
            try {
                const solicitacao = record.solicitacao ? JSON.parse(record.solicitacao) : null;
        
                return {
                    solicitacao: {
                        id: solicitacao?.id || null
                    },
                    numero: record.numero || null,
                    houveDesconto: record.houveDesconto || false,
                    houveRetencaoTributaria: record.houveRetencaoTributaria || false,
                    dataProvisoria: record.dataProvisoria || null,
                    contratacaoId: record.contratacaoId || null,                    
                    nomeResponsavel: record.nomeResponsavel // Mantido apenas para uso na URL
                };
            } catch (err) {
                console.error('Erro ao processar registro:', err);
                return null;
            }
        }).filter(record => record !== null);
        
        let report = [];
        
        for (const record of transformedData) {
            const { contratacaoId, solicitacao } = record;
        
            if (contratacaoId && solicitacao.id) {
                const url = `https://services.contratos.betha.cloud/contratacao-services/api/exercicios/2024/contratacoes/${contratacaoId}/solicitacoes/${solicitacao.id}/recebimentos`;
        
                // Criação do objeto de corpo sem o contratacaoId
                const body = {
                    solicitacao: {
                        id: solicitacao.id
                    },
                    numero: record.numero,
                    houveDesconto: record.houveDesconto,
                    houveRetencaoTributaria: record.houveRetencaoTributaria,
                    dataProvisoria: record.dataProvisoria,
                    nomeResponsavel: record.nomeResponsavel
                };
        
                try {
                    // Log do corpo que será enviado
                    console.log('Enviando corpo:', JSON.stringify(body, null, 2));
        
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer 1d12dec7-0720-4b34-a2e5-649610d10806`
                        },
                        body: JSON.stringify(body)
                    });
        
                    const responseBody = await response.json();
        
                    if (response.ok) {
                        console.log(`Dados enviados com sucesso para a rota ${url}`);
                        report.push({ record, status: 'success', response: responseBody });
                    } else {
                        // Log do erro de resposta junto com o corpo enviado
                        console.error(`Erro ao enviar os dados para a rota ${url}:`, response.statusText);
                        console.error('Corpo enviado:', JSON.stringify(body, null, 2));
                        console.error('Erro da API:', responseBody);
                        report.push({ record, status: 'failed', response: responseBody });
                    }
                } catch (err) {
                    console.error(`Erro ao enviar o registro para a rota ${url}:`, err);
                    report.push({ record, status: 'error', error: err.message });
                }
            } else {
                console.error('ID de contratação ou solicitação inválido. O registro será ignorado.');
                report.push({ record, status: 'invalid', error: 'ID de contratação ou solicitação inválido.' });
            }
        }
        
        // Salvar o relatório em 'report.json'
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));
        console.log('Relatório salvo em report.json');
        

    } catch (error) {
        console.error('Erro durante a execução do programa:', error);
    } finally {
        sql.close();
    }
}

main();