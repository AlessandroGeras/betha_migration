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
        const selectDatabaseQuery = 'USE PATRIMONIO_CAM';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            --envio de bens
select
JSON_QUERY(
(SELECT
        CASE TB.ds_tipobem
      WHEN 'ACESSORIOS PARA AUTOMOVEIS' THEN '5709'
      WHEN 'ALMOXARIFADO DE MATERIAIS A SEREM APLICADOS EM BEN' THEN '5710'
      WHEN 'ALMOX. DE MAT. A SEREM APLICADOS EM BENS ANDAMENTO' THEN '5710'
      WHEN 'APARELHOS DE MEDIÇÃO E ORIENTAÇÃO' THEN '5709'
      WHEN 'APARELHOS E EQUIPAMENTO DE COMUNICAÇÃO' THEN '5709'
      WHEN 'APARELHOS EQUI. E UTEN. MED. ODON. LOBO. E HOSP.' THEN '5709'
      WHEN 'APAR. E EQUIP. P/ ESPORTES E DIVERSÕES' THEN '5709'
      WHEN 'APARELHOS E UTENSILIOS DOMESTICOS' THEN '5709'
      WHEN 'BENFEITORIAS EM PRORPIEDADES DE TERCEIROS' THEN '5710'
      WHEN 'CASAS E APARTAMENTOS' THEN '5710'
      WHEN 'COLEÇÃO E MATERIAIS BIBLIOGRAFICOS' THEN '5709'
      WHEN 'EDIFICIOS - REALIZAÇÃO DE OBRAS' THEN '5710'
      WHEN 'EQUIP. DE MANOBRA E PATRULHAMENTO' THEN '5709'
      WHEN 'EQUIPAMENTO DE PROCESSAMENTO DE DADOS ' THEN '5709'
      WHEN 'EQUIPAMENTO DE PROTEÇÃO, SEGURANÇA E SOCORRO' THEN '5709'
	  WHEN 'APARELHOS E EQUIPAMENTOS PARA ESPORTES E DIVERSOS' THEN '5709'
      WHEN 'EQUIP. E UTENSILIOS HIDRAULICOS E ELETRICOS' THEN '5709'
      WHEN 'EQUIPAMENTO PARA AUDIO, VIDEO E FOTO' THEN '5709'
      WHEN 'ESTRADAS' THEN '5710'
      WHEN 'ESTUDOS E PROJETOS' THEN '5710'
      WHEN 'INSTALAÇÕES' THEN '5710'
      WHEN 'INSTRUMENTOS MUSICAIS E ARTISTICOS' THEN '5709'
      WHEN 'MAQ. E EQUIP. AGRICOLAS E RODOVIARIOS' THEN '5709'
      WHEN 'MAQ. E EQUIP. DE NATUREZA INDUSTRIAL' THEN '5709'
      WHEN 'MAQUINAS E EQUIPAMENTOS ENERGETICOS' THEN '5709'
      WHEN 'MAQUINAS E EQUIPAMENTOS GRAFICOS' THEN '5709'
      WHEN 'MAQUINAS FERRAMENTAS E UTENSILIOS DE OFICINA' THEN '5709'
      WHEN 'MAQUINAS INSTALAÇÕES E UTENSILIOS DE ESCRITORIO' THEN '5709'
      WHEN 'MAQUINAS UTENSILIOS E EQUIPAMENTOS DIVERSOS' THEN '5709'
      WHEN 'MOBILIARIA EM GERAL' THEN '5709'
      WHEN 'OBRAS EM ANDAMENTO' THEN '5710'
      WHEN 'OUTRAS OBRAS E INSTALAÇÕES' THEN '5710'
      WHEN 'OUTROS BENS DE USO COMUM DO POVO' THEN '5710'
      WHEN 'OUTROS MATERIAIS PERMANENTES' THEN '5709'
      WHEN 'PONTES' THEN '5710'
      WHEN 'PRAÇAS' THEN '5710'
      WHEN 'RUAS' THEN '5710'
      WHEN 'SISTEMA DE ABASECIMENTO DE ENERGIA' THEN '5710'
      WHEN 'SISTEMA DE ESGOTO E ABASTECIMENTO DE AGUA' THEN '5710'
      WHEN 'TERRENOS' THEN '5710'
      WHEN 'TERRENOS PUBLICOS' THEN '5710'
      WHEN 'VEICULO DE TRAÇÃO MECANICA' THEN '5709'
      WHEN 'VEICULOS DIVERSOS' THEN '5709'
    END AS id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS tipoBem,-- ok
JSON_QUERY( 
  (SELECT
    CASE TB.ds_tipobem
 when 'ACESSORIOS PARA AUTOMOVEIS' then 51950
 when 'MAQUINAS FERRAMENTAS E UTENSILIOS DE OFICINA' then 51951
 when 'APARELHOS E EQUIPAMENTO DE COMUNICAÇÃO' then 51952
 when 'MAQUINAS E EQUIPAMENTOS GRAFICOS' then 51953
 when 'MAQUINAS INSTALAÇÕES E UTENSILIOS DE ESCRITORIO' then 51954
 when 'EQUIPAMENTO DE PROTEÇÃO, SEGURANÇA E SOCORRO' then 51955
 when 'EQUIPAMENTO DE PROCESSAMENTO DE DADOS ' then 51956
 when 'COLEÇÃO E MATERIAIS BIBLIOGRAFICOS' then 51957
 when 'MOBILIARIA EM GERAL' then 51958
 when 'EQUIP. E UTENSILIOS HIDRAULICOS E ELETRICOS' then 51959
 when 'INSTRUMENTOS MUSICAIS E ARTISTICOS' then 51960
 when 'MAQUINAS UTENSILIOS E EQUIPAMENTOS DIVERSOS' then 51961
 when 'EQUIPAMENTO PARA AUDIO, VIDEO E FOTO' then 51962
 when 'EQUIP. DE MANOBRA E PATRULHAMENTO' then 51963
 when 'MAQ. E EQUIP. AGRICOLAS E RODOVIARIOS' then 51964
 when 'VEICULOS DIVERSOS' then 51965
 when 'MAQ. E EQUIP. DE NATUREZA INDUSTRIAL' then 51966
 when 'MAQUINAS E EQUIPAMENTOS ENERGETICOS' then 51967
 when 'VEICULO DE TRAÇÃO MECANICA' then 51968
 when 'APARELHOS EQUI. E UTEN. MED. ODON. LOBO. E HOSP.' then 51969
 when 'APARELHOS E UTENSILIOS DOMESTICOS' then 51970
 when 'OUTROS MATERIAIS PERMANENTES' then 51971
 when 'APAR. E EQUIP. P/ ESPORTES E DIVERSÕES' then 51972
 when 'APARELHOS DE MEDIÇÃO E ORIENTAÇÃO' then 51973
 when 'TERRENOS' then 51974
 when 'CASAS E APARTAMENTOS' then 51975
 when 'OBRAS EM ANDAMENTO' then 51976
 when 'TERRENOS PUBLICOS' then 51977
 when 'SISTEMA DE ABASECIMENTO DE ENERGIA' then 51978
 when 'OUTRAS OBRAS E INSTALAÇÕES' then 51979
 when 'PONTES' then 51980
 when 'ALMOX. DE MAT. A SEREM APLICADOS EM BENS ANDAMENTO' then 51981
 when 'ESTUDOS E PROJETOS' then 51982
 when 'RUAS' then 51983
 when 'SISTEMA DE ESGOTO E ABASTECIMENTO DE AGUA' then 51984
 when 'OUTROS BENS DE USO COMUM DO POVO' then 51985
 when 'EDIFICIOS - REALIZAÇÃO DE OBRAS' then 51986
 when 'INSTALAÇÕES' then 51987
 when 'ALMOXARIFADO DE MATERIAIS A SEREM APLICADOS EM BEN' then 51988
 when 'PRAÇAS' then 51989
 when 'BENFEITORIAS EM PRORPIEDADES DE TERCEIROS' then 51990
 when 'ESTRADAS' then 51991
 when 'APARELHOS E EQUIPAMENTOS PARA ESPORTES E DIVERSOS' then 51972
    END AS id
  FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS grupoBem, -- ok
JSON_QUERY((SELECT
 case tb.ds_tipobem
 when 'VEICULO DE TRAÇÃO MECANICA' then 541243
 when 'COLEÇÃO E MATERIAIS BIBLIOGRAFICOS' then 541244
 when 'MAQ. E EQUIP. AGRICOLAS E RODOVIARIOS' then 541245
 when 'APARELHOS E UTENSILIOS DOMESTICOS' then 541246
 when 'MAQUINAS INSTALAÇÕES E UTENSILIOS DE ESCRITORIO' then 541247
 when 'APAR. E EQUIP. P/ ESPORTES E DIVERSÕES' then 541248
 when 'EQUIPAMENTO DE PROCESSAMENTO DE DADOS ' then 541249
 when 'EQUIPAMENTO DE PROTEÇÃO, SEGURANÇA E SOCORRO' then 541250
 when 'MAQUINAS FERRAMENTAS E UTENSILIOS DE OFICINA' then 541251
 when 'VEICULOS DIVERSOS' then 541252
 when 'ACESSORIOS PARA AUTOMOVEIS' then 541253
 when 'EQUIP. DE MANOBRA E PATRULHAMENTO' then 541254
 when 'APARELHOS E EQUIPAMENTO DE COMUNICAÇÃO' then 541255
 when 'MAQUINAS UTENSILIOS E EQUIPAMENTOS DIVERSOS' then 541256
 when 'MAQUINAS E EQUIPAMENTOS GRAFICOS' then 541257
 when 'EQUIPAMENTO PARA AUDIO, VIDEO E FOTO' then 541258
 when 'APARELHOS DE MEDIÇÃO E ORIENTAÇÃO' then 541259
 when 'MAQ. E EQUIP. DE NATUREZA INDUSTRIAL' then 541260
 when 'OUTROS MATERIAIS PERMANENTES' then 541261
 when 'MOBILIARIA EM GERAL' then 541262
 when 'MAQUINAS E EQUIPAMENTOS ENERGETICOS' then 541263
 when 'MAQUINAS INSTALAÇÕES E UTENSILIOS DE ESCRITORIO' then 541264
 when 'EQUIP. E UTENSILIOS HIDRAULICOS E ELETRICOS' then 541265
 when 'APARELHOS EQUI. E UTEN. MED. ODON. LOBO. E HOSP.' then 541266
 when 'INSTRUMENTOS MUSICAIS E ARTISTICOS' then 541267
 when 'TERRENOS PUBLICOS' then 541268
 when 'TERRENOS' then 541269
 when 'ESTUDOS E PROJETOS' then 541270
 when 'INSTALAÇÕES' then 541271
 when 'PRAÇAS' then 541272
 when 'RUAS' then 541273
 when 'SISTEMA DE ABASECIMENTO DE ENERGIA' then 541274
 when 'SISTEMA DE ESGOTO E ABASTECIMENTO DE AGUA' then 541275
 when 'EDIFICIOS - REALIZAÇÃO DE OBRAS' then 541276
 when 'CASAS E APARTAMENTOS' then 541277
 when 'ALMOX. DE MAT. A SEREM APLICADOS EM BENS ANDAMENTO' then 541278
 when 'BENFEITORIAS EM PRORPIEDADES DE TERCEIROS' then 541279
 when 'PONTES' then 541280
 when 'OBRAS EM ANDAMENTO' then 541281
 when 'OUTROS BENS DE USO COMUM DO POVO' then 541282
 when 'OUTRAS OBRAS E INSTALAÇÕES' then 541283
 when 'ALMOXARIFADO DE MATERIAIS A SEREM APLICADOS EM BEN' then 541284
 when 'ESTRADAS' then 541285
 when 'APARELHOS E EQUIPAMENTOS PARA ESPORTES E DIVERSOS' then 541248
end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS especieBem, --ok
null AS tipoUtilizacaoBem,
JSON_QUERY( (SELECT
case bp.cd_tipoaquisicao
when 2 then 8911
else 8909
 end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS tipoAquisicao, -- ok
JSON_QUERY( (SELECT
 case F.nm_fornecedor
  when 'CÂMARA MUNICIPAL DE PARECIS' then 38536157
 when 'GAZIN INDUSTRIA DE MOVEIS E ELETRO' then 38538616
 when 'GANGUSSU E FURTADO LTDA' then 38584198
 end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS fornecedor,
JSON_QUERY( (SELECT
   '38429988' as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS responsavel, -- ok
JSON_QUERY( (SELECT
 case bp.cd_situacao
when  1 then  4965
when 2 then  4963
end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS estadoConservacao, -- ok
JSON_QUERY( (SELECT
   '3417' as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS tipoComprovante, -- ok
JSON_QUERY( (SELECT
2137532  as id 
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS organograma, -- ok
JSON_QUERY( (SELECT
125503 as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS localizacaoFisica, --ok
CASE 
    WHEN V.ds_Placa != '' THEN 'true' 
    ELSE 'false' 
END AS consomeCombustivel,
JSON_QUERY( (SELECT
   CASE 
    WHEN BP.cd_situacao = '1' THEN 'EM_USO'
    ELSE 'EM_USO' 
        end as valor,
   CASE 
    WHEN BP.cd_situacao = 1 THEN 'EM_USO'
    ELSE 'EM_USO' 
        end as descricao
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS situacaoBem,
BP.nr_chapa as numeroRegistro,
BP.ds_descricao as descricao,
BP.dt_aquisicao as dataInclusao,
BP.dt_aquisicao as dataAquisicao,
bp.nr_chapa as numeroPlaca,
BP.dt_aquisicao as dataInicioGarantia,
JSON_QUERY(
    (SELECT
JSON_QUERY(
    (SELECT
case when pc_residual > 0  and BP.vl_anterior > 0 then 2101
else '-1'
end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS metodoDepreciacao, -- ok
JSON_QUERY(
    (SELECT
        '8' as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS moeda,
bp.vl_aquisicao as vlAquisicao,
 bp.vl_aquisicao as vlAquisicaoConvertido,
( bp.vl_aquisicao - bp.vl_residual )as  vlDepreciavel,
'0' as vlDepreciado, --  select * from PAtrmovimentacao  cd_tipomovimento = 12
( bp.vl_aquisicao - bp.vl_residual ) as saldoDepreciar,
bp.vl_aquisicao as vlLiquidoContabil,
case TB.ds_tipobem 
when 'APAR. DE MEDICAO E ORIENTAÇÃO' then 10.0
when 'APAR. E EQUIP. DE COMUNICAÇÃO' then 16.67
when 'APAR. EQUIP. E UTENS. MED. ODOT. LABO E HOSPITALAR' then 6.25
when 'APAR. E EQUIP. P/ ESPORTES E DIVERSÕES' then 12.5
when 'APAR. E UTENS. DOMESTICOS' then 10.0
when 'COLEÇÕES E MATERIAIS BIBLIOGRAFICOS' then 10.0
when 'EQUIP. DE MANOBRA E PATRULHAMENTO' then 10.0
when 'EQUIP. DE PROTEÇÃO, SEGURANÇA E SOCORRO' then 10.0
when 'INSTRUMENTOS MUSICAIS E ARTISTICOS' then 5
when 'MAQ. E EQUIP. DE NATUREZA INDUSTRIAL' then 6.25
when 'MAQ. E EQUIP. ENERGETICOS' then 6.25
when 'MAQ. E EQUIP. GRAFICOS' then 6.25
when 'EQUIP. P/ AUDIO VIDEO E FOTO' then 10.0
when 'MAQ. UTENS. E EQUIPAMENTOS DIVERSOS' then 10.0
when 'EQUIP. DE PROCESSAMENTO DE DADOS' then 10.0
when 'MAQ. INSTALAÇÕES E UTENSILIOS DE ESCRITORIO' then 16.67
when 'MAQ. FERRAMENTA E UTENSILIOS DE OFICINA' then 10.0
when 'EQUIP. E UTENSILIOS HIDRAULICOS E ELETRICOS' then 10.0
when 'MAQ. E EQUIP. AGRICOLAS E RODOVIARIOS' then 12.5
when 'MOBILIARIO EM GERAL' then 10.0
when 'VEICULOS DIVERSOS' then 12.5
when 'VEICULOS DE TRAÇÃO MECANICA' then 12.5
when 'ACESSORIOS PARA AUTOMOVEIS' then 20.0
when 'OUTROS MATERIAIS PERMANENTES' then null
when 'EDIFICIOS - REALIZAÇÃO DE OBRAS' then null
when 'TERRENOS' then null
when 'INSTALAÇÕES' then null
when 'CASAS E APARTAMENTOS' then null
when 'RUAS' then null
when 'ALMOXARIFADO DE MATERIAIS A SEREM APLICADOS EM BEN' then null
when 'ESTUDOS E PROJETOS' then null
when 'OBRAS EM ANDAMENTO' then null
when 'PRAÇAS' then null
when 'BENFEITORIAS EM PRORPIEDADES DE TERCEIROS' then null
when 'ESTRADAS' then null
when 'OUTRAS OBRAS E INSTALAÇÕES' then null
when 'PONTES' then null
when 'SISTEMA DE ESGOTO E ABASTECIMENTO DE AGUA' then null
when 'SISTEMA DE ABASECIMENTO DE ENERGIA' then null
when 'OUTROS BENS DE USO COMUM DO POVO' then null
when 'ALMOX. DE MAT. A SEREM APLICADOS EM BENS ANDAMENTO' then null
when 'TERRENOS PUBLICOS' then null
when 'ACESSORIOS PARA AUTOMOVEIS' then null
when 'ALMOXARIFADO DE MATERIAIS A SEREM APLICADOS EM BEN' then null
when 'ALMOX. DE MAT. A SEREM APLICADOS EM BENS ANDAMENTO' then null
when 'APAR. DE MEDICAO E ORIENTAÇÃO' then null
when 'APAR. E EQUIP. DE COMUNICAÇÃO' then null
when 'APAR. E EQUIP. P/ ESPORTES E DIVERSÕES' then null
when 'APAR. EQUIP. E UTENS. MED. ODOT. LABO E HOSPITALAR' then null
when 'APAR. E UTENS. DOMESTICOS' then null
when 'BENFEITORIAS EM PRORPIEDADES DE TERCEIROS' then null
when 'CASAS E APARTAMENTOS' then null
when 'COLEÇÕES E MATERIAIS BIBLIOGRAFICOS' then null
when 'EDIFICIOS - REALIZAÇÃO DE OBRAS' then null
when 'EQUIP. DE MANOBRA E PATRULHAMENTO' then null
when 'EQUIP. DE PROCESSAMENTO DE DADOS' then null
when 'EQUIP. DE PROTEÇÃO, SEGURANÇA E SOCORRO' then null
when 'EQUIP. E UTENSILIOS HIDRAULICOS E ELETRICOS' then null
when 'EQUIP. P/ AUDIO VIDEO E FOTO' then null
when 'ESTRADAS' then null
when 'ESTUDOS E PROJETOS' then null
when 'INSTALAÇÕES' then null
when 'INSTRUMENTOS MUSICAIS E ARTISTICOS' then null
when 'MAQ. E EQUIP. AGRICOLAS E RODOVIARIOS' then null
when 'MAQ. E EQUIP. DE NATUREZA INDUSTRIAL' then null
when 'MAQ. E EQUIP. ENERGETICOS' then null
when 'MAQ. E EQUIP. GRAFICOS' then null
when 'MAQ. FERRAMENTA E UTENSILIOS DE OFICINA' then null
when 'MAQ. INSTALAÇÕES E UTENSILIOS DE ESCRITORIO' then null
when 'MAQ. UTENS. E EQUIPAMENTOS DIVERSOS' then null
when 'MOBILIARIO EM GERAL' then null
when 'OBRAS EM ANDAMENTO' then null
when 'OUTRAS OBRAS E INSTALAÇÕES' then null
when 'OUTROS BENS DE USO COMUM DO POVO' then null
when 'OUTROS MATERIAIS PERMANENTES' then null
when 'PONTES' then null
when 'PRAÇAS' then null
when 'RUAS' then null
when 'SISTEMA DE ABASECIMENTO DE ENERGIA' then null
when 'SISTEMA DE ESGOTO E ABASTECIMENTO DE AGUA' then null
when 'TERRENOS' then null
when 'TERRENOS PUBLICOS' then null
when 'VEICULOS DE TRAÇÃO MECANICA' then null
when 'VEICULOS DIVERSOS' then null
when 'ACESSORIOS PARA AUTOMOVEIS' then null
when 'ALMOXARIFADO DE MATERIAIS A SEREM APLICADOS EM BEN' then null
when 'ALMOX. DE MAT. A SEREM APLICADOS EM BENS ANDAMENTO' then null
when 'APAR. DE MEDICAO E ORIENTAÇÃO' then null
when 'APAR. E EQUIP. DE COMUNICAÇÃO' then null
when 'APAR. E EQUIP. P/ ESPORTES E DIVERSÕES' then null
when 'APAR. EQUIP. E UTENS. MED. ODOT. LABO E HOSPITALAR' then null
when 'APAR. E UTENS. DOMESTICOS' then null
when 'BENFEITORIAS EM PRORPIEDADES DE TERCEIROS' then null
when 'CASAS E APARTAMENTOS' then null
when 'COLEÇÕES E MATERIAIS BIBLIOGRAFICOS' then null
when 'EDIFICIOS - REALIZAÇÃO DE OBRAS' then null
when 'EQUIP. DE MANOBRA E PATRULHAMENTO' then null
when 'EQUIP. DE PROCESSAMENTO DE DADOS' then null
when 'EQUIP. DE PROTEÇÃO, SEGURANÇA E SOCORRO' then null
when 'EQUIP. E UTENSILIOS HIDRAULICOS E ELETRICOS' then null
when 'EQUIP. P/ AUDIO VIDEO E FOTO' then null
when 'ESTRADAS' then null
when 'ESTUDOS E PROJETOS' then null
when 'INSTALAÇÕES' then null
when 'INSTRUMENTOS MUSICAIS E ARTISTICOS' then null
when 'MAQ. E EQUIP. AGRICOLAS E RODOVIARIOS' then null
when 'MAQ. E EQUIP. DE NATUREZA INDUSTRIAL' then null
when 'MAQ. E EQUIP. ENERGETICOS' then null
when 'MAQ. E EQUIP. GRAFICOS' then null
when 'MAQ. FERRAMENTA E UTENSILIOS DE OFICINA' then null
when 'MAQ. INSTALAÇÕES E UTENSILIOS DE ESCRITORIO' then null
when 'MAQ. UTENS. E EQUIPAMENTOS DIVERSOS' then null
when 'MOBILIARIO EM GERAL' then null
when 'OBRAS EM ANDAMENTO' then null
when 'OUTRAS OBRAS E INSTALAÇÕES' then null
when 'OUTROS BENS DE USO COMUM DO POVO' then null
when 'OUTROS MATERIAIS PERMANENTES' then null
when 'PONTES' then null
when 'PRAÇAS' then null
when 'RUAS' then null
when 'SISTEMA DE ABASECIMENTO DE ENERGIA' then null
when 'SISTEMA DE ESGOTO E ABASTECIMENTO DE AGUA' then null
when 'TERRENOS' then null
when 'TERRENOS PUBLICOS' then null
when 'VEICULOS DE TRAÇÃO MECANICA' then null
when 'VEICULOS DIVERSOS' then null
when 'APARELHOS DE MEDIÇÃO E ORIENTAÇÃO' then null
when 'APARELHOS E EQUIPAMENTO DE COMUNICAÇÃO' then null
when 'APARELHOS EQUI. E UTEN. MED. ODON. LOBO. E HOSP.' then null
when 'EQUIPAMENTO DE PROTEÇÃO, SEGURANÇA E SOCORRO' then null
when 'APARELHOS E EQUIPAMENTOS PARA ESPORTES E DIVERSOS' then null
when 'APARELHOS E UTENSILIOS DOMESTICOS' then null
when 'MAQUINAS E EQUIPAMENTOS ENERGETICOS' then null
when 'MAQUINAS E EQUIPAMENTOS GRAFICOS' then null
when 'EQUIPAMENTO PARA AUDIO, VIDEO E FOTO' then null
when 'MAQUINAS UTENSILIOS E EQUIPAMENTOS DIVERSOS' then null
when 'EQUIPAMENTO DE PROCESSAMENTO DE DADOS' then null
when 'MAQUINAS INSTALAÇÕES E UTENSILIOS DE ESCRITORIO' then null
when 'MOBILIARIA EM GERAL' then null
when 'VEICULO DE TRAÇÃO MECANICA' then null
when 'EDIFICIOS' then null
when 'TERRENOS/GLEBAS' then null
when 'OBRAS EM ANDAMENTO' then null
when 'EQUIPAMENTO E UTENSILIO HIDRAULICO E ELETRICO' then null
 end as taxaDepreciacaoAnual,
BP.dt_aquisicao as dtInicioDepreciacao,
bp.vl_residual as vlResidual
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS bemValor
from PATRBensPatrimoniais BP
left  join PATRVeiculo V ON V.nr_Chapa = BP.nr_chapa
left join PATRTiposBens TB ON TB.cd_tipobem = bp.cd_tipobem
left JOIN COMPFornecedores F ON F.cd_fornecedor = BP.cd_fornecedor
where BP.cd_situacao = 1 
        `;

        const result = await masterConnection.query(userQuery);

        const resultData = result.recordset;

        const transformedData = resultData.map(record => {
            const formatDate = (dateStr) => {
                if (!dateStr) return null;
                const date = new Date(dateStr);
                return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
            };

            const bemValor = JSON.parse(record.bemValor);
            let tipoUtilizacaoBem = null;
            if (record.tipoUtilizacaoBem) {
                const parsedTipoUtilizacaoBem = JSON.parse(record.tipoUtilizacaoBem);
                if (!isNaN(parseInt(parsedTipoUtilizacaoBem.id, 10))) {
                    tipoUtilizacaoBem = { id: parseInt(parsedTipoUtilizacaoBem.id, 10) };
                }
            }

            return {
                conteudo: {
                    tipoBem: {
                        id:record.tipoBem ? parseInt(JSON.parse(record.tipoBem).id, 10) : 0
                    },
                    grupoBem: {
                        id: record.grupoBem ? JSON.parse(record.grupoBem).id : 0
                    },
                    especieBem: {
                        id: record.especieBem ? JSON.parse(record.especieBem).id : 0
                    },
                    tipoUtilizacaoBem: tipoUtilizacaoBem,
                    tipoAquisicao: {
                        id: record.tipoAquisicao ? JSON.parse(record.tipoAquisicao).id : 0
                    },
                    fornecedor: {
                        id: record.fornecedor ? JSON.parse(record.fornecedor).id : 0
                    },
                    responsavel: {
                        id: record.responsavel ? parseInt(JSON.parse(record.responsavel).id, 10) : 0
                    },
                    estadoConservacao: {
                        id: record.estadoConservacao ? JSON.parse(record.estadoConservacao).id : 0
                    },
                    tipoComprovante: {
                        id: record.tipoComprovante ? parseInt(JSON.parse(record.tipoComprovante).id, 10) : 0
                    },
                    organograma: {
                        id: record.organograma ? JSON.parse(record.organograma).id : 0
                    },
                    localizacaoFisica: {
                        id: record.localizacaoFisica ? JSON.parse(record.localizacaoFisica).id : 0
                    },
                    numeroRegistro: record.numeroRegistro ? record.numeroRegistro : 0,
                    descricao: record.descricao ? record.descricao.trim() : "string",
                    dataInclusao: formatDate(record.dataInclusao) || formatDate(record.dataAquisicao),
                    dataAquisicao: formatDate(record.dataAquisicao),
                    consomeCombustivel: record.consomeCombustivel === 'true',
                    dataInicioGarantia: formatDate(record.dataInicioGarantia) || formatDate(record.dataAquisicao),
                    //dtUltimaDepreciacao: formatDate(record.dtUltimaDepreciacao),
                    situacaoBem: {
                        valor: record.situacaoBem ? JSON.parse(record.situacaoBem).valor : "EM_EDICAO",
                        descricao: record.situacaoBem ? JSON.parse(record.situacaoBem).descricao : "string"
                    },
                    numeroPlaca: `${record.numeroPlaca ? record.numeroPlaca : null}`,
                    bemValor: {
                        metodoDepreciacao: {
                            id: parseInt(bemValor.metodoDepreciacao.id),
                        },
                        vlAquisicao: bemValor.vlAquisicao,
                        vlAquisicaoConvertido: bemValor.vlAquisicaoConvertido,
                        vlDepreciavel: bemValor.vlDepreciavel || 0,
                        vlDepreciado: parseInt(bemValor.vlDepreciado),
                        saldoDepreciar: bemValor.saldoDepreciar || 0,
                        vlLiquidoContabil: bemValor.vlLiquidoContabil,
                        taxaDepreciacaoAnual: bemValor.taxaDepreciacaoAnual || 0.1,
                        dtInicioDepreciacao: formatDate(bemValor.dtInicioDepreciacao) || formatDate(record.dataAquisicao),
                        vlResidual: bemValor.vlResidual || 0,
                        moeda: {
                            id: parseInt(bemValor.moeda.id),
                        }
                    }
                },
            };
        });

        /*     const chunkSize = 50;
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
        
                const response = await fetch(`https://patrimonio.betha.cloud/patrimonio-services/api/conversoes/lotes/bens`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 601408b2-127b-46dc-9ceb-cfd9b7940808'
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