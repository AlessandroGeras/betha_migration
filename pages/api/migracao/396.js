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
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    //return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function parseJsonSafe(data) {
    try {
        return JSON.parse(data);
    } catch (error) {
        console.error('Erro ao parsear JSON:', error);
        return null;
    }
}

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "COMP_ALMO"
        const selectDatabaseQuery = 'USE COMP_ALMO_CAM';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            SELECT
JSON_QUERY(
    (SELECT
CASE
WHEN lici.nr_processo = 3 THEN 1312414
WHEN lici.nr_processo  = 5 THEN 1312432
WHEN lici.nr_processo  = 22 THEN 1312433
WHEN lici.nr_processo  = 34 THEN 1312436
WHEN lici.nr_processo  = 40 THEN 1312437
WHEN lici.nr_processo  = 51 THEN 1312438
WHEN lici.nr_processo  = 86 THEN 1312439
end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS processoAdministrativo,
JSON_QUERY(
    (SELECT
        case 
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'ÁGUA MINERAL NATURAL DE 500ML C/12 UNIDADES' then 56208592
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'AÇUCAR CRISTAL DE 02 KG' then 56208594
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'CAFÉ EM PÓ DE 500G' then 56208596
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'BISCOITO ÁGUA E SAL 400G' then 56208597
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'COPO DESCART. 180ML C/25 PCT CONTENDO 100 UNIDADES CADA' then 56208611
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'COPO DESCART. 50ML C/25 PCT CONTENDO 100 UNIDADES CADA' then 56208625
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'BISCOITO DOCE 400G' then 56208631
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'INSETICIDA AEROSSOL 380ML/350G' then 56208642
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'ALCOOL EM GEL 70° / 500G' then 56208643
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'LINK DE INTERNET DEDICADO DE 100 MB, FORNECIMENTO DE SOLUÇÕES DE CONEXÃO COM 01 IP (INTERNET PROTOCO) FIXO DEDICADO, COM ACESSO A REDE MUNDIAL DE COMPUTADORES INTERNET, COM ACESSO DE VELOCIDADE DE 100 (CEM) MB, SENDO TAXA DE DOWNLOAD E UPLOAD, FORNECIMENTO EM FIBRA ÓPTICA.' then 56208645
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'BANDA LARGA 250 MEGAS, FORNECIMENTO DE INTERNET BANDA LARGA, CONEXÃO FIBRA OPTICA NO MINIMO DE 250MBPS, PARA PLENARIO (ABERTO PARA O PUBLICO) DA CAMARA.' then 56208646
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'DESPESA EXTIMATIVA COM SERVIÇO DE FORNECIMENTO DE ENERGIA ELETRICA' then 56208650
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'DESPESA ESTIMATIVA COM A EMPRESA FORNECEDORA TELECOMUNICAÇÕES  .' then 56208651
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'BALDE PLASTICO REFORÇADO CAP. 10LTS MED. 290MM X 220MM ALTURA' then 56208656
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'SABÃO EM PÓ C/500G' then 56208657
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'PANO PARA LIMPAR CHÃO' then 56208658
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'ALCOOL ETILICO 96° LIQUIDO DE 1LT' then 56208663
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'AROMATIZADOR DE AMBIENTE SPRAY 360ML' then 56208667
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'SACO DE LIXO 15 LTS C/10 UNIDADES' then 56208669
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'SACO DE LIXO 50 LTS C/10 UNIDADES' then 56208671
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'PAPEL HIGIENICO C/12 ROLOS DE 60MTS CADA' then 56208674
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'GUARDANAPO DE PAPEL 21,5CM X 22CM C/50 UNIDADES' then 56208675
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'ESPONJA DE AÇO C/08 UNIDADES' then 56208676
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'TOALHA DE PAPEL INTERFOLHADA C/1000 UNIDADES 21CM X 20CM' then 56208679
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'SERVIÇO DE HIGIENIZAÇÃO - MODELO PISO TETO - 36 MIL BTU´S (ELGIN)' then 56208680
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'SERVIÇO DE HIGIENIZAÇÃO - MODELO SPLIT - 24 MIL BTU´S (ELGIN)' then 56208681
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'SERVIÇO DE HIGIENIZAÇÃO - MODELO SPLIT - 12 MIL BTU´S - CONVENCIONAL (ELGIN)' then 56208682
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'SERVIÇO DE HIGIENIZAÇÃO - MODELO SPLIT - 12 MIL BTU´S - INVERTER (ELGIN)' then 56208683
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'SERVIÇO DE RECARGA DE GÁS E SUBSTITUIÇÃO DE FILTRO - MODELO PISO TETO - 36 MIL BTU´S (ELGIN)' then 56208684
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'SERVIÇO DE TROCA DE CAPACITOR - MODELO PISO TETO - 36 MIL BTU´S (ELGIN)' then 56208686
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'PILHA  AA  ALCALINA C/02 UNIDADES' then 56208713
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'PILHA  AAA  ALCALINA C/02 UNIDADES' then 56208715
  WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'PROCESSO ADMINISTRATIVO PARA COBRIR DESPESA ESTIMATIVA COM A OPERADORA FORNECEDORA DE CAERD.  ' THEN 56208604
  WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'CERTIFICADO DIGITAL PARA PESSOA FISICA DO TIPO:  A3 (e-CPF A3) TOKEN - VALIDADE PARA 03 (TRÊS) ANOS.  ' THEN 56208633
  WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'COADOR DE CAFÉ EM TECIDO, MEDINDO TAMANHO GRANDE  ' THEN 56208619
  WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'PANO PARA SECAR LOUÇA, EM TECIDO DE ALGODÃO  ' THEN 56208601
  WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'GÁS DE COZINHA P-13  ' THEN 56208600
  WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'CHÁ, CAIXA 250G  ' THEN 56208634
  WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'ÁGUA MINERAL NATURAL, GALÃO 20 LITROS  ' THEN 56208635
  WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'TOALHA DE PAPEL, PACOTE COM 02 ROLOS  ' THEN 56208603
  WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'DETERGENTE, DE 500 ML  ' THEN 56208602
  WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'PEDRA SANITÁRIA  ' THEN 56208632
  WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'ESPONJA PARA LAVAR LOUÇA, DUPLA FACE   ' THEN 56208605
  WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'ÁGUA SANITÁRIA, 01 LITRO  ' THEN 56208610
  WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'DESINFETANTE, 01 LITRO  ' THEN 56208626
  WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'VASSOURA DE PALHA  ' THEN 56208622
  WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'RODO, 60CM  ' THEN 56208636
  WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'LIMPA VIDRO, 500ML  ' THEN 56208659
  end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS material,
0 as percentual,
al.vl_precounitario as valorUnitario,
al.vl_total as valorTotal,
al.qt_disponivel as quantidade,
'false' as amostra,
'false' as manufaturado,
ROW_NUMBER() OVER (PARTITION BY lici.nr_licitacao ORDER BY al.nr_sequencia) AS numero
FROM COMPLicitacaoFornecedoresItens al
JOIN ALMOProdutos pr ON AL.cd_produto = pr.cd_produto
JOIN COMPLicitacao lici ON lici.nr_licitacao = al.nr_licitacao
WHERE al.aa_licitacao = 2024 and lici.nr_processo in (3, 5, 40, 22, 34, 51, 8, 86)
order by material;

        `;        

        // Transformar os resultados da consulta no formato desejado
        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no novo formato desejado
        const transformedData = resultData.map(record => {
            // Parse JSON strings for processoAdministrativo and material fields
            const processoAdministrativo = JSON.parse(record.processoAdministrativo || '{}');
            const materialEspecificacao = JSON.parse(record.materialEspecificacao || '{}');
            const material = JSON.parse(record.material || '{}');

            return {
                conteudo:{
                processoAdministrativo: {
                    id: processoAdministrativo.id
                },
                materialEspecificacao: {
                    id: materialEspecificacao.id
                },
                numero: record.numero,
                quantidade: record.quantidade,
                valorUnitario: record.valorUnitario,
                valorTotal: record.valorTotal,
                percentual: record.percentual,
                tipoParticipacao: {
                    valor: "LIVRE",
                    descricao: "LIVRE"
                },
                material: {
                    id: material.id || 0
                },
                amostra: record.amostra === 'true',
                manufaturado: record.manufaturado === 'true'
            }};
        });

        /*     const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        return  */

        // Helper function to split data into chunks
        const chunkArray = (array, size) => {
            const chunked = [];
            for (let i = 0; i < array.length; i += size) {
                chunked.push(array.slice(i, i + size));
            }
            return chunked;
        };

        // Batch sending of transformed data
        const batchedData = chunkArray(transformedData, 50);
        let report = [];
        let reportIds = [];

        for (const batch of batchedData) {
            try {
                console.log('Enviando o seguinte corpo para a API:', JSON.stringify(batch, null, 2));

                const response = await fetch(`https://compras.betha.cloud/compras-services/api/conversoes/lotes/processos-administrativo-itens`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 601408b2-127b-46dc-9ceb-cfd9b7940808'
                    },
                    body: JSON.stringify(batch)
                });

                const responseBody = await response.json();

                if (response.ok) {
                    console.log('Dados enviados com sucesso para a API.');
                    batch.forEach(record => {
                        report.push({ record, status: 'success', response: responseBody });
                    });
                    if (responseBody.idLote) reportIds.push(responseBody.idLote);
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

        // Save reports to files
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));
        console.log('Relatório salvo em report.json com sucesso.');

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
