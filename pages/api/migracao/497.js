const sql = require('mssql');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const fs = require('fs');
const { format } = require('date-fns');

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

        // Selecionar o banco de dados "FOLHADB"
        const selectDatabaseQuery = 'USE FOLHADB';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
                s.nr_cnpj as idIntegracao,
                JSON_QUERY(
                    (SELECT 
                        s.nr_cnpj as id,
                        '2024-01-01' as inicioVigencia,
                        'JURIDICA' as tipoPessoa,
                        'SINDICATO' as tipo,
                        s.nr_cnpj as cnpj,
                        s.ds_Sindicato as razaoSocial,
                        s.ds_Sindicato as nomeFantasia,
                        '2024-01-01' as dataRegistro,
                        'false' as isentoInscricaoEstadual,
                        'false' as optanteSimples,
                        'ENTIDADE_SINDICAL' as naturezaJuridica
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS content	
            from FOLHSindicato s
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        console.log(`Tamanho do resultData: ${resultData.length}`);

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const content = JSON.parse(record.content);
            return {
                idIntegracao: record.idIntegracao,
                conteudo: {
                    id: content.id,
                    inicioVigencia: `${content.inicioVigencia} 00:00:00`,
                    tipoPessoa: content.tipoPessoa,
                    tipo: content.tipo,
                    cnpj: content.cnpj.toString().padStart(14, '0'), // Completa com zeros à esquerda
                    razaoSocial: content.razaoSocial,
                    nomeFantasia: content.nomeFantasia,
                    dataRegistro: content.dataRegistro,
                    isentoInscricaoEstadual: content.isentoInscricaoEstadual,
                    optanteSimples: content.optanteSimples,
                    naturezaJuridica: content.naturezaJuridica
                }
            };
        });

        console.log(`Tamanho do transformedData: ${transformedData.length}`);

        // Dividir os dados em chunks de 50 registros
        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${Math.floor(i / chunkSize) + 1}.json`;

            // Log do tamanho do chunk e nome do arquivo
            console.log(`Salvando chunk de ${chunk.length} registros em ${chunkFileName}`);

            // Escreve o arquivo de log do chunk
            try {
                fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
                console.log(`Dados salvos em ${chunkFileName}`);
            } catch (err) {
                console.error(`Erro ao salvar ${chunkFileName}:`, err);
            }
        }

        let report = [];
        let reportIds = [];

        for (const record of transformedData) {
            const idIntegracao = record.idIntegracao;
        
            if (idIntegracao) {
                try {
                    const requestBody = [record];
        
                    console.log('Enviando o seguinte corpo para a API:', JSON.stringify(requestBody, null, 2));
        
                    const response = await fetch(`https://pessoal.betha.cloud/service-layer/v1/api/pessoa`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                        },
                        body: JSON.stringify(requestBody)
                    });
        
                    const responseBody = await response.json();
                    console.log('Corpo da resposta da API:', responseBody);
        
                    if (response.ok) {
                        console.log('Dados enviados com sucesso para a API.');
                        report.push({ record, status: 'success', response: responseBody });
        
                        // Verificar e registrar o idLote, se presente
                        if (responseBody.id) {
                            reportIds.push(responseBody.id);
                            console.log(`ID registrado: ${responseBody.id}`);
                        } else {
                            console.warn('Nenhum ID encontrado na resposta da API.');
                        }
                    } else {
                        console.error('Erro ao enviar os dados para a API:', response.statusText);
                        console.error('Corpo da resposta de erro:', responseBody);
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
        
        // Salvar o relatório
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));
        console.log('Relatório salvo em report.json com sucesso.');
        
        // Verificar se há IDs antes de salvar o report_id
        if (reportIds.length > 0) {
            fs.writeFileSync('report_id.json', JSON.stringify(reportIds, null, 2));
            console.log('report_id.json salvo com sucesso.');
        } else {
            console.warn('Nenhum ID foi encontrado. report_id.json não será salvo.');
        }

    } catch (error) {
        console.error('Erro no processo:', error);
    } finally {
        await sql.close(); // Fechar a conexão com o SQL Server
        console.log('Conexão com o SQL Server fechada.');
    }
}

// Executar a função principal
main();
