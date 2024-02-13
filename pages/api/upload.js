import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Função de tratamento de requisições
const handleRequest = async (req, res) => {
  if (req.method === 'POST') {
    // Se o método HTTP for POST, a solicitação é para fazer upload de um arquivo
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }

      // Acessa o arquivo enviado através de files.anexo
      const uploadedFile = files.anexo[0];

      // Especifique o diretório onde você deseja salvar os arquivos enviados
      const uploadDir = '/projeto_portal_terceiro/Miner/uploads'; // Altere para o caminho desejado no host

      // Gere um nome de arquivo único usando uuid
      const uniqueFilename = uuidv4();

      // Especifique o caminho onde você deseja salvar o arquivo enviado
      const filePath = path.join(uploadDir, `${uniqueFilename}_${uploadedFile.originalFilename}`);

      // Crie um fluxo de leitura a partir do arquivo enviado
      const readStream = fs.createReadStream(uploadedFile.filepath);

      // Crie um fluxo de escrita para o caminho de destino
      const writeStream = fs.createWriteStream(filePath);

      // Encaminhe o fluxo de leitura para o fluxo de escrita
      readStream.pipe(writeStream);

      // Manipulador de eventos para quando o fluxo de escrita for concluído
      writeStream.on('finish', () => {
        // Agora você pode fazer o que quiser com o arquivo, por exemplo, salvá-lo em um banco de dados

        // Envie uma resposta de volta para o cliente
        res.status(200).json({ message: 'File uploaded successfully!', filename: `${uniqueFilename}_${uploadedFile.originalFilename}` });
      });
    });
  } else if (req.method === 'GET') {
    // Se o método HTTP for GET, a solicitação é para obter um arquivo
    const filename = req.query.filename;

    if (!filename) {
      return res.status(400).json({ message: 'Bad Request: Filename is required for GET requests.' });
    }

    // Especifique o diretório onde os arquivos foram enviados
    const uploadDir = '/projeto_portal_terceiro/Miner/uploads'; // Altere para o caminho desejado no host

    // Especifique o caminho para o arquivo solicitado
    const filePath = path.join(uploadDir, filename);

    try {
      // Verifique se o arquivo existe
      fs.accessSync(filePath, fs.constants.F_OK);

      // Crie um fluxo de leitura a partir do arquivo
      const fileStream = fs.createReadStream(filePath);

      // Encaminhe o fluxo de arquivo para o fluxo de resposta
      fileStream.pipe(res);
    } catch (error) {
      // Se o arquivo não existir, retorne um erro 404
      res.status(404).json({ message: 'File not found' });
    }
  } else {
    // Se o método HTTP não for GET nem POST, retorne um erro 405 (Método não permitido)
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handleRequest;
