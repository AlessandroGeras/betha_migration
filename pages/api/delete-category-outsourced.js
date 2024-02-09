import connection from "../../config/database.mjs";
import outsourceds from '../../models/outsourceds';
import Sequelize from 'sequelize-oracle';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { categoria, token } = req.body;

    if (!token) {
      return res.redirect(302, '/login'); // Redireciona para a página de login
    }

    try {
      jwt.verify(token, process.env.SECRET);

      const outsourcedFound = await outsourceds.findOne({
        where: Sequelize.literal(`CATEGORIA_PRINCIPAL LIKE '%${categoria}%'`)
      });

      if(outsourcedFound){
        res.status(400).json({message: 'Categoria em uso' });
        return
      }
      
      // Exclua o usuário
      await connection.query(`DELETE FROM CATEGORIA_TERCEIROS WHERE CATEGORIA = :categoria`, {
        replacements: { categoria: categoria },
        type: Sequelize.QueryTypes.DELETE,
      })

      res.status(200).json({ success: true, message: 'Categoria excluída com sucesso.' });

    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        console.error('Token expirado:', error);
        res.status(401).json({ success: false, message: 'Token expirado' });
      }
      else {
        console.error('Falha ao consultar o banco de dados:', error);
        res.status(500).json({ error: 'Erro ao consultar o banco de dados:' + error });
      }
    } finally {

    }
  }
}
