import categoryOutsourced from '../../models/categoryOutsourced';
import Sequelize from 'sequelize-oracle';
import Oracledb from 'oracledb';
import dotenv from 'dotenv';

dotenv.config();

Oracledb.initOracleClient({
    libDir: 'C:\\Users\\aless\\Downloads\\instantclient-basic-windows.x64-21.12.0.0.0dbru\\instantclient_21_12',
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {
            nome,
            tipo_documento,
        } = req.body;

        let connection;

        try {
            // Estabeleça a conexão com o Oracle
            connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
                host: process.env.HOST,
                dialect: process.env.DIALECT || 'oracle',
            });  

            const Store = await categoryOutsourced.create({
                CATEGORIA: nome,
            }, {
                fields: ['CATEGORIA'], // Especifique os campos que deseja incluir
            });
            

            if (Store) {
                res.status(200).json({ success: true, message: 'Categoria criada.' });
            }
            else {
                console.log('Falha ao criar a categoria.');
                res.status(400).json({ success: false, message: 'Falha ao criar a categoria.' });
            }
        } catch (error) {
            console.error('Erro ao salvar a categoria:', error);
            res.status(500).json({ success: false, message: 'Erro ao salvar a categoria.' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Método não permitido.' });
    }
}
