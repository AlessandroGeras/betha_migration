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

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "CONTABIL2024"
        const selectDatabaseQuery = 'USE CONTABIL2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
 ROW_NUMBER() OVER (ORDER BY cd_Cecam) AS idIntegracao,
JSON_QUERY(
    (SELECT
                                JSON_QUERY(
                                        (SELECT
                                                 15063 as id
                                 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                                ) AS loa,
                                 JSON_QUERY(
    (SELECT
   case cd_categoriaeconomicareceita
   when        1112500100        then        31983138
when        1112500200        then        31983064
when        1112500300        then        31983089
when        1112500400        then        31983114
when        1112530100        then        31983120
when        1113031100        then        31983152
when        1113034101        then        31983234
when        1113034102        then        31983160
when        1114511101        then        31983279
when        1114511102        then        31983304
when        1114511200        then        31983329
when        1114511300        then        31983255
when        1114511400        then        31983280
when        1121010101        then        31983294
when        1121010102        then        31983319
when        1121010104        then        31983344
when        1121010105        then        31983270
when        1121010106        then        31983295
when        1121010107        then        31983320
when        1121500100        then        31983421
when        1122010101        then        31983426
when        1122010102        then        31983451
when        1122010103        then        31983377
when        1122010104        then        31983402
when        1122010105        then        31983427
when        1122010106        then        31983452
when        1122010107        then        31983453
when        1122010108        then        31983478
when        1241500100        then        31984686
when        1321010101        then        31984699
when        1321010102        then        31984724
when        1321010103        then        31984749
when        1321010104        then        31984675
when        1321010105        then        31984700
when        1321010106        then        31984725
when        1321010107        then        31984750
when        1321010108        then        31984676
when        1321010109        then        31984701
when        1321010110        then        31984726
when        1321010111        then        31984751
when        1321010112        then        31984677
when        1321010113        then        31984702
when        1321010114        then        31984727
when        1321010115        then        31984752
when        1321010116        then        31984753
when        1321010117        then        31984778
when        1321010118        then        31984803
when        1321010119        then        31984828
when        1321010120        then        31984754
when        1321010121        then        31984779
when        1321010122        then        31984804
when        1321010123        then        31984829
when        1321010124        then        31984755
when        1321010125        then        31984780
when        1321010126        then        31984805
when        1321010127        then        31984830
when        1321010128        then        31984756
when        1321010129        then        31984781
when        1321010130        then        31984806
when        1321010131        then        31984831
when        1321010132        then        31984757
when        1321010133        then        31984782
when        1321010134        then        31984807
when        1321010135        then        31984832
when        1699990101        then        31985874
when        1699990102        then        31985899
when        1711511101        then        31985955
when        1711511102        then        31985980
when        1711511103        then        31986005
when        1711511104        then        31986030
when        1711512101        then        31985983
when        1711512102        then        31986008
when        1711520101        then        31985961
when        1711520102        then        31985986
when        1712510100        then        31986002
when        1712524100        then        31986111
when        1713501101        then        31986069
when        1713501102        then        31986094
when        1713501103        then        31986119
when        1713501104        then        31986144
when        1713501105        then        31986070
when        1713502101        then        31986147
when        1713503101        then        31986100
when        1713503102        then        31986125
when        1713503103        then        31986150
when        1713503104        then        31986076
when        1713504101        then        31986228
when        1713504102        then        31986154
when        1713505102        then        31986206
when        1714500100        then        31986202
when        1714520100        then        31986331
when        1714530100        then        31986259
when        1714990101        then        31986327
when        1714990102        then        31986352
when        1716500101        then        31986412
when        1716500102        then        31986437
when        1716500103        then        31986363
when        1716500105        then        31986413
when        1719580101        then        31986496
when        1721500101        then        31986588
when        1721500102        then        31986614
when        1721510101        then        31986566
when        1721510102        then        31986591
when        1721520101        then        31986643
when        1721520102        then        31986569
when        1721530100        then        31986596
when        1723500102        then        31986710
when        1723500103        then        31986735
when        1724500101        then        31986740
when        1724510101        then        31986693
when        1729510101        then        31986676
when        1729510102        then        31986701
when        1729510103        then        31986726
when        1729510105        then        31986677
when        1729990101        then        31986784
when        1729990102        then        31986809
when        1751500101        then        31986864
when        1751500102        then        31986889
when        1759990101        then        31986867
when        1922011101        then        31987220
when        1922990100        then        31987418
when        1923990101        then        31987507
when        1923990102        then        31987532
when        1923990103        then        31987458
when        1923990104        then        31987483
when        1923990301        then        31987511
when        1923990302        then        31987536
when        1923990303        then        31987462
when        1923990304        then        31987487
when        1923990305        then        31987512
when        1923990306        then        31987537
when        1923990307        then        31987463
when        1923990308        then        31987488
when        1923990309        then        31987513
when        1923990310        then        31987538
when        1923990311        then        31987464
when        1923990312        then        31987489
when        1923990313        then        31987514
when        1923990314        then        31987539
when        1923990315        then        31987465
when        1923990401        then        31987515
when        1923990402        then        31987540
when        1923990403        then        31987466
when        1923990404        then        31987491
when        1923990406        then        31987541
when        1923990407        then        31987467
when        1923990408        then        31987492
when        1923990409        then        31987517
when        1923990410        then        31987542
when        1923990411        then        31987468
when        1923990412        then        31987493
when        1923990413        then        31987518
when        1923990414        then        31987543
when        1923990415        then        31987469
when        1999992101        then        31988037
when        2411513101        then        31988188
when        2422540101        then        31988265
when        2429990101        then        31988318
   end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS natureza,
cd_exercicio as exercicio,
cd_ficharec as numero,
                                JSON_QUERY(
                                        (SELECT
                                                 case cd_cecam
                                                 when 1995 then 10768
                                                 when 2783 then 10770
                                                 when 3052 then 10771
                                                 when 3068 then 10769
                                                 end as id
                                 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                                ) AS entidade,
                                JSON_QUERY(
    (SELECT
   case cd_unidorca
when        '01.00.00'        then        156832
when        '01.01.00'        then        157058
when        '01.02.00'        then        157059
when        '02.00.00'        then        156835
when        '02.01.00'        then        157060
when        '02.02.00'        then        157061
when        '02.03.00'        then        157062
when        '02.04.00'        then        157063
when        '02.05.00'        then        157064
when        '02.06.00'        then        157065
when        '02.07.00'        then        157066
when        '02.08.00'        then        157067
when        '02.09.00'        then        157068
when        '02.10.00'        then        157069
end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS organograma,
JSON_QUERY(
                                        (SELECT
'100' as percentual,
        vl_orcado as valor,
        JSON_QUERY(
                                        (SELECT
        case cd_destinacaorecurso
when 150000000000 then 744141
when 150000150000 then 744143  
when 150000250000 then 744145
when 154000700000 then 744159
when 155000000000 then 744177
when 155200000000 then 744181
when 155300000000 then 744183
when 156900000000 then 744185
when 157100000000 then 744189
when 159900000000 then 744193
when 160000000000 then 744203
when 160100000000 then 744205
when 160500000000 then 744213
when 162100000000 then 744215
when 163100000000 then   744219
when 163200000000 then   744221
when 165900000000 then   744231
when 166000000000 then   744233
when 166100000000 then   744235
when 170000000000 then   744243
when 170100000000 then   744245
when 170500000000 then   744251
when 170600003110  then  744255
when 170800000000 then        744261        
when 171000003210 then   744267
when 171000003220 then   744269
when 175000000000 then   744297
when 175100000000 then   744299
when 175900000000 then   744315                                                
   end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS recurso
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS recursos,
vl_orcado as metaFinanceira
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
from CONTFICHARECEITA
where cd_ReceitaPrevisaoTipo = 1
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Verificar os resultados da consulta

        const transformedData = resultData.map(record => {
            const content = JSON.parse(record.content);
        
            return {
                idIntegracao: record.idIntegracao.toString(),
                content: {
                    loa: {
                        id: content.loa.id
                    },
                    exercicio: content.exercicio,
                    numero: content.numero,
                    natureza: {
                        id: content.natureza.id
                    },
                    entidade: {
                        id: content.entidade.id
                    },
                    organograma: {
                        id: content.organograma.id
                    },
                    recursos: [
                        {
                            percentual: parseInt(content.recursos.percentual),
                            valor: content.recursos.valor,
                            recurso: {
                                id: content.recursos.recurso.id
                            }
                        }
                    ],
                    metaFinanceira: parseFloat(content.metaFinanceira)
                }
            };
        });
        

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
            const response = await fetch('https://pla-sl-rest.betha.cloud/planejamento/service-layer/v2/api/receitas-loa', {
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
