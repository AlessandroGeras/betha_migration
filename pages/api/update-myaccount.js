import users from '../../models/users';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {
            id_user,
            usuario,
            endereco,
            cidade,
            email,
            telefone,
            uf,
            password,
        } = req.body;


        try {
            jwt.verify(token, process.env.SECRET);   


            const existingUser = await users.findOne({ where: { ID_USUARIO: id_user } });
            const user = existingUser;

            const hashedPassword = bcrypt.hashSync(password, 10);

            existingUser.ENDEREÇO = endereco;
            existingUser.ST_EMAIL = email;
            existingUser.CIDADE = cidade;
            existingUser.UF = uf;
            existingUser.TELEFONE = telefone;
            existingUser.DS_SENHA = hashedPassword;

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
