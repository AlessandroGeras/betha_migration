import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const prisma = new PrismaClient();

export default authMiddleware(async (req, res) => {
    if (req.method === 'POST') {
        const {
            id,
            status,
            usuario,
            nome,
            email,
            perfil,
        } = req.body;

        try {
            // Atribuir o ID fornecido a perfilId após a desestruturação
            const perfilId = parseInt(id);

            // Verificar se o email já existe
            const existingParceiro = await prisma.usuarios.findFirst({
                where: {
                    email: email,
                    id: {
                        not: perfilId // Garante que o email não pertence ao parceiro que está sendo atualizado
                    }
                }
            });

            if (existingParceiro) {
                return res.status(400).json({ error: "O email já está sendo utilizado por outro parceiro." });
            }

            // Atualizar os dados usando Prisma
            await prisma.usuarios.update({
                where: { id: perfilId },
                data: {
                    status,
                    usuario,
                    nome,
                    email,
                    perfil,
                },
            });

            return res.status(200).json({ success: "Dados atualizados com sucesso." });
        } catch (error) {
            console.error('Erro ao atualizar dados:', error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    } else {
        return res.status(405).json({ error: "Método não permitido" });
    }
});
