import categoria_documentos from '../../models/categoryDocuments';
import users from '../../models/users';
import outsourceds from '../../models/outsourceds';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import categoria_terceiros from '../../models/categoryOutsourced';

dotenv.config();

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
        let { token, getAll, id, id_user } = req.body;
        let category = null;
        let findAdmin = null;

        if (id == undefined) {
            id = false;
        }

        if (!token) {
            return res.redirect(302, '/login'); // Redireciona para a página de login
        }

        try {
            jwt.verify(token, process.env.SECRET);            

            const outsourcedCount = await categoria_documentos.count();

            if (id != false) {
                category = await categoria_terceiros.findOne({
                    where: {
                        CATEGORIA: id
                    },
                });
            }
            else {
                id = null;
            }

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
                    category,
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

        }
    }
}
