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
    //return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function formatDate2(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    const hours = (`0${d.getHours()}`).slice(-2);
    const minutes = (`0${d.getMinutes()}`).slice(-2);
    const seconds = (`0${d.getSeconds()}`).slice(-2);
    return `${year}-${month}-${day}`;
    //return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados
        const selectDatabaseQuery = 'USE TRIBUTOS2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
        select
cd_Contribuinte as idIntegracao,
JSON_QUERY((SELECT 410960 as idAgrupamentos,
                                   1283849 as idCamposAdicionais,
                                   case when dt_CadastroBanco > 0 then dt_CadastroBanco
                                        else 1990
                                   end as dtBase,
                                   case
                                     when ds_razaosocial = '48.846.406 ANDRESSA CRISTIELE ALMEIDA ' then 15620796
  when ds_razaosocial = ' 50.199.668 ROSIANE IOLI DO PRADO' then 15620793
  when ds_razaosocial = '50.247.017 TENANDES NUNES MORAIS' then 15620797
  when ds_razaosocial = '50.670.804 FABIANA COELHO COSTA ' then 15620798
  when ds_razaosocial = '50.724.708 GILMAR CESCONETTO ' then 15620799
  when ds_razaosocial = 'A. C. R. DA COSTA - ME' then 15620804
  when ds_razaosocial = 'ADÃO GONÇALVES CORDEIRO' then 15620814
  when ds_razaosocial = 'ADELIA PEREIRA DA ROCHA GUEDES' then 15620815
  when ds_razaosocial = 'ADENIR SOARES DE SOUZA' then 15620816
  when ds_razaosocial = 'A DE OLIVEIRA CONFEITARIA - ME' then 15620800
  when ds_razaosocial = 'ADILSON CARDOSO RIBEIRO' then 15620817
  when ds_razaosocial = 'A DOS SANTOS MERCADO - ME' then 15620801
  when ds_razaosocial = 'A. D. SOUTO FERNANDES' then 15620805
  when ds_razaosocial = 'A. G. DE ALBRES - ME' then 15620806
  when ds_razaosocial = 'A. GREGIANINI COMERCIO DE PRODUTOS AGROPECUARIOS' then 15620807
  when ds_razaosocial = 'AGROPECUARIA CORUMBIARA S/A' then 15620819
  when ds_razaosocial = 'AGROPECUARIA PIMENTA BUENO ' then 15620820
  when ds_razaosocial = 'AGROPECUARIA  VIZZOTTO LTDA' then 15620818
  when ds_razaosocial = 'AGUIAR E HONORATO LTDA ME' then 15620821
  when ds_razaosocial = 'A. HERBST TEIXEIRA TRANSPORTES - ME' then 15620808
  when ds_razaosocial = 'A. IGNÁCIO DE LIMA - MEE' then 15620809
  when ds_razaosocial = 'ALAN VINICIUS DA ROSA CASSEMIRO 00335680224' then 15620822
  when ds_razaosocial = 'ALDINO MAGALHÕES' then 15620823
  when ds_razaosocial = 'ALEXANDRO FERNANDES DE OLIVEIRA' then 15620825
  when ds_razaosocial = 'ALEXANDRO FERNANDES DE OLIVEIRA' then 15620824
  when ds_razaosocial = 'ALTO ALEGRE MINERAIS S.A' then 15620826
  when ds_razaosocial = 'A. M. C. FACHINI' then 15620810
  when ds_razaosocial = 'A. M. DE ALMEIDA - ME' then 15620811
  when ds_razaosocial = 'ANA ALICE HOFFMANN' then 15620827
  when ds_razaosocial = 'ANTONIO GILBERTO DOS SANTOS' then 15620828
  when ds_razaosocial = 'ANTONIO JOSÉ DE ANDRADE - ME' then 15620829
  when ds_razaosocial = 'ANTONIO MARCOS CARAMURU DOS SANTOS' then 15620830
  when ds_razaosocial = 'ANTÔNIO MARTINS CARROCERIAS' then 15620831
  when ds_razaosocial = 'A P DUARTE LTDA' then 15620802
  when ds_razaosocial = 'A.P. MONTIBELLER - ME' then 15620813
  when ds_razaosocial = 'A. R. DOS ANGELOS' then 15620812
  when ds_razaosocial = 'ARISTEU E FIUZA LTDA - ME' then 15620832
  when ds_razaosocial = 'ASSOC. DE PAIS E PROF. ESCOLA B. L. GONÇALVES' then 15620833
  when ds_razaosocial = 'ASSOCIAÇÃO BENEFICENTE DO IDOSO MONTE SINAI DE PARECIS.' then 15620834
  when ds_razaosocial = 'ASSOCIAÇÃO DE PAIS E AMIGOS DOS EXCEPCIONAIS' then 15620835
  when ds_razaosocial = 'ASSOCIACAO DE PRODUTORES RURAIS BOA ESPERANCA-APRUBE' then 15620836
  when ds_razaosocial = 'ASSOCIAÇÃO DE PRODUTORES RURAIS NOVA ESPERANÇA ' then 15620837
  when ds_razaosocial = 'ASSOCIACAO DOS PRODUTORES RURAIS DO ASSENTAMENTO CORREGO RICO - APRUACOR' then 15620838
  when ds_razaosocial = 'ASSOCIAÇÃO DOS PRODUTORES RURAIS NOVA UNIAO-APRUNU' then 15620839
  when ds_razaosocial = 'AUTO POSTO PARECIS LTDA - ME' then 15620840
  when ds_razaosocial = 'A V GUEDES ' then 15620803
  when ds_razaosocial = 'B B DE JESUS PANIFICADORA LTDA' then 15620841
  when ds_razaosocial = 'BF ASSESSORIA E GESTAO EMPRESSARIAL' then 15620973
  when ds_razaosocial = 'BOI NORTE AGROPECUARIA LTDA ' then 15620974
  when ds_razaosocial = 'BOLETTI COMERCIO DE MEDICAMENTOS LTDH' then 15620975
  when ds_razaosocial = 'B.P. COMERCIO E REPRESENTAÇÕES LTDA' then 15620842
  when ds_razaosocial = 'BRASIL FLORA INDUSTRIA COMERCIO E BENEFICIAMENTO DE MADEIRAS LTDA' then 15620976
  when ds_razaosocial = 'BRUNO PETER AMORIM DE SOUZA 01212683226' then 15620977
  when ds_razaosocial = 'CARAMORI COMERCIO E ALIMENTOS LTDA' then 15620983
  when ds_razaosocial = 'CARMEM LUCIA DE OLIVEIRA MONTE' then 15620984
  when ds_razaosocial = 'CARMORAES SUPERMERCADO EIRELE - ME' then 15620985
  when ds_razaosocial = 'CASA DOS PARAFUSOS COMERCIO DE FERRAGENS FERRAMENTAS EIRELI' then 15620986
  when ds_razaosocial = 'C. A. S. BALEEIRO' then 15620978
  when ds_razaosocial = 'C. DA SILVA MILITAO' then 15620979
  when ds_razaosocial = 'CENTRAIS ELETRICAS CESAR FILHO LTDA.' then 15620987
  when ds_razaosocial = 'CENTRO DE FORMAÇÃO DE CONDUTORES RJ LTDA' then 15620988
  when ds_razaosocial = 'CESAR E CESAR CONSTRUÇÕES E MINERAÇÃO LTDA' then 15620989
  when ds_razaosocial = 'CLAUDINO BISPO DOS SANTOS' then 15620990
  when ds_razaosocial = 'CLEBER BRESSANI DOS SANTOS' then 15620991
  when ds_razaosocial = 'CLETO APOLINÁRIO DA CRUZ' then 15620992
  when ds_razaosocial = 'CLEUS EDELSON GONÇALVES DE ANDRADE' then 15620993
  when ds_razaosocial = 'CLEUZA LUZIA DO NASCIMENTO TEIXEIRA' then 15620994
  when ds_razaosocial = 'CLOVIS ANTONIO DE OLIVEIRA' then 15620995
  when ds_razaosocial = 'CLOVIS SANTOS BORELLA' then 15620996
  when ds_razaosocial = 'C.O.G. DE ANDRADE - ME' then 15620982
  when ds_razaosocial = 'COM.E INSTALADORA DE ENERGIA PARECIS LTDA - ME' then 15620997
  when ds_razaosocial = 'COMERCIO DE ALIMENTOS EXTRA LTDA ME' then 15620998
  when ds_razaosocial = 'COMERCIO DE PRODUTOS VETERINARIOS PINEDA LTDA ME' then 15620999
  when ds_razaosocial = 'CONGREGAÇÃO CRISTÃ NO BRASIL' then 15621000
  when ds_razaosocial = 'CONSTRUTORA COSTA & COSTA LTDA - ME' then 15621001
  when ds_razaosocial = 'CONSTRUTORA MONTIBELLER MALOVINI - LTDA' then 15621002
  when ds_razaosocial = 'CONSTRUVAL CONSTRUTORA VALE DO ARARA LTDA' then 15621003
  when ds_razaosocial = 'COOPERATIVA DE CREDITO CENTRO SUL RONDONIENSE' then 15621004
  when ds_razaosocial = 'COOPERATIVA DE CREDITO DO CENTRO SUL RONDONIESE' then 15621005
  when ds_razaosocial = 'COSTA & COSTA COMERCIO LTDA - ME' then 15621006
  when ds_razaosocial = 'COSTA E COSTA COMERCIO LTDA-ME' then 15621007
  when ds_razaosocial = 'C. R. DE OLIVEIRA SORVETES - ME' then 15620980
  when ds_razaosocial = 'CSAP - COMPANHIA SUL AMERICANA DE PECUARIA S.A' then 15621008
  when ds_razaosocial = 'C. S. BORELLA & BORELLA LTDA - ME' then 15620981
  when ds_razaosocial = 'D. A. BOTELHO' then 15621009
  when ds_razaosocial = 'DALMARIO PEREIRA DE OLIVEIRA' then 15621014
  when ds_razaosocial = 'DANIEL BAETZ MARQUES' then 15621015
  when ds_razaosocial = 'D. ANTUNES DE PAULA - ME' then 15621010
  when ds_razaosocial = ' D B DE LIMA-ME' then 15620794
  when ds_razaosocial = 'DELCIO JOAQUIM DE LIMA' then 15621016
  when ds_razaosocial = 'DELPEÇAS COMERCIO DE PEÇAS E ACESSORIOS LTDA - ME' then 15621017
  when ds_razaosocial = 'DEMILCE DE ARAÚJO LOPES' then 15621018
  when ds_razaosocial = 'DERLI CORDEIRO' then 15621019
  when ds_razaosocial = 'D.G. DA SILVA - ME' then 15621011
  when ds_razaosocial = 'DIEGO DE SOUZA ANDRADE CONTABILIDADE' then 15621020
  when ds_razaosocial = 'DIEGO DE SOUZA ANDRADE CONTABILIDADE ME' then 15621021
  when ds_razaosocial = 'DIONE MARTINS VARGAS' then 15621022
  when ds_razaosocial = 'DIVINO HENRIQUE DE PAULA' then 15621023
  when ds_razaosocial = 'D.M.BARBOZA E TEIXEIRA LTDA - MEE' then 15621013
  when ds_razaosocial = 'D.M.BARBOZA E TEIXEIRA LTDA - MEE' then 15621012
  when ds_razaosocial = 'DURVALINA DE SOUZA  SANTOS - ME' then 15621024
  when ds_razaosocial = 'DUSENIR PIRES DOS SANTOS OLIVEIRA' then 15621025
  when ds_razaosocial = 'E. B. MARQUES REPRESENTAÇÕES - ME' then 15621026
  when ds_razaosocial = 'E. CASTILHO DE ALMEIDA - ME' then 15621027
  when ds_razaosocial = 'EDC TRANSPORTE DE CARGAS SECAS LTDA' then 15621035
  when ds_razaosocial = 'E. DE F. FAUSTINO - ME' then 15621028
  when ds_razaosocial = 'E.DE O. PINTO ATACADO - ME' then 15621034
  when ds_razaosocial = 'EDGAR RIETZ' then 15621036
  when ds_razaosocial = 'EDILSON MARCELO DA SILVA 01686474865' then 15621037
  when ds_razaosocial = 'E. DOMINGOS DOS SANTOS - MEE' then 15621030
  when ds_razaosocial = 'E. DO PRADO SILVA' then 15621029
  when ds_razaosocial = 'EDSON PIANCO DA SILVA - ME' then 15621038
  when ds_razaosocial = 'EGMAR APARECIDA FERREIRA' then 15621039
  when ds_razaosocial = 'ELENILSON DOMINGUES BARROS' then 15621040
  when ds_razaosocial = 'ELETROCENTER ELETRODOMESTICOS LTDA' then 15621041
  when ds_razaosocial = 'ELION BARRETO DE ARAÚJO 31949843572' then 15621042
  when ds_razaosocial = 'ELISANGELA PIAZZA' then 15621043
  when ds_razaosocial = 'ELIZANGELA PIAZZA' then 15621044
  when ds_razaosocial = 'EMPRESA BRASILEIRA DE CORREIOS E TELEGRAFOS' then 15621045
  when ds_razaosocial = 'ENERGISA RONDONIA - DISTRIBUIDORA DE ENERGIA S.A' then 15621046
  when ds_razaosocial = 'E. P. G. OLIVEIRA OLIMAC' then 15621031
  when ds_razaosocial = 'E. PUDANOSCHI SILVA REPRESENTAÇÕES COMERCIAIS' then 15621032
  when ds_razaosocial = 'EQMG AGRICULTURA E PECUARIA LTDA ' then 15621047
  when ds_razaosocial = 'ERICA PATRICIA DE LIMA MARTINS - ME' then 15621048
  when ds_razaosocial = 'E. V. FERNANDES' then 15621033
  when ds_razaosocial = 'EWERTON RONI MANFARDINI EIRELI - ME' then 15621049
  when ds_razaosocial = 'EWERTON RONI MENFARDINI EIRELI - ME' then 15621050
  when ds_razaosocial = 'FÁBIO RODRIGUES DOS SANTOS - MEE' then 15621051
  when ds_razaosocial = 'FAUSTINO & GREGIANINI LTDA' then 15621052
  when ds_razaosocial = 'FAZENDA UNIÃO' then 15621053
  when ds_razaosocial = 'FRANCISCO APOLINARIO PEREIRA' then 15621054
  when ds_razaosocial = 'FRANCISCO AUGUSTO BERRA' then 15621055
  when ds_razaosocial = 'FRANCISCO AURÉLIO SIMÃO' then 15621056
  when ds_razaosocial = 'FREDERICO ANTÔNIO AUS VALLALVA' then 15621057
  when ds_razaosocial = 'GENESSY LISBOA DE SOUZA 66452945220' then 15621058
  when ds_razaosocial = 'GERSON OLIVEIRA DE CALDAS - ME' then 15621059
  when ds_razaosocial = ' G F DE SENA REPRESENTAÇÃO' then 15620795
  when ds_razaosocial = 'GOIASTUR TRANSPORTE & TURISMO LTDA ME' then 15621060
  when ds_razaosocial = 'GONÇALVES E PEREIRA LTDA ME' then 15621061
  when ds_razaosocial = 'HELI DA SILVA ROSSETTO - ME' then 15621062
  when ds_razaosocial = 'HIDROELÉTRICA ALTOÉ LTDA' then 15621063
  when ds_razaosocial = 'I. DA S. SANTOS - ME' then 15621064
  when ds_razaosocial = 'I. FACUNDO DE SOUZA' then 15621065
  when ds_razaosocial = 'I. K. VENTURIM' then 15621066
  when ds_razaosocial = 'ILOIR SILVEIRA' then 15621067
  when ds_razaosocial = 'ILZA MARIA DE OLIVEIRA MEIRELES' then 15621068
  when ds_razaosocial = 'INCOMAF IND. E COM. DE MADEIRAS FILADELFIA LTDA-ME' then 15621069
  when ds_razaosocial = 'IND. E COM. DE MAD. BIOTA DA AMAZÔNIA LTDA-ME' then 15621070
  when ds_razaosocial = 'IRANI OLIVEIRA COTRIM' then 15621071
  when ds_razaosocial = 'ISRAEL ALVES CARVALHO' then 15621072
  when ds_razaosocial = 'IVAIR JOSE SOBANSKI - ME' then 15621093
  when ds_razaosocial = 'IVANILDA GOMES' then 15621094
  when ds_razaosocial = 'IVONEY APOLINARIO DA CRUZ' then 15621095
  when ds_razaosocial = 'JACOMINI & BRITO LTDA - ME' then 15621106
  when ds_razaosocial = 'JAIR MUZINSKI' then 15621107
  when ds_razaosocial = 'JAIRO FLORENTINO PEREIRA' then 15621108
  when ds_razaosocial = 'JB PROJETOS E CONSULTORIA LTDA' then 15621109
  when ds_razaosocial = 'J. DA CUNHA SANTOS EIRELI' then 15621097
  when ds_razaosocial = 'J. IVAN DE PAULA - ME' then 15621098
  when ds_razaosocial = 'J.M. DOS SANTOS' then 15621101
  when ds_razaosocial = 'J.M. GOMES MOTOS - ME' then 15621102
  when ds_razaosocial = 'J.N. SERVIÇOS E TRANPORTES LTDA ' then 15621103
  when ds_razaosocial = 'JOÃO ALVES DA SILVA' then 15621110
  when ds_razaosocial = 'JOÃO BATISTA DE MEIRELES' then 15621111
  when ds_razaosocial = 'JOÃO BATISTA MARQUES' then 15621112
  when ds_razaosocial = 'JOAO CARLOS CESTARI' then 15621113
  when ds_razaosocial = 'JOÃO VILSON MARTINS' then 15621114
  when ds_razaosocial = 'JOAQUIM ALVES MARTINS' then 15621115
  when ds_razaosocial = 'JOAQUIM SOARES DA COSTA' then 15621116
  when ds_razaosocial = 'JOHEM & SCHRAMM LTDA - ME' then 15621117
  when ds_razaosocial = 'JOICE POLIANE MERCLY DE ANDRADE' then 15621118
  when ds_razaosocial = 'JOICIANE DA SILVA BARRETO 70079966209' then 15621119
  when ds_razaosocial = 'JOSÉ ALVES DA CRUZ' then 15621121
  when ds_razaosocial = 'JOSE CARLOS DA SILVA BARBOSA' then 15621122
  when ds_razaosocial = 'JOSÉ CARLOS DE MOURA' then 15621123
  when ds_razaosocial = 'JOSÉ CLAUDIO DIAS PINTO' then 15621124
  when ds_razaosocial = 'JOSEFA RIBEIRO PEREIRA' then 15621134
  when ds_razaosocial = 'JOSE FERREIRA ' then 15621125
  when ds_razaosocial = 'JOSÉ FERREIRA DOS SANTOS' then 15621126
  when ds_razaosocial = 'JOSÉ FRANCISCO DO NASCIMENTO' then 15621127
  when ds_razaosocial = 'JOSÉ LOPES SOBRINHO' then 15621128
  when ds_razaosocial = 'JOSÉ LOPES SOBRINHO' then 15621129
  when ds_razaosocial = 'JOSÉ LOPES SOBRINHO' then 15621130
  when ds_razaosocial = 'JOSE LUCAS VINHAL' then 15621131
  when ds_razaosocial = 'JOSE & MORAIS LTDA - ME' then 15621120
  when ds_razaosocial = 'JOSE OGENIS SERAFIM DOS SANTOS' then 15621132
  when ds_razaosocial = 'JOSE SIMINHUK 24891622253' then 15621133
  when ds_razaosocial = 'JOSIANE PEREIRA DE MORAES' then 15621135
  when ds_razaosocial = 'J. P. MARCELINO EIRELI - ME' then 15621099
  when ds_razaosocial = 'J.P.MORAES-ME' then 15621104
  when ds_razaosocial = 'J. R. COMERCIO DE ELETRONICOS E INFORMATICA LTDA' then 15621100
  when ds_razaosocial = 'J S DE AGUIAR LTDA' then 15621096
  when ds_razaosocial = 'J.S.DE AGUIAR MERCADO - ME' then 15621105
  when ds_razaosocial = 'JUARES PAULO LOUBACK' then 15621136
  when ds_razaosocial = 'JUAREZ PAULO LOUBAK' then 15621137
  when ds_razaosocial = 'JURANDIR RODRIGUES DE MORAIS' then 15621138
  when ds_razaosocial = 'JUSSARA VIEIRA' then 15621139
  when ds_razaosocial = 'K.F.S. DE OLIVEIRA ANDRADE E CIA LTDA - ME' then 15621140
  when ds_razaosocial = 'KLEIN PINTO BARRETO - ME' then 15621141
  when ds_razaosocial = 'KLEIN PINTO BARRETO - ME' then 15621142
  when ds_razaosocial = 'KM RODRIGUES' then 15621143
  when ds_razaosocial = 'LABORATORIO DE ANALISES CLINICAS LTDA ME' then 15621146
  when ds_razaosocial = 'LAURINDO FERREIRA DA SILVA' then 15621147
  when ds_razaosocial = 'LEIA BRESSAMI DE FREITAS SANTOS - ME' then 15621148
  when ds_razaosocial = 'LEONIDES DE CARVALHO JUNIOR' then 15621149
  when ds_razaosocial = 'L. F. ALVES' then 15621144
  when ds_razaosocial = 'LINDOLFO LOOSE - ME' then 15621150
  when ds_razaosocial = 'LINDOMAR ALVES RAIMUNDO' then 15621151
  when ds_razaosocial = 'LINDOMAR ALVES VITOR' then 15621152
  when ds_razaosocial = 'LOTÉRICA IDEAL LTDA' then 15621173
  when ds_razaosocial = 'LUAN FELIPE DA CRUZ' then 15621174
  when ds_razaosocial = 'LUCILENE APARECIDA SILVA' then 15621175
  when ds_razaosocial = 'LUIZ AMARAL DE BRITO - ME' then 15621176
  when ds_razaosocial = 'LUIZ PEREIRA SOBRINHO' then 15621177
  when ds_razaosocial = 'L. V. L CLINICA DE FISIOTERAPIA DA COLUNA LTDA' then 15621145
  when ds_razaosocial = 'MADEIREIRA ANDRES LTDA ME' then 15621182
  when ds_razaosocial = 'MADEIREIRA SAYONARA LTDA-ME' then 15621183
  when ds_razaosocial = 'MADEREIRA 3 D LTDA - ME' then 15621184
  when ds_razaosocial = 'MADEREIRA MADEK' then 15621185
  when ds_razaosocial = 'MANOEL FERREIRA ANJOS' then 15621186
  when ds_razaosocial = 'MANOEL MESSIAS DE MACEDO GOMES' then 15621187
  when ds_razaosocial = 'MANOEL PEREIRA DA SILVA' then 15621188
  when ds_razaosocial = 'MARCILEY DE CARVALHO' then 15621189
  when ds_razaosocial = 'M.A.R. DA CRUZ - ME' then 15621180
  when ds_razaosocial = 'MARIA APARECIDA DE LIMA LUSQUINHO' then 15621190
  when ds_razaosocial = 'MARIA IZABEL NOGUEIRA' then 15621191
  when ds_razaosocial = 'MARIA JOSE DOS SANTOS' then 15621192
  when ds_razaosocial = 'MARIA SOARES DA ROCHA SILVA' then 15621193
  when ds_razaosocial = 'MARILZA APARECIDA DE MORAES' then 15621194
  when ds_razaosocial = 'MARINEIDE FERREIRA DE OLIVEIRA COSTA' then 15621195
  when ds_razaosocial = 'MARQUES & ALVES LTDA - ME' then 15621196
  when ds_razaosocial = 'M.A.T. MARTINS - ME' then 15621181
  when ds_razaosocial = 'MATUZALEM PEREIRA TORRES' then 15621197
  when ds_razaosocial = 'MAURICIO APARECIDO CESTARI' then 15621198
  when ds_razaosocial = 'MAURICIO SERGIO DE LIMA E SILVA' then 15621199
  when ds_razaosocial = 'MERCADO BOECHAT LTDA - ME' then 15621200
  when ds_razaosocial = 'M. F. MONTIBELLER-ME' then 15621179
  when ds_razaosocial = 'MINERADORA JRD  LTDA' then 15621201
  when ds_razaosocial = 'MINERADOURA VALE DO CERRADO VALE-ME' then 15621202
  when ds_razaosocial = 'MIRIAM DUARTE' then 15621203
  when ds_razaosocial = 'MIRIAN THOMAZ MARTINS' then 15621204
  when ds_razaosocial = 'M & M ODONTOLOGIA LTDA' then 15621178
  when ds_razaosocial = 'MONZAIR BEIJO DE ANDRADE' then 15621205
  when ds_razaosocial = 'NADIA MARIA SILVA MONTELO' then 15621206
  when ds_razaosocial = 'NATALINO JESUS ALVES DE AZEVEDO' then 15621207
  when ds_razaosocial = 'NELSON KURYAMA' then 15621208
  when ds_razaosocial = 'NET WAY PARECIS TELECOMUNICAÇÕES LTDA' then 15621209
  when ds_razaosocial = 'NEVES & NEVES LTDA - ME' then 15621210
  when ds_razaosocial = 'NILSON BUENO PEREIRA' then 15621211
  when ds_razaosocial = 'NONDAS DIONIZIO DE LIMA' then 15621212
  when ds_razaosocial = 'NOVA SOROCABANA LTDA - ME' then 15621213
  when ds_razaosocial = 'OFICIO DE REGISTRO CIVIL DAS PESSOAS NATURAIS E TABELIONATO DE NOTAS MUNICIPIO DE PARECIS/RO' then 15621215
  when ds_razaosocial = 'O L ALCARAS' then 15621214
  when ds_razaosocial = 'OLMIRO THOMAZ MARTINZ - ME' then 15621216
  when ds_razaosocial = 'ORLANDO FERREIRA BARBOSA' then 15621217
  when ds_razaosocial = 'ORTIZ E CIA LTDA - ME' then 15621218
  when ds_razaosocial = 'OZANA SILVESTRE DE SOUZA' then 15621219
  when ds_razaosocial = 'PALOMA JHEIME ALENCAR DE SOUZA 00370007212' then 15621220
  when ds_razaosocial = 'PARECIS MATERIAS PARA CONSTRUÇÃO LTDA - ME' then 15621221
  when ds_razaosocial = 'PAULO CARDOSO DA SILVA' then 15621222
  when ds_razaosocial = 'PIAZZA & PIAZZA LTDA - ME' then 15621223
  when ds_razaosocial = 'PINTO & SILVA COMERCIO LTDA - ME' then 15621224
  when ds_razaosocial = 'POSTO DE MOLAS E TRANSPORTADORA ANDRES LTDA' then 15621225
  when ds_razaosocial = 'R. A. ALVES FERREIRA MENDES - ME' then 15621227
  when ds_razaosocial = 'RAFER COMÉRCIO E REPRESENTAÇÕES LTDA - ME' then 15621235
  when ds_razaosocial = 'R. A. M. DE SOUZA - ME' then 15621228
  when ds_razaosocial = 'R. ANTAO DE ALMEIDA REPRESENTAÇÕES' then 15621229
  when ds_razaosocial = 'R. C. CABRAL - ME' then 15621230
  when ds_razaosocial = 'R. C. DOS SANTOS SOUZA E CIA LTDA - ME' then 15621231
  when ds_razaosocial = 'R. C. MORAES TRANSPORTES' then 15621232
  when ds_razaosocial = 'RENATO XAVIER LEPPAUS LTDA' then 15621236
  when ds_razaosocial = 'RIBEIRO E SILVA COMERCIO DE PRODUTOS FARMACEUTICOS LTDA-ME' then 15621237
  when ds_razaosocial = 'ROBERTO CARLOS DA SILVA' then 15621238
  when ds_razaosocial = 'RODRIGUES & CAZAGRANDE LTDA - ME' then 15621239
  when ds_razaosocial = 'ROLIM NET SERVICOS & INTERNET LTDA' then 15621240
  when ds_razaosocial = 'ROMARIO XAVIER LEPPAUS' then 15621241
  when ds_razaosocial = 'RONILDO APARECIDO PEDRO ALEXANDRINO' then 15621242
  when ds_razaosocial = 'ROSELI DOS SANTOS' then 15621243
  when ds_razaosocial = 'ROSENIRA ALEXANDRINO' then 15621244
  when ds_razaosocial = 'R P ALEXANDRINO LTDA' then 15621226
  when ds_razaosocial = 'R. S. GONÇALVES - ME' then 15621233
  when ds_razaosocial = 'R. TABORDA COSTA ANALISES CLINICAS' then 15621234
  when ds_razaosocial = 'RUBENS PEDRO BEZERRA 40842690263' then 15621245
  when ds_razaosocial = 'SAMUEL VITOR DE CAMARGO - ME' then 15621252
  when ds_razaosocial = 'SANTOLINA CARDOSO RIBEIRO' then 15621254
  when ds_razaosocial = 'SANTOLINA CARDOSO RIBEIRO' then 15621253
  when ds_razaosocial = 'SANTOLINA CARDOSO RIBEIRO' then 15621255
  when ds_razaosocial = 'S.COSTA E OLIVEIRA LTDA' then 15621251
  when ds_razaosocial = 'SECUNDINO DE SOUZA NUNES' then 15621256
  when ds_razaosocial = 'S. F. DE MOURA' then 15621247
  when ds_razaosocial = 'S. F. RIBEIRO DOS SANTOS EIRELI' then 15621248
  when ds_razaosocial = 'SIDNEI DOS ANJOS CARVALHO' then 15621257
  when ds_razaosocial = 'SILVA E MONTELO LTDA - ME' then 15621258
  when ds_razaosocial = 'SIMONE MORAES FLORENCIO' then 15621259
  when ds_razaosocial = 'SIRLENE BRIGIDO OLIVEIRA' then 15621260
  when ds_razaosocial = 'SIVAL & ALESSANDRA COMERCIO E ATACADO DE ALIMENTOS LTDA' then 15621261
  when ds_razaosocial = 'S M F DA COSTA LTDA' then 15621246
  when ds_razaosocial = 'SONIA MARIA SILVA CORSINI' then 15621262
  when ds_razaosocial = 'SOUZA & CIQUEIRA COMERCIO LTDA-ME' then 15621293
  when ds_razaosocial = 'SOUZATUR TRANSPORTE & TURISMO LTDA - ME' then 15621294
  when ds_razaosocial = 'SPEED NET TELECOMUNICACOES LTDA' then 15621295
  when ds_razaosocial = 'S. R. DA COSTA REPRESENTAÇÃO - ME' then 15621249
  when ds_razaosocial = 'S. S. DUARTE - ME' then 15621250
  when ds_razaosocial = 'SUPERMERCADO IDEAL LTDA' then 15621296
  when ds_razaosocial = 'TEREZINHA MARIA DA SILVA' then 15621298
  when ds_razaosocial = 'TERRA LIMPA LOCAÇÃO DE MAQUINAS LTDA' then 15621299
  when ds_razaosocial = 'TESCH & CASTRO LTDA - ME' then 15621300
  when ds_razaosocial = 'THAYS GOMES DE CAMPOS FARIA' then 15621301
  when ds_razaosocial = 'THEREZA MARIA DE BARROS GOMES' then 15621302
  when ds_razaosocial = 'TIAGO DEIVIDI DA CRUZ' then 15621303
  when ds_razaosocial = 'TIAGO ELLER GOIS' then 15621304
  when ds_razaosocial = 'T. I. DOS SANTOS CRISOSTHEMOS - ME' then 15621297
  when ds_razaosocial = 'VALDECIR DEL NERO' then 15621308
  when ds_razaosocial = 'VALDINEY SANTOS DA ROSA' then 15621309
  when ds_razaosocial = 'VALDIR DEL NERO - ME' then 15621310
  when ds_razaosocial = 'VALERIA FERREIRA QUINTÃO ROMANHA 04218537275' then 15621311
  when ds_razaosocial = 'VBC ENGENHARIA' then 15621312
  when ds_razaosocial = 'VERÔNICA VIEIRA DA SILVA - ME' then 15621313
  when ds_razaosocial = 'V. EURIPEDES SANTOS MARTINS - ME' then 15621305
  when ds_razaosocial = 'VILMA EURIPEDES SANTOS' then 15621314
  when ds_razaosocial = 'VILMA EURIPEDES SANTOS MARTINS' then 15621315
  when ds_razaosocial = 'VITOR HUGO MOURA RODRIGUES' then 15621316
  when ds_razaosocial = 'VIVIANE IND. E COM. DE MADEIRA LTDA.' then 15621317
  when ds_razaosocial = 'V. L. DE MORAES - ME' then 15621306
  when ds_razaosocial = 'VONI JOSE DE OLIVEIRA' then 15621318
  when ds_razaosocial = 'V. T. DE SOUZA' then 15621307
  when ds_razaosocial = 'WALDIR ALVES' then 15621320
  when ds_razaosocial = 'WASHINGTON SIQUEIRA DA SILVA' then 15621321
  when ds_razaosocial = 'WEDER BATISTA' then 15621322
  when ds_razaosocial = 'WEDSON ROQUE DINIZ CARRARO' then 15621323
  when ds_razaosocial = 'WESLEI DA SILVA PINTO' then 15621324
  when ds_razaosocial = 'W. J. DE LIMA - ME' then 15621319
  when ds_razaosocial = 'YAGRO GESTAO E PLANEJAMENTO DE FAZENDAS LTDA' then 15621325
  when ds_razaosocial = 'Z. G. DA SILVA & MATOS LTDA - ME' then 15621326

                                   end as idEconomico,
                                   vl_area_ocupada as vlCampo FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS imoveisInfComplem
from ISSContribuintes CT
`;
        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const imoveisInfComplem = JSON.parse(record.imoveisInfComplem);

            console.log(imoveisInfComplem);
            return {
                idIntegracao: record.idIntegracao.toString(),
                economicosInfComplem: {
                    idAgrupamentos: imoveisInfComplem.idAgrupamentos,
                    idCamposAdicionais: imoveisInfComplem.idCamposAdicionais,
                    dhCampo: formatDate(imoveisInfComplem.dtBase), // Mapeando dtBase para dhCampo
                    idEconomico: imoveisInfComplem.idEconomico,
                    vlCampo: imoveisInfComplem.vlCampo,
                    dtBase: formatDate2(imoveisInfComplem.dtBase),
                }
            };
        });

        let report = [];
        let reportIds = []; // Array para armazenar os IDs retornados pela API

         for (const record of transformedData) {
            const idIntegracao = record.idIntegracao; // ID dinâmico da integração

            if (idIntegracao) { // Verifica se o ID da integração é válido
                try {
                    // Coloca o registro dentro de um array
                    const requestBody = [record];

                    // Exibir o corpo da requisição antes de enviá-la
                    console.log('Enviando o seguinte corpo para a API:', JSON.stringify(requestBody, null, 2));

                    const response = await fetch(`https://tributos.betha.cloud/service-layer-tributos/api/economicosInfComplem`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                        },
                        body: JSON.stringify(requestBody) // Envia o registro dentro de um array
                    });

                    const responseBody = await response.json();
                    console.log('Corpo da resposta da API:', responseBody); // Log da resposta

                    if (response.ok) {
                        console.log('Dados enviados com sucesso para a API.');
                        report.push({ record, status: 'success', response: responseBody });

                        // Armazenar o ID retornado pela API no reportIds
                        if (responseBody.idLote) { // Acessando idLote em vez de id
                            reportIds.push(responseBody.idLote);
                        }
                    } else {
                        console.error('Erro ao enviar os dados para a API:', response.statusText);
                        console.error('Corpo da resposta de erro:', responseBody);
                        report.push({ record, status: 'failed', response: responseBody });
                    }

                } catch (err) {
                    console.error('Erro ao enviar o registro para a API:', err);
                    report.push({ record, status: 'error', error: err.message });
                }
            } else {
                console.warn('ID de integração inválido. O registro será ignorado.', record);
                report.push({ record, status: 'invalid', error: 'ID de integração inválido.' });
            }
        }

        // Salvar o relatório em 'report.json'
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));
        console.log('Relatório salvo em report.json com sucesso.');

        // Salvar os reportIds no arquivo 'report_id.json'
        fs.writeFileSync('report_id.json', JSON.stringify(reportIds, null, 2));
        console.log('report_id.json salvo com sucesso.');

    } catch (error) {
        console.error('Erro no processo:', error);
    } finally {
        await sql.close(); // Fechar a conexão com o SQL Server
        console.log('Conexão com o SQL Server fechada.');
    }
}

// Executar a função principal
main();