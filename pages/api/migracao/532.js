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
SELECT  
    ROW_NUMBER() OVER (ORDER BY PC.cd_cecam) AS idIntegracao,
    JSON_QUERY((SELECT case 
        when TX.ds_taxa = 'ADALBERTO AMARAL DE BRITO MULTA' or PP.ds_taxa = 'ADALBERTO AMARAL DE BRITO MULTA' then 0
when TX.ds_taxa = 'ADIR IGNACIO LIMA ' or PP.ds_taxa = 'ADIR IGNACIO LIMA ' then 0
when TX.ds_taxa = ' ADIR IGNÁCIO LIMA - MULTA -  INSC. ' or PP.ds_taxa = ' ADIR IGNÁCIO LIMA - MULTA -  INSC. ' then 0
when TX.ds_taxa = 'APRENÇÃO DE ANIMAL POR CABEÇA E  POR DIA' or PP.ds_taxa = 'APRENÇÃO DE ANIMAL POR CABEÇA E  POR DIA' then 0
when TX.ds_taxa = 'ARISTOTENES FELIX GARCEZ FILHO CERT 0059/22/TCE-RO' or PP.ds_taxa = 'ARISTOTENES FELIX GARCEZ FILHO CERT 0059/22/TCE-RO' then 0
when TX.ds_taxa = 'BAIXAS DIVERSAS' or PP.ds_taxa = 'BAIXAS DIVERSAS' then 0
when TX.ds_taxa = 'CARLOS GOMES ROBERTO SERAFIM. CERT. 000557/22/ TCE-RO' or PP.ds_taxa = 'CARLOS GOMES ROBERTO SERAFIM. CERT. 000557/22/ TCE-RO' then 0
when TX.ds_taxa = 'CARTA DE EXCLUSIVIDADE' or PP.ds_taxa = 'CARTA DE EXCLUSIVIDADE' then 0
when TX.ds_taxa = 'CERTIDAO DE CONCLUSAO DE OBRAS' or PP.ds_taxa = 'CERTIDAO DE CONCLUSAO DE OBRAS' then 0
when TX.ds_taxa = 'CERTIDAO DE INICIO DE OBRA' or PP.ds_taxa = 'CERTIDAO DE INICIO DE OBRA' then 0
when TX.ds_taxa = 'CERTIDAO NEGATIVA' or PP.ds_taxa = 'CERTIDAO NEGATIVA' then 0
when TX.ds_taxa = 'CONSTRUÇÃO DE MAUSOLEU INFANTIL' or PP.ds_taxa = 'CONSTRUÇÃO DE MAUSOLEU INFANTIL' then 0
when TX.ds_taxa = 'CONTROLE E FISCALIZAÇÃO AMBIENTAL' or PP.ds_taxa = 'CONTROLE E FISCALIZAÇÃO AMBIENTAL' then 0
when TX.ds_taxa = 'CONTROL FISCAL AMBIENTAL ' or PP.ds_taxa = 'CONTROL FISCAL AMBIENTAL ' then 0
when TX.ds_taxa = 'DENILSON MIRANDA BARBOSA CERT 00561/22/ TCE -RO ' or PP.ds_taxa = 'DENILSON MIRANDA BARBOSA CERT 00561/22/ TCE -RO ' then 0
when TX.ds_taxa = 'DVANT - CARLO ROBERTO. . 557/22/-TCE' or PP.ds_taxa = 'DVANT - CARLO ROBERTO. . 557/22/-TCE' then 0
when TX.ds_taxa = 'DVANT - DENILSON MIRAN. . 561/22/-TCE' or PP.ds_taxa = 'DVANT - DENILSON MIRAN. . 561/22/-TCE' then 0
when TX.ds_taxa = 'DVANT - MARCONDES DE CAR. CERT. 554/22/T' or PP.ds_taxa = 'DVANT - MARCONDES DE CAR. CERT. 554/22/T' then 0
when TX.ds_taxa = 'DVANT - MARCONDES DE CARV . 0049/23/-TCE' or PP.ds_taxa = 'DVANT - MARCONDES DE CARV . 0049/23/-TCE' then 0
when TX.ds_taxa = 'DVANT MULTA MARCILEY DE CARVALHO INSC. C' or PP.ds_taxa = 'DVANT MULTA MARCILEY DE CARVALHO INSC. C' then 0
when TX.ds_taxa = 'DVANT MULTA PAULO CESAR' or PP.ds_taxa = 'DVANT MULTA PAULO CESAR' then 0
when TX.ds_taxa = 'DVANT - NELSON PEREIRA  . 560/22/-TCE' or PP.ds_taxa = 'DVANT - NELSON PEREIRA  . 560/22/-TCE' then 0
when TX.ds_taxa = 'DVANT - OSMAR BATIS. 562/22/-TCE' or PP.ds_taxa = 'DVANT - OSMAR BATIS. 562/22/-TCE' then 0
when TX.ds_taxa = 'DVANT PAULO CESAR BEZERRA ' or PP.ds_taxa = 'DVANT PAULO CESAR BEZERRA ' then 0
when TX.ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  866/19' or PP.ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  866/19' then 0
when TX.ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  867/19' or PP.ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  867/19' then 0
when TX.ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  868/19' or PP.ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  868/19' then 0
when TX.ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  869/19' or PP.ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  869/19' then 0
when TX.ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  870/19' or PP.ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  870/19' then 0
when TX.ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  871/19' or PP.ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  871/19' then 0
when TX.ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  872/19' or PP.ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  872/19' then 0
when TX.ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  873/19' or PP.ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  873/19' then 0
when TX.ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  874/19' or PP.ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  874/19' then 0
when TX.ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  876/19' or PP.ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  876/19' then 0
when TX.ds_taxa = 'DVANT - RENIVALDO BEZERRA . 558/22/-TCE' or PP.ds_taxa = 'DVANT - RENIVALDO BEZERRA . 558/22/-TCE' then 0
when TX.ds_taxa = 'DVANT - RENIVALDO RAASCH . 556/22/-TCE' or PP.ds_taxa = 'DVANT - RENIVALDO RAASCH . 556/22/-TCE' then 0
when TX.ds_taxa = 'HORARIO ESPECIAL' or PP.ds_taxa = 'HORARIO ESPECIAL' then 0
when TX.ds_taxa = 'IMPOSTO SOBRE SERVIÇOS DE QUALQUER NATUREZA - ISSQ' or PP.ds_taxa = 'IMPOSTO SOBRE SERVIÇOS DE QUALQUER NATUREZA - ISSQ' then 1114511400
when TX.ds_taxa = 'IMPOSTO SOBRE SERVIÇOS FIXO' or PP.ds_taxa = 'IMPOSTO SOBRE SERVIÇOS FIXO' then 0
when TX.ds_taxa = 'IMPOSTOS SOBRE TRANSMISSÃO INTER VIVOS DE BENS IMÓ' or PP.ds_taxa = 'IMPOSTOS SOBRE TRANSMISSÃO INTER VIVOS DE BENS IMÓ' then 1112530100
when TX.ds_taxa = 'IMPOSTOS SOBRE TRANSMISSÃO INTER VIVOS DE BENS IMÓVEIS' or PP.ds_taxa = 'IMPOSTOS SOBRE TRANSMISSÃO INTER VIVOS DE BENS IMÓVEIS' then 0
when TX.ds_taxa = 'INDENIZAÇÃO E RESTITUIÇÃO' or PP.ds_taxa = 'INDENIZAÇÃO E RESTITUIÇÃO' then 0
when TX.ds_taxa = 'IPTU' or PP.ds_taxa = 'IPTU' then 0
when TX.ds_taxa = 'IRPJ PESSOA JURIDICA' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA' then 0
when TX.ds_taxa = 'IRPJ PESSOA JURIDICA ' or PP.ds_taxa = 'IRPJ PESSOA JURIDICA ' then 0
when TX.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' or PP.ds_taxa = 'IRRF-OUTROS RENDIMENTOS' then 0
when TX.ds_taxa = 'IRRF - RENDIMENTO DO TRABALHO' or PP.ds_taxa = 'IRRF - RENDIMENTO DO TRABALHO' then 0
when TX.ds_taxa = 'IRRF RETIDO NA FINTE PESSOA FISICA' or PP.ds_taxa = 'IRRF RETIDO NA FINTE PESSOA FISICA' then 0
when TX.ds_taxa = 'IRRF RETIDO NA FONTE PESSOA JURIDICA' or PP.ds_taxa = 'IRRF RETIDO NA FONTE PESSOA JURIDICA' then 0
when TX.ds_taxa = 'IRR PESSOA FISICA' or PP.ds_taxa = 'IRR PESSOA FISICA' then 0
when TX.ds_taxa = 'IRR PESSOA FISICA ' or PP.ds_taxa = 'IRR PESSOA FISICA ' then 0
when TX.ds_taxa = 'ITBI' or PP.ds_taxa = 'ITBI' then 0
when TX.ds_taxa = 'I.T.B.I.' or PP.ds_taxa = 'I.T.B.I.' then 0
when TX.ds_taxa = 'MARCILEY DE CARVALHO CERT. 000555/2022/TCE-RO - PROC. 1775/2023' or PP.ds_taxa = 'MARCILEY DE CARVALHO CERT. 000555/2022/TCE-RO - PROC. 1775/2023' then 0
when TX.ds_taxa = 'MARCONDES DE CARVALHO CERT. 00049/23/TCE-RO- PROC. 1553/2023' or PP.ds_taxa = 'MARCONDES DE CARVALHO CERT. 00049/23/TCE-RO- PROC. 1553/2023' then 0
when TX.ds_taxa = 'MARCONDES DE CARVALHO CERT. 000554/22/TCE-RO' or PP.ds_taxa = 'MARCONDES DE CARVALHO CERT. 000554/22/TCE-RO' then 0
when TX.ds_taxa = 'MULTA EDSON ANDRIOLI DOS SANTOS' or PP.ds_taxa = 'MULTA EDSON ANDRIOLI DOS SANTOS' then 0
when TX.ds_taxa = 'MULTA JUNIO CARDOSO DE FIGUEIREDO ' or PP.ds_taxa = 'MULTA JUNIO CARDOSO DE FIGUEIREDO ' then 0
when TX.ds_taxa = 'NELSON PEREIRA NUNES JUNIOR. CERT. 00056' or PP.ds_taxa = 'NELSON PEREIRA NUNES JUNIOR. CERT. 00056' then 0
when TX.ds_taxa = 'NELSON PEREIRA NUNES JUNIOR. CERT. 000560/22/ TCE-RO' or PP.ds_taxa = 'NELSON PEREIRA NUNES JUNIOR. CERT. 000560/22/ TCE-RO' then 0
when TX.ds_taxa = 'OSMAR BASTITA PENHA CERT 00562/22/TCE-RO ' or PP.ds_taxa = 'OSMAR BASTITA PENHA CERT 00562/22/TCE-RO ' then 0
when TX.ds_taxa = 'OSMAR BATISTA PENHA CERT. 00562/22-TCE - PROC. 1774-2023' or PP.ds_taxa = 'OSMAR BATISTA PENHA CERT. 00562/22-TCE - PROC. 1774-2023' then 0
when TX.ds_taxa = 'OUTRAS RECEITAS ' or PP.ds_taxa = 'OUTRAS RECEITAS ' then 0
when TX.ds_taxa = 'PAULO CESAR BEZERRA ' or PP.ds_taxa = 'PAULO CESAR BEZERRA ' then 0
when TX.ds_taxa = 'RECEITA DIVERSA' or PP.ds_taxa = 'RECEITA DIVERSA' then 0
when TX.ds_taxa = 'RENIVALDO BEZERRA . CERT. 00558/22/TCE-RO' or PP.ds_taxa = 'RENIVALDO BEZERRA . CERT. 00558/22/TCE-RO' then 0
when TX.ds_taxa = 'RENIVALDO RAASCH. CERT. 000556/22/ TCE-RO' or PP.ds_taxa = 'RENIVALDO RAASCH. CERT. 000556/22/ TCE-RO' then 0
when TX.ds_taxa = 'RESTITUIÇÃO DE CONVÊNIOS' or PP.ds_taxa = 'RESTITUIÇÃO DE CONVÊNIOS' then 0
when TX.ds_taxa = 'RESTITUIÇÃO DE VAL.JUDICIAL ALEXANDRE' or PP.ds_taxa = 'RESTITUIÇÃO DE VAL.JUDICIAL ALEXANDRE' then 0
when TX.ds_taxa = 'RESTITUIÇÕES DE VALORES DE DIARIAS ' or PP.ds_taxa = 'RESTITUIÇÕES DE VALORES DE DIARIAS ' then 0
when TX.ds_taxa = 'TAXA CAMINHAO CAÇAMBA TRUCADO ' or PP.ds_taxa = 'TAXA CAMINHAO CAÇAMBA TRUCADO ' then 0
when TX.ds_taxa = 'TAXA CAMINHAO CAÇAMBRA TRAÇADO VW' or PP.ds_taxa = 'TAXA CAMINHAO CAÇAMBRA TRAÇADO VW' then 0
when TX.ds_taxa = 'TAXA CEMITERIO CRIANÇA' or PP.ds_taxa = 'TAXA CEMITERIO CRIANÇA' then 0
when TX.ds_taxa = 'TAXA DE ATERRO' or PP.ds_taxa = 'TAXA DE ATERRO' then 0
when TX.ds_taxa = 'TAXA DE CADASTRO' or PP.ds_taxa = 'TAXA DE CADASTRO' then 0
when TX.ds_taxa = 'TAXA DE CEMITERIO ADULTO' or PP.ds_taxa = 'TAXA DE CEMITERIO ADULTO' then 0
when TX.ds_taxa = 'TAXA DE CERTIDAO NEGATIVA' or PP.ds_taxa = 'TAXA DE CERTIDAO NEGATIVA' then 0
when TX.ds_taxa = 'TAXA DE COLETA DE LIXO' or PP.ds_taxa = 'TAXA DE COLETA DE LIXO' then 0
when TX.ds_taxa = 'TAXA DE EDITAL' or PP.ds_taxa = 'TAXA DE EDITAL' then 0
when TX.ds_taxa = 'TAXA DE EXPEDIENTE' or PP.ds_taxa = 'TAXA DE EXPEDIENTE' then 0
when TX.ds_taxa = 'TAXA DE FISCALIZAÇAO E FUNCIONAMENTO' or PP.ds_taxa = 'TAXA DE FISCALIZAÇAO E FUNCIONAMENTO' then 0
when TX.ds_taxa = 'TAXA DE FISCALIZAÇÃO PARA FUNCIONAMENTO' or PP.ds_taxa = 'TAXA DE FISCALIZAÇÃO PARA FUNCIONAMENTO' then 0
when TX.ds_taxa = 'TAXA DE HABITE-SE' or PP.ds_taxa = 'TAXA DE HABITE-SE' then 0
when TX.ds_taxa = 'TAXA DE HORA MAQUINA' or PP.ds_taxa = 'TAXA DE HORA MAQUINA' then 0
when TX.ds_taxa = 'TAXA DE PUBLICIDADE' or PP.ds_taxa = 'TAXA DE PUBLICIDADE' then 0
when TX.ds_taxa = 'TAXA DE VALOR EXCEDENTE ' or PP.ds_taxa = 'TAXA DE VALOR EXCEDENTE ' then 0
when TX.ds_taxa = 'TAXA  DVAT NAO TRIB.JOSE COUTINHO' or PP.ds_taxa = 'TAXA  DVAT NAO TRIB.JOSE COUTINHO' then 0
when TX.ds_taxa = 'TAXA FISCALIZAÇÃO SANITARIA' or PP.ds_taxa = 'TAXA FISCALIZAÇÃO SANITARIA' then 0
when TX.ds_taxa = 'TAXA FORNECIMENTO DE 2.ªVIA' or PP.ds_taxa = 'TAXA FORNECIMENTO DE 2.ªVIA' then 0
when TX.ds_taxa = 'TAXA FUNCIONAMENTO HORARIO ESPECIAL' or PP.ds_taxa = 'TAXA FUNCIONAMENTO HORARIO ESPECIAL' then 0
when TX.ds_taxa = 'TAXA HORA MAQUINA RETRO ESCAVA ' or PP.ds_taxa = 'TAXA HORA MAQUINA RETRO ESCAVA ' then 0
when TX.ds_taxa = 'TAXA HORA MAQUINA TRATOR ' or PP.ds_taxa = 'TAXA HORA MAQUINA TRATOR ' then 0
when TX.ds_taxa = 'TAXA HORARIO ESPECIAL' or PP.ds_taxa = 'TAXA HORARIO ESPECIAL' then 0
when TX.ds_taxa = 'TAXA HORARIO ESPECIAL ' or PP.ds_taxa = 'TAXA HORARIO ESPECIAL ' then 0
when TX.ds_taxa = 'TAXA P/CIRCOS,PARQUES E SIMILIARES' or PP.ds_taxa = 'TAXA P/CIRCOS,PARQUES E SIMILIARES' then 0
when TX.ds_taxa = 'TAXA P/IMPRESSÃO DOC. FISCAIS' or PP.ds_taxa = 'TAXA P/IMPRESSÃO DOC. FISCAIS' then 0
when TX.ds_taxa = 'TAXA REALIZAÇÃO DE EVENTOS' or PP.ds_taxa = 'TAXA REALIZAÇÃO DE EVENTOS' then 0
when TX.ds_taxa = 'TAXAS AVULSAS' or PP.ds_taxa = 'TAXAS AVULSAS' then 0
when TX.ds_taxa = 'Transferencia de contratos, por unidade' or PP.ds_taxa = 'Transferencia de contratos, por unidade' then 0
when TX.ds_taxa = 'TX LIC. P/ OCUPAÇÃO DAS VIAS E LOGRA.  PUBLIC' or PP.ds_taxa = 'TX LIC. P/ OCUPAÇÃO DAS VIAS E LOGRA.  PUBLIC' then 0
when TX.ds_taxa = 'VALORES DE MULTAS E JUROS' or PP.ds_taxa = 'VALORES DE MULTAS E JUROS' then 0
else 0
                end as idReceita,
        CASE
            when idReceitaAUX = 140216174 then 133046191
when idReceitaAUX = 137743793 then 130576550
when idReceitaAUX = 137741316 then 130574073
when idReceitaAUX = 138729233 then 131561450
when idReceitaAUX = 140490433 then 133425755
when idReceitaAUX = 140490433 then 133425761
when idReceitaAUX = 140490433 then 133425768
when idReceitaAUX = 140490433 then 133425773
when idReceitaAUX = 140490433 then 133425775
when idReceitaAUX = 140490433 then 133425782
when idReceitaAUX = 140490433 then 133425809
when idReceitaAUX = 140490433 then 133425810
when idReceitaAUX = 140490433 then 133425812
when idReceitaAUX = 140490433 then 133425829
when idReceitaAUX = 140490436 then 133425671
when idReceitaAUX = 140490438 then 133425684
when idReceitaAUX = 140490438 then 133425685
when idReceitaAUX = 140490438 then 133425686
when idReceitaAUX = 140490438 then 133425687
when idReceitaAUX = 140490438 then 133425688
when idReceitaAUX = 140490438 then 133425689
when idReceitaAUX = 140490438 then 133425690
when idReceitaAUX = 140490438 then 133425692
when idReceitaAUX = 140490438 then 133425693
when idReceitaAUX = 140490438 then 133425783
when idReceitaAUX = 140490438 then 133425784
when idReceitaAUX = 140490438 then 133425785
when idReceitaAUX = 140490438 then 133425786
when idReceitaAUX = 140490438 then 133425787
when idReceitaAUX = 140490438 then 133425788
when idReceitaAUX = 140490438 then 133425789
when idReceitaAUX = 140490438 then 133425790
when idReceitaAUX = 140490438 then 133425791
when idReceitaAUX = 140490438 then 133425792
when idReceitaAUX = 140490438 then 133425793
when idReceitaAUX = 140490438 then 133425794
when idReceitaAUX = 140490438 then 133425795
when idReceitaAUX = 140490438 then 133425796
when idReceitaAUX = 140490438 then 133425797
when idReceitaAUX = 140490438 then 133425798
when idReceitaAUX = 140490438 then 133425799
when idReceitaAUX = 140490438 then 133425800
when idReceitaAUX = 140490438 then 133425831
when idReceitaAUX = 140490438 then 133425675
when idReceitaAUX = 140490438 then 133425676
when idReceitaAUX = 140490438 then 133425677
when idReceitaAUX = 140490438 then 133425678
when idReceitaAUX = 140490438 then 133425679
when idReceitaAUX = 140490438 then 133425680
when idReceitaAUX = 140490438 then 133425681
when idReceitaAUX = 140490438 then 133425682
when idReceitaAUX = 140490438 then 133425683
when idReceitaAUX = 140490454 then 133425802
when idReceitaAUX = 140490454 then 133425822
when idReceitaAUX = 140490454 then 133425832
when idReceitaAUX = 140490455 then 133425756
when idReceitaAUX = 140490455 then 133425807
when idReceitaAUX = 140490470 then 133425757
when idReceitaAUX = 140490470 then 133425758
when idReceitaAUX = 140490474 then 133425769
when idReceitaAUX = 140490476 then 133425820
when idReceitaAUX = 140490478 then 133425804
when idReceitaAUX = 140490479 then 133425801
when idReceitaAUX = 140490480 then 133425754
when idReceitaAUX = 140490481 then 133425824
when idReceitaAUX = 140490484 then 133425691
when idReceitaAUX = 140490487 then 133425835
when idReceitaAUX = 140490494 then 133425830
when idReceitaAUX = 140490495 then 133425695
when idReceitaAUX = 140490496 then 133425705
when idReceitaAUX = 140490497 then 133425774
when idReceitaAUX = 140490497 then 133425825
when idReceitaAUX = 140490498 then 133425750
when idReceitaAUX = 140490499 then 133425765
when idReceitaAUX = 140490499 then 133425826
when idReceitaAUX = 140490500 then 133425742
when idReceitaAUX = 140490501 then 133425698
when idReceitaAUX = 140490501 then 133425699
when idReceitaAUX = 140490501 then 133425777
when idReceitaAUX = 140490501 then 133425778
when idReceitaAUX = 140490502 then 133425746
when idReceitaAUX = 140490503 then 133425724
when idReceitaAUX = 140490503 then 133425725
when idReceitaAUX = 140490503 then 133425726
when idReceitaAUX = 140490503 then 133425727
when idReceitaAUX = 140490503 then 133425728
when idReceitaAUX = 140490503 then 133425729
when idReceitaAUX = 140490503 then 133425730
when idReceitaAUX = 140490503 then 133425731
when idReceitaAUX = 140490503 then 133425732
when idReceitaAUX = 140490503 then 133425733
when idReceitaAUX = 140490503 then 133425734
when idReceitaAUX = 140490503 then 133425735
when idReceitaAUX = 140490503 then 133425747
when idReceitaAUX = 140490503 then 133425748
when idReceitaAUX = 140490503 then 133425749
when idReceitaAUX = 140490503 then 133425650
when idReceitaAUX = 140490503 then 133425651
when idReceitaAUX = 140490503 then 133425652
when idReceitaAUX = 140490503 then 133425653
when idReceitaAUX = 140490503 then 133425654
when idReceitaAUX = 140490503 then 133425655
when idReceitaAUX = 140490503 then 133425656
when idReceitaAUX = 140490503 then 133425657
when idReceitaAUX = 140490503 then 133425658
when idReceitaAUX = 140490504 then 133425803
when idReceitaAUX = 140490506 then 133425743
when idReceitaAUX = 140490507 then 133425771
when idReceitaAUX = 140490507 then 133425772
when idReceitaAUX = 140490490 then 133425744
when idReceitaAUX = 140490514 then 133425745
when idReceitaAUX = 140490515 then 133425764
when idReceitaAUX = 140490516 then 133425736
when idReceitaAUX = 140490516 then 133425737
when idReceitaAUX = 140490516 then 133425738
when idReceitaAUX = 140490516 then 133425739
when idReceitaAUX = 140490516 then 133425740
when idReceitaAUX = 140490516 then 133425741
when idReceitaAUX = 140490516 then 133425659
when idReceitaAUX = 140490516 then 133425660
when idReceitaAUX = 140490516 then 133425661
when idReceitaAUX = 140490516 then 133425662
when idReceitaAUX = 140490516 then 133425663
when idReceitaAUX = 140490516 then 133425664
when idReceitaAUX = 140490516 then 133425665
when idReceitaAUX = 140490516 then 133425666
when idReceitaAUX = 140490516 then 133425667
when idReceitaAUX = 140490516 then 133425668
when idReceitaAUX = 140490516 then 133425669
when idReceitaAUX = 140490516 then 133425670
when idReceitaAUX = 140490517 then 133425767
when idReceitaAUX = 140490517 then 133425673
when idReceitaAUX = 140490517 then 133425674
when idReceitaAUX = 140490518 then 133425818
when idReceitaAUX = 140490519 then 133425708
when idReceitaAUX = 140490519 then 133425709
when idReceitaAUX = 140490520 then 133425762
when idReceitaAUX = 140490521 then 133425696
when idReceitaAUX = 140490521 then 133425697
when idReceitaAUX = 140490522 then 133425716
when idReceitaAUX = 140490522 then 133425717
when idReceitaAUX = 140490522 then 133425718
when idReceitaAUX = 140490522 then 133425719
when idReceitaAUX = 140490522 then 133425720
when idReceitaAUX = 140490522 then 133425721
when idReceitaAUX = 140490522 then 133425722
when idReceitaAUX = 140490522 then 133425760
when idReceitaAUX = 140490522 then 133425805
when idReceitaAUX = 140490522 then 133425806
when idReceitaAUX = 140490522 then 133425819
when idReceitaAUX = 140490523 then 133425770
when idReceitaAUX = 140490523 then 133425815
when idReceitaAUX = 140490524 then 133425780
when idReceitaAUX = 140490525 then 133425776
when idReceitaAUX = 140490526 then 133425766
when idReceitaAUX = 140490526 then 133425811
when idReceitaAUX = 140490528 then 133425763
when idReceitaAUX = 140490530 then 133425713
when idReceitaAUX = 140490530 then 133425714
when idReceitaAUX = 140490614 then 133425828
when idReceitaAUX = 140490553 then 133425808
when idReceitaAUX = 140490555 then 133425823
when idReceitaAUX = 140490557 then 133425711
when idReceitaAUX = 140490557 then 133425712
when idReceitaAUX = 140490557 then 133425751
when idReceitaAUX = 140490557 then 133425752
when idReceitaAUX = 140490557 then 133425753
when idReceitaAUX = 140490557 then 133425813
when idReceitaAUX = 140490558 then 133425672
when idReceitaAUX = 140490559 then 133425715
when idReceitaAUX = 140490561 then 133425710
when idReceitaAUX = 140490565 then 133425817
when idReceitaAUX = 140490571 then 133425814
when idReceitaAUX = 140490572 then 133425723
when idReceitaAUX = 140490593 then 133425701
when idReceitaAUX = 140490593 then 133425702
when idReceitaAUX = 140490593 then 133425703
when idReceitaAUX = 140490593 then 133425704
when idReceitaAUX = 140490597 then 133425816
when idReceitaAUX = 140490598 then 133425834
when idReceitaAUX = 140490601 then 133425779
when idReceitaAUX = 140490512 then 133425700
when idReceitaAUX = 140490576 then 133425759
when idReceitaAUX = 140490577 then 133425821
when idReceitaAUX = 140490578 then 133425827
when idReceitaAUX = 140490584 then 133425706
when idReceitaAUX = 140490585 then 133425833
when idReceitaAUX = 140490588 then 133425836
when idReceitaAUX = 140490590 then 133425694
when idReceitaAUX = 140490591 then 133425707
when idReceitaAUX = 140490633 then 133425781
        END AS idReceitasDiversasLanctos,
                PC.vl_parcela as valorLancado
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    )) AS jsonResult
FROM issparcelas PC
JOIN ISSEventual EV ON PC.Cd_Contribuinte = EV.cd_Eventual
JOIN ISSItParcelas IPC ON PC.Nr_Aviso = IPC.Nr_Aviso
LEFT JOIN ISSTaxas TX ON IPC.Cd_Tributo = TX.cd_Tributo
LEFT JOIN ISSPrecoPublico PP ON IPC.Cd_Tributo = PP.cd_Tributo
CROSS APPLY (
    SELECT
        CASE
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
        END AS idReceitaAUX
) AS temp
`;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData
            .map(record => {
                console.log(record);
                return

                const receitasDiversasLanctosRec = JSON.parse(record.jsonResult);

                // Check if idReceita has a valid value
                if (!receitasDiversasLanctosRec.idReceita) return null;

                return {
                    idIntegracao: record.idIntegracao.toString(),
                    receitasDiversasLanctosRec: {
                        idReceita: receitasDiversasLanctosRec.idReceita,
                        idReceitasDiversasLanctos: receitasDiversasLanctosRec.idReceitasDiversasLanctos,
                        valorLancado: receitasDiversasLanctosRec.valorLancado
                    }
                };
            })
            .filter(record => record !== null); // Remove null entries


        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }
        return

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

                const response = await fetch(`https://tributos.betha.cloud/service-layer-tributos/api/receitasDiversasLanctosRec`, {
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