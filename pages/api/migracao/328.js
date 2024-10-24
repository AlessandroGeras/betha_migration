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
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
    return `${year}-${month}`;
    //return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "TRIBUTOS2024"
        const selectDatabaseQuery = 'USE TRIBUTOS2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            SELECT 
    nf.cd_notafiscal AS idIntegracao,
    JSON_QUERY(
        (
            SELECT
                c.cd_contribuinte AS idPessoa,
                nf.nr_notafiscal AS nroNota,
                nf.dt_emissao AS dhFatoGerador,
                nf.dt_emissao AS dhEmissao,
                nf.nr_ChaveValidacao AS nroVerificacao,
                CASE nf.cd_situacao
                    WHEN 0 THEN 'NORMAL'
                    WHEN 1 THEN 'CANCELADA'
                END AS situacao,
                cd_Referencia AS idCompetencias,
                'SIM' AS optanteSimples,
                'TRIBUTACAO_MUNICIPIO' AS naturezaOperacao,
                'NORMAL' AS situacaoTributaria,
                'Parecis ' AS prestadorMunicipio,
                C.ds_inscricao_municipal AS prestadorInscricao,
                c.ds_razaosocial AS prestadorNome,
                c.cd_cepcorr AS prestadorCep,
                c.ds_EnderCorr AS prestadorLogradouro,
                c.cd_numcorr AS prestadorNumero,
                c.ds_complcorr AS prestadorComplemento,
                nfi.vl_item AS TotalServicos,
                0 AS vlTotalDescontosCondicionados,
                0 AS vlTotalDescontosIncondicionados,
                nfi.vl_Deducao AS vlTotalDeducoes,
                nfi.pc_aliquota AS aliquota,
                0 as vlTotalIssOutros
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        )
    ) AS notas_fiscais
FROM ISSNotaFiscal nf
JOIN ISSContribuintes c ON c.nr_CGCCPF = nf.nr_CGCCPF
JOIN ISSNotaFiscalItem nfi ON nfi.cd_NotaFiscal = nf.cd_NotaFiscal
WHERE nf.cd_TipoDocumento = 2
AND nfi.pc_aliquota != 0 -- Filtra registros com aliquota diferente de 0
ORDER BY nf.cd_NotaFiscal ASC;
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const notas_fiscais = JSON.parse(record.notas_fiscais); // Parse the JSON string to an object

            let anoCompetencia = formatDate2(notas_fiscais.dhEmissao);
            let resultado;

            switch (anoCompetencia) {
                case '2019-01':
                    resultado = 4086;
                    break;
                case '2019-02':
                    resultado = 4087;
                    break;
                case '2019-03':
                    resultado = 4088;
                    break;
                case '2019-04':
                    resultado = 4089;
                    break;
                case '2019-05':
                    resultado = 4090;
                    break;
                case '2019-06':
                    resultado = 4091;
                    break;
                case '2019-07':
                    resultado = 4092;
                    break;
                case '2019-08':
                    resultado = 4093;
                    break;
                case '2019-09':
                    resultado = 4094;
                    break;
                case '2019-10':
                    resultado = 4095;
                    break;
                case '2019-11':
                    resultado = 4096;
                    break;
                case '2019-12':
                    resultado = 4097;
                    break;

                case '2020-01':
                    resultado = 4098;
                    break;
                case '2020-02':
                    resultado = 4099;
                    break;
                case '2020-03':
                    resultado = 4100;
                    break;
                case '2020-04':
                    resultado = 4101;
                    break;
                case '2020-05':
                    resultado = 4102;
                    break;
                case '2020-06':
                    resultado = 4103;
                    break;
                case '2020-07':
                    resultado = 4104;
                    break;
                case '2020-08':
                    resultado = 4105;
                    break;
                case '2020-09':
                    resultado = 4106;
                    break;
                case '2020-10':
                    resultado = 4107;
                    break;
                case '2020-11':
                    resultado = 4108;
                    break;
                case '2020-12':
                    resultado = 4109;
                    break;

                case '2021-01':
                    resultado = 4110;
                    break;
                case '2021-02':
                    resultado = 4111;
                    break;
                case '2021-03':
                    resultado = 4112;
                    break;
                case '2021-04':
                    resultado = 4113;
                    break;
                case '2021-05':
                    resultado = 4114;
                    break;
                case '2021-06':
                    resultado = 4115;
                    break;
                case '2021-07':
                    resultado = 4116;
                    break;
                case '2021-08':
                    resultado = 4117;
                    break;
                case '2021-09':
                    resultado = 4118;
                    break;
                case '2021-10':
                    resultado = 4119;
                    break;
                case '2021-11':
                    resultado = 4120;
                    break;
                case '2021-12':
                    resultado = 4121;
                    break;

                case '2022-01':
                    resultado = 4122;
                    break;
                case '2022-02':
                    resultado = 4123;
                    break;
                case '2022-03':
                    resultado = 4124;
                    break;
                case '2022-04':
                    resultado = 4125;
                    break;
                case '2022-05':
                    resultado = 4126;
                    break;
                case '2022-06':
                    resultado = 4127;
                    break;
                case '2022-07':
                    resultado = 4128;
                    break;
                case '2022-08':
                    resultado = 4129;
                    break;
                case '2022-09':
                    resultado = 4130;
                    break;
                case '2022-10':
                    resultado = 4131;
                    break;
                case '2022-11':
                    resultado = 4132;
                    break;
                case '2022-12':
                    resultado = 4133;
                    break;

                case '2023-01':
                    resultado = 4134;
                    break;
                case '2023-02':
                    resultado = 4135;
                    break;
                case '2023-03':
                    resultado = 4136;
                    break;
                case '2023-04':
                    resultado = 4137;
                    break;
                case '2023-05':
                    resultado = 4138;
                    break;
                case '2023-06':
                    resultado = 4139;
                    break;
                case '2023-07':
                    resultado = 4140;
                    break;
                case '2023-08':
                    resultado = 4141;
                    break;
                case '2023-09':
                    resultado = 4142;
                    break;
                case '2023-10':
                    resultado = 4143;
                    break;
                case '2023-11':
                    resultado = 4144;
                    break;
                case '2023-12':
                    resultado = 4145;
                    break;

                case '2024-01':
                    resultado = 4146;
                    break;
                case '2024-02':
                    resultado = 4147;
                    break;
                case '2024-03':
                    resultado = 4148;
                    break;
                case '2024-04':
                    resultado = 4149;
                    break;
                case '2024-05':
                    resultado = 4150;
                    break;
                case '2024-06':
                    resultado = 4151;
                    break;
                case '2024-07':
                    resultado = 4152;
                    break;
                case '2024-08':
                    resultado = 4153;
                    break;
                case '2024-09':
                    resultado = 4154;
                    break;
                case '2024-10':
                    resultado = 4155;
                    break;
                case '2024-11':
                    resultado = 4156;
                    break;
                case '2024-12':
                    resultado = 4157;
                    break;
            }


            return {
                idIntegracao: record.idIntegracao.toString(),
                "notas-fiscais": {
                    idPessoa: notas_fiscais.idPessoa,
                    nroNota: notas_fiscais.nroNota,
                    dhFatoGerador: formatDate(notas_fiscais.dhFatoGerador),
                    dhEmissao: formatDate(notas_fiscais.dhEmissao),
                    nroVerificacao: notas_fiscais.nroVerificacao,
                    situacao: notas_fiscais.situacao,
                    idCompetencias: resultado,
                    optanteSimples: notas_fiscais.optanteSimples,
                    naturezaOperacao: notas_fiscais.naturezaOperacao,
                    situacaoTributaria: notas_fiscais.situacaoTributaria,
                    prestadorMunicipio: notas_fiscais.prestadorMunicipio,
                    prestadorInscricao: notas_fiscais.prestadorInscricao,
                    prestadorNome: notas_fiscais.prestadorNome,
                    prestadorCep: notas_fiscais.prestadorCep || "76979000",
                    prestadorLogradouro: notas_fiscais.prestadorLogradouro,
                    prestadorNumero: notas_fiscais.prestadorNumero,
                    prestadorComplemento: notas_fiscais.prestadorComplemento || null,
                    vlTotalServicos: notas_fiscais.TotalServicos,
                    vlTotalDescontosCondicionados: notas_fiscais.vlTotalDescontosCondicionados,
                    vlTotalDescontosIncondicionados: notas_fiscais.vlTotalDescontosIncondicionados,
                    vlTotalDeducoes: notas_fiscais.vlTotalDeducoes,
                    vlTotalLiquido: notas_fiscais.TotalServicos - notas_fiscais.vlTotalDeducoes,
                    vlTotalBaseCalculo: notas_fiscais.TotalServicos * (notas_fiscais.aliquota / 100),
                    vlTotalIss: notas_fiscais.vlTotalDeducoes,
                    vlTotalIssOutros: notas_fiscais.vlTotalIssOutros,
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

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const response = await fetch('https://nota-eletronica.betha.cloud/service-layer/api/notas-fiscais', {
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
