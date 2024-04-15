import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { testDatabaseConnection } from '../../config/database.mjs';
require('dotenv').config();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Método não permitido
  }

  const { email } = req.body;

  try {
    // Atualizar o token na tabela de usuários
    const sql = `SELECT * FROM users WHERE email = ?`;

    const connection = await testDatabaseConnection();

    console.log(email);

    const [user] = await connection.query(sql, [email]);

    if (user.length > 0) {
      const token = jwt.sign({ email }, process.env.SECRET_EMAIL, { expiresIn: '1h' });
      
      const sql = `UPDATE users SET email_token = ? WHERE email = ?`;

      connection.query(sql, [token, email], (error, results) => {
        if (error) {
            console.error('Erro ao gerar o token de email:', error);
            return;
        }
        console.log('Token do email gerado com sucesso com sucesso.');
    });

      // Configurar o serviço de e-mail (substitua as informações conforme necessário)
      const transporter = nodemailer.createTransport({
        host: 'mail.estilofontana.com.br',
        port: 587,
        secure: false, // true para SSL, false para outros
        auth: {
          user: 'noreply@estilofontana.com.br',
          pass: 'eQNd6x2tTifPBIaX3ZcA',
        },
      });

      // Enviar e-mail com corpo estilizado
      await transporter.sendMail({
        from: 'noreply@estilofontana.com.br',
        to: email,
        subject: 'Recuperação de Senha - Portal Prestação de Contas',
        html: `<p>Instruções para recuperação de senha do Portal Prestação de Contas:</p>
               <p>Clique no link abaixo para redefinir sua senha:</p>
               <p><a href="http://localhost:3000/password-reset?token=${token}" style="color: #3498db; text-decoration: none; font-weight: bold;">Redefinir Senha</a></p>
               <p>O link possui validade de 1 hora, após isso será necessário fazer outra requisição de recuperação de senha.</p>               
               <br><br>
               <h4">Portal Prestação de Contas</h4>
               <img src='https://minertecnologia.com/wp-content/uploads/2021/11/Logo-02-1024x430.png' style='width: 25%;' />`,
      });

      console.log('Email enviado com sucesso.');

      return res.status(200).json({ success: true });
    } else {
      console.error('Email não encontrado.');
      return res.status(404).json({ error: 'Email não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao processar a solicitação:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
