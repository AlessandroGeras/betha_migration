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
        where: {
          NOME_TERCEIRO: id
        },
      });

      console.log("Testeeeeeeeeeeee");
      console.log(user);

      return

      

      if(!user){
        return res.status(403).json({ error: 'Falha ao localizar o usuário.' });
      }

      res.status(200).json({ user, docs });
    } catch (error) {
      console.error('Falha ao consultar o banco de dados:', error);
      res.status(500).json({ error: 'Erro ao consultar o banco de dados:' + error });
    } finally {
      
    }
  }
}
