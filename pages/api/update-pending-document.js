import outsourceds from '../../models/outsourceds';
import categoria_documentos from '../../models/categoryDocuments';
import documents from '../../models/documents';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
const { parse, format, addMonths, endOfMonth, isAfter, isBefore, setDate } = require('date-fns');
import nodemailer from 'nodemailer';

dotenv.config();

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
    let { formData: { id_documento, nome_terceiro, identificacao, vencimento, dia, dataVencimento, notificacao, auditoria }, id, token, role, filename, auditoriaDiaFixo } = req.body;
    let proximoVencimento = null;

    if (!token) {
      return res.redirect(302, '/login');
    }

    if (auditoria == "Sim") {
      dia = auditoriaDiaFixo;
    }



    try {
      jwt.verify(token, process.env.SECRET);

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

        const categoryDocuments = await categoria_documentos.findOne({ where: { CATEGORIA: existingDoc.TIPO_DOCUMENTO } });

        if ((categoryDocuments.AUDITORIA == "Não" && categoryDocuments.CAMPOS_VENCIMENTO == "Sim") || categoryDocuments.AUDITORIA == "Sim") {
          existingDoc.FORMATO_VENCIMENTO = vencimento;
          existingDoc.VENCIMENTO = proximoVencimento;
          existingDoc.NOTIFICACAO = dataAntes;
        }

        existingDoc.DOCUMENTO = identificacao;
        existingDoc.ANEXO = filename.filename;
        existingDoc.STATUS = "Em análise";

        if (role == "external") {
          existingDoc.USUARIO_INCLUSAO = id;

          const hoje = new Date();
          const formatdiaAtual = format(hoje, 'yyyy-MM-dd');
          existingDoc.DATA_INCLUSAO = formatdiaAtual;
        }

        await existingDoc.save();


        //Send email for Admins
        const pendingDoc = await documents.findOne({
          where: {
            STATUS: ['Pendente', 'Reprovado'],
            TERCEIRO: nome_terceiro,
          }
        });

        if (!pendingDoc) {
          // Configurar o serviço de e-mail (substitua as informações conforme necessário)
          const transporter = nodemailer.createTransport({
            host: 'mail.estilofontana.com.br',
            port: 587,
            secure: false, // true para SSL, false para outros
            auth: {
              user: 'noreply@estilofontana.com.br',
              pass: 'eQNd6x2tTifPBIaX3ZcA',
            },
          });

          let emailBody;
          emailBody = `<p>O Terceiro <strong>${nome_terceiro}</strong> acabou de enviar todos os documentos pendentes.</p>` +
            `<p><a href="https://gestao-terceiros.estilofontana.com.br" style="color: #3498db; text-decoration: none; font-weight: bold;">Acessar o Portal</a></p>` +
            `<img src='https://estilofontana.com.br/img/logo-fontana.svg' style='width: 25%;' />` +
            `<h4>Portal Gestão de Terceiro</h4>`;

          await transporter.sendMail({
            from: 'noreply@estilofontana.com.br',
            to: "empreiteiros@estilofontana.com.br",
            subject: `Pendência de documentos finalizada - ${nome_terceiro}`,
            html: emailBody,
          });
        }


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

    }
  } else {
    res.status(405).json({ success: false, message: 'Método não permitido.' });
  }
}