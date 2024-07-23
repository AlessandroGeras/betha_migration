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
        const selectDatabaseQuery = 'USE PATRIMONIO';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
ds_tipobem as descricao,
1983 as metodoDepreciacao,
JSON_QUERY( (SELECT
case ds_tipobem
when        'APARELHOS DE MEDIÇÃO E ORIENTAÇÃO'        then        5243
when        'APARELHOS E EQUIPAMENTO DE COMUNICAÇÃO'        then        5244
when        'APARELHOS EQUI. E UTEN. MED. ODON. LOBO. E HOSP.'        then        5245
when        'EQUIPAMENTO DE PROTEÇÃO'        then        5246
when        'APARELHOS E EQUIPAMENTOS PARA ESPORTES E DIVERSOS'        then        5247
when        'APARELHOS E UTENSILIOS DOMESTICOS'        then        5248
when        'COLEÇÃO E MATERIAIS BIBLIOGRAFICOS'        then        5249
when        'MAQUINAS E EQUIPAMENTOS ENERGETICOS'        then        5250
when        'MAQUINAS E EQUIPAMENTOS GRAFICOS'        then        5251
when        'EQUIPAMENTO PARA AUDIO'        then        5252
when        'MAQUINAS UTENSILIOS E EQUIPAMENTOS DIVERSOS'        then        5253
when        'EQUIPAMENTO DE PROCESSAMENTO DE DADOS '        then        5254
when        'MAQUINAS INSTALAÇÕES E UTENSILIOS DE ESCRITORIO'        then        5255
when        'MAQUINAS FERRAMENTAS E UTENSILIOS DE OFICINA'        then        5256
when        'EQUIPAMENTO E UTENSILIO HIDRAULICO E ELETRICO'        then        5257
when        'MAQUINAS E EQUIPAMENTO AGRICOLAS E RODOVIARIOS  '        then        5258
when        'MOBILIARIA EM GERAL'        then        5259
when        'VEICULO DE TRAÇÃO MECANICA'        then        5260
when        'BANDEIRAS'        then        5261
when        'EDIFICIOS'        then        5262
when        'TERRENOS/GLEBAS'        then        5263
when        'OBRAS EM ANDAMENTO'        then        5264
when        'APAR. DE MEDICAO E ORIENTAÇÃO'        then        5265
when        'APAR. E EQUIP. DE COMUNICAÇÃO'        then        5266
when        'APAR. EQUIP. E UTENS. MED. ODOT. LABO E HOSPITALAR'        then        5267
when        'APAR. E EQUIP. P/ ESPORTES E DIVERSOES'        then        5268
when        'APAR. E UTENS. DOMESTICOS'        then        5269
when        'COLEÇÕES E MATERIAIS BIBLIOGRAFICOS'        then        5270
when        'EQUIP. DE MANOBRA E PATRULHAMENTO'        then        5271
when        'EQUIP. DE PROTEÇÃO, SEGURANÇA E SOCORRO'        then        5272
when        'INSTRUMENTOS MUSICAIS E ARTISTICOS'        then        5273
when        'MAQ. E EQUIP. DE NATUREZA INDUSTRIAL'        then        5274
when        'MAQ. E EQUIP. ENERGETICOS'        then        5275
when        'MAQ. E EQUIP. GRAFICOS'        then        5276
when        'EQUIP. P/ AUDIO VIDEO E FOTO'        then        5277
when        'MAQ. UTENS. E EQUIPAMENTOS DIVERSOS'        then        5278
when        'EQUIP. DE PROCESSAMENTO DE DADOS'        then        5279
when        'MAQ. INSTALAÇÕES E UTENSILIOS DE ESCRITORIO'        then        5280
when        'MAQ. FERRAMENTA E UTENSILIOS DE OFICINA'        then        5281
when        'EQUIP. E UTENSILIOS HIDRAULICOS E ELETRICOS'        then        5282
when        'MAQ. E EQUIP. AGRICOLAS E RODOVIARIOS'        then        5283
when        'MOBILIARIO EM GERAL'        then        5284
when        'VEICULOS DIVERSOS'        then        5285
when        'VEICULOS DE TRAÇÃO MECANICA'        then        5286
when        'ACESSORIOS PARA AUTOMOVEIS'        then        5287
when        'ALMOX. DE MAT. A SEREM APLICADOS EM BENS ANDAMENTO'        then        5288
when        'OUTROS MATERIAIS PERMANENTES'        then        5289
when        'EDIFICIOS - REALIZAÇÃO DE OBRAS'        then        5290
when        'TERRENOS'        then        5291
when        'INSTALAÇÕES'        then        5292
when        'CASAS E APARTAMENTOS'        then        5293
when        'RUAS'        then        5294
when        'ALMOXARIFADO DE MATERIAIS A SEREM APLICADOS EM BEN'        then        5295
when        'ESTUDOS E PROJETOS'        then        5296
when        'PREÇAS'        then        5297
when        'BENFEITORIAS EM PRORPIEDADES DE TERCEIROS'        then        5298
when        'ESTRADAS'        then        5299
when        'OUTRAS OBRAS E INSTALAÇÕES'        then        5300
when        'PONTES'        then        5301
when        'SISTEMA DE ESGOTO E ABASTECIMENTO DE AGUA'        then        5302
when        'SISTEMA DE ABASECIMENTO DE ENERGIA'        then        5303
when        'OUTROS BENS DE USO COMUM DO POVO'        then        5304
when        'ALMOX. DE MAT. A SEREM APLICADOS EM BENS ANDAMENTO'        then        5305
when        'TERRENOS PUBLICOS'        then        5306
end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS tipoBem
from PATRTiposBens
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        const transformedData = resultData.map(record => {
            const tipoBem = JSON.parse(record.tipoBem);
            return {
                conteudo:{
                descricao: record.descricao,
                    tipoBem: {
                    id: tipoBem.id
                },
                metodoDepreciacao: {
                    id: record.metodoDepreciacao,
                }

            }
        };
    });

    // Salvar os resultados transformados em um arquivo JSON
    fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
    console.log('Dados salvos em log_envio.json');

    // Enviar cada registro individualmente para a rota desejada
    /* for (const record of transformedData) {
        const response = await fetch('https://patrimonio.betha.cloud/patrimonio-services/api/conversoes/lotes/grupos-bem', {
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
    // Lidar com erros de conexão ou consulta aqui
    console.error('Erro durante a execução do programa:', error);
} finally {
    // Fechar a conexão com o SQL Server
    await sql.close();
}
}

// Chamar a função principal
main();
