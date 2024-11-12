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
    return `${year}-${month}-${day} ${hours}:${minutes}`;
    //return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
        JSON_QUERY((SELECT case LC.nr_processo
                                                when 399 then 1312187
        when 475 then 1312188
        when 1123 then 1312189
        when 1194 then 1312190
        when 1240 then 1312191
        when 620 then 1312192
        when 1400 then 1312193
        when 18 then 1312239
        when 20 then 1312240
        when 28 then 1312241
        when 29 then 1312242
        when 30 then 1312243
        when 31 then 1312244
        when 33 then 1312245
        when 192 then 1312246
        when 216 then 1312247
        when 333 then 1312248
        when 334 then 1312249
        when 335 then 1312250
        when 398 then 1312251
        when 401 then 1312252
        when 461 then 1312253
        when 464 then 1312254
        when 582 then 1312255
        when 588 then 1312256
        when 589 then 1312257
        when 625 then 1312258
        when 744 then 1312260
        when 784 then 1312261
        when 877 then 1312262
        when 878 then 1312263
        when 992 then 1312264
        when 1046 then 1312265
        when 1185 then 1312266
        when 1203 then 1312267
        when 1218 then 1312268
        when 1306 then 1312269
        when 1317 then 1312270
        when 1331 then 1312271
        when 1341 then 1312272
        when 1451 then 1312273
        when 1503 then 1312274
        when 1517 then 1312275
        when 1566 then 1312348
        when 629 then 1312350
        when 3 then 1312414
        when 5 then 1312432
        when 22 then 1312433
        when 34 then 1312436
        when 40 then 1312437
        when 51 then 1312438
        when 86 then 1312439
        when 626 then 1312605
        when 879 then 1312631
        when 16 then 1312640
                                           end as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS processoAdministrativo,
        JSON_QUERY((SELECT case
                                                when FR.nm_fornecedor = 'REGINALDO GIL DA SILVA' then 37581593
        when FR.nm_fornecedor = 'FRANCIELE SIMINHUK' then 37588217
        when FR.nm_fornecedor = 'MEDIA PRESENTE NO QUADRO COMPARATIVO' then 38535683
        when FR.nm_fornecedor = 'DEPARTAMENTO ESTADUAL DE TRANSITO DO ESTADO DE RONDÔNIA- DETRAN/RO' then 38535686
        when FR.nm_fornecedor = 'TECCHIO E SILVA LTDA' then 38535687
        when FR.nm_fornecedor = 'COMPANHIA DE ÁGUAS E ESGOTOS DE RONDÔNIA- CAERD' then 38535688
        when FR.nm_fornecedor = 'OI S/A EM RECUPERAÇÃO JUDICIAL' then 38535689
        when FR.nm_fornecedor = 'ENERGISA RONDÔNIA- DISTRIBUIDORA DE ENERGIA S.A' then 38535690
        when FR.nm_fornecedor = 'METALUGICA E VIDRAÇARIA FAZ COM FERRO LTDA EPP' then 38535691
        when FR.nm_fornecedor = 'B.B DE JESUS PANIFICADORA LTDA' then 38535692
        when FR.nm_fornecedor = 'ELIZABETE PIRES GUEDES OLIVEIRA ME' then 38535693
        when FR.nm_fornecedor = 'AUTO TRACTOR LTDA EPP' then 38535694
        when FR.nm_fornecedor = 'COVAN COMERCIO VAREJISTA E ATACADISTA DO NORTE LTDA' then 38535695
        when FR.nm_fornecedor = 'R C TABALIPA LTDA ME' then 38535696
        when FR.nm_fornecedor = 'CONSTRUTORA BRAGA LTDA EPP' then 38535697
        when FR.nm_fornecedor = 'JOSE PINHEIRO FERREIRA & CIA LTDA - ME' then 38535698
        when FR.nm_fornecedor = 'SANTANA & SOUZA TERRAPLANAGEM LTDA ME' then 38535699
        when FR.nm_fornecedor = 'JOHEM & SCHRAMM LTDA ME' then 38535700
        when FR.nm_fornecedor = 'FRIMOM CONSTRUÇÕES & SERVIÇOS LDA EPP' then 38535701
        when FR.nm_fornecedor = 'CARREIRO & BICALHO CONSTRUTORA LDA ME' then 38535702
        when FR.nm_fornecedor = 'INSTITUTO EXATUS LTDA ME' then 38535703
        when FR.nm_fornecedor = 'C V MOREIRA EIRELI' then 38535704
        when FR.nm_fornecedor = 'ALPHA ASSESSORIA & CONSULTORIA LTDA ME' then 38535705
        when FR.nm_fornecedor = 'POPULAR TREINAMENTOS LTDA' then 38535706
        when FR.nm_fornecedor = 'ALBERTO FREITA SILVA' then 38535707
        when FR.nm_fornecedor = 'ATECNOMED ASSISTÊNCIA E COMERCIO DE PRODUTOS HOSPITALARES LTDA ME' then 38535708
        when FR.nm_fornecedor = 'CORPO DE BOMBEIROS MILITAR DO ESTADO' then 38535709
        when FR.nm_fornecedor = 'PALMIERI 7 CIA LTDA EPP' then 38535710
        when FR.nm_fornecedor = 'ORTOMED PRODUTOS E SERVIÇOS HOSPITALARES LTDA EPP' then 38535711
        when FR.nm_fornecedor = 'DISTRIBUIDORA DE AUTO PEÇAS RONDOBRAS LTDA' then 38535712
        when FR.nm_fornecedor = 'DENTAL MED EQUIPAMENTOS E MATERIAIS ODONTOLOGICOS E HOSPITALARES LTDA EPP' then 38535713
        when FR.nm_fornecedor = 'FUNDAÇÃO DE APOIO A PESQUISA EDUCACIONAL E TECNOLÓGICA DE RONDONIA - INPRO' then 38535714
        when FR.nm_fornecedor = 'MR DOS SANTOS COMÉRCIO DISTRIBUIDOR E SEERVIÇOS LTDA ME' then 38535715
        when FR.nm_fornecedor = 'VITALLY FARMÁCIA E MANIPULAÇÃO LTDA ME' then 38535716
        when FR.nm_fornecedor = 'S RODRIGUES & CIA LTDA' then 38535717
        when FR.nm_fornecedor = 'MEDICALCENTER DISTRIBUIDORA DE MEDICAMENTOS EIRELI - EPP' then 38535718
        when FR.nm_fornecedor = 'CARMORAES SUPERMERCADO EIRELLI ME' then 38535719
        when FR.nm_fornecedor = 'OXIPORTO COMÉRCIO E DISTRIBUIÇÃO DE GASES LTDA' then 38535720
        when FR.nm_fornecedor = 'MANOEL DA SILVA EIRELI ME' then 38535721
        when FR.nm_fornecedor = 'MANOEL MESSIAS DE MACEDO GOMES' then 38535722
        when FR.nm_fornecedor = 'EQUILÍBRIO COMERCIO E REPRESENTAÇÃO EIRELI EPP' then 38535723
        when FR.nm_fornecedor = 'JACÓ RETIFICA DE MOTORES LTDA ME' then 38535724
        when FR.nm_fornecedor = 'PRESERVA SOLUÇÕES LTDA ME' then 38535725
        when FR.nm_fornecedor = 'CONSTRUTORA TERRA LTDA' then 38535726
        when FR.nm_fornecedor = 'CONSTRUCERTO LTDA ME' then 38535727
        when FR.nm_fornecedor = 'CONSTRUTORA VALTRAN LTDA' then 38535728
        when FR.nm_fornecedor = 'SEC ENGENHARIA E CONSTRUTORA LTDA' then 38535729
        when FR.nm_fornecedor = 'J A DE OLIVEIRA ALIMENTOS LTDA EPP' then 38535730
        when FR.nm_fornecedor = 'CONSTRUOURO CONSTRUÇÕES INSTALAÇÕES E SERVIÇOS LTDA EPP' then 38535731
        when FR.nm_fornecedor = 'LOJAS TROPICAL E REFRIGERAÇÃO LTDA' then 38535732
        when FR.nm_fornecedor = 'C.M COMÉRCIO SERVIÇOS E CONSTRUÇÕES LTDA ME' then 38535733
        when FR.nm_fornecedor = 'RONDERSON REIS DE OLIVEIRA' then 38535734
        when FR.nm_fornecedor = 'D PRESS EDITORA E GRÁFICA LDA EPP' then 38535735
        when FR.nm_fornecedor = 'FOX PNEUS LTDA' then 38535736
        when FR.nm_fornecedor = 'CONECTIVA ESCOLA PROFICIONALIZANTE LTDA - ME' then 38535737
        when FR.nm_fornecedor = 'JOÃO CARLOS ANACLETO' then 38535738
        when FR.nm_fornecedor = 'V. F. FERREIRA FREITAS DE OLIVEIRA LTDA' then 38535739
        when FR.nm_fornecedor = 'CYBER INFORMATICA LTDA ME' then 38535740
        when FR.nm_fornecedor = 'FURP - FUNDAÇÃO PARA REMEDIOS POPULARES' then 38535741
        when FR.nm_fornecedor = 'TERGEX - CONSTRUTORA LTDA' then 38535742
        when FR.nm_fornecedor = 'ATACADO TRADIÇÃO LTDA-ME' then 38535743
        when FR.nm_fornecedor = 'EXCLUSIVA DISTRIBUIRORA DE MEDICAMENTOS LTDA' then 38535744
        when FR.nm_fornecedor = 'M E DE CARVALHO INDUSTRIA DE MÓVEIS ME' then 38535745
        when FR.nm_fornecedor = 'VENEZIA COMERCIO DE CAMINHOES LTDA' then 38535746
        when FR.nm_fornecedor = 'DIMAM PEÇAS E SERVIÇOS LTDA' then 38535747
        when FR.nm_fornecedor = 'ANTONIO CARLOS ARGIONA DE OLIVEIRA' then 38535748
        when FR.nm_fornecedor = 'TC ATUAL COMERCIO DE MEDICAMENTOS LTDA' then 38535749
        when FR.nm_fornecedor = 'ZEZITO DOS SANTOS' then 38535750
        when FR.nm_fornecedor = 'YAGO MENOZZI' then 38535751
        when FR.nm_fornecedor = 'SCHREINER INDUSTRIA DE RESFRIADORES DE LEITE' then 38535752
        when FR.nm_fornecedor = 'PILINCHA ARTEFATOS DE CIMENTO LTDA - ME' then 38535753
        when FR.nm_fornecedor = 'JAPURA PNEUS LTDA' then 38535754
        when FR.nm_fornecedor = 'CENTERMEDI COMERCIO DE PRODUTOS HOSPITALARES LTDA' then 38535755
        when FR.nm_fornecedor = 'ELVES DIAS DE SOUZA' then 38535756
        when FR.nm_fornecedor = 'JULIO MUCHINSKI' then 38535757
        when FR.nm_fornecedor = 'JOSE LUCAS VINHAL' then 38535758
        when FR.nm_fornecedor = 'BELISSIMA UNIFORMES E CONFECÇOES LTDA-ME' then 38535759
        when FR.nm_fornecedor = 'RALLY PNEUS COMERCIO DE PNEUS E PEÇAS PARA VEICULOS LTDA' then 38535760
        when FR.nm_fornecedor = 'FERNANDA BAZONE' then 38535761
        when FR.nm_fornecedor = 'AUTO POSTO PARECIS LTDA' then 38535762
        when FR.nm_fornecedor = 'ARMCO STACO S A INDUSTRIA METARLUGICA' then 38535763
        when FR.nm_fornecedor = 'ELION BARRETO DE ARAUJO' then 38535764
        when FR.nm_fornecedor = 'ADRIANA CRISTINA DOS SANTOS' then 38535765
        when FR.nm_fornecedor = 'RONDOLAB COMÉRCIO E SERVIÇOS EIRELI EPP' then 38535766
        when FR.nm_fornecedor = 'AUTO PEÇAS FAVALESSA LTDA ME' then 38535767
        when FR.nm_fornecedor = 'THACOL COMERCIO LTDA - ME' then 38535768
        when FR.nm_fornecedor = 'COMERCIAL PSV LTDA' then 38535769
        when FR.nm_fornecedor = 'MP TUBOS INDUSTRIA DE CONCRETO LTDA - ME' then 38535770
        when FR.nm_fornecedor = 'RENACIR ATANAZIO' then 38535771
        when FR.nm_fornecedor = 'OXIACRE COMERCIO E DISTRIBUIÇÃO DE GASES LTDA ME' then 38535772
        when FR.nm_fornecedor = 'PACIFICO CONSTRUTORA LTDA ME' then 38535773
        when FR.nm_fornecedor = 'J.A. DOS SANTOS & CIA LTDA - ME' then 38535774
        when FR.nm_fornecedor = 'NEVES & BRITO LTDA - ME' then 38535775
        when FR.nm_fornecedor = 'DIMASTER COMERCIO DE PRODUTOS OSPITALAR LTDA' then 38535776
        when FR.nm_fornecedor = 'MUNDIAL COMERCIO ATACADISTA DE ARMARINHOS LTDA' then 38535777
        when FR.nm_fornecedor = 'MARCOS ALVES ALMEIDA' then 38535778
        when FR.nm_fornecedor = 'ALTAIR ALVES DE LIMA' then 38535779
        when FR.nm_fornecedor = 'A E DA CRUZ ELER ME' then 38535780
        when FR.nm_fornecedor = 'IVO SIMINHUK' then 38535781
        when FR.nm_fornecedor = 'PAPELARIA TEIXEIRA' then 38535782
        when FR.nm_fornecedor = 'D. ANTUNES DE PAULA - ME' then 38535783
        when FR.nm_fornecedor = 'MARCOFARMA DISTIBUIDORA DE PRODUTOS FARMACEUTICOS' then 38535784
        when FR.nm_fornecedor = 'JAMARI COMERCIO E EMPREENDIMENTO LTDA EPP' then 38535785
        when FR.nm_fornecedor = 'NOVASUL COMERCIO DE PRODUTOS HOSPITALARES LTDA' then 38535786
        when FR.nm_fornecedor = 'PRESTOMED DISTRIBUIDORA DE PRODUTOS P/SAUDE LTDA' then 38535787
        when FR.nm_fornecedor = 'RODOBENS COMINHOES RONDONIA LTDA' then 38535788
        when FR.nm_fornecedor = 'MONACO DIESEL RONDONIA LTDA' then 38535789
        when FR.nm_fornecedor = 'FELIX & RONCONI LTDA' then 38535790
        when FR.nm_fornecedor = 'ASSOCIAÇÃO DOS ÁRBITROS DE FUTEBOL DE ALTO ALEGRE DOS PARECIS' then 38535791
        when FR.nm_fornecedor = 'SCLAN MALHAS LTDA EPP' then 38535792
        when FR.nm_fornecedor = 'PATRICIA M. MILER - ME' then 38535793
        when FR.nm_fornecedor = 'IMEISSEN COMÉRCIO E SERVIÇOS EIRELLI ME' then 38535794
        when FR.nm_fornecedor = 'C. H. OLIVEIRA - ME' then 38535795
        when FR.nm_fornecedor = 'W&M COMERCIO DE MATERIAIS PARA CONSTRUÇAO EIRELI EPP' then 38535796
        when FR.nm_fornecedor = 'AUTOLUK COMERCIO DE PNEUMATICOS E PEÇAS' then 38535797
        when FR.nm_fornecedor = 'COMERCIAL RONDON LTDA EPP' then 38535798
        when FR.nm_fornecedor = 'APEDIA VEICULOS E PEÇAS LTDA' then 38535799
        when FR.nm_fornecedor = 'WALTER SOARES FALCÃO' then 38535800
        when FR.nm_fornecedor = 'CICLO CAIRU LTDA' then 38535801
        when FR.nm_fornecedor = 'ALANTIS COMERCIO DE MAQUINAS E EQUIPAMENTOS LTDA' then 38535802
        when FR.nm_fornecedor = 'RONDONIANA COMERCIAL EIRELLI ME' then 38535803
        when FR.nm_fornecedor = 'BERGUERAND & CIA LTDA - ME' then 38535804
        when FR.nm_fornecedor = 'OLITTECH COM E SERVIÇOS DE INF LTDA' then 38535805
        when FR.nm_fornecedor = 'LUIS CARLOS VALENTIN DE SOUZA' then 38535806
        when FR.nm_fornecedor = 'AILTON IZIDIO DOS SANTOS' then 38535807
        when FR.nm_fornecedor = 'PERUIBE COMERCIO DE PRODUTOS ELETRO ELETRONICOS LTDA' then 38535808
        when FR.nm_fornecedor = 'J C F MARANA ME' then 38535809
        when FR.nm_fornecedor = 'PALLADIUM INDUSTRIA E COMERCIO DE CONFECÇOES LTDA' then 38535810
        when FR.nm_fornecedor = 'JOÃO CARLOS CESTARI' then 38535811
        when FR.nm_fornecedor = 'IZALTINO VIDOTTO' then 38535812
        when FR.nm_fornecedor = 'MOURAO PNEUS EIRELI - ME' then 38535813
        when FR.nm_fornecedor = 'SOTREQ SA' then 38535814
        when FR.nm_fornecedor = 'MANOEL XAVIER COTRIM' then 38535815
        when FR.nm_fornecedor = 'L.M.LADEIRA & CIA LTDA' then 38535816
        when FR.nm_fornecedor = 'MULTILUB COMERCIO DE LUBRIFICANTES LTDA' then 38535817
        when FR.nm_fornecedor = 'PEMAZA S/A' then 38535818
        when FR.nm_fornecedor = 'ARLINDO ANTONIO DA SILVA' then 38535819
        when FR.nm_fornecedor = 'GBIM IMPORT. EXPORT.  E COMERCIALIZAÇÃO DE ACESSORIOS PARA VEICULOS LTDA' then 38535820
        when FR.nm_fornecedor = 'MOBEN COMERCIO DE VEICULO LTDA' then 38535821
        when FR.nm_fornecedor = 'GILBERTO FERREIRA GOMES' then 38535822
        when FR.nm_fornecedor = 'CONERA CONSTUTORA NOVA ERA LTDA ME' then 38535823
        when FR.nm_fornecedor = 'HYPOLYTI DISTRIBUIDOR DE PRODUTOS AGROPECUARIA' then 38535824
        when FR.nm_fornecedor = 'INOVVA PRODUTOS E SERVIÇOS EIRELI - ME' then 38535825
        when FR.nm_fornecedor = 'NISSEY MOTORS JI-PARANA' then 38535826
        when FR.nm_fornecedor = 'ALONSO DE SOUZA' then 38535827
        when FR.nm_fornecedor = 'C.P. PINTO COMERCIO DE MATERIAL HOSPITALAR' then 38535828
        when FR.nm_fornecedor = 'COMERCIAL GRARUJA LTDA' then 38535829
        when FR.nm_fornecedor = 'TOP NORTE COMERCIO DE MATERIAL MEDICO HOSPITALAR EIRELI - ME' then 38535830
        when FR.nm_fornecedor = 'R.B.T COMERCIO REPRESENTAÇÕES' then 38535831
        when FR.nm_fornecedor = 'M NEVES DE SOUZA E CIA LTDA' then 38535832
        when FR.nm_fornecedor = 'COMERCIAL TORRES LTDA - EPP' then 38535833
        when FR.nm_fornecedor = 'J A COMERCIO DE ARMARINHOS LTDA-ME' then 38535834
        when FR.nm_fornecedor = 'JOSE SIMINHUK' then 38535835
        when FR.nm_fornecedor = 'RODRIGO TOLOSA RICO - EPP' then 38535836
        when FR.nm_fornecedor = 'ELETRO MOVEIS BOM PREÇO LTDA - ME' then 38535838
        when FR.nm_fornecedor = 'BIOCAL COMERCIO E REPRESENTAÇÕES LTDA' then 38535839
        when FR.nm_fornecedor = 'R. CAMACHIO PUBLICIDADE - ME' then 38535840
        when FR.nm_fornecedor = 'L.E. ALMEIDA COMERCIO DE PRODUTOS MEDICOS HOSPITALAR' then 38535841
        when FR.nm_fornecedor = 'SILVENIA UNIFORMES LTDA EPP' then 38535842
        when FR.nm_fornecedor = 'ALEMAO COMERCIO DE MAQUINAS AGRICULAS EIRELI' then 38535843
        when FR.nm_fornecedor = 'VALDEMIR ALVES DE ALMEIDA' then 38535844
        when FR.nm_fornecedor = 'PRO SAUDE DISTRIBUIDORA DE MEDICAMENTO EIRELI-ME' then 38535845
        when FR.nm_fornecedor = 'TATIANA NEVES MONTIBELLER PAIVA' then 38535846
        when FR.nm_fornecedor = 'N T LUIZE EPP' then 38535847
        when FR.nm_fornecedor = 'LUCAS C. RUBEL - ME' then 38535848
        when FR.nm_fornecedor = 'COMERCIAL T S LTDA-ME' then 38535849
        when FR.nm_fornecedor = 'IVO NELI RIBEIRO KUSS' then 38535850
        when FR.nm_fornecedor = 'BH FARMA COMERCIO LTDA' then 38535851
        when FR.nm_fornecedor = 'J P MARCELINO EIRELI ME' then 38535852
        when FR.nm_fornecedor = 'VALDEMAR FAVALESSA - EPP' then 38535853
        when FR.nm_fornecedor = 'EDINAN MANOEL DA SILVA' then 38535854
        when FR.nm_fornecedor = 'COMERCIAL CURURGICA RIOCLARENSE LTDA' then 38535855
        when FR.nm_fornecedor = 'COMERCIAL CURURGICA RIOCLARENSE LTDA' then 38535856
        when FR.nm_fornecedor = 'J R COMERCIO DE ELETRONICO E INFORMATICA LTDA' then 38535857
        when FR.nm_fornecedor = 'N.V. VERDE E CIA LTDA - ME' then 38535858
        when FR.nm_fornecedor = 'VERA LUCIA FRANCISCA DOS SANTOS - ME' then 38535859
        when FR.nm_fornecedor = 'COMERCIO DE PRODUTOS FARMACEUTICOS DROGALID' then 38535860
        when FR.nm_fornecedor = 'NORTE MOTOS PEÇAS E ACESSORIOS' then 38535861
        when FR.nm_fornecedor = 'AM MEDICAL COMERCIO DE MEDICAMENTOS E PRODUTOS HOSPITALARES LTDA' then 38535862
        when FR.nm_fornecedor = 'AUROBINDO PHARMA INDUSTRIA FARMACEUTICA LTDA' then 38535863
        when FR.nm_fornecedor = 'ROLANDO ALENCAR GONÇALVES DE OLIVEIRA' then 38535864
        when FR.nm_fornecedor = 'MAGAZINE MENEGUEL LTDA' then 38535865
        when FR.nm_fornecedor = 'FARMACE INDUSTRIA QUIMICO FARMACEUTICA CEARENCE LTDA' then 38535866
        when FR.nm_fornecedor = 'CONSELHO DE DIREITO DA CRIANÇA E DO ADOLECENTE' then 38535867
        when FR.nm_fornecedor = 'ELIEZER ROSA DO PARAISO EIRELI - ME' then 38535868
        when FR.nm_fornecedor = 'IGARATA REPRESENTAÇAO COMERCIAL LTDA' then 38535869
        when FR.nm_fornecedor = 'PREFEITURA MUNICIPAL DE PARECIS' then 38535870
        when FR.nm_fornecedor = 'FRANTELLIS COMERCIO E SERVIÇOS EIRELI EPP' then 38535871
        when FR.nm_fornecedor = 'ILÇARA MARIA DE CASTRO BAILLY' then 38535872
        when FR.nm_fornecedor = 'ODONTOESTE LTDA EPP - ONDOTOESTE' then 38535873
        when FR.nm_fornecedor = 'IMPLEMENTOS AGRICOLAS OLIVEIRA LTDA' then 38535874
        when FR.nm_fornecedor = 'ADRIELE SCHROEDER SCHMIDT' then 38535875
        when FR.nm_fornecedor = 'EMERSON GONÇA DA SILVA LTDA ME' then 38535876
        when FR.nm_fornecedor = 'PORTOGASES COMERCIO E DISTRIBUIÇÃO DE GASES' then 38535877
        when FR.nm_fornecedor = 'EXEMPLARMED COMERCIO E PRODUTOS HOSPITALARES LTDA - ME' then 38535878
        when FR.nm_fornecedor = 'CARDOSO & SILVA MEDICAMENTOS LTDA-ME' then 38535880
        when FR.nm_fornecedor = 'TESCH E CASTRO LTDA-ME - ARARAS PARK' then 38535881
        when FR.nm_fornecedor = 'ALANA ROHDE IMPLEMENTOS AGRICOLAS - ME' then 38535882
        when FR.nm_fornecedor = 'SUPERMEDICA DISTRIB HOSPITALAR EIRELI' then 38535884
        when FR.nm_fornecedor = 'ASTOR STAUDT COMERCIO DE PRODUTOS EDUCATIVOS' then 38535885
        when FR.nm_fornecedor = 'ERAFARMA PRODUTOS PARA SAUDE EIRELI' then 38535886
        when FR.nm_fornecedor = 'CRIBARI CAMARGO COMUNICAÇÃO VISUAL EIRELI' then 38535887
        when FR.nm_fornecedor = 'LIFE CENTER COMERCIO E DISTRIBUIDORA DE MEDICAMENTOS LTDA' then 38535888
        when FR.nm_fornecedor = 'LAPTOP INFORMATICA E TECNOLOGIA LTDA' then 38535889
        when FR.nm_fornecedor = 'FERTISOLO COMERCIAL DE MAQUINAS E EQUIPAMENTOS LTDA' then 38535890
        when FR.nm_fornecedor = 'GOLDENPLUS COMERCIO DE MEDICAMENTOS E PRODUTOS HOSPITALARES LTDA' then 38535891
        when FR.nm_fornecedor = 'I. C. LEMES DA SILVA' then 38535892
        when FR.nm_fornecedor = 'TECHMED ENGENHARIA HOSPITALAR LTDA' then 38535893
        when FR.nm_fornecedor = 'T.C.C. DE A. FERREIRA COMERCIO E SERVIÇO' then 38535894
        when FR.nm_fornecedor = 'C. A. S. BALEEIRO' then 38535895
        when FR.nm_fornecedor = 'ECOLIM EIRELI' then 38535896
        when FR.nm_fornecedor = 'OLMIR IORIS & CIA LTDA EPP' then 38535897
        when FR.nm_fornecedor = 'L H C COMERCIO E SERVIÇOS LTDA' then 38535898
        when FR.nm_fornecedor = 'FRAZAN E CIA LTDA' then 38535899
        when FR.nm_fornecedor = 'ELDORADO MATERIAIS PARA CONSTRUÇÃO EIRELI ME' then 38535900
        when FR.nm_fornecedor = 'DMC DISTRIBUIDORA COMERCIO DE MEDICAMENTOS LTDA' then 38535901
        when FR.nm_fornecedor = 'TEND TUDO PEÇAS E ACESSORIOS PARA VEICULOS EPP' then 38535902
        when FR.nm_fornecedor = 'MEDICAL COMERCIO DE COSMETICO LTDA' then 38535903
        when FR.nm_fornecedor = 'MBR FERNANDES - EPP' then 38535904
        when FR.nm_fornecedor = 'SANTO REMEDIO COMERCIO DE PRODUTOS MEDICO-HOSPITALAR EIRELI' then 38535905
        when FR.nm_fornecedor = 'NBB COMERCIO DE EQUIPAMENTOS DE INFORMATICA LTDA ME' then 38535906
        when FR.nm_fornecedor = 'M R GONSALVES COMERCIO EIRELI ME' then 38535907
        when FR.nm_fornecedor = 'R. N. F. DE SOUZA E CIA LTDA' then 38535908
        when FR.nm_fornecedor = 'MONICA R. DE MELLO FARIA - ME' then 38535909
        when FR.nm_fornecedor = 'RTM COMERCIO DE MATERIAIS PARA CONSTRUÇÃO' then 38535910
        when FR.nm_fornecedor = 'HEXIS CIENTIFICA LTDA' then 38535911
        when FR.nm_fornecedor = 'LOBIANCO & LIMA LTDA - ME' then 38535912
        when FR.nm_fornecedor = 'CIMCERO CONS. INTERMINIC. CENTRO LESTE DO ESTADO RO' then 38535913
        when FR.nm_fornecedor = 'VIGILANTE DA GLICISE COMERCIO DE PRODUTOS DIABETICOS EIRELI - ME' then 38535914
        when FR.nm_fornecedor = 'WESLEY BORGES DUARTE' then 38535915
        when FR.nm_fornecedor = 'IMPERIUM COMERCIO E SERVIÇOS EIRELI - ME' then 38535916
        when FR.nm_fornecedor = 'JOSE SIMINHUK' then 38535917
        when FR.nm_fornecedor = 'BARROS E BARROS COMERCIO DE MATERIAIS PARA CONSTRUÇÃO LTDA' then 38535918
        when FR.nm_fornecedor = 'L. A. DE PICOLI EIRELI' then 38535919
        when FR.nm_fornecedor = 'FORMANORTE COMERCIO E MANIPULAÇÃO DE MEDICAMENTOS LTDA' then 38535920
        when FR.nm_fornecedor = 'FERTISOLO COMERCIAL DE MAQUINAS E EQUIPAMENTOS LTDA' then 38535921
        when FR.nm_fornecedor = 'J N DISTRIBUIDORA EIRELI - ME' then 38535922
        when FR.nm_fornecedor = 'FLYMED COMERCIO DE PRODUTOS HOSPITALARES' then 38535923
        when FR.nm_fornecedor = 'M.S. DA SILVEIRA COMERCIO DE PRODUTOS FARMACEUTICO LTDA' then 38535924
        when FR.nm_fornecedor = 'K 13 CONFECÇÕES LTDA EPP' then 38535925
        when FR.nm_fornecedor = 'WESLEI DE FREITAS' then 38535926
        when FR.nm_fornecedor = 'EDINALDO SILVA' then 38535927
        when FR.nm_fornecedor = 'MAZZUTTI COMERCIO DE VEICULOS LTDA' then 38535928
        when FR.nm_fornecedor = 'COPEMAQUINAS COMERCIO DE PEÇAS E REPRESENTAÇÃO LTDA' then 38535929
        when FR.nm_fornecedor = 'SILVA E SILVA PRODUTOS FARMACEUTICOS LTDE ME' then 38535930
        when FR.nm_fornecedor = 'COMPUNET INFORMATICA LTDA ME' then 38535931
        when FR.nm_fornecedor = 'ORTOMED COMERCIO DE PRODUTOS MEDICO E HOSPITALARES EIRELI' then 38535932
        when FR.nm_fornecedor = 'ARMAZEM DOS MEDICAMENTOS EIRELLI' then 38535933
        when FR.nm_fornecedor = 'TERRA SUL COMERCIO DE MEDICAMENTOS LTDA' then 38535934
        when FR.nm_fornecedor = 'LUMANN DISTRIBUIDORA DE MEDICAMENTO LTDA' then 38535935
        when FR.nm_fornecedor = 'SIRLEI SOUZA SILVA ALERS' then 38535936
        when FR.nm_fornecedor = 'NORTELAB PRODUTOS LABORATORIAIS EIREL' then 38535937
        when FR.nm_fornecedor = 'BTM COMERCIO DE BRINDES LTDA' then 38535938
        when FR.nm_fornecedor = 'BRS SERVIÇOS DE MONTAGEM DE ESTRUTURAS EIRELI' then 38535939
        when FR.nm_fornecedor = 'NOSSA PHARMACIA LTDA-ME' then 38535940
        when FR.nm_fornecedor = 'PROMAAPHA COMERCIO E DISTRIBUIÇÃO EIRELI' then 38535941
        when FR.nm_fornecedor = 'AURENI LACERDA DE LIMA' then 38535942
        when FR.nm_fornecedor = 'ELO CRIAÇOES TEXTIL LTDA' then 38535943
        when FR.nm_fornecedor = 'VALE COMÉRCIO DE MOTOS LTDA' then 38535944
        when FR.nm_fornecedor = 'FENIX GRILL LTDA' then 38535945
        when FR.nm_fornecedor = 'ORMAR ARAUJO PAVAN' then 38535946
        when FR.nm_fornecedor = 'PFJ COMERCIO DE GASES LTDA' then 38535947
        when FR.nm_fornecedor = 'J BASILIO OXIGENIO ME' then 38535948
        when FR.nm_fornecedor = 'SADINEZ BORGES DA ROSA SERRARIA LTDA' then 38535949
        when FR.nm_fornecedor = 'COMERCIO PSV LTDA-FILIAL' then 38535950
        when FR.nm_fornecedor = 'JAIR DOMINGOS RAFAEL' then 38535951
        when FR.nm_fornecedor = 'AUTOVEMA MOTORS COMERCIO DE CAMINHONETAS LTDA' then 38535952
        when FR.nm_fornecedor = 'GILVANDRO OLIVEIRA DA SILVA' then 38535953
        when FR.nm_fornecedor = 'NEW COMPANY INFORMATICA LTDA' then 38535954
        when FR.nm_fornecedor = 'JRP REPRESENTAÇÕES COMERCIO E SERVIÇOS EIRE' then 38535955
        when FR.nm_fornecedor = 'ODERLEI CEMBRANI' then 38535956
        when FR.nm_fornecedor = 'K. R. PAULUS DOS SANTOS' then 38535957
        when FR.nm_fornecedor = 'FERRARI COMERCIO DE PEÇAS E SERVIÇOS' then 38535958
        when FR.nm_fornecedor = 'SOUZA E CORDEIRO AUTO MECANICA LTDA - ME' then 38535959
        when FR.nm_fornecedor = 'EMPLAKAR PLACAS PARA VEICULOS LTDA' then 38535960
        when FR.nm_fornecedor = 'MARCOS DUMER SCHIMIDT' then 38535961
        when FR.nm_fornecedor = 'DENTAL RONDONIA COMERCIO DE PRODUTOS PARA SAUDE' then 38535962
        when FR.nm_fornecedor = 'MAMORE MAQUINAS AGRICOLAS LTDA EPP' then 38535963
        when FR.nm_fornecedor = 'HOSPSHOP PRODUTOS HOSPITALARES LTDA' then 38535964
        when FR.nm_fornecedor = 'REALMED DISTRIBUIDORA LTDA EPP' then 38535965
        when FR.nm_fornecedor = 'BONIN E BONIN LTDA' then 38535966
        when FR.nm_fornecedor = 'RAMOS E PESSOA LTDA' then 38535967
        when FR.nm_fornecedor = 'P D V PEÇAS EIRELI ME' then 38535968
        when FR.nm_fornecedor = 'BIOTECNOPLUS ASSISTENCIA TECNICA EM EQUIPAMENTOS HOSPITALARES' then 38535969
        when FR.nm_fornecedor = 'SADINEZ BORGES DA ROSA SERRARIA LTDA' then 38535970
        when FR.nm_fornecedor = 'CASA DOS PARAFUSOS COMERCIO DE FERRAGEM E FERRAMENTAS EIRELI' then 38535971
        when FR.nm_fornecedor = 'J BASILIO OXIGENIO ME' then 38535972
        when FR.nm_fornecedor = 'R. A. GONÇALVES OLIVEIRA' then 38535973
        when FR.nm_fornecedor = 'JOSE PRUDENCIO DA SILVA' then 38535974
        when FR.nm_fornecedor = 'RONDOLAB DIAGNOSTICO COMERCIO E SERVIÇOS LTDA' then 38535975
        when FR.nm_fornecedor = 'FAZ CONCRETO COMERCIO E SERVIÇOS EIRELI' then 38535976
        when FR.nm_fornecedor = 'ESFIGMED COMERCIAL HOSPITALAR LTDA' then 38535977
        when FR.nm_fornecedor = 'L. P. ALFA CONSULTORIA EIRELI ME' then 38535978
        when FR.nm_fornecedor = 'VALERIO SOUZA SILVA' then 38535979
        when FR.nm_fornecedor = 'JOICIANE DA SILVA BARRETO' then 38535980
        when FR.nm_fornecedor = 'AUTO-LIM CONTROLE DE VETORES E PRAGAS EIRELI EPP' then 38535981
        when FR.nm_fornecedor = 'MARCOS DUMER SCHIMIDT' then 38535982
        when FR.nm_fornecedor = 'RODOLFO SAPPER LTDA' then 38535983
        when FR.nm_fornecedor = 'CONESUL UNIFORMES PROFICIONAIS LTDA' then 38535984
        when FR.nm_fornecedor = 'C. C. T. MONTOVANI' then 38535985
        when FR.nm_fornecedor = 'MARILZA ALVES CORTES PIRES' then 38535986
        when FR.nm_fornecedor = 'DLB COMERCIO DE PRODUTOS DE INFORMATICA EIRELI' then 38535987
        when FR.nm_fornecedor = 'MEDICAL FARM NORTE COMERCIO LTDA' then 38535988
        when FR.nm_fornecedor = 'UAN COMERCIO E SERVIÇOS EIRELI' then 38535989
        when FR.nm_fornecedor = 'GLOBAL LUX COMERCIO E SERVIÇOS EIRELI-ME' then 38535990
        when FR.nm_fornecedor = 'JGM PRODUTOS PARA SAUDE LTDA' then 38535991
        when FR.nm_fornecedor = 'NORTE TIRES DISTRIBUIDORA DE PNEUS LTDA' then 38535992
        when FR.nm_fornecedor = 'M. DONADO A SILVA COMERCIO E SERVIÇOS' then 38535993
        when FR.nm_fornecedor = 'AC IMOBILIARIA E CONSTRUTORA LTDA' then 38535994
        when FR.nm_fornecedor = 'MATILDE RODRIGUES RIBEIRO DA CONCEICAO LTDA' then 38535995
        when FR.nm_fornecedor = 'NORTÃO PRESTADORA DE SERVIÇOS LTDA' then 38535996
        when FR.nm_fornecedor = 'BA LUIZ INDUSTRIA E COMERCIO DE MATERIAIS ELETRICO' then 38535997
        when FR.nm_fornecedor = 'G.A.G.S SISTEMA FUNERARIO LTDA' then 38535998
        when FR.nm_fornecedor = 'FUNERARIA JESUS NAZARENO' then 38535999
        when FR.nm_fornecedor = 'CAMISETA CLOTESE LTDA' then 38536000
        when FR.nm_fornecedor = 'EDILSON MARCELO DA SILVA' then 38536001
        when FR.nm_fornecedor = 'PVH GASES MEDICINAIS E INDUSTRIAIS LTDA' then 38536002
        when FR.nm_fornecedor = 'CONSTRUTORA MCB LTDA ME' then 38536003
        when FR.nm_fornecedor = 'SA REPRESENTAÇÃO E COMERCIO DE EQUIPAMENTOS LTDA' then 38536004
        when FR.nm_fornecedor = 'MEDICAL CENTER CACOAL LTDA' then 38536005
        when FR.nm_fornecedor = 'MANUPA COMERCIO E EXPORTAÇÃO DE VEICULOS ADAPTADOS EIRELI' then 38536006
        when FR.nm_fornecedor = 'CLEONILDA RAGNEL DE SOUZA 01675114242' then 38536007
        when FR.nm_fornecedor = 'J.PEDRO EIRELI-ME' then 38536008
        when FR.nm_fornecedor = 'BAZAR DISTRIBUIDORA DE UTENCILIOS E DECORAÇÃO LTDA' then 38536009
        when FR.nm_fornecedor = 'LL VILAS EVENTOS LTDA' then 38536010
        when FR.nm_fornecedor = 'ANDRE GIDINAL SANTOS XAVIER' then 38536011
        when FR.nm_fornecedor = 'ALEXANDRE PAULINO SEABRA EIRELLI' then 38536012
        when FR.nm_fornecedor = 'MAQUIPARTS COMERCIO, IMPORTACAO E EXPORTACAO' then 38536013
        when FR.nm_fornecedor = 'JN FABRICA E COMERCIO DE BOLSAS EIRELI' then 38536014
        when FR.nm_fornecedor = 'RAYUDE SOARES' then 38536015
        when FR.nm_fornecedor = 'FABIANA DE SOUZA SILVA' then 38536016
        when FR.nm_fornecedor = 'MARINALVA PEREIRA DE OLIVEIRA' then 38536017
        when FR.nm_fornecedor = 'GNOSE ALVES E COMERCIO LTDA' then 38536018
        when FR.nm_fornecedor = 'COMERCIAL FERREIRA ATACADO E VAREJO LTDA' then 38536019
        when FR.nm_fornecedor = 'GTX ENGENHARIA' then 38536020
        when FR.nm_fornecedor = 'ADELSO RAMOS SOBRINHO COMERCIO DE SUPLIMENTO DE INFORMATICA' then 38536022
        when FR.nm_fornecedor = 'TIAGO DEIVIDI DA CRUZ' then 38536023
        when FR.nm_fornecedor = 'HOMEL INDUSTRIA GRAFICA E COMERCIO DE BRINDES LTDA' then 38536024
        when FR.nm_fornecedor = 'GENESIS MATHEUS KEDEZIERSKI 01279127201' then 38536025
        when FR.nm_fornecedor = 'SOMBRA COMERCIO E SERVIÇOS LTDA' then 38536026
        when FR.nm_fornecedor = 'BETONTECH TECNOLOGIA DE CONCRETO EIRELI' then 38536027
        when FR.nm_fornecedor = 'DUBLIN NEGOCIOS & SERVIÇOS LTDA' then 38536028
        when FR.nm_fornecedor = 'R. V. A. COMERCIO DE ALIMENTOS LTDA' then 38536029
        when FR.nm_fornecedor = 'MARCELO SIMONI' then 38536030
        when FR.nm_fornecedor = 'CASA NOEL LTDA' then 38536031
        when FR.nm_fornecedor = 'BRASIL FLORA INDUSTRIA E BENEFICIAMENTO DE MADEIRA' then 38536032
        when FR.nm_fornecedor = 'BANCO DO BRASIL S/A' then 38536033
        when FR.nm_fornecedor = 'BEM BRASIL COMERCIO DO VESTUARIO LTDA' then 38536034
        when FR.nm_fornecedor = 'GRENAL SERVIÇOS E DISTRIBUIDORA LTDA' then 38536035
        when FR.nm_fornecedor = 'V. VIEIRA AMARO COMERCIO IMPORTALÇAI E EXPORTAÇÃO' then 38536036
        when FR.nm_fornecedor = 'DEBORA ISABELE DE OLIVEIRA SANTOS' then 38536037
        when FR.nm_fornecedor = 'POTENCIAL COMERCIO E SERVICOS ELETRICOS LTDA' then 38536038
        when FR.nm_fornecedor = 'A S DE HOLANDA TEIXEIRA LTDA' then 38536039
        when FR.nm_fornecedor = 'HIGIBEST COMERCIO E SERVICOS LTDA' then 38536040
        when FR.nm_fornecedor = 'CONSELHO REGIONAL DE ENGENHARIA E AGRONOMIA DO ESTADO DE RONDONIA' then 38536041
        when FR.nm_fornecedor = 'ELETRO NOW COMERCIO DE ELETRONICOS LTDA' then 38536042
        when FR.nm_fornecedor = 'LICITANET EIRELLI' then 38536043
        when FR.nm_fornecedor = 'BRUNO PETER AMORIM DE SOUZA' then 38536044
        when FR.nm_fornecedor = 'SAFRAMED HOSPITALAR LTDA' then 38536045
        when FR.nm_fornecedor = 'ENDOGERAIS EQUIPAMENTOS MEDICOS LTDA' then 38536046
        when FR.nm_fornecedor = 'BT COMERCIO INTELIGENTE LTDA' then 38536047
        when FR.nm_fornecedor = 'T R SACOMAN CARNEIRO COMERCIO DE VARIEDADES LTDA' then 38536048
        when FR.nm_fornecedor = 'ARROBA ARTS COMUNICÃO VISUAL LTDA' then 38536049
        when FR.nm_fornecedor = 'GUILHERME DOS SANTOS RIBEIRO' then 38536050
        when FR.nm_fornecedor = 'DENTAL PVH COMERCIO DE PRODUTOS PARA A SAUDE LTDA' then 38536051
        when FR.nm_fornecedor = 'MOLVIMED COMERCIO, IMPORTACAO E EXPORTACAO DE INSTRUMENTOS E PRODUTOS CIRURGICOS LTDA' then 38536052
        when FR.nm_fornecedor = 'SIGNAZ PRODUTOS E NEGOCIOS LTDA' then 38536053
        when FR.nm_fornecedor = 'FABRICIO FERREIRA GOMES ROMANHA' then 38536054
        when FR.nm_fornecedor = 'ASTRO DESIGN LTDA' then 38536055
        when FR.nm_fornecedor = 'COSTA DISTRIBUIDORA HOSPITALAR LTDA' then 38536056
        when FR.nm_fornecedor = 'CIRURGICA CERON IMPORTADORA E EXPORTADORA DE EQUIPAMENTOS HOSPITALARES E VETERINARIOS LTDA' then 38536057
        when FR.nm_fornecedor = 'COMERCIAL BRAGA E SILVA LTDA' then 38536058
        when FR.nm_fornecedor = 'I H S FREITAS SERVICOS E COMERCIO LTDA' then 38536059
        when FR.nm_fornecedor = 'K S SERVIÇOS E MANUTENÇÃO LTDA' then 38536060
        when FR.nm_fornecedor = 'RODA BRASIL - REPRESENTACOES COMERCIO E SERVICOS LTDA' then 38536061
        when FR.nm_fornecedor = 'MANUPA COMÉRCIO EXPORTAÇÃO IMPORTAÇÃO DE EQUIPAMENTOS E VEÍCULOS ADAPTADOS LTDA,' then 38536062
        when FR.nm_fornecedor = 'HERBY VISION BRASIL - TECNOLOGIA EM EDUCAÇÃO LTDA' then 38536063
        when FR.nm_fornecedor = 'COMERCIAL VENUS LTDA' then 38536064
        when FR.nm_fornecedor = 'KARIELE OLIVEIRA FARIAS DOS REIS' then 38536065
        when FR.nm_fornecedor = 'OP QUIRINO DISTRIBUIDORA DE PRODUTOS HOSPITALARES LTDA' then 38536066
        when FR.nm_fornecedor = 'FAGOTTI COMERCIO DE DOCES E EMBALAGENS LTDA' then 38536067
        when FR.nm_fornecedor = 'AMERICA COMERCIO, IMPORTAÇAO E EXPORTAÇAO LTDA' then 38536068
        when FR.nm_fornecedor = 'RISSE & TRINDADE LTDA' then 38536069
        when FR.nm_fornecedor = 'GRAFICA OPCAO LTDA' then 38536070
        when FR.nm_fornecedor = 'CYN SERVICE DIAGNOSTICA LTDA' then 38536071
        when FR.nm_fornecedor = 'ASCLEPIOS EQUIPAMENTOS HOSPITALARES LTDA' then 38536072
        when FR.nm_fornecedor = 'UZZIPAY ADMINISTRADORA DE CONVÊNIOS LTDA' then 38536073
        when FR.nm_fornecedor = 'PROTEJE EXTINTORES LTDA' then 38536074
        when FR.nm_fornecedor = 'INTEGRALMED DISTRIBUIDORA LTDA' then 38536075
        when FR.nm_fornecedor = 'LUIZ AMARAL DE BRITO' then 38536077
        when FR.nm_fornecedor = 'SEBASTIÃO TEIXEIRA ABRANTES' then 38536078
        when FR.nm_fornecedor = 'MARCELO JUNIOR BLASI' then 38536079
        when FR.nm_fornecedor = 'GAZIN INDUSTRIA E COMERCIO DE MOVEIS E EL LTDA.' then 38536080
        when FR.nm_fornecedor = 'MORCEGÃO MOTO PEÇAS LTDA' then 38536081
        when FR.nm_fornecedor = 'VALMIR DIAS DA SILVA' then 38536082
        when FR.nm_fornecedor = 'LUTERO ROSA DO PARAISO' then 38536083
        when FR.nm_fornecedor = 'COM. E INSTALADORA DE ENERGIA PARECIS - ME' then 38536084
        when FR.nm_fornecedor = 'CARMORAES - LTDA' then 38536085
        when FR.nm_fornecedor = 'JOANILTON OLIVEIRA PEREIRA' then 38536086
        when FR.nm_fornecedor = 'PECHIM CIA LTDA-ME' then 38536087
        when FR.nm_fornecedor = 'VALMIR LEMES DA SILVA SANTOS' then 38536088
        when FR.nm_fornecedor = 'JOCELAINE DA LUZ FONSECA CARDOSO-ME' then 38536089
        when FR.nm_fornecedor = 'CLEUS EDELSON GONÇALVES DE ANDRADE' then 38536090
        when FR.nm_fornecedor = 'BANCO CREDIP S/A' then 38536091
        when FR.nm_fornecedor = 'LEIR JOSE DA SILVA' then 38536092
        when FR.nm_fornecedor = 'FUNDO MUNICIPAL DE SAUDE - FMS' then 38536093
        when FR.nm_fornecedor = 'COMERCIO DE ALIMENTOS EXTRA LTDA' then 38536094
        when FR.nm_fornecedor = 'LAURINDO BARBOSA DE SOUZA' then 38536095
        when FR.nm_fornecedor = 'VERONICA VIEIRA DA SILVA' then 38536096
        when FR.nm_fornecedor = 'GILDA MATOS PEREIRA' then 38536097
        when FR.nm_fornecedor = 'LUCIANA DE OLIVEIRA PINTO' then 38536098
        when FR.nm_fornecedor = 'HELIO EGIDIO DA SILVA' then 38536099
        when FR.nm_fornecedor = 'LUNAR COMÉRCIO LTDA' then 38536100
        when FR.nm_fornecedor = 'GENI VIEIRA DA SILVA' then 38536101
        when FR.nm_fornecedor = 'SERGIO LEÃO DE ARAUJO' then 38536102
        when FR.nm_fornecedor = 'EURIDES TEIXEIRA DA SILVA' then 38536103
        when FR.nm_fornecedor = 'ALEXANDRE DE MORAIS GUIMARÃES' then 38536104
        when FR.nm_fornecedor = 'FANA COMERCIO DE EQUIP. PARA INFORMATICA LTDA' then 38536105
        when FR.nm_fornecedor = 'WESP FERREIRA DOS SANTOS' then 38536106
        when FR.nm_fornecedor = 'SC BRINDES LTDA-ME' then 38536107
        when FR.nm_fornecedor = 'KLEIN PINTO BARRETO ME' then 38536108
        when FR.nm_fornecedor = 'CONSTRUTORA E TERRAPLANAGEM LV LTDA' then 38536109
        when FR.nm_fornecedor = 'ROBERTO ROGERIO COSTA' then 38536110
        when FR.nm_fornecedor = 'EMIR RODRIGUES FILHO' then 38536111
        when FR.nm_fornecedor = 'PROINFO- COMERCIO E SERVIÇOS PARA INFORMATICA LTDA' then 38536112
        when FR.nm_fornecedor = 'ZAMIR LUIZ' then 38536113
        when FR.nm_fornecedor = 'BRASIL VEICULOS COMPANHIA DE SEGUROS S/A LTDA' then 38536114
        when FR.nm_fornecedor = 'DISMOBRAS IMP.EXP. E DIST. DE MÓVEIS E ELTRODOM LT' then 38536115
        when FR.nm_fornecedor = 'MARIA NILVA CARDOSO CANDIDO' then 38536116
        when FR.nm_fornecedor = 'DESKTOP TECNOLOGIA LTDA-ME' then 38536117
        when FR.nm_fornecedor = 'ODILIA DE SOUZA OLIVEIRA-ME' then 38536118
        when FR.nm_fornecedor = 'ANA PAULA GOMES DASILVA' then 38536119
        when FR.nm_fornecedor = 'EUZEBIO & SANTIAGO LTDA-ME' then 38536120
        when FR.nm_fornecedor = 'UELÇO CONTADINE VIEIRA' then 38536121
        when FR.nm_fornecedor = 'GUILHERME GULARTE' then 38536122
        when FR.nm_fornecedor = 'ASSOSSIAÇAO RADIO COMUNITARIA ANTENA 1 FM' then 38536123
        when FR.nm_fornecedor = 'NISES MARILDA TRAVAIANI BERNADELI' then 38536124
        when FR.nm_fornecedor = 'SECRETARIA DA RECEITA FEDERAL - PASEP' then 38536125
        when FR.nm_fornecedor = 'I N S S' then 38536126
        when FR.nm_fornecedor = 'J. S. DE AGUIAR MERCADO' then 38536127
        when FR.nm_fornecedor = 'CARLOS EDUARDO BARRETO ACCIOLY' then 38536128
        when FR.nm_fornecedor = 'A. ANTUNES MACIEL - ME' then 38536129
        when FR.nm_fornecedor = 'ANTONIO DE OLIVEIRA' then 38536130
        when FR.nm_fornecedor = 'PAPELARIA E LIVRARIA TREVO LTDA' then 38536131
        when FR.nm_fornecedor = 'CORTY & CORTY LTDA-ME' then 38536132
        when FR.nm_fornecedor = 'ADEMAR LINO CAETANO' then 38536133
        when FR.nm_fornecedor = 'CIMOPAR MOVEIS LTDA' then 38536134
        when FR.nm_fornecedor = 'JEDEÃO SOUZA DA SILVA - ME' then 38536135
        when FR.nm_fornecedor = 'EMPLAKE INDUSTRIAL E COMERCIO DE PLACAS E SERV. LT' then 38536136
        when FR.nm_fornecedor = 'MADEREIRA ANDRES LTDA-ME' then 38536137
        when FR.nm_fornecedor = 'R. DOMINGOS DE LIMA ME' then 38536138
        when FR.nm_fornecedor = 'MARIA QUELIS DE BRITO' then 38536139
        when FR.nm_fornecedor = 'COPELUB COM DE PEÇAS E LUBRIFICANTES ME' then 38536140
        when FR.nm_fornecedor = 'DELMIRO MOURA CESTARI - ME' then 38536141
        when FR.nm_fornecedor = 'RICCI LAMINAÇÃO E TRANSPORTE LTDA-ME' then 38536142
        when FR.nm_fornecedor = 'PONTES & MATHEUS LTDA' then 38536143
        when FR.nm_fornecedor = 'TATIANE SOUZA ROCHA' then 38536144
        when FR.nm_fornecedor = 'TERRARADA MAQUINAS AGRICOLAS LTDA' then 38536145
        when FR.nm_fornecedor = 'MECANICA TUPI LTDA - EPP' then 38536146
        when FR.nm_fornecedor = 'EMPRESA UNIÃO CASCAVEL  DE TRANSP TURISMO LTDA' then 38536147
        when FR.nm_fornecedor = 'VIEIRA & RANITE LTDA' then 38536148
        when FR.nm_fornecedor = 'SILVA E CAVALCANTE COMERCIO DE MAT. P/ CONST. LTDA' then 38536149
        when FR.nm_fornecedor = 'E. DE OLIVEIRA-ME' then 38536150
        when FR.nm_fornecedor = 'M F DE O COSTA ME' then 38536151
        when FR.nm_fornecedor = 'ELIANE FRANCO DE OLIVEIRA LIMA' then 38536152
        when FR.nm_fornecedor = 'CLEUSA MENDES DE SOUZA' then 38536153
        when FR.nm_fornecedor = 'HILGERT & CIA LTDA' then 38536154
        when FR.nm_fornecedor = 'POLARIS MOTOCENTER LTDA' then 38536155
        when FR.nm_fornecedor = 'EQUIPO MEDICA COMERCIAL LTDA' then 38536156
        when FR.nm_fornecedor = 'CAMARA MUNICIPAL DE PARECIS' then 38536157
        when FR.nm_fornecedor = 'CELINO JOSE DE ANDRADE' then 38536158
        when FR.nm_fornecedor = 'BR. DIESEL BOMBA INJETORA LTDA' then 38536159
        when FR.nm_fornecedor = 'FABIO XAVIER VALENTIM' then 38536160
        when FR.nm_fornecedor = 'OSMAR TONINI DA SILVA' then 38536161
        when FR.nm_fornecedor = 'SUCKEL E SUCKEL LTDA' then 38536162
        when FR.nm_fornecedor = 'MOVETERRA  CONSTRUÇÕES E TERRAPLANAGEM LTDA-ME' then 38536163
        when FR.nm_fornecedor = 'ZEANI DE CAMPOS VELOSO ME' then 38536164
        when FR.nm_fornecedor = 'TIGRAO MATERIAIS PARA CONSTRUÇÃO LTDA' then 38536165
        when FR.nm_fornecedor = 'CELESTE REDIVO' then 38536166
        when FR.nm_fornecedor = 'M. F. MONTIBELLER - ME' then 38536167
        when FR.nm_fornecedor = 'SUSANA CANDIDO DA ROCHA' then 38536168
        when FR.nm_fornecedor = 'MÁRIO RAMÃO ASPETT COTT' then 38536169
        when FR.nm_fornecedor = 'ARON-ASSOCIACAO RONDONIENSE DE MUNICIPIO' then 38536170
        when FR.nm_fornecedor = 'IRMA HAMMER BERGER' then 38536171
        when FR.nm_fornecedor = 'I. N. RIBEIRO KUSS - ME' then 38536172
        when FR.nm_fornecedor = 'DEVANI LOPES PEREIRA' then 38536173
        when FR.nm_fornecedor = 'EDUARDO SIQUEIRA DE SOUZA' then 38536174
        when FR.nm_fornecedor = 'NEUZA HOFFMAN' then 38536175
        when FR.nm_fornecedor = 'HELENITO BARRETO PINTO JUNIOR' then 38536176
        when FR.nm_fornecedor = 'SECRETARIA DE  ESTADO DO DESENVOLVIMENTO AMB.' then 38536177
        when FR.nm_fornecedor = 'SECRETARIA DO TESOURO NACIOANL/CONFIN/STN' then 38536178
        when FR.nm_fornecedor = 'CNM - CONFEDERAÇÃO NACIONAL DE MUNICIPIOS' then 38536179
        when FR.nm_fornecedor = 'DANIEL ROSA DA SILVA' then 38536180
        when FR.nm_fornecedor = 'POSTO DE MOLAS MARINGÁ LTDA-ME' then 38536181
        when FR.nm_fornecedor = 'MARCIA NEVES DE ALMEIDA' then 38536182
        when FR.nm_fornecedor = 'SOLANGE MAZUTTI' then 38536183
        when FR.nm_fornecedor = 'VICENTE FRANCISCO MONTELO' then 38536184
        when FR.nm_fornecedor = 'ASTC-ASSOCIAÇÃO DOS SERVIDORES DO TRIBUNAL DE CONT' then 38536185
        when FR.nm_fornecedor = 'J. M. COMERCIO DE PRODUTOS AGROPECUARIOS LTDA' then 38536186
        when FR.nm_fornecedor = 'CHARLENE PNEUS' then 38536187
        when FR.nm_fornecedor = 'PINTO E SILVA COMÉRCIO LTDA' then 38536188
        when FR.nm_fornecedor = 'WR TRANSPORTES LTDA ME' then 38536189
        when FR.nm_fornecedor = 'VALDIR ALVES CANDIDO' then 38536190
        when FR.nm_fornecedor = 'ACETRON' then 38536191
        when FR.nm_fornecedor = 'REFRIGAS REFRIGERAÇÃO LTDA ME' then 38536192
        when FR.nm_fornecedor = 'A BOCA DISCOS E FITAS LTDA ME' then 38536193
        when FR.nm_fornecedor = 'AMARILDO CARDOSO RIBEIRO' then 38536194
        when FR.nm_fornecedor = 'CLAUDIA BARCELOS DE LIMA' then 38536195
        when FR.nm_fornecedor = 'J. J COMERCIO E SERVIÇOS LTDA-ME' then 38536196
        when FR.nm_fornecedor = 'ASSOCIAÇÃO RURAL DE PARECIS - ARPA' then 38536197
        when FR.nm_fornecedor = 'SUGIFER MATERIAIS PARA CONSTRUÇÃO LTDA' then 38536198
        when FR.nm_fornecedor = 'AGNALDO FELISBERTO BATISTA' then 38536199
        when FR.nm_fornecedor = 'IVONE OLIVEIRA SANTOS DUARTE' then 38536200
        when FR.nm_fornecedor = 'GRAZIELI DOS SANTOS DE LIMA' then 38536201
        when FR.nm_fornecedor = 'UNIÃO DOS DIRIGENTES M. DE EDUCAÇÃO RO-UNDIME' then 38536202
        when FR.nm_fornecedor = 'TRANSPORTES SÃO CRISTOVÃO LTDA' then 38536203
        when FR.nm_fornecedor = 'IRINEU DA SILVA TECIDOS ME' then 38536204
        when FR.nm_fornecedor = 'QUELI CRISTINA AGUIAR SILVA BARBOSA' then 38536205
        when FR.nm_fornecedor = 'DIARIO OFICIAL DO ESTADO E OUTROS' then 38536206
        when FR.nm_fornecedor = 'HIARA BRITO TEIXEIRA' then 38536207
        when FR.nm_fornecedor = 'MARCO TULIO SANTOS DUARTE' then 38536208
        when FR.nm_fornecedor = 'WILSON R. DA SILVA ME RODOVIDROS' then 38536209
        when FR.nm_fornecedor = 'UNIVERSAL SERVIÇOS FÚNEBRES LTDA-ME' then 38536210
        when FR.nm_fornecedor = 'MARIA JOSÉ DE SOUZA REIS' then 38536211
        when FR.nm_fornecedor = 'R. DE SOUZA CONSTRUÇÕES, TERRAPLANAGEM E TRANSPORT' then 38536212
        when FR.nm_fornecedor = 'TERRAPLANAGEM PARECIS LTDA - EPP' then 38536213
        when FR.nm_fornecedor = 'J. EUGENIO FUZARI ME' then 38536214
        when FR.nm_fornecedor = 'VALDEVINO LISBOA DE SOUZA' then 38536215
        when FR.nm_fornecedor = 'MERCADO NOVA VIDA LTDA ME' then 38536216
        when FR.nm_fornecedor = 'INDUSTRIA E COMERCIO DE MOVEIS PB LTDA ME' then 38536217
        when FR.nm_fornecedor = 'O BARATÃO UTILIDADES DOMÉSTICAS LTDA' then 38536218
        when FR.nm_fornecedor = 'ANTONIO DOMINGUES RAMOS - ME' then 38536219
        when FR.nm_fornecedor = 'A. R. CONSTRUTORA LTDA ME' then 38536220
        when FR.nm_fornecedor = 'L F IMPORTS LTDA' then 38536221
        when FR.nm_fornecedor = 'JANE HONORATO DE FREITAS' then 38536222
        when FR.nm_fornecedor = 'C R DOS SANTOS  SUAVE ME' then 38536223
        when FR.nm_fornecedor = 'A R DE BARROS ELER ME' then 38536224
        when FR.nm_fornecedor = 'CLAUDINEI BRITO VILA BOAS' then 38536225
        when FR.nm_fornecedor = 'PETROCOSTA COMERCIO DE COMBUSTIVEL LTDA' then 38536226
        when FR.nm_fornecedor = 'OLMIRO THOMAZ MARTINS - ME' then 38536227
        when FR.nm_fornecedor = 'FERNANDES E SALAME ME' then 38536228
        when FR.nm_fornecedor = 'PICA PAU COMERCIO DE MOTOS DA AMOZONIA LTDA' then 38536229
        when FR.nm_fornecedor = 'CLEUS HUMBERTO G. DE ANDRADE' then 38536230
        when FR.nm_fornecedor = 'PAULO GERALDO PEREIRA' then 38536231
        when FR.nm_fornecedor = 'ADELINA AIOAGUI DA SILVA' then 38536232
        when FR.nm_fornecedor = 'ITA TRATORES LTDA ME' then 38536233
        when FR.nm_fornecedor = 'JULIANA ALVES SALOMAO' then 38536234
        when FR.nm_fornecedor = 'ALBINO DA SILVA RIBEIRO' then 38536235
        when FR.nm_fornecedor = 'ANDRADE E VICENTE LTDA' then 38536236
        when FR.nm_fornecedor = 'CRISTINA STRELON HAMMER' then 38536237
        when FR.nm_fornecedor = 'APP CANDIDO PORTINARI / PROINFANTIL' then 38536238
        when FR.nm_fornecedor = 'EDITORA DIARIO DA AMAZONIA LTDA' then 38536239
        when FR.nm_fornecedor = 'ANA BRAULINA PINHO' then 38536240
        when FR.nm_fornecedor = 'MEGA VEICULOS LTDA' then 38536241
        when FR.nm_fornecedor = 'RONDOBRÁS COM. DE PEÇAS E ACESSÓRIOS P/VEICULOS LT' then 38536242
        when FR.nm_fornecedor = 'SEBASTIAO DE FREITAS' then 38536243
        when FR.nm_fornecedor = 'BENEDITO SOARES' then 38536244
        when FR.nm_fornecedor = 'ALMIR FERREIRA DA CRUZ' then 38536245
        when FR.nm_fornecedor = 'JOSMIR SOARES DE AGUIAR' then 38536246
        when FR.nm_fornecedor = 'REDE BRASILEIRA DE PUBLICAÇÕES DE ATOS OF. LTDA-EP' then 38536247
        when FR.nm_fornecedor = 'LUCIDA APARECIDA DE AZEVEDO' then 38536248
        when FR.nm_fornecedor = 'CLEBER BRESSANI DOS SANTOS' then 38536249
        when FR.nm_fornecedor = 'RUTE CEZARIO DE SOUZA' then 38536250
        when FR.nm_fornecedor = 'EMPRESA BRAS. DE CORREIOS E TELEGRAFOS' then 38536251
        when FR.nm_fornecedor = 'J. NEVES E OLIVEIRA LTDA ME' then 38536252
        when FR.nm_fornecedor = 'RODRIGUES E LIMA LTDA ME' then 38536253
        when FR.nm_fornecedor = 'PAULO CESAR DA SILVA' then 38536254
        when FR.nm_fornecedor = 'PAULO FIGUEIREDO CALDEIRA' then 38536255
        when FR.nm_fornecedor = 'ROSANGELA RODRIGUES' then 38536256
        when FR.nm_fornecedor = 'NILTON DA SILVA FERREIRA  - ME' then 38536257
        when FR.nm_fornecedor = 'JOAQUIM PEDRO ALEXANDRINO NETO' then 38536258
        when FR.nm_fornecedor = 'MARINALVA DA SILVA PEREIRA' then 38536259
        when FR.nm_fornecedor = 'GUAPORE MAQUINAS E EQUIPAMENTOS LTDA' then 38536260
        when FR.nm_fornecedor = 'SANTOS E SANTOS COMERCIO DE PEÇAS E BOR. LTDA' then 38536261
        when FR.nm_fornecedor = 'VERA FERREIRA DE OLIVEIRA' then 38536262
        when FR.nm_fornecedor = 'COMERCIAL DE UTENCILIOS DOMÉSTICOS DE RO LTDA' then 38536263
        when FR.nm_fornecedor = 'GOVERNO DO ESTADO DE RONDONIA - DEOSP-RO' then 38536264
        when FR.nm_fornecedor = 'MANOEL DE MEDEIROS' then 38536265
        when FR.nm_fornecedor = 'JORGE LUIZ RAIMUNDO DE MELO' then 38536266
        when FR.nm_fornecedor = 'VEMAQ VEICULOS E MAQUINAS LTDA' then 38536267
        when FR.nm_fornecedor = 'GMR ESPORTES LTDA ME' then 38536268
        when FR.nm_fornecedor = 'PORTELA E OCHIAI VEICULOS LTDA' then 38536269
        when FR.nm_fornecedor = '.' then 38536270
        when FR.nm_fornecedor = 'EDELSON SETTE' then 38536271
        when FR.nm_fornecedor = 'PELSERVICE PEÇAS E SERVIÇOS LTDA' then 38536272
        when FR.nm_fornecedor = 'RETIMAR RETIFICA DE MOTORES LTDA ME' then 38536273
        when FR.nm_fornecedor = 'FRANCISCO CORNELIO ALVES DE LIMA' then 38536274
        when FR.nm_fornecedor = 'JOSEFA FERREIRA RIOS KURYANA' then 38536275
        when FR.nm_fornecedor = 'PAULO CESAR BEZERRA' then 38536276
        when FR.nm_fornecedor = 'SIMONI MLAK DE SOUZA' then 38536277
        when FR.nm_fornecedor = 'DESIVALDO FURTUNATO DOS SANTOS' then 38536278
        when FR.nm_fornecedor = 'IVECO LATIN AMERICA LTDA' then 38536279
        when FR.nm_fornecedor = 'KINCAS COMERCIO DE MATERIAIS P/CONTRUÇAO' then 38536280
        when FR.nm_fornecedor = 'MAX DANIEL DE CARVALHO' then 38536281
        when FR.nm_fornecedor = 'PEDRO SOUZA SILVA' then 38536282
        when FR.nm_fornecedor = 'CONSTRUTORA COSTA E COSTA LTDA - ME' then 38536283
        when FR.nm_fornecedor = 'GOIASTUR TRANSPORTE & TURISMO LTDA-ME' then 38536284
        when FR.nm_fornecedor = 'PREVENTIVA CONS. E ASSES. TECNICA E ADMINISTRATIVA' then 38536285
        when FR.nm_fornecedor = 'DEISE APARECIDA BERNADELI' then 38536286
        when FR.nm_fornecedor = 'MARIA APARECIDA DE AMORIM' then 38536287
        when FR.nm_fornecedor = 'MARCOS ANTONIO RODRIGUES DA CRUZ' then 38536288
        when FR.nm_fornecedor = 'COLADINI E COLADINI LTDA' then 38536289
        when FR.nm_fornecedor = 'ELIONETE PROCHNOW FACHINI' then 38536290
        when FR.nm_fornecedor = 'VANDERLEIA CRUZ DE LIMA' then 38536291
        when FR.nm_fornecedor = 'HS COMERCIO DE PNEUS LTDA-ME' then 38536292
        when FR.nm_fornecedor = 'ROGERIO VICENTE MACHADO' then 38536293
        when FR.nm_fornecedor = 'TORK SUL COMERCIO DE PEÇAS E MAQUINAS LTDA' then 38536294
        when FR.nm_fornecedor = 'ROQUE SETTE' then 38536295
        when FR.nm_fornecedor = 'ABSOLUTA CURSOS S/S LTDA.' then 38536296
        when FR.nm_fornecedor = 'EDIVALTO FRANCISCO DE AMORIM' then 38536297
        when FR.nm_fornecedor = 'JOAQUIM ALVES MARTINS' then 38536298
        when FR.nm_fornecedor = 'MARCELO LORENÇO FERREIRA' then 38536299
        when FR.nm_fornecedor = 'LISBOA & SILVA LTDA-ME' then 38536300
        when FR.nm_fornecedor = 'ALBERTO BARTOLOMEU' then 38536301
        when FR.nm_fornecedor = 'SISPEL SISTEMAS INTEG. DE SOFTWER E PAPELARIA LTD' then 38536302
        when FR.nm_fornecedor = 'MARIA DO SOCORRO VIANA DA COSTA' then 38536303
        when FR.nm_fornecedor = 'EDSON M. DE ARAUJO ME.' then 38536304
        when FR.nm_fornecedor = 'CONSTRUTORA VENTURIM LTDA' then 38536305
        when FR.nm_fornecedor = 'CELSON CANDIDO DA ROCHA' then 38536306
        when FR.nm_fornecedor = 'APCE-ASSOC.DOS PROF.DE AUDIT.E CONTROLE EXT' then 38536307
        when FR.nm_fornecedor = 'PAPELARIA PELIKANO LTDA' then 38536308
        when FR.nm_fornecedor = 'ROSILENE TAKAHASHI BRAVO' then 38536309
        when FR.nm_fornecedor = 'OLINTO ENEAS DE ALENCAR FILHO' then 38536310
        when FR.nm_fornecedor = 'VANTUIL RODRIGUES DE MORAIS' then 38536311
        when FR.nm_fornecedor = 'VANDERLUCIO DA SILVA' then 38536312
        when FR.nm_fornecedor = 'R. DE BRITO & CIA LTDA ME' then 38536313
        when FR.nm_fornecedor = 'EDER PEREIRA DE LIMA' then 38536314
        when FR.nm_fornecedor = 'CONSTRUTORA PAG LTDA - EPP' then 38536315
        when FR.nm_fornecedor = 'IMPLEMENTOS AGRICOLAS ROLIM LTDA' then 38536316
        when FR.nm_fornecedor = 'PAPELARIA LUPI LTDA' then 38536317
        when FR.nm_fornecedor = 'CARDOSO E CASTAGNA E FIM LTDA - ME' then 38536318
        when FR.nm_fornecedor = 'DIEGO DE SOUZA ANDRADE CONTABILIDADE ME' then 38536319
        when FR.nm_fornecedor = 'JOSE & MORAIS LTDA ME' then 38536320
        when FR.nm_fornecedor = 'RONDOSAT TELERADIOCOMUNICAÇAO LTDA' then 38536321
        when FR.nm_fornecedor = 'D  MARCA COMERCIO DE ACESSORIOS PARA INFORMATICA' then 38536322
        when FR.nm_fornecedor = 'DULCELEI DE LIMA ANDRADE' then 38536323
        when FR.nm_fornecedor = 'LILIAN RODRIGUES ANTUNES' then 38536324
        when FR.nm_fornecedor = 'W M DE OLIVEIRA INFORMATICA' then 38536326
        when FR.nm_fornecedor = 'FERNANDO MACHADO DA SILVA' then 38536327
        when FR.nm_fornecedor = 'CLETO APOLINARIO DA CRUZ' then 38536328
        when FR.nm_fornecedor = 'MACHADO & LOPES TRANSPORTES E EXCURSOES LTDA ME' then 38536329
        when FR.nm_fornecedor = 'FREDERICO ANTONIO AUS VALLALVA' then 38536330
        when FR.nm_fornecedor = 'REGIANE CRISTINA DOS SANTOS SOUZA' then 38536331
        when FR.nm_fornecedor = 'ALBERTO SONA NETO INFORMATICA ME' then 38536332
        when FR.nm_fornecedor = 'CONSTRUNOVA COM. DE MAT. DE CONSTRUÇAO LTDA ME' then 38536333
        when FR.nm_fornecedor = 'CONSTRUTURA GLOBO LTDA' then 38536334
        when FR.nm_fornecedor = 'DUDA ELETRO LTDA ME' then 38536335
        when FR.nm_fornecedor = 'COSTA E COSTA COMERCIO LTDA ME' then 38536336
        when FR.nm_fornecedor = 'RONDOTUBOS ARTEFATOS DE CIMENTO LTDA-ME' then 38536337
        when FR.nm_fornecedor = 'LUIZ ANTONIO DE OLIVEIRA' then 38536338
        when FR.nm_fornecedor = 'RECONDICIONADORA DE PNEUS, CELMO LTDA' then 38536339
        when FR.nm_fornecedor = 'MIRIAN QUIRINO DA SILVA' then 38536340
        when FR.nm_fornecedor = 'EGMAR APARECIDO FERREIRA' then 38536341
        when FR.nm_fornecedor = 'D F DE SOUZA OLIVEIRA & CIA LTDA ME' then 38536342
        when FR.nm_fornecedor = 'ADAL VEICULOS LTDA' then 38536343
        when FR.nm_fornecedor = 'JOICE POLIANE MERCLY DE ANDRADE' then 38536344
        when FR.nm_fornecedor = 'JURANDIR RODRIGUES DE MORAIS' then 38536345
        when FR.nm_fornecedor = 'ALESSANDRO AGUIAR DA SILVA' then 38536346
        when FR.nm_fornecedor = 'V. BORSATO ME' then 38536347
        when FR.nm_fornecedor = 'PICA PAU MOTOS LTDA' then 38536348
        when FR.nm_fornecedor = 'ROLAO COM.MATERIAL DE CONSTRUÇAO LTDA' then 38536349
        when FR.nm_fornecedor = 'MARCEL SILVA MONTELO' then 38536350
        when FR.nm_fornecedor = 'RONDONORTE COM.DE PEÇAS E ACESSORIOS AUTOMOTIVOS' then 38536351
        when FR.nm_fornecedor = 'PAS PROJETO ASSESSORIA E SISTEMA LTDA' then 38536352
        when FR.nm_fornecedor = 'COMERCIAL DE ARMARINHOS TOTAL LTDA ME' then 38536353
        when FR.nm_fornecedor = 'MARCIA SANTOS LIMA SOUZA' then 38536354
        when FR.nm_fornecedor = 'EURICO DOS SANTOS' then 38536355
        when FR.nm_fornecedor = 'ADARA COMERCIO DE INFORMATICA E TECNOLOGIA LTDA ME' then 38536356
        when FR.nm_fornecedor = 'SEBASTIAO VIEIRA DA COSTA' then 38536357
        when FR.nm_fornecedor = 'MARCONDES DE CARVALHO' then 38536358
        when FR.nm_fornecedor = 'JAIR PEREIRA DUARTE' then 38536359
        when FR.nm_fornecedor = 'NEIDE CORREIA B. TESCH' then 38536360
        when FR.nm_fornecedor = 'SAGA  CONSTRUÇOES LTDA' then 38536361
        when FR.nm_fornecedor = 'LUIZ MASSARO MATSUI' then 38536362
        when FR.nm_fornecedor = 'ROXANE FERRETO LORENZON' then 38536363
        when FR.nm_fornecedor = 'PARECIS MATERIAIS PARA CONSTRUÇAO LTDA' then 38536364
        when FR.nm_fornecedor = 'MODELO COMERCIO DE MATERIAIS DE CONST.LTDA ME' then 38536365
        when FR.nm_fornecedor = 'LILIAN OLIVEIRA GERONIMO' then 38536366
        when FR.nm_fornecedor = 'PORTAL NACIONAL DE COMPRAS PUBLICA' then 38536371
        when FR.nm_fornecedor = 'TOZZO COMERCIO DE PECAS E SERVICOS LTDA' then 38536374
        when FR.nm_fornecedor = 'REPISO & REPIZO LTDA' then 38536375
        when FR.nm_fornecedor = 'C. MAGALHAES LTDA' then 38536379
        when FR.nm_fornecedor = 'AGUA POTAVEL COM. DE PROC. HIDROCNETICO' then 38538527
        when FR.nm_fornecedor = 'FABRILAR IND. COM. DE MOVEIS LTDA' then 38538528
        when FR.nm_fornecedor = 'CELIA FERREIRA BRESCIANI PENHA ME' then 38538529
        when FR.nm_fornecedor = 'TORK SUL COMERCIO DE PECAS MARQ E SERV LTDA' then 38538530
        when FR.nm_fornecedor = 'CARTORIO BRETAS' then 38538532
        when FR.nm_fornecedor = 'EXTINSEG COM. E RECARGAS DE EXTINTORES' then 38538533
        when FR.nm_fornecedor = 'LAUTERTE & LAUTERTE LTDA ME' then 38538534
        when FR.nm_fornecedor = 'COUTO FRIOREFIGERACOES LTDA' then 38538535
        when FR.nm_fornecedor = 'BAMBOLE B. PRESENTES E PAPELARIA LTDA' then 38538536
        when FR.nm_fornecedor = 'VALDEMAR BELLEI ME' then 38538537
        when FR.nm_fornecedor = 'J. F. COMERCIO E REP DE PROD MED E HOSP' then 38538538
        when FR.nm_fornecedor = 'C. R. OLIVEIRA SORVETES ME' then 38538540
        when FR.nm_fornecedor = 'DM BARBOSA E TEIXEIRA LTDA-ME' then 38538541
        when FR.nm_fornecedor = 'SIRLEY DE F. S. DUARTE XAVIER ME' then 38538542
        when FR.nm_fornecedor = 'J.R.C. MIRANDA LTDA ME' then 38538543
        when FR.nm_fornecedor = 'MOVEIS GAZIN LTDA' then 38538544
        when FR.nm_fornecedor = 'CLINICA DE OLHOS ROLIM DE MOURA' then 38538545
        when FR.nm_fornecedor = 'WILMON MARCOS JUNIOR' then 38538547
        when FR.nm_fornecedor = 'ARCA ENGENHARIA E COMERCIO LTDA' then 38538548
        when FR.nm_fornecedor = 'PORTAL PUBLICO INFORMATICA LTDA' then 38538549
        when FR.nm_fornecedor = 'FABIO RODRIGUES DOS SANTOS ME' then 38538550
        when FR.nm_fornecedor = 'R H S COMERCIO & REPRESENTACOES LTDA' then 38538551
        when FR.nm_fornecedor = 'CONST.E PREST, SERV. ROCHA E SANTOS LTDA' then 38538552
        when FR.nm_fornecedor = 'EMPRESA COLIBRI TRANSPORTES LTDA' then 38538554
        when FR.nm_fornecedor = 'LEISER COMERCIO CONST. E SERVIÇOS LTDA' then 38538555
        when FR.nm_fornecedor = 'W.ISMAIL E CIA LTDA - ME' then 38538556
        when FR.nm_fornecedor = 'AXIAL ENGENHARIA E CONSTRUCOES LTDA' then 38538557
        when FR.nm_fornecedor = 'COMERCIO DE PNEUS ALMEIDA LTDA' then 38538559
        when FR.nm_fornecedor = 'CLINICA DE IMAGEM E DIAG. MAE DE DEUS' then 38538560
        when FR.nm_fornecedor = 'FLORES E BORGES LTDA' then 38538562
        when FR.nm_fornecedor = 'TBM - TERRAPLANAGEM BORGES E MECANICA LA' then 38538563
        when FR.nm_fornecedor = 'J. L. CONSTRUÇÕES E SERVIÇOS DE JARDINAGEM LTDA' then 38538564
        when FR.nm_fornecedor = 'DENTAL MEDICA' then 38538565
        when FR.nm_fornecedor = 'SISMED - COM E REPRESENTAÇÕES LTDA - ME' then 38538566
        when FR.nm_fornecedor = 'A. J. ALVES E CIA LTDA - EPP' then 38538567
        when FR.nm_fornecedor = 'LABNORTE PRODUTOS E EQUIPAMENTOS LTDA' then 38538568
        when FR.nm_fornecedor = 'AGUIA EMPRESA DE TRANSPORTE E TURISMO LTDA - ME' then 38538570
        when FR.nm_fornecedor = 'JADER NORTE MOTORES LTDA' then 38538571
        when FR.nm_fornecedor = 'P.APOLINARIO FILHO-ME' then 38538572
        when FR.nm_fornecedor = 'PARAUTO AUTO PECAS LTDA' then 38538573
        when FR.nm_fornecedor = 'POSTO DE MOLAS J. LAZAROTTO LTDA ME' then 38538574
        when FR.nm_fornecedor = 'T. R. REFRIGERAÇÃO LTDA - ME' then 38538575
        when FR.nm_fornecedor = 'W. J. DE LIMA' then 38538576
        when FR.nm_fornecedor = 'EMPRAL PESQUISAS LTDA' then 38538577
        when FR.nm_fornecedor = 'CACOAL MOTO SERRAS LTDA.' then 38538578
        when FR.nm_fornecedor = 'MARCIA OTTO BARRIENTOS ME' then 38538579
        when FR.nm_fornecedor = 'JIRAUTO AUTOMOVEIS LTDA' then 38538580
        when FR.nm_fornecedor = 'STIGMA COMERCIAL LTDA' then 38538581
        when FR.nm_fornecedor = 'INK SOFT SUPRIMENTOS DE INFORMATICA LTDA' then 38538582
        when FR.nm_fornecedor = 'ITAGUAI COMERCIO E EMPREENDIMENTOS LTDA' then 38538583
        when FR.nm_fornecedor = 'ARTHUR OZORIO DA SILVA LTDA' then 38538585
        when FR.nm_fornecedor = 'DARTORA & CIA LTDA' then 38538586
        when FR.nm_fornecedor = 'JOAO APARECIDO NERI DOS SANTOS' then 38538587
        when FR.nm_fornecedor = 'NELSON SILVA & CIA LTDA' then 38538588
        when FR.nm_fornecedor = 'TITO STIPP MEE' then 38538590
        when FR.nm_fornecedor = 'ATLANTICO COMERCIO E PERFURAÇÃO DE POÇOS ARTESIANOS LTDA' then 38538591
        when FR.nm_fornecedor = 'MOVEIS ROMERA LTDA' then 38538592
        when FR.nm_fornecedor = 'M. C. RODRIGUES MAQUINAS E EQUIPAMENTOS PARA ESCRITORIO - ME' then 38538593
        when FR.nm_fornecedor = 'BIOCAL COMERCIO E REPRESENTAÇÕES LTDA' then 38538594
        when FR.nm_fornecedor = 'BOAS NOVAS TURISMO LTDA EPP' then 38538595
        when FR.nm_fornecedor = 'SUPER MOTO . COM DE MOTOS E PEÇAS LTDA ME' then 38538596
        when FR.nm_fornecedor = 'DERLY S. DA SILVA METALURGICA  - ME' then 38538597
        when FR.nm_fornecedor = 'KCINCO CAMINHOES E ONIBUS LTDA' then 38538598
        when FR.nm_fornecedor = 'RAUL ALCANTARA SILVA' then 38538599
        when FR.nm_fornecedor = 'OLYMPUS' then 38538600
        when FR.nm_fornecedor = 'V.S DOS SANTOS LIVRARIA E PAPELARIA ME' then 38538601
        when FR.nm_fornecedor = 'COMPEX COMERCIAL LTDA' then 38538602
        when FR.nm_fornecedor = 'GTA COMERCIO DE MATERIAIS ELETRICOS LTDA ME' then 38538603
        when FR.nm_fornecedor = 'EDIVALDO ALVES MORREIRA' then 38538604
        when FR.nm_fornecedor = 'COIMBRA IMPORTAÇÃO E EXPORTAÇÃO LTDA' then 38538605
        when FR.nm_fornecedor = 'MASTTER MOTO COMERCIO DE VEICULO E MOTOS LTDA' then 38538606
        when FR.nm_fornecedor = 'MAM LATIM AMERICA INDUSTRIA E COMERCIO DE VEI CULO' then 38538607
        when FR.nm_fornecedor = 'SCROCCA ELETRO ELETRONICOS EIRELI ME' then 38538608
        when FR.nm_fornecedor = 'SOLUÇÃO PLANEJAMENTO E COMERCIO LTDA' then 38538609
        when FR.nm_fornecedor = 'ROSSATO E BERTHOLD LTDA' then 38538610
        when FR.nm_fornecedor = 'G1 MOVEIS ELETRODOMESTICO LTDA -ME ' then 38538611
        when FR.nm_fornecedor = 'ZICO DIAS DE PAULA  - ME' then 38538612
        when FR.nm_fornecedor = 'LAJA LTDA - ME' then 38538613
        when FR.nm_fornecedor = 'CAMARA INFORMATICA LTDA - ME' then 38538614
        when FR.nm_fornecedor = 'INOVAX TELEINFORMATICA LTDA' then 38538615
        when FR.nm_fornecedor = 'GAZIN INDUSTRIA E COMERCIO DE MOVEIS E ELETRODOMESTICO LTDA' then 38538616
        when FR.nm_fornecedor = 'COMERCIAL AGRICOLA CAPRI LTDA' then 38538617
        when FR.nm_fornecedor = 'CASA DA LAVOURA MAQUNAS E IMPLEMANTOS AGRICULAS' then 38538618
        when FR.nm_fornecedor = 'R K INDUSTRIA DE IMPLEMANTOS AGRICOLAS LTDA' then 38538619
        when FR.nm_fornecedor = 'SANTOS E MAYER COMERCIO DE EQUIPAMENTOS DE INFORMATICA LTDA' then 38538620
        when FR.nm_fornecedor = 'RONDONIA COMERCIO DE CAMINHOES E MAQUINAS LTDA' then 38538621
        when FR.nm_fornecedor = 'FOCO PROJETOS EDUCACIONAIS LTDA-ME' then 38538622
        when FR.nm_fornecedor = 'NISSEY MOTORS LTDA' then 38538623
        when FR.nm_fornecedor = 'VS COSTA E CIA LTDA' then 38538624
        when FR.nm_fornecedor = 'MARIA LUIZA DA SILVA-ME' then 38538625
        when FR.nm_fornecedor = 'MASCARELLO CARROCERIAS E ONIBUS LTDA' then 38538626
        when FR.nm_fornecedor = 'OLMI INFORMATICA LTDA - EPP' then 38538627
        when FR.nm_fornecedor = 'CRONO COMERCIO E DISTRIBUIÇÃO EIRELI' then 38538628
        when FR.nm_fornecedor = 'MILANFLEX INDUSTRIA E COMERCIO DE MOVEIS E EQUIPAMENTOS LTDA' then 38538629
        when FR.nm_fornecedor = 'VENEZIA COMERCIO DE CAMINHOES LTDA CACOAL' then 38538630
        when FR.nm_fornecedor = 'MOBEN COMERCIO DE VEICULOS LTDA' then 38538631
        when FR.nm_fornecedor = 'SABENAUTO COMERCIO DE VEICULO LTDA' then 38538632
        when FR.nm_fornecedor = 'MOVEIS CAMILA/YOKOTA E BARBOSA LTDA ME' then 38538633
        when FR.nm_fornecedor = 'COMERCIAL VANGUARDEIRA EIRELLI ME' then 38538634
        when FR.nm_fornecedor = 'PPS PRODUTOS PARA SAUDE LTDA EPP' then 38538635
        when FR.nm_fornecedor = 'S3 EMPREENDIMENTOS COMERCIO E LOCAÇÕES EIRELI - EPP' then 38538636
        when FR.nm_fornecedor = 'AUTOVEMA VEICULOS LTDA' then 38538637
        when FR.nm_fornecedor = 'JOSE DONIZETE PICOLLI' then 38538638
        when FR.nm_fornecedor = 'TOYOTA DO BRASIL LTDA' then 38538639
        when FR.nm_fornecedor = 'CODRASA COMÉRCIO E CONSTRUÇÕES EIRELI' then 38538640
        when FR.nm_fornecedor = 'TERRA FORTE LTDA ME' then 38538641
        when FR.nm_fornecedor = 'SISTERPEL SUPRIMENTOS PARA INFORMÁTICA LTDA ME' then 38538642
        when FR.nm_fornecedor = 'JAIRO ANTONIO ZANATTA' then 38538643
        when FR.nm_fornecedor = 'CONSTRUTORA HC LTDA EPP' then 38538644
        when FR.nm_fornecedor = 'GIL INFORMATICA LTDA' then 38538645
        when FR.nm_fornecedor = 'NEIANDER STORCH EIRELI ME' then 38538646
        when FR.nm_fornecedor = 'GOMES VEICULOS ESPECIAIS EIRELI' then 38538647
        when FR.nm_fornecedor = 'EVALDO F.PESSOA ME' then 38538648
        when FR.nm_fornecedor = 'ITALBUS CARROCERIAS DE ONIBUS LTDA' then 38538649
        when FR.nm_fornecedor = 'M. PICIANI PAZINATO COMERCIO DE MATERIAIS ELETRONICOS  - EIRELI' then 38538650
        when FR.nm_fornecedor = 'AUDAX CONSTRUÇÕES E TERRAPLANAGEM EIRELI EPP' then 38538651
        when FR.nm_fornecedor = 'DANTASTERRA LTDA EPP' then 38538652
        when FR.nm_fornecedor = 'MILANI CONSTRUTORA DE EDIF. E TERRAPL. LDTA' then 38538653
        when FR.nm_fornecedor = 'CLEIDE BEATRIZ IORIS EIRELI' then 38538654
        when FR.nm_fornecedor = 'ALFA COMUNICAÇÃO VISUAL EIRELLI ME' then 38538655
        when FR.nm_fornecedor = 'RR COMERCIO DE ELETROELETRONICOS EIRELI' then 38538656
        when FR.nm_fornecedor = 'W F DE ALMEIDA' then 38538657
        when FR.nm_fornecedor = 'ERICA DE FATIMA GENTIL' then 38538658
        when FR.nm_fornecedor = 'E. V. FERNANDES' then 38538659
        when FR.nm_fornecedor = 'MJ ENGENHARIA LTDA' then 38538660
        when FR.nm_fornecedor = 'KCR INDUTRIA E COMERCIO DE EQUIPAMENTOS EIRELI-EPP' then 38538661
        when FR.nm_fornecedor = 'PRIMEMED EQUIPAPENTOS LTDA' then 38538662
        when FR.nm_fornecedor = 'HJ COMERCIO E SERVIÇOS LTDA' then 38538663
        when FR.nm_fornecedor = 'SIDNEY DO NASCIMENTO' then 38538664
        when FR.nm_fornecedor = 'DALTO & DALTO LTDA' then 38538665
        when FR.nm_fornecedor = 'MVP ELETRODOMESTICOS E EQUIPAMENTOS EIRELI' then 38538666
        when FR.nm_fornecedor = 'COVEZI CAMINHOES E ONIBUS LTDA' then 38538667
        when FR.nm_fornecedor = '2M COMERCIO DE VEICULOS LTDA' then 38538668
        when FR.nm_fornecedor = 'REDNOV FERRAMENTAS LTDA' then 38538669
        when FR.nm_fornecedor = 'VIXBOT SOLUÇÕES EM INFORMATICA LTDA ME' then 38538670
        when FR.nm_fornecedor = 'AUTOVEMA VEICULOS LTDA' then 38538671
        when FR.nm_fornecedor = 'PINAFO ATERRO E CASCALHO LTDA ME' then 38538672
        when FR.nm_fornecedor = 'NFM SILVA CONSTRUÇOES EIRELI' then 38538673
        when FR.nm_fornecedor = 'CR CONSTRUTORA E SERVIÇOS ESPECIALIZADO LTDA' then 38538674
        when FR.nm_fornecedor = 'M R DA GRACA SOUZA COMERCIO E REPRESENTACOES' then 38538675
        when FR.nm_fornecedor = 'BR PRIME COM.E SERVIÇOS LTDA' then 38538676
        when FR.nm_fornecedor = 'COSTA E COSTA COMERCIO HOSPITALAR LTDA' then 38538677
        when FR.nm_fornecedor = 'BIDDEN COMERCIAL LTDA' then 38538678
        when FR.nm_fornecedor = 'EVORA COM.SERV.EQUIP.MEDICOS ODONTOLOGIC' then 38538679
        when FR.nm_fornecedor = 'CLARO MED EQUIPAMENTOS MEDICO HOSPITALAR LTDA' then 38538680
        when FR.nm_fornecedor = 'CUSTOMIZAR DESING COMERCIO E SERVIÇOS LTDA' then 38538681
        when FR.nm_fornecedor = 'LOPES E SOUZA SOLUÇOES INTEGRADAS LTDA' then 38538682
        when FR.nm_fornecedor = 'V M CONSTRUTORA LTDA EPP' then 38538684
        when FR.nm_fornecedor = 'FELIPE NEVES DE SOUZA' then 38538685
        when FR.nm_fornecedor = 'SANIGRAN LTDA ME' then 38538686
        when FR.nm_fornecedor = 'ARUMAS INFORMATICAS LTDA' then 38538687
        when FR.nm_fornecedor = 'ECS CONST COM SERV LOC EQUIPAMENTOS LTDA' then 38538688
        when FR.nm_fornecedor = 'GADITA COMERCIO DE PRODUTOS PERMANENTES E DE CONSU' then 38538689
        when FR.nm_fornecedor = 'C E CARVALHO COMERCIAL ME' then 38538690
        when FR.nm_fornecedor = 'HIPER OBRAS LTDA' then 38538691
        when FR.nm_fornecedor = 'RR LOPES EIRELI ME' then 38538692
        when FR.nm_fornecedor = 'CIRURGICA SAO FELIPE PROT. PARA SAUDE EIRELI' then 38538693
        when FR.nm_fornecedor = 'ALTA FREQUENCIA LTDA' then 38538694
        when FR.nm_fornecedor = 'CENTRO OESTE COMERCIO IMP. E EXP. DE PROD. HOSP.' then 38538695
        when FR.nm_fornecedor = 'LONDRIHOSP IMP E EXPORT DE PRODUTOS HOSP.' then 38538696
        when FR.nm_fornecedor = 'P.A.R FRANCA INFORMATICA' then 38538697
        when FR.nm_fornecedor = 'TRANSMAC LOCACOES LTDA' then 38538698
        when FR.nm_fornecedor = 'APFORM INDUSTRIA E COMERCIO DE MOVEIS LTDA' then 38538699
        when FR.nm_fornecedor = 'INSTRAMED IND.MEDICO HOSPITALAR LTDA' then 38538700
        when FR.nm_fornecedor = 'CONST.UMUARAMA LTDA/EGM SERV.CONTRUS.LTDA' then 38538701
        when FR.nm_fornecedor = 'PEDRO G. FERNANDES' then 38538702
        when FR.nm_fornecedor = 'PUBLITEK TI TECNOLOGIA LTDA' then 38538703
        when FR.nm_fornecedor = 'DK INFORMATICA LTDA' then 38538704
        when FR.nm_fornecedor = 'REPREMIG REPRESENTACAO E COMERCIO DE MINAS GERAIS' then 38538705
        when FR.nm_fornecedor = 'MR TECH INFORMATICA LTDA' then 38538706
        when FR.nm_fornecedor = 'A. PAZINATO MARINGA' then 38538707
        when FR.nm_fornecedor = 'INSTALADORA SOLUZ LTDA ME' then 38538708
        when FR.nm_fornecedor = 'COMERCIO DE ALIMENTOS EXTRA LTDA-MEE' then 38536094
                                           end as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS fornecedor,
        JSON_QUERY((SELECT 'INDIVIDUAL' as valor,
                                           'INDIVIDUAL' as descricao FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS tipoParticipacao,
        'false' as representanteLegal,
        'false' as declaracaoMPE,
        LF.dt_ValidadeInicial as dhCredenciamento,
        JSON_QUERY((SELECT 'HABILITADO' as valor,
                                           'HABILITADO' as descricao FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS situacaoDocumentacao
        from COMPLicitacaoFornecedores LF
        join COMPLicitacao LC on LF.nr_licitacao = LC.nr_licitacao
        join COMPFornecedores FR on LF.cd_fornecedor = FR.cd_fornecedor
        where LF.aa_licitacao = 2024 and LC.aa_licitacao = 2024
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            return {
                conteudo: {
                    processoAdministrativo: {
                        id: JSON.parse(record.processoAdministrativo).id
                    },
                    fornecedor: {
                        id: JSON.parse(record.fornecedor).id
                    },
                    tipoParticipacao: JSON.parse(record.tipoParticipacao),
                    representanteLegal: JSON.parse(record.representanteLegal),
                    declaracaoMPE: JSON.parse(record.declaracaoMPE),
                    dhCredenciamento: formatDate(record.dhCredenciamento),
                    situacaoDocumentacao: JSON.parse(record.situacaoDocumentacao)
                }
            };
        });

        /*   const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        return
 */

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

                const response = await fetch(`https://compras.betha.cloud/compras-services/api/conversoes/lotes/participante-licitacao`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 25a840ae-b57a-4030-903a-bcccf2386f30'
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

        // Save the report in 'report.json'
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));
        console.log('Relatório salvo em report.json com sucesso.');

        // Save the reportIds in the 'report_id.json' file
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