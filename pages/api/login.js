import { testDatabaseConnection } from '../../config/database.mjs';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        const sql = `SELECT * FROM users WHERE email = ?`;

        try {
            // Criar uma conexão com o banco de dados
            const connection = await testDatabaseConnection();
            
            // Executar a consulta usando a conexão
            const [userRows] = await connection.query(sql, email);

            // Verificar se o usuário foi encontrado
            if (userRows.length === 0) {
                return res.status(401).json({ error: "E-mail inválido" });
            }
            
            // Obter a primeira linha do resultado (deve ser apenas um usuário)
            const user = userRows[0];

            // Verificar a correspondência da senha usando bcrypt
            const passwordMatch = bcrypt.compareSync(password, user.password);

            if (passwordMatch) {
                // Senha correspondente, usuário autenticado com sucesso
                return res.status(200).json({ success: "Usuário logado" });
            } else {
                // Senha não corresponde
                return res.status(401).json({ error: "Senha inválida" });
            }
        } catch (error) {
            console.error('Erro ao executar consulta MySQL:', error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    } else {
        return res.status(405).json({ error: "Método não permitido" });
    }
}
