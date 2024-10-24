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
    const year = d.getUTCFullYear();
    const month = (`0${d.getUTCMonth() + 1}`).slice(-2);
    const day = (`0${d.getUTCDate()}`).slice(-2);
    const hours = (`0${d.getUTCHours()}`).slice(-2);
    const minutes = (`0${d.getUTCMinutes()}`).slice(-2);
    const seconds = (`0${d.getUTCSeconds()}`).slice(-2);
    return `${year}-${month}-${day}`;
    //return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function formatDate2(date) {
    const d = new Date(date);
    const year = d.getUTCFullYear();
    const month = (`0${d.getUTCMonth() + 1}`).slice(-2);
    const day = (`0${d.getUTCDate()}`).slice(-2);
    const hours = (`0${d.getUTCHours()}`).slice(-2);
    const minutes = (`0${d.getUTCMinutes()}`).slice(-2);
    const seconds = (`0${d.getUTCSeconds()}`).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    //return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "COMP_ALMO"
        const selectDatabaseQuery = 'USE FOLHADB';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            	SELECT 
    cd_Funcionario AS idIntegracao,
    dt_Admissao AS dataInicioContrato,
    'false' AS geraRegistroPreliminar,
    CASE 
        WHEN cd_Situacao = 1 THEN 'TRABALHANDO'
        WHEN cd_Situacao = 2 THEN 'TRABALHANDO'
        WHEN cd_Situacao = 3 THEN 'PENSIONISTA'
        WHEN cd_Situacao = 8 THEN 'APOSENTADO'
        WHEN cd_Situacao = 9 THEN 'PENSIONISTA'
        WHEN cd_Situacao = 11 THEN 'AFASTADO'
        WHEN cd_Situacao = 12 THEN 'AFASTADO'
        WHEN cd_Situacao = 13 THEN 'AFASTADO'
        WHEN cd_Situacao = 14 THEN 'AFASTADO'
        WHEN cd_Situacao = 15 THEN 'AFASTADO'
        WHEN cd_Situacao = 16 THEN 'FERIAS'
        WHEN cd_Situacao = 17 THEN 'TRABALHANDO'
        WHEN cd_Situacao = 18 THEN 'AFASTADO'
        WHEN cd_Situacao = 19 THEN 'CESSADO'
        WHEN cd_Situacao = 85 THEN 'FALTA'
        WHEN cd_Situacao = 99 THEN 'DEMITIDO'
        ELSE 'SITUAÇÃO DESCONHECIDA' -- caso tenha outros códigos não mapeados
    END AS situacao,
    CASE 
        WHEN cd_VincEmpr = 10 THEN 'FUNCIONARIO'
        WHEN cd_VincEmpr = 11 THEN 'FUNCIONARIO'
        WHEN cd_VincEmpr = 12 THEN 'FUNCIONARIO'
        WHEN cd_VincEmpr = 13 THEN 'FUNCIONARIO'
        WHEN cd_VincEmpr = 14 THEN 'ESTAGIARIO'
        WHEN cd_VincEmpr = 21 THEN 'FUNCIONARIO'
        WHEN cd_VincEmpr = 22 THEN 'FUNCIONARIO'
        WHEN cd_VincEmpr = 23 THEN 'FUNCIONARIO'
        WHEN cd_VincEmpr = 25 THEN 'FUNCIONARIO'
        WHEN cd_VincEmpr = 26 THEN 'FUNCIONARIO'
        WHEN cd_VincEmpr = 27 THEN 'FUNCIONARIO'
        WHEN cd_VincEmpr = 28 THEN 'FUNCIONARIO'
        WHEN cd_VincEmpr = 29 THEN 'FUNCIONARIO'
        WHEN cd_VincEmpr = 30 THEN 'FUNCIONARIO'
        WHEN cd_VincEmpr = 31 THEN 'FUNCIONARIO'
        WHEN cd_VincEmpr = 32 THEN 'FUNCIONARIO'
        WHEN cd_VincEmpr = 41 THEN 'AUTONOMO'
        WHEN cd_VincEmpr = 50 THEN 'FUNCIONARIO'
        WHEN cd_VincEmpr = 81 THEN 'APOSENTADO'
        WHEN cd_VincEmpr = 91 THEN 'PENSIONISTA'
        WHEN cd_VincEmpr = 92 THEN 'PENSIONISTA'
        WHEN cd_VincEmpr = 95 THEN 'FUNCIONARIO'
        ELSE 'VINCULO DESCONHECIDO'
    END AS tipo,
    nm_Funcionario AS nome,
    CASE
        WHEN nm_Funcionario = 'ABEL INACIO DE LIMA'	THEN 15187120
        when nm_Funcionario = 'ABEL INACIO DE LIMA'	then	15187120
        when nm_Funcionario = 'ADALBERTO AMARAL DE BRITO'	then	15165457
        when nm_Funcionario = 'ADELCIO AMARAL DE BRITO'	then	15187150
        when nm_Funcionario = 'ADELINA AOIAGUI DA SILVA'	then	15187435
        when nm_Funcionario = 'ADEMAL GONCALVES ULHIOA'	then	15187151
        when nm_Funcionario = 'ADEMAR DA CONCEICAO'	then	15187578
        when nm_Funcionario = 'ADENILSON GOMES DA SILVA'	then	15165454
        when nm_Funcionario = 'ADENIR GOUVEIA DO PRADO VIEIRA'	then	15187152
        when nm_Funcionario = 'ADEVANIR BARBOZA DA SILVA'	then	15187423
        when nm_Funcionario = 'ADILSON HOULANDER'	then	15187729
        when nm_Funcionario = 'ADIR IGNACIO DE LIMA'	then	15165466
        when nm_Funcionario = 'ADRIANA AIOAGUI DA SILVA'	then	15187600
        when nm_Funcionario = 'ADRIANA CRISTINA DOS SANTOS FERREIRA'	then	15187572
        when nm_Funcionario = 'ADRIANA MOREIRA CORSINI'	then	15187483
        when nm_Funcionario = 'ADRIANA THIANE BARBOSA DA SILVA'	then	15187597
        when nm_Funcionario = 'ADRIANA TOMAZ'	then	15187777
        when nm_Funcionario = 'ADRIANO IOLI'	then	15187861
        when nm_Funcionario = 'ADRIANO SIQUEIRA NOGUEIRA'	then	15187500
        when nm_Funcionario = 'ADRIELE PAZARRO CHAGAS DA COSTA'	then	15187875
        when nm_Funcionario = 'ADRIEL SILVARES DE OLIVEIRA'	then	15187574
        when nm_Funcionario = 'AGENOR DOS SANTOS BROILO'	then	15187292
        when nm_Funcionario = 'AGNALDO FELISBERTO BATISTA'	then	15187153
        when nm_Funcionario = 'AGNALDO RIBEIRO DE OLIVEIRA'	then	15187727
        when nm_Funcionario = 'AGUIMAR BEIJO FERREIRA'	then	15187154
        when nm_Funcionario = 'AIANA CAROLINE SETTE DUPINHAKE'	then	15187583
        when nm_Funcionario = 'ALAN MATOS PEREIRA BASTOS'	then	15187732
        when nm_Funcionario = 'ALBERTO BARTOLOMEU'	then	15187372
        when nm_Funcionario = 'ALBERTO MARCELO CUSTODIO FACHINI'	then	15187369
        when nm_Funcionario = 'ALCIONI FRANCISCO RODRIGUES'	then	15187568
        when nm_Funcionario = 'ALDAIR RAFAEL DA PAZ'	then	15165692
        when nm_Funcionario = 'ALESSANDRA FARIA VIANA'	then	15187518
        when nm_Funcionario = 'ALESSANDRA FERREIRA DE SOUZA'	then	15187885
        when nm_Funcionario = 'ALESSANDRO AGUIAR DA SILVA'	then	15187690
        when nm_Funcionario = 'ALESSON SOUZA BRITO'	then	15187836
        when nm_Funcionario = 'ALEXANDRE DE MORAIS GUIMARAES'	then	15187410
        when nm_Funcionario = 'ALEXANDRE RIBEIRO RODRIGUES'	then	15187436
        when nm_Funcionario = 'ALINE DA SILVA SETTE'	then	15187922
        when nm_Funcionario = 'ALMIR FERREIRA DA CRUZ'	then	15187155
        when nm_Funcionario = 'ALVARA SOBRINHO DE JESUS FRANKOVIAK'	then	15187773
        when nm_Funcionario = 'ALVIT DA ROSA'	then	15187156
        when nm_Funcionario = 'AMALIA BENEDITA ALVES MARTINS'	then	15187157
        when nm_Funcionario = 'AMAREY ALVES DOS SANTOS'	then	15187295
        when nm_Funcionario = 'AMARILDO CARDOSO RIBEIRO'	then	15187361
        when nm_Funcionario = 'AMELIA BORGERT SCHLICKMANN'	then	15187158
        when nm_Funcionario = 'ANA BRAULINA PINHO'	then	15187301
        when nm_Funcionario = 'ANA CLAUDIA FREITAS DE MELO'	then	15165684
        when nm_Funcionario = 'ANA DA SILVA'	then	15187393
        when nm_Funcionario = 'ANA GOMES DE OLIVEIRA'	then	15187556
        when nm_Funcionario = 'ANA LUCIA FRANCISCO DE AMORIM SOUZA'	then	15187159
        when nm_Funcionario = 'ANA MARIA JOSE DE LIMA BICHI'	then	15187160
        when nm_Funcionario = 'ANA PAULA DE OLIVEIRA DA SILVA'	then	15187925
        when nm_Funcionario = 'ANA PAULA FAVETTA'	then	15187476
        when nm_Funcionario = 'ANA PAULA MONTIBELLER'	then	15187445
        when nm_Funcionario = 'ANA PAULA WALKER'	then	15187424
        when nm_Funcionario = 'ANDERSON GALDINO DA SILVA'	then	15187287
        when nm_Funcionario = 'ANDERSON  LOBIANCO'	then	15187475
        when nm_Funcionario = 'ANDERSON LUCAS FAJARDO'	then	15187359
        when nm_Funcionario = 'ANDREIA CAZAGRANDE'	then	15165464
        when nm_Funcionario = 'ANDREIA RIBEIRO RODRIGUES'	then	15187757
        when nm_Funcionario = 'ANDRE ROGERIO SATO DE FREITAS'	then	15187462
        when nm_Funcionario = 'ANDRIELI PEREIRA DA SILVA'	then	15187863
        when nm_Funcionario = 'ANGELICA TONINI DA SILVA'	then	15187820
        when nm_Funcionario = 'ANGELITA INACIO LIMA'	then	15187390
        when nm_Funcionario = 'ANNY KELLY VINHAL CASAGRANDE'	then	15187472
        when nm_Funcionario = 'ANTENOR DA COSTA BRANDAO'	then	15187294
        when nm_Funcionario = 'ANTONIO BATISTA DA SILVA'	then	15187336
        when nm_Funcionario = 'ANTONIO CARLOS ARGIONA OLIVEIRA'	then	15165476
        when nm_Funcionario = 'ANTONIO CARLOS GUIMARÃES'	then	15187440
        when nm_Funcionario = 'ANTONIO DE OLIVEIRA'	then	15187161
        when nm_Funcionario = 'ANTONIO DOS SANTOS SILVA'	then	15187162
        when nm_Funcionario = 'ANTONIO FERREIRA SOARES'	then	15187562
        when nm_Funcionario = 'ANTONIO FRANCISCO DA CRUZ'	then	15187771
        when nm_Funcionario = 'ANTONIO JOSE DE ANDRADE'	then	15187767
        when nm_Funcionario = 'ANTONIO MARCOS MOREIRA'	then	15187454
        when nm_Funcionario = 'ANY CAROLINE SANTANA SALA'	then	15187864
        when nm_Funcionario = 'APARECIDA GIL DA SILVA'	then	15187776
        when nm_Funcionario = 'APARECIDA MARQUES ALVES KAISERKAMP'	then	15187163
        when nm_Funcionario = 'APARECIDA RODRIGUES COTRIN'	then	15187164
        when nm_Funcionario = 'APARECIDO MARTINS CARVALHO'	then	15165483
        when nm_Funcionario = 'ARCILIO JOSE FRANCISCO'	then	15187316
        when nm_Funcionario = 'ARIANE LEMES DA SILVA'	then	15187737
        when nm_Funcionario = 'ARISTOTELES FELIX GARCEZ FILHO'	then	15187321
        when nm_Funcionario = 'ARLI BORBA DE ALMEIDA'	then	15187447
        when nm_Funcionario = 'ARLINDO FERREIRA GOMES'	then	15187165
        when nm_Funcionario = 'ARTHUR PAULO DE LIMA'	then	15187341
        when nm_Funcionario = 'ARVELINO GOMES DA SILVA'	then	15187595
        when nm_Funcionario = 'AURINEIA PEREIRA LANDIS'	then	15187419
        when nm_Funcionario = 'BENAIA FERREIRA GOMES ROMANHA'	then	15187366
        when nm_Funcionario = 'BENEDITO SOARES'	then	15187166
        when nm_Funcionario = 'BENIGNA HEIZEN DE LIMA'	then	15187296
        when nm_Funcionario = 'BERNARDO SCHMIDT TEXEIRA PENNA'	then	15165672
        when nm_Funcionario = 'BRUNO ELER MELOCRA'	then	15187843
        when nm_Funcionario = 'BRUNO PÉTER AMORIM DE SOUZA'	then	15187790
        when nm_Funcionario = 'BRUNO PRUDENTE RIBEIRO DE OLIVEIRA'	then	15165501
        when nm_Funcionario = 'CAMILA DE SOUZA ULHOA'	then	15187853
        when nm_Funcionario = 'CAMILA FRANCA'	then	15187567
        when nm_Funcionario = 'CAMILA MICHELE DE MOURA FELIPE'	then	15187485
        when nm_Funcionario = 'CARINA SILVA CANDIDO'	then	15187878
        when nm_Funcionario = 'CARLA ALESSANDRA DA SILVA'	then	15165477
        when nm_Funcionario = 'CARLOS EDUARDO BARRETO ACCIOLY'	then	15187325
        when nm_Funcionario = 'CARLOS PACHECO DOS SANTOS JUNIOR'	then	15187930
        when nm_Funcionario = 'CARLOS ROBERTO SERAFIM SOUZA'	then	15187451
        when nm_Funcionario = 'CECILIA SANTANA VENTURIM NUNES'	then	15187167
        when nm_Funcionario = 'CELINA MARIA DA SILVA'	then	15187538
        when nm_Funcionario = 'CELINA XAVIER DO NASCIMENTO SILVA'	then	15187921
        when nm_Funcionario = 'CELINO JOSE DE ANDRADE'	then	15165458
        when nm_Funcionario = 'CELIO PEDRO BEZERRA'	then	15165490
        when nm_Funcionario = 'CELIO SIMINHUK'	then	15165498
        when nm_Funcionario = 'CELSON CANDIDO DA ROCHA'	then	15165493
        when nm_Funcionario = 'CLAUDIA ANTONIA CARDOSO SILVA SANTOS'	then	15187557
        when nm_Funcionario = 'CLAUDIA BARCELOS LIMA'	then	15187432
        when nm_Funcionario = 'CLAUDIANA MACHADO DA SILVA'	then	15187506
        when nm_Funcionario = 'CLAUDILAINE PAULA DA SILVA FAUSTINO'	then	15187696
        when nm_Funcionario = 'CLAUDINO BISPO SANTOS'	then	15187334
        when nm_Funcionario = 'CLAUDIO APARECIDO TOMAZ'	then	15187558
        when nm_Funcionario = 'CLEIDIANE MACHADO CAMPOS'	then	15187720
        when nm_Funcionario = 'CLEIDIR DE FATIMA RAGNEL'	then	15187584
        when nm_Funcionario = 'CLEILA GOCALVES DE ANDRADE BORGES'	then	15187168
        when nm_Funcionario = 'CLEINE GONÇALVES DE ANDRADE'	then	15187403
        when nm_Funcionario = 'CLEOSDETE GONCALVES DE ANDRADE'	then	15165423
        when nm_Funcionario = 'CLETO APOLINARIO DA CRUZ'	then	15165463
        when nm_Funcionario = 'CLEUNI INACIO OLIVEIRA'	then	15187169
        when nm_Funcionario = 'CLEUS EDELSON GONCALVES DE ANDRADE'	then	15187170
        when nm_Funcionario = 'CLEUS HUMBERTO GONCALVES DE ANDRADE'	then	15187172
        when nm_Funcionario = 'CLEUSMAR GONCALVES ANDRADE'	then	15187171
        when nm_Funcionario = 'CLEUSOMAR DE LIMA'	then	15187173
        when nm_Funcionario = 'CLEUS OMILTON GONÇALVES DE ANDRADE'	then	15187456
        when nm_Funcionario = 'CLOVIS SANTO BORELLA FILHO'	then	15187684
        when nm_Funcionario = 'CONCEIÇAO DE JESUS REIS'	then	15187924
        when nm_Funcionario = 'CREUZA MENDES DE SOUZA'	then	15187363
        when nm_Funcionario = 'CRISTIANE DOS SANTOS LEMOS'	then	15187385
        when nm_Funcionario = 'CRISTIANE GONÇALVES DELMONDES'	then	15187509
        when nm_Funcionario = 'CRISTIANE ROMANHO PESSOA'	then	15187404
        when nm_Funcionario = 'CRISTIANO APARECIDO TOMAZ'	then	15187847
        when nm_Funcionario = 'CRISTIANO DA SILVA'	then	15187380
        when nm_Funcionario = 'CRISTINA ALVES PEREIRA'	then	15187580
        when nm_Funcionario = 'CRISTINO LEMES DOS SANTOS BRITO'	then	15187533
        when nm_Funcionario = 'DAIANE PEREIRA BASTOS'	then	15187799
        when nm_Funcionario = 'DAIANY DE OLIVEIRA BESCOROVAINE'	then	15187865
        when nm_Funcionario = 'DAMIANA RAIMUNDA DO NASCIMENTO'	then	15187174
        when nm_Funcionario = 'DAMIÃO GONÇALVES TORRES SOBRINHO'	then	15187601
        when nm_Funcionario = 'DANIELEN DE OLIVEIRA'	then	15187349
        when nm_Funcionario = 'DANIEL PAULO FOGAÇA HRYNIEWICZ'	then	15187693
        when nm_Funcionario = 'DANIEL REDIVO'	then	15187452
        when nm_Funcionario = 'DANIEL ROSA DA SILVA'	then	15187175
        when nm_Funcionario = 'DANIEL ROXINSKE DE LA TORRE'	then	15187176
        when nm_Funcionario = 'DARLEY GONÇALVES ULHIÕA'	then	15187524
        when nm_Funcionario = 'DEIDIANE DA SILVA SANTOS'	then	15187700
        when nm_Funcionario = 'DEISE APARECIDA BERNADELI'	then	15187721
        when nm_Funcionario = 'DEISE KELY DA SILVA OLIVEIRA'	then	15187824
        when nm_Funcionario = 'DEISE KELY SILVA OLIVEIRA'	then	15187849
        when nm_Funcionario = 'DEIVISON OLIVEIRA GOMES'	then	15187839
        when nm_Funcionario = 'DENILSO DOS SANTOS CHAVEIRO'	then	15187417
        when nm_Funcionario = 'DENILSON MIRANDA BARBOZA'	then	15187535
        when nm_Funcionario = 'DENILTON LISBOA MATOS'	then	15187879
        when nm_Funcionario = 'DENIVAL FORTUNATO DOS SANTOS'	then	15187519
        when nm_Funcionario = 'DENY SIQUEIRA DE SOUZA'	then	15187177
        when nm_Funcionario = 'DERNI MONTEIRO DE SOUZA'	then	15187178
        when nm_Funcionario = 'DESIVALDO FURTUNATO DOS SANTOS'	then	15187383
        when nm_Funcionario = 'DEVANI LOPES DE SOUZA'	then	15187179
        when nm_Funcionario = 'DEVANIR ANTONIO DA SILVA'	then	15187463
        when nm_Funcionario = 'DEZAIAS DE SOUZA'	then	15165492
        when nm_Funcionario = 'DIAIR GONCALVES ALVES'	then	15187180
        when nm_Funcionario = 'DIONE BARROS DA SILVA'	then	15187814
        when nm_Funcionario = 'DIONEIA DE OLIVEIRA RODRIGUES TEIXEIRA'	then	15187594
        when nm_Funcionario = 'DIONIZIO DA ROSS CORSINI'	then	15165668
        when nm_Funcionario = 'DIVANI PEREIRA DOS SANTOS LOUBACK'	then	15187350
        when nm_Funcionario = 'DIVA RODRIGUES PEREIRA FERREIRA'	then	15187182
        when nm_Funcionario = 'DOMINGOS DOS SANTOS'	then	15187183
        when nm_Funcionario = 'DONIZETE VITOR ALVES'	then	15165502
        when nm_Funcionario = 'DONIZETH FERREIRA DE OLIVEIRA'	then	15187368
        when nm_Funcionario = 'DULCELEI DE LIMA ANDRADE'	then	15187395
        when nm_Funcionario = 'EDELSON APARECIDO SETTE'	then	15187293
        when nm_Funcionario = 'EDELSON DE CAMPOS'	then	15187469
        when nm_Funcionario = 'EDEMILSON GOMES DA SILVA'	then	15187381
        when nm_Funcionario = 'EDENILSON MARTINS BIANQUE'	then	15185931
        when nm_Funcionario = 'EDER PEREIRA DE LIMA'	then	15187695
        when nm_Funcionario = 'EDIANE RODRIGUES DA SILVA CANDIDO'	then	15187592
        when nm_Funcionario = 'EDIGIO BLASI'	then	15187322
        when nm_Funcionario = 'EDINALVA BISPO NUNES BARRETO'	then	15187184
        when nm_Funcionario = 'EDIVALDO DA SILVA CORREA'	then	15165683
        when nm_Funcionario = 'EDIVALTO FRANCISCO DE AMORIM'	then	15187185
        when nm_Funcionario = 'EDIVANE COSTA DIAS'	then	15165495
        when nm_Funcionario = 'EDLAINE MIGUEL DE OLIVEIRA'	then	15187866
        when nm_Funcionario = 'EDMILSON LUGON ALVES LOPES'	then	15187529
        when nm_Funcionario = 'EDNA APARECIDA FERREIRA DOS SANTOS'	then	15187575
        when nm_Funcionario = 'EDNA FREITAS DE SOUSA PILAR'	then	15165488
        when nm_Funcionario = 'EDNA GOMES CORDEIRO'	then	15187414
        when nm_Funcionario = 'EDNEIA LUGAO ALVES'	then	15187554
        when nm_Funcionario = 'EDSON FRANCISCO SANTANA DE SOUZA'	then	15187186
        when nm_Funcionario = 'EDSON LOPES DA ROSA'	then	15187794
        when nm_Funcionario = 'EDSON MOREIRA DOS SANTOS'	then	15187478
        when nm_Funcionario = 'EDUARDO DIAS DE SOUZA'	then	15187813
        when nm_Funcionario = 'EDUARDO SIQUEIRA DE SOUZA'	then	15187187
        when nm_Funcionario = 'EDVALDO FERREIRA DA SILVA'	then	15187585
        when nm_Funcionario = 'EGMAR APARECIDO FERREIRA'	then	15187188
        when nm_Funcionario = 'ELAINE CRISTINA DE OLIVEIRA CRUZ'	then	15187189
        when nm_Funcionario = 'ELAINE DAS GRACAS ROLIM'	then	15187553
        when nm_Funcionario = 'ELAINE DE MELO MACHADO'	then	15187589
        when nm_Funcionario = 'ELAINE GUEDES DE OLIVEIRA'	then	15187441
        when nm_Funcionario = 'ELAINE RAINERI DA FONSECA'	then	15187302
        when nm_Funcionario = 'ELENA ILINIR LORENI BORELA'	then	15187298
        when nm_Funcionario = 'ELENICE DE JESUS SOUZA'	then	15187692
        when nm_Funcionario = 'ELESSANDRA SOUZA DOS SANTOS'	then	15187461
        when nm_Funcionario = 'ELIANA APARECIDA DE OLIVEIRA'	then	15187190
        when nm_Funcionario = 'ELIANDRA DE ARAÚJO SELHRST'	then	15187742
        when nm_Funcionario = 'ELIANE FRANCO OLIVEIRA LIMA'	then	15187354
        when nm_Funcionario = 'ELIFRAN MENDONÇA ALTINO'	then	15187859
        when nm_Funcionario = 'ELINEIA SOARES SIQUEIRA'	then	15187356
        when nm_Funcionario = 'ELION BARRETO DE ARAUJO'	then	15187192
        when nm_Funcionario = 'ELIONETE PROCHNOW FACHINI'	then	15187181
        when nm_Funcionario = 'ELISANGELA SOUZA DOS SANTOS'	then	15187384
        when nm_Funcionario = 'ELISMAR SANTOS DE OLIVEIRA'	then	15187792
        when nm_Funcionario = 'ELIVERTON ALVES VITOR'	then	15187570
        when nm_Funcionario = 'ELLEN CAROLINE DA PENHA ZANETTI'	then	15187517
        when nm_Funcionario = 'ELOISA ESTEVAM NOGUEIRA DA SILVA'	then	15187365
        when nm_Funcionario = 'ELTON SOUZA RIBEIRO'	then	15187577
        when nm_Funcionario = 'ELZI AFONSO ALTINO'	then	15165494
        when nm_Funcionario = 'EMERSON FRANCISCO BOHN'	then	15187426
        when nm_Funcionario = 'EMERSON MATOS MOREIRA'	then	15187877
        when nm_Funcionario = 'EMILHO DE SOUZA ANDRADE'	then	15187331
        when nm_Funcionario = 'EMILIO ROMAIM ROMERO PEREZ'	then	15187391
        when nm_Funcionario = 'EMIR RODRIGUES FILHO'	then	15187339
        when nm_Funcionario = 'EMIR RODRIGUES NETO'	then	15187840
        when nm_Funcionario = 'ENEDINA PIANCO DA SILVA'	then	15187193
        when nm_Funcionario = 'ERICA DE BRITO TEIXEIRA'	then	15187194
        when nm_Funcionario = 'ERICA SOUZA RAMOS'	then	15187795
        when nm_Funcionario = 'EULALIA CANDINHO DE LIMA BLASI'	then	15187348
        when nm_Funcionario = 'EURICO DOS SANTOS'	then	15187378
        when nm_Funcionario = 'EURIDES TEIXEIRA DA SILVA'	then	15187195
        when nm_Funcionario = 'EUTERPE PINHEIRO MATOS'	then	15185900
        when nm_Funcionario = 'EVA ALVES DA SILVA PRADO'	then	15187351
        when nm_Funcionario = 'ÉVELYN MENDONÇA ALTINO'	then	15187821
        when nm_Funcionario = 'EVERSON GEORGE SETTE'	then	15187802
        when nm_Funcionario = 'FABIENE ALVES DA SILVA'	then	15165499
        when nm_Funcionario = 'FABIO XAVIER VALENTIM'	then	15187758
        when nm_Funcionario = 'FABRICIO DA SILVA BERNARDO'	then	15187884
        when nm_Funcionario = 'FABRICIO FERREIRA GOMES ROMANHA'	then	15187868
        when nm_Funcionario = 'FERNANDA AGUIAR DA SILVA'	then	15187427
        when nm_Funcionario = 'FERNANDA BAZONI'	then	15187497
        when nm_Funcionario = 'FERNANDA DO CARMO SILVA'	then	15187735
        when nm_Funcionario = 'FERNANDA MARGARIDA SOARES SOUZA'	then	15187437
        when nm_Funcionario = 'FERNANDO ANTONIO FERREIRA DE ARAUJO'	then	15187345
        when nm_Funcionario = 'FERNANDO DA SILVA MACHADO'	then	15187304
        when nm_Funcionario = 'FERNANDO GALDINO DA SILVA'	then	15187550
        when nm_Funcionario = 'FERNANDO GARCIA LIMA'	then	15187768
        when nm_Funcionario = 'FLAVIA LUIZA ALVES'	then	15187309
        when nm_Funcionario = 'FLAVIO EDUARDO SILVA'	then	15187468
        when nm_Funcionario = 'FLORINDA MARREIRO CARVALHO'	then	15187196
        when nm_Funcionario = 'FRANCIELE DA SILVA DUTRA'	then	15187818
        when nm_Funcionario = 'FRANCIELE FERNANDA DA SILVA'	then	15187871
        when nm_Funcionario = 'FRANCIELE SIMINHUK'	then	15187731
        when nm_Funcionario = 'FRANCIELI MATOS BARBOSA'	then	15187815
        when nm_Funcionario = 'FRANCIELI RITICEL MALOVINI'	then	15187870
        when nm_Funcionario = 'FRANCISCA DOS SANTOS CALDEIRA'	then	15187789
        when nm_Funcionario = 'FRANCISCO CORNELIO ALVES DE LIMA'	then	15187197
        when nm_Funcionario = 'FREDERICO ANTÔNIO AUS VALLALVA'	then	15187450
        when nm_Funcionario = 'GELSON FERREIRA DE SENA'	then	15185958
        when nm_Funcionario = 'GENAIR  MARCILIO  FREZ'	then	15187539
        when nm_Funcionario = 'GENESSY LISBOA DE SOUZA'	then	15187804
        when nm_Funcionario = 'GENIR VIEIRA DA SILVA'	then	15165462
        when nm_Funcionario = 'GENIVALDO VIEIRA DOS SANTOS'	then	15187379
        when nm_Funcionario = 'GEORGETE ARAGAO RIOS'	then	15187333
        when nm_Funcionario = 'GERLA DE SOUZA GONÇALVES'	then	15187499
        when nm_Funcionario = 'GILDA MATOS PEREIRA'	then	15187396
        when nm_Funcionario = 'GILDENE FARIA VIANA'	then	15187546
        when nm_Funcionario = 'GILMAR CELESTINO GOBIRA'	then	15187552
        when nm_Funcionario = 'GILSA DA GRACAS DE OLIVEIRA ANDRADE'	then	15187198
        when nm_Funcionario = 'GILVÃ JOÃO ALVES'	then	15187481
        when nm_Funcionario = 'GILVAN DE ARAUJO TERRA'	then	15187887
        when nm_Funcionario = 'GISELIA ANDRADE DE OLIVEIRA'	then	15187199
        when nm_Funcionario = 'GISELLE NICOLAU DE SOUZA VIEIRA'	then	15187513
        when nm_Funcionario = 'GISELLE SOUZA GOMES'	then	15187854
        when nm_Funcionario = 'GISLAINE NICOLAU DE SOUZA'	then	15187793
        when nm_Funcionario = 'GISLENE FABIANA SANTOS CONTADINI'	then	15187869
        when nm_Funcionario = 'GRAZIELI DOS SANTOS TOMAZ DE LIMA'	then	15187364
        when nm_Funcionario = 'GREICYKELY PINHO BEZERRA'	then	15165489
        when nm_Funcionario = 'GUILHERME DOS SANTOS RIBEIRO'	then	15187394
        when nm_Funcionario = 'GUILHERME GULARTE'	then	15187340
        when nm_Funcionario = 'GUSTAVO MESSIAS GOMES'	then	15187581
        when nm_Funcionario = 'GUSTAVO TAKESHI FUJIHARA'	then	15187347
        when nm_Funcionario = 'HELENA LOPES DE SOUZA'	then	15187200
        when nm_Funcionario = 'HELENA PAULA MALTA CARDOSO'	then	15187796
        when nm_Funcionario = 'HELENITO BARRETO PINTO JUNIOR'	then	15187201
        when nm_Funcionario = 'HELI DA SILVA ROSSETO'	then	15187202
        when nm_Funcionario = 'HELIO EGIDIO DA SILVA'	then	15187411
        when nm_Funcionario = 'HELIO INACIO FERREIRA'	then	15187191
        when nm_Funcionario = 'HELIO PEREIRA DA SILVA'	then	15165671
        when nm_Funcionario = 'HELOISA CARDOSO COSTA'	then	15187873
        when nm_Funcionario = 'HERMES ROBERTO GONÇALVES'	then	15187702
        when nm_Funcionario = 'HIAGO BASTOS DO NASCIMENTO'	then	15187846
        when nm_Funcionario = 'INEIS DE FATIMA TREVISAN'	then	15187711
        when nm_Funcionario = 'IRACEMA SOUZA DE GOIS'	then	15165486
        when nm_Funcionario = 'IRANI DE SOUZA'	then	15187353
        when nm_Funcionario = 'IRANI OLIVEIRA COTRIM'	then	15187860
        when nm_Funcionario = 'IRENE AUGUSTA CANDIDA'	then	15187290
        when nm_Funcionario = 'IRINILDO JOSE GONCALVES'	then	15165691
        when nm_Funcionario = 'IRMA HAMMER BERGER'	then	15187203
        when nm_Funcionario = 'ISABEL DOS SANTOS ALBRES'	then	15187204
        when nm_Funcionario = 'ISAU DA SILVA MONTELO'	then	15187205
        when nm_Funcionario = 'ISDAEL JOSE VIEIRA'	then	15187206
        when nm_Funcionario = 'ISRAEL DIVINO'	then	15187375
        when nm_Funcionario = 'ISRAEL ELIAS DE OLIVEIRA'	then	15187470
        when nm_Funcionario = 'ISTAEL RIBEIRO DOS S DE OLIVEIRA'	then	15187207
        when nm_Funcionario = 'ISTAIANY RIBEIRO DOS SANTOS OLIVEIRA'	then	15187505
        when nm_Funcionario = 'ITAECIO ALVES GOMES'	then	15187208
        when nm_Funcionario = 'IURY NEVES DE ALMEIDA'	then	15187931
        when nm_Funcionario = 'IVANETE APRECIDA ANDRETA SILVA'	then	15187209
        when nm_Funcionario = 'IVANETE RIBEIRO DOS SANTOS'	then	15187210
        when nm_Funcionario = 'IVANILDE MARIA BRAGANCA GULARTE'	then	15187211
        when nm_Funcionario = 'IVANNILTON ALVES TEIXEIRA'	then	15187494
        when nm_Funcionario = 'IVAN PAULA DA SILVA CLAUDIO'	then	15165478
        when nm_Funcionario = 'IVONE DA SILVA ANDRADE'	then	15187443
        when nm_Funcionario = 'IVONE DE PAULA NASCIMENTO ULIOA'	then	15187212
        when nm_Funcionario = 'IVONE OLIVEIRA SANTOS DUARTE'	then	15187418
        when nm_Funcionario = 'IVONEY APOLINARIO DA CRUZ'	then	15187213
        when nm_Funcionario = 'IZAQUE ALVES'	then	15187303
        when nm_Funcionario = 'JACSON ARISMEDE DOS SANTOS'	then	15187829
        when nm_Funcionario = 'JADHY DA SILVA SOARES'	then	15187926
        when nm_Funcionario = 'JAIME ARANDIA SALVATIERRA'	then	15187416
        when nm_Funcionario = 'JAIR JOSE BLASI'	then	15187400
        when nm_Funcionario = 'JAIR JOSE DE ANDRADE'	then	15187214
        when nm_Funcionario = 'JAIRO DE JESUS CAETANO DE SOUZA'	then	15187215
        when nm_Funcionario = 'JAIR PEREIRA DUARTE'	then	15187726
        when nm_Funcionario = 'JAKIANY PINHO BEZERRA'	then	15187488
        when nm_Funcionario = 'JAMILE MARIA BERNARDELLI'	then	15165675
        when nm_Funcionario = 'JAQUELINE RODRIGUES DE SOUZA'	then	15187872
        when nm_Funcionario = 'JARBAS LUIZ LUCAS'	then	15187838
        when nm_Funcionario = 'JEAN MICHEL LOURES DO COUTO'	then	15187511
        when nm_Funcionario = 'JESSICA DA CUNHA SANTOS'	then	15187856
        when nm_Funcionario = 'JESSICA RENATA DA SILVA REDUZINO'	then	15187826
        when nm_Funcionario = 'JEVERSON CONTRIN SOBRINHO'	then	15165680
        when nm_Funcionario = 'JHADD HAMMAD ALABI SOBRINHO'	then	15187569
        when nm_Funcionario = 'JOANA DE ABREU ANDRADE'	then	15187313
        when nm_Funcionario = 'JOANILTON OLIVEIRA PEREIRA'	then	15187216
        when nm_Funcionario = 'JOAO BELO DE OLIVEIRA'	then	15187217
        when nm_Funcionario = 'JOAO CELESTINO DE FARIAS'	then	15187218
        when nm_Funcionario = 'JOAO JOSE DE ANDRADE'	then	15187219
        when nm_Funcionario = 'JOAO LEOPOLDO MORAES'	then	15165455
        when nm_Funcionario = 'JOAO MAZINHO LISBOA DE SOUZA'	then	15187220
        when nm_Funcionario = 'JOAO PAULO BATISTA DA CRUZ'	then	15187221
        when nm_Funcionario = 'JOÃO PEDRO PACHECO RODRIGUES'	then	15187928
        when nm_Funcionario = 'JOAO VIEIRA'	then	15187222
        when nm_Funcionario = 'JOÃO VITOR DE OLIVEIRA ALENCAR'	then	15165694
        when nm_Funcionario = 'JOAQUIM DONIZETE LISBOA DE SOUZA'	then	15187223
        when nm_Funcionario = 'JOAQUIM NICOLAU DE SOUZA NETO'	then	15187522
        when nm_Funcionario = 'JOAQUIM PEDRO ALEXANDRINO NETO'	then	15187291
        when nm_Funcionario = 'JOCELI BORBA DE ALMEIDA'	then	15187527
        when nm_Funcionario = 'JOCELINO DIOLINO DOS SANTOS'	then	15187352
        when nm_Funcionario = 'JOCELINO VIEIRA PESSÔA'	then	15187745
        when nm_Funcionario = 'JOÉLIA PESSOA DA SILVA CLAUDIO PAULA'	then	15187888
        when nm_Funcionario = 'JOELMA ANDRIATO SANTOS DE OLIVEIRA'	then	15187923
        when nm_Funcionario = 'JOICE POLIANE MERCLY DE ANDRADE'	then	15187421
        when nm_Funcionario = 'JONAIR JOSE LUCAS'	then	15187224
        when nm_Funcionario = 'JONAS SERAFIM DOS SANTOS'	then	15187744
        when nm_Funcionario = 'JONES VAZ VIEIRA'	then	15165670
        when nm_Funcionario = 'JORGE EDUARDO PACHECO RODRIGUES'	then	15187929
        when nm_Funcionario = 'JORGE LUIZ RAIMUNDO DE MELO'	then	15187330
        when nm_Funcionario = 'JOSE ANGELIM VENTURIM'	then	15165474
        when nm_Funcionario = 'JOSE ANTONIO SOARES'	then	15165456
        when nm_Funcionario = 'JOSE AUGUSTO DELFINO'	then	15187225
        when nm_Funcionario = 'JOSE AUGUSTO PEREIRA COSTA'	then	15187507
        when nm_Funcionario = 'JOSE AUREO TECHIO'	then	15187803
        when nm_Funcionario = 'JOSE DA SILVA PEDROSO'	then	15187226
        when nm_Funcionario = 'JOSEFA FERREIRA RIOS KURYAMA'	then	15187687
        when nm_Funcionario = 'JOSEFA RIBEIRO PEREIRA'	then	15187770
        when nm_Funcionario = 'JOSE FERREIRA BARROS'	then	15187738
        when nm_Funcionario = 'JOSÉ JORGE ALVES DOS SANTOS'	then	15187439
        when nm_Funcionario = 'JOSE LAFAIETE PEREIRA'	then	15187227
        when nm_Funcionario = 'JOSELANE COSTA DA CRUZ'	then	15187344
        when nm_Funcionario = 'JOSÉ LEMES CORDEIRO'	then	15187932
        when nm_Funcionario = 'JOSE LEONIR LOPES'	then	15187772
        when nm_Funcionario = 'JOSE MAURICIO SANTANA'	then	15165480
        when nm_Funcionario = 'JOSE MAURO PRATES'	then	15187228
        when nm_Funcionario = 'JOSÉ OGENIS SERAFIM DOS SANTOS'	then	15187819
        when nm_Funcionario = 'JOSE ROBERTO INACIO DA ROSA'	then	15187307
        when nm_Funcionario = 'JOSIANE DA SILVA ANDRADE'	then	15187858
        when nm_Funcionario = 'JOSIEL CANDIDO'	then	15187229
        when nm_Funcionario = 'JOSIMAR PEREIRA MORAES'	then	15187844
        when nm_Funcionario = 'JOSIVALDO ABRANTES DA CONCEIÇÃO'	then	15185959
        when nm_Funcionario = 'JOVENILSON DA SILVA MARCELINO'	then	15187537
        when nm_Funcionario = 'JOVERCINA MAXIMO DOS SANTOS'	then	15187230
        when nm_Funcionario = 'JULIANA ALVES SALAMAO'	then	15165473
        when nm_Funcionario = 'JULIANA BADAN DUARTE'	then	15187707
        when nm_Funcionario = 'JULIO MUCHINSKI'	then	15187534
        when nm_Funcionario = 'JULISNEI RODRIGUES LAURO'	then	15187812
        when nm_Funcionario = 'JUNIO CARDOSO DE FIGUEIREDO'	then	15165674
        when nm_Funcionario = 'JURANDIR MARINHEIRO DE LIMA'	then	15187694
        when nm_Funcionario = 'JUSTINA RODRIGUES DA SILVA'	then	15187442
        when nm_Funcionario = 'KAMILA DA SILVA SALDANHA'	then	15187495
        when nm_Funcionario = 'KARINA PONTES MARTINS'	then	15187718
        when nm_Funcionario = 'KATIA REGINA DE SOUZA GOMES'	then	15187231
        when nm_Funcionario = 'KATIUSA LOURENÇO DE OLIVEIRA'	then	15187406
        when nm_Funcionario = 'KATIUSCIA OLIVEIRA WACHEKOWSKI'	then	15187576
        when nm_Funcionario = 'KELIA MARTINS SOARES'	then	15187502
        when nm_Funcionario = 'KELLY MACHADO DE OLIVEIRA'	then	15187308
        when nm_Funcionario = 'KHRISLAYNE KETLIM FAUSTINO'	then	15187845
        when nm_Funcionario = 'KLEBSON MOURA RODRIGUES'	then	15187530
        when nm_Funcionario = 'KLEITON DE ALMEIDA WILL'	then	15187740
        when nm_Funcionario = 'KLESIO BRESSAMI DOS SANTOS'	then	15165487
        when nm_Funcionario = 'LAUDICEIA MENDES DA COSTA PRUDENCIO'	then	15187373
        when nm_Funcionario = 'LAURINDO BARBOSA DE SOUZA'	then	15187315
        when nm_Funcionario = 'LAURINDO FERREIRA DA SILVA'	then	15187541
        when nm_Funcionario = 'LEIA BRESSANI DE FREITAS SANTOS'	then	15187232
        when nm_Funcionario = 'LEIDIANE VIEIRA LIMA'	then	15187510
        when nm_Funcionario = 'LEIDIANY PAULA DE OLIVEIRA GOBIRA'	then	15187593
        when nm_Funcionario = 'LEIR JOSE DA SILVA'	then	15187766
        when nm_Funcionario = 'LENYN BRITO SILVA'	then	15185919
        when nm_Funcionario = 'LEONIDES DE CARVALHO JUNIOR'	then	15165461
        when nm_Funcionario = 'LETICIA SESQUIM'	then	15185933
        when nm_Funcionario = 'LIDIA NARA ALTOE'	then	15187335
        when nm_Funcionario = 'LILIA DOS SANTOS ANTONIO'	then	15187807
        when nm_Funcionario = 'LILIAN RODIRGUES ANTUNES'	then	15187311
        when nm_Funcionario = 'LINCOLN FERREIRA DE OLIVEIRA'	then	15187477
        when nm_Funcionario = 'LINDALCIR GOMES CORDEIRO'	then	15165503
        when nm_Funcionario = 'LINDOMAR ALVES VITOR'	then	15187791
        when nm_Funcionario = 'LINDOMAR DE JESUS FIRMIANO'	then	15187703
        when nm_Funcionario = 'LORENA MACIEL DA COSTA'	then	15187852
        when nm_Funcionario = 'LUCAS ESTEVAM NOGUEIRA DA ROSA'	then	15187851
        when nm_Funcionario = 'LUCIANA DA SILVA'	then	15187493
        when nm_Funcionario = 'LUCIANA DE OLIVEIRA PINTO'	then	15187759
        when nm_Funcionario = 'LUCILENE DE SOUZA'	then	15187474
        when nm_Funcionario = 'LUCIMAR CARDOSO DIAS'	then	15187409
        when nm_Funcionario = 'LUCIMAR LIMEIRA DA SILVA OLIVEIRA'	then	15187590
        when nm_Funcionario = 'LUCIMAR SOARES MIRANDA'	then	15187743
        when nm_Funcionario = 'LUCINÉIA GONÇALVES DE SOUZA'	then	15187809
        when nm_Funcionario = 'LUCIO BISPO NUNES'	then	15187289
        when nm_Funcionario = 'LUCIVALDO FERREIRA ALVES'	then	15187525
        when nm_Funcionario = 'LUIZ AMARAL DE BRITO'	then	15187326
        when nm_Funcionario = 'LUIZ ANTONIO DE OLIVEIRA'	then	15187774
        when nm_Funcionario = 'LUIZ CARLOS BRANDÃO'	then	15187498
        when nm_Funcionario = 'LUIZ CARLOS ROSA DA SILVA'	then	15164924
        when nm_Funcionario = 'LUIZ CARLOS VALENTIM DE SOUZA'	then	15165497
        when nm_Funcionario = 'LUTERO ROSA PARAISO'	then	15187342
        when nm_Funcionario = 'LUTERO ROSA PARAISO'	then	15187916
        when nm_Funcionario = 'LUTERO ROSA PARAISO'	then	15187917
        when nm_Funcionario = 'LUZENIR DE JESUS ANTONIO PEREIRA'	then	15187392
        when nm_Funcionario = 'LUZIA RODRIGUES DE CARVALHO'	then	15187310
        when nm_Funcionario = 'LUZIA SOUZA LOPES'	then	15187490
        when nm_Funcionario = 'LUZIA STARNAITE CANDIDO'	then	15187233
        when nm_Funcionario = 'MACIEL FERNANDES NICOLAU'	then	15187566
        when nm_Funcionario = 'MANOEL XAVIER COTRIM'	then	15165484
        when nm_Funcionario = 'MARCELE DAMO'	then	15187457
        when nm_Funcionario = 'MARCELO ABELARDO SIEBE'	then	15187830
        when nm_Funcionario = 'MARCELO DIAS FRANSKOVIAK'	then	15187327
        when nm_Funcionario = 'MARCELO FIGUEIREDO MOTA'	then	15187526
        when nm_Funcionario = 'MARCELO JUNIOR BLASI'	then	15187338
        when nm_Funcionario = 'MARCELO MARINHO DE SOUZA'	then	15187430
        when nm_Funcionario = 'MARCELO VIDOTTO'	then	15187565
        when nm_Funcionario = 'MARCEL SILVA MONTELO'	then	15187459
        when nm_Funcionario = 'MARCIA HELENA PASSOLONGO'	then	15187234
        when nm_Funcionario = 'MARCIA NEVES DE ALMEIDA'	then	15187235
        when nm_Funcionario = 'MARCIA RODRIGUES DE OLIVEIRA ALVES'	then	15187413
        when nm_Funcionario = 'MARCIA SANTOS LIMA SOUZA'	then	15187236
        when nm_Funcionario = 'MARCILEY DE CARVALHO'	then	15165690
        when nm_Funcionario = 'MARCIO FERREIRA DOS SANTOS JUNIOR'	then	15187823
        when nm_Funcionario = 'MARCIO VIEIRA DE FREITAS'	then	15187831
        when nm_Funcionario = 'MARCONDES DE CARVALHO'	then	15165465
        when nm_Funcionario = 'MARCOS ANDRADE WILL'	then	15165676
        when nm_Funcionario = 'MARCOS ANTONIO RODRIGUES NERY'	then	15187480
        when nm_Funcionario = 'MARCOS JÂNIO BLASI'	then	15187398
        when nm_Funcionario = 'MARCO TULIO SANTOS DUARTE'	then	15187425
        when nm_Funcionario = 'MARGARETE PEREIRA MARTINEZ'	then	15187237
        when nm_Funcionario = 'MARIA ADILEUZA RODRIGUES DE LIMA'	then	15187399
        when nm_Funcionario = 'MARIA APARECIDA DE ALMEIDA GABRIEL'	then	15187808
        when nm_Funcionario = 'MARIA APARECIDA DE AMORIN'	then	15165469
        when nm_Funcionario = 'MARIA APARECIDA DE SOUZA'	then	15187579
        when nm_Funcionario = 'MARIA APARECIDA DIBERNADINO'	then	15187238
        when nm_Funcionario = 'MARIA APARECIDA GOMES FRANQUI'	then	15187555
        when nm_Funcionario = 'MARIA APARECIDA SOUZA DOS S SIMAO'	then	15187239
        when nm_Funcionario = 'MARIA CONCEICAO DA SILVA'	then	15187240
        when nm_Funcionario = 'MARIA CREUZA SILVA BARBOSA'	then	15187319
        when nm_Funcionario = 'MARIA DA CONCEICAO DE ALMEIDA'	then	15187241
        when nm_Funcionario = 'MARIA DA PENHA HOULANDES'	then	15187242
        when nm_Funcionario = 'MARIA DAS GRACAS RACANELI SARDINHA'	then	15187243
        when nm_Funcionario = 'MARIA DE FATIMA PEREIRA'	then	15187288
        when nm_Funcionario = 'MARIA DE FATIMA PEREIRA DA SILVA SANTOS'	then	15187598
        when nm_Funcionario = 'MARIA DO CARMO RODRIGUES DE CARVALHO SANTOS'	then	15165460
        when nm_Funcionario = 'MARIA ELIZABETH RIBEIRO RODRIGUES'	then	15187521
        when nm_Funcionario = 'MARIA HELENA FELISBERTO BATISTA'	then	15187244
        when nm_Funcionario = 'MARIA ISABEL NOGUEIRA'	then	15187433
        when nm_Funcionario = 'MARIA JOSE DE SOUZA REIS'	then	15187245
        when nm_Funcionario = 'MARIA JOSE RODRIGUES'	then	15187549
        when nm_Funcionario = 'MARIA MARTA DA SILVA ABREU'	then	15187246
        when nm_Funcionario = 'MARIA NILVA CARDOSO CANDIDO'	then	15187247
        when nm_Funcionario = 'MARIA PEREIRA DA SILVA'	then	15187458
        when nm_Funcionario = 'MARIA QUELIS DE BRITO'	then	15187248
        when nm_Funcionario = 'MARIA RODRIGUES COUTRIM'	then	15187389
        when nm_Funcionario = 'MARIA ROSA SOARES DE MELO'	then	15187249
        when nm_Funcionario = 'MARIA SOARES DA ROCHA'	then	15187848
        when nm_Funcionario = 'MARIA VALDENIR GRANGEIRO SOUSA'	then	15187805
        when nm_Funcionario = 'MARILDA CAMPOS DA CUNHA'	then	15187355
        when nm_Funcionario = 'MARINALVA ALEXANDRINA'	then	15187698
        when nm_Funcionario = 'MARINALVA APARECIDA NEVES'	then	15187250
        when nm_Funcionario = 'MARINALVA DA SILVA PEREIRA'	then	15187405
        when nm_Funcionario = 'MARINEIDE DE CAMPOS DA CUNHA'	then	15185918
        when nm_Funcionario = 'MARINEIDE FERREIRA DE OLIVEIRA'	then	15187251
        when nm_Funcionario = 'MARINES DA SILVA PEREIRA'	then	15187357
        when nm_Funcionario = 'MARINETE CESARIO DE SOUZA'	then	15187788
        when nm_Funcionario = 'MARIO LUCIO V DE OLIVEIRA'	then	15165669
        when nm_Funcionario = 'MARIVALDA ROCHA DOS SANTOS'	then	15187841
        when nm_Funcionario = 'MARIVANIA NOBRE MACHADO'	then	15187386
        when nm_Funcionario = 'MARIVETE NOBRE MACHADO'	then	15187362
        when nm_Funcionario = 'MARLEIDE CAMPOS DOS SANTOS'	then	15187516
        when nm_Funcionario = 'MARLENE ZUNACHI NEVES'	then	15187573
        when nm_Funcionario = 'MARLI DA CUNHA'	then	15187320
        when nm_Funcionario = 'MARLI DA SILVA'	then	15187591
        when nm_Funcionario = 'MARLI LUCIA DO CARMO SILVA'	then	15187252
        when nm_Funcionario = 'MARLON KLEBER WUTZON BOZO'	then	15187775
        when nm_Funcionario = 'MARLUCE DA CRUZ'	then	15187444
        when nm_Funcionario = 'MARLUCIA COSTA DA SILVA VINHAL'	then	15187407
        when nm_Funcionario = 'MARTA DA SILVA CARVALHO'	then	15165685
        when nm_Funcionario = 'MAURICIO SERGIO DE LIMA E SILVA'	then	15187531
        when nm_Funcionario = 'MAX DANIEL DE CARVALHO'	then	15165481
        when nm_Funcionario = 'MAX DANIEL DE CARVALHO'	then	15187719
        when nm_Funcionario = 'MAYCON DOUGLAS MACHADO'	then	15187850
        when nm_Funcionario = 'MEIRE FRANCIANE GONÇALVES BORELLA'	then	15187701
        when nm_Funcionario = 'MEIRE FRANCIELE GONÇALVES DE CARVALHO'	then	15187367
        when nm_Funcionario = 'MESAQUE FERNANDO CAMARGO DA SILVA'	then	15187739
        when nm_Funcionario = 'MICHAEL WENDERSON RECALCATI'	then	15187857
        when nm_Funcionario = 'MICHELI NASCIMENTO SOARES'	then	15187736
        when nm_Funcionario = 'MIRIAM ALVES TOMAZ MARTINS PEREIRA'	then	15187253
        when nm_Funcionario = 'MIRIAM QUIRINO DA SILVA'	then	15187371
        when nm_Funcionario = 'MIRIAN DUARTE'	then	15165470
        when nm_Funcionario = 'MIRIAN ROSA DA SILVA'	then	15187254
        when nm_Funcionario = 'NADIA MARIA SILVA MONTELO'	then	15187491
        when nm_Funcionario = 'NADYA FERNANDES'	then	15165472
        when nm_Funcionario = 'NAIARA ESTEVAN NOGUEIRA SA SILVA'	then	15187825
        when nm_Funcionario = 'NARIA GOUVEIA VIEIRA'	then	15187704
        when nm_Funcionario = 'NEILDE CORREIA BISPO TESH'	then	15187725
        when nm_Funcionario = 'NELSON MLAK'	then	15187358
        when nm_Funcionario = 'NELSON PEREIRA NUNES JUNIOR'	then	15187806
        when nm_Funcionario = 'NEUCIDIANE ANTONIA SEGATTO'	then	15187797
        when nm_Funcionario = 'NEUCIMEIRE APARECIDA MANZINI PETRECA'	then	15187377
        when nm_Funcionario = 'NEUZA DA SILVA MENDES'	then	15187256
        when nm_Funcionario = 'NEUZA HOFFMANN CARVALHO'	then	15187257
        when nm_Funcionario = 'NEUZA MARIA CASAGRANDE'	then	15187255
        when nm_Funcionario = 'NEUZA MARIA PEDROSO'	then	15187258
        when nm_Funcionario = 'NEUZA XAVIER DO NASCIMENTO'	then	15187259
        when nm_Funcionario = 'NILSON DE JESUS PEREIRA'	then	15187586
        when nm_Funcionario = 'NILSON JACOS DE SOUSA'	then	15187305
        when nm_Funcionario = 'NILTON PINTO DE ALMEIDA'	then	15187466
        when nm_Funcionario = 'NILZETE DANTAS DA SILVA MATTE'	then	15187496
        when nm_Funcionario = 'NISES MARILDA TRAVAINI BERNADELLI'	then	15187765
        when nm_Funcionario = 'ODAIR JOSE DE MORAIS'	then	15187551
        when nm_Funcionario = 'OEDES GONCALVES ULHIOA'	then	15187260
        when nm_Funcionario = 'OLINTO ENEAS DE ALENCAR FILHO'	then	15187760
        when nm_Funcionario = 'ORMANDINA ESTEVAN NOGUEIRA'	then	15187448
        when nm_Funcionario = 'OSMAR BATISTA PENHA'	then	15187810
        when nm_Funcionario = 'OSMAR FRANCISCO DO NASCIMENTO'	then	15165467
        when nm_Funcionario = 'OSMAR TONINI DA SILVA'	then	15187374
        when nm_Funcionario = 'OSVALDO ALBINO DO NASCIMENTO'	then	15187261
        when nm_Funcionario = 'OSVALDO RODRIGUES COTRIM'	then	15165678
        when nm_Funcionario = 'OTAMIR APARECIDO DE MORAIS'	then	15187699
        when nm_Funcionario = 'OTAMIR DANIEL DE ARRUDA'	then	15187332
        when nm_Funcionario = 'OZIANE MARIA DA SILVA'	then	15187318
        when nm_Funcionario = 'PABLO THEOTONIO DE OLIVEIRA'	then	15187816
        when nm_Funcionario = 'PATRICIA BARBOSA DE SOUZA'	then	15187832
        when nm_Funcionario = 'PATRICIA DA SILVA MOURA'	then	15187486
        when nm_Funcionario = 'PATRICIA MOREIRA DE OLIVEIRA'	then	15165471
        when nm_Funcionario = 'PAULA SIMONE ROCHA'	then	15187482
        when nm_Funcionario = 'PAULO BATISTA DA CRUZ'	then	15187262
        when nm_Funcionario = 'PAULO CESAR BEZERRA'	then	15165479
        when nm_Funcionario = 'PAULO CESAR DA SILVA'	then	15165682
        when nm_Funcionario = 'PAULO EDSON DE BRITO PEREIRA'	then	15187504
        when nm_Funcionario = 'PAULO FIGUEIREDO CALDEIRAS'	then	15187263
        when nm_Funcionario = 'PAULO GERALDO PEREIRA'	then	15187453
        when nm_Funcionario = 'PAULO HENRIQUE MARCELINO DE OLIVEIRA'	then	15187881
        when nm_Funcionario = 'PAULO SERGIO DE SOUZA'	then	15187387
        when nm_Funcionario = 'PEDRO SOUZA SILVA'	then	15187312
        when nm_Funcionario = 'POLIANA NATALIA FERREIRA'	then	15187449
        when nm_Funcionario = 'QUELI CRISTINA AGUIAR SILVA BARBOZA'	then	15187691
        when nm_Funcionario = 'RAIMUNDO DA SILVA'	then	15187764
        when nm_Funcionario = 'RAIULA DE SOUZA SILVA'	then	15187465
        when nm_Funcionario = 'RAQUEL CORDEIRO DE OLIVEIRA'	then	15187880
        when nm_Funcionario = 'REGIANE CRISTINA DOS SANTOS'	then	15187408
        when nm_Funcionario = 'REGIANE LOPES DE OLIVEIRA'	then	15187709
        when nm_Funcionario = 'REGILDO RAASCH'	then	15165500
        when nm_Funcionario = 'REGINALDO GIL DA SILVA'	then	15187763
        when nm_Funcionario = 'REGINALDO GONÇALVES DE OLIVEIRA'	then	15187689
        when nm_Funcionario = 'REGINALDO RAASCH'	then	15187508
        when nm_Funcionario = 'REINALDO CABRAL'	then	15187528
        when nm_Funcionario = 'REINALDO FREIRE DE SOUZA'	then	15187683
        when nm_Funcionario = 'REINALDO GONÇALVES ULHOA'	then	15187588
        when nm_Funcionario = 'RELUY CHRISTINA DE OLIVEIRA TOLEDO'	then	15187489
        when nm_Funcionario = 'RENATA BORGES DA SILVA'	then	15187346
        when nm_Funcionario = 'RENATA KATLHIELLI GRACIOLLI'	then	15165677
        when nm_Funcionario = 'RENATA LEPPAUS MEIRELES'	then	15165673
        when nm_Funcionario = 'RENATA LEPPAUS MEIRELES'	then	15187734
        when nm_Funcionario = 'RENATO ANTONIO PEREIRA'	then	15187545
        when nm_Funcionario = 'RENICE FERREIRA CHAVES'	then	15187264
        when nm_Funcionario = 'RENIVALDO BEZERRA'	then	15187265
        when nm_Funcionario = 'RENIVALDO RAASCH'	then	15187523
        when nm_Funcionario = 'RICARDO GOMES DA SILVA'	then	15187769
        when nm_Funcionario = 'RICARDO MARÇAL FREIRE'	then	15187599
        when nm_Funcionario = 'RITA DE CASSIA DOS SANTOS'	then	15187673
        when nm_Funcionario = 'RITA SANTOS LIMA'	then	15187266
        when nm_Funcionario = 'ROBERTO MACIEL MACHADO'	then	15187343
        when nm_Funcionario = 'ROBERTO ROGERIO COSTA'	then	15187415
        when nm_Funcionario = 'ROBERTO SEVERINO DA SILVA'	then	15187317
        when nm_Funcionario = 'ROBSON WERIKIS OLIVEIRA'	then	15185901
        when nm_Funcionario = 'RODRIGO SIEBRE'	then	15165496
        when nm_Funcionario = 'ROGERIO MACHADO LOPES'	then	15187708
        when nm_Funcionario = 'ROGERIO VICENTE MACHADO'	then	15187397
        when nm_Funcionario = 'ROMARIO XAVIER LEPPAUS'	then	15165681
        when nm_Funcionario = 'RONALDO ALENCAR GONCALVES DE OLIVEIRA'	then	15165482
        when nm_Funcionario = 'RONILDO APARECIDO PEDRO ALEXANDRINO'	then	15165468
        when nm_Funcionario = 'RONIS BATISTA DE OLIVEIRA'	then	15187733
        when nm_Funcionario = 'RONNY TON ZANOTELLI'	then	15187401
        when nm_Funcionario = 'ROSA ANTAO MALTA'	then	15187267
        when nm_Funcionario = 'ROSÂNGELA FERNANDES DE ARAUJO'	then	15187798
        when nm_Funcionario = 'ROSELI FERREIRA DE CIQUEIRA'	then	15187464
        when nm_Funcionario = 'ROSELI JACOMINI DA SILVA'	then	15165459
        when nm_Funcionario = 'ROSEMEIRE MARIA HERCULANO'	then	15187376
        when nm_Funcionario = 'ROSENIRA ALEXANDRINO'	then	15187420
        when nm_Funcionario = 'ROSICLEIA RODRIGUES CARVALHO'	then	15187876
        when nm_Funcionario = 'ROSILENE GIL DA SILVA LEMES'	then	15187337
        when nm_Funcionario = 'ROSILENE TAKAHASHI BRAVO'	then	15187314
        when nm_Funcionario = 'ROSIMAR AGUIAR DA SILVA'	then	15187268
        when nm_Funcionario = 'ROSIMERE ARAUJO DA SILVA'	then	15187543
        when nm_Funcionario = 'ROSINEIA HAMMER SCHULTZ'	then	15187487
        when nm_Funcionario = 'ROSINEIA LANDIM DE MIRA'	then	15187542
        when nm_Funcionario = 'ROSINEIDE BEZERRA'	then	15187388
        when nm_Funcionario = 'ROSINETE RIBEIRO DE OLIVEIRA'	then	15187761
        when nm_Funcionario = 'ROXANE FERRETO LORENZON'	then	15187434
        when nm_Funcionario = 'ROZIEL RODRIGUES A SILVA'	then	15187563
        when nm_Funcionario = 'RUIZDAEL DE SOUZA'	then	15187422
        when nm_Funcionario = 'RUTE CEZÁRIO DE SOUZA'	then	15187730
        when nm_Funcionario = 'SABRINA DA COSTA CAMARGOS'	then	15185930
        when nm_Funcionario = 'SALVINA LEMES DA SILVA BEZERRA'	then	15187300
        when nm_Funcionario = 'SAMARA SOARES DA SILVA'	then	15187835
        when nm_Funcionario = 'SAMMUEL VALENTIM BORGES'	then	15187431
        when nm_Funcionario = 'SANDRA GOMES DA SILVA'	then	15187728
        when nm_Funcionario = 'SANDRA MARIN'	then	15187561
        when nm_Funcionario = 'SANDRA MELO DE CARVALHO BARRETO'	then	15187306
        when nm_Funcionario = 'SANDRA REGINA DA SILVA'	then	15187269
        when nm_Funcionario = 'SANDRA VIEIRA DE OLIVEIRA'	then	15187587
        when nm_Funcionario = 'SEBASTIAO BATISTA DA CRUZ'	then	15187559
        when nm_Funcionario = 'SEBASTIAO FERNANDES DE MOURA'	then	15187800
        when nm_Funcionario = 'SEBASTIAO TEIXEIRA ABRANTES'	then	15187412
        when nm_Funcionario = 'SEBASTIÃO VIEIRA DA COSTA'	then	15187688
        when nm_Funcionario = 'SELMA DA SILVA BANDEIRA'	then	15187827
        when nm_Funcionario = 'SERGIO ALVES DE ALMEIDA'	then	15187473
        when nm_Funcionario = 'SERGIO CANDIDO DA ROCHA'	then	15187402
        when nm_Funcionario = 'SERGIO LEAO DE ARAUJO'	then	15185957
        when nm_Funcionario = 'SERGIO PERINI'	then	15187492
        when nm_Funcionario = 'SIDINEI DOS ANJOS CARVALHO'	then	15187270
        when nm_Funcionario = 'SIDNEI DA SILVA BARROS FILHO'	then	15185932
        when nm_Funcionario = 'SIDNEI RIBEIRO ARAUJO'	then	15187834
        when nm_Funcionario = 'SIMONE CHAGAS DE ALMEIDA PINTO'	then	15187271
        when nm_Funcionario = 'SIMONE CLEMENTE MORAES'	then	15187514
        when nm_Funcionario = 'SIMONE CRISTINA DA ROCHA H NUNES'	then	15187272
        when nm_Funcionario = 'SIMONI MLAK DE SOUZA'	then	15187722
        when nm_Funcionario = 'SIMONI MLAK DE SOUZA'	then	15187920
        when nm_Funcionario = 'SIRLENE BRIGIDO OLIVEIRA'	then	15187540
        when nm_Funcionario = 'SIRLENE LUIZA SILVA'	then	15187564
        when nm_Funcionario = 'SOLANGE ALVES CESTARI'	then	15187273
        when nm_Funcionario = 'SOLANGE APARECIDA DA SILVEIRA SILVA'	then	15187382
        when nm_Funcionario = 'SOLANGE MAZUTTI'	then	15187276
        when nm_Funcionario = 'SOLANGE PAVIM'	then	15187706
        when nm_Funcionario = 'SONIA MARIA SILVA CORSINI'	then	15187429
        when nm_Funcionario = 'SUELI ESTER DE FREITAS SIMINHUK'	then	15187274
        when nm_Funcionario = 'SUELLEN RIOS KURYMA DE OLIVEIRA'	then	15187370
        when nm_Funcionario = 'SUELY GOMES DE BRITO DA SILVA'	then	15187697
        when nm_Funcionario = 'SUSANA CANDIDO DA ROCHA'	then	15187275
        when nm_Funcionario = 'SYLARA SAYANNE COLLA SOARES'	then	15187428
        when nm_Funcionario = 'TAINA LUIZA DE OLIVEIRA'	then	15187602
        when nm_Funcionario = 'TAIS NEVES'	then	15187484
        when nm_Funcionario = 'TATIANE SOUZA ROCHA'	then	15187717
        when nm_Funcionario = 'TELMA DE SOUSA LEITE'	then	15187571
        when nm_Funcionario = 'TENANDES NUNES MORAIS'	then	15187582
        when nm_Funcionario = 'TERESINHA GOULART BENVENUT'	then	15187297
        when nm_Funcionario = 'teste'	then	15165171
        when nm_Funcionario = 'teste pessoa SL'	then	15122123
        when nm_Funcionario = 'THAISA LOURENÇO'	then	15187886
        when nm_Funcionario = 'THAYS GOMES DE CAMPOS'	then	15187686
        when nm_Funcionario = 'THIAGO TEIXEIRA RODRIGUES'	then	15187867
        when nm_Funcionario = 'TIAGO ABRANTES PORTO'	then	15187741
        when nm_Funcionario = 'TIAGO ALENCAR GONÇALVES DE OLIVEIRA'	then	15187438
        when nm_Funcionario = 'UANDERSON DOS SANTOS FAGUNDES'	then	15187842
        when nm_Funcionario = 'UELÇO CONTADINI VIEIRA'	then	15187685
        when nm_Funcionario = 'VALDECIR DA SILVA'	then	15187285
        when nm_Funcionario = 'VALDECIR DEL NERO'	then	15165475
        when nm_Funcionario = 'VALDEMIR APARECIDO RAIMUNDO'	then	15187536
        when nm_Funcionario = 'VALDEVINO LISBOA DE SOUZA'	then	15187455
        when nm_Funcionario = 'VALDIRENE ALVES DEL NERO'	then	15187705
        when nm_Funcionario = 'VALDIRENE HAMMER BERGER'	then	15165679
        when nm_Funcionario = 'VALDIRENE SIMOES DA SILVA'	then	15187548
        when nm_Funcionario = 'VALMIR GOMES DA SILVA'	then	15187282
        when nm_Funcionario = 'VALMIR LEMES DA SILVA SANTOS'	then	15187299
        when nm_Funcionario = 'VANDER BARBOSA MEIRELES'	then	15187479
        when nm_Funcionario = 'VANDERLEIA CRUZ DE LIMA'	then	15165491
        when nm_Funcionario = 'VANDERLUCIO DA SILVA'	then	15187281
        when nm_Funcionario = 'VANDERSON DEL NERO PEREIRA'	then	15187560
        when nm_Funcionario = 'VANESSA CALGAROTO'	then	15187323
        when nm_Funcionario = 'VANESSA DE LIMA DOMINGOS'	then	15187874
        when nm_Funcionario = 'VANESSA PEREIRA DA SILVA'	then	15187328
        when nm_Funcionario = 'VANIA JACOMINI DA SILVA'	then	15187512
        when nm_Funcionario = 'VANIR DE ALBUQUERQUE BRITO'	then	15187446
        when nm_Funcionario = 'VANUSA SANTOS ALVES'	then	15187817
        when nm_Funcionario = 'VANUZE LOPES DA SILVA'	then	15187724
        when nm_Funcionario = 'VERACI ALVES IGNACIO DE LIMA'	then	15187360
        when nm_Funcionario = 'VERA FERREIRA DE OLIVEIRA'	then	15187286
        when nm_Funcionario = 'VERA LUCIA DA SILVA GUIZOLF DE SOUZA'	then	15187501
        when nm_Funcionario = 'VERONICA VIEIRA DA SILVA'	then	15187283
        when nm_Funcionario = 'VICENTE FRANCISCO MONTELO'	then	15187284
        when nm_Funcionario = 'VICTOR SMILL PILLACA QUISPILAYA'	then	15187460
        when nm_Funcionario = 'VINICIUS GONCALVES SOARES'	then	15187828
        when nm_Funcionario = 'VITOR HUGO MOURA RODRIGUES'	then	15187811
        when nm_Funcionario = 'VIVIANE NUNES MAGALHAES'	then	15187503
        when nm_Funcionario = 'VIVIANE RISSO DE PAIVA'	then	15187833
        when nm_Funcionario = 'VIVIANE ZAN PEREIRA DOS SANTOS'	then	15165693
        when nm_Funcionario = 'WAGNA VERANE VIDOTTO'	then	15187596
        when nm_Funcionario = 'WALDEANE DE OLIVEIRA SILVA'	then	15165485
        when nm_Funcionario = 'WALTER TERTO FERREIRA'	then	15187277
        when nm_Funcionario = 'WANDERLEY DA ROSA'	then	15187324
        when nm_Funcionario = 'WELITON  JOSÉ LUCAS'	then	15187710
        when nm_Funcionario = 'WESLEI MAURO DE PAULA PRATES'	then	15187855
        when nm_Funcionario = 'WESLEY BORGES DUARTE'	then	15187801
        when nm_Funcionario = 'WESLEY LUCAS DE ABREU ANDRADE'	then	15187882
        when nm_Funcionario = 'WESLWY FABIO LAUTERTE'	then	15187329
        when nm_Funcionario = 'WESP FERREIRA DOS SANTOS'	then	15187278
        when nm_Funcionario = 'WILIAN DE SOUZA MLAK'	then	15187837
        when nm_Funcionario = 'WILLIAN RENAN DE MOURA SIQUEIRA'	then	15187883
        when nm_Funcionario = 'WILLIAN RODRIGO FREZZE DA SILVA'	then	15187927
        when nm_Funcionario = 'YAGO MENOZZI'	then	15187822
        when nm_Funcionario = 'YEDA CUNHA SALES'	then	15187896
        when nm_Funcionario = 'ZENAIR MARIA SCALZER LUCAS'	then	15187279
        when nm_Funcionario = 'ZENILDA DAS VIRGENS FRANCINO DUARTE'	then	15187532
        when nm_Funcionario = 'ZENILDA RODRIGUES COTRIM'	then	15187723
        when nm_Funcionario = 'ZENILDA RODRIGUES COTRIM'	then	15187919
        when nm_Funcionario = 'ZIGRID OHLESORGE CASELLI'	then	15187762
        when nm_Funcionario = 'ZILDENETE ALBINO FARIAS'	then	15187515
        when nm_Funcionario = 'ZILDETE RODIGUES DOS SANTOS'	then	15187280
        when nm_Funcionario = 'ZILMAR DE OLIVEIRA ABREU'	then	15187544
    END AS id
FROM 
    FOLHFuncionario
        `;

        const result = await masterConnection.query(userQuery);

        const resultData = result.recordset;

        const transformedData = resultData.map(record => {

            return {
                id: record.idIntegracao.toString(),
                dataInicioContrato: formatDate(record.dataInicioContrato),
                geraRegistroPreliminar: false,
                situacao: record.situacao,
                atoContrato: null,
                inicioVigencia: formatDate2(record.dataInicioContrato),
                tipo: record.tipo,
                pessoa: {
                    id: record.id,
                    nome: record.nome,
                },
                codigoMatricula: {
                    contrato: null,
                    digitoVerificador: null,
                    numero: null
                },
                "eSocial": "32425962-826",
                "grupoFuncional": {
                    "id": 29
                },
                "jornadaTrabalho": null,
                "rendimentoMensal": 1173.1,
                "atoAlteracaoSalario": null,
                "motivoAlteracaoSalario": null,
                "formaPagamento": null,
                "contaBancariaPagamento": null,
                "validationStatus": "VALID",
                "enviarEsocial": true,
                "organograma": {
                    "id": 75
                },
                "dataAdmissaoRetificadaProcTrab": null,
                "processoTrabalhista": null,
                "chaveMigracao": null,
                "versaoMigracao": null,
                "camposAdicionais": [
                    {
                        "tipo": "FUNCIONARIO",
                        "identificador": "betha_siope_padrao",
                        "campos": [
                            {
                                "id": "6202f523709ddf000183a967",
                                "valor": "N"
                            },
                            {
                                "id": "6202f523709ddf000183a969",
                                "valor": "N"
                            },
                            {
                                "id": "6202f523709ddf000183a968",
                                "valor": "N"
                            },
                            {
                                "id": "6202f523709ddf000183a96b",
                                "valor": "N"
                            },
                            {
                                "id": "6202f523709ddf000183a96a",
                                "valor": "N"
                            },
                            {
                                "id": "6202f523709ddf000183a96d",
                                "valor": "N"
                            },
                            {
                                "id": "6202f523709ddf000183a96c",
                                "valor": "N"
                            }
                        ]
                    },
                    {
                        "tipo": "FUNCIONARIO",
                        "identificador": "padrao",
                        "campos": [
                            {
                                "id": "5f68dd7ef682a7014b4d9818",
                                "valor": null
                            },
                            {
                                "id": "5f68dd7ef682a7014b4d9817",
                                "valor": null
                            },
                            {
                                "id": "5f68dd7ef682a7014b4d981a",
                                "valor": null
                            },
                            {
                                "id": "5f68dd7ef682a7014b4d9819",
                                "valor": null
                            },
                            {
                                "id": "5f68dd7ef682a7014b4d9814",
                                "valor": null
                            },
                            {
                                "id": "5f68dd7ef682a7014b4d9813",
                                "valor": null
                            },
                            {
                                "id": "5f68dd7ef682a7014b4d9816",
                                "valor": null
                            },
                            {
                                "id": "5f68dd7ef682a7014b4d9815",
                                "valor": null
                            },
                            {
                                "id": "5f68dd7ef682a7014b4d9820",
                                "valor": null
                            },
                            {
                                "id": "5f68dd7ef682a7014b4d981f",
                                "valor": null
                            },
                            {
                                "id": "5f68dd7ef682a7014b4d9821",
                                "valor": null
                            },
                            {
                                "id": "5f68dd7ef682a7014b4d981c",
                                "valor": null
                            },
                            {
                                "id": "5f68dd7ef682a7014b4d981b",
                                "valor": null
                            },
                            {
                                "id": "5f68dd7ef682a7014b4d981e",
                                "valor": null
                            },
                            {
                                "id": "5f68dd7ef682a7014b4d981d",
                                "valor": null
                            },
                            {
                                "id": "5f68dd7ef682a7014b4d9808",
                                "valor": null
                            },
                            {
                                "id": "5f68dd7ef682a7014b4d9807",
                                "valor": null
                            },
                            {
                                "id": "5f68dd7ef682a7014b4d980a",
                                "valor": null
                            },
                            {
                                "id": "5f68dd7ef682a7014b4d9809",
                                "valor": null
                            },
                            {
                                "id": "5f68dd7ef682a7014b4d9804",
                                "valor": null
                            },
                            {
                                "id": "5f68dd7ef682a7014b4d9803",
                                "valor": null
                            },
                            {
                                "id": "5f68dd7ef682a7014b4d9805",
                                "valor": null
                            },
                            {
                                "id": "5f68dd7ef682a7014b4d9810",
                                "valor": null
                            },
                            {
                                "id": "5f68dd7ef682a7014b4d980f",
                                "valor": null
                            },
                            {
                                "id": "5f68dd7ef682a7014b4d9812",
                                "valor": null
                            },
                            {
                                "id": "5f68dd7ef682a7014b4d9811",
                                "valor": null
                            },
                            {
                                "id": "5f68dd7ef682a7014b4d980c",
                                "valor": null
                            },
                            {
                                "id": "5f68dd7ef682a7014b4d980b",
                                "valor": null
                            },
                            {
                                "id": "5f68dd7ef682a7014b4d980e",
                                "valor": null
                            },
                            {
                                "id": "5f68dd7ef682a7014b4d980d",
                                "valor": null
                            }
                        ]
                    },
                    {
                        "tipo": "FUNCIONARIO",
                        "identificador": "betha_esfinge_padrao",
                        "campos": [
                            {
                                "id": "66d99e66d2223500019830f1",
                                "valor": "N"
                            },
                            {
                                "id": "66d99e66d2223500019830f2",
                                "valor": null
                            },
                            {
                                "id": "66d99e66d222350001983105",
                                "valor": null
                            },
                            {
                                "id": "66d99e66d222350001983106",
                                "valor": "N"
                            },
                            {
                                "id": "66d99e66d222350001983103",
                                "valor": "S"
                            },
                            {
                                "id": "66d99e66d222350001983104",
                                "valor": null
                            },
                            {
                                "id": "66d99e66d222350001983109",
                                "valor": null
                            },
                            {
                                "id": "66d99e66d22235000198310a",
                                "valor": null
                            },
                            {
                                "id": "66d99e66d222350001983107",
                                "valor": null
                            },
                            {
                                "id": "66d99e66d222350001983108",
                                "valor": null
                            },
                            {
                                "id": "66d99e66d2223500019830f5",
                                "valor": null
                            },
                            {
                                "id": "66d99e66d2223500019830f6",
                                "valor": null
                            },
                            {
                                "id": "66d99e66d2223500019830f3",
                                "valor": null
                            },
                            {
                                "id": "66d99e66d2223500019830f4",
                                "valor": null
                            },
                            {
                                "id": "66d99e66d2223500019830f9",
                                "valor": null
                            },
                            {
                                "id": "66d99e66d2223500019830fa",
                                "valor": null
                            },
                            {
                                "id": "66d99e66d2223500019830f7",
                                "valor": null
                            },
                            {
                                "id": "66d99e66d2223500019830f8",
                                "valor": null
                            },
                            {
                                "id": "66d99e66d2223500019830fd",
                                "valor": null
                            },
                            {
                                "id": "66d99e66d2223500019830fe",
                                "valor": null
                            },
                            {
                                "id": "66d99e66d2223500019830fb",
                                "valor": null
                            },
                            {
                                "id": "66d99e66d2223500019830fc",
                                "valor": null
                            },
                            {
                                "id": "66d99e66d222350001983101",
                                "valor": null
                            },
                            {
                                "id": "66d99e66d222350001983102",
                                "valor": null
                            },
                            {
                                "id": "66d99e66d2223500019830ff",
                                "valor": null
                            },
                            {
                                "id": "66d99e66d222350001983100",
                                "valor": null
                            }
                        ]
                    }
                ],
                "historicos": [],
                "rescisao": null,
                "reintegracoes": [],
                "dataBase": "2024-09-16",
                "vinculoEmpregaticio": {
                    "id": 29
                },
                "indicativoAdmissao": null,
                "naturezaAtividade": null,
                "tipoAdmissao": null,
                "primeiroEmprego": false,
                "optanteFgts": false,
                "dataOpcao": null,
                "contaFgts": null,
                "sindicato": null,
                "tipoProvimento": null,
                "leiContrato": null,
                "dataNomeacao": "2024-09-16",
                "dataPosse": "2024-09-16",
                "tempoAposentadoria": null,
                "previdenciaFederal": true,
                "previdencias": [],
                "cargo": {
                    "id": 37
                },
                "nProcessoTrabalhista": null,
                "profissionalSaudeSegurancaPublica": null,
                "recebeAbonoPermanencia": null,
                "inicioAbonoPermanencia": null,
                "observacaoContrato": null,
                "descricaoSalario": null,
                "tipoContratoParcial": null,
                "cargoAlterado": false,
                "atoAlteracaoCargo": null,
                "motivoAlteracaoCargo": null,
                "areaAtuacao": null,
                "areaAtuacaoAlterada": false,
                "motivoAlteracaoAreaAtuacao": null,
                "ocupaVaga": false,
                "salarioAlterado": false,
                "dataAlteracaoSalarioEsocial": null,
                "origemSalario": "CARGO",
                "nivelSalarial": {
                    "id": 81
                },
                "classeReferencia": {
                    "id": 158
                },
                "cargoComissionado": null,
                "areaAtuacaoComissionado": null,
                "ocupaVagaComissionado": false,
                "salarioComissionado": null,
                "nivelSalarialComissionado": null,
                "classeReferenciaComissionado": null,
                "dataSaidaCargoComissionado": null,
                "atoSaidaCargoComissionado": null,
                "cargoComissionadoAdicionado": false,
                "atoAlteracaoSalarioComissionado": null,
                "motivoAlteracaoSalarioComissionado": null,
                "salarioComissionadoAlterado": false,
                "unidadePagamento": "MENSALISTA",
                "configuracaoFerias": {
                    "id": 15
                },
                "quantidadeHorasMes": 200.0,
                "quantidadeHorasSemana": 40,
                "jornadaParcial": false,
                "dataAgendamentoRescisao": null,
                "funcoesGratificadas": [],
                "dataTerminoContratoTemporario": null,
                "motivoContratoTemporario": null,
                "hipoteseLegalContratoTemporario": null,
                "prazoDeterminadoContratoTemporario": null,
                "clausulaAssecuratoriaContratoTemporario": null,
                "tipoInclusaoContratoTemporario": null,
                "dataProrrogacaoContratoTemporario": null,
                "numeroCartaoPonto": null,
                "parametroPonto": null,
                "registraPonto": false,
                "compensaHoras": null,
                "controlaHorasManual": false,
                "indicativoProvimento": null,
                "orgaoOrigem": null,
                "matriculaEmpresaOrigem": null,
                "dataAdmissaoOrigem": null,
                "recebido": null,
                "ocorrenciaSefip": null,
                "controleJornada": null,
                "matriculasAdicionais": [],
                "matriculaLicencasPremio": [],
                "conselheiroTutelar": false,
                "concurso": null,
                "concursoProcessoSeletivo": null,
                "origemConcursoProcSeletivo": false,
                "concursoCandidato": null,
                "origemConcurso": null,
                "inicioTurnoCorrido": null,
                "tipoContratacaoAprendiz": null,
                "cnpjEntidadeQualificadora": null,
                "controlaPerAquisFeriasAntesAdmissao": false,
                "dataInicialPeriodoAquisitivoFeriasAntesAdmissao": null,
                "version": 1
            }
        });

        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar cada registro individualmente para a rota desejada
        // Armazenar as respostas do servidor
        const serverResponses = [];

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const url = `https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/atos`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                },
                body: JSON.stringify(record)
            });
     
            const responseBody = await response.json();
            serverResponses.push({
                url: url,
                status: response.status,
                statusText: response.statusText,
                responseBody: responseBody
            });
     
            if (response.ok) {
                console.log(`Dados do registro enviados com sucesso para ${url}.`);
            } else {
                console.error(`Erro ao enviar os dados do registro para ${url}:`, response.statusText);
            }
        } */

        //fs.writeFileSync('log_bens.json', JSON.stringify(serverResponses, null, 2));
        //console.log('Respostas do servidor salvas em log_bens.json');

    } catch (error) {
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        await sql.close();
    }
}

// Chamar a função principal
main();