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
            	select 
ROW_NUMBER() OVER (ORDER BY cd_cecam) AS idIntegracao,
JSON_QUERY(
    (SELECT
        cd_Exercicio as exercicio,
        JSON_QUERY(
(SELECT
   case cd_passivonaofinanceiro
   when 17 then 9802
   when 18 then 9803
   when 19 then 9804
    when 20 then 9805
         when 21 then 9806
          when 22 then 9807
          end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS precatorio,
dt_PassivoNaoFinanceiroAtualizacao as data,
vl_PassivoNaoFinanceiroAtualizacao as valor,
ds_PassivoNaoFinanceiroAtualizacao as especificacao
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
from CONTPASSIVONAOFINANCEIROATUALIZACAO
where  cd_passivonaofinanceiro > 10
        `;

        const result = await masterConnection.query(userQuery);

        const resultData = result.recordset;

        const transformedData = resultData.map(record => {
            // Log para verificar o que está sendo recebido em cada registro
            console.log("Registro original:", record);
        
            // Fazer o parse dos campos que vêm como strings JSON
            const parsedContent = record.content ? JSON.parse(record.content) : {};
        
            // Extração dos valores com fallback para valores padrão
            const exercicio = parsedContent.exercicio || "Exercício não disponível";
            const precatorio = parsedContent.precatorio && parsedContent.precatorio.id
                ? { id: parsedContent.precatorio.id }
                : {};
            const data = parsedContent.data ? formatDate(parsedContent.data) : "Data não disponível";
            const valor = parsedContent.valor !== null && parsedContent.valor !== undefined 
                ? parseFloat(parsedContent.valor) 
                : null;
                const especificacao = parsedContent.especificacao 
                ? parsedContent.especificacao.substring(0, 100) 
                : "Especificação não disponível";
        
            // Montagem do JSON final
            return {
                idIntegracao: record.idIntegracao || null,  // Verificar se existe `idIntegracao`
                content: {
                    exercicio: exercicio,
                    precatorio: precatorio,
                    data: data,
                    valor: valor,
                    especificacao: especificacao
                }
            };
        });
        
        // Exibir resultado transformado
        console.log("Dados transformados:", JSON.stringify(transformedData, null, 2));
        
        
        
        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar cada registro individualmente para a rota desejada
        // Armazenar as respostas do servidor
        const serverResponses = [];

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const url = `https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/acrescimos-precatorios`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                },
                body: JSON.stringify(record)
            });
     
            const responseBody = await response.json();
            serverResponses.push({
                url: url,
                status: response.status,
                statusText: response.statusText,
                responseBody: responseBody
            });
     
            if (response.ok) {
                console.log(`Dados do registro enviados com sucesso para ${url}.`);
            } else {
                console.error(`Erro ao enviar os dados do registro para ${url}:`, response.statusText);
            }
        } */

        //fs.writeFileSync('log_bens.json', JSON.stringify(serverResponses, null, 2));
        //console.log('Respostas do servidor salvas em log_bens.json');

    } catch (error) {
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        await sql.close();
    }
}

// Chamar a função principal
main();