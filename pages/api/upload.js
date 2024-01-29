import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }

      // Access the uploaded file through files.anexo
      const uploadedFile = files.anexo[0];

      // Specify the directory where you want to save the uploaded files
      const uploadDir = path.join(process.cwd(), 'uploads');

      // Create the directory if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }

      // Generate a unique filename using uuid
      const uniqueFilename = uuidv4();

      // Specify the path where you want to save the uploaded file
      const filePath = path.join(uploadDir, `${uniqueFilename}_${uploadedFile.originalFilename}`);

      // Create a read stream from the uploaded file
      const readStream = fs.createReadStream(uploadedFile.filepath);

      // Create a write stream to the destination path
      const writeStream = fs.createWriteStream(filePath);

      // Pipe the read stream to the write stream
      readStream.pipe(writeStream);

      // Event handler for when the write stream is finished
      writeStream.on('finish', () => {
        // You can now do whatever you want with the file, e.g., save it to a database

        // Send a response back to the client
        res.status(200).json({ message: 'File uploaded successfully!', filename: `${uniqueFilename}_${uploadedFile.originalFilename}` });
      });
    });
  } else if (req.method === 'GET') {
    // Se o método HTTP for GET, a solicitação é para obter um arquivo
    const filename = req.query.filename;

    if (!filename) {
      return res.status(400).json({ message: 'Bad Request: Filename is required for GET requests.' });
    }

    // Specify the directory where os arquivos foram carregados
    const uploadDir = path.join(process.cwd(), 'uploads');

    // Specify the path to the requested file
    const filePath = path.join(uploadDir, filename);

    try {
      // Verifica se o arquivo existe
      fs.accessSync(filePath, fs.constants.F_OK);

      // Create a read stream from the file
      const fileStream = fs.createReadStream(filePath);

      // Pipe the file stream to the response stream
      fileStream.pipe(res);
    } catch (error) {
      // Se o arquivo não existe, retorna um erro 404
      res.status(404).json({ message: 'File not found' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
