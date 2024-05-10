import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const prisma = new PrismaClient();

export default authMiddleware(async (req, res) => {
    if (req.method === 'POST') {
        const {           
            status,
            parceiro,
            cnpj,
            endereco,
            cidade,
            uf,
            telefone,
            observacoes,
            contato,
            email,
        } = req.body;

        try {
            // Inserir os dados usando Prisma
            await prisma.parceiros.create({
                data: {
                    status,
                    parceiro,
                    cnpj,
                    endereco,
                    cidade,
                    uf,
                    telefone,
                    observacoes,
                    contato,
                    email,
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
