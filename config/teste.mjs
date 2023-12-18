import Sequelize from 'sequelize-oracle';
import Oracledb from 'oracledb';
import dotenv from 'dotenv';

dotenv.config();

Oracledb.initOracleClient({
  libDir: 'C:\\Users\\aless\\Downloads\\instantclient-basic-windows.x64-21.12.0.0.0dbru\\instantclient_21_12',
});

const connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT || 'oracle',
});

// Função para executar a função autônoma Oracle
async function executaFuncaoAutonoma(pUsuario, pSenha) {
  try {
    // Executa a função autônoma Oracle diretamente com a instrução SQL
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

    console.log('Result:', result);

    // Obtém a string 'N' da resposta
    const status = (result[0] && result[0].STATUS) ? result[0].STATUS.trim() : undefined;

    if (status !== undefined) {
      console.log('Status retornado pela função autônoma:', status);
    } else {
      console.error('Erro ao obter o status da função autônoma. Resultado não está definido.');
    }
  } catch (error) {
    console.error('Erro ao executar a função autônoma:', error);
  } finally {
    // Feche a conexão após a execução (opcional, dependendo do seu caso)
    await connection.close();
  }
}

// Chamar a função para executar a função autônoma
executaFuncaoAutonoma('gt_portal', 'Miner@2024#');
