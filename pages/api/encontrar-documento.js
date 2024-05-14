import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const prisma = new PrismaClient();

export default authMiddleware(async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { id } = req.body;

            // Verifica se o ID foi fornecido no corpo da requisição
            if (!id) {
                return res.status(400).json({ error: "ID do perfil não fornecido" });
            }

            // Busca o perfil pelo ID no banco de dados
            const perfil = await prisma.documentos.findUnique({
                where: {
                    id: parseInt(id), // Convertendo o ID para número, se necessário
                },
            });

            // Verifica se o perfil foi encontrado
            if (!perfil) {
                return res.status(404).json({ error: "Perfil não encontrado" });
            }

            return res.status(200).json({ success: perfil });
        } catch (error) {
            console.error('Erro ao executar consulta Prisma:', error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    } else {
        return res.status(405).json({ error: "Método não permitido" });
    }
});
