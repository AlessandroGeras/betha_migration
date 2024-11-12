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
            	select
f.cd_Funcionario as idIntegracao,
JSON_QUERY(
	(SELECT 
	f.dt_Demissao as 'data',
	'' as saldoFgts,
	'false' as fgtsMesAnterior,
	'true' as reporVaga, --verificar com Jr o que ele deseja
	'' as ato, 
	JSON_QUERY(
		(SELECT
			case f.cd_Funcionario 
			when '1'	then 33446453
			when '360'	then 33653223
			when '2'	then 33457855
			when '488'	then 33477078
			when '3'	then 33476774
			when '915'	then 33477343
			when '991'	then 33477383
			when '4'	then 33476776
			when '549'	then 33477096
			when '457'	then 33477119
			when '511'	then 33477137
			when '480'	then 33477058
			when '476'	then 33653149
			when '1083'	then 33489990
			when '862'	then 33477349
			when '1043'	then 33489976
			when '291'	then 33476957
			when '964'	then 33477436
			when '873'	then 33477378
			when '900'	then 33477409
			when '1009'	then 33489946
			when '1026'	then 33489962
			when '176'	then 33476903
			when '5'	then 33476778
			when '454'	then 33477109
			when '6'	then 33476779
			when '950'	then 33477417
			when '508'	then 33477126
			when '865'	then 33477358
			when '331'	then 33476908
			when '322'	then 33653160
			when '854'	then 33477329
			when '1073'	then 33489987
			when '438'	then 33653203
			when '847'	then 33477308
			when '872'	then 33477375
			when '941'	then 33477402
			when '410'	then 33477135
			when '497'	then 33653168
			when '7'	then 33476781
			when '233'	then 33476927
			when '313'	then 33477011
			when '9'	then 33476784
			when '293'	then 33476967
			when '179'	then 33476915
			when '329'	then 33476900
			when '309'	then 33653175
			when '10'	then 33476785
			when '189'	then 33476953
			when '371'	then 33477033
			when '784'	then 33477262
			when '11'	then 33476787
			when '12'	then 33476789
			when '516'	then 33477014
			when '458'	then 33653229
			when '167'	then 33476871
			when '298'	then 33476980
			when '593'	then 33477232
			when '13'	then 33476791
			when '966'	then 33477335
			when '1039'	then 33489974
			when '809'	then 33477164
			when '718'	then 33477169
			when '420'	then 33477024
			when '573'	then 33477166
			when '677'	then 33477216
			when '830'	then 33477246
			when '359'	then 33653220
			when '178'	then 33476912
			when '332'	then 33653174
			when '259'	then 33653191
			when '647'	then 33477255
			when '510'	then 33477133
			when '15'	then 33476793
			when '16'	then 33476795
			when '391'	then 33477083
			when '798'	then 33477313
			when '1064'	then 33489981
			when '207'	then 33477007
			when '187'	then 33476941
			when '630'	then 33477203
			when '544'	then 33653176
			when '970'	then 33477345
			when '1040'	then 33489975
			when '282'	then 33476929
			when '18'	then 33476797
			when '19'	then 33476800
			when '252'	then 33476987
			when '212'	then 33477017
			when '581'	then 33477199
			when '225'	then 33476897
			when '519'	then 33477020
			when '20'	then 33476802
			when '266'	then 33476868
			when '1031'	then 33489967
			when '445'	then 33477082
			when '318'	then 33476852
			when '21'	then 33476804
			when '180'	then 33476919
			when '517'	then 33653147
			when '888'	then 33477407
			when '622'	then 33653202
			when '721'	then 33477185
			when '816'	then 33477195
			when '849'	then 33477312
			when '713'	then 33477333
			when '939'	then 33477400
			when '837'	then 33477274
			when '853'	then 33477325
			when '1035'	then 33489970
			when '311'	then 33477006
			when '689'	then 33477253
			when '242'	then 33653143
			when '530'	then 33477048
			when '22'	then 33476807
			when '307'	then 33477001
			when '807'	then 33477156
			when '676'	then 33477211
			when '867'	then 33477362
			when '903'	then 33477415
			when '394'	then 33653164
			when '452'	then 33477104
			when '23'	then 33476808
			when '813'	then 33477182
			when '827'	then 33477234
			when '875'	then 33477381
			when '679'	then 33477223
			when '785'	then 33477266
			when '475'	then 33653146
			when '540'	then 33477070
			when '490'	then 33477085
			when '220'	then 33476882
			when '789'	then 33477280
			when '383'	then 33653156
			when '954'	then 33477423
			when '24'	then 33476810
			when '415'	then 33477012
			when '395'	then 33653167
			when '483'	then 33477067
			when '814'	then 33477186
			when '965'	then 33477334
			when '948'	then 33477414
			when '25'	then 33476812
			when '26'	then 33476814
			when '28'	then 33476816
			when '575'	then 33477175
			when '555'	then 33653188
			when '27'	then 33529273
			when '29'	then 33529277
			when '397'	then 33653170
			when '314'	then 33653142
			when '354'	then 33653209
			when '398'	then 33653172
			when '918'	then 33477350
			when '982'	then 33477369
			when '346'	then 33476964
			when '927'	then 33477374
			when '836'	then 33477268
			when '664'	then 33477327
			when '1012'	then 33489949
			when '1030'	then 33489966
			when '637'	then 33477222
			when '972'	then 33477351
			when '30'	then 33476819
			when '1104'	then 33489955
			when '449'	then 33477094
			when '31'	then 33476820
			when '32'	then 33476822
			when '281'	then 33476924
			when '618'	then 33477154
			when '551'	then 33477102
			when '393'	then 33477090
			when '783'	then 33477258
			when '919'	then 33477353
			when '871'	then 33477372
			when '944'	then 33477408
			when '431'	then 33653192
			when '672'	then 33477191
			when '1036'	then 33489971
			when '728'	then 33477208
			when '33'	then 33476824
			when '34'	then 33476825
			when '351'	then 33476978
			when '413'	then 33477143
			when '842'	then 33477290
			when '858'	then 33477340
			when '905'	then 33477419
			when '35'	then 33476827
			when '595'	then 33653251
			when '821'	then 33477215
			when '904'	then 33477416
			when '37'	then 33476829
			when '695'	then 33477278
			when '1027'	then 33489964
			when '39'	then 33476832
			when '466'	then 33653141
			when '987'	then 33653241
			when '283'	then 33476933
			when '40'	then 33476834
			when '321'	then 33476863
			when '374'	then 33477043
			when '532'	then 33477051
			when '542'	then 33477076
			when '494'	then 33477095
			when '929'	then 33477379
			when '177'	then 33476907
			when '877'	then 33477386
			when '880'	then 33477394
			when '1011'	then 33489948
			when '348'	then 33653201
			when '481'	then 33477062
			when '1004'	then 33489942
			when '1074'	then 33489988
			when '238'	then 33476946
			when '41'	then 33476835
			when '232'	then 33476922
			when '42'	then 33476837
			when '43'	then 33476840
			when '527'	then 33477037
			when '974'	then 33477357
			when '1024'	then 33489958
			when '690'	then 33477259
			when '650'	then 33477269
			when '708'	then 33477320
			when '876'	then 33477384
			when '1107'	then 33489961
			when '426'	then 33477038
			when '778'	then 33653224
			when '44'	then 33476844
			when '628'	then 33477192
			when '688'	then 33477248
			when '45'	then 33476849
			when '959'	then 33477430
			when '47'	then 33476859
			when '777'	then 33477236
			when '973'	then 33477354
			when '512'	then 33653187
			when '190'	then 33476956
			when '182'	then 33476928
			when '448'	then 33477092
			when '815'	then 33477190
			when '683'	then 33477235
			when '850'	then 33477317
			when '922'	then 33477361
			when '587'	then 33477214
			when '507'	then 33477122
			when '48'	then 33476864
			when '608'	then 33477282
			when '287'	then 33476945
			when '925'	then 33477368
			when '962'	then 33477434
			when '289'	then 33476951
			when '50'	then 33476872
			when '335'	then 33476925
			when '696'	then 33653210
			when '38'	then 33476831
			when '353'	then 33476984
			when '720'	then 33477180
			when '625'	then 33477184
			when '992'	then 33477387
			when '1105'	then 33489957
			when '1071'	then 33489985
			when '859'	then 33477342
			when '1103'	then 33489953
			when '317'	then 33476848
			when '460'	then 33477129
			when '1034'	then 33489969
			when '1095'	then 33489997
			when '254'	then 33476995
			when '361'	then 33653226
			when '306'	then 33476999
			when '262'	then 33653199
			when '983'	then 33477371
			when '878'	then 33477389
			when '914'	then 33477431
			when '51'	then 33476877
			when '52'	then 33476881
			when '629'	then 33477198
			when '342'	then 33476950
			when '425'	then 33477032
			when '439'	then 33477065
			when '578'	then 33477188
			when '504'	then 33653179
			when '53'	then 33476886
			when '230'	then 33476913
			when '284'	then 33653137
			when '719'	then 33477174
			when '693'	then 33477271
			when '652'	then 33477276
			when '521'	then 33477026
			when '725'	then 33477200
			when '924'	then 33477365
			when '54'	then 33476770
			when '1067'	then 33489983
			when '993'	then 33477390
			when '1049'	then 33489977
			when '461'	then 33477134
			when '547'	then 33477091
			when '498'	then 33653171
			when '270'	then 33476890
			when '192'	then 33476965
			when '715'	then 33477160
			when '607'	then 33653254
			when '196'	then 33476979
			when '198'	then 33476985
			when '55'	then 33476771
			when '707'	then 33477316
			when '1008'	then 33489945
			when '495'	then 33477098
			when '724'	then 33477197
			when '681'	then 33477230
			when '902'	then 33477413
			when '1052'	then 33489979
			when '1091'	then 33489994
			when '808'	then 33477159
			when '698'	then 33477289
			when '1006'	then 33489944
			when '619'	then 33477157
			when '645'	then 33477247
			when '312'	then 33477008
			when '529'	then 33477046
			when '638'	then 33477228
			when '441'	then 33653207
			when '839'	then 33477279
			when '657'	then 33477301
			when '396'	then 33477097
			when '345'	then 33476958
			when '296'	then 33476975
			when '256'	then 33653180
			when '375'	then 33477045
			when '709'	then 33477324
			when '732'	then 33477224
			when '57'	then 33476773
			when '1087'	then 33489993
			when '59'	then 33476775
			when '636'	then 33477221
			when '943'	then 33477406
			when '951'	then 33477418
			when '627'	then 33653204
			when '1005'	then 33489943
			when '1092'	then 33489995
			when '373'	then 33477040
			when '953'	then 33477422
			when '265'	then 33653118
			when '969'	then 33477344
			when '933'	then 33477385
			when '273'	then 33476901
			when '61'	then 33476777
			when '631'	then 33477205
			when '62'	then 33476780
			when '63'	then 33476782
			when '775'	then 33653219
			when '411'	then 33477138
			when '49'	then 33476866
			when '580'	then 33477194
			when '1018'	then 33489950
			when '557'	then 33477116
			when '916'	then 33477346
			when '64'	then 33476783
			when '614'	then 33477309
			when '286'	then 33476940
			when '963'	then 33477435
			when '173'	then 33476894
			when '315'	then 33476843
			when '226'	then 33653124
			when '249'	then 33653163
			when '66'	then 33476786
			when '67'	then 33476788
			when '68'	then 33476790
			when '69'	then 33476792
			when '337'	then 33476936
			when '678'	then 33477219
			when '70'	then 33476794
			when '71'	then 33653128
			when '1082'	then 33489989
			when '72'	then 33476796
			when '73'	then 33476798
			when '74'	then 33476799
			when '514'	then 33477144
			when '75'	then 33476801
			when '279'	then 33476916
			when '443'	then 33477075
			when '76'	then 33476803
			when '235'	then 33476934
			when '191'	then 33476960
			when '653'	then 33477281
			when '669'	then 33653200
			when '773'	then 33653211
			when '824'	then 33477227
			when '911'	then 33477426
			when '1072'	then 33489986
			when '430'	then 33653189
			when '730'	then 33477217
			when '380'	then 33653152
			when '422'	then 33653159
			when '77'	then 33476805
			when '621'	then 33477167
			when '436'	then 33477057
			when '78'	then 33476806
			when '1010'	then 33489947
			when '1085'	then 33489992
			when '856'	then 33477336
			when '955'	then 33477424
			when '819'	then 33477206
			when '857'	then 33477338
			when '209'	then 33477009
			when '79'	then 33476809
			when '80'	then 33476811
			when '81'	then 33476813
			when '82'	then 33476815
			when '83'	then 33476817
			when '812'	then 33477177
			when '684'	then 33477237
			when '851'	then 33477319
			when '874'	then 33477380
			when '942'	then 33477404
			when '84'	then 33476818
			when '85'	then 33476821
			when '86'	then 33476823
			when '615'	then 33477147
			when '174'	then 33476898
			when '639'	then 33653222
			when '285'	then 33476939
			when '613'	then 33477304
			when '869'	then 33477367
			when '496'	then 33477103
			when '455'	then 33477113
			when '646'	then 33477251
			when '87'	then 33476826
			when '612'	then 33477302
			when '250'	then 33476982
			when '88'	then 33476828
			when '818'	then 33477201
			when '654'	then 33477287
			when '89'	then 33476830
			when '584'	then 33477204
			when '509'	then 33477130
			when '90'	then 33476833
			when '1101'	then 33489951
			when '215'	then 33476861
			when '91'	then 33476836
			when '946'	then 33477412
			when '716'	then 33477163
			when '554'	then 33477110
			when '418'	then 33477021
			when '205'	then 33477004
			when '269'	then 33476884
			when '366'	then 33477025
			when '562'	then 33477132
			when '961'	then 33477433
			when '92'	then 33476838
			when '901'	then 33477411
			when '906'	then 33477421
			when '674'	then 33477202
			when '93'	then 33653151
			when '588'	then 33477218
			when '671'	then 33477187
			when '790'	then 33477284
			when '686'	then 33477243
			when '543'	then 33477079
			when '451'	then 33477101
			when '513'	then 33477142
			when '370'	then 33477031
			when '94'	then 33476841
			when '401'	then 33477111
			when '883'	then 33653236
			when '995'	then 33653246
			when '197'	then 33476983
			when '910'	then 33477425
			when '651'	then 33477273
			when '603'	then 33477263
			when '334'	then 33476921
			when '237'	then 33476942
			when '211'	then 33477015
			when '550'	then 33477100
			when '776'	then 33477233
			when '852'	then 33477323
			when '1054'	then 33489980
			when '692'	then 33477265
			when '96'	then 33476845
			when '1025'	then 33489960
			when '172'	then 33457793
			when '938'	then 33477398
			when '258'	then 33653186
			when '665'	then 33477158
			when '203'	then 33477000
			when '624'	then 33477179
			when '564'	then 33477139
			when '937'	then 33477395
			when '936'	then 33477391
			when '98'	then 33476847
			when '407'	then 33477123
			when '975'	then 33477359
			when '1023'	then 33489956
			when '609'	then 33477286
			when '667'	then 33477171
			when '171'	then 33476887
			when '231'	then 33476918
			when '389'	then 33477077
			when '623'	then 33477173
			when '243'	then 33476962
			when '643'	then 33477239
			when '277'	then 33476910
			when '263'	then 33653114
			when '333'	then 33476917
			when '362'	then 33653228
			when '199'	then 33476988
			when '367'	then 33477027
			when '99'	then 33476851
			when '834'	then 33477261
			when '446'	then 33477087
			when '569'	then 33477155
			when '563'	then 33653196
			when '829'	then 33477242
			when '364'	then 33653140
			when '244'	then 33653148
			when '632'	then 33477209
			when '303'	then 33476991
			when '261'	then 33653197
			when '469'	then 33477035
			when '611'	then 33477297
			when '101'	then 33476858
			when '423'	then 33477028
			when '533'	then 33477054
			when '806'	then 33477152
			when '661'	then 33477315
			when '102'	then 33476865
			when '103'	then 33476869
			when '779'	then 33477241
			when '832'	then 33477252
			when '868'	then 33477364
			when '887'	then 33477405
			when '912'	then 33477428
			when '459'	then 33477124
			when '200'	then 33476992
			when '437'	then 33477061
			when '923'	then 33477363
			when '926'	then 33477370
			when '378'	then 33653150
			when '104'	then 33476874
			when '379'	then 33477053
			when '666'	then 33477165
			when '105'	then 33476883
			when '917'	then 33477348
			when '981'	then 33477366
			when '106'	then 33476889
			when '811'	then 33477172
			when '780'	then 33477244
			when '107'	then 33476893
			when '108'	then 33476839
			when '217'	then 33476870
			when '109'	then 33476846
			when '110'	then 33653113
			when '111'	then 33476850
			when '170'	then 33653129
			when '1051'	then 33489978
			when '112'	then 33476853
			when '477'	then 33477052
			when '546'	then 33477088
			when '114'	then 33476860
			when '115'	then 33476867
			when '711'	then 33477331
			when '116'	then 33653117
			when '117'	then 33476875
			when '986'	then 33477377
			when '567'	then 33477150
			when '118'	then 33476880
			when '358'	then 33653218
			when '119'	then 33476888
			when '928'	then 33477376
			when '1097'	then 33489998
			when '658'	then 33477307
			when '288'	then 33653144
			when '535'	then 33477056
			when '599'	then 33477250
			when '800'	then 33477318
			when '712'	then 33477332
			when '120'	then 33476891
			when '492'	then 33477089
			when '596'	then 33477240
			when '881'	then 33477397
			when '399'	then 33653177
			when '121'	then 33653121
			when '290'	then 33476954
			when '616'	then 33477149
			when '885'	then 33477403
			when '355'	then 33476989
			when '417'	then 33477019
			when '310'	then 33477005
			when '499'	then 33477107
			when '572'	then 33477162
			when '863'	then 33477352
			when '325'	then 33476885
			when '224'	then 33653122
			when '996'	then 33477396
			when '122'	then 33476899
			when '272'	then 33476895
			when '515'	then 33477010
			when '620'	then 33477161
			when '404'	then 33653183
			when '932'	then 33477382
			when '884'	then 33477401
			when '957'	then 33477427
			when '656'	then 33477296
			when '372'	then 33477036
			when '952'	then 33477420
			when '556'	then 33653190
			when '392'	then 33477086
			when '590'	then 33653249
			when '958'	then 33477429
			when '559'	then 33477121
			when '123'	then 33476902
			when '330'	then 33476905
			when '369'	then 33477029
			when '501'	then 33477112
			when '576'	then 33477178
			when '675'	then 33477207
			when '222'	then 33653119
			when '124'	then 33476906
			when '429'	then 33653185
			when '793'	then 33477298
			when '579'	then 33653242
			when '505'	then 33477117
			when '473'	then 33653145
			when '428'	then 33653182
			when '432'	then 33653195
			when '662'	then 33477321
			when '634'	then 33653213
			when '340'	then 33476944
			when '126'	then 33476911
			when '127'	then 33476914
			when '184'	then 33476935
			when '128'	then 33653123
			when '129'	then 33476920
			when '967'	then 33477339
			when '1020'	then 33489954
			when '193'	then 33476970
			when '248'	then 33476977
			when '610'	then 33477292
			when '292'	then 33476961
			when '731'	then 33477220
			when '803'	then 33477326
			when '960'	then 33477432
			when '526'	then 33477034
			when '565'	then 33477146
			when '130'	then 33476926
			when '131'	then 33476930
			when '670'	then 33477181
			when '680'	then 33477226
			when '536'	then 33477059
			when '336'	then 33476931
			when '416'	then 33477016
			when '132'	then 33653126
			when '729'	then 33477212
			when '994'	then 33477393
			when '945'	then 33477410
			when '548'	then 33653184
			when '255'	then 33653173
			when '214'	then 33476855
			when '227'	then 33476904
			when '294'	then 33476971
			when '704'	then 33477305
			when '833'	then 33477256
			when '133'	then 33476938
			when '135'	then 33476943
			when '485'	then 33477071
			when '601'	then 33477257
			when '136'	then 33476948
			when '541'	then 33477074
			when '1038'	then 33489973
			when '470'	then 33477039
			when '381'	then 33477055
			when '356'	then 33653214
			when '324'	then 33476879
			when '228'	then 33476909
			when '204'	then 33477002
			when '365'	then 33477022
			when '408'	then 33477127
			when '525'	then 33477030
			when '444'	then 33477080
			when '522'	then 33653153
			when '168'	then 33476876
			when '605'	then 33477270
			when '1037'	then 33489972
			when '406'	then 33477120
			when '592'	then 33477229
			when '163'	then 33476862
			when '434'	then 33653198
			when '788'	then 33477277
			when '649'	then 33477264
			when '347'	then 33476968
			when '271'	then 33476892
			when '723'	then 33477193
			when '825'	then 33477231
			when '699'	then 33477295
			when '545'	then 33477084
			when '705'	then 33477310
			when '138'	then 33476952
			when '538'	then 33477066
			when '139'	then 33476955
			when '617'	then 33477151
			when '202'	then 33476998
			when '1056'	then 33482988
			when '1065'	then 33489982
			when '552'	then 33477105
			when '140'	then 33476959
			when '268'	then 33476878
			when '427'	then 33477042
			when '591'	then 33477225
			when '377'	then 33477050
			when '782'	then 33477254
			when '537'	then 33477063
			when '577'	then 33477183
			when '920'	then 33477356
			when '1003'	then 33489941
			when '1029'	then 33489965
			when '1070'	then 33489984
			when '520'	then 33477023
			when '384'	then 33477064
			when '141'	then 33476963
			when '828'	then 33477238
			when '795'	then 33477306
			when '659'	then 33477311
			when '604'	then 33477267
			when '239'	then 33476949
			when '338'	then 33653193
			when '528'	then 33477041
			when '450'	then 33477099
			when '560'	then 33477125
			when '1033'	then 33489968
			when '1093'	then 33489996
			when '260'	then 33653194
			when '210'	then 33477013
			when '386'	then 33477069
			when '274'	then 33653127
			when '142'	then 33476966
			when '701'	then 33653212
			when '697'	then 33477285
			when '382'	then 33477060
			when '861'	then 33477347
			when '357'	then 33653216
			when '143'	then 33476969
			when '484'	then 33477068
			when '456'	then 33477115
			when '523'	then 33653157
			when '489'	then 33477081
			when '188'	then 33476947
			when '845'	then 33477299
			when '472'	then 33477044
			when '474'	then 33477049
			when '794'	then 33477300
			when '194'	then 33476972
			when '295'	then 33476973
			when '253'	then 33476993
			when '968'	then 33477341
			when '791'	then 33477288
			when '879'	then 33477392
			when '641'	then 33653225
			when '412'	then 33477140
			when '820'	then 33477210
			when '387'	then 33477073
			when '442'	then 33477072
			when '414'	then 33477145
			when '388'	then 33653162
			when '633'	then 33477213
			when '145'	then 33476976
			when '840'	then 33477283
			when '147'	then 33476981
			when '409'	then 33477131
			when '691'	then 33653208
			when '148'	then 33653132
			when '801'	then 33477322
			when '864'	then 33477355
			when '568'	then 33477153
			when '149'	then 33476986
			when '376'	then 33477047
			when '350'	then 33476974
			when '152'	then 33476997
			when '810'	then 33477168
			when '714'	then 33477337
			when '583'	then 33653245
			when '464'	then 33477141
			when '597'	then 33477245
			when '150'	then 33476990
			when '323'	then 33476873
			when '493'	then 33477093
			when '805'	then 33477148
			when '655'	then 33477291
			when '151'	then 33476994
			when '561'	then 33477128
			when '462'	then 33477136
			when '1106'	then 33489959
			when '843'	then 33477294
			when '319'	then 33476856
			when '860'	then 33653231
			when '934'	then 33477388
			when '998'	then 33477399
			when '181'	then 33476923
			when '1084'	then 33489991
			when '405'	then 33477118
			when '668'	then 33477176
			when '984'	then 33477373
			when '606'	then 33477275
			when '506'	then 33653181
			when '400'	then 33477106
			when '403'	then 33477114
			when '574'	then 33477170
			when '162'	then 33476854
			when '722'	then 33477189
			when '648'	then 33477260
			when '786'	then 33477272
			when '673'	then 33477196
			when '781'	then 33477249
			when '846'	then 33477303
			when '804'	then 33477330
			when '921'	then 33477360
			when '553'	then 33477108
			when '582'	then 33653244
			when '710'	then 33477328
			when '159'	then 33476842
			when '264'	then 33476857
			when '328'	then 33476896
			when '234'	then 33476932
			when '186'	then 33476937
			when '201'	then 33476996
			when '158'	then 33477003
			when '792'	then 33477293
			when '240'	then 33653134
			when '1019'	then 33489952
			when '246'	then 33653154
			when '518'	then 33477018
			when '589'	then 33653248
			when '706'	then 33477314
			when '424'	then 33653165
			when '440'	then 33653205
			when '165'	then 33653125
			when '236'	then 33653131
			when '327'	then 33653166
			when '308'	then 33653169
			when '160'	then 33653116
			when '161'	then 33653120
			when '570'	then 33653239
			when '823'	then 33653221
			when '685'	then 33653206
			when '870'	then 33653233
			when '838'	then 33653235
			when '1032'	then 33653237
			when '153'	then 33653133
			when '241'	then 33653138
			when '949'	then 33653247
			when '1002'	then 33653252
			when '642'	then 33653227
			when '1053'	then 33653243
			when '218'	then 33653115
			when '247'	then 33653161
			when '855'	then 33653230
			when '1066'	then 33653250
			when '913'	then 33653240
			when '774'	then 33653217
			when '835'	then 33653232
			when '276'	then 33653130
			when '206'	then 33653178
			when '155'	then 33653135
			when '663'	then 33653238
			when '421'	then 33653155
			when '385'	then 33653158
			when '156'	then 33653136
			when '1022'	then 33653234
			when '1014'	then 33653253
			when '157'	then 33653139
			when '702'	then 33653215
			End as id 
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
		) AS matricula,
	'' as avisoPrevio,
	JSON_QUERY(
		(SELECT
		case f.cd_TipoRescisao 
			when '11' then 42708
			when '12' then 42701
			when '21' then 42702
			when '30' then 50811
			when '32' then 42703
			when '40' then 50812
			when '60' then 50699
			when '70' then 50813
			when '72' then 50814
			when '73' then 50848
			when '74' then 50849
			when '80' then 42704
		End as id 
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
		) AS motivoRescisao,
		'false' as trabalhouDiaRescisao,
		'false' as recalcularMensal,
		'false' as conversao,
		'' as dataEfeitoFinanceiro,
		'' as dataCancelamento,
		'' as tipoCancelamento,
		'' as numeroProcessoCancelamento,
		'' as tipoAfastamentoAteEfeitoFinanceiro,
		'' as tipoAfastamentoDoEfeitoFincanceiroAteCancelamento,
		'' as atoCancelamento,
		'[]' as afastamentos,
		'false' as reintegracaoExcedeVagaCargo,
		'' as usuarioReintegracao,
		'' as dataHoraReintegracao,
		'' as aposentadoRevertido,
		'' as empresaSucessora,
		'' as dataFinalQuarentena,
		'' as indicativoRemuneracao,
		'false' as pdv,
		'' as processoTrabalhista,
		'' as dataRescisaoRetificadaProcTrab,
		'' as motivoRescisaoRetificadaProcTrab,
		'true' as consideraAvosPerdidosDecimoTerceiro,
		'true' as descontarFaltasFerias,
		'' as observacao,
		'false' as avisoPrevioDescontado,
		'false' as avisoPrevioIndenizado,
		'' as quantidadeDiasAvisoPrevio,
		'' as numeroProcessoTrabalhista
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
from FOLHFuncionario f, FOLHSituacaoServidor s  --, FOLHTipoRescisao tp
	where f.cd_Cecam = s.cd_Cecam
		and f.cd_situacao = s.cd_situacao
		and f.cd_situacao = 99
        `;

		const result = await masterConnection.query(userQuery);

		const resultData = result.recordset;

		const transformedData = resultData.map(record => {
            const content = JSON.parse(record.content);
        
            return {
                idIntegracao: record.idIntegracao,
                conteudo: {
                    data: content.data || null,
                    saldoFgts: content.saldoFgts || null,
                    fgtsMesAnterior: content.fgtsMesAnterior === "true",
                    reporVaga: content.reporVaga === "true",
                    ato: content.ato || null,
                    matricula: {
                        id: content.matricula?.id || content.codigoMatricula || null // Aqui verificamos `matricula.id` ou `codigoMatricula`
                    },
                    avisoPrevio: content.avisoPrevio || null,
                    motivoRescisao: content.motivoRescisao ? { id: content.motivoRescisao.id } : null,
                    trabalhouDiaRescisao: false,
                    recalcularMensal: false,
                    conversao: false,
                    dataEfeitoFinanceiro: null,
                    dataCancelamento: null,
                    tipoCancelamento: null,
                    numeroProcessoCancelamento: null,
                    tipoAfastamentoAteEfeitoFinanceiro: null,
                    tipoAfastamentoDoEfeitoFincanceiroAteCancelamento: null,
                    atoCancelamento: null,
                    afastamentos: [],
                    reintegracaoExcedeVagaCargo: false,
                    usuarioReintegracao: null,
                    dataHoraReintegracao: null,
                    aposentadoRevertido: null,
                    empresaSucessora: null,
                    dataFinalQuarentena: null,
                    indicativoRemuneracao: null,
                    pdv: false,
                    processoTrabalhista: null,
                    dataRescisaoRetificadaProcTrab: null,
                    motivoRescisaoRetificadaProcTrab: null,
                    consideraAvosPerdidosDecimoTerceiro: true,
                    descontarFaltasFerias: true,
                    observacao: null,
                    avisoPrevioDescontado: false,
                    avisoPrevioIndenizado: false,
                    quantidadeDiasAvisoPrevio: null,
                    numeroProcessoTrabalhista: null
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

        
        // Dividir os dados transformados em chunks e salvar em arquivos JSON
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
        
                const response = await fetch(`https://pessoal.betha.cloud/service-layer/v1/api/rescisao`, {
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
        
        // Salvar report e IDs em arquivos JSON
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
