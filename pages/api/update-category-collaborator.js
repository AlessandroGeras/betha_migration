import categoria_colaboradores from '../../models/categoryCollaborators';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { categoria_colaborador, categorias, token } = req.body;

        if (!token) {
            return res.redirect(302, '/login'); // Redireciona para a página de login
        }

        try {
            jwt.verify(token, process.env.SECRET);   

            const existingCategory = await categoria_colaboradores.findOne({
                attributes: ['CATEGORIA', 'TIPO_DOCUMENTO'],
                 where: { CATEGORIA: categoria_colaborador }
                 });

            existingCategory.CATEGORIA = categoria_colaborador;
            existingCategory.TIPO_DOCUMENTO = categorias.join(', '),

            await existingCategory.save();

            res.status(200).json({ success: true, message: 'Categoria alterada' });

        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                console.error('Token expirado:', error);
                res.status(401).json({ success: false, message: 'Token expirado' });
            }
            else {
                console.error('Erro ao alterar os dados da categoria:', error);
                res.status(500).json({ success: false, message: 'Erro ao alterar os dados da categoria.' });
            }
        }
    } else {
        res.status(405).json({ success: false, message: 'Método não permitido.' });
    }
}
