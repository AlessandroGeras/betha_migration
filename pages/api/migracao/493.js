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
        const selectDatabaseQuery = 'USE CONTABIL2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
ROW_NUMBER() OVER(ORDER BY e.cd_exercicio)  AS idIntegracao,
JSON_QUERY(
(SELECT
'false' as validaSaldo,
e.cd_exercicio as exercicio,
JSON_QUERY(
(SELECT 

case m.cd_MovimentacaoAnulada

  when 37 then 24876766
  when 77 then 24876767
  when 41 then 24876768
  when 35 then 24876769
  when 222 then 24876770
  when 32 then 24876771
  when 17 then 24876772
  when 34 then 24876773
  when 31 then 24876774
  when 25 then 24876775
  when 50 then 24876776
  when 16 then 24876777
  when 29 then 24876778
  when 220 then 24876779
  when 3 then 24876780
  when 45 then 24876781
  when 44 then 24876782
  when 230 then 24876783
  when 27 then 24876784
  when 22 then 24876785
  when 43 then 24876786
  when 42 then 24876787
  when 47 then 24876788
  when 1 then 24876789
  when 49 then 24876790
  when 63 then 24876791
  when 51 then 24876792
  when 46 then 24876793
  when 64 then 24876794
  when 48 then 24876795
  when 52 then 24876796
  when 53 then 24876797
  when 224 then 24876798
  when 36 then 24876799
  when 226 then 24876800
  when 62 then 24876801
  when 5 then 24876802
  when 38 then 24876803
  when 33 then 24876804
  when 18 then 24876805
  when 40 then 24876806
  when 19 then 24876807
  when 30 then 24876808
  when 26 then 24876809
  when 6 then 24876810
  when 231 then 24876811
  when 39 then 24876812
  when 28 then 24876813
  when 23 then 24876814
  when 24 then 24876815
  when 1147 then 24876816
  when 613 then 24876817
  when 595 then 24876818
  when 602 then 24876819
  when 605 then 24876820
  when 1037 then 24876821
  when 1351 then 24876822
  when 91 then 24876823
  when 604 then 24876824
  when 87 then 24876825
  when 67 then 24876826
  when 563 then 24876827
  when 572 then 24876828
  when 609 then 24876829
  when 614 then 24876830
  when 1004 then 24876831
  when 599 then 24876832
  when 779 then 24876833
  when 611 then 24876834
  when 603 then 24876835
  when 80 then 24876836
  when 590 then 24876837
  when 1350 then 24876838
  when 615 then 24876839
  when 601 then 24876840
  when 558 then 24876841
  when 1038 then 24876842
  when 557 then 24876843
  when 573 then 24876844
  when 90 then 24876845
  when 562 then 24876846
  when 608 then 24876847
  when 773 then 24876848
  when 616 then 24876849
  when 677 then 24876850
  when 783 then 24876851
  when 784 then 24876852
  when 600 then 24876853
  when 774 then 24876854
  when 778 then 24876855
  when 999 then 24876856
  when 69 then 24876857
  when 133 then 24876858
  when 429 then 24876859
  when 1003 then 24876860
  when 606 then 24876861
  when 132 then 24876862
  when 610 then 24876863
  when 598 then 24876864
  when 596 then 24876865
  when 68 then 24876866
  when 597 then 24876867


end as id
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS pagamento,
m.cd_codigo   as numeroCadastro,		
 m.dt_movto  as data,
 m.vl_movimento     as valor, 
 'ESTORNO DE PAGAMENTO' as motivo,
 'CONTABIL' as proprietario,
 JSON_QUERY(
(SELECT
 JSON_QUERY(
(SELECT


case l.cd_Liquidacao
   when 3 then 24493363
  when 4 then 24493364
  when 1 then 24493365
  when 13 then 24493366
  when 8 then 24493367
  when 2 then 24493368
  when 10 then 24493369
  when 5 then 24493370
  when 11 then 24493371
  when 36 then 24493372
  when 26 then 24493373
  when 22 then 24493374
  when 7 then 24493375
  when 6 then 24493376
  when 15 then 24493377
  when 16 then 24493378
  when 12 then 24493379
  when 9 then 24493380
  when 20 then 24493381
  when 18 then 24493382
  when 19 then 24493383
  when 25 then 24493384
  when 27 then 24493385
  when 21 then 24493386
  when 17 then 24493387
  when 23 then 24493388
  when 37 then 24493389
  when 35 then 24493390
  when 14 then 24493391
  when 28 then 24493392
  when 33 then 24493393
  when 24 then 24493394
  when 31 then 24493395
  when 32 then 24493396
  when 34 then 24493397
  when 30 then 24493398
  when 29 then 24493399
  when 57 then 24514482
  when 58 then 24514484
  when 46 then 24514485
  when 47 then 24514486
  when 64 then 24514487
  when 70 then 24514488
  when 71 then 24514489
  when 191 then 24514490
  when 182 then 24514491
  when 62 then 24514492
  when 63 then 24514493
  when 246 then 24514494
  when 192 then 24514495
  when 245 then 24514497
  when 236 then 24514498
  when 269 then 24514499
  when 189 then 24514500
  when 234 then 24514501
  when 550 then 24514502
  when 290 then 24514503
  when 244 then 24514504
  when 283 then 24514505
  when 296 then 24514506
  when 391 then 24514507
  when 262 then 24514508
  when 247 then 24514509
  when 289 then 24514510
  when 282 then 24514511
  when 235 then 24514512
  when 507 then 24514513
  when 364 then 24514514
  when 365 then 24514515
  when 270 then 24514516
  when 479 then 24514517
  when 291 then 24514518
  when 293 then 24514519
  when 295 then 24514520
  when 256 then 24514521
  when 389 then 24514522
  when 292 then 24514523
  when 248 then 24514524
  when 297 then 24514525
  when 294 then 24514526
  when 556 then 24514527
  when 478 then 24514528
  when 467 then 24514529
  when 392 then 24514530
  when 304 then 24514531
  when 487 then 24514532
  when 480 then 24514533
  when 570 then 24514550
  when 612 then 24514551
  when 579 then 24514552
  when 736 then 24514553
  when 734 then 24514554
  when 737 then 24514556
  when 620 then 24514557
  when 740 then 24514558


                            end as id
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS liquidacao,
m.vl_movimento     as valor

				FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS liquidacoes,
JSON_QUERY(
(SELECT
m.vl_movimento	as valor,
JSON_QUERY(
(SELECT

JSON_QUERY(
(SELECT
case  e.cd_DestinacaoRecurso
when        150000000000        then        744141
when        150000150000        then        744143
when        150000250000        then        744145
when        160000000000        then        744203
when        166100000000        then        744235
when        154000000000        then        744155
when        154000700000        then        744159
when        155000000000        then        744177
when        170000000000        then        744243
when        170100000000        then        744245
when        257100000000        then        744401
when        270000000000        then        744455
when        270100000000        then        744457
when        150000150000        then        744143
when        170600003110        then        744254
when        250000250000        then        744356
when        255300000000        then        744394
when        155300000000        then        744183
when        250000000000        then        744353
                                    end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS recurso,
				m.vl_movimento	as valor
				 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS recursos

                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS baixa
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
from CONTEMPENHOS e 
inner join CONT_MOVIMENTACAO m
on e.cd_cecam = m.cd_cecam
and e.cd_empenho = m.cd_empenho
and e.cd_empenhob = m.cd_empenhob
---and e.cd_Pagamento = m.cd_codigo_inicial
inner join CONTFICHABANCOS  b
on m.cd_banco = b.cd_banco 
and m.cd_cecam = b.cd_cecam
inner join CONTEMPENHOLIQUIDACAO l
on l.cd_Liquidacao = e.cd_Liquidacao
and l.cd_Cecam = e.cd_cecam
where e.cd_cecam = 1995
 and e.cd_fichadesp  > 6000
 and m.cd_banco <> 1
and m.cd_MovimentacaoAnulada is not null

        `;
        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const content = JSON.parse(record.content);
        
            console.log(content);
        
            return {
                idIntegracao: record.idIntegracao ? record.idIntegracao.toString() : null,
                content: {
                    validaSaldo: content.validaSaldo === "true", // Convertendo string para booleano
                    exercicio: content.exercicio || null,
                    pagamento: {
                        id: content.pagamento && content.pagamento.id ? content.pagamento.id : null
                    },
                    numeroCadastro: content.numeroCadastro || null,
                    data: content.data ? content.data.split('T')[0] : null, // Pegando apenas a parte da data
                    valor: content.valor || null,
                    motivo: content.motivo || null,
                    proprietario: content.proprietario || null,
                    liquidacoes: [
                        {
                            liquidacao: {
                                id: content.liquidacoes && content.liquidacoes.liquidacao ? content.liquidacoes.liquidacao.id : null
                            },
                            valor: content.liquidacoes ? content.liquidacoes.valor : null
                        }
                    ],
                    baixa: {
                        valor: content.baixa ? content.baixa.valor : null,
                        recursos: [
                            {
                                recurso: {
                                    id: content.baixa && content.baixa.recursos && content.baixa.recursos.recurso && content.baixa.recursos.recurso.id 
                                        ? content.baixa.recursos.recurso.id 
                                        : null
                                },
                                valor: content.baixa && content.baixa.recursos ? content.baixa.recursos.valor : null
                            }
                        ]
                    }
                }
            };
        });
        
        
        
        
        
        
        

        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }
        

        /* // Enviar todos os registros de uma vez
         const response = await fetch(' https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/anulacoes-pagamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
            },
            body: JSON.stringify(transformedData)
        }); */

        /* if (response.ok) {
            const apiResponse = await response.json();

            // Gravar a resposta da API no arquivo report.json
            fs.writeFileSync('report.json', JSON.stringify(apiResponse, null, 2));
            console.log('Dados enviados com sucesso e resposta salva em report.json');
        } else {
            console.error('Erro ao enviar os dados:', response.statusText);
        } */

    } catch (error) {
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        sql.close();
    }
}

main();
