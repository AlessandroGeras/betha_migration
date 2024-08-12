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

        // Selecionar o banco de dados "FOLHA_CAM"
        const selectDatabaseQuery = 'USE FOLHA_CAM';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            SELECT 
                ROW_NUMBER() OVER (ORDER BY em.cd_Funcionario) AS idIntegracao,
                JSON_QUERY((SELECT 
                    ev.ds_Evento AS tipo,
                    em.dt_Emprestimo AS dataInicial,
                    CASE 
                        WHEN em.dt_Quitacao IS NOT NULL THEN FORMAT(em.dt_Quitacao, 'yyyy-MM-ddTHH:mm:ss')
                        ELSE FORMAT(CONVERT(DATETIME, '2023-12-31T00:00:00', 126), 'yyyy-MM-ddTHH:mm:ss')
                    END AS dataFinal,
                    em.dt_PrimeiraParcela AS dataInicioDesconto,
                    em.qt_Parcelas AS numeroParcelas,
                    em.qt_Parcelas * em.vl_Parcelas AS valorTotal,
                    CASE
                        WHEN em.fl_quitacao = 'S' THEN 'ULTIMA_PARCELA'
                        ELSE 'PRIMEIRA_PARCELA'
                    END AS residuo,
                    CASE
                        WHEN em.fl_quitacao = 'S' THEN 'QUITADO'
                        WHEN em.fl_quitacao = 'N' THEN 'EM_ANDAMENTO'
                        ELSE 'Status Desconhecido'
                    END AS situacao,
                    JSON_QUERY((SELECT vl_Parcelas AS valorParcela FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS parcelas
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS conteudo,
                JSON_QUERY((SELECT CAST(em.cd_Funcionario AS INT) AS id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS matricula,
                JSON_QUERY((SELECT func.nm_Funcionario AS razaoSocial FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS pessoaJuridica
            FROM FOLHEmprestimos em
            JOIN FOLHEvento ev ON ev.cd_Evento = em.cd_Evento
            JOIN AUD_FOLHFuncionario func ON em.cd_Funcionario = func.cd_Funcionario
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            try {
                // Log para verificar dados
                const conteudo = record.conteudo ? JSON.parse(record.conteudo) : {};
                const matricula = record.matricula ? JSON.parse(record.matricula) : {};
                const pessoaJuridica = record.pessoaJuridica ? JSON.parse(record.pessoaJuridica) : {};
                const parcelas = conteudo.parcelas ? [conteudo.parcelas] : [];

                return {
                    idIntegracao: record.idIntegracao.toString(),
                    conteudo: {
                        tipo: conteudo.tipo || '',
                        dataInicial: conteudo.dataInicial || '',
                        dataFinal: conteudo.dataFinal || '',
                        matricula: {
                            id: matricula.id || null
                        },
                        pessoaJuridica: {
                            razaoSocial: pessoaJuridica.razaoSocial || ''
                        },
                        dataInicioDesconto: conteudo.dataInicioDesconto || '',
                        valorTotal: conteudo.valorTotal || 0,
                        numeroParcelas: conteudo.numeroParcelas || 0,
                        residuo: conteudo.residuo || '',
                        situacao: conteudo.situacao || '',
                        parcelas: parcelas.map(parcela => ({
                            valorParcela: parcela.valorParcela || 0
                        }))
                    }
                };
            } catch (error) {
                console.error('Erro ao transformar o registro:', record, error);
                return null; // Ignora registros problemáticos
            }
        }).filter(record => record !== null);

        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const response = await fetch('https://pessoal.betha.cloud/service-layer/v1/api/emprestimo', {
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
        */
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
