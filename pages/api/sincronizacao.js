import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const prisma = new PrismaClient();

export default authMiddleware(async (req, res) => {
    if (req.method === 'POST') {
        try {
            // Busca todas as remessas no banco de dados
            const remessas = await prisma.sincronizacao.findMany();

            return res.status(200).json({ success: remessas });
        } catch (error) {
            console.error('Erro ao executar consulta Prisma:', error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    } else {
        return res.status(405).json({ error: "Método não permitido" });
    }
});
