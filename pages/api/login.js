import users from '../../models/users';
import outsourceds from '../../models/outsourceds';
import Sequelize from 'sequelize-oracle';
import Oracledb from 'oracledb';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';  // Importe o módulo JWT


dotenv.config();

/* const path = require('path');
const oracleLibDir = path.resolve('/opt/oracle/instantclient_19_16');
Oracledb.initOracleClient({
    libDir: oracleLibDir,
}); */

Oracledb.initOracleClient({
  libDir: './instantclient_19_16',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    let connection,permission;

    try {
      connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
        host: process.env.HOST,
        dialect: process.env.DIALECT || 'oracle',
      });

      const usuariointerno = await users.findOne({
        where: {
          ID_USUARIO: username,
          ID_USUARIO_INTERNO: 'S',
        },
      });

      if (usuariointerno) {
        const statusResult = await validateUserStatus(connection, usuariointerno.ID_USUARIO, password);

        if (statusResult === 'N') {
          const userData = {
            username: usuariointerno.ID_USUARIO,
            email: usuariointerno.ST_EMAIL,
            nomeUsuario: usuariointerno.NM_USUARIO,};

            switch(usuariointerno.ID_ADM_GESTAO_TERCEIROS.trim()) {              
              case '0':
                console.log("Opção 0 - Sem permissão para acesso");
                res.status(404).json({ error: 'Usuário não tem permissão para acessar.' });
                break;
              case '1':
                console.log("Opção 1 - Permissão de leitura");
                permission = "read";
                break;
              case '2':
                console.log("Opção 2 - Admin");
                permission = "admin";
                break;
              default:
                console.log("Opção inválida: " + usuariointerno.ID_ADM_GESTAO_TERCEIROS);
            }
          
          const token = jwt.sign({ userId: usuariointerno.id }, process.env.SECRET, { expiresIn: '5h' });
          const role = "internal";

          // Defina os cabeçalhos CORS manualmente
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, DELETE, PUT');
          res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');          

          // Envie os dados do usuário e o token JWT
          res.status(200).json({ userData, token,role,permission });
        } else {
          res.status(403).json({ error: 'Usuário ou senha inválido.' });
        }
      } else {
        const usuarioexterno = await outsourceds.findOne({
          attributes: ['DS_SENHA'],
          where: {
            ID_USUARIO: username,
            ID_USUARIO_INTERNO: 'N',
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
            const role = "external";
            permission = "outsourced";

            // Defina os cabeçalhos CORS manualmente
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, DELETE, PUT');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');            

            // Envie os dados do usuário e o token JWT
            res.status(200).json({ userData, token,role,permission });
          } else {
            if (usuarioexterno.dataValues.DS_SENHA === 'InformarSenha') {
              res.status(401).json({ error: 'Esse é seu primeiro acesso. Clique em "Esqueceu a senha?" para obter uma senha válida.' });
            } else {
              res.status(403).json({ error: 'Usuário ou senha inválido.' });
            }
          }
        } else {
          res.status(405).json({ error: 'Usuário não encontrado.' });
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
