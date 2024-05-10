import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Inicializa o Prisma Client
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            // Busca o usuário pelo email no banco de dados
            const user = await prisma.usuarios.findUnique({
                where: {
                    email: email,
                },
            });

            // Verifica se o usuário foi encontrado
            if (!user) {
                return res.status(401).json({ error: "E-mail inválido" });
            }

            // Verifica a correspondência da senha usando bcrypt
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                // Senha corresponde, usuário autenticado com sucesso
                const token = jwt.sign({ userId: user.email }, process.env.JWT_SECRET, { expiresIn: '4h' });

                // Define o token no cookie HTTPOnly
                res.setHeader('Set-Cookie', `jwt=${token}; HttpOnly; Max-Age=14400`);

                return res.status(200).json({ success: "Usuário logado", usuario: user });
            } else {
                // Senha não corresponde
                return res.status(401).json({ error: "Senha inválida" });
            }
        } catch (error) {
            console.error('Erro ao executar consulta Prisma:', error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    } else {
        return res.status(405).json({ error: "Método não permitido" });
    }
}
