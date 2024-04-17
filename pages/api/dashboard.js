import { testDatabaseConnection } from '../../config/database.mjs';
import { authMiddleware } from '../middleware/auth';
import dotenv from 'dotenv';

dotenv.config();

export default authMiddleware(async (req, res) => {
  if (req.method === 'POST') {
    //const { token, id, role } = req.body;

    return res.status(200).json({ success: "Usuário logado"});
  }
}
)
