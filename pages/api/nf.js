import nf from '../../models/nf';
import users from '../../models/users';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const getAllDocs = async (pageSize) => {
  try {
    let allDocs = [];
    let offset = 0;

    while (true) {
      console.log('Looping - Offset:', offset);

      const result = await nf.findAll({
        attributes: [
          "ORG_IN_CODIGO",
          "FIL_IN_CODIGO",
          "CTO_IN_CODIGO",
          "CTO_CH_STATUS",
          "CTO_DT_INICIO",
          "CTO_DT_FINAL",
          "AGN_IN_CODIGO",
          "AGN_ST_NOME",
          "AGN_ST_CGC",
          "PRO_IN_REDUZIDO",
          "PRO_ST_DESCRICAO",
          "CTO_VL_CONTRATO",
          "CTO_VL_SALDO_CONTRATO",
          "CTO_BO_LIBERADOAPPROVO",
          "MED_IN_CODIGO",
          "MED_IN_NROFORMULARIO",
          "MED_DT_MEDICAO",
          "MED_DT_PAGAMENTO",
          "MED_CH_SITUACAO",
          "NF_ST_NOTA",
          "NF_ST_SERIE",
          "NF_DT_EMISSAO",
          "NF_DT_ENTRADA",
          "NF_RE_VALOR",
          "SITUACAO",
        ],
        offset,
        limit: pageSize,
      });

      if (result.length === 0) {
        break; // Saia do loop se não houver mais resultados
      }

      console.log('Result Length:', result.length);

      allDocs = [...allDocs, ...result];
      offset += pageSize;
    }

    console.log('Looping Concluído');

    return allDocs;
  } catch (error) {
    console.error('Erro na consulta findAll:', error);
    throw error; // Rejeita o erro para que seja tratado fora da função se necessário
  }
};


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token, getAll,id } = req.body; // Adicionando um parâmetro getAll
    let findAdmin = null;

    if (!token) {
      return res.redirect(302, '/login'); // Redireciona para a página de login
    }

    try {
      jwt.verify(token, process.env.SECRET);    

      findAdmin = await users.findOne({
        where: {
          ID_USUARIO: id,
          ID_USUARIO_INTERNO: 'S',
        },
      });

      if(findAdmin == null){
        res.status(403).json({ success: false, message: 'Você não tem autorização para ver a página.' });
      }

      const outsourcedCount = await nf.count();

      // Configuração da paginação
      const pageSize = parseInt(req.query.pageSize) || 10; // Itens por página
      const page = parseInt(req.query.page) || 1; // Página atual

      if (getAll) {
        // Se getAll for true, busca todos os registros
        const allDocs = await getAllDocs(pageSize);

       

        res.status(200).json({
          success: true,
          message: 'Todos os documentos encontrados',
          docs: {
            rows: allDocs,
            count: allDocs.length,
            outsourcedCount: outsourcedCount,
          },
        });
      } else {
        // Consulta paginada usando Sequelize com filtro
        const docs = await nf.findAndCountAll({
          attributes: [
            "ORG_IN_CODIGO",
            "FIL_IN_CODIGO",
            "CTO_IN_CODIGO",
            "CTO_CH_STATUS",
            "CTO_DT_INICIO",
            "CTO_DT_FINAL",
            "AGN_IN_CODIGO",
            "AGN_ST_NOME",
            "AGN_ST_CGC",
            "PRO_IN_REDUZIDO",
            "PRO_ST_DESCRICAO",
            "CTO_VL_CONTRATO",
            "CTO_VL_SALDO_CONTRATO",
            "CTO_BO_LIBERADOAPPROVO",
            "MED_IN_CODIGO",
            "MED_IN_NROFORMULARIO",
            "MED_DT_MEDICAO",
            "MED_DT_PAGAMENTO",
            "MED_CH_SITUACAO",
            "NF_ST_NOTA",
            "NF_ST_SERIE",
            "NF_DT_EMISSAO",
            "NF_DT_ENTRADA",
            "NF_RE_VALOR",
            "SITUACAO",
          ],
          offset: (page - 1) * pageSize,
          limit: pageSize,
        });

        if (docs) {
          res.status(200).json({
            success: true,
            message: 'Documentos encontrados',
            docs: {
              rows: docs.rows,
              count: docs.count,
              outsourcedCount: outsourcedCount,
            },
          });
        } else {
          res.status(400).json({ success: false, message: 'Não foi possível obter os documentos.' });
        }
      }
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        console.error('Token expirado:', error);
        res.status(401).json({ success: false, message: 'Token expirado' });
      } else {
        console.error('Erro ao contatar o servidor:', error);
        res.status(500).json({ success: false, message: 'Erro ao contatar o servidor' });
      }
    }
  }
}
