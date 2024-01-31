import outsourceds from '../../models/outsourceds';
import Sequelize from 'sequelize-oracle';
import Oracledb from 'oracledb';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

Oracledb.initOracleClient({
    libDir: '../../instantclient_21_12',
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {
            id_user,
            cpf,
            usuario,
            sobrenome,
            endereco,
            cidade,
            email,
            telefone,
            uf,
            principal,
            status,
            obs_status,
            nome_terceiro,
        } = req.body;

        let connection;

        try {
            // Estabeleça a conexão com o Oracle
            connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
                host: process.env.HOST,
                dialect: process.env.DIALECT || 'oracle',
            });


            const existingUser = await outsourceds.findOne({ where: {
                ID_USUARIO: id_user,
                COLABORADOR_TERCEIRO: 'S',
             }});
            const user = existingUser;    

            existingUser.ENDEREÇO = endereco;
           /*  existingUser.ST_EMAIL = email; */
            existingUser.CIDADE = cidade;
            existingUser.UF = uf;
            /* existingUser.TELEFONE = telefone; */
            existingUser.CPF = cpf;
            existingUser.NW_USER = usuario;
            existingUser.FUNCAO = principal;
            existingUser.STATUS = status;
            existingUser.NOME_TERCEIRO = nome_terceiro;    

            await existingUser.save();

            res.status(200).json({ user });

        } catch (error) {
            console.error('Erro ao alterar os dados de cadastro:', error);
            res.status(500).json({ success: false, message: 'Erro ao alterar os dados de cadastro.' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Método não permitido.' });
    }
}
