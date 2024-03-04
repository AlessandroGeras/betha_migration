import outsourceds from '../../models/outsourceds';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';


dotenv.config();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        

        try {
            jwt.verify(token, process.env.SECRET);

            const user = await outsourceds.findOne({
                where: {
                    NOME_TERCEIRO: id,
                    COLABORADOR_TERCEIRO: 'N',
                },
            });


            if (!user) {
                return res.status(403).json({ error: 'Falha ao localizar o Terceiro.' });
            }

            res.status(200).json({ user });
        } catch (error) {
            console.error('Falha ao consultar o banco de dados:', error);
            res.status(500).json({ error: 'Erro ao consultar o banco de dados:' + error });
        } finally {

        }
    }
    else if (req.method === 'POST') {
        const {
            id,
            selectedStatus,
            token
        } = req.body;


        try {
            const user = await outsourceds.findOne({
                where: {
                    NOME_TERCEIRO: id,
                    COLABORADOR_TERCEIRO: 'N',
                },
            });

            user.STATUS = selectedStatus;

            await existingUser.save();

            if (!user) {
                return res.status(403).json({ error: 'Falha ao localizar o Terceiro.' });
            }

            res.status(200).json({ success: true, message: 'Status salvo.' });
        } catch (error) {
            console.error('Falha ao consultar o banco de dados:', error);
            res.status(500).json({ error: 'Erro ao consultar o banco de dados:' + error });
        } finally {

        }
    }
}
