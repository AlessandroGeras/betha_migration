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

    // Consulta ao banco de dados para encontrar empresas fora da vigência do contrato
    const enterprisesOutOfContract = await outsourceds.findAll({
      where: {
        STATUS: "Periodo",
        PERIODO_INICIAL: {
          $lte: currentDate,
        },
        PERIODO_FINAL: {
          $gte: currentDate,
        },
      },
      attributes: ['NOME_TERCEIRO'] // Atributos a serem selecionados
    });

    // Extrair os nomes das empresas fora da vigência do contrato em um conjunto para facilitar a verificação posterior
    const enterprisesOutOfContractSet = new Set(enterprisesOutOfContract.map(enterprise => enterprise.NOME_TERCEIRO));

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
    let anyValidThirdParty = false; // Variável para rastrear se pelo menos um terceiro válido foi encontrado

    for (const terceiro in documentosAgrupados) {
      // Verifique se o terceiro está na lista de empresas fora da vigência do contrato
      if (enterprisesOutOfContractSet.has(terceiro)) {
        console.log(`Empresa ${terceiro} está fora da vigência do contrato. E-mails não serão enviados.`);
        continue; // Pule para o próximo terceiro sem enviar o e-mail
      }

      anyValidThirdParty = true; // Defina a variável para true, pois encontramos pelo menos um terceiro válido

      const emailTerceiro = mapaEmailsTerceiros[terceiro];
      const documentos = documentosAgrupados[terceiro];
      const idTerceiro = mapaIDTerceiros[terceiro];

      // Restante do código para enviar e-mails para terceiros que não estão fora da vigência do contrato
    }

    // Verificar se pelo menos um terceiro válido foi encontrado antes de enviar a mensagem "Não há cobranças para serem enviadas"
    if (!anyValidThirdParty) {
      res.status(200).json({ message: "Não há cobranças para serem enviadas" });
      return;
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
