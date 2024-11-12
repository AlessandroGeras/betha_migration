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
        const selectDatabaseQuery = 'USE CONTABIL2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
a.cd_fornecedor as idIntegracao,
JSON_QUERY(
(SELECT
    case 
    WHEN LEN(ds_cgc) < 17 THEN 'FISICA' 
ELSE 'JURIDICA'
    END AS tipo,
    ds_nome as nome,
    JSON_QUERY(
(SELECT
    case a.fl_ProdutorRural
    when 'N' then 'false'
    when 'S' then 'true'
    end as produtorRural,
    case a.fl_INSSFolhaProdutorRural
    when 'N' then 'false'
    when 'S' then 'true'
    end as contribuicaoPrevidenciariaFolha,
    'false' as prestadorServico,
    'false' as contribuicaoReceitaBruta,
    'false' as beneficiarioPagamento,
    JSON_QUERY(
(SELECT
    a.ds_cgc as cpf
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS juridica
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS credorReinf,
a.DT_CADASTRO as dataInclusao
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
from CONTFORNECEDORES  a
where a.cd_fornecedor not in (
select a.cd_fornecedor from CONTFORNECEDORES a
inner join CONTFornecedorContaBancaria f
on f.cd_fornecedor = a.cd_fornecedor
where LEN(a.ds_cgc) < 17
--and a.cd_fornecedor = 4
)
and LEN(a.ds_cgc) < 17

--and a.cd_fornecedor = 4
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            console.log(record);
        
            // Parse the content field from the record
            const content = JSON.parse(record.content);
        
            // Check if the record has a CPF under credorReinf
            let cpf = content.credorReinf?.juridica?.cpf?.replace(/\D/g, '') || null;
            if (cpf && cpf.length < 11) {
                cpf = cpf.padStart(11, '0'); // Pad with zeros to reach 11 digits
            }
        
            return {
                idIntegracao: record.idIntegracao.toString(),
                content: {
                    tipo: content.tipo || "FISICA", // Default to "FISICA" if not specified
                    nome: content.nome.trim(),
                    credorReinf: {
                        produtorRural: content.credorReinf?.produtorRural === "true",
                        contribuicaoPrevidenciariaFolha: content.credorReinf?.contribuicaoPrevidenciariaFolha === "true",
                        prestadorServico: content.credorReinf?.prestadorServico === "true",
                        contribuicaoReceitaBruta: content.credorReinf?.contribuicaoReceitaBruta === "true",
                        beneficiarioPagamento: content.credorReinf?.beneficiarioPagamento === "true"
                    },
                    // Add physical person fields based on the content type
                    ...(content.tipo === "FISICA" && {
                        fisica: {
                            cpf: cpf // Assign sanitized CPF
                        }
                    }),
                    dataInclusao: content.dataInclusao.split("T")[0] // Format date to 'YYYY-MM-DD'
                }
            };
        }).filter(record => record !== null); // Filter out null records

        /* const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        return */


        // The rest of the code remains unchanged for batching and sending data
        const chunkArray = (array, size) => {
            const chunked = [];
            for (let i = 0; i < array.length; i += size) {
                chunked.push(array.slice(i, i + size));
            }
            return chunked;
        };

        const batchedData = chunkArray(transformedData, 50);
        let report = [];
        let reportIds = [];

        for (const batch of batchedData) {
            try {
                console.log('Enviando o seguinte corpo para a API:', JSON.stringify(batch, null, 2));

                const response = await fetch(`https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/credores`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 25a840ae-b57a-4030-903a-bcccf2386f30'
                    },
                    body: JSON.stringify(batch)
                });

                const responseBody = await response.json();

                if (response.ok) {
                    console.log('Dados enviados com sucesso para a API.');
                    batch.forEach(record => {
                        report.push({ record, status: 'success', response: responseBody });
                    });

                    if (responseBody.idLote) {
                        reportIds.push(responseBody.idLote);
                    }
                } else {
                    console.error('Erro ao enviar os dados para a API:', response.statusText);
                    batch.forEach(record => {
                        report.push({ record, status: 'failed', response: responseBody });
                    });
                }
            } catch (err) {
                console.error('Erro ao enviar o batch para a API:', err);
                batch.forEach(record => {
                    report.push({ record, status: 'error', error: err.message });
                });
            }
        }

        // Save the report in 'report.json'
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));
        console.log('Relatório salvo em report.json com sucesso.');

        // Save the reportIds in the 'report_id.json' file
        fs.writeFileSync('report_id.json', JSON.stringify(reportIds, null, 2));
        console.log('report_id.json salvo com sucesso.');

    } catch (error) {
        console.error('Erro no processo:', error);
    } finally {
        await sql.close(); // Close the connection with SQL Server
        console.log('Conexão com o SQL Server fechada.');
    }
}

// Execute the main function
main();