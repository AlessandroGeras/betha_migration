import users from '../../models/users';
import Sequelize from 'sequelize-oracle';
import Oracledb from 'oracledb';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';  // Importe o módulo JWT


dotenv.config();

Oracledb.initOracleClient({
  libDir: 'C:\\Users\\aless\\Downloads\\instantclient-basic-windows.x64-21.12.0.0.0dbru\\instantclient_21_12',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    let connection;

    try {
      connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
        host: process.env.HOST,
        dialect: process.env.DIALECT || 'oracle',
      });

      const usuariointerno = await users.findOne({
        where: {
          ID_USUARIO: username,
          ID_ADM_GESTAO_TERCEIROS: 'N',
        },
      });

      if (usuariointerno) {
        const statusResult = await validateUserStatus(connection, usuariointerno.ID_USUARIO, password);

        if (statusResult === 'N') {
          const userData = {
            username: usuariointerno.ID_USUARIO,
            email: usuariointerno.ST_EMAIL,
            nomeUsuario: usuariointerno.NM_USUARIO,          };

          
          const token = jwt.sign({ userId: usuariointerno.id }, process.env.SECRET, { expiresIn: '5h' });
          console.log(token);

          // Defina os cabeçalhos CORS manualmente
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, DELETE, PUT');
          res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');          

          // Envie os dados do usuário e o token JWT
          res.status(200).json({ userData, token });
        } else {
          res.status(403).json({ error: 'Usuário não tem permissão para acessar.' });
        }
      } else {
        const usuarioexterno = await users.findOne({
          attributes: ['DS_SENHA'],
          where: {
            ID_USUARIO: username,
            ID_ADM_GESTAO_TERCEIROS: 'S',
          },
        });

        if (usuarioexterno) {
          const storedHashedPassword = usuarioexterno.dataValues.DS_SENHA;
          const passwordMatch = bcrypt.compareSync(password, storedHashedPassword);

          if (passwordMatch) {
            const userData = {
              username: usuarioexterno.ID_USUARIO,
              email: usuarioexterno.ST_EMAIL,
              nomeUsuario: usuarioexterno.NM_USUARIO,
            };
            
            const token = jwt.sign({ userId: usuarioexterno.id }, process.env.SECRET, { expiresIn: '5h' });
            console.log(token);

            // Defina os cabeçalhos CORS manualmente
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, DELETE, PUT');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');            

            // Envie os dados do usuário e o token JWT
            res.status(200).json({ userData, token });
          } else {
            if (usuarioexterno.dataValues.DS_SENHA === 'InformarSenha') {
              res.status(401).json({ error: 'Esse é seu primeiro acesso. Clique em "Esqueceu a senha?" para obter uma senha válida.' });
            } else {
              res.status(403).json({ error: 'Usuário ou senha inválido.' });
            }
          }
        } else {
          console.log('Usuário não encontrado.');
          res.status(404).json({ error: 'Usuário não encontrado.' });
        }
      }
    } catch (error) {
      console.error('Falha ao consultar o banco de dados:', error);
      res.status(500).json({ error: 'Erro ao consultar o banco de dados:' + error });
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  } else {
    res.status(405).json({ error: 'Método não permitido.' });
  }
}

async function validateUserStatus(connection, pUsuario, pSenha) {
  try {
    const result = await connection.query(
      `select web_valida_usuario(:pUsuario, :pSenha) as status from dual`,
      {
        replacements: {
          pUsuario: pUsuario,
          pSenha: pSenha,
        },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const status = (result[0] && result[0].STATUS) ? result[0].STATUS.trim() : undefined;

    return status;
  } catch (error) {
    console.error('Erro ao executar a função autônoma:', error);
    throw error;
  }
}
