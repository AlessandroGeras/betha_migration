import outsourceds from '../../models/outsourceds';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { token, formData, id } = req.body;

        try {
            jwt.verify(token, process.env.SECRET);  

            const existingUser = await outsourceds.findOne({
                where: {
                  NOME_TERCEIRO: id,
                  COLABORADOR_TERCEIRO: 'N',        
                },
              }); 

            
            existingUser.STATUS = formData.status;     

            await existingUser.save();

            res.status(200).json({ success: true, message: 'Status salvo com sucesso.' });

        } catch (error) {
            console.error('Erro ao alterar os dados do Terceiro:', error);
            res.status(500).json({ success: false, message: 'Erro ao alterar os dados do Terceiro.' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Método não permitido.' });
    }
}
