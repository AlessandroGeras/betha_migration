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

        // Selecionar o banco de dados "COMP_ALMO_CAM"
        const selectDatabaseQuery = 'USE TRIBUTOS2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select
cd_Imovel as idIntegracao,
cd_Imovel as idImovel,
Cd_Bairro as idBairro,
nm_CEP as cep,
ds_complemento as complemento,
cd_Proprietario as idPessoa,
cd_InscricaoAnterior as inscricaoAnterior,
Cd_Logradouro as idLogradouro,
cd_Loteamento as idLoteamento,
cd_Lote as lote,
cd_Setor as setor,
nm_apto as apartamento,
nm_numero as nroImovel,
cd_condominio as idCondominio,
cd_InscricaoImovel as matricula,
cd_Face as idFace,
nr_inscricaoIncra as inscricaoIncra,
ds_complemento as complemento,
tc.ds_TipoConstrucao as tipoImovel
from IPTUImoveis i 
left join IPTUTipoConstrucao tc on tc.cd_TipoConstrucao = i.cd_TipoConstrucao
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const imoveis = {};

            // Adicionar dinamicamente os campos que existem no registro
            Object.keys(record).forEach(key => {
                imoveis[key] = record[key];
            });

            return {
                idIntegracao: record.idIntegracao,  // Valor fixo conforme solicitado
                imoveis: imoveis
            };
        });

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        for (const record of transformedData) {
            const response = await fetch('https://tributos.betha.cloud/service-layer-tributos/api/imoveis', {
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
