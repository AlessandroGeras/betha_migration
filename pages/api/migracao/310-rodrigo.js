const sql = require('mssql');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const fs = require('fs');
const { format } = require('date-fns');

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
    if (!(date instanceof Date)) {
        date = new Date(date); // Converte para Date se não for uma instância de Date
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "FOLHADB"
        const selectDatabaseQuery = 'USE FOLHADB';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
        
SELECT
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
			Else dp.nr_CIC_CPF
    END AS id,
                f.cd_Funcionario as idIntegracao,
 JSON_QUERY(
    (SELECT
dt_Admissao as inicioVigencia,
'FISICA' as tipoPessoa,
f.nm_Funcionario as nome,
dp.nr_CIC_CPF as cpf,
f.dt_Nascimento as dataNascimento,


 JSON_QUERY(
    (SELECT
	 '1' AS id,
	JSON_QUERY(
		(SELECT
		case REPLACE(REPLACE(REPLACE(f.cd_Agencia,'.', ''),'-', ''),'/', '')
			when 32717 then 98294
			when 3271 then 98294
			when 11827 then 98290
			when 40067 then 98167
			when 11789 then 98288
			when 71218 then 98293
			when 03905 then 98287
			when 3925 then 98296
			when 3114 then 98295
			when 3271 then 98294
			when 11819 then 98289
			when 14060 then 98291
			when 40061 then 98167
			when 22926 then 98292
			when 11827 then 98290
			else 98294
			end as id
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
        ) AS agencia,
		
		case isnull(SUBSTRING(REPLACE(REPLACE(f.nr_ContaCorrente, '.', ''), '-', ''), 0, LEN(REPLACE(REPLACE(f.nr_ContaCorrente, '.', ''), '-', ''))),0) 
			when '' then '0'
			else isnull(SUBSTRING(REPLACE(REPLACE(f.nr_ContaCorrente, '.', ''), '-', ''), 0, LEN(REPLACE(REPLACE(f.nr_ContaCorrente, '.', ''), '-', ''))),0) 
		end as numero,

		CASE RIGHT(nr_ContaCorrente,1) 
		WHEN '' THEN '0'
		ELSE RIGHT(nr_ContaCorrente,1) 
		end as digito,


		'CORRENTE' as tipo,
		'2024-01-01' as dataAbertura,
		'ABERTA' as situacao,
		'true' as principal
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
        ) AS contasBancarias,

	CASE
        WHEN cd_EstCivil = 1 THEN 'SOLTEIRO'
        WHEN cd_EstCivil = 2 THEN 'CASADO'
        WHEN cd_EstCivil = 3 THEN 'SEPARADO_JUDICIALMENTE'
        WHEN cd_EstCivil = 4 THEN 'DIVORCIADO'
        WHEN cd_EstCivil = 5 THEN 'DIVORCIADO'
        WHEN cd_EstCivil = 6 THEN 'VIUVO'
        WHEN cd_EstCivil = 7 THEN 'SOLTEIRO'
        WHEN cd_EstCivil = 8 THEN 'UNIAO_ESTAVEL'
        ELSE 'Desconhecido'
    END as estadoCivil,
CASE
        WHEN fl_sexo = 'M' THEN 'MASCULINO'
        WHEN fl_sexo = 'F' THEN 'FEMININO '
                ELSE 'Desconhecido'
                END as sexo,
CASE
        WHEN cd_RacaCor = 0 THEN 'INDIGENA'
        WHEN cd_RacaCor = 2 THEN 'BRANCA'
        WHEN cd_RacaCor = 4 THEN 'PRETA'
        WHEN cd_RacaCor = 6 THEN 'AMARELA'
        WHEN cd_RacaCor = 8 THEN 'PARDA'
		ELSE 'BRANCA'
    END AS raca,
        'false' as doador,
         'false' as naturalizado,
          'false' as casadoComBrasileiro,
        'false' as temFilhosBrasileiros,
        nr_RG as identidade,
       ds_ExpedRG as orgaoEmissorIdentidade,
           nr_TitEleitoral as tituloEleitor,
nr_ZonaTE as zonaEleitoral,
nr_SecaoTE as secaoEleitoral,
nr_CTPS as ctps,
LEFT(REPLACE(REPLACE(REPLACE(nr_SerieCTPS,'.', ''),'-', ''),'/', ''),5) as serieCtps,
sg_ctps_uf as ufEmissaoCtps,
nr_PIS_PASEP as pis,
CASE
        WHEN cd_GrauInstruc = 1 THEN 'NAO_ALFABETIZADO'
        WHEN cd_GrauInstruc = 2 THEN 'ENSINO_FUNDAMENTAL_ANOS_INICIAIS'
        WHEN cd_GrauInstruc = 3 THEN 'ENSINO_FUNDAMENTAL_ANOS_INICIAIS'
        WHEN cd_GrauInstruc = 4 THEN 'ENSINO_FUNDAMENTAL_ANOS_FINAIS'
        WHEN cd_GrauInstruc = 5 THEN 'ENSINO_FUNDAMENTAL_ANOS_FINAIS'
        WHEN cd_GrauInstruc = 6 THEN 'ENSINO_MEDIO'
        WHEN cd_GrauInstruc = 7 THEN 'ENSINO_MEDIO'
        WHEN cd_GrauInstruc = 8 THEN 'ENSINO_SUPERIOR_SEQUENCIAL'
        WHEN cd_GrauInstruc = 9 THEN 'GRADUACAO_BACHARELADO'
        WHEN cd_GrauInstruc = 10 THEN 'ENSINO_PROFISSIONALIZANTE'
        WHEN cd_GrauInstruc = 11 THEN 'POS_GRADUACAO_ESPECIALIZACAO'
        WHEN cd_GrauInstruc = 12 THEN 'POS_GRADUACAO_MESTRADO'
        WHEN cd_GrauInstruc = 13 THEN 'POS_GRADUACAO_DOUTORADO'
        WHEN cd_GrauInstruc = 14 THEN 'POS_DOUTORADO_HABILITACAO'
        ELSE 'Desconhecida'
    END as grauInstrucao,
dp.cd_CNHCategoria as categoriaCnh,

JSON_QUERY(
    (SELECT
        dp.nm_pai as nome,
        'PAI' AS tipoFiliacao,
        'BIOLOGICA' AS naturezaFiliacao
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
        ) AS filiacaoPai,
JSON_QUERY(
    (SELECT
        dp.nm_Mae as nome,
        'MAE' AS tipoFiliacao,
        'BIOLOGICA' AS naturezaFiliacao
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
        ) AS filiacaoMae,

 JSON_QUERY(
    (SELECT
	    JSON_QUERY(
			(SELECT case dp.ds_Endereco
				when 'AGUIA BRANCA' then 3528027
				when 'ALAMEDA PEDRO COSTA LEITE' then 3527932	
				when 'ALMIRANTE TAMANDARE' then 3528033	
				when 'ALMIRANTE TAMANDARÉ' then 3527710	
				when 'AV ALMIRANTE TAMANDARE 637' then 3527784	
				when 'AV ARACAJU 5673' then 3527760	
				when 'AV BENEDITO LAURINDO GONÇALVESS 774' then 3527633	
				when 'AV BRASIL' then 3527873	
				when 'AV.CAFE FILHO N 5574' then 3527883	
				when 'AV CARLOS GOMES' then 3527622	
				when 'AV. CARLOS GOMES' then 3527681	
				when 'AV.CARLOS GOMES' then 3527588	
				when 'AV CARLOS GOMES 384' then 3527777	
				when 'AV CARLOS GOME S 391' then 3527868	
				when 'AV CARLOS GOMES 544' then 3527648	
				when 'AV CARLOS GOMES 686' then 3527656	
				when 'AV CARLOS GOMES 987' then 3527781	
				when 'AV CARLOS GOMES N° 137' then 3527877	
				when 'AV CARLOS GOMES N 640' then 3527911	
				when 'AV CARLOS GOMES N 648' then 3527908	
				when 'AV. CARLOS GOMES N 660' then 3527864	
				when 'AV CARLOS GOMES N 748' then 3527771	
				when 'Av. Carlos Gomes s/n' then 3527582	
				when 'AV CARLOS GOMES S-N' then 3527697	
				when 'AV CARLOS GOMES S/N' then 3527733	
				when 'AV. CARLOS GOMES S-N' then 3527701	
				when 'AV CARRLOS GOMES' then 3527923	
				when 'AV CORONEL JORGE TEIXEIRA N 6029' then 3527875	
				when 'AV.CORUMBIARIA 4353, R. DE MOURA' then 3527837	
				when 'AV CURITIBA N 873' then 3527731	
				when 'AV DA LARANJEIRAS' then 3527785	
				when 'AV DAS GARÇAS' then 3527745	
				when 'AV. DAS GARÇAS 251' then 3527732	
				when 'AV. DAS LARANJEIRAS' then 3527739	
				when 'Av. Dos IIGRANTES 369' then 3527647	
				when 'AV DOS PIONEIRO' then 3527610	
				when 'AV DOS PIONEIROE' then 3528021	
				when 'AV DOS PIONEIROE 495' then 3527850	
				when 'Av. Dos Pioneiros' then 3527575	
				when 'AV DOS PIONEIROS' then 3527585	
				when 'AV DOS PIONEIROS 1' then 3527758	
				when 'AV DOS PIONEIROS 217' then 3527794	
				when 'AV. DOS PIONEIROS 235' then 3527689	
				when 'AV DOS PIONEIROS 829' then 3527763	
				when 'AV DOS PIONEIROS 91' then 3527751	
				when 'AV DOS PIONEIROS 933' then 3527792	
				when 'AV DOS PIONEIROS N 1041' then 3527720	
				when 'AV. DOS PIONEIROS N.§ 1061' then 3527702	
				when 'AV DOS PIONEIROS N 158' then 3527902	
				when 'AV DOS PIONEIROS N 787' then 3527894	
				when 'Av. Dos Pioneiros s/n' then 3527584	
				when 'AVENIDA AGUIA BRANCA' then 3527957	
				when 'AVENIDA BELA VISTA' then 3527991	
				when 'AVENIDA BOA VISTA' then 3527988	
				when 'AVENIDA CARLOS GOMES' then 3527818	
				when 'AVENIDA COPACABANA' then 3527963	
				when 'AVENIDA DAS GARÇAS' then 3527993	
				when 'AVENIDA DAS LARANGEIRAS' then 3527981	
				when 'AVENIDA DOS IMIGRANTES' then 3527833	
				when 'AVENIDA DOS PIONEIORS' then 3527987	
				when 'AVENIDA DOS PIONEIROS' then 3527664	
				when 'AVENIDA DOS PIONEIROS 134' then 3527918	
				when 'AVENIDA DOS PIONEIROS 153' then 3527930	
				when 'AVENIDA DOS PIONEIROS 178' then 3527917	
				when 'AVENIDA DOS PIONEIROS 547' then 3527965	
				when 'AVENIDA DOS PIONEIROS 572' then 3527832	
				when 'AVENIDA DOS PIONEIROS N 468' then 3527966	
				when 'AVENIDA DOS PIONEIROS S/N' then 3527803	
				when 'AVENIDA DUQUE DE CAXIAS' then 3527799	
				when 'AVENIDA GUAPORE' then 3527713	
				when 'AVENIDA IGUACU' then 3527704	
				when 'AVENIDA IGUAÇU' then 3527682	
				when 'AVENIDA IGUAÇU N' then 3527728	
				when 'AVENIDA JORGE TEIXEIRA 3636' then 3527919	
				when 'AVENIDA PORTO VELHO' then 3527928	
				when 'AVENIDA ROLIM DE MOURA' then 3527663	
				when 'AVENIDA SAO LUIZ' then 3527730	
				when 'AVENIDA TEREZINA' then 3527809	
				when 'Avenida Venceslau  Braz 3350' then 3527828	
				when 'AV ESPIRITO SANTO' then 3527939	
				when 'AV FLORIANOPOLIS' then 3527871	
				when 'Av. Iga‡u	'  then 3527657	
				when 'AV IGUAÇU 128' then 3527847	
				when 'AV IGUAÇU N 42' then 3527915	
				when 'AV. IGUAÇU N 45' then 3527736	
				when 'AV IGUAÇU N 99' then 3527578	
				when 'AV IGUAÇU Nº 18' then 3527916	
				when 'AV JAMARI N 4584' then 3527869	
				when 'AV. MINAS GERAIS' then 3528007	
				when 'Av. Nova Igua‡u' then 3527651	
				when 'AV. PORTO VELHO' then 3527855	
				when 'AV. SÃO PAULO' then 3528000	
				when 'AV SETE DE SETEMBRO5475' then 3527717	
				when 'AV. TANCREDO NEVES 3941' then 3527866	
				when 'AV XINGU N 5376' then 3527900	
				when 'BAIRRO JARDIM QUEILA' then 3527990	
				when 'BAIRRO PONGA' then 3527992	
				when 'BENEDITO LAURINDO GONÇALVES' then 3528025	
				when 'BENTIVI' then 3528013	
				when 'BNH QUADRA 03 CSA 23' then 3527757	
				when 'CARLOS DRUMOND DE ANDRADE' then 3528032	
				when 'CASTELO BRANCO' then 3528034	
				when 'COABH 01' then 3527998	
				when 'DA MATRIZ' then 3526537	
				when 'DAS LARANJEIRAS' then 3528016	
				when 'DOS PERIQUITOS' then 3528011	
				when 'DOS PIONEIROS' then 3528028	
				when 'DUQUE DE CAXIAS' then 3528043	
				when 'ESTRADA CAPIXABA' then 3527842	
				when 'ET KAPA 24 11 PROCHOP' then 3527909	
				when 'GETULIO DORNELES VARGAS' then 3528023	
				when 'GRACILIANO RAMOS' then 3528017	
				when 'JAIR DIAS' then 3505109	
				when 'Jetude Dorneles Vargas s/n'  then 3527619	
				when 'JOSE RODRIGUES N 178' then 3527934	
				when 'JUDITE DE OLIVEIRA' then 3528031	
				when 'JUDITE DE OLIVEIRA PARASSU' then 3528022	
				when 'Judite Jesus de Oliveira' then 3527615	
				when 'LH P 02 LT. 29 KM 15' then 3527846	
				when 'LH P-12' then 3527709	
				when 'LIHA 75' then 3527949	
				when 'LIMHA P 14 NOVA KM 06' then 3527706	
				when 'LINHA 02 KM 14' then 3527600	
				when 'LINHA 06 CHACARA VERDE' then 3527937	
				when 'LINHA 06 KM 01' then 3527977	
				when 'LINHA 06 - KM 06' then 3527946	
				when 'LINHA 07 KM 01' then 3527986	
				when 'LINHA 08 KM 04' then 3527954	
				when 'LINHA 100 KAPA 0 LOTE 92' then 3527905	
				when 'linha 105' then 3527618	
				when 'linha 105 capa 14 Km 45' then 3527675	
				when 'linha 110' then 3527628	
				when 'Linha 110 Km 45' then 3527671	
				when 'LINHA 110 P08' then 3527587	
				when 'LINHA 110 VILA  BOSCO' then 3527627	
				when 'LINHA 110 VILA BOSCO' then 3527629	
				when 'LINHA 12' then 3527805	
				when 'LINHA 12 KM 01' then 3527744	
				when 'LINHA 12 KM 01 SAIDA BOSCO BOSCO' then 3527722	
				when 'LINHA 12 KM 06' then 3527810	
				when 'LINHA 184 KM 405 L SUL' then 3527857	
				when 'LINHA 184 ROLIM DE MOURA' then 3527901	
				when 'LINHA 24' then 3527754	
				when 'LINHA 30 COMUNIDADE SAO' then 3527761	
				when 'LINHA 31 GL CORUMBIARIA ST 06' then 3527854	
				when 'LINHA 45 KM 08 SAIDA P/ ALTA FLORESTA' then 3527859	
				when 'LINHA 45 KM 2' then 3527961	
				when 'LINHA 45 LOTE 25' then 3527938	
				when 'LINHA 45 SANTA LUZIA D OESTE' then 3527913	
				when 'LINHA 65' then 3527642	
				when 'LINHA 65 05'  then 3527642	
				WHEN 'FAZENDA CRISTO REI' then 3527797	
				when 'LINHA 75' then 3527678	
				when 'LINHA 75 COM A P 10 KM 04' then 3527665	
				when 'LINHA 75 - KAPA 08' then 3527969	
				when 'LINHA 75 KAPA O4' then 3527775	
				when 'linha 75 km 01' then 3527632	
				when 'LINHA 75, KM 01' then 3527653	
				when 'LINHA 75 KM 01 LOTE 31' then 3527865	
				when 'LINHA 75, KM 01, SAIDA PARA P-14' then 3528035	
				when 'LINHA 75 KM 01SENTIDO P 14' then 3527835	
				when 'linha 75 km 01 Sitio Caracol' then 3527607	
				when 'LINHA 75 KM 02' then 3527668	
				when 'LINHA 75 KM 06' then 3527742	
				when 'Linha 75 km 06 sitio Caracol' then 3527621	
				when 'LINHA 75 KM 1' then 3527695	
				when 'LINHA 75 KM 19' then 3527762	
				when 'LINHA 75 KM 40 LOTE 31 SETOR 06'then 3527881	
				when 'LINHA 75, KM 7,5' then 3528001	
				when 'LINHA 75 N 1248' then 3527848	
				when 'LINHA 75 - SAIDA SANTA LUZIA' then 3527968	
				when 'Linha 80' then 3527654	
				when 'LINHA 80 KAPA 18' then 3527861	
				when 'linha 80 km 03' then 3527593	
				when 'LINHA 80 KM 06' then 3527888	
				when 'Linha 85' then 3527589	
				when 'LINHA 85 - GLEBA' then 3527811	
				when 'LINHA 85 KAPA 04' then 3527967	
				when 'LINHA 90' then 3527940	
				when 'LINHA 90 CAPA ZERO' then 3527649	
				when 'LINHA 90 KAPA 0' then 3527823	
				when 'LINHA 90 KM 15' then 3527674	
				when 'LINHA 90/ P 04' then 3527586	
				when 'LINHA 95' then 3528044	
				when 'LINHA 95 CAPA 0' then 3527703	
				when 'LINHA 95 CAPA ZERO' then 3527625	
				when 'Linha 95 MONTE AZUL' then 3527673	
				when 'LINHA BOSCO KM 01' then 3527945	
				when 'LINHA CAPA 04 KM 18' then 3527686	
				when 'LINHA CAPA 30, KM 2' then 3528048	
				when 'LINHA CAPICHABA' then 3527772	
				when 'LINHA CAPIXABA KM 01' then 3527776	
				when 'LINHA KAPA 0' then 3527723	
				when 'LINHA KAPA 02' then 3527829	
				when 'LINHA KAPA 04' then 3527982	
				when 'LINHA KAPA 04 C/ 06'then 3527844	
				when 'Linha kapa 04 km 12' then 3527661	
				when 'LINHA KAPA 06' then 3527951	
				when 'LINHA KAPA 06 KM 19,5' then 3527983	
				when 'LINHA KAPA 06 LOTE 32' then 3527971	
				when 'LINHA KAPA 08' then 3527970	
				when 'LINHA KAPA 08 KM 01'then 3527876	
				when 'LINHA KAPA 08 KM 28' then 3527956	
				when 'LINHA KAPA 08 KM 6,5' then 3527924	
				when 'LINHA KAPA 0 KM 90' then 3527921	
				when 'LINHA KAPA 10 KM 02' then 3527801	
				when 'LINHA KAPA 11, KM1,5' then 3528038	
				when 'LINHA KAPA 28' then 3528018	
				when 'LINHA KAPA 28, KM 4,5' then 3528010	
				when 'LINHA KAPA 30' then 3527925	
				when 'LINHA LAPA 08 KM 25' then 3527996	
				when 'LINHA P 02' then 3527699	
				when 'linha P 02 assentamento' then 3527676	
				when 'LINHA P 02 KM 11LOTE 48' then 3527579	
				when 'LINHA P 02 KM 12' then 3527831	
				when 'LINHA P-02, KM 13' then 3528006	
				when 'LINHA P 02 KM 13 LOTE 28' then 3527870	
				when 'LINHA P 02 KM 15' then 3527652	
				when 'LINHA P 04' then 3527631	
				when 'LINHA P-04, KM 04, SAIDA P/ SÃO FELIPE' then 3528012	
				when 'LINHA P 04 KM 06' then 3527721	
				when 'LINHA P 04 KM 08 LOTE 88' then 3527882	
				when 'LINHA P 04 KM 09' then 3527756	
				when 'LINHA P 04 KM 10' then 3527687	
				when 'LINHA P04 KM 10' then 3527685	
				when 'LINHA P 04 KM 13' then 3527839	
				when 'LINHA P 04 KM 3,5' then 3527907	
				when 'LINHA P 04 M]KM 13' then 3527815	
				when 'linha P04 Setor Arara II' then 3527662	
				when 'LINHA P 05 KM 3' then 3527630	
				when 'LINHA P06' then 3527813	
				when 'LINHA P 06' then 3527679	
				when 'LINHA P-06' then 3528003	
				when 'LINHA P 06 COAB' then 3527974	
				when 'LINHA P 06 KM 01' then 3527644	
				when 'LINHA P 06, KM 01' then 3527995	
				when 'LINHA P-06, KM 01' then 3528039	
				when 'LINHA P-06, KM 01, CHÁCARA BARRA VERDE'then 3527611	
				when 'LINHA P-06, KM 01, LADO SUL' then 3528045	
				when 'LINHA P-06, KM 02' then 3528009	
				when 'LINHA P 06 KM 03' then 3527912	
				when 'LINHA P-06, KM 03' then 3527667	
				when 'LINHA P-06, KM 04' then 3528008	
				when 'LINHA P 06 KM 05' then 3527769	
				when 'LINHA P-06, KM 05' then 3527999	
				when 'LINHA P-06, KM 06' then 3528005	
				when 'Linha P06 km 07' then 3527640	
				when 'LINHA P-06, KM 07, LOTE 121' then 3527926	
				when 'LINHA P-06, KM 08' then 3528047	
				when 'LINHA P 06 KM 1' then 3527659	
				when 'LINHA P 06 KM 1.5' then 3527903	
				when 'LINHA P06, KM2' then 3528046	
				when 'LINHA P 06 KM 5' then 3527955	
				when 'LINHA P 06, KM 7' then 3527609	
				when 'Linha P07' then 3527590	
				when 'LINHA P 07' then 3527994	
				when 'LINHA P 07 KM 01' then 3527764	
				when 'LINHA P 07 KM 02' then 3527895	
				when 'LINHA P-07, KM 04, CHACARA 66' then 3527707	
				when 'LINHA P 07 - KM 8,5 - PA CEARÁ' then 3527638	
				when 'LINHA P 08' then 3527655	
				when 'LINHA P 105 CAPA 04' then 3527643	
				when 'LINHA P 10 KM 23' then 3527887	
				when 'LINHA P 12' then 3527976	
				when 'LINHA P12 ESQUINA COM 95' then 3527752	
				when 'LINHA P-12, ESQUINA COM A 95' then 3527614	
				when 'LINHA P 12 KM 04' then 3527935	
				when 'LINHA P 12 KM 12' then 3527958	
				when 'LINHA P 12 KM 13' then 3527972	
				when 'Linha P-12 Km 1,5' then 3527635	
				when 'LINHA P-12, KM 22' then 3528036	
				when 'LINHA P-12, KM 225' then 3528040	
				when 'LINHA P-12, KM 23' then 3527666	
				when 'LINHA P-12, KM 4,5' then 3528041	
				when 'LINHA P12 KM 4,5' then 3527684	
				when 'LINHA P 12 S/N KM 06' then 3527800	
				when 'LINHA P 14' then 3527670	
				when 'LINHA P-14' then 3528014	
				when 'LINHA P-14' then 3528030	
				when 'Linha P14 nova' then 3527603	
				when 'LINHA P 14 NOVA KM 12' then 3527726	
				when 'LINHA P 14 NOVA KM 3,5' then 3527743	
				when 'LINHA P 14 NOVA KM 3.5' then 3527705	
				when 'LINHA P 14 S/N KM 3,5' then 3527858	
				when 'LINHA P-18 NOVA, KM 01' then 3528029	
				when 'LINHA P22 KM 01' then 3527929	
				when 'LINHA P 22 NORTE' then 3527927	
				when 'LINHA P 41 S/N' then 3527767	
				when 'LINHA P 6 KM 02' then 3527712	
				when 'LINHA P 75 KM 08' then 3527879	
				when 'LINHA P O6' then 3527922	
				when 'LINHA PROJETADA KM 1,5' then 3527952	
				when 'LIONHA P-06, KM 3,5' then 3528037	
				when 'MANOEL ANTONIO DE OLIVEIRA' then 3528015	
				when 'MANOEL GARRINCHA' then 3528019	
				when 'MUNICIPIO DE PARECIS' then 3527734	
				when 'N/A' then 3527583	
				when 'PARECIS' then 3527798	
				when 'ROLIM DE MOURA' then 3527843	
				when 'rua' then 3413750	
				when 'RUA 07 DE SETEMBRO' then 3527997	
				when 'Rua 7 de setembro' then 3527634	
				when 'Rua 7 de Setembro n.§ 604' then 3527688	
				when 'Rua 7 de Setembro s/n' then 3527672	
				when 'RUA ALAGOAS N 4325' then 3527856	
				when 'RUA ALMIRANTE TAMANDARE' then 3527755	
				when 'RUA ALMIRANTE TAMANDARÉ' then 3527950	
				when 'RUA ALMIRANTE TAMANDARE 620' then 3527849	
				when 'RUA ALMIRANTE TAMANDARE N 651' then 3527943	
				when 'RUA ALMIRANTE TAMANDARÉ Nº 384' then 3527677	
				when 'Rua Almirante Tamandar‚ s/n' then 3527692	
				when 'RUA ANTONIO DE JESUS OLIVEIRA' then 3527826	
				when 'RUA ANTONIO J. DE OLIVEIRA' then 3527694	
				when 'RUA ANTONIO JESUS DE OLIVEIRA' then 3527623	
				when 'RUA ANTONIO MANOEL DE OLIVEIRA' then 3527802	
				when 'RUA ARAPONGA S/N' then 3527841	
				when 'RUA BARAO DE MELGAÇO 4333' then 3527789	
				when 'RUA BECO DA CARLOS GOMES' then 3527942	
				when 'Rua Bendito Laurindo Gon‡alves s/n' then 3527626	
				when 'RUA BENEDITO GONÇALVES' then 3527807	
				when 'RUA BENEDITO LAUDINDO GONÇALVES' then 3527827	
				when 'RUA BENEDITO LAURINDO GONÇALVES' then 3527601	
				when 'RUA BENEDITO LAURINDO GONÇALVES 546' then 3527796	
				when 'RUA BENEDITO LAURINDO GONÇALVES 587' then 3527793	
				when 'RUA BENEDITO LAURINDO GONÇALVES N ° 28' then 3527741	
				when 'RUA BENEDITO LAURINDO GONÇALVES N 637' then 3527885	
				when 'RUA BENEDITO LAURINDO GONÇALVES N 86 A' then 3527719	
				when 'RUA BENEDITO L GONÇALVES' then 3527598	
				when 'RUA BENEDITO L. GONÇALVES N 610' then 3527860	
				when 'RUA BENTEVI' then 3527599	
				when 'RUA BENTEVI N 518' then 3527959	
				when 'RUA CANIDÉ' then 3527889	
				when 'RUA CANIDE N 2221' then 3527960	
				when 'RUA CANINDÉ' then 3527724	
				when 'RUA CARLOS DRUMOND DE ADNDRADE' then 3527989	
				when 'RUA CARLOS DRUMOND DE ANDRADE 106A' then 3527753	
				when 'RUA CASTELO BRANCO' then 3527620	
				when 'RUA CASTELO BRANCO N 67' then 3527863	
				when 'RUA C N 72' then 3527765	
				when 'RUA CORUMBIARA 4702' then 3527774	
				when 'RUA D' then 3527750	
				when 'RUA DA GETULIO DORNELES VARGAS' then 3527944	
				when 'RUA DA MATIZ N 256' then 3527962	
				when 'Rua da MAtriz' then 3527595	
				when 'RUA DA MATRIZ 468' then 3527786	
				when 'RUA DA MATRIZ 515' then 3527906	
				when 'RUA DA MATRIZ 617' then 3527782	
				when 'RUA DA MATRIZ N 05' then 3527867	
				when 'RUA DA MATRIZ N 175' then 3527886	
				when 'RUA DA MATRIZ N 301' then 3527948	
				when 'RUA DA MATRIZ N 453' then 3527933	
				when 'RUA DA MATRIZ N 55' then 3527899	
				when 'RUA DA MATRIZ N 573' then 3527931	
				when 'RUA DA MATRIZ N 617' then 3527853	
				when 'RUA DA MATRIZ N 632' then 3527874	
				when 'RUA DA MATRIZ Nº 241' then 3527641	
				when 'RUA DA MATRIZ Nº 371' then 3527836	
				when 'RUA DA MATRIZ S/N' then 3527768	
				when 'RUA DAS LARANGEIRAS N 300' then 3527978	
				when 'RUA DAS LARANJEIRAS' then 3527580	
				when 'RUA DAS LARANJEIRAS S/N' then 3527725	
				when 'RUA DORNELES VARGAS' then 3527617	
				when 'RUA DOS IMIGRANTE N 18' then 3527773	
				when 'RUA DOS IMIGRANTES' then 3527606	
				when 'RUA DOS IMIGRANTES 012' then 3527577	
				when 'RUA DOS IMIGRANTES 267' then 3527817	
				when 'RUA DOS IMIGRANTES 49' then 3527787	
				when 'RUA DOS IMIGRANTES 518' then 3527691	
				when 'RUA DOS IMIGRANTES 96' then 3527897	
				when 'RUA DOS IMIGRANTES N 267' then 3527840	
				when 'RUA DOS IMIGRANTES N 55' then 3527851	
				when 'Rua Dos Imigrantes s/n' then 3527658	
				when 'Rua Duque de Caxias' then 3527680	
				when 'RUA DUQUE DE CAXIAS N 130' then 3527747	
				when 'RUA DUQUE DE CAXIAS N 58' then 3527872	
				when 'RUA DUQUE DE CAXIAS N.§ 96' then 3527698	
				when 'RUA FLORIANO PEIXOTO 2157' then 3527715	
				when 'RUA GERULIO DORNELES VARGAS' then 3527605	
				when 'Rua GETULIO DORNELES VARGAS' then 3527613	
				when 'RUA Getúlio Dorneles Vargas' then 3527984	
				when 'RUA GETULIO DORNELES VARGAS N 406' then 3527880	
				when 'RUA Getúlio Dorneles Vargas nº 374-' then 3527683	
				when 'RUA GETULIO DORNELIS VARGAS 537' then 3527788	
				when 'RUA GETULIO VARGAS' then 3527650	
				when 'RUA GETULIO VARGAS 282' then 3527812	
				when 'RUA GETULIO VARGAS 340' then 3527591	
				when 'RUA GETULIO VARGAS DORNELIS 282' then 3527795	
				when 'RUA GETULIO VARGAS N° 506' then 3527738	
				when 'RUA GETULIO VARGAS S/N' then 3527727	
				when 'RUA GRACCILIANO RAMOS' then 3527985	
				when 'RUA GRACILIANO RAMOS' then 3527711	
				when 'RUA GRACILIANO RAMOS 243-A' then 3527892	
				when 'RUA GRACILIANO RAMOS 86-A' then 3527878	
				when 'RUA GRACILIANO RAMOS N243 A' then 3527770	
				when 'RUA GRACILIANO RAMOS N 59' then 3527980	
				when 'RUA GRACILIANO RAMOS N 62' then 3527891	
				when 'RUA GRACILIANO RAMOS Nº 229' then 3527884	
				when 'RUA GRACILIANO RAMOS Nº 78' then 3527820	
				when 'RUA IGUAÇU' then 3527718	
				when 'RUA IGUAÇU 54' then 3527778	
				when 'RUA JAIR DIAS' then 3527602	
				when 'RUA JAIR DIAS 04' then 3527845	
				when 'RUA JAIR DIAS 108' then 3527780	
				when 'RUA JAIR DIAS 189' then 3527594	
				when 'RUA JAIR DIAS 193' then 3527852	
				when 'RUA JAIR DIAS 1981' then 3527597	
				when 'Rua Jair Dias n.§ 058' then 3527581	
				when 'RUA JAIR DIAS N 124' then 3527914	
				when 'RUA JAIR DIAS N 24' then 3527920	
				when 'Rua JAIR DIAS N 28' then 3527596	
				when 'Rua Jetulho Dorneles Vargas' then 3527639	
				when 'Rua Jetulho Dorneles Vargas s/n' then 3527669	
				when 'Rua Jetulio Dorneles Vagas' then 3527646	
				when 'RUA JORGE AMADO' then 3528026	
				when 'RUA JOSE RODRIGUES' then 3527696	
				when 'RUA JOSÉ RODRIGUES' then 3527825	
				when 'RUA JOSÉ RODRIGUES DE OLIVEIRA' then 3527804	
				when 'RUA JOSE RODRIGUES DE OLIVEIRA N 119' then 3527898	
				when 'Rua Jose Rodrigues n.§ 179' then 3527636	
				when 'RUA JOSE RODRIGUES N 84' then 3527766	
				when 'RUA JUCELINO KUBITSCHEK' then 3527941	
				when 'RUA JUCELINO KUBITSCHEK 729' then 3527910	
				when 'RUA JUDITE DE JESUS OLIVEIRA' then 3527604	
				when 'RUA JUDITE DE JESUS OLIVEIRA 26' then 3527975	
				when 'RUA JUDITE DE OLIVEIRA' then 3528004	
				when 'RUA JUDITE DE OLIVEIRA N 40' then 3527749	
				when 'RUA JUDITE JESUS DE OLIVEIRA' then 3527576	
				when 'RUA JUDITE JESUS DE OLIVEIRA 205' then 3527779	
				when 'RUA JUDITE JESUS DE OLIVEIRA 205' then 3527660	
				when 'RUA JUDITE JESUS DE OLIVEIRA 56' then 3527790	
				when 'RUA JUDITE JESUS DE OLIVEIRA N 115' then 3527862	
				when 'RUA LINHA 75' then 3528024	
				when 'RUA MACHADO DE ASSIS' then 3527814	
				when 'RUA MACHADO DE ASSIS 66A' then 3527740	
				when 'RUA MACHADO DE ASSIS N 181' then 3527979	
				when 'RUA MANOEL ANTONIO DE OLIVEIRA' then 3527824	
				when 'RUA MANOEL DE OLIVEIRA' then 3527819	
				when 'RUA MANOEL DE OLIVEIRA 745' then 3527830	
				when 'RUA MANOEL DE OLIVEIRA N745' then 3527904	
				when 'RUA MANOEL GARRINCHA' then 3528020	
				when 'RUA MENOEL DE OLIVEIRA 742' then 3527838	
				when 'RUA MONTEIRO LOBATO' then 3527645	
				when 'RUA MONTEIRO LOBATO 47' then 3527746	
				when 'RUA MONTEIRO LOBATO N 130' then 3527947	
				when 'RUA MONTEIRO LOBATO N 40' then 3527964	
				when 'RUA ODAIR MEIRELES' then 3528002	
				when 'RUA ORLANDINO DE JESUS' then 3527735	
				when 'RUA ORLANDINO DE JESUS 307' then 3527791	
				when 'RUA ORLANDINO DE JESUS DE OLIVEIRA' then 3527690	
				when 'RUA ORLANDINO DE JESUS Nº 63' then 3527896	
				when 'RUA ORLANDINO DE JESUS OLIVEIRA' then 3527608	
				when 'RUA ORLANDINO DE JESUS OLIVEIRA 191' then 3527890	
				when 'Rua Orlandino de Oliveira' then 3527612	
				when 'Rua Orlandino Jesus de Oliveira' then 3527624	
				when 'RUA ORLANDINO JESUS OLIVEIRA' then 3527637	
				when 'RUA RIO MADEIRA 5768' then 3527737	
				when 'RUA RUI BARBOZA NN' then 3527834	
				when 'RUA SETE DE SETEMBRO' then 3527592	
				when 'RUA SETE DE SETEMBRO 539' then 3527729	
				when 'RUA SETE DE SETEMBRO N 545' then 3527759	
				when 'RUA SETE DE SETEMBRO N 573' then 3527748	
				when 'RUA SETE DE SETEMBRO Nº 544' then 3527821	
				when 'RUA SETE DE SETEMBRO S/N' then 3527783	
				when 'RUA TEODORO R DA SIILVA' then 3527953	
				when 'RUA TOCANTINS N 5575' then 3527716	
				when 'RUA TOCANTIS' then 3527714	
				when 'RUA VANIA CARVALHO' then 3527973	
				when 'SAIDA PARA SANTA LUZIA' then 3527708	
				when 'SEBASTIAO F BARBOSA 2420' then 3527936	
				when 'SETOR CHACREIRO LINHA 75 KM 1' then 3527693	
				when 'SITIO CASTELO DE AMOR' then 3527808	
				when 'VA DOS PIONEIROS 495' then 3527893	
				when 'VEREADOR EDSON SANTANA MOTA' then 3528042	
					Else 3413750
				End AS id
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
		) AS logradouro,
		
		JSON_QUERY(
			(SELECT case CONCAT(dp.ds_Bairro,dp.ds_Municipio)

				when 'CentroCacoal' then 6561
			when 'CentroPARECIS' then 6571
when 'CENTROPÁRECIS' then 6571
when 'ZONA  ' then 6571
when 'PARECIS' then 6571
when 'JARDIM QUEILAPARECIS' then 6571
when 'km 01PARECIS' then 6571
when '  DO PARECIS' then 6571
when 'O TELEFONE É DA TIA NO PARANÁ A SRª EDITEPARECIS.' then 6571
when 'ZONA RUARLPARECIS' then 6571
when 'ZONA RURALALTO ALEGRE' then 6571
when 'BEIRA RIO ' then 6571
when 'BBE18930 CODIGO DE RECLAMAÇÃO INSSPARECIS' then 6571
when 'CENTROPARACIS' then 6571
when 'CEMNTROPARECIS' then 6571
when 'ZONA RUARALPARECIS' then 6571
when '.' then 6571
when 'ZONA URBANAPARECIS' then 6571
when 'CENTRO ' then 6571
when 'JARDIM CLODOALDOCACOAL' then 6576
when 'CHACARAPARECIS' then 6571
when 'VILA NOVA ' then 6571
when 'BOA ESPERANÇAPARECIS' then 6571
when 'PARECISPARECIS' then 6571
when 'JARDIM KEILAPARECIS' then 6571
when 'PIMENTA BUENO' then 6569
when 'ROLIM DE MOURA' then 6563
when 'CIDADE ALTA' then 6571
when 'RURALPARECIS' then 6571
when 'ZONA RURALPRIMAVERA' then 6571
when 'ZONZ  ' then 6571
when 'CENTRO N° 742PARECIS' then 6571
when 'VILA DOM BOSCOPARECIS' then 6571
when '99970571 WALMIRPARECIS' then 6571
when 'CENTROSANTA LUZIA DOESTE' then 6571
when 'BAIRRO CHACAREIROPARECIS' then 6571
when 'SETOR CHACAREIROPARECIS' then 6571
when 'JARDIM TROPI ' then 6571
when 'CENTROALTA FLORESTA' then 6571
when 'ZONA RURAL ' then 6571
when 'CENTROSANTA LUZIA DOESTE' then 6571
when 'SANTA LUZIA' then 6571
when 'CENTRO   ' then 6571
when 'BOA ESPERANÇA ' then 6571
when 'CENTROALVORADA D OESTE' then 6571
when 'SAO JOSECOLORADO DO OESTE' then 6571
when 'SAO FELIPEPARECIS' then 6571
when 'CENTROSANAT LUZIA' then 6571
when 'CENTROPRIMAVERA DE RONDONIA' then 6571
when 'RURAL - PE DE GALINHAPARECIS' then 6571
when 'ZONA RURALSANTA LUZIA DOESTE' then 6571
when 'RURALSANTA LUZIA DOESTE' then 6571
when 'ZONA RURAL ' then 6571
when 'SAUDESANTA LUZIA DOESTE' then 6571
when 'RURALSAO FELIPE' then 6571
when 'BAIRRO BOA ESPERANÇA ' then 6571
when 'ZONA RURALSAO FELIPE' then 6571
when 'CENTROSAO FELIPE DOESTE' then 6571
when 'ZONA RURALSÃO FELIPE' then 6571
when 'NOVO CACOALCACOAL' then 6571
when 'LINHA CAPIXABAPARECIS' then 6571
when 'COABPARECIS' then 6571
when 'NOVO CACOALCACOAL' then 6571
when 'CENTROSANAT LUZIA' then 6571
when 'CENTROALTO ALEGRE DOS PARECIS' then 6571
when 'PONGAPARECIS' then 6571
when 'CENTROSÃO FELIPE D OESTE' then 6571
when 'CIDADE ALTAALTA FLORESTA D OESTE' then 6571
when 'P-14PARECIS' then 6571
when 'PÉ DE GALINHAPARECIS' then 6571
when 'AEROPORTOOURO PRETO D OESTE' then 6571
when 'BRRO PONGAPARECIS' then 6571
when '01PARECIS' then 6571
when 'ZONARUALPARECIS' then 6571
when 'JEQUITIBA ' then 6571
when 'COHAB 01PARECIS' then 6571
when 'BAIRRO 01PARECIS' then 6571
					else '6571'
				End AS id
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
		) AS bairro,
		dp.nr_cep as cep,
		CASE
        WHEN dp.nr_Logradouro = '' THEN ''
                ELSE dp.nr_Logradouro
        END as numero,

		dp.ds_LogradouroComplemento as complemento,
        left (dp.ds_endereco,20) as descricao,
        'true' as principal
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS enderecos,

nr_CNH as cnh,
dp.dt_CNHvALIDADE AS dataValidadeCnh,
dp.uf_cnh as ufEmissaoCnh,
dt_RG as dataEmissaoIdentidade,
dp.dt_ctps as dataEmissaoCtps,
nr_CertifReservista as certificadoReservista,
'RETENCAO_IRRF_ALIQUOTA_DA_TABELA_PROGRESSIVA' as formaTributacao       
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
        ) AS conteudo
from FOLHFuncionario f
join FOLHFuncDadosPess dp on dp.cd_Funcionario = f.cd_Funcionario
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const conteudo = JSON.parse(record.conteudo);

            function formatCPF(cpf) {
                const cpfString = String(cpf);
                const cpfPadded = cpfString.padStart(11, '0'); // Preencher com zeros à esquerda para completar 11 caracteres
                return cpfPadded;
            }

            let filiacoes = [];
            if (conteudo.filiacaoPai && conteudo.filiacaoPai.nome) {
                filiacoes.push({
                    id: "1",
                    nome: conteudo.filiacaoPai.nome,
                    tipoFiliacao: conteudo.filiacaoPai.tipoFiliacao,
                    naturezaFiliacao: conteudo.filiacaoPai.naturezaFiliacao
                });
            }
            if (conteudo.filiacaoMae && conteudo.filiacaoMae.nome) {
                filiacoes.push({
                    id: "2",
                    nome: conteudo.filiacaoMae.nome,
                    tipoFiliacao: conteudo.filiacaoMae.tipoFiliacao,
                    naturezaFiliacao: conteudo.filiacaoMae.naturezaFiliacao
                });
            }

            let enderecos = [];
            if (conteudo.enderecos) {
                enderecos.push({
                    logradouro: { id: conteudo.enderecos.logradouro?.id || null },
                    bairro: { id: conteudo.enderecos.bairro?.id || null },
                    cep: conteudo.enderecos.cep || null,
                    numero: conteudo.enderecos.numero || "N/A", // Default "0" como no modelo
                    descricao: conteudo.enderecos.descricao || null,
                    principal: conteudo.enderecos.principal === 'true'
                });
            }

            let contasBancarias = [];
            if (conteudo.contasBancarias) {
                contasBancarias.push({
                    id: conteudo.contasBancarias.id,
                    agencia: { id: conteudo.contasBancarias.agencia?.id || null },
                    numero: conteudo.contasBancarias.numero || null,
                    digito: conteudo.contasBancarias.digito || null,
                    tipo: conteudo.contasBancarias.tipo || null,
                    dataAbertura: conteudo.contasBancarias.dataAbertura || null,
                    situacao: conteudo.contasBancarias.situacao || null,
                    principal: conteudo.contasBancarias.principal === 'true'
                });
            }

            return {
                idIntegracao: record.idIntegracao,
                conteudo: {
                    inicioVigencia: formatDate(conteudo.inicioVigencia) || null,
                    tipoPessoa: conteudo.tipoPessoa || null,
                    nome: conteudo.nome || null,
                    cpf: conteudo.cpf ? formatCPF(conteudo.cpf) : null,
                    dataNascimento: conteudo.dataNascimento || null,
                    contasBancarias: contasBancarias,
                    estadoCivil: conteudo.estadoCivil || null,
                    sexo: conteudo.sexo || null,
                    raca: conteudo.raca || null,
                    doador: conteudo.doador === 'true',
                    naturalizado: conteudo.naturalizado === 'true',
                    casadoComBrasileiro: conteudo.casadoComBrasileiro === 'true',
                    temFilhosBrasileiros: conteudo.temFilhosBrasileiros === 'true',
                    identidade: conteudo.identidade || null,
                    orgaoEmissorIdentidade: conteudo.orgaoEmissorIdentidade || null,
                    tituloEleitor: conteudo.tituloEleitor || null,
                    zonaEleitoral: conteudo.zonaEleitoral || null,
                    secaoEleitoral: conteudo.secaoEleitoral || null,
                    ctps: conteudo.ctps || null,
                    serieCtps: conteudo.serieCtps || null,
                    ufEmissaoCtps: conteudo.ufEmissaoCtps || null,
                    pis: conteudo.pis || null,
                    grauInstrucao: conteudo.grauInstrucao || null,
                    filiacoes: filiacoes,
                    enderecos: enderecos,
                    cnh: conteudo.cnh === 0 ? null : conteudo.cnh !== undefined ? conteudo.cnh : null,
                    dataEmissaoIdentidade: conteudo.dataEmissaoIdentidade || null,
                    certificadoReservista: conteudo.certificadoReservista || null,
                    formaTributacao: conteudo.formaTributacao || null
                }
            };
        });

        // Dividir os dados em chunks para salvar localmente (opcional)
        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        let report = [];
        let reportIds = []; // Array para armazenar apenas as respostas da API

        for (const record of transformedData) {
            const pessoaId = record.idIntegracao; // ID dinâmico da pessoa

            if (pessoaId) { // Verifica se o ID é válido
                try {
                    // Coloca o registro dentro de um array
                    const requestBody = [record];

                    // Exibir o corpo da requisição antes de enviá-la
                    console.log('Enviando o seguinte corpo para a API:', JSON.stringify(requestBody, null, 2));

                    const response = await fetch(`https://pessoal.betha.cloud/service-layer/v1/api/pessoa`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                        },
                        body: JSON.stringify(requestBody) // Envia o registro dentro de um array
                    });

                    // Capturar o corpo da resposta, seja sucesso ou erro
                    const responseBody = await response.json();

                    // Exibir o status da resposta e o corpo de erro (se houver)
                    if (response.ok) {
                        console.log('Dados enviados com sucesso para a rota.');
                        report.push({ record, status: 'success', response: responseBody });
                    } else {
                        console.error('Erro ao enviar os dados para a rota:', response.statusText);
                        console.error('Corpo da resposta de erro:', responseBody);
                        report.push({ record, status: 'failed', response: responseBody });
                    }

                    // Armazenar apenas o valor do campo 'id' no reportIds
                    reportIds.push(responseBody.id);

                } catch (err) {
                    // Exibir o erro capturado
                    console.error('Erro ao enviar o registro para a rota:', err);
                    report.push({ record, status: 'error', error: err.message });
                }
            } else {
                console.error('ID de pessoa inválido. O registro será ignorado.');
                report.push({ record, status: 'invalid', error: 'ID de pessoa inválido.' });
            }
        }

        // Salvar o relatório em 'report.json'
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));
        console.log('Relatório salvo em report.json com sucesso.');

        // Salvar os reportIds no arquivo report_id.json
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
