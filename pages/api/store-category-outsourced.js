import categoryOutsourced from '../../models/categoryOutsourced';
import Sequelize from 'sequelize-oracle';
import Oracledb from 'oracledb';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';


dotenv.config();

Oracledb.initOracleClient({
    libDir: 'C:\\Users\\aless\\Downloads\\instantclient-basic-windows.x64-21.12.0.0.0dbru\\instantclient_21_12',
});

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

        let connection;

        try {
            jwt.verify(token, process.env.SECRET);

            // Estabeleça a conexão com o Oracle
            connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
                host: process.env.HOST,
                dialect: process.env.DIALECT || 'oracle',
            }); 

            const Store = await categoryOutsourced.create({
                CATEGORIA: categoria_terceiro,
                TIPO_DOCUMENTO: categorias.join(', '),
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
