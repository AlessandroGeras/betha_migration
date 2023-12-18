const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const connection = await oracledb.getConnection({
      user: 'gt_portal',
      password: 'Alaska#25Gc',
      connectString: '192.168.0.216:1521/orcl'
    });

    // Realize a lógica de autenticação ou consulta no banco de dados aqui

    // Suponha que a autenticação foi bem-sucedida
    res.status(200).json({ success: true, message: 'Autenticação bem-sucedida' });
  } catch (error) {
    console.error(error);

    // Se a autenticação falhar, envie uma resposta indicando o erro
    res.status(401).json({ success: false, message: 'Credenciais inválidas' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor ON rodando na porta ${PORT}`);
});
