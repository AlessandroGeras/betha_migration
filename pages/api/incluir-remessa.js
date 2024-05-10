import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const prisma = new PrismaClient();

export default authMiddleware(async (req, res) => {
    if (req.method === 'POST') {
        const {
            status,
            modulo,
            nome,
            arquivo,
            remessa,
        } = req.body;

        try {
            // Insere um novo layout no banco de dados usando o Prisma
            await prisma.remessas.create({
                data: {
                    status,
                    modulo,
                    nome,
                    arquivo,
                    remessa,
                },
            });

            return res.status(200).json({ success: "Dados inseridos com sucesso." });
        } catch (error) {
            console.error('Erro ao inserir dados:', error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    } else {
        return res.status(405).json({ error: "Método não permitido" });
    }
});
