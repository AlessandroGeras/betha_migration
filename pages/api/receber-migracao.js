const sql = require('mssql');


export default function handler(req, res) {
    if (req.method === 'POST') {
        // Receber os dados enviados pelo cliente
        const { data } = req.body;

        // Log dos dados recebidos (apenas para fins de demonstração)
        console.log('Dados recebidos:', data);

        // Simular um processamento ou armazenar os dados no banco de dados
        // ...

        // Responder ao cliente com uma confirmação
        res.status(200).json({ success: true, message: "Dados recebidos com sucesso" });
    } else {
        // Método não permitido
        res.status(405).json({ error: "Método não permitido" });
    }
}