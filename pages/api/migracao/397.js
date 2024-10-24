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

        // Selecionar o banco de dados "COMP_ALMO"
        const selectDatabaseQuery = 'USE COMP_ALMO';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
JSON_QUERY(
    (SELECT
  case nr_licitacao
  when        1        then 1240881
when        2        then 1240882
when        3        then 1240883
when        4        then 1240884
when        5        then 1240885
when        6        then 1240886
when        7        then 1240887
when        8        then 1240888
when        9        then 1240889
when        10        then 1240890
when        11        then 1240891
  end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS processoAdministrativo,
 ROW_NUMBER() OVER (ORDER BY nr_sequencia)  as numero,
 qt_disponivel as quantidade,
vl_precounitario as valorUnitario,
vl_total as valorTotal,
pc_desconto as percentual,
JSON_QUERY(
    (SELECT
case cd_produto
when        '03.8477'        then        52513617
when        '03.8478'        then        52513618
when        '03.8479'        then        52513619
when        '03.8480'        then        52513620
when        '03.8481'        then        52513621
when        '03.8482'        then        52513622
when        '03.8483'        then        52513623
when        '03.8484'        then        52513624
when        '03.8485'        then        52513625
when        '03.8537'        then        52513679
when        '03.8538'        then        52513680
when        '03.8539'        then        52513681
when        '03.8540'        then        52513682
when        '03.8541'        then        52513683
when        '03.8542'        then        52513684
when        '03.8543'        then        52513685
when        '03.8544'        then        52513686
when        '03.8545'        then        52513687
when        '03.8546'        then        52513688
when        '03.8574'        then        52513716
when        '03.8748'        then        52513887
when        '03.8749'        then        52513888
when        '03.8750'        then        52513889
when        '03.8751'        then        52513890
when        '03.8752'        then        52513891
when        '03.8753'        then        52513892
when        '03.8754'        then        52513893
when        '03.8755'        then        52513894
when        '03.8756'        then        52513896
when        '03.8757'        then        52513897
when        '03.8758'        then        52513898
when        '03.8759'        then        52513899
when        '03.8760'        then        52513900
when        '03.8761'        then        52513901
when        '11.0500'        then        52516510
when        '11.0501'        then        52516511
when        '11.0502'        then        52516512
when        '11.0503'        then        52516513
when        '11.0504'        then        52516514
when        '11.0505'        then        52516515
when        '11.0506'        then        52516516
when        '11.0507'        then        52516517
when        '11.0510'        then        52516520
when        '11.0511'        then        52516521
when        '11.0512'        then        52516522
when        '11.0513'        then        52516523
when        '11.0514'        then        52516524
when        '11.0515'        then        52516525
when        '11.0516'        then        52516526
when        '11.0517'        then        52516527
when        '11.0518'        then        52516528
when        '11.0519'        then        52516529
when        '11.0520'        then        52516530
when        '11.0521'        then        52516531
when        '11.0522'        then        52516532
when        '11.0523'        then        52516533
when        '11.0524'        then        52516534
when        '11.0525'        then        52516535
when        '11.0526'        then        52516536
when        '11.0527'        then        52516537
when        '11.0528'        then        52516538
when        '11.0529'        then        52516539
when        '11.0530'        then        52516540
when        '11.0531'        then        52516541
when        '11.0532'        then        52516542
end as id
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS material,
JSON_QUERY(
    (SELECT
   'LIVRE' as valor,
   'LIVRE' as descricao
 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS tipoParticipacao
from COMPLicitacaoFornecedoresItens 
where aa_licitacao = 2024
        `;

        const result = await masterConnection.query(userQuery);

        const resultData = result.recordset;

        const transformedData = resultData.map(record => {
            return {
                conteudo:{
                processoAdministrativo: JSON.parse(record.processoAdministrativo),
                numero: record.numero,
                quantidade: record.quantidade,
                valorUnitario: record.valorUnitario,
                valorTotal: record.valorTotal, 
                percentual: record.percentual,
                tipoParticipacao: JSON.parse(record.tipoParticipacao),
                material: JSON.parse(record.material),
                amostra: false,
                manufaturado: false
            }};
        });

        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar cada registro individualmente para a rota desejada
         // Armazenar as respostas do servidor
         const serverResponses = [];

         // Enviar cada registro individualmente para a rota desejada
         /* for (const record of transformedData) {
             const url = `https://compras.betha.cloud/compras-services/api/conversoes/lotes/processos-administrativo-itens`;
             const response = await fetch(url, {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json',
                     'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                 },
                 body: JSON.stringify(record)
             });
 
             const responseBody = await response.json();
             serverResponses.push({
                 url: url,
                 status: response.status,
                 statusText: response.statusText,
                 responseBody: responseBody
             });
 
             if (response.ok) {
                 console.log(`Dados do registro enviados com sucesso para ${url}.`);
             } else {
                 console.error(`Erro ao enviar os dados do registro para ${url}:`, response.statusText);
             }
         } */

         //fs.writeFileSync('log_bens.json', JSON.stringify(serverResponses, null, 2));
         //console.log('Respostas do servidor salvas em log_bens.json');

    } catch (error) {
        // Lidar com erros de conexão ou consulta aqui
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        await sql.close();
    }
}

// Chamar a função principal
main();
