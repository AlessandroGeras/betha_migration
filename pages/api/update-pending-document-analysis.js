import documents from '../../models/documents';
import outsourceds from '../../models/outsourceds';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
const { parse, format, addMonths, endOfMonth, isAfter, isBefore, setDate } = require('date-fns');

dotenv.config();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { formData: { id_documento, motivo, colaborador, nome_terceiro }, id, token, role, analysis } = req.body;


    if (!token) {
      return res.redirect(302, '/login');
    }

    if (role != "internal") {
      res.status(400).json({ success: false, message: 'Sem permissão para alterar o documento.' });
    }

    try {
      jwt.verify(token, process.env.SECRET);

      const existingDoc = await documents.findOne({ where: { ID_DOCUMENTO: id_documento } });

      if (analysis == "Reprovado") {
        existingDoc.MOTIVO = motivo;
        existingDoc.STATUS = "Reprovado";
      }




      if (analysis == "Ativo") {
        existingDoc.STATUS = "Ativo";

        if (colaborador) {
          const pendingDocs = await documents.findOne({
            where: {
              COLABORADOR: colaborador,
              TERCEIRO: nome_terceiro,
              STATUS: ['Pendente', 'Reprovado', 'Em análise'],
              ID_DOCUMENTO: {
                $not: id_documento
            }
            }
          });

          if (!pendingDocs) {
            const existingUser = await outsourceds.findOne({
              where: {
                NM_USUARIO: colaborador,
                COLABORADOR_TERCEIRO: 'S',
                NOME_TERCEIRO: nome_terceiro,
              },
            });
            existingUser.STATUS = "Ativo";
            await existingUser.save();
          }
        }

        else {
          const pendingDocs = await documents.findOne({
            where: {
              TERCEIRO: nome_terceiro,
              STATUS: ['Pendente', 'Reprovado', 'Em análise'],
            }
          });

          
          if (!pendingDocs) {
            const existingUser = await outsourceds.findOne({
              where: {
                NOME_TERCEIRO:nome_terceiro,
                COLABORADOR_TERCEIRO: 'N',
              },
            });
            existingUser.STATUS = "Ativo";
          }
        }
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

    }
  } else {
    res.status(405).json({ success: false, message: 'Método não permitido.' });
  }
}