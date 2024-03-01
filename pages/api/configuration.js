import configuration from '../../models/configuration';
import auditoria from '../../models/auditoria';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export default async function handler(req, res) {
    if (req.method === 'GET') {   

        try {
            const notificacao = await configuration.findOne({
                attributes: ['NOTIFICACAO'],
                order: [['NOTIFICACAO', 'DESC']], // Ordenar em ordem decrescente pela coluna ULTIMA_COBRANÇA
            });

            const auditoria_dia_fixo = await auditoria.findOne({
                attributes: ['DIA_FIXO'],
                order: [['DIA_FIXO', 'DESC']], // Ordenar em ordem decrescente pela coluna ULTIMA_COBRANÇA
            });

            res.status(200).json({
                success: true,
                message: 'Todos as categorias encontradas',
                notificacao,
                auditoria_dia_fixo,
            });

        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                console.error('Token expirado:', error);
                res.status(401).json({ success: false, message: 'Token expirado' });
            } else {
                console.error('Erro ao contatar o servidor:', error);
                res.status(500).json({ success: false, message: 'Erro ao contatar o servidor' });
            }
        }
    }
    else if (req.method === 'POST') {
        const { formData:{notificacao, auditoria},token } = req.body;

        if (!token) {
            return res.redirect(302, '/login'); // Redireciona para a página de login
        }

        try {
            jwt.verify(token, process.env.SECRET);            

            const notification= await configuration.create({
                NOTIFICACAO: notificacao,
            }, {
                fields: ['NOTIFICACAO'], // Especifique os campos que deseja incluir
            });

            const auditoria_dia_fixo= await auditoria.create({
                DIA_FIXO: auditoria,
            }, {
                fields: ['DIA_FIXO'], // Especifique os campos que deseja incluir
            });

            res.status(200).json({
                success: true,
                message: 'Configuração atualizada com sucesso',
            });

        } catch (error) {
            console.error('Erro ao atualizar a configuração:', error);
            res.status(500).json({ success: false, message: 'Erro ao atualizar a configuração' });
        }
    }
    else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};

