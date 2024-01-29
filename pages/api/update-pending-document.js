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


// Função para calcular o próximo vencimento
const calcularProximoVencimento = (diaEscolhido) => {
  const hoje = new Date();
  const diaAtual = hoje.getDate();
  const mesAtual = hoje.getMonth() + 1; // Os meses em JavaScript são zero-based

  // Verificar se o dia escolhido é maior que o último dia do mês atual
  if (diaEscolhido > new Date(hoje.getFullYear(), mesAtual, 0).getDate()) {
    const proximoMes = addMonths(hoje, 1);
    const ultimoDiaProximoMes = endOfMonth(proximoMes).getDate();

    // Definir o dia do próximo mês, mas não ultrapassar o último dia do mês
    const novoDia = Math.min(diaEscolhido, ultimoDiaProximoMes);

    // Verificar se o novo vencimento está no próximo mês
    if (isBefore(setDate(proximoMes, novoDia), hoje)) {
      return format(endOfMonth(addMonths(hoje, 1)), 'dd/MM/yyyy');
    }

    return format(setDate(proximoMes, novoDia), 'dd/MM/yyyy');
  }

  // O dia escolhido é menor ou igual ao último dia do mês atual
  const vencimentoNoMesAtual = setDate(hoje, diaEscolhido);

  // Verificar se o vencimento é no futuro
  if (isAfter(vencimentoNoMesAtual, hoje)) {
    return format(vencimentoNoMesAtual, 'dd/MM/yyyy');
  }

  // Se não for, calcular para o próximo mês
  const proximoMes = addMonths(hoje, 1);
  const ultimoDiaProximoMes = endOfMonth(proximoMes).getDate();

  // Definir o dia do próximo mês, mas não ultrapassar o último dia do mês
  const novoDia = Math.min(diaEscolhido, ultimoDiaProximoMes);

  return format(setDate(proximoMes, novoDia), 'dd/MM/yyyy');
};

const calcularDataXDiasAtras = (diasAtras, proximoVencimento) => {
  const dataXDaysAtras = new Date(proximoVencimento);

  // Subtrai X dias da data especificada
  dataXDaysAtras.setDate(dataXDaysAtras.getDate() - diasAtras);

  // Obtém a data formatada apenas como yyyy-MM-dd
  const dataFormatada = dataXDaysAtras.toISOString().split('T')[0];

  return dataFormatada;
};


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { formData: { id_documento, nome_terceiro, identificacao, vencimento, dia, dataVencimento, notificacao }, id, token, role, filename } = req.body;
    let proximoVencimento = null;


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

      if (vencimento == "Fixo") {
        proximoVencimento = calcularProximoVencimento(dia);
        proximoVencimento = format(parse(proximoVencimento, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd');
      }
      else {
        proximoVencimento = dataVencimento;
      }


      const dataAntes = calcularDataXDiasAtras(notificacao, proximoVencimento);

      if (findOutsourced.NOME_TERCEIRO == nome_terceiro) {
        const existingDoc = await documents.findOne({ where: { ID_DOCUMENTO: id_documento } });

        existingDoc.DOCUMENTO = identificacao;
        existingDoc.FORMATO_VENCIMENTO = vencimento;
        existingDoc.VENCIMENTO = proximoVencimento;
        existingDoc.NOTIFICACAO = dataAntes;
        existingDoc.ANEXO = filename.filename;
        existingDoc.STATUS = "Em análise";

        if (role == "external") {
          existingDoc.USUARIO_INCLUSAO = id;

          const hoje = new Date();
          const formatdiaAtual = format(hoje, 'yyyy-MM-dd');
          existingDoc.DATA_INCLUSAO = formatdiaAtual;
        }

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