import { PrismaClient, Prisma } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const prisma = new PrismaClient();

export default authMiddleware(async (req, res) => {
    if (req.method === 'POST') {
        const {
            status,
            prefeitura,
            revenda,
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
            // Verificar se o email já existe
            const existingPrefeitura = await prisma.prefeituras.findFirst({
                where: {
                    email: email,
                },
            });

            if (existingPrefeitura) {
                return res.status(400).json({ erro: "O email já está em uso." });
            }

            // Inserir os dados usando Prisma
            await prisma.prefeituras.create({
                data: {
                    status,
                    prefeitura,
                    revenda,
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
