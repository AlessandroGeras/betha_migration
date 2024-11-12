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
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    //return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function formatDate2(date) {
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

        // Selecionar o banco de dados
        const selectDatabaseQuery = 'USE TRIBUTOS2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
        select 
cd_taxa as idIntegracao,
JSON_QUERY((SELECT 'RECEITAS_DIVERSAS' as cadastro, 
                                   ds_taxa as descricao,
                                   'NAO' as desativado FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS agrupamentosCamposAdicionais
from isstaxas where ds_taxa != 'I.T.B.I.' and ds_taxa != 'TAXA DE CEMITERIO ADULTO' and ds_taxa != 'TAXA DE EXPEDIENTE' and ds_taxa != 'FISCALIZAÇÃO SANITÁRIA' and ds_taxa != 'AUT. IMPRESSÃO DOCUMENTOS FISCAIS' and ds_taxa != 'CERTIDÃO NEGATIVA' and ds_taxa != 'FORNECIMENTO DE 2ª VIA' and ds_taxa != 'TAXA DE HORA MAQUINA' and ds_taxa != 'VALORES DE JUROS E MULTAS'


`;
        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const agrupamentosCamposAdicionais = JSON.parse(record.agrupamentosCamposAdicionais);

            return {
                idIntegracao: record.idIntegracao.toString(),
                agrupamentos: {
                    cadastro: agrupamentosCamposAdicionais.cadastro,
                    descricao: agrupamentosCamposAdicionais.descricao,
                    desativado: agrupamentosCamposAdicionais.desativado
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

                    const response = await fetch(`https://tributos.betha.cloud/service-layer-tributos/api/agrupamentos`, {
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