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

function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    const hours = (`0${d.getHours()}`).slice(-2);
    const minutes = (`0${d.getMinutes()}`).slice(-2);
    const seconds = (`0${d.getSeconds()}`).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function formatDate2(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    const hours = (`0${d.getHours()}`).slice(-2);
    const minutes = (`0${d.getMinutes()}`).slice(-2);
    const seconds = (`0${d.getSeconds()}`).slice(-2);
    return `${year}`;
}

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "COMP_ALMO_CAM"
        const selectDatabaseQuery = 'USE COMP_ALMO';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
 nr_docto AS id,
JSON_QUERY((SELECT CASE WHEN cd_almoxa = 20100 THEN 4832
                        WHEN cd_almoxa = 20200 THEN 4877
                        WHEN cd_almoxa = 20300 THEN 4878
                        WHEN cd_almoxa = 20400 THEN 4879
                        WHEN cd_almoxa = 20500 THEN 4880
                        WHEN cd_almoxa = 20600 THEN 4881
                        WHEN cd_almoxa = 20700 THEN 4882
                        WHEN cd_almoxa = 20800 THEN 4883
                        WHEN cd_almoxa = 20900 THEN 4884
                        WHEN cd_almoxa = 21000 THEN 4885
                        WHEN cd_almoxa = 1 THEN 4830
                   END as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS almoxarifado,
JSON_QUERY((SELECT CASE WHEN cd_almoxa = 20700  THEN 2076743
                        WHEN cd_almoxa = 20400  THEN 2076746
                                                else 2076732
                                                 END as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS organograma,
JSON_QUERY((SELECT '11094' as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER )) AS naturezaMovimentacao,
JSON_QUERY((SELECT case when fr.nm_fornecedor = 'CARTORIO BRETAS' then 36006604
when fr.nm_fornecedor = 'RONDONIA OXIGENIO LTDA' then 36067959
when fr.nm_fornecedor = 'MUNICIPIO DE PARECIS'        then        36067960
when fr.nm_fornecedor = 'SUCKEL E SUCKEL LTDA'        then        36067963
when fr.nm_fornecedor = 'FABRILAR IND. COM. DE MOVEIS LTDA'        then        36067965
when fr.nm_fornecedor = 'AGUA POTAVEL COM. DE PROC. HIDROCNETICO'        then        36067968
when fr.nm_fornecedor = 'EXTINSEG COM. E RECARGAS DE EXTINTORES'        then        36067970
when fr.nm_fornecedor = 'COUTO FRIOREFIGERACOES LTDA'        then        36067972
when fr.nm_fornecedor = 'J. F. COMERCIO E REP DE PROD MED E HOSP'        then        36067974
when fr.nm_fornecedor = 'DM BARBOSA E TEIXEIRA LTDA-ME'        then        36067976
when fr.nm_fornecedor = 'J.R.C. MIRANDA LTDA ME'        then        36067978
when fr.nm_fornecedor = 'NILSON BIERGER MEIRELES'        then        36067980
when fr.nm_fornecedor = 'EQUIPO MEDICA COMERCIAL LTDA'        then        36067981
when fr.nm_fornecedor = 'MILTON ALVES DE ALMEIDA FILHO'        then        36067982
when fr.nm_fornecedor = 'JEREMIAS SANTOS BITTENCOURT'        then        36067984
when fr.nm_fornecedor = 'ALEXANDRO FERNANDES DE OLIVEIRA'        then        36067988
when fr.nm_fornecedor = 'C. R. OLIVEIRA SORVETES ME'        then        36067989
when fr.nm_fornecedor = 'VALDEMAR BELLEI ME'        then        36067991
when fr.nm_fornecedor = 'JUAREZ ROBERTO DE ANDRADE'        then        36067993
when fr.nm_fornecedor = 'LAUTERTE & LAUTERTE LTDA ME'        then        36067996
when fr.nm_fornecedor = 'BAMBOLE B. PRESENTES E PAPELARIA LTDA'        then        36067998
when fr.nm_fornecedor = 'SIRLEY DE F. S. DUARTE XAVIER ME'        then        36068000
when fr.nm_fornecedor = 'JURANDIR RODRIGUES DE MORAIS'        then        36068002
when fr.nm_fornecedor = 'CELIA FERREIRA BRESCIANI PENHA ME'        then        36068005
when fr.nm_fornecedor = 'CLAUDINO BISPO DOS SANTOS'        then        36068007
when fr.nm_fornecedor = 'EUCATUR EMPRESA UNIAO CASCAVEL'        then        36068009
when fr.nm_fornecedor = 'EMPRESA COLIBRI TRANSPORTES LTDA'        then        36068011
when fr.nm_fornecedor = 'FURP FUNDACAO PARA REMEDIOS POPULARES'        then        36068014
when fr.nm_fornecedor = 'ELION BARRETO DE ARAUJO'        then        36068015
when fr.nm_fornecedor = 'TERRARADA MAQUINAS AGRICOLAS LTDA'        then        36068018
when fr.nm_fornecedor = 'LUCIANA DE OLIVEIRA PINTO'        then        36068021
when fr.nm_fornecedor = 'EGMAR APARECIDO FERREIRA'        then        36068023
when fr.nm_fornecedor = 'FRANCISCO CORNELIO ALVES DE LIMA'        then        36068026
when fr.nm_fornecedor = 'BR DIESEL BOMBA INJETORA LTDA ME'        then        36068028
when fr.nm_fornecedor = 'R H S COMERCIO & REPRESENTACOES LTDA'        then        36068031
when fr.nm_fornecedor = 'EMPLAKE - INDUSTRIA E COM. PLACAS SERV.'        then        36068033
when fr.nm_fornecedor = 'ALMIR FERREIRA DA CRUZ'        then        36068035
when fr.nm_fornecedor = 'PICA PAU MOTOS LTDA'        then        36068040
when fr.nm_fornecedor = 'FABIO RODRIGUES DOS SANTOS ME'        then        36068041
when fr.nm_fornecedor = 'EURIDES TEIXEIRA DA SILVA'        then        36068043
when fr.nm_fornecedor = 'GILVAN JOSE DA COSTA'        then        36068044
when fr.nm_fornecedor = 'VERA FERREIRA DE OLIVEIRA'        then        36068047
when fr.nm_fornecedor = 'JOSE DA SILVA PEDROSO'        then        36068048
when fr.nm_fornecedor = 'PORTAL PUBLICO INFORMATICA LTDA'        then        36068050
when fr.nm_fornecedor = 'ADEMIR BRASIL CRIVELLI'        then        36068052
when fr.nm_fornecedor = 'WILMON MARCOS JUNIOR'        then        36068054
when fr.nm_fornecedor = 'SIMONE CRISTINA DA ROCHA HUPPERS'        then        36068057
when fr.nm_fornecedor = 'COMERCIAL DE UTIL.DOMEST. DE RONDONIA'        then        36068059
when fr.nm_fornecedor = 'ARCA ENGENHARIA E COMERCIO LTDA'        then        36068061
when fr.nm_fornecedor = 'REGINALDO GONCALVES DE OLIVEIRA'        then        36068062
when fr.nm_fornecedor = 'RECONDICIONADORA DE PNEUS CELMO LTDA'        then        36068065
when fr.nm_fornecedor = 'MARCIA OTTO BARRIENTOS ME'        then        36068067
when fr.nm_fornecedor = 'IZAQUE ALVES'        then        36068069
when fr.nm_fornecedor = 'COMERCIO DE PNEUS ALMEIDA LTDA'        then        36068070
when fr.nm_fornecedor = 'LOURDES FERNANDES PEREIRA'        then        36068072
when fr.nm_fornecedor = 'AXIAL ENGENHARIA E CONSTRUCOES LTDA'        then        36068076
when fr.nm_fornecedor = 'SALVADOR RODRIGUES DE CARVALHO'        then        36068077
when fr.nm_fornecedor = 'CLINICA DE IMAGEM E DIAG. MAE DE DEUS'        then        36068079
when fr.nm_fornecedor = 'LABNORTE PRODUTOS E EQUIPAMENTOS LTDA'        then        36068081
when fr.nm_fornecedor = 'PAPELARIA E LIVRARIA TREVO LTDA'        then        36068083
when fr.nm_fornecedor = 'W. J. DE LIMA'        then        36068084
when fr.nm_fornecedor = 'PARAUTO AUTO PECAS LTDA'        then        36068086
when fr.nm_fornecedor = 'POSTO DE MOLAS J. LAZAROTTO LTDA ME'        then        36068088
when fr.nm_fornecedor = 'CONST.E PREST'        then        36068092
when fr.nm_fornecedor = 'MOVEIS GAZIN LTDA'        then        36068093
when fr.nm_fornecedor = 'TBM - TERRAPLANAGEM BORGES E MECANICA LA'        then        36068095
when fr.nm_fornecedor = 'J NEVES & OLIVEIRA LTDA'        then        36068097
when fr.nm_fornecedor = 'ADEMAR LINO CAETANO'        then        36068099
when fr.nm_fornecedor = 'JADER NORTE MOTORES LTDA'        then        36068100
when fr.nm_fornecedor = 'POLARES MOTO CENTER LTDA'        then        36068102
when fr.nm_fornecedor = 'COMERCIO DE ALIMENTOS EXTRA LTDA-MEE'        then        36133606
when fr.nm_fornecedor = 'COM. E INSTALADORA DE ENERGIA PARECIS - ME'        then        36134120
when fr.nm_fornecedor = 'CARMORAES - LTDA'        then        36134156
when fr.nm_fornecedor = 'LUTERO ROSA DO PARAISO'        then        36134157
when fr.nm_fornecedor = 'GENI VIEIRA DA SILVA'        then        36134158
when fr.nm_fornecedor = 'A. ANTUNES MACIEL - ME'        then        36134159
when fr.nm_fornecedor = 'VALMIR DIAS DA SILVA'        then        36134160
when fr.nm_fornecedor = 'MORCEGÃO MOTO PEÇAS LTDA'        then        36134161
when fr.nm_fornecedor = 'LUIZ AMARAL DE BRITO'        then        36134162
when fr.nm_fornecedor = 'SEBASTIÃO TEIXEIRA ABRANTES'        then        36134163
when fr.nm_fornecedor = 'GILDA MATOS PEREIRA'        then        36134164
when fr.nm_fornecedor = 'CRISTINA STRELON HAMMER'        then        36134165
when fr.nm_fornecedor = 'HELIO EGIDIO DA SILVA'        then        36134166
when fr.nm_fornecedor = 'WESP FERREIRA DOS SANTOS'        then        36134167
when fr.nm_fornecedor = 'ENERGISA RONDÔNIA- DISTRIBUIDORA DE ENERGIA S.A'        then        36134168
when fr.nm_fornecedor = 'OI S/A EM RECUPERAÇÃO JUDICIAL'        then        36134169
when fr.nm_fornecedor = 'SERGIO LEÃO DE ARAUJO'        then        36134170
when fr.nm_fornecedor = 'DEPARTAMENTO ESTADUAL DE TRANSITO DO ESTADO DE RONDÔNIA- DETRAN/RO'        then        36134171
when fr.nm_fornecedor = 'MARCELO JUNIOR BLASI'        then        36134172
when fr.nm_fornecedor = 'COMPANHIA DE ÁGUAS E ESGOTOS DE RONDÔNIA- CAERD'        then        36134173
when fr.nm_fornecedor = 'JOCELAINE DA LUZ FONSECA CARDOSO-ME'        then        36134174
when fr.nm_fornecedor = 'CLEUS EDELSON GONÇALVES DE ANDRADE'        then        36134175
when fr.nm_fornecedor = 'TECCHIO E SILVA LTDA'        then        36134176
when fr.nm_fornecedor = 'BANCO CREDIP S/A'        then        36134177
when fr.nm_fornecedor = 'RONDOBRÁS COM. DE PEÇAS E ACESSÓRIOS P/VEICULOS LT'        then        36134178
when fr.nm_fornecedor = 'LUNAR COMÉRCIO LTDA'        then        36134179
when fr.nm_fornecedor = 'JEDEÃO SOUZA DA SILVA - ME'        then        36134180
when fr.nm_fornecedor = 'SECRETARIA DA RECEITA FEDERAL - PASEP'        then        36134181
when fr.nm_fornecedor = 'LAURINDO BARBOSA DE SOUZA'        then        36134182
when fr.nm_fornecedor = 'VERONICA VIEIRA DA SILVA'        then        36134183
when fr.nm_fornecedor = 'SUSANA CANDIDO DA ROCHA'        then        36134184
when fr.nm_fornecedor = 'VALMIR LEMES DA SILVA SANTOS'        then        36134185
when fr.nm_fornecedor = 'JOANILTON OLIVEIRA PEREIRA'        then        36134186
when fr.nm_fornecedor = 'SECRETARIA DO TESOURO NACIOANL/CONFIN/STN'        then        36134187
when fr.nm_fornecedor = 'POSTO DE MOLAS MARINGÁ LTDA-ME'        then        36134188
when fr.nm_fornecedor = 'I N S S'        then        36134189
when fr.nm_fornecedor = 'UNIVERSAL SERVIÇOS FÚNEBRES LTDA-ME'        then        36134190
when fr.nm_fornecedor = 'PECHIM CIA LTDA-ME'        then        36134191
when fr.nm_fornecedor = 'ALEXANDRE DE MORAIS GUIMARÃES'        then        36134192
when fr.nm_fornecedor = 'GAZIN INDUSTRIA E COMERCIO DE MOVEIS E EL LTDA.'        then        36134193
when fr.nm_fornecedor = 'DISMOBRAS IMP.EXP. E DIST. DE MÓVEIS E ELTRODOM LT'        then        36134194
when fr.nm_fornecedor = 'J. J COMERCIO E SERVIÇOS LTDA-ME'        then        36134195
when fr.nm_fornecedor = 'FANA COMERCIO DE EQUIP. PARA INFORMATICA LTDA'        then        36134196
when fr.nm_fornecedor = 'CARLOS EDUARDO BARRETO ACCIOLY'        then        36134197
when fr.nm_fornecedor = 'LEIR JOSE DA SILVA'        then        36134198
when fr.nm_fornecedor = 'GUILHERME GULARTE'        then        36134199
when fr.nm_fornecedor = 'FUNDO MUNICIPAL DE SAUDE - FMS'        then        36134200
when fr.nm_fornecedor = 'CAMARA MUNICIPAL DE PARECIS'        then        36134201
when fr.nm_fornecedor = 'MECANICA TUPI LTDA - EPP'        then        36134202
when fr.nm_fornecedor = 'OSMAR TONINI DA SILVA'        then        36134203
when fr.nm_fornecedor = 'ROBERTO ROGERIO COSTA'        then        36134204
when fr.nm_fornecedor = 'SC BRINDES LTDA-ME'        then        36134205
when fr.nm_fornecedor = 'BRASIL VEICULOS COMPANHIA DE SEGUROS S/A LTDA'        then        36134206
when fr.nm_fornecedor = 'MOVETERRA  CONSTRUÇÕES E TERRAPLANAGEM LTDA-ME'        then        36134207
when fr.nm_fornecedor = 'ELIANE FRANCO DE OLIVEIRA LIMA'        then        36134208
when fr.nm_fornecedor = 'TATIANE SOUZA ROCHA'        then        36134209
when fr.nm_fornecedor = 'SILVA E CAVALCANTE COMERCIO DE MAT. P/ CONST. LTDA'        then        36134210
when fr.nm_fornecedor = 'MADEREIRA ANDRES LTDA-ME'        then        36134211
when fr.nm_fornecedor = 'E. DE OLIVEIRA-ME'        then        36134212
when fr.nm_fornecedor = 'MARIA NILVA CARDOSO CANDIDO'        then        36134213
when fr.nm_fornecedor = 'NISES MARILDA TRAVAIANI BERNADELI'        then        36134214
when fr.nm_fornecedor = 'EUZEBIO & SANTIAGO LTDA-ME'        then        36134215
when fr.nm_fornecedor = 'EMIR RODRIGUES FILHO'        then        36134216
when fr.nm_fornecedor = 'CONSTRUTORA E TERRAPLANAGEM LV LTDA'        then        36134217
when fr.nm_fornecedor = 'UELÇO CONTADINE VIEIRA'        then        36134218
when fr.nm_fornecedor = 'ANA PAULA GOMES DASILVA'        then        36134219
when fr.nm_fornecedor = 'DESKTOP TECNOLOGIA LTDA-ME'        then        36134220
when fr.nm_fornecedor = 'PROINFO- COMERCIO E SERVIÇOS PARA INFORMATICA LTDA'        then        36134221
when fr.nm_fornecedor = 'R. DOMINGOS DE LIMA ME'        then        36134222
when fr.nm_fornecedor = 'ODILIA DE SOUZA OLIVEIRA-ME'        then        36134223
when fr.nm_fornecedor = 'DELMIRO MOURA CESTARI - ME'        then        36134224
when fr.nm_fornecedor = 'HILGERT & CIA LTDA'        then        36134225
when fr.nm_fornecedor = 'CIMOPAR MOVEIS LTDA'        then        36134226
when fr.nm_fornecedor = 'ZAMIR LUIZ'        then        36134227
when fr.nm_fornecedor = 'PONTES & MATHEUS LTDA'        then        36134229
when fr.nm_fornecedor = 'RICCI LAMINAÇÃO E TRANSPORTE LTDA-ME'        then        36134231
when fr.nm_fornecedor = 'VIEIRA & RANITE LTDA'        then        36134232
when fr.nm_fornecedor = 'MARIA QUELIS DE BRITO'        then        36134233
when fr.nm_fornecedor = 'CLEUSA MENDES DE SOUZA'        then        36134234
when fr.nm_fornecedor = 'CORTY & CORTY LTDA-ME'        then        36134235
when fr.nm_fornecedor = 'COPELUB COM DE PEÇAS E LUBRIFICANTES ME'        then        36134236
when fr.nm_fornecedor = 'M F DE O COSTA ME'        then        36134237
when fr.nm_fornecedor = 'METALUGICA E VIDRAÇARIA FAZ COM FERRO LTDA EPP'        then        36134238
when fr.nm_fornecedor = 'KLEIN PINTO BARRETO ME'        then        36134239
when fr.nm_fornecedor = 'J S DE AGUIAR MERCADO ME'        then        36134240
when fr.nm_fornecedor = 'FABIO XAVIER VALENTIM'        then        36134241
when fr.nm_fornecedor = 'ASSOSSIAÇAO RADIO COMUNITARIA ANTENA 1 FM'        then        36134242
when fr.nm_fornecedor = 'VICENTE FRANCISCO MONTELO'        then        36134243
when fr.nm_fornecedor = 'IVONE OLIVEIRA SANTOS DUARTE'        then        36134244
when fr.nm_fornecedor = 'ARON-ASSOCIACAO RONDONIENSE DE MUNICIPIO'        then        36134245
when fr.nm_fornecedor = 'DANIEL ROSA DA SILVA'        then        36134246
when fr.nm_fornecedor = 'CELINO JOSE DE ANDRADE'        then        36134247
when fr.nm_fornecedor = 'INDUSTRIA E COMERCIO DE MOVEIS PB LTDA ME'        then        36134248
when fr.nm_fornecedor = 'WILSON R. DA SILVA ME RODOVIDROS'        then        36134249
when fr.nm_fornecedor = 'ZEANI DE CAMPOS VELOSO ME'        then        36134250
when fr.nm_fornecedor = 'A BOCA DISCOS E FITAS LTDA ME'        then        36134251
when fr.nm_fornecedor = 'IRINEU DA SILVA TECIDOS ME'        then        36134252
when fr.nm_fornecedor = 'CELESTE REDIVO'        then        36134253
when fr.nm_fornecedor = 'MÁRIO RAMÃO ASPETT COTT'        then        36134254
when fr.nm_fornecedor = 'PINTO E SILVA COMÉRCIO LTDA'        then        36134255
when fr.nm_fornecedor = 'M. F. MONTIBELLER - ME'        then        36134256
when fr.nm_fornecedor = 'TERRAPLANAGEM PARECIS LTDA - EPP'        then        36134257
when fr.nm_fornecedor = 'CNM - CONFEDERAÇÃO NACIONAL DE MUNICIPIOS'        then        36134258
when fr.nm_fornecedor = 'UNIÃO DOS DIRIGENTES M. DE EDUCAÇÃO RO-UNDIME'        then        36134259
when fr.nm_fornecedor = 'AMARILDO CARDOSO RIBEIRO'        then        36134260
when fr.nm_fornecedor = 'MARCO TULIO SANTOS DUARTE'        then        36134261
when fr.nm_fornecedor = 'EDUARDO SIQUEIRA DE SOUZA'        then        36134262
when fr.nm_fornecedor = 'AGNALDO FELISBERTO BATISTA'        then        36134263
when fr.nm_fornecedor = 'MARIA JOSÉ DE SOUZA REIS'        then        36134264
when fr.nm_fornecedor = 'NEUZA HOFFMAN'        then        36134265
when fr.nm_fornecedor = 'MARCIA NEVES DE ALMEIDA'        then        36134266
when fr.nm_fornecedor = 'SOLANGE MAZUTTI'        then        36134267
when fr.nm_fornecedor = 'DIARIO OFICIAL DO ESTADO E OUTROS'        then        36134268
when fr.nm_fornecedor = 'IRMA HAMMER BERGER'        then        36134269
when fr.nm_fornecedor = 'GRAZIELI DOS SANTOS DE LIMA'        then        36134270
when fr.nm_fornecedor = 'TRANSPORTES SÃO CRISTOVÃO LTDA'        then        36134271
when fr.nm_fornecedor = 'WR TRANSPORTES LTDA ME'        then        36134272
when fr.nm_fornecedor = 'VALDIR ALVES CANDIDO'        then        36134273
when fr.nm_fornecedor = 'SECRETARIA DE  ESTADO DO DESENVOLVIMENTO AMB.'        then        36134274
when fr.nm_fornecedor = 'J. M. COMERCIO DE PRODUTOS AGROPECUARIOS LTDA'        then        36134275
when fr.nm_fornecedor = 'J. EUGENIO FUZARI ME'        then        36134276
when fr.nm_fornecedor = 'CHARLENE PNEUS'        then        36134277
when fr.nm_fornecedor = 'R. DE SOUZA CONSTRUÇÕES,  TERRAPLANAGEM E TRANSPORT'        then        36134278
when fr.nm_fornecedor = 'REFRIGAS REFRIGERAÇÃO LTDA ME'        then        36134279
when fr.nm_fornecedor = 'ASTC-ASSOCIAÇÃO DOS SERVIDORES DO TRIBUNAL DE CONT'        then        36134280
when fr.nm_fornecedor = 'VALDEVINO LISBOA DE SOUZA'        then        36134281
when fr.nm_fornecedor = 'ACETRON'        then        36134282
when fr.nm_fornecedor = 'HELENITO BARRETO PINTO JUNIOR'        then        36134283
when fr.nm_fornecedor = 'DEVANI LOPES PEREIRA'        then        36134284
when fr.nm_fornecedor = 'CLAUDIA BARCELOS DE LIMA'        then        36134285
when fr.nm_fornecedor = 'QUELI CRISTINA AGUIAR SILVA BARBOSA'        then        36134286
when fr.nm_fornecedor = 'I. N. RIBEIRO KUSS - ME'        then        36134287
when fr.nm_fornecedor = 'SUGIFER MATERIAIS PARA CONSTRUÇÃO LTDA'        then        36134288
when fr.nm_fornecedor = 'ASSOCIAÇÃO RURAL DE PARECIS - ARPA'        then        36134290
when fr.nm_fornecedor = 'TIGRAO MATERIAIS PARA CONSTRUÇÃO LTDA'        then        36134291
when fr.nm_fornecedor = 'MEGA VEICULOS LTDA'        then        36134292
when fr.nm_fornecedor = 'C R DOS SANTOS  SUAVE ME'        then        36134293
when fr.nm_fornecedor = 'BENEDITO SOARES'        then        36134294
when fr.nm_fornecedor = 'SANTOS E SANTOS COMERCIO DE PEÇAS E BOR. LTDA'        then        36134295
when fr.nm_fornecedor = 'ITA TRATORES LTDA ME'        then        36134296
when fr.nm_fornecedor = 'GOVERNO DO ESTADO DE RONDONIA - DEOSP-RO'        then        36134297
when fr.nm_fornecedor = 'O BARATÃO UTILIDADES DOMÉSTICAS LTDA'        then        36134298
when fr.nm_fornecedor = 'MERCADO NOVA VIDA LTDA ME'        then        36134299
when fr.nm_fornecedor = 'REDE BRASILEIRA DE PUBLICAÇÕES DE ATOS OF. LTDA-EP'        then        36134300
when fr.nm_fornecedor = 'RODRIGUES E LIMA LTDA ME'        then        36134301
when fr.nm_fornecedor = 'FERNANDES E SALAME ME'        then        36134302
when fr.nm_fornecedor = 'ANDRADE E VICENTE LTDA'        then        36134303
when fr.nm_fornecedor = 'EMPRESA BRAS. DE CORREIOS E TELEGRAFOS'        then        36134304
when fr.nm_fornecedor = 'CLAUDINEI BRITO VILA BOAS'        then        36134305
when fr.nm_fornecedor = 'BORGES E PAIVA LTDA ME'        then        36134306
when fr.nm_fornecedor = 'GUAPORE MAQUINAS E EQUIPAMENTOS LTDA'        then        36134307
when fr.nm_fornecedor = 'CLEUS HUMBERTO G. DE ANDRADE'        then        36134308
when fr.nm_fornecedor = 'PAULO FIGUEIREDO CALDEIRA'        then        36134309
when fr.nm_fornecedor = 'A. R. CONSTRUTORA LTDA ME'        then        36134310
when fr.nm_fornecedor = 'ANA BRAULINA PINHO'        then        36134311
when fr.nm_fornecedor = 'REGINALDO GIL DA SILVA'        then        36134312
when fr.nm_fornecedor = 'EDITORA DIARIO DA AMAZONIA LTDA'        then        36134313
when fr.nm_fornecedor = 'PETROCOSTA COMERCIO DE COMBUSTIVEL LTDA'        then        36134314
when fr.nm_fornecedor = 'ADELINA AIOAGUI DA SILVA'        then        36134315
when fr.nm_fornecedor = 'NILTON DA SILVA FERREIRA  - ME'        then        36134316
when fr.nm_fornecedor = 'ALBINO DA SILVA RIBEIRO'        then        36134317
when fr.nm_fornecedor = 'JOAQUIM PEDRO ALEXANDRINO NETO'        then        36134318
when fr.nm_fornecedor = 'MARINALVA DA SILVA PEREIRA'        then        36134319
when fr.nm_fornecedor = 'JULIANA ALVES SALOMAO'        then        36134320
when fr.nm_fornecedor = 'RUTE CEZARIO DE SOUZA'        then        36134321
when fr.nm_fornecedor = 'A R DE BARROS ELER ME'        then        36134322
when fr.nm_fornecedor = 'FRANCIELE SIMINHUK'        then        36134323
when fr.nm_fornecedor = 'PELSERVICE PEÇAS E SERVIÇOS LTDA'        then        36134324
when fr.nm_fornecedor = 'L F IMPORTS LTDA'        then        36134325
when fr.nm_fornecedor = 'CLEBER BRESSANI DOS SANTOS'        then        36134326
when fr.nm_fornecedor = 'GMR ESPORTES LTDA ME'        then        36134327
when fr.nm_fornecedor = 'APP CANDIDO PORTINARI / PROINFANTIL'        then        36134328
when fr.nm_fornecedor = 'JANE HONORATO DE FREITAS'        then        36134329
when fr.nm_fornecedor = 'PAULO GERALDO PEREIRA'        then        36134330
when fr.nm_fornecedor = 'SEBASTIAO DE FREITAS'        then        36134331
when fr.nm_fornecedor = 'OLMIRO THOMAZ MARTINS - ME'        then        36134332
when fr.nm_fornecedor = 'ANTONIO DOMINGUES RAMOS - ME'        then        36134333
when fr.nm_fornecedor = 'JOSMIR SOARES DE AGUIAR'        then        36134334
when fr.nm_fornecedor = 'PAULO CESAR DA SILVA'        then        36134335
when fr.nm_fornecedor = 'PICA PAU COMERCIO DE MOTOS DA AMOZONIA LTDA'        then        36134336
when fr.nm_fornecedor = 'ROSANGELA RODRIGUES'        then        36134337
when fr.nm_fornecedor = 'LUCIDA APARECIDA DE AZEVEDO'        then        36134338
when fr.nm_fornecedor = 'EDELSON SETTE'        then        36134339
when fr.nm_fornecedor = 'IVECO LATIN AMERICA LTDA'        then        36134340
when fr.nm_fornecedor = 'ABSOLUTA CURSOS S/S LTDA.'        then        36134341
when fr.nm_fornecedor = 'MARIA DO SOCORRO VIANA DA COSTA'        then        36134342
when fr.nm_fornecedor = 'CONSTRUTORA COSTA E COSTA LTDA - ME'        then        36134343
when fr.nm_fornecedor = 'COLADINI E COLADINI LTDA'        then        36134344
when fr.nm_fornecedor = 'VEMAQ VEICULOS E MAQUINAS LTDA'        then        36134345
when fr.nm_fornecedor = 'PORTELA E OCHIAI VEICULOS LTDA'        then        36134346
when fr.nm_fornecedor = 'MARCELO LORENÇO FERREIRA'        then        36134347
when fr.nm_fornecedor = 'MARCOS ANTONIO RODRIGUES DA CRUZ'        then        36134348
when fr.nm_fornecedor = 'GOIASTUR TRANSPORTE & TURISMO LTDA-ME'        then        36134349
when fr.nm_fornecedor = 'SISPEL SISTEMAS INTEG. DE SOFTWER E PAPELARIA LTD'        then        36134350
when fr.nm_fornecedor = 'HS COMERCIO DE PNEUS LTDA-ME'        then        36134351
when fr.nm_fornecedor = 'PREVENTIVA CONS. E ASSES. TECNICA E ADMINISTRATIVA'        then        36134352
when fr.nm_fornecedor = 'JOAQUIM ALVES MARTINS'        then        36134353
when fr.nm_fornecedor = 'PAULO CESAR BEZERRA'        then        36134354
when fr.nm_fornecedor = 'PAPELARIA PELIKANO LTDA'        then        36134355
when fr.nm_fornecedor = 'EDSON M. DE ARAUJO ME.'        then        36134356
when fr.nm_fornecedor = 'ELIONETE PROCHNOW FACHINI'        then        36134357
when fr.nm_fornecedor = 'CELSON CANDIDO DA ROCHA'        then        36134358
when fr.nm_fornecedor = 'ROQUE SETTE'        then        36134359
when fr.nm_fornecedor = 'EDIVALTO FRANCISCO DE AMORIM'        then        36134360
when fr.nm_fornecedor = 'VANDERLEIA CRUZ DE LIMA'        then        36134361
when fr.nm_fornecedor = 'MARIA APARECIDA DE AMORIM'        then        36134362
when fr.nm_fornecedor = 'DEISE APARECIDA BERNADELI'        then        36134363
when fr.nm_fornecedor = 'ROGERIO VICENTE MACHADO'        then        36134368
when fr.nm_fornecedor = 'MANOEL DE MEDEIROS'        then        36134369
when fr.nm_fornecedor = 'OLINTO ENEAS DE ALENCAR FILHO'        then        36134370
when fr.nm_fornecedor = 'ALBERTO BARTOLOMEU'        then        36134371
when fr.nm_fornecedor = 'ROSILENE TAKAHASHI BRAVO'        then        36134372
when fr.nm_fornecedor = 'PEDRO SOUZA SILVA'        then        36134373
when fr.nm_fornecedor = 'DESIVALDO FURTUNATO DOS SANTOS'        then        36134374
when fr.nm_fornecedor = 'JORGE LUIZ RAIMUNDO DE MELO'        then        36134375
when fr.nm_fornecedor = 'LISBOA & SILVA LTDA-ME'        then        36134376
when fr.nm_fornecedor = 'CONSTRUTORA VENTURIM LTDA'        then        36134377
when fr.nm_fornecedor = 'JOSEFA FERREIRA RIOS KURYANA'        then        36134378
when fr.nm_fornecedor = 'SIMONI MLAK DE SOUZA'        then        36134379
when fr.nm_fornecedor = 'APCE-ASSOC.DOS PROF.DE AUDIT.E CONTROLE EXT'        then        36134380
when fr.nm_fornecedor = 'MAX DANIEL DE CARVALHO'        then        36134381
when fr.nm_fornecedor = 'TORK SUL COMERCIO DE PEÇAS E MAQUINAS LTDA'        then        36134382
when fr.nm_fornecedor = 'KINCAS COMERCIO DE MATERIAIS P/CONTRUÇAO'        then        36134383
when fr.nm_fornecedor = 'ELIZABETE PIRES GUEDES OLIVEIRA ME'        then        36134384
when fr.nm_fornecedor = 'RETIMAR RETIFICA DE MOTORES LTDA ME'        then        36134385
when fr.nm_fornecedor = 'RONDOSAT TELERADIOCOMUNICAÇAO LTDA'        then        36134386
when fr.nm_fornecedor = 'SAGA  CONSTRUÇOES LTDA'        then        36134387
when fr.nm_fornecedor = 'REGIANE CRISTINA DOS SANTOS SOUZA'        then        36134388
when fr.nm_fornecedor = 'CONSTRUNOVA COM. DE MAT. DE CONSTRUÇAO LTDA ME'        then        36134389
when fr.nm_fornecedor = 'MARCEL SILVA MONTELO'        then        36134390
when fr.nm_fornecedor = 'JAIR PEREIRA DUARTE'        then        36134391
when fr.nm_fornecedor = 'DULCELEI DE LIMA ANDRADE'        then        36134392
when fr.nm_fornecedor = 'ADARA COMERCIO DE INFORMATICA E TECNOLOGIA LTDA ME'        then        36134393
when fr.nm_fornecedor = 'FREDERICO ANTONIO AUS VALLALVA'        then        36134394
when fr.nm_fornecedor = 'FERNANDO MACHADO DA SILVA'        then        36134395
when fr.nm_fornecedor = 'CLETO APOLINARIO DA CRUZ'        then        36134396
when fr.nm_fornecedor = 'MARCONDES DE CARVALHO'        then        36134397
when fr.nm_fornecedor = 'COSTA E COSTA COMERCIO LTDA ME'        then        36134398
when fr.nm_fornecedor = 'MIRIAN QUIRINO DA SILVA'        then        36134399
when fr.nm_fornecedor = 'ALESSANDRO AGUIAR DA SILVA'        then        36134400
when fr.nm_fornecedor = 'EURICO DOS SANTOS'        then        36134401
when fr.nm_fornecedor = 'ADAL VEICULOS LTDA'        then        36134402
when fr.nm_fornecedor = 'CONSTRUTURA GLOBO LTDA'        then        36134403
when fr.nm_fornecedor = 'ROLAO COM.MATERIAL DE CONSTRUÇAO LTDA'        then        36134404
when fr.nm_fornecedor = 'LILIAN RODRIGUES ANTUNES'        then        36134405
when fr.nm_fornecedor = 'LUIZ ANTONIO DE OLIVEIRA'        then        36134406
when fr.nm_fornecedor = 'VANDERLUCIO DA SILVA'        then        36134407
when fr.nm_fornecedor = 'JOSE & MORAIS LTDA ME'        then        36134408
when fr.nm_fornecedor = 'PAS PROJETO ASSESSORIA E SISTEMA LTDA'        then        36134409
when fr.nm_fornecedor = 'EGMAR APARECIDO FERREIRA'        then        36134410
when fr.nm_fornecedor = 'MARCIA SANTOS LIMA SOUZA'        then        36134411
when fr.nm_fornecedor = 'D F DE SOUZA OLIVEIRA & CIA LTDA ME'        then        36134412
when fr.nm_fornecedor = 'R. DE BRITO & CIA LTDA ME'        then        36134413
when fr.nm_fornecedor = 'PAPELARIA LUPI LTDA'        then        36134414
when fr.nm_fornecedor = 'IMPLEMENTOS AGRICOLAS ROLIM LTDA'        then        36134415
when fr.nm_fornecedor = 'DIEGO DE SOUZA ANDRADE CONTABILIDADE ME'        then        36134416
when fr.nm_fornecedor = 'ALBERTO SONA NETO INFORMATICA ME'        then        36134417
when fr.nm_fornecedor = 'JOICE POLIANE MERCLY DE ANDRADE'        then        36134418
when fr.nm_fornecedor = 'SEBASTIAO VIEIRA DA COSTA'        then        36134419
when fr.nm_fornecedor = 'RONDONORTE COM.DE PEÇAS E ACESSORIOS AUTOMOTIVOS'        then        36134420
when fr.nm_fornecedor = 'NEIDE CORREIA B. TESCH'        then        36134422
when fr.nm_fornecedor = 'D  MARCA COMERCIO DE ACESSORIOS PARA INFORMATICA'        then        36134423
when fr.nm_fornecedor = 'MACHADO & LOPES TRANSPORTES E EXCURSOES LTDA ME'        then        36134424
when fr.nm_fornecedor = 'CARDOSO E CASTAGNA E FIM LTDA - ME'        then        36134425
when fr.nm_fornecedor = 'COMERCIAL DE ARMARINHOS TOTAL LTDA ME'        then        36134426
when fr.nm_fornecedor = 'EDER PEREIRA DE LIMA'        then        36134427
when fr.nm_fornecedor = 'VANTUIL RODRIGUES DE MORAIS'        then        36134428
when fr.nm_fornecedor = 'CONSTRUTORA PAG LTDA - EPP'        then        36134429
when fr.nm_fornecedor = 'RONDOTUBOS ARTEFATOS DE CIMENTO LTDA-ME'        then        36134430
when fr.nm_fornecedor = 'V. BORSATO ME'        then        36134431
when fr.nm_fornecedor = 'DUDA ELETRO LTDA ME'        then        36134432
when fr.nm_fornecedor = 'W M DE OLIVEIRA INFORMATICA'        then        36134433
when fr.nm_fornecedor = 'PARECIS MATERIAIS PARA CONSTRUÇAO LTDA'        then        36134434
when fr.nm_fornecedor = 'MODELO COMERCIO DE MATERIAIS DE CONST.LTDA ME'        then        36134436
when fr.nm_fornecedor = 'LUIZ MASSARO MATSUI'        then        36134437
when fr.nm_fornecedor = 'LILIAN OLIVEIRA GERONIMO'        then        36134438
when fr.nm_fornecedor = 'CORPO DE BOMBEIROS MILITAR DO ESTADO'        then        36134439
when fr.nm_fornecedor = 'ROXANE FERRETO LORENZON'        then        36134440
when fr.nm_fornecedor = 'AUTO TRACTOR LTDA EPP'        then        36134441
when fr.nm_fornecedor = 'MR DOS SANTOS COMÉRCIO DISTRIBUIDOR E SEERVIÇOS LTDA ME'        then        36134442
when fr.nm_fornecedor = 'C.M COMÉRCIO SERVIÇOS E CONSTRUÇÕES LTDA ME'        then        36134443
when fr.nm_fornecedor = 'CONSTRUTORA VALTRAN LTDA'        then        36134444
when fr.nm_fornecedor = 'ALBERTO FREITA SILVA'        then        36134445
when fr.nm_fornecedor = 'LOJAS TROPICAL E REFRIGERAÇÃO LTDA'        then        36134446
when fr.nm_fornecedor = 'RONDERSON REIS DE OLIVEIRA'        then        36134447
when fr.nm_fornecedor = 'CONSTRUTORA TERRA LTDA'        then        36134448
when fr.nm_fornecedor = 'SANTANA & SOUZA TERRAPLANAGEM LTDA ME'        then        36134449
when fr.nm_fornecedor = 'PALMIERI 7 CIA LTDA EPP'        then        36134450
when fr.nm_fornecedor = 'VITALLY FARMÁCIA E MANIPULAÇÃO LTDA ME'        then        36134451
when fr.nm_fornecedor = 'JOÃO CARLOS ANACLETO'        then        36134452
when fr.nm_fornecedor = 'D PRESS EDITORA E GRÁFICA LDA EPP'        then        36134453
when fr.nm_fornecedor = 'MANOEL DA SILVA EIRELI ME'        then        36134454
when fr.nm_fornecedor = 'ALPHA ASSESSORIA & CONSULTORIA LTDA ME'        then        36134455
when fr.nm_fornecedor = 'MEDICALCENTER DISTRIBUIDORA DE MEDICAMENTOS EIRELI - EPP'        then        36134456
when fr.nm_fornecedor = 'COVAN COMERCIO VAREJISTA E ATACADISTA DO NORTE LTDA'        then        36134457
when fr.nm_fornecedor = 'ORTOMED PRODUTOS E SERVIÇOS HOSPITALARES LTDA EPP'        then        36134458
when fr.nm_fornecedor = 'EQUILÍBRIO COMERCIO E REPRESENTAÇÃO EIRELI EPP'        then        36134459
when fr.nm_fornecedor = 'DENTAL MED EQUIPAMENTOS E MATERIAIS ODONTOLOGICOS E HOSPITALARES LTDA EPP'        then        36134460
when fr.nm_fornecedor = 'OXIPORTO COMÉRCIO E DISTRIBUIÇÃO DE GASES LTDA'        then        36134461
when fr.nm_fornecedor = 'DISTRIBUIDORA DE AUTO PEÇAS RONDOBRAS LTDA'        then        36134462
when fr.nm_fornecedor = 'FUNDAÇÃO DE APOIO A PESQUISA EDUCACIONAL E TECNOLÓGICA DE RONDONIA - INPRO'        then        36134463
when fr.nm_fornecedor = 'POPULAR TREINAMENTOS LTDA'        then        36134464
when fr.nm_fornecedor = 'TERGEX - CONSTRUTORA LTDA'        then        36134465
when fr.nm_fornecedor = 'C V MOREIRA EIRELI'        then        36134466
when fr.nm_fornecedor = 'INSTITUTO EXATUS LTDA ME'        then        36134467
when fr.nm_fornecedor = 'CONSTRUCERTO LTDA ME'        then        36134468
when fr.nm_fornecedor = 'R C TABALIPA LTDA ME'        then        36134469
when fr.nm_fornecedor = 'S RODRIGUES & CIA LTDA'        then        36134470
when fr.nm_fornecedor = 'CARREIRO & BICALHO CONSTRUTORA LDA ME'        then        36134471
when fr.nm_fornecedor = 'PRESERVA SOLUÇÕES LTDA ME'        then        36134472
when fr.nm_fornecedor = 'JOSE PINHEIRO FERREIRA & CIA LTDA - ME'        then        36134473
when fr.nm_fornecedor = 'J A DE OLIVEIRA ALIMENTOS LTDA EPP'        then        36134474
when fr.nm_fornecedor = 'ATECNOMED ASSISTÊNCIA E COMERCIO DE PRODUTOS HOSPITALARES LTDA ME'        then        36134475
when fr.nm_fornecedor = 'SEC ENGENHARIA E CONSTRUTORA LTDA'        then        36134476
when fr.nm_fornecedor = 'CONSTRUOURO CONSTRUÇÕES INSTALAÇÕES E SERVIÇOS LTDA EPP'        then        36134477
when fr.nm_fornecedor = 'FRIMOM CONSTRUÇÕES & SERVIÇOS LDA EPP'        then        36134478
when fr.nm_fornecedor = 'CONSTRUTORA BRAGA LTDA EPP'        then        36134479
when fr.nm_fornecedor = 'MANOEL MESSIAS DE MACEDO GOMES'        then        36134480
when fr.nm_fornecedor = 'FOX PNEUS LTDA'        then        36134481
when fr.nm_fornecedor = 'JOHEM & SCHRAMM LTDA ME'        then        36134482
when fr.nm_fornecedor = 'CARMORAES SUPERMERCADO EIRELLI ME'        then        36134483
when fr.nm_fornecedor = 'JACÓ RETIFICA DE MOTORES LTDA ME'        then        36134484
when fr.nm_fornecedor = 'DIMAM PEÇAS E SERVIÇOS LTDA'        then        36134485
when fr.nm_fornecedor = 'ANTONIO CARLOS ARGIONA DE OLIVEIRA'        then        36134486
when fr.nm_fornecedor = 'JULIO MUCHINSKI'        then        36134487
when fr.nm_fornecedor = 'RODOBENS COMINHOES RONDONIA LTDA'        then        36134489
when fr.nm_fornecedor = 'CYBER INFORMATICA LTDA ME'        then        36134490
when fr.nm_fornecedor = 'JAPURA PNEUS LTDA'        then        36134491
when fr.nm_fornecedor = 'ADRIANA CRISTINA DOS SANTOS'        then        36134492
when fr.nm_fornecedor = 'AUTO POSTO PARECIS LTDA'        then        36134493
when fr.nm_fornecedor = 'THACOL COMERCIO LTDA - ME'        then        36134494
when fr.nm_fornecedor = 'CONECTIVA ESCOLA PROFICIONALIZANTE LTDA - ME'        then        36134495
when fr.nm_fornecedor = 'ARMCO STACO S A INDUSTRIA METARLUGICA'        then        36134496
when fr.nm_fornecedor = 'EXCLUSIVA DISTRIBUIRORA DE MEDICAMENTOS LTDA'        then        36134497
when fr.nm_fornecedor = 'ELVES DIAS DE SOUZA'        then        36134498
when fr.nm_fornecedor = 'V. F. FERREIRA FREITAS DE OLIVEIRA LTDA'        then        36134499
when fr.nm_fornecedor = 'SCHREINER INDUSTRIA DE RESFRIADORES DE LEITE'        then        36134501
when fr.nm_fornecedor = 'COMERCIAL PSV LTDA'        then        36134502
when fr.nm_fornecedor = 'AUTO PEÇAS FAVALESSA LTDA ME'        then        36134503
when fr.nm_fornecedor = 'RONDOLAB COMÉRCIO E SERVIÇOS EIRELI EPP'        then        36134504
when fr.nm_fornecedor = 'D. ANTUNES DE PAULA - ME'        then        36134505
when fr.nm_fornecedor = 'NEVES & BRITO LTDA - ME'        then        36134506
when fr.nm_fornecedor = 'PILINCHA ARTEFATOS DE CIMENTO LTDA - ME'        then        36134507
when fr.nm_fornecedor = 'MP TUBOS INDUSTRIA DE CONCRETO LTDA - ME'        then        36134508
when fr.nm_fornecedor = 'ZEZITO DOS SANTOS'        then        36134509
when fr.nm_fornecedor = 'A E DA CRUZ ELER ME'        then        36134510
when fr.nm_fornecedor = 'PAPELARIA TEIXEIRA'        then        36134511
when fr.nm_fornecedor = 'IVO SIMINHUK'        then        36134512
when fr.nm_fornecedor = 'YAGO MENOZZI'        then        36134513
when fr.nm_fornecedor = 'RENACIR ATANAZIO'        then        36134514
when fr.nm_fornecedor = 'MARCOFARMA DISTIBUIDORA DE PRODUTOS FARMACEUTICOS'        then        36134515
when fr.nm_fornecedor = 'DIMASTER COMERCIO DE PRODUTOS OSPITALAR LTDA'        then        36134516
when fr.nm_fornecedor = 'PRESTOMED DISTRIBUIDORA DE PRODUTOS P/SAUDE LTDA'        then        36134517
when fr.nm_fornecedor = 'TC ATUAL COMERCIO DE MEDICAMENTOS LTDA'        then        36134518
when fr.nm_fornecedor = 'CENTERMEDI COMERCIO DE PRODUTOS HOSPITALARES LTDA'        then        36134519
when fr.nm_fornecedor = 'JOSE LUCAS VINHAL'        then        36134520
when fr.nm_fornecedor = 'NOVASUL COMERCIO DE PRODUTOS HOSPITALARES LTDA'        then        36134521
when fr.nm_fornecedor = 'MARCOS ALVES ALMEIDA'        then        36134522
when fr.nm_fornecedor = 'ALTAIR ALVES DE LIMA'        then        36134523
when fr.nm_fornecedor = 'BELISSIMA UNIFORMES E CONFECÇOES LTDA-ME'        then        36134524
when fr.nm_fornecedor = 'FERNANDA BAZONE'        then        36134525
when fr.nm_fornecedor = 'MUNDIAL COMERCIO ATACADISTA DE ARMARINHOS LTDA'        then        36134526
when fr.nm_fornecedor = 'ATACADO TRADIÇÃO LTDA-ME'        then        36134527
when fr.nm_fornecedor = 'M E DE CARVALHO INDUSTRIA DE MÓVEIS ME'        then        36134528
when fr.nm_fornecedor = 'OXIACRE COMERCIO E DISTRIBUIÇÃO DE GASES LTDA ME'        then        36134529
when fr.nm_fornecedor = 'PACIFICO CONSTRUTORA LTDA ME'        then        36134530
when fr.nm_fornecedor = 'VENEZIA COMERCIO DE CAMINHOES LTDA'        then        36134531
when fr.nm_fornecedor = 'JAMARI COMERCIO E EMPREENDIMENTO LTDA EPP'        then        36134532
when fr.nm_fornecedor = 'RALLY PNEUS COMERCIO DE PNEUS E PEÇAS PARA VEICULOS LTDA'        then        36134533
when fr.nm_fornecedor = 'J.A. DOS SANTOS & CIA LTDA - ME'        then        36134534
when fr.nm_fornecedor = 'LUIS CARLOS VALENTIN DE SOUZA'        then        36134535
when fr.nm_fornecedor = 'OLITTECH COM E SERVIÇOS DE INF LTDA'        then        36134536
when fr.nm_fornecedor = 'IMEISSEN COMÉRCIO E SERVIÇOS EIRELLI ME'        then        36134537
when fr.nm_fornecedor = 'BERGUERAND & CIA LTDA - ME'        then        36134538
when fr.nm_fornecedor = 'JOÃO CARLOS CESTARI'        then        36134539
when fr.nm_fornecedor = 'MULTILUB COMERCIO DE LUBRIFICANTES LTDA'        then        36134540
when fr.nm_fornecedor = 'PEMAZA S/A'        then        36134541
when fr.nm_fornecedor = 'ALANTIS COMERCIO DE MAQUINAS E EQUIPAMENTOS LTDA'        then        36134542
when fr.nm_fornecedor = 'MOBEN COMERCIO DE VEICULO LTDA'        then        36134543
when fr.nm_fornecedor = 'J A COMERCIO DE ARMARINHOS LTDA-ME'        then        36134544
when fr.nm_fornecedor = 'BIOCAL COMERCIO E REPRESENTAÇÕES LTDA'        then        36134545
when fr.nm_fornecedor = 'COMERCIAL RONDON LTDA EPP'        then        36134546
when fr.nm_fornecedor = 'RONDONIANA COMERCIAL EIRELLI ME'        then        36134547
when fr.nm_fornecedor = 'PALLADIUM INDUSTRIA E COMERCIO DE CONFECÇOES LTDA'        then        36134549
when fr.nm_fornecedor = 'PATRICIA M. MILER - ME'        then        36134550
when fr.nm_fornecedor = 'AILTON IZIDIO DOS SANTOS'        then        36134552
when fr.nm_fornecedor = 'W&M COMERCIO DE MATERIAIS PARA CONSTRUÇAO EIRELI EPP'        then        36134553
when fr.nm_fornecedor = 'SOTREQ SA'        then        36134554
when fr.nm_fornecedor = 'ALONSO DE SOUZA'        then        36134555
when fr.nm_fornecedor = 'RODRIGO TOLOSA RICO - EPP'        then        36134556
when fr.nm_fornecedor = 'ARLINDO ANTONIO DA SILVA'        then        36134557
when fr.nm_fornecedor = 'HYPOLYTI DISTRIBUIDOR DE PRODUTOS AGROPECUARIA'        then        36134558
when fr.nm_fornecedor = 'ASSOCIAÇÃO DOS ÁRBITROS DE FUTEBOL DE ALTO ALEGRE DOS PARECIS'        then        36134559
when fr.nm_fornecedor = 'M NEVES DE SOUZA E CIA LTDA'        then        36134560
when fr.nm_fornecedor = 'COMERCIAL GRARUJA LTDA'        then        36134561
when fr.nm_fornecedor = 'APEDIA VEICULOS E PEÇAS LTDA'        then        36134562
when fr.nm_fornecedor = 'R. CAMACHIO PUBLICIDADE - ME'        then        36134563
when fr.nm_fornecedor = 'SCLAN MALHAS LTDA EPP'        then        36134564
when fr.nm_fornecedor = 'BURITI CAMINHOES LTDA'        then        36134565
when fr.nm_fornecedor = 'CONERA CONSTUTORA NOVA ERA LTDA ME'        then        36134566
when fr.nm_fornecedor = 'AUTOLUK COMERCIO DE PNEUMATICOS E PEÇAS'        then        36134567
when fr.nm_fornecedor = 'MOURAO PNEUS EIRELI - ME'        then        36134568
when fr.nm_fornecedor = 'INOVVA PRODUTOS E SERVIÇOS EIRELI - ME'        then        36134569
when fr.nm_fornecedor = 'C.P. PINTO COMERCIO DE MATERIAL HOSPITALAR'        then        36134570
when fr.nm_fornecedor = 'TOP NORTE COMERCIO DE MATERIAL MEDICO HOSPITALAR EIRELI - ME'        then        36134571
when fr.nm_fornecedor = 'JOSE SIMINHUK'        then        36134572
when fr.nm_fornecedor = 'COMERCIAL TORRES LTDA - EPP'        then        36134573
when fr.nm_fornecedor = 'FELIX & RONCONI LTDA'        then        36134574
when fr.nm_fornecedor = 'CICLO CAIRU LTDA'        then        36134575
when fr.nm_fornecedor = 'J C F MARANA ME'        then        36134576
when fr.nm_fornecedor = 'MANOEL XAVIER COTRIM'        then        36134577
when fr.nm_fornecedor = 'WALTER SOARES FALCÃO'        then        36134578
when fr.nm_fornecedor = 'GILBERTO FERREIRA GOMES'        then        36134579
when fr.nm_fornecedor = 'IZALTINO VIDOTTO'        then        36134580
when fr.nm_fornecedor = 'C. H. OLIVEIRA - ME'        then        36134581
when fr.nm_fornecedor = 'L.M.LADEIRA & CIA LTDA'        then        36134582
when fr.nm_fornecedor = 'NISSEY MOTORS JI-PARANA'        then        36134583
when fr.nm_fornecedor = 'PERUIBE COMERCIO DE PRODUTOS ELETRO ELETRONICOS LTDA'        then        36134584
when fr.nm_fornecedor = 'R.B.T COMERCIO REPRESENTAÇÕES'        then        36134585
when fr.nm_fornecedor = 'GBIM IMPORT. EXPORT.  E COMERCIALIZAÇÃO DE ACESSORIOS PARA VEICULOS LTDA'        then        36134586
when fr.nm_fornecedor = 'LAPTOP INFORMATICA E TECNOLOGIA LTDA'        then        36134587
when fr.nm_fornecedor = 'J R COMERCIO DE ELETRONICO E INFORMATICA LTDA'        then        36134588
when fr.nm_fornecedor = 'N.V. VERDE E CIA LTDA - ME'        then        36134589
when fr.nm_fornecedor = 'ELETRO MOVEIS BOM PREÇO LTDA - ME'        then        36134590
when fr.nm_fornecedor = 'FRANTELLIS COMERCIO E SERVIÇOS EIRELI EPP'        then        36134591
when fr.nm_fornecedor = 'TESCH E CASTRO LTDA-ME - ARARAS PARK'        then        36134593
when fr.nm_fornecedor = 'VALDEMAR FAVALESSA - EPP'        then        36134594
when fr.nm_fornecedor = 'ROLANDO ALENCAR GONÇALVES DE OLIVEIRA'        then        36134595
when fr.nm_fornecedor = 'LUCAS C. RUBEL - ME'        then        36134596
when fr.nm_fornecedor = 'ADRIELE SCHROEDER SCHMIDT'        then        36134597
when fr.nm_fornecedor = 'IGARATA REPRESENTAÇAO COMERCIAL LTDA'        then        36134598
when fr.nm_fornecedor = 'IVO NELI RIBEIRO KUSS'        then        36134599
when fr.nm_fornecedor = 'EDINAN MANOEL DA SILVA'        then        36134600
when fr.nm_fornecedor = 'N T LUIZE EPP'        then        36134601
when fr.nm_fornecedor = 'VALDEMIR ALVES DE ALMEIDA'        then        36134602
when fr.nm_fornecedor = 'L.E. ALMEIDA COMERCIO DE PRODUTOS MEDICOS HOSPITALAR'        then        36134603
when fr.nm_fornecedor = 'J P MARCELINO EIRELI ME'        then        36134604
when fr.nm_fornecedor = 'COMERCIAL CURURGICA RIOCLARENSE LTDA'        then        36134605
when fr.nm_fornecedor = 'COMERCIAL CURURGICA RIOCLARENSE LTDA'        then        36134606
when fr.nm_fornecedor = 'COMERCIO DE PRODUTOS FARMACEUTICOS DROGALID'        then        36134607
when fr.nm_fornecedor = 'AM MEDICAL COMERCIO DE MEDICAMENTOS E PRODUTOS HOSPITALARES LTDA'        then        36134608
when fr.nm_fornecedor = 'PRO SAUDE DISTRIBUIDORA DE MEDICAMENTO EIRELI-ME'        then        36134609
when fr.nm_fornecedor = 'FARMACE INDUSTRIA QUIMICO FARMACEUTICA CEARENCE LTDA'        then        36134610
when fr.nm_fornecedor = 'AUROBINDO PHARMA INDUSTRIA FARMACEUTICA LTDA'        then        36134611
when fr.nm_fornecedor = 'BH FARMA COMERCIO LTDA'        then        36134612
when fr.nm_fornecedor = 'CARDOSO & SILVA MEDICAMENTOS LTDA-ME'        then        36134613
when fr.nm_fornecedor = 'LIFE CENTER COMERCIO E DISTRIBUIDORA DE MEDICAMENTOS LTDA'        then        36134614
when fr.nm_fornecedor = 'GOLDENPLUS COMERCIO DE MEDICAMENTOS E PRODUTOS HOSPITALARES LTDA'        then        36134615
when fr.nm_fornecedor = 'ODONTOESTE LTDA EPP - ONDOTOESTE'        then        36134616
when fr.nm_fornecedor = 'CONSELHO DE DIREITO DA CRIANÇA E DO ADOLECENTE'        then        36134617
when fr.nm_fornecedor = 'PORTOGASES COMERCIO E DISTRIBUIÇÃO DE GASES'        then        36134618
when fr.nm_fornecedor = 'EXEMPLARMED COMERCIO E PRODUTOS HOSPITALARES LTDA - ME'        then        36134619
when fr.nm_fornecedor = 'SUPERMEDICA DISTRIB HOSPITALAR EIRELI'        then        36134620
when fr.nm_fornecedor = 'FERTISOLO COMERCIAL DE MAQUINAS E EQUIPAMENTOS LTDA'        then        36134621
when fr.nm_fornecedor = 'COMERCIAL T S LTDA-ME'        then        36134622
when fr.nm_fornecedor = 'VERA LUCIA FRANCISCA DOS SANTOS - ME'        then        36134623
when fr.nm_fornecedor = 'SILVENIA UNIFORMES LTDA EPP'        then        36134624
when fr.nm_fornecedor = 'NORTE MOTOS PEÇAS E ACESSORIOS'        then        36134625
when fr.nm_fornecedor = 'ILÇARA MARIA DE CASTRO BAILLY'        then        36134626
when fr.nm_fornecedor = 'ERAFARMA PRODUTOS PARA SAUDE EIRELI'        then        36134627
when fr.nm_fornecedor = 'TATIANA NEVES MONTIBELLER PAIVA'        then        36134628
when fr.nm_fornecedor = 'ELIEZER ROSA DO PARAISO EIRELI - ME'        then        36134629
when fr.nm_fornecedor = 'EMERSON GONÇA DA SILVA LTDA ME'        then        36134630
when fr.nm_fornecedor = 'CRIBARI CAMARGO COMUNICAÇÃO VISUAL EIRELI'        then        36134631
when fr.nm_fornecedor = 'ASTOR STAUDT COMERCIO DE PRODUTOS EDUCATIVOS'        then        36134632
when fr.nm_fornecedor = 'MAGAZINE MENEGUEL LTDA'        then        36134633
when fr.nm_fornecedor = 'IMPLEMENTOS AGRICOLAS OLIVEIRA LTDA'        then        36134634
when fr.nm_fornecedor = 'ALANA ROHDE IMPLEMENTOS AGRICOLAS - ME'        then        36134635
when fr.nm_fornecedor = 'ALEMAO COMERCIO DE MAQUINAS AGRICULAS EIRELI'        then        36134636
when fr.nm_fornecedor = 'MONICA R. DE MELLO FARIA - ME'        then        36134637
when fr.nm_fornecedor = 'ECOLIM EIRELI'        then        36134638
when fr.nm_fornecedor = 'J N DISTRIBUIDORA EIRELI - ME'        then        36134639
when fr.nm_fornecedor = 'FRAZAN E CIA LTDA'        then        36134640
when fr.nm_fornecedor = 'MBR FERNANDES - EPP'        then        36134641
when fr.nm_fornecedor = 'LOBIANCO & LIMA LTDA - ME'        then        36134642
when fr.nm_fornecedor = 'WESLEY BORGES DUARTE'        then        36134643
when fr.nm_fornecedor = 'SANTO REMEDIO COMERCIO DE PRODUTOS MEDICO-HOSPITALAR EIRELI'        then        36134644
when fr.nm_fornecedor = 'BARROS E BARROS COMERCIO DE MATERIAIS PARA CONSTRUÇÃO LTDA'        then        36134645
when fr.nm_fornecedor = 'COMPUNET INFORMATICA LTDA ME'        then        36134646
when fr.nm_fornecedor = 'M.S. DA SILVEIRA COMERCIO DE PRODUTOS FARMACEUTICO LTDA'        then        36134647
when fr.nm_fornecedor = 'ARMAZEM DOS MEDICAMENTOS EIRELLI'        then        36134648
when fr.nm_fornecedor = 'DMC DISTRIBUIDORA COMERCIO DE MEDICAMENTOS LTDA'        then        36134649
when fr.nm_fornecedor = 'OLMIR IORIS & CIA LTDA EPP'        then        36134650
when fr.nm_fornecedor = 'MAZZUTTI COMERCIO DE VEICULOS LTDA'        then        36134651
when fr.nm_fornecedor = 'VIGILANTE DA GLICISE COMERCIO DE PRODUTOS DIABETICOS EIRELI - ME'        then        36134652
when fr.nm_fornecedor = 'FERTISOLO COMERCIAL DE MAQUINAS E EQUIPAMENTOS LTDA'        then        36134653
when fr.nm_fornecedor = 'PROMAAPHA COMERCIO E DISTRIBUIÇÃO EIRELI'        then        36134654
when fr.nm_fornecedor = 'TEND TUDO PEÇAS E ACESSORIOS PARA VEICULOS EPP'        then        36134655
when fr.nm_fornecedor = 'NORTELAB PRODUTOS LABORATORIAIS EIREL'        then        36134656
when fr.nm_fornecedor = 'TECHMED ENGENHARIA HOSPITALAR LTDA'        then        36134657
when fr.nm_fornecedor = 'C. A. S. BALEEIRO'        then        36134658
when fr.nm_fornecedor = 'L. A. DE PICOLI EIRELI'        then        36134659
when fr.nm_fornecedor = 'WESLEI DE FREITAS'        then        36134660
when fr.nm_fornecedor = 'ELDORADO MATERIAIS PARA CONSTRUÇÃO EIRELI ME'        then        36134661
when fr.nm_fornecedor = 'COPEMAQUINAS COMERCIO DE PEÇAS E REPRESENTAÇÃO LTDA'        then        36134662
when fr.nm_fornecedor = 'RTM COMERCIO DE MATERIAIS PARA CONSTRUÇÃO'        then        36134663
when fr.nm_fornecedor = 'ORTOMED COMERCIO DE PRODUTOS MEDICO E HOSPITALARES EIRELI'        then        36134664
when fr.nm_fornecedor = 'EDINALDO SILVA'        then        36134665
when fr.nm_fornecedor = 'HEXIS CIENTIFICA LTDA'        then        36134666
when fr.nm_fornecedor = 'IMPERIUM COMERCIO E SERVIÇOS EIRELI - ME'        then        36134667
when fr.nm_fornecedor = 'T.C.C. DE A. FERREIRA COMERCIO E SERVIÇO'        then        36134669
when fr.nm_fornecedor = 'K 13 CONFECÇÕES LTDA EPP'        then        36134670
when fr.nm_fornecedor = 'BTM COMERCIO DE BRINDES LTDA'        then        36134671
when fr.nm_fornecedor = 'CIMCERO CONS. INTERMINIC. CENTRO LESTE DO ESTADO RO'        then        36134672
when fr.nm_fornecedor = 'NBB COMERCIO DE EQUIPAMENTOS DE INFORMATICA LTDA ME'        then        36134673
when fr.nm_fornecedor = 'M R GONSALVES COMERCIO EIRELI ME'        then        36134674
when fr.nm_fornecedor = 'BRS SERVIÇOS DE MONTAGEM DE ESTRUTURAS EIRELI'        then        36134675
when fr.nm_fornecedor = 'FORMANORTE COMERCIO E MANIPULAÇÃO DE MEDICAMENTOS LTDA'        then        36134676
when fr.nm_fornecedor = 'I. C. LEMES DA SILVA'        then        36134677
when fr.nm_fornecedor = 'MEDICAL COMERCIO DE COSMETICO LTDA'        then        36134678
when fr.nm_fornecedor = 'SILVA E SILVA PRODUTOS FARMACEUTICOS LTDE ME'        then        36134679
when fr.nm_fornecedor = 'LUMANN DISTRIBUIDORA DE MEDICAMENTO LTDA'        then        36134680
when fr.nm_fornecedor = 'JOSE SIMINHUK'        then        36134681
when fr.nm_fornecedor = 'FLYMED COMERCIO DE PRODUTOS HOSPITALARES'        then        36134682
when fr.nm_fornecedor = 'NOSSA PHARMACIA LTDA-ME'        then        36134683
when fr.nm_fornecedor = 'TERRA SUL COMERCIO DE MEDICAMENTOS LTDA'        then        36134684
when fr.nm_fornecedor = 'SIRLEI SOUZA SILVA ALERS'        then        36134685
when fr.nm_fornecedor = 'L H C COMERCIO E SERVIÇOS LTDA'        then        36134686
when fr.nm_fornecedor = 'R. N. F. DE SOUZA E CIA LTDA'        then        36134687
when fr.nm_fornecedor = 'BIOTECNOPLUS ASSISTENCIA TECNICA EM EQUIPAMENTOS HOSPITALARES'        then        36134688
when fr.nm_fornecedor = 'FERRARI COMERCIO DE PEÇAS E SERVIÇOS'        then        36134689
when fr.nm_fornecedor = 'FAZ CONCRETO COMERCIO E SERVIÇOS EIRELI'        then        36134690
when fr.nm_fornecedor = 'ORMAR ARAUJO PAVAN'        then        36134691
when fr.nm_fornecedor = 'NORTE TIRES DISTRIBUIDORA DE PNEUS LTDA'        then        36134692
when fr.nm_fornecedor = 'P D V PEÇAS EIRELI ME'        then        36134693
when fr.nm_fornecedor = 'JGM PRODUTOS PARA SAUDE LTDA'        then        36134694
when fr.nm_fornecedor = 'ESFIGMED COMERCIAL HOSPITALAR LTDA'        then        36134695
when fr.nm_fornecedor = 'HOSPSHOP PRODUTOS HOSPITALARES LTDA'        then        36134696
when fr.nm_fornecedor = 'NEW COMPANY INFORMATICA LTDA'        then        36134697
when fr.nm_fornecedor = 'K. R. PAULUS DOS SANTOS'        then        36134698
when fr.nm_fornecedor = 'DENTAL RONDONIA COMERCIO DE PRODUTOS PARA SAUDE'        then        36134699
when fr.nm_fornecedor = 'DLB COMERCIO DE PRODUTOS DE INFORMATICA EIRELI'        then        36134700
when fr.nm_fornecedor = 'BONIN E BONIN LTDA'        then        36134702
when fr.nm_fornecedor = 'AUTO-LIM CONTROLE DE VETORES E PRAGAS EIRELI EPP'        then        36134703
when fr.nm_fornecedor = 'REALMED DISTRIBUIDORA LTDA EPP'        then        36134705
when fr.nm_fornecedor = 'J BASILIO OXIGENIO ME'        then        36134706
when fr.nm_fornecedor = 'RODOLFO SAPPER LTDA'        then        36134707
when fr.nm_fornecedor = 'AUTOVEMA MOTORS COMERCIO DE CAMINHONETAS LTDA'        then        36134708
when fr.nm_fornecedor = 'FENIX GRILL LTDA'        then        36134709
when fr.nm_fornecedor = 'GILVANDRO OLIVEIRA DA SILVA'        then        36134710
when fr.nm_fornecedor = 'RAMOS E PESSOA LTDA'        then        36134711
when fr.nm_fornecedor = 'SADINEZ BORGES DA ROSA SERRARIA LTDA'        then        36134712
when fr.nm_fornecedor = 'JOICIANE DA SILVA BARRETO'        then        36134713
when fr.nm_fornecedor = 'MAMORE MAQUINAS AGRICOLAS LTDA EPP'        then        36134714
when fr.nm_fornecedor = 'CASA DOS PARAFUSOS COMERCIO DE FERRAGEM E FERRAMENTAS EIRELI'        then        36134716
when fr.nm_fornecedor = 'AURENI LACERDA DE LIMA'        then        36134717
when fr.nm_fornecedor = 'JOSE PRUDENCIO DA SILVA'        then        36134718
when fr.nm_fornecedor = 'ODERLEI CEMBRANI'        then        36134719
when fr.nm_fornecedor = 'SADINEZ BORGES DA ROSA SERRARIA LTDA'        then        36134720
when fr.nm_fornecedor = 'VALE COMÉRCIO DE MOTOS LTDA'        then        36134721
when fr.nm_fornecedor = 'SOUZA E CORDEIRO AUTO MECANICA LTDA - ME'        then        36134722
when fr.nm_fornecedor = 'L. P. ALFA CONSULTORIA EIRELI ME'        then        36134723
when fr.nm_fornecedor = 'CONESUL UNIFORMES PROFICIONAIS LTDA'        then        36134724
when fr.nm_fornecedor = 'MEDICAL FARM NORTE COMERCIO LTDA'        then        36134726
when fr.nm_fornecedor = 'RONDOLAB DIAGNOSTICO COMERCIO E SERVIÇOS LTDA'        then        36134727
when fr.nm_fornecedor = 'C. C. T. MONTOVANI'        then        36134728
when fr.nm_fornecedor = 'VALERIO SOUZA SILVA'        then        36134729
when fr.nm_fornecedor = 'COMERCIO PSV LTDA-FILIAL'        then        36134730
when fr.nm_fornecedor = 'JRP REPRESENTAÇÕES COMERCIO E SERVIÇOS EIRE'        then        36134731
when fr.nm_fornecedor = 'R. A. GONÇALVES OLIVEIRA'        then        36134732
when fr.nm_fornecedor = 'ELO CRIAÇOES TEXTIL LTDA'        then        36134733
when fr.nm_fornecedor = 'JAIR DOMINGOS RAFAEL'        then        36134734
when fr.nm_fornecedor = 'MARCOS DUMER SCHIMIDT'        then        36134735
when fr.nm_fornecedor = 'MARCOS DUMER SCHIMIDT'        then        36134736
when fr.nm_fornecedor = 'PFJ COMERCIO DE GASES LTDA'        then        36134738
when fr.nm_fornecedor = 'EMPLAKAR PLACAS PARA VEICULOS LTDA'        then        36134739
when fr.nm_fornecedor = 'UAN COMERCIO E SERVIÇOS EIRELI'        then        36134740
when fr.nm_fornecedor = 'MARILZA ALVES CORTES PIRES'        then        36134741
when fr.nm_fornecedor = 'COMERCIAL FERREIRA ATACADO E VAREJO LTDA'        then        36134742
when fr.nm_fornecedor = 'R. V. A. COMERCIO DE ALIMENTOS LTDA'        then        36134743
when fr.nm_fornecedor = 'MARINALVA PEREIRA DE OLIVEIRA'        then        36134744
when fr.nm_fornecedor = 'CASA NOEL LTDA'        then        36134745
when fr.nm_fornecedor = 'E. P. MIDINO CAMPOS E CIA LTDA'        then        36134746
when fr.nm_fornecedor = 'FABIANA DE SOUZA SILVA'        then        36134747
when fr.nm_fornecedor = 'BA LUIZ INDUSTRIA E COMERCIO DE MATERIAIS ELETRICO'        then        36134748
when fr.nm_fornecedor = 'MARCELO SIMONI'        then        36134749
when fr.nm_fornecedor = 'DEBORA ISABELE DE OLIVEIRA SANTOS'        then        36134750
when fr.nm_fornecedor = 'BAZAR DISTRIBUIDORA DE UTENCILIOS E DECORAÇÃO LTDA'        then        36134751
when fr.nm_fornecedor = 'CONSELHO REGIONAL DE ENGENHARIA E AGRONOMIA DO ESTADO DE RONDONIA'        then        36134752
when fr.nm_fornecedor = 'BANCO DO BRASIL S/A'        then        36134753
when fr.nm_fornecedor = 'BRASIL FLORA INDUSTRIA E BENEFICIAMENTO DE MADEIRA'        then        36134754
when fr.nm_fornecedor = 'V. VIEIRA AMARO COMERCIO IMPORTALÇAI E EXPORTAÇÃO'        then        36134755
when fr.nm_fornecedor = 'LICITANET EIRELLI'        then        36134756
when fr.nm_fornecedor = 'RAYUDE SOARES'        then        36134757
when fr.nm_fornecedor = 'NORTÃO PRESTADORA DE SERVIÇOS LTDA'        then        36134759
when fr.nm_fornecedor = 'OI S.A.'        then        36134775
when fr.nm_fornecedor = 'GAZIN INDUSTRIA E COMERCIO DE MOVEIS E ELETRODOMESTICOS LTDA'        then        36134776
when fr.nm_fornecedor = 'O. MIRANDA DA ROCHA COMERCIO DE MOVEIS EIRELI'        then        36134777
when fr.nm_fornecedor = 'J.R.COMERCIODE ELETRONICOS E INFORMATICA EIRELI-ME'        then        36134778
when fr.nm_fornecedor = 'F. A ANTONIETTI-ME'        then        36134779
when fr.nm_fornecedor = 'CRISTIANO BAZONI'        then        36134780
when fr.nm_fornecedor = 'A W TECNICA LTDA'        then        36134781
when fr.nm_fornecedor = 'JETMAIS INFORMATICA OTDA'        then        36134782
when fr.nm_fornecedor = 'COMERCIAL VENUS LTDA ME'        then        36134783
when fr.nm_fornecedor = 'PAPELARIA E COSMETICOS NACIONAL LTDA'        then        36134784
when fr.nm_fornecedor = 'EB COMERCIO DE ELETRODOMESTICOS LTDA'        then        36134785
when fr.nm_fornecedor = 'ELENILSON DOMINGUES BARROS'        then        36134786
when fr.nm_fornecedor = 'F. GALDINO DA SILVA LTDA'        then        36134787
when fr.nm_fornecedor = 'CANGUSSU E FURTADO LTDA'        then        36134788
when fr.nm_fornecedor = 'CRISTIELE RUTSATZ LACHOS GONCALVES'        then        36134789
when fr.nm_fornecedor = 'BUNNY AUDIO SYSTEM'        then        36134790
when fr.nm_fornecedor = 'TOP NET PROVEDOR E INFORMATICA LTDA'        then        36134791
when fr.nm_fornecedor = 'NET WAY PARECIS TELECOMUNICACOES LTDA'        then        36134792
when fr.nm_fornecedor = 'H E F SOLUCOES TECNOLOGICAS LTDA'        then        36134793
when fr.nm_fornecedor = 'DIEGOFERNANDO BATISTA'        then        36134794
when fr.nm_fornecedor = 'AR 19 CERTIFICACAO DIGITAL SERVIÇOS LTDA'        then        36134795
when fr.nm_fornecedor = 'ADL INFORMATICA LTDA'        then        36134796
when fr.nm_fornecedor = 'CONSTRULAR MATERIAIS PARA CONSTRUÇÃO'        then        36311200
when fr.nm_fornecedor = 'TORK SUL COMERCIO DE PECAS MARQ E SERV LTDA'        then        36311201
when fr.nm_fornecedor = 'W.ISMAIL E CIA LTDA - ME'        then        36311202
when fr.nm_fornecedor = 'FLORES E BORGES LTDA'        then        36311203
when fr.nm_fornecedor = 'DENTAL MEDICA'        then        36311204
when fr.nm_fornecedor = 'LEISER COMERCIO CONST. E SERVIÇOS LTDA'        then        36311206
when fr.nm_fornecedor = 'STIGMA COMERCIAL LTDA'        then        36311209
when fr.nm_fornecedor = 'ITAGUAI COMERCIO E EMPREENDIMENTOS LTDA'        then        36311210
when fr.nm_fornecedor = 'SISMED - COM E REPRESENTAÇÕES LTDA - ME'        then        36311212
when fr.nm_fornecedor = 'DARTORA & CIA LTDA'        then        36311214
when fr.nm_fornecedor = 'AGUIA EMPRESA DE TRANSPORTE E TURISMO LTDA - ME'        then        36311216
when fr.nm_fornecedor = 'TITO STIPP MEE'        then        36311218
when fr.nm_fornecedor = 'P.APOLINARIO FILHO-ME'        then        36311220
when fr.nm_fornecedor = 'NELSON SILVA & CIA LTDA'        then        36311222
when fr.nm_fornecedor = 'JOAO APARECIDO NERI DOS SANTOS'        then        36311223
when fr.nm_fornecedor = 'A. J. ALVES E CIA LTDA - EPP'        then        36311225
when fr.nm_fornecedor = 'J. L. CONSTRUÇÕES E SERVIÇOS DE JARDINAGEM LTDA'        then        36311227
when fr.nm_fornecedor = 'ATLANTICO COMERCIO E PERFURAÇÃO DE POÇOS ARTESIANOS LTDA'        then        36311228
when fr.nm_fornecedor = 'T. R. REFRIGERAÇÃO LTDA - ME'        then        36311229
when fr.nm_fornecedor = 'CACOAL MOTO SERRAS LTDA.'        then        36311230
when fr.nm_fornecedor = 'EMPRAL PESQUISAS LTDA'        then        36311231
when fr.nm_fornecedor = 'ANTONIO APARECIDO DIAS'        then        36311232
when fr.nm_fornecedor = 'LAURINDO FERREIRA DA SILVA'        then        36311234
when fr.nm_fornecedor = 'M. C. RODRIGUES MAQUINAS E EQUIPAMENTOS PARA ESCRITORIO - ME'        then        36311235
when fr.nm_fornecedor = 'BIOCAL COMERCIO E REPRESENTAÇÕES LTDA'        then        36311237
when fr.nm_fornecedor = 'SUPER MOTO . COM DE MOTOS E PEÇAS LTDA ME'        then        36311238
when fr.nm_fornecedor = 'MAM LATIM AMERICA INDUSTRIA E COMERCIO DE VEI CULO'        then        36311239
when fr.nm_fornecedor = 'MOVEIS ROMERA LTDA'        then        36311240
when fr.nm_fornecedor = 'G1 MOVEIS ELETRODOMESTICO LTDA -ME '        then        36311241
when fr.nm_fornecedor = 'BOAS NOVAS TURISMO LTDA EPP'        then        36311242
when fr.nm_fornecedor = 'MASTTER MOTO COMERCIO DE VEICULO E MOTOS LTDA'        then        36311243
when fr.nm_fornecedor = 'OLYMPUS'        then        36311244
when fr.nm_fornecedor = 'DERLY S. DA SILVA METALURGICA  - ME'        then        36311245
when fr.nm_fornecedor = 'VENEZIA COMERCIO DE CAMINHOES LTDA CACOAL'        then        36311247
when fr.nm_fornecedor = 'KCINCO CAMINHOES E ONIBUS LTDA'        then        36311249
when fr.nm_fornecedor = 'RONALDO ADRIANO ALEXANDRINO'        then        36311250
when fr.nm_fornecedor = 'RAUL ALCANTARA SILVA'        then        36311251
when fr.nm_fornecedor = 'JIRAUTO AUTOMOVEIS LTDA'        then        36311252
when fr.nm_fornecedor = 'EDIVALDO ALVES MORREIRA'        then        36311253
when fr.nm_fornecedor = 'SABENAUTO COMERCIO DE VEICULO LTDA'        then        36311254
when fr.nm_fornecedor = 'V.S DOS SANTOS LIVRARIA E PAPELARIA ME'        then        36311255
when fr.nm_fornecedor = 'COIMBRA IMPORTAÇÃO E EXPORTAÇÃO LTDA'        then        36311257
when fr.nm_fornecedor = 'GTA COMERCIO DE MATERIAIS ELETRICOS LTDA ME'        then        36311258
when fr.nm_fornecedor = 'RONDONIA COMERCIO DE CAMINHOES E MAQUINAS LTDA'        then        36311259
when fr.nm_fornecedor = 'MOBEN COMERCIO DE VEICULOS LTDA'        then        36311260
when fr.nm_fornecedor = 'SANTOS E MAYER COMERCIO DE EQUIPAMENTOS DE INFORMATICA LTDA'        then        36311261
when fr.nm_fornecedor = 'CAMARA INFORMATICA LTDA - ME'        then        36311262
when fr.nm_fornecedor = 'ZICO DIAS DE PAULA  - ME'        then        36311263
when fr.nm_fornecedor = 'CASA DA LAVOURA MAQUNAS E IMPLEMANTOS AGRICULAS'        then        36311264
when fr.nm_fornecedor = 'COMPEX COMERCIAL LTDA'        then        36311265
when fr.nm_fornecedor = 'COMERCIAL AGRICOLA CAPRI LTDA'        then        36311266
when fr.nm_fornecedor = 'R K INDUSTRIA DE IMPLEMANTOS AGRICOLAS LTDA'        then        36311267
when fr.nm_fornecedor = 'INOVAX TELEINFORMATICA LTDA'        then        36311268
when fr.nm_fornecedor = 'JOSE BENVINDO DE CARVALHO'        then        36311269
when fr.nm_fornecedor = 'MILANFLEX INDUSTRIA E COMERCIO DE MOVEIS E EQUIPAMENTOS LTDA'        then        36311270
when fr.nm_fornecedor = 'LAJA LTDA - ME'        then        36311271
when fr.nm_fornecedor = 'ROSSATO E BERTHOLD LTDA'        then        36311272
when fr.nm_fornecedor = 'COMERCIAL VANGUARDEIRA EIRELLI ME'        then        36311273
when fr.nm_fornecedor = 'SCROCCA ELETRO ELETRONICOS EIRELI ME'        then        36311274
when fr.nm_fornecedor = 'SOLUÇÃO PLANEJAMENTO E COMERCIO LTDA'        then        36311275
when fr.nm_fornecedor = 'MASCARELLO CARROCERIAS E ONIBUS LTDA'        then        36311276
when fr.nm_fornecedor = 'MARIA LUIZA DA SILVA-ME'        then        36311277
when fr.nm_fornecedor = 'NISSEY MOTORS LTDA'        then        36311278
when fr.nm_fornecedor = 'FOCO PROJETOS EDUCACIONAIS LTDA-ME'        then        36311279
when fr.nm_fornecedor = 'VS COSTA E CIA LTDA'        then        36311280
when fr.nm_fornecedor = 'PPS PRODUTOS PARA SAUDE LTDA EPP'        then        36311281
when fr.nm_fornecedor = 'CRONO COMERCIO E DISTRIBUIÇÃO EIRELI'        then        36311282
when fr.nm_fornecedor = 'S3 EMPREENDIMENTOS COMERCIO E LOCAÇÕES EIRELI - EPP'        then        36311283
when fr.nm_fornecedor = 'SISTERPEL SUPRIMENTOS PARA INFORMÁTICA LTDA ME'        then        36311284
when fr.nm_fornecedor = 'JOSE DONIZETE PICOLLI'        then        36311285
when fr.nm_fornecedor = 'OLMI INFORMATICA LTDA - EPP'        then        36311286
when fr.nm_fornecedor = 'MOVEIS CAMILA/YOKOTA E BARBOSA LTDA ME'        then        36311287
when fr.nm_fornecedor = 'JAIRO ANTONIO ZANATTA'        then        36311288
when fr.nm_fornecedor = 'CONSTRUTORA HC LTDA EPP'        then        36311289
when fr.nm_fornecedor = 'CODRASA COMÉRCIO E CONSTRUÇÕES EIRELI'        then        36311290
when fr.nm_fornecedor = 'TERRA FORTE LTDA ME'        then        36311291
when fr.nm_fornecedor = 'GIL INFORMATICA LTDA'        then        36311292
when fr.nm_fornecedor = 'AUTOVEMA VEICULOS LTDA'        then        36311293
when fr.nm_fornecedor = 'TOYOTA DO BRASIL LTDA'        then        36311294
when fr.nm_fornecedor = 'NEIANDER STORCH EIRELI ME'        then        36311295
when fr.nm_fornecedor = 'GOMES VEICULOS ESPECIAIS EIRELI'        then        36311296
when fr.nm_fornecedor = 'ITALBUS CARROCERIAS DE ONIBUS LTDA'        then        36311297
when fr.nm_fornecedor = 'V M CONSTRUTORA LTDA EPP'        then        36311298
when fr.nm_fornecedor = 'AUDAX CONSTRUÇÕES E TERRAPLANAGEM EIRELI EPP'        then        36311299
when fr.nm_fornecedor = 'EVALDO F.PESSOA ME'        then        36311300
when fr.nm_fornecedor = 'DALTO & DALTO LTDA'        then        36311301
when fr.nm_fornecedor = 'KCR INDUTRIA E COMERCIO DE EQUIPAMENTOS EIRELI-EPP'        then        36311302
when fr.nm_fornecedor = 'VIXBOT SOLUÇÕES EM INFORMATICA LTDA ME'        then        36311303
when fr.nm_fornecedor = 'DANTASTERRA LTDA EPP'        then        36311304
when fr.nm_fornecedor = 'M. PICIANI PAZINATO COMERCIO DE MATERIAIS ELETRONICOS  - EIRELI'        then        36311305
when fr.nm_fornecedor = 'E. V. FERNANDES'        then        36311306
when fr.nm_fornecedor = 'AC IMOBILIARIA E CONSTRURORA EIRELI'        then        36311307
when fr.nm_fornecedor = 'ERICA DE FATIMA GENTIL'        then        36311308
when fr.nm_fornecedor = 'NFM SILVA CONSTRUÇOES EIRELI'        then        36311310
when fr.nm_fornecedor = 'CLEIDE BEATRIZ IORIS EIRELI'        then        36311311
when fr.nm_fornecedor = 'RR COMERCIO DE ELETROELETRONICOS EIRELI'        then        36311312
when fr.nm_fornecedor = 'OLMIRO THOMAZ MARTINS'        then        36311313
when fr.nm_fornecedor = 'MILANI CONSTRUTORA DE EDIF. E TERRAPL. LDTA'        then        36311314
when fr.nm_fornecedor = 'SOMBRA COM. SERVIÇSO LTDA ME'        then        36311315
when fr.nm_fornecedor = 'CR CONSTRUTORA E SERVIÇOS ESPECIALIZADO LTDA'        then        36311316
when fr.nm_fornecedor = 'AUTOVEMA VEICULOS LTDA'        then        36311317
when fr.nm_fornecedor = 'BR PRIME COM.E SERVIÇOS LTDA'        then        36311318
when fr.nm_fornecedor = 'ALFA COMUNICAÇÃO VISUAL EIRELLI ME'        then        36311319
when fr.nm_fornecedor = 'AMERICA COMERCIO DE PRODUTOS PARA INFORMATICA LTDA'        then        36311320
when fr.nm_fornecedor = 'COVEZI CAMINHOES E ONIBUS LTDA'        then        36311321
when fr.nm_fornecedor = 'PINAFO ATERRO E CASCALHO LTDA ME'        then        36311322
when fr.nm_fornecedor = 'MVP ELETRODOMESTICOS E EQUIPAMENTOS EIRELI'        then        36311323
when fr.nm_fornecedor = 'SIDNEY DO NASCIMENTO'        then        36311324
when fr.nm_fornecedor = 'APFORM INDUSTRIA E COMERCIO DE MOVEIS LTDA'        then        36311325
when fr.nm_fornecedor = 'BIDDEN COMERCIAL LTDA'        then        36311326
when fr.nm_fornecedor = 'ARUMAS INFORMATICAS LTDA'        then        36311327
when fr.nm_fornecedor = 'PRIMEMED EQUIPAPENTOS LTDA'        then        36311328
when fr.nm_fornecedor = 'CUSTOMIZAR DESING COMERCIO E SERVIÇOS LTDA'        then        36311329
when fr.nm_fornecedor = 'DK INFORMATICA LTDA'        then        36311330
when fr.nm_fornecedor = '2M COMERCIO DE VEICULOS LTDA'        then        36311331
when fr.nm_fornecedor = 'DIEGO DE SOUZA ANDRADE'        then        36311332
when fr.nm_fornecedor = 'MJ ENGENHARIA LTDA'        then        36311333
when fr.nm_fornecedor = 'HJ COMERCIO E SERVIÇOS LTDA'        then        36311334
when fr.nm_fornecedor = 'BRUNO PETER AMORIM DE SOUZA 01212683226'        then        36311335
when fr.nm_fornecedor = 'W F DE ALMEIDA'        then        36311336
when fr.nm_fornecedor = 'HIPER OBRAS LTDA'        then        36311337
when fr.nm_fornecedor = 'C E CARVALHO COMERCIAL ME'        then        36311338
when fr.nm_fornecedor = 'P.A.R FRANCA INFORMATICA'        then        36311339
when fr.nm_fornecedor = 'LONDRIHOSP IMP E EXPORT DE PRODUTOS HOSP.'        then        36311340
when fr.nm_fornecedor = 'CONSTRUTORA MCB EIRELI LTDA'        then        36311341
when fr.nm_fornecedor = 'RR LOPES EIRELI ME'        then        36311342
when fr.nm_fornecedor = 'TRANSMAC LOCACOES LTDA'        then        36311343
when fr.nm_fornecedor = 'CIRURGICA SAO FELIPE PROT. PARA SAUDE EIRELI'        then        36311344
when fr.nm_fornecedor = 'CENTRO OESTE COMERCIO IMP. E EXP. DE PROD. HOSP.'        then        36311345
when fr.nm_fornecedor = 'MR TECH INFORMATICA LTDA'        then        36311347
when fr.nm_fornecedor = 'ALTA FREQUENCIA LTDA'        then        36311348
when fr.nm_fornecedor = 'LOPES E SOUZA SOLUÇOES INTEGRADAS LTDA'        then        36311349
when fr.nm_fornecedor = 'REPREMIG REPRESENTACAO E COMERCIO DE MINAS GERAIS'        then        36311350
when fr.nm_fornecedor = 'PEDRO G. FERNANDES'        then        36311351
when fr.nm_fornecedor = 'CONST.UMUARAMA LTDA/EGM SERV.CONTRUS.LTDA'        then        36311352
when fr.nm_fornecedor = 'REDNOV FERRAMENTAS LTDA'        then        36311353
when fr.nm_fornecedor = 'ECS CONST COM SERV LOC EQUIPAMENTOS LTDA'        then        36311354
when fr.nm_fornecedor = 'A. PAZINATO MARINGA'        then        36311355
when fr.nm_fornecedor = 'RODA BRASIL REPRESENTAÇOES COM E SERV LTDA EPP'        then        36311356
when fr.nm_fornecedor = 'INSTRAMED IND.MEDICO HOSPITALAR LTDA'        then        36311358
when fr.nm_fornecedor = 'LANG CONSTRUTORA LTDA'        then        36566367
end as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS fornecedor,
dt_movimento as dataCadastro,
nr_docto as numeroComprovante,
sum (vl_movimento) as valorEntrada,
JSON_QUERY((SELECT 36134397 as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS responsavel
FROM ALMOMovimentacao al
JOIN COMPFornecedores fr ON al.cd_fornecedor = fr.cd_fornecedor
join ALMOProdutos pr on al.cd_produto = pr.cd_produto
WHERE al.sg_direcao = 'CD' and al.aa_movimento = '2024' and qt_movimento > 0 and al.fl_devolucao is null
group by nr_docto,fr.nm_fornecedor, dt_movimento,cd_almoxa
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const almoxarifadoObject = JSON.parse(record.almoxarifado);
            const almoxarifadoId = almoxarifadoObject ? almoxarifadoObject.id : null;
            const id = almoxarifadoId ? almoxarifadoId.toString() : null;

            const idResponsavel = JSON.parse(record.responsavel);

            return {
                context: {
                    almoxarifado: id,
                    exercicio: formatDate2(record.dataCadastro)
                },
                conteudo: {
                    dataCadastro: formatDate(record.dataCadastro),
                    numeroComprovante: record.numeroComprovante ? record.numeroComprovante.toString() : null,
                    valorEntrada: record.valorEntrada ? record.valorEntrada : null,
                    //observacao: record.observacao ? record.observacao : null,
                    //objeto: record.objeto ? record.objeto : null,
                    almoxarifado: {
                        id:almoxarifadoId
                    },
                    organograma: {
                        id:JSON.parse(record.organograma).id ? parseInt(JSON.parse(record.organograma).id, 10) : null,
                    },
                    naturezaMovimentacao: {
                        id:JSON.parse(record.naturezaMovimentacao).id ? JSON.parse(record.naturezaMovimentacao).id : null,
                    },
                    responsavel: {
                        id: idResponsavel.id
                    },
                    fornecedor: {
                        id: JSON.parse(record.fornecedor).id ? JSON.parse(record.fornecedor).id : null,
                    }
                }
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
            const response = await fetch('https://services.almoxarifado.betha.cloud/estoque-services/api/conversoes/lotes/entradas', {
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
