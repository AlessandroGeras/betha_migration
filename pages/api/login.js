import { testDatabaseConnection } from '../../config/database.mjs';
const sql = require('mssql');
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            // Criar uma conexão com o banco de dados
            const masterConnection = await testDatabaseConnection();
            
            // Selecionar o banco de dados "usuarios"
            const selectDatabaseQuery = 'USE usuarios';
            await masterConnection.query(selectDatabaseQuery);

            // Consultar a tabela "usuarios" para verificar o email
            const userQuery = `SELECT * FROM usuarios WHERE email = @email`;
            const request = new sql.Request(masterConnection);
            request.input('email', sql.VarChar, email);
            const result = await request.query(userQuery);

            // Verificar se o usuário foi encontrado
            if (result.recordset.length === 0) {
                return res.status(401).json({ error: "E-mail inválido" });
            }
            
            // Obter o usuário encontrado
            const user = result.recordset[0];

            // Verificar a correspondência da senha usando bcrypt
            const passwordMatch = bcrypt.compareSync(password, user.password);

            if (passwordMatch) {
                // Senha correspondente, usuário autenticado com sucesso
                const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '4h' });

                res.setHeader('Set-Cookie', `jwt=${token}; HttpOnly; Max-Age=14400`);
                return res.status(200).json({ success: "Usuário logado", usuario: user });
            } else {
                // Senha não corresponde
                return res.status(401).json({ error: "Senha inválida" });
            }
        } catch (error) {
            console.error('Erro ao executar consulta SQL:', error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    } else {
        return res.status(405).json({ error: "Método não permitido" });
    }
}
