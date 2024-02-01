import categoria_documentos from '../../models/categoryDocuments';
import Sequelize from 'sequelize-oracle';
import Oracledb from 'oracledb';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

Oracledb.initOracleClient({
  libDir: '../../../opt/oracle/instantclient_19_16',
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { categoria, numeracao, formato_vencimento, auditoria, token } = req.body;
  
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
  
        const store = await categoria_documentos.create({
          CATEGORIA: categoria,
          NUMERACAO: numeracao,
          FORMATO_VENCIMENTO: formato_vencimento,
          AUDITORIA: auditoria,
        }, {
          fields: ['CATEGORIA', 'NUMERACAO', 'FORMATO_VENCIMENTO', 'AUDITORIA'],
        });
  
        if (store) {
          res.status(200).json({ success: true, message: 'Categoria criada.' });
        } else {
          console.log('Falha ao criar a categoria.');
          res.status(400).json({ success: false, message: 'Falha ao criar a categoria.' });
        }
      } catch (error) {
        if (error instanceof Sequelize.DatabaseError && error.name === 'SequelizeDatabaseError') {
          // Erro de violação de restrição única
          if (error.parent && error.parent.code === 'ORA-00001') {
            console.error('Categoria já existe:', error);
            res.status(400).json({ success: false, message: 'Categoria já existe.' });
          }
        } else if (error.name === 'TokenExpiredError') {
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