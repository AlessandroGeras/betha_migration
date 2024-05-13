import { PrismaClient, Prisma } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';
import nodemailer from 'nodemailer';

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

            const transporter = nodemailer.createTransport({
                host: 'mail.estilofontana.com.br',
                port: 587,
                secure: false, // true para SSL, false para outros
                auth: {
                  user: 'noreply@estilofontana.com.br',
                  pass: 'eQNd6x2tTifPBIaX3ZcA',
                },
              });

              await transporter.sendMail({
                from: 'noreply@estilofontana.com.br',
                to: email,
                subject: 'Cadastro - Portal Prestação de Contas',
                html: `<p>Instruções para recuperação de senha do Portal Prestação de Contas:</p>
                       <p>Olá, sua conta foi criada no Portal Prestação de Contas da Betha.</p>
                       <p>Clique no link abaixo e clique em "Esqueci a senha" para gerar a senha da sua conta.</p>
                       <p><a href="http://localhost:3000/login" style="color: #3498db; text-decoration: none; font-weight: bold;">Redefinir Senha</a></p>                       
                       <br><br>
                       <h4">Portal Prestação de Contas</h4>
                       <img src='https://minertecnologia.com/wp-content/uploads/2021/11/Logo-02-1024x430.png' style='width: 25%;' />`,
              });

            return res.status(200).json({ success: "Dados inseridos com sucesso." });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                // Erro de violação de restrição única
                return res.status(400).json({ error: "O email fornecido já está em uso." });
            }
            console.error('Erro ao inserir dados:', error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    } else {
        return res.status(405).json({ error: "Método não permitido" });
    }
});
