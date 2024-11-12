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
	ROW_NUMBER() OVER (ORDER BY imoveis.cd_cecam) + 15.069 AS idIntegracao,
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
WHEN c.nm_Contribuinte = 'LUIZ CARLOS TEIXEIRA BARBOSA DE ALENCAR'THEN 27629261	
WHEN c.nm_Contribuinte = 'LUIZ DA SILVA NOGUEIRA'THEN 28930379	
WHEN c.nm_Contribuinte = 'LUIZ FOGACA'THEN 27629145	
WHEN c.nm_Contribuinte = 'LUIZ MARQUES DOS SANTOS'THEN 27629140	
WHEN c.nm_Contribuinte = 'LUIZ POLICARPO DE GOUVEIA'THEN 27629314	
WHEN c.nm_Contribuinte = 'LUIZ POLICARPO DE GOUVEIA'THEN 27628050	
WHEN c.nm_Contribuinte = 'LUIZA ALVES DA SILVA'THEN 27629146	
WHEN c.nm_Contribuinte = 'LUIZA ALVES DA SILVA'THEN 27629326	
WHEN c.nm_Contribuinte = 'LUNA BRETAS LIMA'THEN 27628821	
WHEN c.nm_Contribuinte = 'LURDES MLAK'THEN 28930512	
WHEN c.nm_Contribuinte = 'LUZIA DOMINGOS FERRAZ'THEN 27629267	
WHEN c.nm_Contribuinte = 'LUZIA RODRIGUES DE CARVALHO'THEN 27628098	
WHEN c.nm_Contribuinte = 'LUZIA STERNAITE CANDIDO'THEN 27629192	
WHEN c.nm_Contribuinte = 'LUZIA XAVIER LIMA E OUTROS'THEN 27629174	
WHEN c.nm_Contribuinte = 'LUZILENE FORNACIARI'THEN 27628081	
WHEN c.nm_Contribuinte = 'MADALENA SENHORINHA GUEDES'THEN 27629071	
WHEN c.nm_Contribuinte = 'MADEIREIRA ANDRES LTDA ME ALIENADO A SICOOB CEDULA Nº464567 'THEN 27629280	
WHEN c.nm_Contribuinte = 'MANOEL FERREIRA GOMES'THEN 27628052	
WHEN c.nm_Contribuinte = 'MANOEL FERREIRA GOMES'THEN 27628077	
WHEN c.nm_Contribuinte = 'MANOEL GONÇALVES DA SILVA'THEN 27628318	
WHEN c.nm_Contribuinte = 'MANOEL JOSE FEREIRA'THEN 27628757	
WHEN c.nm_Contribuinte = 'MANOEL JOSE FEREIRA'THEN 27628758	
WHEN c.nm_Contribuinte = 'MANOEL MESSIAS DE MACEDO GOMES'THEN 27628128	
WHEN c.nm_Contribuinte = 'MARCELO FABIANO MONTIBELLER'THEN 28971357	
WHEN c.nm_Contribuinte = 'MARCELO FABIANO MONTIBELLER'THEN 28971536	
WHEN c.nm_Contribuinte = 'MARCELO MARTINS DA SILVA'THEN 27629056	
WHEN c.nm_Contribuinte = 'MARCELO VIDOTTO'THEN 27629317	
WHEN c.nm_Contribuinte = 'MARCIANA MORAIS FLORENCIO'THEN 28930395	
WHEN c.nm_Contribuinte = 'MARCILEY DE CARVALHO ALIENADO A SICOOB CREDIP CED.151327/DT'THEN 27629127	
WHEN c.nm_Contribuinte = 'MARCILEY DE CARVALHO ALIENADO A SICOOB CREDIP CED.151327/DT'THEN 27629126
end as idImoveis,
--------------------------------------------------------------------------------
CASE
WHEN c.nm_Contribuinte = 'LUIZ ANTONIO AGUIAR' THEN 77020446
WHEN c.nm_Contribuinte = 'LUIZ CARLOS BEZERRA' THEN 77021091
WHEN c.nm_Contribuinte = 'LUIZ CARLOS DE OLIVEIRA' THEN 77020943
WHEN c.nm_Contribuinte = 'LUIZ CARLOS TEIXEIRA BARBOSA DE ALENCAR' THEN 77021070
WHEN c.nm_Contribuinte = 'LUIZ DA SILVA NOGUEIRA' THEN 77020546
WHEN c.nm_Contribuinte = 'LUIZ DA SILVA NOGUEIRA' THEN 77020547
WHEN c.nm_Contribuinte = 'LUIZ FELIPE SILVA BARBOSA' THEN 77021321
WHEN c.nm_Contribuinte = 'LUIZ FOGACA' THEN 77020940
WHEN c.nm_Contribuinte = 'LUIZ MARCOS DOS SANTOS' THEN 77020492
WHEN c.nm_Contribuinte = 'LUIZ MARQUES DOS SANTOS' THEN 77021058
WHEN c.nm_Contribuinte = 'LUIZ PEREIRA SOBRINHO' THEN 77020619
WHEN c.nm_Contribuinte = 'LUIZ PEREIRA SOBRINHO' THEN 77520921
WHEN c.nm_Contribuinte = 'LUIZ POLICARPO DE GOUVEIA' THEN 77021297
WHEN c.nm_Contribuinte = 'LUIZ RIBEIRO DE SOUZA' THEN 77020628
WHEN c.nm_Contribuinte = 'LUIZA ALVES DA SILVA' THEN 77021451
WHEN c.nm_Contribuinte = 'LUNA BRETAS LIMA' THEN 77021354
WHEN c.nm_Contribuinte = 'LURDES MLAK' THEN 77020806
WHEN c.nm_Contribuinte = 'LUZIA DOMINGOS FERRAZ' THEN 77021994
WHEN c.nm_Contribuinte = 'LUZIA RODRIGUES DE CARVALHO' THEN 77021482
WHEN c.nm_Contribuinte = 'LUZIA STERNAITE CANDIDO' THEN 77021635
WHEN c.nm_Contribuinte = 'LUZIA XAVIER LIMA E OUTROS' THEN 77021534
WHEN c.nm_Contribuinte = 'LUZILENE FORNACIARI' THEN 77021144
WHEN c.nm_Contribuinte = 'LUZILENE FORNACIARI' THEN 77021145
WHEN c.nm_Contribuinte = 'M & M ODONTOLOGIA LTDA' THEN 77521092
WHEN c.nm_Contribuinte = 'M. F. MONTIBELLER-ME' THEN 77521012
WHEN c.nm_Contribuinte = 'M.A.R. DA CRUZ - ME' THEN 77520977
WHEN c.nm_Contribuinte = 'M.A.T. MARTINS - ME' THEN 77520979
WHEN c.nm_Contribuinte = 'MADALENA SENHORINHA GUEDES' THEN 77020886
WHEN c.nm_Contribuinte = 'MADALENA SENHORINHA GUEDES' THEN 77020894
WHEN c.nm_Contribuinte = 'MADEIRA 3D LTDA-ME' THEN 77021004
WHEN c.nm_Contribuinte = 'MADEIREIRA ANDRES LTDA ME ALIENADO A SICOOB CEDULA Nº464567 ' THEN 77021136
WHEN c.nm_Contribuinte = 'MADEIREIRA ANDRES LTDA ME' THEN 77520973
WHEN c.nm_Contribuinte = 'MADEIREIRA SAYONARA LTDA-ME' THEN 77520992
WHEN c.nm_Contribuinte = 'MADEREIRA 3 D LTDA - ME' THEN 77520926
WHEN c.nm_Contribuinte = 'MADEREIRA MADEK LTDA ME' THEN 77020918
WHEN c.nm_Contribuinte = 'MADEREIRA MADEK' THEN 77520925
WHEN c.nm_Contribuinte = 'MAISA BRETTAS' THEN 77020400
WHEN c.nm_Contribuinte = 'MAISA SANTANA BRETAS' THEN 77020653
WHEN c.nm_Contribuinte = 'MANOEL ALVES DE AGUIAR' THEN 77021026
WHEN c.nm_Contribuinte = 'MANOEL ALVES DE AGUIAR' THEN 77021256
WHEN c.nm_Contribuinte = 'MANOEL CLEMENTINO GOMES' THEN 77020996
WHEN c.nm_Contribuinte = 'MANOEL FERREIRA ANJOS' THEN 77521002
WHEN c.nm_Contribuinte = 'MANOEL FERREIRA GOMES' THEN 77020464
WHEN c.nm_Contribuinte = 'MANOEL GONÇALVES DA SILVA' THEN 77021108
WHEN c.nm_Contribuinte = 'MANOEL JOSE FEREIRA' THEN 77021493
WHEN c.nm_Contribuinte = 'MANOEL MESSIAS DE MACEDO GOMES' THEN 77021355
WHEN c.nm_Contribuinte = 'MANOEL MESSIAS DE MACEDO GOMES' THEN 77521036
WHEN c.nm_Contribuinte = 'MANOEL NICOLAU DE SOUZA NETO' THEN 77020761
WHEN c.nm_Contribuinte = 'MANOEL PEREIRA DA SILVA' THEN 77020577
WHEN c.nm_Contribuinte = 'MANOEL PEREIRA DA SILVA' THEN 77520923
WHEN c.nm_Contribuinte = 'MARCELO BOTELHO ANDRADE' THEN 77021057
WHEN c.nm_Contribuinte = 'MARCELO DE OLIVEIRA SALA' THEN 77020898
WHEN c.nm_Contribuinte = 'MARCELO DE OLIVEIRA SALA' THEN 77021294
WHEN c.nm_Contribuinte = 'MARCELO FABIANO MONTIBELLER' THEN 82222820
WHEN c.nm_Contribuinte = 'MARCELO FEREIRA LOPES' THEN 77021192
WHEN c.nm_Contribuinte = 'MARCELO FIGUEIREDO MOTA' THEN 77021131
WHEN c.nm_Contribuinte = 'MARCELO HENRIQUE PEREIRA BARROS' THEN 77021964
WHEN c.nm_Contribuinte = 'MARCELO LOURENCO FERREIRA' THEN 77020634
WHEN c.nm_Contribuinte = 'MARCELO LOURENCO FERREIRA' THEN 77020860
WHEN c.nm_Contribuinte = 'MARCELO MARINHO DE SOUZA' THEN 77021303
WHEN c.nm_Contribuinte = 'MARCELO MARTINS DA SILVA' THEN 77021117
WHEN c.nm_Contribuinte = 'MARCELO VIDOTTO' THEN 77021363
WHEN c.nm_Contribuinte = 'MARCIA MARIA LENZI' THEN 77021507
WHEN c.nm_Contribuinte = 'MARCIANA MORAIS FLORENCIO' THEN 77021755
WHEN c.nm_Contribuinte = 'MARCILEY DE CARVALHO ALIENADO A SICOOB CREDIP CED.151327/DT' THEN 77021130
WHEN c.nm_Contribuinte = 'MARCILEY DE CARVALHO' THEN 77020635
WHEN c.nm_Contribuinte = 'MARCILEY DE CARVALHO' THEN 77520915
end as idProprietario,
--------------------------------------------------------------------------------
CASE
when c.nm_Contribuinte = 'LUIZ CARLOS BEZERRA' THEN 10937812
when c.nm_Contribuinte = 'LUIZ CARLOS BEZERRA' THEN 10937849
when c.nm_Contribuinte = 'LUIZ CARLOS BEZERRA' THEN 10937887
when c.nm_Contribuinte = 'LUIZ CARLOS BEZERRA' THEN 10937888
when c.nm_Contribuinte = 'LUIZ CARLOS DE OLIVEIRA' THEN 10937152
when c.nm_Contribuinte = 'LUIZ CARLOS DE OLIVEIRA' THEN 10937153
when c.nm_Contribuinte = 'LUIZ CARLOS DE OLIVEIRA' THEN 10937192
when c.nm_Contribuinte = 'LUIZ CARLOS TEIXEIRA BARBOSA DE ALENCAR' THEN 10937682
when c.nm_Contribuinte = 'LUIZ CARLOS TEIXEIRA BARBOSA DE ALENCAR' THEN 10937832
when c.nm_Contribuinte = 'LUIZ CARLOS TEIXEIRA BARBOSA DE ALENCAR' THEN 10937833
when c.nm_Contribuinte = 'LUIZ DA SILVA NOGUEIRA' THEN 10933979
when c.nm_Contribuinte = 'LUIZ DA SILVA NOGUEIRA' THEN 10934039
when c.nm_Contribuinte = 'LUIZ DA SILVA NOGUEIRA' THEN 10934041
when c.nm_Contribuinte = 'LUIZ DA SILVA NOGUEIRA' THEN 10934061
when c.nm_Contribuinte = 'LUIZ DA SILVA NOGUEIRA' THEN 10934086
when c.nm_Contribuinte = 'LUIZ DA SILVA NOGUEIRA' THEN 10934090
when c.nm_Contribuinte = 'LUIZ DA SILVA NOGUEIRA' THEN 10934096
when c.nm_Contribuinte = 'LUIZ DA SILVA NOGUEIRA' THEN 10934105
when c.nm_Contribuinte = 'LUIZ DA SILVA NOGUEIRA' THEN 10934152
when c.nm_Contribuinte = 'LUIZ FELIPE SILVA BARBOSA' THEN 10935475
when c.nm_Contribuinte = 'LUIZ FELIPE SILVA BARBOSA' THEN 10935495
when c.nm_Contribuinte = 'LUIZ FOGACA' THEN 10937226
when c.nm_Contribuinte = 'LUIZ FOGACA' THEN 10937227
when c.nm_Contribuinte = 'LUIZ FOGACA' THEN 10937150
when c.nm_Contribuinte = 'LUIZ MARCOS DOS SANTOS' THEN 10937257
when c.nm_Contribuinte = 'LUIZ MARCOS DOS SANTOS' THEN 10937310
when c.nm_Contribuinte = 'LUIZ MARCOS DOS SANTOS' THEN 10937347
when c.nm_Contribuinte = 'LUIZ MARQUES DOS SANTOS' THEN 10937061
when c.nm_Contribuinte = 'LUIZ MARQUES DOS SANTOS' THEN 10937133
when c.nm_Contribuinte = 'LUIZ MARQUES DOS SANTOS' THEN 10937147
when c.nm_Contribuinte = 'LUIZ PEREIRA SOBRINHO' THEN 10934682
when c.nm_Contribuinte = 'LUIZ PEREIRA SOBRINHO' THEN 10934683
when c.nm_Contribuinte = 'LUIZ PEREIRA SOBRINHO' THEN 10934700
when c.nm_Contribuinte = 'LUIZ PEREIRA SOBRINHO' THEN 10934728
when c.nm_Contribuinte = 'LUIZ PEREIRA SOBRINHO' THEN 10934746
when c.nm_Contribuinte = 'LUIZ PEREIRA SOBRINHO' THEN 10934815
when c.nm_Contribuinte = 'LUIZ PEREIRA SOBRINHO' THEN 10934849
when c.nm_Contribuinte = 'LUIZ PEREIRA SOBRINHO' THEN 10934867
when c.nm_Contribuinte = 'LUIZ PEREIRA SOBRINHO' THEN 10934885
when c.nm_Contribuinte = 'LUIZ PEREIRA SOBRINHO' THEN 10935161
when c.nm_Contribuinte = 'LUIZ PEREIRA SOBRINHO' THEN 10935174
when c.nm_Contribuinte = 'LUIZ PEREIRA SOBRINHO' THEN 10935251
when c.nm_Contribuinte = 'LUIZ PEREIRA SOBRINHO' THEN 10935266
when c.nm_Contribuinte = 'LUIZ PEREIRA SOBRINHO' THEN 10935285
when c.nm_Contribuinte = 'LUIZ POLICARPO DE GOUVEIA' THEN 10933310
when c.nm_Contribuinte = 'LUIZ POLICARPO DE GOUVEIA' THEN 10938036
when c.nm_Contribuinte = 'LUIZ RIBEIRO DE SOUZA' THEN 10934796
when c.nm_Contribuinte = 'LUIZ RIBEIRO DE SOUZA' THEN 10934828
when c.nm_Contribuinte = 'LUIZ RIBEIRO DE SOUZA' THEN 10934846
when c.nm_Contribuinte = 'LUIZ RIBEIRO DE SOUZA' THEN 10934847
when c.nm_Contribuinte = 'LUIZ RIBEIRO DE SOUZA' THEN 10934848
when c.nm_Contribuinte = 'LUIZ RIBEIRO DE SOUZA' THEN 10934864
when c.nm_Contribuinte = 'LUIZ RIBEIRO DE SOUZA' THEN 10934865
when c.nm_Contribuinte = 'LUIZ RIBEIRO DE SOUZA' THEN 10934924
when c.nm_Contribuinte = 'LUIZA ALVES DA SILVA' THEN 10937082
when c.nm_Contribuinte = 'LUIZA ALVES DA SILVA' THEN 10937083
when c.nm_Contribuinte = 'LUIZA ALVES DA SILVA' THEN 10937118
when c.nm_Contribuinte = 'LUIZA ALVES DA SILVA' THEN 10937151
when c.nm_Contribuinte = 'LUIZA ALVES DA SILVA' THEN 10937175
when c.nm_Contribuinte = 'LUIZA ALVES DA SILVA' THEN 10938244
when c.nm_Contribuinte = 'LUIZA ALVES DA SILVA' THEN 10938258
when c.nm_Contribuinte = 'LUIZA ALVES DA SILVA' THEN 10938276
when c.nm_Contribuinte = 'LUNA BRETAS LIMA' THEN 10935244
when c.nm_Contribuinte = 'LUNA BRETAS LIMA' THEN 10935207
when c.nm_Contribuinte = 'LUNA BRETAS LIMA' THEN 10935245
when c.nm_Contribuinte = 'LUNA BRETAS LIMA' THEN 10935189
when c.nm_Contribuinte = 'LURDES MLAK' THEN 10936297
when c.nm_Contribuinte = 'LURDES MLAK' THEN 10936320
when c.nm_Contribuinte = 'LURDES MLAK' THEN 10936338
when c.nm_Contribuinte = 'LUZIA DOMINGOS FERRAZ' THEN 10937926
when c.nm_Contribuinte = 'LUZIA RODRIGUES DE CARVALHO' THEN 10933568
when c.nm_Contribuinte = 'LUZIA RODRIGUES DE CARVALHO' THEN 10933599
when c.nm_Contribuinte = 'LUZIA RODRIGUES DE CARVALHO' THEN 10933627
when c.nm_Contribuinte = 'LUZIA RODRIGUES DE CARVALHO' THEN 10937016
when c.nm_Contribuinte = 'LUZIA STERNAITE CANDIDO' THEN 10937403
when c.nm_Contribuinte = 'LUZIA STERNAITE CANDIDO' THEN 10937493
when c.nm_Contribuinte = 'LUZIA XAVIER LIMA E OUTROS' THEN 10937162
when c.nm_Contribuinte = 'LUZIA XAVIER LIMA E OUTROS' THEN 10937301
when c.nm_Contribuinte = 'LUZIA XAVIER LIMA E OUTROS' THEN 10937370
when c.nm_Contribuinte = 'LUZIA XAVIER LIMA E OUTROS' THEN 10937404
when c.nm_Contribuinte = 'LUZIA XAVIER LIMA E OUTROS' THEN 10937405
when c.nm_Contribuinte = 'LUZILENE FORNACIARI' THEN 10933503
when c.nm_Contribuinte = 'LUZILENE FORNACIARI' THEN 10933544
when c.nm_Contribuinte = 'LUZILENE FORNACIARI' THEN 10933545
when c.nm_Contribuinte = 'MADALENA SENHORINHA GUEDES' THEN 10936621
when c.nm_Contribuinte = 'MADALENA SENHORINHA GUEDES' THEN 10936661
when c.nm_Contribuinte = 'MADALENA SENHORINHA GUEDES' THEN 10936731
when c.nm_Contribuinte = 'MADALENA SENHORINHA GUEDES' THEN 10936737
when c.nm_Contribuinte = 'MADALENA SENHORINHA GUEDES' THEN 10936738
when c.nm_Contribuinte = 'MADALENA SENHORINHA GUEDES' THEN 10936807
when c.nm_Contribuinte = 'MADEIRA 3D LTDA-ME' THEN 10937590
when c.nm_Contribuinte = 'MADEIRA 3D LTDA-ME' THEN 10937611
when c.nm_Contribuinte = 'MADEIRA 3D LTDA-ME' THEN 10937664
when c.nm_Contribuinte = 'MADEIREIRA ANDRES LTDA ME ALIENADO A SICOOB CEDULA Nº464567 ' THEN 10937907
when c.nm_Contribuinte = 'MADEIREIRA ANDRES LTDA ME ALIENADO A SICOOB CEDULA Nº464567 ' THEN 10937932
when c.nm_Contribuinte = 'MADEIREIRA ANDRES LTDA ME ALIENADO A SICOOB CEDULA Nº464567 ' THEN 10937958
when c.nm_Contribuinte = 'MADEIREIRA ANDRES LTDA ME ALIENADO A SICOOB CEDULA Nº464567 ' THEN 10937964
when c.nm_Contribuinte = 'MADEIREIRA ANDRES LTDA ME ALIENADO A SICOOB CEDULA Nº464567 ' THEN 10937965
when c.nm_Contribuinte = 'MADEIREIRA ANDRES LTDA ME ALIENADO A SICOOB CEDULA Nº464567 ' THEN 10937966
when c.nm_Contribuinte = 'MADEREIRA MADEK LTDA ME' THEN 10937562
when c.nm_Contribuinte = 'MADEREIRA MADEK LTDA ME' THEN 10937563
when c.nm_Contribuinte = 'MADEREIRA MADEK LTDA ME' THEN 10937689
when c.nm_Contribuinte = 'MADEREIRA MADEK LTDA ME' THEN 10938007
when c.nm_Contribuinte = 'MAISA BRETTAS' THEN 10933335
when c.nm_Contribuinte = 'MAISA BRETTAS' THEN 10933312
when c.nm_Contribuinte = 'MAISA BRETTAS' THEN 10933313
when c.nm_Contribuinte = 'MAISA BRETTAS' THEN 10933306
when c.nm_Contribuinte = 'MAISA BRETTAS' THEN 10933308
when c.nm_Contribuinte = 'MAISA BRETTAS' THEN 10933315
when c.nm_Contribuinte = 'MAISA BRETTAS' THEN 10933339
when c.nm_Contribuinte = 'MAISA BRETTAS' THEN 10933321
when c.nm_Contribuinte = 'MAISA BRETTAS' THEN 10933317
when c.nm_Contribuinte = 'MAISA BRETTAS' THEN 10933316
when c.nm_Contribuinte = 'MAISA BRETTAS' THEN 10933318
when c.nm_Contribuinte = 'MAISA SANTANA BRETAS' THEN 10934943
when c.nm_Contribuinte = 'MAISA SANTANA BRETAS' THEN 10935082
when c.nm_Contribuinte = 'MAISA SANTANA BRETAS' THEN 10935131
when c.nm_Contribuinte = 'MAISA SANTANA BRETAS' THEN 10935132
when c.nm_Contribuinte = 'MAISA SANTANA BRETAS' THEN 10935133
when c.nm_Contribuinte = 'MAISA SANTANA BRETAS' THEN 10935153
when c.nm_Contribuinte = 'MAISA SANTANA BRETAS' THEN 10935186
when c.nm_Contribuinte = 'MAISA SANTANA BRETAS' THEN 10935224
when c.nm_Contribuinte = 'MANOEL ALVES DE AGUIAR' THEN 10936136
when c.nm_Contribuinte = 'MANOEL CLEMENTINO GOMES' THEN 10934721
when c.nm_Contribuinte = 'MANOEL CLEMENTINO GOMES' THEN 10934729
when c.nm_Contribuinte = 'MANOEL CLEMENTINO GOMES' THEN 10934730
when c.nm_Contribuinte = 'MANOEL CLEMENTINO GOMES' THEN 10934747
when c.nm_Contribuinte = 'MANOEL CLEMENTINO GOMES' THEN 10934748
when c.nm_Contribuinte = 'MANOEL CLEMENTINO GOMES' THEN 10934749
when c.nm_Contribuinte = 'MANOEL CLEMENTINO GOMES' THEN 10934766
when c.nm_Contribuinte = 'MANOEL CLEMENTINO GOMES' THEN 10937443
when c.nm_Contribuinte = 'MANOEL CLEMENTINO GOMES' THEN 10937554
when c.nm_Contribuinte = 'MANOEL CLEMENTINO GOMES' THEN 10937571
when c.nm_Contribuinte = 'MANOEL FERREIRA GOMES' THEN 10933342
when c.nm_Contribuinte = 'MANOEL FERREIRA GOMES' THEN 10933438
when c.nm_Contribuinte = 'MANOEL FERREIRA GOMES' THEN 10933447
when c.nm_Contribuinte = 'MANOEL FERREIRA GOMES' THEN 10933469
when c.nm_Contribuinte = 'MANOEL FERREIRA GOMES' THEN 10933477
when c.nm_Contribuinte = 'MANOEL FERREIRA GOMES' THEN 10933589
when c.nm_Contribuinte = 'MANOEL GONÇALVES DA SILVA' THEN 10933791
when c.nm_Contribuinte = 'MANOEL GONÇALVES DA SILVA' THEN 10933932
when c.nm_Contribuinte = 'MANOEL GONÇALVES DA SILVA' THEN 10933950
when c.nm_Contribuinte = 'MANOEL JOSE FEREIRA' THEN 10934693
when c.nm_Contribuinte = 'MANOEL JOSE FEREIRA' THEN 10934694
when c.nm_Contribuinte = 'MANOEL MESSIAS DE MACEDO GOMES' THEN 10933949
when c.nm_Contribuinte = 'MANOEL NICOLAU DE SOUZA NETO' THEN 10936760
when c.nm_Contribuinte = 'MANOEL NICOLAU DE SOUZA NETO' THEN 10936850
when c.nm_Contribuinte = 'MANOEL NICOLAU DE SOUZA NETO' THEN 10936906
when c.nm_Contribuinte = 'MANOEL PEREIRA DA SILVA' THEN 10933231
when c.nm_Contribuinte = 'MANOEL PEREIRA DA SILVA' THEN 10933232
when c.nm_Contribuinte = 'MANOEL PEREIRA DA SILVA' THEN 10934328
when c.nm_Contribuinte = 'MANOEL PEREIRA DA SILVA' THEN 10934366
when c.nm_Contribuinte = 'MARCELO BOTELHO ANDRADE' THEN 10935999
when c.nm_Contribuinte = 'MARCELO BOTELHO ANDRADE' THEN 10936012
when c.nm_Contribuinte = 'MARCELO BOTELHO ANDRADE' THEN 10936087
when c.nm_Contribuinte = 'MARCELO BOTELHO ANDRADE' THEN 10936088
when c.nm_Contribuinte = 'MARCELO DE OLIVEIRA SALA' THEN 10936741
when c.nm_Contribuinte = 'MARCELO DE OLIVEIRA SALA' THEN 10936800
when c.nm_Contribuinte = 'MARCELO DE OLIVEIRA SALA' THEN 10936830
when c.nm_Contribuinte = 'MARCELO DE OLIVEIRA SALA' THEN 10936849
when c.nm_Contribuinte = 'MARCELO DE OLIVEIRA SALA' THEN 10937258
when c.nm_Contribuinte = 'MARCELO DE OLIVEIRA SALA' THEN 10937437
when c.nm_Contribuinte = 'MARCELO DE OLIVEIRA SALA' THEN 10937518
when c.nm_Contribuinte = 'MARCELO DE OLIVEIRA SALA' THEN 10937527
when c.nm_Contribuinte = 'MARCELO FABIANO MONTIBELLER' THEN 10936421
when c.nm_Contribuinte = 'MARCELO FABIANO MONTIBELLER' THEN 10936509
when c.nm_Contribuinte = 'MARCELO FIGUEIREDO MOTA' THEN 10936044
when c.nm_Contribuinte = 'MARCELO HENRIQUE PEREIRA BARROS' THEN 10937843
when c.nm_Contribuinte = 'MARCELO HENRIQUE PEREIRA BARROS' THEN 10937861
when c.nm_Contribuinte = 'MARCELO LOURENCO FERREIRA' THEN 10936459
when c.nm_Contribuinte = 'MARCELO LOURENCO FERREIRA' THEN 10936493
when c.nm_Contribuinte = 'MARCELO LOURENCO FERREIRA' THEN 10936494
when c.nm_Contribuinte = 'MARCELO LOURENCO FERREIRA' THEN 10936535
when c.nm_Contribuinte = 'MARCELO LOURENCO FERREIRA' THEN 10936567
when c.nm_Contribuinte = 'MARCELO LOURENCO FERREIRA' THEN 10936625
when c.nm_Contribuinte = 'MARCELO LOURENCO FERREIRA' THEN 10937036
when c.nm_Contribuinte = 'MARCELO MARINHO DE SOUZA' THEN 10935050
when c.nm_Contribuinte = 'MARCELO MARTINS DA SILVA' THEN 10936614
when c.nm_Contribuinte = 'MARCELO VIDOTTO' THEN 10938191
when c.nm_Contribuinte = 'MARCELO VIDOTTO' THEN 10938190
when c.nm_Contribuinte = 'MARCELO VIDOTTO' THEN 10938208
when c.nm_Contribuinte = 'MARCIA MARIA LENZI' THEN 10934236
when c.nm_Contribuinte = 'MARCIANA MORAIS FLORENCIO' THEN 10935506
when c.nm_Contribuinte = 'MARCILEY DE CARVALHO ALIENADO A SICOOB CREDIP CED.151327/DT' THEN 10936958
when c.nm_Contribuinte = 'MARCILEY DE CARVALHO ALIENADO A SICOOB CREDIP CED.151327/DT' THEN 10936959
when c.nm_Contribuinte = 'MARCILEY DE CARVALHO ALIENADO A SICOOB CREDIP CED.151327/DT' THEN 10936981
when c.nm_Contribuinte = 'MARCILEY DE CARVALHO ALIENADO A SICOOB CREDIP CED.151327/DT' THEN 10936983
when c.nm_Contribuinte = 'MARCILEY DE CARVALHO ALIENADO A SICOOB CREDIP CED.151327/DT' THEN 10937000
when c.nm_Contribuinte = 'MARCILEY DE CARVALHO ALIENADO A SICOOB CREDIP CED.151327/DT' THEN 10937018
when c.nm_Contribuinte = 'MARCILEY DE CARVALHO ALIENADO A SICOOB CREDIP CED.151327/DT' THEN 10937050
when c.nm_Contribuinte = 'MARCILEY DE CARVALHO ALIENADO A SICOOB CREDIP CED.151327/DT' THEN 10937051
when c.nm_Contribuinte = 'MARCILEY DE CARVALHO ALIENADO A SICOOB CREDIP CED.151327/DT' THEN 10937070
when c.nm_Contribuinte = 'MARCILEY DE CARVALHO ALIENADO A SICOOB CREDIP CED.151327/DT' THEN 10937071
when c.nm_Contribuinte = 'MARCILEY DE CARVALHO ALIENADO A SICOOB CREDIP CED.151327/DT' THEN 10937088
when c.nm_Contribuinte = 'MARCILEY DE CARVALHO ALIENADO A SICOOB CREDIP CED.151327/DT' THEN 10937104
when c.nm_Contribuinte = 'MARCILEY DE CARVALHO ALIENADO A SICOOB CREDIP CED.151327/DT' THEN 10937105
when c.nm_Contribuinte = 'MARCILEY DE CARVALHO' THEN 10936095
when c.nm_Contribuinte = 'MARCILEY DE CARVALHO' THEN 10936128
when c.nm_Contribuinte = 'MARCILEY DE CARVALHO' THEN 10936166
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