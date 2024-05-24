import { authMiddleware } from '../middleware/auth';

export default authMiddleware(async (req, res) => {
  if (req.method === 'POST') {
    //const { token, id, role } = req.body;

    return res.status(200).json({ success: "Usuário logado"});
  }
}
)
