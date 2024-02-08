import outsourceds from '../../models/outsourceds';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Obtenha os dados do corpo da solicitação
    const { email, newPassword, token } = req.body;

    try {
      jwt.verify(token, process.env.SECRET);

      // Verifique se o email e o token correspondem a uma entrada na tabela
      const tokenEntry = await outsourceds.findOne({
        where: {
          ST_EMAIL: email,
          DS_TOKEN_VALIDACAO: token,
        },
      });


      if (tokenEntry) {
        console.log("tokenEntry"+tokenEntry);
        console.log("newPassword"+newPassword);
        // Se correspondem, continue com a lógica para redefinir a senha
        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        console.log('Email e token válidos. Redefinir senha.');
        await tokenEntry.update({ DS_SENHA: hashedPassword });
        console.log('Senha salva na tabela de usuários.');
        res.status(200).json({ success: true, message: 'Senha redefinida' });
      } else {
        console.log("pau");
        // Se não correspondem, retorne uma mensagem de erro
        console.log('Email ou token inválidos. Não é possível redefinir a senha.');
        res.status(400).json({ success: false, message: 'Email ou token inválidos. Não é possível redefinir a senha.' });
      }
    } catch (error) {
      console.error('Erro ao verificar email e token:', error);
      res.status(500).json({ success: false, message: 'Erro ao verificar email e token.' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Método não permitido.' });
  }
}
