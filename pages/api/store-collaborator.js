import outsourceds from '../../models/outsourceds';
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
            principal,
            nome_terceiro,
            id_usuario
        } = req.body;

        

        let connection;

        try {
            // Estabeleça a conexão com o Oracle
            connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
                host: process.env.HOST,
                dialect: process.env.DIALECT || 'oracle',
            });  


            const Store = await outsourceds.create({
                STATUS: status,
                CPF: cpf,
                ENDEREÇO: endereco,
                /* ST_EMAIL: email, */
                OBS_STATUS: observacoes,
                NM_USUARIO: usuario,
                CIDADE: cidade,
                UF: uf,
                /* TELEFONE: telefone, */
                ID_USUARIO: id_usuario,    
                CATEGORIA_PRINCIPAL: "N/A",
                NOME_TERCEIRO: nome_terceiro,
                CNPJ: "N/A",
                FUNCAO:principal,
                COLABORADOR_TERCEIRO: "S",
                ID_USUARIO_INTERNO: "N",
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
