const sql = require('mssql');
const dotenv = require('dotenv');

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();


// Função para testar a conexão com o banco de dados
export async function testDatabaseConnection() {
  const server = process.env.SERVER;     // Nome do servidor
  const database = process.env.DATABASE; // Nome do banco de dados
  const username = process.env.USERNAME_SQLSERVER; // Nome de usuário
  const password = process.env.PASSWORD; // Senha

  try {
      // Verifica se todas as variáveis de ambiente estão definidas
      if (!server || !database || !username || !password) {
          throw new Error('Uma ou mais variáveis de ambiente não estão definidas.');
      }

      // Cria a configuração de conexão
      const config = {
          user: username,
          password: password,
          server: server,
          database: database,
          options: {
              encrypt: false    // Caso necessário, dependendo da configuração do SQL Server
          }
      };

      // Conecta ao banco de dados
      const connection = await sql.connect(config);

      console.log("Conectado ao SQL Server");

      // Executa a consulta para listar os bancos de dados, excluindo master, tempdb, model, msdb
      const result = await sql.query`
          SELECT name 
          FROM sys.databases 
          WHERE name NOT IN ('master', 'tempdb', 'model', 'msdb')
      `;

      /* console.log("Bancos de dados disponíveis:");
      result.recordset.forEach(db => {
          console.log(db.name);
      }); */
      
      console.log("Conexão com o banco de dados realizada com sucesso");
      return connection;

  } catch (err) {
      console.error("Erro ao conectar ao SQL Server:", err);
      // Adicione aqui o código para lidar com o erro, se necessário
  }
}
