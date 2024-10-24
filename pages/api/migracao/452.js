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

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "CONTABIL2024"
        const selectDatabaseQuery = 'USE COMP_ALMO';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            SELECT 
    JSON_QUERY(
        (SELECT
            CASE nr_licitacao
                WHEN 1 THEN 1240881
                WHEN 2 THEN 1240882 
                WHEN 3 THEN 1240883
                WHEN 4 THEN 1240884
                WHEN 5 THEN 1240885
                WHEN 6 THEN 1240886
                WHEN 7 THEN 1240887
                WHEN 8 THEN 1240888
                WHEN 9 THEN 1240889
                WHEN 10 THEN 1240890
                WHEN 11 THEN 1240891
                ELSE NULL
            END AS id
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
    ) AS processoAdministrativo,
    JSON_QUERY(
        (SELECT
            CASE 
                                --335--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) PASTILHA CJ, DIANTEIRO II' AND nr_licitacao = 11 THEN 16610035
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) JUNTA, VEDACAO DRENO OLEO MOTO.' AND nr_licitacao = 11 THEN 16610060
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) OLEO, MOTOR-SAE 5W30 API-SN.' AND nr_licitacao = 11 THEN 16610067
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) ELEMENTO, FILTRANTE AR MOTOR.' AND nr_licitacao = 11 THEN 16610130
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) FILTRO, OLEO MOTOR ' AND nr_licitacao = 11 THEN 16610142
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) KIT LUBRIFICACAO I-MTECH.' AND nr_licitacao = 11 THEN 16610147
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) LIMPADOR, SISTEMA COMB-DIESEL ' AND nr_licitacao = 11 THEN 16610154
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'OLEO LUBRIFICANTE HIDRAULICO 68 20 LT MOTONIVELADORA 120K CATERPILLA' AND nr_licitacao = 11 THEN 16609994
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO FILTRO CJ, CABINE, CARVÃO' AND nr_licitacao = 11 THEN 16609989
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO SAPATA CJ, FREIO ' AND nr_licitacao = 11 THEN 16610030
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO COOLANTE LIQUIDO ARREFECIMENTO' AND nr_licitacao = 11 THEN 16610157
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO FLUIDO DE FREIO DOT 4' AND nr_licitacao = 11 THEN 16610126
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) SUBS. PASTILHAS ' AND nr_licitacao = 11 THEN 16610179
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) ALINHAMENTO E BALANCEAMENTO ' AND nr_licitacao = 11 THEN 16609992
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO  (REVISÃO) OXI - SANITIZAÇÃO' AND nr_licitacao = 11 THEN 16610155
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO LIMP. TECNICA DO MOTOR' AND nr_licitacao = 11 THEN 16609997
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP RO SOS PNEUS' AND nr_licitacao = 11 THEN 16610028
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO LIMP. CORPO ACELERAÇÃO' AND nr_licitacao = 11 THEN 16610033
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO RENOVADOR DE COURO' AND nr_licitacao = 11 THEN 16610063
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO REGENERADOR DPF' AND nr_licitacao = 11 THEN 16610065
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO LIMP. SISTEMA DE FREIO' AND nr_licitacao = 11 THEN 16610124
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO LIMPEZA DA CAIXA EVAPORADORA' AND nr_licitacao = 11 THEN 16610127
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO AROMATIZANTE' AND nr_licitacao = 11 THEN 16610144
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO CRISTALIZADOR PARABRISA' AND nr_licitacao = 11 THEN 16610145
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO HIG. A/C' AND nr_licitacao = 11 THEN 16610159
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO ANTI ZINABRE BATERIA ' AND nr_licitacao = 11 THEN 16610164
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO TRATAMENTO ANTI DESGASTE' AND nr_licitacao = 11 THEN 16610165
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO LIMPEZA INTERNA MOTOR' AND nr_licitacao = 11 THEN 16610170
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO TRATAMENTO COMB.' AND nr_licitacao = 11 THEN 16610172
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO 4A. REVISÃO  40.000 KM' AND nr_licitacao = 11 THEN 16610177
                                -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

                                --334--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) PASTILHA CJ, DIANTEIRO II' AND nr_licitacao = 10 THEN 16610149
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) OLEO, MOTOR-SAE 5W30 API-SN.' AND nr_licitacao = 10 THEN 16610160
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) ELEMENTO, FILTRANTE AR MOTOR.' AND nr_licitacao = 10 THEN 16610162
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) FILTRO, OLEO MOTOR ' AND nr_licitacao = 10 THEN 16610167
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) KIT LUBRIFICACAO I-MTECH.' AND nr_licitacao = 10 THEN 16610174
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO BUCHA, MOLA- SUSPENSÃO -TRASEIRA 1' AND nr_licitacao = 10 THEN 16609980
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO FEIXE MOLAS CJ, SUSPENSÃO TRASEIRA' AND nr_licitacao = 10 THEN 16610007
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO LAMPADA FAROL  12V 5W' AND nr_licitacao = 10 THEN 16610020
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO FILTRO CJ, CABINE, CARVÃO' AND nr_licitacao = 10 THEN 16610042
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO PALHETAS KIT, LIMPADOR PARABRISA' AND nr_licitacao = 10 THEN 16610055
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO AMORTECEDOR KIT, SUSPENSÃO TRASEIRA' AND nr_licitacao = 10 THEN 16610070
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO FILTRO, COMBUSTIVEL MOTOR  4N' AND nr_licitacao = 10 THEN 16610122
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO SAPATA CJ, FREIO ' AND nr_licitacao = 10 THEN 16610132
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO TIRANTE, TERMINAL DIR' AND nr_licitacao = 10 THEN 16610140
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO LIMPADOR, SPRAY SISTEMA A/C  ' AND nr_licitacao = 10 THEN 16610169
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO LIMPA MOTOR FLUSH MTECH' AND nr_licitacao = 10 THEN 16610175
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO BUCHA, MOLA SUSPENSÃO TRASEIRA 2' AND nr_licitacao = 10 THEN 16610182
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) ALINHAMENTO E BALANCEAMENTO ' AND nr_licitacao = 10 THEN 16610002
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO  (REVISÃO) OXI - SANITIZAÇÃO' AND nr_licitacao = 10 THEN 16609987
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO (REVISÃO) 9.A REVISÃO - 90.000 KM ' AND nr_licitacao = 10 THEN 16610025
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) MECÂNICA EM GERAL' AND nr_licitacao = 10 THEN 16610040
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) JUNTA, VEDACAO DRENO OLEO MOTO.' AND nr_licitacao = 10 THEN 16610152
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) LIMPADOR, SISTEMA COMB-DIESEL ' AND nr_licitacao = 10 THEN 16610180
                                -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

                                --216--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) LAMPADA, FAROL-12V-5W.' AND nr_licitacao = 8 THEN 16609975
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) FILTRO CJ, CABINE, CARVÃO.' AND nr_licitacao = 8 THEN 16610010
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) FILTRO, COMBUSTIVEL MOTOR-4N' AND nr_licitacao = 8 THEN 16610017
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) PASTILHA CJ, DIANTEIRO II' AND nr_licitacao = 8 THEN 16610045
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) JUNTA, VEDACAO DRENO OLEO MOTO.' AND nr_licitacao = 8 THEN 16610053
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) OLEO, MOTOR-SAE 5W30 API-SN.' AND nr_licitacao = 8 THEN 16610073
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) ELEMENTO, FILTRANTE AR MOTOR.' AND nr_licitacao = 8 THEN 16610080
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) FILTRO, OLEO MOTOR ' AND nr_licitacao = 8 THEN 16610133
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) KIT LUBRIFICACAO I-MTECH.' AND nr_licitacao = 8 THEN 16610139
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) LIMPADOR, SISTEMA COMB-DIESEL ' AND nr_licitacao = 8 THEN 16610150
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) SERVIÇO ELETRICA.' AND nr_licitacao = 8 THEN 16609982
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) SUBS. PASTILHAS ' AND nr_licitacao = 8 THEN 16610005
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) MECÂNICA EM GERAL' AND nr_licitacao = 8 THEN 16610022
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) ALINHAMENTO E BALANCEAMENTO ' AND nr_licitacao = 8 THEN 16610037
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO- (REVISÃO) 10A.REVISAO-100.000KM' AND nr_licitacao = 8 THEN 16610058
                                -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

                WHEN CAST(ds_produto AS nvarchar(max)) = 'ESTIMATIVO PARA PAGAMENTO DE CUSTOS DE BOLETOS/GUIAS DE EMISSÃO DOS REGISTROS E AUTENTICIDADES DAS ARTS (ANOTAÇÃO DE RESPONSABILIDADE TÉCNICA), POR UM PERIODO DE 12 MESES NO EXERCICIO DE 2024.' THEN 16609956
                WHEN CAST(ds_produto AS nvarchar(max)) = 'TAXAS E TARIFAS BANCÁRIAS, DEBITADAS POR TRANSAÇÕES BANCARIAS, EFETUADAS, DAS CONTAS EXISTENTES JUNTO AO BANCO POR UM PERIODO DE 12 MESES NO EXERCICIO DE 2024.' THEN 16609959
                WHEN CAST(ds_produto AS nvarchar(max)) = 'ESTIMATIVO PARA PAGAMENTO DE FATURAS COM LINHA TELEFÔNICA, FORNECIDO PELA EMPRESA OI S. A - EM RECUPERAÇÃO JUDICIAL, PARA 12 MESES, NO DECORRER DO ANO DE 2024.' THEN 16609964
                WHEN CAST(ds_produto AS nvarchar(max)) = 'ESTIMADO PARA PAGAMENTO DE DESPESAS COM FATURAS DE ÁGUA POTÁVEL, FORNECIDO POR ÓRGÃO COMPETENTE (CAERD), POR UM PERÍODO ESTIMADO DE 12 (DOZE) MESES, VISANDO ATENDER AS NECESSIDADES DAS SECRETARIA MUNICIPAL' THEN 16609967
                WHEN CAST(ds_produto AS nvarchar(max)) = 'ESTIMATIVO DE PAGAMENTO DE FATURAS DE ENERGIA ELÉTRICA, FORNECIDO POR ÓRGÃO COMPETENTE ENERGISA RONDÔNIA - DISTRIBUIDORA DE ENERGIA S. A' THEN 16609969
                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP/RO ESTIMATIVO PARA PAGAMENTOS DAS TAXAS DE LICENCIAMENTO DE VEÍCULOS JUNTO AO DEPARTAMENTO ESTADUAL DE TRÂNSITO DE RONDÔNIA-DETRAN.' THEN 16609972
                
                WHEN CAST(ds_produto AS nvarchar(max)) = 'ESTIMATIVO PARA PAGAMENTO DE CUSTOS DE BOLETOS/GUIAS JUNTO AO ÓRGÃO COMPETENTE: CBMRO - CORPO DE BOMBEIROS MILITAR DO ESTADO DE RONDÔNIA, EM ATENDIMENTO A SECRETARIA MUNICIPAL DE ADMINISTRAÇÃO E FAZENDA - SEMAF, COM PREVISÃO DE 12 (DOZE) MESES PARA O PERÍODO DE JANEIRO A DEZEMBRO DE 2024.' THEN 16609977
                
                
                                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP - OLEO PETRONAS 15W40 LT (LUBRIFICANTE)' THEN 16609962
                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP SERVIÇO REVISAO M1.' THEN 16609984
                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP DESLOCAMENTO VILHENA X PARECIS' THEN 16609999
                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP FILTRO LUBRIFICANTE TECTOR' THEN 16610012
                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP FILTRO COMBUSTIVEL TECTOR' THEN 16610015
                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP FILTRO RACOR IVECO STRALIS/TECTOR  (SEPARADOR).' THEN 16610047
                WHEN CAST(ds_produto AS nvarchar(max)) = 'FILTRO DE AR IVECO TECTOR NEXPRO ' THEN 16610050
                WHEN CAST(ds_produto AS nvarchar(max)) = 'FILTRO AR SEGURANCA SECUNDARIO ' THEN 16610075
                WHEN CAST(ds_produto AS nvarchar(max)) = 'OLEO MERITOR GL5 85W140 LT.' THEN 16610078
                WHEN CAST(ds_produto AS nvarchar(max)) = 'ADITIVO SOLUÇAO ARREFECEDORA PETRONAS COOLANT.' THEN 16610135
                WHEN CAST(ds_produto AS nvarchar(max)) = 'PMP FL PETRONAS URANIA 500 ST SAE 40 1X20L.' THEN 16610137
                ELSE 1 
            END AS id
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
    ) AS item,
    JSON_QUERY(
        (SELECT
            CASE nr_licitacao
                WHEN 1 THEN 2443637
                WHEN 2 THEN 2443638
                WHEN 3 THEN 2443639
                WHEN 4 THEN 2443640
                WHEN 5 THEN 2443641
                WHEN 6 THEN 2443642
                WHEN 7 THEN 2443643
                WHEN 8 THEN 2461194
                WHEN 9 THEN 2443645
                WHEN 10 THEN 2461192
                WHEN 11 THEN 2461193
                ELSE NULL
            END AS id
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
    ) AS participante,
    qt_disponivel AS quantidade,
    'VENCEU' AS situacao,
    1 AS colocacao,
    vl_precounitario AS valorUnitarioPercentual,
        ds_produto
FROM COMPLicitacaoFornecedoresItens
WHERE aa_licitacao = 2024


        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {   
            
            return {
                conteudo:{
                processoAdministrativo: {
                    id: JSON.parse(record.processoAdministrativo).id // Supondo que o ID venha do content ou do record
                },
                participante: {
                    id: JSON.parse(record.participante).id // Ajuste conforme a origem de dados
                },
                item: {
                    id: JSON.parse(record.item).id // Ajuste conforme a origem de dados
                },
                quantidade: record.quantidade, // Valor padrão de 1 se não houver
                valorUnitarioPercentual: record.valorUnitarioPercentual,// Valor padrão de 0 se não houver
                situacao:{
                    valor:record.situacao,
                    descricao:record.situacao,
                },
                colocacao:record.colocacao
            }};
        }).filter(record => record !== null); // Filtrar registros nulos
        



        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const response = await fetch('https://compras.betha.cloud/compras-services/api/conversoes/lotes/proposta-participante', {
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
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        sql.close();
    }
}

main();
