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
    ds_produto AS descricao,
    JSON_QUERY(
        (SELECT
            'MATERIAL' AS valor,
            'MATERIAL' AS descricao
         FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
    ) AS tipoMaterial,
    JSON_QUERY(
        (SELECT
            g.ds_grupo AS valor,
            g.ds_grupo AS descricao
         FROM ALMOGrupos g
         WHERE g.cd_grupo = p.cd_grupo
         FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
    ) AS classificacao,
    'true' AS ativo,
    'true' AS estocavel,
    JSON_QUERY(
        (SELECT 
            CASE cd_unidade
                WHEN 'AMP' THEN 102979
                WHEN 'BD' THEN 102995
                WHEN 'BISN' THEN 102996
                WHEN 'BL' THEN 102997
                WHEN 'BR' THEN 102998
                WHEN 'CARGA' THEN 102999
                WHEN 'CART' THEN 103000
                WHEN 'CJ' THEN 103001
                WHEN 'CPD' THEN 103002
                WHEN 'CX' THEN 103003
                WHEN 'DS TRB' THEN 103004
                WHEN 'DZ' THEN 103005
                WHEN 'FRD' THEN 103006
                WHEN 'FSC' THEN 103007
                WHEN 'GL' THEN 103008
                WHEN 'HS' THEN 103009
                WHEN 'JG' THEN 103010
                WHEN 'KG' THEN 103011
                WHEN 'KIT' THEN 103012
                WHEN 'L' THEN 103013
                WHEN 'LB' THEN 103014
                WHEN 'LT' THEN 103015
                WHEN 'MÇ' THEN 103016
                WHEN 'MES' THEN 103017
                WHEN 'MT' THEN 103018
                WHEN 'MT²' THEN 103019
                WHEN 'MT³' THEN 103020
                WHEN 'PAR' THEN 103021
                WHEN 'PÇ' THEN 103022
                WHEN 'PCT' THEN 103023
                WHEN 'PREMIO' THEN 103024
                WHEN 'PT' THEN 103025
                WHEN 'RESM' THEN 103026
                WHEN 'RL' THEN 103027
                WHEN 'SC' THEN 103028
                WHEN 'SERV' THEN 103029
                WHEN 'UND' THEN 103030
                ELSE 0
            END AS id
         FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
    ) AS unidadeCompra,
    JSON_QUERY(
        (SELECT 
           CASE cd_unidade
            WHEN 'AMP' THEN 102979
            WHEN 'BD' THEN 102995
            WHEN 'BISN' THEN 102996
            WHEN 'BL' THEN 102997
            WHEN 'BR' THEN 102998
            WHEN 'CARGA' THEN 102999
            WHEN 'CART' THEN 103000
            WHEN 'CJ' THEN 103001
            WHEN 'CPD' THEN 103002
            WHEN 'CX' THEN 103003
            WHEN 'DS TRB' THEN 103004
            WHEN 'DZ' THEN 103005
            WHEN 'FRD' THEN 103006
            WHEN 'FSC' THEN 103007
            WHEN 'GL' THEN 103008
            WHEN 'HS' THEN 103009
            WHEN 'JG' THEN 103010
            WHEN 'KG' THEN 103011
            WHEN 'KIT' THEN 103012
            WHEN 'L' THEN 103013
            WHEN 'LB' THEN 103014
            WHEN 'LT' THEN 103015
            WHEN 'MÇ' THEN 103016
            WHEN 'MES' THEN 103017
            WHEN 'MT' THEN 103018
            WHEN 'MT²' THEN 103019
            WHEN 'MT³' THEN 103020
            WHEN 'PAR' THEN 103021
            WHEN 'PÇ' THEN 103022
            WHEN 'PCT' THEN 103023
            WHEN 'PREMIO' THEN 103024
            WHEN 'PT' THEN 103025
            WHEN 'RESM' THEN 103026
            WHEN 'RL' THEN 103027
            WHEN 'SC' THEN 103028
            WHEN 'SERV' THEN 103029
            WHEN 'UND' THEN 103030
            ELSE 0
        END AS id
     FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
    ) AS unidadeEstoque,
    JSON_QUERY(
        (SELECT
            CASE 
                WHEN g.ds_grupo = 'GENEROS ALIMENTICIOS' THEN 85885
                WHEN g.ds_grupo = 'COMBUSTIVEL E LUBRIFICANTE' THEN 85886
				WHEN g.ds_grupo = 'PEÇAS E ACESSORIOS' THEN 85887
				WHEN g.ds_grupo = 'MATERIAL DE CONSTRUÇÃO' THEN 85888
				WHEN g.ds_grupo = 'MATERIAL ELETRICO E ELETRONICO' THEN 85889
				WHEN g.ds_grupo = 'MAGAZINE' THEN 85890
				WHEN g.ds_grupo = 'MATERIAL DE LIMPEZA E PRODUTOS DE HIGIENIZAÇÃO' THEN 85891
				WHEN g.ds_grupo = 'MATERIAL AGRICOLA E PECUARIA' THEN 85892
				WHEN g.ds_grupo = 'GRAFICO, FOTO E VIDEO' THEN 85893
				WHEN g.ds_grupo = 'MATERIAL HOSPITALAR' THEN 85894
				WHEN g.ds_grupo = 'OUTROS SERVIÇOS DE TERCEIROS - PESSOA JURÍDICA' THEN 85895
				WHEN g.ds_grupo = 'MATERIAL DE EXPEDIENTE' THEN 85896
				WHEN g.ds_grupo = 'MATERIAL EDUCATIVO E ESPORTIVO' THEN 85897
				WHEN g.ds_grupo = 'MATERIAL PERMANENTE - NÃO USAR MAIS *************' THEN 85898
				WHEN g.ds_grupo = 'MATERIAL DE CONSUMO' THEN 85899
				WHEN g.ds_grupo = 'GAS E OUTROS MATERIAIS ENGARRAFADOS' THEN 85900
				WHEN g.ds_grupo = 'MATERIAL DE PROCESSAMENTO DE DADOS' THEN 85901
				WHEN g.ds_grupo = 'MATERIAL FARMACOLOGICO' THEN 85902
				WHEN g.ds_grupo = 'MATERIAL DE COPA E COZINHA' THEN 85903
				WHEN g.ds_grupo = 'MATERIAL ODONTOLOGICO' THEN 85904
				WHEN g.ds_grupo = 'MATERIAL P/FESTIVIDADES E HOMENAGENS' THEN 85905
				WHEN g.ds_grupo = 'MATERIAL PARA MANUTENÇÃO DE BENS MOVEIS' THEN 85906
				WHEN g.ds_grupo = 'MATERIAL DE PROTEÇÃO E SEGURANÇA' THEN 85907
				WHEN g.ds_grupo = 'FERRAMENTAS' THEN 85908
				WHEN g.ds_grupo = 'MATERIAL DE SINALIZAÇÃO VISUAL E OUTROS' THEN 85909
				WHEN g.ds_grupo = 'MATERIAL DESTINADO A ASSISTENCIA SOCIAL' THEN 85910
				WHEN g.ds_grupo = 'MATERIAL EDUCACIONAL E CULTURAL' THEN 85911
				WHEN g.ds_grupo = 'MERCADORIAS PARA DOAÇÃO' THEN 85912
				WHEN g.ds_grupo = 'OUTROS MATERIAIS DE DISTRIBUIÇÃO GRATUITA' THEN 85913
				WHEN g.ds_grupo = 'PREMIAÇÕES CULTURAIS, ARTISTICAS, CIENTIFICAS ENTRE OUTROS' THEN 85914
				WHEN g.ds_grupo = 'APARELHOS E EQUIPAMENTOS DE COMUNICAÇÃO' THEN 85915
				WHEN g.ds_grupo = 'MATERIAL PERMANENTE (APAR.,EQUIP.UTENS.MED.ODONT.LABORA.HOSPITALAR)' THEN 85916
				WHEN g.ds_grupo = 'COLEÇÕES E MATERIAIS BIBLIOGRAFICOS' THEN 85917
				WHEN g.ds_grupo = 'EQUIP. DE PROTEÇÃO, SEGURANÇA E SOCORRO' THEN 85918
				WHEN g.ds_grupo = 'OUTROS MATERIAIS PERMANENTE' THEN 85920
				WHEN g.ds_grupo = 'OBRAS E INSTALAÇÕES' THEN 85921
				WHEN g.ds_grupo = 'OUTROS MATERIAS DE CONSUMO' THEN 85922
				WHEN g.ds_grupo = 'MATERIAL PERMANENTE. (APAR. EQUIPAMENTO DE PROCESSAMENTO DE DADOS)' THEN 85923
				WHEN g.ds_grupo = 'COPA E COZINHA' THEN 85924
				WHEN g.ds_grupo = 'MATERIAL PERMANENTE (APAR. EQUIPAMENTOS DE FISIOTERAPIA)' THEN 85925
				WHEN g.ds_grupo = 'COMBUSTIVEIS E LUBRIFICANTES AUTOMOTIVOS' THEN 86230
				WHEN g.ds_grupo = 'GENEROS DE ALIMENTAÇÃO' THEN 86285
				WHEN g.ds_grupo = 'MATERIAL ELETRICOS E ELETRONICOS' THEN 86284
				WHEN g.ds_grupo = 'MATERIAL PARA AUDIO, VIDEO E FOTO' THEN 86289
				WHEN g.ds_grupo = 'MATERIAL PARA MANUTENÇAO DE BENS IMOVEIS' THEN 86288
				WHEN g.ds_grupo = 'MATERIAL PARA MANUTENCAO DE VEICULOS' THEN 86291
				WHEN g.ds_grupo = 'MATERIAL DE CAMA, MESA E BANHO' THEN 86287
				WHEN g.ds_grupo = 'OUTRAS MATERIAIS DE CONSUMO' THEN 86292
				ELSE NULL -- Caso a descrição não se encaixe em nenhum dos valores fornecidos
            END AS id
         FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
    ) AS grupo,
	JSON_QUERY(
    (SELECT
CASE 
        WHEN g.ds_grupo = 'GENEROS ALIMENTICIOS' THEN 514346
        WHEN g.ds_grupo = 'COMBUSTIVEL E LUBRIFICANTE' THEN 514350
        WHEN g.ds_grupo = 'PEÇAS E ACESSORIOS' THEN 514390
        WHEN g.ds_grupo = 'MATERIAL DE CONSTRUÇÃO' THEN 514360
        WHEN g.ds_grupo = 'MATERIAL ELETRICO E ELETRONICO' THEN 85889
        WHEN g.ds_grupo = 'MAGAZINE' THEN 514371
        WHEN g.ds_grupo = 'MATERIAL DE LIMPEZA E PRODUTOS DE HIGIENIZAÇÃO' THEN 514364
        WHEN g.ds_grupo = 'MATERIAL AGRICOLA E PECUARIA' THEN 514359
        WHEN g.ds_grupo = 'GRAFICO, FOTO E VIDEO' THEN 514357
        WHEN g.ds_grupo = 'MATERIAL HOSPITALAR' THEN 514374
        WHEN g.ds_grupo = 'OUTROS SERVIÇOS DE TERCEIROS - PESSOA JURÍDICA' THEN 514389
        WHEN g.ds_grupo = 'MATERIAL DE EXPEDIENTE' THEN 514363
        WHEN g.ds_grupo = 'MATERIAL EDUCATIVO E ESPORTIVO' THEN 514370
        WHEN g.ds_grupo = 'MATERIAL DE CONSUMO' THEN 514361
        WHEN g.ds_grupo = 'GAS E OUTROS MATERIAIS ENGARRAFADOS' THEN 514355
        WHEN g.ds_grupo = 'MATERIAL DE PROCESSAMENTO DE DADOS' THEN 514365
        WHEN g.ds_grupo = 'MATERIAL FARMACOLOGICO' THEN 514373
        WHEN g.ds_grupo = 'MATERIAL DE COPA E COZINHA' THEN 514362
        WHEN g.ds_grupo = 'MATERIAL ODONTOLOGICO' THEN 514376
        WHEN g.ds_grupo = 'MATERIAL P/FESTIVIDADES E HOMENAGENS' THEN 514385
        WHEN g.ds_grupo = 'MATERIAL PARA MANUTENÇÃO DE BENS MOVEIS' THEN 514379
        WHEN g.ds_grupo = 'MATERIAL DE PROTEÇÃO E SEGURANÇA' THEN 85907
        WHEN g.ds_grupo = 'FERRAMENTAS' THEN 514354
        WHEN g.ds_grupo = 'MATERIAL DE SINALIZAÇÃO VISUAL E OUTROS' THEN 514367
        WHEN g.ds_grupo = 'MATERIAL DESTINADO A ASSISTENCIA SOCIAL' THEN 514368
        WHEN g.ds_grupo = 'MATERIAL EDUCACIONAL E CULTURAL' THEN 514369
        WHEN g.ds_grupo = 'MERCADORIAS PARA DOAÇÃO' THEN 514386
        WHEN g.ds_grupo = 'OUTROS MATERIAIS DE DISTRIBUIÇÃO GRATUITA' THEN 514392
        WHEN g.ds_grupo = 'PREMIAÇÕES CULTURAIS, ARTISTICAS, CIENTIFICAS ENTRE OUTROS' THEN 514391
        WHEN g.ds_grupo = 'APARELHOS E EQUIPAMENTOS DE COMUNICAÇÃO' THEN 514351
        WHEN g.ds_grupo = 'MATERIAL PERMANENTE (APAR.,EQUIP.UTENS.MED.ODONT.LABORA.HOSPITALAR)' THEN 514384
        WHEN g.ds_grupo = 'COLEÇÕES E MATERIAIS BIBLIOGRAFICOS' THEN 514348
        WHEN g.ds_grupo = 'EQUIP. DE PROTEÇÃO, SEGURANÇA E SOCORRO' THEN 514353
        WHEN g.ds_grupo = 'OUTROS MATERIAIS PERMANENTE' THEN 514387
        WHEN g.ds_grupo = 'OBRAS E INSTALAÇÕES' THEN 514394
        WHEN g.ds_grupo = 'OUTROS MATERIAS DE CONSUMO' THEN 514388
        WHEN g.ds_grupo = 'MATERIAL PERMANENTE. (APAR. EQUIPAMENTO DE PROCESSAMENTO DE DADOS)' THEN 514382
        WHEN g.ds_grupo = 'COPA E COZINHA' THEN 514352
        WHEN g.ds_grupo = 'MATERIAL PERMANENTE (APAR. EQUIPAMENTOS DE FISIOTERAPIA)' THEN 514383
        WHEN g.ds_grupo = 'COMBUSTIVEIS E LUBRIFICANTES AUTOMOTIVOS' THEN 514349
        WHEN g.ds_grupo = 'GENEROS DE ALIMENTAÇÃO' THEN 514356
        WHEN g.ds_grupo = 'MATERIAL ELETRICOS E ELETRONICOS' THEN 514372
        WHEN g.ds_grupo = 'MATERIAL PARA AUDIO, VIDEO E FOTO' THEN 514377
        WHEN g.ds_grupo = 'MATERIAL PARA MANUTENÇAO DE BENS IMOVEIS' THEN 514378
        WHEN g.ds_grupo = 'MATERIAL PARA MANUTENCAO DE VEICULOS' THEN 514380
        WHEN g.ds_grupo = 'MATERIAL DE CAMA, MESA E BANHO' THEN 514395
        WHEN g.ds_grupo = 'OUTRAS MATERIAIS DE CONSUMO' THEN 514393
    END AS id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS classe,
JSON_QUERY(
    (SELECT
        'NAO_APLICA' as valor,
        'NAO_APLICA' as descricao
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS tipoCombustivel,
JSON_QUERY(
    (SELECT
ds_produto as nome,
1 as codigoEspecificacao
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS especificacoes,
null as identificadorDesktopTransparencia
FROM 
    ALMOProdutos p
    JOIN ALMOGrupos g ON g.cd_grupo = p.cd_grupo;
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => ({
            descricao: record.descricao,
            tipoMaterial: JSON.parse(record.tipoMaterial),
            classificacao: JSON.parse(record.classificacao),
            ativo: JSON.parse(record.ativo),
            estocavel: JSON.parse(record.estocavel),
            unidadeCompra: JSON.parse(record.unidadeCompra),
            unidadeEstoque: JSON.parse(record.unidadeEstoque),
            classe: JSON.parse(record.classe),
            grupo: JSON.parse(record.grupo),
            tipoCombustivel: JSON.parse(record.tipoCombustivel),
            especificacoes: [JSON.parse(record.especificacoes)],
            identificadorDesktopTransparencia: record.identificadorDesktopTransparencia,
        }));

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        for (const record of transformedData) {
            const response = await fetch('https://almoxarifado.betha.cloud/estoque-services/api/materiais', {
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
