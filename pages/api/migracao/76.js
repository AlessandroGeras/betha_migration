const sql = require('mssql');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const fs = require('fs');
const { isNonNullChain } = require('typescript');

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
        const selectDatabaseQuery = 'USE PATRIMONIO';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select
JSON_QUERY(
(SELECT
        CASE TB.ds_tipobem
      WHEN 'ACESSORIOS PARA AUTOMOVEIS' THEN '5491'
      WHEN 'ALMOXARIFADO DE MATERIAIS A SEREM APLICADOS EM BEN' THEN '5492'
      WHEN 'ALMOX. DE MAT. A SEREM APLICADOS EM BENS ANDAMENTO' THEN '5492'
      WHEN 'APAR. DE MEDICAO E ORIENTAÇÃO' THEN '5491'
      WHEN 'APAR. E EQUIP. DE COMUNICAÇÃO' THEN '5491'
      WHEN 'APAR. EQUIP. E UTENS. MED. ODOT. LABO E HOSPITALAR' THEN '5491'
      WHEN 'APAR. E EQUIP. P/ ESPORTES E DIVERSÕES' THEN '5491'
      WHEN 'APAR. E UTENS. DOMESTICOS' THEN '5491'
      WHEN 'BENFEITORIAS EM PRORPIEDADES DE TERCEIROS' THEN '5492'
      WHEN 'CASAS E APARTAMENTOS' THEN '5492'
      WHEN 'COLEÇÕES E MATERIAIS BIBLIOGRAFICOS' THEN '5491'
      WHEN 'EDIFICIOS - REALIZAÇÃO DE OBRAS' THEN '5492'
      WHEN 'EQUIP. DE MANOBRA E PATRULHAMENTO' THEN '5491'
      WHEN 'EQUIP. DE PROCESSAMENTO DE DADOS' THEN '5491'
      WHEN 'EQUIP. DE PROTEÇÃO, SEGURANÇA E SOCORRO' THEN '5491'
      WHEN 'EQUIP. E UTENSILIOS HIDRAULICOS E ELETRICOS' THEN '5491'
      WHEN 'EQUIP. P/ AUDIO VIDEO E FOTO' THEN '5491'
      WHEN 'ESTRADAS' THEN '5492'
      WHEN 'ESTUDOS E PROJETOS' THEN '5492'
      WHEN 'INSTALAÇÕES' THEN '5492'
      WHEN 'INSTRUMENTOS MUSICAIS E ARTISTICOS' THEN '5491'
      WHEN 'MAQ. E EQUIP. AGRICOLAS E RODOVIARIOS' THEN '5491'
      WHEN 'MAQ. E EQUIP. DE NATUREZA INDUSTRIAL' THEN '5491'
      WHEN 'MAQ. E EQUIP. ENERGETICOS' THEN '5491'
      WHEN 'MAQ. E EQUIP. GRAFICOS' THEN '5491'
      WHEN 'MAQ. FERRAMENTA E UTENSILIOS DE OFICINA' THEN '5491'
      WHEN 'MAQ. INSTALAÇÕES E UTENSILIOS DE ESCRITORIO' THEN '5491'
      WHEN 'MAQ. UTENS. E EQUIPAMENTOS DIVERSOS' THEN '5491'
      WHEN 'MOBILIARIO EM GERAL' THEN '5491'
      WHEN 'OBRAS EM ANDAMENTO' THEN '5492'
      WHEN 'OUTRAS OBRAS E INSTALAÇÕES' THEN '5492'
      WHEN 'OUTROS BENS DE USO COMUM DO POVO' THEN '5492'
      WHEN 'OUTROS MATERIAIS PERMANENTES' THEN '5491'
      WHEN 'PONTES' THEN '5492'
      WHEN 'PRAÇAS' THEN '5492'
      WHEN 'RUAS' THEN '5492'
      WHEN 'SISTEMA DE ABASECIMENTO DE ENERGIA' THEN '5492'
      WHEN 'SISTEMA DE ESGOTO E ABASTECIMENTO DE AGUA' THEN '5492'
      WHEN 'TERRENOS' THEN '5492'
      WHEN 'TERRENOS PUBLICOS' THEN '5492'
      WHEN 'VEICULOS DE TRAÇÃO MECANICA' THEN '5491'
      WHEN 'VEICULOS DIVERSOS' THEN '5491'
    END AS id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS tipoBem,
JSON_QUERY( 
  (SELECT
    CASE TB.ds_tipobem
      WHEN 'ACESSORIOS PARA AUTOMOVEIS' THEN 48213
      WHEN 'ALMOXARIFADO DE MATERIAIS A SEREM APLICADOS EM BEN' THEN 48220
      WHEN 'ALMOX. DE MAT. A SEREM APLICADOS EM BENS ANDAMENTO' THEN 48231
      WHEN 'APAR. DE MEDICAO E ORIENTAÇÃO' THEN 48131
      WHEN 'APAR. E EQUIP. DE COMUNICAÇÃO' THEN 48132
      WHEN 'APAR. EQUIP. E UTENS. MED. ODOT. LABO E HOSPITALAR' THEN 48169
      WHEN 'APAR. E EQUIP. P/ ESPORTES E DIVERSÕES' THEN 48194
      WHEN 'APAR. E UTENS. DOMESTICOS' THEN 48195
      WHEN 'BENFEITORIAS EM PRORPIEDADES DE TERCEIROS' THEN 48224
      WHEN 'CASAS E APARTAMENTOS' THEN 48218
      WHEN 'COLEÇÕES E MATERIAIS BIBLIOGRAFICOS' THEN 48196
      WHEN 'EDIFICIOS - REALIZAÇÃO DE OBRAS' THEN 48215
      WHEN 'EQUIP. DE MANOBRA E PATRULHAMENTO' THEN 48197
      WHEN 'EQUIP. DE PROCESSAMENTO DE DADOS' THEN 48205
      WHEN 'EQUIP. DE PROTEÇÃO, SEGURANÇA E SOCORRO' THEN 48198
      WHEN 'EQUIP. E UTENSILIOS HIDRAULICOS E ELETRICOS' THEN 48208
      WHEN 'EQUIP. P/ AUDIO VIDEO E FOTO' THEN 48203
      WHEN 'ESTRADAS' THEN 48225
      WHEN 'ESTUDOS E PROJETOS' THEN 48221
      WHEN 'INSTALAÇÕES' THEN 48217
      WHEN 'INSTRUMENTOS MUSICAIS E ARTISTICOS' THEN 48199
      WHEN 'MAQ. E EQUIP. AGRICOLAS E RODOVIARIOS' THEN 48209
      WHEN 'MAQ. E EQUIP. DE NATUREZA INDUSTRIAL' THEN 48200
      WHEN 'MAQ. E EQUIP. ENERGETICOS' THEN 48201
      WHEN 'MAQ. E EQUIP. GRAFICOS' THEN 48202
      WHEN 'MAQ. FERRAMENTA E UTENSILIOS DE OFICINA' THEN 48207
      WHEN 'MAQ. INSTALAÇÕES E UTENSILIOS DE ESCRITORIO' THEN 48206
      WHEN 'MAQ. UTENS. E EQUIPAMENTOS DIVERSOS' THEN 48204
      WHEN 'MOBILIARIO EM GERAL' THEN 48210
      WHEN 'OBRAS EM ANDAMENTO' THEN 48222
      WHEN 'OUTRAS OBRAS E INSTALAÇÕES' THEN 48226
      WHEN 'OUTROS BENS DE USO COMUM DO POVO' THEN 48230
      WHEN 'OUTROS MATERIAIS PERMANENTES' THEN 48214
      WHEN 'PONTES' THEN 48227
      WHEN 'PRAÇAS' THEN 48223
      WHEN 'RUAS' THEN 48219
      WHEN 'SISTEMA DE ABASECIMENTO DE ENERGIA' THEN 48229
      WHEN 'SISTEMA DE ESGOTO E ABASTECIMENTO DE AGUA' THEN 48228
      WHEN 'TERRENOS' THEN 48216
      WHEN 'TERRENOS PUBLICOS' THEN 48232
      WHEN 'VEICULOS DE TRAÇÃO MECANICA' THEN 48212
      WHEN 'VEICULOS DIVERSOS' THEN 48211
    END AS id
  FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS grupoBem,
JSON_QUERY((SELECT
 case bp.cd_tipobem
when        104        then                519140
when        106        then                519141
when        108        then                519143
when        110        then                519142
when        112        then                519144
when        118        then                519147
when        122        then                519149
when        124        then                519150
when        126        then                519157
when        128        then                519159
when        130        then                519160
when        132        then                519161
when        133        then                519153
when        134        then                519164
when        135        then                519150
when        136        then                519178
when        138        then                519162
when        139        then                519152
when        140        then                519158
when        142        then                519165
when        148        then                519177
when        152        then                519176
when        157        then                519137
when        199        then                519168
when        201        then                519148
when        202        then                519175
when        203        then                519156
when        206        then                519138
when        208        then                519269
when        211        then                519155
when        212        then                519166
when        213        then                519169
when        216        then                519167
when        217        then                519139
when        2003        then        519175
end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS especieBem,
null AS tipoUtilizacaoBem,
JSON_QUERY( (SELECT
case bp.cd_tipoaquisicao
when 2 then 8072
else 8010
 end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS tipoAquisicao,
JSON_QUERY( (SELECT
 case F.nm_fornecedor
 when        '2M COMERCIO DE VEICULOS LTDA'        then        36311331
when        'A. J. ALVES E CIA LTDA - EPP'        then        36311225
when        'A. PAZINATO MARINGA'        then        36311355
when        'AGUIA EMPRESA DE TRANSPORTE E TURISMO LTDA - ME'        then        36311216
when        'ALFA COMUNICAÇÃO VISUAL EIRELLI ME'        then        36311319
when        'ALTA FREQUENCIA LTDA'        then        36311348
when        'AMERICA COMERCIO DE PRODUTOS PARA INFORMATICA LTDA'        then        36311320
when        'ANTONIO APARECIDO DIAS'        then        36311232
when        'APFORM INDUSTRIA E COMERCIO DE MOVEIS LTDA'        then        36311325
when        'ARUMAS INFORMATICAS LTDA'        then        36311327
when        'AUDAX CONSTRUÇÕES E TERRAPLANAGEM EIRELI EPP'        then        36311299
when        'AUTOVEMA MOTORS COMERCIO DE CAMINHONETAS LTDA'        then        36134708
when        'AUTOVEMA VEICULOS LTDA'        then        36311293
when        'AUTOVEMA VEICULOS LTDA'        then        36311317
when        'BIDDEN COMERCIAL LTDA'        then        36311326
when        'BIOCAL COMERCIO E REPRESENTAÇÕES LTDA'        then        36134545
when        'BIOCAL COMERCIO E REPRESENTAÇÕES LTDA'        then        36311237
when        'BIOTECNOPLUS ASSISTENCIA TECNICA EM EQUIPAMENTOS HOSPITALARES'        then        36134688
when        'BOAS NOVAS TURISMO LTDA EPP'        then        36311242
when        'BR PRIME COM.E SERVIÇOS LTDA'        then        36311318
when        'BRUNO PETER AMORIM DE SOUZA 01212683226'        then        36311335
when        'C E CARVALHO COMERCIAL ME'        then        36311338
when        'CACOAL MOTO SERRAS LTDA.'        then        36311230
when        'CAMARA INFORMATICA LTDA - ME'        then        36311262
when        'CASA DA LAVOURA MAQUNAS E IMPLEMANTOS AGRICULAS'        then        36311264
when        'CENTRO OESTE COMERCIO IMP. E EXP. DE PROD. HOSP.'        then        36311345
when        'CICLO CAIRU LTDA'        then        36134575
when        'CIRURGICA SAO FELIPE PROT. PARA SAUDE EIRELI'        then        36311344
when        'CLAUDINEI BRITO VILA BOAS'        then        36134305
when        'CLEIDE BEATRIZ IORIS EIRELI'        then        36311311
when        'CODRASA COMÉRCIO E CONSTRUÇÕES EIRELI'        then        36311290
when        'COIMBRA IMPORTAÇÃO E EXPORTAÇÃO LTDA'        then        36311257
when        'COMERCIAL AGRICOLA CAPRI LTDA'        then        36311266
when        'COMERCIAL VANGUARDEIRA EIRELLI ME'        then        36311273
when        'COMPEX COMERCIAL LTDA'        then        36311265
when        'CONERA CONSTUTORA NOVA ERA LTDA ME'        then        36134566
when        'CONST.UMUARAMA LTDA/EGM SERV.CONTRUS.LTDA'        then        36311352
when        'CONSTRULAR MATERIAIS PARA CONSTRUÇÃO'        then        36311200
when        'CONSTRUTORA HC LTDA EPP'        then        36311289
when        'CONSTRUTORA MCB EIRELI LTDA'        then        36311341
when        'CONSTRUTORA VALTRAN LTDA'        then        36134444
when        'COVEZI CAMINHOES E ONIBUS LTDA'        then        36311321
when        'CR CONSTRUTORA E SERVIÇOS ESPECIALIZADO LTDA'        then        36311316
when        'CRONO COMERCIO E DISTRIBUIÇÃO EIRELI'        then        36311282
when        'CUSTOMIZAR DESING COMERCIO E SERVIÇOS LTDA'        then        36311329
when        'CYBER INFORMATICA LTDA ME'        then        36134490
when        'DALTO & DALTO LTDA'        then        36311301
when        'DANTASTERRA LTDA EPP'        then        36311304
when        'DARTORA & CIA LTDA'        then        36311214
when        'DENTAL MEDICA'        then        36311204
when        'DERLY S. DA SILVA METALURGICA  - ME'        then        36311245
when        'DIEGO DE SOUZA ANDRADE'        then        36311332
when        'DK INFORMATICA LTDA'        then        36311330
when        'DLB COMERCIO DE PRODUTOS DE INFORMATICA EIRELI'        then        36134700
when        'E. V. FERNANDES'        then        36311306
when        'ECS CONST COM SERV LOC EQUIPAMENTOS LTDA'        then        36311354
when        'EDIVALDO ALVES MORREIRA'        then        36311253
when        'ELIZABETE PIRES GUEDES OLIVEIRA ME'        then        36134384
when        'EMPRAL PESQUISAS LTDA'        then        36311231
when        'ERICA DE FATIMA GENTIL'        then        36311308
when        'EVALDO F.PESSOA ME'        then        36311300
when        'FLORES E BORGES LTDA'        then        36311203
when        'FOCO PROJETOS EDUCACIONAIS LTDA-ME'        then        36311279
when        'FRIMOM CONSTRUÇÕES & SERVIÇOS LDA EPP'        then        36134478
when        'G1 MOVEIS ELETRODOMESTICO LTDA -ME '        then        36311241
when        'GIL INFORMATICA LTDA'        then        36311292
when        'GOMES VEICULOS ESPECIAIS EIRELI'        then        36311296
when        'GTA COMERCIO DE MATERIAIS ELETRICOS LTDA ME'        then        36311258
when        'HIPER OBRAS LTDA'        then        36311337
when        'HJ COMERCIO E SERVIÇOS LTDA'        then        36311334
when        'IMPLEMENTOS AGRICOLAS OLIVEIRA LTDA'        then        36134634
when        'INOVAX TELEINFORMATICA LTDA'        then        36311268
when        'INSTRAMED IND.MEDICO HOSPITALAR LTDA'        then        36311358
when        'ITAGUAI COMERCIO E EMPREENDIMENTOS LTDA'        then        36311210
when        'ITALBUS CARROCERIAS DE ONIBUS LTDA'        then        36311297
when        'J. L. CONSTRUÇÕES E SERVIÇOS DE JARDINAGEM LTDA'        then        36311227
when        'JAIRO ANTONIO ZANATTA'        then        36311288
when        'JIRAUTO AUTOMOVEIS LTDA'        then        36311252
when        'JOAO APARECIDO NERI DOS SANTOS'        then        36311223
when        'JOAQUIM ALVES MARTINS'        then        36134353
when        'JOSE BENVINDO DE CARVALHO'        then        36311269
when        'JOSE DONIZETE PICOLLI'        then        36311285
when        'KCINCO CAMINHOES E ONIBUS LTDA'        then        36311249
when        'KCR INDUTRIA E COMERCIO DE EQUIPAMENTOS EIRELI-EPP'        then        36311302
when        'LAJA LTDA - ME'        then        36311271
when        'LAURINDO FERREIRA DA SILVA'        then        36311234
when        'LEISER COMERCIO CONST. E SERVIÇOS LTDA'        then        36311206
when        'LONDRIHOSP IMP E EXPORT DE PRODUTOS HOSP.'        then        36311340
when        'LOPES E SOUZA SOLUÇOES INTEGRADAS LTDA'        then        36311349
when        'M. C. RODRIGUES MAQUINAS E EQUIPAMENTOS PARA ESCRITORIO - ME'        then        36311235
when        'M. PICIANI PAZINATO COMERCIO DE MATERIAIS ELETRONICOS  - EIRELI'        then        36311305
when        'MAM LATIM AMERICA INDUSTRIA E COMERCIO DE VEI CULO'        then        36311239
when        'MAMORE MAQUINAS AGRICOLAS LTDA EPP'        then        36134714
when        'MARIA LUIZA DA SILVA-ME'        then        36311277
when        'MASCARELLO CARROCERIAS E ONIBUS LTDA'        then        36311276
when        'MASTTER MOTO COMERCIO DE VEICULO E MOTOS LTDA'        then        36311243
when        'MILANFLEX INDUSTRIA E COMERCIO DE MOVEIS E EQUIPAMENTOS LTDA'        then        36311270
when        'MILANI CONSTRUTORA DE EDIF. E TERRAPL. LDTA'        then        36311314
when        'MJ ENGENHARIA LTDA'        then        36311333
when        'MOBEN COMERCIO DE VEICULOS LTDA'        then        36311260
when        'MOVEIS CAMILA/YOKOTA E BARBOSA LTDA ME'        then        36311287
when        'MOVEIS ROMERA LTDA'        then        36311240
when        'MR TECH INFORMATICA LTDA'        then        36311347
when        'MVP ELETRODOMESTICOS E EQUIPAMENTOS EIRELI'        then        36311323
when        'NEIANDER STORCH EIRELI ME'        then        36311295
when        'NELSON SILVA & CIA LTDA'        then        36311222
when        'NFM SILVA CONSTRUÇOES EIRELI'        then        36311310
when        'NISSEY MOTORS LTDA'        then        36311278
when        'OLMI INFORMATICA LTDA - EPP'        then        36311286
when        'OLMIRO THOMAZ MARTINS'        then        36311313
when        'OLYMPUS'        then        36311244
when        'P.A.R FRANCA INFORMATICA'        then        36311339
when        'P.APOLINARIO FILHO-ME'        then        36311220
when        'PACIFICO CONSTRUTORA LTDA ME'        then        36134530
when        'PEDRO G. FERNANDES'        then        36311351
when        'PINAFO ATERRO E CASCALHO LTDA ME'        then        36311322
when        'PPS PRODUTOS PARA SAUDE LTDA EPP'        then        36311281
when        'PRIMEMED EQUIPAPENTOS LTDA'        then        36311328
when        'R K INDUSTRIA DE IMPLEMANTOS AGRICOLAS LTDA'        then        36311267
when        'RAUL ALCANTARA SILVA'        then        36311251
when        'REDNOV FERRAMENTAS LTDA'        then        36311353
when        'REPREMIG REPRESENTACAO E COMERCIO DE MINAS GERAIS'        then        36311350
when        'RODA BRASIL REPRESENTAÇOES COM E SERV LTDA EPP'        then        36311356
when        'RONALDO ADRIANO ALEXANDRINO'        then        36311250
when        'RONDOLAB DIAGNOSTICO COMERCIO E SERVIÇOS LTDA'        then        36134727
when        'RONDONIA COMERCIO DE CAMINHOES E MAQUINAS LTDA'        then        36311259
when        'ROQUE SETTE'        then        36134359
when        'ROSSATO E BERTHOLD LTDA'        then        36311272
when        'RR COMERCIO DE ELETROELETRONICOS EIRELI'        then        36311312
when        'RR LOPES EIRELI ME'        then        36311342
when        'S3 EMPREENDIMENTOS COMERCIO E LOCAÇÕES EIRELI - EPP'        then        36311283
when        'SABENAUTO COMERCIO DE VEICULO LTDA'        then        36311254
when        'SANTOS E MAYER COMERCIO DE EQUIPAMENTOS DE INFORMATICA LTDA'        then        36311261
when        'SCROCCA ELETRO ELETRONICOS EIRELI ME'        then        36311274
when        'SEC ENGENHARIA E CONSTRUTORA LTDA'        then        36134476
when        'SIDNEY DO NASCIMENTO'        then        36311324
when        'SISMED - COM E REPRESENTAÇÕES LTDA - ME'        then        36311212
when        'SISTERPEL SUPRIMENTOS PARA INFORMÁTICA LTDA ME'        then        36311284
when        'SOLUÇÃO PLANEJAMENTO E COMERCIO LTDA'        then        36311275
when        'SOMBRA COM. SERVIÇSO LTDA ME'        then        36311315
when        'STIGMA COMERCIAL LTDA'        then        36311209
when        'SUPER MOTO . COM DE MOTOS E PEÇAS LTDA ME'        then        36311238
when        'T. R. REFRIGERAÇÃO LTDA - ME'        then        36311229
when        'TECHMED ENGENHARIA HOSPITALAR LTDA'        then        36134657
when        'TERRA FORTE LTDA ME'        then        36311291
when        'THACOL COMERCIO LTDA - ME'        then        36134494
when        'TITO STIPP MEE'        then        36311218
when        'TORK SUL COMERCIO DE PECAS MARQ E SERV LTDA'        then        36311201
when        'TOYOTA DO BRASIL LTDA'        then        36311294
when        'TRANSMAC LOCACOES LTDA'        then        36311343
when        'V M CONSTRUTORA LTDA EPP'        then        36311298
when        'V.S DOS SANTOS LIVRARIA E PAPELARIA ME'        then        36311255
when        'VALE COMÉRCIO DE MOTOS LTDA'        then        36134721
when        'VENEZIA COMERCIO DE CAMINHOES LTDA CACOAL'        then        36311247
when        'VIXBOT SOLUÇÕES EM INFORMATICA LTDA ME'        then        36311303
when        'VS COSTA E CIA LTDA'        then        36311280
when        'W F DE ALMEIDA'        then        36311336
when        'W.ISMAIL E CIA LTDA - ME'        then        36311202
when        'ZICO DIAS DE PAULA  - ME'        then        36311263
 else 36067960 
 end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS fornecedor,
JSON_QUERY( (SELECT
   '36134397' as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS responsavel,
JSON_QUERY( (SELECT
 case bp.cd_situacao
when  1 then  4711
when 2 then  4712
end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS estadoConservacao,
JSON_QUERY( (SELECT
   '3227' as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS tipoComprovante,
JSON_QUERY( (SELECT
case cd_EntidadeContabil
when 1 then 2134007
when 2 then 2144353
when 3 then 2144356
when 4 then 2134004
end  as id  -- cd_entidade contabil
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS organograma,
JSON_QUERY( (SELECT
   case BP.cd_local
   when        1001        then        111585
when        1010        then        111586
when        1012        then        111587
when        2001        then        111588
when        3001        then        111589
when        3010        then        111590
when        3020        then        111591
when        3030        then        111592
when        4001        then        111593
when        5001        then        111594
when        6001        then        111595
when        7001        then        111596
when        8001        then        111597
when        9001        then        111598
when        9030        then        111599
when        20800        then        111600
else 112717
   end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS localizacaoFisica,
CASE 
    WHEN V.ds_Placa != '' THEN 'true' 
    ELSE 'false' 
END AS consomeCombustivel,
JSON_QUERY( (SELECT
   CASE 
    WHEN BP.cd_situacao = '1' THEN 'EM_USO'
    ELSE 'BAIXADO' 
        end as valor,
   CASE 
    WHEN BP.cd_situacao = 1 THEN 'EM_USO'
    ELSE 'BAIXADO' 
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
        '1983' as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS metodoDepreciacao,
JSON_QUERY(
    (SELECT
        '8' as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS moeda,
bp.vl_aquisicao as vlAquisicao,
 bp.vl_aquisicao as vlAquisicaoConvertido,
vl_depreciar as  vlDepreciavel,
'0' as vlDepreciado, --  select * from PAtrmovimentacao  cd_tipomovimento = 12
vl_saldodepreciar as saldoDepreciar,
bp.vl_atual as vlLiquidoContabil,
CASE 
    WHEN COALESCE(tb.pc_residual, 0) = 0 THEN 1 
    ELSE tb.pc_residual 
END AS taxaDepreciacaoAnual,
BP.dt_aquisicao as dtInicioDepreciacao,
bp.vl_residual as vlResidual
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS bemValor
from PATRBensPatrimoniais BP
left  join PATRVeiculo V ON V.nr_Chapa = BP.nr_chapa
left join PATRTiposBens TB ON TB.cd_tipobem = bp.cd_tipobem
left JOIN COMPFornecedores F ON F.cd_fornecedor = BP.cd_fornecedor
--join PAtrmovimentacao m on m.nr_chapa = BP.nr_chapa
where BP.cd_situacao = 1 and bp.dt_aquisicao >= ('2024-01-01 00:00:00') and cd_EntidadeContabil = 1
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

            return {
                conteudo: {
                    tipoBem: {
                        id: record.tipoBem ? parseInt(JSON.parse(record.tipoBem).id, 10) : 0
                    },
                    grupoBem: {
                        id: record.grupoBem ? JSON.parse(record.grupoBem).id : 0
                    },
                    especieBem: {
                        id: record.especieBem ? JSON.parse(record.especieBem).id : 0
                    },
                    tipoUtilizacaoBem: {
                        id:record.tipoUtilizacaoBem ? parseInt(JSON.parse(record.tipoUtilizacaoBem).id, 10) : isNonNullChain
                    },
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
                    vlLiquidoContabil:bemValor.vlLiquidoContabil,
                    taxaDepreciacaoAnual: bemValor.taxaDepreciacaoAnual || 0,
                    dtInicioDepreciacao: formatDate(bemValor.dtInicioDepreciacao) || 0,
                    vlResidual: bemValor.vlResidual || 0,
                    moeda: {
                      id: parseInt(bemValor.moeda.id),
                    }
                }
            },
            };
        });


        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }


        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const response = await fetch('https://patrimonio.betha.cloud/patrimonio-services/api/conversoes/lotes/bens', {
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
