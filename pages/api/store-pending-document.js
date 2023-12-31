import documents from '../../models/documents';
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
            status,
            tipo_documento,
            nomeTerceiro,
            colaborador,
            vencimento,
        } = req.body;

        let connection;

        try {
            // Estabeleça a conexão com o Oracle
            connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
                host: process.env.HOST,
                dialect: process.env.DIALECT || 'oracle',
            });      

            // Remova a tentativa de definir ID_DOCUMENTO explicitamente
            const Store = await documents.create({
                STATUS: status,
                TIPO_DOCUMENTO: tipo_documento,
                TERCEIRO: nomeTerceiro,
                COLABORADOR: colaborador,
                VENCIMENTO: vencimento,
            });

            res.status(200).json({ success: true, message: 'Pendência de documento criada.' });
            
        } catch (error) {
            console.error('Erro ao criar a pendência de documento.', error);
            res.status(500).json({ success: false, message: 'Erro ao criar a pendência de documento.' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Método não permitido.' });
    }
}
