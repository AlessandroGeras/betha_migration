import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import users from '../../models/users';
require('dotenv').config();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Método não permitido
  }

  const { email } = req.body;
  const token = jwt.sign({ email }, process.env.SECRET_EMAIL, { expiresIn: '1h' });

  try {
    // Atualizar o token na tabela de usuários
    const user = await users.findOne({ where: { ST_EMAIL: email } });

    if (user) {
      // Salvar o token na tabela de usuários
      await user.update({ DS_TOKEN_VALIDACAO: token });
      console.log('Token salvo na tabela de usuários.');

      // Configurar o serviço de e-mail (substitua as informações conforme necessário)
      const transporter = nodemailer.createTransport({
        host: 'mail.estilofontana.com.br',
        port: 587,
        secure: false, // true para SSL, false para outros
        auth: {
          user: 'esqueciminhasenha@estilofontana.com.br',
          pass: 'eQNd6x2tTifPBIaX3ZcA',
        },
      });

      // Enviar e-mail com corpo estilizado
      await transporter.sendMail({
        from: 'esqueciminhasenha@estilofontana.com.br',
        to: email,
        subject: 'Recuperação de Senha - Portal Gestão de Terceiro',
        html: `<p>Instruções para recuperação de senha do Portal Gestão de Terceiro:</p>
               <p>Clique no link abaixo para redefinir sua senha:</p>
               <p><a href="http://localhost:3000/password-reset?token=${token}" style="color: #3498db; text-decoration: none; font-weight: bold;">Redefinir Senha</a></p>
               <p>O link possui validade de 1 hora, após isso será necessário fazer outra requisição de recuperação de senha.</p>
               <img src='https://estilofontana.com.br/img/logo-fontana.svg' style='width: 25%;' />
               <h4">Portal Gestão de Terceiro</h4>`,
      });

      console.log('Email enviado com sucesso.');

      return res.status(200).json({ success: true });
    } else {
      console.error('Email não encontrado.');
      return res.status(404).json({ error: 'Email não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao processar a solicitação:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
