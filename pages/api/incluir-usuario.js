import { PrismaClient, Prisma } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const prisma = new PrismaClient();

export default authMiddleware(async (req, res) => {
    if (req.method === 'POST') {
        const {
            status,
            usuario,
            nome,
            email,
            perfil,
        } = req.body;
        
        try {
            // Verificar se o email já existe no banco de dados
            const existingUser = await prisma.usuarios.findUnique({
                where: { email },
            });

            if (existingUser) {
                // Se o usuário já existir, retorne um erro indicando que o email já está em uso
                return res.status(400).json({ error: "O email fornecido já está em uso." });
            }

            // Inserir os dados usando Prisma
            await prisma.usuarios.create({
                data: {
                    status,
                    usuario,
                    nome,
                    email,
                    perfil,
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
