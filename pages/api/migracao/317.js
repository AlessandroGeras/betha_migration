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
        '17573' as id
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS parametroExerc,
JSON_QUERY(
    (SELECT
  case cd_formajulgamento  
  when 1 then 16819
  when 2 then 16820
  end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS formaJulgamento,
JSON_QUERY(
    (SELECT
  10778 as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS formaPagamento,
JSON_QUERY(
    (SELECT
  10 as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS tipoObjeto,
JSON_QUERY(
    (SELECT
  5974 as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS regimeExecucao,
JSON_QUERY(
    (SELECT
  164027 as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS prazoEntrega ,
aa_processo as anoProtocolo,
JSON_QUERY(
                (SELECT
                'Q'         as valor,
                'QUANTIDADE' as descricao
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS controleSaldo,
'false' as previsaoSubcontratacao,
'false' as orcamentoSigiloso,
ds_justificativa as justificativa,
ds_objeto as objeto,
nr_processo as numeroProcesso,
dt_licitacao as dataProcesso,
dt_licitacao as dataInicioRecebimentoEnvelope,
dt_abertura as dataAberturaEnvelope,
dt_encerramento as dataFinalRecebimentoEnvelope,
'false' as exigeSubcontratacao,
nr_licitacao as numeroSequencial,
aa_licitacao as anoSequencial,
'false' as controleSaldoOrganograma,
'false' as itemExclusivoMPE,
'false' as beneficiaMPELocais,
'false' as registroPreco,
JSON_QUERY(
    (SELECT
JSON_QUERY(
    (SELECT
  169 as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS fundamentacaoLegal,
JSON_QUERY(
    (SELECT
  36067993 as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS responsavel,
JSON_QUERY(
    (SELECT
  69142 as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS Localentrega,
JSON_QUERY(
    (SELECT
  '51989' as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS comissao,
JSON_QUERY(
    (SELECT
case cd_modalidade
when 'IN-G' then 'CONTRATACAO_DIRETA' 
when 'DISP' THEN 'LICITACAO'
end as valor
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS formaContratacao,
JSON_QUERY(
    (SELECT
  14 as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS modalidade
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
where aa_processo = 2024
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            // Parse JSON strings
            const conteudo = parseJsonSafe(record.conteudo);
            const COMPLicitacao = parseJsonSafe(record.context);

            return {
                conteudo: {
                    formaPagamento: {
                        id: conteudo.formaPagamento.id
                    },
                    formaJulgamento: {
                        id: conteudo.formaJulgamento.id
                    },
                    previsaoSubcontratacao: conteudo?.previsaoSubcontratacao === 'true',
                    numeroProcesso: conteudo?.numeroProcesso,
                    orcamentoSigiloso: conteudo?.orcamentoSigiloso === 'true',
                    localEntrega: {
                        id: conteudo.formaContratacao.Localentrega.id
                    },
                    tipoObjeto: {
                        id:conteudo.tipoObjeto.id
                    },
                    objeto: conteudo.objeto,
                    controleSaldo:{
                        valor:"QUANTIDADE"
                    },
                    justificativa: conteudo.justificativa,
                    dataProcesso: formatDate(conteudo.dataProcesso),
                    formaContratacao: {
                        /* modoDisputa: {
                            valor: conteudo?.formaContratacao?.modoDisputa?.valor || null
                        }, */
                        dataInicioRecebimentoEnvelope: formatDate2(conteudo?.dataInicioRecebimentoEnvelope),
                        beneficiaMPELocais: conteudo?.beneficiaMPELocais === 'true',
                        fundamentacaoLegal: conteudo?.formaContratacao?.fundamentacaoLegal,
                        situacaoLances: {
                            valor: "PROPOSTA_FINAL_CONFIRMADA"
                        },
                        numeroSequencial: conteudo?.numeroSequencial,
                        comissao: {
                            id:parseInt(conteudo?.formaContratacao?.comissao.id, 10),
                        },
                        anoSequencial: conteudo?.anoSequencial || null,
                        itemExclusivoMPE: conteudo?.itemExclusivoMPE === 'true',
                        formaContratacao: conteudo?.formaContratacao?.formaContratacao || null,
                        registroPreco: conteudo?.registroPreco === 'true',
                        dataAberturaEnvelope: formatDate2(conteudo?.dataAberturaEnvelope),
                        dataFinalRecebimentoEnvelope: formatDate2(conteudo?.dataFinalRecebimentoEnvelope),
                        desclassificaPropostaInvalida: {
                            valor: "CLASSIFICA"
                        },
                        responsavel: conteudo?.formaContratacao?.responsavel || null,
                        desclassificaPropostaInvalidaLote: {
                            valor: "NAO_APLICA"
                        },
                        exigeSubcontratacao: conteudo?.exigeSubcontratacao === 'true',
                        modalidade: conteudo?.formaContratacao?.modalidade || null
                    },
                    parametroExerc:{
                        id:parseInt(conteudo.parametroExerc.id)
                    },
                    prazoEntrega:{
                        id:conteudo.prazoEntrega.id
                    },
                    controleSaldoOrganograma: conteudo?.controleSaldoOrganograma === 'false',
                    regimeExecucao:{
                        id:conteudo.regimeExecucao.id
                    },
                },
                context: {
                    exercicio: COMPLicitacao.exercicio.toString()
                }
            };
        });

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const response = await fetch('https://compras.betha.cloud/compras-services/api/conversoes/lotes/processos-administrativo', {
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
        console.error('Erro durante o processamento:', error);
    } finally {
        await sql.close();
    }
}

main();
