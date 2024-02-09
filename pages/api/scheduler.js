import cron from 'node-cron';
import cobrança from '../../models/billing';
import Sequelize from 'sequelize-oracle';
import dotenv from 'dotenv';
import { format } from 'date-fns';


dotenv.config();

cron.schedule('46 06 * * 1-5', async () => {
  try {
    console.log("Serviço de cobrança de e-mails ativo");

    // Fazer o fetch para a API
    const response = await fetch('/api/send-mail-documents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log('Response from API:', data);
  } catch (error) {
    console.error('Erro durante a execução da tarefa cron:', error);
  }
});

export default async function handler(req, res) {
  let connection;

  try {
    // Estabeleça a conexão com o Oracle
    connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
      host: process.env.HOST,
      dialect: process.env.DIALECT || 'oracle',
    });

    // Teste da conexão
    await connection.authenticate();
    console.log('Conexão com o Oracle estabelecida com sucesso.');

    // Buscar o último registro da coluna ULTIMA_COBRANÇA na tabela cobrança
    const ultimaCobranca = await cobrança.findOne({
      attributes: ['ULTIMA_COBRANCA'],
      order: [['ULTIMA_COBRANCA', 'DESC']], // Ordenar em ordem decrescente pela coluna ULTIMA_COBRANÇA
    });    

    const formattedDate = ultimaCobranca ? format(new Date(ultimaCobranca.ULTIMA_COBRANCA), 'dd/MM/yyyy') : 'Sem registros anteriores.';

    res.status(200).json({
      message: `Serviço de cobrança automático de emails agendado de segunda à sexta para as 18:00.\nÚltima cobrança automática: ${formattedDate}`
    });
    

  } catch (error) {
    console.error('Erro ao contatar o servidor:', error);
    res.status(500).json({ success: false, message: 'Erro ao contatar o servidor' });
  } finally {
    // Certifique-se de fechar a conexão quando não for mais necessária
    if (connection) {
      await connection.close();
    }
  }
}
