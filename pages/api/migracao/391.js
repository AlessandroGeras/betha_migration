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
        const selectDatabaseQuery = 'USE PATRIMONIO';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select
JSON_QUERY(
(SELECT
   case TB.ds_tipobem
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
) AS tipoBem,
JSON_QUERY( 
(SELECT
 case TB.ds_tipobem
 when        'APAR. DE MEDICAO E ORIENTAÇÃO'        then        46492
when        'APAR. E EQUIP. DE COMUNICAÇÃO'        then        46493
when        'APAR. EQUIP. E UTENS. MED. ODOT. LABO E HOSPITALAR'        then        46494
when        'APAR. E EQUIP. P/ ESPORTES E DIVERSOES'        then        46495
when        'APAR. E UTENS. DOMESTICOS'        then        46496
when        'COLEÇÕES E MATERIAIS BIBLIOGRAFICOS'        then        46497
when        'EQUIP. DE MANOBRA E PATRULHAMENTO'        then        46498
when        'EQUIP. DE PROTEÇÃO, SEGURANÇA E SOCORRO'        then        46499
when        'INSTRUMENTOS MUSICAIS E ARTISTICOS'        then        46500
when        'MAQ. E EQUIP. DE NATUREZA INDUSTRIAL'        then        46501
when        'MAQ. E EQUIP. ENERGETICOS'        then        46502
when        'MAQ. E EQUIP. GRAFICOS'        then        46503
when        'EQUIP. P/ AUDIO VIDEO E FOTO'        then        46504
when        'MAQ. UTENS. E EQUIPAMENTOS DIVERSOS'        then        46505
when        'EQUIP. DE PROCESSAMENTO DE DADOS'        then        46506
when        'MAQ. INSTALAÇÕES E UTENSILIOS DE ESCRITORIO'        then        46507
when        'MAQ. FERRAMENTA E UTENSILIOS DE OFICINA'        then        46508
when        'EQUIP. E UTENSILIOS HIDRAULICOS E ELETRICOS'        then        46509
when        'MAQ. E EQUIP. AGRICOLAS E RODOVIARIOS'        then        46510
when        'MOBILIARIO EM GERAL'        then        46511
when        'VEICULOS DIVERSOS'        then        46512
when        'VEICULOS DE TRAÇÃO MECANICA'        then        46513
when        'ACESSORIOS PARA AUTOMOVEIS'        then        46514
when        'ALMOX. DE MAT. A SEREM APLICADOS EM BENS ANDAMENTO'        then        46515
when        'OUTROS MATERIAIS PERMANENTES'        then        46516
when        'EDIFICIOS - REALIZAÇÃO DE OBRAS'        then        46517
when        'TERRENOS'        then        46518
when        'INSTALAÇÕES'        then        46519
when        'CASAS E APARTAMENTOS'        then        46520
when        'RUAS'        then        46521
when        'ALMOXARIFADO DE MATERIAIS A SEREM APLICADOS EM BEN'        then        46522
when        'ESTUDOS E PROJETOS'        then        46523
when        'OBRAS EM ANDAMENTO'        then        46524
when        'PREÇAS'        then        46525
when        'BENFEITORIAS EM PRORPIEDADES DE TERCEIROS'        then        46526
when        'ESTRADAS'        then        46527
when        'OUTRAS OBRAS E INSTALAÇÕES'        then        46528
when        'PONTES'        then        46529
when        'SISTEMA DE ESGOTO E ABASTECIMENTO DE AGUA'        then        46530
when        'SISTEMA DE ABASECIMENTO DE ENERGIA'        then        46531
when        'OUTROS BENS DE USO COMUM DO POVO'        then        46532
when        'TERRENOS PUBLICOS'        then        46533
 end as id   -- criar um geral
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS grupoBem, 
JSON_QUERY((SELECT
 case bp.cd_tipobem
  when        104        then                505162
when        106        then                505163
when        108        then                505164
when        110        then                505165
when        112        then                505166
when        118        then                505167
when        122        then                505168
when        124        then                505169
when        126        then                505170
when        128        then                505171
when        130        then                505172
when        132        then                505173
when        133        then                505174
when        134        then                505175
when        135        then                505176
when        136        then                505177
when        138        then                505178
when        139        then                505179
when        140        then                505180
when        142        then                505181
when        148        then                505182
when        152        then                505183
when        199        then                505184
when        201        then                505185
when        202        then                505186
when        203        then                505187
when        206        then                505188
when        208        then                505189
when        211        then                505190
when        212        then                505191
when        213        then                505192
when        216        then                505193
when        217        then                505193
when        2003        then        505194
end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS especieBem, 
JSON_QUERY( (SELECT
case 
when bp.cd_tipobem in (201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,2003) then 4082 
  else null
  end as id    --cadastrado
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS tipoUtilizacaoBem,
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
when 1 then 2076732
when 2 then 2076743
when 3 then 2076746
when 4 then 2087643
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
 bp.vl_aquisicao as vlDepreciado, --  select * from PAtrmovimentacao  cd_tipomovimento = 12
vl_saldodepreciar as saldoDepreciar,
bp.vl_atual as vlLiquidoContabil,
tb.pc_residual as taxaDepreciacaoAnual,
BP.dt_aquisicao as dtInicioDepreciacao,
bp.vl_residual as vlResidual
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS bemValor
from PATRBensPatrimoniais BP
left  join PATRVeiculo V ON V.nr_Chapa = BP.nr_chapa
join PATRTiposBens TB ON TB.cd_tipobem = bp.cd_tipobem
left JOIN COMPFornecedores F ON F.cd_fornecedor = BP.cd_fornecedor
-- join PAtrmovimentacao m on m.nr_chapa = BP.nr_chapa
where BP.cd_situacao = 2-- and bp.dt_aquisicao < ('2024-01-01 00:00:00')-- and m.cd_tipomovto = '12'
--and tb.pc_residual is not null
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
                        id: record.tipoBem ? JSON.parse(record.tipoBem).id : 0
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

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

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
