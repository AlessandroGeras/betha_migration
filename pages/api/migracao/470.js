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
    //return `${year}-${month}-${day}`;
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
           select 
ROW_NUMBER() OVER (ORDER BY cd_Cecam)  as idIntegracao,
JSON_QUERY(
(SELECT

JSON_QUERY(
(SELECT
	case ds_Municipio
		when 'PARECIS' then 3573
		when 'ALTO ALEGRE DO PARECIS' then 113
		when 'ALTO ALEGRE' then 113
		when 'ROLIM DE MOURA' then 4228
		when 'PARECIS.' then 3573
		when 'PIMENTA BUENO' then 3748
		when 'PRIMAVERA' then 3999
		when 'SANTA LUZIA DOESTE' then 4384
		when 'ALTA FLORESTA' then 99
		when 'SANTA LUZIA' then 4384
		when 'ALVORADA D OESTE' then 144
		when 'COLORADO DO OESTE' then 1269
		when 'SANAT LUZIA' then 4384
		when 'PRIMAVERA DE RONDONIA' then 3999
		when 'SAO FELIPE' then 4765
		when 'SAO FELIPE DOESTE' then 4765
		when 'CACOAL' then 826
		when 'ALTO ALEGRE DOS PARECIS' then 113
		when 'SÃO FELIPE D OESTE' then 4765
		when 'ALTA FLORESTA D OESTE' then 99
		when 'OURO PRETO D OESTE' then 3448
		when 'SANTA LUZIA D OESTE' then 4384
			 else 3573
		End as id
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS municipio,

JSON_QUERY(
(SELECT
	case cd_LogradouroTipo
when 'ACA'	then 5	
when 'AC'	then 6	
when 'ACL'	then 318	
when 'AD'	then 1	
when 'AER'	then 7	
when 'AL'	then 8	
when 'ALD'	then 319	
when 'AT'	then 10	
when 'AN'	then 11	
when 'ANT'	then 322	
when 'A'	then 179	
when 'AE'	then 178	
when 'A V'	then 324	
when 'ART'	then 323	
when 'ATL'	then 3	
when 'AV'	then 14	
when 'AVC'	then 4	
when 'AVM'	then 325	
when 'AMD'	then 320	
when 'AME'	then 321	
when 'AVV'	then 326	
when 'BX'	then 15	
when 'BLO'	then 16	
when 'BAL'	then 20	
when 'BC'	then 23	
when 'BEL'	then 17	
when 'BL'	then 18	
when 'BLS'	then 327	
when 'BSQ'	then 24	
when 'BVD'	then 25	
when 'BLV'	then 328	
when 'BUR'	then 19	
when 'C'	then 32	
when 'CAL'	then 26	
when 'CAM'	then 34	
when 'CPO'	then 35	
when 'CAN'	then 27	
when 'CH'	then 43	
when 'CHA'	then 28	
when 'CIC'	then 329	
when 'CIR'	then 29	
when 'COL'	then 47	
when 'CMP'	then 30	
when 'COM'	then 48	
when 'COND'	then 49	
when 'CJ'	then 31	
when 'CJM'	then 330	
when 'CTN'	then 331	
when 'COR'	then 51	
when 'CRG'	then 52	
when 'DSC'	then 53	
when 'DSV'	then 55	
when 'DT'	then 54	
when 'EX'	then 344	
when 'EVD'	then 56	
when 'ENS'	then 334	
when 'ENT'	then 57	
when 'EB'	then 332	
when 'EQ'	then 58	
when 'ESC'	then 62	
when 'ESD'	then 335	
when 'ESP'	then 63	
when 'ETC'	then 65	
when 'ETT'	then 59	
when 'ETD'	then 67	
when 'ETN'	then 68	
when 'EST'	then 66	
when 'ETA'	then 341	
when 'ESL'	then 338	
when 'ESS'	then 339	
when 'ESE'	then 336	
when 'EIM'	then 333	
when 'ESM'	then 60	
when 'ETP'	then 342	
when 'ESV'	then 340	
when 'ESI'	then 337	
when 'EVA'	then 343	
when 'FAV'	then 345	
when 'FAZ'	then 72	
when 'FRA'	then 70	
when 'FER'	then 73	
when 'FNT'	then 71	
when 'FTE'	then 74	
when 'GAL'	then 76	
when 'GJA'	then 77	
when 'HAB'	then 78	
when 'IGP'	then 347	
when 'IA'	then 80	
when 'IOA'	then 349	
when 'IND'	then 348	
when 'JD'	then 82	
when 'JDE'	then 81	
when 'LD'	then 83	
when 'LGO'	then 84	
when 'LGA'	then 85	
when 'LRG'	then 86	
when 'LIN'	then 88	
when 'LOC'	then 89	
when 'LT'	then 90	
when 'LOT'	then 91	
when 'RPR'	then 93	
when 'MRG'	then 94	
when 'MNA'	then 95	
when 'MER'	then 97	
when 'MIN'	then 98	
when 'MOD'	then 350	
when 'MOD'	then 100	
when 'MTE'	then 92	
when 'MRO'	then 99	
when 'NUC'	then 101	
when 'HAB'	then 346	
when 'NUR'	then 352	
when 'OUT'	then 354	
when 'O'	then 353	
when 'PDA'	then 102	
when 'PDO'	then 103	
when 'PAR'	then 104	
when 'PRQ'	then 109	
when 'PRM'	then 355	
when 'PRR'	then 356	
when 'PSG'	then 110	
when 'PSP'	then 357	
when 'PSS'	then 105	
when 'PSA'	then 111	
when 'PAS'	then 112	
when 'PAT'	then 123	
when 'PNT'	then 106	
when 'PTE'	then 107	
when 'PTO'	then 117	
when 'PC'	then 120	
when 'PCE'	then 108	
when 'PR'	then 119	
when 'MRG'	then 351	
when 'PRL'	then 122	
when 'Q'	then 125	
when 'QTA'	then 127	
when 'QTS'	then 124	
when 'RAM'	then 128	
when 'RMP'	then 129	
when 'REC'	then 137	
when 'RCR'	then 362	
when 'RES'	then 130	
when 'RET'	then 131	
when 'RER'	then 139	
when 'RTN'	then 132	
when 'ROA'	then 133	
when 'ROD'	then 140	
when 'RTT'	then 142	
when 'ROT'	then 364	
when 'R'	then 143	
when 'R L'	then 359	
when 'RPE'	then 135	
when 'R I'	then 358	
when 'R P'	then 360	
when 'R V'	then 361	
when 'RLA'	then 363	
when 'SEG'	then 365	
when 'SRV'	then 147	
when 'ST'	then 148	
when 'SIT'	then 150	
when 'SUB'	then 145	
when 'TER'	then 151	
when 'TV'	then 157	
when 'TVP'	then 152	
when 'TVV'	then 366	
when 'TRA'	then 153	
when 'TR'	then 154	
when 'TRV'	then 155	
when 'TCH'	then 156	
when 'TUN'	then 159	
when 'UNI'	then 160	
when 'VAL'	then 163	
when 'VLE'	then 164	
when 'VRT'	then 171	
when 'VER'	then 172	
when 'V'	then 173	
when 'V C'	then 367	
when 'VCO'	then 369	
when 'VAC'	then 165	
when 'VPE'	then 166	
when 'VD'	then 174	
when 'VEV'	then 167	
when 'V-E'	then 168	
when 'VLT'	then 370	
when 'V L'	then 368	
when 'VLA'	then 169	
when 'VL'	then 175	
when 'ZIG'	then 176	
		else 143
end as id
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS tipo,
ds_Endereco as descricao,
JSON_QUERY(
(SELECT
	case ds_Municipio
when 'ALTA FLORESTA'			then 76954000
when 'ALTA FLORESTA D OESTE'	then 76954000
when 'ALTO ALEGRE'				then 76952000
when 'ALTO ALEGRE DO PARECIS'	then 76952000
when 'ALTO ALEGRE DOS PARECIS'	then 76952000
when 'ALVORADA D OESTE'			then 76930000
when 'CACOAL'					then 76960001
when 'CACOAL'					then 76960001
when 'COLORADO DO OESTE'		then 76993000
when 'OURO PRETO D OESTE'		then 76920000
when 'PARACIS'					then 76979000
when 'PARECIS'					then 76979000
when 'PARECIS'					then 76979000
when 'PARECIS'					then 76979000
when 'PARECIS'					then 76979000
when 'PARECIS'					then 76979000
when 'PARECIS'					then 76979000
when 'PARECIS'					then 76979000
when 'PARECIS'					then 76979000
when 'PARECIS'					then 76979000
when 'PÁRECIS'					then 76979000
when 'PARECIS.'					then 76979000
when 'PIMENTA BUENO'			then 76970000
when 'PIMENTA BUENO'			then 76970000
when 'PRIMAVERA'	 			then 76976000
when 'PRIMAVERA DE RONDONIA'	then 76976000
when 'ROLIM DE MOURA'			then 76940000
when 'ROLIM DE MOURA'			then 76940000
when 'ROLIM DE MOURA'			then 76940000
when 'ROLIM DE MOURA'			then 76940000
when 'ROLIM DE MOURA'			then 76940000
when 'SANAT LUZIA'				then 76950000
when 'SANTA LUZIA'				then 76950000
when 'SANTA LUZIA D OESTE'		then 76950000
when 'SANTA LUZIA DOESTE'		then 76950000
when 'SANTA LUZIA DOESTE'		then 76950000
when 'SANTA LUZIA DOESTE'		then 76950000
when 'SAO FELIPE'				then 76977000
when 'SÃO FELIPE'				then 76977000
when 'SÃO FELIPE D OESTE'		then 76977000
when 'SÃO FELIPE D OESTE'		then 76977000
when 'SAO FELIPE DOESTE'		then 76977000
else 76979000
end as id
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS cep
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
from FOLHFuncDadosPess dp
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            try {
                // Fazer o parse do campo 'content' que está em formato de string JSON
                const content = JSON.parse(record.content);
        
                return {
                    idIntegracao: record.idIntegracao,  // Usando valor dinâmico do record
                    conteudo: {
                        municipio: {
                            id: content.municipio.id  // Mapeando o campo 'municipio.id'
                        },
                        tipoLogradouro: {
                            id: content.tipo.id  // Mapeando o campo 'tipo.id'
                        },
                        descricao: content.descricao || "N/A",  // Aqui você captura a descricao
                        cep: content.cep.id.toString()    // Convertendo o campo 'cep' para string
                    }
                };
            } catch (error) {
                console.error("Erro ao fazer parse do JSON ou acessar dados:", error);
                return null; // Retornar nulo ou lidar de outra forma com erros
            }
        });
        
        // Log da saída transformada
        console.log("Transformed Data:", transformedData);



        // Salvar os resultados transformados em um arquivo JSON
        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const response = await fetch('https://pessoal.betha.cloud/service-layer/v1/api/logradouro', {
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
