import categoryOutsourced from '../../models/categoryOutsourced';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';


dotenv.config();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {
            categoria_terceiro,
            categorias = [],
            token,
        } = req.body;

        if (!token) {
            return res.redirect(302, '/login'); // Redireciona para a página de login
        }

        try {
            jwt.verify(token, process.env.SECRET);            

            const Store = await categoryOutsourced.create({
                CATEGORIA: categoria_terceiro,
                TIPO_DOCUMENTO: categorias.join('# '),
            }, {
                fields: ['CATEGORIA','TIPO_DOCUMENTO'],
            });


            if (Store) {
                res.status(200).json({ success: true, message: 'Categoria criada.' });
            }
            else {
                console.log('Falha ao criar a categoria.');
                res.status(400).json({ success: false, message: 'Falha ao criar a categoria.' });
            }
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                console.error('Token expirado:', error);
                res.status(401).json({ success: false, message: 'Token expirado' });
            } else {
                console.error('Erro ao contatar o servidor:', error);
                res.status(500).json({ success: false, message: 'Erro ao contatar o servidor' });
            }
        }
    } else {
        res.status(405).json({ success: false, message: 'Método não permitido.' });
    }
}
