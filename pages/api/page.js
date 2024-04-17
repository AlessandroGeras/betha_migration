import { testDatabaseConnection } from '../../config/database.mjs';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
    if (req.method === 'POST') {

        const sql = `SELECT * FROM remessa`;

        try {
            // Criar uma conexão com o banco de dados
            const connection = await testDatabaseConnection();

            // Executar a consulta usando a conexão
            const [remessas] = await connection.query(sql);

            // Fechar a conexão com o banco de dados
            connection.end();

            return res.status(200).json({ success: remessas });
        } catch (error) {
            console.error('Erro ao executar consulta MySQL:', error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    } else {
        return res.status(405).json({ error: "Método não permitido" });
    }
}
