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
                         WHEN nr_pedido = 1 THEN 5878418
                        WHEN nr_pedido IN (4, 12, 18, 18, 19, 20, 21) THEN 5894233
                        WHEN nr_pedido IN (2, 3) THEN 5878419
                        WHEN nr_pedido IN (5, 15, 24, 40) THEN 5894234
                        WHEN nr_pedido IN (9, 10, 11, 13, 22, 23, 41, 43) THEN 5894236
                        WHEN nr_pedido IN (6, 7, 8, 14, 25, 26, 29, 32, 33, 42) THEN 5894235
                        WHEN nr_pedido IN (16, 17, 44, 45) THEN 5894237
                        WHEN nr_pedido IN (27, 28) THEN 5878426
                        WHEN nr_pedido IN (30, 31) THEN 5878427
                        WHEN nr_pedido IN (36, 37) THEN 5878428
                        WHEN nr_pedido IN (38, 39) THEN 5889875
                        END AS contratacaoId,
                JSON_QUERY(
        (SELECT
            CASE 
                WHEN nr_pedido = 1 THEN 12040161
                WHEN nr_pedido = 2 THEN 12040067
                WHEN nr_pedido = 3 THEN 12040068
                WHEN nr_pedido = 4 THEN 12054188
                WHEN nr_pedido = 5 THEN 12054190
                WHEN nr_pedido = 6 THEN 12054191
                WHEN nr_pedido = 7 THEN 12054192
                WHEN nr_pedido = 8 THEN 12054193
                WHEN nr_pedido = 9 THEN 12054196
                WHEN nr_pedido = 10 THEN 12054197
                WHEN nr_pedido = 11 THEN 12054198
                WHEN nr_pedido = 12 THEN 12054200
                WHEN nr_pedido = 13 THEN 12054201
                WHEN nr_pedido = 14 THEN 12054202
                WHEN nr_pedido = 15 THEN 12054203
                WHEN nr_pedido = 16 THEN 12054204
                WHEN nr_pedido = 17 THEN 12054205
                WHEN nr_pedido = 18 THEN 12054206
                WHEN nr_pedido = 19 THEN 12054208
                WHEN nr_pedido = 20 THEN 12054209
                WHEN nr_pedido = 21 THEN 12054210
                WHEN nr_pedido = 22 THEN 12054211
                WHEN nr_pedido = 23 THEN 12054212
                WHEN nr_pedido = 24 THEN 12054213
                WHEN nr_pedido = 25 THEN 12054214
                WHEN nr_pedido = 26 THEN 12054215
                WHEN nr_pedido = 27 THEN 12040100
                WHEN nr_pedido = 28 THEN 12040102
                WHEN nr_pedido = 29 THEN 12054218
                WHEN nr_pedido = 30 THEN 12040107
                WHEN nr_pedido = 31 THEN 12040108
                WHEN nr_pedido = 32 THEN 12054219
                WHEN nr_pedido = 33 THEN 12054220
                WHEN nr_pedido = 36 THEN 12040111
                WHEN nr_pedido = 37 THEN 12040113
                WHEN nr_pedido = 38 THEN 12045692
                WHEN nr_pedido = 39 THEN 12045801
                WHEN nr_pedido = 40 THEN 12054222
                WHEN nr_pedido = 41 THEN 12054224
                WHEN nr_pedido = 42 THEN 12054225
                WHEN nr_pedido = 43 THEN 12054226
                WHEN nr_pedido = 44 THEN 12054227
                WHEN nr_pedido = 45 THEN 12054228
                END AS id
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
    ) as solicitacaoId,
        JSON_QUERY(
        (SELECT
            CASE 
                WHEN nr_pedido = 1 THEN 4289950
                WHEN nr_pedido = 2 THEN 4293012
                WHEN nr_pedido = 3 THEN 4293013
                WHEN nr_pedido = 4 THEN 4293014
                WHEN nr_pedido = 5 THEN 4293015
                WHEN nr_pedido = 6 THEN 4293016
                WHEN nr_pedido = 7 THEN 4293017
                WHEN nr_pedido = 8 THEN 4293018
                WHEN nr_pedido = 9 THEN 4293019
                WHEN nr_pedido = 10 THEN 4293020
                WHEN nr_pedido = 11 THEN 4293021
                WHEN nr_pedido = 12 THEN 4293022
                WHEN nr_pedido = 13 THEN 4293023
                WHEN nr_pedido = 14 THEN 4293024
                WHEN nr_pedido = 15 THEN 4293025
                WHEN nr_pedido = 16 THEN 4293026
                WHEN nr_pedido = 17 THEN 4293027
                WHEN nr_pedido = 18 THEN 4293028
                WHEN nr_pedido = 19 THEN 4293029
                WHEN nr_pedido = 20 THEN 4293030
                WHEN nr_pedido = 21 THEN 4293031
                WHEN nr_pedido = 22 THEN 4293032
                WHEN nr_pedido = 23 THEN 4293033
                WHEN nr_pedido = 24 THEN 4293034
                WHEN nr_pedido = 25 THEN 4293035
                WHEN nr_pedido = 26 THEN 4293036
                WHEN nr_pedido = 27 THEN 4293037
                WHEN nr_pedido = 28 THEN 4293038
                WHEN nr_pedido = 29 THEN 4293039
                WHEN nr_pedido = 30 THEN 4293040
                WHEN nr_pedido = 31 THEN 4293041
                WHEN nr_pedido = 32 THEN 4293042
                WHEN nr_pedido = 33 THEN 4293043
                WHEN nr_pedido = 36 THEN 4293044
                WHEN nr_pedido = 37 THEN 4293045
                WHEN nr_pedido = 38 THEN 4293011
                WHEN nr_pedido = 39 THEN 4293046
                WHEN nr_pedido = 40 THEN 4293047
                WHEN nr_pedido = 41 THEN 4293048
                WHEN nr_pedido = 42 THEN 4293049
                WHEN nr_pedido = 43 THEN 4293050
                WHEN nr_pedido = 44 THEN 4293051
                WHEN nr_pedido = 45 THEN 4293052
                END AS id
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
    )as solicitacaoRecebimento,
    qt_qtde as quantidade,
        vl_total as valorTotal,
        JSON_QUERY(
        (SELECT
            CASE
        -- 335 ---------------------------------------------------------------------------------------------------------------------------------------
                WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) SUBS.PASTILHAS ' AND nr_pedido = 39 THEN 33303415
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO)ALINHAMENTO E BALANCEAMENTO ' AND nr_pedido = 39 THEN 33303419
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO  (REVISÃO) OXI - SANITIZAÇÃO' AND nr_pedido = 39 THEN 33303427
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO LIMP. TECNICA DO MOTOR' AND nr_pedido = 39 THEN 33303428
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP RO SOS PNEUS' AND nr_pedido = 39 THEN 33303429
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO LIMP. CORPO ACELERAÇÃO' AND nr_pedido = 39 THEN 33303431
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO RENOVADOR DE COURO' AND nr_pedido = 39 THEN 33303447
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO REGENERADOR DPF' AND nr_pedido = 39 THEN 33303448
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO LIMP. SISTEMA DE FREIO' AND nr_pedido = 39 THEN 33303449
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO AROMATIZANTE' AND nr_pedido = 39 THEN 33303494
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO CRISTALIZADOR PARABRISA' AND nr_pedido = 39 THEN 33303495
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO HIG. A/C' AND nr_pedido = 39 THEN 33303497
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO ANTI ZINABRE BATERIA ' AND nr_pedido = 39 THEN 33303498
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO TRATAMENTO ANTI DESGASTE' AND nr_pedido = 39 THEN 33303500
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO LIMPEZA INTERNA MOTOR' AND nr_pedido = 39 THEN 33303501
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO TRATAMENTO COMB.' AND nr_pedido = 39 THEN 33303503
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO 4A. REVISÃO  40.000 KM' AND nr_pedido = 39 THEN 33303504
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO FILTRO CJ, CABINE, CARVÃO' AND nr_pedido = 38 THEN 33303554
        WHEN CONVERT(varchar(max), ds_produto) = 'OLEO LUBRIFICANTE HIDRAULICO 68 20 LT MOTONIVELADORA 120K CATERPILLA' AND nr_pedido = 38 THEN 33303555
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO SAPATA CJ, FREIO ' AND nr_pedido = 38 THEN 33303556
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) PASTILHA CJ, DIANTEIRO II' AND nr_pedido = 38 THEN 33303558
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) JUNTA, VEDACAO DRENO OLEO MOTO.' AND nr_pedido = 38 THEN 33303559
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) OLEO, MOTOR-SAE 5W30 API-SN.' AND nr_pedido = 38 THEN 33303560
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO FLUIDO DE FREIO DOT 4' AND nr_pedido = 38 THEN 33303561
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) ELEMENTO, FILTRANTE AR MOTOR.' AND nr_pedido = 38 THEN 33303562
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) FILTRO, OLEO MOTOR ' AND nr_pedido = 38 THEN 33303563
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) KIT LUBRIFICACAO I-MTECH.' AND nr_pedido = 38 THEN 33303564
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) LIMPADOR, SISTEMA COMB-DIESEL ' AND nr_pedido = 38 THEN 33303565
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO COOLANTE LIQUIDO ARREFECIMENTO' AND nr_pedido = 38 THEN 33303566

        ------------------------------------------------------------------------------------------------------------------------------------------------------
                -- 334 ---------------------------------------------------------------------------------------------------------------------------------------
                WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) PASTILHA CJ, DIANTEIRO II' AND nr_pedido = 36 THEN 33296937
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) JUNTA, VEDACAO DRENO OLEO MOTO.' AND nr_pedido = 36 THEN 33297043
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) OLEO, MOTOR-SAE 5W30 API-SN.' AND nr_pedido = 36 THEN 33297044
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) ELEMENTO, FILTRANTE AR MOTOR.' AND nr_pedido = 36 THEN 33296938
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) FILTRO, OLEO MOTOR ' AND nr_pedido = 36 THEN 33297045
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) KIT LUBRIFICACAO I-MTECH.' AND nr_pedido = 36 THEN 33297048
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) LIMPADOR, SISTEMA COMB-DIESEL ' AND nr_pedido = 36 THEN 33296939
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO BUCHA, MOLA- SUSPENSÃO -TRASEIRA 1' AND nr_pedido = 36 THEN 33297050
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO FEIXE MOLAS CJ, SUSPENSÃO TRASEIRA' AND nr_pedido = 36 THEN 33297051
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO LAMPADA FAROL  12V 5W' AND nr_pedido = 36 THEN 33296940
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO FILTRO CJ, CABINE, CARVÃO' AND nr_pedido = 36 THEN 33297053
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO PALHETAS KIT, LIMPADOR PARABRISA' AND nr_pedido = 36 THEN 33297054
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO AMORTECEDOR KIT, SUSPENSÃO TRASEIRA' AND nr_pedido = 36 THEN 33296941
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO FILTRO, COMBUSTIVEL MOTOR  4N' AND nr_pedido = 36 THEN 33297055
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO SAPATA CJ, FREIO ' AND nr_pedido = 36 THEN 33297056
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO TIRANTE, TERMINAL DIR' AND nr_pedido = 36 THEN 33296943
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO LIMPADOR, SPRAY SISTEMA A/C ' AND nr_pedido = 36 THEN 33297057
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO LIMPA MOTOR FLUSH MTECH' AND nr_pedido = 36 THEN 33297059
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO BUCHA, MOLA SUSPENSÃO TRASEIRA 2' AND nr_pedido = 36 THEN 33296946
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO  (REVISÃO) OXI - SANITIZAÇÃO' AND nr_pedido = 37 THEN 33296948
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO (REVISÃO) 9.A REVISÃO - 90.000 KM ' AND nr_pedido = 37 THEN 33297062
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO)ALINHAMENTO E BALANCEAMENTO ' AND nr_pedido = 37 THEN 33297061
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO)MECÂNICA EM GERAL' AND nr_pedido = 37 THEN 33297060

                ------------------------------------------------------------------------------------------------------------------------------------------------------
                -- 333------------------------------------------------------------------------------------------------------------------------------------------------------
                WHEN CONVERT(varchar(max), ds_produto) = 'ESTIMATIVO PARA PAGAMENTO DE CUSTOS DE BOLETOS/GUIAS JUNTO AO ÓRGÃO COMPETENTE: CBMRO - CORPO DE BOMBEIROS MILITAR DO ESTADO DE RONDÔNIA, EM ATENDIMENTO A SECRETARIA MUNICIPAL DE ADMINISTRAÇÃO E FAZENDA - SEMAF, COM PREVISÃO DE 12 (DOZE) MESES PARA O PERÍODO DE JANEIRO A DEZEMBRO DE 2024.' AND nr_pedido IN (30, 31) THEN 33296936
                --------------------------------------------------------------------------------------------------------------------------------------------------------
                -- 216 ---------------------------------------------------------------------------------------------------------------------------------------
                WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) LAMPADA, FAROL-12V-5W.' AND nr_pedido = 27 THEN 33297030
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) FILTRO CJ, CABINE, CARVÃO.' AND nr_pedido = 27 THEN 33297033
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) FILTRO, COMBUSTIVEL MOTOR-4N' AND nr_pedido = 27 THEN 33296929
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) PASTILHA CJ, DIANTEIRO II' AND nr_pedido = 27 THEN 33297035
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) JUNTA, VEDACAO DRENO OLEO MOTO.' AND nr_pedido = 27 THEN 33297036
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) OLEO, MOTOR-SAE 5W30 API-SN.' AND nr_pedido = 27 THEN 33296930
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) ELEMENTO, FILTRANTE AR MOTOR.' AND nr_pedido = 27 THEN 33297037
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) FILTRO, OLEO MOTOR ' AND nr_pedido = 27 THEN 33297038
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) KIT LUBRIFICACAO I-MTECH.' AND nr_pedido = 27 THEN 33296931
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) LIMPADOR, SISTEMA COMB-DIESEL ' AND nr_pedido = 27 THEN 33297039
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) SERVIÇO ELETRICA.' AND nr_pedido = 28 THEN 33297040
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO)MECÂNICA EM GERAL' AND nr_pedido = 28 THEN 33297041
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) SUBS.PASTILHAS ' AND nr_pedido = 28 THEN 33296933
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO)10A.REVISAO-100.000KM' AND nr_pedido = 28 THEN 33296935
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO)ALINHAMENTO E BALANCEAMENTO ' AND nr_pedido = 28 THEN 33297042
                ------------------------------------------------------------------------------------------------------------------------------------------------------
                -- 33 ---------------------------------------------------------------------------------------------------------------------------------------
                WHEN CONVERT(varchar(max), ds_produto) = 'ESTIMATIVO DE PAGAMENTO DE FATURAS DE ENERGIA ELÉTRICA, FORNECIDO POR ÓRGÃO COMPETENTE ENERGISA RONDÔNIA - DISTRIBUIDORA DE ENERGIA S. A' AND nr_pedido = 42 THEN 33329020
                                WHEN CONVERT(varchar(max), ds_produto) = 'ESTIMATIVO DE PAGAMENTO DE FATURAS DE ENERGIA ELÉTRICA, FORNECIDO POR ÓRGÃO COMPETENTE ENERGISA RONDÔNIA - DISTRIBUIDORA DE ENERGIA S. A' AND nr_pedido = 33 THEN 33328994
                                WHEN CONVERT(varchar(max), ds_produto) = 'ESTIMATIVO DE PAGAMENTO DE FATURAS DE ENERGIA ELÉTRICA, FORNECIDO POR ÓRGÃO COMPETENTE ENERGISA RONDÔNIA - DISTRIBUIDORA DE ENERGIA S. A' AND nr_pedido = 32 THEN 33328992
                                WHEN CONVERT(varchar(max), ds_produto) = 'ESTIMATIVO DE PAGAMENTO DE FATURAS DE ENERGIA ELÉTRICA, FORNECIDO POR ÓRGÃO COMPETENTE ENERGISA RONDÔNIA - DISTRIBUIDORA DE ENERGIA S. A' AND nr_pedido = 29 THEN 33328988
                                WHEN CONVERT(varchar(max), ds_produto) = 'ESTIMATIVO DE PAGAMENTO DE FATURAS DE ENERGIA ELÉTRICA, FORNECIDO POR ÓRGÃO COMPETENTE ENERGISA RONDÔNIA - DISTRIBUIDORA DE ENERGIA S. A' AND nr_pedido = 26 THEN 33328987
                                WHEN CONVERT(varchar(max), ds_produto) = 'ESTIMATIVO DE PAGAMENTO DE FATURAS DE ENERGIA ELÉTRICA, FORNECIDO POR ÓRGÃO COMPETENTE ENERGISA RONDÔNIA - DISTRIBUIDORA DE ENERGIA S. A' AND nr_pedido = 25 THEN 33328986
                                WHEN CONVERT(varchar(max), ds_produto) = 'ESTIMATIVO DE PAGAMENTO DE FATURAS DE ENERGIA ELÉTRICA, FORNECIDO POR ÓRGÃO COMPETENTE ENERGISA RONDÔNIA - DISTRIBUIDORA DE ENERGIA S. A' AND nr_pedido = 14 THEN 33328959
                                WHEN CONVERT(varchar(max), ds_produto) = 'ESTIMATIVO DE PAGAMENTO DE FATURAS DE ENERGIA ELÉTRICA, FORNECIDO POR ÓRGÃO COMPETENTE ENERGISA RONDÔNIA - DISTRIBUIDORA DE ENERGIA S. A' AND nr_pedido = 8 THEN 33328948
                                WHEN CONVERT(varchar(max), ds_produto) = 'ESTIMATIVO DE PAGAMENTO DE FATURAS DE ENERGIA ELÉTRICA, FORNECIDO POR ÓRGÃO COMPETENTE ENERGISA RONDÔNIA - DISTRIBUIDORA DE ENERGIA S. A' AND nr_pedido = 7 THEN 33328947
                                WHEN CONVERT(varchar(max), ds_produto) = 'ESTIMATIVO DE PAGAMENTO DE FATURAS DE ENERGIA ELÉTRICA, FORNECIDO POR ÓRGÃO COMPETENTE ENERGISA RONDÔNIA - DISTRIBUIDORA DE ENERGIA S. A' AND nr_pedido = 6 THEN 33328946
                ------------------------------------------------------------------------------------------------------------------------------------------------------
                --28------------------------------------------------------------------------------------------------------------------------------------------------------
                WHEN CONVERT(varchar(max), ds_produto) like '%ESTIMATIVO PARA PAGAMENTO DE CUSTOS DE BOLETOS/GUIAS DE EMISSÃO DOS REGISTROS E AUTENTICIDADES DAS ARTS (ANOTAÇÃO DE RESPONSABILIDADE TÉCNICA), POR UM PERIODO DE 12 MESES NO EXERCICIO DE 2024.%' THEN 33296504
                --------------------------------------------------------------------------------------------------------------------------------------------------------
        --20--------------------------------------------------------------------------------------------------------------------------------------------------------
                WHEN CONVERT(varchar(max), ds_produto) = 'TAXAS E TARIFAS BANCÁRIAS, DEBITADAS   POR TRANSAÇÕES BANCARIAS, EFETUADAS, DAS CONTAS EXISTENTES JUNTO AO BANCO POR UM PERIODO DE 12 MESES NO EXERCICIO DE 2024.' AND nr_pedido = 21 THEN 33328969
                                WHEN CONVERT(varchar(max), ds_produto) = 'TAXAS E TARIFAS BANCÁRIAS, DEBITADAS   POR TRANSAÇÕES BANCARIAS, EFETUADAS, DAS CONTAS EXISTENTES JUNTO AO BANCO POR UM PERIODO DE 12 MESES NO EXERCICIO DE 2024.' AND nr_pedido = 20 THEN 33328966
                                WHEN CONVERT(varchar(max), ds_produto) = 'TAXAS E TARIFAS BANCÁRIAS, DEBITADAS   POR TRANSAÇÕES BANCARIAS, EFETUADAS, DAS CONTAS EXISTENTES JUNTO AO BANCO POR UM PERIODO DE 12 MESES NO EXERCICIO DE 2024.' AND nr_pedido = 19 THEN 33328964
                                WHEN CONVERT(varchar(max), ds_produto) = 'TAXAS E TARIFAS BANCÁRIAS, DEBITADAS   POR TRANSAÇÕES BANCARIAS, EFETUADAS, DAS CONTAS EXISTENTES JUNTO AO BANCO POR UM PERIODO DE 12 MESES NO EXERCICIO DE 2024.' AND nr_pedido = 18 THEN 33328963
                                WHEN CONVERT(varchar(max), ds_produto) = 'TAXAS E TARIFAS BANCÁRIAS, DEBITADAS   POR TRANSAÇÕES BANCARIAS, EFETUADAS, DAS CONTAS EXISTENTES JUNTO AO BANCO POR UM PERIODO DE 12 MESES NO EXERCICIO DE 2024.' AND nr_pedido = 12 THEN 33328957
                                WHEN CONVERT(varchar(max), ds_produto) = 'TAXAS E TARIFAS BANCÁRIAS, DEBITADAS   POR TRANSAÇÕES BANCARIAS, EFETUADAS, DAS CONTAS EXISTENTES JUNTO AO BANCO POR UM PERIODO DE 12 MESES NO EXERCICIO DE 2024.' AND nr_pedido = 4 THEN 33328944
                ----------------------------------------------------------------------------------------------------------------------------------------------------------
                --31------------------------------------------------------------------------------------------------------------------------------------------------------------
                WHEN CONVERT(varchar(max), ds_produto) = 'ESTIMATIVO PARA PAGAMENTO DE FATURAS COM LINHA TELEFÔNICA, FORNECIDO PELA EMPRESA OI S. A - EM RECUPERAÇÃO JUDICIAL, PARA 12 MESES, NO DECORRER DO ANO DE 2024.' AND nr_pedido = 40 THEN 12054222
                                WHEN CONVERT(varchar(max), ds_produto) = 'ESTIMATIVO PARA PAGAMENTO DE FATURAS COM LINHA TELEFÔNICA, FORNECIDO PELA EMPRESA OI S. A - EM RECUPERAÇÃO JUDICIAL, PARA 12 MESES, NO DECORRER DO ANO DE 2024.' AND nr_pedido = 24 THEN 12054213
                                WHEN CONVERT(varchar(max), ds_produto) = 'ESTIMATIVO PARA PAGAMENTO DE FATURAS COM LINHA TELEFÔNICA, FORNECIDO PELA EMPRESA OI S. A - EM RECUPERAÇÃO JUDICIAL, PARA 12 MESES, NO DECORRER DO ANO DE 2024.' AND nr_pedido = 15 THEN 12054203
                                WHEN CONVERT(varchar(max), ds_produto) = 'ESTIMATIVO PARA PAGAMENTO DE FATURAS COM LINHA TELEFÔNICA, FORNECIDO PELA EMPRESA OI S. A - EM RECUPERAÇÃO JUDICIAL, PARA 12 MESES, NO DECORRER DO ANO DE 2024.' AND nr_pedido = 5 THEN 12054190
                ----
        --30----------------------------------------------------------------------------------------------------------------------------------------------------------
                WHEN CONVERT(varchar(max), ds_produto) = 'ESTIMADO PARA PAGAMENTO DE DESPESAS COM FATURAS DE ÁGUA POTÁVEL, FORNECIDO POR ÓRGÃO COMPETENTE (CAERD), POR UM PERÍODO ESTIMADO DE 12 (DOZE) MESES, VISANDO ATENDER AS NECESSIDADES DAS SECRETARIA MUNICIPAL' AND nr_pedido = 43 THEN 33329021
                                WHEN CONVERT(varchar(max), ds_produto) = 'ESTIMADO PARA PAGAMENTO DE DESPESAS COM FATURAS DE ÁGUA POTÁVEL, FORNECIDO POR ÓRGÃO COMPETENTE (CAERD), POR UM PERÍODO ESTIMADO DE 12 (DOZE) MESES, VISANDO ATENDER AS NECESSIDADES DAS SECRETARIA MUNICIPAL' AND nr_pedido = 41 THEN 33329019
                                WHEN CONVERT(varchar(max), ds_produto) = 'ESTIMADO PARA PAGAMENTO DE DESPESAS COM FATURAS DE ÁGUA POTÁVEL, FORNECIDO POR ÓRGÃO COMPETENTE (CAERD), POR UM PERÍODO ESTIMADO DE 12 (DOZE) MESES, VISANDO ATENDER AS NECESSIDADES DAS SECRETARIA MUNICIPAL' AND nr_pedido = 23 THEN 33328976
                                WHEN CONVERT(varchar(max), ds_produto) = 'ESTIMADO PARA PAGAMENTO DE DESPESAS COM FATURAS DE ÁGUA POTÁVEL, FORNECIDO POR ÓRGÃO COMPETENTE (CAERD), POR UM PERÍODO ESTIMADO DE 12 (DOZE) MESES, VISANDO ATENDER AS NECESSIDADES DAS SECRETARIA MUNICIPAL' AND nr_pedido = 22 THEN 33328970
                                WHEN CONVERT(varchar(max), ds_produto) = 'ESTIMADO PARA PAGAMENTO DE DESPESAS COM FATURAS DE ÁGUA POTÁVEL, FORNECIDO POR ÓRGÃO COMPETENTE (CAERD), POR UM PERÍODO ESTIMADO DE 12 (DOZE) MESES, VISANDO ATENDER AS NECESSIDADES DAS SECRETARIA MUNICIPAL' AND nr_pedido = 13 THEN 33328958
                                WHEN CONVERT(varchar(max), ds_produto) = 'ESTIMADO PARA PAGAMENTO DE DESPESAS COM FATURAS DE ÁGUA POTÁVEL, FORNECIDO POR ÓRGÃO COMPETENTE (CAERD), POR UM PERÍODO ESTIMADO DE 12 (DOZE) MESES, VISANDO ATENDER AS NECESSIDADES DAS SECRETARIA MUNICIPAL' AND nr_pedido = 11 THEN 33328956
                                WHEN CONVERT(varchar(max), ds_produto) = 'ESTIMADO PARA PAGAMENTO DE DESPESAS COM FATURAS DE ÁGUA POTÁVEL, FORNECIDO POR ÓRGÃO COMPETENTE (CAERD), POR UM PERÍODO ESTIMADO DE 12 (DOZE) MESES, VISANDO ATENDER AS NECESSIDADES DAS SECRETARIA MUNICIPAL' AND nr_pedido = 10 THEN 33328954
                                WHEN CONVERT(varchar(max), ds_produto) = 'ESTIMADO PARA PAGAMENTO DE DESPESAS COM FATURAS DE ÁGUA POTÁVEL, FORNECIDO POR ÓRGÃO COMPETENTE (CAERD), POR UM PERÍODO ESTIMADO DE 12 (DOZE) MESES, VISANDO ATENDER AS NECESSIDADES DAS SECRETARIA MUNICIPAL' AND nr_pedido = 9 THEN 33328952
                ------------------------------------------------------------------------------------------------------------------------------------------------------------
        --29--------------------------------------------------------------------------------------------------------------------------------------------------------------
                WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO ESTIMATIVO PARA PAGAMENTOS DAS TAXAS DE LICENCIAMENTO DE VEÍCULOS JUNTO AO DEPARTAMENTO ESTADUAL DE TRÂNSITO DE RONDÔNIA-DETRAN.' AND vl_unitario = 6000 THEN 33327998
                                WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO ESTIMATIVO PARA PAGAMENTOS DAS TAXAS DE LICENCIAMENTO DE VEÍCULOS JUNTO AO DEPARTAMENTO ESTADUAL DE TRÂNSITO DE RONDÔNIA-DETRAN.' AND vl_unitario = 12000 THEN 33329023
                                WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO ESTIMATIVO PARA PAGAMENTOS DAS TAXAS DE LICENCIAMENTO DE VEÍCULOS JUNTO AO DEPARTAMENTO ESTADUAL DE TRÂNSITO DE RONDÔNIA-DETRAN.' AND vl_unitario = 5000 AND nr_pedido = 16 THEN 33328962
                                WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO ESTIMATIVO PARA PAGAMENTOS DAS TAXAS DE LICENCIAMENTO DE VEÍCULOS JUNTO AO DEPARTAMENTO ESTADUAL DE TRÂNSITO DE RONDÔNIA-DETRAN.' AND vl_unitario = 5000 AND nr_pedido = 17 THEN 33328961
                ---------------------------------------------------------------------------------------------------------------------------------------------------------------
                -- 18 ---------------------------------------------------------------------------------------------------------------------------------------
                WHEN CONVERT(varchar(max), ds_produto) = 'OLEO MERITOR GL5 85W140 LT.' AND nr_pedido = 2 THEN 33293840
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP FILTRO COMBUSTIVEL TECTOR' AND nr_pedido = 2 THEN 33296507
        WHEN CONVERT(varchar(max), ds_produto) = 'FILTRO AR SEGURANCA SECUNDARIO' AND nr_pedido = 2 THEN 33296509
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP FILTRO LUBRIFICANTE TECTOR' AND nr_pedido = 2 THEN 33296873
        WHEN CONVERT(varchar(max), ds_produto) = 'FILTRO DE AR IVECO TECTOR NEXPRO' AND nr_pedido = 2 THEN 33296877
        WHEN CONVERT(varchar(max), ds_produto) = 'ADITIVO SOLUÇAO ARREFECEDORA PETRONAS  COOLANT.' AND nr_pedido = 2 THEN 33296878
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP FL PETRONAS URANIA 500 ST SAE 40 1X20L.' AND nr_pedido = 2 THEN 33296916
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP - OLEO PETRONAS 15W40 LT (LUBRIFICANTE)' AND nr_pedido = 2 THEN 33297027
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP FILTRO RACOR IVECO STRALIS/TECTOR  (SEPARADOR).' AND nr_pedido = 2 THEN 33297028
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP SERVIÇO REVISAO M1.' AND nr_pedido = 3 THEN 33297029
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP DESLOCAMENTO VILHENA X PARECIS' AND nr_pedido = 3 THEN 33296879
                --------------------------------------------------------------------------------------------------------------------------------------------
        END AS id
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
    )as solicitacaoFornecimentoItem
from COMPPedidosItens where aa_pedido = 2024 and nr_pedido not in (34, 35) and nr_pedido in (38, 39);
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        const transformedData = resultData.map(record => {
            try {
                const solicitacaoRecebimento = record.solicitacaoRecebimento ? JSON.parse(record.solicitacaoRecebimento) : null;
                const solicitacaoFornecimentoItem = record.solicitacaoFornecimentoItem ? JSON.parse(record.solicitacaoFornecimentoItem) : null;
                const solicitacaoId = record.solicitacaoId ? JSON.parse(record.solicitacaoId).id : null;
                const recebimentoId = solicitacaoRecebimento?.id || null;
                const contratacaoId = record.contratacaoId || null; // Para uso na URL apenas
        
                return {
                    solicitacaoRecebimento: { id: recebimentoId },
                    solicitacaoFornecimentoItem: { id: solicitacaoFornecimentoItem?.id || null },
                    quantidade: record.quantidade || null,
                    valorTotal: record.valorTotal || null,
                    solicitacaoId,
                    contratacaoId // Armazenar para uso posterior, mas não incluir no relatório
                };
            } catch (err) {
                console.error('Erro ao processar registro:', err);
                return null;
            }
        }).filter(record => record !== null);
        
        let report = [];
        
        for (const record of transformedData) {
            const { solicitacaoId, solicitacaoRecebimento, solicitacaoFornecimentoItem, quantidade, valorTotal, contratacaoId } = record;
        
            if (solicitacaoId && solicitacaoRecebimento.id && solicitacaoFornecimentoItem.id && quantidade !== null && valorTotal !== null) {
                const url = `https://services.contratos.betha.cloud/contratacao-services/api/exercicios/2024/contratacoes/${contratacaoId}/solicitacoes/${solicitacaoId}/recebimentos/${solicitacaoRecebimento.id}/itens`;
        
                const body = {
                    solicitacaoRecebimento: { id: solicitacaoRecebimento.id },
                    solicitacaoFornecimentoItem: { id: solicitacaoFornecimentoItem.id },
                    quantidade,
                    valorTotal
                };
        
                try {
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
        
                    // Excluindo contratacaoId do relatório
                    report.push({
                        solicitacaoRecebimento: { id: solicitacaoRecebimento.id },
                        solicitacaoFornecimentoItem: { id: solicitacaoFornecimentoItem.id },
                        quantidade,
                        valorTotal,
                        response: responseBody
                    });
        
                    if (response.ok) {
                        console.log(`Dados enviados com sucesso para a rota ${url}`);
                    } else {
                        console.error(`Erro ao enviar os dados para a rota ${url}:`, response.statusText);
                    }
                } catch (err) {
                    console.error(`Erro ao enviar o registro para a rota ${url}:`, err);
                    report.push({
                        solicitacaoRecebimento: { id: solicitacaoRecebimento.id },
                        solicitacaoFornecimentoItem: { id: solicitacaoFornecimentoItem.id },
                        quantidade,
                        valorTotal,
                        response: { error: err.message }
                    });
                }
            } else {
                console.error('Dados inválidos. O registro será ignorado.');
            }
        }
        
        // Salvando o relatório
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));
        console.log('Relatório salvo em report.json');
        
        
        
        
        
    } catch (error) {
        console.error('Erro durante a execução do programa:', error);
    } finally {
        sql.close();
    }
}

main();