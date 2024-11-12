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
    const year = d.getUTCFullYear();
    const month = (`0${d.getUTCMonth() + 1}`).slice(-2);
    const day = (`0${d.getUTCDate()}`).slice(-2);
    const hours = (`0${d.getUTCHours()}`).slice(-2);
    const minutes = (`0${d.getUTCMinutes()}`).slice(-2);
    const seconds = (`0${d.getUTCSeconds()}`).slice(-2);
    return `${year}-${month}-${day}`;
    //return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "COMP_ALMO"
        const selectDatabaseQuery = 'USE CONTABIL2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            	SELECT 
    CAST(ROW_NUMBER() OVER (ORDER BY cd_cecam) AS VARCHAR) AS idIntegracao,
    JSON_QUERY(
        (SELECT
            cd_codconta AS numero,
            cd_dig_conta AS digito,
            JSON_QUERY(
                (SELECT 
                    CASE  concat(cd_codagencia,cd_dig_agencia)
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

                    END AS id
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
                ) 
            ) AS agencia,
            JSON_QUERY(
                (SELECT 
                    CASE cd_codbanco
                                        when 001    then 137
when 104    then 148
when 756    then 51
when 237    then 35
when 033    then 114
when 077        then 74
when 084        then 175
when 097        then 474
when 133    then 483
when 260        then 676
when 341        then 165
when 748        then 50

          
                    END AS id
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
                ) 
            ) AS banco,
            ds_banco AS descricao,
            JSON_QUERY(
                (SELECT 
                    'CORRENTE' AS tipo
                FOR JSON PATH
                )
            ) AS tiposContas,
            JSON_QUERY(
                (SELECT 
                    FORMAT(dt_cadastro, 'yyyy-MM-dd') AS dataInicial,
                    'Inicio da conta' AS motivoInicial
                FOR JSON PATH
                )
            ) AS vigencias
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        )
    ) AS content
FROM CONTFICHABANCOS 
--where cd_cecam = 1995
where ds_banco not like  '%TESOU%'
        `;

        const result = await masterConnection.query(userQuery);

        const resultData = result.recordset;

        const transformedData = resultData.map(record => {
            // Log para verificar o que está sendo recebido em cada registro
            console.log(record);  // Verificar o que está sendo recebido
        
            // Fazer o parse dos campos que vêm como strings JSON
            const parsedContent = record.content ? JSON.parse(record.content) : {};
        
            // Montagem do JSON final seguindo o novo modelo
            return {
                idIntegracao: record.idIntegracao,  // Verificar se existe `idIntegracao`
                content: {
                    numero: parsedContent.numero,  // Usar fallback se valor não existir
                    digito: parsedContent.digito,  // Fallback
                    agencia: {
                        id: parsedContent.agencia?.id || null  // Extrair id da agência, com fallback para null
                    },
                    banco: {
                        id: parsedContent.banco?.id || null  // Extrair id do banco, com fallback para null
                    },
                    descricao: parsedContent.descricao,  // Descrição do banco
                    tiposContas: [
                        {
                            tipo: parsedContent.tiposContas[0]?.tipo || null  // Extrair tipo da conta, com fallback
                        }
                    ],
                    vigencias: parsedContent.vigencias?.map(vigencia => ({
                        dataInicial: vigencia.dataInicial || null,  // Data de vigência
                        motivoInicial: vigencia.motivoInicial || null  // Motivo
                    })) || []  // Fallback para array vazio se vigencias não existir
                }
            };
        });

        /*    const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        return */
        
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
        
                const response = await fetch(`https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/contas-bancarias-entidades`, {
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