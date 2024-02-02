import outsourceds from '../../models/outsourceds';
import Sequelize from 'sequelize-oracle';
import Oracledb from 'oracledb';
import dotenv from 'dotenv';

dotenv.config();

Oracledb.initOracleClient( {libdir: 'C:\\app\\instantclient_19_64Bits'} )

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
      const result = await connection.query(`DELETE FROM DOCUMENTOS WHERE ID_DOCUMENTO = :id`, {
        replacements: { id: usuario },
        type: Sequelize.QueryTypes.DELETE,
      });


      res.status(200).json({ success: true, message: 'Documento excluído com sucesso.' });
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
