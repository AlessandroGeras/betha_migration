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

        // Selecionar o banco de dados "FOLHA_CAM"
        const selectDatabaseQuery = 'USE FOLHADB';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select
ROW_NUMBER() OVER (ORDER BY tp.cd_TipoRescisao) AS idIntegracao,
JSON_QUERY(
	(SELECT 
	tp.ds_TipoRescisao as descricao,
	case tp.cd_TipoRescisao
		when '21' then 'INICIATIVA_EMPREGADO' 
		when '11' then 'INICIATIVA_EMPREGADOR'
		when '12' then 'DISSOLUCAO_CONTRATO_TRABALHO'
		when '30' then 'DISSOLUCAO_CONTRATO_TRABALHO'
		when '32' then 'INICIATIVA_EMPREGADOR'
		when '40' then 'DISSOLUCAO_CONTRATO_TRABALHO'
		when '60' then 'DISSOLUCAO_CONTRATO_TRABALHO'
		when '70' then 'APOSENTADORIA'
		when '72' then 'APOSENTADORIA'
		when '73' then 'APOSENTADORIA'
		when '74' then 'APOSENTADORIA'
		when '80' then 'DISSOLUCAO_CONTRATO_TRABALHO'
		else 'DISSOLUCAO_CONTRATO_TRABALHO'
	End as tipo,
	case tp.cd_TipoRescisao
		when '21' then 'RESCISAO_SEM_JUSTA_CAUSA_INICIATIVA_DO_EMPREGADO'
		when '32' then 'RESCISAO_COM_JUSTA_CAUSA_INICIATIVA_EMPREGADOR'
		when '11' then 'RESCISAO_SEM_JUSTA_CAUSA_INICIATIVA_EMPREGADOR'
		when '60' then 'FALECIMENTO_EMPREGADO_OUTROS_MOTIVOS'
		when '12' then 'RESCISAO_POR_TERMINO_CONTRATO'
		when '30' then 'ACORDO_ENTRE_PARTES'
		when '72' then 'APOSENTADORIA_IDADE'
		when '70'  then 'APOSENTADORIA_TEMPO_SERVICO'
		when '40'  then 'MUDANCA_REGIME_TRABALHISTA'
		when '73' then 'APOSENTADORIA_INVALIDEZ'
		when '74' then 'APOSENTADORIA_INVALIDEZ'
		else 'DEMISSAO'
	End as classificacao,
	'' as continuidadeVinculo,
	case tp.cd_TipoRescisao
		when '32' then 'RESCISAO_COM_JUSTA_CAUSA_INICIATIVA_EMPREGADOR'
		when '11' then 'RESCISAO_SEM_JUSTA_CAUSA_INICIATIVA_EMPREGADOR'
		when '12' then 'RESCISAO_TERMINO_CONTRATO'
		when '21' then 'RESCISAO_INICIATIVA_EMPREGADO'
		when '30' then 'TRANSFERENCIA_MESMO_GRUPO'
		when '40' then 'MUDANCA_REGIME_TRABALHISTA'
		when '60' then 'RESCISAO_FALECIMENTO_EMPREGADO'
		when '70' then 'APOSENTADORIA_DE_SERVIDORES_ESTATUTARIO_EXCETO_POR_INVALIDEZ'
		when '72' then 'APOSENTADORIA_DE_SERVIDORES_ESTATUTARIO_EXCETO_POR_INVALIDEZ'
		when '73' then 'APOSENTADORIA_POR_INVALIDEZ_DE_SERVIDOR_ESTATUTARIO'
		when '74' then 'APOSENTADORIA_POR_INVALIDEZ_DE_SERVIDOR_ESTATUTARIO'
	End as motivoeSocial,
	'GRRF' as tipoGeracao,
	case tp.cd_TipoRescisao
		when '32' then 'RESCISAO_COM_JUSTA_CAUSA_INICIATIVA_EMPREGADOR'
		when '11' then 'RESCISAO_SEM_JUSTA_CAUSA_EMPREGADOR_INCLUSIVE_ANTECIPADA'
		when '12' then 'RESCISAO_TERMINO_CONTRATO'
		when '21' then 'RESCISAO_CONTRATO_INICIATIVA_EMPREGADO'
		when '40' then 'MUDANCA_REGIME_ESTATUTARIO'
		when '30' then 'TRANSFERENCIA_MESMA_EMPRESA'
		when '80' then 'OUTROS_MOTIVOS_RESCISAO'
		when '60' then 'FALECIMENTO'
		when '70' then 'APOSENTADORIA'
		when '72' then 'APOSENTADORIA'
		when '73' then 'APOSENTADORIA_INVALIDEZ'
		when '77' then 'APOSENTADORIA_INVALIDEZ'
	End as classificacaoSefip,
	case tp.cd_TipoRescisao		
		when '11' then 'DESPEDIDA_SEM_JUSTA_CAUSA_OU_ANTECIPADA_PRAZO_DETERMINADO_INICIATIVA_EMPREGADOR'
		when '21' then 'DESPEDIDA_SEM_JUSTA_CAUSA_OU_ANTECIPADA_PRAZO_DETERMINADO_INICIATIVA_EMPREGADOR'
		when '30' then 'DESPEDIDA_SEM_JUSTA_CAUSA_OU_ANTECIPADA_PRAZO_DETERMINADO_INICIATIVA_EMPREGADOR'
		when '32' then 'DESPEDIDA_SEM_JUSTA_CAUSA_OU_ANTECIPADA_PRAZO_DETERMINADO_INICIATIVA_EMPREGADOR'
		when '40' then 'DESPEDIDA_SEM_JUSTA_CAUSA_OU_ANTECIPADA_PRAZO_DETERMINADO_INICIATIVA_EMPREGADOR'
		when '80' then 'DESPEDIDA_SEM_JUSTA_CAUSA_OU_ANTECIPADA_PRAZO_DETERMINADO_INICIATIVA_EMPREGADOR'
		when '12' then 'EXTINCAO_NORMAL_TRABALHADORES_TEMPORARIOS'
		when '70' then 'APOSENTADORIA_INCLUSIVE_INVALIDEZ'
		when '72' then 'APOSENTADORIA_INCLUSIVE_INVALIDEZ'
		when '73' then 'APOSENTADORIA_INCLUSIVE_INVALIDEZ'
		when '74' then 'APOSENTADORIA_INCLUSIVE_INVALIDEZ'
		when '60' then 'FALECIMENTO_TRABALHADOR'
	End as classificacaoSaqueFgts,
	case tp.cd_TipoRescisao	
		when '11' then 'DESPEDIDA_SEM_JUSTA_CAUSA_PELO_EMPREGADOR'
		when '32' then 'DESPEDIDA_POR_JUSTA_CAUSA_PELO_EMPREGADOR'
		when '21'  then 'RESCISAO_CONTRATUAL_PEDIDO_EMPREGADO'
		when '60' then 'RESCISAO_FALECIMENTO_EMPREGADO'
		when '12' then 'EXTINCAO_CONTRATO_PRAZO_DETERMINADO'
		when '30' then 'RESCISAO_INDIRETA'
		when '40' then 'RESCISAO_INDIRETA'
		when '80' then 'RESCISAO_INDIRETA'
		when '70' then 'DESPEDIDA_SEM_JUSTA_CAUSA_PELO_EMPREGADOR'
		when '72' then 'DESPEDIDA_SEM_JUSTA_CAUSA_PELO_EMPREGADOR'
		when '73' then 'DESPEDIDA_SEM_JUSTA_CAUSA_PELO_EMPREGADOR'
		when '74' then 'DESPEDIDA_SEM_JUSTA_CAUSA_PELO_EMPREGADOR'
	End as classificacaoHomolognet,
	case tp.cd_TipoRescisao
		when '32' then 'RESCISAO_COM_JUSTA_CAUSA_INICIATIVA_EMPREGADOR_OU_DEMISSAO_SERVIDOR'
		when '11' then 'RESCISAO_SEM_JUSTA_CAUSA_INICIATIVA_EMPREGADOR_OU_EXONERACAO'
		when '12'  then 'TERMINO_CONTRATO'
		when '30' then 'TRANSFERENCIA_MESMA_OU_OUTRA_EMPRESA_SEM_ONUS'
		when '21' then 'RESCISAO_SEM_JUSTA_CAUSA_INICIATIVA_EMPREGADO_OU_EXONERACAO_PEDIDO_SERVIDOR'
		when '40' then 'MUDANCA_REGIME_TRABALHISTA'
		when '60' then 'FALECIMENTO'
		when '70' then 'APOSENTADORIA_TEMPO_CONTRIBUICAO_COM_RESCISAO'
		when '72' then 'APOSENTADORIA_IDADE_COM_RESCISAO'
		when  '74' then 'APOSENTADORIA_INVALIDEZ_ACIDENTE_TRABALHO'
		when '73' then 'APOSENTADORIA_INVALIDEZ_EXCETO_DOENCA_ACIDENTE_TRABALHO'
		Else ''
	End as classificacaoRais,
	case tp.cd_TipoRescisao
		when '32' then 'DISPENSA_COM_JUSTA_CAUSA_INICIATIVA_EMPREGADOR'
		when '11' then 'DISPENSA_SEM_JUSTA_CAUSA_INICIATIVA_EMPREGADOR'
		when '12' then 'TERMINO_CONTRATO'
		when  '21' then 'PEDIDO_INICIATIVA_EMPREGADO_ESPONTANEO'
		when '30' then 'TRANSFERENCIA_SAIDA'
		when '40' then 'TERMINO_CONTRATO'
		when '60' then 'MORTE'
		when '70' then 'APOSENTADO'
		when '72' then 'APOSENTADO'
		when '74' then 'APOSENTADO'
		when '73' then 'APOSENTADO'
		Else ''
	End as classificacaoCaged,
	'false' as seguroDesemprego,
	JSON_QUERY(
		(SELECT
		case tp.cd_TipoRescisao
			when '70' then '66300'
			when '72' then '66300'
			when '74' then '66300'
			when '73' then '66300'
			else '66086'
		end as id,
		case tp.cd_TipoRescisao
			when '70' then 'APOSENTADORIA'
			when '72' then 'APOSENTADORIA'
			when '74' then 'APOSENTADORIA'
			when '73' then 'APOSENTADORIA'
			else 'Demissão'
		end as descricao,
		case tp.cd_TipoRescisao
			when '70' then 'APOSENTADORIA'
			when '72' then 'APOSENTADORIA'
			when '74' then 'APOSENTADORIA'
			when '73' then 'APOSENTADORIA'
			else 'Demissão'
		end as classificacao
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
	) AS tipoAfastamento,
	JSON_QUERY(
		(SELECT
		case tp.cd_TipoRescisao
			when '70' then '66300'
			when '72' then '66300'
			when '74' then '66300'
			when '73' then '66300'
			else '66086'
		end as id,
		case tp.cd_TipoRescisao
			when '70' then 'APOSENTADORIA'
			when '72' then 'APOSENTADORIA'
			when '74' then 'APOSENTADORIA'
			when '73' then 'APOSENTADORIA'
			else 'Demissão'
		end as descricao,
		case tp.cd_TipoRescisao
			when '70' then 'APOSENTADORIA'
			when '72' then 'APOSENTADORIA'
			when '74' then 'APOSENTADORIA'
			when '73' then 'APOSENTADORIA'
			else 'Demissão'
		end as classificacao
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
	) AS tipoMovimentacaoPessoal
	FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
from FOLHTipoRescisao tp
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        const transformedData = resultData.map(record => {
            console.log(record);
            
            let conteudo;
            try {
                conteudo = JSON.parse(record.content); // Parsing the JSON content field
            } catch (error) {
                console.error('Erro ao fazer parse de conteudo:', record.content, error);
                throw error; // Halt execution on parsing error
            }
        
            // Mapping record data to the desired JSON model
            return {
                idIntegracao: record.idIntegracao.toString(),
                conteudo: {
                    descricao: conteudo.descricao || 'Falecimento',
                    tipo: conteudo.tipo || 'DISSOLUCAO_CONTRATO_TRABALHO',
                    classificacao: conteudo.classificacao || 'FALECIMENTO_EMPREGADO_OUTROS_MOTIVOS',
                    continuidadeVinculo: conteudo.continuidadeVinculo || null,
                    motivoeSocial: conteudo.motivoeSocial || 'RESCISAO_FALECIMENTO_EMPREGADO',
                    tipoGeracao: conteudo.tipoGeracao || 'GRRF',
                    classificacaoSefip: conteudo.classificacaoSefip || 'FALECIMENTO',
                    classificacaoSaqueFgts: conteudo.classificacaoSaqueFgts || 'FALECIMENTO_TRABALHADOR',
                    classificacaoHomolognet: conteudo.classificacaoHomolognet || 'RESCISAO_FALECIMENTO_EMPREGADO',
                    classificacaoRais: conteudo.classificacaoRais || 'FALECIMENTO',
                    classificacaoCaged: conteudo.classificacaoCaged || 'MORTE',
                    seguroDesemprego: conteudo.seguroDesemprego === 'false' ? false : true,
                    tipoAfastamento: {
                        id: conteudo.tipoAfastamento.id,
                        descricao: conteudo.tipoAfastamento.descricao || 'Demissão',
                        classificacao: conteudo.tipoAfastamento.classificacao || 'DEMISSAO'
                    },
                    tipoMovimentacaoPessoal: {
                        id: conteudo.tipoMovimentacaoPessoal.id,
                        descricao: conteudo.tipoMovimentacaoPessoal.descricao || 'Demissão',
                        classificacao: conteudo.tipoMovimentacaoPessoal.classificacao || 'DEMISSAO'
                    }
                }
            };
        });
        
        
        /*  const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        return  */
        
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
                
                const response = await fetch(`https://pessoal.betha.cloud/service-layer/v1/api/motivo-rescisao`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                    },
                    body: JSON.stringify(batch)
                });
        
                const responseBody = await response.json();
        
                if (response.ok) {
					console.log('Dados enviados com sucesso para a API.');
					batch.forEach(record => {
						report.push({ record, status: 'success', response: responseBody });
					});
				
					// Usar o 'id' ao invés de 'idLote'
					if (responseBody.id) {
						reportIds.push(responseBody.id); // Adiciona o id retornado ao reportIds
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