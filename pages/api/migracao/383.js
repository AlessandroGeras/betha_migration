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
    const part3 = parts[2].padStart(4, '0'); // Segundo agrupamento com 3 zeros à esquerda
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
cd_divadm3 AS idIntegracao,
    JSON_QUERY(
    (SELECT
   '4950' as id,
   'ORGANOGRAMA PARECIS 2024' as descrição
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS configuracao,
concat (cd_divadm1,'.',cd_divadm2, '.', cd_divadm3) as numero,
'3' as nivel,
case cd_divadm3
when        100        then        'DIVISAO DE ADMINIST. GERAL'
when        101        then        'DIVISAO DE FINANCAS'
when        102        then        'DIVISAO DE PATRIM. E PLANEJAMENTO'
when        103        then        'SETOR DE COMPRAS E CONT. EMPENHOS'
when        104        then        'SETOR DE PROJETOS'
when        105        then        'SETOR DE PESSOAL'
when        106        then        'SETOR DE TRIBUTACAO MUNICIPAL'
when        107        then        'TESOURARIA'
when        108        then        'SECAO DE PROTOCOLO'
when        109        then        'SECRETRIA DE GABINETE'
when        200        then        'DIVISAO DE ADMINISTRACAO GERAL'
when        201        then        'EDUCAÇÃO ESPECIAL 60%'
when        202        then        'SEMED 10%'
when        203        then        'FUNDEB 40%'
when        204        then        'FUNDEB 60%'
when        205        then        'EDUCAÇÃO INFANTIL'
when        206        then        'FUNDEB 70%'
when        207        then        'FUNDEB 30%'
when        208        then        'FUNDEB 70% INFANTIL'
when        209        then        'FUNDEB 70% EDUC ESPECIAL'
when        300        then        'DIVISAO DE ADMINISTRACAO GERAL'
when        301        then        'DIVISAO DE ADMINISTRACAO GERAL(GAB. DO SECRETARIO)'
when        302        then        'DIVISÃO DE ADM. GERAL/GAB.DO SECRETARIO'
when        400        then        'DIVISAO DE ADMINISTRACAO GERAL'
when        500        then        'DIVISAO DE ADMINISTRACAO GERAL'
when        600        then        'CHEFE DE GABINETE'
when        601        then        'ASSESSORIA I'
when        602        then        'ASSESSORIA II'
when        603        then        'ASSESSORIA III'
when        604        then        'PETE/GABINETE'
when        700        then        'DIVISAO DE ADMINISTRACAO GERAL'
when        800        then        'DIVISAO DE ADMINISTRACAO GERAL'
when        900        then        'DIVISAO DE ADMINISTRACAO GERAL'
when        1000        then        'DIVISAO DE ADMINIST. GERAL'
end as descricao,
case cd_divadm3
when        100        then        'DIVISAO'
when        101        then        'DIVISAO'
when        102        then        'DIVISAO' 
when        103        then        'SETOR DE'
when        104        then        'SETOR DE'
when        105        then        'SETOR DE'
when        106        then        'SETOR DE'
when        107        then        'TESOURAR'
when        108        then        'SECAO DE'
when        109        then        'SECRETRI'
when        200        then        'DIVISAO' 
when        201        then        'ESPECIAL'
when        202        then        'FUNDEB 1'
when        203        then        'FUNDEB 4'
when        204        then        'FUNDEB 6'
when        205        then        'FUNDEB 1'
when        206        then        'FUNDEB'
when        207        then        'FUNDEB'
when        208        then        'FUNDEB'
when        209        then        'FUNDEB'
when        300        then        'DIVISAO' 
when        301        then        'DIVISAO'
when        302        then        'DIVISÃO'
when        400        then        'DIVISAO' 
when        500        then        'DIVISAO' 
when        600        then        'CHEFE DE'
when        601        then        'ASSESSOR'
when        602        then        'ASSESSOR'
when        603        then        'ASSESSOR'
when        604        then        'CHEFE DE'
when        700        then        'DIVISAO' 
when        800        then        'DIVISAO'
when        900        then        'DIVISAO'
when        1000        then        'DIVISAO'
end as sigla
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS conteudo
FROM (
SELECT
 sum(case when cd_nivelestrut = 1 then cd_divadm end) as cd_divadm1,
 sum(case when cd_nivelestrut = 2 then cd_divadm end) as cd_divadm2,
  sum(case when cd_nivelestrut = 3 then cd_divadm end) as cd_divadm3
 From FOLHFuncLotacao
 WHERE cd_cecam = 1995 AND aa_exercicio = 2024 AND mm_exercicio = 2 
 GROUP BY cd_funcionario) A 
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
