import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const prisma = new PrismaClient();

export default authMiddleware(async (req, res) => {
    if (req.method === 'POST') {
        const {
            usuario,
            nome,
            email,
            id,
        } = req.body;
        
        try {
            // Verificar se o email já existe na tabela para outro usuário
            const existingUser = await prisma.usuarios.findFirst({
                where: {
                    email: { equals: email },
                    id: { not: id },
                },
            });

            if (existingUser) {
                // Se o email já existe para outro usuário, cancelar a atualização
                return res.status(400).json({ error: "O email fornecido já está em uso." });
            }

            // Atualizar os dados usando Prisma
            const updatedUser = await prisma.usuarios.update({
                where: { id },
                data: {
                    usuario,
                    nome,
                    email,
                },
            });

            return res.status(200).json({ success: "Dados atualizados com sucesso.", usuario: updatedUser });
        } catch (error) {
            console.error('Erro ao atualizar dados:', error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    } else {
        return res.status(405).json({ error: "Método não permitido" });
    }
});
