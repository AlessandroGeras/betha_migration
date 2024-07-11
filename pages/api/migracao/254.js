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

        // Selecionar o banco de dados "TRIBUTOS2024"
        const selectDatabaseQuery = 'USE TRIBUTOS2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
cd_receita as idIntegracao,
JSON_QUERY(
    (SELECT
cd_receita as iReceitas,
49218 as idIndexadores,
case cd_ficharec        
        WHEN 1 THEN 'IPTU'
    WHEN 2 THEN 'IPTU'
    WHEN 3 THEN 'IPTU'
    WHEN 4 THEN 'IPTU'
    WHEN 5 THEN 'ITBI'
    WHEN 6 THEN 'IRRF'
    WHEN 7 THEN 'ISSQN'
    WHEN 8 THEN 'ISSQN'
    WHEN 9 THEN 'ISSQN'
    WHEN 10 THEN 'ISSQN'
    WHEN 11 THEN 'ISSQN'
    WHEN 12 THEN 'TLFE'
    WHEN 13 THEN 'TPC'
    WHEN 14 THEN 'TLEO'
    WHEN 15 THEN 'THS'
    WHEN 16 THEN 'TLFE'
    WHEN 17 THEN 'TECIO'
    WHEN 18 THEN 'TFVS'
    WHEN 19 THEN 'TSC'
    WHEN 20 THEN 'TC'
    WHEN 21 THEN 'TLP'
    WHEN 22 THEN 'TE'
    WHEN 23 THEN 'TTC'
    WHEN 24 THEN 'OTSC'
    WHEN 25 THEN 'TCL'
    WHEN 26 THEN 'TETOU'
    WHEN 27 THEN 'CCSIL'
    WHEN 28 THEN 'RFUND'
    WHEN 29 THEN 'RMDE25'
    WHEN 30 THEN 'RPNAE'
    WHEN 31 THEN 'RPNATE'
    WHEN 32 THEN 'RSE'
    WHEN 33 THEN 'RPREF'
    WHEN 34 THEN 'RFI'
    WHEN 35 THEN 'RFITHA'
    WHEN 36 THEN 'RCVTEV'
    WHEN 37 THEN 'RCE'
    WHEN 38 THEN 'RCFED'
    WHEN 39 THEN 'SSMOSP'
    WHEN 40 THEN 'SM-H'
    WHEN 41 THEN 'CFPM-P'
    WHEN 42 THEN 'CFPM-F'
    WHEN 43 THEN 'CFPM-C'
    WHEN 44 THEN 'C-1%DZ'
    WHEN 45 THEN 'C-1%JL'
    WHEN 46 THEN 'CPIT-P'
    WHEN 47 THEN 'CPIT-F'
    WHEN 48 THEN 'CPCFEX'
    WHEN 49 THEN 'CFEP-P'
    WHEN 50 THEN 'TSE-PR'
    WHEN 51 THEN 'TRPN'
    WHEN 52 THEN 'TRPN'
    WHEN 53 THEN 'ADO-17'
    WHEN 54 THEN 'CICM-P'
    WHEN 55 THEN 'CICM-F'
    WHEN 56 THEN 'CIPV-P'
    WHEN 57 THEN 'CIPV-F'
    WHEN 58 THEN 'CIPI-P'
    WHEN 59 THEN 'CIPI-F'
    WHEN 60 THEN 'CPCID'
    WHEN 61 THEN 'OTC-ED'
    WHEN 62 THEN 'TRF-FU'
    WHEN 63 THEN 'TRF-FG'
    WHEN 64 THEN 'CFUNDE'
    WHEN 65 THEN 'OR-PRI'
    WHEN 66 THEN 'OR'
    WHEN 67 THEN 'MEV-FI'
    WHEN 93 THEN 'DMC-IC'
    WHEN 94 THEN 'DMR-IC'
    WHEN 95 THEN 'DMS-IC'
    WHEN 96 THEN 'DRB-IC'
    WHEN 97 THEN 'DMA-IC'
    WHEN 98 THEN 'DMN-IC'
    WHEN 99 THEN 'DMD-IC'
    WHEN 100 THEN 'DMO-IC'
    WHEN 101 THEN 'DMC-IC'
    WHEN 102 THEN 'DMC-ID'
    WHEN 103 THEN 'DMM-IC'
    WHEN 104 THEN 'FNDE-P'
    WHEN 105 THEN 'BFND-P'
    WHEN 106 THEN 'RCOSIP'
    WHEN 107 THEN 'RBCIDE'
    WHEN 108 THEN 'RDEFEM'
    WHEN 109 THEN 'RDBFEP'
    WHEN 110 THEN 'EDC-IF'
    WHEN 111 THEN 'ETI-LE'
    WHEN 112 THEN 'IRRF-O'
    WHEN 113 THEN 'IRRF-P'
    WHEN 114 THEN 'REST-C'
    WHEN 115 THEN 'RES-CA'
    WHEN 116 THEN 'REST-J'
    WHEN 117 THEN 'REST-V'
    WHEN 118 THEN 'REST-D'
    WHEN 119 THEN 'DAIL-I'
    WHEN 120 THEN 'DRR-IC'
    WHEN 121 THEN 'DMC-IC'
    WHEN 122 THEN 'DM-TCE'
    WHEN 123 THEN 'DRB-IC'
    WHEN 124 THEN 'DCE-ID'
    WHEN 125 THEN 'ICD-TC'
    WHEN 126 THEN 'DMC-RO'
    WHEN 127 THEN 'DC-ICD'
    WHEN 128 THEN 'DA-ICD'
    WHEN 129 THEN 'DMC-RO'
    WHEN 130 THEN 'DCR-RO'
    WHEN 131 THEN 'DRR-0'
    WHEN 132 THEN 'DMC-IC'
    WHEN 133 THEN 'D-J-PA'
    WHEN 134 THEN 'DAB-IC'
    WHEN 135 THEN 'DAILIC'
    WHEN 136 THEN 'DEA-IC'
    WHEN 137 THEN 'CPFP'
    WHEN 151 THEN 'RDB-CV'
    WHEN 152 THEN 'RDB-EM'
    WHEN 5201 THEN 'CD'
    WHEN 5202 THEN 'CD'
    WHEN 5203 THEN 'CD'
    WHEN 5204 THEN 'CD'
    WHEN 5205 THEN 'CD'
    WHEN 5206 THEN 'CD'
    WHEN 5301 THEN 'CS-PMP'
    WHEN 5302 THEN 'CBB-PM'
    WHEN 5303 THEN 'CEF-PM'
    WHEN 5304 THEN 'DCS-PM'
    WHEN 5305 THEN 'CMS-PM'
    WHEN 5306 THEN 'CMS-PM'
    WHEN 5307 THEN 'IRF-PM'
    WHEN 5308 THEN 'INSS-P'
    WHEN 5309 THEN 'PJA-PM'
    WHEN 5310 THEN 'RJR-PM'
    WHEN 5311 THEN 'R-IRPJ'
    WHEN 5312 THEN 'R-IRPF'
    WHEN 5412 THEN 'DP-FMS'
    WHEN 5414 THEN 'DTCPC'
END AS abreviatura,
ds_receita as descricao,
'NAO' as calculaImoveisRurais,
'SIM' AS emUso,
'SIM' AS flyProtocolo,
case 
                WHEN cd_ficharec in (1, 2, 3, 4, 5, 14, 15) THEN 'IMOVEIS'
        WHEN  cd_ficharec in (6, 7, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27) THEN 'CONTRIBUINTE'
        WHEN  cd_ficharec in (28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 137, 151, 152, 5201, 5202, 5203, 5204, 5205, 5206, 5301, 5302, 5303, 5304, 5305, 5306, 5307, 5308, 5309, 5310, 5311, 5312, 5412, 5414) THEN 'RECEITAS_DIVERSAS'
        WHEN  cd_ficharec in (39, 40, 65, 66, 67, 114, 115, 116, 117, 118) THEN 'CONTRIBUICAO_MELHORIAS'
        WHEN  cd_ficharec in (93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136) THEN 'AUTO_INFRACAO'
    END AS tipoCadastro
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS creditosTributarios
from CONTFichaReceita
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const creditosTributarios = JSON.parse(record.creditosTributarios); // Parse the JSON string to an object

            return {
                idIntegracao: record.idIntegracao,
                creditosTributarios: {
                    iReceitas: creditosTributarios.iReceitas,
                    idIndexadores: creditosTributarios.idIndexadores,
                    abreviatura: creditosTributarios.abreviatura,
                    descricao: creditosTributarios.descricao,
                    calculaImoveisRurais: creditosTributarios.calculaImoveisRurais,
                    emUso: creditosTributarios.emUso,  // Constant value
                    flyProtocolo: creditosTributarios.flyProtocolo,  // Constant value
                    tipoCadastro: creditosTributarios.tipoCadastro
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
        for (const record of transformedData) {
            const response = await fetch('https://tributos.betha.cloud/service-layer-tributos/api/creditosTributarios', {
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
        // Lidar com erros de conexão ou consulta aqui
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        await sql.close();
    }
}

// Chamar a função principal
main();
