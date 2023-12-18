import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Método não permitido
  }

  const { email } = req.body;

  // Configurar o serviço de e-mail (substitua as informações conforme necessário)
  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false, // true para SSL, false para outros
    auth: {
      user: 'seu-email@example.com',
      pass: 'sua-senha',
    },
  });

  try {
    // Enviar e-mail
    await transporter.sendMail({
      from: 'seu-email@example.com',
      to: email,
      subject: 'Recuperação de Senha',
      text: 'Enviamos instruções para recuperação de senha.',
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
