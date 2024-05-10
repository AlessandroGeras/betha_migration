import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const prisma = new PrismaClient();

export default authMiddleware(async (req, res) => {
    if (req.method === 'POST') {
        const {
            prefeitura,
            status,
            observacoes,
            cnpj,
            revenda,
            contato,
            endereco,
            cidade,
            email,
            telefone,
            uf,
        } = req.body;
        
        try {
            // Inserir os dados usando Prisma
            await prisma.prefeituras.create({
                data: {
                    prefeitura,
                    status,
                    observacoes,
                    cnpj,
                    revenda,
                    contato,
                    endereco,
                    cidade,
                    email,
                    telefone,
                    uf,
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
