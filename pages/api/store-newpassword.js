import { testDatabaseConnection } from '../../config/database.mjs';
const sql = require('mssql');
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    
    const { email, newPassword, token } = req.body;

    const connection = await testDatabaseConnection();

    try {
      // Selecionar o banco de dados "USUARIOS"
      const selectDatabaseQuery = 'USE USUARIOS';
      await connection.query(selectDatabaseQuery);

      const verifyTokenQuery = `
        SELECT * 
        FROM usuarios 
        WHERE email_token = @token 
        AND email = @email
      `;

      const request = new sql.Request(connection);
      request.input('token', sql.VarChar, token);
      request.input('email', sql.VarChar, email);

      const result = await request.query(verifyTokenQuery);

      if (result.recordset && result.recordset.length > 0) {
        const user = result.recordset[0]; // Obter o primeiro registro

        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        const updatePasswordQuery = `
          UPDATE usuarios 
          SET password = @hashedPassword 
          WHERE email = @email
        `;

        const updateRequest = new sql.Request(connection);
        updateRequest.input('hashedPassword', sql.VarChar, hashedPassword);
        updateRequest.input('email', sql.VarChar, email);

        const updateResult = await updateRequest.query(updatePasswordQuery);

        if (updateResult.rowsAffected && updateResult.rowsAffected[0] > 0) {
          console.log('Nova senha gravada com sucesso');
          return res.status(200).json({ success: true, message: 'Senha redefinida' });
        } else {
          console.error('Erro ao gravar a nova senha');
          return res.status(500).json({ error: "Erro ao gravar a nova senha" });
        }
      } else {
        console.log('E-mail ou token inválido');
        return res.status(401).json({ error: "E-mail ou token inválido" });
      }
    } catch (error) {
      console.error('Erro ao executar a consulta SQL:', error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

  } else {
    return res.status(405).json({ success: false, message: 'Método não permitido.' });
  }
}
