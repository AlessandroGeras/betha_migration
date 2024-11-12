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
    a.ds_cgc as cnpj
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS juridica
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS credorReinf,
a.DT_CADASTRO as dataInclusao,
1  as id,
case f.cd_Febraban
when 001    then 137
when 104    then 148
when 756    then 51
when 237    then 35
when 033    then 114
when 077	then 74
when 084	then 175
when 097	then 474
when 133    then 483
when 260	then 676
when 341	then 165
when 748	then 50
        end as banco,
case concat(f.nr_agencia,f.dv_agencia)
when '040061' then 203099
 when '032710' then 203100
 when '004061' then 203101
 when '032717' then 203102
 when '275506' then 203103
 when '027553' then 203104
 when '275500' then 203105
 when '032719' then 203106
 when '044061' then 203107
 when '275530' then 203108
 when '040066' then 203109
 when '14060' then 203115
 when '42056' then 203116
 when '01023' then 203117
 when '33065' then 203118
 when '42684' then 203119
 when '11797' then 203120
 when '09512' then 203121
 when '15970' then 203122
 when '34371' then 203123
 when '2757X' then 203124
 when '1401X' then 203125
 when '11819' then 203126
 when '22268' then 203127
 when '19127' then 203128
 when '41483' then 203129
 when '2290X' then 203130
 when '3181X' then 203131
 when '06165' then 203132
 when '45209' then 203133
 when '01325' then 203134
 when '50830' then 203135
 when '11789' then 203136
 when '3231X' then 203137
 when '40061' then 203138
 when '40053' then 203139
 when '40045' then 203140
 when '1639X' then 203141
 when '10030' then 203142
 when '22926' then 203143
 when '35998' then 203144
 when '76465' then 203145
 when '8087X' then 203146
 when '35084' then 203147
 when '17698' then 203148
 when '15822' then 203149
 when '28428' then 203150
 when '40096' then 203151
 when '14044' then 203152
 when '40037' then 203153
 when '1406' then 203154
 when '32921' then 203155
 when '00469' then 203156
 when '09016' then 203157
 when '42021' then 203158
 when '01970' then 203159
 when '21733' then 203160
 when '1023' then 203161
 when '37966' then 203162
 when '0260' then 203163
 when '2462' then 203164
 when '2492' then 203165
 when '000010' then 203166
 when '0001' then 203167
 when '0035' then 203168
 when '0004' then 203169
 when '0002' then 203170
 when '0012' then 203171
 when '0005' then 203172
 when '0009' then 203173
 when '2848' then 203174
 when '2755' then 203175
 when '0632' then 203176
 when '1824' then 203177
 when '0651' then 203178
 when '1823' then 203179
 when '2783' then 203180
 when '3432' then 203181
 when '0470' then 203182
 when '2278' then 203183
 when '2757X' then 203184
 when '1626' then 203185
 when '4130' then 203186
 when '1630' then 203187
 when '1624' then 203188
 when '0483' then 203189
 when '1486' then 203190
 when '1082' then 203191
 when '0806' then 203192
 when '1237' then 203193
 when '0457' then 203194
 when '0001' then 203195
 when '1350' then 203196
 when '0664' then 203197
 when '0288' then 203198
 when '0500' then 203199
 when '8822' then 203200
 when '0821' then 203201
 when '0217' then 203202
 when '3271' then 203203
 when '4599' then 203204
 when '3337' then 203205
 when '3273' then 203206
 when '5018' then 203207
 when '0001' then 203208
 when '32711' then 203209
 when '32717' then 203210
 when '32719' then 203211
 when '3069' then 203212
 when '3315' then 203213
 when '3325' then 203214
 when '3172' then 203215
 when '4619' then 203216
end  as agencia,
f.nr_conta  as numero,
f.dv_conta  as digito,
case f.cd_ContaBancariaTipo
when 1    then 'CORRENTE'
   end as Tipo,
'ABERTA' as situacao,
'true' as padrao
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
from CONTFORNECEDORES a
inner join CONTFornecedorContaBancaria f
on f.cd_fornecedor = a.cd_fornecedor
where LEN(a.ds_cgc) > 17
--and a.cd_fornecedor = 4





        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            // Parse JSON content
            const content = JSON.parse(record.content);
        
            // Check CNPJ in juridica key, remove non-digit characters, and ensure it's 14 digits
            let cnpj = content.credorReinf?.juridica?.cnpj?.replace(/\D/g, '') || null;
            if (cnpj) {
                if (cnpj.length > 14) {
                    cnpj = cnpj.slice(-14); // Keep only the last 14 digits
                } else if (cnpj.length < 14) {
                    cnpj = cnpj.padStart(14, '0'); // Pad with zeros to reach 14 digits
                }
            }
        
            return {
                idIntegracao: record.idIntegracao.toString(),
                content: {
                    tipo: content.tipo || "JURIDICA",
                    nome: content.nome.trim(),
                    credorReinf: {
                        produtorRural: content.credorReinf?.produtorRural === "true",
                        contribuicaoPrevidenciariaFolha: content.credorReinf?.contribuicaoPrevidenciariaFolha === "true",
                        prestadorServico: content.credorReinf?.prestadorServico === "true",
                        contribuicaoReceitaBruta: content.credorReinf?.contribuicaoReceitaBruta === "true",
                        beneficiarioPagamento: content.credorReinf?.beneficiarioPagamento === "true"
                    },
                    juridica: {
                        cnpj: cnpj // Sanitized and validated CNPJ
                    },
                    dataInclusao: content.dataInclusao.split("T")[0], // Format date to 'YYYY-MM-DD'
                    contasBancarias: [
                        {
                            id: content.id || 1,
                            banco: {
                                id: content.banco
                            },
                            agencia: {
                                id: content.agencia || 0
                            },
                            numero: content.numero || "0",
                            digito: content.digito || "0",
                            tipo: content.Tipo || "CORRENTE",
                            situacao: content.situacao || "ABERTA",
                            padrao: content.padrao === "true"
                        }
                    ]
                }
            };
        }).filter(record => record !== null); // Filter out null records
        
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
        
        // Salvar o relatório em 'report.json'
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));
        console.log('Relatório salvo em report.json com sucesso.');
        
        // Salvar os reportIds no arquivo 'report_id.json'
        fs.writeFileSync('report_id.json', JSON.stringify(reportIds, null, 2));
        console.log('report_id.json salvo com sucesso.');
        
        

    } catch (error) {
        console.error('Erro no processo:', error);
    } finally {
        await sql.close(); // Fechar a conexão com o SQL Server
        console.log('Conexão com o SQL Server fechada.');
    }
}

// Executar a função principal
main();