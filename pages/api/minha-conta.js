import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Inicializa o Prisma Client
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { userId } = req.body;

        try {
            // Busca o usuário pelo email no banco de dados
            const user = await prisma.usuarios.findUnique({
                where: {
                    email: userId,
                },
            });

            return res.status(200).json({ usuario: user });

        } catch (error) {
            console.error('Erro ao executar consulta Prisma:', error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    } else {
        return res.status(405).json({ error: "Método não permitido" });
    }
}
