import jwt from 'jsonwebtoken';

export function authMiddleware(handler) {
  return async (req, res) => {

    if(req.cookies.jwt){
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if(decodedToken){
        return await handler(req, res, decodedToken);
    }
    else{
        return res.status(401).json({ error: "Sessão expirada" });
    }
}  

    else{
        return res.status(401).json({ error: "Sessão expirada" });
    }
  };
}
