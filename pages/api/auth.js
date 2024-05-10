import { authMiddleware } from '../middleware/auth';

export default authMiddleware(async (req, res, decodedToken) => {
  if (req.method === 'POST') {
    //const { token, id, role } = req.body;

    const { userId } = decodedToken;

    // Faça o que for necessário com o userId

    return res.status(200).json({ success: "Usuário logado", userId });
  }
}
)
