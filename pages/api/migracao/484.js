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
nr_pedido,
        JSON_QUERY(
        (SELECT
            CASE 
                                WHEN nr_pedido = 1 THEN 5878418
                WHEN nr_pedido = 4 THEN 5894233
                WHEN nr_pedido = 12 THEN 5894233
                WHEN nr_pedido = 18 THEN 5894233
                WHEN nr_pedido = 19 THEN 5894233
                WHEN nr_pedido = 20 THEN 5894233
                WHEN nr_pedido = 21 THEN 5894233
                WHEN nr_pedido = 2 THEN 5878419
                WHEN nr_pedido = 3 THEN 5878419
                WHEN nr_pedido = 5 THEN 5894234
                WHEN nr_pedido = 15 THEN 5894234
                WHEN nr_pedido = 24 THEN 5894234
                WHEN nr_pedido = 40 THEN 5894234
                WHEN nr_pedido = 9 THEN 5894236
                WHEN nr_pedido = 10 THEN 5894236
                WHEN nr_pedido = 11 THEN 5894236
                WHEN nr_pedido = 13 THEN 5894236
                WHEN nr_pedido = 22 THEN 5894236
                WHEN nr_pedido = 23 THEN 5894236
                WHEN nr_pedido = 41 THEN 5894236
                WHEN nr_pedido = 43 THEN 5894236
                WHEN nr_pedido = 6 THEN 5894235
                WHEN nr_pedido = 7 THEN 5894235
                WHEN nr_pedido = 8 THEN 5894235
                WHEN nr_pedido = 14 THEN 5894235
                WHEN nr_pedido = 25 THEN 5894235
                WHEN nr_pedido = 26 THEN 5894235
                WHEN nr_pedido = 29 THEN 5894235
                WHEN nr_pedido = 32 THEN 5894235
                WHEN nr_pedido = 33 THEN 5894235
                WHEN nr_pedido = 42 THEN 5894235
                WHEN nr_pedido = 16 THEN 5894237
                WHEN nr_pedido = 17 THEN 5894237
                WHEN nr_pedido = 44 THEN 5894237
                WHEN nr_pedido = 45 THEN 5894237
                WHEN nr_pedido = 27 THEN 5878426
                WHEN nr_pedido = 28 THEN 5878426
                WHEN nr_pedido = 30 THEN 5878427
                WHEN nr_pedido = 31 THEN 5878427
                WHEN nr_pedido = 36 THEN 5878428
                WHEN nr_pedido = 37 THEN 5878428
                WHEN nr_pedido = 38 THEN 5889875
                WHEN nr_pedido = 39 THEN 5889875
                END AS id
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
    )as contratacao,
    qt_qtde as quantidade,
    vl_unitario as valorUnitarioPercentual,
        JSON_QUERY(
        (SELECT
            CASE
        -- 335 ---------------------------------------------------------------------------------------------------------------------------------------
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) PASTILHA CJ, DIANTEIRO II' AND nr_pedido IN (38, 39) THEN 92954484
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) JUNTA, VEDACAO DRENO OLEO MOTO.' AND nr_pedido IN (38, 39) THEN 92954485
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) OLEO, MOTOR-SAE 5W30 API-SN.' AND nr_pedido IN (38, 39) THEN 92954486
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) ELEMENTO, FILTRANTE AR MOTOR.' AND nr_pedido IN (38, 39) THEN 92954487
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) FILTRO, OLEO MOTOR ' AND nr_pedido IN (38, 39) THEN 92954488
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) KIT LUBRIFICACAO I-MTECH.' AND nr_pedido IN (38, 39) THEN 92954489
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) LIMPADOR, SISTEMA COMB-DIESEL ' AND nr_pedido IN (38, 39) THEN 92954490
        WHEN CONVERT(varchar(max), ds_produto) = 'OLEO LUBRIFICANTE HIDRAULICO 68 20 LT MOTONIVELADORA 120K CATERPILLA' AND nr_pedido IN (38, 39) THEN 92954491
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO FILTRO CJ, CABINE, CARVÃO' AND nr_pedido IN (38, 39) THEN 92954492
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO SAPATA CJ, FREIO ' AND nr_pedido IN (38, 39) THEN 92954493
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO COOLANTE LIQUIDO ARREFECIMENTO' AND nr_pedido IN (38, 39) THEN 92954494
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO FLUIDO DE FREIO DOT 4' AND nr_pedido IN (38, 39) THEN 92954495
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO (REVISÃO) OXI - SANITIZAÇÃO' AND nr_pedido IN (38, 39) THEN 92954496
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO LIMP. TECNICA DO MOTOR' AND nr_pedido IN (38, 39) THEN 92954497
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP RO SOS PNEUS' AND nr_pedido IN (38, 39) THEN 92954498
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO LIMP. CORPO ACELERAÇÃO' AND nr_pedido IN (38, 39) THEN 92954499
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO RENOVADOR DE COURO' AND nr_pedido IN (38, 39) THEN 92954500
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO REGENERADOR DPF' AND nr_pedido IN (38, 39) THEN 92954501
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO LIMP. SISTEMA DE FREIO' AND nr_pedido IN (38, 39) THEN 92954502
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO AROMATIZANTE' AND nr_pedido IN (38, 39) THEN 92954503
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO CRISTALIZADOR PARABRISA' AND nr_pedido IN (38, 39) THEN 92954504
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO HIG. A/C' AND nr_pedido IN (38, 39) THEN 92954505
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO ANTI ZINABRE BATERIA ' AND nr_pedido IN (38, 39) THEN 92954506
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO TRATAMENTO ANTI DESGASTE' AND nr_pedido IN (38, 39) THEN 92954507
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO LIMPEZA INTERNA MOTOR' AND nr_pedido IN (38, 39) THEN 92954508
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO TRATAMENTO COMB.' AND nr_pedido IN (38, 39) THEN 92954509
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO 4A. REVISÃO 40.000 KM' AND nr_pedido IN (38, 39) THEN 92954510
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) SUBS.PASTILHAS ' AND nr_pedido IN (38, 39) THEN 92954783
        ------------------------------------------------------------------------------------------------------------------------------------------------------
                -- 334 ---------------------------------------------------------------------------------------------------------------------------------------
                WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) PASTILHA CJ, DIANTEIRO II' AND nr_pedido IN (36, 37) THEN 92954365
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) JUNTA, VEDACAO DRENO OLEO MOTO.' AND nr_pedido IN (36, 37) THEN 92954366
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) OLEO, MOTOR-SAE 5W30 API-SN.' AND nr_pedido IN (36, 37) THEN 92954367
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) ELEMENTO, FILTRANTE AR MOTOR.' AND nr_pedido IN (36, 37) THEN 92954368
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) FILTRO, OLEO MOTOR ' AND nr_pedido IN (36, 37) THEN 92954369
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) KIT LUBRIFICACAO I-MTECH.' AND nr_pedido IN (36, 37) THEN 92954370
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) LIMPADOR, SISTEMA COMB-DIESEL ' AND nr_pedido IN (36, 37) THEN 92954371
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO BUCHA, MOLA- SUSPENSÃO -TRASEIRA 1' AND nr_pedido IN (36, 37) THEN 92954372
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO FEIXE MOLAS CJ, SUSPENSÃO TRASEIRA' AND nr_pedido IN (36, 37) THEN 92954373
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO LAMPADA FAROL 12V 5W' AND nr_pedido IN (36, 37) THEN 92954374
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO FILTRO CJ, CABINE, CARVÃO' AND nr_pedido IN (36, 37) THEN 92954375
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO PALHETAS KIT, LIMPADOR PARABRISA' AND nr_pedido IN (36, 37) THEN 92954376
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO AMORTECEDOR KIT, SUSPENSÃO TRASEIRA' AND nr_pedido IN (36, 37) THEN 92954377
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO FILTRO, COMBUSTIVEL MOTOR 4N' AND nr_pedido IN (36, 37) THEN 92954378
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO SAPATA CJ, FREIO ' AND nr_pedido IN (36, 37) THEN 92954379
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO TIRANTE, TERMINAL DIR' AND nr_pedido IN (36, 37) THEN 92954380
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO LIMPADOR, SPRAY SISTEMA A/C ' AND nr_pedido IN (36, 37) THEN 92954381
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO LIMPA MOTOR FLUSH MTECH' AND nr_pedido IN (36, 37) THEN 92954480
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO BUCHA, MOLA SUSPENSÃO TRASEIRA 2' AND nr_pedido IN (36, 37) THEN 92954481
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO (REVISÃO) OXI - SANITIZAÇÃO' AND nr_pedido IN (36, 37) THEN 92954482
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO (REVISÃO) 9.A REVISÃO - 90.000 KM ' AND nr_pedido IN (36, 37) THEN 92954483
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO)ALINHAMENTO E BALANCEAMENTO ' AND nr_pedido IN (36, 37) THEN 92954838
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO)MECÂNICA EM GERAL' AND nr_pedido IN (36, 37) THEN 92954914
                ------------------------------------------------------------------------------------------------------------------------------------------------------
                -- 333------------------------------------------------------------------------------------------------------------------------------------------------------
                WHEN CONVERT(varchar(max), ds_produto) = 'ESTIMATIVO PARA PAGAMENTO DE CUSTOS DE BOLETOS/GUIAS JUNTO AO ÓRGÃO COMPETENTE: CBMRO - CORPO DE BOMBEIROS MILITAR DO ESTADO DE RONDÔNIA, EM ATENDIMENTO A SECRETARIA MUNICIPAL DE ADMINISTRAÇÃO E FAZENDA - SEMAF, COM PREVISÃO DE 12 (DOZE) MESES PARA O PERÍODO DE JANEIRO A DEZEMBRO DE 2024.' AND nr_pedido IN (30, 31) THEN 92034031
                --------------------------------------------------------------------------------------------------------------------------------------------------------
                -- 216 ---------------------------------------------------------------------------------------------------------------------------------------
                WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) LAMPADA, FAROL-12V-5W.' AND nr_pedido IN (27, 28) THEN 92954354
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) FILTRO CJ, CABINE, CARVÃO.' AND nr_pedido IN (27, 28) THEN 92954355
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) FILTRO, COMBUSTIVEL MOTOR-4N' AND nr_pedido IN (27, 28) THEN 92954356
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) PASTILHA CJ, DIANTEIRO II' AND nr_pedido IN (27, 28) THEN 92954357
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) JUNTA, VEDACAO DRENO OLEO MOTO.' AND nr_pedido IN (27, 28) THEN 92954358
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) OLEO, MOTOR-SAE 5W30 API-SN.' AND nr_pedido IN (27, 28) THEN 92954359
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) ELEMENTO, FILTRANTE AR MOTOR.' AND nr_pedido IN (27, 28) THEN 92954360
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) FILTRO, OLEO MOTOR ' AND nr_pedido IN (27, 28) THEN 92954361
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) KIT LUBRIFICACAO I-MTECH.' AND nr_pedido IN (27, 28) THEN 92954362
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) LIMPADOR, SISTEMA COMB-DIESEL ' AND nr_pedido IN (27, 28) THEN 92954363
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) SERVIÇO ELETRICA.' AND nr_pedido IN (27, 28) THEN 92954364
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO)MECÂNICA EM GERAL' AND nr_pedido IN (27, 28) THEN 92955046
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO) SUBS.PASTILHAS ' AND nr_pedido IN (27, 28) THEN 92955051
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO)10A.REVISAO-100.000KM' AND nr_pedido IN (27, 28) THEN 92955058
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO- (REVISÃO)ALINHAMENTO E BALANCEAMENTO ' AND nr_pedido IN (27, 28) THEN 92955063
                ------------------------------------------------------------------------------------------------------------------------------------------------------
                -- 33 ---------------------------------------------------------------------------------------------------------------------------------------
                WHEN CONVERT(varchar(max), ds_produto) = 'ESTIMATIVO DE PAGAMENTO DE FATURAS DE ENERGIA ELÉTRICA, FORNECIDO POR ÓRGÃO COMPETENTE ENERGISA RONDÔNIA - DISTRIBUIDORA DE ENERGIA S. A' AND nr_pedido IN (6, 7, 8, 14, 25, 26, 29, 32, 33, 42) THEN 92033924
                ------------------------------------------------------------------------------------------------------------------------------------------------------
                --28------------------------------------------------------------------------------------------------------------------------------------------------------
                WHEN CONVERT(varchar(max), ds_produto) like '%ESTIMATIVO PARA PAGAMENTO DE CUSTOS DE BOLETOS/GUIAS DE EMISSÃO DOS REGISTROS E AUTENTICIDADES DAS ARTS (ANOTAÇÃO DE RESPONSABILIDADE TÉCNICA), POR UM PERIODO DE 12 MESES NO EXERCICIO DE 2024.%' THEN 92033909
                --------------------------------------------------------------------------------------------------------------------------------------------------------
        --20--------------------------------------------------------------------------------------------------------------------------------------------------------
                WHEN CONVERT(varchar(max), ds_produto) = 'TAXAS E TARIFAS BANCÁRIAS, DEBITADAS   POR TRANSAÇÕES BANCARIAS, EFETUADAS, DAS CONTAS EXISTENTES JUNTO AO BANCO POR UM PERIODO DE 12 MESES NO EXERCICIO DE 2024.' THEN 92033910
                ----------------------------------------------------------------------------------------------------------------------------------------------------------
                --31------------------------------------------------------------------------------------------------------------------------------------------------------------
                WHEN CONVERT(varchar(max), ds_produto) = 'ESTIMATIVO PARA PAGAMENTO DE FATURAS COM LINHA TELEFÔNICA, FORNECIDO PELA EMPRESA OI S. A - EM RECUPERAÇÃO JUDICIAL, PARA 12 MESES, NO DECORRER DO ANO DE 2024.' THEN 92033922
                ----
        --30----------------------------------------------------------------------------------------------------------------------------------------------------------
                WHEN CONVERT(varchar(max), ds_produto) = 'ESTIMADO PARA PAGAMENTO DE DESPESAS COM FATURAS DE ÁGUA POTÁVEL, FORNECIDO POR ÓRGÃO COMPETENTE (CAERD), POR UM PERÍODO ESTIMADO DE 12 (DOZE) MESES, VISANDO ATENDER AS NECESSIDADES DAS SECRETARIA MUNICIPAL' THEN 92033923
                ------------------------------------------------------------------------------------------------------------------------------------------------------------
        --29--------------------------------------------------------------------------------------------------------------------------------------------------------------
                WHEN CONVERT(varchar(max), ds_produto) = 'PMP/RO ESTIMATIVO PARA PAGAMENTOS DAS TAXAS DE LICENCIAMENTO DE VEÍCULOS JUNTO AO DEPARTAMENTO ESTADUAL DE TRÂNSITO DE RONDÔNIA-DETRAN.' THEN 92033925
                ---------------------------------------------------------------------------------------------------------------------------------------------------------------
                -- 18 ---------------------------------------------------------------------------------------------------------------------------------------
                WHEN CONVERT(varchar(max), ds_produto) = 'PMP SERVIÇO REVISAO M1.' AND nr_pedido IN (2, 3) THEN 92033920
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP DESLOCAMENTO VILHENA X PARECIS' AND nr_pedido IN (2, 3) THEN 92033921
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP FILTRO LUBRIFICANTE TECTOR' AND nr_pedido IN (2, 3) THEN 92033912
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP FILTRO RACOR IVECO STRALIS/TECTOR  (SEPARADOR).' AND nr_pedido IN (2, 3) THEN 92033914
        WHEN CONVERT(varchar(max), ds_produto) = 'FILTRO DE AR IVECO TECTOR NEXPRO' AND nr_pedido IN (2, 3) THEN 92033915
        WHEN CONVERT(varchar(max), ds_produto) = 'FILTRO AR SEGURANCA SECUNDARIO' AND nr_pedido IN (2, 3) THEN 92033916
        WHEN CONVERT(varchar(max), ds_produto) = 'OLEO MERITOR GL5 85W140 LT.' AND nr_pedido IN (2, 3) THEN 92033917
        WHEN CONVERT(varchar(max), ds_produto) = 'ADITIVO SOLUÇAO ARREFECEDORA PETRONAS  COOLANT.' AND nr_pedido IN (2, 3) THEN 92033918
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP FL PETRONAS URANIA 500 ST SAE 40 1X20L.' AND nr_pedido IN (2, 3) THEN 92033919
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP FILTRO COMBUSTIVEL TECTOR' AND nr_pedido IN (2, 3) THEN 92033913
        WHEN CONVERT(varchar(max), ds_produto) = 'PMP - OLEO PETRONAS 15W40 LT (LUBRIFICANTE)' AND nr_pedido IN (2, 3) THEN 92033911           
                --------------------------------------------------------------------------------------------------------------------------------------------
        END AS id
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
    )as itemPropostaParticipante,
    ds_produto
from COMPPedidosItens where aa_pedido = 2024 and nr_pedido not in (34, 35);
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        const transformedData = resultData.map(record => {
            try {
                // Parsing JSON fields
                const contratacao = record.contratacao ? JSON.parse(record.contratacao) : null;
                const itemPropostaParticipante = record.itemPropostaParticipante ? JSON.parse(record.itemPropostaParticipante) : null;
                
                // Returning transformed data including ds_produto
                return {
                    contratacao: {
                        id: contratacao?.id || null
                    },
                    itemPropostaParticipante: {
                        id: itemPropostaParticipante?.id || null
                    },
                    quantidade: record.quantidade || null,
                    valorUnitarioPercentual: record.valorUnitarioPercentual || null,
                };
            } catch (err) {
                console.error('Erro ao processar registro:', err);
                return null;
            }
        }).filter(record => record !== null);

        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }
        

        let report = [];

        for (const record of transformedData) {
            const contratacaoId = record.contratacao.id; // ID dinâmico da contratação
        
            if (contratacaoId) { // Verifica se o ID é válido
                try {
                    const response = await fetch(`https://services.contratos.betha.cloud/contratacao-services/api/exercicios/2024/contratacoes/${contratacaoId}/itens`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                        },
                        body: JSON.stringify(record) // Envia o registro completo
                    });
        
                    const responseBody = await response.json();
        
                    if (response.ok) {
                        console.log(`Dados enviados com sucesso para a rota.`);
                        report.push({ record, status: 'success', response: responseBody });
                    } else {
                        console.error(`Erro ao enviar os dados para a rota:`, response.statusText);
                        report.push({ record, status: 'failed', response: responseBody });
                    }
                } catch (err) {
                    console.error(`Erro ao enviar o registro para a rota:`, err);
                    report.push({ record, status: 'error', error: err.message });
                }
            } else {
                console.error('ID de contratação inválido. O registro será ignorado.');
                report.push({ record, status: 'invalid', error: 'ID de contratação inválido.' });
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
