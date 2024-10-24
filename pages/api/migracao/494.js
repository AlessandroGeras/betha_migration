const sql = require('mssql');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const fs = require('fs');
const { format } = require('date-fns');

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
    if (!(date instanceof Date)) {
        date = new Date(date); // Converte para Date se não for uma instância de Date
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "FOLHADB"
        const selectDatabaseQuery = 'USE FOLHADB';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
       select 
d.nr_CICCPF as idIntegracao,

JSON_QUERY(
(SELECT 
	d.dt_Nascimento as inicioVigencia,
	CASE
        WHEN d.nr_CICCPF = '0' THEN 'OUTROS'
        WHEN d.nr_CICCPF > '0' THEN 'FISICA'
                ELSE 'OUTROS'
                END as tipoPessoa,
	d.nm_dependente as nome,
	CASE
	    WHEN LEN(nr_CICCPF) = 0 THEN ''
			ELSE d.nr_CICCPF
        END as cpf, 
	d.dt_Nascimento as dataNascimento,
	CASE
        WHEN cd_EstCivil = 1 THEN 'SOLTEIRO'
        WHEN cd_EstCivil = 2 THEN 'CASADO'
        WHEN cd_EstCivil = 3 THEN 'SEPARADO_JUDICIALMENTE'
        WHEN cd_EstCivil = 4 THEN 'DIVORCIADO'
        WHEN cd_EstCivil = 5 THEN 'DIVORCIADO'
        WHEN cd_EstCivil = 6 THEN 'VIUVO'
        WHEN cd_EstCivil = 7 THEN 'SOLTEIRO'
        WHEN cd_EstCivil = 8 THEN 'UNIAO_ESTAVEL'
        ELSE 'Desconhecido'
    END as estadoCivil,
	CASE
        WHEN fl_sexo = 'M' THEN 'MASCULINO'
        WHEN fl_sexo = 'F' THEN 'FEMININO '
                ELSE 'Desconhecido'
                END as sexo,
	'false' as doador,
	'false' as naturalizado,
	'false' as casadoComBrasileiro,
	'false' as temFilhosBrasileiros,
    nr_RG as identidade,
	CASE d.nm_RGOrgaoExpedidor
		when 'SESDC/RO' then 'SESDC'
		when  'SSDC/RO' 	then	'SSDC'
		when  'SESP/RO' 	then	'SESP'
		when  'SSP/GO'		then	'SSP'
		when  'SSP/PR'      then    'SSP'
		when  'SSP/RO'      then    'SSP'
		when  'SSP/BA'		then	'SSP'
		when  'SSO/RO'		then	'SSO'
			Else 'SSP'
		END as orgaoEmissorIdentidade,
	CASE d.nm_RGOrgaoExpedidor
		WHEN 'SESDC/RO' THEN 'RO'	
		WHEN 'SSDC/RO' THEN 'RO'
		WHEN 'SSDC/RO' THEN 'RO'
		WHEN 'SESP/RO' THEN 'RO'
		WHEN 'SSDC/RO' THEN 'RO'
		WHEN 'SESDC/RO' THEN 'RO'
		WHEN 'SSP/GO' THEN 'GO'
		WHEN 'SSP/PR' THEN 'PR'
		WHEN 'SSP/RO' THEN 'RO'
		WHEN 'SESDC/RO' THEN 'RO'
		WHEN 'SSP/RO' THEN 'RO'
		WHEN 'SSP/RO' THEN 'RO'
		WHEN 'SSP/RO' THEN 'RO'
		WHEN 'SSP/RO' THEN 'RO'
		WHEN 'SSP/RO' THEN 'RO'
		WHEN 'SSP/RO' THEN 'RO'
		WHEN 'SESDC/RO' THEN 'RO'
		WHEN 'SESDC/RO' THEN 'RO'
		WHEN 'SESP/ES' THEN 'ES'
		WHEN 'SESDC/RO' THEN 'RO'
		WHEN 'SSDC/RO' THEN 'RO'
		WHEN 'SSDC/RO' THEN 'RO'
		WHEN 'SESP/RO' THEN 'RO'
		WHEN 'SSP/GO' THEN 'GO'
		WHEN 'SESDC/RO' THEN 'RO'
		WHEN 'SSP/RO' THEN 'RO'
		WHEN 'SSP/BA' THEN 'BA'
		WHEN 'SESP/RO' THEN 'RO'
		WHEN 'SSP/BA' THEN 'BA'
		WHEN 'SSDC/RO' THEN 'RO'
		WHEN 'SSDC/RO' THEN 'RO'
		WHEN 'SSP/RO' THEN 'RO'
		WHEN 'SSP/RO' THEN 'RO'
		WHEN 'SSDC/RO' THEN 'RO'
		WHEN 'SSP/RO' THEN 'RO'
		WHEN 'SSP/RO' THEN 'RO'
		WHEN 'SESDC/RO' THEN 'RO'
		WHEN 'SSDC/RO' THEN 'RO'
		WHEN 'SSP/RO' THEN 'RO'
		WHEN 'SSP/RO' THEN 'RO'
		WHEN 'SSDC/RO' THEN 'RO'
		WHEN 'SSO/RO' THEN 'RO'
		WHEN 'SESDC/RO' THEN 'RO'
		WHEN 'SESDC/RO' THEN 'RO'
		WHEN 'SESDC/RO' THEN 'RO'
		WHEN 'SESP/PR' THEN 'PR'
		WHEN 'SSP/SP' THEN 'SP'
			Else 'RO' 
	END as ufEmissaoIdentidade,
	CASE
        WHEN cd_GrauInstruc = 1 THEN 'NAO_ALFABETIZADO'
        WHEN cd_GrauInstruc = 2 THEN 'ENSINO_FUNDAMENTAL_ANOS_INICIAIS'
        WHEN cd_GrauInstruc = 3 THEN 'ENSINO_FUNDAMENTAL_ANOS_INICIAIS'
        WHEN cd_GrauInstruc = 4 THEN 'ENSINO_FUNDAMENTAL_ANOS_FINAIS'
        WHEN cd_GrauInstruc = 5 THEN 'ENSINO_FUNDAMENTAL_ANOS_FINAIS'
        WHEN cd_GrauInstruc = 6 THEN 'ENSINO_MEDIO'
        WHEN cd_GrauInstruc = 7 THEN 'ENSINO_MEDIO'
        WHEN cd_GrauInstruc = 8 THEN 'ENSINO_SUPERIOR_SEQUENCIAL'
        WHEN cd_GrauInstruc = 9 THEN 'GRADUACAO_BACHARELADO'
        WHEN cd_GrauInstruc = 10 THEN 'ENSINO_PROFISSIONALIZANTE'
        WHEN cd_GrauInstruc = 11 THEN 'POS_GRADUACAO_ESPECIALIZACAO'
        WHEN cd_GrauInstruc = 12 THEN 'POS_GRADUACAO_MESTRADO'
        WHEN cd_GrauInstruc = 13 THEN 'POS_GRADUACAO_DOUTORADO'
        WHEN cd_GrauInstruc = 14 THEN 'POS_DOUTORADO_HABILITACAO'
        ELSE 'Desconhecida'
    END as grauInstrucao
 	FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
		) AS conteudo	
	FROM FOLHFuncDependentes d, FOLHFuncionario f
	where d.cd_Cecam = f.cd_Cecam
		and f.cd_Funcionario = d.cd_Funcionario
		and d.nr_CICCPF > '0'
		and nm_Dependente not in (select nm_Funcionario 
									from FOLHFuncionario 
										where cd_Cecam = 1995)


        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const conteudo = JSON.parse(record.conteudo);

            function formatCPF(cpf) {
                const cpfString = String(cpf);
                const cpfPadded = cpfString.padStart(11, '0'); // Preencher com zeros à esquerda para completar 11 caracteres
                return cpfPadded;
            }

            let filiacoes = [];
            if (conteudo.filiacaoPai && conteudo.filiacaoPai.nome) {
                filiacoes.push({
                    id: "1",
                    nome: conteudo.filiacaoPai.nome,
                    tipoFiliacao: conteudo.filiacaoPai.tipoFiliacao,
                    naturezaFiliacao: conteudo.filiacaoPai.naturezaFiliacao
                });
            }
            if (conteudo.filiacaoMae && conteudo.filiacaoMae.nome) {
                filiacoes.push({
                    id: "2",
                    nome: conteudo.filiacaoMae.nome,
                    tipoFiliacao: conteudo.filiacaoMae.tipoFiliacao,
                    naturezaFiliacao: conteudo.filiacaoMae.naturezaFiliacao
                });
            }

            let enderecos = [];
            if (conteudo.enderecos) {
                enderecos.push({
                    logradouro: { id: conteudo.enderecos.logradouro?.id || null },
                    bairro: { id: conteudo.enderecos.bairro?.id || null },
                    cep: conteudo.enderecos.cep || null,
                    numero: conteudo.enderecos.numero || "N/A", // Default "0" como no modelo
                    descricao: conteudo.enderecos.descricao || null,
                    principal: conteudo.enderecos.principal === 'true'
                });
            }

            let contasBancarias = [];
            if (conteudo.contasBancarias) {
                contasBancarias.push({
                    id: conteudo.contasBancarias.id,
                    agencia: { id: conteudo.contasBancarias.agencia?.id || null },
                    numero: conteudo.contasBancarias.numero || null,
                    digito: conteudo.contasBancarias.digito || null,
                    tipo: conteudo.contasBancarias.tipo || null,
                    dataAbertura: conteudo.contasBancarias.dataAbertura || null,
                    situacao: conteudo.contasBancarias.situacao || null,
                    principal: conteudo.contasBancarias.principal === 'true'
                });
            }

            return {
                idIntegracao: record.idIntegracao,
                conteudo: {
                    inicioVigencia: formatDate(conteudo.inicioVigencia) || null,
                    tipoPessoa: conteudo.tipoPessoa || null,
                    nome: conteudo.nome || null,
                    cpf: conteudo.cpf ? formatCPF(conteudo.cpf) : null,
                    dataNascimento: conteudo.dataNascimento || null,
                    //contasBancarias: contasBancarias,
                    estadoCivil: conteudo.estadoCivil || null,
                    sexo: conteudo.sexo || null,
                    //raca: conteudo.raca || null,
                    doador: conteudo.doador === 'true',
                    naturalizado: conteudo.naturalizado === 'true',
                    casadoComBrasileiro: conteudo.casadoComBrasileiro === 'true',
                    temFilhosBrasileiros: conteudo.temFilhosBrasileiros === 'true',
                    identidade: conteudo.identidade || null,
                    orgaoEmissorIdentidade: conteudo.orgaoEmissorIdentidade || null,
                    //tituloEleitor: conteudo.tituloEleitor || null,
                    //zonaEleitoral: conteudo.zonaEleitoral || null,
                    //secaoEleitoral: conteudo.secaoEleitoral || null,
                    //ctps: conteudo.ctps || null,
                    //serieCtps: conteudo.serieCtps || null,
                    //ufEmissaoCtps: conteudo.ufEmissaoCtps || null,
                    ufEmissaoIdentidade: conteudo.ufEmissaoIdentidade || null,
                    //pis: conteudo.pis || null,
                    grauInstrucao: conteudo.grauInstrucao || null,
                    //filiacoes: filiacoes,
                    //enderecos: enderecos,
                    //cnh: conteudo.cnh === 0 ? null : conteudo.cnh !== undefined ? conteudo.cnh : null,
                    //dataEmissaoIdentidade: conteudo.dataEmissaoIdentidade || null,
                    //certificadoReservista: conteudo.certificadoReservista || null,
                    //formaTributacao: conteudo.formaTributacao || null
                }
            };
        });

        // Dividir os dados em chunks para salvar localmente (opcional)
        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        let report = [];
        let reportIds = []; // Array para armazenar apenas as respostas da API

         for (const record of transformedData) {
            const pessoaId = record.idIntegracao; // ID dinâmico da pessoa

            if (pessoaId) { // Verifica se o ID é válido
                try {
                    // Coloca o registro dentro de um array
                    const requestBody = [record];

                    // Exibir o corpo da requisição antes de enviá-la
                    console.log('Enviando o seguinte corpo para a API:', JSON.stringify(requestBody, null, 2));

                    const response = await fetch(`https://pessoal.betha.cloud/service-layer/v1/api/pessoa`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                        },
                        body: JSON.stringify(requestBody) // Envia o registro dentro de um array
                    });

                    // Capturar o corpo da resposta, seja sucesso ou erro
                    const responseBody = await response.json();

                    // Exibir o status da resposta e o corpo de erro (se houver)
                    if (response.ok) {
                        console.log('Dados enviados com sucesso para a rota.');
                        report.push({ record, status: 'success', response: responseBody });
                    } else {
                        console.error('Erro ao enviar os dados para a rota:', response.statusText);
                        console.error('Corpo da resposta de erro:', responseBody);
                        report.push({ record, status: 'failed', response: responseBody });
                    }

                    // Armazenar apenas o valor do campo 'id' no reportIds
                    reportIds.push(responseBody.id);

                } catch (err) {
                    // Exibir o erro capturado
                    console.error('Erro ao enviar o registro para a rota:', err);
                    report.push({ record, status: 'error', error: err.message });
                }
            } else {
                console.error('ID de pessoa inválido. O registro será ignorado.');
                report.push({ record, status: 'invalid', error: 'ID de pessoa inválido.' });
            }
        }

        // Salvar o relatório em 'report.json'
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));
        console.log('Relatório salvo em report.json com sucesso.');

        // Salvar os reportIds no arquivo report_id.json
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
