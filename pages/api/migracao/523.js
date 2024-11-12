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
			},
			requestTimeout: 600000
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
}

function formatDate2(date) {
	const d = new Date(date);
	const year = d.getFullYear();
	const month = (`0${d.getMonth() + 1}`).slice(-2);
	const day = (`0${d.getDate()}`).slice(-2);
	const hours = (`0${d.getHours()}`).slice(-2);
	const minutes = (`0${d.getMinutes()}`).slice(-2);
	const seconds = (`0${d.getSeconds()}`).slice(-2);
	return `${year}`;
}

async function main() {
	try {
		// Conectar ao SQL Server
		const masterConnection = await connectToSqlServer();

		// Selecionar o banco de dados "COMP_ALMO_CAM"
		const selectDatabaseQuery = 'USE COMP_ALMO_CAM';
		await masterConnection.query(selectDatabaseQuery);

		// Executar a consulta SQL
		const userQuery = `
            	select 
	ROW_NUMBER() OVER (ORDER BY nr_sequencia) AS id,
JSON_QUERY((SELECT CASE nr_docto
when	37	then	13132960
when	1006	then	13132961
when	1053	then	13132962
when	4844	then	13132963
when	33	then	13132964
when	4982	then	13132965
						END AS  id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS entrada,
	JSON_QUERY((SELECT CASE
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'AÇÚCAR CRISTAL, PACOTE DE 02KG  ' then 56208591
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'ÁGUA MINERAL NATURAL DE 500ML C/12 UNIDADES' then 56208592
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'BISCOITO, SABOR ÁGUA E SAL 400G  ' then 56208593
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'AÇUCAR CRISTAL DE 02 KG' then 56208594
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'CAFÉ EM PÓ DE 500G' then 56208596
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'BISCOITO ÁGUA E SAL 400G' then 56208597
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'GÁS DE COZINHA P-13  ' then 56208600
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'PANO PARA SECAR LOUÇA, EM TECIDO DE ALGODÃO  ' then 56208601
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'DETERGENTE, DE 500 ML  ' then 56208602
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'TOALHA DE PAPEL, PACOTE COM 02 ROLOS  ' then 56208603
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'ESPONJA PARA LAVAR LOUÇA, DUPLA FACE   ' then 56208605
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'ÁGUA MINERAL NATURAL-SEM GÁS, 12 UNIDADES NO FARDO DE 500ML  ' then 56208606
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'BISCOITO, SABOR DE COCE 400G  ' then 56208609
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'ÁGUA SANITÁRIA, 01 LITRO  ' then 56208610
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'COPO DESCART. 180ML C/25 PCT CONTENDO 100 UNIDADES CADA' then 56208611
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'CAFÉ EM PÓ, PACOTES DE 500G  ' then 56208617
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'COADOR DE CAFÉ EM TECIDO, MEDINDO TAMANHO GRANDE  ' then 56208619
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'COPO DESCARTÁVEL 180 ML, CAIXA COM 25 PACOTES CONTENDO 100 UNIDADES EM CADA PACOTE  ' then 56208620
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'PACOTE DE GUARDANAPODE PAPEL, MEDINDO 21,5CM X 22CM, COM 50 UNIDADE CADA PACOTES  ' then 56208621
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'VASSOURA DE PALHA  ' then 56208622
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'SACO PARA LIXO, CAPACIDADE DE 50 LITROS, CONTENDO 10 UNIDADES EM CADA PACOTE  ' then 56208623
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'COPO DESCART. 50ML C/25 PCT CONTENDO 100 UNIDADES CADA' then 56208625
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'DESINFETANTE, 01 LITRO  ' then 56208626
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'BISCOITO DOCE 400G' then 56208631
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'PEDRA SANITÁRIA  ' then 56208632
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'CHÁ, CAIXA 250G  ' then 56208634
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'ÁGUA MINERAL NATURAL, GALÃO 20 LITROS  ' then 56208635
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'SACO PARA LIXO, CAPACIDADE DE 15 LITROS, CONTENDO 10 UNIDADES EM CADA PACOTE  ' then 56208637
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'SABÃO EM PÓ, 500G  ' then 56208640
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'INSETICIDA AEROSSOL 380ML/350G' then 56208642
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'ÁLCOOL 70 PARA LIMPEZA, 01 LITRO  ' then 56208649
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'SABÃO EM PÓ C/500G' then 56208657
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'PANO PARA LIMPAR CHÃO' then 56208658
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'LIMPA VIDRO, 500ML  ' then 56208659
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'AROMATIZADOR DE AMBIENTE SPRAY 360ML' then 56208667
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'SACO DE LIXO 15 LTS C/10 UNIDADES' then 56208669
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'SACO DE LIXO 50 LTS C/10 UNIDADES' then 56208671
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'ÁLCOOL EM GEM 70°/500G  ' then 56208672
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'PAPEL HIGIENICO C/12 ROLOS DE 60MTS CADA' then 56208674
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'PILHA  AA  ALCALINA C/02 UNIDADES' then 56208713
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'PILHA  AAA  ALCALINA C/02 UNIDADES' then 56208715							 
 END AS  id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS material,
	JSON_QUERY((SELECT CASE
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'AÇÚCAR CRISTAL, PACOTE DE 02KG  ' then 27193116
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'ÁGUA MINERAL NATURAL DE 500ML C/12 UNIDADES' then 27193117
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'BISCOITO, SABOR ÁGUA E SAL 400G  ' then 27193118
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'AÇUCAR CRISTAL DE 02 KG' then 27193119
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'CAFÉ EM PÓ DE 500G' then 27193121
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'BISCOITO ÁGUA E SAL 400G' then 27193122
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'GÁS DE COZINHA P-13  ' then 27193125
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'PANO PARA SECAR LOUÇA, EM TECIDO DE ALGODÃO  ' then 27193126
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'DETERGENTE, DE 500 ML  ' then 27193127
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'TOALHA DE PAPEL, PACOTE COM 02 ROLOS  ' then 27193128
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'ESPONJA PARA LAVAR LOUÇA, DUPLA FACE   ' then 27193130
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'ÁGUA MINERAL NATURAL-SEM GÁS, 12 UNIDADES NO FARDO DE 500ML  ' then 27193131
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'BISCOITO, SABOR DE COCE 400G  ' then 27193134
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'ÁGUA SANITÁRIA, 01 LITRO  ' then 27193135
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'COPO DESCART. 180ML C/25 PCT CONTENDO 100 UNIDADES CADA' then 27193136
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'CAFÉ EM PÓ, PACOTES DE 500G  ' then 27193142
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'COADOR DE CAFÉ EM TECIDO, MEDINDO TAMANHO GRANDE  ' then 27193144
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'COPO DESCARTÁVEL 180 ML, CAIXA COM 25 PACOTES CONTENDO 100 UNIDADES EM CADA PACOTE  ' then 27193145
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'PACOTE DE GUARDANAPODE PAPEL, MEDINDO 21,5CM X 22CM, COM 50 UNIDADE CADA PACOTES  ' then 27193146
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'VASSOURA DE PALHA  ' then 27193147
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'SACO PARA LIXO, CAPACIDADE DE 50 LITROS, CONTENDO 10 UNIDADES EM CADA PACOTE  ' then 27193148
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'COPO DESCART. 50ML C/25 PCT CONTENDO 100 UNIDADES CADA' then 27193150
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'DESINFETANTE, 01 LITRO  ' then 27193151
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'BISCOITO DOCE 400G' then 27193156
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'PEDRA SANITÁRIA  ' then 27193157
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'CHÁ, CAIXA 250G  ' then 27193159
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'ÁGUA MINERAL NATURAL, GALÃO 20 LITROS  ' then 27193160
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'SACO PARA LIXO, CAPACIDADE DE 15 LITROS, CONTENDO 10 UNIDADES EM CADA PACOTE  ' then 27193162
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'SABÃO EM PÓ, 500G  ' then 27193165
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'INSETICIDA AEROSSOL 380ML/350G' then 27193167
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'ÁLCOOL 70 PARA LIMPEZA, 01 LITRO  ' then 27193174
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'SABÃO EM PÓ C/500G' then 27193182
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'PANO PARA LIMPAR CHÃO' then 27193183
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'LIMPA VIDRO, 500ML  ' then 27193184
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'AROMATIZADOR DE AMBIENTE SPRAY 360ML' then 27193192
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'SACO DE LIXO 15 LTS C/10 UNIDADES' then 27193194
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'SACO DE LIXO 50 LTS C/10 UNIDADES' then 27193196
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'ÁLCOOL EM GEM 70°/500G  ' then 27193197
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'PAPEL HIGIENICO C/12 ROLOS DE 60MTS CADA' then 27193199
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'PILHA  AA  ALCALINA C/02 UNIDADES' then 27193238
 WHEN CAST(pr.ds_produto AS VARCHAR(MAX)) = 'PILHA  AAA  ALCALINA C/02 UNIDADES' then 27193240	 
 					   END AS  id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) as materialEspecificacao,
			--		   CAST(pr.ds_produto AS VARCHAR(MAX)) as teste,
	qt_movimento as quantidadeItem,
	vl_Unitario as valorUnitario,
    0 AS precoMedio,
	vl_movimento as valorTotal,
    qt_movimento AS saldoFinanceiro,
	qt_movimento as saldoFisico,
    aa_movimento AS anoMovimento,
JSON_QUERY((SELECT CASE WHEN cd_almoxa = 20100 THEN 5741
 END as id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS almoxarifado
	from ALMOMovimentacao AL
	join ALMOProdutos pr on AL.cd_produto = pr.cd_produto
	WHERE al.sg_direcao = 'CD' and al.aa_movimento = '2024' and qt_movimento > 0 and  cd_almoxa = 20100 
        `;

		const result = await masterConnection.query(userQuery);
		const resultData = result.recordset;

		const transformedData = resultData.map(record => {
			return {
				conteudo: {
					material: {
						id: JSON.parse(record.material).id
					},
					materialEspecificacao: {
						id: JSON.parse(record.materialEspecificacao).id // ID de especificação do material
					},
					entrada: {
						id: JSON.parse(record.entrada).id
					},	
					valorTotal: record.valorTotal,
					quantidadeItem: record.quantidadeItem,
					valorUnitario: record.valorUnitario,	
					precoMedio: record.precoMedio,		
					saldoFinanceiro: record.precoMedio,									
					saldoFisico: record.saldoFisico,
				},
				context: {
					almoxarifado: JSON.parse(record.almoxarifado).id.toString(),
					exercicio: record.anoMovimento.toString()
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
        
                const response = await fetch(`https://services.almoxarifado.betha.cloud/estoque-services/api/conversoes/lotes/entradas-itens`, {
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
        
                    if (responseBody.idLote) {
                        reportIds.push(responseBody.idLote);
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
        
        // Save the report in 'report.json'
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));
        console.log('Relatório salvo em report.json com sucesso.');
        
        // Save the reportIds in the 'report_id.json' file
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