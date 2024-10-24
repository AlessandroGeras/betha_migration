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
a.cd_fornecedor as idIntegracao,
JSON_QUERY(
(SELECT
    case 
    WHEN LEN(ds_cgc) < 17 THEN 'FISICA' 
ELSE 'JURIDICA'
    END AS tipo,
    ds_nome as nome,
    JSON_QUERY(
(SELECT
    case a.fl_ProdutorRural
    when 'N' then 'false'
    when 'S' then 'true'
    end as produtorRural,
    case a.fl_INSSFolhaProdutorRural
    when 'N' then 'false'
    when 'S' then 'true'
    end as contribuicaoPrevidenciariaFolha,
    'false' as prestadorServico,
    'false' as contribuicaoReceitaBruta,
    'false' as beneficiarioPagamento,
    JSON_QUERY(
(SELECT
    a.ds_cgc as cnpj
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS juridica
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS credorReinf,
a.DT_CADASTRO as dataInclusao,
1  as id,
case f.cd_Febraban
when 001    then 137
when 104    then 148
when 756    then 51
when 237    then 35
when 033    then 114
when 077	then 74
when 084	then 175
when 097	then 474
when 133    then 483
when 260	then 676
when 341	then 165
when 748	then 50
        end as banco,
case concat(f.nr_agencia,f.dv_agencia)
 when '032719' then 186795
 when '275506' then 186798
 when '27553' then 186799
 when '275500' then 186800
 when '275530' then 186803
 when '3271' then 199486
 when '14060' then 199758
 when '42056' then 199759
 when '01023' then 199760
 when '33065' then 199761
 when '42684'then 199762
 when '11797'then 199763
 when '09512'then 199764
 when '15970' then 199765
 when '34371'then 199766
 when '2757X' then 199767
 when '1401X' then 199768
 when '11819' then 199769
 when '22268' then 199770
 when '19127' then 199771
 when '41483' then 199772
 when '2290X' then 199773
 when '3181X' then 199774
 when '06165' then 199775
 when '45209' then 199776
 when '01325' then 199777
 when '50830' then 199778
 when '11789' then 199779
 when '3231X' then 199780
 when '40053' then 199781
 when '40045' then 199782
 when '1639X' then 199783
 when '10030' then 199784
 when '22926' then 199785
 when '35998' then 199786
 when '76465' then 199787
 when '8087X' then 199788
 when '35084' then 199789
 when '17698' then 199790
 when '15822' then 199791
 when '28428' then 199792
 when '40096' then 199793
 when '14044' then 199794
 when '09016' then 199795
 when '40037' then 199796
 when '1406' then 199797
 when '32921' then 199798
 when '00469' then 199799
 when '42021' then 199800
 when '01970' then 199801
 when '21733' then 199802
 when '2462' then 199803
 when '2492' then 199804
 when '000010' then 199805
 when '0001' then 199806
 when '0035' then 199807
 when '0004' then 199808
 when '0002' then 199809
 when '0012' then 199810
 when '0005' then 199811
 when '0009' then 199812
 when '2848' then 199813
 when '2755' then 199814
 when '0632' then 199815
 when '1824' then 199816
 when '0651' then 199817
 when '2783' then 199818
 when '1823' then 199819
 when '0470' then 199820
 when '3432' then 199821
 when '2278' then 199822
 when '2757X' then 199823
 when '1626' then 199824
 when '4130' then 199825
 when '1630' then 199826
 when '1624' then 199827
 when '0483' then 199828
 when '1486' then 199829
 when '1082' then 199830
 when '0806' then 199831
 when '1237' then 199832
 when '0457' then 199833
 when '0001' then 199834
 when '0288' then 199835
 when '1350' then 199836
 when '0664' then 199837
 when '0500' then 199838
 when '8822' then 199839
 when '0821' then 199840
 when '0217' then 199841
 when '4599' then 199842
 when '3337' then 199843
 when '3273' then 199844
 when '5018' then 199845
 when '0001' then 199846
 when '32711' then 199847
 when '32717' then 199848
 when '32719' then 199849
 when '3069' then 199850
 when '3325' then 199851
 when '40061' then 186794
 when '4619' then 199852
 when '3172' then 199853
end  as agencia,
f.nr_conta  as numero,
f.dv_conta  as digito,
case f.cd_ContaBancariaTipo
when 1    then 'CORRENTE'
   end as Tipo,
'ABERTA' as situacao,
'true' as padrao
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
from CONTFORNECEDORES a
inner join CONTFornecedorContaBancaria f
on f.cd_fornecedor = a.cd_fornecedor
where LEN(a.ds_cgc) > 17
--and a.cd_fornecedor = 4
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            // Parse the JSON content
            const content = JSON.parse(record.content);

            // Verificar se o CNPJ está presente na chave juridica
            let cnpj = content.credorReinf && content.credorReinf.juridica ? content.credorReinf.juridica.cnpj : null;

            // Garantir que o CNPJ tenha 14 caracteres, removendo caracteres não numéricos e o primeiro se houver mais de 14
            if (cnpj) {
                cnpj = cnpj.replace(/\D/g, ''); // Remove caracteres não numéricos
                if (cnpj.length > 14) {
                    cnpj = cnpj.substring(cnpj.length - 14); // Mantém apenas os últimos 14 dígitos
                }
            }

            // Retorna o JSON no formato desejado
            return {
                idIntegracao: record.idIntegracao.toString(), // Convertendo idIntegracao para string
                content: {
                    tipo: content.tipo,
                    nome: content.nome,
                    credorReinf: {
                        produtorRural: content.credorReinf.produtorRural === "true",
                        contribuicaoPrevidenciariaFolha: content.credorReinf.contribuicaoPrevidenciariaFolha === "true",
                        prestadorServico: content.credorReinf.prestadorServico === "true",
                        contribuicaoReceitaBruta: content.credorReinf.contribuicaoReceitaBruta === "true",
                        beneficiarioPagamento: content.credorReinf.beneficiarioPagamento === "true"
                    },
                    juridica: {
                        cnpj: cnpj
                    },
                    dataInclusao: formatDate(content.dataInclusao), // Formata a data no formato AAAA-MM-DD
                    contasBancarias: [
                        {
                            id: content.id, // Convertendo id para string
                            banco: {
                                id: content.banco // Convertendo banco para string
                            },
                            agencia: {
                                id: content.agencia ? content.agencia : "0" // Convertendo agencia para string ou atribuindo '0'
                            },
                            numero: content.numero ? content.numero.toString() : "0", // Convertendo número da conta para string ou atribuindo '0'
                            digito: content.digito ? content.digito.toString() : "0", // Convertendo dígito para string ou atribuindo '0'
                            tipo: content.Tipo,
                            situacao: content.situacao,
                            padrao: content.padrao === "true" // Convertendo booleano
                        }
                    ]
                }
            };
        }).filter(record => record !== null); // Filtrar registros nulos



        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const response = await fetch('https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/credores', {
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
