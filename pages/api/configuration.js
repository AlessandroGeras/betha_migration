import configuration from '../../models/configuration';
import auditoria from '../../models/auditoria';
import Sequelize from 'sequelize-oracle';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const notificacao = await configuration.findOne({
                attributes: ['NOTIFICACAO'],
                order: [['NOTIFICACAO', 'DESC']],
            });

            const auditoria_dia_fixo = await auditoria.findOne({
                attributes: ['DIA_FIXO'],
                order: [['DIA_FIXO', 'ASC']],
            });

            res.status(200).json({
                success: true,
                message: 'Configurações encontradas com sucesso',
                notificacao,
                auditoria_dia_fixo,
            });
        } catch (error) {
            console.error('Erro ao buscar configurações:', error);
            res.status(500).json({ success: false, message: 'Erro ao buscar configurações' });
        }
    } else if (req.method === 'POST') {
        const { formData: { notificacao, auditoria }, token } = req.body;

        if (!token) {
            return res.status(401).json({ success: false, message: 'Token não fornecido' });
        }

        try {
            const decodedToken = jwt.verify(token, process.env.SECRET);

            // Adicione verificação de permissões se necessário

            const currentDate = new Date();
            const timestamp = currentDate.getTime();

            const notification = await configuration.create({
                NOTIFICACAO: notificacao,
                CREATED_AT: timestamp,
            });

            const auditoria_dia_fixo = await auditoria.create({
                DIA_FIXO: auditoria,
            });

            res.status(200).json({
                success: true,
                message: 'Configuração atualizada com sucesso',
            });
        } catch (error) {
            console.error('Erro ao atualizar configurações:', error);
            if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
                res.status(401).json({ success: false, message: 'Token inválido ou expirado' });
            } else {
                res.status(500).json({ success: false, message: 'Erro ao atualizar configurações' });
            }
        }
    } else {
        res.status(405).json({ message: 'Método não permitido' });
    }
}
