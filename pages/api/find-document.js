import documents from '../../models/documents';
import configuration from '../../models/configuration';
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
      
      const docs = await documents.findOne({
        where: {
          ID_DOCUMENTO: id
        },
      });

      const categoria = await categoria_documentos.findOne({
        where: {
          CATEGORIA: docs.TIPO_DOCUMENTO,
        },
      });

      console.log(categoria);

      const notificacao = await configuration.findOne({
        attributes: ['NOTIFICACAO'],
        order: [['NOTIFICACAO', 'DESC']], // Ordenar em ordem decrescente pela coluna ULTIMA_COBRANÇA
      });

      if (!docs) {
        return res.status(403).json({ error: 'Falha ao localizar o documento.' });
      }

      res.status(200).json({ docs,notificacao,categoria });
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
