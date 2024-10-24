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
JSON_QUERY(
    (SELECT
 case  cd_Fornecedor
 when 981 then 36134722
 when 968 then 36134728
 end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS fornecedor,
JSON_QUERY(
    (SELECT
  3227 as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS tipoComprovante,
nr_docto as numeroComprovante,
m.dt_docto as dataEmissao,
sum (vl_movimento) as valorBruto,
sum (vl_movimento)as valorLiquido,
cd_SerieNotaFiscal as serie,
'migração de dados'as finalidade
from almomovimentacao m
join COMPLicitacao l on l.nr_processo = m.nr_processo
where aa_licitacao = 2024 and aa_movimento = 2024 and qt_movimento > 0
group by nr_docto, cd_Fornecedor, cd_SerieNotaFiscal, m.dt_docto
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        const transformedData = resultData.map(record => {
            try {
                // Parse dos campos fornecedor e tipoComprovante que são strings JSON
                const fornecedor = record.fornecedor ? JSON.parse(record.fornecedor) : { id: 0 };
                const tipoComprovante = record.tipoComprovante ? JSON.parse(record.tipoComprovante) : { id: 0 };

                return {
                    fornecedor: {
                        id: fornecedor.id || 0
                    },
                    tipoComprovante: {
                        id: tipoComprovante.id || 0
                    },
                    numeroComprovante: record.numeroComprovante || "string",
                    dataEmissao: record.dataEmissao || "string",
                    valorBruto: record.valorBruto || 0,
                    valorLiquido: record.valorLiquido || 0,
                    serie: record.serie || "string",
                    finalidade: record.finalidade || "string"
                };
            } catch (err) {
                console.error('Erro ao processar registro:', err);
                return null;
            }
        }).filter(record => record !== null);

        let report = [];

        for (const record of transformedData) {
            const { fornecedor, tipoComprovante } = record;

            if (fornecedor.id && tipoComprovante.id) {
                const url = `https://services.contratos.betha.cloud/contratacao-services/api/comprovantes`;

                const body = {
                    fornecedor: {
                        id: fornecedor.id
                    },
                    tipoComprovante: {
                        id: tipoComprovante.id
                    },
                    numeroComprovante: record.numeroComprovante.toString(),
                    dataEmissao: formatDate(record.dataEmissao),
                    valorBruto: record.valorBruto,
                    valorLiquido: record.valorLiquido,
                    serie: record.serie,
                    finalidade: record.finalidade
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

                    if (response.ok) {
                        console.log(`Dados enviados com sucesso para a rota ${url}`);
                        report.push({ record, status: 'success', response: responseBody });
                    } else {
                        console.error(`Erro ao enviar os dados para a rota ${url}:`, response.statusText);
                        console.error('Corpo enviado:', JSON.stringify(body, null, 2));
                        console.error('Erro da API:', responseBody);
                        report.push({ record, status: 'failed', response: responseBody });
                    }
                } catch (err) {
                    console.error(`Erro ao enviar o registro para a rota ${url}:`, err);
                    report.push({ record, status: 'error', error: err.message });
                }
            } else {
                console.error('ID de fornecedor ou tipo de comprovante inválido. O registro será ignorado.');
                report.push({ record, status: 'invalid', error: 'ID de fornecedor ou tipo de comprovante inválido.' });
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
