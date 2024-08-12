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
            select
                36067993 as responsavel, 
                nr_cotacao as numero,
                FORMAT(dt_abertura, 'yyyy-MM-dd') as dataCotacao,
                FORMAT(dt_limite, 'yyyy-MM-dd') as dataValidade,
                ds_objeto as objeto,
                JSON_QUERY(
                    (SELECT
                        fj.cd_formajulgamento as valor,
                        case fj.cd_formajulgamento 
                            when 1 then 'MENOR_PRECO_GLOBAL'
                            else 'MENOR_PRECO_POR_ITEM'
                        end as descricao
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS formaClassificacao,
                JSON_QUERY(
                    (SELECT
                        'VALOR_MEDIO' as valor,
                        'VALOR_MEDIO' as descricao
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS tipoPreco
            from COMPCotacao c
            join COMPLicitacaoFormaJulgamento fj on fj.cd_formajulgamento = c.cd_formajulgamento
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const formaClassificacao = JSON.parse(record.formaClassificacao);
            const tipoPreco = JSON.parse(record.tipoPreco);

            // Determinar o ID do parametroExerc com base no ano da cotação
            const dataCotacaoYear = new Date(record.dataCotacao).getFullYear();
            const parametroExercId = 
                dataCotacaoYear === 2024 ? 17573 :
                dataCotacaoYear === 2023 ? 18922 :
                dataCotacaoYear === 2013 ? 19066 :
                dataCotacaoYear === 2014 ? 19067 :
                dataCotacaoYear === 2017 ? 19068 :
                null;

            // Verificar se a data de cotação é igual à data de validade
            let dataValidade = new Date(record.dataValidade);
            if (record.dataCotacao === record.dataValidade) {
                dataValidade.setDate(dataValidade.getDate() + 1);
                // Formatar a nova dataValidade para o formato 'yyyy-MM-dd'
                record.dataValidade = dataValidade.toISOString().split('T')[0];
            }

            return {
                conteudo: {
                    numero: record.numero,
                    dataCotacao: record.dataCotacao,
                    dataValidade: record.dataValidade,
                    objeto: record.objeto,
                    formaClassificacao: {
                        valor: formaClassificacao.descricao,
                        descricao: formaClassificacao.descricao
                    },
                    tipoPreco: {
                        valor: tipoPreco.descricao,
                        descricao: tipoPreco.descricao
                    },
                    parametroExerc: {
                        id: parametroExercId
                    },
                    responsavel: {
                        id: record.responsavel,
                    },

                },
                context: {
                    exercicio: dataCotacaoYear.toString() // Use o ano da dataCotacao
                }
            };
        });

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            try {
                const response = await fetch('https://compras.betha.cloud/compras-services/api/conversoes/lotes/cotacoes', {
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
            } catch (error) {
                console.error('Erro durante o envio do registro:', error);
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
