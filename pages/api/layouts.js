import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const prisma = new PrismaClient();

export default authMiddleware(async (req, res) => {
    if (req.method === 'POST') {
        try {
            // Busca todos os layouts no banco de dados
            const layouts = await prisma.layouts.findMany();

            return res.status(200).json({ success: layouts });
        } catch (error) {
            console.error('Erro ao executar consulta Prisma:', error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    } else {
        return res.status(405).json({ error: "Método não permitido" });
    }
});
