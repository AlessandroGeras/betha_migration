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
	ROW_NUMBER() OVER (ORDER BY imoveis.cd_cecam) + 20.092 AS idIntegracao,
	JSON_QUERY(
    (SELECT
		imoveis.nm_AreaEdificio as vlAreaConstruidaUnidade, 
		imoveis.nm_AreaTerreno as vlAreaTotalTerrenoUnidade, 
		imoveis.nm_AreaEdificio as vlVenalConstruidoUnidade, 
		imoveis.nm_AreaTerreno as vlVenalTerritorialUnidade, 
		0 as vlVenalUnidade ,
		'SIM' as benfeitorias,
		'COMPRADOR' as financiado,
		'SIm' as outros,
		'PARCIAL' as tipoVenda,
		438696 idMotivos,
CASE
WHEN c.nm_Contribuinte = 'MARCIO  DE GOIS DA COSTA'THEN 27629380	
WHEN c.nm_Contribuinte = 'MARCIO ELIZIO DE CARVALHO'THEN 28930401	
WHEN c.nm_Contribuinte = 'MARCIO ELIZIO DE CARVALHO'THEN 28930402	
WHEN c.nm_Contribuinte = 'MARCIO FERREIRA DOS SANTOS'THEN 27628053	
WHEN c.nm_Contribuinte = 'MARCOS JANIO BLASI'THEN 27628853	
WHEN c.nm_Contribuinte = 'MARIA ANTONIA DE SOUZA'THEN 27629265	
WHEN c.nm_Contribuinte = 'MARIA APARECIDA ALVES FRANCISCO'THEN 27629336	
WHEN c.nm_Contribuinte = 'MARIA APARECIDA ALVES FRANCISCO'THEN 27629337	
WHEN c.nm_Contribuinte = 'MARIA APARECIDA DE ABREU BRANDAO'THEN 27629307	
WHEN c.nm_Contribuinte = 'MARIA APARECIDA DE ABREU BRANDAO'THEN 27629130	
WHEN c.nm_Contribuinte = 'MARIA APARECIDA DE AMORIM'THEN 27628326	
WHEN c.nm_Contribuinte = 'MARIA APARECIDA DE OLIVEIRA'THEN 27628080	
WHEN c.nm_Contribuinte = 'MARIA APARECIDA FILGUEIRAS DE ALMEIDA OLIVEIRA'THEN 27629349	
WHEN c.nm_Contribuinte = 'MARIA APARECIDA GOMES'THEN 27629389	
WHEN c.nm_Contribuinte = 'MARIA BATISTA DOS SANTOS'THEN 27629268	
WHEN c.nm_Contribuinte = 'MARIA BENEDITO BRITO'THEN 28930342	
WHEN c.nm_Contribuinte = 'MARIA BENEDITO BRITO'THEN 27628816	
WHEN c.nm_Contribuinte = 'MARIA CORDEIRO BEZERRA'THEN 27629098	
WHEN c.nm_Contribuinte = 'MARIA COSTA DE SOUZA'THEN 27629344	
WHEN c.nm_Contribuinte = 'MARIA DAS DORES DA ROCHA'THEN 27629096	
WHEN c.nm_Contribuinte = 'MARIA DAS DORES MOREIRA SILVA'THEN 27628947	
WHEN c.nm_Contribuinte = 'MARIA DAS DORES RAFAEL FILOMENO'THEN 27629010	
WHEN c.nm_Contribuinte = 'MARIA DAS GRAÇAS ALEXANDRINO'THEN 27629176	
WHEN c.nm_Contribuinte = 'MARIA DAS GRAÇAS DE JESUS'THEN 28930411	
WHEN c.nm_Contribuinte = 'MARIA DAS GRAÇAS RODRIGUES DOS ANGELOS'THEN 27629354	
WHEN c.nm_Contribuinte = 'MARIA DAS GRAÇAS RODRIGUES DOS ANGELOS'THEN 27628108	
WHEN c.nm_Contribuinte = 'MARIA DE FATIIMA ALVES VITOR'THEN 27628057	
WHEN c.nm_Contribuinte = 'MARIA DE FATIMA GOUVEA'THEN 27629221	
WHEN c.nm_Contribuinte = 'MARIA DE FATIMA GOUVEA'THEN 27628099	
WHEN c.nm_Contribuinte = 'MARIA DE FATIMA PEREIRA'THEN 27629215	
WHEN c.nm_Contribuinte = 'MARIA DE JESUS'THEN 27629179	
WHEN c.nm_Contribuinte = 'MARIA DE OLIVEIRA ALVES'THEN 28930407	
WHEN c.nm_Contribuinte = 'MARIA DO CARMO RODRIGUES DE CARVALHO SANTOS'THEN 27628770	
WHEN c.nm_Contribuinte = 'MARIA FERNANDES DOS SANTOS'THEN 27629111	
WHEN c.nm_Contribuinte = 'MARIA GUIHERME PAULINO'THEN 27629341	
WHEN c.nm_Contribuinte = 'MARIA JANIA BASTOS DE JESUS'THEN 27629350	
WHEN c.nm_Contribuinte = 'MARIA JOSE CAVALCANTE DA SILVA'THEN 27628131	
WHEN c.nm_Contribuinte = 'MARIA JOSE DA COSTA'THEN 27629076	
WHEN c.nm_Contribuinte = 'MARIA JOSE DOS SANTOS'THEN 27628754	
WHEN c.nm_Contribuinte = 'MARIA JOSE NICOLAU DE SOUSA'THEN 27628097	
WHEN c.nm_Contribuinte = 'MARIA LAURENÇO DE ABREU'THEN 27629310	
WHEN c.nm_Contribuinte = 'MARIA LOPES PEREIRA'THEN 27628828	
WHEN c.nm_Contribuinte = 'MARIA LOURENÇO DA SILVA'THEN 27629201	
WHEN c.nm_Contribuinte = 'MARIA LUCIA GONCALVES'THEN 27629059	
WHEN c.nm_Contribuinte = 'MARIA LUCIENE SERAFIM DOS SANTOS'THEN 27628096	
WHEN c.nm_Contribuinte = 'MARIA LUIZA DA COSTA'THEN 27628835	
WHEN c.nm_Contribuinte = 'MARIA MALTA CARDOSO'THEN 27628085	
WHEN c.nm_Contribuinte = 'MARIA MUNIZ DE OLIVEIRA'THEN 27628137	
WHEN c.nm_Contribuinte = 'MARIA NEUZA GONÇALVES VIEIRA'THEN 27629186	
WHEN c.nm_Contribuinte = 'MARIA NICOLAU DE SOUSA LEMES'THEN 27628105	
WHEN c.nm_Contribuinte = 'MARIA NILZA SIEBRE'THEN 27629141	
WHEN c.nm_Contribuinte = 'MARIA NILZA SIEBRE'THEN 27629356	
WHEN c.nm_Contribuinte = 'MARIA PENHA GOMES DA SILVA'THEN 27628682	
WHEN c.nm_Contribuinte = 'MARIA PEREIRA DE MACEDO'THEN 28930417	
WHEN c.nm_Contribuinte = 'MARIA RODRIGUES BRITO'THEN 27629206	
WHEN c.nm_Contribuinte = 'MARIA ROSA SOARES DE MELO AMORIM'THEN 28930428	
WHEN c.nm_Contribuinte = 'MARIA SENHORINHA GUEDES'THEN 28930461	
WHEN c.nm_Contribuinte = 'MARIA SENHORINHA GUEDES'THEN 28930532	
WHEN c.nm_Contribuinte = 'MARIA SERAFIM BARBOSA'THEN 27628722	
WHEN c.nm_Contribuinte = 'MARIA SIMOES DE LIMA CARVALHO'THEN 28930526	
WHEN c.nm_Contribuinte = 'MARIA SIQUEIRA'THEN 27628056	
WHEN c.nm_Contribuinte = 'MARIA SOARES DE SOUZA'THEN 28930503	
WHEN c.nm_Contribuinte = 'MARIA TEXEIRA HERBST'THEN 27629297	
WHEN c.nm_Contribuinte = 'MARIA VITOR ALVES'THEN 28930439	
WHEN c.nm_Contribuinte = 'MARIANA DE CARVAHLO COUTRIM'THEN 28930491	
WHEN c.nm_Contribuinte = 'MARILDA CAMPOS DA CUNHA'THEN 27629340	
WHEN c.nm_Contribuinte = 'MARILEIDE ELIZABETE DE CARVALHO'THEN 28930364	
WHEN c.nm_Contribuinte = 'MARILENE BEZERRA DA SILVA'THEN 27628917	
WHEN c.nm_Contribuinte = 'MARILZA MACHADO'THEN 27629382	
WHEN c.nm_Contribuinte = 'MARINA DOS ANJOS'THEN 27629385
end as idImoveis,
--------------------------------------------------------------------------------
CASE
WHEN c.nm_Contribuinte = 'MARCIO  DE GOIS DA COSTA' THEN 77021728
WHEN c.nm_Contribuinte = 'MARCIO ELIZIO DE CARVALHO' THEN 77021046
WHEN c.nm_Contribuinte = 'MARCIO FERREIRA DOS SANTOS' THEN 77021509
WHEN c.nm_Contribuinte = 'MARCONDES DE CARVALHO' THEN 77020703
WHEN c.nm_Contribuinte = 'MARCOS ANTONIO RODRIGUES DA CRUZ' THEN 77020915
WHEN c.nm_Contribuinte = 'MARCOS INACIO DE OLIVEIRA' THEN 77021055
WHEN c.nm_Contribuinte = 'MARCOS JANIO BLASI' THEN 77021513
WHEN c.nm_Contribuinte = 'MARGARETE PEREIRA MARTINEZ' THEN 77020676
WHEN c.nm_Contribuinte = 'MARGARETE PEREIRA MARTINEZ' THEN 77021384
WHEN c.nm_Contribuinte = 'MARIA ADILEUZA RODRIGUES DE LIMA' THEN 77021511
WHEN c.nm_Contribuinte = 'MARIA ANTONIA DE SOUZA' THEN 77021088
WHEN c.nm_Contribuinte = 'MARIA APARECIDA ALVES FRANCISCO' THEN 77021580
WHEN c.nm_Contribuinte = 'MARIA APARECIDA DA SILVA OLIVEIRA' THEN 77020916
WHEN c.nm_Contribuinte = 'MARIA APARECIDA DE ABREU BRANDAO' THEN 77021240
WHEN c.nm_Contribuinte = 'MARIA APARECIDA DE AMORIM' THEN 77020531
WHEN c.nm_Contribuinte = 'MARIA APARECIDA DE LIMA LUSQUINHO' THEN 77020896
WHEN c.nm_Contribuinte = 'MARIA APARECIDA DE LIMA LUSQUINHO' THEN 77520909
WHEN c.nm_Contribuinte = 'MARIA APARECIDA DE OLIVEIRA' THEN 77021706
WHEN c.nm_Contribuinte = 'MARIA APARECIDA FILGUEIRAS DE ALMEIDA OLIVEIRA' THEN 77021701
WHEN c.nm_Contribuinte = 'MARIA APARECIDA GOMES' THEN 77021738
WHEN c.nm_Contribuinte = 'MARIA BARROS GOMES' THEN 77020914
WHEN c.nm_Contribuinte = 'MARIA BATISTA DA CRUZ' THEN 77020361
WHEN c.nm_Contribuinte = 'MARIA BATISTA DOS SANTOS' THEN 77021323
WHEN c.nm_Contribuinte = 'MARIA BEATRIZ ELEUTERIO CEZINBA' THEN 77021422
WHEN c.nm_Contribuinte = 'MARIA BENEDITO BRITO' THEN 77020652
WHEN c.nm_Contribuinte = 'MARIA CORDEIRO BEZERRA' THEN 77021970
WHEN c.nm_Contribuinte = 'MARIA COSTA DE SOUZA' THEN 77021685
WHEN c.nm_Contribuinte = 'MARIA CREUZA SILVA BARBOSA' THEN 77020780
WHEN c.nm_Contribuinte = 'MARIA DA CONCEICAO ALVES' THEN 77020600
WHEN c.nm_Contribuinte = 'MARIA DA CONCEICAO' THEN 77021235
WHEN c.nm_Contribuinte = 'MARIA DA SILVA' THEN 77020509
WHEN c.nm_Contribuinte = 'MARIA DAMACENO' THEN 77020450
WHEN c.nm_Contribuinte = 'MARIA DAS DORES DA ROCHA' THEN 77021032
WHEN c.nm_Contribuinte = 'MARIA DAS DORES DA ROCHA' THEN 77021552
WHEN c.nm_Contribuinte = 'MARIA DAS DORES MOREIRA SILVA' THEN 77021523
WHEN c.nm_Contribuinte = 'MARIA DAS DORES RAFAEL FILOMENO' THEN 77021553
WHEN c.nm_Contribuinte = 'MARIA DAS GRAÇAS ALEXANDRINO' THEN 77021662
WHEN c.nm_Contribuinte = 'MARIA DAS GRAÇAS DE JESUS' THEN 77021282
WHEN c.nm_Contribuinte = 'MARIA DAS GRAÇAS RODRIGUES DOS ANGELOS' THEN 77021625
WHEN c.nm_Contribuinte = 'MARIA DE FATIIMA ALVES VITOR' THEN 77021362
WHEN c.nm_Contribuinte = 'MARIA DE FATIMA DE GOUVEA' THEN 77021456
WHEN c.nm_Contribuinte = 'MARIA DE FATIMA GOUVEA' THEN 77020566
WHEN c.nm_Contribuinte = 'MARIA DE FATIMA PEREIRA DA SILVA SANTOS' THEN 77021133
WHEN c.nm_Contribuinte = 'Maria de Fátima Pereira da Silva Santos' THEN 77021134
WHEN c.nm_Contribuinte = 'MARIA DE FATIMA PEREIRA' THEN 77021037
WHEN c.nm_Contribuinte = 'MARIA DE JESUS' THEN 77020981
WHEN c.nm_Contribuinte = 'MARIA DE OLIVEIRA ALVES' THEN 77020711
WHEN c.nm_Contribuinte = 'MARIA DO CARMO ALVES' THEN 77020755
WHEN c.nm_Contribuinte = 'MARIA DO CARMO RODRIGUES DE CARVALHO SANTOS' THEN 77020627
WHEN c.nm_Contribuinte = 'MARIA DOS ANJOS PEREIRA DE AGUIAR' THEN 77020782
WHEN c.nm_Contribuinte = 'MARIA DUARTE DA COSTA' THEN 77020807
WHEN c.nm_Contribuinte = 'MARIA ELIANE FERRARI' THEN 77020814
WHEN c.nm_Contribuinte = 'MARIA FERNANDES DOS SANTOS' THEN 77021505
WHEN c.nm_Contribuinte = 'MARIA FRANCISCA DA SILVA' THEN 77020938
WHEN c.nm_Contribuinte = 'MARIA GUIHERME PAULINO' THEN 77021584
WHEN c.nm_Contribuinte = 'MARIA IZABEL NOGUEIRA' THEN 77520914
WHEN c.nm_Contribuinte = 'MARIA JANIA BASTOS DE JESUS' THEN 77021702
WHEN c.nm_Contribuinte = 'MARIA JOSE CAVALCANTE DA SILVA' THEN 77020515
WHEN c.nm_Contribuinte = 'MARIA JOSE DA COSTA' THEN 77020889
WHEN c.nm_Contribuinte = 'MARIA JOSE DOS SANTOS' THEN 77021233
WHEN c.nm_Contribuinte = 'MARIA JOSE DOS SANTOS' THEN 77021259
WHEN c.nm_Contribuinte = 'MARIA JOSE DOS SANTOS' THEN 77521009
WHEN c.nm_Contribuinte = 'MARIA JOSE NICOLAU DE SOUSA' THEN 77021346
WHEN c.nm_Contribuinte = 'MARIA LAURENÇO DE ABREU' THEN 77021327
WHEN c.nm_Contribuinte = 'MARIA LOPES PEREIRA' THEN 77021678
WHEN c.nm_Contribuinte = 'MARIA LOURENÇO DA SILVA' THEN 77021594
WHEN c.nm_Contribuinte = 'MARIA LUCIA GONCALVES' THEN 77020875
WHEN c.nm_Contribuinte = 'MARIA LUCIENE SERAFIM DOS SANTOS' THEN 77021348
WHEN c.nm_Contribuinte = 'MARIA LUIZA DA COSTA' THEN 77021487
WHEN c.nm_Contribuinte = 'MARIA MACAMBANI' THEN 77020622
WHEN c.nm_Contribuinte = 'MARIA MALTA CARDOSO' THEN 77021757
WHEN c.nm_Contribuinte = 'MARIA MUNIZ DE OLIVEIRA' THEN 77021060
WHEN c.nm_Contribuinte = 'MARIA NEUZA GONÇALVES VIEIRA' THEN 77021397
WHEN c.nm_Contribuinte = 'MARIA NICOLAU DE SOUSA LEMES' THEN 77021567
WHEN c.nm_Contribuinte = 'MARIA NILZA SIEBRE' THEN 77021709
WHEN c.nm_Contribuinte = 'MARIA ORCELINA COELHO FERNANDES' THEN 77020793
WHEN c.nm_Contribuinte = 'MARIA PENHA GOMES DA SILVA' THEN 77020569
WHEN c.nm_Contribuinte = 'MARIA PEREIRA DE MACEDO' THEN 77021498
WHEN c.nm_Contribuinte = 'MARIA PRUDENCIO DA SILVA' THEN 77021491
WHEN c.nm_Contribuinte = 'MARIA RODRIGUES BRITO' THEN 77021632
WHEN c.nm_Contribuinte = 'MARIA ROSA SOARES DE MELO AMORIM' THEN 77021962
WHEN c.nm_Contribuinte = 'MARIA SENHORINHA GUEDES' THEN 77020742
WHEN c.nm_Contribuinte = 'MARIA SERAFIM BARBOSA' THEN 77021777
WHEN c.nm_Contribuinte = 'MARIA SIMOES DE LIMA CARVALHO' THEN 77021449
WHEN c.nm_Contribuinte = 'MARIA SIQUEIRA' THEN 77020363
WHEN c.nm_Contribuinte = 'MARIA SOARES DA ROCHA SILVA' THEN 77521007
WHEN c.nm_Contribuinte = 'MARIA SOARES DA ROCHA' THEN 77020714
WHEN c.nm_Contribuinte = 'MARIA SOARES DA ROCHA' THEN 77020879
WHEN c.nm_Contribuinte = 'MARIA SOARES DE SOUZA' THEN 77021968
WHEN c.nm_Contribuinte = 'MARIA TEXEIRA HERBST' THEN 77021982
WHEN c.nm_Contribuinte = 'MARIA VITOR ALVES' THEN 77021072
WHEN c.nm_Contribuinte = 'MARIANA DA COSTA BRANDAO' THEN 77020705
WHEN c.nm_Contribuinte = 'MARIANA DE CARVAHLO COUTRIM' THEN 77021622
WHEN c.nm_Contribuinte = 'MARILDA CAMPOS DA CUNHA' THEN 77021583
WHEN c.nm_Contribuinte = 'MARILEIDE ELIZABETE DE CARVALHO' THEN 77021402
WHEN c.nm_Contribuinte = 'MARILENE BEZERRA DA SILVA' THEN 77022001
WHEN c.nm_Contribuinte = 'MARILENE FERREIRA GOMES' THEN 77020722
WHEN c.nm_Contribuinte = 'MARILZA APARECIDA DE MORAES' THEN 77521129
WHEN c.nm_Contribuinte = 'MARILZA MACHADO' THEN 77021730
WHEN c.nm_Contribuinte = 'MARINA DOS ANJOS' THEN 77021734
end as idProprietario,
--------------------------------------------------------------------------------
CASE
when c.nm_Contribuinte = 'MARCIO  DE GOIS DA COSTA' THEN 10938369
when c.nm_Contribuinte = 'MARCIO ELIZIO DE CARVALHO' THEN 10935596
when c.nm_Contribuinte = 'MARCIO ELIZIO DE CARVALHO' THEN 10935649
when c.nm_Contribuinte = 'MARCIO ELIZIO DE CARVALHO' THEN 10935650
when c.nm_Contribuinte = 'MARCIO ELIZIO DE CARVALHO' THEN 10935685
when c.nm_Contribuinte = 'MARCIO FERREIRA DOS SANTOS' THEN 10933359
when c.nm_Contribuinte = 'MARCIO FERREIRA DOS SANTOS' THEN 10936146
when c.nm_Contribuinte = 'MARCONDES DE CARVALHO' THEN 10934893
when c.nm_Contribuinte = 'MARCONDES DE CARVALHO' THEN 10934908
when c.nm_Contribuinte = 'MARCONDES DE CARVALHO' THEN 10935595
when c.nm_Contribuinte = 'MARCOS ANTONIO RODRIGUES DA CRUZ' THEN 10934099
when c.nm_Contribuinte = 'MARCOS ANTONIO RODRIGUES DA CRUZ' THEN 10934158
when c.nm_Contribuinte = 'MARCOS ANTONIO RODRIGUES DA CRUZ' THEN 10934168
when c.nm_Contribuinte = 'MARCOS JANIO BLASI' THEN 10935354
when c.nm_Contribuinte = 'MARGARETE PEREIRA MARTINEZ' THEN 10935641
when c.nm_Contribuinte = 'MARGARETE PEREIRA MARTINEZ' THEN 10935663
when c.nm_Contribuinte = 'MARGARETE PEREIRA MARTINEZ' THEN 10935676
when c.nm_Contribuinte = 'MARGARETE PEREIRA MARTINEZ' THEN 10937992
when c.nm_Contribuinte = 'MARIA ADILEUZA RODRIGUES DE LIMA' THEN 10936267
when c.nm_Contribuinte = 'MARIA ANTONIA DE SOUZA' THEN 10937782
when c.nm_Contribuinte = 'MARIA ANTONIA DE SOUZA' THEN 10937797
when c.nm_Contribuinte = 'MARIA ANTONIA DE SOUZA' THEN 10937811
when c.nm_Contribuinte = 'MARIA ANTONIA DE SOUZA' THEN 10937875
when c.nm_Contribuinte = 'MARIA APARECIDA ALVES FRANCISCO' THEN 10938256
when c.nm_Contribuinte = 'MARIA APARECIDA ALVES FRANCISCO' THEN 10938264
when c.nm_Contribuinte = 'MARIA APARECIDA ALVES FRANCISCO' THEN 10938279
when c.nm_Contribuinte = 'MARIA APARECIDA ALVES FRANCISCO' THEN 10938283
when c.nm_Contribuinte = 'MARIA APARECIDA ALVES FRANCISCO' THEN 10938298
when c.nm_Contribuinte = 'MARIA APARECIDA DA SILVA OLIVEIRA' THEN 10937882
when c.nm_Contribuinte = 'MARIA APARECIDA DA SILVA OLIVEIRA' THEN 10937949
when c.nm_Contribuinte = 'MARIA APARECIDA DA SILVA OLIVEIRA' THEN 10937950
when c.nm_Contribuinte = 'MARIA APARECIDA DE ABREU BRANDAO' THEN 10934065
when c.nm_Contribuinte = 'MARIA APARECIDA DE ABREU BRANDAO' THEN 10936962
when c.nm_Contribuinte = 'MARIA APARECIDA DE ABREU BRANDAO' THEN 10937981
when c.nm_Contribuinte = 'MARIA APARECIDA DE ABREU BRANDAO' THEN 10938011
when c.nm_Contribuinte = 'MARIA APARECIDA DE ABREU BRANDAO' THEN 10938085
when c.nm_Contribuinte = 'MARIA APARECIDA DE AMORIM' THEN 10933643
when c.nm_Contribuinte = 'MARIA APARECIDA DE AMORIM' THEN 10933697
when c.nm_Contribuinte = 'MARIA APARECIDA DE AMORIM' THEN 10933711
when c.nm_Contribuinte = 'MARIA APARECIDA DE AMORIM' THEN 10933874
when c.nm_Contribuinte = 'MARIA APARECIDA DE AMORIM' THEN 10933913
when c.nm_Contribuinte = 'MARIA APARECIDA DE AMORIM' THEN 10933924
when c.nm_Contribuinte = 'MARIA APARECIDA DE AMORIM' THEN 10933972
when c.nm_Contribuinte = 'MARIA APARECIDA DE OLIVEIRA' THEN 10933516
when c.nm_Contribuinte = 'MARIA APARECIDA FILGUEIRAS DE ALMEIDA OLIVEIRA' THEN 10938289
when c.nm_Contribuinte = 'MARIA APARECIDA FILGUEIRAS DE ALMEIDA OLIVEIRA' THEN 10938302
when c.nm_Contribuinte = 'MARIA APARECIDA GOMES' THEN 10938379
when c.nm_Contribuinte = 'MARIA APARECIDA GOMES' THEN 10938400
when c.nm_Contribuinte = 'MARIA BARROS GOMES' THEN 10937836
when c.nm_Contribuinte = 'MARIA BARROS GOMES' THEN 10937930
when c.nm_Contribuinte = 'MARIA BARROS GOMES' THEN 10937948
when c.nm_Contribuinte = 'MARIA BATISTA DA CRUZ' THEN 10933320
when c.nm_Contribuinte = 'MARIA BATISTA DA CRUZ' THEN 10933327
when c.nm_Contribuinte = 'MARIA BATISTA DA CRUZ' THEN 10933337
when c.nm_Contribuinte = 'MARIA BATISTA DA CRUZ' THEN 10933344
when c.nm_Contribuinte = 'MARIA BATISTA DA CRUZ' THEN 10933346
when c.nm_Contribuinte = 'MARIA BATISTA DA CRUZ' THEN 10933364
when c.nm_Contribuinte = 'MARIA BATISTA DOS SANTOS' THEN 10937891
when c.nm_Contribuinte = 'MARIA BEATRIZ ELEUTERIO CEZINBA' THEN 10934042
when c.nm_Contribuinte = 'MARIA BENEDITO BRITO' THEN 10935095
when c.nm_Contribuinte = 'MARIA BENEDITO BRITO' THEN 10935119
when c.nm_Contribuinte = 'MARIA BENEDITO BRITO' THEN 10935120
when c.nm_Contribuinte = 'MARIA BENEDITO BRITO' THEN 10935130
when c.nm_Contribuinte = 'MARIA BENEDITO BRITO' THEN 10935164
when c.nm_Contribuinte = 'MARIA BENEDITO BRITO' THEN 10935165
when c.nm_Contribuinte = 'MARIA BENEDITO BRITO' THEN 10935184
when c.nm_Contribuinte = 'MARIA BENEDITO BRITO' THEN 10935204
when c.nm_Contribuinte = 'MARIA CORDEIRO BEZERRA' THEN 10936859
when c.nm_Contribuinte = 'MARIA CORDEIRO BEZERRA' THEN 10936860
when c.nm_Contribuinte = 'MARIA CORDEIRO BEZERRA' THEN 10936861
when c.nm_Contribuinte = 'MARIA CORDEIRO BEZERRA' THEN 10936862
when c.nm_Contribuinte = 'MARIA CORDEIRO BEZERRA' THEN 10936875
when c.nm_Contribuinte = 'MARIA CORDEIRO BEZERRA' THEN 10936889
when c.nm_Contribuinte = 'MARIA CORDEIRO BEZERRA' THEN 10936930
when c.nm_Contribuinte = 'MARIA CORDEIRO BEZERRA' THEN 10936947
when c.nm_Contribuinte = 'MARIA COSTA DE SOUZA' THEN 10938249
when c.nm_Contribuinte = 'MARIA COSTA DE SOUZA' THEN 10938278
when c.nm_Contribuinte = 'MARIA CREUZA SILVA BARBOSA' THEN 10936102
when c.nm_Contribuinte = 'MARIA CREUZA SILVA BARBOSA' THEN 10936121
when c.nm_Contribuinte = 'MARIA CREUZA SILVA BARBOSA' THEN 10936122
when c.nm_Contribuinte = 'MARIA DA CONCEICAO ALVES' THEN 10934479
when c.nm_Contribuinte = 'MARIA DA CONCEICAO ALVES' THEN 10934498
when c.nm_Contribuinte = 'MARIA DA CONCEICAO ALVES' THEN 10934535
when c.nm_Contribuinte = 'MARIA DA CONCEICAO ALVES' THEN 10934550
when c.nm_Contribuinte = 'MARIA DA CONCEICAO' THEN 10937823
when c.nm_Contribuinte = 'MARIA DA CONCEICAO' THEN 10937988
when c.nm_Contribuinte = 'MARIA DA CONCEICAO' THEN 10937858
when c.nm_Contribuinte = 'MARIA DA SILVA' THEN 10933830
when c.nm_Contribuinte = 'MARIA DA SILVA' THEN 10933914
when c.nm_Contribuinte = 'MARIA DA SILVA' THEN 10933837
when c.nm_Contribuinte = 'MARIA DAMACENO' THEN 10934898
when c.nm_Contribuinte = 'MARIA DAMACENO' THEN 10934980
when c.nm_Contribuinte = 'MARIA DAMACENO' THEN 10934955
when c.nm_Contribuinte = 'MARIA DAMACENO' THEN 10934991
when c.nm_Contribuinte = 'MARIA DAS DORES DA ROCHA' THEN 10936820
when c.nm_Contribuinte = 'MARIA DAS DORES DA ROCHA' THEN 10936873
when c.nm_Contribuinte = 'MARIA DAS DORES DA ROCHA' THEN 10936874
when c.nm_Contribuinte = 'MARIA DAS DORES MOREIRA SILVA' THEN 10935797
when c.nm_Contribuinte = 'MARIA DAS DORES MOREIRA SILVA' THEN 10935922
when c.nm_Contribuinte = 'MARIA DAS DORES MOREIRA SILVA' THEN 10935970
when c.nm_Contribuinte = 'MARIA DAS DORES RAFAEL FILOMENO' THEN 10936371
when c.nm_Contribuinte = 'MARIA DAS DORES RAFAEL FILOMENO' THEN 10936372
when c.nm_Contribuinte = 'MARIA DAS GRAÇAS ALEXANDRINO' THEN 10937319
when c.nm_Contribuinte = 'MARIA DAS GRAÇAS ALEXANDRINO' THEN 10937407
when c.nm_Contribuinte = 'MARIA DAS GRAÇAS DE JESUS' THEN 10933650
when c.nm_Contribuinte = 'MARIA DAS GRAÇAS DE JESUS' THEN 10935618
when c.nm_Contribuinte = 'MARIA DAS GRAÇAS DE JESUS' THEN 10935673
when c.nm_Contribuinte = 'MARIA DAS GRAÇAS DE JESUS' THEN 10935697
when c.nm_Contribuinte = 'MARIA DAS GRAÇAS RODRIGUES DOS ANGELOS' THEN 10933680
when c.nm_Contribuinte = 'MARIA DAS GRAÇAS RODRIGUES DOS ANGELOS' THEN 10933686
when c.nm_Contribuinte = 'MARIA DAS GRAÇAS RODRIGUES DOS ANGELOS' THEN 10933817
when c.nm_Contribuinte = 'MARIA DAS GRAÇAS RODRIGUES DOS ANGELOS' THEN 10938270
when c.nm_Contribuinte = 'MARIA DE FATIIMA ALVES VITOR' THEN 10933338
when c.nm_Contribuinte = 'MARIA DE FATIIMA ALVES VITOR' THEN 10933350
when c.nm_Contribuinte = 'MARIA DE FATIIMA ALVES VITOR' THEN 10933374
when c.nm_Contribuinte = 'MARIA DE FATIMA DE GOUVEA' THEN 10938144
when c.nm_Contribuinte = 'MARIA DE FATIMA DE GOUVEA' THEN 10938164
when c.nm_Contribuinte = 'MARIA DE FATIMA GOUVEA' THEN 10933582
when c.nm_Contribuinte = 'MARIA DE FATIMA GOUVEA' THEN 10933614
when c.nm_Contribuinte = 'MARIA DE FATIMA GOUVEA' THEN 10933633
when c.nm_Contribuinte = 'MARIA DE FATIMA GOUVEA' THEN 10933639
when c.nm_Contribuinte = 'MARIA DE FATIMA GOUVEA' THEN 10934241
when c.nm_Contribuinte = 'MARIA DE FATIMA GOUVEA' THEN 10934242
when c.nm_Contribuinte = 'MARIA DE FATIMA GOUVEA' THEN 10934253
when c.nm_Contribuinte = 'MARIA DE FATIMA GOUVEA' THEN 10934287
when c.nm_Contribuinte = 'MARIA DE FATIMA GOUVEA' THEN 10937691
when c.nm_Contribuinte = 'MARIA DE FATIMA PEREIRA DA SILVA SANTOS' THEN 10934843
when c.nm_Contribuinte = 'MARIA DE FATIMA PEREIRA DA SILVA SANTOS' THEN 10935047
when c.nm_Contribuinte = 'MARIA DE FATIMA PEREIRA' THEN 10934583
when c.nm_Contribuinte = 'MARIA DE FATIMA PEREIRA' THEN 10934653
when c.nm_Contribuinte = 'MARIA DE FATIMA PEREIRA' THEN 10937483
when c.nm_Contribuinte = 'MARIA DE FATIMA PEREIRA' THEN 10937533
when c.nm_Contribuinte = 'MARIA DE FATIMA PEREIRA' THEN 10937575
when c.nm_Contribuinte = 'MARIA DE JESUS' THEN 10937343
when c.nm_Contribuinte = 'MARIA DE JESUS' THEN 10937409
when c.nm_Contribuinte = 'MARIA DE JESUS' THEN 10937425
when c.nm_Contribuinte = 'MARIA DE JESUS' THEN 10937444
when c.nm_Contribuinte = 'MARIA DE JESUS' THEN 10937320
when c.nm_Contribuinte = 'MARIA DE OLIVEIRA ALVES' THEN 10935635
when c.nm_Contribuinte = 'MARIA DE OLIVEIRA ALVES' THEN 10935656
when c.nm_Contribuinte = 'MARIA DE OLIVEIRA ALVES' THEN 10935667
when c.nm_Contribuinte = 'MARIA DO CARMO ALVES' THEN 10936030
when c.nm_Contribuinte = 'MARIA DO CARMO ALVES' THEN 10936045
when c.nm_Contribuinte = 'MARIA DO CARMO ALVES' THEN 10936068
when c.nm_Contribuinte = 'MARIA DO CARMO RODRIGUES DE CARVALHO SANTOS' THEN 10934742
when c.nm_Contribuinte = 'MARIA DO CARMO RODRIGUES DE CARVALHO SANTOS' THEN 10934794
when c.nm_Contribuinte = 'MARIA DO CARMO RODRIGUES DE CARVALHO SANTOS' THEN 10934795
when c.nm_Contribuinte = 'MARIA DO CARMO RODRIGUES DE CARVALHO SANTOS' THEN 10934813
when c.nm_Contribuinte = 'MARIA DO CARMO RODRIGUES DE CARVALHO SANTOS' THEN 10934814
when c.nm_Contribuinte = 'MARIA DO CARMO RODRIGUES DE CARVALHO SANTOS' THEN 10934825
when c.nm_Contribuinte = 'MARIA DO CARMO RODRIGUES DE CARVALHO SANTOS' THEN 10934826
when c.nm_Contribuinte = 'MARIA DO CARMO RODRIGUES DE CARVALHO SANTOS' THEN 10934844
when c.nm_Contribuinte = 'MARIA DOS ANJOS PEREIRA DE AGUIAR' THEN 10936058
when c.nm_Contribuinte = 'MARIA DOS ANJOS PEREIRA DE AGUIAR' THEN 10936171
when c.nm_Contribuinte = 'MARIA DOS ANJOS PEREIRA DE AGUIAR' THEN 10936207
when c.nm_Contribuinte = 'MARIA DOS ANJOS PEREIRA DE AGUIAR' THEN 10936208
when c.nm_Contribuinte = 'MARIA DOS ANJOS PEREIRA DE AGUIAR' THEN 10936892
when c.nm_Contribuinte = 'MARIA DUARTE DA COSTA' THEN 10936298
when c.nm_Contribuinte = 'MARIA DUARTE DA COSTA' THEN 10936321
when c.nm_Contribuinte = 'MARIA DUARTE DA COSTA' THEN 10936339
when c.nm_Contribuinte = 'MARIA DUARTE DA COSTA' THEN 10936426
when c.nm_Contribuinte = 'MARIA DUARTE DA COSTA' THEN 10936444
when c.nm_Contribuinte = 'MARIA DUARTE DA COSTA' THEN 10936445
when c.nm_Contribuinte = 'MARIA ELIANE FERRARI' THEN 10936363
when c.nm_Contribuinte = 'MARIA ELIANE FERRARI' THEN 10936451
when c.nm_Contribuinte = 'MARIA ELIANE FERRARI' THEN 10936544
when c.nm_Contribuinte = 'MARIA FERNANDES DOS SANTOS' THEN 10936938
when c.nm_Contribuinte = 'MARIA FERNANDES DOS SANTOS' THEN 10936992
when c.nm_Contribuinte = 'MARIA FERNANDES DOS SANTOS' THEN 10937028
when c.nm_Contribuinte = 'MARIA FRANCISCA DA SILVA' THEN 10937100
when c.nm_Contribuinte = 'MARIA FRANCISCA DA SILVA' THEN 10937101
when c.nm_Contribuinte = 'MARIA FRANCISCA DA SILVA' THEN 10937149
when c.nm_Contribuinte = 'MARIA GUIHERME PAULINO' THEN 10938262
when c.nm_Contribuinte = 'MARIA GUIHERME PAULINO' THEN 10938293
when c.nm_Contribuinte = 'MARIA GUIHERME PAULINO' THEN 10938318
when c.nm_Contribuinte = 'MARIA JANIA BASTOS DE JESUS' THEN 10938261
when c.nm_Contribuinte = 'MARIA JANIA BASTOS DE JESUS' THEN 10938402
when c.nm_Contribuinte = 'MARIA JOSE CAVALCANTE DA SILVA' THEN 10933745
when c.nm_Contribuinte = 'MARIA JOSE CAVALCANTE DA SILVA' THEN 10933773
when c.nm_Contribuinte = 'MARIA JOSE CAVALCANTE DA SILVA' THEN 10933809
when c.nm_Contribuinte = 'MARIA JOSE DA COSTA' THEN 10936703
when c.nm_Contribuinte = 'MARIA JOSE DA COSTA' THEN 10936733
when c.nm_Contribuinte = 'MARIA JOSE DA COSTA' THEN 10936769
when c.nm_Contribuinte = 'MARIA JOSE DA COSTA' THEN 10936824
when c.nm_Contribuinte = 'MARIA JOSE DOS SANTOS' THEN 10934617
when c.nm_Contribuinte = 'MARIA JOSE DOS SANTOS' THEN 10934671
when c.nm_Contribuinte = 'MARIA JOSE DOS SANTOS' THEN 10934688
when c.nm_Contribuinte = 'MARIA JOSE DOS SANTOS' THEN 10937508
when c.nm_Contribuinte = 'MARIA JOSE NICOLAU DE SOUSA' THEN 10933595
when c.nm_Contribuinte = 'MARIA JOSE NICOLAU DE SOUSA' THEN 10933601
when c.nm_Contribuinte = 'MARIA JOSE NICOLAU DE SOUSA' THEN 10933624
when c.nm_Contribuinte = 'MARIA LAURENÇO DE ABREU' THEN 10938053
when c.nm_Contribuinte = 'MARIA LAURENÇO DE ABREU' THEN 10938105
when c.nm_Contribuinte = 'MARIA LOPES PEREIRA' THEN 10935252
when c.nm_Contribuinte = 'MARIA LOPES PEREIRA' THEN 10935286
when c.nm_Contribuinte = 'MARIA LOURENÇO DA SILVA' THEN 10937496
when c.nm_Contribuinte = 'MARIA LUCIA GONCALVES' THEN 10936601
when c.nm_Contribuinte = 'MARIA LUCIA GONCALVES' THEN 10936652
when c.nm_Contribuinte = 'MARIA LUCIA GONCALVES' THEN 10936704
when c.nm_Contribuinte = 'MARIA LUCIENE SERAFIM DOS SANTOS' THEN 10933564
when c.nm_Contribuinte = 'MARIA LUCIENE SERAFIM DOS SANTOS' THEN 10933621
when c.nm_Contribuinte = 'MARIA LUCIENE SERAFIM DOS SANTOS' THEN 10933626
when c.nm_Contribuinte = 'MARIA LUIZA DA COSTA' THEN 10935200
when c.nm_Contribuinte = 'MARIA LUIZA DA COSTA' THEN 10935202
when c.nm_Contribuinte = 'MARIA LUIZA DA COSTA' THEN 10935467
when c.nm_Contribuinte = 'MARIA LUIZA DA COSTA' THEN 10935487
when c.nm_Contribuinte = 'MARIA LUIZA DA COSTA' THEN 10935525
when c.nm_Contribuinte = 'MARIA LUIZA DA COSTA' THEN 10935707
when c.nm_Contribuinte = 'MARIA MALTA CARDOSO' THEN 10933534
when c.nm_Contribuinte = 'MARIA MUNIZ DE OLIVEIRA' THEN 10933819
when c.nm_Contribuinte = 'MARIA MUNIZ DE OLIVEIRA' THEN 10933820
when c.nm_Contribuinte = 'MARIA MUNIZ DE OLIVEIRA' THEN 10933868
when c.nm_Contribuinte = 'MARIA NEUZA GONÇALVES VIEIRA' THEN 10937510
when c.nm_Contribuinte = 'MARIA NICOLAU DE SOUSA LEMES' THEN 10933586
when c.nm_Contribuinte = 'MARIA NICOLAU DE SOUSA LEMES' THEN 10933619
when c.nm_Contribuinte = 'MARIA NICOLAU DE SOUSA LEMES' THEN 10933710
when c.nm_Contribuinte = 'MARIA NILZA SIEBRE' THEN 10937148
when c.nm_Contribuinte = 'MARIA NILZA SIEBRE' THEN 10937538
when c.nm_Contribuinte = 'MARIA NILZA SIEBRE' THEN 10937539
when c.nm_Contribuinte = 'MARIA NILZA SIEBRE' THEN 10938313
when c.nm_Contribuinte = 'MARIA ORCELINA COELHO FERNANDES' THEN 10936202
when c.nm_Contribuinte = 'MARIA ORCELINA COELHO FERNANDES' THEN 10936253
when c.nm_Contribuinte = 'MARIA ORCELINA COELHO FERNANDES' THEN 10936275
when c.nm_Contribuinte = 'MARIA ORCELINA COELHO FERNANDES' THEN 10936286
when c.nm_Contribuinte = 'MARIA ORCELINA COELHO FERNANDES' THEN 10936287
when c.nm_Contribuinte = 'MARIA ORCELINA COELHO FERNANDES' THEN 10936306
when c.nm_Contribuinte = 'MARIA ORCELINA COELHO FERNANDES' THEN 10936325
when c.nm_Contribuinte = 'MARIA ORCELINA COELHO FERNANDES' THEN 10937637
when c.nm_Contribuinte = 'MARIA ORCELINA COELHO FERNANDES' THEN 10937768
when c.nm_Contribuinte = 'MARIA ORCELINA COELHO FERNANDES' THEN 10937769
when c.nm_Contribuinte = 'MARIA PENHA GOMES DA SILVA' THEN 10934261
when c.nm_Contribuinte = 'MARIA PENHA GOMES DA SILVA' THEN 10934276
when c.nm_Contribuinte = 'MARIA PENHA GOMES DA SILVA' THEN 10934291
when c.nm_Contribuinte = 'MARIA PENHA GOMES DA SILVA' THEN 10934292
when c.nm_Contribuinte = 'MARIA PENHA GOMES DA SILVA' THEN 10934305
when c.nm_Contribuinte = 'MARIA PENHA GOMES DA SILVA' THEN 10934306
when c.nm_Contribuinte = 'MARIA PEREIRA DE MACEDO' THEN 10935462
when c.nm_Contribuinte = 'MARIA PRUDENCIO DA SILVA' THEN 10933954
when c.nm_Contribuinte = 'MARIA PRUDENCIO DA SILVA' THEN 10933983
when c.nm_Contribuinte = 'MARIA PRUDENCIO DA SILVA' THEN 10934132
when c.nm_Contribuinte = 'MARIA RODRIGUES BRITO' THEN 10937570
when c.nm_Contribuinte = 'MARIA ROSA SOARES DE MELO AMORIM' THEN 10935780
when c.nm_Contribuinte = 'MARIA ROSA SOARES DE MELO AMORIM' THEN 10935873
when c.nm_Contribuinte = 'MARIA ROSA SOARES DE MELO AMORIM' THEN 10935901
when c.nm_Contribuinte = 'MARIA ROSA SOARES DE MELO AMORIM' THEN 10935902
when c.nm_Contribuinte = 'MARIA ROSA SOARES DE MELO AMORIM' THEN 10935914
when c.nm_Contribuinte = 'MARIA SENHORINHA GUEDES' THEN 10935783
when c.nm_Contribuinte = 'MARIA SENHORINHA GUEDES' THEN 10935930
when c.nm_Contribuinte = 'MARIA SENHORINHA GUEDES' THEN 10935931
when c.nm_Contribuinte = 'MARIA SENHORINHA GUEDES' THEN 10936439
when c.nm_Contribuinte = 'MARIA SENHORINHA GUEDES' THEN 10936453
when c.nm_Contribuinte = 'MARIA SENHORINHA GUEDES' THEN 10936491
when c.nm_Contribuinte = 'MARIA SERAFIM BARBOSA' THEN 10934393
when c.nm_Contribuinte = 'MARIA SERAFIM BARBOSA' THEN 10934394
when c.nm_Contribuinte = 'MARIA SERAFIM BARBOSA' THEN 10934431
when c.nm_Contribuinte = 'MARIA SERAFIM BARBOSA' THEN 10934453
when c.nm_Contribuinte = 'MARIA SERAFIM BARBOSA' THEN 10934454
when c.nm_Contribuinte = 'MARIA SIMOES DE LIMA CARVALHO' THEN 10936396
when c.nm_Contribuinte = 'MARIA SIMOES DE LIMA CARVALHO' THEN 10936397
when c.nm_Contribuinte = 'MARIA SIMOES DE LIMA CARVALHO' THEN 10936506
when c.nm_Contribuinte = 'MARIA SIQUEIRA' THEN 10933331
when c.nm_Contribuinte = 'MARIA SIQUEIRA' THEN 10933334
when c.nm_Contribuinte = 'MARIA SIQUEIRA' THEN 10933333
when c.nm_Contribuinte = 'MARIA SOARES DA ROCHA' THEN 10936423
when c.nm_Contribuinte = 'MARIA SOARES DA ROCHA' THEN 10936480
when c.nm_Contribuinte = 'MARIA SOARES DA ROCHA' THEN 10936556
when c.nm_Contribuinte = 'MARIA SOARES DA ROCHA' THEN 10936557
when c.nm_Contribuinte = 'MARIA SOARES DE SOUZA' THEN 10936234
when c.nm_Contribuinte = 'MARIA SOARES DE SOUZA' THEN 10936305
when c.nm_Contribuinte = 'MARIA TEXEIRA HERBST' THEN 10938046
when c.nm_Contribuinte = 'MARIA TEXEIRA HERBST' THEN 10938047
when c.nm_Contribuinte = 'MARIA TEXEIRA HERBST' THEN 10938064
when c.nm_Contribuinte = 'MARIA TEXEIRA HERBST' THEN 10938065
when c.nm_Contribuinte = 'MARIA VITOR ALVES' THEN 10935869
when c.nm_Contribuinte = 'MARIA VITOR ALVES' THEN 10935789
when c.nm_Contribuinte = 'MARIA VITOR ALVES' THEN 10935772
when c.nm_Contribuinte = 'MARIA VITOR ALVES' THEN 10935831
when c.nm_Contribuinte = 'MARIA VITOR ALVES' THEN 10935870
when c.nm_Contribuinte = 'MARIA VITOR ALVES' THEN 10933611
when c.nm_Contribuinte = 'MARIA VITOR ALVES' THEN 10933590
when c.nm_Contribuinte = 'MARIA VITOR ALVES' THEN 10933538
when c.nm_Contribuinte = 'MARIA VITOR ALVES' THEN 10933499
when c.nm_Contribuinte = 'MARIA VITOR ALVES' THEN 10936057
when c.nm_Contribuinte = 'MARIA VITOR ALVES' THEN 10936588
when c.nm_Contribuinte = 'MARIA VITOR ALVES' THEN 10936624
when c.nm_Contribuinte = 'MARIA VITOR ALVES' THEN 10936458
when c.nm_Contribuinte = 'MARIANA DE CARVAHLO COUTRIM' THEN 10936373
when c.nm_Contribuinte = 'MARILDA CAMPOS DA CUNHA' THEN 10938280
when c.nm_Contribuinte = 'MARILDA CAMPOS DA CUNHA' THEN 10938300
when c.nm_Contribuinte = 'MARILDA CAMPOS DA CUNHA' THEN 10938350
when c.nm_Contribuinte = 'MARILEIDE ELIZABETE DE CARVALHO' THEN 10934834
when c.nm_Contribuinte = 'MARILEIDE ELIZABETE DE CARVALHO' THEN 10934874
when c.nm_Contribuinte = 'MARILENE BEZERRA DA SILVA' THEN 10935758
when c.nm_Contribuinte = 'MARILENE BEZERRA DA SILVA' THEN 10935759
when c.nm_Contribuinte = 'MARILENE BEZERRA DA SILVA' THEN 10935804
when c.nm_Contribuinte = 'MARILENE BEZERRA DA SILVA' THEN 10935824
when c.nm_Contribuinte = 'MARILENE FERREIRA GOMES' THEN 10935622
when c.nm_Contribuinte = 'MARILENE FERREIRA GOMES' THEN 10935623
when c.nm_Contribuinte = 'MARILENE FERREIRA GOMES' THEN 10935760
when c.nm_Contribuinte = 'MARILENE FERREIRA GOMES' THEN 10935785
when c.nm_Contribuinte = 'MARILENE FERREIRA GOMES' THEN 10935844
when c.nm_Contribuinte = 'MARILENE FERREIRA GOMES' THEN 10935845
when c.nm_Contribuinte = 'MARILZA MACHADO' THEN 10938412
when c.nm_Contribuinte = 'MARILZA MACHADO' THEN 10938345
when c.nm_Contribuinte = 'MARINA DOS ANJOS' THEN 10938419
when c.nm_Contribuinte = 'MARINA DOS ANJOS' THEN 10938388
end as idTransferenciaImoveis
	FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
	) AS transfImoveisItens
from IPTUBicImoveis imoveis
JOIN CECAMContribuintes c ON c.cd_Contribuinte = imoveis.cd_Proprietario;
`;
        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData
            .filter(record => {
                const transfImoveisItens = JSON.parse(record.transfImoveisItens);

                // Retorna true apenas para registros com idProprietario presente
                if (!transfImoveisItens.idProprietario) {
                    console.warn('Registro ignorado: idProprietario ausente', record);
                    return false;
                }
                return true;
            })
            .map(record => {

                // Parse JSON string for transfImoveisItens
                const transfImoveisItens = JSON.parse(record.transfImoveisItens);

                return {
                    idIntegracao: record.idIntegracao.toString(),
                    transfImoveisItens: {
                        idImoveis: transfImoveisItens.idImoveis,
                        idMotivos: transfImoveisItens.idMotivos,
                        idProprietario: transfImoveisItens.idProprietario,
                        idTransferenciaImoveis: transfImoveisItens.idTransferenciaImoveis,
                        vlAreaConstruidaUnidade: transfImoveisItens.vlAreaConstruidaUnidade,
                        vlAreaTotalTerrenoUnidade: transfImoveisItens.vlAreaTotalTerrenoUnidade,
                        vlVenalConstruidoUnidade: transfImoveisItens.vlVenalConstruidoUnidade,
                        vlVenalTerritorialUnidade: transfImoveisItens.vlVenalTerritorialUnidade,
                        vlVenalUnidade: transfImoveisItens.vlVenalUnidade,
                        benfeitorias: transfImoveisItens.benfeitorias,
                        financiado: transfImoveisItens.financiado,
                        outros: transfImoveisItens.outros,
                        tipoVenda: transfImoveisItens.tipoVenda,
                        unidadeFutura: 'SIM',
                        benfeitorias: "SIM",
                        financiado: "SIM",
                        outros: "SIM",
                        tipoVenda: "PARCIAL",
                    }
                };
            });

        /* const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        return */

        const chunkArray = (array, size) => {
            const chunked = [];
            for (let i = 0; i < array.length; i += size) {
                chunked.push(array.slice(i, i + size));
            }
            return chunked;
        };

        const batchedData = chunkArray(transformedData, 50);
        let report = [];
        let reportIds = [];

        for (const batch of batchedData) {
            try {
                console.log('Enviando o seguinte corpo para a API:', JSON.stringify(batch, null, 2));

                const response = await fetch(`https://tributos.betha.cloud/service-layer-tributos/api/transfImoveisItens`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                    },
                    body: JSON.stringify(batch)
                });

                const responseBody = await response.json();
                console.log('Resposta da API:', responseBody);

                if (response.ok) {
                    console.log('Dados enviados com sucesso para a API.');
                    batch.forEach(record => {
                        report.push({ record, status: 'success', response: responseBody });
                    });

                    if (responseBody.idLote) {
                        reportIds.push(responseBody.idLote);
                    } else if (responseBody.id) {
                        reportIds.push(responseBody.id);
                    }
                } else {
                    console.error('Erro ao enviar os dados para a API:', response.statusText);
                    batch.forEach(record => {
                        report.push({ record, status: 'failed', response: responseBody });
                    });
                }
            } catch (err) {
                console.error('Erro ao enviar o batch para a API:', err);
                batch.forEach(record => {
                    report.push({ record, status: 'error', error: err.message });
                });
            }
        }

        // Save report and IDs to files
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));
        console.log('Relatório salvo em report.json com sucesso.');

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