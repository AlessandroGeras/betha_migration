import categoria_documentos from '../../models/categoryDocuments';
import outsourceds from '../../models/outsourceds';
import documents from '../../models/documents';
import Sequelize from 'sequelize-oracle';
import Oracledb from 'oracledb';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

Oracledb.initOracleClient({
  libDir: 'C:\\Users\\aless\\Downloads\\instantclient-basic-windows.x64-21.12.0.0.0dbru\\instantclient_21_12',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { formData: { id_documento, nome_terceiro,identificacao,formato_vencimento }, id, categoria, numeracao, auditoria, token } = req.body;

    if (!token) {
      return res.redirect(302, '/login');
    }

    let connection;

    try {
      jwt.verify(token, process.env.SECRET);

      connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
        host: process.env.HOST,
        dialect: process.env.DIALECT || 'oracle',
      });

      const findOutsourced = await outsourceds.findOne({
        where: {
          ID_USUARIO: id,
          ID_USUARIO_INTERNO: 'N',
        },
      });

      if (findOutsourced.NOME_TERCEIRO == nome_terceiro) {
        const existingDoc = await documents.findOne({ where: { ID_DOCUMENTO: id_documento } });

        existingDoc.DOCUMENTO = identificacao;
        existingDoc.FORMATO_VENCIMENTO = formato_vencimento;
        await existingDoc.save();

        res.status(200).json({ success: true, message: 'Documento atualizado.' });
      }

      else {
        res.status(400).json({ success: false, message: 'Falha ao atualizar o documento.' });
      }
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        console.error('Token expirado:', error);
        res.status(401).json({ success: false, message: 'Token expirado' });
      } else {
        console.error('Erro ao contatar o servidor:', error);
        res.status(500).json({ success: false, message: 'Erro ao contatar o servidor' });
      }
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  } else {
    res.status(405).json({ success: false, message: 'Método não permitido.' });
  }
}