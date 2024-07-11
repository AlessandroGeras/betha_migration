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

        // Selecionar o banco de dados "TRIBUTOS2024"
        const selectDatabaseQuery = 'USE TRIBUTOS2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            SELECT 
ROW_NUMBER() OVER (ORDER BY cd_tributo) AS idIntegracao,
JSON_QUERY(
    (SELECT
  ds_Tributo as descricao,
  case ds_tributo
          WHEN  'IMPOSTO PREDIAL' THEN 'IP'
        WHEN  'TAXA DE EXPEDIENTE' THEN 'TE'
        WHEN  'DVAT - IMPOSTO PREDIAL' THEN 'DI'
        WHEN  'DVAT - TAXA EXPEDIENTE' THEN 'DE'
        WHEN  'TAXA DE CEMITÉRIO ADULTO' THEN 'CA'
        WHEN  'ISS FIXO' THEN 'IF'
        WHEN  'JUROS' THEN 'JU'
        WHEN  'IMPOSTO VARIÁVEL' THEN 'IV'
        WHEN  'TAXA DE LICENÇA' THEN 'TL'
        WHEN  'IMPOSTO DE ITBI' THEN 'IT'
        WHEN  'IMPOSTO TERRITORIAL' THEN 'IT'
        WHEN  'TARIFA BANCARIA' THEN 'TB'
        WHEN  'DVAT - IMPOSTO TERRITORIAL' THEN 'DT'
        WHEN  'DVAT - MULTA TAXA' THEN 'DM'
        WHEN  'TAXA CEMITÉRIO CRIANÇA' THEN 'CC'
        WHEN  'ESTIMATIVA' THEN 'ES'
        WHEN  'MULTA' THEN 'MU'
        WHEN  'TAXA ADMINISTRATIVA' THEN 'TA'
        WHEN  'DVAT - MULTA' THEN 'DM'
        WHEN  'DVAT - JUROS TAXA' THEN 'DJ'
        WHEN  'VERIF DE POSSE E CADASTRO POR IMÓVEL' THEN 'VP'
        WHEN  'ATUALIZAÇÃO / CORREÇÃO' THEN 'AC'
        WHEN  'TAXA DE COLETA DE LIXO' THEN 'TL'
        WHEN  'DVAT - JUROS' THEN 'DJ'
        WHEN  'DVAT - CORRECAO' THEN 'DC'
        WHEN  'DVAT - CUSTAS JUDICIAIS' THEN 'CJ'
        WHEN  'TAXA DE FISCALIZAÇÃO SANITÁRIA' THEN 'FS'
        WHEN  'TAXA DE FISCALIZAÇÃO E FUNCIONAMENTO' THEN 'FF'
        WHEN  'DVAT - ACRESCIMOS' THEN 'DA'
        WHEN  'DVAT - HONORARIOS' THEN 'DH'
        WHEN  'TAXA DE PUBLICIDADE' THEN 'TP'
        WHEN  'EVENTUAL' THEN 'EV'
        WHEN  'TRANSFERENCIA DE CONTRATO' THEN 'TC'
        WHEN  'ISS ELETRONICO' THEN 'IE'
        WHEN  'TAXA DE CADASTRO' THEN 'TC'
        WHEN  'BAIXAS DIVERSAS' THEN 'BD'
        WHEN  'DVANT ADIR IGNÁCIO LIMA INSC. CERT. DEC' THEN 'DA'
        WHEN  'FISCALIZAÇÃO SANITÁRIA' THEN 'FS'
        WHEN  'AUTORIZAÇÃO DE IMP. DE DOC. FISCAIS' THEN 'AI'
        WHEN  'CERTIDÃO E AUTENTICAÇÃO' THEN 'CA'
        WHEN  'CERTIDÃO NARRATIVA' THEN 'CN'
        WHEN  'TX FISC. LICE.P/ OCUP. SOLO NAS VIAS E L' THEN 'TF'
        WHEN  'REALIZAÇÃO DE EVENTOS E FESTEJOS' THEN 'RE'
        WHEN  'ITBI' THEN 'IT'
        WHEN  'FORNECIMENTO DE 2ª VIA' THEN 'FV'
        WHEN  'IRRF- SOBRE OUTROS RENDIMENTOS' THEN 'IR'
        WHEN  'LICENÇA EXECUÇÃO DE OBRAS PARTICULARES' THEN 'LO'
        WHEN  'CIRCOS, PARQUES DE DIVERSÃO E SIMILARES' THEN 'CP'
        WHEN  'TAXA HORA MÁQUINA' THEN 'TH'
        WHEN  'TRANSFERENCIA DE CONTRATO, POR UNIDADE' THEN 'TU'
        WHEN  'CARTA DE EXCLUSIVIDADE' THEN 'CE'
        WHEN  'APREENSAO DE ANIMAL POR CABEÇA POR DIA' THEN 'AA'
        WHEN  'AUT. PARA CONSTRUÇÃO MAUSOLEU ADULTO' THEN 'AC'
        WHEN  'CERTIDÃO NEGATIVA DE DÉBITOS' THEN 'CD'
        WHEN  'HORARIO ESPECIAL' THEN 'HE'
        WHEN  'AUTORIZAÇÃO P/ CONSTRUÇÃO MAUSOLEU CRIA' THEN 'AM'
        WHEN  'I.R.R.F. -RENDIMENTO DO TRABALHO' THEN 'RT'
        WHEN  'AUT. CONSTRUÇÃO MAUSOLEU INFANTIL' THEN 'AI'
        WHEN  'AUT. DE IMPRESSÃO DE DOCUMENTOS FISCAIS' THEN 'ID'
        WHEN  'FORNECIMENTO COPIA COD. TRIB. MUN. POR E' THEN 'FC'
        WHEN  'RESTITUIÇÃO' THEN 'RS'
        WHEN  'INDENIZAÇÃO' THEN 'IN'
        WHEN  'TARIFA BANCÁRIA' THEN 'TB'
        WHEN  'TAXA DE CERTIDÃO NEGATIVA' THEN 'TC'
        WHEN  'TAXA DE CONTROLE DE FISCAL AMBI. PRIN' THEN 'CF'
        WHEN  'TAXA DE EDITAL' THEN 'TE'
        WHEN  'CERTIDÃO DE INICIO DE OBRA' THEN 'CI'
        WHEN  'TAXA CAMINHAO CAÇAMBA TRUCADO' THEN 'CT'
        WHEN  'TAXA CAMINHÃO CAÇAMBA TRAÇADO' THEN 'CT'
        WHEN  'TAXA HORA MAQUINA SEMAGRI' THEN 'TH'
        WHEN  'TAXA RETRO ESCAVADEIRA' THEN 'TR'
        WHEN  'TAXA HORAS MOTO NIVELADORA' THEN 'TN'
        WHEN  'OUTRAS RECEITAS' THEN 'OR'
        WHEN  'IRRF- RENDIMENTO DO TRABALHO' THEN 'RT'
        WHEN  'DVANT- PAULO CESAR BEZERRA' THEN 'DP'
        WHEN  'RESTITUIÇÕES DE VALORES DE DIARIAS' THEN 'RD'
        WHEN  'DVANT MARCONDES DE CARVALHO INS CERT TCE' THEN 'DM'
        WHEN  'DVANT CARLOS ROBERTO SERAFIM SOUZA INSC.' THEN 'DS'
        WHEN  'DVANT RENIVALDO RAASCH INSC.CERT. DEC. T' THEN 'DR'
        WHEN  'DVANT CARLOS EDUARDO BARRETO ACCIOLY INS' THEN 'DB'
        WHEN  'DVANT ARISTOTELES FELIX GARCEZ FILHO INS' THEN 'DG'
        WHEN  'DVANT ADALBERTO AMARAL DE BRITO - MULT' THEN 'DA'
        WHEN  'TAXA DE EXPEDIÇÃO DE TÍTULO ONEROSO URBA' THEN 'TO'
        WHEN  'DVANT MULTA EDSON ANDRIOLI' THEN 'DM'
        WHEN  'DVANT MULTA JUNIO CARDOSO' THEN 'DJ'
        WHEN  'TAXA DE CERTIDAO DE INCIO DE OBRAS' THEN 'TC'
        WHEN  'CERTIDÃO DE CONCLUSÃO DE OBRA' THEN 'CC'
        WHEN  'TX DE FISCALIZAÇÃO DA QUALIDADE DA ÁGUA' THEN 'TQ'
        WHEN  'TAXA DE LICENCIAMENTO AMBIENTAL' THEN 'LA'
        WHEN  'VAOR EXCEDENTE' THEN 'VE'
        WHEN  'DVANT MULTA PAULO CÉSAR BEZERRA INSC. CE' THEN 'DP'
        WHEN  'DVANT - RENIVALDO RAASCH . 556/22/-TCE' THEN 'DR'
        WHEN  'DVANT - CARLO ROBERTO. . 557/22/-TCE' THEN 'DC'
        WHEN  'DVANT - NELSON PEREIRA . 560/22/-TCE' THEN 'DN'
        WHEN  'DVANT - OSMAR BATIS. 562/22/-TCE' THEN 'DO'
        WHEN  'DVANT - MARCONDES DE CARV . 0049/23/-TCE' THEN 'DM'
        WHEN  'IRPJ PESSOA JURIDICA' THEN 'IJ'
        WHEN  'DVANT MULTA MARCILEY DE CARVALHO INSC. C' THEN 'DM'
        WHEN  'TAXA HORARIO ESPECIAL' THEN 'TH'
                else 'OT'
  end as abreviatura,
  'NAO' AS calculaImoveisRurais,
  'SIM' AS emUso,
  'NAO' AS flyProtocolo,
  '49162'as idIndexadores,
  'CONTRIBUINTE' as tipoCadastro
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS creditosTributarios
FROM CECAMTRIBUTOS
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            if (!record.creditosTributarios) {
                console.error('Record without creditosTributarios:', record);
                return null;
            }
            
            const creditosTributarios = JSON.parse(record.creditosTributarios);

            return {
                idIntegracao: record.idIntegracao.toString(), // Convert idIntegracao to string
                creditosTributarios: {
                    idIndexadores: creditosTributarios.idIndexadores,
                    abreviatura: creditosTributarios.abreviatura,
                    descricao: creditosTributarios.descricao,
                    calculaImoveisRurais: creditosTributarios.calculaImoveisRurais,
                    emUso: creditosTributarios.emUso,
                    flyProtocolo: creditosTributarios.flyProtocolo,
                    tipoCadastro: creditosTributarios.tipoCadastro,
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
        for (const record of transformedData) {
            const response = await fetch('https://tributos.betha.cloud/service-layer-tributos/api/creditosTributarios', {
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
        }

    } catch (error) {
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        sql.close();
    }
}

main();
