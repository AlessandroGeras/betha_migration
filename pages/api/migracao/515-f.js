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
	ROW_NUMBER() OVER (ORDER BY imoveis.cd_cecam) + 40.184 AS idIntegracao,
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
WHEN c.nm_Contribuinte = 'MARINEIDE FERREIRA DE OLIVEIRA COSTA'THEN 27628842	
WHEN c.nm_Contribuinte = 'MARIZETE DE FÁTIMA DE CAMPOS GUEDES SANADA'THEN 27629399	
WHEN c.nm_Contribuinte = 'MARLEIDE CAMPOS DOS SANTOS'THEN 27628325	
WHEN c.nm_Contribuinte = 'MARLEIDE CAMPOS DOS SANTOS'THEN 27628372	
WHEN c.nm_Contribuinte = 'MARLI CAMPOS DOS SANTOS'THEN 27628330	
WHEN c.nm_Contribuinte = 'MARLI DA CUNHA'THEN 27629102	
WHEN c.nm_Contribuinte = 'MARTA DA SILVA CARVALHO'THEN 27629224	
WHEN c.nm_Contribuinte = 'MARTA GOMES DA SILVA'THEN 27629178	
WHEN c.nm_Contribuinte = 'MARTA RODRIGUES DE SOUZA'THEN 27629393	
WHEN c.nm_Contribuinte = 'MARTA VIEIRA GUEDES'THEN 27629346	
WHEN c.nm_Contribuinte = 'MAX DANIEL DE CARVALHO'THEN 28930471	
WHEN c.nm_Contribuinte = 'MEIRE FRANCIELE GONÇALVES DA SILVA'THEN 27629125	
WHEN c.nm_Contribuinte = 'MILTON ANTONIO PEREIRA'THEN 27629301	
WHEN c.nm_Contribuinte = 'MIRELLA SOARES SILVA'THEN 27629062	
WHEN c.nm_Contribuinte = 'MIRIAM DUARTE'THEN 28930375	
WHEN c.nm_Contribuinte = 'MIRIAM DUARTE'THEN 27628875	
WHEN c.nm_Contribuinte = 'MIRIAN VAZ DE SIQUEIRA GONÇALVES'THEN 27628793	
WHEN c.nm_Contribuinte = 'MONZAIR BEIJO DE ANDRADE'THEN 27628690	
WHEN c.nm_Contribuinte = 'MORILO GONCALVES MACHADO'THEN 28930466	
WHEN c.nm_Contribuinte = 'MOZAIR BEIJO DE ANDRADE'THEN 27628689	
WHEN c.nm_Contribuinte = 'NADIR AOIAGUI'THEN 27628100	
WHEN c.nm_Contribuinte = 'NAIR RITAL'THEN 27628967	
WHEN c.nm_Contribuinte = 'NAIR RITCEL'THEN 28930429	
WHEN c.nm_Contribuinte = 'NAIR RITCEL'THEN 27629031	
WHEN c.nm_Contribuinte = 'NAIR RITHICE'THEN 27629219	
WHEN c.nm_Contribuinte = 'NATANAEL FERNANDES GUIMARÃES'THEN 27628075	
WHEN c.nm_Contribuinte = 'NEIDE ANTUNES BOTELHO MARTINS'THEN 27628737	
WHEN c.nm_Contribuinte = 'NELSON MLAK'THEN 28930468	
WHEN c.nm_Contribuinte = 'NEUZA LEAO DE ARAUJO'THEN 27628082	
WHEN c.nm_Contribuinte = 'NICÓLI SILVA DE SOUZA'THEN 27629367	
WHEN c.nm_Contribuinte = 'NILDA CANUTO'THEN 27629359	
WHEN c.nm_Contribuinte = 'NILSON ANTONIO DA LUZ'THEN 27628376	
WHEN c.nm_Contribuinte = 'NILSON ANTONIO DA LUZ'THEN 27628375	
WHEN c.nm_Contribuinte = 'NILSON DA SILVA'THEN 27628855	
WHEN c.nm_Contribuinte = 'NISES MARILDA TRAVAINI BERNADELI'THEN 28930431	
WHEN c.nm_Contribuinte = 'NIVALDO ALVES MACEDO'THEN 27629394	
WHEN c.nm_Contribuinte = 'NIVALDO NOGUEIRA DO NASCIMENTO'THEN 27628074	
WHEN c.nm_Contribuinte = 'NIVALDO NOGUEIRA DO NASCIMENTO'THEN 27628094	
WHEN c.nm_Contribuinte = 'NOEMI ESCORICA DIAS PINTO'THEN 27629291	
WHEN c.nm_Contribuinte = 'OLERIS FAUSTINO DE JESUS'THEN 27629372	
WHEN c.nm_Contribuinte = 'OLICIO DE OLIVEIRA'THEN 27629157	
WHEN c.nm_Contribuinte = 'OLICIO DE OLIVEIRA'THEN 27629158	
WHEN c.nm_Contribuinte = 'ORIAS PEREIRA CANDIDO'THEN 27628047	
WHEN c.nm_Contribuinte = 'ORLANDO FERREIRA BARBOSA'THEN 27629231	
WHEN c.nm_Contribuinte = 'ORLANDO FERREIRA BARBOSA'THEN 27629230	
WHEN c.nm_Contribuinte = 'ORLANDO FERREIRA BARBOSA'THEN 27629232	
WHEN c.nm_Contribuinte = 'ORLANDO RAMOS MARTINS'THEN 27629100	
WHEN c.nm_Contribuinte = 'OSMAR CASAGRANDE'THEN 27628848	
WHEN c.nm_Contribuinte = 'OSMAR CASAGRANDE 'THEN 27628849	
WHEN c.nm_Contribuinte = 'OSMAR CASAGRANDE 'THEN 27628929	
WHEN c.nm_Contribuinte = 'OSVALDINO SABINO'THEN 28930479	
WHEN c.nm_Contribuinte = 'OSWALDO AMARAL DE BRITO'THEN 28930448	
WHEN c.nm_Contribuinte = 'OSWALDO DIAS PINTO'THEN 27628763	
WHEN c.nm_Contribuinte = 'OTAMIR DANIEL DE ARRUDA'THEN 27629081	
WHEN c.nm_Contribuinte = 'OZILIA ELLER GOIS'THEN 27629358	
end as idImoveis,
--------------------------------------------------------------------------------
CASE
WHEN c.nm_Contribuinte = 'MARINEIDE FERREIRA DE OLIVEIRA COSTA' THEN 77021638
WHEN c.nm_Contribuinte = 'MARINEIDE FERREIRA DE OLIVEIRA COSTA' THEN 77520913
WHEN c.nm_Contribuinte = 'MARINES DA SILVA PEREIRA' THEN 77021085
WHEN c.nm_Contribuinte = 'MARINES MAAS' THEN 77020568
WHEN c.nm_Contribuinte = 'MARIO LUIZ CARDOSO' THEN 77021127
WHEN c.nm_Contribuinte = 'MARIO PEREIRA COSTA' THEN 77020491
WHEN c.nm_Contribuinte = 'MARIO SOARES' THEN 77020991
WHEN c.nm_Contribuinte = 'MARISA DIAS DA SILVA' THEN 77021546
WHEN c.nm_Contribuinte = 'MARIZETE DE FÁTIMA DE CAMPOS GUEDES SANADA' THEN 77021471
WHEN c.nm_Contribuinte = 'MARLEIDE CAMPOS DOS SANTOS' THEN 77020530
WHEN c.nm_Contribuinte = 'MARLEIDE CAMPOS DOS SANTOS' THEN 77021115
WHEN c.nm_Contribuinte = 'MARLENE FERREIRA NUNES' THEN 77021174
WHEN c.nm_Contribuinte = 'MARLI CAMPOS DOS SANTOS' THEN 77020535
WHEN c.nm_Contribuinte = 'MARLI DA CUNHA OLIVEIRA' THEN 77020717
WHEN c.nm_Contribuinte = 'MARLI DA CUNHA' THEN 77021243
WHEN c.nm_Contribuinte = 'MARLON DA SILVA BERTAN' THEN 77020781
WHEN c.nm_Contribuinte = 'MARLY LUCIA DO CARMO ' THEN 77020637
WHEN c.nm_Contribuinte = 'MARQUES & ALVES LTDA - ME' THEN 77521025
WHEN c.nm_Contribuinte = 'MARTA DA SILVA CARVALHO' THEN 77021602
WHEN c.nm_Contribuinte = 'MARTA GOMES DA SILVA' THEN 77021395
WHEN c.nm_Contribuinte = 'MARTA RODRIGUES DE SOUZA' THEN 77021587
WHEN c.nm_Contribuinte = 'MARTA VIEIRA GUEDES' THEN 77021696
WHEN c.nm_Contribuinte = 'MATUSALEM PEREIRA TORRES ' THEN 77020670
WHEN c.nm_Contribuinte = 'MATUZALEM PEREIRA TORRES' THEN 77520912
WHEN c.nm_Contribuinte = 'MAURA COSTA CORREIA' THEN 77020435
WHEN c.nm_Contribuinte = 'MAURICIO APARECIDO CESTARI' THEN 77520911
WHEN c.nm_Contribuinte = 'MAURICIO SERGIO DE LIMA E SILVA' THEN 77521040
WHEN c.nm_Contribuinte = 'MAX DANIEL DE CARVALHO' THEN 77020753
WHEN c.nm_Contribuinte = 'MAYKON EDELCIR ALVES SETTE' THEN 77021335
WHEN c.nm_Contribuinte = 'MEIRE FRANCIELE GONÇALVES DA SILVA' THEN 77021421
WHEN c.nm_Contribuinte = 'MERCADO BOECHAT LTDA - ME' THEN 77520916
WHEN c.nm_Contribuinte = 'MICHEL MORAES TOME' THEN 77021483
WHEN c.nm_Contribuinte = 'MILITINO MACHADO MEIRELES' THEN 77021078
WHEN c.nm_Contribuinte = 'MILTON ANTONIO PEREIRA' THEN 77021424
WHEN c.nm_Contribuinte = 'MINERADORA JRD  LTDA' THEN 77521147
WHEN c.nm_Contribuinte = 'MINERADOURA VALE DO CERRADO VALE-ME' THEN 77521113
WHEN c.nm_Contribuinte = 'MIRELLA SOARES SILVA' THEN 77021569
WHEN c.nm_Contribuinte = 'MIRIAM DUARTE' THEN 77020690
WHEN c.nm_Contribuinte = 'MIRIAM DUARTE' THEN 77520910
WHEN c.nm_Contribuinte = 'MIRIAN QUIRINO DA SILVA' THEN 77021097
WHEN c.nm_Contribuinte = 'MIRIAN THOMAZ MARTINS' THEN 77520962
WHEN c.nm_Contribuinte = 'MIRIAN VAZ DE SIQUEIRA GONÇALVES' THEN 77021609
WHEN c.nm_Contribuinte = 'MIRTES APARECIDA DE OLIVEIRA' THEN 77020741
WHEN c.nm_Contribuinte = 'MISAEL GONCALVES DA SILVA' THEN 77021094
WHEN c.nm_Contribuinte = 'MOACIR LOPES DE FARIAS' THEN 77020744
WHEN c.nm_Contribuinte = 'MOISES BASTOS PEREIRA' THEN 77020689
WHEN c.nm_Contribuinte = 'MONICA ELITANA DOS SANTO ALIENADO A SICOOB CED 1791090' THEN 77021577
WHEN c.nm_Contribuinte = 'MONZAIR BEIJO DE ANDRADE' THEN 77020575
WHEN c.nm_Contribuinte = 'MONZAIR BEIJO DE ANDRADE' THEN 77520960
WHEN c.nm_Contribuinte = 'MORILO GONCALVES MACHADO' THEN 77020746
WHEN c.nm_Contribuinte = 'MOZAIR BEIJO DE ANDRADE' THEN 77020574
WHEN c.nm_Contribuinte = 'MUNICIPIO DE CACOAL' THEN 77575468
WHEN c.nm_Contribuinte = 'NADIA MARIA SILVA MONTELO' THEN 77521045
WHEN c.nm_Contribuinte = 'NADIR AOIAGUI' THEN 77021135
WHEN c.nm_Contribuinte = 'NAIR RIBEIRO NUNES DA ROCHA' THEN 77021990
WHEN c.nm_Contribuinte = 'NAIR RITAL' THEN 77020394
WHEN c.nm_Contribuinte = 'NAIR RITCEL' THEN 77021179
WHEN c.nm_Contribuinte = 'NAIR RITHICE' THEN 77021006
WHEN c.nm_Contribuinte = 'NARIA GOUVEIA VIEIRA' THEN 77021779
WHEN c.nm_Contribuinte = 'NATALINO JESUS ALVES DE AZEVEDO' THEN 77520928
WHEN c.nm_Contribuinte = 'NATANAEL FERNANDES GUIMARÃES' THEN 77021474
WHEN c.nm_Contribuinte = 'NEIDE ANTUNES BOTELHO MARTINS' THEN 77021675
WHEN c.nm_Contribuinte = 'NELITA MARIA DOS SANTOS' THEN 77020607
WHEN c.nm_Contribuinte = 'NELSON ANTONIO PEJARA' THEN 77020668
WHEN c.nm_Contribuinte = 'NELSON JOSÉ ANTUNES' THEN 77021172
WHEN c.nm_Contribuinte = 'NELSON KURYAMA' THEN 77520927
WHEN c.nm_Contribuinte = 'NELSON MLAK' THEN 77021082
WHEN c.nm_Contribuinte = 'NERY PIAZZA ALIENADO A SICOOB CREDIP CEDULA Nº 2563304' THEN 77021160
WHEN c.nm_Contribuinte = 'NET WAY PARECIS TELECOMUNICAÇÕES LTDA' THEN 77521135
WHEN c.nm_Contribuinte = 'NEUSA XAVIER DO NASCIMENTO' THEN 77020725
WHEN c.nm_Contribuinte = 'NEUZA LEAO DE ARAUJO' THEN 77021525
WHEN c.nm_Contribuinte = 'NEUZA MARIA CASAGRANDE' THEN 77020501
WHEN c.nm_Contribuinte = 'NEVES & NEVES LTDA - ME' THEN 77521056
WHEN c.nm_Contribuinte = 'NICÓLI SILVA DE SOUZA' THEN 77021717
WHEN c.nm_Contribuinte = 'NILCIMAR BEIJO FERREIRA' THEN 77020787
WHEN c.nm_Contribuinte = 'NILDA CANUTO' THEN 77021711
WHEN c.nm_Contribuinte = 'NILSON ANTONIO DA LUZ' THEN 77020555
WHEN c.nm_Contribuinte = 'NILSON BUENO PEREIRA' THEN 77020392
WHEN c.nm_Contribuinte = 'NILSON BUENO PEREIRA' THEN 77520929
WHEN c.nm_Contribuinte = 'NILSON DA SILVA' THEN 77021343
WHEN c.nm_Contribuinte = 'NILTON MAURILIO SALA' THEN 77021320
WHEN c.nm_Contribuinte = 'NILTON OLIVEIRA SOUZA' THEN 77021222
WHEN c.nm_Contribuinte = 'NILZA GOMES DOS SANTOS' THEN 77021176
WHEN c.nm_Contribuinte = 'NILZA MARIA DOP CARMO MORAIS' THEN 77021500
WHEN c.nm_Contribuinte = 'NISES MARILDA TRAVAINI BERNADELI' THEN 77021239
WHEN c.nm_Contribuinte = 'NIVALDO ALVES MACEDO' THEN 77021727
WHEN c.nm_Contribuinte = 'NIVALDO LOPES SANTOS' THEN 77020681
WHEN c.nm_Contribuinte = 'NIVALDO NOGUEIRA DO NASCIMENTO' THEN 77021305
WHEN c.nm_Contribuinte = 'NIVANILDA DE SOUZA' THEN 77020905
WHEN c.nm_Contribuinte = 'NOE FIALHO DE LIMA' THEN 77020674
WHEN c.nm_Contribuinte = 'NOEL RODRIGUES DE MORAIS' THEN 77020734
WHEN c.nm_Contribuinte = 'NOEMI ESCORICA DIAS PINTO' THEN 77021510
WHEN c.nm_Contribuinte = 'NONDAS DIONIZIO DE LIMA' THEN 77021521
WHEN c.nm_Contribuinte = 'NONDAS DIONIZIO DE LIMA' THEN 77521050
WHEN c.nm_Contribuinte = 'NOVA SOROCABANA LTDA - ME' THEN 77521070
WHEN c.nm_Contribuinte = 'O L ALCARAS' THEN 77521164
WHEN c.nm_Contribuinte = 'ODARIO SCHWAMBACH' THEN 77021181
WHEN c.nm_Contribuinte = 'ODEVANIR LIMA DE SOUZA' THEN 77020754
WHEN c.nm_Contribuinte = 'ODIR GOMES' THEN 77021080
WHEN c.nm_Contribuinte = 'OFICIO DE REGISTRO CIVIL DAS PESSOAS NATURAIS E TABELIONATO DE NOTAS MUNICIPIO DE PARECIS/RO' THEN 77521162
WHEN c.nm_Contribuinte = 'OLERIS FAUSTINO DE JESUS' THEN 77021721
WHEN c.nm_Contribuinte = 'OLICIO DE OLIVEIRA' THEN 77020941
WHEN c.nm_Contribuinte = 'OLINDO ALVES DA SILVA' THEN 77020368
WHEN c.nm_Contribuinte = 'OLIVEIRA ALVES DA SILVA ' THEN 77020687
WHEN c.nm_Contribuinte = 'OLMIRO THOMAZ MARTINS' THEN 77020655
WHEN c.nm_Contribuinte = 'OLMIRO THOMAZ MARTINZ - ME' THEN 77520931
WHEN c.nm_Contribuinte = 'OLMIRO THOMAZ MARTINZ' THEN 77020654
WHEN c.nm_Contribuinte = 'ORIAS PEREIRA CANDIDO' THEN 77021441
WHEN c.nm_Contribuinte = 'ORLANDO FERREIRA BARBOSA' THEN 77020827
WHEN c.nm_Contribuinte = 'ORLANDO FERREIRA BARBOSA' THEN 77520969
WHEN c.nm_Contribuinte = 'ORLANDO RAMOS MARTINS' THEN 77020768
WHEN c.nm_Contribuinte = 'ORLANDO SIEBE' THEN 77020716
WHEN c.nm_Contribuinte = 'ORLANDO SIEBRE' THEN 77020833
WHEN c.nm_Contribuinte = 'ORTENCIO PEREIRA DOS SANTOS' THEN 77020988
WHEN c.nm_Contribuinte = 'ORTIZ E CIA LTDA - ME' THEN 77520932
WHEN c.nm_Contribuinte = 'OSMAR ALVES CESTARE' THEN 77021497
WHEN c.nm_Contribuinte = 'OSMAR CASAGRANDE ' THEN 77021293
WHEN c.nm_Contribuinte = 'OSMAR CASAGRANDE' THEN 77021681
WHEN c.nm_Contribuinte = 'OSMAR DUPINHAKE' THEN 77020731
WHEN c.nm_Contribuinte = 'OSVALDINO FORTUNATO DOS SANTOS' THEN 77020525
WHEN c.nm_Contribuinte = 'OSVALDINO SABINO' THEN 77021027
WHEN c.nm_Contribuinte = 'OSVALDO RODRIGUES COUTRIM' THEN 77020802
WHEN c.nm_Contribuinte = 'OSVALDO SABINO' THEN 77021028
WHEN c.nm_Contribuinte = 'OSWALDO AMARAL DE BRITO' THEN 77021455
WHEN c.nm_Contribuinte = 'OSWALDO DIAS PINTO' THEN 77020621
WHEN c.nm_Contribuinte = 'OTAMIR DANIEL DE ARRUDA' THEN 77020658
WHEN c.nm_Contribuinte = 'OTAMIR DANIEL DE ARRUDA' THEN 77021165
WHEN c.nm_Contribuinte = 'OTILIA VITORINO DE MORAIS' THEN 77021391
WHEN c.nm_Contribuinte = 'OZANA SILVESTRE DE SOUZA' THEN 77520930
WHEN c.nm_Contribuinte = 'OZILIA ELLER GOIS' THEN 77021973
end as idProprietario,
--------------------------------------------------------------------------------
CASE
when c.nm_Contribuinte = 'MARINEIDE FERREIRA DE OLIVEIRA COSTA' THEN 10935314
when c.nm_Contribuinte = 'MARINEIDE FERREIRA DE OLIVEIRA COSTA' THEN 10935366
when c.nm_Contribuinte = 'MARINES DA SILVA PEREIRA' THEN 10936334
when c.nm_Contribuinte = 'MARINES DA SILVA PEREIRA' THEN 10936335
when c.nm_Contribuinte = 'MARINES DA SILVA PEREIRA' THEN 10936354
when c.nm_Contribuinte = 'MARINES DA SILVA PEREIRA' THEN 10936374
when c.nm_Contribuinte = 'MARIO LUIZ CARDOSO' THEN 10933446
when c.nm_Contribuinte = 'MARIO LUIZ CARDOSO' THEN 10933377
when c.nm_Contribuinte = 'MARIO LUIZ CARDOSO' THEN 10933414
when c.nm_Contribuinte = 'MARIO LUIZ CARDOSO' THEN 10933527
when c.nm_Contribuinte = 'MARIO LUIZ CARDOSO' THEN 10933581
when c.nm_Contribuinte = 'MARIO LUIZ CARDOSO' THEN 10933519
when c.nm_Contribuinte = 'MARIO LUIZ CARDOSO' THEN 10933314
when c.nm_Contribuinte = 'MARIO LUIZ CARDOSO' THEN 10933336
when c.nm_Contribuinte = 'MARIO PEREIRA COSTA' THEN 10937243
when c.nm_Contribuinte = 'MARIO PEREIRA COSTA' THEN 10937297
when c.nm_Contribuinte = 'MARIO PEREIRA COSTA' THEN 10937364
when c.nm_Contribuinte = 'MARIO SOARES' THEN 10937420
when c.nm_Contribuinte = 'MARIO SOARES' THEN 10937453
when c.nm_Contribuinte = 'MARIO SOARES' THEN 10937421
when c.nm_Contribuinte = 'MARISA DIAS DA SILVA' THEN 10938043
when c.nm_Contribuinte = 'MARIZETE DE FÁTIMA DE CAMPOS GUEDES SANADA' THEN 10938340
when c.nm_Contribuinte = 'MARIZETE DE FÁTIMA DE CAMPOS GUEDES SANADA' THEN 10938409
when c.nm_Contribuinte = 'MARIZETE DE FÁTIMA DE CAMPOS GUEDES SANADA' THEN 10938421
when c.nm_Contribuinte = 'MARLEIDE CAMPOS DOS SANTOS' THEN 10933921
when c.nm_Contribuinte = 'MARLEIDE CAMPOS DOS SANTOS' THEN 10933935
when c.nm_Contribuinte = 'MARLEIDE CAMPOS DOS SANTOS' THEN 10933970
when c.nm_Contribuinte = 'MARLEIDE CAMPOS DOS SANTOS' THEN 10933985
when c.nm_Contribuinte = 'MARLEIDE CAMPOS DOS SANTOS' THEN 10934026
when c.nm_Contribuinte = 'MARLEIDE CAMPOS DOS SANTOS' THEN 10934032
when c.nm_Contribuinte = 'MARLEIDE CAMPOS DOS SANTOS' THEN 10934164
when c.nm_Contribuinte = 'MARLEIDE CAMPOS DOS SANTOS' THEN 10934184
when c.nm_Contribuinte = 'MARLENE FERREIRA NUNES' THEN 10937555
when c.nm_Contribuinte = 'MARLI CAMPOS DOS SANTOS' THEN 10933961
when c.nm_Contribuinte = 'MARLI CAMPOS DOS SANTOS' THEN 10933969
when c.nm_Contribuinte = 'MARLI CAMPOS DOS SANTOS' THEN 10933978
when c.nm_Contribuinte = 'MARLI CAMPOS DOS SANTOS' THEN 10933992
when c.nm_Contribuinte = 'MARLI CAMPOS DOS SANTOS' THEN 10934008
when c.nm_Contribuinte = 'MARLI CAMPOS DOS SANTOS' THEN 10934088
when c.nm_Contribuinte = 'MARLI DA CUNHA' THEN 10936987
when c.nm_Contribuinte = 'MARLI DA CUNHA' THEN 10936968
when c.nm_Contribuinte = 'MARLI DA CUNHA' THEN 10937005
when c.nm_Contribuinte = 'MARLI DA CUNHA OLIVEIRA' THEN 10936562
when c.nm_Contribuinte = 'MARLI DA CUNHA OLIVEIRA' THEN 10936563
when c.nm_Contribuinte = 'MARLI DA CUNHA OLIVEIRA' THEN 10936586
when c.nm_Contribuinte = 'MARLY LUCIA DO CARMO ' THEN 10934118
when c.nm_Contribuinte = 'MARLY LUCIA DO CARMO ' THEN 10934120
when c.nm_Contribuinte = 'MARLY LUCIA DO CARMO ' THEN 10934122
when c.nm_Contribuinte = 'MARLY LUCIA DO CARMO ' THEN 10934140
when c.nm_Contribuinte = 'MARLY LUCIA DO CARMO ' THEN 10935796
when c.nm_Contribuinte = 'MARLY LUCIA DO CARMO ' THEN 10935860
when c.nm_Contribuinte = 'MARLY LUCIA DO CARMO ' THEN 10935878
when c.nm_Contribuinte = 'MARLY LUCIA DO CARMO ' THEN 10935918
when c.nm_Contribuinte = 'MARLY LUCIA DO CARMO ' THEN 10936056
when c.nm_Contribuinte = 'MARLY LUCIA DO CARMO ' THEN 10936132
when c.nm_Contribuinte = 'MARLY LUCIA DO CARMO ' THEN 10936168
when c.nm_Contribuinte = 'MARLY LUCIA DO CARMO ' THEN 10936205
when c.nm_Contribuinte = 'MARTA DA SILVA CARVALHO' THEN 10937595
when c.nm_Contribuinte = 'MARTA GOMES DA SILVA' THEN 10937303
when c.nm_Contribuinte = 'MARTA RODRIGUES DE SOUZA' THEN 10938337
when c.nm_Contribuinte = 'MARTA VIEIRA GUEDES' THEN 10938255
when c.nm_Contribuinte = 'MARTA VIEIRA GUEDES' THEN 10938356
when c.nm_Contribuinte = 'MARTA VIEIRA GUEDES' THEN 10938377
when c.nm_Contribuinte = 'MATUSALEM PEREIRA TORRES ' THEN 10935219
when c.nm_Contribuinte = 'MATUSALEM PEREIRA TORRES ' THEN 10935277
when c.nm_Contribuinte = 'MATUSALEM PEREIRA TORRES ' THEN 10935364
when c.nm_Contribuinte = 'MATUSALEM PEREIRA TORRES ' THEN 10935384
when c.nm_Contribuinte = 'MATUSALEM PEREIRA TORRES ' THEN 10937943
when c.nm_Contribuinte = 'MATUSALEM PEREIRA TORRES ' THEN 10937979
when c.nm_Contribuinte = 'MATUSALEM PEREIRA TORRES ' THEN 10938008
when c.nm_Contribuinte = 'MATUSALEM PEREIRA TORRES ' THEN 10938027
when c.nm_Contribuinte = 'MATUSALEM PEREIRA TORRES ' THEN 10938028
when c.nm_Contribuinte = 'MAURA COSTA CORREIA' THEN 10933836
when c.nm_Contribuinte = 'MAURA COSTA CORREIA' THEN 10933682
when c.nm_Contribuinte = 'MAURA COSTA CORREIA' THEN 10933717
when c.nm_Contribuinte = 'MAURA COSTA CORREIA' THEN 10933725
when c.nm_Contribuinte = 'MAX DANIEL DE CARVALHO' THEN 10935942
when c.nm_Contribuinte = 'MAX DANIEL DE CARVALHO' THEN 10935943
when c.nm_Contribuinte = 'MAX DANIEL DE CARVALHO' THEN 10935958
when c.nm_Contribuinte = 'MAX DANIEL DE CARVALHO' THEN 10935976
when c.nm_Contribuinte = 'MAX DANIEL DE CARVALHO' THEN 10935977
when c.nm_Contribuinte = 'MAX DANIEL DE CARVALHO' THEN 10935994
when c.nm_Contribuinte = 'MAX DANIEL DE CARVALHO' THEN 10935995
when c.nm_Contribuinte = 'MAX DANIEL DE CARVALHO' THEN 10936010
when c.nm_Contribuinte = 'MAX DANIEL DE CARVALHO' THEN 10936065
when c.nm_Contribuinte = 'MAX DANIEL DE CARVALHO' THEN 10936066
when c.nm_Contribuinte = 'MAX DANIEL DE CARVALHO' THEN 10936084
when c.nm_Contribuinte = 'MAX DANIEL DE CARVALHO' THEN 10936085
when c.nm_Contribuinte = 'MAYKON EDELCIR ALVES SETTE' THEN 10933759
when c.nm_Contribuinte = 'MAYKON EDELCIR ALVES SETTE' THEN 10933931
when c.nm_Contribuinte = 'MEIRE FRANCIELE GONÇALVES DA SILVA' THEN 10936982
when c.nm_Contribuinte = 'MEIRE FRANCIELE GONÇALVES DA SILVA' THEN 10937069
when c.nm_Contribuinte = 'MICHEL MORAES TOME' THEN 10936389
when c.nm_Contribuinte = 'MICHEL MORAES TOME' THEN 10937863
when c.nm_Contribuinte = 'MICHEL MORAES TOME' THEN 10937990
when c.nm_Contribuinte = 'MILITINO MACHADO MEIRELES' THEN 10933432
when c.nm_Contribuinte = 'MILITINO MACHADO MEIRELES' THEN 10933458
when c.nm_Contribuinte = 'MILITINO MACHADO MEIRELES' THEN 10933549
when c.nm_Contribuinte = 'MILITINO MACHADO MEIRELES' THEN 10933631
when c.nm_Contribuinte = 'MILITINO MACHADO MEIRELES' THEN 10933649
when c.nm_Contribuinte = 'MILITINO MACHADO MEIRELES' THEN 10933708
when c.nm_Contribuinte = 'MILITINO MACHADO MEIRELES' THEN 10933828
when c.nm_Contribuinte = 'MILTON ANTONIO PEREIRA' THEN 10937917
when c.nm_Contribuinte = 'MILTON ANTONIO PEREIRA' THEN 10938084
when c.nm_Contribuinte = 'MIRELLA SOARES SILVA' THEN 10936543
when c.nm_Contribuinte = 'MIRELLA SOARES SILVA' THEN 10936654
when c.nm_Contribuinte = 'MIRELLA SOARES SILVA' THEN 10936724
when c.nm_Contribuinte = 'MIRIAM DUARTE' THEN 10935517
when c.nm_Contribuinte = 'MIRIAM DUARTE' THEN 10935478
when c.nm_Contribuinte = 'MIRIAM DUARTE' THEN 10935584
when c.nm_Contribuinte = 'MIRIAM DUARTE' THEN 10935565
when c.nm_Contribuinte = 'MIRIAM DUARTE' THEN 10935566
when c.nm_Contribuinte = 'MIRIAM DUARTE' THEN 10935518
when c.nm_Contribuinte = 'MIRIAN QUIRINO DA SILVA' THEN 10936782
when c.nm_Contribuinte = 'MIRIAN QUIRINO DA SILVA' THEN 10936891
when c.nm_Contribuinte = 'MIRIAN QUIRINO DA SILVA' THEN 10936932
when c.nm_Contribuinte = 'MIRIAN VAZ DE SIQUEIRA GONÇALVES' THEN 10934920
when c.nm_Contribuinte = 'MIRIAN VAZ DE SIQUEIRA GONÇALVES' THEN 10934957
when c.nm_Contribuinte = 'MIRTES APARECIDA DE OLIVEIRA' THEN 10935812
when c.nm_Contribuinte = 'MIRTES APARECIDA DE OLIVEIRA' THEN 10935874
when c.nm_Contribuinte = 'MIRTES APARECIDA DE OLIVEIRA' THEN 10935946
when c.nm_Contribuinte = 'MISAEL GONCALVES DA SILVA' THEN 10934723
when c.nm_Contribuinte = 'MISAEL GONCALVES DA SILVA' THEN 10934753
when c.nm_Contribuinte = 'MISAEL GONCALVES DA SILVA' THEN 10934754
when c.nm_Contribuinte = 'MISAEL GONCALVES DA SILVA' THEN 10934755
when c.nm_Contribuinte = 'MISAEL GONCALVES DA SILVA' THEN 10934785
when c.nm_Contribuinte = 'MISAEL GONCALVES DA SILVA' THEN 10935302
when c.nm_Contribuinte = 'MISAEL GONCALVES DA SILVA' THEN 10935321
when c.nm_Contribuinte = 'MISAEL GONCALVES DA SILVA' THEN 10935390
when c.nm_Contribuinte = 'MISAEL GONCALVES DA SILVA' THEN 10935391
when c.nm_Contribuinte = 'MOACIR LOPES DE FARIAS' THEN 10935815
when c.nm_Contribuinte = 'MOACIR LOPES DE FARIAS' THEN 10935859
when c.nm_Contribuinte = 'MOACIR LOPES DE FARIAS' THEN 10935916
when c.nm_Contribuinte = 'MOISES BASTOS PEREIRA' THEN 10935363
when c.nm_Contribuinte = 'MOISES BASTOS PEREIRA' THEN 10935420
when c.nm_Contribuinte = 'MOISES BASTOS PEREIRA' THEN 10935532
when c.nm_Contribuinte = 'MONICA ELITANA DOS SANTO ALIENADO A SICOOB CED 1791090' THEN 10935301
when c.nm_Contribuinte = 'MONICA ELITANA DOS SANTO ALIENADO A SICOOB CED 1791090' THEN 10935320
when c.nm_Contribuinte = 'MONZAIR BEIJO DE ANDRADE' THEN 10933228
when c.nm_Contribuinte = 'MONZAIR BEIJO DE ANDRADE' THEN 10934346
when c.nm_Contribuinte = 'MONZAIR BEIJO DE ANDRADE' THEN 10934347
when c.nm_Contribuinte = 'MONZAIR BEIJO DE ANDRADE' THEN 10934364
when c.nm_Contribuinte = 'MONZAIR BEIJO DE ANDRADE' THEN 10935483
when c.nm_Contribuinte = 'MONZAIR BEIJO DE ANDRADE' THEN 10935593
when c.nm_Contribuinte = 'MONZAIR BEIJO DE ANDRADE' THEN 10935604
when c.nm_Contribuinte = 'MORILO GONCALVES MACHADO' THEN 10935880
when c.nm_Contribuinte = 'MORILO GONCALVES MACHADO' THEN 10935919
when c.nm_Contribuinte = 'MORILO GONCALVES MACHADO' THEN 10935920
when c.nm_Contribuinte = 'MORILO GONCALVES MACHADO' THEN 10935934
when c.nm_Contribuinte = 'MORILO GONCALVES MACHADO' THEN 10935935
when c.nm_Contribuinte = 'MORILO GONCALVES MACHADO' THEN 10935984
when c.nm_Contribuinte = 'MOZAIR BEIJO DE ANDRADE' THEN 10933475
when c.nm_Contribuinte = 'MOZAIR BEIJO DE ANDRADE' THEN 10933541
when c.nm_Contribuinte = 'MOZAIR BEIJO DE ANDRADE' THEN 10933563
when c.nm_Contribuinte = 'MOZAIR BEIJO DE ANDRADE' THEN 10934321
when c.nm_Contribuinte = 'MOZAIR BEIJO DE ANDRADE' THEN 10934322
when c.nm_Contribuinte = 'MOZAIR BEIJO DE ANDRADE' THEN 10934323
when c.nm_Contribuinte = 'MOZAIR BEIJO DE ANDRADE' THEN 10934325
when c.nm_Contribuinte = 'MOZAIR BEIJO DE ANDRADE' THEN 10934344
when c.nm_Contribuinte = 'MOZAIR BEIJO DE ANDRADE' THEN 10934345
when c.nm_Contribuinte = 'NADIR AOIAGUI' THEN 10933577
when c.nm_Contribuinte = 'NADIR AOIAGUI' THEN 10933663
when c.nm_Contribuinte = 'NADIR AOIAGUI' THEN 10933604
when c.nm_Contribuinte = 'NADIR AOIAGUI' THEN 10933654
when c.nm_Contribuinte = 'NADIR AOIAGUI' THEN 10933585
when c.nm_Contribuinte = 'NAIR RIBEIRO NUNES DA ROCHA' THEN 10936974
when c.nm_Contribuinte = 'NAIR RITAL' THEN 10935426
when c.nm_Contribuinte = 'NAIR RITAL' THEN 10935444
when c.nm_Contribuinte = 'NAIR RITAL' THEN 10935375
when c.nm_Contribuinte = 'NAIR RITAL' THEN 10936091
when c.nm_Contribuinte = 'NAIR RITAL' THEN 10936110
when c.nm_Contribuinte = 'NAIR RITCEL' THEN 10935929
when c.nm_Contribuinte = 'NAIR RITCEL' THEN 10935915
when c.nm_Contribuinte = 'NAIR RITCEL' THEN 10935813
when c.nm_Contribuinte = 'NAIR RITCEL' THEN 10936399
when c.nm_Contribuinte = 'NAIR RITCEL' THEN 10936436
when c.nm_Contribuinte = 'NAIR RITCEL' THEN 10936437
when c.nm_Contribuinte = 'NAIR RITCEL' THEN 10938250
when c.nm_Contribuinte = 'NAIR RITHICE' THEN 10937626
when c.nm_Contribuinte = 'NAIR RITHICE' THEN 10937578
when c.nm_Contribuinte = 'NAIR RITHICE' THEN 10937665
when c.nm_Contribuinte = 'NAIR RITHICE' THEN 10937579
when c.nm_Contribuinte = 'NAIR RITHICE' THEN 10937685
when c.nm_Contribuinte = 'NAIR RITHICE' THEN 10937666
when c.nm_Contribuinte = 'NATANAEL FERNANDES GUIMARÃES' THEN 10933456
when c.nm_Contribuinte = 'NATANAEL FERNANDES GUIMARÃES' THEN 10933504
when c.nm_Contribuinte = 'NEIDE ANTUNES BOTELHO MARTINS' THEN 10934520
when c.nm_Contribuinte = 'NEIDE ANTUNES BOTELHO MARTINS' THEN 10934521
when c.nm_Contribuinte = 'NELITA MARIA DOS SANTOS' THEN 10934575
when c.nm_Contribuinte = 'NELITA MARIA DOS SANTOS' THEN 10934591
when c.nm_Contribuinte = 'NELITA MARIA DOS SANTOS' THEN 10934592
when c.nm_Contribuinte = 'NELITA MARIA DOS SANTOS' THEN 10934624
when c.nm_Contribuinte = 'NELSON ANTONIO PEJARA' THEN 10935183
when c.nm_Contribuinte = 'NELSON ANTONIO PEJARA' THEN 10935216
when c.nm_Contribuinte = 'NELSON ANTONIO PEJARA' THEN 10935330
when c.nm_Contribuinte = 'NELSON JOSÉ ANTUNES' THEN 10936984
when c.nm_Contribuinte = 'NELSON MLAK' THEN 10936007
when c.nm_Contribuinte = 'NELSON MLAK' THEN 10935988
when c.nm_Contribuinte = 'NELSON MLAK' THEN 10935953
when c.nm_Contribuinte = 'NELSON MLAK' THEN 10936579
when c.nm_Contribuinte = 'NELSON MLAK' THEN 10937906
when c.nm_Contribuinte = 'NERY PIAZZA ALIENADO A SICOOB CREDIP CEDULA Nº 2563304' THEN 10934370
when c.nm_Contribuinte = 'NERY PIAZZA ALIENADO A SICOOB CREDIP CEDULA Nº 2563304' THEN 10937908
when c.nm_Contribuinte = 'NERY PIAZZA ALIENADO A SICOOB CREDIP CEDULA Nº 2563304' THEN 10937959
when c.nm_Contribuinte = 'NEUSA XAVIER DO NASCIMENTO' THEN 10935736
when c.nm_Contribuinte = 'NEUSA XAVIER DO NASCIMENTO' THEN 10935787
when c.nm_Contribuinte = 'NEUSA XAVIER DO NASCIMENTO' THEN 10935788
when c.nm_Contribuinte = 'NEUZA LEAO DE ARAUJO' THEN 10933472
when c.nm_Contribuinte = 'NEUZA LEAO DE ARAUJO' THEN 10933490
when c.nm_Contribuinte = 'NEUZA LEAO DE ARAUJO' THEN 10933508
when c.nm_Contribuinte = 'NEUZA LEAO DE ARAUJO' THEN 10933511
when c.nm_Contribuinte = 'NEUZA MARIA CASAGRANDE' THEN 10933747
when c.nm_Contribuinte = 'NEUZA MARIA CASAGRANDE' THEN 10933814
when c.nm_Contribuinte = 'NEUZA MARIA CASAGRANDE' THEN 10933848
when c.nm_Contribuinte = 'NICÓLI SILVA DE SOUZA' THEN 10938374
when c.nm_Contribuinte = 'NICÓLI SILVA DE SOUZA' THEN 10938376
when c.nm_Contribuinte = 'NILCIMAR BEIJO FERREIRA' THEN 10936159
when c.nm_Contribuinte = 'NILCIMAR BEIJO FERREIRA' THEN 10936175
when c.nm_Contribuinte = 'NILCIMAR BEIJO FERREIRA' THEN 10936199
when c.nm_Contribuinte = 'NILDA CANUTO' THEN 10938355
when c.nm_Contribuinte = 'NILDA CANUTO' THEN 10938317
when c.nm_Contribuinte = 'NILSON ANTONIO DA LUZ' THEN 10934102
when c.nm_Contribuinte = 'NILSON ANTONIO DA LUZ' THEN 10934103
when c.nm_Contribuinte = 'NILSON ANTONIO DA LUZ' THEN 10934139
when c.nm_Contribuinte = 'NILSON ANTONIO DA LUZ' THEN 10934142
when c.nm_Contribuinte = 'NILSON ANTONIO DA LUZ' THEN 10934172
when c.nm_Contribuinte = 'NILSON ANTONIO DA LUZ' THEN 10934186
when c.nm_Contribuinte = 'NILSON ANTONIO DA LUZ' THEN 10934187
when c.nm_Contribuinte = 'NILSON DA SILVA' THEN 10935282
when c.nm_Contribuinte = 'NILTON MAURILIO SALA' THEN 10937259
when c.nm_Contribuinte = 'NILTON OLIVEIRA SOUZA' THEN 10936049
when c.nm_Contribuinte = 'NILTON OLIVEIRA SOUZA' THEN 10936075
when c.nm_Contribuinte = 'NILTON OLIVEIRA SOUZA' THEN 10936677
when c.nm_Contribuinte = 'NILZA GOMES DOS SANTOS' THEN 10937675
when c.nm_Contribuinte = 'NILZA GOMES DOS SANTOS' THEN 10937772
when c.nm_Contribuinte = 'NILZA MARIA DOP CARMO MORAIS' THEN 10936248
when c.nm_Contribuinte = 'NISES MARILDA TRAVAINI BERNADELI' THEN 10935800
when c.nm_Contribuinte = 'NISES MARILDA TRAVAINI BERNADELI' THEN 10935955
when c.nm_Contribuinte = 'NISES MARILDA TRAVAINI BERNADELI' THEN 10935972
when c.nm_Contribuinte = 'NISES MARILDA TRAVAINI BERNADELI' THEN 10935973
when c.nm_Contribuinte = 'NISES MARILDA TRAVAINI BERNADELI' THEN 10935991
when c.nm_Contribuinte = 'NISES MARILDA TRAVAINI BERNADELI' THEN 10936026
when c.nm_Contribuinte = 'NIVALDO ALVES MACEDO' THEN 10938354
when c.nm_Contribuinte = 'NIVALDO LOPES SANTOS' THEN 10935378
when c.nm_Contribuinte = 'NIVALDO LOPES SANTOS' THEN 10935414
when c.nm_Contribuinte = 'NIVALDO LOPES SANTOS' THEN 10935431
when c.nm_Contribuinte = 'NIVALDO NOGUEIRA DO NASCIMENTO' THEN 10933449
when c.nm_Contribuinte = 'NIVALDO NOGUEIRA DO NASCIMENTO' THEN 10933514
when c.nm_Contribuinte = 'NIVALDO NOGUEIRA DO NASCIMENTO' THEN 10933546
when c.nm_Contribuinte = 'NIVALDO NOGUEIRA DO NASCIMENTO' THEN 10933556
when c.nm_Contribuinte = 'NIVALDO NOGUEIRA DO NASCIMENTO' THEN 10933575
when c.nm_Contribuinte = 'NIVALDO NOGUEIRA DO NASCIMENTO' THEN 10933587
when c.nm_Contribuinte = 'NIVALDO NOGUEIRA DO NASCIMENTO' THEN 10933605
when c.nm_Contribuinte = 'NIVALDO NOGUEIRA DO NASCIMENTO' THEN 10933641
when c.nm_Contribuinte = 'NIVANILDA DE SOUZA' THEN 10937344
when c.nm_Contribuinte = 'NIVANILDA DE SOUZA' THEN 10937217
when c.nm_Contribuinte = 'NIVANILDA DE SOUZA' THEN 10937345
when c.nm_Contribuinte = 'NOEMI ESCORICA DIAS PINTO' THEN 10937936
when c.nm_Contribuinte = 'NOEMI ESCORICA DIAS PINTO' THEN 10937963
when c.nm_Contribuinte = 'NOEMI ESCORICA DIAS PINTO' THEN 10938004
when c.nm_Contribuinte = 'NONDAS DIONIZIO DE LIMA' THEN 10937283
when c.nm_Contribuinte = 'NONDAS DIONIZIO DE LIMA' THEN 10937337
when c.nm_Contribuinte = 'ODARIO SCHWAMBACH' THEN 10934449
when c.nm_Contribuinte = 'ODARIO SCHWAMBACH' THEN 10934391
when c.nm_Contribuinte = 'ODIR GOMES' THEN 10936280
when c.nm_Contribuinte = 'ODIR GOMES' THEN 10936348
when c.nm_Contribuinte = 'ODIR GOMES' THEN 10936281
when c.nm_Contribuinte = 'OLERIS FAUSTINO DE JESUS' THEN 10938330
when c.nm_Contribuinte = 'OLERIS FAUSTINO DE JESUS' THEN 10938372
when c.nm_Contribuinte = 'OLERIS FAUSTINO DE JESUS' THEN 10938391
when c.nm_Contribuinte = 'OLICIO DE OLIVEIRA' THEN 10937188
when c.nm_Contribuinte = 'OLICIO DE OLIVEIRA' THEN 10937189
when c.nm_Contribuinte = 'OLICIO DE OLIVEIRA' THEN 10937117
when c.nm_Contribuinte = 'OLICIO DE OLIVEIRA' THEN 10937271
when c.nm_Contribuinte = 'OLICIO DE OLIVEIRA' THEN 10937287
when c.nm_Contribuinte = 'OLICIO DE OLIVEIRA' THEN 10937252
when c.nm_Contribuinte = 'OLICIO DE OLIVEIRA' THEN 10937156
when c.nm_Contribuinte = 'OLICIO DE OLIVEIRA' THEN 10937272
when c.nm_Contribuinte = 'OLICIO DE OLIVEIRA' THEN 10937201
when c.nm_Contribuinte = 'OLINDO ALVES DA SILVA' THEN 10933365
when c.nm_Contribuinte = 'OLINDO ALVES DA SILVA' THEN 10933393
when c.nm_Contribuinte = 'OLINDO ALVES DA SILVA' THEN 10933394
when c.nm_Contribuinte = 'OLINDO ALVES DA SILVA' THEN 10933405
when c.nm_Contribuinte = 'OLINDO ALVES DA SILVA' THEN 10933408
when c.nm_Contribuinte = 'OLIVEIRA ALVES DA SILVA ' THEN 10935515
when c.nm_Contribuinte = 'OLIVEIRA ALVES DA SILVA ' THEN 10935528
when c.nm_Contribuinte = 'OLIVEIRA ALVES DA SILVA ' THEN 10935529
when c.nm_Contribuinte = 'OLIVEIRA ALVES DA SILVA ' THEN 10936502
when c.nm_Contribuinte = 'OLIVEIRA ALVES DA SILVA ' THEN 10936574
when c.nm_Contribuinte = 'OLIVEIRA ALVES DA SILVA ' THEN 10936575
when c.nm_Contribuinte = 'OLMIRO THOMAZ MARTINS' THEN 10935096
when c.nm_Contribuinte = 'OLMIRO THOMAZ MARTINS' THEN 10935166
when c.nm_Contribuinte = 'OLMIRO THOMAZ MARTINS' THEN 10935167
when c.nm_Contribuinte = 'OLMIRO THOMAZ MARTINS' THEN 10935187
when c.nm_Contribuinte = 'OLMIRO THOMAZ MARTINS' THEN 10935205
when c.nm_Contribuinte = 'OLMIRO THOMAZ MARTINS' THEN 10935226
when c.nm_Contribuinte = 'OLMIRO THOMAZ MARTINS' THEN 10935798
when c.nm_Contribuinte = 'OLMIRO THOMAZ MARTINS' THEN 10935881
when c.nm_Contribuinte = 'OLMIRO THOMAZ MARTINS' THEN 10935987
when c.nm_Contribuinte = 'ORIAS PEREIRA CANDIDO' THEN 10933293
when c.nm_Contribuinte = 'ORIAS PEREIRA CANDIDO' THEN 10933297
when c.nm_Contribuinte = 'ORIAS PEREIRA CANDIDO' THEN 10933298
when c.nm_Contribuinte = 'ORLANDO FERREIRA BARBOSA' THEN 10937537
when c.nm_Contribuinte = 'ORLANDO FERREIRA BARBOSA' THEN 10937598
when c.nm_Contribuinte = 'ORLANDO FERREIRA BARBOSA' THEN 10937599
when c.nm_Contribuinte = 'ORLANDO FERREIRA BARBOSA' THEN 10937630
when c.nm_Contribuinte = 'ORLANDO FERREIRA BARBOSA' THEN 10937653
when c.nm_Contribuinte = 'ORLANDO FERREIRA BARBOSA' THEN 10937700
when c.nm_Contribuinte = 'ORLANDO FERREIRA BARBOSA' THEN 10937710
when c.nm_Contribuinte = 'ORLANDO FERREIRA BARBOSA' THEN 10937711
when c.nm_Contribuinte = 'ORLANDO FERREIRA BARBOSA' THEN 10937712
when c.nm_Contribuinte = 'ORLANDO RAMOS MARTINS' THEN 10936781
when c.nm_Contribuinte = 'ORLANDO RAMOS MARTINS' THEN 10936966
when c.nm_Contribuinte = 'ORLANDO RAMOS MARTINS' THEN 10937004
when c.nm_Contribuinte = 'ORLANDO SIEBE' THEN 10936566
when c.nm_Contribuinte = 'ORLANDO SIEBE' THEN 10936585
when c.nm_Contribuinte = 'ORLANDO SIEBE' THEN 10936533
when c.nm_Contribuinte = 'ORLANDO SIEBRE' THEN 10935410
when c.nm_Contribuinte = 'ORLANDO SIEBRE' THEN 10937713
when c.nm_Contribuinte = 'ORLANDO SIEBRE' THEN 10937603
when c.nm_Contribuinte = 'ORLANDO SIEBRE' THEN 10937620
when c.nm_Contribuinte = 'ORLANDO SIEBRE' THEN 10937702
when c.nm_Contribuinte = 'ORTENCIO PEREIRA DOS SANTOS' THEN 10937418
when c.nm_Contribuinte = 'ORTENCIO PEREIRA DOS SANTOS' THEN 10937490
when c.nm_Contribuinte = 'ORTENCIO PEREIRA DOS SANTOS' THEN 10937491
when c.nm_Contribuinte = 'OSMAR ALVES CESTARE' THEN 10936328
when c.nm_Contribuinte = 'OSMAR CASAGRANDE ' THEN 10935322
when c.nm_Contribuinte = 'OSMAR CASAGRANDE ' THEN 10935352
when c.nm_Contribuinte = 'OSMAR CASAGRANDE ' THEN 10935807
when c.nm_Contribuinte = 'OSMAR DUPINHAKE' THEN 10935892
when c.nm_Contribuinte = 'OSMAR DUPINHAKE' THEN 10935790
when c.nm_Contribuinte = 'OSMAR DUPINHAKE' THEN 10935791
when c.nm_Contribuinte = 'OSVALDINO FORTUNATO DOS SANTOS' THEN 10933838
when c.nm_Contribuinte = 'OSVALDINO FORTUNATO DOS SANTOS' THEN 10933854
when c.nm_Contribuinte = 'OSVALDINO FORTUNATO DOS SANTOS' THEN 10933855
when c.nm_Contribuinte = 'OSVALDINO FORTUNATO DOS SANTOS' THEN 10933857
when c.nm_Contribuinte = 'OSVALDINO FORTUNATO DOS SANTOS' THEN 10933871
when c.nm_Contribuinte = 'OSVALDINO FORTUNATO DOS SANTOS' THEN 10933876
when c.nm_Contribuinte = 'OSVALDINO FORTUNATO DOS SANTOS' THEN 10933892
when c.nm_Contribuinte = 'OSVALDINO FORTUNATO DOS SANTOS' THEN 10933902
when c.nm_Contribuinte = 'OSVALDINO FORTUNATO DOS SANTOS' THEN 10933933
when c.nm_Contribuinte = 'OSVALDINO FORTUNATO DOS SANTOS' THEN 10933964
when c.nm_Contribuinte = 'OSVALDINO SABINO' THEN 10936097
when c.nm_Contribuinte = 'OSVALDINO SABINO' THEN 10936098
when c.nm_Contribuinte = 'OSVALDINO SABINO' THEN 10936204
when c.nm_Contribuinte = 'OSVALDO RODRIGUES COUTRIM' THEN 10936241
when c.nm_Contribuinte = 'OSVALDO RODRIGUES COUTRIM' THEN 10936353
when c.nm_Contribuinte = 'OSWALDO AMARAL DE BRITO' THEN 10935982
when c.nm_Contribuinte = 'OSWALDO AMARAL DE BRITO' THEN 10935983
when c.nm_Contribuinte = 'OSWALDO AMARAL DE BRITO' THEN 10936079
when c.nm_Contribuinte = 'OSWALDO DIAS PINTO' THEN 10934702
when c.nm_Contribuinte = 'OSWALDO DIAS PINTO' THEN 10934751
when c.nm_Contribuinte = 'OSWALDO DIAS PINTO' THEN 10934703
when c.nm_Contribuinte = 'OSWALDO DIAS PINTO' THEN 10934731
when c.nm_Contribuinte = 'OSWALDO DIAS PINTO' THEN 10934752
when c.nm_Contribuinte = 'OSWALDO DIAS PINTO' THEN 10934767
when c.nm_Contribuinte = 'OSWALDO DIAS PINTO' THEN 10934784
when c.nm_Contribuinte = 'OSWALDO DIAS PINTO' THEN 10934768
when c.nm_Contribuinte = 'OTAMIR DANIEL DE ARRUDA' THEN 10933948
when c.nm_Contribuinte = 'OTAMIR DANIEL DE ARRUDA' THEN 10934083
when c.nm_Contribuinte = 'OTAMIR DANIEL DE ARRUDA' THEN 10934655
when c.nm_Contribuinte = 'OTAMIR DANIEL DE ARRUDA' THEN 10934668
when c.nm_Contribuinte = 'OTAMIR DANIEL DE ARRUDA' THEN 10935159
when c.nm_Contribuinte = 'OTAMIR DANIEL DE ARRUDA' THEN 10935194
when c.nm_Contribuinte = 'OTAMIR DANIEL DE ARRUDA' THEN 10935232
when c.nm_Contribuinte = 'OTAMIR DANIEL DE ARRUDA' THEN 10935265
when c.nm_Contribuinte = 'OTAMIR DANIEL DE ARRUDA' THEN 10935794
when c.nm_Contribuinte = 'OTAMIR DANIEL DE ARRUDA' THEN 10935853
when c.nm_Contribuinte = 'OTAMIR DANIEL DE ARRUDA' THEN 10935925
when c.nm_Contribuinte = 'OTAMIR DANIEL DE ARRUDA' THEN 10936757
when c.nm_Contribuinte = 'OTAMIR DANIEL DE ARRUDA' THEN 10936771
when c.nm_Contribuinte = 'OTAMIR DANIEL DE ARRUDA' THEN 10936809
when c.nm_Contribuinte = 'OTAMIR DANIEL DE ARRUDA' THEN 10936828
when c.nm_Contribuinte = 'OTAMIR DANIEL DE ARRUDA' THEN 10936846
when c.nm_Contribuinte = 'OTAMIR DANIEL DE ARRUDA' THEN 10937499
when c.nm_Contribuinte = 'OTILIA VITORINO DE MORAIS' THEN 10937547
when c.nm_Contribuinte = 'OZILIA ELLER GOIS' THEN 10936424
when c.nm_Contribuinte = 'OZILIA ELLER GOIS' THEN 10938371
when c.nm_Contribuinte = 'OZILIA ELLER GOIS' THEN 10938290
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