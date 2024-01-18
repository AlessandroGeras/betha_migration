import categoria_documentos from '../../models/categoryDocuments';
import outsourceds from '../../models/outsourceds';
import Sequelize from 'sequelize-oracle';
import Oracledb from 'oracledb';
import dotenv from 'dotenv';

dotenv.config();

Oracledb.initOracleClient({
    libDir: 'C:\\Users\\aless\\Downloads\\instantclient-basic-windows.x64-21.12.0.0.0dbru\\instantclient_21_12',
});

export default async function handler(req, res) {
    let connection;

    try {
        // Estabeleça a conexão com o Oracle
        connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
            host: process.env.HOST,
            dialect: process.env.DIALECT || 'oracle',
        });

        // Verificar se a conexão foi bem-sucedida
        await connection.authenticate();

        // Configuração da paginação
        const page = parseInt(req.query.page) || 1; // Página atual
        const pageSize = parseInt(req.query.pageSize) || 100; // Itens por página

        // Consulta paginada usando Sequelize com filtro
        const docs = await categoria_documentos.findAndCountAll({
            attributes: ['CATEGORIA'],
            offset: (page - 1) * pageSize,
            limit: pageSize,
        });

        const usersfound = await outsourceds.findAndCountAll({
            where: {COLABORADOR_TERCEIRO: 'N' },
            offset: (page - 1) * pageSize,
            limit: pageSize,
        });

        res.status(200).json({
            success: true,
            message: 'Categorias de documentos e usuários terceirizados encontrados',
            docs: {
                rows: docs.rows,
                count: docs.count,
            },
            usersfound: {
                rows: usersfound.rows,
                count: usersfound.count,
            },
        });
    } catch (error) {
        console.error('Erro ao contatar o servidor:', error);
        res.status(500).json({ success: false, message: 'Erro ao contatar o servidor' });
    } finally {
        // Fechar a conexão no final, se estiver aberta
        if (connection) {
            connection.close();
        }
    }
}
