import documents from '../../models/documents';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {
            categorias,
            nome_terceiro,
            token
        } = req.body;

        if (!token) {
            return res.redirect(302, '/login'); // Redireciona para a página de login
        }

        try {
            jwt.verify(token, process.env.SECRET);

            const docs = await documents.findAll({
                where: {
                    TERCEIRO: nome_terceiro,
                    STATUS: "Pendente",
                    COLABORADOR: null,
                },
            });

            // Mapeia os tipos de documento existentes no resultado da consulta
            const tiposDocumentoDocs = docs.map(doc => doc.TIPO_DOCUMENTO);

            // Encontra os tipos de documento que estão presentes em ambas as arrays
            const tiposDocumentoDuplicados = categorias.filter(categoria => tiposDocumentoDocs.includes(categoria));

            if (tiposDocumentoDuplicados.length > 0) {
                console.log('Tipos de documento duplicados:', tiposDocumentoDuplicados);
                // Faça algo com a informação de duplicatas, por exemplo, envie para o cliente
                res.status(400).json({ success: false, message: 'Duplicatas encontradas.', duplicatas: tiposDocumentoDuplicados });
            }
            else {
                // Loop sobre cada categoria e crie um registro para cada uma
                for (const categoria of categorias) {
                    // Remova a tentativa de definir ID_DOCUMENTO explicitamente
                    const Store = await documents.create({
                        STATUS: "Pendente",
                        TIPO_DOCUMENTO: categoria,
                        TERCEIRO: nome_terceiro,
                        // Adicione outros campos conforme necessário
                    });

                    // Adicione outras lógicas aqui conforme necessário para cada categoria
                }

                res.status(200).json({ success: true, message: 'Pendências de documento criadas.' });

            }
        } catch (error) {
            console.error('Erro ao criar as pendências de documento.', error);
            res.status(500).json({ success: false, message: 'Erro ao criar as pendências de documento.' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Método não permitido.' });
    }
}
