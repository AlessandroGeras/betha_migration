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
        const selectDatabaseQuery = 'USE FOLHA_CAM';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
f.cd_Funcionario as idIntegracao,
        JSON_QUERY(
    (SELECT
dt_Admissao as inicioVigencia,
f.nm_Funcionario as nome,
'FISICA' as tipoPessoa,
'[]' as emails,
'[]' as historicos,
dp.nr_CIC_CPF as cpf,
f.dt_Nascimento as dataNascimento,
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
CASE
        WHEN cd_RacaCor = 0 THEN 'INDIGENA'
        WHEN cd_RacaCor = 2 THEN 'BRANCA'
        WHEN cd_RacaCor = 4 THEN 'NEGRA'
        WHEN cd_RacaCor = 6 THEN 'AMARELA'
        WHEN cd_RacaCor = 8 THEN 'PARDA'
        ELSE 'DESCONHECIDA'
    END AS raca,
        null as corOlhos,
        null as estatura,
        null as peso,
        null as tipoSanguineo,
        'false' as doador,
        null as nacionalidade,
        null as paisNascimento,
        null as naturalidade,
                null as dataChegada,
        'false' as naturalizado,
        'false' as casadoComBrasileiro,
        'false' as temFilhosBrasileiros,
        null as situacaoEstrangeiro,
        null as tempoResidencia,
        null as inscricaoMunicipal,
        nr_RG as identidade,
ds_ExpedRG as orgaoEmissorIdentidade,
null as ufEmissaoIdentidade,
dt_RG as dataEmissaoIdentidade,
        null as dataValidadeIdentidade,
nr_TitEleitoral as tituloEleitor,
nr_ZonaTE as zonaEleitoral,
nr_SecaoTE as secaoEleitoral,
nr_CTPS as ctps,
nr_SerieCTPS as serieCtps,
dt_ctps as dataEmissaoCtps,
sg_ctps_uf as ufEmissaoCtps,
null as dataValidadeCtps,
nr_PIS_PASEP as pis,
null as dataEmissaoPis,
CASE
        WHEN cd_GrauInstruc = 1 THEN 'NAO_ALFABETIZADO'
        WHEN cd_GrauInstruc = 2 THEN 'ENSINO_FUNDAMENTAL_ANOS_INICIAIS'
        WHEN cd_GrauInstruc = 3 THEN 'ENSINO_FUNDAMENTAL_ANOS_INICIAIS'
        WHEN cd_GrauInstruc = 4 THEN 'ENSINO_FUNDAMENTAL_ANOS_FINAIS'
        WHEN cd_GrauInstruc = 5 THEN 'ENSINO_FUNDAMENTAL_ANOS_FINAIS'
        WHEN cd_GrauInstruc = 6 THEN 'ENSINO_MEDIO'
        WHEN cd_GrauInstruc = 7 THEN 'ENSINO_MEDIO'
        WHEN cd_GrauInstruc = 8 THEN 'ENSINO_SUPERIOR_SEQUENCIAL'
        WHEN cd_GrauInstruc = 9 THEN 'SGRADUACAO_BACHARELADO'
        WHEN cd_GrauInstruc = 10 THEN 'ENSINO_PROFISSIONALIZANTE'
        WHEN cd_GrauInstruc = 11 THEN 'POS_GRADUACAO_ESPECIALIZACAO'
        WHEN cd_GrauInstruc = 12 THEN 'POS_GRADUACAO_MESTRADO'
        WHEN cd_GrauInstruc = 13 THEN 'POS_GRADUACAO_DOUTORADO'
        WHEN cd_GrauInstruc = 14 THEN 'OS_DOUTORADO_HABILITACAO'
        ELSE 'Desconhecida'
    END as grauInstrucao,
        null as situacaoGrauInstrucao,
nr_CertifReservista as certificadoReservista,
null as ric,
null as ufEmissaoRic,
null as orgaoEmissorRic,
null as dataEmissaoRic,
null as cns,
null as dataEmissaoCns,
null as passaporte,
null as dataEmissaoPassaporte,
null as dataValidadePassaporte,
null as orgaoEmissorPassaporte,
nr_CNH as cnh,
dp.cd_CNHCategoria as categoriaCnh,
dp.dt_CNHvALIDADE AS dataValidadeCnh,
dp.uf_cnh as ufEmissaoCnh,
null as dataEmissaoCnh,
null as dataPrimeiraCnh,
null as observacoesCnh,
'false' as primeiraCnh,
null as registroNacionalEstrangeiro,
null as dataChegadaEstrangeiro,
null as preencheCotaDeficiente,
null as informacoesDeficiencia,
null as validadeRne,
null as codigoJusticaEleitoral,
null as nis,
null as observacoes,
f.nm_Funcionario as nomeSocial,
null as nif,
null as indicativoNif,
'RETENCAO_IRRF_ALIQUOTA_DA_TABELA_PROGRESSIVA' as formaTributacao,
null as paisFiscal,
'[]' as molestiasGraves,
'[]' as basesOutrasEmpresas,
'[]' as deficiencias,
'[]' as certidoes,
'[]' as restricoes,
'[]' as doencas,
'[]' as vacinas,
'[]' as processosJudiciais,
'[]' as camposAdicionais,
        JSON_QUERY(
    (SELECT
        dp.nm_pai as nomepai,
        'PAI' AS tipoFiliacao,
        'BIOLOGICA' AS naturezaFiliacao
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
        ) AS filiacaoPai,
                JSON_QUERY(
    (SELECT
        dp.nm_Mae as nomemae,
        'MAE' AS tipoFiliacao,
        'BIOLOGICA' AS naturezaFiliacao
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
        ) AS filiacaoMae,
                        JSON_QUERY(
    (SELECT
        'TELEFONE FIXO' AS descricao,
    'FIXO' AS tipo,
        CONCAT(nr_dddfone, nr_fone) as numero
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
        ) AS telefoneFixo,
                        JSON_QUERY(
    (SELECT
        'TELEFONE CELULAR' AS descricao,
    'CELULAR' AS tipo,
        CONCAT(nr_DDDCelular, nr_Celular) as numero
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
        ) AS telefoneCelular,
        JSON_QUERY(
    (SELECT
        null as logradouro,
        6571 as bairro,
        dp.nr_cep as cep,
        dp.ds_endereco as descricao,
        'true' as principal
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
        ) AS enderecos
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
        ) AS conteudo
from FOLHFuncionario f
join FOLHFuncDadosPess dp on dp.cd_Funcionario = f.cd_Funcionario


        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const conteudo = JSON.parse(record.conteudo); // Parse the JSON string to an object

            return {
                idIntegracao: record.idIntegracao,
                conteudo: {
                    inicioVigencia: new Date(conteudo.inicioVigencia).toISOString(),
                    tipoPessoa: conteudo.tipoPessoa,
                    emails: [],
                    telefones: [],
                    enderecos: [],
                    historicos: [],
                    nome: conteudo.nome,
                    cpf: conteudo.cpf,
                    dataNascimento: new Date(conteudo.dataNascimento).toISOString(),
                    estadoCivil: conteudo.estadoCivil,
                    sexo: conteudo.sexo,
                    raca: conteudo.raca,
                    corOlhos: conteudo.corOlhos,
                    estatura: conteudo.estatura,
                    peso: conteudo.peso,
                    tipoSanguineo: conteudo.tipoSanguineo,
                    doador: conteudo.doador,
                    nacionalidade: conteudo.nacionalidade,
                    paisNascimento: conteudo.paisNascimento,
                    naturalidade: conteudo.naturalidade,
                    naturalizado: conteudo.naturalizado,
                    dataChegada: conteudo.dataChegada,
                    casadoComBrasileiro: conteudo.casadoComBrasileiro,
                    temFilhosBrasileiros: conteudo.temFilhosBrasileiros,
                    situacaoEstrangeiro: conteudo.situacaoEstrangeiro,
                    tempoResidencia: conteudo.tempoResidencia,
                    inscricaoMunicipal: conteudo.inscricaoMunicipal,
                    identidade: conteudo.identidade,
                    orgaoEmissorIdentidade: conteudo.orgaoEmissorIdentidade,
                    ufEmissaoIdentidade: conteudo.ufEmissaoIdentidade,
                    dataEmissaoIdentidade: conteudo.dataEmissaoIdentidade,
                    dataValidadeIdentidade: conteudo.dataValidadeIdentidade,
                    tituloEleitor: conteudo.tituloEleitor,
                    zonaEleitoral: conteudo.zonaEleitoral,
                    secaoEleitoral: conteudo.secaoEleitoral,
                    ctps: conteudo.ctps,
                    serieCtps: conteudo.serieCtps,
                    ufEmissaoCtps: conteudo.ufEmissaoCtps,
                    dataEmissaoCtps: conteudo.dataEmissaoCtps,
                    dataValidadeCtps: conteudo.dataValidadeCtps,
                    pis: conteudo.pis,
                    dataEmissaoPis: conteudo.dataEmissaoPis,
                    grauInstrucao: conteudo.grauInstrucao,
                    situacaoGrauInstrucao: conteudo.situacaoGrauInstrucao,
                    certificadoReservista: conteudo.certificadoReservista,
                    ric: conteudo.ric,
                    ufEmissaoRic: conteudo.ufEmissaoRic,
                    orgaoEmissorRic: conteudo.orgaoEmissorRic,
                    dataEmissaoRic: conteudo.dataEmissaoRic,
                    cns: conteudo.cns,
                    dataEmissaoCns: conteudo.dataEmissaoCns,
                    passaporte: conteudo.passaporte,
                    dataEmissaoPassaporte: conteudo.dataEmissaoPassaporte,
                    dataValidadePassaporte: conteudo.dataValidadePassaporte,
                    orgaoEmissorPassaporte: conteudo.orgaoEmissorPassaporte,
                    cnh: conteudo.cnh,
                    dataValidadeCnh: conteudo.dataValidadeCnh,
                    categoriaCnh: conteudo.categoriaCnh,
                    dataVencimentoCnh: conteudo.dataVencimentoCnh,
                    primeiraCnh: conteudo.primeiraCnh,
                    registroNacionalEstrangeiro: conteudo.registroNacionalEstrangeiro,
                    dataChegadaEstrangeiro: conteudo.dataChegadaEstrangeiro,
                    validadeRne: conteudo.validadeRne,
                    codigoJusticaEleitoral: conteudo.codigoJusticaEleitoral,
                    nis: conteudo.nis,
                    observacoes: conteudo.observacoes,
                    filiacoes: [conteudo.filiacaoPai, conteudo.filiacaoMae],
                    telefones: [conteudo.telefoneFixo, conteudo.telefoneCelular],
                    dependentes: [],
                    parceiros: [],
                    contratos: []
                }
            };
        });

        // Salvar os resultados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        for (const record of transformedData) {
            const response = await fetch('https://pessoal.betha.cloud/service-layer/v1/api/pessoa', {
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
