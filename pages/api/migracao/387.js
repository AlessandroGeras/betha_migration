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

function formatNumero(numero) {
    const parts = numero.split('.');
    const part1 = parts[0].padStart(3, '0'); // Primeiro agrupamento com 3 zeros à esquerda
    const part2 = parts[1].padStart(3, '0'); // Segundo agrupamento com 3 zeros à esquerda
    const part3 = '0000'; // Terceiro agrupamento fixo
    const part4 = '00'; // Quarto agrupamento fixo

    // Concatenar todas as partes sem pontos
    return `${part1}${part2}${part3}${part4}`;
}

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "FOLHADB"
        const selectDatabaseQuery = 'USE FOLHADB';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            SELECT 
            DISTINCT 
            JSON_QUERY(
                (SELECT
                    cd_divadm2 AS idIntegracao,
                    JSON_QUERY(
                        (SELECT
                            '4950' as id,
                            'ORGANOGRAMA PARECIS 2024' as descricao
                        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                    ) AS configuracao,
                    concat(cd_divadm1, '.', cd_divadm2) as numero,
                    '2' as nivel,
                    CASE cd_divadm2
                        WHEN 10 THEN 'SEC MUN. ADMINISTRAÇÃO E FAZENDA'
                        WHEN 11 THEN 'SECRETARIA MUN. DE PLANEJAMENTO'
                        WHEN 12 THEN 'SEC MUN. ADMINISTRAÇÃO E FAZENDA - PENSIONISTA JUDICIAL'
                        WHEN 18 THEN 'CONSELHO TUTELAR'
                        WHEN 20 THEN 'SEC MUN. DE EDUC. E CULTURA'
                        WHEN 21 THEN 'SECRETARIA MUNICIPAL DE ESPORTE E CULTURA'
                        WHEN 30 THEN 'SEC MUN. DE SAUDE'
                        WHEN 31 THEN 'SECRETARIA M. DE SAÚDE'
                        WHEN 33 THEN 'CONSELHO TUTELAR/ADMINISTRATIVO'
                        WHEN 40 THEN 'FUNDO MUNICIPAL DE ASSISTÊNCIA SOCIAL'
                        WHEN 50 THEN 'SEC MUN. DE OBRAS E SERV. PUBLICO'
                        WHEN 60 THEN 'GABINETE DO PREFEITO'
                        WHEN 64 THEN 'GABINETE DO PREFEITO (RPPS)'
                        WHEN 70 THEN 'CHEFE DA JUNTA MILITAR'
                        WHEN 80 THEN 'SEC MUN. AGRICULTURA'
                        WHEN 90 THEN 'PETI'
                        WHEN 91 THEN 'RELATORIO TCE 2020'
                        WHEN 101 THEN 'RELATORIO TCE 2020'
                        WHEN 205 THEN 'EDUCAÇÃO INFANTIL 70%'
                        WHEN 206 THEN 'FUNDEB 70%'
                        WHEN 207 THEN 'FUNDEB 30%'
                        WHEN 208 THEN 'EDUCAÇÃO ESPECIAL 70%'
                        WHEN 210 THEN 'SEMED 10%'
                    END as descricao,
                    CASE cd_divadm2
                        WHEN 10 THEN 'SEC MUN.'
                        WHEN 20 THEN 'SEC MUN.'
                        WHEN 21 THEN 'PREFEITU'
                        WHEN 30 THEN 'SEC MUN.'
                        WHEN 31 THEN 'SEC.MUNI'
                        WHEN 33 THEN 'CMDCA'
                        WHEN 40 THEN 'F.M.S'
                        WHEN 50 THEN 'SEC MUN.'
                        WHEN 60 THEN 'GABINETE'
                        WHEN 64 THEN 'GAB/RPPS'
                        WHEN 70 THEN 'CHEFE DA'
                        WHEN 80 THEN 'SEC MUN.'
                        WHEN 90 THEN 'PETI'
                        WHEN 91 THEN 'TCE'
                        WHEN 101 THEN 'TCE'
                        WHEN 205 THEN 'E. F 70%'
                        WHEN 206 THEN 'FUND 70%'
                        WHEN 207 THEN 'FUND 30%'
                        WHEN 208 THEN 'E. E 70%'
                        WHEN 210 THEN 'SEM 10%'
                    END as sigla
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
            ) AS conteudo
            FROM (
                SELECT
                    SUM(CASE WHEN cd_nivelestrut = 1 THEN cd_divadm END) as cd_divadm1,
                    SUM(CASE WHEN cd_nivelestrut = 2 THEN cd_divadm END) as cd_divadm2
                FROM FOLHFuncLotacao
                WHERE cd_cecam = 1995 AND aa_exercicio = 2024 AND mm_exercicio = 2 
                GROUP BY cd_funcionario
            ) A
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const conteudo = JSON.parse(record.conteudo);

            return {
                idIntegracao: conteudo.idIntegracao.toString(),
                conteudo: {
                    configuracao: {
                        id: parseInt(conteudo.configuracao.id),
                        descricao: conteudo.configuracao.descricao
                    },
                    numero: formatNumero(conteudo.numero), // Aplicar a formatação desejada aqui
                    nivel: parseInt(conteudo.nivel),
                    descricao: conteudo.descricao,
                    sigla: conteudo.sigla
                }
            };
        });

        // Salvar os resultados transformados em um arquivo JSON
        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const response = await fetch('https://pessoal.betha.cloud/service-layer/v1/api/organograma', {
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
        } */

    } catch (error) {
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        sql.close();
    }
}

main();
