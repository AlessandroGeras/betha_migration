const sql = require('mssql');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const fs = require('fs');
const moment = require('moment'); // Adiciona a biblioteca moment

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

        // Selecionar o banco de dados "FOLHADB"
        const selectDatabaseQuery = 'USE FOLHADB';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
    select 
f.cd_Funcionario as idIntegracao,
        JSON_QUERY(
    (SELECT
f.nm_Funcionario as nome,
'FISICA' as tipoPessoa,
'[]' as emails,
'[]' as historicos,
dt_Admissao as inicioVigencia,
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
        'false' as naturalizado,
        'false' as casadoComBrasileiro,
        'false' as temFilhosBrasileiros,
        null as situacaoEstrangeiro,
        null as tempoResidencia,
        null as inscricaoMunicipal,
        nr_RG as identidade,
ds_ExpedRG as orgaoEmissorIdentidade,
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
nr_CNH as cnh,
dp.cd_CNHCategoria as categoriaCnh,
dp.dt_CNHvALIDADE AS dataVencimentoCnh,
dp.uf_cnh as ufEmissaoCnh,
null as dataEmissaoCnh,
null as dataPrimeiraCnh,
null as observacoesCnh,
null as preencheCotaDeficiente,
null as informacoesDeficiencia,
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
        dp.nm_pai as nome,
        'PAI' AS tipoFiliacao,
        'BIOLOGICA' AS naturezaFiliacao
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
        ) AS filiacoesPai,
                JSON_QUERY(
    (SELECT
        dp.nm_Mae as nome,
        'MAE' AS tipoFiliacao,
        'BIOLOGICA' AS naturezaFiliacao
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
        ) AS filiacoesMae,
                        JSON_QUERY(
    (SELECT
        'TELEFONE FIXO' AS descricao,
    'FIXO' AS tipo,
        CONCAT(nr_dddfone, nr_fone) as numero
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
        ) AS telefones,
                        JSON_QUERY(
    (SELECT
        'TELEFONE CELULAR' AS descricao,
    'CELULAR' AS tipo,
        CONCAT(nr_DDDCelular, nr_Celular) as numero
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
        ) AS telefones,
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

        const transformedData = resultData.map(record => {
            const conteudo = JSON.parse(record.conteudo); // Parse the JSON string to an object

            // Formatando as datas para o formato desejado
            const formattedInicioVigencia = conteudo.inicioVigencia 
                ? moment(conteudo.inicioVigencia).format('YYYY-MM-DD HH:mm:ss')
                : null;

            const formattedDataNascimento = conteudo.dataNascimento 
                ? moment(conteudo.dataNascimento).format('YYYY-MM-DD')
                : null;

            const formattedDataEmissaoIdentidade = conteudo.dataEmissaoIdentidade 
                ? moment(conteudo.dataEmissaoIdentidade).format('YYYY-MM-DD HH:mm:ss')
                : null;

            const formattedDataEmissaoCtps = conteudo.dataEmissaoCtps 
                ? moment(conteudo.dataEmissaoCtps).format('YYYY-MM-DD HH:mm:ss')
                : null;

            return {
                idIntegracao: record.idIntegracao.toString(),
                conteudo: {
                    inicioVigencia: formattedInicioVigencia,
                    tipoPessoa: conteudo.tipoPessoa || null,
                    emails: [],
                    telefones: [],
                    enderecos: [],
                    historicos: [],
                    nome: conteudo.nome || null,
                    cpf: conteudo.cpf || null,
                    dataNascimento: formattedDataNascimento,
                    estadoCivil: conteudo.estadoCivil || null,
                    sexo: conteudo.sexo || null,
                    raca: conteudo.raca || null,
                    corOlhos: null,
                    estatura: null,
                    peso: null,
                    tipoSanguineo: null,
                    doador: false,
                    nacionalidade: null,
                    paisNascimento: null,
                    naturalidade: null,
                    naturalizado: false,
                    dataChegada: null,
                    casadoComBrasileiro: false,
                    temFilhosBrasileiros: false,
                    situacaoEstrangeiro: null,
                    tempoResidencia: null,
                    inscricaoMunicipal: null,
                    identidade: conteudo.identidade || null,
                    orgaoEmissorIdentidade: conteudo.orgaoEmissorIdentidade || null,
                    ufEmissaoIdentidade: null,
                    dataEmissaoIdentidade: formattedDataEmissaoIdentidade,
                    dataValidadeIdentidade: null,
                    tituloEleitor: conteudo.tituloEleitor || null,
                    zonaEleitoral: conteudo.zonaEleitoral || null,
                    secaoEleitoral: conteudo.secaoEleitoral || null,
                    ctps: conteudo.ctps || null,
                    serieCtps: conteudo.serieCtps || null,
                    ufEmissaoCtps: conteudo.ufEmissaoCtps || null,
                    dataEmissaoCtps: formattedDataEmissaoCtps,
                    dataValidadeCtps: null,
                    pis: conteudo.pis || null,
                    dataEmissaoPis: null,
                    grauInstrucao: conteudo.grauInstrucao || null,
                    situacaoGrauInstrucao: null,
                    certificadoReservista: null,
                    ric: null,
                    ufEmissaoRic: null,
                    orgaoEmissorRic: null,
                    dataEmissaoRic: null,
                    cns: null,
                    dataEmissaoCns: null,
                    rear: null,
                    passaporte: null,
                    dataEmissaoPassaporte: null,
                    dataValidadePassaporte: null,
                    orgaoEmissorPassaporte: null,
                    cnh: null,
                    dataValidadeCnh: null,
                    categoriaCnh: null,
                    dataEmissaoCnh: null,
                    primeiraCnh: false,
                    registroNacionalEstrangeiro: null,
                    dataChegadaEstrangeiro: null,
                    validadeRne: null,
                    codigoJusticaEleitoral: null,
                    nis: null,
                    observacoes: null,
                    filiacao: {
                        pai: conteudo.filiaçaoPaiNome || null,
                        mae: conteudo.filiaçaoMaeNome || null
                    },
                    dependentes: [],
                    parceiros: [],
                    contratos: []
                }
            };
        });

        // Escrever os dados transformados em um arquivo JSON
        fs.writeFileSync('log_envio.json', JSON.stringify(transformedData, null, 2));
        console.log('Dados salvos em log_envio.json');

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const response = await fetch('https://pessoal.betha.cloud/service-layer/v1/api/pessoa ', {
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
        // Lidar com erros de conexão ou consulta aqui
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        await sql.close();
    }
}

// Chamar a função principal
main();
