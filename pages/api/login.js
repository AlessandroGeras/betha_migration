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
    const { username, password } = req.body;
    console.log(req.body);

    let connection;

    try {
      // Estabeleça a conexão com o Oracle
      connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
        host: process.env.HOST,
        dialect: process.env.DIALECT || 'oracle',
      });

      // Consulte o banco de dados para verificar se o usuário existe
      const usuariointerno = await users.findOne({
        where: {
          ID_USUARIO: username,
          ID_ADM_GESTAO_TERCEIROS: 'N',
        },
      });

      if (usuariointerno) {
        console.log("Usuário interno");
        // Usuário existe no banco de dados

        // Verificar se o usuário existe pela função WEB_VALIDA-USUARIO da fontana
        const statusResult = await validateUserStatus(connection, usuariointerno.ID_USUARIO, password);

        if (statusResult === 'N') {
          // User status is valid, proceed with returning user data
          const userData = {
            username: usuariointerno.ID_USUARIO,
            email: usuariointerno.ST_EMAIL,
            nomeUsuario: usuariointerno.NM_USUARIO,
            // Add other fields as needed
          };

          // Define os cabeçalhos CORS manualmente
          res.setHeader('Access-Control-Allow-Origin', '*'); // Pode restringir a origem conforme necessário
          res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, DELETE, PUT');
          res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');

          res.status(200).json(userData);
        } else {
          // User status is not valid
          res.status(403).json({ error: 'Usuário não tem permissão para acessar.' });
        }
      }
      else {
        const usuarioexterno = await users.findOne({
          attributes: ['DS_SENHA'],
          where: {
            ID_USUARIO: username,
            ID_ADM_GESTAO_TERCEIROS: 'S',
          },
        });

        if (usuarioexterno) {
          console.log("Usuário externo");
          // Usuário existe no banco de dados
          console.log("senhatabela:" + usuarioexterno.dataValues.DS_SENHA);
          console.log("senha:" + password);
          console.log("usuarioexterno:", usuarioexterno);

          if (usuarioexterno.dataValues.DS_SENHA === password) {
            // User status is valid, proceed with returning user data
            const userData = {
              username: usuarioexterno.ID_USUARIO,
              email: usuarioexterno.ST_EMAIL,
              nomeUsuario: usuarioexterno.NM_USUARIO,
              // Add other fields as needed
            };

            // Define os cabeçalhos CORS manualmente
            res.setHeader('Access-Control-Allow-Origin', '*'); // Pode restringir a origem conforme necessário
            res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, DELETE, PUT');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');

            res.status(200).json(userData);
          }
          else {
            // User status is not valid
            res.status(403).json({ error: 'Usuário ou senha inválido.' });
          }
        }
        
        else {
          // Usuário não encontrado
          console.log('Usuário não encontrado.');
          res.status(404).json({ error: 'Usuário não encontrado.' });
        }
      }

    } 
    catch (error) {
    console.error('Falha ao consultar o banco de dados:', error);
    res.status(500).json({ error: 'Erro ao consultar o banco de dados:' + error });
  } finally {
    // Feche a conexão após a execução
    if (connection) {
      await connection.close();
    }
  }
} else {
  res.status(405).json({ error: 'Método não permitido.' });
}
}


//Função WEB_VALIDA_USUARIOS da fontana
async function validateUserStatus(connection, pUsuario, pSenha) {
  try {
    // Execute Oracle function to validate user status
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

    // Obtain the status from the response
    const status = (result[0] && result[0].STATUS) ? result[0].STATUS.trim() : undefined;

    return status;
  } catch (error) {
    console.error('Erro ao executar a função autônoma:', error);
    throw error;
  }
}
