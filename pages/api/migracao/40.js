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

        // Selecionar o banco de dados "TRIBUTOS2024"
        const selectDatabaseQuery = 'USE TRIBUTOS2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            SELECT 
                cd_Tomador as idIntegracao,
                JSON_QUERY(
                    (SELECT
                        cd_municipiotomador as iMunicipios,
                        CASE fl_TipoPessoa
                            WHEN 0 THEN 'J'
                            WHEN 1 THEN 'F'
                        END as tipoPessoa,
                        ds_RazaoSocial as nome,
                        ds_inscricao_municipal as inscricaoMunicipal,
                        nr_CGCCPF as inscricao,
                        cd_CEP as cep,
                        ds_Bairro as bairro,
                        ds_Logradouro as endereco,
                        ds_complemento as complemento,
                        cd_Numero as numero,
                        ds_Email as email
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS tomadores
            FROM ISSTomador
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const tomadores = JSON.parse(record.tomadores);

            return {
                idIntegracao: record.idIntegracao.toString(), // Garantir 12 dígitos com zeros à esquerda
                tomadores: {
                    iMunicipios: tomadores.iMunicipios,
                    tipoPessoa: tomadores.tipoPessoa,
                    nome: tomadores.nome,
                    inscricaoMunicipal: tomadores.inscricaoMunicipal,
                    inscricao: tomadores.inscricao.toString(), // Garantir 12 dígitos com zeros à esquerda
                    cep: tomadores.cep.replace(/\D/g, '').padStart(8, '0'), // Garantir 8 dígitos removendo hífens
                    bairro: tomadores.bairro,
                    endereco: tomadores.endereco,
                    numero: tomadores.numero.toString(), // Garantir 12 dígitos com zeros à esquerda
                    complemento: tomadores.complemento,
                    email: tomadores.email
                }
            };
        });

        // Salvar os resultados transformados em um arquivo JSON
        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${Math.floor(i / chunkSize) + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar cada registro individualmente para a rota desejada
        /*for (const record of transformedData) {
            const response = await fetch('https://nota-eletronica.betha.cloud/e-nota/service-layer-nota/api/tomadores', {
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
        }*/

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
