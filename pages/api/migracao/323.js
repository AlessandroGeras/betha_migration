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

function formatDateToYearMonth(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1; // getMonth() retorna 0-11, então somamos 1

    // Formata o mês para garantir que tenha dois dígitos
    month = month < 10 ? `0${month}` : month;

    return `${year}-${month}`;
}

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "FOLHA_FMAS"
        const selectDatabaseQuery = 'USE FOLHA_FMAS';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
cd_Evento as idIntegracao,
JSON_QUERY(
(SELECT
cd_evento as codigo,
ds_Evento as descricao,
dt_ESValidadeInicio as inicioVigencia,
CASE fl_tpevento
        WHEN  'P' THEN 'VENCIMENTO'
        WHEN  'D' THEN 'DESCONTO'
        WHEN  'E' THEN 'INFORMATIVO_MENOS'
    END AS tipo,
        null as classificacao,
        CASE cd_TipoEvento
        WHEN  '13' THEN 'INTEGRAL_13_SALARIO'
        WHEN  '14' THEN 'SALARIO_VENCIMENTO_SOLDO'
        WHEN  'AB' THEN 'FERIAS_ABONO_PECUNIARIO'
        WHEN  'AC' THEN 'AUXILIO_ACIDENTE_TRABALHO'
        WHEN  'AD' THEN 'AUXILIO_DOENCA'
        WHEN  'AF' THEN 'OUTROS_AUXILIOS'
        WHEN  'AN' THEN 'ADICIONAL_NOTURNO'
        WHEN  'AP' THEN 'COMPLEMENTACAO_APOSENTADORIA_PENSAO'
        WHEN  'AT' THEN 'ADICIONAL_TEMPO_SERVICO'
        WHEN  'AV' THEN 'INDENIZACAO_AVISO_PREVIO'
        WHEN  'BA' THEN 'SALARIO_VENCIMENTO_SOLDO'
        WHEN  'CO' THEN 'GRATIFICACOES'
        WHEN  'CS' THEN 'COMPLEMENTO_DE_SALARIO_MINIMO_RPPS'
        WHEN  'DS' THEN 'OUTROS_DESCONTOS'
        WHEN  'FE' THEN 'FERIAS'
        WHEN  'FG' THEN 'FGTS_DEPOSITIO'
        WHEN  'GF' THEN 'GRATIFICACOES'
        WHEN  'GI' THEN 'GRATIFICACOES'
        WHEN  'GM' THEN 'GRATIFICACOES'
        WHEN  'GP' THEN 'GRATIFICACOES'
        WHEN  'GR' THEN 'GRATIFICACOES'
        WHEN  'GS' THEN 'GRATIFICACOES'
        WHEN  'GT' THEN 'GRATIFICACOES'
        WHEN  'HE' THEN 'HORAS_EXTRAORDINARIAS'
        WHEN  'HN' THEN 'HORAS_EXTRAORDINARIAS'
        WHEN  'HT' THEN 'HORAS_EXTRAORDINARIAS'
        WHEN  'IN' THEN 'ADICIONAL_INSALUBRIDADE'
        WHEN  'LC' THEN 'LICENCA_PREMIO'
        WHEN  'MA' THEN 'SALARIO_MATERNIDADE'
        WHEN  'OU' THEN 'OUTROS_VALORES_TRIBUTAVEIS'
        WHEN  'PA' THEN 'PENSAO_ALIMENTICIA'
        WHEN  'PC' THEN 'OUTROS_VALORES_INFORMATIVOS'
        WHEN  'PP' THEN 'CONTRIBUICAO_PREVIDENCIARIA'
        WHEN  'PV' THEN 'CONTRIBUICAO_PREVIDENCIARIA'
        WHEN  'SA' THEN 'SALARIO_VENCIMENTO_SOLDO'
        WHEN  'SB' THEN 'SALARIO_VENCIMENTO_SOLDO'
        WHEN  'SE' THEN 'SALARIO_VENCIMENTO_SOLDO'
        WHEN  'SF' THEN 'SALARIO_FAMILIA'
        WHEN  'SP' THEN 'SALARIO_VENCIMENTO_SOLDO'
        WHEN  'SU' THEN 'SUBSIDIO'
        WHEN  'VP' THEN 'PROVENTOS'
        WHEN  'XN' THEN 'OUTROS_AUXILIOS'
    END AS naturezaRubrica,
        null as taxa,
        null as codigoEsocial,
        JSON_QUERY(
                (SELECT
                '1' as id
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS ato,
        CASE fl_IncidDSR
     WHEN  'S' THEN 'true'
    WHEN  'N' THEN 'false'
    END AS incideDsr,
        'true' as compoemHorasMes,
        'false' as calcularPorUltimo,
        ds_ESObservacao AS observacao,
        'false' as desabilitado,
        null as script,
        case fl_IncidIRFonte
        WHEN  'S' THEN 'RENDIMENTOS_TRIBUTAVEL_REMUNERACAO_MENSAL'
    WHEN  'N' THEN 'RENDIMENTO_NAO_TRIBUTAVEL'
    END AS incidenciaIrrf,
        'NAO_E_BASE_DE_CALCULO' as incidenciaContribuicaoSindicalLaboral,
        'false' as enviaTransparencia,
        'false' as enviaEsocial,
        'false' as tetoRemuneratorio,
        'true' as enviaRais,
        'FEDERAL' AS tiposPrevidencia,
CASE fl_TpCalculo
        WHEN  'A' THEN 'AUTOMATICO'
        WHEN  'V' THEN 'VALOR'
        WHEN  'H' THEN 'HORAS'
        WHEN  'I' THEN 'AUTOMATICO'
    END AS unidade
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS conteudo
from FOLHEvento
WHERE cd_Evento IN (
1, 5, 6, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 102, 103, 104, 106, 107, 110, 112, 113, 114, 115, 250, 300, 310, 315, 351, 360, 399, 400, 401, 402, 453, 454, 455, 456, 457, 461, 462, 466, 467, 481, 482, 483, 484, 499, 500, 501, 502, 504, 506, 507, 509, 510, 511, 512, 513, 514, 517, 518, 521, 522, 523, 524, 526, 527, 529, 530, 531, 532, 533, 534, 535, 536, 537, 539, 540, 541, 542, 543, 544, 554, 599, 601, 602, 603, 605, 672, 703, 900, 901, 902, 903, 951, 952, 953
, 954
)
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const conteudo = JSON.parse(record.conteudo); // Parse the JSON string to an object
            

            return {
                idIntegracao: record.idIntegracao.toString(), // Convert idIntegracao to string
                conteudo: {
                    codigo: conteudo.codigo,
                    descricao: conteudo.descricao,
                    inicioVigencia: formatDateToYearMonth(conteudo.inicioVigencia), // Format date to "YYYY-MM"
                    tipo: conteudo.tipo,
                    classificacao: null,
                    naturezaRubrica: conteudo.naturezaRubrica, // Assuming this is always true as per your template
                    classificacaoBaixaProvisao: conteudo.classificacaoBaixaProvisao,
                    unidade: conteudo.unidade,
                    taxa: null,
                    codigoEsocial: null,
                    ato: conteudo.ato,
                    incideDsr: conteudo.incideDsr,
                    compoemHorasMes: conteudo.compoemHorasMes,
                    calcularPorUltimo: conteudo.calcularPorUltimo,
                    observacao: conteudo.observacao,
                    desabilitado: conteudo.desabilitado,
                    script: null,
                    incidenciaIrrf: conteudo.incidenciaIrrf,
                    numeroProcessoIrrf: conteudo.numeroProcessoIrrf,
                    incicativoSuspensaoIrrf: conteudo.incicativoSuspensaoIrrf,
                    incidenciaFgts: conteudo.incidenciaFgts,
                    numeroProcessoFgts: conteudo.numeroProcessoFgts,
                    incidenciaContribuicaoSindicalLaboral: conteudo.incidenciaContribuicaoSindicalLaboral,
                    incidenciaRpps: conteudo.incidenciaRpps,
                    numeroProcessoContribuicaoSindicalLaboral: conteudo.numeroProcessoContribuicaoSindicalLaboral,
                    incidenciaPrevidenciaSocialFeriasMes: conteudo.incidenciaPrevidenciaSocialFeriasMes,
                    tipoProcessoPrevidenciaSocialFeriasMes: conteudo.tipoProcessoPrevidenciaSocialFeriasMes,
                    numeroProcessoPrevidenciaSocialFeriasMes: conteudo.numeroProcessoPrevidenciaSocialFeriasMes,
                    extensaoDecisaoPrevidenciaSocialFeriasMes: conteudo.extensaoDecisaoPrevidenciaSocialFeriasMes,
                    indicativoSuspensaoPrevidenciaSocialFeriasMes: conteudo.indicativoSuspensaoPrevidenciaSocialFeriasMes,
                    incidenciaIrrfFeriasMes: conteudo.incidenciaIrrfFeriasMes,
                    numeroProcessoIrrfFeriasMes: conteudo.numeroProcessoIrrfFeriasMes,
                    indicativoSuspensaoIrrfFeriasMes: conteudo.indicativoSuspensaoIrrfFeriasMes,
                    incidenciaFgtsFeriasMes: conteudo.incidenciaFgtsFeriasMes,
                    numeroProcessoFgtsFeriasMes: conteudo.numeroProcessoFgtsFeriasMes,
                    incidenciaContribuicaoSindicalLaboralFeriasMes: conteudo.incidenciaContribuicaoSindicalLaboralFeriasMes,
                    incidenciaRppsFeriasMes: conteudo.incidenciaRppsFeriasMes,
                    numeroProcessoContribuicaoSindicalLaboralFeriasMes: conteudo.numeroProcessoContribuicaoSindicalLaboralFeriasMes,
                    descricaoRubrica: conteudo.descricaoRubrica,
                    descricaoRubricaFeriasMes: conteudo.descricaoRubricaFeriasMes,
                    enviaTransparencia: conteudo.enviaTransparencia,
                    enviaEsocial: conteudo.enviaEsocial,
                    tabelaRubricas: conteudo.tabelaRubricas,
                    tetoRemuneratorio: conteudo.tetoRemuneratorio,
                    enviaRais: conteudo.enviaRais,
                    codigoRubrica: conteudo.codigoRubrica,
                    codigoRubricaFeriasMes: conteudo.codigoRubricaFeriasMes,
                    tiposPrevidencia: [
                        conteudo.tiposPrevidencia
                    ],
                    formula: conteudo.formula,
                }
            };
        });

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        for (const record of transformedData) {
            const response = await fetch('https://pessoal.betha.cloud/service-layer/v1/api/configuracao-evento', {
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
        // Fechar a conexão com o SQL Server
        sql.close();
    }
}

main();
