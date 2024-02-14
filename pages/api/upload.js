import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = '/projeto_portal_terceiro/uploads'; // Caminho desejado no host

const handleRequest = async (req, res) => {
  if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }

      const uploadedFile = files.anexo[0];
      const uniqueFilename = uuidv4();
      const filePath = path.join(uploadDir, `${uniqueFilename}_${uploadedFile.originalFilename}`);

      const readStream = fs.createReadStream(uploadedFile.filepath);
      const writeStream = fs.createWriteStream(filePath);

      readStream.pipe(writeStream);

      writeStream.on('finish', () => {
        res.status(200).json({ message: 'File uploaded successfully!', filename: `${uniqueFilename}_${uploadedFile.originalFilename}` });
      });
    });
  } else if (req.method === 'GET') {
    const filename = req.query.filename;

    if (!filename) {
      return res.status(400).json({ message: 'Bad Request: Filename is required for GET requests.' });
    }

    const filePath = path.join(uploadDir, filename);

    try {
      fs.accessSync(filePath, fs.constants.F_OK);
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      res.status(404).json({ message: 'File not found' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handleRequest;
