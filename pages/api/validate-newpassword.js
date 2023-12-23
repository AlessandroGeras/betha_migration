import users from '../../models/users';
import Sequelize from 'sequelize-oracle';
import Oracledb from 'oracledb';
import dotenv from 'dotenv';

dotenv.config();

Oracledb.initOracleClient({
  libDir: 'C:\\Users\\aless\\Downloads\\instantclient-basic-windows.x64-21.12.0.0.0dbru\\instantclient_21_12',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Obtenha os dados do corpo da solicitação
    const { email, newPassword, token } = req.body;

    let connection;

    try {
      // Estabeleça a conexão com o Oracle
      connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
        host: process.env.HOST,
        dialect: process.env.DIALECT || 'oracle',
      });

      // Verifique se o email e o token correspondem a uma entrada na tabela
      const tokenEntry = await users.findOne({
        where: {
          ST_EMAIL: email,
          DS_TOKEN_VALIDACAO: token,
        },
      });


      if (tokenEntry) {
        // Se correspondem, continue com a lógica para redefinir a senha
        console.log('Email e token válidos. Redefinir senha.');
        await tokenEntry.update({ DS_SENHA: newPassword });
        console.log('Token salvo na tabela de usuários.');
        res.status(200).json({ success: true, message: 'Email e token válidos. Redefinir senha.' });
      } else {
        // Se não correspondem, retorne uma mensagem de erro
        console.log('Email ou token inválidos. Não é possível redefinir a senha.');
        res.status(400).json({ success: false, message: 'Email ou token inválidos. Não é possível redefinir a senha.' });
      }
    } catch (error) {
      console.error('Erro ao verificar email e token:', error);
      res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Método não permitido.' });
  }
}
