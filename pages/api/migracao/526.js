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
ROW_NUMBER() OVER (ORDER BY PC.cd_cecam) AS idIntegracao,
JSON_QUERY((SELECT case
                                        when EV.ds_razaosocial = 'ALBERTO MARCELO C FACHINI' and (TX.ds_taxa = 'RECEITA DIVERSA' or PP.ds_taxa = 'RECEITA DIVERSA' ) then 140216174
when EV.ds_razaosocial = 'ASSOCIACAO DOS PRODUTORES RURAIS DO ASSENTAMENTO CORREGO RICO - APRUACOR' and (TX.ds_taxa = 'RECEITA DIVERSA' or PP.ds_taxa = 'RECEITA DIVERSA' ) then 137743793
when EV.ds_razaosocial = 'D. A. BOTELHO' and (TX.ds_taxa = 'RECEITA DIVERSA' or PP.ds_taxa = 'RECEITA DIVERSA' ) then 137741316
when EV.ds_razaosocial = 'CAIXA ECONÔMICA FEDERAL' and (TX.ds_taxa = 'RECEITA DIVERSA' or PP.ds_taxa = 'RECEITA DIVERSA' ) then 138729233
when EV.ds_razaosocial = 'CAIXA ECONÔMICA FEDERAL' and (TX.ds_taxa = 'RECEITA DIVERSA' or PP.ds_taxa = 'RECEITA DIVERSA' ) then 138754553
when EV.ds_razaosocial = 'SISPEL SISTEMAS INTEGRADOS DE SOFTWER LTDA-EPP' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490433
when EV.ds_razaosocial = 'SISPEL SISTEMAS INTEGRADOS DE SOFTWER LTDA-EPP' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490434
when EV.ds_razaosocial = 'SISPEL SISTEMAS INTEGRADOS DE SOFTWER LTDA-EPP' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490435
when EV.ds_razaosocial = 'MOZAIR BEIJO DE ANDRADE' and (TX.ds_taxa = 'TAXA DE FISCALIZAÇAO E FUNCIONAMENTO' or PP.ds_taxa = 'TAXA DE FISCALIZAÇAO E FUNCIONAMENTO' ) then 140490436
when EV.ds_razaosocial = 'SISPEL SISTEMAS INTEGRADOS DE SOFTWER LTDA-EPP' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490437
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490438
when EV.ds_razaosocial = 'SISPEL SISTEMAS INTEGRADOS DE SOFTWER LTDA-EPP' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490439
when EV.ds_razaosocial = 'SISPEL SISTEMAS INTEGRADOS DE SOFTWER LTDA-EPP' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490440
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490441
when EV.ds_razaosocial = 'SISPEL SISTEMAS INTEGRADOS DE SOFTWER LTDA-EPP' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490442
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490443
when EV.ds_razaosocial = 'SISPEL SISTEMAS INTEGRADOS DE SOFTWER LTDA-EPP' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490444
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490445
when EV.ds_razaosocial = 'SISPEL SISTEMAS INTEGRADOS DE SOFTWER LTDA-EPP' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490446
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490447
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490448
when EV.ds_razaosocial = 'SISPEL SISTEMAS INTEGRADOS DE SOFTWER LTDA-EPP' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490449
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490450
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490451
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490452
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490453
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'OUTRAS RECEITAS ' or PP.ds_taxa = 'OUTRAS RECEITAS ' ) then 140490454
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'RESTITUIÇÃO DE VAL.JUDICIAL ALEXANDRE' or PP.ds_taxa = 'RESTITUIÇÃO DE VAL.JUDICIAL ALEXANDRE' ) then 140490455
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'OUTRAS RECEITAS ' or PP.ds_taxa = 'OUTRAS RECEITAS ' ) then 140490456
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490457
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490458
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490459
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490460
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490461
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490462
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490463
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490464
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'OUTRAS RECEITAS ' or PP.ds_taxa = 'OUTRAS RECEITAS ' ) then 140490465
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490466
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490467
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490468
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490469
when EV.ds_razaosocial = 'ENERGISA RONDONIA - DISTRIBUIDORA DE ENERGIA S.A' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490470
when EV.ds_razaosocial = 'COMERCIO DE ALIMENTOS EXTRA LTDA-ME' and (TX.ds_taxa = '' or PP.ds_taxa = '' ) then 140490471
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490472
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490473
when EV.ds_razaosocial = 'OLERIS FAUSTINO DE JESUS' and (TX.ds_taxa = 'TAXA DE HORA MAQUINA' or PP.ds_taxa = 'TAXA DE HORA MAQUINA' ) then 140490474
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490475
when EV.ds_razaosocial = 'CLAUDINEI ARAUJO DA SILVA' and (TX.ds_taxa = 'ITBI' or PP.ds_taxa = 'ITBI' ) then 140490476
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490477
when EV.ds_razaosocial = 'CLETO APOLINARIO DA CRUZ' and (TX.ds_taxa = 'TAXA DE HORA MAQUINA' or PP.ds_taxa = 'TAXA DE HORA MAQUINA' ) then 140490478
when EV.ds_razaosocial = 'COMERCIO DE ALIMENTOS EXTRA LTDA-ME' and (TX.ds_taxa = 'TAXA DE FISCALIZAÇAO E FUNCIONAMENTO' or PP.ds_taxa = 'TAXA DE FISCALIZAÇAO E FUNCIONAMENTO' ) then 140490479
when EV.ds_razaosocial = 'JAIR JOSE DE ANDRADE' and (TX.ds_taxa = 'TAXA DE HORA MAQUINA' or PP.ds_taxa = 'TAXA DE HORA MAQUINA' ) then 140490480
when EV.ds_razaosocial = 'CR CONSTRUTORA E SERVICOS ESPECIALIZADOS LTDA' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490481
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490482
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490483
when EV.ds_razaosocial = 'DANIEL BARBOSA DA SILVA' and (TX.ds_taxa = 'TAXA DE FISCALIZAÇAO E FUNCIONAMENTO' or PP.ds_taxa = 'TAXA DE FISCALIZAÇAO E FUNCIONAMENTO' ) then 140490484
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490485
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490486
when EV.ds_razaosocial = 'JOSE ANGELIM VENTURIM' and (TX.ds_taxa = 'TAXA DE HORA MAQUINA' or PP.ds_taxa = 'TAXA DE HORA MAQUINA' ) then 140490487
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490493
when EV.ds_razaosocial = 'MARIA DE FATIMA PEREIRA' and (TX.ds_taxa = 'TAXA DE HORA MAQUINA' or PP.ds_taxa = 'TAXA DE HORA MAQUINA' ) then 140490494
when EV.ds_razaosocial = 'PAULO ROBERTO NUNES' and (TX.ds_taxa = 'TAXA DE HORA MAQUINA' or PP.ds_taxa = 'TAXA DE HORA MAQUINA' ) then 140490495
when EV.ds_razaosocial = 'RENIVALDO BEZERRA' and (TX.ds_taxa = 'RENIVALDO BEZERRA . CERT. 00558/22/TCE-RO' or PP.ds_taxa = 'RENIVALDO BEZERRA . CERT. 00558/22/TCE-RO' ) then 140490496
when EV.ds_razaosocial = 'PAULO CESAR BEZERRA' and (TX.ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  866/19' or PP.ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  866/19' ) then 140490497
when EV.ds_razaosocial = 'TOMAS EDSON SETTE' and (TX.ds_taxa = 'TAXA DE HORA MAQUINA' or PP.ds_taxa = 'TAXA DE HORA MAQUINA' ) then 140490498
when EV.ds_razaosocial = 'MFM SOLUCOES AMBIENTAIS E GESTAO DE RESIDUOS LTDA' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490499
when EV.ds_razaosocial = 'CLAUDINEI DIONISIO DE LIMA ' and (TX.ds_taxa = 'TAXA DE HORA MAQUINA' or PP.ds_taxa = 'TAXA DE HORA MAQUINA' ) then 140490500
when EV.ds_razaosocial = 'CAMARA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490501
when EV.ds_razaosocial = 'LOURIVAL BEZERRA DA SILVA' and (TX.ds_taxa = 'TAXA HORA MAQUINA TRATOR ' or PP.ds_taxa = 'TAXA HORA MAQUINA TRATOR ' ) then 140490502
when EV.ds_razaosocial = 'ADIR IGNACIO LIMA' and (TX.ds_taxa = 'ADIR IGNACIO LIMA ' or PP.ds_taxa = 'ADIR IGNACIO LIMA ' ) then 140490503
when EV.ds_razaosocial = 'FRIMON CONSTRUÇÕES E SERVIÇOS EIRELI EPP' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490504
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490505
when EV.ds_razaosocial = 'MAXUEL NICOLAU DE SOUZA CONTE' and (TX.ds_taxa = 'TAXA DE HORA MAQUINA' or PP.ds_taxa = 'TAXA DE HORA MAQUINA' ) then 140490506
when EV.ds_razaosocial = 'VALMIR GOMES DA SILVA' and (TX.ds_taxa = 'TAXA DE HORA MAQUINA' or PP.ds_taxa = 'TAXA DE HORA MAQUINA' ) then 140490507
when EV.ds_razaosocial = 'CAMARA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490488
when EV.ds_razaosocial = 'CAMARA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490489
when EV.ds_razaosocial = 'BELIZARIO DA SILVA FRAGA' and (TX.ds_taxa = 'HORARIO ESPECIAL' or PP.ds_taxa = 'HORARIO ESPECIAL' ) then 140490490
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490491
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'RESTITUIÇÃO DE VAL.JUDICIAL ALEXANDRE' or PP.ds_taxa = 'RESTITUIÇÃO DE VAL.JUDICIAL ALEXANDRE' ) then 140490492
when EV.ds_razaosocial = 'LORIVALDO SILVEIRA' and (TX.ds_taxa = 'ITBI' or PP.ds_taxa = 'ITBI' ) then 140490513
when EV.ds_razaosocial = 'MOACIR ALTANAZIO' and (TX.ds_taxa = 'TAXA DE HORA MAQUINA' or PP.ds_taxa = 'TAXA DE HORA MAQUINA' ) then 140490514
when EV.ds_razaosocial = 'JOCIELLE DOS SANTOS ANACLETO' and (TX.ds_taxa = 'TAXA DE HORA MAQUINA' or PP.ds_taxa = 'TAXA DE HORA MAQUINA' ) then 140490515
when EV.ds_razaosocial = 'ADIR IGNACIO LIMA' and (TX.ds_taxa = ' ADIR IGNÁCIO LIMA - MULTA -  INSC. ' or PP.ds_taxa = ' ADIR IGNÁCIO LIMA - MULTA -  INSC. ' ) then 140490516
when EV.ds_razaosocial = 'CODRASA COMERCIO E CONSTRUÇÕES LTDA ME' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490517
when EV.ds_razaosocial = 'JOSE CARLOS FALCÃO' and (TX.ds_taxa = 'TAXA DE HORA MAQUINA' or PP.ds_taxa = 'TAXA DE HORA MAQUINA' ) then 140490518
when EV.ds_razaosocial = 'MARCONDES DE CARVALHO' and (TX.ds_taxa = 'MARCONDES DE CARVALHO CERT. 00049/23/TCE-RO- PROC. 1553/2023' or PP.ds_taxa = 'MARCONDES DE CARVALHO CERT. 00049/23/TCE-RO- PROC. 1553/2023' ) then 140490519
when EV.ds_razaosocial = 'MJ ENGENHARIA LTDA' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490520
when EV.ds_razaosocial = 'JOAQUIM NICOLAU DE SOUZA NETO' and (TX.ds_taxa = 'ITBI' or PP.ds_taxa = 'ITBI' ) then 140490521
when EV.ds_razaosocial = 'M N SERVIÇO LTDA' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490522
when EV.ds_razaosocial = 'CHRISTIAN CONSULTORIA E ASSESSORIA EMPRESARIAL LTDA' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490523
when EV.ds_razaosocial = 'MAMORE COMERCIO CONSTRUCTION LTDA' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490524
when EV.ds_razaosocial = 'NIVALDO NOGUEIRA DO NASCIMENTO' and (TX.ds_taxa = 'ITBI' or PP.ds_taxa = 'ITBI' ) then 140490525
when EV.ds_razaosocial = 'DATAPLEX TECNOLOGIA E GESTÃO LTDA' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490526
when EV.ds_razaosocial = 'PAULO CESAR BEZERRA' and (TX.ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  866/19' or PP.ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  866/19' ) then 140490527
when EV.ds_razaosocial = 'RUTH CHRISOSTHEMOS SOARES ' and (TX.ds_taxa = 'TAXA DE HORA MAQUINA' or PP.ds_taxa = 'TAXA DE HORA MAQUINA' ) then 140490528
when EV.ds_razaosocial = 'MARIA CELIA DA SILVA LOPES ' and (TX.ds_taxa = 'TAXA CAMINHAO CAÇAMBA TRUCADO ' or PP.ds_taxa = 'TAXA CAMINHAO CAÇAMBA TRUCADO ' ) then 140490529
when EV.ds_razaosocial = 'BA LUZ INDUSTRIA E COMERCIO DE MATERIAIS ELETRICOS LTDA' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490530
when EV.ds_razaosocial = 'MFM SOLUCOES AMBIENTAIS E GESTAO DE RESIDUOS LTDA' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490531
when EV.ds_razaosocial = 'M N SERVIÇO LTDA' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490532
when EV.ds_razaosocial = 'CHRISTIAN CONSULTORIA E ASSESSORIA EMPRESARIAL LTDA' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490613
when EV.ds_razaosocial = 'GERALDO ERMINIO BARBOSA' and (TX.ds_taxa = 'TAXA DE HORA MAQUINA' or PP.ds_taxa = 'TAXA DE HORA MAQUINA' ) then 140490614
when EV.ds_razaosocial = 'CONSTRUTORA UMUARAMA LTDA' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490553
when EV.ds_razaosocial = 'CAMARA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490554
when EV.ds_razaosocial = 'KLEITON ALMEIDA WILL' and (TX.ds_taxa = 'TAXA DE HORA MAQUINA' or PP.ds_taxa = 'TAXA DE HORA MAQUINA' ) then 140490555
when EV.ds_razaosocial = 'CODRASA COMERCIO E CONSTRUÇÕES LTDA ME' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490556
when EV.ds_razaosocial = 'NOSSA PHARMACIA LTDA ' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490557
when EV.ds_razaosocial = 'CLAUDIMAR COLADINI' and (TX.ds_taxa = 'TAXA DE HORA MAQUINA' or PP.ds_taxa = 'TAXA DE HORA MAQUINA' ) then 140490558
when EV.ds_razaosocial = 'SEBASTIÃO FERNANDES DE MOURA ' and (TX.ds_taxa = 'OUTRAS RECEITAS ' or PP.ds_taxa = 'OUTRAS RECEITAS ' ) then 140490559
when EV.ds_razaosocial = 'ADIR IGNACIO LIMA' and (TX.ds_taxa = ' ADIR IGNÁCIO LIMA - MULTA -  INSC. ' or PP.ds_taxa = ' ADIR IGNÁCIO LIMA - MULTA -  INSC. ' ) then 140490560
when EV.ds_razaosocial = 'OSMAR BATISTA PENHA' and (TX.ds_taxa = 'OSMAR BATISTA PENHA CERT. 00562/22-TCE - PROC. 1774-2023' or PP.ds_taxa = 'OSMAR BATISTA PENHA CERT. 00562/22-TCE - PROC. 1774-2023' ) then 140490561
when EV.ds_razaosocial = 'NOSSA PHARMACIA LTDA ' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490562
when EV.ds_razaosocial = 'M N SERVIÇO LTDA' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490563
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490564
when EV.ds_razaosocial = 'AUTOVEMA MATOS COM DE COMIONETAS LTDA ' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490565
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490566
when EV.ds_razaosocial = 'VALMIR GOMES DA SILVA' and (TX.ds_taxa = 'TAXA DE HORA MAQUINA' or PP.ds_taxa = 'TAXA DE HORA MAQUINA' ) then 140490567
when EV.ds_razaosocial = 'DATAPLEX TECNOLOGIA E GESTÃO LTDA' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490568
when EV.ds_razaosocial = 'NOSSA PHARMACIA LTDA ' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490569
when EV.ds_razaosocial = 'GUILHERME GULARTE' and (TX.ds_taxa = 'TAXA HORA MAQUINA RETRO ESCAVA ' or PP.ds_taxa = 'TAXA HORA MAQUINA RETRO ESCAVA ' ) then 140490570
when EV.ds_razaosocial = 'RONDOLAB DIAGNOSTICA COMERCIO E SERVIÇOS LTDA ' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490571
when EV.ds_razaosocial = 'LEO COMERCIO SERVIÇOS E EVNTOS LTDA' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490572
when EV.ds_razaosocial = 'ADALBERTO AMARAL DE BRITO' and (TX.ds_taxa = 'ADALBERTO AMARAL DE BRITO MULTA' or PP.ds_taxa = 'ADALBERTO AMARAL DE BRITO MULTA' ) then 140490593
when EV.ds_razaosocial = 'M N SERVIÇO LTDA' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490594
when EV.ds_razaosocial = 'BRAISINHO RAMIRES DOS SANTOS ' and (TX.ds_taxa = '' or PP.ds_taxa = '' ) then 140490595
when EV.ds_razaosocial = 'CODRASA COMERCIO E CONSTRUÇÕES LTDA ME' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490596
when EV.ds_razaosocial = 'CLAUDIO APARECIDO TOMAZ' and (TX.ds_taxa = 'TAXA DE HORA MAQUINA' or PP.ds_taxa = 'TAXA DE HORA MAQUINA' ) then 140490597
when EV.ds_razaosocial = 'EDINAN FERREIRA BIANCHIN' and (TX.ds_taxa = 'TAXA DE HORA MAQUINA' or PP.ds_taxa = 'TAXA DE HORA MAQUINA' ) then 140490598
when EV.ds_razaosocial = 'M N SERVIÇO LTDA' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490599
when EV.ds_razaosocial = 'BA LUZ INDUSTRIA E COMERCIO DE MATERIAIS ELETRICOS LTDA' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490600
when EV.ds_razaosocial = 'PICA PAU COM MAG E IMPL AGRICOLAS LTDA' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490601
when EV.ds_razaosocial = 'ADIR IGNACIO LIMA' and (TX.ds_taxa = ' ADIR IGNÁCIO LIMA - MULTA -  INSC. ' or PP.ds_taxa = ' ADIR IGNÁCIO LIMA - MULTA -  INSC. ' ) then 140490508
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490509
when EV.ds_razaosocial = 'M N SERVIÇO LTDA' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490510
when EV.ds_razaosocial = 'NOSSA PHARMACIA LTDA ' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490511
when EV.ds_razaosocial = 'JUNIO CARDOSO DE FIGUEIREDO' and (TX.ds_taxa = 'MULTA JUNIO CARDOSO DE FIGUEIREDO ' or PP.ds_taxa = 'MULTA JUNIO CARDOSO DE FIGUEIREDO ' ) then 140490512
when EV.ds_razaosocial = 'PREFEITURA MUNICIPAL DE PARECIS' and (TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' ) then 140490573
when EV.ds_razaosocial = 'M N SERVIÇO LTDA' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490574
when EV.ds_razaosocial = 'M N SERVIÇO LTDA' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490575
when EV.ds_razaosocial = 'EZEQUIAS CLEMENTINO DA SILVA' and (TX.ds_taxa = 'TAXA DE HORA MAQUINA' or PP.ds_taxa = 'TAXA DE HORA MAQUINA' ) then 140490576
when EV.ds_razaosocial = 'ECS COMERCIO DE VEICULOS EQUIP LTDA' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490577
when EV.ds_razaosocial = 'ERON CASTILHO DE ALMEIDA ' and (TX.ds_taxa = 'TAXA DE HORA MAQUINA' or PP.ds_taxa = 'TAXA DE HORA MAQUINA' ) then 140490578
when EV.ds_razaosocial = 'JOAQUIM NICOLAU DE SOUZA NETO' and (TX.ds_taxa = 'ITBI' or PP.ds_taxa = 'ITBI' ) then 140490579
when EV.ds_razaosocial = 'NOSSA PHARMACIA LTDA ' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490580
when EV.ds_razaosocial = 'NOSSA PHARMACIA LTDA ' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490581
when EV.ds_razaosocial = 'M N SERVIÇO LTDA' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490582
when EV.ds_razaosocial = 'RSTF - SERVICOS, LOCACOES E EVENTOS LTDA' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490583
when EV.ds_razaosocial = 'CARLOS ROBERTO SERAFIM SOUZA' and (TX.ds_taxa = 'CARLOS GOMES ROBERTO SERAFIM. CERT. 000557/22/ TCE-RO' or PP.ds_taxa = 'CARLOS GOMES ROBERTO SERAFIM. CERT. 000557/22/ TCE-RO' ) then 140490584
when EV.ds_razaosocial = 'DANIELA MAXIMO ' and (TX.ds_taxa = 'TAXA DE HORA MAQUINA' or PP.ds_taxa = 'TAXA DE HORA MAQUINA' ) then 140490585
when EV.ds_razaosocial = 'M N SERVIÇO LTDA' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490586
when EV.ds_razaosocial = 'SILVANA TRUIZ ' and (TX.ds_taxa = 'ITBI' or PP.ds_taxa = 'ITBI' ) then 140490587
when EV.ds_razaosocial = 'LIONICIO ALVES SANTOS ' and (TX.ds_taxa = 'TAXA DE HORA MAQUINA' or PP.ds_taxa = 'TAXA DE HORA MAQUINA' ) then 140490588
when EV.ds_razaosocial = 'ADIR IGNACIO LIMA' and (TX.ds_taxa = 'ADIR IGNACIO LIMA ' or PP.ds_taxa = 'ADIR IGNACIO LIMA ' ) then 140490589
when EV.ds_razaosocial = 'CLAIRO DE ALMEIDA MARTES' and (TX.ds_taxa = 'TAXA DE HORA MAQUINA' or PP.ds_taxa = 'TAXA DE HORA MAQUINA' ) then 140490590
when EV.ds_razaosocial = 'NELSON PEREIRA NUNES JUNIOR' and (TX.ds_taxa = 'NELSON PEREIRA NUNES JUNIOR. CERT. 000560/22/ TCE-RO' or PP.ds_taxa = 'NELSON PEREIRA NUNES JUNIOR. CERT. 000560/22/ TCE-RO' ) then 140490591
when EV.ds_razaosocial = 'M N SERVIÇO LTDA' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490592
when EV.ds_razaosocial = 'SUCKEL E SUCKEL LTDA' and (TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' ) then 140490633
when EV.ds_razaosocial = 'MARLENE ZUNACHI NEVES ' and (TX.ds_taxa = '' or PP.ds_taxa = '' ) then 140490634

                                   end as idReceitaDiversa,
                                   10 as qtdDiasMeses,
                                   PC.nr_parcela as qtdParcelas,
                                   PC.dt_Criacao as dtCriacao,
                                   PC.dt_vencimento as dtVcto,
                                   PC.ds_Obs as observacao,
                                   PC.nr_parcela as totalLancado,
                                   'DIAS' as intervaloVenctos,
                                   'CALCULADO' as situacao FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS receitasDiversasLanctos
from issparcelas PC
join ISSEventual EV on PC.Cd_Contribuinte = EV.cd_Eventual
join ISSItParcelas IPC on PC.Nr_Aviso = IPC.Nr_Aviso
LEFT JOIN ISSTaxas TX ON IPC.Cd_Tributo = TX.cd_Tributo
LEFT JOIN ISSPrecoPublico PP ON IPC.Cd_Tributo = PP.cd_Tributo

`;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData
    .map(record => {
        const receitasDiversasLanctos = JSON.parse(record.receitasDiversasLanctos);

        // Check if idReceitaDiversa has a valid value
        if (!receitasDiversasLanctos.idReceitaDiversa) return null;

        return {
            idIntegracao: record.idIntegracao.toString(),
            receitasDiversasLanctos: {
                idReceitaDiversa: receitasDiversasLanctos.idReceitaDiversa,
                qtdParcelas: receitasDiversasLanctos.qtdParcelas,
                dtCriacao: receitasDiversasLanctos.dtCriacao,
                dtVcto: receitasDiversasLanctos.dtVcto,
                observacao: receitasDiversasLanctos.observacao,
                vlLancado:receitasDiversasLanctos.vlLancado,
                qtdDiasMeses:receitasDiversasLanctos.qtdDiasMeses,
                totalLancado:receitasDiversasLanctos.totalLancado,
                intervaloVenctos:receitasDiversasLanctos.intervaloVenctos,
                situacao:receitasDiversasLanctos.situacao
            }
        };
    })
    .filter(record => record !== null); // Remove null entries
/* 
          const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        return */

        // Função para dividir o array em chunks de tamanho especificado
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

                const response = await fetch(`https://tributos.betha.cloud/service-layer-tributos/api/receitasDiversasLanctos`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                    },
                    body: JSON.stringify(batch)
                });

                const responseBody = await response.json();

                if (response.ok) {
                    console.log('Dados enviados com sucesso para a API.');
                    batch.forEach(record => {
                        report.push({ record, status: 'success', response: responseBody });
                    });

                    if (responseBody.idLote) {
                        reportIds.push(responseBody.idLote);
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

        // Salvar o relatório em 'report.json'
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));
        console.log('Relatório salvo em report.json com sucesso.');

        // Salvar os reportIds no arquivo 'report_id.json'
        fs.writeFileSync('report_id.json', JSON.stringify(reportIds, null, 2));
        console.log('report_id.json salvo com sucesso.');

    } catch (error) {
        console.error('Erro no processo:', error);
    } finally {
        await sql.close(); // Close the connection with SQL Server
        console.log('Conexão com o SQL Server fechada.');
    }
}

// Execute the main function
main();