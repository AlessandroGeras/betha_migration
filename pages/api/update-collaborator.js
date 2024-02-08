import outsourceds from '../../models/outsourceds';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

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
        

        try {
            jwt.verify(token, process.env.SECRET);   


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
