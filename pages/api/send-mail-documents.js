import documents from '../../models/documents';
import outsourceds from '../../models/outsourceds';
import cobrança from '../../models/billing';
import Sequelize from 'sequelize-oracle';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { parse, format } from 'date-fns';

dotenv.config();

export default async function handler(req, res) {
  let connection;

  const currentDate = new Date();

  try {
    // Estabeleça a conexão com o Oracle
    connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
      host: process.env.HOST,
      dialect: process.env.DIALECT || 'oracle',
    });

    // Teste da conexão
    await connection.authenticate();
    console.log('Serviço de cobrança de email iniciado.');

    // Consulta ao banco de dados para obter documentos
    const docs = await documents.findAll({
      where: {
        STATUS: ['Pendente', 'Reprovado', 'Ativo']
      }
    });

    // Agrupar documentos por TERCEIRO
    const documentosAgrupados = docs.reduce((acc, doc) => {
      const terceiro = doc.TERCEIRO;

      if (!acc[terceiro]) {
        acc[terceiro] = [];
      }

      acc[terceiro].push({
        STATUS: doc.STATUS,
        TIPO_DOCUMENTO: doc.TIPO_DOCUMENTO,
        MOTIVO: doc.MOTIVO,
        NOTIFICACAO: doc.NOTIFICACAO, // Adicione a propriedade NOTIFICACAO
        VENCIMENTO: doc.VENCIMENTO, // Adicione a propriedade VENCIMENTO
        COLABORADOR: doc.COLABORADOR,
      });

      return acc;
    }, {});

    // Consulta ao banco de dados para obter emails e IDs dos terceiros
    const terceiros = Object.keys(documentosAgrupados);

    const terceirosData = await outsourceds.findAll({
      where: {
        NOME_TERCEIRO: terceiros,
        COLABORADOR_TERCEIRO: 'N',
      },
      attributes: ['NOME_TERCEIRO', 'ST_EMAIL', 'ID_USUARIO']
    });

    // Mapear emails e IDs dos terceiros
    const mapaEmailsTerceiros = {};
    const mapaIDTerceiros = {};
    terceirosData.forEach(user => {
      mapaEmailsTerceiros[user.NOME_TERCEIRO] = user.ST_EMAIL;
      mapaIDTerceiros[user.NOME_TERCEIRO] = user.ID_USUARIO;
    });

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

    // Enviar e-mail para cada TERCEIRO com os documentos
    for (const terceiro in documentosAgrupados) {
      const emailTerceiro = mapaEmailsTerceiros[terceiro];
      const documentos = documentosAgrupados[terceiro];
      const idTerceiro = mapaIDTerceiros[terceiro];

      // Filtrar documentos ativos com data de notificação menor ou igual à data atual ou sem data de notificação definida
      const docsFiltrados = documentos.filter(doc => {
        // Se o status do documento for 'Pendente' ou 'Reprovado', mantenha-o
        if (doc.STATUS === 'Pendente' || doc.STATUS === 'Reprovado') {
          return true;
        }

        // Se a data de notificação não estiver definida ou for menor ou igual à data atual, o documento é considerado válido
        if (!doc.NOTIFICACAO || new Date(doc.NOTIFICACAO) <= currentDate) {
          // Se o documento estiver ativo e o vencimento não estiver definido, descarte-o
          if (doc.STATUS === 'Ativo' && doc.VENCIMENTO === null) {
            return false;
          }
          return true;
        }

        return false;
      });

      if (docsFiltrados.length === 0) {
        res.status(200).json({ message: "Não há cobranças para serem enviadas" });
        return
      }

      // Construir o corpo do e-mail para os documentos filtrados
      let emailBody = `<p>Olá, para continuidade no contrato da empresa ${terceiro} com a construtora Fontana, os seguintes documentos precisam ser enviados para o nosso portal:</p>`;
      emailBody += docsFiltrados.map(doc => {
        let docInfo;
        if (doc.STATUS === 'Reprovado') {
          docInfo = `<p>${doc.TIPO_DOCUMENTO}${doc.COLABORADOR ? ` - ${doc.COLABORADOR}` : ''}: ${doc.STATUS} - ${doc.MOTIVO}</p>`;
        } else if (doc.STATUS === 'Ativo') {
          docInfo = `<p>${doc.TIPO_DOCUMENTO}${doc.COLABORADOR ? ` - ${doc.COLABORADOR}` : ''}: Documento a vencer - ${format(new Date(doc.VENCIMENTO), 'dd/MM/yy')}</p>`;
        } else { // Pendente ou outros status
          docInfo = `<p>${doc.TIPO_DOCUMENTO}${doc.COLABORADOR ? ` - ${doc.COLABORADOR}` : ''}: ${doc.STATUS}</p>`;
        }
        return docInfo;
      }).join('');
      emailBody += `<hr><p>Acesse o portal através do link abaixo com as suas credenciais.</p>` +
        `<p>Seu ID: ${idTerceiro}</p>` +
        `<p>Se for seu primeiro acesso, digite seu nome de usuário e clique em "Esqueceu a senha?" para redefinir a nova senha por e-mail.</p>` +
        `<p><a href="https://gestao-terceiros.estilofontana.com.br" style="color: #3498db; text-decoration: none; font-weight: bold;">Acessar o Portal</a></p>` +
        `<img src='https://estilofontana.com.br/img/logo-fontana.svg' style='width: 25%;' />` +
        `<h4>Portal Gestão de Terceiro</h4>`;

      // Enviar o e-mail
      await transporter.sendMail({
        from: 'noreply@estilofontana.com.br',
        to: emailTerceiro,
        subject: 'Pendência de Documentos - Portal Gestão de Terceiro',
        html: emailBody,
      });

      console.log(`E-mail enviado com sucesso para ${terceiro} (${emailTerceiro}).`);
    }


    await cobrança.create({
      ULTIMA_COBRANCA: currentDate,
    }, {
      fields: ['ULTIMA_COBRANCA'], // Especifique os campos que deseja incluir
    });

    res.status(200).json({ message: "Cobranças automáticas concluídas" });

  } catch (error) {
    console.error('Erro durante a conexão com o Oracle:', error);
    // Responda com uma mensagem de erro
    res.status(500).json({ erro: 'Erro durante a conexão com o Oracle.' });
  } finally {
    // Certifique-se de fechar a conexão quando não for mais necessária

  }
}
