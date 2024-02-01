import Oracledb from 'oracledb';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    let report;

    try {
      Oracledb.initOracleClient({
        libDir: '../../../opt/oracle/instantclient_19_16',
      });
      report = 'Cliente Oracle inicializado com sucesso.';
      console.log(report); // Exibe a mensagem de sucesso no console
    } catch (error) {
      report = error;
      console.error('Erro ao inicializar o cliente Oracle:', error); // Exibe o erro no console
    }

    res.status(200).json({ report });
  }
}
