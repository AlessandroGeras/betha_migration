import outsourceds from '../../models/outsourceds';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';


dotenv.config();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      id,
      token
    } = req.body;

    try {
      jwt.verify(token, process.env.SECRET);  

      const user = await outsourceds.findOne({        
        attributes: ['PERIODO_INICIAL', 'PERIODO_FINAL'],
        where: {
          NOME_TERCEIRO: id,
          COLABORADOR_TERCEIRO: 'N',
        },
      });
            

      if(!user){
        return res.status(403).json({ error: 'Falha ao localizar o Terceiro.' });
      }

      res.status(200).json({ user });
    } catch (error) {
      console.error('Falha ao consultar o banco de dados:', error);
      res.status(500).json({ error: 'Erro ao consultar o banco de dados:' + error });
    } finally {
      
    }
  }
}
