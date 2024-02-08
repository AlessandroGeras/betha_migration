import connection from "../../config/database.mjs";
import Sequelize from 'sequelize-oracle';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { usuario } = req.body;

    try {  
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
      
    }
  }
}
