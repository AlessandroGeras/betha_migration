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

function formatDateToString(date) {
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

function formatCPF(cpf) {
    return cpf.replace(/[^\d]/g, ''); // Remove todos os caracteres que não são dígitos
}

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "TRIBUTOS2024"
        const selectDatabaseQuery = 'USE FOLHADB';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            SELECT 
                f.cd_Funcionario AS idIntegracao,
                JSON_QUERY(
                    (SELECT
                        dt_Admissao AS inicioVigencia,
                        'FISICA' AS tipoPessoa,
                        '[]' AS emails,
                        JSON_QUERY(
                            (SELECT
                                'TELEFONE FIXO' AS descricao,
                                'FIXO' AS tipo,
                                CONCAT(nr_dddfone, nr_fone) AS numero
                                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                        ) AS telefoneFixo,
                        JSON_QUERY(
                            (SELECT
                                'TELEFONE CELULAR' AS descricao,
                                'CELULAR' AS tipo,
                                CONCAT(nr_DDDCelular, nr_Celular) AS numero,
                                'true' AS principal
                                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                        ) AS telefoneCelular,
                        '[]' AS historicos,
                        f.nm_Funcionario AS nome,
                        dp.nr_CIC_CPF AS cpf,
                        f.dt_Nascimento AS dataNascimento,
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
                        END AS estadoCivil,
                        CASE
                            WHEN fl_sexo = 'M' THEN 'MASCULINO'
                            WHEN fl_sexo = 'F' THEN 'FEMININO '
                            ELSE 'Desconhecido'
                        END AS sexo,
                        CASE
                            WHEN cd_RacaCor = 0 THEN 'INDIGENA'
                            WHEN cd_RacaCor = 2 THEN 'BRANCA'
                            WHEN cd_RacaCor = 4 THEN 'PRETA'
                            WHEN cd_RacaCor = 6 THEN 'AMARELA'
                            WHEN cd_RacaCor = 8 THEN 'PARDA'
                            ELSE 'DESCONHECIDA'
                        END AS raca,
                        'false' AS doador,
                        'false' AS naturalizado,
                        'false' AS casadoComBrasileiro,
                        'false' AS temFilhosBrasileiros,
                        nr_RG AS identidade,
                        ds_ExpedRG AS orgaoEmissorIdentidade,
                        nr_TitEleitoral AS tituloEleitor,
                        nr_ZonaTE AS zonaEleitoral,
                        nr_SecaoTE AS secaoEleitoral,
                        nr_CTPS AS ctps,
                        nr_SerieCTPS AS serieCtps,
                        sg_ctps_uf AS ufEmissaoCtps,
                        nr_PIS_PASEP AS pis,
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
                        END AS grauInstrucao,
                        dp.cd_CNHCategoria AS categoriaCnh,
                        JSON_QUERY(
                            (SELECT
                                dp.nm_pai AS nome,
                                'PAI' AS tipoFiliacao,
                                'BIOLOGICA' AS naturezaFiliacao
                                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                        ) AS filiacaoPai,
                        JSON_QUERY(
                            (SELECT
                                dp.nm_Mae AS nome,
                                'MAE' AS tipoFiliacao,
                                'BIOLOGICA' AS naturezaFiliacao
                                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                        ) AS filiacaoMae,
                        JSON_QUERY(
                            (SELECT
                                JSON_QUERY(
                                    (SELECT
                                        '3413750' AS id
                                        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                                ) AS logradouro,
                                JSON_QUERY(
                                    (SELECT
                                        '6571' AS id
                                        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                                ) AS bairro,
                                dp.nr_cep AS cep,
                                 '0' as numero,
                                left (dp.ds_endereco,20) as descricao,
                                'true' AS principal
                                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                        ) AS enderecos,
                        nr_CNH AS cnh,
                        dp.dt_CNHvALIDADE AS dataValidadeCnh,
                        dp.uf_cnh AS ufEmissaoCnh,
                        dt_RG AS dataEmissaoIdentidade,
                        dt_ctps AS dataEmissaoCtps,
                        nr_CertifReservista AS certificadoReservista,
                        'RETENCAO_IRRF_ALIQUOTA_DA_TABELA_PROGRESSIVA' AS formaTributacao       
                        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS conteudo
            FROM FOLHFuncionario f
            JOIN FOLHFuncDadosPess dp ON dp.cd_Funcionario = f.cd_Funcionario
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        let transformedData = [];
        let fileCounter = 1;

        for (let i = 0; i < resultData.length; i++) {
            const record = resultData[i];
            const conteudo = JSON.parse(record.conteudo);

            let filiacaoPai = null;
            if (conteudo.filiacaoPai && conteudo.filiacaoPai.nome && conteudo.filiacaoPai.nome.trim() !== '') {
                filiacaoPai = {
                    nome: conteudo.filiacaoPai.nome.trim(),
                    tipoFiliacao: conteudo.filiacaoPai.tipoFiliacao,
                    naturezaFiliacao: conteudo.filiacaoPai.naturezaFiliacao
                };
            }

            let filiacaoMae = null;
            if (conteudo.filiacaoMae && conteudo.filiacaoMae.nome && conteudo.filiacaoMae.nome.trim() !== '') {
                filiacaoMae = {
                    nome: conteudo.filiacaoMae.nome.trim(),
                    tipoFiliacao: conteudo.filiacaoMae.tipoFiliacao,
                    naturezaFiliacao: conteudo.filiacaoMae.naturezaFiliacao
                };
            }

            if (typeof conteudo.cpf === 'string') {
                // Se conteudo.cpf já é uma string, podemos usar .replace diretamente
                cpf = conteudo.cpf.replace(/\./g, '').replace(/-/g, '');
            } else {
                // Se não for uma string, converta para string primeiro
                cpf = String(conteudo.cpf).replace(/\./g, '').replace(/-/g, '');
            }

            if (typeof conteudo.serieCtps === 'string') {
                // Se conteudo.ctps já é uma string, podemos usar .replace diretamente
                serieCtps = conteudo.serieCtps.replace(/\D/g, '');
            } else {
                // Se não for uma string, converta para string primeiro
                serieCtps = String(conteudo.serieCtps).replace(/\D/g, '');
            }


            let cpfAjustado
            if (typeof conteudo.cpf === 'string') {
                // Completa o CPF com zeros à esquerda até ter 11 caracteres
                cpfAjustado = conteudo.cpf.padStart(11, '0');
            }

            const formattedConteudo = {
                inicioVigencia: conteudo.inicioVigencia === "" ? null : formatDateToString(conteudo.inicioVigencia),
                tipoPessoa: conteudo.tipoPessoa === "" ? null : conteudo.tipoPessoa,
                emails: [],
                telefones: conteudo.telefones,
                historicos: [],
                nome: conteudo.nome === "" ? null : conteudo.nome,
                cpf: cpfAjustado === "" ? null : cpfAjustado,
                pis: [208, 216, 218, 219, 220, 221, 222, 223, 305, 344, 385, 390, 394, 419, 479, 869, 908, 909, 911, 913, 976, 977, 978, 1072, 1082, 1101, 1103].includes(record.idIntegracao) ? null : (conteudo.pis === "" ? null : conteudo.pis),
                dataNascimento: conteudo.dataNascimento === "" ? null : new Date(conteudo.dataNascimento).toISOString(),
                estadoCivil: conteudo.estadoCivil === "" ? null : conteudo.estadoCivil,
                sexo: conteudo.sexo === "" ? null : conteudo.sexo,
                raca: conteudo.raca === "" ? null : conteudo.raca,
                corOlhos: conteudo.corOlhos === "" ? null : conteudo.corOlhos,
                estatura: conteudo.estatura === "" ? null : conteudo.estatura,
                peso: conteudo.peso === "" ? null : conteudo.peso,
                tipoSanguineo: conteudo.tipoSanguineo === "" ? null : conteudo.tipoSanguineo,
                doador: conteudo.doador === "" ? null : conteudo.doador,
                nacionalidade: conteudo.nacionalidade === "" ? null : conteudo.nacionalidade,
                paisNascimento: conteudo.paisNascimento === "" ? null : conteudo.paisNascimento,
                naturalidade: conteudo.naturalidade === "" ? null : conteudo.naturalidade,
                naturalizado: conteudo.naturalizado === "" ? null : conteudo.naturalizado,
                dataChegada: conteudo.dataChegada === "" ? null : conteudo.dataChegada,
                casadoComBrasileiro: conteudo.casadoComBrasileiro === "" ? null : conteudo.casadoComBrasileiro,
                temFilhosBrasileiros: conteudo.temFilhosBrasileiros === "" ? null : conteudo.temFilhosBrasileiros,
                situacaoEstrangeiro: conteudo.situacaoEstrangeiro === "" ? null : conteudo.situacaoEstrangeiro,
                tempoResidencia: conteudo.tempoResidencia === "" ? null : conteudo.tempoResidencia,
                inscricaoMunicipal: conteudo.inscricaoMunicipal === "" ? null : conteudo.inscricaoMunicipal,
                identidade: conteudo.identidade === "" ? null : conteudo.identidade,
                orgaoEmissorIdentidade: conteudo.orgaoEmissorIdentidade === "" ? null : conteudo.orgaoEmissorIdentidade,
                ufEmissaoIdentidade: conteudo.ufEmissaoIdentidade === "" ? null : conteudo.ufEmissaoIdentidade,
                dataEmissaoIdentidade: conteudo.dataEmissaoIdentidade === "" ? null : conteudo.dataEmissaoIdentidade,
                dataValidadeIdentidade: conteudo.dataValidadeIdentidade === "" ? null : conteudo.dataValidadeIdentidade,
                tituloEleitor: conteudo.tituloEleitor === "" ? null : conteudo.tituloEleitor,
                zonaEleitoral: conteudo.zonaEleitoral === "" ? null : conteudo.zonaEleitoral,
                secaoEleitoral: conteudo.secaoEleitoral === "" ? null : conteudo.secaoEleitoral,
                ctps: conteudo.ctps === "" ? null : conteudo.ctps,
                serieCtps: serieCtps === "" ? null : serieCtps,
                ufEmissaoCtps: conteudo.ufEmissaoCtps === "" ? null : conteudo.ufEmissaoCtps,
                dataValidadeCtps: conteudo.dataValidadeCtps === "" ? null : conteudo.dataValidadeCtps,
                dataEmissaoPis: conteudo.dataEmissaoPis === "" ? null : conteudo.dataEmissaoPis,
                grauInstrucao: conteudo.grauInstrucao === "" ? null : conteudo.grauInstrucao,
                situacaoGrauInstrucao: conteudo.situacaoGrauInstrucao === "" ? null : conteudo.situacaoGrauInstrucao,
                certificadoReservista: conteudo.certificadoReservista === "" ? null : conteudo.certificadoReservista,
                ric: conteudo.ric === "" ? null : conteudo.ric,
                ufEmissaoRic: conteudo.ufEmissaoRic === "" ? null : conteudo.ufEmissaoRic,
                orgaoEmissorRic: conteudo.orgaoEmissorRic === "" ? null : conteudo.orgaoEmissorRic,
                dataEmissaoRic: conteudo.dataEmissaoRic === "" ? null : conteudo.dataEmissaoRic,
                cns: conteudo.cns === "" ? null : conteudo.cns,
                dataEmissaoCns: conteudo.dataEmissaoCns === "" ? null : conteudo.dataEmissaoCns,
                passaporte: conteudo.passaporte === "" ? null : conteudo.passaporte,
                dataEmissaoPassaporte: conteudo.dataEmissaoPassaporte === "" ? null : conteudo.dataEmissaoPassaporte,
                dataValidadePassaporte: conteudo.dataValidadePassaporte === "" ? null : conteudo.dataValidadePassaporte,
                orgaoEmissorPassaporte: conteudo.orgaoEmissorPassaporte === "" ? null : conteudo.orgaoEmissorPassaporte,
                categoriaCnh: conteudo.categoriaCnh === "" ? null : conteudo.categoriaCnh,
                dataVencimentoCnh: conteudo.dataVencimentoCnh === "" ? null : conteudo.dataVencimentoCnh,
                primeiraCnh: conteudo.primeiraCnh === "" ? null : conteudo.primeiraCnh,
                registroNacionalEstrangeiro: conteudo.registroNacionalEstrangeiro === "" ? null : conteudo.registroNacionalEstrangeiro,
                dataChegadaEstrangeiro: conteudo.dataChegadaEstrangeiro === "" ? null : conteudo.dataChegadaEstrangeiro,
                validadeRne: conteudo.validadeRne === "" ? null : conteudo.validadeRne,
                codigoJusticaEleitoral: conteudo.codigoJusticaEleitoral === "" ? null : conteudo.codigoJusticaEleitoral,
                nis: conteudo.nis === "" ? null : conteudo.nis,
                observacoes: conteudo.observacoes === "" ? null : conteudo.observacoes,
                filiacoes: [filiacaoPai, filiacaoMae].filter(filiacao => filiacao !== null),
                cnh: conteudo.cnh === "" ? null : conteudo.cnh,
                ufEmissaoCnh: conteudo.ufEmissaoCnh === "" ? null : conteudo.ufEmissaoCnh,
                certificadoReservista: conteudo.certificadoReservista === "" ? null : conteudo.certificadoReservista,
                formaTributacao: conteudo.formaTributacao === "" ? null : conteudo.formaTributacao
            };
            
            transformedData.push({
                idIntegracao: record.idIntegracao,
                conteudo: formattedConteudo
            });
                 


            if (transformedData.length >= 300) {
                const outputFilePath = `log_envio_${fileCounter}.json`;
                fs.writeFileSync(outputFilePath, JSON.stringify(transformedData, null, 2), 'utf-8');
                console.log(`Dados salvos em ${outputFilePath}`);
                transformedData = [];
                fileCounter++;
            }
        }

        if (transformedData.length > 0) {
            const outputFilePath = `log_envio_${fileCounter}.json`;
            fs.writeFileSync(outputFilePath, JSON.stringify(transformedData, null, 2), 'utf-8');
            console.log(`Dados salvos em ${outputFilePath}`);
        }
    } catch (error) {
        console.error('Erro durante o processamento:', error);
    } finally {
        await sql.close();
    }
}

main();
