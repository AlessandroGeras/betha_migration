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
        const selectDatabaseQuery = 'USE FOLHADB';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
cd_Evento as idIntegracao,
JSON_QUERY(
(SELECT
 case cd_evento 
when	8	then	314
when	9	then	315
when	14	then	316
when	15	then	317
when	16	then	318
when	17	then	319
when	18	then	320
when	19	then	321
when	20	then	322
when	22	then	323
when	23	then	324
when	24	then	325
when	25	then	326
when	29	then	327
when	34	then	328
when	35	then	329
when	38	then	330
when	40	then	331
when	41	then	332
when	43	then	333
when	44	then	334
when	45	then	335
when	46	then	336
when	47	then	337
when	48	then	338
when	49	then	339
when	50	then	340
when	52	then	341
when	54	then	342
when	55	then	343
when	56	then	344
when	57	then	345
when	60	then	346
when	61	then	347
when	63	then	348
when	64	then	349
when	65	then	350
when	66	then	351
when	68	then	352
when	70	then	353
when	71	then	354
when	72	then	355
when	76	then	356
when	77	then	357
when	78	then	358
when	79	then	359
when	80	then	360
when	81	then	361
when	82	then	362
when	83	then	363
when	84	then	364
when	85	then	365
when	86	then	366
when	87	then	367
when	88	then	368
when	89	then	369
when	92	then	370
when	94	then	371
when	96	then	372
when	97	then	373
when	99	then	374
when	107	then	375
when	108	then	376
when	109	then	377
when	113	then	378
when	114	then	379
when	351	then	380
when	360	then	381
when	466	then	382
when	481	then	383
when	482	then	384
when	483	then	385
when	484	then	386
when	500	then	387
when	509	then	388
when	523	then	389
when	526	then	391
when	527	then	392
when	531	then	394
when	532	then	395
when	533	then	396
when	534	then	397
when	535	then	398
when	540	then	402
when	541	then	403
when	543	then	405
when	554	then	407
when	599	then	408
when	902	then	410
when	903	then	411
when	953	then	412
 end as codigo,
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
WHERE cd_Evento IN (8,9,14,15,16,17,18,19,20,22,23,24,25,29,34,35,38,40,41,43,44,45,46,47,48,49,50,52,54,55,56,57,60,61,63,64,65,66,68,70,71,72,76,77,78,79,80,81,82,83,84,85,86,87,88,89,92,94,96,97,99,107,108,109,113,114,351,360,466,481,482,483,484,500,509,523,524,526,527,529,531,532,533,534,535,536,537,539,540,541,542,543,544,554,599,605,902,903,953,954
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
        /*
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
            */

    } catch (error) {
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        sql.close();
    }
}

main();
