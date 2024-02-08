import connection from "../../config/database.mjs";
import Sequelize from 'sequelize-oracle';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { usuario } = req.body;

    try {   
      // Exclua o usuário
      const result = await connection.query(`DELETE FROM WEB_TERCEIRO WHERE ID_USUARIO = :id AND COLABORADOR_TERCEIRO = 'N'`, {
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
      
    }
  }
}
