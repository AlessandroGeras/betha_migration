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

        // Selecionar o banco de dados "TRIBUTOS2024"
        const selectDatabaseQuery = 'USE TRIBUTOS2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            SELECT
cd_Contribuinte as idIntegracao,
JSON_QUERY(
                (SELECT
 '4102199' as idBairro,
 '76979000' as cep,
 cd_numcorr as numero,
 'SIM' AS principal,
 '3573' AS idMunicipio,
 '22' AS idEstado,
 '1' as ordem,
 case ds_EnderCorr
                 WHEN 'LINHA 75, KM 08 FAZENDA VIDA NOVA' THEN 14461462
        WHEN 'AGUIA BRANCA' THEN 14461469
        WHEN 'BEIRA RIO' THEN 14461463
        WHEN 'CARLOS GOMES' THEN 14461464
        WHEN 'DAS GARÇAS' THEN 14461475
        WHEN 'DAS LARANJEIRAS' THEN 14461467
        WHEN 'DOS PIONEIROS' THEN 14461474
        WHEN 'IGUAÇU' THEN 14461476
        WHEN 'LINHA 75' THEN 14461479
        WHEN 'P 06 KM 01' THEN 14461468
        WHEN 'P-14, KM 05' THEN 14461470
        WHEN ',' THEN 14461478
        WHEN 'ALMIRANTE TAMANDARE' THEN 14461482
        WHEN 'ALMIRANTE TAMANDARÉ' THEN 14461465
        WHEN 'ANTÔNIO JESUS DE OLIVEIRA' THEN 14461466
        WHEN 'ARARAS' THEN 14461473
        WHEN 'AV BEIJA FLOR' THEN 14461471
        WHEN 'AV CARLOS GOMES' THEN 14461481
        WHEN 'AV. CARLOS GOMES N. 772' THEN 14461483
        WHEN 'AV. SALVADOR N. 5531' THEN 14461495
        WHEN 'BENEDITO LAURINDO GONÇALVES' THEN 14461484
        WHEN 'BENTEVI' THEN 14461472
        WHEN 'CANARIO' THEN 14461477
        WHEN 'CANINDÉ' THEN 14461485
        WHEN 'CARLOS DRUMMOND DE ANDRADE' THEN 14461488
        WHEN 'CASTELO BRANCO' THEN 14461480
        WHEN 'DA MATRIZ' THEN 14461489
        WHEN 'DAS ARARAS' THEN 14461486
        WHEN 'DOS IMIGRANTES' THEN 14461507
        WHEN 'DOS PIONEIROS' THEN 14461474
        WHEN 'DOS PIRIQUITOS' THEN 14461512
        WHEN 'DUQUE DE CAIXIAS' THEN 14461501
        WHEN 'DUQUE DE CAXIAS' THEN 14461493
        WHEN 'ÉRICO VERÍSSIMO' THEN 14461498
        WHEN 'EURICO  VERICIO' THEN 14461502
        WHEN 'GETÚLIO DORNELES VARGAS' THEN 14461503
        WHEN 'GETÚLIO DORNELLES VARGAS' THEN 14461497
        WHEN 'GRACILIANO RAMOS' THEN 14461500
        WHEN 'JAIR DIAS' THEN 14461505
        WHEN 'JAIR DIAS ESQUINA C/ LINHA 75' THEN 14461487
        WHEN 'JORGE AMADO' THEN 14461492
        WHEN 'JOSÉ RODRIGUES DE OLIVEIRA' THEN 14461506
        WHEN 'JUDITE JESUS DE OLIVEIRA PARUSSULO' THEN 14461515
        WHEN 'LINHA 75' THEN 14461479
        WHEN 'MACHADO DE ASSIS' THEN 14461494
        WHEN 'MANOEL ANTÔNIO DE OLIVEIRA' THEN 14461517
        WHEN 'MANOEL RIBAS' THEN 14461509
        WHEN 'MONTEIRO LOBATO' THEN 14461511
        WHEN 'ORLANDINO JESUS DE OLIVEIRA' THEN 14461491
        WHEN 'PERIQUITO' THEN 14461496
        WHEN 'RUA JUDITE JESUS DE O PARUSSUL' THEN 14461499
        WHEN 'RUA ORLANDINO JESUS DE OLIVEIRA' THEN 14461514
        WHEN 'SABIÁ' THEN 14461508
        WHEN 'SETE DE SETEMBRO' THEN 14461510
        WHEN 'TUIUIU' THEN 14461513
        WHEN 'YPE' THEN 14461504
        ELSE 14461478
                end as idLogradouro,
 case ds_razaosocial
        when        'DIEGO DE SOUZA ANDRADE CONTABILIDADE'        then        77520720
when        'ELETROCENTER ELETRODOMESTICOS LTDA'        then        77520721
when        'E.DE O. PINTO ATACADO - ME'        then        77520722
when        'DERLI CORDEIRO'        then        77520723
when        'D. A. BOTELHO'        then        77520724
when        'DALMARIO PEREIRA DE OLIVEIRA'        then        77520725
when        'DEMILCE DE ARAÚJO LOPES'        then        77520726
when        'DURVALINA DE SOUZA  SANTOS - ME'        then        77520727
when        'A DE OLIVEIRA CONFEITARIA - ME'        then        77520728
when        'A. D. SOUTO FERNANDES'        then        77520729
when        'A DOS SANTOS MERCADO - ME'        then        77520730
when        'ANTONIO JOSÉ DE ANDRADE - ME'        then        77520731
when        'ADELIA PEREIRA DA ROCHA GUEDES'        then        77520732
when        'A. M. DE ALMEIDA - ME'        then        77520733
when        'E. CASTILHO DE ALMEIDA - ME'        then        77520734
when        'ANTONIO MARCOS CARAMURU DOS SANTOS'        then        77520735
when        'ARISTEU E FIUZA LTDA - ME'        then        77520736
when        'COSTA E COSTA COMERCIO LTDA-ME'        then        77520737
when        'ALDINO MAGALHÕES'        then        77520738
when        'SILVA E MONTELO LTDA - ME'        then        77520739
when        'D.M.BARBOZA E TEIXEIRA LTDA - MEE'        then        77520740
when        'ALEXANDRO FERNANDES DE OLIVEIRA'        then        77520741
when        'ADÃO GONÇALVES CORDEIRO'        then        77520742
when        'ADENIR SOARES DE SOUZA'        then        77520743
when        'A. G. DE ALBRES - ME'        then        77520744
when        'A. M. C. FACHINI'        then        77520745
when        'A. IGNÁCIO DE LIMA - MEE'        then        77520746
when        'JUSSARA VIEIRA'        then        77520747
when        'CONSTRUVAL CONSTRUTORA VALE DO ARARA LTDA'        then        77520748
when        'CLEUZA LUZIA DO NASCIMENTO TEIXEIRA'        then        77520749
when        'CONSTRUTORA MONTIBELLER MALOVINI - LTDA'        then        77520750
when        'CONGREGAÇÃO CRISTÃ NO BRASIL'        then        77520751
when        'HIDROELÉTRICA ALTOÉ LTDA'        then        77520752
when        'ILOIR SILVEIRA'        then        77520753
when        'IND. E COM. DE MAD. BIOTA DA AMAZÔNIA LTDA-ME'        then        77520754
when        'IVAIR JOSE SOBANSKI - ME'        then        77520755
when        'ILZA MARIA DE OLIVEIRA MEIRELES'        then        77520756
when        'EDSON PIANCO DA SILVA - ME'        then        77520757
when        'FRANCISCO AUGUSTO BERRA'        then        77520758
when        'R. A. ALVES FERREIRA MENDES - ME'        then        77520759
when        'FRANCISCO AURÉLIO SIMÃO'        then        77520760
when        'FREDERICO ANTÔNIO AUS VALLALVA'        then        77520761
when        'FÁBIO RODRIGUES DOS SANTOS - MEE'        then        77520762
when        'GERSON OLIVEIRA DE CALDAS - ME'        then        77520763
when        'CARMEM LUCIA DE OLIVEIRA MONTE'        then        77520764
when        'HELI DA SILVA ROSSETTO - ME'        then        77520765
when        'CLETO APOLINÁRIO DA CRUZ'        then        77520766
when        'C. R. DE OLIVEIRA SORVETES - ME'        then        77520767
when        'C.O.G. DE ANDRADE - ME'        then        77520768
when        'DANIEL BAETZ MARQUES'        then        77520769
when        'DUSENIR PIRES DOS SANTOS OLIVEIRA'        then        77520770
when        'ASSOC. DE PAIS E PROF. ESCOLA B. L. GONÇALVES'        then        77520771
when        'E. DE F. FAUSTINO - ME'        then        77520772
when        'E. DOMINGOS DOS SANTOS - MEE'        then        77520773
when        'E. P. G. OLIVEIRA OLIMAC'        then        77520774
when        'JOÃO BATISTA MARQUES'        then        77520775
when        'JOSEFA RIBEIRO PEREIRA'        then        77520776
when        'JOSÉ CARLOS DE MOURA'        then        77520777
when        'JOSÉ CLAUDIO DIAS PINTO'        then        77520778
when        'JURANDIR RODRIGUES DE MORAIS'        then        77520779
when        'JOSÉ FRANCISCO DO NASCIMENTO'        then        77520900
when        'JUARES PAULO LOUBACK'        then        77520901
when        'JOSÉ LOPES SOBRINHO'        then        77520902
when        'JOÃO BATISTA DE MEIRELES'        then        77520903
when        'JOÃO ALVES DA SILVA'        then        77520904
when        'JOSÉ ALVES DA CRUZ'        then        77520905
when        'JAIRO FLORENTINO PEREIRA'        then        77520906
when        'JAIR MUZINSKI'        then        77520907
when        'J. IVAN DE PAULA - ME'        then        77520908
when        'MARIA APARECIDA DE LIMA LUSQUINHO'        then        77520909
when        'MIRIAM DUARTE'        then        77520910
when        'MAURICIO APARECIDO CESTARI'        then        77520911
when        'MATUZALEM PEREIRA TORRES'        then        77520912
when        'MARINEIDE FERREIRA DE OLIVEIRA COSTA'        then        77520913
when        'MARIA IZABEL NOGUEIRA'        then        77520914
when        'MARCILEY DE CARVALHO'        then        77520915
when        'MERCADO BOECHAT LTDA - ME'        then        77520916
when        'KLEIN PINTO BARRETO - ME'        then        77520917
when        'LUIZ AMARAL DE BRITO - ME'        then        77520918
when        'LINDOLFO LOOSE - ME'        then        77520919
when        'LEONIDES DE CARVALHO JUNIOR'        then        77520920
when        'LUIZ PEREIRA SOBRINHO'        then        77520921
when        'LEIA BRESSAMI DE FREITAS SANTOS - ME'        then        77520922
when        'MANOEL PEREIRA DA SILVA'        then        77520923
when        'COM.E INSTALADORA DE ENERGIA PARECIS LTDA - ME'        then        77520924
when        'MADEREIRA MADEK'        then        77520925
when        'MADEREIRA 3 D LTDA - ME'        then        77520926
when        'NELSON KURYAMA'        then        77520927
when        'NATALINO JESUS ALVES DE AZEVEDO'        then        77520928
when        'NILSON BUENO PEREIRA'        then        77520929
when        'OZANA SILVESTRE DE SOUZA'        then        77520930
when        'OLMIRO THOMAZ MARTINZ - ME'        then        77520931
when        'ORTIZ E CIA LTDA - ME'        then        77520932
when        'PAULO CARDOSO DA SILVA'        then        77520933
when        'A.P. MONTIBELLER - ME'        then        77520934
when        'R. A. M. DE SOUZA - ME'        then        77520935
when        'ROBERTO CARLOS DA SILVA'        then        77520936
when        'R. C. DOS SANTOS SOUZA E CIA LTDA - ME'        then        77520937
when        'R. C. CABRAL - ME'        then        77520938
when        'R. TABORDA COSTA ANALISES CLINICAS'        then        77520939
when        'SAMUEL VITOR DE CAMARGO - ME'        then        77520940
when        'SIDNEI DOS ANJOS CARVALHO'        then        77520941
when        'SECUNDINO DE SOUZA NUNES'        then        77520942
when        'SANTOLINA CARDOSO RIBEIRO'        then        77520943
when        'SANTOLINA CARDOSO RIBEIRO'        then        77520944
when        'TEREZINHA MARIA DA SILVA'        then        77520945
when        'ROSENIRA ALEXANDRINO'        then        77520946
when        'RAFER COMÉRCIO E REPRESENTAÇÕES LTDA - ME'        then        77520947
when        'THEREZA MARIA DE BARROS GOMES'        then        77520948
when        'T. I. DOS SANTOS CRISOSTHEMOS - ME'        then        77520949
when        'WEDER BATISTA'        then        77520950
when        'W. J. DE LIMA - ME'        then        77520951
when        'VALDIR DEL NERO - ME'        then        77520952
when        'WALDIR ALVES'        then        77520953
when        'VALDECIR DEL NERO'        then        77520954
when        'VBC ENGENHARIA'        then        77520955
when        'VIVIANE IND. E COM. DE MADEIRA LTDA.'        then        77520956
when        'V. EURIPEDES SANTOS MARTINS - ME'        then        77520957
when        'VERÔNICA VIEIRA DA SILVA - ME'        then        77520958
when        'VALDINEY SANTOS DA ROSA'        then        77520959
when        'MONZAIR BEIJO DE ANDRADE'        then        77520960
when        'ALEXANDRO FERNANDES DE OLIVEIRA'        then        77520961
when        'MIRIAN THOMAZ MARTINS'        then        77520962
when        'JUAREZ PAULO LOUBAK'        then        77520963
when        'CLEUS EDELSON GONÇALVES DE ANDRADE'        then        77520964
when        'JOAQUIM ALVES MARTINS'        then        77520965
when        'JOSÉ LOPES SOBRINHO'        then        77520966
when        'JOSÉ LOPES SOBRINHO'        then        77520967
when        'JOSÉ FERREIRA DOS SANTOS'        then        77520968
when        'ORLANDO FERREIRA BARBOSA'        then        77520969
when        'DELCIO JOAQUIM DE LIMA'        then        77520970
when        'SANTOLINA CARDOSO RIBEIRO'        then        77520971
when        'D.M.BARBOZA E TEIXEIRA LTDA - MEE'        then        77520972
when        'MADEIREIRA ANDRES LTDA ME'        then        77520973
when        'COMERCIO DE ALIMENTOS EXTRA LTDA ME'        then        77520974
when        'GOIASTUR TRANSPORTE & TURISMO LTDA ME'        then        77520975
when        'COMERCIO DE PRODUTOS VETERINARIOS PINEDA LTDA ME'        then        77520976
when        'M.A.R. DA CRUZ - ME'        then        77520977
when        'AGUIAR E HONORATO LTDA ME'        then        77520978
when        'M.A.T. MARTINS - ME'        then        77520979
when        'J.S.DE AGUIAR MERCADO - ME'        then        77520980
when        'S.COSTA E OLIVEIRA LTDA'        then        77520981
when        'GONÇALVES E PEREIRA LTDA ME'        then        77520982
when        'DELPEÇAS COMERCIO DE PEÇAS E ACESSORIOS LTDA - ME'        then        77520983
when        'K.F.S. DE OLIVEIRA ANDRADE E CIA LTDA - ME'        then        77520984
when        'D.G. DA SILVA - ME'        then        77520985
when        'V. L. DE MORAES - ME'        then        77520986
when        'EGMAR APARECIDA FERREIRA'        then        77520987
when        'VILMA EURIPEDES SANTOS MARTINS'        then        77520988
when        'J.M. GOMES MOTOS - ME'        then        77520989
when        'EDGAR RIETZ'        then        77520990
when        'COOPERATIVA DE CREDITO CENTRO SUL RONDONIENSE'        then        77520991
when        'MADEIREIRA SAYONARA LTDA-ME'        then        77520992
when        'INCOMAF IND. E COM. DE MADEIRAS FILADELFIA LTDA-ME'        then        77520993
when        'IVANILDA GOMES'        then        77520994
when        'VONI JOSE DE OLIVEIRA'        then        77520995
when        'JOAQUIM SOARES DA COSTA'        then        77520996
when        'FRANCISCO APOLINARIO PEREIRA'        then        77520997
when        'LINDOMAR ALVES VITOR'        then        77520998
when        'J.M. DOS SANTOS'        then        77520999
when        'RONILDO APARECIDO PEDRO ALEXANDRINO'        then        77521000
when        'ELISANGELA PIAZZA'        then        77521001
when        'MANOEL FERREIRA ANJOS'        then        77521002
when        'LUCILENE APARECIDA SILVA'        then        77521003
when        'ELIZANGELA PIAZZA'        then        77521004
when        'B.P. COMERCIO E REPRESENTAÇÕES LTDA'        then        77521005
when        'ENERGISA RONDONIA - DISTRIBUIDORA DE ENERGIA S.A'        then        77521006
when        'MARIA SOARES DA ROCHA SILVA'        then        77521007
when        'KLEIN PINTO BARRETO - ME'        then        77521008
when        'MARIA JOSE DOS SANTOS'        then        77521009
when        'JOSE & MORAIS LTDA - ME'        then        77521010
when        'CENTRO DE FORMAÇÃO DE CONDUTORES RJ LTDA'        then        77521011
when        'M. F. MONTIBELLER-ME'        then        77521012
when        'EMPRESA BRASILEIRA DE CORREIOS E TELEGRAFOS'        then        77521013
when        'SOUZA & CIQUEIRA COMERCIO LTDA-ME'        then        77521014
when        'PINTO & SILVA COMERCIO LTDA - ME'        then        77521015
when        'JACOMINI & BRITO LTDA - ME'        then        77521016
when        'JOSE CARLOS DA SILVA BARBOSA'        then        77521017
when        'DIVINO HENRIQUE DE PAULA'        then        77521018
when        'C. S. BORELLA & BORELLA LTDA - ME'        then        77521019
when        'PIAZZA & PIAZZA LTDA - ME'        then        77521020
when        'B B DE JESUS PANIFICADORA LTDA'        then        77521021
when        'RIBEIRO E SILVA COMERCIO DE PRODUTOS FARMACEUTICOS LTDA-ME'        then        77521022
when        'RODRIGUES & CAZAGRANDE LTDA - ME'        then        77521023
when        'LOTÉRICA IDEAL LTDA'        then        77521024
when        'MARQUES & ALVES LTDA - ME'        then        77521025
when        'J. DA CUNHA SANTOS EIRELI'        then        77521026
when        'AUTO POSTO PARECIS LTDA - ME'        then        77521027
when        'JOAO CARLOS CESTARI'        then        77521028
when        'COSTA & COSTA COMERCIO LTDA - ME'        then        77521029
when        'ASSOCIACAO DE PRODUTORES RURAIS BOA ESPERANCA-APRUBE'        then        77521030
when        'SOUZATUR TRANSPORTE & TURISMO LTDA - ME'        then        77521031
when        'VITOR HUGO MOURA RODRIGUES'        then        77521032
when        'THAYS GOMES DE CAMPOS FARIA'        then        77521033
when        'JOHEM & SCHRAMM LTDA - ME'        then        77521034
when        'I. DA S. SANTOS - ME'        then        77521035
when        'MANOEL MESSIAS DE MACEDO GOMES'        then        77521036
when        'CLOVIS ANTONIO DE OLIVEIRA'        then        77521037
when        'ASSOCIAÇÃO DOS PRODUTORES RURAIS NOVA UNIAO-APRUNU'        then        77521038
when        'SIRLENE BRIGIDO OLIVEIRA'        then        77521039
when        'MAURICIO SERGIO DE LIMA E SILVA'        then        77521040
when        'LAURINDO FERREIRA DA SILVA'        then        77521041
when        'CARMORAES SUPERMERCADO EIRELE - ME'        then        77521042
when        'SONIA MARIA SILVA CORSINI'        then        77521043
when        'ASSOCIAÇÃO DE PAIS E AMIGOS DOS EXCEPCIONAIS'        then        77521044
when        'NADIA MARIA SILVA MONTELO'        then        77521045
when        'CLAUDINO BISPO DOS SANTOS'        then        77521046
when        'CLEBER BRESSANI DOS SANTOS'        then        77521047
when        'CLOVIS SANTOS BORELLA'        then        77521048
when        'IVONEY APOLINARIO DA CRUZ'        then        77521049
when        'NONDAS DIONIZIO DE LIMA'        then        77521050
when        'JOSE LUCAS VINHAL'        then        77521051
when        'CONSTRUTORA COSTA & COSTA LTDA - ME'        then        77521052
when        'D. ANTUNES DE PAULA - ME'        then        77521053
when        'EWERTON RONI MENFARDINI EIRELI - ME'        then        77521054
when        'EWERTON RONI MANFARDINI EIRELI - ME'        then        77521055
when        'NEVES & NEVES LTDA - ME'        then        77521056
when        'ERICA PATRICIA DE LIMA MARTINS - ME'        then        77521057
when        'Z. G. DA SILVA & MATOS LTDA - ME'        then        77521058
when        'E. B. MARQUES REPRESENTAÇÕES - ME'        then        77521059
when        'S. R. DA COSTA REPRESENTAÇÃO - ME'        then        77521060
when        'COOPERATIVA DE CREDITO DO CENTRO SUL RONDONIESE'        then        77521061
when        'CESAR E CESAR CONSTRUÇÕES E MINERAÇÃO LTDA'        then        77521062
when        'A. C. R. DA COSTA - ME'        then        77521063
when        'ELENILSON DOMINGUES BARROS'        then        77521064
when        'I. K. VENTURIM'        then        77521065
when        'LABORATORIO DE ANALISES CLINICAS LTDA ME'        then        77521066
when        'TESCH & CASTRO LTDA - ME'        then        77521067
when        'PARECIS MATERIAS PARA CONSTRUÇÃO LTDA - ME'        then        77521068
when        'JOICE POLIANE MERCLY DE ANDRADE'        then        77521069
when        'NOVA SOROCABANA LTDA - ME'        then        77521070
when        'J. P. MARCELINO EIRELI - ME'        then        77521071
when        'R. S. GONÇALVES - ME'        then        77521072
when        'S. S. DUARTE - ME'        then        77521073
when        'JOÃO VILSON MARTINS'        then        77521074
when        'C. A. S. BALEEIRO'        then        77521075
when        'R. C. MORAES TRANSPORTES'        then        77521076
when        'R. ANTAO DE ALMEIDA REPRESENTAÇÕES'        then        77521077
when        'WASHINGTON SIQUEIRA DA SILVA'        then        77521078
when        'E. PUDANOSCHI SILVA REPRESENTAÇÕES COMERCIAIS'        then        77521079
when        'E. V. FERNANDES'        then        77521080
when        'EDILSON MARCELO DA SILVA 01686474865'        then        77521081
when        'A. HERBST TEIXEIRA TRANSPORTES - ME'        then        77521082
when        'GENESSY LISBOA DE SOUZA 66452945220'        then        77521083
when        'S. F. DE MOURA'        then        77521084
when        'DIEGO DE SOUZA ANDRADE CONTABILIDADE ME'        then        77521085
when        'I. FACUNDO DE SOUZA'        then        77521086
when        'AGROPECUARIA CORUMBIARA S/A'        then        77521087
when        'S. F. RIBEIRO DOS SANTOS EIRELI'        then        77521088
when        'TIAGO DEIVIDI DA CRUZ'        then        77521089
when        'WEDSON ROQUE DINIZ CARRARO'        then        77521090
when        'V. T. DE SOUZA'        then        77521091
when        'M & M ODONTOLOGIA LTDA'        then        77521092
when        'S M F DA COSTA LTDA'        then        77521093
when        'L. F. ALVES'        then        77521094
when        'ADILSON CARDOSO RIBEIRO'        then        77521095
when        'LUAN FELIPE DA CRUZ'        then        77521096
when        'A. GREGIANINI COMERCIO DE PRODUTOS AGROPECUARIOS '        then        77521097
when        'L. V. L CLINICA DE FISIOTERAPIA DA COLUNA LTDA'        then        77521098
when        'CASA DOS PARAFUSOS COMERCIO DE FERRAGENS FERRAMENTAS EIRELI'        then        77521099
when        'ANTONIO GILBERTO DOS SANTOS'        then        77521100
when        'E. DO PRADO SILVA'        then        77521101
when        'WESLEI DA SILVA PINTO'        then        77521102
when        'TERRA LIMPA LOCAÇÃO DE MAQUINAS LTDA'        then        77521103
when        'R P ALEXANDRINO LTDA'        then        77521104
when        'FAUSTINO & GREGIANINI LTDA'        then        77521105
when        'J.P.MORAES-ME'        then        77521106
when        'ANTÔNIO MARTINS CARROCERIAS'        then        77521107
when        'ISRAEL ALVES CARVALHO'        then        77521108
when        'FAZENDA UNIÃO'        then        77521109
when        'ANA ALICE HOFFMANN'        then        77521110
when        'ALAN VINICIUS DA ROSA CASSEMIRO 00335680224'        then        77521111
when        'SIMONE MORAES FLORENCIO'        then        77521112
when        'MINERADOURA VALE DO CERRADO VALE-ME'        then        77521113
when        ' D B DE LIMA-ME'        then        77521114
when        ' G F DE SENA REPRESENTAÇÃO'        then        77521115
when        'JOSIANE PEREIRA DE MORAES'        then        77521116
when        'RUBENS PEDRO BEZERRA 40842690263'        then        77521117
when        'VALERIA FERREIRA QUINTÃO ROMANHA 04218537275'        then        77521118
when        'IRANI OLIVEIRA COTRIM'        then        77521119
when        'ELION BARRETO DE ARAÚJO 31949843572'        then        77521120
when        'PALOMA JHEIME ALENCAR DE SOUZA 00370007212'        then        77521121
when        'JOICIANE DA SILVA BARRETO 70079966209'        then        77521122
when        'ROLIM NET SERVICOS & INTERNET LTDA'        then        77521123
when        'BRUNO PETER AMORIM DE SOUZA 01212683226'        then        77521124
when        'JOSE OGENIS SERAFIM DOS SANTOS'        then        77521125
when        'DIONE MARTINS VARGAS'        then        77521126
when        'YAGRO GESTAO E PLANEJAMENTO DE FAZENDAS LTDA'        then        77521127
when        'EDC TRANSPORTE DE CARGAS SECAS LTDA'        then        77521128
when        'MARILZA APARECIDA DE MORAES'        then        77521129
when        'LINDOMAR ALVES RAIMUNDO'        then        77521130
when        'ROMARIO XAVIER LEPPAUS'        then        77521131
when        'TIAGO ELLER GOIS'        then        77521132
when        'JOSE FERREIRA '        then        77521133
when        'VILMA EURIPEDES SANTOS'        then        77521134
when        'NET WAY PARECIS TELECOMUNICAÇÕES LTDA'        then        77521135
when        'BOLETTI COMERCIO DE MEDICAMENTOS LTDH'        then        77521136
when        ' 50.199.668 ROSIANE IOLI DO PRADO'        then        77521137
when        'JOSE SIMINHUK 24891622253'        then        77521138
when        'BF ASSESSORIA E GESTAO EMPRESSARIAL'        then        77521139
when        'J S DE AGUIAR LTDA'        then        77521140
when        'KM RODRIGUES'        then        77521141
when        'AGROPECUARIA  VIZZOTTO LTDA'        then        77521142
when        'A V GUEDES '        then        77521143
when        'RENATO XAVIER LEPPAUS LTDA'        then        77521144
when        '50.670.804 FABIANA COELHO COSTA '        then        77521145
when        '50.724.708 GILMAR CESCONETTO '        then        77521146
when        'MINERADORA JRD  LTDA'        then        77521147
when        'BRASIL FLORA INDUSTRIA COMERCIO E BENEFICIAMENTO DE MADEIRAS LTDA'        then        77521148
when        'SUPERMERCADO IDEAL LTDA'        then        77521149
when        'CENTRAIS ELETRICAS CESAR FILHO LTDA.'        then        77521150
when        'SIVAL & ALESSANDRA COMERCIO E ATACADO DE ALIMENTOS LTDA'        then        77521151
when        'POSTO DE MOLAS E TRANSPORTADORA ANDRES LTDA'        then        77521152
when        'CARAMORI COMERCIO E ALIMENTOS LTDA'        then        77521153
when        'AGROPECUARIA PIMENTA BUENO '        then        77521154
when        'ASSOCIACAO DOS PRODUTORES RURAIS DO ASSENTAMENTO CORREGO RICO - APRUACOR'        then        77521155
when        '50.247.017 TENANDES NUNES MORAIS'        then        77521156
when        'C. DA SILVA MILITAO'        then        77521157
when        'A P DUARTE LTDA'        then        77521158
when        'SPEED NET TELECOMUNICACOES LTDA'        then        77521159
when        'ROSELI DOS SANTOS'        then        77521160
when        'JB PROJETOS E CONSULTORIA LTDA'        then        77521161
when        'OFICIO DE REGISTRO CIVIL DAS PESSOAS NATURAIS E TABELIONATO DE NOTAS MUNICIPIO DE PARECIS/RO'        then        77521162
when        'A. R. DOS ANGELOS'        then        77521163
when        'O L ALCARAS'        then        77521164
when        'J. R. COMERCIO DE ELETRONICOS E INFORMATICA LTDA'        then        77521165
when        'J.N. SERVIÇOS E TRANPORTES LTDA '        then        77521166
when        '48.846.406 ANDRESSA CRISTIELE ALMEIDA '        then        77521167
when        'ASSOCIAÇÃO DE PRODUTORES RURAIS NOVA ESPERANÇA '        then        77521168
when        'BOI NORTE AGROPECUARIA LTDA '        then        77521169
when        'ASSOCIAÇÃO BENEFICENTE DO IDOSO MONTE SINAI DE PARECIS '        then        77521170
when        'ALTO ALEGRE MINERAIS S.A'        then        77521171
when        'EQMG AGRICULTURA E PECUARIA LTDA '        then        77521172
when        'CSAP - COMPANHIA SUL AMERICANA DE PECUARIA S.A.'        then        77521173
                end as idPessoa                
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS pessoas
FROM ISSContribuintes

        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const pessoa = JSON.parse(record.pessoas);

            return {
                idIntegracao: record.idIntegracao,
                pessoasEnderecos: {
                    idPessoa: pessoa.idPessoa,
                    idLogradouro: pessoa.idLogradouro,
                    idBairro: pessoa.idBairro,
                    idMunicipio: pessoa.idMunicipio,
                    idEstado: pessoa.idEstado,
                    principal: pessoa.principal,
                    cep: pessoa.cep,
                    numero: pessoa.numero,
                    ordem: pessoa.ordem,
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
            const response = await fetch('https://tributos.betha.cloud/service-layer-tributos/api/pessoasEnderecos', {
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
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        sql.close();
    }
}

main();
