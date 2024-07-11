import sql from 'mssql';
import dotenv from 'dotenv';
import { testDatabaseConnection } from '../../config/database.mjs';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

dotenv.config();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Método não permitido
  }

  const { email } = req.body;

  try {
    const connection = await testDatabaseConnection(); // Criar a conexão com o banco de dados

    // Consulta SQL para selecionar todos os registros da tabela 'usuarios'
    const query = `
      USE USUARIOS;
      SELECT * FROM usuarios WHERE email = '${email}'
    `;

    const request = new sql.Request(connection); // Usar a conexão criada

    const result = await request.query(query);

    // Verificar se há registros retornados
    if (result.recordset.length > 0) {
        console.log(`Usuário encontrado na tabela 'usuarios'.`);
        
        // Gerar token de e-mail
        const token = jwt.sign({ email }, process.env.SECRET_EMAIL, { expiresIn: '1h' });
        
        // Atualizar o token de e-mail na tabela de usuários
        const updateQuery = `UPDATE usuarios SET email_token = '${token}' WHERE email = '${email}'`;
        await request.query(updateQuery);

        // Configurar o serviço de e-mail
        const transporter = nodemailer.createTransport({
          host: 'smtp.skymail.net.br',
          port: 587,
          secure: false,
          auth: {
            user: 'suporte@minertecnologia.com',
            pass: 'mnr@sup0rt3',
          },
        });

        // Enviar e-mail
        await transporter.sendMail({
          from: 'suporte@minertecnologia.com',
          to: email,
          subject: 'Recuperação de Senha - Portal Prestação de Contas',
          html: `<p>Instruções para recuperação de senha do Portal Prestação de Contas:</p>
                 <p>Clique no link abaixo para redefinir sua senha:</p>
                 <p><a href="http://localhost:5000/password-reset?token=${token}" style="color: #3498db; text-decoration: none; font-weight: bold;">Redefinir Senha</a></p>
                 <p>O link possui validade de 1 hora, após isso será necessário fazer outra requisição de recuperação de senha.</p>               
                 <br><br>
                 <h4">Portal Monitoramento de Migração</h4>
                 <img src='https://minertecnologia.com/wp-content/uploads/2021/11/Logo-02-1024x430.png' style='width: 25%;' />`,
        });

        console.log('E-mail enviado com sucesso.');
        
        return res.status(200).json({ success: true });
    } else {
        console.log("Nenhum registro encontrado na tabela 'usuarios' para o email fornecido.");
        return res.status(404).json({ error: 'Nenhum registro encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar os registros da tabela:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}