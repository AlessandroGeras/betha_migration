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
    return `${year}-${month}-${day}`;
    //return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "CONTABIL2024"
        const selectDatabaseQuery = 'USE TRIBUTOS2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            with CTE_DECLARACAO AS (
SELECT 
cd_Contribuinte,
cd_Declaracao,
 ROW_NUMBER() OVER (ORDER BY ds_razaosocial) AS idIntegracao,
JSON_QUERY(
    (SELECT
cd_Contribuinte AS idEconomico,
case ds_razaosocial
when        'ALBERTO MARCELO C FACHINI'        then        77020440
when        'JOSE RODRIGUES COTRIM'        then        77020360
when        'GILBERTO FERREIRA GOMES'        then        77020420
when        'DENIVALDO FERNANDES DA SILVA'        then        77020380
when        'D. A. BOTELHO'        then        77518640
when        'MAISA BRETTAS'        then        77020400
when        'ARLINDO FERREIRA GOMES'        then        77020381
when        'MARIA BATISTA DA CRUZ'        then        77020361
when        'SEBASTIAO TEIXEIRA ABRANT'        then        77020401
when        'ANTONIO LOPES PRIMO'        then        77020362
when        'MARIA SIQUEIRA'        then        77020363
when        'CLAUDIR DA ROCHA'        then        77020364
when        'SEBASTIAO TEIXEIRA ABRANT'        then        77020402
when        'A. M. DE ALMEIDA - ME'        then        77518641
when        'JOSE MAURICIO SANTANA'        then        77020383
when        'ELIO INACIO FERREIRA'        then        77020421
when        'VALDECIR ROMANHA'        then        77020365
when        'COSTA E COSTA COMERCIO LTDA-ME'        then        77518642
when        'VANDERLUCIO DA SILVA'        then        77020366
when        'PLINDO ALVES DA SILVA'        then        77020367
when        'OLINDO ALVES DA SILVA'        then        77020368
when        'JOSE KURIYAMA'        then        77020369
when        'JOSE ALVES PESSOA'        then        77020370
when        'LUIZ AMARAL DE BRITO'        then        77020371
when        'ARLINDO FERREIRA GOMES'        then        77020372
when        'ANTONIO NICOLAU SOBRINHO'        then        77020373
when        'ALAIDE SOARES DA SILVA'        then        77020374
when        'SILAS DOS SANTOS'        then        77020375
when        'EXPEDITO MENDES RODRIGUES (CRIANCA)'        then        77020376
when        'FABIANO SOARES DA COSTA'        then        77020377
when        'TEREZINHA RACANELLI VALENTIN'        then        77020378
when        'TEREZA RACANELI DOS SANTOS'        then        77020379
when        'JOSEFINA BENTO RODRIGUES'        then        77020460
when        'ELIO INACIO FERREIRA'        then        77020461
when        'VERONICA VIEIRA DA SILVA'        then        77020462
when        'JOAO RODRIGUES CALDEIRA'        then        77020463
when        'MANOEL FERREIRA GOMES'        then        77020464
when        'PEDRO MARTINS'        then        77020465
when        'CELINO JOSE DE ANDRADE'        then        77020466
when        'ROQUE AUGUSTO DA CONCEICAO'        then        77020467
when        'ANTONIO FRANCISCO DA CRUZ'        then        77020468
when        'PEDRO ALEXANDRE'        then        77020469
when        'JOSE MARCOS DOS SANTOS'        then        77020470
when        'ZEZINHO'        then        77020471
when        'EDIVALDO DOMINGOS DE SOUZA'        then        77020472
when        'VALTERNEI FERNANDES SENA'        then        77020473
when        'ERNESTO AMARAL DE BRITO'        then        77020474
when        'JOAO BELO DE OLIVEIRA'        then        77020475
when        'ILTO MATOS PEREIRA'        then        77020476
when        'REGINALDO GONCALVES DE OLIVEIRA'        then        77020477
when        'ISAQUE VIZZOTTO'        then        77020478
when        'VERA FERREIRA DE OLIVEIRA'        then        77020479
when        'PAULINO MONTIBELLER'        then        77020480
when        'ILOIR SILVEIRA'        then        77020422
when        'CARMEM LUCIA DE OLIVEIRA MONTEIRO'        then        77020423
when        'LINDOLFO BENICIO DA SILVA'        then        77020424
when        'JOSE SEIDE'        then        77020425
when        'PAULO CABRAL'        then        77020426
when        'ENOQUE DIAS DA SILVA'        then        77020427
when        'JOAO VIEIRA'        then        77020428
when        'ALCIDES BORBA'        then        77020429
when        'PAULO CEZAR BEZERRA'        then        77020430
when        'GENIR VIEIRA DA SILVA'        then        77020431
when        'VAGNA DA SILVA SOUZA'        then        77020432
when        'ALMIR LEMES DA SILVA'        then        77020433
when        'CARLOS DA COSTA'        then        77020434
when        'MAURA COSTA CORREIA'        then        77020435
when        'APARECIDO LEAO DE ARAUJO'        then        77020436
when        'IVANETE PEREIRA DOS SANTOS'        then        77020437
when        'JOAO CELESTINO DE FARIAS'        then        77020438
when        'LOURDES DE PAULA'        then        77020439
when        'CEZAR FERREIRA GOMES'        then        77020500
when        'NEUZA MARIA CASAGRANDE'        then        77020501
when        'HILDA GOMES DA SILVA'        then        77020502
when        'ADENIR SOARES DE SOUZA'        then        77020503
when        'GENI VIEIRA DA SILVA'        then        77020504
when        'PREFITURA MUNICIPAL'        then        77020505
when        'PREFEITURA MUNICIPAL'        then        77020506
when        'GENIVAL DA SILVA'        then        77020507
when        'CLOVIS ANTONIO DE OLIVEIRA'        then        77020508
when        'MARIA DA SILVA'        then        77020509
when        'EDELCIR SETTE'        then        77020510
when        'CLEOSOMILTOM GONCALVES DE ANDRADE'        then        77020511
when        'LAUDENIR APARECIDO CAMBRAES'        then        77020512
when        'GUILHERME GULARTE'        then        77020513
when        'ASSEMBLEIA DE DEUS'        then        77020514
when        'MARIA JOSE CAVALCANTE DA SILVA'        then        77020515
when        'JOSE TOMAZ'        then        77020516
when        'EDELSON SETTE'        then        77020517
when        'DEUSDETE RODRIGUES'        then        77020518
when        'CARLOS PATROCINO'        then        77020519
when        'CARLITO RIETZ'        then        77020520
when        'DENIR ANTUNES BOTELHO'        then        77020521
when        'CUSTODIO JOSE DOS SANTOS'        then        77020522
when        'KLESIA LOURANDE RODRIGUES'        then        77020523
when        'ELIZANGELA SOUSA SANTOS'        then        77020524
when        'OSVALDINO FORTUNATO DOS SANTOS'        then        77020525
when        'ELIANE FRANCO DE OLIVEIRA LIMA'        then        77020526
when        'JAIR MOREIRA BARROS'        then        77020527
when        'WILSON JOSE DE LIMA'        then        77020528
when        'JONAIR JOSE LUCAS'        then        77020529
when        'MARLEIDE CAMPOS DOS SANTOS'        then        77020530
when        'MARIA APARECIDA DE AMORIM'        then        77020531
when        'ROQUE SETTE'        then        77020532
when        'CLEUS EDELSON GONCALVES DE ANDRADE'        then        77020533
when        'ELION BARRETO DE ARAUJO'        then        77020534
when        'MARLI CAMPOS DOS SANTOS'        then        77020535
when        'CIRILO DE OLIVEIRA'        then        77020536
when        'SAMUEL VITOR DE CAMARGO'        then        77020537
when        'ANGELO MAURILIO'        then        77020538
when        'LEONIDES DE CARVALHO'        then        77020539
when        'CLEOSDETE G DE ANDRADE '        then        77020540
when        'JOAQUIM ALVES MARTINS'        then        77020541
when        'APARECIDO PERREIRA LOPES'        then        77020542
when        'APARECIDO PEREIRA LOPES'        then        77020543
when        'CHRISTINA STRELOW HAMMER '        then        77020544
when        'RONALDO PEDRO ALEXANDRINO'        then        77020545
when        'LUIZ DA SILVA NOGUEIRA'        then        77020546
when        'LUIZ DA SILVA NOGUEIRA'        then        77020547
when        'ANTONIO FRANCISCO SIMAO'        then        77020548
when        'SOLANGE ALVES CESTARI'        then        77020549
when        'VALMIR LEMES SILVA SANTOS'        then        77020550
when        'BENEDITO SOARES'        then        77020551
when        'VALDIR ALVES CANDIDO'        then        77020552
when        'JOAO ANTONIO DOS SANTOS'        then        77020553
when        'ENES MENDES'        then        77020554
when        'NILSON ANTONIO DA LUZ'        then        77020555
when        'JOAO PIANCO DA SILVA'        then        77020556
when        'CELCINO RODRIGUES DE OLIVEIRA'        then        77020557
when        'REJANE PINTO BARRETO AMARAL'        then        77020558
when        'JEOVA DA SILVA'        then        77020559
when        'JERONIMA DE OLIVEIRA'        then        77020560
when        'ADALBERTO AMARAL DE BRITO'        then        77020561
when        'DIOLINO GONCALVES DA SILVA'        then        77020562
when        'PEDRO JOSE MARIA'        then        77020563
when        'JOAO BISPO NUNES'        then        77020564
when        'CLEUS HUMBERTO GONCALVES DE ANDRADE'        then        77020565
when        'MARIA DE FATIMA GOUVEA'        then        77020566
when        'PAULO CEZAR BEZERRA'        then        77020567
when        'MARINES MAAS'        then        77020568
when        'MARIA PENHA GOMES DA SILVA'        then        77020569
when        'VICENTE FRANCISCO MONTELO'        then        77020570
when        'JOSE APARECIDO DIAS DA SILVA'        then        77020571
when        'FRANCISCO APOLINARIO PEREIRA'        then        77020572
when        'ARI DENIR SOUTO FERNANDES'        then        77020573
when        'MOZAIR BEIJO DE ANDRADE'        then        77020574
when        'MONZAIR BEIJO DE ANDRADE'        then        77020575
when        'JOSE ANANIAS'        then        77020576
when        'MANOEL PEREIRA DA SILVA'        then        77020577
when        'ADELAR IGNACIO DE LIMA'        then        77020578
when        'ANTONIO DE OLIVEIRA'        then        77020579
when        'VERA LUCIA ALVES DE OLIVEIRA'        then        77020580
when        'CLETO APOLINARIO DA CRUZ'        then        77020581
when        'AURINDA ANTUNES DE JESUS'        then        77020403
when        'AURINDA AUTINA DE JESUS'        then        77020404
when        'DIRCEU DE OLIVEIRA'        then        77020405
when        'AGENOR DOS SANTOS BROILO'        then        77020406
when        'JOSE FIGUEIREDO DA SILVA'        then        77020407
when        'ROSILENE RAMOS DE SOUZA ANDRADE'        then        77020408
when        'ANAMIM SALES PEIXOTO'        then        77020409
when        'IZOLINA DOS ANJOS CARVALHO'        then        77020410
when        'CARLOS EDUARDO FERREIRA DOS SANTOS'        then        77020411
when        'ANTONIO CAMPOS DA LUZ'        then        77020412
when        'RICARDO PIO PEREIRA'        then        77020413
when        'APOLINARIO MANOEL DA CRUZ'        then        77020414
when        'ANALINDA SOUSA RAMOS'        then        77020415
when        'ANALINDA SOUZA RAMOS'        then        77020416
when        'ANTONIO ALBRES'        then        77020417
when        'ADELINO DEL NERO'        then        77020418
when        'JOSE NEPONUCENO ALVES'        then        77020419
when        'MARIA DA CONCEICAO ALVES'        then        77020600
when        'FREDERICO ANTONIO AUS VALLALVA'        then        77020601
when        'EDIOMAR JOSE BORTULI'        then        77020602
when        'JOSE CARLOS DIAS PINTO'        then        77020603
when        'JOSE CLAUDIO DIAS PINTO'        then        77020604
when        'ABEL INACIO DE LIMA'        then        77020605
when        'SEVERINO FERREIRA DOS SANTOS'        then        77020606
when        'NELITA MARIA DOS SANTOS'        then        77020607
when        'IVANETE APARECIDA ANDRETTA'        then        77020608
when        'GERALDO ERMINIO BARBOSA'        then        77020609
when        'SERAFIM RODRIGUES DA COSTA ALIENADO A SICOOB CREDIP'        then        77020610
when        'JOSE LOPES SOBRINHO'        then        77020611
when        'PAULO CARDOSO DA SILVA'        then        77020612
when        'JOAO LEOPOLDO MORAIS'        then        77020613
when        'ANTONIO BERNARDINO DE OLIVEIRA'        then        77020614
when        'JURANDIR RODRIGUES DE MORAES'        then        77020615
when        'JURANDIR RODRIGUES DE MORAES'        then        77020616
when        'JURANDIR RODRIGUES DE MORAIS'        then        77020617
when        'TEREZINHA LOPES DE SOUZA'        then        77020618
when        'LUIZ PEREIRA SOBRINHO'        then        77020619
when        'ANTONIO PEDRO BEZERRA'        then        77020620
when        'OSWALDO DIAS PINTO'        then        77020621
when        'MARIA MACAMBANI'        then        77020622
when        'JOAO TEIXEIRA DOS SANTOS'        then        77020623
when        'LAURINDO ANDRETTA'        then        77020624
when        'ANSELMO BRESSAN ROTHERMEL'        then        77020625
when        'RAIMUNDO VALENTIM DO PRADO'        then        77020626
when        'MARIA DO CARMO RODRIGUES DE CARVALHO SANTOS'        then        77020627
when        'LUIZ RIBEIRO DE SOUZA'        then        77020628
when        'CONGREGACAO CRISTA NO BRASIL'        then        77020629
when        'CAERD'        then        77020630
when        'ILSON SONDA'        then        77020631
when        'FRANCISBERTO AMARAL DE BRITO'        then        77020632
when        'ROSINEIDE LEITE DA ROCHA SANTOS'        then        77020441
when        'JERCI MAZZUCO'        then        77020442
when        'VALDEIR CLAUDINO GONCALVES'        then        77020443
when        'JOAO MARTINS SILVA'        then        77020444
when        'ROSANA GORETE RACANELI'        then        77020445
when        'LUIZ ANTONIO AGUIAR'        then        77020446
when        'ALAOR DAMACENA'        then        77020447
when        'JOSE ANTONIO'        then        77020448
when        'ALAERCIO RODRIGUES DAMACENA'        then        77020449
when        'MARIA DAMACENO'        then        77020450
when        'GENIR VIEIRA DA SILVA'        then        77020451
when        'ROSANGELO RODRIGUES GONCALVES'        then        77020452
when        'IGREJA ADVENTISTA DO SETIMO DIA'        then        77020453
when        'FLORENTINO GOMES DA SILVA'        then        77020454
when        'EULALIA CANDINHO DE LIMA BLASI'        then        77020455
when        'JUAREZ ROBERTO DE ANDRADE'        then        77020456
when        'IVANETE RIBEIRO DOS SANTOS'        then        77020457
when        'ADRIANA SCHULTZ DE ABREU'        then        77020458
when        'ALONCIO FERREIRA CHAVES'        then        77020459
when        'HUMBERTO BARRETO PINTO'        then        77020640
when        'IGREJA CATOLICA'        then        77020641
when        'BRASIL TELECOM S.A.'        then        77020642
when        'AREA DA CONSTRUCAO DA PREFEITURA'        then        77020643
when        'ANTONIO FERREIRA SOARES'        then        77020644
when        'RONALDO ADRIANO ALEXANDRINO'        then        77020645
when        'GIULIANO TEIXEIRA PACHER'        then        77020646
when        'IRENE AUGUSTA  CANDIDO'        then        77020647
when        'CLEITON GONCALVES DE ANDRADE'        then        77020648
when        'COMPARECER SETOR CADASTRO PREFEITURA URG'        then        77020649
when        'HOSPITAL E FUNDACAO'        then        77020650
when        'ESCOLA ESTADUAL BENEDITO L.GONCALVES'        then        77020651
when        'MARIA BENEDITO BRITO'        then        77020652
when        'MAISA SANTANA BRETAS'        then        77020653
when        'OLMIRO THOMAZ MARTINZ'        then        77020654
when        'OLMIRO THOMAZ MARTINS'        then        77020655
when        'JOAO LEOPOLDO DE MORAES'        then        77020656
when        'JOAO LEOPOLDO DE MORAES'        then        77020657
when        'OTAMIR DANIEL DE ARRUDA'        then        77020658
when        'DELCIO JOAQUIM DE LIMA'        then        77020659
when        'ADELCIO AMARAL DE BRITO'        then        77020660
when        'CLEUSOMILTO GONCALVES DE ANDRADE'        then        77020661
when        'WANTUIR DE CAMARGOS'        then        77020662
when        'FABIO RODRIGUES DOS SANTOS'        then        77020663
when        'LAUDENIR APARECIDO CAMBRAES'        then        77020664
when        'ALBINO DA SILVA RIBEIRO'        then        77020665
when        'VALDECIR DEL NERO'        then        77020666
when        'JOAO JOSE DE ANDRADE'        then        77020667
when        'NELSON ANTONIO PEJARA'        then        77020668
when        'ANTONIO LUIZ CARVALHO'        then        77020669
when        'MATUSALEM PEREIRA TORRES '        then        77020670
when        'PASCOAL AFONSO'        then        77020384
when        'LAURENTINO JOSE DE SAO PAULO'        then        77020385
when        'LEURENTINO JOSE DE SAO PAULO'        then        77020386
when        'JOAO JACINTO MARTINS'        then        77020387
when        'EUGENIO PEREIRA DE MOURA'        then        77020388
when        'EULALIA CANDINHO DE LIMA BLESSI'        then        77020389
when        'JACI ZUCHE VAZ DE LIMA'        then        77020390
when        'VERA LUCIA NEPOMUCENO DE JESUS DA LUZ'        then        77020391
when        'NILSON BUENO PEREIRA'        then        77020392
when        'EDOIRDES APARECIDA MENDES'        then        77020393
when        'NAIR RITAL'        then        77020394
when        'JAIR MENDES'        then        77020395
when        'VALDEMIR ROGERIO MENDES'        then        77020396
when        'ADEMIR BLEIM DA SILVA'        then        77020397
when        'AIRTON LUIZ DA SILVA'        then        77020398
when        'GILMAR PRUDENCIO DA COSTA'        then        77020399
when        'SEBASTIAO ALVES DOS SANTOS'        then        77020680
when        'NIVALDO LOPES SANTOS'        then        77020681
when        'IGREJA BATISTA ESTADO DE RONDONIA'        then        77020682
when        'ERNESTINO INACIO DE OLIVEIRA'        then        77020683
when        'GILVAN JOSE  COSTA '        then        77020684
when        'CLAUDINEI BRITO DE VILAS BOA'        then        77020685
when        'ISMAEL BRITO VILAS BOA'        then        77020686
when        'OLIVEIRA ALVES DA SILVA '        then        77020687
when        'SIDINEI DOS ANJOS CARVALHO'        then        77020688
when        'MOISES BASTOS PEREIRA'        then        77020689
when        'MIRIAM DUARTE'        then        77020690
when        'CARLOS BREM DA SILVA'        then        77020691
when        'JOSE GERALDO DA COSTA'        then        77020692
when        'GERALDO JOSE DA COSTA'        then        77020693
when        'AIRTON LUIS DA SILVA'        then        77020694
when        'APARECIDO DO CARMO LANGE'        then        77020695
when        'ELIAS MALOVINI'        then        77020696
when        'ALMIR FERREIRA DA CRUZ'        then        77020697
when        'PEDRO DE OLIVEIRA'        then        77020698
when        'IZAIAS DOS SANTOS ALBRES'        then        77020699
when        'IZABEL DOS SANTOS DE ALBRES'        then        77020700
when        'CLEOSMAR GONCALVES DE ANDRADE'        then        77020701
when        'JOSE DA SILVA PEDROZO'        then        77020702
when        'MARCONDES DE CARVALHO'        then        77020703
when        'ANTENOR DA COSTA BRANDAO'        then        77020704
when        'MARIANA DA COSTA BRANDAO'        then        77020705
when        'GENIVALDO VIEIRA DOS SANTOS ALIENADO A SICOOB CED 2662986'        then        77020706
when        'JOSE MAURO PRATES'        then        77020707
when        'CLEINE GONCALVES DE ANDRADE'        then        77020708
when        'CLEIDECHELE AZEVEDO'        then        77020709
when        'CASA DO IDOSO'        then        77020710
when        'MARIA DE OLIVEIRA ALVES'        then        77020711
when        'JOAO ANTONIO GUEDES'        then        77020712
when        'ADEMAR RIBEIRO ALVES'        then        77020713
when        'GILMAR CEZARIO DE SOUZA'        then        77020671
when        'VANDERLEY CESARIO DE SOUZA'        then        77020672
when        'ELY CESARIO DE SOUZA'        then        77020673
when        'NOE FIALHO DE LIMA'        then        77020674
when        'JOAO MARTINS SILVA'        then        77020675
when        'MARGARETE PEREIRA MARTINEZ'        then        77020676
when        'ALCINDE DE CARVALHO'        then        77020677
when        'ANTONIO CARLOS BORGES'        then        77020678
when        'JOAO BATISTA'        then        77020679
when        'JOSE FIRMINO DA CUNHA'        then        77020720
when        'JOSE AUGUSTO DEOFIM'        then        77020721
when        'MARILENE FERREIRA GOMES'        then        77020722
when        'JOSE LOURENCO COSTA'        then        77020723
when        'JOSE BATISTA RODRIGUES'        then        77020724
when        'NEUSA XAVIER DO NASCIMENTO'        then        77020725
when        'DONIZETE MACHADO'        then        77020726
when        'GERONIMA MARIA DE OLIVEIRA'        then        77020727
when        'JOSE LUIZ DA SILVA'        then        77020728
when        'ISDAEL JOSE VIEIRA'        then        77020729
when        'JOSE RAPOSO ABELHA'        then        77020730
when        'OSMAR DUPINHAKE'        then        77020731
when        'ADEMAR RIBEIRO ALVES'        then        77020732
when        'JOÃO MAZINHO LISBOA DE SOUZA'        then        77020733
when        'NOEL RODRIGUES DE MORAIS'        then        77020734
when        'ALBERTO SIQUEIRA GOMES'        then        77020735
when        'DIVANI LOPES DE SOUZA'        then        77020736
when        'FRANCISCO AURELIO SIMAO'        then        77020737
when        'GILDA MATOS PEREIRA'        then        77020738
when        'VANI ALVES SILVA'        then        77020739
when        'PERCILIA MACHADO'        then        77020740
when        'MIRTES APARECIDA DE OLIVEIRA'        then        77020741
when        'MARIA SENHORINHA GUEDES'        then        77020742
when        'ADAO BOM DESPACHO'        then        77020743
when        'MOACIR LOPES DE FARIAS'        then        77020744
when        'FAUSTINO ELEOTERIO DA SILVA'        then        77020745
when        'MORILO GONCALVES MACHADO'        then        77020746
when        'DIONIZIO DA ROSSI CORSINI'        then        77020747
when        'JOSE RODRIGUES DA SILVA'        then        77020748
when        'GILMAR MUCHINSKI'        then        77020749
when        'ROSELI MARIA DE OLIVEIRA'        then        77020750
when        'REGULARIZAR SEU CADASTRO NA PREFEITURA'        then        77020751
when        'CLEIDE CHELES AZEVEDO'        then        77020752
when        'MAX DANIEL DE CARVALHO'        then        77020753
when        'ODEVANIR LIMA DE SOUZA'        then        77020754
when        'MARIA DO CARMO ALVES'        then        77020755
when        'JOSE RODRIGUES DE OLIVEIRA'        then        77020756
when        'FRANCISCO ROTEHMEL'        then        77020757
when        'LADO DO LAUDENIR'        then        77020758
when        'JUAREZ ROBERTO DE ANDRADE'        then        77020759
when        'VALDECIR GUILHERMES MLAK'        then        77020760
when        'ALVINO CESIDIO DE OLIVEIRA'        then        77020633
when        'MARCELO LOURENCO FERREIRA'        then        77020634
when        'MARCILEY DE CARVALHO'        then        77020635
when        'FERNANDO DA SILVA MACHADO'        then        77020636
when        'MARLY LUCIA DO CARMO '        then        77020637
when        'ALVIT ROSA'        then        77020638
when        'IGREJA PRESBITERIANA RENOVADA'        then        77020639
when        'MARIA CREUZA SILVA BARBOSA'        then        77020780
when        'MARLON DA SILVA BERTAN'        then        77020781
when        'MARIA DOS ANJOS PEREIRA DE AGUIAR'        then        77020782
when        'JULIO CORNELIO DE LIMA'        then        77020783
when        'VERSONI ALCANTARA LOPES'        then        77020784
when        'DIVINO BEIJO FERREIRA'        then        77020785
when        'AGUIMAR BEIJO FERREIRA'        then        77020786
when        'NILCIMAR BEIJO FERREIRA'        then        77020787
when        'PAULO RIBEIRO DOS SANTOS'        then        77020788
when        'GILCIMAR BEIJO FERREIRA'        then        77020789
when        'SEBASTIAO VIEIRA DA COSTA'        then        77020790
when        'IGREJA PRESBITERIANA CASA DO PASTOR'        then        77020791
when        'FIDELCINO MANOEL MARIANO'        then        77020792
when        'MARIA ORCELINA COELHO FERNANDES'        then        77020793
when        'JEAM CARLOS MIRANDA DA SILVA'        then        77020794
when        'PETRINA CUSTODIA FACHINI'        then        77020795
when        'IVAN PAULA DA SILVA'        then        77020796
when        'JOSE MARCELO DA SILVA'        then        77020797
when        'APOLINARIO DA CRUZ'        then        77020798
when        'QUADRA DE AREIA'        then        77020799
when        'VALDETE APARECIDA RAFAEL BUENO'        then        77020800
when        'ANTONIO ALVES DE LIMA'        then        77020801
when        'OSVALDO RODRIGUES COUTRIM'        then        77020802
when        'JOSE RODRIGGUES COUTRIM'        then        77020803
when        'JOSE RODRIGUES COUTRIM'        then        77020804
when        'ANTONIO MANOEL VINHAL'        then        77020805
when        'LURDES MLAK'        then        77020806
when        'MARIA DUARTE DA COSTA'        then        77020807
when        'CARLOS PEREIRA DE MOURA'        then        77020808
when        'GERALDA MARIA MENDES RODRIGUES'        then        77020809
when        'ANA ROSA CLELES AZEVEDO'        then        77020810
when        'ANA ROSA CHELES AZEVEDO'        then        77020811
when        'ALBERTO MARCELO C. FACHINI'        then        77020812
when        'HIARA DE BRITO TEIXEIRA'        then        77020813
when        'MARIA ELIANE FERRARI'        then        77020814
when        'CLODOALDO JULIO DA FONCECA'        then        77020815
when        'JOSE CORREIA NETO'        then        77020816
when        'CLEBER BRESSANI DOS SANTOS'        then        77020817
when        'CALOS FACHINI'        then        77020818
when        'CARLOS EDUARDO C. F. ALIENADO SICOOB CED. 2784121'        then        77020819
when        'JOAO GOMES FERREIRA'        then        77020820
when        'SILVERO REGULARIZAR SEU CADASTRO'        then        77020821
when        'CONCELHO TUTELAR DE PARECIS'        then        77020822
when        'MARIA SOARES DA ROCHA'        then        77020714
when        'LOURIVAL APARECIDO DE MORAES'        then        77020715
when        'ORLANDO SIEBE'        then        77020716
when        'MARLI DA CUNHA OLIVEIRA'        then        77020717
when        'SUZILENE DO NASCIMENTO'        then        77020718
when        'DEVAIR SILVEIRA ANTUNES'        then        77020719
when        'MARCELO LOURENCO FERREIRA'        then        77020860
when        'AILTON GONCALVES MACHADO'        then        77020861
when        'ROBERTO JORGE DE MELO'        then        77020862
when        'PERCILIA MACHADO'        then        77020863
when        'APARECIDO PRATES'        then        77020864
when        'CARLOS ALVES DO NASCIMENTO'        then        77020865
when        'VALMIR MACHADO'        then        77020866
when        'FIDELCINO MANOEL MARIANO'        then        77020867
when        'DOMINGO DOS SANTOS'        then        77020868
when        'CLAUDINEI BRITO VILA BOAS'        then        77020869
when        'SEBASTIAO BATISTA DA CRUZ'        then        77020870
when        'SERAFIM RODRIGUES DA COSTA'        then        77020871
when        'CLAUDIO JOSE PEREIRA'        then        77020872
when        'PEDRO SOUZA SILVA'        then        77020873
when        'VALDECIR ANDRETTA'        then        77020874
when        'MARIA LUCIA GONCALVES'        then        77020875
when        'DARCI SIQUEIRA DE SOUZA'        then        77020876
when        'VALDECIR CILAS DO NASCIMENTO'        then        77020877
when        'ALCIRO GONCALVES MACHADO'        then        77020878
when        'MARIA SOARES DA ROCHA'        then        77020879
when        'IDENECIR GON€ALVES MACHADO'        then        77020880
when        'LIDUVINA MARIA DE JESUS'        then        77020881
when        'DIONIZIO TESCH'        then        77020882
when        'LAERCIO JULIO DA FONCECA'        then        77020883
when        'REGULRIZAR SEU CADASTRO PREFEITURA='        then        77020884
when        'ELIAS ANTONIO GUEDES'        then        77020885
when        'MADALENA SENHORINHA GUEDES'        then        77020886
when        'JOSE ANTONIO BATISTA DA CRUZ'        then        77020887
when        'DEUSENIR PIRES DOS SANTOS OLIVEIRA'        then        77020888
when        'MARIA JOSE DA COSTA'        then        77020889
when        'SALATIEL VITOR DE CAMARGO'        then        77020890
when        'JOSE LOPES SOBRINHO'        then        77020891
when        'ROQUE ALGUSTO DA CONCEICAO'        then        77020892
when        'TEODORO DE OLIVEIRA FRANQUE'        then        77020893
when        'MADALENA SENHORINHA GUEDES'        then        77020894
when        'ARISTEU DOMINGOS DE CARVALHO'        then        77020895
when        'MARIA APARECIDA DE LIMA LUSQUINHO'        then        77020896
when        'ANDERSON FAUSTINO'        then        77020897
when        'MARCELO DE OLIVEIRA SALA'        then        77020898
when        'GERCIANO GULARTE'        then        77020899
when        'GERCIANO GULARTE'        then        77020900
when        'ALAIDES MARIA DE PINHO'        then        77020901
when        'JAIR JOSE DE ANDRADE'        then        77020902
when        'JOSE ADRIANO CARDOSO FIGUEIREDO'        then        77020903
when        'MANOEL NICOLAU DE SOUZA NETO'        then        77020761
when        'JOSE MARIA'        then        77020762
when        'DIEGO DE SOUZA ANDRADE '        then        77020763
when        'DESIVALDO FORTUNATO DOS SANTOS'        then        77020764
when        'VALDEMAR CRU DE LIMA'        then        77020765
when        'JUARES PAULO LOUBACK'        then        77020766
when        'VALMIR MARIA DE OLIVEIRA'        then        77020767
when        'ORLANDO RAMOS MARTINS'        then        77020768
when        'ELIZABETE PIRES GUEDES OLIVEIRA'        then        77020769
when        'ADÃO ANTONIO DE SOUZA'        then        77020770
when        'GERMANO TERCH'        then        77020771
when        'EDIVALTO FRANCISCO DE AMORIM'        then        77020772
when        'VALDOMIRO SOARES ROCHA'        then        77020773
when        'APARECIDA LEMES'        then        77020774
when        'CLAUDECI PEREIRA DE AGUIAR'        then        77020775
when        'TENECIR LISBOA DE SOUZA'        then        77020776
when        'ADAO LISBOA DE SOUZA'        then        77020777
when        'TATIANE ALVES DE LIMA'        then        77020778
when        'JOSE CORREIA'        then        77020779
when        'EDNO DUARTE GOMES'        then        77020920
when        'GERALDO MARTINS DE SOUZA'        then        77020921
when        'ADEMAR DA SILVA'        then        77020922
when        'TEREZINHA JANDIRA ANDRETA DE ALMEIDA'        then        77020923
when        'AIDALVO OLIVEIRA DA SILVA'        then        77020924
when        'EXPRESSO NACIONAL'        then        77020925
when        'PAULO CESAR BEZERRA'        then        77020926
when        'DELLY CORDEIRO'        then        77020927
when        'VANTUIL RODRIGUES DE MORAIS'        then        77020928
when        'ELIANA APARECIDA DE OLIVEIRA'        then        77020929
when        'IRINILDO JOSE GONCALVES'        then        77020930
when        'DAUSMAR FERREIRA SAQUIRABIAR'        then        77020931
when        'CAMPOLINO FRANCISCO DA ROCHA'        then        77020932
when        'ANTONIO CARLOS'        then        77020933
when        'ANTONIO CARLOS'        then        77020934
when        'EDIZIO SANTOS ALVES'        then        77020935
when        'JOSE CORREIA NETO'        then        77020936
when        'JOSE ROBERTO ALVES DE LIMA'        then        77020937
when        'MARIA FRANCISCA DA SILVA'        then        77020938
when        'JOSE TEIXEIRA ARAUJO'        then        77020939
when        'LUIZ FOGACA'        then        77020940
when        'OLICIO DE OLIVEIRA'        then        77020941
when        'FRANCISCO CORNELIO ALVES DE LIMA'        then        77020942
when        'LUIZ CARLOS DE OLIVEIRA'        then        77020943
when        'VALDECI ALVES DA SILVA'        then        77020944
when        'JOAQUIM PEDRO PEREIRA'        then        77020945
when        'JOSE LAFAIETE PEREIRA'        then        77020946
when        'JOAILTO SOUZA DE OLIVEIRA'        then        77020947
when        'GENIVAL DA SILVA'        then        77020948
when        'ROSENILDA SILVA GOMES'        then        77020949
when        'ANTONIO DA SILVA'        then        77020950
when        'VITORINO RODRIGUES DE MORAIS'        then        77020481
when        'FRANCISCO SIMON'        then        77020482
when        'FRANCISCO SIMAO DE LIMA'        then        77020483
when        'JADIR DE SOUZA MOTA'        then        77020484
when        'ANA LUCIA FRANCISCO DE AMORIM'        then        77020485
when        'VAMDERLEY FRANCISCO DE AMORIM'        then        77020486
when        'VANDERLEY FRANCISCO DE AMORIM'        then        77020487
when        'ERDERLEI FRANCISCO AMORIM'        then        77020488
when        'BALBINO FRANCISCO DE AMORIM'        then        77020489
when        'JOSE CARLOS FRANCISCO DE AMORIM'        then        77020490
when        'MARIO PEREIRA COSTA'        then        77020491
when        'LUIZ MARCOS DOS SANTOS'        then        77020492
when        'ZENAIR MARIA SCALZER LUCAS'        then        77020493
when        'JOSIEL CANDIDO'        then        77020494
when        'JOSE ANDARILLIO RAFAEL'        then        77020495
when        'ADENIL DE SOUZA'        then        77020496
when        'JOSE ALTINO AFONSO'        then        77020497
when        'VALDECIR ALVES DA SILVA'        then        77020498
when        'SEBASTIAO PEDRO ALEXANDRINO'        then        77020499
when        'PEDRO DE JESUS'        then        77020980
when        'MARIA DE JESUS'        then        77020981
when        'CENTRO COMUNITARIO'        then        77020982
when        'FRANCISCO JOSE DOS SANTOS'        then        77020983
when        'ANTONIO FRANCISCO SIMAO'        then        77020984
when        'ETELVINA MARIA DE JESUS SOUZA'        then        77020985
when        'ANTONIO JOSE DE ANDRADE'        then        77020986
when        'INACIO DE SOUZA LINO'        then        77020987
when        'ORTENCIO PEREIRA DOS SANTOS'        then        77020988
when        'VALDENIR FERREIRA DA SILVA'        then        77020989
when        'AMELIA SCHILICKMANN'        then        77020990
when        'MARIO SOARES'        then        77020991
when        'ADILSON AHNERT CAITANO'        then        77020992
when        'DILCEU DA LUZ CARVALHO'        then        77020993
when        'JAIR BULION'        then        77020994
when        'JOAO FRANCISCO DE OLIVEIRA'        then        77020995
when        'MANOEL CLEMENTINO GOMES'        then        77020996
when        'REGINALDO GIL DA SILVA'        then        77020997
when        'JOSE HENRIQUE DE ABREU'        then        77020998
when        'VALDIR FERREIRA DE SOUZA'        then        77020999
when        'CARLINHOS DA COSTA'        then        77021000
when        'LORECI ANDRETTA'        then        77021001
when        'JOAO PEREIRA DE LIMA'        then        77021002
when        'PAULO SCHLICKMANN'        then        77021003
when        'MADEIRA 3D LTDA-ME'        then        77021004
when        'TEREZINHA CEVOLANE ALTOE'        then        77021005
when        'NAIR RITHICE'        then        77021006
when        'SEBASTIAO ANTUNES'        then        77021007
when        'JOSE GOMES BRITO'        then        77021008
when        'JOAO BORBA DE ALMEIDA'        then        77021009
when        'JOAO BORBA DE ALMEIDA'        then        77021010
when        'JOAO BORBA REGULARIZAR'        then        77020823
when        'VALCIMAR LUIZ DE BRITO'        then        77020824
when        'VALCIMAR LUIZ BECALLI'        then        77020825
when        'ADAO GONCALVES CORDEIRO'        then        77020826
when        'ORLANDO FERREIRA BARBOSA'        then        77020827
when        'ANITA BRUNA TESCH'        then        77020828
when        'ITAECIO ALVES GOMES'        then        77020829
when        'RENOIR GONCALVES'        then        77020830
when        'RUBRNS TOSTA DE SOUZA'        then        77020831
when        'RUBENS TOSTA DE SOUZA'        then        77020832
when        'ORLANDO SIEBRE'        then        77020833
when        'REGULARIZAR URG. CADASTRO PREFEITURA'        then        77020834
when        'LAUDELINO ELIOTERIO TAVARES'        then        77020835
when        'DEVALDO RODRIGUES DOS SANTOS'        then        77020836
when        'ANTONIO ANACLETO ROSA'        then        77020837
when        'JOSE RAPOSO ABELHA'        then        77020838
when        'SILVERO SANPAIO COSTA'        then        77020839
when        'SILVERO SAMPAIO COSTA'        then        77021020
when        'EVA GOMES DE SIQUEIRA SILVA'        then        77021021
when        'RINALDO DA SILVA'        then        77021022
when        'REGULARIZAR SEU CADASTRO PREF.'        then        77021023
when        'IVONE DE PAULA NASCIMENTO ULHIOA'        then        77021024
when        'SOLANGE APARECIDA DEL NERO'        then        77021025
when        'MANOEL ALVES DE AGUIAR'        then        77021026
when        'OSVALDINO SABINO'        then        77021027
when        'OSVALDO SABINO'        then        77021028
when        'REGINALDO PEDRO DA SILVA'        then        77021029
when        'BOLIVAR ANTUNES FARRAPO'        then        77021030
when        'LUIZ ALVES'        then        77021031
when        'MARIA DAS DORES DA ROCHA'        then        77021032
when        'CELSON CANDIDO DA ROCHA'        then        77021033
when        'GEORGETE ARAGAO RIOS'        then        77021034
when        'AMERICO CEZARIO MENDONCA'        then        77021035
when        'DOUGLAS DA ROSA MACHADO'        then        77021036
when        'MARIA DE FATIMA PEREIRA'        then        77021037
when        '0000000000000000000000000000000000000000'        then        77021038
when        'TATIANE ALVES DE LIMA'        then        77021039
when        'LIBANO'        then        77021040
when        'CLEONICE FERREIRA DE LIMA'        then        77021041
when        'CLEONICE FEREIRA DE LIMA'        then        77021042
when        'GEAM CARLOS MIRANDA DA SILVA'        then        77021043
when        'SUSANA CANDIDA DA ROCHA'        then        77021044
when        'ROSIMAR AGUIAR DA SILVA'        then        77021045
when        'MARCIO ELIZIO DE CARVALHO'        then        77021046
when        'DILEA VITOR DE CAMARGO'        then        77021047
when        'IZABEL DOS SANTOS ALBRES'        then        77021048
when        'REG'        then        77021049
when        'CLAUDINO BISPO DOS SANTOS'        then        77021050
when        'DENILSON MIRANDA BARBOZA'        then        77021051
when        'RILDO DA SILVA'        then        77021052
when        'IVANI ABRANTES'        then        77021053
when        'VALDINEY SANTOS DA ROSA'        then        77021054
when        'MARCOS INACIO DE OLIVEIRA'        then        77021055
when        'ENEDINA ALICE DOS SANTOS'        then        77021056
when        'MARCELO BOTELHO ANDRADE'        then        77021057
when        'LUIZ MARQUES DOS SANTOS'        then        77021058
when        'IRACI MARIA MARIANO DE MATOS'        then        77021059
when        'MARIA MUNIZ DE OLIVEIRA'        then        77021060
when        'JOSUE LOPES PEREIRA'        then        77021061
when        'IGREJA'        then        77021062
when        'JUCELIA AMARAL DE BRITO'        then        77021063
when        'IRANI DE SOUZA'        then        77021064
when        'JOSSE FERREIRA DOS SANTOS'        then        77021065
when        'HELENA APARECIDA JACOMINE DA SILVA'        then        77021066
when        'EDUARDO OLIVEIRA PINTO'        then        77021067
when        'APARECIDA BATISTA DO CARMO COIMBRA'        then        77021068
when        'LOIDE RODRIGUES DE OLIVEIRA ALVES'        then        77021069
when        'LUIZ CARLOS TEIXEIRA BARBOSA DE ALENCAR'        then        77021070
when        'JOAO LUIZ DO CARMO'        then        77021071
when        'MARIA VITOR ALVES'        then        77021072
when        'JORGE SURUI'        then        77021073
when        'ANA PEREIRA APOLINARIO'        then        77021074
when        'APARECIDO DOS SANTOS'        then        77021075
when        'DARCI DE ALMEIDA'        then        77021076
when        'ADILIO MARTINS DA SILVA'        then        77021077
when        'MILITINO MACHADO MEIRELES'        then        77021078
when        'EXPEDITO MENDES RODRIGUES (CRIANCA)'        then        77021079
when        'ODIR GOMES'        then        77021080
when        'GILMAR ANTONIO PEREIRA'        then        77021081
when        'NELSON MLAK'        then        77021082
when        'PAULO BENEDITO DOS SANTOS'        then        77021083
when        'LUCIA BLASI'        then        77021084
when        'MARINES DA SILVA PEREIRA'        then        77021085
when        'SANTOLINA CARDOSO RIBEIRO'        then        77021086
when        'ADAUTO RAIMUNDO DE OLIVEIRA'        then        77021087
when        'MARIA ANTONIA DE SOUZA'        then        77021088
when        'GERALDO SOARES DE SOUZA'        then        77021089
when        'REGINALDO DUARTE PRATES'        then        77021090
when        'LUIZ CARLOS BEZERRA'        then        77021091
when        'WANDERSON FARIA VIANA'        then        77021092
when        'ALTAIR ALVES LIMA'        then        77021093
when        'MISAEL GONCALVES DA SILVA'        then        77021094
when        'ROBERTO PEDRO ALEXANDRINO'        then        77021095
when        'DONIZETH FERREIRA DE OLIVEIRA'        then        77021096
when        'MIRIAN QUIRINO DA SILVA'        then        77021097
when        'ANTONIA MARIA DA SILVA'        then        77021098
when        'JOSMIR SOARES DE AGUIAR'        then        77021099
when        'ROMILDO RODRIGUES ARAUJO'        then        77021100
when        'JOAO BATISTA LAUREANO'        then        77021101
when        'DORENICE PEREIRA COSTA'        then        77021102
when        'ROGERIO DA SILVA BARBOSA'        then        77020904
when        'NIVANILDA DE SOUZA'        then        77020905
when        'IGREJA ASSEMBLEIA DE DEUS MIN. MADUREIRA'        then        77020906
when        'RITA DE CASSIA DOS SANTOS'        then        77020907
when        'WESLEY FABIO LAUTERTE'        then        77020908
when        'SEBASTIAO DE SOUZA BENEVIDES'        then        77020909
when        'SALVADOR RODRIGUES DE CARVALHO'        then        77020910
when        'JOSE BATISTA'        then        77020911
when        'JOAO HENRIQUE DE ABREU'        then        77020912
when        'IRACI MACIEL'        then        77020913
when        'MARIA BARROS GOMES'        then        77020914
when        'MARCOS ANTONIO RODRIGUES DA CRUZ'        then        77020915
when        'MARIA APARECIDA DA SILVA OLIVEIRA'        then        77020916
when        'VALMIR GONÇALVES MACHADO'        then        77020917
when        'MADEREIRA MADEK LTDA ME'        then        77020918
when        'SINDICATO DOS TRABALHADORES RURAIS DE PARECIS'        then        77020919
when        'ALCIDES ABELARDO SIEBE'        then        77021120
when        'PEDRO BLEM DA SILVA'        then        77021121
when        'JOAO NUNES INERIO'        then        77021122
when        'LILIAN RODRIGUES ANTUNES'        then        77021123
when        'ADILSON JORGE MOREIRA'        then        77021124
when        'PEDRO FERREIRA DE SOUZA'        then        77021125
when        'CARLOS ROBERTO SERAFIM SOUZA'        then        77021126
when        'MARIO LUIZ CARDOSO'        then        77021127
when        'GEISON GUEDES DE OLIVEIRA'        then        77021128
when        'ELENA ILINIR LORINI BORELLA'        then        77021129
when        'MARCILEY DE CARVALHO ALIENADO A SICOOB CREDIP CED.151327/DT'        then        77021130
when        'MARCELO FIGUEIREDO MOTA'        then        77021131
when        'CLEIDE CHALES AZEVEDO'        then        77021132
when        'MARIA DE FATIMA PEREIRA DA SILVA SANTOS'        then        77021133
when        'Maria de Fátima Pereira da Silva Santos'        then        77021134
when        'NADIR AOIAGUI'        then        77021135
when        'MADEIREIRA ANDRES LTDA ME ALIENADO A SICOOB CEDULA Nº464567 '        then        77021136
when        'CARLA CRISTINA ANDRES'        then        77021137
when        'JOSEFA OLIVEIRA DA SILVA ANTUNES'        then        77021138
when        'JAIRO FLORENTINO PEREIRA'        then        77021139
when        'ANTONIO LEMOS MARTINS'        then        77021140
when        'Secretaria Municipal de Educação e Cultura'        then        77021141
when        'KLEBSON MOURA RODRIGUES'        then        77021142
when        'KLEBSON MOURA RODRIGUES'        then        77021143
when        'LUZILENE FORNACIARI'        then        77021144
when        'LUZILENE FORNACIARI'        then        77021145
when        'JOAQUIM SOARES DA COSTA'        then        77021146
when        'JORGE MONTEIRO GOMES'        then        77021147
when        'JORGE MONTEIRO GOMES'        then        77021148
when        'THELMO WAGNER CUSTODIO FACHINI'        then        77021149
when        'REJANE PINTO BARRETO AMARAL'        then        77021150
when        'DANIELA BORBA DA CUNHA'        then        77021151
when        'VALDECIR LIMA DE MORAES'        then        77021152
when        'VALDECIR L MORAES ALIENADO SICOOB CREDIP CED 2353835'        then        77021103
when        'DUCILENI MARGOTTO DE OLIVEIRA TRASPADINI'        then        77021104
when        'JOSE VALDECIR PRESTES'        then        77021105
when        'GILMAR NASCIMENTO ROSA'        then        77021106
when        'ANTONIO CARLOS GOMES'        then        77021107
when        'MANOEL GONÇALVES DA SILVA'        then        77021108
when        'ERIK BAETZ MARQUES'        then        77021109
when        'SEBASTIÃO SANTANA DE SA'        then        77021110
when        'SEBASTIÃO SANTANA DE SA'        then        77021111
when        'ZIGRID OHNESORGE CAZELLI'        then        77021112
when        'ANDREIA DOS SANTOS ALBRES'        then        77021113
when        'CLAUDIR ALVES'        then        77021114
when        'MARLEIDE CAMPOS DOS SANTOS'        then        77021115
when        'JOSE MAURO PRATES'        then        77021116
when        'MARCELO MARTINS DA SILVA'        then        77021117
when        'SUELI DE LUCA SIQUEIRA'        then        77021118
when        'DULCILENE MARGOTTO DE OLIVEIRA TRASPADINI'        then        77021119
when        'NERY PIAZZA ALIENADO A SICOOB CREDIP CEDULA Nº 2563304'        then        77021160
when        'FIDELCINO MANOEL MARIANO'        then        77021161
when        'EULALIA CANDINHO DE L B ALIENADO A SICCOB CREDIP CED62858-0'        then        77021162
when        'LOIDE RODRIGUES DE OLIVEIRA ALVES'        then        77021163
when        'FERNANDA DO CARMO SILVA E SARA LÚCIA DO CARMO SILVA'        then        77021164
when        'OTAMIR DANIEL DE ARRUDA'        then        77021165
when        'IVAN DE PAULA'        then        77021166
when        'TOMAS EDSON SETTE'        then        77021167
when        'DIVA RODRIGUES PEREIRA FERREIRA'        then        77021168
when        'ANA MARIA DOS SANTOS SILVA'        then        77021169
when        'EDUARDO OLIVEIRA PINTO'        then        77021170
when        'Taiany de Oliveira Bescorovaine E Daiany de Oli. Bescorovane'        then        77021171
when        'NELSON JOSÉ ANTUNES'        then        77021172
when        'DIRCE PEREIRA DA SILVA'        then        77021173
when        'MARLENE FERREIRA NUNES'        then        77021174
when        'LAUDICEIA CHRISOSTHEMOS SOARES'        then        77021175
when        'NILZA GOMES DOS SANTOS'        then        77021176
when        'GENEZIO MARQUES DE BRITO'        then        77021177
when        'CLENIR ALTINO DA SILVA'        then        77021178
when        'NAIR RITCEL'        then        77021179
when        'JOSE GONÇALVES ULHIOA'        then        77021180
when        'ODARIO SCHWAMBACH'        then        77021181
when        'ROBERIO GOMES DA SILVA'        then        77021182
when        'BOLIVARD AMAZONAS TESTONI'        then        77021183
when        'LINDAURA DA SILVA ULHIOA'        then        77021184
when        'Dirce Paganardi Meireles'        then        77021185
when        'EDILANE SARAIVA DE SOUZA'        then        77021186
when        'DIVANI PEREIRA DOS SANTOS ROQUE'        then        77021187
when        'DONIZETE VITOR ALVES'        then        77021188
when        'Adelia'        then        77021189
when        'LOURDES PEREIRA'        then        77021190
when        'JONATHAS SOUZA SANTOS'        then        77021191
when        'MARCELO FEREIRA LOPES'        then        77021192
when        'ADVANILDO CAMPOS DA CUNHA'        then        77020951
when        'JAIR MOREIRA BARREIRO'        then        77020952
when        'CANDIDA SIDNEI DOS SANTOS PEREIRA'        then        77020953
when        'VICENTE SOARES DA COSTA'        then        77020954
when        'GENESIO JOAO BATISTA'        then        77020955
when        'JOSIEL CANDIDO'        then        77020956
when        'DEOSDETE RODRIGUES'        then        77020957
when        'ELISAMA LOPES PEREIRA'        then        77020958
when        'JOSÉ CARLOS SANTANA'        then        77020959
when        'ASSOCIAÇÃO DE PAIS E AMIGOS DOS EXCEPCIONAIS-APAE'        then        77021220
when        'CREONICE PEREIRA MARTINS'        then        77021221
when        'NILTON OLIVEIRA SOUZA'        then        77021222
when        'APARECIDA LUIZA DA COSTA ALVES'        then        77021223
when        'SERGIO MENDES RODRIGUES'        then        77021224
when        'ANA DA SILVA'        then        77021225
when        'BINADIR B. DE JESUS ALIENADO A SICOOB DED.2377900'        then        77021226
when        'ELIAS ALVES DE AGUIAR '        then        77021227
when        'SEBASTIAO DA SILVA'        then        77021228
when        'FLAVIA LUIZA ALVES'        then        77021229
when        'ANASTACIA PIMENTEL DOS SANTOS DA SILVA'        then        77021230
when        'CARLOS EDUARDO BARRETO ACCIOLY'        then        77021231
when        'THAYS GOMES DE CAMPOS'        then        77021232
when        'MARIA JOSE DOS SANTOS'        then        77021233
when        'CLARINDA DA ROCHA'        then        77021234
when        'MARIA DA CONCEICAO'        then        77021235
when        'JULIO DE OLIVEIRA'        then        77021236
when        'EMATER - RO'        then        77021237
when        'GENTIL PEJARA BORTULI'        then        77021238
when        'NISES MARILDA TRAVAINI BERNADELI'        then        77021239
when        'MARIA APARECIDA DE ABREU BRANDAO'        then        77021240
when        'GENARIO FRANCISCO PRATES'        then        77021241
when        'COOPERATIVA DE CREDITO DO CENTRO SUL RONDONIENSE-SICOB CRRED'        then        77021242
when        'MARLI DA CUNHA'        then        77021243
when        'GISELLE NICOLAU DE SOUZA'        then        77021244
when        'JOSE SIMINHUK'        then        77021245
when        'ELIENE RIBEIRO ALVES'        then        77021246
when        'ANTONIO BATISTA DE OLIVEIRA'        then        77021247
when        'EDILSON CARLOS MATA DE OLIVEIRA'        then        77021248
when        'ROSINEIA HAMMER SCHULTZ'        then        77021249
when        'A. M. C. FACHINI'        then        77021250
when        'JOSE MARCOS DOS SANTOS'        then        77021251
when        'SERGIO BERNARDINO DE OLIVEIRA'        then        77021252
when        'SALETE PINHEIRO DE FREITAS'        then        77021253
when        'JUVENTINO MARTINS'        then        77021254
when        'AGENO FERNANDES BOTELHO'        then        77021255
when        'MANOEL ALVES DE AGUIAR'        then        77021256
when        'TEREZA DUARTE DOS SANTOS'        then        77021257
when        'FRANCIELE SIMINHUK'        then        77021258
when        'MARIA JOSE DOS SANTOS'        then        77021259
when        'IZABEL VAIS PINHEIRO FERREIRA'        then        77021774
when        'LAUDICEIA MENDES DA COSTA'        then        77021775
when        'TEODOLINA CORREIA PINTO'        then        77021776
when        'MARIA SERAFIM BARBOSA'        then        77021777
when        'THELMO WAGNER CUSTODIO FACHINI'        then        77021778
when        'NARIA GOUVEIA VIEIRA'        then        77021779
when        'VALDECI NEVES ROSA '        then        77021960
when        'SANDRA MELO DE CARVALHO BARRETO'        then        77021961
when        'MARIA ROSA SOARES DE MELO AMORIM'        then        77021962
when        'ELZA ANTUNES BOTELHO'        then        77021963
when        'MARCELO HENRIQUE PEREIRA BARROS'        then        77021964
when        'HUGO DE FREITAS'        then        77021965
when        'JOSE ANTONIO DE OLIVEIRA'        then        77021966
when        'SIRLEI APARECIDA GOMES DA ROSA'        then        77021967
when        'MARIA SOARES DE SOUZA'        then        77021968
when        'ELCI GONÇALVES DE SOUZA'        then        77021969
when        'MARIA CORDEIRO BEZERRA'        then        77021970
when        'VALDECIR P. CASTRO ALIEN SICOOB CREDIP CED 1263792'        then        77021971
when        'ANDREIA DOS SANTOS ALBRES'        then        77021972
when        'OZILIA ELLER GOIS'        then        77021973
when        'JOAO PAULO BATISTA DA CRUZ'        then        77021974
when        'IZAQUE ALVES'        then        77021975
when        'ALESSANDRO AGUIAR SILVA'        then        77021976
when        'FRANCISCA DOS SANTOS CALDEIRA'        then        77021977
when        'TEREZINHA RACANELI'        then        77021978
when        'HELI DA SILVA ROSSETO'        then        77021979
when        'EDSON FRANCISCO SANTANA DE SOUZA'        then        77021980
when        'FABIO HUMBERTO ALVES'        then        77021981
when        'MARIA TEXEIRA HERBST'        then        77021982
when        'ANODETE GOMES DE BRITO'        then        77021983
when        'QUERLE GONÇALVES BORGES'        then        77021984
when        'SERGIO LEAO DE ARAUJO'        then        77021985
when        'JULITA MARIA DA CONCEICAO ALENCAR'        then        77021986
when        'CLAUDINEI A. DA SILVA ALIENADO A SICOOB CREDIP CED 2815009'        then        77021987
when        'SABINO ALVES'        then        77021988
when        'FABIENE ALVES DA SILVA'        then        77021989
when        'NAIR RIBEIRO NUNES DA ROCHA'        then        77021990
when        'CARMORAIS LTDA - ME'        then        77021991
when        'ISAU SILVA MONTELO'        then        77021992
when        'SERGIO SOARES DA COSTA'        then        77021993
when        'LUZIA DOMINGOS FERRAZ'        then        77021994
when        'CLEUSOMAR DE LIMA'        then        77021995
when        'JOSE JORGE ALVES DOS SANTOS'        then        77021996
when        'JOSE ANANIAS DE ANDRADE'        then        77021997
when        'WALTEIR DA SILVA VIEIRA'        then        77021998
when        'ARNESTO BORBA DE ALMEIDA'        then        77021999
when        'AIRTON GONÇALVES MACHADO'        then        77022000
when        'MARILENE BEZERRA DA SILVA'        then        77022001
when        'LINDALCIR GOMES CORDEIRO'        then        77022002
when        'ANTONIA NILZA LEANDRO DA SILVA DIAS'        then        77022003
when        'ISMAEL CORREIA DA SILVA'        then        77021479
when        'ADIMAR JOSE DE ANDRADE'        then        77021480
when        'FABIA ADRIANA PPONTES'        then        77021481
when        'LUZIA RODRIGUES DE CARVALHO'        then        77021482
when        'MICHEL MORAES TOME'        then        77021483
when        'DIONISIO TRASPADINI'        then        77021484
when        'DENIVALDO FERNANDES DA SILVA'        then        77021485
when        'RODRIGUES & CAZAGRANDE LTDA - ME'        then        77021486
when        'MARIA LUIZA DA COSTA'        then        77021487
when        'DIEGO DE SOUZA A. CONTABILIDADE-ME '        then        77021488
when        'RUTE CEZARIO DE SOUZA'        then        77021489
when        'JOAO JOSE VITOR'        then        77021490
when        'MARIA PRUDENCIO DA SILVA'        then        77021491
when        'CID KURIYAMA'        then        77021492
when        'MANOEL JOSE FEREIRA'        then        77021493
when        'JOSE NILSON PRATES SOBRINHO'        then        77021494
when        'VALDECI NEVES ROSA '        then        77021495
when        'BEATRIZ DE ALMEIDA'        then        77021496
when        'OSMAR ALVES CESTARE'        then        77021497
when        'MARIA PEREIRA DE MACEDO'        then        77021498
when        'JUDITH LOPES DE FARIA'        then        77021499
when        'NILZA MARIA DOP CARMO MORAIS'        then        77021500
when        'RICARDO ALTINOAFONSO'        then        77021501
when        'LENICE BRESSAN ROTHERMEL'        then        77021502
when        'LORENA DOS SANTOS  LEMES'        then        77021503
when        'DULCE H. FERNANDES '        then        77021504
when        'MARIA FERNANDES DOS SANTOS'        then        77021505
when        'BRAULINO BUTZHE'        then        77021506
when        'MARCIA MARIA LENZI'        then        77021507
when        'ELIANDRO ANTUNES COSME'        then        77021508
when        'MARCIO FERREIRA DOS SANTOS'        then        77021509
when        'NOEMI ESCORICA DIAS PINTO'        then        77021510
when        'MARIA ADILEUZA RODRIGUES DE LIMA'        then        77021511
when        'VALDECI OLIVEIRA DA SILVA'        then        77021512
when        'MARCOS JANIO BLASI'        then        77021513
when        'ANTONIO PEDRO'        then        77021514
when        'CLEUZA LUCIANO MORAIS'        then        77021515
when        'ALTINIZIA FERRONATO DA CRUZ'        then        77021516
when        'PARECIS MATERIAIS PARA CONSTRUÇÃO LTDA'        then        77021517
when        'EGIDIO BLASI'        then        77021518
when        'ERICA DE BRITO TEIXEIRA'        then        77021519
when        'ROSELI TAKAHASHI BRAVO PIAZZA'        then        77021520
when        'NONDAS DIONIZIO DE LIMA'        then        77021521
when        'ELIANE FRANCO DE OLIVEIRA LIMA'        then        77021522
when        'MARIA DAS DORES MOREIRA SILVA'        then        77021523
when        'RONE VON RODRIGUES DA COSTA'        then        77021524
when        'NEUZA LEAO DE ARAUJO'        then        77021525
when        'JOSE ALVES FERNANDES'        then        77021526
when        'PERCILIA ROSA PRATES DOS SANTOS'        then        77021527
when        'ADELINA AOIAGUI SILVA ALIENADO A SICOOB CREDIP CED 2148083'        then        77021280
when        'GECENI GASPAR'        then        77021281
when        'MARIA DAS GRAÇAS DE JESUS'        then        77021282
when        'LENECY LISBOA DE SOUZA '        then        77021283
when        'RUDNEY RACANELI'        then        77021284
when        'HERNANI CARDOSO COSTA'        then        77021285
when        'LAURINDA FILGUEIRA DE OLIVEIRA'        then        77021286
when        'SIMONE BATISTA'        then        77021287
when        'EUZILENE NASCIMENTO ULHIOA'        then        77021288
when        'JOSE OGENIOS SERAFIM DOS SANTOS'        then        77021289
when        'GLORIA MARIA DE OLIVEIRA ROTHERMEL'        then        77021290
when        'HELENA GOMES DE OLIVEIRA'        then        77021291
when        'ROSENEIDE ALVES CESTARI SOUZA'        then        77021292
when        'OSMAR CASAGRANDE '        then        77021293
when        'MARCELO DE OLIVEIRA SALA'        then        77021294
when        'ALMERINDA GONÇALVES'        then        77021295
when        'RENATO PEREIRA GOMES'        then        77021296
when        'LUIZ POLICARPO DE GOUVEIA'        then        77021297
when        'DENY SIQUEIRA DE SOUZA'        then        77021298
when        'EUDOXIA ALVES SALOMÃO'        then        77021299
when        'ADELAR CAZAGRANDE'        then        77021300
when        'DEISA SALDANHA DA SILVA'        then        77021301
when        'CELMA CONTADINI'        then        77021302
when        'MARCELO MARINHO DE SOUZA'        then        77021303
when        'JULIANA ALVES SALOMÃO'        then        77021304
when        'NIVALDO NOGUEIRA DO NASCIMENTO'        then        77021305
when        'GIBERTO CAMPOS DE SOUZA'        then        77021306
when        'CLAUDINEI BUENO CANDIDO'        then        77021307
when        'FRANCISCA LOPES DE OLIVEIRA'        then        77021308
when        'DIOLINNO ALVES DA SILVA'        then        77021309
when        'IZALTINA NICOLAU DE SOUSA'        then        77021310
when        'VALENTINA DE ALMEIDA'        then        77021311
when        'GISLANA LUCAS DOS REIS SILVA'        then        77021312
when        'EDUARDO JARDEL ANDRES '        then        77021313
when        'JOCELI BORBA DE ALMEIDA'        then        77021314
when        'ROSANGELA RODRIGUES VIEIRA GARCIA'        then        77021315
when        'JAIR JOSE BLASI'        then        77021316
when        'CAMILA FERNANDES DE ABREU DA SILVA'        then        77021317
when        'DANIEL BARBOSA DA SILVA'        then        77021318
when        'IZABEL SILVA PERIN'        then        77021319
when        'NILTON MAURILIO SALA'        then        77021320
when        'LUIZ FELIPE SILVA BARBOSA'        then        77021321
when        'JOSE IZABEL FILOMENO'        then        77021322
when        'MARIA BATISTA DOS SANTOS'        then        77021323
when        'LOURDES TEREZA BUSATO'        then        77021324
when        'JOICE POLIANE MERCLY DE ANDRADE'        then        77021325
when        'CLEICY BRESSAMI DOS SANTOS VILA BOAS'        then        77021326
when        'MARIA LAURENÇO DE ABREU'        then        77021327
when        'JOSE DO CARMO RODRIGUES'        then        77021328
when        'ANTONIO GONÇALVES DE  ALBRES'        then        77021379
when        'WALDENIR MOTA PEREIRA'        then        77021380
when        'JOAQUIM DONIZETE LISBOA  DE SOUZA'        then        77021381
when        'JOSIMAR OLIMPIO DE SOUZA'        then        77021382
when        'ADVANILDO DE CAMPOS DA CUNHA'        then        77021383
when        'MARGARETE PEREIRA MARTINEZ'        then        77021384
when        'JOSE ANTONIO DA COSTA'        then        77021385
when        'VALDIR BERGER'        then        77021386
when        'IVONE HAMMER TOMAZ'        then        77021387
when        'GENIVAL R. DA SILVA ALIENADO A SOCOOB CREDIP CED 780599'        then        77021388
when        'FRANCIELE DO NASCIMENTO BENITEZ'        then        77021389
when        'CARLOS PEREIRA DE MOURA JUNIOR'        then        77021390
when        'OTILIA VITORINO DE MORAIS'        then        77021391
when        'INEIS DE FATIMA TREVISAN CED 72602-4'        then        77021392
when        'ROSIMAR AGUIAR DA SILVA CARVALHO'        then        77021393
when        'LINDOMAR ALVES VITOR'        then        77021394
when        'MARTA GOMES DA SILVA'        then        77021395
when        'AGENOR COELHO DE PAULA'        then        77021396
when        'MARIA NEUZA GONÇALVES VIEIRA'        then        77021397
when        'VALERIA MOREIRA GOMES'        then        77021398
when        'DEJAIR ANTONIO DOS REIS ALIENADO A SICOOB CREDIP CED. 478427'        then        77021399
when        'JOSELANE COSTA DA CRUZ'        then        77021400
when        'RUBENS PEDRO BEZERRA'        then        77021401
when        'MARILEIDE ELIZABETE DE CARVALHO'        then        77021402
when        'ANDREIA CAZAGRANDE RODRIGUES '        then        77021403
when        'RONILDO APARECIDO PEDRO ALEXANDRINO'        then        77021404
when        'DEUZELI DIAS RIBEIRO'        then        77021405
when        'VILMAR NUNES'        then        77021406
when        'JOCELI ANDRETTA'        then        77021407
when        'ALESSON SOUSA BRITO'        then        77021408
when        'ERNESTO AMARAL DE BRITO'        then        77021409
when        'LUCIANA DE OLIVEIRA PINTO'        then        77021410
when        'VANDERLEIA CRUZ DE LIMA'        then        77021411
when        'EVANGELINO FERNANDES BOTELHO'        then        77021412
when        'CLEONICE LUCIANO TORRES'        then        77021413
when        'HOSANI LOPES CANDIDO'        then        77021414
when        'ANA CLAUDIA MONTIBELLER'        then        77021415
when        'GILDENE FARIA VIANA'        then        77021416
when        'JOSE HUMBERTO ALVES'        then        77021417
when        'EVILYN ROGERIA LÚCIO OLIVEIRA'        then        77021418
when        'CLAUDIANA PEREIRA DOS SANTOS'        then        77021419
when        'SEBASTIÃO DIAS DE SOUZA'        then        77021420
when        'MEIRE FRANCIELE GONÇALVES DA SILVA'        then        77021421
when        'MARIA BEATRIZ ELEUTERIO CEZINBA'        then        77021422
when        'ANTONIO PONTES'        then        77021423
when        'MILTON ANTONIO PEREIRA'        then        77021424
when        'APARECIDA DA CONCEIÇÃO'        then        77021425
when        'RITA SANTOS LIMA'        then        77021426
when        'ANTONIO CARLOS ARGIONA OLIVEIRA'        then        77021427
when        'ROMENIGUE GOBBI GOIS'        then        77021428
when        'BEATRIZ DA CUNHA CONCEIÇÃO'        then        77021528
when        'WESP FERREIRA DOS SANTOS'        then        77021529
when        'RONY HIAGO NUNES BARRETO'        then        77021530
when        'ELISANGELA PIAZZA ALIENADO A SICOOB CREDIP CEDULA Nº 2382174'        then        77021531
when        'RODRIGO CLEMENTE MORAIS'        then        77021532
when        'SIRLENE BROGIDO OLIVEIRA'        then        77021533
when        'LUZIA XAVIER LIMA E OUTROS'        then        77021534
when        'CLOVIS SANTO BORELLA FILHO'        then        77021535
when        'ANDERSON FAUSTINO'        then        77021536
when        'ANTONIO CARLOS GUIMARAES'        then        77021537
when        'ANGELINA DA SILVA FERREIRA'        then        77021538
when        'DESIVALDO FURTUNATO DOS SANTOS'        then        77021539
when        'SILVIO JOSE DE AMORIM'        then        77021540
when        'ELIVERTON ALVES VITOR'        then        77021541
when        'VANDIR ZEFERINO DE MATOS'        then        77021542
when        'JOSE GEOVAN SIMÕES'        then        77021543
when        'RONI NOVAIS GUTIERREZ'        then        77021544
when        'ILSON DA SILVA SANTOS'        then        77021545
when        'MARISA DIAS DA SILVA'        then        77021546
when        'DIONE BARROS DA SILVA'        then        77021547
when        'DANIELI ALENCAR STRE'        then        77021548
when        'FERNANDO GALDINO DA SILVA'        then        77021549
when        'ELENILSON DOMINGUES BARROS'        then        77021550
when        'VITOR HUGO MOURA RODRIGUES'        then        77021551
when        'MARIA DAS DORES DA ROCHA'        then        77021552
when        'MARIA DAS DORES RAFAEL FILOMENO'        then        77021553
when        'VALDIR DEL NERO'        then        77021554
when        'VALCIRENE DEL NERO SILVA'        then        77021555
when        'ELIAS DANIELSON HONORIO'        then        77021556
when        'RODRIGO PEDRO ALEXANDRINO'        then        77021557
when        'JOSE CARLOS SILVA BARBOSA'        then        77021558
when        'WILLIAN CAMPOS DE ABREU'        then        77021559
when        'ISAIAS DE SOUZA HENRIQUE'        then        77021560
when        'CLAITON LUCAS DA CRUZ'        then        77021561
when        'TIAGO DEIVIDI DA CRUZ'        then        77021562
when        'SEBASTIÃO VIDOTTO'        then        77021563
when        'ALESSANDRA FARIA VIANA'        then        77021564
when        'EDGAR RIETZ'        then        77021565
when        'TEREZINHA DE JESUS DA SILVA'        then        77021566
when        'MARIA NICOLAU DE SOUSA LEMES'        then        77021567
when        'DONIZETE FRANCISCO DE LIMA'        then        77021568
when        'MIRELLA SOARES SILVA'        then        77021569
when        'CLAUDIA ANTONIA CARDOSO SILVA'        then        77021570
when        'LAUDELINO PEREIRA DA SILVA'        then        77021571
when        'GILMAR CESCONETTO'        then        77021572
when        'CORNELIO PEREIRA DE CARVALHO'        then        77021573
when        'WELLEN LOURENÇO VIANA'        then        77021574
when        'HELENA LOPES DE SOUZA'        then        77021575
when        'TEREZINA  ANDRETTA'        then        77021576
when        'MONICA ELITANA DOS SANTO ALIENADO A SICOOB CED 1791090'        then        77021577
when        'RAFAEL JORGE DA SILVA RIETZ'        then        77021329
when        'KLESIO BRESSAMI DOS SANTOS'        then        77021330
when        'JOEL COSTA ABELHA'        then        77021331
when        'VANDERLAN ANTONIO FERREIRA'        then        77021332
when        'AMAREY ALVES SOS SANTOS'        then        77021333
when        'SERGIO OLIVEIRA PRUDENCIO'        then        77021334
when        'MAYKON EDELCIR ALVES SETTE'        then        77021335
when        'ADRIANA TOMAZ'        then        77021336
when        'ADRIANA CARDOSO DA SILVA VIEIRA'        then        77021337
when        'ISAU DOS SANTOS CALDEIRA'        then        77021338
when        'APARECIDA DOS SANTOS CALDEIRA'        then        77021339
when        'GEOVANA RIBEIRO COSTA CED. Nº 1676274'        then        77021340
when        'DILVANI PEREIRA  ANTUNES'        then        77021341
when        'EMERITON PUDANOSCHI'        then        77021342
when        'NILSON DA SILVA'        then        77021343
when        'LAZARA DOS ANJOS'        then        77021344
when        'JEFFERSON DOS SANTOS RODRIGUES'        then        77021345
when        'MARIA JOSE NICOLAU DE SOUSA'        then        77021346
when        'IZALTINO VIDOTTO'        then        77021347
when        'MARIA LUCIENE SERAFIM DOS SANTOS'        then        77021348
when        'SEBASTIAO FERNENDES DE MOURA'        then        77021349
when        'DILAINE JOVINA DE JESUS GONÇALVED MARQUES'        then        77021350
when        'FAGNER HELTON NASCIMENTO DA CRUZ'        then        77021351
when        'CARLOS LUIZ TEOTONIO'        then        77021352
when        'VITORINO DOS SANTOS CALDEIRA'        then        77021353
when        'LUNA BRETAS LIMA'        then        77021354
when        'MANOEL MESSIAS DE MACEDO GOMES'        then        77021355
when        'JOAO CARLOS CESTARI'        then        77021356
when        'WILIAN DE SOUZA MLAK'        then        77021357
when        'ANTONIA DE CAMPOS DA CUNHA'        then        77021358
when        'CARLOS MARQUES DOS SANTOS'        then        77021359
when        'JOSE RODRIGUES NETO'        then        77021360
when        'ANATIELE DE AMORIM'        then        77021361
when        'MARIA DE FATIIMA ALVES VITOR'        then        77021362
when        'MARCELO VIDOTTO'        then        77021363
when        'SIMONE ROCHA NUNES'        then        77021364
when        'IZAEL DIAS DE LIMA'        then        77021365
when        'AILTON FRANCISCO DIOGO'        then        77021366
when        'ROSINEIDE BEZERRA'        then        77021367
when        'VALERIA DE CARVALHO BARRETO'        then        77021368
when        'EQUITERIA MOREIRA DOS SANTOS'        then        77021369
when        'ADEMIR JOSE DE OLIVEIRA'        then        77021370
when        'SIVAL PEREIRA DE SOUZA ALIENADO SICOOB CREDIP CED.2461138'        then        77021371
when        'WELIAN ANIEL DA SILVA FERREIRA'        then        77021372
when        'ZAMIR LUIZ'        then        77021373
when        'JOSIMAR ANTONIO LEPPAUS ALIENADO A SICOOB CREDIP CED 2334973'        then        77021374
when        'CELIO PEDRO BEZERRA'        then        77021375
when        'IDILAINE DE CAMPOS PONTES BRANDAO'        then        77021376
when        'RONALDO BATISTA DE OLIVEIRA'        then        77021377
when        'CCLA DO CENTRO SUL RONDONIESE SICOOB CREDIP'        then        77021378
when        'JADER DE SOUZA FERREIRA'        then        77021429
when        'IVONEY APOLINARIO DA CRUZ'        then        77021430
when        'PAULO HENRIQUE MARCELINO DE OLIVEIRA'        then        77021431
when        'EURIPEDES SEVERINO VIEIRA'        then        77021432
when        'VANILDA BUENO DEL NERO'        then        77021433
when        'ANELITA MATOS PEREIRA BASTOS'        then        77021434
when        'DAVID GABRECHT'        then        77021435
when        'DEISE CAMPOS CHIMILOUSKI'        then        77021436
when        'GREICIANE CRISTINA PETZOLD MOTA'        then        77021437
when        'EVA PEREIRA DE SOUZA'        then        77021438
when        'DAMARIS RIBEIRO DA SILVA'        then        77021439
when        'LUCINEI FERREIRA ALVES'        then        77021440
when        'ORIAS PEREIRA CANDIDO'        then        77021441
when        'ROBSON NUNES DA SILVA'        then        77021442
when        'HILDA GOMES FERREIRA'        then        77021443
when        'EDUARDO SIQUEIRA DE SOUZA'        then        77021444
when        'GEORGE MATHEUS DA SILVA PEREIRA'        then        77021445
when        'VANESSA SABINA DE OLIVEIRA SILVA PETRINO'        then        77021446
when        'EA ADMINISTRAÇÕES E PARTICIPACÕES S/A'        then        77021447
when        'ENE ADMINISTRAÇOES E PARTICIPAÇÕES LTDA'        then        77021448
when        'MARIA SIMOES DE LIMA CARVALHO'        then        77021449
when        'RONNYE DA SILVA BANDEIRA'        then        77021450
when        'LUIZA ALVES DA SILVA'        then        77021451
when        'AMAREY ALVES DOS SANTOS'        then        77021452
when        'VALDIR BERGER'        then        77021453
when        'ANTONIO MARTINS'        then        77021454
when        'OSWALDO AMARAL DE BRITO'        then        77021455
when        'MARIA DE FATIMA DE GOUVEA'        then        77021456
when        'RONILDO LOPES DE FARIAS'        then        77021457
when        'CATT NICOLAU DE SOUZA'        then        77021458
when        'CENCEIÇÃO DE JESUS REIS'        then        77021459
when        'ROQUE SETTE'        then        77021460
when        'CRISTINA PEDRO DA COSTA'        then        77021461
when        'ROSANA OLIVEIRA DA SILVA'        then        77021462
when        'EDVIN BELING'        then        77021463
when        'TIAGO ELLER GOIS'        then        77021464
when        'ANTONIA DE CAMPOS DA CUNHA'        then        77021465
when        'ERIVAN BEZERRA DA SILVA'        then        77021466
when        'SEVERINA PEREIRA NASCIMENTO'        then        77021467
when        'ELIANE GOMES CORDEIRO'        then        77021468
when        'LAURINDO FERREIRA DA SILVA'        then        77021469
when        'CLAUDECIR DE OLIVEIRA'        then        77021470
when        'MARIZETE DE FÁTIMA DE CAMPOS GUEDES SANADA'        then        77021471
when        'ALAN MATOS PEREIRA BASTOS'        then        77021472
when        'EVA MARIA ESTEVAM'        then        77021473
when        'NATANAEL FERNANDES GUIMARÃES'        then        77021474
when        'EMERSON DOS SANTOS GOULART'        then        77021475
when        'LINDALVA DE ABREU'        then        77021476
when        'DIAIR GONÇALVES ALVES'        then        77021477
when        'VALDINEI JOSÉ DE OLIVEIRA'        then        77021478
when        'EMERSON RODRIGUES FAGUNDES'        then        77021578
when        'REGINALDO RAASCH'        then        77021579
when        'MARIA APARECIDA ALVES FRANCISCO'        then        77021580
when        'LEONICE FILGUEIRAS DE ALMEIDA'        then        77021581
when        'CLAUDIANA PEJARA BROILO'        then        77021582
when        'MARILDA CAMPOS DA CUNHA'        then        77021583
when        'MARIA GUIHERME PAULINO'        then        77021584
when        'ROSANGELA APARECIDA MIRANDA'        then        77021585
when        'GECENI GASPAR FERREIRA'        then        77021586
when        'MARTA RODRIGUES DE SOUZA'        then        77021587
when        'ISMAEL VICTOR DOS SANTOS ALBRES'        then        77021588
when        'FRANCIELE MATOS BARBOSA'        then        77021589
when        'ÁNGEL GABRIEL SILVA CALDEIRA'        then        77021590
when        'WELITON JOSÉ LUCAS'        then        77021591
when        'BELMIRA GONÇALVES MACHADO'        then        77021592
when        'SOLANGE MUCHINSKI'        then        77021593
when        'MARIA LOURENÇO DA SILVA'        then        77021594
when        'APARECIDA PAULINO DA SIVA'        then        77021595
when        'ROSILENE TAKAHASHI BRAVO'        then        77021596
when        'GABRIELLI SOLARA BELO'        then        77021597
when        'GONÇALINA APARECIDA DE OLIVEIRA'        then        77021598
when        'SEBASTIANA GOMES DE CAMPOS'        then        77021599
when        'VILMA DE JESUS DA COSTA'        then        77021600
when        'ALINE RODRIGUES SOARES'        then        77021601
when        'MARTA DA SILVA CARVALHO'        then        77021602
when        'DANIELLE AIANA ZACARIAS SETTE'        then        77021603
when        'AMALIA BENEDITA ALVES MARTINS'        then        77021604
when        'JOCIMAR BORBA DE ALMEIDA'        then        77021605
when        'HERECLIS DA ROCHA ANDRADE'        then        77021606
when        'DEISE APARECIDA BERNADELI'        then        77021607
when        'DAVID EDSON HOFFMANN CARVALHO'        then        77021608
when        'MIRIAN VAZ DE SIQUEIRA GONÇALVES'        then        77021609
when        'BRUNO PETER AMORIM DE SOUZA'        then        77021610
when        'ANTONIO SILVA SOUZA'        then        77021611
when        'CLEILA GONÇALVES DE ANDRADE BORGES'        then        77021612
when        'BENAIA FERREIRA GOMES ROMANHA'        then        77021613
when        'VILMA SALETE PIAZZA'        then        77021614
when        'JOELMA PEREIRA MARCELINO'        then        77021615
when        'ISAIAS FERREIRA GOMES'        then        77021616
when        'WALLISSON HENRIQUE XAVIER'        then        77021617
when        'FABIO XAVIER VALENTIN'        then        77021618
when        'GILMAR CELESTINO GOBIRA'        then        77021619
when        'ADRAINA CRISTINA DOS SANTOS FERREIRA'        then        77021620
when        'ADELIO RODRIGUES DOS ANGELOS'        then        77021621
when        'MARIANA DE CARVAHLO COUTRIM'        then        77021622
when        'ZENAIDE DE JESUS ANTONIO PEREIRA'        then        77021623
when        'ARNESTO BORBA DE ALMEIDA'        then        77021624
when        'MARIA DAS GRAÇAS RODRIGUES DOS ANGELOS'        then        77021625
when        'PATRICIA DE ABREU BRANDÃO COSTA'        then        77021626
when        'VANDERLEIA NUNES FERREIRA FIGUEIREDO'        then        77021627
when        'GUSTAVO MESSIAS GOMES'        then        77021628
when        'EDUARDO DE OLIVEIRA PINTO'        then        77021629
when        'LORIVAL APARECIDO DE MORAES'        then        77021630
when        'ANA BRAULINA PINHO'        then        77021631
when        'MARIA RODRIGUES BRITO'        then        77021632
when        'ANY CAROLINE SANTANA SALA MAZARIN'        then        77021633
when        'ELAINE DAS GRAÇAS ROLIM'        then        77021634
when        'LUZIA STERNAITE CANDIDO'        then        77021635
when        'SERGIO ALVES DE ALMEIDA'        then        77021636
when        'JOSE CLAUDIO ALVES VITOR'        then        77021637
when        'MARINEIDE FERREIRA DE OLIVEIRA COSTA'        then        77021638
when        'ADRIANA RIBEIRO MUNIZ TIOBALDO'        then        77021639
when        'JULIANA TAMIRES SILVEIRA DOS REIS BEZERRA'        then        77021660
when        'DINA TEREZA DE JESUS'        then        77021661
when        'MARIA DAS GRAÇAS ALEXANDRINO'        then        77021662
when        'JOSÉ VALMIR FILOMENO'        then        77021663
when        'DINARTE APOLINARIO ANTUNES'        then        77021664
when        'EDINAN PEREIRA BIANCHIN'        then        77021665
when        'SIMONE MORAES FLORENCIO'        then        77021666
when        'SECUNDINO DE SOUZA NEVES'        then        77021667
when        'THAINÁ BARRETO AMARAL ANDRADES'        then        77021668
when        'CLAUDIO APARECIDO TOMAZ'        then        77021669
when        'katia regina de souza alexadrino'        then        77021670
when        'JAMILE MARIA BERNARDELLI'        then        77021671
when        'SALETE MOURA RODRIGUES'        then        77021672
when        'LIDIANE MORAIS DOS SANTOS ASCARI'        then        77021673
when        'JEANDRECI MARIA DE SOUZA'        then        77021674
when        'NEIDE ANTUNES BOTELHO MARTINS'        then        77021675
when        'ADRIANA APARECIDA BATISTA DA SILVA'        then        77021676
when        'ELISABETE DE FÁTIMA FAUSTINO'        then        77021677
when        'MARIA LOPES PEREIRA'        then        77021678
when        'WÉRICK RUBENS RAGNEL DE SOUZA BARCELOS'        then        77021679
when        'JOSÉ FERREIRA'        then        77021680
when        'OSMAR CASAGRANDE'        then        77021681
when        'WERIK MACIEL DA COSTA'        then        77021682
when        'THAINA BARRETO AMARAL ANDRES'        then        77021683
when        'LORENA MACIEL DA COSTA'        then        77021684
when        'MARIA COSTA DE SOUZA'        then        77021685
when        'ANGEL GABRIEL SILVA CALDEIRA'        then        77021686
when        'GABRIEL VINICIUS DA SILVA ABREU'        then        77021687
when        'ALZIRA ALVES ROSA'        then        77021688
when        'ANDREY BRUNO JESUS DA SILVA'        then        77021689
when        'JOANIVA RODRIGUES PEREIRA'        then        77021690
when        'IRMA HAMMER BERGER'        then        77021691
when        'VANIR DE ALBUQUERQUE BRITO'        then        77021692
when        'JOSEFINA COSTA DIAS'        then        77021693
when        'APARECIDA RODRIGUES COTRIM'        then        77021694
when        'LUCIANA VIVIANNE VICENTE ALVRS'        then        77021695
when        'MARTA VIEIRA GUEDES'        then        77021696
when        'ARILDO ANTONIO DA SILVA'        then        77021697
when        'CLEIDIR DE FÁTIMA RAGNEL'        then        77021698
when        'JOÃO FELIPE NERIS'        then        77021699
when        'GELSON FERREIRA DE SENA'        then        77021700
when        'MARIA APARECIDA FILGUEIRAS DE ALMEIDA OLIVEIRA'        then        77021701
when        'MARIA JANIA BASTOS DE JESUS'        then        77021702
when        'ANIZIO RAIMUNDO  DE OLIVEIRA'        then        77021703
when        'JOSÉ IDERLEI CARDOSO'        then        77021704
when        'VICENTE SAMPAIO DE OLIVEIRA'        then        77021705
when        'MARIA APARECIDA DE OLIVEIRA'        then        77021706
when        'JOSÉ CARLOS ROMANHA ULHIÕA'        then        77021707
when        'JUDITE BASTOS DE JESUS'        then        77021708
when        'MARIA NILZA SIEBRE'        then        77021709
when        'HELENA MUCZINSKI'        then        77021710
when        'NILDA CANUTO'        then        77021711
when        'LORENA DOS SANTOS LEMES'        then        77021712
when        'CUSTÓDIA DA SILVA MILITÃO'        then        77021713
when        'EDNA HAMMER TOMAS'        then        77021714
when        'AHILIO IVALDO BERNADELI'        then        77021715
when        'WESLEI SILVA DE OLIVEIRA'        then        77021716
when        'NICÓLI SILVA DE SOUZA'        then        77021717
when        'JANICE DE OLIVEIRA SILVA'        then        77021718
when        'KAUANY  CESTARI  FERREIRA'        then        77021719
when        'AMARILDO CARDOSO RIBEIRO'        then        77021720
when        'OLERIS FAUSTINO DE JESUS'        then        77021721
when        'JOSE LUCAS BARBOSA'        then        77021722
when        'GEISSIANE GABRIELY SOUZA  SANTIAGO'        then        77021723
when        'CORINA ZEFERINO DE MATOS'        then        77021724
when        'JOCELINO  DEOLINO DOS SANTOS'        then        77021725
when        'ADELSON HERBST TEIXEIRA'        then        77021726
when        'NIVALDO ALVES MACEDO'        then        77021727
when        'MARCIO  DE GOIS DA COSTA'        then        77021728
when        'VALDIRENE HAMMER BERGER'        then        77021729
when        'MARILZA MACHADO'        then        77021730
when        'EVERSON SOARES DA COSTA'        then        77021731
when        'LORIZETE BORBA DA SILVA'        then        77021732
when        'ALONSO EZEQUIEL GOMES'        then        77021733
when        'MARINA DOS ANJOS'        then        77021734
when        'CARLA DA SILVA'        then        77021735
when        'EVA MILANEZ'        then        77021736
when        'APARECIDA COSTA DE SOUZA BERNADES'        then        77021737
when        'MARIA APARECIDA GOMES'        then        77021738
when        'JOAQUIM NOVAES DE ALMEIDA'        then        77021739
when        'A. GREGIANINI COMERCIO DE PRODUTOS AGROPECUARIOS'        then        77021740
when        'FAGNER PRATES DA CRUZ'        then        77021741
when        'ELIANE SIMONE MATT'        then        77021742
when        'SARA CORSINI DE OLIVEIRA'        then        77021743
when        'LUCIANO FERREIRA ALVES'        then        77021744
when        'RONILDO LOPES DE FARIA'        then        77021745
when        'WALLEN FERNANDO LEITE BALEEIRO'        then        77021746
when        'DIEG ANTUNES DE PAULA'        then        77021747
when        'FAGNER SANTOS LIMA'        then        77021748
when        'JARBAS LUIS LUCAS'        then        77021749
when        'JULIANA MARCELINO SALVALAIO'        then        77021750
when        'PAULO HENRIQUE CONTADINI ARRUDA'        then        77021751
when        'SILVANY BISPO DOS SANTOS DE ALMEIDA'        then        77021752
when        'ELOISA ESTEVAM NOGUEIRA DA SILVA'        then        77021753
when        'DIENE GOMES FRANQUI'        then        77021754
when        'MARCIANA MORAIS FLORENCIO'        then        77021755
when        'GILSA DAS GRAÇAS DE OLIVEIRA ANDRADE'        then        77021756
when        'MARIA MALTA CARDOSO'        then        77021757
when        'LEOMAR APARECIDO DE OLIVEIRA'        then        77021758
when        'DANIEL RODRIGUES DE MORAIS'        then        77021759
when        'WEDSON ROQUE DINIZ CARRARO'        then        77021760
when        'ERICA OLIVEIRA DA SILVA'        then        77021761
when        'CLOVIS ANTONIO DE OLIVEIRA JUNIOR'        then        77021762
when        'LUDMILA DE OLIVEIRA ALVES'        then        77021763
when        'RUSCELINO PASSOS BORGES'        then        77021764
when        'IGREJA EVANGELICA RENOVADOS EM CRISTO MINISTERIO DE PARECIS-'        then        77021765
when        'ADEMAR DA CONCEIÇÃO'        then        77021766
when        'REGINALDO GIL DA SILVA JUNIOR'        then        77021767
when        'CILAS TOME DE SOUZA'        then        77021768
when        'ROZIEL ANTUNES DE LIMA'        then        77021769
when        'SUELI ESTER DE FREITAS SIMINHUK'        then        77021770
when        'JOCEMAR  DAMACENA'        then        77021771
when        'REGINALDO CURADACIU COSTA'        then        77021772
when        'FABIANO BARBOSA DE OLIVEIRA'        then        77021773
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
when        'ASSOCIAÇÃO BENEFICENTE DO IDOSO MONTE SINAI DE PARECIS'        then        77521170
when        'ALTO ALEGRE MINERAIS S.A'        then        77521171
when        'EQMG AGRICULTURA E PECUARIA LTDA '        then        77521172
when        'CSAP - COMPANHIA SUL AMERICANA DE PECUARIA S.A.'        then        77521173
when        'Pessoa teste.'        then        77539040
when        'Pessoa teste..'        then        77539840
when        'PREFEITURA MUNICIPAL DE ROLIM DE MOURA'        then        77575466
when        'SERVIÇO NACIONAL DE APRENDIZAGEM RURAL - SENAR/RO'        then        77575467
when        'MUNICIPIO DE CACOAL'        then        77575468
when        'facholi produção comercio e industria IMPORTAÇÃO exportação'        then        77575469
when        'DUNORTE DISTRIBUIDOR LTDA'        then        77575470
when        'TRATORON COMERCIO DE MAQUINAS E IMPLEMENTOS AGRICOLAS LTDA'        then        77575471
when        'FUNDACAO DE APOIO AO DESENVOLVIMENTO DA CIENCIA E TECNOLOGIA'        then        77575860
when        'INDUSTRIA E COMERCIO DE BEBIDAS MDM LTDA'        then        77575472
when        'PREFEITURA MUNICIPAL DE ARIPUANÃ'        then        77575473
when        'DMM LOPES & FILHOS LTDA'        then        77575475
when        'LOCARCERTO - LOCACOES DE VEICULOS E TRANSPORTADORA LTD'        then        77575476
when        'IDARON - ELIARA NUNES DE ASSIS JAQUES'        then        77575861
when        'CONTEL OBRAS E SERVIÇOS LTDA'        then        77575862
when        'C. A. BORGES CONSTRUTORA EIRELI'        then        77575960
when        'TENCEL ENGENHARIA EIRELI'        then        77575961
when        'DINAMICA EQUIP. DE CONSTR. E REPRESENT. LTDA'        then        77575863
when        'W. S. CAVALLARI - EPP'        then        77575962
when        'AGROPECUARIA MAGGI LTDA'        then        77575963
when        'CONSELHO ESCOLAR CORONEL JORGE TEIXEIRA DE OLIVEIRA'        then        77575964
when        'TELSAN ENGENHARIA E SERVICOS S A'        then        77575965
when        'CONSELHO REGIONAL DE FISIOTERAPIA E TERAPIA OCUPACIONAL DA N'        then        77576020
when        'CAIXA ECONÔMICA FEDERAL'        then        77576040
else 1
end as idPessoa,
3573 as idMunicipios,
case Cd_Bairro
when        1        then        4102199
when        3        then        4347120
when        5        then        4347122
when        27        then        4347123
when        2        then        4347119
when        4        then        4347121
when        6        then        4347123
else 4102199
end as idBairro,
case ds_EnderCorr
when        'Calors Gomes'        then        14424402
when        'LINHA 75'        then        14461462
when        'AGUIA BRANCA'        then        14461469
when        'BEIRA RIO'        then        14461463
when        'CARLOS GOMES'        then        14461464
when        'DAS GARÇAS'        then        14461475
when        'DAS LARANJEIRAS'        then        14461467
when        'DOS PIONEIROS'        then        14461474
when        'IGUAÇU'        then        14461476
when        'LINHA 75'        then        14461479
when        'P 06 KM 01'        then        14461468
when        'P-14'        then        14461470
when        'ALMIRANTE TAMANDARE'        then        14461482
when        'ALMIRANTE TAMANDARÉ'        then        14461465
when        'ANTÔNIO JESUS DE OLIVEIRA'        then        14461466
when        'ARARAS'        then        14461473
when        'AV BEIJA FLOR'        then        14461471
when        'AV CARLOS GOMES'        then        14461481
when        'AV. CARLOS GOMES N. 772'        then        14461483
when        'AV. SALVADOR N. 5531'        then        14461495
when        'BENEDITO LAURINDO GONÇALVES'        then        14461484
when        'BENTEVI'        then        14461472
when        'CANARIO'        then        14461477
when        'CANINDÉ'        then        14461485
when        'CARLOS DRUMMOND DE ANDRADE'        then        14461488
when        'CASTELO BRANCO'        then        14461480
when        'DA MATRIZ'        then        14461489
when        'DAS ARARAS'        then        14461486
when        'DOS IMIGRANTES'        then        14461507
when        'DOS PIONEIROS'        then        14461490
when        'DOS PIRIQUITOS'        then        14461512
when        'DUQUE DE CAIXIAS'        then        14461501
when        'DUQUE DE CAXIAS'        then        14461493
when        'ÉRICO VERÍSSIMO'        then        14461498
when        'EURICO  VERICIO'        then        14461502
when        'GETÚLIO DORNELES VARGAS'        then        14461503
when        'GETÚLIO DORNELLES VARGAS'        then        14461497
when        'GRACILIANO RAMOS'        then        14461500
when        'JAIR DIAS'        then        14461505
when        'JAIR DIAS ESQUINA C/ LINHA 75'        then        14461487
when        'JORGE AMADO'        then        14461492
when        'JOSÉ RODRIGUES DE OLIVEIRA.'        then        14461506
when        'JUDITE JESUS DE OLIVEIRA PARUSSULO'        then        14461515
when        'LINHA 75'        then        14461516
when        'MACHADO DE ASSIS'        then        14461494
when        'MANOEL ANTÔNIO DE OLIVEIRA'        then        14461517
when        'MANOEL RIBAS'        then        14461509
when        'MONTEIRO LOBATO'        then        14461511
when        'ORLANDINO JESUS DE OLIVEIRA'        then        14461491
when        'PERIQUITO'        then        14461496
when        'RUA JUDITE JESUS DE O PARUSSUL'        then        14461499
when        'RUA ORLANDINO JESUS DE OLIVEIRA'        then        14461514
when        'SABIÁ'        then        14461508
when        'SETE DE SETEMBRO'        then        14461510
when        'TUIUIU'        then        14461513
when        'YPE'        then        14461504
else 14424402
end as idLogradouro,
'2024-12-31' as dataValidadeAlvara,
'76979000' as cep,
ds_complemento as complemento,
'principal' as descricaoEndereco,
cd_numero as numero,
'SIM' AS economicoPrincipal,
'NORMAL' AS tipoContribuinte,
CASE cd_TipoDeclaracao
WHEN 1 THEN 'INICIO'
WHEN 2 THEN 'REGULAR'
WHEN 3 THEN 'BAIXADO'
WHEN 4 THEN 'PROVISORIO'
WHEN 5 THEN 'REINICIO'
END AS situacaoEconomico,
CASE cd_TipoImposto
WHEN 1 THEN 'FIXO'
WHEN 3 THEN 'ESTIMADO' 
WHEN 4 THEN 'null'
ELSE  'SEM_COBRANCA'
END AS regimeCobrancaIss,
410960 as idAgrupamento
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS economicos,
ROW_NUMBER() OVER (PARTITION BY cd_Cecam, cd_Contribuinte ORDER BY cd_Declaracao) AS nDeclaracao  
from ISSDeclaracoes
)
SELECT idIntegracao,economicos FROM CTE_DECLARACAO DECLARACAO WHERE DECLARACAO.cd_Declaracao = (SELECT MAX(cd_Declaracao) from ISSDeclaracoes DECEXT WHERE  DECEXT.cd_Contribuinte = DECLARACAO.cd_Contribuinte)

`;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            // Verificar se o campo economicos está definido e é uma string JSON válida
            if (!record.economicos) {
                console.error('Campo economicos está indefinido:', record);
                return null; // Ignorar este registro
            }

            let economicos;
            try {
                economicos = JSON.parse(record.economicos);
            } catch (error) {
                console.error('Erro ao fazer o parse do JSON economicos:', record.economicos);
                return null; // Ignorar este registro inválido
            }

            return {
                idIntegracao: record.idIntegracao ? record.idIntegracao.toString() : null, // Convertendo idIntegracao para string
                economicos: {
                    idEconomico: economicos.idEconomico, // Coletando ID do econômico ou null
                    idLogradouro: economicos.idLogradouro, // Coletando ID do logradouro ou null
                    idBairro: economicos.idBairro,
                    idMunicipios: economicos.idMunicipios, // Coletando ID do município ou null
                    idPessoa: economicos.idPessoa, // Coletando ID da pessoa ou null
                    dataValidadeAlvara: economicos.dataValidadeAlvara ? formatDate(economicos.dataValidadeAlvara) : null, // Formatando data ou null
                    cep: economicos.cep, // Valor padrão para CEP
                    complemento: economicos.complemento, // Valor padrão para complemento
                    descricaoEndereco: economicos.descricaoEndereco, // Valor padrão para descrição de endereço
                    numero: economicos.numero || "0", // Valor padrão para número
                    economicoPrincipal: economicos.economicoPrincipal, // Valor padrão para econômico principal
                    regimeCobrancaIss: economicos.regimeCobrancaIss, // Valor padrão para regime de cobrança
                    situacaoEconomico: economicos.situacaoEconomico, // Valor padrão para situação do econômico
                    tipoContribuinte: economicos.tipoContribuinte,
                    idAgrupamento: economicos.idAgrupamento,
                }
            };
        }).filter(record => record !== null); // Filtrando registros nulos ou inválidos
        



        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const response = await fetch('https://tributos.betha.cloud/service-layer-tributos/api/economicos', {
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
