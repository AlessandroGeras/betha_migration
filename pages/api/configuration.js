import configuration from '../../models/configuration';
import outsourceds from '../../models/outsourceds';
import Sequelize from 'sequelize-oracle';
import Oracledb from 'oracledb';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

Oracledb.initOracleClient( {libdir: 'C:\\app\\instantclient_19_64Bits'} )


export default async function handler(req, res) {
    if (req.method === 'GET') {        

        let connection;

        try {
            // Estabeleça a conexão com o Oracle
            connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
                host: process.env.HOST,
                dialect: process.env.DIALECT || 'oracle',
            });

            const notificacao = await configuration.findOne({
                attributes: ['NOTIFICACAO'],
                order: [['NOTIFICACAO', 'DESC']], // Ordenar em ordem decrescente pela coluna ULTIMA_COBRANÇA
            });

            res.status(200).json({
                success: true,
                message: 'Todos as categorias encontradas',
                notificacao,
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
        const { formData:{notificacao},token } = req.body;

        if (!token) {
            return res.redirect(302, '/login'); // Redireciona para a página de login
        }

        let connection;

        try {
            jwt.verify(token, process.env.SECRET);

            // Estabeleça a conexão com o Oracle
            connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
                host: process.env.HOST,
                dialect: process.env.DIALECT || 'oracle',
            });

            const notification= await configuration.create({
                NOTIFICACAO: notificacao,
            }, {
                fields: ['NOTIFICACAO'], // Especifique os campos que deseja incluir
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

