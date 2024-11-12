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
    return `${year}-${month}-${day}`;
}

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "CONTABIL2024"
        const selectDatabaseQuery = 'USE FOLHADB';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select
ROW_NUMBER() OVER (ORDER BY fa.cd_Funcionario) AS idIntegracao,
JSON_QUERY(
	(SELECT 
		JSON_QUERY(
			(SELECT 
			CASE fa.cd_Funcionario
			WHEN '1' 	THEN 33446453  
			WHEN '360' THEN 33653223  	
			WHEN '2' 	THEN 33457855  
			WHEN '488' THEN 33477078  	
			WHEN '3' 	THEN 33476774  
			WHEN '915' THEN 33477343  	
			WHEN '991' THEN 33477383  	
			WHEN '4' 	THEN 33476776  
			WHEN '549' THEN 33477096  	
			WHEN '457' THEN 33477119  	
			WHEN '511' THEN 33477137  	
			WHEN '480' THEN 33477058  	
			WHEN '476' THEN 33653149  	
			WHEN '1083' THEN 33489990   
			WHEN '862' THEN 33477349  	
			WHEN '1043' THEN 33489976   
			WHEN '291' THEN 33476957  	
			WHEN '964' THEN 33477436  	
			WHEN '873' THEN 33477378  	
			WHEN '900' THEN 33477409  	
			WHEN '1009' THEN 33489946   
			WHEN '1026' THEN 33489962   
			WHEN '176' THEN 33476903  	
			WHEN '5'	THEN 33476778  
			WHEN '454' THEN 33477109  	
			WHEN '6'	THEN 33476779  
			WHEN '950' THEN 33477417  	
			WHEN '508' THEN 33477126  	
			WHEN '865' THEN 33477358  	
			WHEN '331' THEN 33476908  	
			WHEN '322' THEN 33653160  	
			WHEN '854' THEN 33477329  	
			WHEN '1073' THEN 33489987   
			WHEN '438' THEN 33653203  	
			WHEN '847' THEN 33477308  	
			WHEN '872' THEN 33477375  	
			WHEN '941' THEN 33477402  	
			WHEN '410' THEN 33477135  	
			WHEN '497' THEN 33653168  	
			WHEN '7'	THEN 33476781  
			WHEN '233' THEN 33476927  	
			WHEN '313' THEN 33477011  	
			WHEN '9'	THEN 33476784  
			WHEN '293' THEN 33476967  	
			WHEN '179' THEN 33476915  	
			WHEN '329' THEN 33476900  	
			WHEN '309' THEN 33653175  	
			WHEN '10'	THEN 33476785  
			WHEN '189' THEN 33476953  	
			WHEN '371' THEN 33477033  	
			WHEN '784' THEN 33477262  	
			WHEN '11'	THEN 33476787  
			WHEN '12'	THEN 33476789  
			WHEN '516' THEN 33477014  	
			WHEN '458' THEN 33653229  	
			WHEN '167' THEN 33476871  	
			WHEN '298' THEN 33476980  	
			WHEN '593' THEN 33477232  	
			WHEN '13'	THEN 33476791  
			WHEN '966'	THEN 33477335  
			WHEN '1039' THEN 33489974   
			WHEN '809' THEN 33477164  	
			WHEN '718' THEN 33477169  	
			WHEN '420' THEN 33477024  	
			WHEN '573' THEN 33477166  	
			WHEN '677' THEN 33477216  	
			WHEN '830' THEN 33477246  	
			WHEN '359' THEN 33653220  	
			WHEN '178' THEN 33476912  	
			WHEN '332' THEN 33653174  	
			WHEN '259' THEN 33653191  	
			WHEN '647' THEN 33477255  	
			WHEN '510' THEN 33477133  	
			WHEN '15'	THEN 33476793  
			WHEN '16'	THEN 33476795  
			WHEN '391' THEN 33477083  	
			WHEN '798' THEN 33477313  	
			WHEN '1064' THEN 33489981   
			WHEN '207' THEN 33477007  	
			WHEN '187' THEN 33476941  	
			WHEN '630' THEN 33477203  	
			WHEN '544' THEN 33653176  	
			WHEN '970' THEN 33477345  	
			WHEN '1040' THEN 33489975   
			WHEN '282' THEN 33476929  	
			WHEN '18' THEN 33476797  
			WHEN '19' THEN 33476800  
			WHEN '252' THEN 33476987  	
			WHEN '212' THEN 33477017  	
			WHEN '581' THEN 33477199  	
			WHEN '225' THEN 33476897  	
			WHEN '519' THEN 33477020  	
			WHEN '20'	THEN 33476802  
			WHEN '266' THEN 33476868  	
			WHEN '1031' THEN 33489967   
			WHEN '445' THEN 33477082  	
			WHEN '318' THEN 33476852  	
			WHEN '21'	THEN 33476804  
			WHEN '180' THEN 33476919  	
			WHEN '517' THEN 33653147  	
			WHEN '888' THEN 33477407  	
			WHEN '622' THEN 33653202  	
			WHEN '721' THEN 33477185  	
			WHEN '816' THEN 33477195  	
			WHEN '849' THEN 33477312  	
			WHEN '713' THEN 33477333  	
			WHEN '939' THEN 33477400  	
			WHEN '837' THEN 33477274  	
			WHEN '853' THEN 33477325  	
			WHEN '1035' THEN 33489970   
			WHEN '311' THEN 33477006  	
			WHEN '689' THEN 33477253  	
			WHEN '242' THEN 33653143  	
			WHEN '530' THEN 33477048  	
			WHEN '22'	THEN 33476807  
			WHEN '307' THEN 33477001  	
			WHEN '807' THEN 33477156  	
			WHEN '676' THEN 33477211  	
			WHEN '867' THEN 33477362  	
			WHEN '903' THEN 33477415  	
			WHEN '394' THEN 33653164  	
			WHEN '452' THEN 33477104  	
			WHEN '23'	THEN 33476808  
			WHEN '813' THEN 33477182  	
			WHEN '827' THEN 33477234  	
			WHEN '875' THEN 33477381  	
			WHEN '679' THEN 33477223  	
			WHEN '785' THEN 33477266  	
			WHEN '475' THEN 33653146  	
			WHEN '540' THEN 33477070  	
			WHEN '490' THEN 33477085  	
			WHEN '220' THEN 33476882  	
			WHEN '789' THEN 33477280  	
			WHEN '383' THEN 33653156  	
			WHEN '954' THEN 33477423  	
			WHEN '24'	THEN 33476810  
			WHEN '415' THEN 33477012  	
			WHEN '395' THEN 33653167  	
			WHEN '483' THEN 33477067  	
			WHEN '814' THEN 33477186  	
			WHEN '965' THEN 33477334  	
			WHEN '948' THEN 33477414  	
			WHEN '25'	THEN 33476812  
			WHEN '26'	THEN 33476814  
			WHEN '28'	THEN 33476816  
			WHEN '575' THEN 33477175  	
			WHEN '555' THEN 33653188  	
			WHEN '27'	THEN 33529273  
			WHEN '29'	THEN 33529277  
			WHEN '397' THEN 33653170  	
			WHEN '314' THEN 33653142  	
			WHEN '354' THEN 33653209  	
			WHEN '398' THEN 33653172  	
			WHEN '918' THEN 33477350  	
			WHEN '982' THEN 33477369  	
			WHEN '346' THEN 33476964  	
			WHEN '927' THEN 33477374  	
			WHEN '836' THEN 33477268  	
			WHEN '664' THEN 33477327  	
			WHEN '1012' THEN 33489949   
			WHEN '1030' THEN 33489966   
			WHEN '637' THEN 33477222  	
			WHEN '972' THEN 33477351  	
			WHEN '30'	THEN 33476819  
			WHEN '1104' THEN 33489955   
			WHEN '449' THEN 33477094  	
			WHEN '31'	THEN 33476820  
			WHEN '32'	THEN 33476822  
			WHEN '281' THEN 33476924  	
			WHEN '618' THEN 33477154  	
			WHEN '551' THEN 33477102  	
			WHEN '393' THEN 33477090  	
			WHEN '783' THEN 33477258  	
			WHEN '919' THEN 33477353  	
			WHEN '871' THEN 33477372  	
			WHEN '944' THEN 33477408  	
			WHEN '431' THEN 33653192  	
			WHEN '672' THEN 33477191  	
			WHEN '1036' THEN 33489971   
			WHEN '728' THEN 33477208  	
			WHEN '33'	THEN 33476824  
			WHEN '34'	THEN 33476825  
			WHEN '351' THEN 33476978  	
			WHEN '413' THEN 33477143  	
			WHEN '842' THEN 33477290  	
			WHEN '858' THEN 33477340  	
			WHEN '905' THEN 33477419  	
			WHEN '35'	THEN 33476827  
			WHEN '595' THEN 33653251  	
			WHEN '821' THEN 33477215  	
			WHEN '904' THEN 33477416  	
			WHEN '37'	THEN 33476829  
			WHEN '695' THEN 33477278  	
			WHEN '1027' THEN 33489964   
			WHEN '39'	THEN 33476832  
			WHEN '466' THEN 33653141  	
			WHEN '987' THEN 33653241  	
			WHEN '283' THEN 33476933  	
			WHEN '40'	THEN 33476834  
			WHEN '321' THEN 33476863  	
			WHEN '374' THEN 33477043  	
			WHEN '532' THEN 33477051  	
			WHEN '542' THEN 33477076  	
			WHEN '494' THEN 33477095  	
			WHEN '929' THEN 33477379  	
			WHEN '177' THEN 33476907  	
			WHEN '877' THEN 33477386  	
			WHEN '880' THEN 33477394  	
			WHEN '1011' THEN 33489948   
			WHEN '348' THEN 33653201  	
			WHEN '481' THEN 33477062  	
			WHEN '1004' THEN 33489942   
			WHEN '1074' THEN 33489988   
			WHEN '238' THEN 33476946  	
			WHEN '41'	THEN 33476835  
			WHEN '232' THEN 33476922  	
			WHEN '42'	THEN 33476837  
			WHEN '43'	THEN 33476840  
			WHEN '527' THEN 33477037  	
			WHEN '974' THEN 33477357  	
			WHEN '1024' THEN 33489958   
			WHEN '690' THEN 33477259  	
			WHEN '650' THEN 33477269  	
			WHEN '708' THEN 33477320  	
			WHEN '876' THEN 33477384  	
			WHEN '1107' THEN 33489961   
			WHEN '426' THEN 33477038  	
			WHEN '778' THEN 33653224  	
			WHEN '44'	THEN 33476844  
			WHEN '628' THEN 33477192  	
			WHEN '688' THEN 33477248  	
			WHEN '45'	THEN 33476849  
			WHEN '959' THEN 33477430  	
			WHEN '47'	THEN 33476859  
			WHEN '777' THEN 33477236  	
			WHEN '973' THEN 33477354  	
			WHEN '512' THEN 33653187  	
			WHEN '190' THEN 33476956  	
			WHEN '182' THEN 33476928  	
			WHEN '448' THEN 33477092  	
			WHEN '815' THEN 33477190  	
			WHEN '683' THEN 33477235  	
			WHEN '850' THEN 33477317  	
			WHEN '922' THEN 33477361  	
			WHEN '587' THEN 33477214  	
			WHEN '507' THEN 33477122  	
			WHEN '48'	THEN 33476864  
			WHEN '608'	THEN 33477282  
			WHEN '287' THEN 33476945  	
			WHEN '925' THEN 33477368  	
			WHEN '962' THEN 33477434  	
			WHEN '289' THEN 33476951  	
			WHEN '50'	THEN 33476872  
			WHEN '335' THEN 33476925  	
			WHEN '696' THEN 33653210  	
			WHEN '38'	THEN 33476831  
			WHEN '353' THEN 33476984  	
			WHEN '720' THEN 33477180  	
			WHEN '625' THEN 33477184  	
			WHEN '992' THEN 33477387  	
			WHEN '1105'THEN 33489957   
			WHEN '1071' THEN 33489985   
			WHEN '859' THEN 33477342  	
			WHEN '1103' THEN 33489953   
			WHEN '317' THEN 33476848  	
			WHEN '460' THEN 33477129  	
			WHEN '1034' THEN 33489969   
			WHEN '1095' THEN 33489997   
			WHEN '254' THEN 33476995  	
			WHEN '361' THEN 33653226  	
			WHEN '306' THEN 33476999  	
			WHEN '262' THEN 33653199  	
			WHEN '983' THEN 33477371  	
			WHEN '878' THEN 33477389  	
			WHEN '914' THEN 33477431  	
			WHEN '51'	THEN 33476877  
			WHEN '52'	THEN 33476881  
			WHEN '629' THEN 33477198  	
			WHEN '342' THEN 33476950  	
			WHEN '425' THEN 33477032  	
			WHEN '439' THEN 33477065  	
			WHEN '578' THEN 33477188  	
			WHEN '504' THEN 33653179  	
			WHEN '53'	THEN 33476886  
			WHEN '230' THEN 33476913  	
			WHEN '284' THEN 33653137  	
			WHEN '719' THEN 33477174  	
			WHEN '693' THEN 33477271  	
			WHEN '652' THEN 33477276  	
			WHEN '521' THEN 33477026  	
			WHEN '725' THEN 33477200  	
			WHEN '924' THEN 33477365  	
			WHEN '54'	THEN 33476770  
			WHEN '1067' THEN 33489983   
			WHEN '993' THEN 33477390  	
			WHEN '1049' THEN 33489977   
			WHEN '461' THEN 33477134  	
			WHEN '547' THEN 33477091  	
			WHEN '498' THEN 33653171  	
			WHEN '270' THEN 33476890  	
			WHEN '192' THEN 33476965  	
			WHEN '715' THEN 33477160  	
			WHEN '607' THEN 33653254  	
			WHEN '196' THEN 33476979  	
			WHEN '198' THEN 33476985  	
			WHEN '55'	THEN 33476771  
			WHEN '707' THEN 33477316  	
			WHEN '1008' THEN 33489945   
			WHEN '495' THEN 33477098  	
			WHEN '724' THEN 33477197  	
			WHEN '681' THEN 33477230  	
			WHEN '902' THEN 33477413  	
			WHEN '1052' THEN 33489979   
			WHEN '1091' THEN 33489994   
			WHEN '808' THEN 33477159  	
			WHEN '698' THEN 33477289  	
			WHEN '1006' THEN 33489944   
			WHEN '619' THEN 33477157  	
			WHEN '645' THEN 33477247  	
			WHEN '312' THEN 33477008  	
			WHEN '529' THEN 33477046  	
			WHEN '638' THEN 33477228  	
			WHEN '441' THEN 33653207  	
			WHEN '839' THEN 33477279  	
			WHEN '657' THEN 33477301  	
			WHEN '396' THEN 33477097  	
			WHEN '345' THEN 33476958  	
			WHEN '296' THEN 33476975  	
			WHEN '256' THEN 33653180  	
			WHEN '375' THEN 33477045  	
			WHEN '709' THEN 33477324  	
			WHEN '732' THEN 33477224  	
			WHEN '57'	THEN 33476773  
			WHEN '1087' THEN 33489993   
			WHEN '59'	THEN 33476775  
			WHEN '636' THEN 33477221  	
			WHEN '943' THEN 33477406  	
			WHEN '951' THEN 33477418  	
			WHEN '627' THEN 33653204  	
			WHEN '1005'THEN 33489943   
			WHEN '1092'THEN 33489995   
			WHEN '373' THEN 33477040  	
			WHEN '953' THEN 33477422  	
			WHEN '265' THEN 33653118  	
			WHEN '969' THEN 33477344  	
			WHEN '933' THEN 33477385  	
			WHEN '273' THEN 33476901  	
			WHEN '61'	THEN 33476777  
			WHEN '631' THEN 33477205  	
			WHEN '62'	THEN 33476780  
			WHEN '63'	THEN 33476782  
			WHEN '775' THEN 33653219  	
			WHEN '411' THEN 33477138  	
			WHEN '49'	THEN 33476866  
			WHEN '580' THEN 33477194  	
			WHEN '1018' THEN 33489950   
			WHEN '557' THEN 33477116  	
			WHEN '916' THEN 33477346  	
			WHEN '64'	THEN 33476783  
			WHEN '614' THEN 33477309  	
			WHEN '286' THEN 33476940  	
			WHEN '963' THEN 33477435  	
			WHEN '173' THEN 33476894  	
			WHEN '315' THEN 33476843  	
			WHEN '226' THEN 33653124  	
			WHEN '249' THEN 33653163  	
			WHEN '66'	THEN 33476786  
			WHEN '67'	THEN 33476788  
			WHEN '68'	THEN 33476790  
			WHEN '69'	THEN 33476792  
			WHEN '337' THEN 33476936  	
			WHEN '678' THEN 33477219  	
			WHEN '70'	THEN 33476794  
			WHEN '71'	THEN 33653128  
			WHEN '1082' THEN 33489989   
			WHEN '72'	THEN 33476796  
			WHEN '73'	THEN 33476798  
			WHEN '74'	THEN 33476799  
			WHEN '514' THEN 33477144  	
			WHEN '75'	THEN 33476801  
			WHEN '279' THEN 33476916  	
			WHEN '443' THEN 33477075  	
			WHEN '76'	THEN 33476803  
			WHEN '235' THEN 33476934  	
			WHEN '191' THEN 33476960  	
			WHEN '653' THEN 33477281  	
			WHEN '669' THEN 33653200  	
			WHEN '773' THEN 33653211  	
			WHEN '824' THEN 33477227  	
			WHEN '911' THEN 33477426  	
			WHEN '1072' THEN 33489986   
			WHEN '430' THEN 33653189  	
			WHEN '730' THEN 33477217  	
			WHEN '380' THEN 33653152  	
			WHEN '422' THEN 33653159  	
			WHEN '77'	THEN 33476805  
			WHEN '621' THEN 33477167  	
			WHEN '436' THEN 33477057  	
			WHEN '78'	THEN 33476806  
			WHEN '1010' THEN 33489947   
			WHEN '1085' THEN 33489992   
			WHEN '856' THEN 33477336  	
			WHEN '955' THEN 33477424  	
			WHEN '819' THEN 33477206  	
			WHEN '857' THEN 33477338  	
			WHEN '209' THEN 33477009  	
			WHEN '79'	THEN 33476809  
			WHEN '80'	THEN 33476811  
			WHEN '81'	THEN 33476813  
			WHEN '82'	THEN 33476815  
			WHEN '83'	THEN 33476817  
			WHEN '812' THEN 33477177  	
			WHEN '684' THEN 33477237  	
			WHEN '851' THEN 33477319  	
			WHEN '874' THEN 33477380  	
			WHEN '942' THEN 33477404  	
			WHEN '84'	THEN 33476818  
			WHEN '85'	THEN 33476821  
			WHEN '86'	THEN 33476823  
			WHEN '615' THEN 33477147  	
			WHEN '174' THEN 33476898  	
			WHEN '639' THEN 33653222  	
			WHEN '285' THEN 33476939  	
			WHEN '613' THEN 33477304  	
			WHEN '869' THEN 33477367  	
			WHEN '496' THEN 33477103  	
			WHEN '455' THEN 33477113  	
			WHEN '646' THEN 33477251  	
			WHEN '87'	THEN 33476826  
			WHEN '612' THEN 33477302  	
			WHEN '250' THEN 33476982  	
			WHEN '88'	THEN 33476828  
			WHEN '818' THEN 33477201  	
			WHEN '654' THEN 33477287  	
			WHEN '89'	THEN 33476830  
			WHEN '584' THEN 33477204  	
			WHEN '509' THEN 33477130  	
			WHEN '90'	THEN 33476833  
			WHEN '1101' THEN 33489951   
			WHEN '215' THEN 33476861  	
			WHEN '91'	THEN 33476836  
			WHEN '946' THEN 33477412  	
			WHEN '716' THEN 33477163  	
			WHEN '554' THEN 33477110  	
			WHEN '418' THEN 33477021  	
			WHEN '205' THEN 33477004  	
			WHEN '269' THEN 33476884  	
			WHEN '366' THEN 33477025  	
			WHEN '562' THEN 33477132  	
			WHEN '961' THEN 33477433  	
			WHEN '92'	THEN 33476838  
			WHEN '901' THEN 33477411  	
			WHEN '906' THEN 33477421  	
			WHEN '674' THEN 33477202  	
			WHEN '93'	THEN 33653151  
			WHEN '588' THEN 33477218  	
			WHEN '671' THEN 33477187  	
			WHEN '790' THEN 33477284  	
			WHEN '686' THEN 33477243  	
			WHEN '543' THEN 33477079  	
			WHEN '451' THEN 33477101  	
			WHEN '513' THEN 33477142  	
			WHEN '370' THEN 33477031  	
			WHEN '94'	THEN 33476841  
			WHEN '401' THEN 33477111  	
			WHEN '883' THEN 33653236  	
			WHEN '995' THEN 33653246  	
			WHEN '197' THEN 33476983  	
			WHEN '910' THEN 33477425  	
			WHEN '651' THEN 33477273  	
			WHEN '603' THEN 33477263  	
			WHEN '334' THEN 33476921  	
			WHEN '237' THEN 33476942  	
			WHEN '211' THEN 33477015  	
			WHEN '550' THEN 33477100  	
			WHEN '776' THEN 33477233  	
			WHEN '852' THEN 33477323  	
			WHEN '1054' THEN 33489980   
			WHEN '692' THEN 33477265  	
			WHEN '96'	THEN 33476845  
			WHEN '1025' THEN 33489960   
			WHEN '172' THEN 33457793  	
			WHEN '938' THEN 33477398  	
			WHEN '258' THEN 33653186  	
			WHEN '665' THEN 33477158  	
			WHEN '203' THEN 33477000  	
			WHEN '624' THEN 33477179  	
			WHEN '564' THEN 33477139  	
			WHEN '937' THEN 33477395  	
			WHEN '936' THEN 33477391  	
			WHEN '98'	THEN 33476847  
			WHEN '407' THEN 33477123  	
			WHEN '975' THEN 33477359  	
			WHEN '1023' THEN 33489956   
			WHEN '609' THEN 33477286  	
			WHEN '667' THEN 33477171  	
			WHEN '171' THEN 33476887  	
			WHEN '231' THEN 33476918  	
			WHEN '389' THEN 33477077  	
			WHEN '623' THEN 33477173  	
			WHEN '243' THEN 33476962  	
			WHEN '643' THEN 33477239  	
			WHEN '277' THEN 33476910  	
			WHEN '263' THEN 33653114  	
			WHEN '333' THEN 33476917  	
			WHEN '362' THEN 33653228  	
			WHEN '199' THEN 33476988  	
			WHEN '367' THEN 33477027  	
			WHEN '99' THEN 33476851  
			WHEN '834' THEN 33477261  	
			WHEN '446' THEN 33477087  	
			WHEN '569' THEN 33477155  	
			WHEN '563' THEN 33653196  	
			WHEN '829' THEN 33477242  	
			WHEN '364' THEN 33653140  	
			WHEN '244' THEN 33653148  	
			WHEN '632' THEN 33477209  	
			WHEN '303' THEN 33476991  	
			WHEN '261' THEN 33653197  	
			WHEN '469' THEN 33477035  	
			WHEN '611' THEN 33477297  	
			WHEN '101' THEN 33476858  	
			WHEN '423' THEN 33477028  	
			WHEN '533' THEN 33477054  	
			WHEN '806' THEN 33477152  	
			WHEN '661' THEN 33477315  	
			WHEN '102' THEN 33476865  	
			WHEN '103' THEN 33476869  	
			WHEN '779' THEN 33477241  	
			WHEN '832' THEN 33477252  	
			WHEN '868' THEN 33477364  	
			WHEN '887' THEN 33477405  	
			WHEN '912' THEN 33477428  	
			WHEN '459' THEN 33477124  	
			WHEN '200' THEN 33476992  	
			WHEN '437' THEN 33477061  	
			WHEN '923' THEN 33477363  	
			WHEN '926' THEN 33477370  	
			WHEN '378' THEN 33653150  	
			WHEN '104' THEN 33476874  	
			WHEN '379' THEN 33477053  	
			WHEN '666' THEN 33477165  	
			WHEN '105' THEN 33476883  	
			WHEN '917' THEN 33477348  	
			WHEN '981' THEN 33477366  	
			WHEN '106' THEN 33476889  	
			WHEN '811' THEN 33477172  	
			WHEN '780' THEN 33477244  	
			WHEN '107' THEN 33476893  	
			WHEN '108' THEN 33476839  	
			WHEN '217' THEN 33476870  	
			WHEN '109' THEN 33476846  	
			WHEN '110' THEN 33653113  	
			WHEN '111' THEN 33476850  	
			WHEN '170' THEN 33653129  	
			WHEN '1051' THEN 33489978   
			WHEN '112' THEN 33476853  	
			WHEN '477' THEN 33477052  	
			WHEN '546' THEN 33477088  	
			WHEN '114' THEN 33476860  	
			WHEN '115' THEN 33476867  	
			WHEN '711' THEN 33477331  	
			WHEN '116' THEN 33653117  	
			WHEN '117' THEN 33476875  	
			WHEN '986' THEN 33477377  	
			WHEN '567' THEN 33477150  	
			WHEN '118' THEN 33476880  	
			WHEN '358' THEN 33653218  	
			WHEN '119' THEN 33476888  	
			WHEN '928' THEN 33477376  	
			WHEN '1097' THEN 33489998   
			WHEN '658' THEN 33477307  	
			WHEN '288' THEN 33653144  	
			WHEN '535' THEN 33477056  	
			WHEN '599' THEN 33477250  	
			WHEN '800' THEN 33477318  	
			WHEN '712' THEN 33477332  	
			WHEN '120' THEN 33476891  	
			WHEN '492' THEN 33477089  	
			WHEN '596' THEN 33477240  	
			WHEN '881' THEN 33477397  	
			WHEN '399' THEN 33653177  	
			WHEN '121' THEN 33653121  	
			WHEN '290' THEN 33476954  	
			WHEN '616' THEN 33477149  	
			WHEN '885' THEN 33477403  	
			WHEN '355' THEN 33476989  	
			WHEN '417' THEN 33477019  	
			WHEN '310' THEN 33477005  	
			WHEN '499' THEN 33477107  	
			WHEN '572' THEN 33477162  	
			WHEN '863' THEN 33477352  	
			WHEN '325' THEN 33476885  	
			WHEN '224' THEN 33653122  	
			WHEN '996' THEN 33477396  	
			WHEN '122' THEN 33476899  	
			WHEN '272' THEN 33476895  	
			WHEN '515' THEN 33477010  	
			WHEN '620' THEN 33477161  	
			WHEN '404' THEN 33653183  	
			WHEN '932' THEN 33477382  	
			WHEN '884' THEN 33477401  	
			WHEN '957' THEN 33477427  	
			WHEN '656' THEN 33477296  	
			WHEN '372' THEN 33477036  	
			WHEN '952' THEN 33477420  	
			WHEN '556' THEN 33653190  	
			WHEN '392' THEN 33477086  	
			WHEN '590' THEN 33653249  	
			WHEN '958' THEN 33477429  	
			WHEN '559' THEN 33477121  	
			WHEN '123' THEN 33476902  	
			WHEN '330' THEN 33476905  	
			WHEN '369' THEN 33477029  	
			WHEN '501' THEN 33477112  	
			WHEN '576' THEN 33477178  	
			WHEN '675' THEN 33477207  	
			WHEN '222' THEN 33653119  	
			WHEN '124' THEN 33476906  	
			WHEN '429' THEN 33653185  	
			WHEN '793' THEN 33477298  	
			WHEN '579' THEN 33653242  	
			WHEN '505' THEN 33477117  	
			WHEN '473' THEN 33653145  	
			WHEN '428' THEN 33653182  	
			WHEN '432' THEN 33653195  	
			WHEN '662' THEN 33477321  	
			WHEN '634' THEN 33653213  	
			WHEN '340' THEN 33476944  	
			WHEN '126' THEN 33476911  	
			WHEN '127' THEN 33476914  	
			WHEN '184' THEN 33476935  	
			WHEN '128' THEN 33653123  	
			WHEN '129' THEN 33476920  	
			WHEN '967' THEN 33477339  	
			WHEN '1020' THEN 33489954   
			WHEN '193' THEN 33476970  	
			WHEN '248' THEN 33476977  	
			WHEN '610' THEN 33477292  	
			WHEN '292' THEN 33476961  	
			WHEN '731' THEN 33477220  	
			WHEN '803' THEN 33477326  	
			WHEN '960' THEN 33477432  	
			WHEN '526' THEN 33477034  	
			WHEN '565' THEN 33477146  	
			WHEN '130' THEN 33476926  	
			WHEN '131' THEN 33476930  	
			WHEN '670' THEN 33477181  	
			WHEN '680' THEN 33477226  	
			WHEN '536' THEN 33477059  	
			WHEN '336' THEN 33476931  	
			WHEN '416' THEN 33477016  	
			WHEN '132' THEN 33653126  	
			WHEN '729' THEN 33477212  	
			WHEN '994' THEN 33477393  	
			WHEN '945' THEN 33477410  	
			WHEN '548' THEN 33653184  	
			WHEN '255' THEN 33653173  	
			WHEN '214' THEN 33476855  	
			WHEN '227' THEN 33476904  	
			WHEN '294' THEN 33476971  	
			WHEN '704' THEN 33477305  	
			WHEN '833' THEN 33477256  	
			WHEN '133' THEN 33476938  	
			WHEN '135' THEN 33476943  	
			WHEN '485' THEN 33477071  	
			WHEN '601' THEN 33477257  	
			WHEN '136' THEN 33476948  	
			WHEN '541' THEN 33477074  	
			WHEN '1038' THEN 33489973   
			WHEN '470' THEN 33477039  	
			WHEN '381' THEN 33477055  	
			WHEN '356' THEN 33653214  	
			WHEN '324' THEN 33476879  	
			WHEN '228' THEN 33476909  	
			WHEN '204' THEN 33477002  	
			WHEN '365' THEN 33477022  	
			WHEN '408' THEN 33477127  	
			WHEN '525' THEN 33477030  	
			WHEN '444' THEN 33477080  	
			WHEN '522' THEN 33653153  	
			WHEN '168' THEN 33476876  	
			WHEN '605' THEN 33477270  	
			WHEN '1037' THEN 33489972   
			WHEN '406' THEN 33477120  	
			WHEN '592' THEN 33477229  	
			WHEN '163' THEN 33476862  	
			WHEN '434' THEN 33653198  	
			WHEN '788' THEN 33477277  	
			WHEN '649' THEN 33477264  	
			WHEN '347' THEN 33476968  	
			WHEN '271' THEN 33476892  	
			WHEN '723' THEN 33477193  	
			WHEN '825' THEN 33477231  	
			WHEN '699' THEN 33477295  	
			WHEN '545' THEN 33477084  	
			WHEN '705' THEN 33477310  	
			WHEN '138' THEN 33476952  	
			WHEN '538' THEN 33477066  	
			WHEN '139' THEN 33476955  	
			WHEN '617' THEN 33477151  	
			WHEN '202' THEN 33476998  	
			WHEN '1056' THEN 33482988   
			WHEN '1065' THEN 33489982   
			WHEN '552' THEN 33477105  	
			WHEN '140' THEN 33476959  	
			WHEN '268' THEN 33476878  	
			WHEN '427' THEN 33477042  	
			WHEN '591' THEN 33477225  	
			WHEN '377' THEN 33477050  	
			WHEN '782' THEN 33477254  	
			WHEN '537' THEN 33477063  	
			WHEN '577' THEN 33477183  	
			WHEN '920' THEN 33477356  	
			WHEN '1003' THEN 33489941   
			WHEN '1029' THEN 33489965   
			WHEN '1070' THEN 33489984   
			WHEN '520' THEN 33477023  	
			WHEN '384' THEN 33477064  	
			WHEN '141' THEN 33476963  	
			WHEN '828' THEN 33477238  	
			WHEN '795' THEN 33477306  	
			WHEN '659' THEN 33477311  	
			WHEN '604' THEN 33477267  	
			WHEN '239' THEN 33476949  	
			WHEN '338' THEN 33653193  	
			WHEN '528' THEN 33477041  	
			WHEN '450' THEN 33477099  	
			WHEN '560' THEN 33477125  	
			WHEN '1033' THEN 33489968   
			WHEN '1093' THEN 33489996   
			WHEN '260' THEN 33653194  	
			WHEN '210' THEN 33477013  	
			WHEN '386' THEN 33477069  	
			WHEN '274' THEN 33653127  	
			WHEN '142' THEN 33476966  	
			WHEN '701' THEN 33653212  	
			WHEN '697' THEN 33477285  	
			WHEN '382' THEN 33477060  	
			WHEN '861' THEN 33477347  	
			WHEN '357' THEN 33653216  	
			WHEN '143' THEN 33476969  	
			WHEN '484' THEN 33477068  	
			WHEN '456' THEN 33477115  	
			WHEN '523' THEN 33653157  	
			WHEN '489' THEN 33477081  	
			WHEN '188' THEN 33476947  	
			WHEN '845' THEN 33477299  	
			WHEN '472' THEN 33477044  	
			WHEN '474' THEN 33477049  	
			WHEN '794' THEN 33477300  	
			WHEN '194' THEN 33476972  	
			WHEN '295' THEN 33476973  	
			WHEN '253' THEN 33476993  	
			WHEN '968' THEN 33477341  	
			WHEN '791' THEN 33477288  	
			WHEN '879' THEN 33477392  	
			WHEN '641' THEN 33653225  	
			WHEN '412' THEN 33477140  	
			WHEN '820' THEN 33477210  	
			WHEN '387' THEN 33477073  	
			WHEN '442' THEN 33477072  	
			WHEN '414' THEN 33477145  	
			WHEN '388' THEN 33653162  	
			WHEN '633' THEN 33477213  	
			WHEN '145' THEN 33476976  	
			WHEN '840' THEN 33477283  	
			WHEN '147' THEN 33476981  	
			WHEN '409' THEN 33477131  	
			WHEN '691' THEN 33653208  	
			WHEN '148' THEN 33653132  	
			WHEN '801' THEN 33477322  	
			WHEN '864' THEN 33477355  	
			WHEN '568' THEN 33477153  	
			WHEN '149' THEN 33476986  	
			WHEN '376' THEN 33477047  	
			WHEN '350' THEN 33476974  	
			WHEN '152' THEN 33476997  	
			WHEN '810' THEN 33477168  	
			WHEN '714' THEN 33477337  	
			WHEN '583' THEN 33653245  	
			WHEN '464' THEN 33477141  	
			WHEN '597' THEN 33477245  	
			WHEN '150' THEN 33476990  	
			WHEN '323' THEN 33476873  	
			WHEN '493' THEN 33477093  	
			WHEN '805' THEN 33477148  	
			WHEN '655' THEN 33477291  	
			WHEN '151' THEN 33476994  	
			WHEN '561' THEN 33477128  	
			WHEN '462' THEN 33477136  	
			WHEN '1106' THEN 33489959   
			WHEN '843' THEN 33477294  	
			WHEN '319' THEN 33476856  	
			WHEN '860' THEN 33653231  	
			WHEN '934' THEN 33477388  	
			WHEN '998' THEN 33477399  	
			WHEN '181' THEN 33476923  	
			WHEN '1084' THEN 33489991   
			WHEN '405' THEN 33477118  	
			WHEN '668' THEN 33477176  	
			WHEN '984' THEN 33477373  	
			WHEN '606' THEN 33477275  	
			WHEN '506' THEN 33653181  	
			WHEN '400' THEN 33477106  	
			WHEN '403' THEN 33477114  	
			WHEN '574' THEN 33477170  	
			WHEN '162' THEN 33476854  	
			WHEN '722' THEN 33477189  	
			WHEN '648' THEN 33477260  	
			WHEN '786' THEN 33477272  	
			WHEN '673' THEN 33477196  	
			WHEN '781' THEN 33477249  	
			WHEN '846' THEN 33477303  	
			WHEN '804' THEN 33477330  	
			WHEN '921' THEN 33477360  	
			WHEN '553' THEN 33477108  	
			WHEN '582' THEN 33653244  	
			WHEN '710' THEN 33477328  	
			WHEN '159' THEN 33476842  	
			WHEN '264' THEN 33476857  	
			WHEN '328' THEN 33476896  	
			WHEN '234' THEN 33476932  	
			WHEN '186' THEN 33476937  	
			WHEN '201' THEN 33476996  	
			WHEN '158' THEN 33477003  	
			WHEN '792' THEN 33477293  	
			WHEN '240' THEN 33653134  	
			WHEN '1019' THEN 33489952   
			WHEN '246' THEN 33653154  	
			WHEN '518' THEN 33477018  	
			WHEN '589' THEN 33653248  	
			WHEN '706' THEN 33477314  	
			WHEN '424' THEN 33653165  	
			WHEN '440' THEN 33653205  	
			WHEN '165' THEN 33653125  	
			WHEN '236' THEN 33653131  	
			WHEN '327' THEN 33653166  	
			WHEN '308' THEN 33653169  	
			WHEN '160' THEN 33653116  	
			WHEN '161' THEN 33653120  	
			WHEN '570' THEN 33653239  	
			WHEN '823' THEN 33653221  	
			WHEN '685' THEN 33653206  	
			WHEN '870' THEN 33653233  	
			WHEN '838' THEN 33653235  	
			WHEN '1032' THEN 33653237   
			WHEN '153' THEN 33653133  	
			WHEN '241' THEN 33653138  	
			WHEN '949' THEN 33653247  	
			WHEN '1002' THEN 33653252   
			WHEN '642' THEN 33653227  	
			WHEN '1053' THEN 33653243   
			WHEN '218' THEN 33653115  	
			WHEN '247' THEN 33653161  	
			WHEN '855' THEN 33653230  	
			WHEN '1066' THEN 33653250   
			WHEN '913' THEN 33653240  	
			WHEN '774' THEN 33653217  	
			WHEN '835' THEN 33653232  	
			WHEN '276' THEN 33653130  	
			WHEN '206' THEN 33653178  	
			WHEN '155' THEN 33653135  	
			WHEN '663' THEN 33653238  	
			WHEN '421' THEN 33653155  	
			WHEN '385' THEN 33653158  	
			WHEN '156' THEN 33653136  	
			WHEN '1022' THEN 33653234   
			WHEN '1014' THEN 33653253   
			WHEN '157' THEN 33653139  	
			WHEN '702' THEN 33653215  				
			End as id
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
		) AS matricula,
		fa.dh_Afastamento as inicioAfastamento,
		fa.dh_Retorno as fimAfastamento,
		DATEADD(DAY, 1,fa.dh_Retorno) AS retornoTrabalho, 
		DATEDIFF(day,fa.dh_Afastamento, fa.dh_retorno)  as quantidade,
		'DIAS' as unidade,
		DATEDIFF(day,fa.dh_Afastamento, fa.dh_retorno) as quantidadeDias,
		'' as jornadaDiaria,
		case a.ds_Ocorrencia
			when 'AFASTAMENTO LICENÇA MATERNIDADE MUNICIPAL' then 'LICENCA'
			when 'AUXILIO DOENÇA-ESTATUTÁRIOS' then 'ACIDENTE_DOENCA'
			when 'LICENÇA MATERNIDADE-ESTATUTÁRIOS' then 'LICENCA'
			when 'Afastamento com Remuneração' then 'LICENCA'
			when 'LICENÇA PATERNIDADE' then 'LICENCA'
			when 'CEDENCIA ENTRE BASES' then 'CEDENCIA'
			when 'CEDIDO PARA OUTRA ENTIDADE' then 'CEDENCIA'
			when 'AFASTAMENTO PARA  CURSAR NIVEL SUPERIOR' then 'LICENCA'
			when 'Auxilio Doença' then 'ACIDENTE_DOENCA'
			when 'Afastamento Acidente de Trabalho' then 'LICENCA'
			when 'Afastamento Salário Maternidade' then 'LICENCA'
			when 'Afastamento Serviço Militar' then 'LICENCA'
			when 'Afastamento Sem Remuneração' then 'LICENCA'
			when 'Férias' then 'FERIAS'
			when 'Licença Premio' then 'LICENCA'
			when 'Licença sem Remuneração' then 'LICENCA'
			when 'LICENÇA REMUNERADA' then 'LICENCA'
			when 'ADVERTENCIA' then 'OCORRENCIA_DISCIPLINAR'
			when 'CEDIDO PARA OUTRA ENTIDADE SEM ONUS' then 'CEDENCIA'
			when 'CEDIDO PARA OUTRA ENTIDADE COM ONUS' then 'CEDENCIA'
			when 'INSTITUIÇÃO RECEBEDORA (SERVIDOR ADIDO)' then 'CEDENCIA'
			when 'Falta Injustificada' then 'FALTAS'
			when 'Desligado' then 'RESCISAO'
			else 'LICENCA'
		End as decorrente, 
		JSON_QUERY(
			(SELECT 
			case fa.cd_SitAfastamento
				when '12' then 55874
				when '2' then 55873	
				when '11' then 55874	
				when '4' then 55878		
				when '15' then 55875	
				when '18' then 55875	
				when '5' then 55878		
				when '99' then 66086	
				when '6' then 55896		
				when '30' then 55896	
				when '31' then 55896	
				when '32' then 55896	
				when '8' then 55896		
				when '9' then 55878		
				when '17' then 55878	
				when '85' then 62591	
				when '16' then 55658	
				when '1' then 55901		
				when '3' then 56092		
				when '13' then 55902	
				when '19' then 55881	
				when '14' then 55888	
				when '20' then 55889	
				else '1'
			end as id 
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
		) AS tipoAfastamento,
		'' as ato,
		case fa.cd_SitAfastamento
			when '12' then 'Acidente/doença não relacionada ao trabalho'
			when '2' then 'Acidente/doença do trabalho'
			when '11' then 'Acidente/doença não relacionada ao trabalho'
			when '4' then 'Afastamento/licença de servidor público prevista em estatuto, com remuneração'
			when '15' then 'Afastamento/licença de servidor público prevista em estatuto, sem remuneração'
			when '18' then 'Afastamento/licença de servidor público prevista em estatuto, sem remuneração'
			when '5' then 'Afastamento/licença de servidor público prevista em estatuto, com remuneração'
			when '99' then 'Demitido'
			when '6' then 'Exercício em outro órgão de servidor ou empregado público cedido'
			when '30' then 'Exercício em outro órgão de servidor ou empregado público cedido'
			when '31' then 'Exercício em outro órgão de servidor ou empregado público cedido'
			when '32' then 'Exercício em outro órgão de servidor ou empregado público cedido'
			when '8' then 'Exercício em outro órgão de servidor ou empregado público cedido'
			when '9' then 'Afastamento/licença de servidor público prevista em estatuto, com remuneração'
			when '17' then 'Afastamento/licença de servidor público prevista em estatuto, com remuneração'
			when '85' then 'Faltas Injustificadas'
			when '16' then 'Férias'
			when '1' then 'Licença maternidade - 120 dias e suas prorrogações/antecipações, inclusive para o cônjuge sobreviven'
			when '3' then 'Licença maternidade - 180 dias, Lei 13.301/2016'
			when '13' then 'Licença maternidade - Prorrogação por 60 dias, Lei 11.770/2008 (Empresa Cidadã), inclusive para o cô'
			when '19' then 'Licença remunerada - Lei, liberalidade da empresa ou Acordo/Convenção Coletiva de Trabalho'
			when '14' then 'Serviço militar - Afastamento temporário para prestar serviço militar obrigatório'
			when '20' then 'Suspensão disciplinar - Art. 474 da CLT'
			else ''
		end as motivo,
		'' as acidenteTransito,
		'false' as retificacao,
		'' as dataRetificacao,
		'' as origemRetificacao,
		'' as tipoProcessoRetificacao,
		'' as numeroProcesso,
		'false' as remuneracaoCargoEfetivo,
		case a.fl_Remuneracao
			when 'S' then 'true'
			when 'N' then 'false'
			else 'false'
		End as descontar, 
		fa.ds_Historico as observacao,
		'' as competenciaDesconto,
		case a.fl_abona
			when 'N' then 'false' 
			when 'S' then 'true' 
			else 'false'
		End as abonar, 
		'' as quantidadeAbono,
		'' as movimentoPeriodoAquisitivoLicencaPremio,
		'' as competenciaAbono,
		'' as afastamentoOrigem,
		'' as pessoaJuridica,
		'' as tipoOnus,
		'[]' as atestados,
		'' as cedencia,
		'' as chaveMigracao,
		'' as versaoMigracao,
		'[]' as camposAdicionais

FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
 from FOLHOcorrenciaAfastamento a, FOLHFuncOcorrencia fa
	where a.cd_Cecam = fa.cd_Cecam
		and a.cd_Ocorrencia = fa.cd_SitAfastamento
        `;
        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
        
            // Parse the JSON content field
            const content = JSON.parse(record.content);
        
            return {
                idIntegracao: record.idIntegracao ? record.idIntegracao.toString() : null,
                conteudo: {
                    matricula: {
                        id: content.matricula.id
                    },
                    inicioAfastamento: content.inicioAfastamento ? content.inicioAfastamento.split('T')[0] : null,
                    fimAfastamento: content.fimAfastamento ? content.fimAfastamento.split('T')[0] : null,
                    retornoTrabalho: content.retornoTrabalho ? content.retornoTrabalho.split('T')[0] : null,
                    quantidade: content.quantidade || null,
                    unidade: content.unidade || null,
                    quantidadeDias: content.quantidadeDias || null,
                    jornadaDiaria: content.jornadaDiaria || null,
                    decorrente: content.decorrente || null,
                    tipoAfastamento: {
                        id: content.tipoAfastamento && content.tipoAfastamento.id ? content.tipoAfastamento.id : null
                    },
                    ato: content.ato || null,
                    motivo: content.motivo || null,
                    acidenteTransito: content.acidenteTransito || null,
                    retificacao: content.retificacao === "true", // Convert to boolean
                    dataRetificacao: content.dataRetificacao || null,
                    origemRetificacao: content.origemRetificacao || null,
                    tipoProcessoRetificacao: content.tipoProcessoRetificacao || null,
                    numeroProcesso: content.numeroProcesso || null,
                    remuneracaoCargoEfetivo: content.remuneracaoCargoEfetivo === "true", // Convert to boolean
                    descontar: content.descontar === "true", // Convert to boolean
                    observacao: content.observacao || null,
                    competenciaDesconto: content.competenciaDesconto || null,
                    abonar: content.abonar === "true", // Convert to boolean
                    quantidadeAbono: content.quantidadeAbono || null,
                    movimentoPeriodoAquisitivoLicencaPremio: content.movimentoPeriodoAquisitivoLicencaPremio || null,
                    competenciaAbono: content.competenciaAbono || null,
                    afastamentoOrigem: content.afastamentoOrigem || null,
                    pessoaJuridica: content.pessoaJuridica || null,
                    tipoOnus: content.tipoOnus || null,
                    atestados: content.atestados ? JSON.parse(content.atestados) : [], // Parse JSON array
                    cedencia: content.cedencia || null,
                    chaveMigracao: content.chaveMigracao || null,
                    versaoMigracao: content.versaoMigracao || null,
                    camposAdicionais: content.camposAdicionais ? JSON.parse(content.camposAdicionais) : [] // Parse JSON array
                }
            };
        });
        
        
       /*     const chunkSize = 50;
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
        
                const response = await fetch(`https://pessoal.betha.cloud/service-layer/v1/api/afastamento/`, {
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
				
					// Usar o 'id' ao invés de 'idLote'
					if (responseBody.id) {
						reportIds.push(responseBody.id); // Adiciona o id retornado ao reportIds
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