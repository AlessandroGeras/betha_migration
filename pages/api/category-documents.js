import categoria_documentos from '../../models/categoryDocuments';
import users from '../../models/users';
import outsourceds from '../../models/outsourceds';
import Sequelize from 'sequelize-oracle';
import Oracledb from 'oracledb';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

Oracledb.initOracleClient( {libdir: 'C:\\app\\instantclient_19_64Bits'} )

const getAllDocs = async (pageSize) => {
    let allDocs = [];
    let offset = 0;

    while (true) {
        const result = await categoria_documentos.findAll({
            attributes: ['CATEGORIA', 'NUMERACAO', 'AUDITORIA', 'FORMATO_VENCIMENTO'],
            offset,
            limit: pageSize,
            order: [['CATEGORIA', 'ASC']], // Ordena por ordem alfabética
        });

        if (result.length === 0) {
            break; // Saia do loop se não houver mais resultados
        }

        allDocs = [...allDocs, ...result];
        offset += pageSize;
    }

    return allDocs;
};

const getAllEnterprises = async () => {
    let offset = 0;
    let limit = 100;
    let allEnterprises = [];

    while (true) {
        const result = await outsourceds.findAll({
            limit,
            offset,
        });

        if (result.length === 0) {
            break; // Saia do loop se não houver mais resultados
        }

        allEnterprises = [...allEnterprises, ...result];
        offset += limit;
    }

    return allEnterprises;
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { token, getAll,id } = req.body;
        let findAdmin = null;

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

            // Verificar se a conexão foi bem-sucedida
            await connection.authenticate();

            findAdmin = await users.findOne({
                where: {
                  ID_USUARIO: id,
                  ID_USUARIO_INTERNO: 'S',
                },
              });
        
              if(findAdmin == null){
                res.status(403).json({ success: false, message: 'Você não tem autorização para ver a página.' });
              }

            const outsourcedCount = await categoria_documentos.count();

            // Configuração da paginação
            const page = parseInt(req.query.page) || 1; // Página atual
            const pageSize = parseInt(req.query.pageSize) || 100; // Itens por página

            if (getAll) {
                // Se getAll for true, busca todos os registros
                const allDocs = await getAllDocs(pageSize);
                const enterprise = await getAllEnterprises();

                // Filtrar os valores nulos e "N/A"
                const filteredEnterprises = enterprise
                    .filter(user => user.NOME_TERCEIRO !== null && user.NOME_TERCEIRO !== 'N/A');

                // Obter valores distintos
                const uniqueEnterprises = [...new Set(filteredEnterprises.map(user => user.NOME_TERCEIRO))];

                res.status(200).json({
                    success: true,
                    message: 'Categorias encontradas',
                    docs: {
                        rows: allDocs,
                        count: allDocs.length,
                        outsourcedCount: outsourcedCount,
                    },
                    uniqueEnterprises,
                });
            }

            else {

                // Consulta paginada usando Sequelize com filtro
                const docs = await categoria_documentos.findAndCountAll({
                    attributes: ['CATEGORIA', 'NUMERACAO', 'AUDITORIA', 'FORMATO_VENCIMENTO'],
                    offset: (page - 1) * pageSize,
                    limit: pageSize,
                });

                const usersfound = await categoria_documentos.findAndCountAll({
                    offset: (page - 1) * pageSize,
                    limit: pageSize,
                });

                res.status(200).json({
                    success: true,
                    message: 'Categorias de documentos encontradas',
                    docs: {
                        rows: docs.rows,
                        count: docs.count,
                    },
                    usersfound: {
                        rows: usersfound.rows,
                        count: usersfound.count,
                    },
                });
            }
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                console.error('Token expirado:', error);
                res.status(401).json({ success: false, message: 'Token expirado' });
            }
            else {
                console.error('Erro ao contatar o servidor:', error);
                res.status(500).json({ success: false, message: 'Erro ao contatar o servidor' });
            }
        } finally {
            // Fechar a conexão no final, se estiver aberta
            if (connection) {
                connection.close();
            }
        }
    }
}
