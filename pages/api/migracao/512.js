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

        // Selecionar o banco de dados "CONTABIL2024"
        const selectDatabaseQuery = 'USE CONTABIL2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
ROW_NUMBER() OVER (ORDER BY cd_DestinacaoRecurso) as idIntegracao,
JSON_QUERY(
    (SELECT
JSON_QUERY(
    (SELECT
 8154 as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS configuracaoRecurso,
case fl_RecursoVinculado
when 'N' then 'ORDINARIO'
else 'VINCULADO'
end as tipo,
cd_DestinacaoRecurso as numero,
nm_DestinacaoRecurso as descricao,
JSON_QUERY(
    (SELECT
 case cd_DestinacaoRecurso
  when 150000000000 then 774124
 when 150000150000 then 774125
 when 150000250000 then 774126
 when 150100000000 then 774127
 when 150200000000 then 774128
 when 150200150000 then 774129
 when 150200250000 then 774130
 when 154000000000 then 774131
 when 154000300000 then 774132
 when 154000700000 then 774133
 when 154100000000 then 774134
 when 154100300000 then 774135
 when 154100700000 then 774136
 when 154200000000 then 774137
 when 154200300000 then 774138
 when 154200700000 then 774139
 when 154300000000 then 774140
 when 154400000000 then 774141
 when 155000000000 then 774142
 when 155100000000 then 774143
 when 155200000000 then 774144
 when 155300000000 then 774145
 when 156900000000 then 774146
 when 157000000000 then 774147
 when 157100000000 then 774148
 when 157200000000 then 774149
 when 157300000000 then 774150
 when 157400000000 then 774151
 when 157500000000 then 774152
 when 157600000000 then 774153
 when 159900000000 then 774154
 when 160000000000 then 774155
 when 160100000000 then 774156
 when 160200000000 then 774157
 when 160300000000 then 774158
 when 160400000000 then 774159
 when 160500000000 then 774160
 when 162100000000 then 774161
 when 162200000000 then 774162
 when 163100000000 then 774163
 when 163200000000 then 774164
 when 163300000000 then 774165
 when 163400000000 then 774166
 when 163500000000 then 774167
 when 163600000000 then 774168
 when 165900000000 then 774169
 when 166000000000 then 774170
 when 166100000000 then 774171
 when 166200000000 then 774172
 when 166500000000 then 774173
 when 166900000000 then 774174
 when 170000000000 then 774175
 when 170100000000 then 774176
 when 170200000000 then 774177
 when 170300000000 then 774178
 when 170500000000 then 774179
 when 170600000000 then 774180
 when 170600003110 then 774181
 when 170600003120 then 774182
 when 170700000000 then 774183
 when 170800000000 then 774184
 when 170900000000 then 774185
 when 171000000000 then 774186
 when 171000003210 then 774187
 when 171000003220 then 774188
 when 171100000000 then 774189
 when 171200000000 then 774190
 when 171300000000 then 774191
 when 171400000000 then 774192
 when 171500000000 then 774193
 when 171600000000 then 774194
 when 171700000000 then 774195
 when 171800000000 then 774196
 when 171900000000 then 774197
 when 171900250000 then 774198
 when 172000000000 then 774199
 when 172100000000 then 774200
 when 174900000000 then 774201
 when 175000000000 then 774202
 when 175100000000 then 774203
 when 175200000000 then 774204
 when 175300000000 then 774205
 when 175400000000 then 774206
 when 175500000000 then 774207
 when 175600000000 then 774208
 when 175700000000 then 774209
 when 175800000000 then 774210
 when 175900000000 then 774211
 when 176000000000 then 774212
 when 176100000000 then 774213
 when 179900000000 then 774214
 when 180000000000 then 774215
 when 180000001111 then 774216
 when 180000001121 then 774217
 when 180100000000 then 774218
 when 180100002111 then 774219
 when 180100002121 then 774220
 when 180200000000 then 774221
 when 180300000000 then 774223
 when 186000000000 then 774224
 when 186100000000 then 774225
 when 186200000000 then 774226
 when 186900000000 then 774227
 when 188000000000 then 774228
 when 189800000000 then 774229
 when 189900000000 then 774230
 end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS recursoSuperavitFinanceiro
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
from CONTDestinacaoRecurso
where cd_DestinacaoRecurso < 200000000000
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {  
            const content = JSON.parse(record.content);
            const descricao = content.descricao.length > 150 ? content.descricao.substring(0, 150) : content.descricao;
            
            return {
                idIntegracao: record.idIntegracao.toString(),
                content: {
                    configuracaoRecurso: {
                        id: content.configuracaoRecurso.id
                    },
                    descricao: descricao,
                    numero: content.numero,
                    tipo: content.tipo,
                    recursoSuperavitFinanceiro: {
                        id: content.recursoSuperavitFinanceiro.id
                    }
                }
            };
        });   
        
        
        
        let report = [];
        let reportIds = [];
        
        for (const record of transformedData) {
            const idIntegracao = record.idIntegracao;
        
            if (idIntegracao) {
                try {
                    const requestBody = [record];
        
                    console.log('Enviando o seguinte corpo para a API:', JSON.stringify(requestBody, null, 2));
        
                    const response = await fetch(`https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/recursos`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer 25a840ae-b57a-4030-903a-bcccf2386f30'
                        },
                        body: JSON.stringify(requestBody)
                    });
        
                    const responseBody = await response.json();
        
                    if (response.ok) {
                        console.log('Dados enviados com sucesso para a API.');
                        report.push({ record, status: 'success', response: responseBody });
        
                        if (responseBody.idLote) {
                            reportIds.push(responseBody.idLote);
                        }
                    } else {
                        console.error('Erro ao enviar os dados para a API:', response.statusText);
                        report.push({ record, status: 'failed', response: responseBody });
                    }
        
                } catch (err) {
                    console.error('Erro ao enviar o registro para a API:', err);
                    report.push({ record, status: 'error', error: err.message });
                }
            } else {
                console.warn('ID de integração inválido. O registro será ignorado.', record);
                report.push({ record, status: 'invalid', error: 'ID de integração inválido.' });
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