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
(SELECT  case when bp.cd_tipobem in (201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,2003) then 5492
			  else 5491
 end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS tipoBem,
JSON_QUERY((SELECT case TB.ds_tipobem
when 'APAR. DE MEDICAO E ORIENTAÇÃO' then 48131 
when 'APAR. E EQUIP. DE COMUNICAÇÃO' then 48132 
when 'APAR. EQUIP. E UTENS. MED. ODOT. LABO E HOSPITALAR' then 48169 
when 'APAR. E EQUIP. P/ ESPORTES E DIVERSÕES' then 48194 
when 'APAR. E UTENS. DOMESTICOS' then 48195 
when 'COLEÇÕES E MATERIAIS BIBLIOGRAFICOS' then 48196 
when 'EQUIP. DE MANOBRA E PATRULHAMENTO' then 48197 
when 'EQUIP. DE PROTEÇÃO, SEGURANÇA E SOCORRO' then 48198 
when 'INSTRUMENTOS MUSICAIS E ARTISTICOS' then 48199 
when 'MAQ. E EQUIP. DE NATUREZA INDUSTRIAL' then 48200 
when 'MAQ. E EQUIP. ENERGETICOS' then 48201 
when 'MAQ. E EQUIP. GRAFICOS' then 48202 
when 'EQUIP. P/ AUDIO VIDEO E FOTO' then 48203 
when 'MAQ. UTENS. E EQUIPAMENTOS DIVERSOS' then 48204 
when 'EQUIP. DE PROCESSAMENTO DE DADOS' then 48205 
when 'MAQ. INSTALAÇÕES E UTENSILIOS DE ESCRITORIO' then 48206 
when 'MAQ. FERRAMENTA E UTENSILIOS DE OFICINA' then 48207 
when 'EQUIP. E UTENSILIOS HIDRAULICOS E ELETRICOS' then 48208 
when 'MAQ. E EQUIP. AGRICOLAS E RODOVIARIOS' then 48209 
when 'MOBILIARIO EM GERAL' then 48210 
when 'VEICULOS DIVERSOS' then 48211 
when 'VEICULOS DE TRAÇÃO MECANICA' then 48212 
when 'ACESSORIOS PARA AUTOMOVEIS' then 48213 
when 'OUTROS MATERIAIS PERMANENTES' then 48214 
when 'EDIFICIOS - REALIZAÇÃO DE OBRAS' then 48215 
when 'TERRENOS' then 48216 
when 'INSTALAÇÕES' then 48217 
when 'CASAS E APARTAMENTOS' then 48218 
when 'RUAS' then 48219 
when 'ALMOXARIFADO DE MATERIAIS A SEREM APLICADOS EM BEN' then 48220 
when 'ESTUDOS E PROJETOS' then 48221 
when 'OBRAS EM ANDAMENTO' then 48222 
when 'PRAÇAS' then 48223 
when 'BENFEITORIAS EM PRORPIEDADES DE TERCEIROS' then 48224 
when 'ESTRADAS' then 48225 
when 'OUTRAS OBRAS E INSTALAÇÕES' then 48226 
when 'PONTES' then 48227 
when 'SISTEMA DE ESGOTO E ABASTECIMENTO DE AGUA' then 48228 
when 'SISTEMA DE ABASECIMENTO DE ENERGIA' then 48229 
when 'OUTROS BENS DE USO COMUM DO POVO' then 48230 
when 'ALMOX. DE MAT. A SEREM APLICADOS EM BENS ANDAMENTO' then 48231 
when 'TERRENOS PUBLICOS' then 48232 
when 'ACESSORIOS PARA AUTOMOVEIS' then 48246 
when 'ALMOXARIFADO DE MATERIAIS A SEREM APLICADOS EM BEN' then 48247 
when 'ALMOX. DE MAT. A SEREM APLICADOS EM BENS ANDAMENTO' then 48248 
when 'APAR. DE MEDICAO E ORIENTAÇÃO' then 48249 
when 'APAR. E EQUIP. DE COMUNICAÇÃO' then 48250 
when 'APAR. E EQUIP. P/ ESPORTES E DIVERSÕES' then 48251 
when 'APAR. EQUIP. E UTENS. MED. ODOT. LABO E HOSPITALAR' then 48252 
when 'APAR. E UTENS. DOMESTICOS' then 48253 
when 'BENFEITORIAS EM PRORPIEDADES DE TERCEIROS' then 48254 
when 'CASAS E APARTAMENTOS' then 48255 
when 'COLEÇÕES E MATERIAIS BIBLIOGRAFICOS' then 48256 
when 'EDIFICIOS - REALIZAÇÃO DE OBRAS' then 48257 
when 'EQUIP. DE MANOBRA E PATRULHAMENTO' then 48258 
when 'EQUIP. DE PROCESSAMENTO DE DADOS' then 48259 
when 'EQUIP. DE PROTEÇÃO, SEGURANÇA E SOCORRO' then 48260 
when 'EQUIP. E UTENSILIOS HIDRAULICOS E ELETRICOS' then 48261 
when 'EQUIP. P/ AUDIO VIDEO E FOTO' then 48262 
when 'ESTRADAS' then 48263 
when 'ESTUDOS E PROJETOS' then 48264 
when 'INSTALAÇÕES' then 48265 
when 'INSTRUMENTOS MUSICAIS E ARTISTICOS' then 48266 
when 'MAQ. E EQUIP. AGRICOLAS E RODOVIARIOS' then 48267 
when 'MAQ. E EQUIP. DE NATUREZA INDUSTRIAL' then 48268 
when 'MAQ. E EQUIP. ENERGETICOS' then 48269 
when 'MAQ. E EQUIP. GRAFICOS' then 48270 
when 'MAQ. FERRAMENTA E UTENSILIOS DE OFICINA' then 48271 
when 'MAQ. INSTALAÇÕES E UTENSILIOS DE ESCRITORIO' then 48272 
when 'MAQ. UTENS. E EQUIPAMENTOS DIVERSOS' then 48273 
when 'MOBILIARIO EM GERAL' then 48274 
when 'OBRAS EM ANDAMENTO' then 48275 
when 'OUTRAS OBRAS E INSTALAÇÕES' then 48276 
when 'OUTROS BENS DE USO COMUM DO POVO' then 48277 
when 'OUTROS MATERIAIS PERMANENTES' then 48278 
when 'PONTES' then 48279 
when 'PRAÇAS' then 48280 
when 'RUAS' then 48281 
when 'SISTEMA DE ABASECIMENTO DE ENERGIA' then 48282 
when 'SISTEMA DE ESGOTO E ABASTECIMENTO DE AGUA' then 48283 
when 'TERRENOS' then 48284 
when 'TERRENOS PUBLICOS' then 48285 
when 'VEICULOS DE TRAÇÃO MECANICA' then 48286 
when 'VEICULOS DIVERSOS' then 48287 
when 'ACESSORIOS PARA AUTOMOVEIS' then 48288 
when 'ALMOXARIFADO DE MATERIAIS A SEREM APLICADOS EM BEN' then 48289 
when 'ALMOX. DE MAT. A SEREM APLICADOS EM BENS ANDAMENTO' then 48290 
when 'APAR. DE MEDICAO E ORIENTAÇÃO' then 48291 
when 'APAR. E EQUIP. DE COMUNICAÇÃO' then 48292 
when 'APAR. E EQUIP. P/ ESPORTES E DIVERSÕES' then 48293 
when 'APAR. EQUIP. E UTENS. MED. ODOT. LABO E HOSPITALAR' then 48294 
when 'APAR. E UTENS. DOMESTICOS' then 48295 
when 'BENFEITORIAS EM PRORPIEDADES DE TERCEIROS' then 48296 
when 'CASAS E APARTAMENTOS' then 48297 
when 'COLEÇÕES E MATERIAIS BIBLIOGRAFICOS' then 48298 
when 'EDIFICIOS - REALIZAÇÃO DE OBRAS' then 48299 
when 'EQUIP. DE MANOBRA E PATRULHAMENTO' then 48300 
when 'EQUIP. DE PROCESSAMENTO DE DADOS' then 48301 
when 'EQUIP. DE PROTEÇÃO, SEGURANÇA E SOCORRO' then 48302 
when 'EQUIP. E UTENSILIOS HIDRAULICOS E ELETRICOS' then 48303 
when 'EQUIP. P/ AUDIO VIDEO E FOTO' then 48304 
when 'ESTRADAS' then 48305 
when 'ESTUDOS E PROJETOS' then 48306 
when 'INSTALAÇÕES' then 48307 
when 'INSTRUMENTOS MUSICAIS E ARTISTICOS' then 48308 
when 'MAQ. E EQUIP. AGRICOLAS E RODOVIARIOS' then 48309 
when 'MAQ. E EQUIP. DE NATUREZA INDUSTRIAL' then 48310 
when 'MAQ. E EQUIP. ENERGETICOS' then 48311 
when 'MAQ. E EQUIP. GRAFICOS' then 48312 
when 'MAQ. FERRAMENTA E UTENSILIOS DE OFICINA' then 48313 
when 'MAQ. INSTALAÇÕES E UTENSILIOS DE ESCRITORIO' then 48314 
when 'MAQ. UTENS. E EQUIPAMENTOS DIVERSOS' then 48315 
when 'MOBILIARIO EM GERAL' then 48316 
when 'OBRAS EM ANDAMENTO' then 48317 
when 'OUTRAS OBRAS E INSTALAÇÕES' then 48318 
when 'OUTROS BENS DE USO COMUM DO POVO' then 48319 
when 'OUTROS MATERIAIS PERMANENTES' then 48320 
when 'PONTES' then 48321 
when 'PRAÇAS' then 48322 
when 'RUAS' then 48323 
when 'SISTEMA DE ABASECIMENTO DE ENERGIA' then 48324 
when 'SISTEMA DE ESGOTO E ABASTECIMENTO DE AGUA' then 48325 
when 'TERRENOS' then 48326 
when 'TERRENOS PUBLICOS' then 48327 
when 'VEICULOS DE TRAÇÃO MECANICA' then 48328 
when 'VEICULOS DIVERSOS' then 48329 
when 'APARELHOS DE MEDIÇÃO E ORIENTAÇÃO' then 48330 
when 'APARELHOS E EQUIPAMENTO DE COMUNICAÇÃO' then 48331 
when 'APARELHOS EQUI. E UTEN. MED. ODON. LOBO. E HOSP.' then 48332 
when 'EQUIPAMENTO DE PROTEÇÃO, SEGURANÇA E SOCORRO' then 48333 
when 'APARELHOS E EQUIPAMENTOS PARA ESPORTES E DIVERSOS' then 48334 
when 'APARELHOS E UTENSILIOS DOMESTICOS' then 48335 
when 'MAQUINAS E EQUIPAMENTOS ENERGETICOS' then 48337 
when 'MAQUINAS E EQUIPAMENTOS GRAFICOS' then 48338 
when 'EQUIPAMENTO PARA AUDIO, VIDEO E FOTO' then 48339 
when 'MAQUINAS UTENSILIOS E EQUIPAMENTOS DIVERSOS' then 48340 
when 'EQUIPAMENTO DE PROCESSAMENTO DE DADOS' then 48341 
when 'MAQUINAS INSTALAÇÕES E UTENSILIOS DE ESCRITORIO' then 48342 
when 'MOBILIARIA EM GERAL' then 48344 
when 'VEICULO DE TRAÇÃO MECANICA' then 48345 
when 'EDIFICIOS' then 48346 
when 'TERRENOS/GLEBAS' then 48347 
when 'OBRAS EM ANDAMENTO' then 48348 
when 'EQUIPAMENTO E UTENSILIO HIDRAULICO E ELETRICO' then 48349
when 'APAR. E EQUIP. P/ ESPORTES E DIVERSOES' then 48194
 end as id   -- criar um geral
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS grupoBem, 
JSON_QUERY((SELECT
case bp.cd_tipobem
when 104 then 519140
when 106 then 519141
when 108 then 519143
when 110 then 519142
when 112 then 519144
when 118 then 519147
when 122 then 519149
when 124 then 519151
when 126 then 519157
when 128 then 519159
when 130 then 519160
when 132 then 519161
when 133 then 519153
when 134 then 519164
when 135 then 519150
when 136 then 519178
when 138 then 519162
when 139 then 519152
when 140 then 519158
when 142 then 519165
when 148 then 519177
when 152 then 519176
when 157 then 519137
when 199 then 519168
when 201 then 519148
when 202 then 519174
when 203 then 519156
when 206 then 519138
when 208 then 519269
when 211 then 519155
when 212 then 519166
when 213 then 519169
when 216 then 519167
when 217 then 519139
when 2003 then 519175
end as id
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS especieBem, 
case when bp.cd_tipobem in (201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,2003) then JSON_QUERY((SELECT 4082 as id  FOR JSON PATH, WITHOUT_ARRAY_WRAPPER))
end AS tipoUtilizacaoBem,
JSON_QUERY((SELECT case bp.cd_tipoaquisicao
	when 2 then 8072
	else 8010
end as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS tipoAquisicao,
JSON_QUERY((SELECT case F.nm_fornecedor
when '2M COMERCIO DE VEICULOS LTDA' then 36311331
when 'A. J. ALVES E CIA LTDA - EPP' then 36311225
when 'A. PAZINATO MARINGA' then 36311355
when 'AGUIA EMPRESA DE TRANSPORTE E TURISMO LTDA - ME' then 36311216
when 'ALFA COMUNICAÇÃO VISUAL EIRELLI ME' then 36311319
when 'ALTA FREQUENCIA LTDA' then 36311348
when 'AMERICA COMERCIO DE PRODUTOS PARA INFORMATICA LTDA' then 36311320
when 'ANTONIO APARECIDO DIAS' then 36311232
when 'APFORM INDUSTRIA E COMERCIO DE MOVEIS LTDA' then 36311325
when 'ARUMAS INFORMATICAS LTDA' then 36311327
when 'AUDAX CONSTRUÇÕES E TERRAPLANAGEM EIRELI EPP' then 36311299
when 'AUTOVEMA MOTORS COMERCIO DE CAMINHONETAS LTDA' then 36134708
when 'AUTOVEMA VEICULOS LTDA'        then        36311293
when 'AUTOVEMA VEICULOS LTDA'        then        36311317
when 'BIDDEN COMERCIAL LTDA'        then        36311326
when 'BIOCAL COMERCIO E REPRESENTAÇÕES LTDA'        then        36134545
when 'BIOCAL COMERCIO E REPRESENTAÇÕES LTDA'        then        36311237
when 'BIOTECNOPLUS ASSISTENCIA TECNICA EM EQUIPAMENTOS HOSPITALARES'        then        36134688
when 'BOAS NOVAS TURISMO LTDA EPP'        then        36311242
when 'BR PRIME COM.E SERVIÇOS LTDA'        then        36311318
when 'BRUNO PETER AMORIM DE SOUZA 01212683226'        then        36311335
when 'C E CARVALHO COMERCIAL ME'        then        36311338
when 'CACOAL MOTO SERRAS LTDA.'        then        36311230
when 'CAMARA INFORMATICA LTDA - ME'        then        36311262
when 'CASA DA LAVOURA MAQUNAS E IMPLEMANTOS AGRICULAS'        then        36311264
when 'CENTRO OESTE COMERCIO IMP. E EXP. DE PROD. HOSP.'        then        36311345
when 'CICLO CAIRU LTDA'        then        36134575
when 'CIRURGICA SAO FELIPE PROT. PARA SAUDE EIRELI'        then        36311344
when 'CLAUDINEI BRITO VILA BOAS'        then        36134305
when 'CLEIDE BEATRIZ IORIS EIRELI'        then        36311311
when 'CODRASA COMÉRCIO E CONSTRUÇÕES EIRELI'        then        36311290
when 'COIMBRA IMPORTAÇÃO E EXPORTAÇÃO LTDA'        then        36311257
when 'COMERCIAL AGRICOLA CAPRI LTDA'        then        36311266
when 'COMERCIAL VANGUARDEIRA EIRELLI ME'        then        36311273
when 'COMPEX COMERCIAL LTDA'        then        36311265
when 'CONERA CONSTUTORA NOVA ERA LTDA ME'        then        36134566
when 'CONST.UMUARAMA LTDA/EGM SERV.CONTRUS.LTDA'        then        36311352
when 'CONSTRULAR MATERIAIS PARA CONSTRUÇÃO'        then        36311200
when 'CONSTRUTORA HC LTDA EPP'        then        36311289
when 'CONSTRUTORA MCB EIRELI LTDA'        then        36311341
when 'CONSTRUTORA VALTRAN LTDA'        then        36134444
when 'COVEZI CAMINHOES E ONIBUS LTDA'        then        36311321
when 'CR CONSTRUTORA E SERVIÇOS ESPECIALIZADO LTDA'        then        36311316
when 'CRONO COMERCIO E DISTRIBUIÇÃO EIRELI'        then        36311282
when 'CUSTOMIZAR DESING COMERCIO E SERVIÇOS LTDA'        then        36311329
when 'CYBER INFORMATICA LTDA ME'        then        36134490
when 'DALTO & DALTO LTDA'        then        36311301
when 'DANTASTERRA LTDA EPP'        then        36311304
when 'DARTORA & CIA LTDA'        then        36311214
when 'DENTAL MEDICA'        then        36311204
when 'DERLY S. DA SILVA METALURGICA  - ME'        then        36311245
when 'DIEGO DE SOUZA ANDRADE'        then        36311332
when 'DK INFORMATICA LTDA'        then        36311330
when 'DLB COMERCIO DE PRODUTOS DE INFORMATICA EIRELI'        then        36134700
when 'E. V. FERNANDES'        then        36311306
when 'ECS CONST COM SERV LOC EQUIPAMENTOS LTDA'        then        36311354
when 'EDIVALDO ALVES MORREIRA'        then        36311253
when 'ELIZABETE PIRES GUEDES OLIVEIRA ME'        then        36134384
when 'EMPRAL PESQUISAS LTDA'        then        36311231
when 'ERICA DE FATIMA GENTIL'        then        36311308
when 'EVALDO F.PESSOA ME'        then        36311300
when 'FLORES E BORGES LTDA'        then        36311203
when 'FOCO PROJETOS EDUCACIONAIS LTDA-ME'        then        36311279
when 'FRIMOM CONSTRUÇÕES & SERVIÇOS LDA EPP'        then        36134478
when 'G1 MOVEIS ELETRODOMESTICO LTDA -ME '        then        36311241
when 'GIL INFORMATICA LTDA'        then        36311292
when 'GOMES VEICULOS ESPECIAIS EIRELI'        then        36311296
when 'GTA COMERCIO DE MATERIAIS ELETRICOS LTDA ME'        then        36311258
when 'HIPER OBRAS LTDA'        then        36311337
when 'HJ COMERCIO E SERVIÇOS LTDA'        then        36311334
when 'IMPLEMENTOS AGRICOLAS OLIVEIRA LTDA'        then        36134634
when 'INOVAX TELEINFORMATICA LTDA'        then        36311268
when 'INSTRAMED IND.MEDICO HOSPITALAR LTDA'        then        36311358
when 'ITAGUAI COMERCIO E EMPREENDIMENTOS LTDA'        then        36311210
when 'ITALBUS CARROCERIAS DE ONIBUS LTDA'        then        36311297
when 'J. L. CONSTRUÇÕES E SERVIÇOS DE JARDINAGEM LTDA'        then        36311227
when 'JAIRO ANTONIO ZANATTA'        then        36311288
when 'JIRAUTO AUTOMOVEIS LTDA'        then        36311252
when 'JOAO APARECIDO NERI DOS SANTOS'        then        36311223
when 'JOAQUIM ALVES MARTINS'        then        36134353
when 'JOSE BENVINDO DE CARVALHO'        then        36311269
when 'JOSE DONIZETE PICOLLI'        then        36311285
when 'KCINCO CAMINHOES E ONIBUS LTDA'        then        36311249
when 'KCR INDUTRIA E COMERCIO DE EQUIPAMENTOS EIRELI-EPP'        then        36311302
when 'LAJA LTDA - ME'        then        36311271
when 'LAURINDO FERREIRA DA SILVA'        then        36311234
when 'LEISER COMERCIO CONST. E SERVIÇOS LTDA'        then        36311206
when 'LONDRIHOSP IMP E EXPORT DE PRODUTOS HOSP.'        then        36311340
when 'LOPES E SOUZA SOLUÇOES INTEGRADAS LTDA'        then        36311349
when 'M. C. RODRIGUES MAQUINAS E EQUIPAMENTOS PARA ESCRITORIO - ME'        then        36311235
when 'M. PICIANI PAZINATO COMERCIO DE MATERIAIS ELETRONICOS  - EIRELI'        then        36311305
when 'MAM LATIM AMERICA INDUSTRIA E COMERCIO DE VEI CULO'        then        36311239
when 'MAMORE MAQUINAS AGRICOLAS LTDA EPP'        then        36134714
when 'MARIA LUIZA DA SILVA-ME'        then        36311277
when 'MASCARELLO CARROCERIAS E ONIBUS LTDA'        then        36311276
when 'MASTTER MOTO COMERCIO DE VEICULO E MOTOS LTDA'        then        36311243
when 'MILANFLEX INDUSTRIA E COMERCIO DE MOVEIS E EQUIPAMENTOS LTDA'        then        36311270
when 'MILANI CONSTRUTORA DE EDIF. E TERRAPL. LDTA'        then        36311314
when 'MJ ENGENHARIA LTDA'        then        36311333
when 'MOBEN COMERCIO DE VEICULOS LTDA'        then        36311260
when 'MOVEIS CAMILA/YOKOTA E BARBOSA LTDA ME'        then        36311287
when 'MOVEIS ROMERA LTDA'        then        36311240
when 'MR TECH INFORMATICA LTDA'        then        36311347
when 'MVP ELETRODOMESTICOS E EQUIPAMENTOS EIRELI'        then        36311323
when 'NEIANDER STORCH EIRELI ME'        then        36311295
when 'NELSON SILVA & CIA LTDA'        then        36311222
when 'NFM SILVA CONSTRUÇOES EIRELI'        then        36311310
when 'NISSEY MOTORS LTDA'        then        36311278
when 'OLMI INFORMATICA LTDA - EPP'        then        36311286
when 'OLMIRO THOMAZ MARTINS'        then        36311313
when 'OLYMPUS'        then        36311244
when 'P.A.R FRANCA INFORMATICA'        then        36311339
when 'P.APOLINARIO FILHO-ME'        then        36311220
when 'PACIFICO CONSTRUTORA LTDA ME'        then        36134530
when 'PEDRO G. FERNANDES'        then        36311351
when 'PINAFO ATERRO E CASCALHO LTDA ME'        then        36311322
when 'PPS PRODUTOS PARA SAUDE LTDA EPP'        then        36311281
when 'PRIMEMED EQUIPAPENTOS LTDA'        then        36311328
when 'R K INDUSTRIA DE IMPLEMANTOS AGRICOLAS LTDA'        then        36311267
when 'RAUL ALCANTARA SILVA'        then        36311251
when 'REDNOV FERRAMENTAS LTDA'        then        36311353
when 'REPREMIG REPRESENTACAO E COMERCIO DE MINAS GERAIS'        then        36311350
when 'RODA BRASIL REPRESENTAÇOES COM E SERV LTDA EPP'        then        36311356
when 'RONALDO ADRIANO ALEXANDRINO'        then        36311250
when 'RONDOLAB DIAGNOSTICO COMERCIO E SERVIÇOS LTDA'        then        36134727
when 'RONDONIA COMERCIO DE CAMINHOES E MAQUINAS LTDA'        then        36311259
when 'ROQUE SETTE'        then        36134359
when 'ROSSATO E BERTHOLD LTDA'        then        36311272
when 'RR COMERCIO DE ELETROELETRONICOS EIRELI'        then        36311312
when 'RR LOPES EIRELI ME'        then        36311342
when 'S3 EMPREENDIMENTOS COMERCIO E LOCAÇÕES EIRELI - EPP'        then        36311283
when 'SABENAUTO COMERCIO DE VEICULO LTDA'        then        36311254
when 'SANTOS E MAYER COMERCIO DE EQUIPAMENTOS DE INFORMATICA LTDA'        then        36311261
when 'SCROCCA ELETRO ELETRONICOS EIRELI ME'        then        36311274
when 'SEC ENGENHARIA E CONSTRUTORA LTDA'        then        36134476
when 'SIDNEY DO NASCIMENTO'        then        36311324
when 'SISMED - COM E REPRESENTAÇÕES LTDA - ME'        then        36311212
when 'SISTERPEL SUPRIMENTOS PARA INFORMÁTICA LTDA ME'        then        36311284
when 'SOLUÇÃO PLANEJAMENTO E COMERCIO LTDA'        then        36311275
when 'SOMBRA COM. SERVIÇSO LTDA ME'        then        36311315
when 'STIGMA COMERCIAL LTDA'        then        36311209
when 'SUPER MOTO . COM DE MOTOS E PEÇAS LTDA ME'        then        36311238
when 'T. R. REFRIGERAÇÃO LTDA - ME' then 36311229
when 'TECHMED ENGENHARIA HOSPITALAR LTDA' then 36134657
when 'TERRA FORTE LTDA ME' then 36311291
when 'THACOL COMERCIO LTDA - ME' then 36134494
when 'TITO STIPP MEE' then 36311218
when 'TORK SUL COMERCIO DE PECAS MARQ E SERV LTDA' then 36311201
when 'TOYOTA DO BRASIL LTDA' then 36311294
when 'TRANSMAC LOCACOES LTDA' then 36311343
when 'V M CONSTRUTORA LTDA EPP' then 36311298
when 'V.S DOS SANTOS LIVRARIA E PAPELARIA ME' then 36311255
when 'VALE COMÉRCIO DE MOTOS LTDA' then 36134721
when 'VENEZIA COMERCIO DE CAMINHOES LTDA CACOAL' then 36311247
when 'VIXBOT SOLUÇÕES EM INFORMATICA LTDA ME' then 36311303
when 'VS COSTA E CIA LTDA' then 36311280
when 'W F DE ALMEIDA' then 36311336
when 'W.ISMAIL E CIA LTDA - ME' then 36311202
when 'ZICO DIAS DE PAULA  - ME' then 36311263
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
when 1001 then 111585
when 1010 then 111586
when 1012 then 111587
when 2001 then 111588
when 3001 then 111589
when 3010 then 111590
when 3020 then 111591
when 3030 then 111592
when 4001 then 111593
when 5001 then 111594
when 6001 then 111595
when 7001 then 111596
when 8001 then 111597
when 9001 then 111598
when 9030 then 111599
when 20800 then 111600
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
JSON_QUERY((SELECT JSON_QUERY((SELECT '-1' as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS metodoDepreciacao,
				   JSON_QUERY((SELECT '8' as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS moeda,
bp.vl_aquisicao as vlAquisicao,
 bp.vl_aquisicao as vlAquisicaoConvertido,
  BP.vl_aquisicao as vlDepreciavel, --vlAquisicao - vlresidual - vldepreciado
'0' as vlDepreciado, -- vl_depreciacao
vl_saldodepreciar as saldoDepreciar,
bp.vl_atual as vlLiquidoContabil,
case TB.ds_tipobem when 'APAR. DE MEDICAO E ORIENTAÇÃO' then 10.0
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
join PATRTiposBens TB ON TB.cd_tipobem = bp.cd_tipobem
left JOIN COMPFornecedores F ON F.cd_fornecedor = BP.cd_fornecedor
where BP.cd_situacao = 1 and bp.dt_aquisicao < ('2024-01-01 00:00:00') and BP.cd_EntidadeContabil = 1 
--and BP.vl_anterior = 0 -- and pc_residual > 0   --sem depreciação
and bp.nr_chapa in  (270,271,272,273,274,275,276,277,983,984,1239,1413,1519,1548,1554,2142,2143,2144,2145,2146,2147,2148,2149,2150,2151,
3491,3492,3493,4437,4640,4775,4808,4919,4990,4991,4992,5012,5073,5074,5076,5142,5143,5144,5145,5220,5227,5228,5229,
5230,5231,5232,5240,5259,5862,6028,6033,6071,6072,6078,6083,6121,6122,6123,6124,6170,6289,6303,6305,6307,6308,6314,
6322,6323,6328,6329,6464,6465,6466,6467,6468,6471,6472,6473,6474,6477 )
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Função para formatar a data
        const formatDate = (dateStr) => {
            if (!dateStr) return null;
            const date = new Date(dateStr);
            return date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        };

        // Transformar os dados
        const transformedData = resultData // Filtrar registros onde tipoUtilizacaoBem é null
            .map(record => {
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
                        tipoUtilizacaoBem: record.tipoUtilizacaoBem
                            ? { id: parseInt(JSON.parse(record.tipoUtilizacaoBem).id, 10) }
                            : null,
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
                            taxaDepreciacaoAnual: bemValor.taxaDepreciacaoAnual || 0,
                            dtInicioDepreciacao: formatDate(bemValor.dtInicioDepreciacao) || 0,
                            vlResidual: bemValor.vlResidual || 0,
                            moeda: {
                                id: parseInt(bemValor.moeda.id),
                            }
                        }
                    }
                };
            });

        // Dividir os dados em chunks de 50 e enviar
        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);

            // Salvar os dados enviados em log
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);

         try {
                // Enviar o chunk para a API
                const response = await fetch('https://patrimonio.betha.cloud/patrimonio-services/api/conversoes/lotes/bens', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                    },
                    body: JSON.stringify(chunk)
                });

                const responseData = await response.json();

                // Salvar o retorno da API em log
                const reportFileName = `report_${i / chunkSize + 1}.json`;
                fs.writeFileSync(reportFileName, JSON.stringify(responseData, null, 2));
                console.log(`Retorno do envio salvo em ${reportFileName}`);

            } catch (error) {
                console.error(`Erro ao enviar o lote ${i / chunkSize + 1}:`, error);
            }
        }

    } catch (error) {
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        await sql.close();
    }
}

// Chamar a função principal
main();
