import categoria_documentos from '../../models/categoryDocuments';
import outsourceds from '../../models/outsourceds';
import documents from '../../models/documents';
import Sequelize from 'sequelize-oracle';
import Oracledb from 'oracledb';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
const { parse, format, addMonths, endOfMonth, isAfter, isBefore, setDate } = require('date-fns');

dotenv.config();

Oracledb.initOracleClient({
  libDir: '../../instantclient_21_12',
});


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { formData: { id_documento, motivo }, id, token, role,analysis } = req.body;


    if (!token) {
      return res.redirect(302, '/login');
    }

    if (role != "internal") {
      res.status(400).json({ success: false, message: 'Sem permissão para alterar o documento.' });
    }

    let connection;

    try {
      jwt.verify(token, process.env.SECRET);

      connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
        host: process.env.HOST,
        dialect: process.env.DIALECT || 'oracle',
      });

      const existingDoc = await documents.findOne({ where: { ID_DOCUMENTO: id_documento } });

      if (analysis == "Reprovado") {
        existingDoc.MOTIVO = motivo;
        existingDoc.STATUS = "Reprovado";
      }

      if (analysis == "Ativo") {
        existingDoc.STATUS = "Ativo";
      }



      if (role == "internal") {
        existingDoc.USUARIO_ANALISE = id;

        const hoje = new Date();
        const formatdiaAtual = format(hoje, 'yyyy-MM-dd');
        existingDoc.DATA_ANALISE = formatdiaAtual;
      }

      await existingDoc.save();

      res.status(200).json({ success: true, message: 'Documento atualizado.' });



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