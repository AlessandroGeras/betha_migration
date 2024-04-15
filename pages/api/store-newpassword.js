import { testDatabaseConnection } from '../../config/database.mjs';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    
    const { email, newPassword, token } = req.body;

    const connection = await testDatabaseConnection();

    try {
      const sql = `SELECT * FROM users WHERE email_token = ? AND email = ?`;

      const [emailTemp] = await connection.query(sql, [token, email]);

      if (emailTemp.length > 0) {
        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        const sql = `UPDATE users SET password = ? WHERE email = ?`;

        connection.query(sql, [hashedPassword, email], (error, results) => {
          if (error) {
              console.error('Erro ao gravar a nova senha:', error);
              return res.status(401).json({ error: "E-mail ou token inválido" });
          }
          console.log('Nova senha gravada com sucesso');
          return res.status(200).json({ success: true, message: 'Senha redefinida' });
      });

        res.status(200).json({ success: "Token verificado com sucesso" });        
      }
      
      else {
        console.log('E-mail ou token inválido');
        return res.status(401).json({ error: "E-mail ou token inválido" });
      }
    } catch (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ error: "Error executing MySQL query" });
    }

}
 else {
  res.status(405).json({ success: false, message: 'Método não permitido.' });
}
}
