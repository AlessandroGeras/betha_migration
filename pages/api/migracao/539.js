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
        const masterConnection = await connectToSqlServer();
        const selectDatabaseQuery = 'USE COMP_ALMO';
        await masterConnection.query(selectDatabaseQuery);

        const userQuery = `  
select
JSON_QUERY(
                (SELECT
JSON_QUERY(
              (SELECT
        CASE
WHEN nr_processo = 399 THEN 1312187
WHEN nr_processo = 475 THEN 1312188
WHEN nr_processo = 1123 THEN 1312189
WHEN nr_processo = 1194 THEN 1312190
WHEN nr_processo = 1240 THEN 1312191
WHEN nr_processo = 620 THEN 1312192
WHEN nr_processo = 1400 THEN 1312193
WHEN nr_processo = 18 THEN 1312239
WHEN nr_processo = 20 THEN 1312240
WHEN nr_processo = 28 THEN 1312241
WHEN nr_processo = 29 THEN 1312242
WHEN nr_processo = 30 THEN 1312243
WHEN nr_processo = 31 THEN 1312244
WHEN nr_processo = 33 THEN 1312245
WHEN nr_processo = 192 THEN 1312246
WHEN nr_processo = 216 THEN 1312247
WHEN nr_processo = 333 THEN 1312248
WHEN nr_processo = 334 THEN 1312249
WHEN nr_processo = 335 THEN 1312250
WHEN nr_processo = 398 THEN 1312251
WHEN nr_processo = 401 THEN 1312252
WHEN nr_processo = 461 THEN 1312253
WHEN nr_processo = 464 THEN 1312254
WHEN nr_processo = 582 THEN 1312255
WHEN nr_processo = 588 THEN 1312256
WHEN nr_processo = 589 THEN 1312257
WHEN nr_processo = 625 THEN 1312258
WHEN nr_processo = 744 THEN 1312260
WHEN nr_processo = 784 THEN 1312261
WHEN nr_processo = 877 THEN 1312262
WHEN nr_processo = 878 THEN 1312263
WHEN nr_processo = 992 THEN 1312264
WHEN nr_processo = 1046 THEN 1312265
WHEN nr_processo = 1185 THEN 1312266
WHEN nr_processo = 1203 THEN 1312267
WHEN nr_processo = 1218 THEN 1312268
WHEN nr_processo = 1306 THEN 1312269
WHEN nr_processo = 1317 THEN 1312270
WHEN nr_processo = 1331 THEN 1312271
WHEN nr_processo = 1341 THEN 1312272
WHEN nr_processo = 1451 THEN 1312273
WHEN nr_processo = 1503 THEN 1312274
WHEN nr_processo = 1517 THEN 1312275
WHEN nr_processo = 1566 THEN 1312348
WHEN nr_processo = 629 THEN 1312350
WHEN nr_processo = 3 THEN 1312414
WHEN nr_processo = 5 THEN 1312432
WHEN nr_processo = 22 THEN 1312433
WHEN nr_processo = 34 THEN 1312436
WHEN nr_processo = 40 THEN 1312437
WHEN nr_processo = 51 THEN 1312438
WHEN nr_processo = 86 THEN 1312439
WHEN nr_processo = 626 THEN 1312605
WHEN nr_processo = 879 THEN 1312631
WHEN nr_processo = 16 THEN 1312640
end as id
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
               ) AS processoAdmistrativo,
JSON_QUERY(
    (SELECT
  case 
  when nr_licitacao in (12, 15) THEN 17947
  when nr_processo in (28, 20, 31, 30, 33, 29, 216, 333, 334, 335, 878, 877, 334, 1046, 1240, 1306, 1503) THEN 17947
  when nr_processo in (18, 461, 784, 1185, 1331, 1451, 1566, 192, 399, 475, 398, 625, 629, 620, 588, 464, 625, 582, 589, 1194, 1218, 1203, 1341, 1317, 992, 1400, 1123, 1517, 401, 744) THEN 17945
  end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS formaJulgamento,
JSON_QUERY(
    (SELECT
 case cd_modalidade
when 'IN-G' then 202 
when 'DISP' THEN 314
when 'CP-E' THEN 235
when 'PR-E' THEN 225
when 'PR-C' THEN 333
end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS fundamentacaoLegal,
JSON_QUERY(
    (SELECT
  37588195 as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS responsavel,
JSON_QUERY(
    (SELECT
'LICITACAO' as valor
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS formaContratacao,
JSON_QUERY(
    (SELECT
  72541 as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS localEntrega,
JSON_QUERY(
    (SELECT
  6375 as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS regimeExecucao,
nr_processo as numeroProcesso,
JSON_QUERY(
    (SELECT
  '53372' as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS comissao,
JSON_QUERY(
    (SELECT        
        case cd_modalidade
when 'IN-G' then 15 
when 'DISP' THEN 14
when 'CP-E' THEN 9
when 'PR-E' THEN 13
when 'PR-C' THEN 1043
end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS modalidade,
JSON_QUERY(
    (SELECT
  'CLASSIFICA' as valor,
  'CLASSIFICA' as descricao
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS desclassificaPropostaInvalida,
JSON_QUERY(
    (SELECT
  'NAO_APLICA' as valor,
  'NAO_APLICA' as descricao
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS desclassificaPropostaInvalidaLote,
'false' as registroPreco,
'false' as permiteMaiorLanceConcorrenciaEletronica,
'false' as itemExclusivoMPE,
'false' as exigeSubcontratacao,
'false' as beneficiaMPELocais,
'false' as indicaPercentCotaReservada
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS conteudo,
JSON_QUERY(
    (SELECT
  aa_licitacao as exercicio
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS context
from COMPLicitacao
where aa_processo = 2024 and nr_processo in  (1240, 399, 475, 1194, 1123, 1566)
order by nr_processo asc;
 `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        console.log('Dados recebidos da consulta:', resultData);

        const transformedData = resultData.map(record => {
            // Parse JSON strings for conteudo and context fields
            const conteudo = JSON.parse(record.conteudo || '{}');
            const context = JSON.parse(record.context || '{}');
        
            return {
                conteudo: {
                    formaPagamento: { id: conteudo.formaPagamento?.id },
                    formaJulgamento: { id: conteudo.formaJulgamento?.id },
                    previsaoSubcontratacao: conteudo.previsaoSubcontratacao === 'true',
                    numeroProcesso: conteudo.numeroProcesso,
                    orcamentoSigiloso: conteudo.orcamentoSigiloso === 'true',
                    localEntrega: { id: conteudo.localEntrega?.id },
                    tipoObjeto: { id: conteudo.tipoObjeto?.id },
                    objeto: conteudo.objeto,
                    controleSaldo: { valor: conteudo.controleSaldo?.valor },
                    justificativa: conteudo.justificativa,
                    dataProcesso: conteudo.dataProcesso,
                    formaContratacao: {
                        dataInicioRecebimentoEnvelope: conteudo.formaContratacao?.dataInicioRecebimentoEnvelope,
                        beneficiaMPELocais: conteudo.formaContratacao?.beneficiaMPELocais === 'true',
                        fundamentacaoLegal: { id: conteudo.formaContratacao?.fundamentacaoLegal?.id },
                        situacaoLances: { valor: conteudo.formaContratacao?.situacaoLances?.valor },
                        numeroSequencial: conteudo.formaContratacao?.numeroSequencial,
                        comissao: { id: conteudo.formaContratacao?.comissao?.id },
                        anoSequencial: conteudo.formaContratacao?.anoSequencial,
                        itemExclusivoMPE: conteudo.formaContratacao?.itemExclusivoMPE === 'true',
                        formaContratacao: { valor: conteudo.formaContratacao?.formaContratacao?.valor },
                        registroPreco: conteudo.formaContratacao?.registroPreco === 'true',
                        dataAberturaEnvelope: conteudo.formaContratacao?.dataAberturaEnvelope,
                        dataFinalRecebimentoEnvelope: conteudo.formaContratacao?.dataFinalRecebimentoEnvelope,
                        desclassificaPropostaInvalida: { valor: conteudo.formaContratacao?.desclassificaPropostaInvalida?.valor },
                        responsavel: { id: conteudo.formaContratacao?.responsavel?.id },
                        desclassificaPropostaInvalidaLote: { valor: conteudo.formaContratacao?.desclassificaPropostaInvalidaLote?.valor },
                        exigeSubcontratacao: conteudo.formaContratacao?.exigeSubcontratacao === 'true',
                        modalidade: { id: conteudo.formaContratacao?.modalidade?.id }
                    },
                    parametroExerc: { id: conteudo.parametroExerc?.id },
                    prazoEntrega: { id: conteudo.prazoEntrega?.id },
                    controleSaldoOrganograma: conteudo.controleSaldoOrganograma === 'true',
                    regimeExecucao: { id: conteudo.regimeExecucao?.id }
                },
                context: {
                    exercicio: context.exercicio
                }
            };
        });
        
       
         const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        return 
        
        // Função auxiliar para dividir os dados em lotes de tamanho específico
        const chunkArray = (array, size) => {
            const chunked = [];
            for (let i = 0; i < array.length; i += size) {
                chunked.push(array.slice(i, i + size));
            }
            return chunked;
        };
        
        // Divide os dados transformados em lotes de 50 e prepara para o envio
        const batchedData = chunkArray(transformedData, 50);
        let report = [];
        let reportIds = [];
        
        for (const batch of batchedData) {
            try {
                console.log('Enviando o seguinte corpo para a API:', JSON.stringify(batch, null, 2));
        
                const response = await fetch(`https://compras.betha.cloud/compras-services/api/conversoes/lotes/forma-contratacao`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 4dfb70a8-62e5-4ec2-9028-622e50d1f4d1'
                    },
                    body: JSON.stringify(batch)
                });
        
                const responseBody = await response.json();
        
                if (response.ok) {
                    console.log('Dados enviados com sucesso para a API.');
                    batch.forEach(record => {
                        report.push({ record, status: 'success', response: responseBody });
                    });
        
                    if (responseBody.idLote) {
                        reportIds.push(responseBody.idLote);
                    }
                } else {
                    console.error('Erro ao enviar os dados para a API:', response.statusText);
                    batch.forEach(record => {
                        report.push({ record, status: 'failed', response: responseBody });
                    });
                }
            } catch (err) {
                console.error('Erro ao enviar o batch para a API:', err);
                batch.forEach(record => {
                    report.push({ record, status: 'error', error: err.message });
                });
            }
        }
        
        // Salva o relatório e os IDs dos lotes em arquivos JSON
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));
        console.log('Relatório salvo em report.json com sucesso.');
        
        fs.writeFileSync('report_id.json', JSON.stringify(reportIds, null, 2));
        console.log('report_id.json salvo com sucesso.');

    } catch (error) {
        console.error('Erro no processo:', error);
    } finally {
        await sql.close(); // Close the connection with SQL Server
        console.log('Conexão com o SQL Server fechada.');
    }
}

// Execute the main function
main();