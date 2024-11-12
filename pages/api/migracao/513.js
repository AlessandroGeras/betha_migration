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
JSON_QUERY((SELECT case
                                 when ds_taxa = 'ADALBERTO AMARAL DE BRITO MULTA' then 201826
 when ds_taxa = 'ADIR IGNACIO LIMA ' then 201784
 when ds_taxa = ' ADIR IGNÁCIO LIMA - MULTA -  INSC. ' then 201801
 when ds_taxa = 'APRENÇÃO DE ANIMAL POR CABEÇA E  POR DIA' then 201858
 when ds_taxa = 'ARISTOTENES FELIX GARCEZ FILHO CERT 0059/22/TCE-RO' then 201828
 when ds_taxa = 'BAIXAS DIVERSAS' then 201778
 when ds_taxa = 'CARLOS GOMES ROBERTO SERAFIM. CERT. 000557/22/ TCE-RO' then 201788
 when ds_taxa = 'CARTA DE EXCLUSIVIDADE' then 201779
 when ds_taxa = 'CERTIDAO DE CONCLUSAO DE OBRAS' then 201785
 when ds_taxa = 'CERTIDAO DE INICIO DE OBRA' then 201882
 when ds_taxa = 'CERTIDAO NEGATIVA' then 201766
 when ds_taxa = 'CONSTRUÇÃO DE MAUSOLEU INFANTIL' then 201838
 when ds_taxa = 'CONTROLE E FISCALIZAÇÃO AMBIENTAL' then 201883
 when ds_taxa = 'CONTROL FISCAL AMBIENTAL ' then 201862
 when ds_taxa = 'DENILSON MIRANDA BARBOSA CERT 00561/22/ TCE -RO ' then 201789
 when ds_taxa = 'DVANT - CARLO ROBERTO. . 557/22/-TCE' then 183468
 when ds_taxa = 'DVANT - DENILSON MIRAN. . 561/22/-TCE' then 183471
 when ds_taxa = 'DVANT - MARCONDES DE CAR. CERT. 554/22/T' then 183479
 when ds_taxa = 'DVANT - MARCONDES DE CARV . 0049/23/-TCE' then 183473
 when ds_taxa = 'DVANT MULTA MARCILEY DE CARVALHO INSC. C' then 183478
 when ds_taxa = 'DVANT MULTA PAULO CESAR' then 183420
 when ds_taxa = 'DVANT - NELSON PEREIRA  . 560/22/-TCE' then 183470
 when ds_taxa = 'DVANT - OSMAR BATIS. 562/22/-TCE' then 183472
 when ds_taxa = 'DVANT PAULO CESAR BEZERRA ' then 201825
 when ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  866/19' then 201861
 when ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  867/19' then 201824
 when ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  868/19' then 201880
 when ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  869/19' then 201823
 when ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  870/19' then 201842
 when ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  871/19' then 201799
 when ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  872/19' then 201783
 when ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  873/19' then 201798
 when ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  874/19' then 201822
 when ds_taxa = 'DVANT- PAULO CESAR BEZERRA- PROC  876/19' then 201840
 when ds_taxa = 'DVANT - RENIVALDO BEZERRA . 558/22/-TCE' then 183469
 when ds_taxa = 'DVANT - RENIVALDO RAASCH . 556/22/-TCE' then 183467
 when ds_taxa = 'HORARIO ESPECIAL' then 201819
 when ds_taxa = 'IMPOSTO SOBRE SERVIÇOS DE QUALQUER NATUREZA - ISSQ' then 181513
 when ds_taxa = 'IMPOSTO SOBRE SERVIÇOS FIXO' then 196717
 when ds_taxa = 'IMPOSTOS SOBRE TRANSMISSÃO INTER VIVOS DE BENS IMÓ' then 181422
 when ds_taxa = 'IMPOSTOS SOBRE TRANSMISSÃO INTER VIVOS DE BENS IMÓVEIS' then 195377
 when ds_taxa = 'INDENIZAÇÃO E RESTITUIÇÃO' then 201780
 when ds_taxa = 'IPTU' then 184597
 when ds_taxa = 'IRPJ PESSOA JURIDICA' then 183475
 when ds_taxa = 'IRPJ PESSOA JURIDICA ' then 201865
 when ds_taxa = 'IRRF-OUTROS RENDIMENTOS' then 201877
 when ds_taxa = 'IRRF - RENDIMENTO DO TRABALHO' then 201879
 when ds_taxa = 'IRRF RETIDO NA FINTE PESSOA FISICA' then 183465
 when ds_taxa = 'IRRF RETIDO NA FONTE PESSOA JURIDICA' then 183466
 when ds_taxa = 'IRR PESSOA FISICA' then 183474
 when ds_taxa = 'IRR PESSOA FISICA ' then 201803
 when ds_taxa = 'ITBI' then 201857
 when ds_taxa = 'I.T.B.I.' then 201769
 when ds_taxa = 'MARCILEY DE CARVALHO CERT. 000555/2022/TCE-RO - PROC. 1775/2023' then 201885
 when ds_taxa = 'MARCONDES DE CARVALHO CERT. 00049/23/TCE-RO- PROC. 1553/2023' then 201884
 when ds_taxa = 'MARCONDES DE CARVALHO CERT. 000554/22/TCE-RO' then 201830
 when ds_taxa = 'MULTA EDSON ANDRIOLI DOS SANTOS' then 201802
 when ds_taxa = 'MULTA JUNIO CARDOSO DE FIGUEIREDO ' then 201864
 when ds_taxa = 'NELSON PEREIRA NUNES JUNIOR. CERT. 00056' then 183477
 when ds_taxa = 'NELSON PEREIRA NUNES JUNIOR. CERT. 000560/22/ TCE-RO' then 201827
 when ds_taxa = 'OSMAR BASTITA PENHA CERT 00562/22/TCE-RO ' then 201804
 when ds_taxa = 'OSMAR BATISTA PENHA CERT. 00562/22-TCE - PROC. 1774-2023' then 201829
 when ds_taxa = 'OUTRAS RECEITAS ' then 201821
 when ds_taxa = 'PAULO CESAR BEZERRA ' then 201786
 when ds_taxa = 'RECEITA DIVERSA' then 195177
 when ds_taxa = 'RENIVALDO BEZERRA . CERT. 00558/22/TCE-RO' then 201847
 when ds_taxa = 'RENIVALDO RAASCH. CERT. 000556/22/ TCE-RO' then 201787
 when ds_taxa = 'RESTITUIÇÃO DE CONVÊNIOS' then 201845
 when ds_taxa = 'RESTITUIÇÃO DE VAL.JUDICIAL ALEXANDRE' then 201800
 when ds_taxa = 'RESTITUIÇÕES DE VALORES DE DIARIAS ' then 201881
 when ds_taxa = 'TAXA CAMINHAO CAÇAMBA TRUCADO ' then 201781
 when ds_taxa = 'TAXA CAMINHAO CAÇAMBRA TRAÇADO VW' then 201839
 when ds_taxa = 'TAXA CEMITERIO CRIANÇA' then 201761
 when ds_taxa = 'TAXA DE ATERRO' then 201770
 when ds_taxa = 'TAXA DE CADASTRO' then 201777
 when ds_taxa = 'TAXA DE CEMITERIO ADULTO' then 201757
 when ds_taxa = 'TAXA DE CERTIDAO NEGATIVA' then 201767
 when ds_taxa = 'TAXA DE COLETA DE LIXO' then 195877
 when ds_taxa = 'TAXA DE EDITAL' then 201859
 when ds_taxa = 'TAXA DE EXPEDIENTE' then 201765
 when ds_taxa = 'TAXA DE FISCALIZAÇAO E FUNCIONAMENTO' then 201837
 when ds_taxa = 'TAXA DE FISCALIZAÇÃO PARA FUNCIONAMENTO' then 195977
 when ds_taxa = 'TAXA DE HABITE-SE' then 201844
 when ds_taxa = 'TAXA DE HORA MAQUINA' then 201768
 when ds_taxa = 'TAXA DE PUBLICIDADE' then 201817
 when ds_taxa = 'TAXA DE VALOR EXCEDENTE ' then 201846
 when ds_taxa = 'TAXA  DVAT NAO TRIB.JOSE COUTINHO' then 201820
 when ds_taxa = 'TAXA FISCALIZAÇÃO SANITARIA' then 201763
 when ds_taxa = 'TAXA FORNECIMENTO DE 2.ªVIA' then 201762
 when ds_taxa = 'TAXA FUNCIONAMENTO HORARIO ESPECIAL' then 196117
 when ds_taxa = 'TAXA HORA MAQUINA RETRO ESCAVA ' then 201860
 when ds_taxa = 'TAXA HORA MAQUINA TRATOR ' then 201782
 when ds_taxa = 'TAXA HORARIO ESPECIAL' then 183480
 when ds_taxa = 'TAXA HORARIO ESPECIAL ' then 201831
 when ds_taxa = 'TAXA P/CIRCOS,PARQUES E SIMILIARES' then 201764
 when ds_taxa = 'TAXA P/IMPRESSÃO DOC. FISCAIS' then 201760
 when ds_taxa = 'TAXA REALIZAÇÃO DE EVENTOS' then 201759
 when ds_taxa = 'TAXAS AVULSAS' then 183476
 when ds_taxa = 'Transferencia de contratos, por unidade' then 201818
 when ds_taxa = 'TX LIC. P/ OCUPAÇÃO DAS VIAS E LOGRA.  PUBLIC' then 201797
 when ds_taxa = 'VALORES DE MULTAS E JUROS' then 201758

                                        end as idCreditoTributario, 
                                   77020506 as idPessoa,
                                   ds_taxa as descricaoServico,
                                   '2005-01-01' as dtReceitaDiversa FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS receitasDiversas
from ISSPrecoPublico
`;
        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            console.log(record);
        
            // Parse JSON string for receitasDiversas
            const receitasDiversas = JSON.parse(record.receitasDiversas);
        
            return {
                idIntegracao: record.idIntegracao.toString(),
                receitasDiversas: {
                    idCreditoTributario: receitasDiversas.idCreditoTributario,
                    idPessoa: receitasDiversas.idPessoa,
                    descricaoServico: receitasDiversas.descricaoServico,
                    dtReceitaDiversa: receitasDiversas.dtReceitaDiversa
                }
            };
        });

        /* const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        } */
        
        let report = [];
        let reportIds = [];
        
        for (const record of transformedData) {
            const idIntegracao = record.idIntegracao;
        
            if (idIntegracao) {
                try {
                    const requestBody = [record];
        
                    console.log('Enviando o seguinte corpo para a API:', JSON.stringify(requestBody, null, 2));
        
                    const response = await fetch(`https://tributos.betha.cloud/service-layer-tributos/api/receitasDiversas`, {
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