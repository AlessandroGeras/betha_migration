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

        // Selecionar o banco de dados "COMP_ALMO_CAM"
        const selectDatabaseQuery = 'USE COMP_ALMO';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
cc.cd_produto as id,
ap.ds_produto as descricao,
ap.ds_produto as nome,
case when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO - OLEO PETRONAS 15W40 LT (LUBRIFICANTE)  CAÇAMBA IVECO TECTOR 260E30 PLACA RSX9G17' then 25449339
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO FILTRO LUBRIFICANTE TECTOR CAÇAMBA IVECO TECTOR 260E30 PLACA RSX9G17' then 25449340
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO FILTRO COMBUSTIVEL TECTOR CAÇAMBA IVECO TECTOR 260E30 PLACA RSX9G17' then 25449341
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO FILTRO RACOR IVECO STRALIS/TECTOR  (SEPARADOR). CAÇAMBA IVECO TECTOR 260E30 PLACA RSX9G17' then 25449342
     when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO FILTRO DE AR IVECO TECTOR NEXPRO' then        25449343
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO FILTRO AR SEGURANCA SECUNDARIO' then        25449344
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP OLEO MERITOR GL5 85W140 LT. CAÇAMBA IVECO TECTOR 260E30 PLACA RSX9G17' then 25449345
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO ADITIVO SOLUÇAO ARREFECEDORA PETRONAS  COOLANT.' then        25449346
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO FL PETRONAS URANIA 500 ST SAE 40 1X20L. CAÇAMBA IVECO TECTOR 260E30 PLACA RSX9G17' then 25449347
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO- (REVISÃO) LAMPADA, FAROL-12V-5W.' then        25449401
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO- (REVISÃO) FILTRO CJ, CABINE, CARVÃO.' then        25449402
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO- (REVISÃO) FILTRO, COMBUSTIVEL MOTOR-4N' then        25449403
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO- (REVISÃO) PASTILHA CJ, DIANTEIRO II' then        25449404
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO- (REVISÃO) JUNTA, VEDACAO DRENO OLEO MOTO.' then        25449405
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO- (REVISÃO) OLEO, MOTOR-SAE 5W30 API-SN.' then        25449406
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO- (REVISÃO) ELEMENTO, FILTRANTE AR MOTOR.' then        25449407
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO- (REVISÃO) FILTRO, OLEO MOTOR' then        25449408
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO- (REVISÃO) KIT LUBRIFICACAO I-MTECH.' then        25449409
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO- (REVISÃO) LIMPADOR, SISTEMA COMB-DIESEL ' then        25449410
         when CAST(ap.ds_produto AS varchar(max)) = 'OLEO LUBRIFICANTE HIDRAULICO 68 20 LT MOTONIVELADORA 120K CATERPILLA' then 25449438
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO BUCHA, MOLA- SUSPENSÃO -TRASEIRA 1' then        25449610
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO FEIXE MOLAS CJ, SUSPENSÃO TRASEIRA' then        25449611
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO LAMPADA FAROL  12V 5W' then        25449612
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO FILTRO CJ, CABINE, CARVÃO' then        25449613
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO PALHETAS KIT, LIMPADOR PARABRISA' then        25449614
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO AMORTECEDOR KIT, SUSPENSÃO TRASEIRA' then        25449615
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO FILTRO, COMBUSTIVEL MOTOR  4N' then        25449616
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO SAPATA CJ, FREIO ' then        25449617
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO TIRANTE, TERMINAL DIR' then        25449619
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO LIMPADOR, SPRAY SISTEMA A/C  ' then        25449620
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO LIMPA MOTOR FLUSH MTECH' then        25449621
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO BUCHA, MOLA SUSPENSÃO TRASEIRA 2' then        25449622
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO COOLANTE LIQUIDO ARREFECIMENTO' then        25449623
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO FLUIDO DE FREIO DOT 4' then        25449624
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO ESTIMATIVO PARA PAGAMENTO DE CUSTOS DE BOLETOS/GUIAS DE EMISSÃO DOS REGISTROS E AUTENTICIDADES DAS ARTS (ANOTAÇÃO DE RESPONSABILIDADE TÉCNICA), POR UM PERIODO DE 12 MESES NO EXERCICIO DE 2024.' then        25452255
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO TAXAS E TARIFAS BANCÁRIAS, DEBITADAS   POR TRANSAÇÕES BANCARIAS, EFETUADAS, DAS CONTAS EXISTENTES JUNTO AO BANCO POR UM PERIODO DE 12 MESES NO EXERCICIO DE 2024.  ' then        25452256
         when CAST(ap.ds_produto AS varchar(max)) = 'ESTIMATIVO DE PAGAMENTO DE FATURAS DE ENERGIA ELÉTRICA, FORNECIDO POR ÓRGÃO COMPETENTE ENERGISA RONDÔNIA - DISTRIBUIDORA DE ENERGIA S. A' then        25452257
         when CAST(ap.ds_produto AS varchar(max)) = 'ESTIMADO PARA PAGAMENTO DE DESPESAS COM FATURAS DE ÁGUA POTÁVEL, FORNECIDO POR ÓRGÃO COMPETENTE (CAERD), POR UM PERÍODO ESTIMADO DE 12 (DOZE) MESES, VISANDO ATENDER AS NECESSIDADES DAS SECRETARIA MUNICIPAL' then        25452258
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO SERVIÇO REVISAO M1.' then        25452259
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO DESLOCAMENTO VILHENA X PARECIS' then        25452260
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO ESTIMATIVO PARA PAGAMENTO DE FATURAS COM LINHA TELEFÔNICA, FORNECIDO PELA EMPRESA OI S. A - EM RECUPERAÇÃO JUDICIAL, PARA 12 MESES, NO DECORRER DO ANO DE 2024.' then        25452261
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO ESTIMATIVO PARA PAGAMENTOS DAS TAXAS DE LICENCIAMENTO DE VEÍCULOS JUNTO AO DEPARTAMENTO ESTADUAL DE TRÂNSITO DE RONDÔNIA-DETRAN.    ' then        25452262
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO COLETA, REMOÇÃO E DESTINAÇÃO FINAL DE DEJETOS DE FOSSA SANITÁRIA: SENDO COLETA POR SUCÇÃO DE DEJETOS DE FOSSA, E DESTINAÇÃO FINAL DE EFLUENTES SANITÁRIOS, COM DEVIDO MANIFESTO DE DESCARTE DE EFLUENTES, CONFORME LEIS AMBIENTAIS. FOSSA SANITÁRIA MEDINDO APROXIMADAMENTE 20 M³. PRESTAÇÃO DE SERVIÇO DEVERÁ SER REALIZADO NO MUNICÍPIO DE PARECIS/RO.  ' then        25452263
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO SERVIÇOS DE LIMPEZA DE FORRO, COM A DISPONIBILIDADE DE MÃO DE OBRA QUALIFICADA, EQUIPAMENTOS, UTENSÍLIOS E EPIS, NECESSÁRIOS PARA LIMPEZA E DESINFECÇÃO. PRESTAÇÃO DE SERVIÇO DEVERÁ SER REALIZADO NO MUNICÍPIO DE PARECIS/RO.  ' then        25452264
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO- (REVISÃO) SERVIÇO ELETRICA.' then        25452265
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO- (REVISÃO) SUBS.PASTILHAS ' then        25452266
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO- (REVISÃO)MECÂNICA EM GERAL' then        25452267
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO- (REVISÃO)ALINHAMENTO E BALANCEAMENTO ' then        25452268
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO- (REVISÃO)10A.REVISAO-100.000KM' then        25452269
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO  (REVISÃO) OXI - SANITIZAÇÃO' then        25452270
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO (REVISÃO) 9.A REVISÃO - 90.000 KM ' then        25452271
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO LIMP. TECNICA DO MOTOR' then        25452272
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP RO SOS PNEUS' then        25452273
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO LIMP. CORPO ACELERAÇÃO' then        25452274
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO RENOVADOR DE COURO' then        25452275
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO REGENERADOR DPF' then        25452276
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO LIMP. SISTEMA DE FREIO' then        25452277
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO LIMPEZA DA  CAIXA EVAPORADORA' then        25452278
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO AROMATIZANTE' then        25452279
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO CRISTALIZADOR PARABRISA' then        25452280
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO HIG. A/C' then        25452281
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO ANTI ZINABRE BATERIA ' then        25452282
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO TRATAMENTO ANTI DESGASTE' then        25452283
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO LIMPEZA INTERNA MOTOR' then        25452284
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO TRATAMENTO COMB.' then        25452285
         when CAST(ap.ds_produto AS varchar(max)) = 'PMP/RO 4A. REVISÃO  40.000 KM' then        25452286
         when CAST(ap.ds_produto AS varchar(max)) = '  ESTIMATIVO PARA PAGAMENTO DE CUSTOS DE BOLETOS/GUIAS JUNTO AO ÓRGÃO COMPETENTE: CBMRO - CORPO DE BOMBEIROS MILITAR DO ESTADO DE RONDÔNIA, EM ATENDIMENTO A SECRETARIA MUNICIPAL DE ADMINISTRAÇÃO E FAZENDA - SEMAF, COM PREVISÃO DE 12 (DOZE) MESES PARA O PERÍODO DE JANEIRO A DEZEMBRO DE 2024.' then        25452287
end as codigoEspecificacao,
JSON_QUERY((SELECT case when cc.cd_unidade = 'SERV' then 103112 
                                                when cc.cd_unidade = 'KIT' then 103095
                                                when cc.cd_unidade = 'UND' then 103113
                                                when cc.cd_unidade = 'BD' then 103078
                                                when cc.cd_unidade = 'PÇ' then 103105
                                                when cc.cd_unidade = 'L' then 103096
                                   end as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS unidadeMedida
from complicitacaocomposicao cc
join ALMOProdutos ap on ap.cd_produto = cc.cd_produto
        `;

        const result = await masterConnection.query(userQuery);
const resultData = result.recordset;

// Transformar os resultados da consulta no formato desejado
const transformedData = resultData.map(record => {
    // Verifica se unidadeMedida é uma string JSON válida antes de tentar fazer o parse
    let unidadeMedida = {};
    try {
        unidadeMedida = JSON.parse(record.unidadeMedida);
    } catch (e) {
        console.error(`Erro ao fazer o parse de unidadeMedida: ${record.unidadeMedida}`, e);
    }

    return {
        conteudo:{
        //id: record.id,
        descricao: record.descricao,
        nome: record.nome,
        codigoEspecificacao: record.codigoEspecificacao,
        unidadeMedida: unidadeMedida
    }};
});

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        /*
        for (const record of transformedData) {
            const response = await fetch('https://services.almoxarifado.betha.cloud/estoque-services/api/conversoes/lotes/materialespecificacao', {
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
        // Lidar com erros de conexão ou consulta aqui
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        await sql.close();
    }
}

// Chamar a função principal
main();