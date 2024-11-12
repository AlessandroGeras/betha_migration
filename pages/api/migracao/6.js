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
        const masterConnection = await connectToSqlServer();
        const selectDatabaseQuery = 'USE COMP_ALMO';
        await masterConnection.query(selectDatabaseQuery);

        const userQuery = `
         select 
ds_produto as descricao,
JSON_QUERY(
    (SELECT
        'MATERIAL' as valor,
        'MATERIAL' as descricao
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS tipoMaterial,
JSON_QUERY(
    (SELECT
    CASE g.cd_grupo
        WHEN   1 THEN 'GENEROS_ALIMENTICIOS'
        WHEN   2 THEN 'COMBUSTIVEL'
        WHEN   3 THEN 'OUTROS'
        WHEN   4 THEN 'OUTROS'
        WHEN   5 THEN 'OUTROS'
        WHEN   6 THEN 'OUTROS'
        WHEN   7 THEN 'OUTROS'
        WHEN   8 THEN 'OUTROS'
        WHEN   9 THEN 'OUTROS'
        WHEN   10 THEN 'MEDICAMENTO'
        WHEN  11 THEN 'OUTROS'
        WHEN  12 THEN 'OUTROS'
        WHEN  13 THEN 'OUTROS'
        WHEN  15 THEN 'OUTROS'
        WHEN  16 THEN 'OUTROS'
        WHEN  17 THEN 'OUTROS'
        WHEN  18 THEN 'MEDICAMENTO'
        WHEN  19 THEN 'OUTROS'
        WHEN  20 THEN 'OUTROS'
        WHEN  21 THEN 'OUTROS'
        WHEN  23 THEN 'OUTROS'
        WHEN  24 THEN 'OUTROS'
        WHEN  26 THEN 'OUTROS'
        WHEN  27 THEN 'OUTROS'
        WHEN  30 THEN 'OUTROS'
        WHEN  31 THEN 'OUTROS'
        WHEN  32 THEN 'OUTROS'
        WHEN  35 THEN 'OUTROS'
        WHEN  36 THEN 'OUTROS'
        WHEN  40 THEN 'OUTROS'
        WHEN  41 THEN 'OUTROS'
        WHEN  44 THEN 'OUTROS'
        WHEN  46 THEN 'OUTROS'
        WHEN  56 THEN 'OUTROS'
        WHEN  61 THEN 'OUTROS'
        WHEN  62 THEN 'OUTROS'
        WHEN  63 THEN 'OUTROS'
        WHEN  64 THEN 'OUTROS'
        WHEN  65 THEN 'OUTROS'
        WHEN  66 THEN 'OUTROS'
        WHEN  67 THEN 'OUTROS'
        ELSE 'OUTROS'
    END AS valor,
    REPLACE(g.ds_grupo, ' ', '_') AS descricao
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS classificacao,
'true' as ativo,
'true' as estocavel,
JSON_QUERY(
    (SELECT 
CASE cd_unidade
        when 'M²' then 79216 
 when 'AMP' then 109799
 when 'BARRA' then 109800
 when 'BD' then 109801
 when 'BISN' then 109802
 when 'BL' then 109803
 when 'BR' then 109804
 when 'CARGA' then 109805
 when 'CART' then 109806
 when 'CJ' then 109807
 when 'CPD' then 109808
 when 'CX' then 109809
 when 'DS TRB' then 109810
 when 'DZ' then 109811
 when 'ENV' then 109812
 when 'EXAME' then 109813
 when 'FRD' then 109814
 when 'FSC' then 109815
 when 'GL' then 109816
 when 'HS' then 109817
 when 'JG' then 109818
 when 'JOGO' then 109819
 when 'KG' then 109820
 when 'KG.' then 109821
 when 'KIT' then 109822
 when 'L' then 109823
 when 'LB' then 109824
 when 'LT' then 109825
 when 'MÂ²' then 109826
 when 'MÂ³' then 109827
 when 'MÇ' then 109828
 when 'MES' then 109829
 when 'MT' then 109830
 when 'MT²' then 109831
 when 'MT³' then 109832
 when 'MTS' then 109833
 when 'PAR' then 109834
 when 'PÇ' then 109835
 when 'PCT' then 109836
 when 'PREMIO' then 109837
 when 'PT' then 109838
 when 'RESM' then 109839
 when 'RL' then 109840
 when 'ROLO' then 109841
 when 'SC' then 109842
 when 'SERV' then 109843
 when 'SERVIÃ' then 109844
 when 'SERVIC' then 109845
 when 'TAB' then 109846
 when 'TUBO' then 109847
 when 'UND' then 109848
 when 'UNID' then 109849
    END AS id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS unidadeCompra,
JSON_QUERY(
    (SELECT 
       CASE cd_unidade
        when 'M²' then 79216 
 when 'AMP' then 109799
 when 'BARRA' then 109800
 when 'BD' then 109801
 when 'BISN' then 109802
 when 'BL' then 109803
 when 'BR' then 109804
 when 'CARGA' then 109805
 when 'CART' then 109806
 when 'CJ' then 109807
 when 'CPD' then 109808
 when 'CX' then 109809
 when 'DS TRB' then 109810
 when 'DZ' then 109811
 when 'ENV' then 109812
 when 'EXAME' then 109813
 when 'FRD' then 109814
 when 'FSC' then 109815
 when 'GL' then 109816
 when 'HS' then 109817
 when 'JG' then 109818
 when 'JOGO' then 109819
 when 'KG' then 109820
 when 'KG.' then 109821
 when 'KIT' then 109822
 when 'L' then 109823
 when 'LB' then 109824
 when 'LT' then 109825
 when 'MÂ²' then 109826
 when 'MÂ³' then 109827
 when 'MÇ' then 109828
 when 'MES' then 109829
 when 'MT' then 109830
 when 'MT²' then 109831
 when 'MT³' then 109832
 when 'MTS' then 109833
 when 'PAR' then 109834
 when 'PÇ' then 109835
 when 'PCT' then 109836
 when 'PREMIO' then 109837
 when 'PT' then 109838
 when 'RESM' then 109839
 when 'RL' then 109840
 when 'ROLO' then 109841
 when 'SC' then 109842
 when 'SERV' then 109843
 when 'SERVIÃ' then 109844
 when 'SERVIC' then 109845
 when 'TAB' then 109846
 when 'TUBO' then 109847
 when 'UND' then 109848
 when 'UNID' then 109849
 ELSE 0
    END AS id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS unidadeEstoque,
JSON_QUERY(
    (SELECT
CASE  
  WHEN g.ds_grupo = 'APARELHOS E EQUIPAMENTOS DE COMUNICAÇÃO' then 93557
 WHEN g.ds_grupo = 'COLEÇÕES E MATERIAIS BIBLIOGRAFICOS' then 93618
 WHEN g.ds_grupo = 'COMBUSTIVEL E LUBRIFICANTE' then 93619
 WHEN g.ds_grupo = 'COPA E COZINHA' then 93620
 WHEN g.ds_grupo = 'EQUIP. DE PROTEÇÃO, SEGURANÇA E SOCORRO' then 93621
 WHEN g.ds_grupo = 'FERRAMENTAS' then 93622
 WHEN g.ds_grupo = 'GAS E OUTROS MATERIAIS ENGARRAFADOS' then 93623
 WHEN g.ds_grupo = 'GENEROS ALIMENTICIOS' then 93624
 WHEN g.ds_grupo = 'GRAFICO, FOTO E VIDEO' then 93625
 WHEN g.ds_grupo = 'MATERIAL AGRICOLA E PECUARIA' then 93626
 WHEN g.ds_grupo = 'MATERIAL DE CONSTRUÇÃO' then 93627
 WHEN g.ds_grupo = 'MATERIAL DE CONSUMO' then 93628
 WHEN g.ds_grupo = 'MATERIAL DE COPA E COZINHA' then 93629
 WHEN g.ds_grupo = 'MATERIAL DE EXPEDIENTE' then 93630
 WHEN g.ds_grupo = 'MATERIAL DE LIMPEZA E PRODUTOS DE HIGIENIZAÇÃO' then 93632
 WHEN g.ds_grupo = 'MATERIAL DE PROCESSAMENTO DE DADOS' then 93633
 WHEN g.ds_grupo = 'MATERIAL DESTINADO A ASSISTENCIA SOCIAL' then 93634
 WHEN g.ds_grupo = 'MATERIAL EDUCACIONAL E CULTURAL' then 93635
 WHEN g.ds_grupo = 'MATERIAL EDUCATIVO E ESPORTIVO' then 93636
 WHEN g.ds_grupo = 'MATERIAL ELETRICO E ELETRONICO' then 93637
 WHEN g.ds_grupo = 'MATERIAL FARMACOLOGICO' then 93638
 WHEN g.ds_grupo = 'MATERIAL HOSPITALAR' then 93639
 WHEN g.ds_grupo = 'MATERIAL ODONTOLOGICO' then 93640
 WHEN g.ds_grupo = 'MATERIAL PARA MANUTENÇÃO DE BENS MOVEIS' then 93641
 WHEN g.ds_grupo = 'MATERIAL PERMANENTE. (APAR. EQUIPAMENTO DE PROCESSAMENTO DE DADOS)' then 93642
 WHEN g.ds_grupo = 'MATERIAL PERMANENTE (APAR. EQUIPAMENTOS DE FISIOTERAPIA)' then 93643
 WHEN g.ds_grupo = 'MATERIAL PERMANENTE (APAR.,EQUIP.UTENS.MED.ODONT.LABORA.HOSPITALAR)' then 93644
 WHEN g.ds_grupo = 'MATERIAL P/FESTIVIDADES E HOMENAGENS' then 93645
 WHEN g.ds_grupo = 'MERCADORIAS PARA DOAÇÃO' then 93646
 WHEN g.ds_grupo = 'OBRAS E INSTALAÇÕES' then 93647
 WHEN g.ds_grupo = 'OUTROS MATERIAIS DE DISTRIBUIÇÃO GRATUITA' then 93648
 WHEN g.ds_grupo = 'OUTROS MATERIAIS PERMANENTE' then 93649
 WHEN g.ds_grupo = 'OUTROS MATERIAS DE CONSUMO' then 93650
 WHEN g.ds_grupo = 'OUTROS SERVIÇOS DE TERCEIROS - PESSOA JURÍDICA' then 93651
 WHEN g.ds_grupo = 'PEÇAS E ACESSORIOS' then 93652
 WHEN g.ds_grupo = 'PREMIAÇÕES CULTURAIS, ARTISTICAS, CIENTIFICAS ENTRE OUTROS' then 93653
 WHEN g.ds_grupo = 'MATERIAL DE SINALIZAÇÃO VISUAL E OUTROS' then 93742
 WHEN g.ds_grupo = 'MATERIAL DE PROTEÇÃO E SEGURANÇA' then 93743
 WHEN g.ds_grupo = 'MAGAZINE' then 93744
 WHEN g.ds_grupo = 'MAT. PERMANENTE - VEICULOS DE TRAÇÃO MECANICA' then 93745
        ELSE NULL -- Caso a descrição não se encaixe em nenhum dos valores fornecidos
    END AS id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS grupo,
JSON_QUERY(
    (SELECT
CASE 
 WHEN g.ds_grupo = 'APARELHOS E EQUIPAMENTOS DE COMUNICAÇÃO' then 560194
 WHEN g.ds_grupo = 'COLEÇÕES E MATERIAIS BIBLIOGRAFICOS' then 560816
 WHEN g.ds_grupo = 'COMBUSTIVEL E LUBRIFICANTE' then 560817
 WHEN g.ds_grupo = 'COPA E COZINHA' then 560818
 WHEN g.ds_grupo = 'EQUIP. DE PROTEÇÃO, SEGURANÇA E SOCORRO' then 560819
 WHEN g.ds_grupo = 'FERRAMENTAS' then 560820
 WHEN g.ds_grupo = 'GAS E OUTROS MATERIAIS ENGARRAFADOS' then 560821
 WHEN g.ds_grupo = 'GENEROS ALIMENTICIOS' then 560822
 WHEN g.ds_grupo = 'GRAFICO, FOTO E VIDEO' then 560823
 WHEN g.ds_grupo = 'MATERIAL AGRICOLA E PECUARIA' then 560824
 WHEN g.ds_grupo = 'MATERIAL DE CONSTRUÇÃO' then 560825
 WHEN g.ds_grupo = 'MATERIAL DE CONSUMO' then 560826
 WHEN g.ds_grupo = 'MATERIAL DE COPA E COZINHA' then 560827
 WHEN g.ds_grupo = 'MATERIAL DE EXPEDIENTE' then 560828
 WHEN g.ds_grupo = 'MATERIAL DE LIMPEZA E PRODUTOS DE HIGIENIZAÇÃO' then 560830
 WHEN g.ds_grupo = 'MATERIAL DE PROCESSAMENTO DE DADOS' then 560831
 WHEN g.ds_grupo = 'MATERIAL DESTINADO A ASSISTENCIA SOCIAL' then 560832
 WHEN g.ds_grupo = 'MATERIAL EDUCACIONAL E CULTURAL' then 560833
 WHEN g.ds_grupo = 'MATERIAL EDUCATIVO E ESPORTIVO' then 560834
 WHEN g.ds_grupo = 'MATERIAL ELETRICO E ELETRONICO' then 560835
 WHEN g.ds_grupo = 'MATERIAL FARMACOLOGICO' then 560836
 WHEN g.ds_grupo = 'MATERIAL HOSPITALAR' then 560837
 WHEN g.ds_grupo = 'MATERIAL ODONTOLOGICO' then 560838
 WHEN g.ds_grupo = 'MATERIAL PARA MANUTENÇÃO DE BENS MOVEIS' then 560839
 WHEN g.ds_grupo = 'MATERIAL PERMANENTE. (APAR. EQUIPAMENTO DE PROCESSAMENTO DE DADOS)' then 560840
 WHEN g.ds_grupo = 'MATERIAL PERMANENTE (APAR. EQUIPAMENTOS DE FISIOTERAPIA)' then 560841
 WHEN g.ds_grupo = 'MATERIAL PERMANENTE (APAR.,EQUIP.UTENS.MED.ODONT.LABORA.HOSPITALAR)' then 560842
 WHEN g.ds_grupo = 'MATERIAL P/FESTIVIDADES E HOMENAGENS' then 560843
 WHEN g.ds_grupo = 'MERCADORIAS PARA DOAÇÃO' then 560844
 WHEN g.ds_grupo = 'OBRAS E INSTALAÇÕES' then 560845
 WHEN g.ds_grupo = 'OUTROS MATERIAIS DE DISTRIBUIÇÃO GRATUITA' then 560846
 WHEN g.ds_grupo = 'OUTROS MATERIAIS PERMANENTE' then 560847
 WHEN g.ds_grupo = 'OUTROS MATERIAS DE CONSUMO' then 560848
 WHEN g.ds_grupo = 'OUTROS SERVIÇOS DE TERCEIROS - PESSOA JURÍDICA' then 560850
 WHEN g.ds_grupo = 'PEÇAS E ACESSORIOS' then 560851
 WHEN g.ds_grupo = 'PREMIAÇÕES CULTURAIS, ARTISTICAS, CIENTIFICAS ENTRE OUTROS' then 560852
 WHEN g.ds_grupo = 'MATERIAL DE SINALIZAÇÃO VISUAL E OUTROS' then 561025
 WHEN g.ds_grupo = 'MATERIAL DE PROTEÇÃO E SEGURANÇA' then 561026
 WHEN g.ds_grupo = 'MAGAZINE' then 561027
 WHEN g.ds_grupo = 'MAT. PERMANENTE - VEICULOS DE TRAÇÃO MECANICA' then 561028
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
ds_produto as descricao,
ds_produto as nome,
1 as codigoEspecificacao
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS especificacoes,
null as identificadorDesktopTransparencia
from ALMOProdutos p
join ALMOGrupos g on g.cd_grupo = p.cd_grupo 
where ds_grupo <> 'MATERIAL PERMANENTE - NÃO USAR MAIS *************'

        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        console.log('Dados recebidos da consulta:', resultData);

        const transformedData = resultData.map(record => {
            return {
                conteudo:{
                descricao: record.descricao,
                tipoMaterial: JSON.parse(record.tipoMaterial),
                classificacao: JSON.parse(record.classificacao),
                ativo: record.ativo === 'true', // Convert string 'true'/'false' to boolean
                estocavel: record.estocavel === 'true',
                unidadeCompra: JSON.parse(record.unidadeCompra),
                unidadeEstoque: JSON.parse(record.unidadeEstoque),
                classe: JSON.parse(record.classe),
                grupo: JSON.parse(record.grupo),
                tipoCombustivel: JSON.parse(record.tipoCombustivel),
                especificacoes: [JSON.parse(record.especificacoes)], // Wrap in array
                identificadorDesktopTransparencia: record.identificadorDesktopTransparencia
            }};
        }).filter(record => record !== null); // Filter out null records

        /*   const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        return */
        
        const chunkArray = (array, size) => {
            const chunked = [];
            for (let i = 0; i < array.length; i += size) {
                chunked.push(array.slice(i, i + size));
            }
            return chunked;
        };
        
        const batchedData = chunkArray(transformedData, 50);
        let report = [];
        let reportIds = [];
        
        for (const batch of batchedData) {
            try {
                console.log('Enviando o seguinte corpo para a API:', JSON.stringify(batch, null, 2));
        
                const response = await fetch(`https://almoxarifado.betha.cloud/estoque-services/api/conversoes/lotes/materiais`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 25a840ae-b57a-4030-903a-bcccf2386f30'
                    },
                    body: JSON.stringify(batch)
                });
        
                const responseBody = await response.json();
        
                if (response.ok) {
                    console.log('Dados enviados com sucesso para a API.');
                    batch.forEach(record => {
                        report.push({ record, status: 'success', response: responseBody });
                    });
        
                    if (responseBody.idLote) {
                        reportIds.push(responseBody.idLote);
                    }
                } else {
                    console.error('Erro ao enviar os dados para a API:', response.statusText);
                    batch.forEach(record => {
                        report.push({ record, status: 'failed', response: responseBody });
                    });
                }
            } catch (err) {
                console.error('Erro ao enviar o batch para a API:', err);
                batch.forEach(record => {
                    report.push({ record, status: 'error', error: err.message });
                });
            }
        }
        
        // Save the report in 'report.json'
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));
        console.log('Relatório salvo em report.json com sucesso.');
        
        // Save the reportIds in the 'report_id.json' file
        fs.writeFileSync('report_id.json', JSON.stringify(reportIds, null, 2));
        console.log('report_id.json salvo com sucesso.');

    } catch (error) {
        console.error('Erro no processo:', error);
    } finally {
        await sql.close(); // Close the connection with SQL Server
        console.log('Conexão com o SQL Server fechada.');
    }
}

// Execute the main function
main();