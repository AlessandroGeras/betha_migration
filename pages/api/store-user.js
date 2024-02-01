import users from '../../models/users';
import Sequelize from 'sequelize-oracle';
import Oracledb from 'oracledb';
import dotenv from 'dotenv';

dotenv.config();

Oracledb.initOracleClient({
    libDir: '../../../opt/oracle/instantclient_19_16',
  });

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {
            status,
            observacoes,
            cpf,
            usuario,
            sobrenome,
            endereco,
            cidade,
            email,
            telefone,
            uf,
            principal
        } = req.body;

        let connection;

        try {
            // Estabeleça a conexão com o Oracle
            connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
                host: process.env.HOST,
                dialect: process.env.DIALECT || 'oracle',
            });

            const removerAcentos = (str) => {
                return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            };

            const formatarNomeCompleto = (nome, sobrenome) => {
                // Capitaliza a primeira letra do nome
                const nomeFormatado = nome.charAt(0).toUpperCase() + nome.slice(1);

                // Capitaliza a primeira letra do sobrenome
                const sobrenomeFormatado = sobrenome.charAt(0).toUpperCase() + sobrenome.slice(1);

                // Retorna o nome completo formatado
                return `${nomeFormatado} ${sobrenomeFormatado}`;
            };


            const idUsuario = `${removerAcentos(usuario)}.${removerAcentos(sobrenome)}`.toLowerCase();
            const nomeCompleto = formatarNomeCompleto(usuario, sobrenome);

            const Store = await users.create({
                STATUS: status,
                CPF: cpf,
                ENDEREÇO: endereco,
                ST_EMAIL: email,
                OBS_STATUS: observacoes,
                NM_USUARIO: nomeCompleto,
                CIDADE: cidade,
                UF: uf,
                TELEFONE: telefone,
                ID_USUARIO_INTERNO: "S",
                ID_ADM_GESTAO_TERCEIROS: "N",
                ID_USUARIO: idUsuario,
                ID_USUARIO_MEGA: 0,
                ID_ADM_RESERVA_SALA: "N",
                ID_ADM_VENDA: "N",
                ID_ADM_CONTRATO: "N",
                ID_GER_VENDA: "N",
                ID_CAD_PRODUTO: "N",
                ID_CAD_ORCAMENTO: "N",
                ID_ADM_SALA: "N",
                ID_ADM_BENS_TERCEIRO: "N",
                ID_CON_BENS_TERCEIRO: "N",
                ID_ADM_GESTAO_TERCEIROS: "N",
                ID_CON_GESTAO_TERCEIROS: "N",
                CATEGORIA_PRINCIPAL: "N/A",
                NOME_TERCEIRO: "N/A",
                CNPJ: "N/A",
                FUNCAO:principal,
            });


            if (Store) {
                res.status(200).json({ success: true, message: 'Usuário criado.' });
            }
            else {
                console.log('Falha ao criar usuário.');
                res.status(400).json({ success: false, message: 'Falha ao criar usuário.' });
            }
        } catch (error) {
            console.error('Erro ao salvar o usuário:', error);
            res.status(500).json({ success: false, message: 'Erro ao salvar o usuário.' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Método não permitido.' });
    }
}