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
cd_taxa as idIntegracao,
JSON_QUERY((SELECT cd_taxa as ordemApresentacao, 
                                        case
                                                when ds_taxa = 'Geral' then 398160
 when ds_taxa = 'TAXAS DIVERSAS' then 405820
 when ds_taxa = 'HORA MAQUINA' then 411130
 when ds_taxa = 'CERTIDAO DE INICIO DE OBRAS' then 411140
 when ds_taxa = 'Geral' then 410960
 when ds_taxa = 'BAIXAS DIVERSAS' then 411570
 when ds_taxa = 'TX LIC. P/ OCUPAÇÃO DAS VIAS E LOGRA.  PUBLIC' then 411571
 when ds_taxa = 'Transferencia de contratos, por unidade' then 411572
 when ds_taxa = 'ITBI' then 411573
 when ds_taxa = 'HORARIO ESPECIAL' then 411574
 when ds_taxa = 'TAXA CAMINHAO CAÇAMBA TRUCADO ' then 411575
 when ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  876/19' then 411576
 when ds_taxa = 'TAXA DE FISCALIZAÇAO E FUNCIONAMENTO' then 411577
 when ds_taxa = 'TAXA DE CADASTRO' then 411578
 when ds_taxa = 'TAXA DE PUBLICIDADE' then 411579
 when ds_taxa = 'INDENIZAÇÃO E RESTITUIÇÃO' then 411580
 when ds_taxa = 'TAXA HORA MAQUINA TRATOR ' then 411581
 when ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  08' then 411582
 when ds_taxa = 'TAXA DE EDITAL' then 411583
 when ds_taxa = 'TAXA HORA MAQUINA RETRO ESCAVA ' then 411584
 when ds_taxa = 'CONSTRUÇÃO DE MAUSOLEU INFANTIL' then 411585
 when ds_taxa = 'OUTRAS RECEITAS ' then 411586
 when ds_taxa = 'IRRF-OUTROS RENDIMENTOS' then 411587
 when ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  871/19' then 411588
 when ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  869/19' then 411589
 when ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  868/19' then 411590
 when ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  866/19' then 411591
 when ds_taxa = 'RESTITUIÇÃO DE VAL.JUDICIAL ALEXANDRE' then 411592
 when ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  867/19' then 411593
 when ds_taxa = 'CARTA DE EXCLUSIVIDADE' then 411594
 when ds_taxa = 'TAXA CAMINHAO CAÇAMBRA TRAÇADO VW' then 411595
 when ds_taxa = 'TAXA HORA MAQUINA MOTO NIVELADORA' then 411596
 when ds_taxa = 'ADALBERTO AMARAL DE BRITO MULTA' then 411597
 when ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  870/19' then 411598
 when ds_taxa = 'TAXA  DVAT NAO TRIB.JOSE COUTINHO' then 411599
 when ds_taxa = 'RESTITUIÇÕES DE VALORES DE DIARIAS ' then 411600
 when ds_taxa = 'IRRF - RENDIMENTO DO TRABALHO' then 411601
 when ds_taxa = 'RESTITUIÇÃO DE CONVÊNIOS' then 411602
 when ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  872/19' then 411603
 when ds_taxa = 'CONTROL FISCAL AMBIENTAL ' then 411604
 when ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  874/19' then 411605
 when ds_taxa = ' ADIR IGNÁCIO LIMA - MULTA -  INSC. ' then 411606
 when ds_taxa = 'CERTIDAO DE INICIO DE OBRA' then 411607
 when ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  873/19' then 411608
 when ds_taxa = 'PAULO CESAR BEZERRA ' then 411609
 when ds_taxa = 'DVANT PAULO CESAR BEZERRA ' then 411610
 when ds_taxa = 'APRENÇÃO DE ANIMAL POR CABEÇA E  POR DIA' then 411611
 when ds_taxa = 'CERTIDAO DE CONCLUSAO DE OBRAS' then 411612
 when ds_taxa = 'IRPJ PESSOA JURIDICA ' then 411613
 when ds_taxa = 'TAXA DE LICENÇA DE EXECUÇÃO DE OBRAS' then 411614
 when ds_taxa = 'IRR PESSOA FISICA ' then 411615
 when ds_taxa = 'TAXA DE HABITE-SE' then 411616
 when ds_taxa = ' EXPEDIÇÃO DE TÍTULO ONEROSO URBANO' then 411617
 when ds_taxa = 'MARCONDES DE CARVALHO CERT. 000554/22/TCE-RO' then 411619
 when ds_taxa = 'TAXA DE VALOR EXCEDENTE ' then 411620
 when ds_taxa = 'OSMAR BASTITA PENHA CERT 00562/22/TCE-RO ' then 411621
 when ds_taxa = 'MULTA JUNIO CARDOSO DE FIGUEIREDO ' then 411622
 when ds_taxa = 'ADIR IGNACIO LIMA ' then 411623
 when ds_taxa = 'MULTA EDSON ANDRIOLI DOS SANTOS' then 411624
 when ds_taxa = 'RENIVALDO RAASCH. CERT. 000556/22/ TCE-RO' then 411625
 when ds_taxa = 'TAXA HORARIO ESPECIAL ' then 411627
 when ds_taxa = 'RENIVALDO BEZERRA . CERT. 00558/22/TCE-RO' then 411628
 when ds_taxa = 'DENILSON MIRANDA BARBOSA CERT 00561/22/ TCE -RO ' then 411629
 when ds_taxa = 'CONTROLE E FISCALIZAÇÃO AMBIENTAL' then 411630
 when ds_taxa = 'ARISTOTENES FELIX GARCEZ FILHO CERT 0059/22/TCE-RO' then 411631
 when ds_taxa = 'TAXA DE CEMITERIO ADULTO' then 411635
 when ds_taxa = 'TAXA FISCALIZAÇÃO SANITARIA' then 411636
 when ds_taxa = 'TAXA P/IMPRESSÃO DOC. FISCAIS' then 411637
 when ds_taxa = 'CERTIDAO NEGATIVA' then 411638
 when ds_taxa = 'TAXA REALIZAÇÃO DE EVENTOS' then 411639
 when ds_taxa = 'TAXA FORNECIMENTO DE 2.ªVIA' then 411640
 when ds_taxa = 'TAXA P/CIRCOS,PARQUES E SIMILIARES' then 411641
 when ds_taxa = 'TAXA DE HORA MAQUINA' then 411642
 when ds_taxa = 'TAXA DE ATERRO' then 411650
 when ds_taxa = 'TAXA DE CERTIDAO NEGATIVA' then 411651
 when ds_taxa = 'VALORES DE MULTAS E JUROS' then 411652
 when ds_taxa = 'TAXA DE EXPEDIENTE' then 411660
 when ds_taxa = 'TAXA CEMITERIO CRIANÇA' then 411670


                                        end as idAgrupamentos,
                                        1261789 as idCamposAdicionais FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS agrupamentosCamposAdicionais
from ISStaxas where ds_taxa != 'I.T.B.I.' and ds_taxa != 'TAXA DE CEMITERIO ADULTO' and ds_taxa != 'TAXA DE EXPEDIENTE' and ds_taxa != 'FISCALIZAÇÃO SANITÁRIA' and ds_taxa != 'AUT. IMPRESSÃO DOCUMENTOS FISCAIS' and ds_taxa != 'CERTIDÃO NEGATIVA' and ds_taxa != 'FORNECIMENTO DE 2ª VIA' and ds_taxa != 'TAXA DE HORA MAQUINA' and ds_taxa != 'VALORES DE JUROS E MULTAS' and ds_taxa != 'ITBI' and ds_taxa != 'IRRF-OUTROS RENDIMENTOS'
`;
        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const agrupamentosCamposAdicionais = JSON.parse(record.agrupamentosCamposAdicionais);
        
            return {
                idIntegracao: record.idIntegracao.toString(),
                agrupamentosCamposAdicionais: {
                    ordemApresentacao: agrupamentosCamposAdicionais.ordemApresentacao,
                    idAgrupamentos: agrupamentosCamposAdicionais.idAgrupamentos,
                    idCamposAdicionais: agrupamentosCamposAdicionais.idCamposAdicionais
                }
            };
        });
        
        let report = [];
        let reportIds = [];
        
        for (const record of transformedData) {
            const idIntegracao = record.idIntegracao;
        
            if (idIntegracao) {
                try {
                    const requestBody = [record];
        
                    console.log('Enviando o seguinte corpo para a API:', JSON.stringify(requestBody, null, 2));
        
                    const response = await fetch(`https://tributos.betha.cloud/service-layer-tributos/api/agrupamentosCamposAdicionais`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                        },
                        body: JSON.stringify(requestBody)
                    });
        
                    const responseBody = await response.json();
        
                    if (response.ok) {
                        console.log('Dados enviados com sucesso para a API.');
                        report.push({ record, status: 'success', response: responseBody });
        
                        if (responseBody.idLote) {
                            reportIds.push(responseBody.idLote);
                        }
                    } else {
                        console.error('Erro ao enviar os dados para a API:', response.statusText);
                        report.push({ record, status: 'failed', response: responseBody });
                    }
        
                } catch (err) {
                    console.error('Erro ao enviar o registro para a API:', err);
                    report.push({ record, status: 'error', error: err.message });
                }
            } else {
                console.warn('ID de integração inválido. O registro será ignorado.', record);
                report.push({ record, status: 'invalid', error: 'ID de integração inválido.' });
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
        await sql.close(); // Fechar a conexão com o SQL Server
        console.log('Conexão com o SQL Server fechada.');
    }
}

// Executar a função principal
main();