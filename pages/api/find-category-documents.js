import categoria_documentos from '../../models/categoryDocuments';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, token } = req.body;

    if (!token) {
      return res.redirect(302, '/login');
    }

    try {
      jwt.verify(token, process.env.SECRET);      

      const docs = await categoria_documentos.findOne({
        where: {
          CATEGORIA: id
        },
      });

      if (!docs) {
        return res.status(403).json({ error: 'Falha ao localizar o usuário.' });
      }

      res.status(200).json({ docs });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        console.error('Token expirado:', error);
        res.status(401).json({ success: false, message: 'Token expirado' });
      } else {
        console.error('Falha ao consultar o banco de dados:', error);
        res.status(500).json({ error: 'Erro ao consultar o banco de dados:' + error });
      }
    } finally {
      
    }
  }
}
