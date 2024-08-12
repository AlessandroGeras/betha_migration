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
            select
JSON_QUERY(
(SELECT
        case 
         when cf.aa_cotacao =        2013        and cf.nr_cotacao =        1        then        489159
 when cf.aa_cotacao =        2013        and cf.nr_cotacao =        2        then        489160
 when cf.aa_cotacao =        2013        and cf.nr_cotacao =        3        then        489161
 when cf.aa_cotacao =        2013        and cf.nr_cotacao =        4        then        489162
 when cf.aa_cotacao =        2013        and cf.nr_cotacao =        5        then        489163
 when cf.aa_cotacao =        2014        and cf.nr_cotacao =        1        then        489164
 when cf.aa_cotacao =        2017        and cf.nr_cotacao =        1        then        489165
 when cf.aa_cotacao =        2024        and cf.nr_cotacao =        1        then        489166
        end as id
                        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS cotacao,
JSON_QUERY(
(SELECT
case f.nm_fornecedor
                when        'CARTORIO BRETAS'        then        36006604
when        'RONDONIA OXIGENIO LTDA'        then        36067959
when        'MUNICIPIO DE PARECIS'        then        36067960
when        'SUCKEL E SUCKEL LTDA'        then        36067963
when        'FABRILAR IND. COM. DE MOVEIS LTDA'        then        36067965
when        'AGUA POTAVEL COM. DE PROC. HIDROCNETICO'        then        36067968
when        'EXTINSEG COM. E RECARGAS DE EXTINTORES'        then        36067970
when        'COUTO FRIOREFIGERACOES LTDA'        then        36067972
when        'J. F. COMERCIO E REP DE PROD MED E HOSP'        then        36067974
when        'DM BARBOSA E TEIXEIRA LTDA-ME'        then        36067976
when        'J.R.C. MIRANDA LTDA ME'        then        36067978
when        'NILSON BIERGER MEIRELES'        then        36067980
when        'EQUIPO MEDICA COMERCIAL LTDA'        then        36067981
when        'MILTON ALVES DE ALMEIDA FILHO'        then        36067982
when        'JEREMIAS SANTOS BITTENCOURT'        then        36067984
when        'ALEXANDRO FERNANDES DE OLIVEIRA'        then        36067988
when        'C. R. OLIVEIRA SORVETES ME'        then        36067989
when        'VALDEMAR BELLEI ME'        then        36067991
when        'JUAREZ ROBERTO DE ANDRADE'        then        36067993
when        'LAUTERTE & LAUTERTE LTDA ME'        then        36067996
when        'BAMBOLE B. PRESENTES E PAPELARIA LTDA'        then        36067998
when        'SIRLEY DE F. S. DUARTE XAVIER ME'        then        36068000
when        'JURANDIR RODRIGUES DE MORAIS'        then        36068002
when        'CELIA FERREIRA BRESCIANI PENHA ME'        then        36068005
when        'CLAUDINO BISPO DOS SANTOS'        then        36068007
when        'EUCATUR EMPRESA UNIAO CASCAVEL'        then        36068009
when        'EMPRESA COLIBRI TRANSPORTES LTDA'        then        36068011
when        'FURP FUNDACAO PARA REMEDIOS POPULARES'        then        36068014
when        'ELION BARRETO DE ARAUJO'        then        36068015
when        'TERRARADA MAQUINAS AGRICOLAS LTDA'        then        36068018
when        'LUCIANA DE OLIVEIRA PINTO'        then        36068021
when        'EGMAR APARECIDO FERREIRA'        then        36068023
when        'FRANCISCO CORNELIO ALVES DE LIMA'        then        36068026
when        'BR DIESEL BOMBA INJETORA LTDA ME'        then        36068028
when        'R H S COMERCIO & REPRESENTACOES LTDA'        then        36068031
when        'EMPLAKE - INDUSTRIA E COM. PLACAS SERV.'        then        36068033
when        'ALMIR FERREIRA DA CRUZ'        then        36068035
when        'PICA PAU MOTOS LTDA'        then        36068040
when        'FABIO RODRIGUES DOS SANTOS ME'        then        36068041
when        'EURIDES TEIXEIRA DA SILVA'        then        36068043
when        'GILVAN JOSE DA COSTA'        then        36068044
when        'VERA FERREIRA DE OLIVEIRA'        then        36068047
when        'JOSE DA SILVA PEDROSO'        then        36068048
when        'PORTAL PUBLICO INFORMATICA LTDA'        then        36068050
when        'ADEMIR BRASIL CRIVELLI'        then        36068052
when        'WILMON MARCOS JUNIOR'        then        36068054
when        'SIMONE CRISTINA DA ROCHA HUPPERS'        then        36068057
when        'COMERCIAL DE UTIL.DOMEST. DE RONDONIA'        then        36068059
when        'ARCA ENGENHARIA E COMERCIO LTDA'        then        36068061
when        'REGINALDO GONCALVES DE OLIVEIRA'        then        36068062
when        'RECONDICIONADORA DE PNEUS CELMO LTDA'        then        36068065
when        'MARCIA OTTO BARRIENTOS ME'        then        36068067
when        'IZAQUE ALVES'        then        36068069
when        'COMERCIO DE PNEUS ALMEIDA LTDA'        then        36068070
when        'LOURDES FERNANDES PEREIRA'        then        36068072
when        'AXIAL ENGENHARIA E CONSTRUCOES LTDA'        then        36068076
when        'SALVADOR RODRIGUES DE CARVALHO'        then        36068077
when        'CLINICA DE IMAGEM E DIAG. MAE DE DEUS'        then        36068079
when        'LABNORTE PRODUTOS E EQUIPAMENTOS LTDA'        then        36068081
when        'PAPELARIA E LIVRARIA TREVO LTDA'        then        36068083
when        'W. J. DE LIMA'        then        36068084
when        'PARAUTO AUTO PECAS LTDA'        then        36068086
when        'POSTO DE MOLAS J. LAZAROTTO LTDA ME'        then        36068088
when        'CONST.E PREST,  SERV. ROCHA E SANTOS LTDA'        then        36068092
when        'MOVEIS GAZIN LTDA'        then        36068093
when        'TBM - TERRAPLANAGEM BORGES E MECANICA LA'        then        36068095
when        'J NEVES & OLIVEIRA LTDA'        then        36068097
when        'ADEMAR LINO CAETANO'        then        36068099
when        'JADER NORTE MOTORES LTDA'        then        36068100
when        'POLARES MOTO CENTER LTDA'        then        36068102
when        'COMERCIO DE ALIMENTOS EXTRA LTDA-MEE'        then        36133606
when        'COM. E INSTALADORA DE ENERGIA PARECIS - ME'        then        36134120
when        'CARMORAES - LTDA'        then        36134156
when        'LUTERO ROSA DO PARAISO'        then        36134157
when        'GENI VIEIRA DA SILVA'        then        36134158
when        'A. ANTUNES MACIEL - ME'        then        36134159
when        'VALMIR DIAS DA SILVA'        then        36134160
when        'MORCEGÃO MOTO PEÇAS LTDA'        then        36134161
when        'LUIZ AMARAL DE BRITO'        then        36134162
when        'SEBASTIÃO TEIXEIRA ABRANTES'        then        36134163
when        'GILDA MATOS PEREIRA'        then        36134164
when        'CRISTINA STRELON HAMMER'        then        36134165
when        'HELIO EGIDIO DA SILVA'        then        36134166
when        'WESP FERREIRA DOS SANTOS'        then        36134167
when        'ENERGISA RONDÔNIA- DISTRIBUIDORA DE ENERGIA S.A'        then        36134168
when        'OI S/A EM RECUPERAÇÃO JUDICIAL'        then        36134169
when        'SERGIO LEÃO DE ARAUJO'        then        36134170
when        'DEPARTAMENTO ESTADUAL DE TRANSITO DO ESTADO DE RONDÔNIA- DETRAN/RO'        then        36134171
when        'MARCELO JUNIOR BLASI'        then        36134172
when        'COMPANHIA DE ÁGUAS E ESGOTOS DE RONDÔNIA- CAERD'        then        36134173
when        'JOCELAINE DA LUZ FONSECA CARDOSO-ME'        then        36134174
when        'CLEUS EDELSON GONÇALVES DE ANDRADE'        then        36134175
when        'TECCHIO E SILVA LTDA'        then        36134176
when        'BANCO CREDIP S/A'        then        36134177
when        'RONDOBRÁS COM. DE PEÇAS E ACESSÓRIOS P/VEICULOS LT'        then        36134178
when        'LUNAR COMÉRCIO LTDA'        then        36134179
when        'JEDEÃO SOUZA DA SILVA - ME'        then        36134180
when        'SECRETARIA DA RECEITA FEDERAL - PASEP'        then        36134181
when        'LAURINDO BARBOSA DE SOUZA'        then        36134182
when        'VERONICA VIEIRA DA SILVA'        then        36134183
when        'SUSANA CANDIDO DA ROCHA'        then        36134184
when        'VALMIR LEMES DA SILVA SANTOS'        then        36134185
when        'JOANILTON OLIVEIRA PEREIRA'        then        36134186
when        'SECRETARIA DO TESOURO NACIOANL/CONFIN/STN'        then        36134187
when        'POSTO DE MOLAS MARINGÁ LTDA-ME'        then        36134188
when        'I N S S'        then        36134189
when        'UNIVERSAL SERVIÇOS FÚNEBRES LTDA-ME'        then        36134190
when        'PECHIM CIA LTDA-ME'        then        36134191
when        'ALEXANDRE DE MORAIS GUIMARÃES'        then        36134192
when        'GAZIN INDUSTRIA E COMERCIO DE MOVEIS E EL LTDA.'        then        36134193
when        'DISMOBRAS IMP.EXP. E DIST. DE MÓVEIS E ELTRODOM LT'        then        36134194
when        'J. J COMERCIO E SERVIÇOS LTDA-ME'        then        36134195
when        'FANA COMERCIO DE EQUIP. PARA INFORMATICA LTDA'        then        36134196
when        'CARLOS EDUARDO BARRETO ACCIOLY'        then        36134197
when        'LEIR JOSE DA SILVA'        then        36134198
when        'GUILHERME GULARTE'        then        36134199
when        'FUNDO MUNICIPAL DE SAUDE - FMS'        then        36134200
when        'CAMARA MUNICIPAL DE PARECIS'        then        36134201
when        'MECANICA TUPI LTDA - EPP'        then        36134202
when        'OSMAR TONINI DA SILVA'        then        36134203
when        'ROBERTO ROGERIO COSTA'        then        36134204
when        'SC BRINDES LTDA-ME'        then        36134205
when        'BRASIL VEICULOS COMPANHIA DE SEGUROS S/A LTDA'        then        36134206
when        'MOVETERRA  CONSTRUÇÕES E TERRAPLANAGEM LTDA-ME'        then        36134207
when        'ELIANE FRANCO DE OLIVEIRA LIMA'        then        36134208
when        'TATIANE SOUZA ROCHA'        then        36134209
when        'SILVA E CAVALCANTE COMERCIO DE MAT. P/ CONST. LTDA'        then        36134210
when        'MADEREIRA ANDRES LTDA-ME'        then        36134211
when        'E. DE OLIVEIRA-ME'        then        36134212
when        'MARIA NILVA CARDOSO CANDIDO'        then        36134213
when        'NISES MARILDA TRAVAIANI BERNADELI'        then        36134214
when        'EUZEBIO & SANTIAGO LTDA-ME'        then        36134215
when        'EMIR RODRIGUES FILHO'        then        36134216
when        'CONSTRUTORA E TERRAPLANAGEM LV LTDA'        then        36134217
when        'UELÇO CONTADINE VIEIRA'        then        36134218
when        'ANA PAULA GOMES DASILVA'        then        36134219
when        'DESKTOP TECNOLOGIA LTDA-ME'        then        36134220
when        'PROINFO- COMERCIO E SERVIÇOS PARA INFORMATICA LTDA'        then        36134221
when        'R. DOMINGOS DE LIMA ME'        then        36134222
when        'ODILIA DE SOUZA OLIVEIRA-ME'        then        36134223
when        'DELMIRO MOURA CESTARI - ME'        then        36134224
when        'HILGERT & CIA LTDA'        then        36134225
when        'CIMOPAR MOVEIS LTDA'        then        36134226
when        'ZAMIR LUIZ'        then        36134227
when        'PONTES & MATHEUS LTDA'        then        36134229
when        'RICCI LAMINAÇÃO E TRANSPORTE LTDA-ME'        then        36134231
when        'VIEIRA & RANITE LTDA'        then        36134232
when        'MARIA QUELIS DE BRITO'        then        36134233
when        'CLEUSA MENDES DE SOUZA'        then        36134234
when        'CORTY & CORTY LTDA-ME'        then        36134235
when        'COPELUB COM DE PEÇAS E LUBRIFICANTES ME'        then        36134236
when        'M F DE O COSTA ME'        then        36134237
when        'METALUGICA E VIDRAÇARIA FAZ COM FERRO LTDA EPP'        then        36134238
when        'KLEIN PINTO BARRETO ME'        then        36134239
when        'J S DE AGUIAR MERCADO ME'        then        36134240
when        'FABIO XAVIER VALENTIM'        then        36134241
when        'ASSOSSIAÇAO RADIO COMUNITARIA ANTENA 1 FM'        then        36134242
when        'VICENTE FRANCISCO MONTELO'        then        36134243
when        'IVONE OLIVEIRA SANTOS DUARTE'        then        36134244
when        'ARON-ASSOCIACAO RONDONIENSE DE MUNICIPIO'        then        36134245
when        'DANIEL ROSA DA SILVA'        then        36134246
when        'CELINO JOSE DE ANDRADE'        then        36134247
when        'INDUSTRIA E COMERCIO DE MOVEIS PB LTDA ME'        then        36134248
when        'WILSON R. DA SILVA ME RODOVIDROS'        then        36134249
when        'ZEANI DE CAMPOS VELOSO ME'        then        36134250
when        'A BOCA DISCOS E FITAS LTDA ME'        then        36134251
when        'IRINEU DA SILVA TECIDOS ME'        then        36134252
when        'CELESTE REDIVO'        then        36134253
when        'MÁRIO RAMÃO ASPETT COTT'        then        36134254
when        'PINTO E SILVA COMÉRCIO LTDA'        then        36134255
when        'M. F. MONTIBELLER - ME'        then        36134256
when        'TERRAPLANAGEM PARECIS LTDA - EPP'        then        36134257
when        'CNM - CONFEDERAÇÃO NACIONAL DE MUNICIPIOS'        then        36134258
when        'UNIÃO DOS DIRIGENTES M. DE EDUCAÇÃO RO-UNDIME'        then        36134259
when        'AMARILDO CARDOSO RIBEIRO'        then        36134260
when        'MARCO TULIO SANTOS DUARTE'        then        36134261
when        'EDUARDO SIQUEIRA DE SOUZA'        then        36134262
when        'AGNALDO FELISBERTO BATISTA'        then        36134263
when        'MARIA JOSÉ DE SOUZA REIS'        then        36134264
when        'NEUZA HOFFMAN'        then        36134265
when        'MARCIA NEVES DE ALMEIDA'        then        36134266
when        'SOLANGE MAZUTTI'        then        36134267
when        'DIARIO OFICIAL DO ESTADO E OUTROS'        then        36134268
when        'IRMA HAMMER BERGER'        then        36134269
when        'GRAZIELI DOS SANTOS DE LIMA'        then        36134270
when        'TRANSPORTES SÃO CRISTOVÃO LTDA'        then        36134271
when        'WR TRANSPORTES LTDA ME'        then        36134272
when        'VALDIR ALVES CANDIDO'        then        36134273
when        'SECRETARIA DE  ESTADO DO DESENVOLVIMENTO AMB.'        then        36134274
when        'J. M. COMERCIO DE PRODUTOS AGROPECUARIOS LTDA'        then        36134275
when        'J. EUGENIO FUZARI ME'        then        36134276
when        'CHARLENE PNEUS'        then        36134277
when        'R. DE SOUZA CONSTRUÇÕES,  TERRAPLANAGEM E TRANSPORT'        then        36134278
when        'REFRIGAS REFRIGERAÇÃO LTDA ME'        then        36134279
when        'ASTC-ASSOCIAÇÃO DOS SERVIDORES DO TRIBUNAL DE CONT'        then        36134280
when        'VALDEVINO LISBOA DE SOUZA'        then        36134281
when        'ACETRON'        then        36134282
when        'HELENITO BARRETO PINTO JUNIOR'        then        36134283
when        'DEVANI LOPES PEREIRA'        then        36134284
when        'CLAUDIA BARCELOS DE LIMA'        then        36134285
when        'QUELI CRISTINA AGUIAR SILVA BARBOSA'        then        36134286
when        'I. N. RIBEIRO KUSS - ME'        then        36134287
when        'SUGIFER MATERIAIS PARA CONSTRUÇÃO LTDA'        then        36134288
when        'ASSOCIAÇÃO RURAL DE PARECIS - ARPA'        then        36134290
when        'TIGRAO MATERIAIS PARA CONSTRUÇÃO LTDA'        then        36134291
when        'MEGA VEICULOS LTDA'        then        36134292
when        'C R DOS SANTOS  SUAVE ME'        then        36134293
when        'BENEDITO SOARES'        then        36134294
when        'SANTOS E SANTOS COMERCIO DE PEÇAS E BOR. LTDA'        then        36134295
when        'ITA TRATORES LTDA ME'        then        36134296
when        'GOVERNO DO ESTADO DE RONDONIA - DEOSP-RO'        then        36134297
when        'O BARATÃO UTILIDADES DOMÉSTICAS LTDA'        then        36134298
when        'MERCADO NOVA VIDA LTDA ME'        then        36134299
when        'REDE BRASILEIRA DE PUBLICAÇÕES DE ATOS OF. LTDA-EP'        then        36134300
when        'RODRIGUES E LIMA LTDA ME'        then        36134301
when        'FERNANDES E SALAME ME'        then        36134302
when        'ANDRADE E VICENTE LTDA'        then        36134303
when        'EMPRESA BRAS. DE CORREIOS E TELEGRAFOS'        then        36134304
when        'CLAUDINEI BRITO VILA BOAS'        then        36134305
when        'BORGES E PAIVA LTDA ME'        then        36134306
when        'GUAPORE MAQUINAS E EQUIPAMENTOS LTDA'        then        36134307
when        'CLEUS HUMBERTO G. DE ANDRADE'        then        36134308
when        'PAULO FIGUEIREDO CALDEIRA'        then        36134309
when        'A. R. CONSTRUTORA LTDA ME'        then        36134310
when        'ANA BRAULINA PINHO'        then        36134311
when        'REGINALDO GIL DA SILVA'        then        36134312
when        'EDITORA DIARIO DA AMAZONIA LTDA'        then        36134313
when        'PETROCOSTA COMERCIO DE COMBUSTIVEL LTDA'        then        36134314
when        'ADELINA AIOAGUI DA SILVA'        then        36134315
when        'NILTON DA SILVA FERREIRA  - ME'        then        36134316
when        'ALBINO DA SILVA RIBEIRO'        then        36134317
when        'JOAQUIM PEDRO ALEXANDRINO NETO'        then        36134318
when        'MARINALVA DA SILVA PEREIRA'        then        36134319
when        'JULIANA ALVES SALOMAO'        then        36134320
when        'RUTE CEZARIO DE SOUZA'        then        36134321
when        'A R DE BARROS ELER ME'        then        36134322
when        'FRANCIELE SIMINHUK'        then        36134323
when        'PELSERVICE PEÇAS E SERVIÇOS LTDA'        then        36134324
when        'L F IMPORTS LTDA'        then        36134325
when        'CLEBER BRESSANI DOS SANTOS'        then        36134326
when        'GMR ESPORTES LTDA ME'        then        36134327
when        'APP CANDIDO PORTINARI / PROINFANTIL'        then        36134328
when        'JANE HONORATO DE FREITAS'        then        36134329
when        'PAULO GERALDO PEREIRA'        then        36134330
when        'SEBASTIAO DE FREITAS'        then        36134331
when        'OLMIRO THOMAZ MARTINS - ME'        then        36134332
when        'ANTONIO DOMINGUES RAMOS - ME'        then        36134333
when        'JOSMIR SOARES DE AGUIAR'        then        36134334
when        'PAULO CESAR DA SILVA'        then        36134335
when        'PICA PAU COMERCIO DE MOTOS DA AMOZONIA LTDA'        then        36134336
when        'ROSANGELA RODRIGUES'        then        36134337
when        'LUCIDA APARECIDA DE AZEVEDO'        then        36134338
when        'EDELSON SETTE'        then        36134339
when        'IVECO LATIN AMERICA LTDA'        then        36134340
when        'ABSOLUTA CURSOS S/S LTDA.'        then        36134341
when        'MARIA DO SOCORRO VIANA DA COSTA'        then        36134342
when        'CONSTRUTORA COSTA E COSTA LTDA - ME'        then        36134343
when        'COLADINI E COLADINI LTDA'        then        36134344
when        'VEMAQ VEICULOS E MAQUINAS LTDA'        then        36134345
when        'PORTELA E OCHIAI VEICULOS LTDA'        then        36134346
when        'MARCELO LORENÇO FERREIRA'        then        36134347
when        'MARCOS ANTONIO RODRIGUES DA CRUZ'        then        36134348
when        'GOIASTUR TRANSPORTE & TURISMO LTDA-ME'        then        36134349
when        'SISPEL SISTEMAS INTEG. DE SOFTWER E PAPELARIA LTD'        then        36134350
when        'HS COMERCIO DE PNEUS LTDA-ME'        then        36134351
when        'PREVENTIVA CONS. E ASSES. TECNICA E ADMINISTRATIVA'        then        36134352
when        'JOAQUIM ALVES MARTINS'        then        36134353
when        'PAULO CESAR BEZERRA'        then        36134354
when        'PAPELARIA PELIKANO LTDA'        then        36134355
when        'EDSON M. DE ARAUJO ME.'        then        36134356
when        'ELIONETE PROCHNOW FACHINI'        then        36134357
when        'CELSON CANDIDO DA ROCHA'        then        36134358
when        'ROQUE SETTE'        then        36134359
when        'EDIVALTO FRANCISCO DE AMORIM'        then        36134360
when        'VANDERLEIA CRUZ DE LIMA'        then        36134361
when        'MARIA APARECIDA DE AMORIM'        then        36134362
when        'DEISE APARECIDA BERNADELI'        then        36134363
when        'ROGERIO VICENTE MACHADO'        then        36134368
when        'MANOEL DE MEDEIROS'        then        36134369
when        'OLINTO ENEAS DE ALENCAR FILHO'        then        36134370
when        'ALBERTO BARTOLOMEU'        then        36134371
when        'ROSILENE TAKAHASHI BRAVO'        then        36134372
when        'PEDRO SOUZA SILVA'        then        36134373
when        'DESIVALDO FURTUNATO DOS SANTOS'        then        36134374
when        'JORGE LUIZ RAIMUNDO DE MELO'        then        36134375
when        'LISBOA & SILVA LTDA-ME'        then        36134376
when        'CONSTRUTORA VENTURIM LTDA'        then        36134377
when        'JOSEFA FERREIRA RIOS KURYANA'        then        36134378
when        'SIMONI MLAK DE SOUZA'        then        36134379
when        'APCE-ASSOC.DOS PROF.DE AUDIT.E CONTROLE EXT'        then        36134380
when        'MAX DANIEL DE CARVALHO'        then        36134381
when        'TORK SUL COMERCIO DE PEÇAS E MAQUINAS LTDA'        then        36134382
when        'KINCAS COMERCIO DE MATERIAIS P/CONTRUÇAO'        then        36134383
when        'ELIZABETE PIRES GUEDES OLIVEIRA ME'        then        36134384
when        'RETIMAR RETIFICA DE MOTORES LTDA ME'        then        36134385
when        'RONDOSAT TELERADIOCOMUNICAÇAO LTDA'        then        36134386
when        'SAGA  CONSTRUÇOES LTDA'        then        36134387
when        'REGIANE CRISTINA DOS SANTOS SOUZA'        then        36134388
when        'CONSTRUNOVA COM. DE MAT. DE CONSTRUÇAO LTDA ME'        then        36134389
when        'MARCEL SILVA MONTELO'        then        36134390
when        'JAIR PEREIRA DUARTE'        then        36134391
when        'DULCELEI DE LIMA ANDRADE'        then        36134392
when        'ADARA COMERCIO DE INFORMATICA E TECNOLOGIA LTDA ME'        then        36134393
when        'FREDERICO ANTONIO AUS VALLALVA'        then        36134394
when        'FERNANDO MACHADO DA SILVA'        then        36134395
when        'CLETO APOLINARIO DA CRUZ'        then        36134396
when        'MARCONDES DE CARVALHO'        then        36134397
when        'COSTA E COSTA COMERCIO LTDA ME'        then        36134398
when        'MIRIAN QUIRINO DA SILVA'        then        36134399
when        'ALESSANDRO AGUIAR DA SILVA'        then        36134400
when        'EURICO DOS SANTOS'        then        36134401
when        'ADAL VEICULOS LTDA'        then        36134402
when        'CONSTRUTURA GLOBO LTDA'        then        36134403
when        'ROLAO COM.MATERIAL DE CONSTRUÇAO LTDA'        then        36134404
when        'LILIAN RODRIGUES ANTUNES'        then        36134405
when        'LUIZ ANTONIO DE OLIVEIRA'        then        36134406
when        'VANDERLUCIO DA SILVA'        then        36134407
when        'JOSE & MORAIS LTDA ME'        then        36134408
when        'PAS PROJETO ASSESSORIA E SISTEMA LTDA'        then        36134409
when        'EGMAR APARECIDO FERREIRA'        then        36134410
when        'MARCIA SANTOS LIMA SOUZA'        then        36134411
when        'D F DE SOUZA OLIVEIRA & CIA LTDA ME'        then        36134412
when        'R. DE BRITO & CIA LTDA ME'        then        36134413
when        'PAPELARIA LUPI LTDA'        then        36134414
when        'IMPLEMENTOS AGRICOLAS ROLIM LTDA'        then        36134415
when        'DIEGO DE SOUZA ANDRADE CONTABILIDADE ME'        then        36134416
when        'ALBERTO SONA NETO INFORMATICA ME'        then        36134417
when        'JOICE POLIANE MERCLY DE ANDRADE'        then        36134418
when        'SEBASTIAO VIEIRA DA COSTA'        then        36134419
when        'RONDONORTE COM.DE PEÇAS E ACESSORIOS AUTOMOTIVOS'        then        36134420
when        'NEIDE CORREIA B. TESCH'        then        36134422
when        'D  MARCA COMERCIO DE ACESSORIOS PARA INFORMATICA'        then        36134423
when        'MACHADO & LOPES TRANSPORTES E EXCURSOES LTDA ME'        then        36134424
when        'CARDOSO E CASTAGNA E FIM LTDA - ME'        then        36134425
when        'COMERCIAL DE ARMARINHOS TOTAL LTDA ME'        then        36134426
when        'EDER PEREIRA DE LIMA'        then        36134427
when        'VANTUIL RODRIGUES DE MORAIS'        then        36134428
when        'CONSTRUTORA PAG LTDA - EPP'        then        36134429
when        'RONDOTUBOS ARTEFATOS DE CIMENTO LTDA-ME'        then        36134430
when        'V. BORSATO ME'        then        36134431
when        'DUDA ELETRO LTDA ME'        then        36134432
when        'W M DE OLIVEIRA INFORMATICA'        then        36134433
when        'PARECIS MATERIAIS PARA CONSTRUÇAO LTDA'        then        36134434
when        'MODELO COMERCIO DE MATERIAIS DE CONST.LTDA ME'        then        36134436
when        'LUIZ MASSARO MATSUI'        then        36134437
when        'LILIAN OLIVEIRA GERONIMO'        then        36134438
when        'CORPO DE BOMBEIROS MILITAR DO ESTADO'        then        36134439
when        'ROXANE FERRETO LORENZON'        then        36134440
when        'AUTO TRACTOR LTDA EPP'        then        36134441
when        'MR DOS SANTOS COMÉRCIO DISTRIBUIDOR E SEERVIÇOS LTDA ME'        then        36134442
when        'C.M COMÉRCIO SERVIÇOS E CONSTRUÇÕES LTDA ME'        then        36134443
when        'CONSTRUTORA VALTRAN LTDA'        then        36134444
when        'ALBERTO FREITA SILVA'        then        36134445
when        'LOJAS TROPICAL E REFRIGERAÇÃO LTDA'        then        36134446
when        'RONDERSON REIS DE OLIVEIRA'        then        36134447
when        'CONSTRUTORA TERRA LTDA'        then        36134448
when        'SANTANA & SOUZA TERRAPLANAGEM LTDA ME'        then        36134449
when        'PALMIERI 7 CIA LTDA EPP'        then        36134450
when        'VITALLY FARMÁCIA E MANIPULAÇÃO LTDA ME'        then        36134451
when        'JOÃO CARLOS ANACLETO'        then        36134452
when        'D PRESS EDITORA E GRÁFICA LDA EPP'        then        36134453
when        'MANOEL DA SILVA EIRELI ME'        then        36134454
when        'ALPHA ASSESSORIA & CONSULTORIA LTDA ME'        then        36134455
when        'MEDICALCENTER DISTRIBUIDORA DE MEDICAMENTOS EIRELI - EPP'        then        36134456
when        'COVAN COMERCIO VAREJISTA E ATACADISTA DO NORTE LTDA'        then        36134457
when        'ORTOMED PRODUTOS E SERVIÇOS HOSPITALARES LTDA EPP'        then        36134458
when        'EQUILÍBRIO COMERCIO E REPRESENTAÇÃO EIRELI EPP'        then        36134459
when        'DENTAL MED EQUIPAMENTOS E MATERIAIS ODONTOLOGICOS E HOSPITALARES LTDA EPP'        then        36134460
when        'OXIPORTO COMÉRCIO E DISTRIBUIÇÃO DE GASES LTDA'        then        36134461
when        'DISTRIBUIDORA DE AUTO PEÇAS RONDOBRAS LTDA'        then        36134462
when        'FUNDAÇÃO DE APOIO A PESQUISA EDUCACIONAL E TECNOLÓGICA DE RONDONIA - INPRO'        then        36134463
when        'POPULAR TREINAMENTOS LTDA'        then        36134464
when        'TERGEX - CONSTRUTORA LTDA'        then        36134465
when        'C V MOREIRA EIRELI'        then        36134466
when        'INSTITUTO EXATUS LTDA ME'        then        36134467
when        'CONSTRUCERTO LTDA ME'        then        36134468
when        'R C TABALIPA LTDA ME'        then        36134469
when        'S RODRIGUES & CIA LTDA'        then        36134470
when        'CARREIRO & BICALHO CONSTRUTORA LDA ME'        then        36134471
when        'PRESERVA SOLUÇÕES LTDA ME'        then        36134472
when        'JOSE PINHEIRO FERREIRA & CIA LTDA - ME'        then        36134473
when        'J A DE OLIVEIRA ALIMENTOS LTDA EPP'        then        36134474
when        'ATECNOMED ASSISTÊNCIA E COMERCIO DE PRODUTOS HOSPITALARES LTDA ME'        then        36134475
when        'SEC ENGENHARIA E CONSTRUTORA LTDA'        then        36134476
when        'CONSTRUOURO CONSTRUÇÕES INSTALAÇÕES E SERVIÇOS LTDA EPP'        then        36134477
when        'FRIMOM CONSTRUÇÕES & SERVIÇOS LDA EPP'        then        36134478
when        'CONSTRUTORA BRAGA LTDA EPP'        then        36134479
when        'MANOEL MESSIAS DE MACEDO GOMES'        then        36134480
when        'FOX PNEUS LTDA'        then        36134481
when        'JOHEM & SCHRAMM LTDA ME'        then        36134482
when        'CARMORAES SUPERMERCADO EIRELLI ME'        then        36134483
when        'JACÓ RETIFICA DE MOTORES LTDA ME'        then        36134484
when        'DIMAM PEÇAS E SERVIÇOS LTDA'        then        36134485
when        'ANTONIO CARLOS ARGIONA DE OLIVEIRA'        then        36134486
when        'JULIO MUCHINSKI'        then        36134487
when        'RODOBENS COMINHOES RONDONIA LTDA'        then        36134489
when        'CYBER INFORMATICA LTDA ME'        then        36134490
when        'JAPURA PNEUS LTDA'        then        36134491
when        'ADRIANA CRISTINA DOS SANTOS'        then        36134492
when        'AUTO POSTO PARECIS LTDA'        then        36134493
when        'THACOL COMERCIO LTDA - ME'        then        36134494
when        'CONECTIVA ESCOLA PROFICIONALIZANTE LTDA - ME'        then        36134495
when        'ARMCO STACO S A INDUSTRIA METARLUGICA'        then        36134496
when        'EXCLUSIVA DISTRIBUIRORA DE MEDICAMENTOS LTDA'        then        36134497
when        'ELVES DIAS DE SOUZA'        then        36134498
when        'V. F. FERREIRA FREITAS DE OLIVEIRA LTDA'        then        36134499
when        'SCHREINER INDUSTRIA DE RESFRIADORES DE LEITE'        then        36134501
when        'COMERCIAL PSV LTDA'        then        36134502
when        'AUTO PEÇAS FAVALESSA LTDA ME'        then        36134503
when        'RONDOLAB COMÉRCIO E SERVIÇOS EIRELI EPP'        then        36134504
when        'D. ANTUNES DE PAULA - ME'        then        36134505
when        'NEVES & BRITO LTDA - ME'        then        36134506
when        'PILINCHA ARTEFATOS DE CIMENTO LTDA - ME'        then        36134507
when        'MP TUBOS INDUSTRIA DE CONCRETO LTDA - ME'        then        36134508
when        'ZEZITO DOS SANTOS'        then        36134509
when        'A E DA CRUZ ELER ME'        then        36134510
when        'PAPELARIA TEIXEIRA'        then        36134511
when        'IVO SIMINHUK'        then        36134512
when        'YAGO MENOZZI'        then        36134513
when        'RENACIR ATANAZIO'        then        36134514
when        'MARCOFARMA DISTIBUIDORA DE PRODUTOS FARMACEUTICOS'        then        36134515
when        'DIMASTER COMERCIO DE PRODUTOS OSPITALAR LTDA'        then        36134516
when        'PRESTOMED DISTRIBUIDORA DE PRODUTOS P/SAUDE LTDA'        then        36134517
when        'TC ATUAL COMERCIO DE MEDICAMENTOS LTDA'        then        36134518
when        'CENTERMEDI COMERCIO DE PRODUTOS HOSPITALARES LTDA'        then        36134519
when        'JOSE LUCAS VINHAL'        then        36134520
when        'NOVASUL COMERCIO DE PRODUTOS HOSPITALARES LTDA'        then        36134521
when        'MARCOS ALVES ALMEIDA'        then        36134522
when        'ALTAIR ALVES DE LIMA'        then        36134523
when        'BELISSIMA UNIFORMES E CONFECÇOES LTDA-ME'        then        36134524
when        'FERNANDA BAZONE'        then        36134525
when        'MUNDIAL COMERCIO ATACADISTA DE ARMARINHOS LTDA'        then        36134526
when        'ATACADO TRADIÇÃO LTDA-ME'        then        36134527
when        'M E DE CARVALHO INDUSTRIA DE MÓVEIS ME'        then        36134528
when        'OXIACRE COMERCIO E DISTRIBUIÇÃO DE GASES LTDA ME'        then        36134529
when        'PACIFICO CONSTRUTORA LTDA ME'        then        36134530
when        'VENEZIA COMERCIO DE CAMINHOES LTDA'        then        36134531
when        'JAMARI COMERCIO E EMPREENDIMENTO LTDA EPP'        then        36134532
when        'RALLY PNEUS COMERCIO DE PNEUS E PEÇAS PARA VEICULOS LTDA'        then        36134533
when        'J.A. DOS SANTOS & CIA LTDA - ME'        then        36134534
when        'LUIS CARLOS VALENTIN DE SOUZA'        then        36134535
when        'OLITTECH COM E SERVIÇOS DE INF LTDA'        then        36134536
when        'IMEISSEN COMÉRCIO E SERVIÇOS EIRELLI ME'        then        36134537
when        'BERGUERAND & CIA LTDA - ME'        then        36134538
when        'JOÃO CARLOS CESTARI'        then        36134539
when        'MULTILUB COMERCIO DE LUBRIFICANTES LTDA'        then        36134540
when        'PEMAZA S/A'        then        36134541
when        'ALANTIS COMERCIO DE MAQUINAS E EQUIPAMENTOS LTDA'        then        36134542
when        'MOBEN COMERCIO DE VEICULO LTDA'        then        36134543
when        'J A COMERCIO DE ARMARINHOS LTDA-ME'        then        36134544
when        'BIOCAL COMERCIO E REPRESENTAÇÕES LTDA'        then        36134545
when        'COMERCIAL RONDON LTDA EPP'        then        36134546
when        'RONDONIANA COMERCIAL EIRELLI ME'        then        36134547
when        'PALLADIUM INDUSTRIA E COMERCIO DE CONFECÇOES LTDA'        then        36134549
when        'PATRICIA M. MILER - ME'        then        36134550
when        'AILTON IZIDIO DOS SANTOS'        then        36134552
when        'W&M COMERCIO DE MATERIAIS PARA CONSTRUÇAO EIRELI EPP'        then        36134553
when        'SOTREQ SA'        then        36134554
when        'ALONSO DE SOUZA'        then        36134555
when        'RODRIGO TOLOSA RICO - EPP'        then        36134556
when        'ARLINDO ANTONIO DA SILVA'        then        36134557
when        'HYPOLYTI DISTRIBUIDOR DE PRODUTOS AGROPECUARIA'        then        36134558
when        'ASSOCIAÇÃO DOS ÁRBITROS DE FUTEBOL DE ALTO ALEGRE DOS PARECIS'        then        36134559
when        'M NEVES DE SOUZA E CIA LTDA'        then        36134560
when        'COMERCIAL GRARUJA LTDA'        then        36134561
when        'APEDIA VEICULOS E PEÇAS LTDA'        then        36134562
when        'R. CAMACHIO PUBLICIDADE - ME'        then        36134563
when        'SCLAN MALHAS LTDA EPP'        then        36134564
when        'BURITI CAMINHOES LTDA'        then        36134565
when        'CONERA CONSTUTORA NOVA ERA LTDA ME'        then        36134566
when        'AUTOLUK COMERCIO DE PNEUMATICOS E PEÇAS'        then        36134567
when        'MOURAO PNEUS EIRELI - ME'        then        36134568
when        'INOVVA PRODUTOS E SERVIÇOS EIRELI - ME'        then        36134569
when        'C.P. PINTO COMERCIO DE MATERIAL HOSPITALAR'        then        36134570
when        'TOP NORTE COMERCIO DE MATERIAL MEDICO HOSPITALAR EIRELI - ME'        then        36134571
when        'JOSE SIMINHUK'        then        36134572
when        'COMERCIAL TORRES LTDA - EPP'        then        36134573
when        'FELIX & RONCONI LTDA'        then        36134574
when        'CICLO CAIRU LTDA'        then        36134575
when        'J C F MARANA ME'        then        36134576
when        'MANOEL XAVIER COTRIM'        then        36134577
when        'WALTER SOARES FALCÃO'        then        36134578
when        'GILBERTO FERREIRA GOMES'        then        36134579
when        'IZALTINO VIDOTTO'        then        36134580
when        'C. H. OLIVEIRA - ME'        then        36134581
when        'L.M.LADEIRA & CIA LTDA'        then        36134582
when        'NISSEY MOTORS JI-PARANA'        then        36134583
when        'PERUIBE COMERCIO DE PRODUTOS ELETRO ELETRONICOS LTDA'        then        36134584
when        'R.B.T COMERCIO REPRESENTAÇÕES'        then        36134585
when        'GBIM IMPORT. EXPORT.  E COMERCIALIZAÇÃO DE ACESSORIOS PARA VEICULOS LTDA'        then        36134586
when        'LAPTOP INFORMATICA E TECNOLOGIA LTDA'        then        36134587
when        'J R COMERCIO DE ELETRONICO E INFORMATICA LTDA'        then        36134588
when        'N.V. VERDE E CIA LTDA - ME'        then        36134589
when        'ELETRO MOVEIS BOM PREÇO LTDA - ME'        then        36134590
when        'FRANTELLIS COMERCIO E SERVIÇOS EIRELI EPP'        then        36134591
when        'TESCH E CASTRO LTDA-ME - ARARAS PARK'        then        36134593
when        'VALDEMAR FAVALESSA - EPP'        then        36134594
when        'ROLANDO ALENCAR GONÇALVES DE OLIVEIRA'        then        36134595
when        'LUCAS C. RUBEL - ME'        then        36134596
when        'ADRIELE SCHROEDER SCHMIDT'        then        36134597
when        'IGARATA REPRESENTAÇAO COMERCIAL LTDA'        then        36134598
when        'IVO NELI RIBEIRO KUSS'        then        36134599
when        'EDINAN MANOEL DA SILVA'        then        36134600
when        'N T LUIZE EPP'        then        36134601
when        'VALDEMIR ALVES DE ALMEIDA'        then        36134602
when        'L.E. ALMEIDA COMERCIO DE PRODUTOS MEDICOS HOSPITALAR'        then        36134603
when        'J P MARCELINO EIRELI ME'        then        36134604
when        'COMERCIAL CURURGICA RIOCLARENSE LTDA'        then        36134605
when        'COMERCIAL CURURGICA RIOCLARENSE LTDA'        then        36134606
when        'COMERCIO DE PRODUTOS FARMACEUTICOS DROGALID'        then        36134607
when        'AM MEDICAL COMERCIO DE MEDICAMENTOS E PRODUTOS HOSPITALARES LTDA'        then        36134608
when        'PRO SAUDE DISTRIBUIDORA DE MEDICAMENTO EIRELI-ME'        then        36134609
when        'FARMACE INDUSTRIA QUIMICO FARMACEUTICA CEARENCE LTDA'        then        36134610
when        'AUROBINDO PHARMA INDUSTRIA FARMACEUTICA LTDA'        then        36134611
when        'BH FARMA COMERCIO LTDA'        then        36134612
when        'CARDOSO & SILVA MEDICAMENTOS LTDA-ME'        then        36134613
when        'LIFE CENTER COMERCIO E DISTRIBUIDORA DE MEDICAMENTOS LTDA'        then        36134614
when        'GOLDENPLUS COMERCIO DE MEDICAMENTOS E PRODUTOS HOSPITALARES LTDA'        then        36134615
when        'ODONTOESTE LTDA EPP - ONDOTOESTE'        then        36134616
when        'CONSELHO DE DIREITO DA CRIANÇA E DO ADOLECENTE'        then        36134617
when        'PORTOGASES COMERCIO E DISTRIBUIÇÃO DE GASES'        then        36134618
when        'EXEMPLARMED COMERCIO E PRODUTOS HOSPITALARES LTDA - ME'        then        36134619
when        'SUPERMEDICA DISTRIB HOSPITALAR EIRELI'        then        36134620
when        'FERTISOLO COMERCIAL DE MAQUINAS E EQUIPAMENTOS LTDA'        then        36134621
when        'COMERCIAL T S LTDA-ME'        then        36134622
when        'VERA LUCIA FRANCISCA DOS SANTOS - ME'        then        36134623
when        'SILVENIA UNIFORMES LTDA EPP'        then        36134624
when        'NORTE MOTOS PEÇAS E ACESSORIOS'        then        36134625
when        'ILÇARA MARIA DE CASTRO BAILLY'        then        36134626
when        'ERAFARMA PRODUTOS PARA SAUDE EIRELI'        then        36134627
when        'TATIANA NEVES MONTIBELLER PAIVA'        then        36134628
when        'ELIEZER ROSA DO PARAISO EIRELI - ME'        then        36134629
when        'EMERSON GONÇA DA SILVA LTDA ME'        then        36134630
when        'CRIBARI CAMARGO COMUNICAÇÃO VISUAL EIRELI'        then        36134631
when        'ASTOR STAUDT COMERCIO DE PRODUTOS EDUCATIVOS'        then        36134632
when        'MAGAZINE MENEGUEL LTDA'        then        36134633
when        'IMPLEMENTOS AGRICOLAS OLIVEIRA LTDA'        then        36134634
when        'ALANA ROHDE IMPLEMENTOS AGRICOLAS - ME'        then        36134635
when        'ALEMAO COMERCIO DE MAQUINAS AGRICULAS EIRELI'        then        36134636
when        'MONICA R. DE MELLO FARIA - ME'        then        36134637
when        'ECOLIM EIRELI'        then        36134638
when        'J N DISTRIBUIDORA EIRELI - ME'        then        36134639
when        'FRAZAN E CIA LTDA'        then        36134640
when        'MBR FERNANDES - EPP'        then        36134641
when        'LOBIANCO & LIMA LTDA - ME'        then        36134642
when        'WESLEY BORGES DUARTE'        then        36134643
when        'SANTO REMEDIO COMERCIO DE PRODUTOS MEDICO-HOSPITALAR EIRELI'        then        36134644
when        'BARROS E BARROS COMERCIO DE MATERIAIS PARA CONSTRUÇÃO LTDA'        then        36134645
when        'COMPUNET INFORMATICA LTDA ME'        then        36134646
when        'M.S. DA SILVEIRA COMERCIO DE PRODUTOS FARMACEUTICO LTDA'        then        36134647
when        'ARMAZEM DOS MEDICAMENTOS EIRELLI'        then        36134648
when        'DMC DISTRIBUIDORA COMERCIO DE MEDICAMENTOS LTDA'        then        36134649
when        'OLMIR IORIS & CIA LTDA EPP'        then        36134650
when        'MAZZUTTI COMERCIO DE VEICULOS LTDA'        then        36134651
when        'VIGILANTE DA GLICISE COMERCIO DE PRODUTOS DIABETICOS EIRELI - ME'        then        36134652
when        'FERTISOLO COMERCIAL DE MAQUINAS E EQUIPAMENTOS LTDA'        then        36134653
when        'PROMAAPHA COMERCIO E DISTRIBUIÇÃO EIRELI'        then        36134654
when        'TEND TUDO PEÇAS E ACESSORIOS PARA VEICULOS EPP'        then        36134655
when        'NORTELAB PRODUTOS LABORATORIAIS EIREL'        then        36134656
when        'TECHMED ENGENHARIA HOSPITALAR LTDA'        then        36134657
when        'C. A. S. BALEEIRO'        then        36134658
when        'L. A. DE PICOLI EIRELI'        then        36134659
when        'WESLEI DE FREITAS'        then        36134660
when        'ELDORADO MATERIAIS PARA CONSTRUÇÃO EIRELI ME'        then        36134661
when        'COPEMAQUINAS COMERCIO DE PEÇAS E REPRESENTAÇÃO LTDA'        then        36134662
when        'RTM COMERCIO DE MATERIAIS PARA CONSTRUÇÃO'        then        36134663
when        'ORTOMED COMERCIO DE PRODUTOS MEDICO E HOSPITALARES EIRELI'        then        36134664
when        'EDINALDO SILVA'        then        36134665
when        'HEXIS CIENTIFICA LTDA'        then        36134666
when        'IMPERIUM COMERCIO E SERVIÇOS EIRELI - ME'        then        36134667
when        'T.C.C. DE A. FERREIRA COMERCIO E SERVIÇO'        then        36134669
when        'K 13 CONFECÇÕES LTDA EPP'        then        36134670
when        'BTM COMERCIO DE BRINDES LTDA'        then        36134671
when        'CIMCERO CONS. INTERMINIC. CENTRO LESTE DO ESTADO RO'        then        36134672
when        'NBB COMERCIO DE EQUIPAMENTOS DE INFORMATICA LTDA ME'        then        36134673
when        'M R GONSALVES COMERCIO EIRELI ME'        then        36134674
when        'BRS SERVIÇOS DE MONTAGEM DE ESTRUTURAS EIRELI'        then        36134675
when        'FORMANORTE COMERCIO E MANIPULAÇÃO DE MEDICAMENTOS LTDA'        then        36134676
when        'I. C. LEMES DA SILVA'        then        36134677
when        'MEDICAL COMERCIO DE COSMETICO LTDA'        then        36134678
when        'SILVA E SILVA PRODUTOS FARMACEUTICOS LTDE ME'        then        36134679
when        'LUMANN DISTRIBUIDORA DE MEDICAMENTO LTDA'        then        36134680
when        'JOSE SIMINHUK'        then        36134681
when        'FLYMED COMERCIO DE PRODUTOS HOSPITALARES'        then        36134682
when        'NOSSA PHARMACIA LTDA-ME'        then        36134683
when        'TERRA SUL COMERCIO DE MEDICAMENTOS LTDA'        then        36134684
when        'SIRLEI SOUZA SILVA ALERS'        then        36134685
when        'L H C COMERCIO E SERVIÇOS LTDA'        then        36134686
when        'R. N. F. DE SOUZA E CIA LTDA'        then        36134687
when        'BIOTECNOPLUS ASSISTENCIA TECNICA EM EQUIPAMENTOS HOSPITALARES'        then        36134688
when        'FERRARI COMERCIO DE PEÇAS E SERVIÇOS'        then        36134689
when        'FAZ CONCRETO COMERCIO E SERVIÇOS EIRELI'        then        36134690
when        'ORMAR ARAUJO PAVAN'        then        36134691
when        'NORTE TIRES DISTRIBUIDORA DE PNEUS LTDA'        then        36134692
when        'P D V PEÇAS EIRELI ME'        then        36134693
when        'JGM PRODUTOS PARA SAUDE LTDA'        then        36134694
when        'ESFIGMED COMERCIAL HOSPITALAR LTDA'        then        36134695
when        'HOSPSHOP PRODUTOS HOSPITALARES LTDA'        then        36134696
when        'NEW COMPANY INFORMATICA LTDA'        then        36134697
when        'K. R. PAULUS DOS SANTOS'        then        36134698
when        'DENTAL RONDONIA COMERCIO DE PRODUTOS PARA SAUDE'        then        36134699
when        'DLB COMERCIO DE PRODUTOS DE INFORMATICA EIRELI'        then        36134700
when        'BONIN E BONIN LTDA'        then        36134702
when        'AUTO-LIM CONTROLE DE VETORES E PRAGAS EIRELI EPP'        then        36134703
when        'REALMED DISTRIBUIDORA LTDA EPP'        then        36134705
when        'J BASILIO OXIGENIO ME'        then        36134706
when        'RODOLFO SAPPER LTDA'        then        36134707
when        'AUTOVEMA MOTORS COMERCIO DE CAMINHONETAS LTDA'        then        36134708
when        'FENIX GRILL LTDA'        then        36134709
when        'GILVANDRO OLIVEIRA DA SILVA'        then        36134710
when        'RAMOS E PESSOA LTDA'        then        36134711
when        'SADINEZ BORGES DA ROSA SERRARIA LTDA'        then        36134712
when        'JOICIANE DA SILVA BARRETO'        then        36134713
when        'MAMORE MAQUINAS AGRICOLAS LTDA EPP'        then        36134714
when        'CASA DOS PARAFUSOS COMERCIO DE FERRAGEM E FERRAMENTAS EIRELI'        then        36134716
when        'AURENI LACERDA DE LIMA'        then        36134717
when        'JOSE PRUDENCIO DA SILVA'        then        36134718
when        'ODERLEI CEMBRANI'        then        36134719
when        'SADINEZ BORGES DA ROSA SERRARIA LTDA'        then        36134720
when        'VALE COMÉRCIO DE MOTOS LTDA'        then        36134721
when        'SOUZA E CORDEIRO AUTO MECANICA LTDA - ME'        then        36134722
when        'L. P. ALFA CONSULTORIA EIRELI ME'        then        36134723
when        'CONESUL UNIFORMES PROFICIONAIS LTDA'        then        36134724
when        'MEDICAL FARM NORTE COMERCIO LTDA'        then        36134726
when        'RONDOLAB DIAGNOSTICO COMERCIO E SERVIÇOS LTDA'        then        36134727
when        'C. C. T. MONTOVANI'        then        36134728
when        'VALERIO SOUZA SILVA'        then        36134729
when        'COMERCIO PSV LTDA-FILIAL'        then        36134730
when        'JRP REPRESENTAÇÕES COMERCIO E SERVIÇOS EIRE'        then        36134731
when        'R. A. GONÇALVES OLIVEIRA'        then        36134732
when        'ELO CRIAÇOES TEXTIL LTDA'        then        36134733
when        'JAIR DOMINGOS RAFAEL'        then        36134734
when        'MARCOS DUMER SCHIMIDT'        then        36134735
when        'MARCOS DUMER SCHIMIDT'        then        36134736
when        'PFJ COMERCIO DE GASES LTDA'        then        36134738
when        'EMPLAKAR PLACAS PARA VEICULOS LTDA'        then        36134739
when        'UAN COMERCIO E SERVIÇOS EIRELI'        then        36134740
when        'MARILZA ALVES CORTES PIRES'        then        36134741
when        'COMERCIAL FERREIRA ATACADO E VAREJO LTDA'        then        36134742
when        'R. V. A. COMERCIO DE ALIMENTOS LTDA'        then        36134743
when        'MARINALVA PEREIRA DE OLIVEIRA'        then        36134744
when        'CASA NOEL LTDA'        then        36134745
when        'E. P. MIDINO CAMPOS E CIA LTDA'        then        36134746
when        'FABIANA DE SOUZA SILVA'        then        36134747
when        'BA LUIZ INDUSTRIA E COMERCIO DE MATERIAIS ELETRICO'        then        36134748
when        'MARCELO SIMONI'        then        36134749
when        'DEBORA ISABELE DE OLIVEIRA SANTOS'        then        36134750
when        'BAZAR DISTRIBUIDORA DE UTENCILIOS E DECORAÇÃO LTDA'        then        36134751
when        'CONSELHO REGIONAL DE ENGENHARIA E AGRONOMIA DO ESTADO DE RONDONIA'        then        36134752
when        'BANCO DO BRASIL S/A'        then        36134753
when        'BRASIL FLORA INDUSTRIA E BENEFICIAMENTO DE MADEIRA'        then        36134754
when        'V. VIEIRA AMARO COMERCIO IMPORTALÇAI E EXPORTAÇÃO'        then        36134755
when        'LICITANET EIRELLI'        then        36134756
when        'RAYUDE SOARES'        then        36134757
when        'NORTÃO PRESTADORA DE SERVIÇOS LTDA'        then        36134759
when        'OI S.A.'        then        36134775
when        'GAZIN INDUSTRIA E COMERCIO DE MOVEIS E ELETRODOMESTICOS LTDA'        then        36134776
when        'O. MIRANDA DA ROCHA COMERCIO DE MOVEIS EIRELI'        then        36134777
when        'J.R.COMERCIODE ELETRONICOS E INFORMATICA EIRELI-ME'        then        36134778
when        'F. A ANTONIETTI-ME'        then        36134779
when        'CRISTIANO BAZONI'        then        36134780
when        'A W TECNICA LTDA'        then        36134781
when        'JETMAIS INFORMATICA OTDA'        then        36134782
when        'COMERCIAL VENUS LTDA ME'        then        36134783
when        'PAPELARIA E COSMETICOS NACIONAL LTDA'        then        36134784
when        'EB COMERCIO DE ELETRODOMESTICOS LTDA'        then        36134785
when        'ELENILSON DOMINGUES BARROS'        then        36134786
when        'F. GALDINO DA SILVA LTDA'        then        36134787
when        'CANGUSSU E FURTADO LTDA'        then        36134788
when        'CRISTIELE RUTSATZ LACHOS GONCALVES'        then        36134789
when        'BUNNY AUDIO SYSTEM'        then        36134790
when        'TOP NET PROVEDOR E INFORMATICA LTDA'        then        36134791
when        'NET WAY PARECIS TELECOMUNICACOES LTDA'        then        36134792
when        'H E F SOLUCOES TECNOLOGICAS LTDA'        then        36134793
when        'DIEGOFERNANDO BATISTA'        then        36134794
when        'AR 19 CERTIFICACAO DIGITAL SERVIÇOS LTDA'        then        36134795
when        'ADL INFORMATICA LTDA'        then        36134796
when        'CONSTRULAR MATERIAIS PARA CONSTRUÇÃO'        then        36311200
when        'TORK SUL COMERCIO DE PECAS MARQ E SERV LTDA'        then        36311201
when        'W.ISMAIL E CIA LTDA - ME'        then        36311202
when        'FLORES E BORGES LTDA'        then        36311203
when        'DENTAL MEDICA'        then        36311204
when        'LEISER COMERCIO CONST. E SERVIÇOS LTDA'        then        36311206
when        'STIGMA COMERCIAL LTDA'        then        36311209
when        'ITAGUAI COMERCIO E EMPREENDIMENTOS LTDA'        then        36311210
when        'SISMED - COM E REPRESENTAÇÕES LTDA - ME'        then        36311212
when        'DARTORA & CIA LTDA'        then        36311214
when        'AGUIA EMPRESA DE TRANSPORTE E TURISMO LTDA - ME'        then        36311216
when        'TITO STIPP MEE'        then        36311218
when        'P.APOLINARIO FILHO-ME'        then        36311220
when        'NELSON SILVA & CIA LTDA'        then        36311222
when        'JOAO APARECIDO NERI DOS SANTOS'        then        36311223
when        'A. J. ALVES E CIA LTDA - EPP'        then        36311225
when        'J. L. CONSTRUÇÕES E SERVIÇOS DE JARDINAGEM LTDA'        then        36311227
when        'ATLANTICO COMERCIO E PERFURAÇÃO DE POÇOS ARTESIANOS LTDA'        then        36311228
when        'T. R. REFRIGERAÇÃO LTDA - ME'        then        36311229
when        'CACOAL MOTO SERRAS LTDA.'        then        36311230
when        'EMPRAL PESQUISAS LTDA'        then        36311231
when        'ANTONIO APARECIDO DIAS'        then        36311232
when        'LAURINDO FERREIRA DA SILVA'        then        36311234
when        'M. C. RODRIGUES MAQUINAS E EQUIPAMENTOS PARA ESCRITORIO - ME'        then        36311235
when        'BIOCAL COMERCIO E REPRESENTAÇÕES LTDA'        then        36311237
when        'SUPER MOTO . COM DE MOTOS E PEÇAS LTDA ME'        then        36311238
when        'MAM LATIM AMERICA INDUSTRIA E COMERCIO DE VEI CULO'        then        36311239
when        'MOVEIS ROMERA LTDA'        then        36311240
when        'G1 MOVEIS ELETRODOMESTICO LTDA -ME '        then        36311241
when        'BOAS NOVAS TURISMO LTDA EPP'        then        36311242
when        'MASTTER MOTO COMERCIO DE VEICULO E MOTOS LTDA'        then        36311243
when        'OLYMPUS'        then        36311244
when        'DERLY S. DA SILVA METALURGICA  - ME'        then        36311245
when        'VENEZIA COMERCIO DE CAMINHOES LTDA CACOAL'        then        36311247
when        'KCINCO CAMINHOES E ONIBUS LTDA'        then        36311249
when        'RONALDO ADRIANO ALEXANDRINO'        then        36311250
when        'RAUL ALCANTARA SILVA'        then        36311251
when        'JIRAUTO AUTOMOVEIS LTDA'        then        36311252
when        'EDIVALDO ALVES MORREIRA'        then        36311253
when        'SABENAUTO COMERCIO DE VEICULO LTDA'        then        36311254
when        'V.S DOS SANTOS LIVRARIA E PAPELARIA ME'        then        36311255
when        'COIMBRA IMPORTAÇÃO E EXPORTAÇÃO LTDA'        then        36311257
when        'GTA COMERCIO DE MATERIAIS ELETRICOS LTDA ME'        then        36311258
when        'RONDONIA COMERCIO DE CAMINHOES E MAQUINAS LTDA'        then        36311259
when        'MOBEN COMERCIO DE VEICULOS LTDA'        then        36311260
when        'SANTOS E MAYER COMERCIO DE EQUIPAMENTOS DE INFORMATICA LTDA'        then        36311261
when        'CAMARA INFORMATICA LTDA - ME'        then        36311262
when        'ZICO DIAS DE PAULA  - ME'        then        36311263
when        'CASA DA LAVOURA MAQUNAS E IMPLEMANTOS AGRICULAS'        then        36311264
when        'COMPEX COMERCIAL LTDA'        then        36311265
when        'COMERCIAL AGRICOLA CAPRI LTDA'        then        36311266
when        'R K INDUSTRIA DE IMPLEMANTOS AGRICOLAS LTDA'        then        36311267
when        'INOVAX TELEINFORMATICA LTDA'        then        36311268
when        'JOSE BENVINDO DE CARVALHO'        then        36311269
when        'MILANFLEX INDUSTRIA E COMERCIO DE MOVEIS E EQUIPAMENTOS LTDA'        then        36311270
when        'LAJA LTDA - ME'        then        36311271
when        'ROSSATO E BERTHOLD LTDA'        then        36311272
when        'COMERCIAL VANGUARDEIRA EIRELLI ME'        then        36311273
when        'SCROCCA ELETRO ELETRONICOS EIRELI ME'        then        36311274
when        'SOLUÇÃO PLANEJAMENTO E COMERCIO LTDA'        then        36311275
when        'MASCARELLO CARROCERIAS E ONIBUS LTDA'        then        36311276
when        'MARIA LUIZA DA SILVA-ME'        then        36311277
when        'NISSEY MOTORS LTDA'        then        36311278
when        'FOCO PROJETOS EDUCACIONAIS LTDA-ME'        then        36311279
when        'VS COSTA E CIA LTDA'        then        36311280
when        'PPS PRODUTOS PARA SAUDE LTDA EPP'        then        36311281
when        'CRONO COMERCIO E DISTRIBUIÇÃO EIRELI'        then        36311282
when        'S3 EMPREENDIMENTOS COMERCIO E LOCAÇÕES EIRELI - EPP'        then        36311283
when        'SISTERPEL SUPRIMENTOS PARA INFORMÁTICA LTDA ME'        then        36311284
when        'JOSE DONIZETE PICOLLI'        then        36311285
when        'OLMI INFORMATICA LTDA - EPP'        then        36311286
when        'MOVEIS CAMILA/YOKOTA E BARBOSA LTDA ME'        then        36311287
when        'JAIRO ANTONIO ZANATTA'        then        36311288
when        'CONSTRUTORA HC LTDA EPP'        then        36311289
when        'CODRASA COMÉRCIO E CONSTRUÇÕES EIRELI'        then        36311290
when        'TERRA FORTE LTDA ME'        then        36311291
when        'GIL INFORMATICA LTDA'        then        36311292
when        'AUTOVEMA VEICULOS LTDA'        then        36311293
when        'TOYOTA DO BRASIL LTDA'        then        36311294
when        'NEIANDER STORCH EIRELI ME'        then        36311295
when        'GOMES VEICULOS ESPECIAIS EIRELI'        then        36311296
when        'ITALBUS CARROCERIAS DE ONIBUS LTDA'        then        36311297
when        'V M CONSTRUTORA LTDA EPP'        then        36311298
when        'AUDAX CONSTRUÇÕES E TERRAPLANAGEM EIRELI EPP'        then        36311299
when        'EVALDO F.PESSOA ME'        then        36311300
when        'DALTO & DALTO LTDA'        then        36311301
when        'KCR INDUTRIA E COMERCIO DE EQUIPAMENTOS EIRELI-EPP'        then        36311302
when        'VIXBOT SOLUÇÕES EM INFORMATICA LTDA ME'        then        36311303
when        'DANTASTERRA LTDA EPP'        then        36311304
when        'M. PICIANI PAZINATO COMERCIO DE MATERIAIS ELETRONICOS  - EIRELI'        then        36311305
when        'E. V. FERNANDES'        then        36311306
when        'AC IMOBILIARIA E CONSTRURORA EIRELI'        then        36311307
when        'ERICA DE FATIMA GENTIL'        then        36311308
when        'NFM SILVA CONSTRUÇOES EIRELI'        then        36311310
when        'CLEIDE BEATRIZ IORIS EIRELI'        then        36311311
when        'RR COMERCIO DE ELETROELETRONICOS EIRELI'        then        36311312
when        'OLMIRO THOMAZ MARTINS'        then        36311313
when        'MILANI CONSTRUTORA DE EDIF. E TERRAPL. LDTA'        then        36311314
when        'SOMBRA COM. SERVIÇSO LTDA ME'        then        36311315
when        'CR CONSTRUTORA E SERVIÇOS ESPECIALIZADO LTDA'        then        36311316
when        'AUTOVEMA VEICULOS LTDA'        then        36311317
when        'BR PRIME COM.E SERVIÇOS LTDA'        then        36311318
when        'ALFA COMUNICAÇÃO VISUAL EIRELLI ME'        then        36311319
when        'AMERICA COMERCIO DE PRODUTOS PARA INFORMATICA LTDA'        then        36311320
when        'COVEZI CAMINHOES E ONIBUS LTDA'        then        36311321
when        'PINAFO ATERRO E CASCALHO LTDA ME'        then        36311322
when        'MVP ELETRODOMESTICOS E EQUIPAMENTOS EIRELI'        then        36311323
when        'SIDNEY DO NASCIMENTO'        then        36311324
when        'APFORM INDUSTRIA E COMERCIO DE MOVEIS LTDA'        then        36311325
when        'BIDDEN COMERCIAL LTDA'        then        36311326
when        'ARUMAS INFORMATICAS LTDA'        then        36311327
when        'PRIMEMED EQUIPAPENTOS LTDA'        then        36311328
when        'CUSTOMIZAR DESING COMERCIO E SERVIÇOS LTDA'        then        36311329
when        'DK INFORMATICA LTDA'        then        36311330
when        '2M COMERCIO DE VEICULOS LTDA'        then        36311331
when        'DIEGO DE SOUZA ANDRADE'        then        36311332
when        'MJ ENGENHARIA LTDA'        then        36311333
when        'HJ COMERCIO E SERVIÇOS LTDA'        then        36311334
when        'BRUNO PETER AMORIM DE SOUZA 01212683226'        then        36311335
when        'W F DE ALMEIDA'        then        36311336
when        'HIPER OBRAS LTDA'        then        36311337
when        'C E CARVALHO COMERCIAL ME'        then        36311338
when        'P.A.R FRANCA INFORMATICA'        then        36311339
when        'LONDRIHOSP IMP E EXPORT DE PRODUTOS HOSP.'        then        36311340
when        'CONSTRUTORA MCB EIRELI LTDA'        then        36311341
when        'RR LOPES EIRELI ME'        then        36311342
when        'TRANSMAC LOCACOES LTDA'        then        36311343
when        'CIRURGICA SAO FELIPE PROT. PARA SAUDE EIRELI'        then        36311344
when        'CENTRO OESTE COMERCIO IMP. E EXP. DE PROD. HOSP.'        then        36311345
when        'MR TECH INFORMATICA LTDA'        then        36311347
when        'ALTA FREQUENCIA LTDA'        then        36311348
when        'LOPES E SOUZA SOLUÇOES INTEGRADAS LTDA'        then        36311349
when        'REPREMIG REPRESENTACAO E COMERCIO DE MINAS GERAIS'        then        36311350
when        'PEDRO G. FERNANDES'        then        36311351
when        'CONST.UMUARAMA LTDA/EGM SERV.CONTRUS.LTDA'        then        36311352
when        'REDNOV FERRAMENTAS LTDA'        then        36311353
when        'ECS CONST COM SERV LOC EQUIPAMENTOS LTDA'        then        36311354
when        'A. PAZINATO MARINGA'        then        36311355
when        'RODA BRASIL REPRESENTAÇOES COM E SERV LTDA EPP'        then        36311356
when        'INSTRAMED IND.MEDICO HOSPITALAR LTDA'        then        36311358
when        'LANG CONSTRUTORA LTDA'        then        36566367
end as id
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS fornecedor
FROM COMPCotacaoFornecedores cf
join CompFornecedores f on f.cd_fornecedor = cf.cd_fornecedor
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const cotacao = JSON.parse(record.cotacao);
            const fornecedor = JSON.parse(record.fornecedor);

            // Verificar se cotacao e fornecedor têm valores válidos
            if (!cotacao || !cotacao.id || !fornecedor || !fornecedor.id) {
                return null; // Pular o registro se qualquer valor estiver ausente
            }

            return {
                conteudo:{
                cotacao: {
                    id: cotacao.id
                },
                fornecedor: {
                    id: fornecedor.id
                }
            }};
        }).filter(record => record !== null); // Remover registros nulos

        // Salvar os resultados transformados em um arquivo JSON
        if (transformedData.length > 0) {
            fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
            console.log('Dados salvos em log_envio.json');
        } else {
            console.log('Nenhum dado válido para salvar.');
        }

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            try {
                const response = await fetch('https://services.compras.betha.cloud/compras-services/api/conversoes/lotes/CotacaoParticipante', {
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
            } catch (error) {
                console.error('Erro durante o envio do registro:', error);
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