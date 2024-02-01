import users from '../../models/users';
import Sequelize from 'sequelize-oracle';
import Oracledb from 'oracledb';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

Oracledb.initOracleClient({
    libDir: '../../../opt/oracle/instantclient_19_16',
  });

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {
            cpf,
            id_user,
            usuario,
            endereco,
            cidade,
            email,
            telefone,
            uf,
            password,
            principal,
            status
        } = req.body;

        let connection;

        console.log(usuario);

        try {
            // Estabeleça a conexão com o Oracle
            connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
                host: process.env.HOST,
                dialect: process.env.DIALECT || 'oracle',
            });


            const existingUser = await users.findOne({ where: { ID_USUARIO: id_user } });
            const user = existingUser;

            existingUser.ENDEREÇO = endereco;
            existingUser.ST_EMAIL = email;
            existingUser.CIDADE = cidade;
            existingUser.UF = uf;
            existingUser.TELEFONE = telefone;
            existingUser.CPF = cpf;
            existingUser.FUNCAO = principal;
            existingUser.STATUS = status;

            if (password) {
                const hashedPassword = bcrypt.hashSync(password, 10);
                existingUser.DS_SENHA = hashedPassword;
            }

            await existingUser.save();

            res.status(200).json({ user });

        } catch (error) {
            console.error('Erro ao alterar os dados pessoais:', error);
            res.status(500).json({ success: false, message: 'Erro ao alterar os dados pessoais.' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Método não permitido.' });
    }
}
