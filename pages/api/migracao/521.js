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

function formatDate2(date) {
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

function parseJsonSafe(data) {
    try {
        return JSON.parse(data);
    } catch (error) {
        console.error('Erro ao parsear JSON:', error);
        return null;
    }
}

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "COMP_ALMO"
        const selectDatabaseQuery = 'USE COMP_ALMO';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select
JSON_QUERY(
                (SELECT
JSON_QUERY(
              (SELECT
        19508 as id
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
               ) AS parametroExerc,
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
  case 
        when nr_processo in (28, 20, 18, 31, 30, 33, 29, 216, 333, 334, 335, 878, 877, 334,  1046, 1240, 1306, 1503) THEN 14331
        when nr_licitacao in (12, 15) THEN 14331
        when nr_processo in (784, 1185, 1331, 1451, 1566, 192, 399, 475, 398, 625, 629, 620, 588, 464, 625, 582, 589, 1194, 1218, 1203, 1341, 1317, 992, 1400, 1123, 1517) THEN 14338
        when nr_processo in (461, 401, 744) THEN 14329
        end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS formaPagamento,
JSON_QUERY(
    (SELECT
  case
  when nr_processo in (28, 20, 18, 31, 30, 33, 29, 216, 333, 334, 335, 878, 877, 334, 1046, 1240, 1306, 1503, 1331, 784, 192, 399, 398, 625, 629, 620, 588, 464, 625, 582, 1203, 1451, 1185, 589, 1194, 1218, 1341, 1317, 992, 1400, 1123, 1517) THEN 10
  when nr_licitacao in (12, 15) THEN 10
  when nr_processo in (461, 401, 744) THEN 11
  when nr_processo in (784, 1331, 475) THEN 131
  end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS tipoObjeto,
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
JSON_QUERY(
    (SELECT
  173405 as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS prazoEntrega ,
aa_processo as anoProtocolo,
JSON_QUERY(
                (SELECT
                CASE
                                when nr_processo in (18, 216, 334, 335, 334, 1046, 1503, 1185, 1331, 192, 399, 475, 398, 625, 629, 620, 588, 464, 625, 582, 589, 1194, 1218, 1203, 1341, 1317, 992, 1400, 1517) THEN 'QUANTIDADE'
                                when nr_processo in (28, 20, 31, 30, 33, 29, 333, 878, 877, 1240, 1306, 461, 784, 1451, 1566, 1123, 401, 744) THEN 'VALOR'
                                when nr_licitacao in (12, 15) THEN 'VALOR'
                                end as valor,
                CASE
                                when nr_processo in (18, 216, 334, 335, 334, 1046, 1503, 1185, 1331, 192, 399, 475, 398, 625, 629, 620, 588, 464, 625, 582, 589, 1194, 1218, 1203, 1341, 1317, 992, 1400, 1517) THEN 'QUANTIDADE'
                                when nr_processo in (28, 20, 31, 30, 33, 29, 333, 878, 877, 1240, 1306, 461, 784, 1451, 1566, 1123, 401, 744) THEN 'VALOR'
                                when nr_licitacao in (12, 15) THEN 'VALOR'
                                end as descricao
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS controleSaldo,
'false' as previsaoSubcontratacao,
'false' as orcamentoSigiloso,
ds_justificativa as justificativa,
ds_objeto as objeto,
nr_processo as numeroProcesso,
format(dt_licitacao, 'yyyy-MM-dd') as dataProcesso,
'false' as controleSaldoOrganograma,
JSON_QUERY(
    (SELECT
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
  '53372' as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS comissao,
JSON_QUERY(
    (SELECT
'LICITACAO' as valor
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS formaContratacao,
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
'false' as beneficiaMPELocais,
'false' as registroPreco,
JSON_QUERY(
    (SELECT
  'PENDENTE' as valor
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS situacaoLances,
aa_licitacao as anoSequencial,
format(dt_abertura, 'yyyy-MM-dd HH:MM:ss') as dataAberturaEnvelope,
format(dt_licitacao, 'yyyy-MM-dd HH:MM:ss') as dataInicioRecebimentoEnvelope,
format(dt_encerramento, 'yyyy-MM-dd HH:MM:ss') as dataFinalRecebimentoEnvelope,
JSON_QUERY(
    (SELECT
  'CLASSIFICA' as valor
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS desclassificaPropostaInvalida,
JSON_QUERY(
    (SELECT
  'NAO_APLICA' as valor
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS desclassificaPropostaInvalidaLote,
'false' as exigeSubcontratacao,
nr_licitacao as numeroSequencial,
'false' as itemExclusivoMPE
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS formaContratacao
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS conteudo,
JSON_QUERY(
    (SELECT
  aa_licitacao as exercicio
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS context
from COMPLicitacao
where aa_processo = 2024 and nr_processo in ('1240', '1566', '399', '475', '1194', '1123')
order by nr_processo asc;

        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
    // Parse JSON strings for conteudo and context fields
    const conteudo = JSON.parse(record.conteudo || '{}');
    const COMPLicitacao = JSON.parse(record.context || '{}');

    return {
        conteudo: {
            parametroExerc: { id: conteudo.parametroExerc?.id },
            localEntrega: { id: conteudo.localEntrega?.id },
            formaJulgamento: { id: conteudo.formaJulgamento?.id },
            formaPagamento: { id: conteudo.formaPagamento?.id },
            tipoObjeto: { id: conteudo.tipoObjeto?.id },
            regimeExecucao: { id: conteudo.regimeExecucao?.id },
            prazoEntrega: { id: conteudo.prazoEntrega?.id },
            anoProtocolo: conteudo.anoProtocolo,
            controleSaldo: {
                valor: conteudo.controleSaldo?.valor || "QUANTIDADE",
                descricao: conteudo.controleSaldo?.descricao || "QUANTIDADE"
            },
            previsaoSubcontratacao: conteudo.previsaoSubcontratacao === 'true',
            orcamentoSigiloso: conteudo.orcamentoSigiloso === 'true',
            justificativa: conteudo.justificativa,
            objeto: conteudo.objeto,
            numeroProcesso: conteudo.numeroProcesso,
            dataProcesso: formatDate(conteudo.dataProcesso),
            controleSaldoOrganograma: conteudo.controleSaldoOrganograma === 'false',
            formaContratacao: {
                fundamentacaoLegal: { id: conteudo.formaContratacao?.fundamentacaoLegal?.id },
                responsavel: { id: conteudo.formaContratacao?.responsavel?.id },
                comissao: { id: conteudo.formaContratacao?.comissao?.id },
                formaContratacao: { valor: conteudo.formaContratacao?.formaContratacao?.valor || "LICITACAO" },
                modalidade: { id: conteudo.formaContratacao?.modalidade?.id },
                beneficiaMPELocais: conteudo.formaContratacao?.beneficiaMPELocais === 'true',
                registroPreco: conteudo.formaContratacao?.registroPreco === 'true',
                situacaoLances: { valor: conteudo.formaContratacao?.situacaoLances?.valor || "PENDENTE" },
                anoSequencial: conteudo.formaContratacao?.anoSequencial,
                dataInicioRecebimentoEnvelope: conteudo.formaContratacao?.dataInicioRecebimentoEnvelope,
                dataAberturaEnvelope: conteudo.formaContratacao?.dataAberturaEnvelope,
                dataFinalRecebimentoEnvelope: conteudo.formaContratacao?.dataFinalRecebimentoEnvelope,
                desclassificaPropostaInvalida: { valor: conteudo.formaContratacao?.desclassificaPropostaInvalida?.valor || "CLASSIFICA" },
                desclassificaPropostaInvalidaLote: { valor: conteudo.formaContratacao?.desclassificaPropostaInvalidaLote?.valor || "NAO_APLICA" },
                exigeSubcontratacao: conteudo.formaContratacao?.exigeSubcontratacao === 'true',
                numeroSequencial: conteudo.formaContratacao?.numeroSequencial,
                itemExclusivoMPE: conteudo.formaContratacao?.itemExclusivoMPE === 'true'
            }
        },
        context: {
            exercicio: COMPLicitacao.exercicio.toString()
        }
    };
});

/* // Save data in chunks
const chunkSize = 50;
for (let i = 0; i < transformedData.length; i += chunkSize) {
    const chunk = transformedData.slice(i, i + chunkSize);
    const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
    fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
    console.log(`Dados salvos em ${chunkFileName}`);
}

return */

// Helper function to split data into chunks
const chunkArray = (array, size) => {
    const chunked = [];
    for (let i = 0; i < array.length; i += size) {
        chunked.push(array.slice(i, i + size));
    }
    return chunked;
};

// Batch sending of transformed data
const batchedData = chunkArray(transformedData, 50);
let report = [];
let reportIds = [];

for (const batch of batchedData) {
    try {
        console.log('Enviando o seguinte corpo para a API:', JSON.stringify(batch, null, 2));

        const response = await fetch(`https://compras.betha.cloud/compras-services/api/conversoes/lotes/processos-administrativo`, {
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
            if (responseBody.idLote) reportIds.push(responseBody.idLote);
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

// Save reports to files
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