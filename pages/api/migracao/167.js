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

        // Selecionar o banco de dados "COMP_ALMO"
        const selectDatabaseQuery = 'USE COMP_ALMO';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            SELECT
cd_Comissao as id,
'Comissão responsável pelo julgamento dos processos licitatórios.' as finalidade,
JSON_QUERY((SELECT act.ds_ComissaoTipo  AS valor, 
                                     act.ds_ComissaoTipo as descricao FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) as tipoComissao,
dt_Exoneracao as dataExpiracao,
JSON_QUERY((SELECT 9743  AS id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) as tipoAto,
JSON_QUERY((SELECT 525801  AS id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) as ato,
JSON_QUERY((SELECT i.cd_Integrante AS id, 
                                JSON_QUERY((SELECT cd_Integrante  AS id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) as responsavel,
                                   JSON_QUERY((SELECT CASE WHEN i.ds_Cargo = 'PRESIDENTE DA CPL' 
                                                                                  THEN 'PRESIDENTE' 
                                                                                  WHEN i.ds_Cargo = 'EQUIPE DE APOIO' THEN 'MEMBRO' 
                                                                                  WHEN i.ds_Cargo = 'EQUPE DE APOIO' THEN 'MEMBRO' 
                                                                                  ELSE 'PREGOEIRO' END AS valor, 
                                                                                  CASE WHEN i.ds_Cargo = 'PRESIDENTE DA CPL' 
                                                                                  THEN 'PRESIDENTE' 
                                                                                  WHEN i.ds_Cargo = 'EQUIPE DE APOIO' THEN 'MEMBRO' 
                                                                                  WHEN i.ds_Cargo = 'EQUPE DE APOIO' THEN 'MEMBRO' 
                                                                                  ELSE 'PREGOEIRO' END as descricao FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) as atribuicao FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) as membros

FROM COMPComissao c
left join COMPAudespComissaoTipo act on act.cd_ComissaoTipo = c.cd_ComissaoTipo
left join COMPComissaoIntegrante ci on ci.id_Comissao = c.id_Comissao
left join COMPIntegrantes i on i.id_Integrante = ci.id_Integrante
left join COMPAudespComissaoNaturezaCargo cnc on cnc.cd_NaturezaCargo = i.cd_NaturezaCargo
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Função para formatar a data no padrão yyyy-mm-dd
        function formatDate(date) {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = (`0${d.getMonth() + 1}`).slice(-2);
            const day = (`0${d.getDate()}`).slice(-2);
            return `${year}-${month}-${day}`;
        }

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            let tipoComissao, membros, tipoAto, ato;
            try {
                tipoComissao = JSON.parse(record.tipoComissao);
                membros = JSON.parse(record.membros);
                tipoAto = JSON.parse(record.tipoAto);
                ato = JSON.parse(record.ato);
            } catch (error) {
                console.error('Erro ao fazer parse de tipoComissao, membros, tipoAto ou ato:', record, error);
                throw error;
            }

            // Formatar dataExpiracao
            const formattedDate = formatDate(record.dataExpiracao);

            const transformedRecord = {
                finalidade: record.finalidade,
                tipoComissao: {
                    valor: tipoComissao.valor.toUpperCase(),
                    descricao: tipoComissao.descricao.toUpperCase()
                },
                dataExpiracao: formattedDate,
                tipoAto: {
                    id: tipoAto.id
                },
                ato: {
                    id: ato.id
                },
                membros: membros ? [{
                    responsavel: {
                        id: membros.responsavel.id
                    },
                    atribuicao: {
                        valor: membros.atribuicao.valor.toUpperCase(),
                        descricao: membros.atribuicao.descricao.toUpperCase()
                    }
                }] : []
            };

            return transformedRecord;
        });

        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar os registros em chunks de 50 para a API e registrar as respostas
        /* const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const response = await fetch('https://compras.betha.cloud/compras-services/api/comissoes-licitacao', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                },
                body: JSON.stringify(chunk)
            });

            const responseData = await response.json();
            const logEntry = `Chunk ${i / chunkSize + 1}: ${JSON.stringify(responseData)}\n`;
            fs.appendFileSync('log_responses.txt', logEntry);

            if (response.ok) {
                console.log(`Dados do chunk ${i / chunkSize + 1} enviados com sucesso para a rota.`);
            } else {
                console.error(`Erro ao enviar os dados do chunk ${i / chunkSize + 1} para a rota:`, response.statusText);
            }
        } */

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
