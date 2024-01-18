import outsourceds from '../../models/outsourceds';
import Sequelize from 'sequelize-oracle';
import Oracledb from 'oracledb';
import dotenv from 'dotenv';

dotenv.config();

Oracledb.initOracleClient({
  libDir: 'C:\\Users\\aless\\Downloads\\instantclient-basic-windows.x64-21.12.0.0.0dbru\\instantclient_21_12',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { usuario } = req.body;
    let connection;

    try {
      connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
        host: process.env.HOST,
        dialect: process.env.DIALECT || 'oracle',
      });

      // Exclua o usuário
      const result = await connection.query(`DELETE FROM WEB_TERCEIRO WHERE ID_USUARIO = :id AND COLABORADOR_TERCEIRO = 'S'`, {
        replacements: { id: usuario },
        type: Sequelize.QueryTypes.DELETE,
      });

      // Verifique se algum usuário foi excluído
      if (result > 0) {
        // Retorne um status de sucesso
        res.status(200).json({ success: true, message: 'Usuário excluído com sucesso.' });
      } else {
        // Usuário não encontrado
        res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
      }
    } catch (error) {
      console.error('Falha ao consultar o banco de dados:', error);
      res.status(500).json({ error: 'Erro ao consultar o banco de dados:' + error });
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }
}
