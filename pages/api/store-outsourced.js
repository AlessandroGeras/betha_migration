import outsourceds from '../../models/outsourceds';
import categoria_terceiros from '../../models/categoryOutsourced';
import documents from '../../models/documents';
import Sequelize from 'sequelize-oracle';
import Oracledb from 'oracledb';
import dotenv from 'dotenv';

dotenv.config();

const path = require('path');
const oracleLibDir = path.resolve('/opt/oracle/instantclient_19_16');
Oracledb.initOracleClient({
    libDir: oracleLibDir,
});

/* Oracledb.initOracleClient({
    libDir: '../../instantclient_21_12',
}); */

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {
            status,
            observacoes,
            cnpj,
            nomeTerceiro,
            usuario,
            sobrenome,
            endereco,
            cidade,
            email,
            telefone,
            uf,
            principal,
            id_usuario
        } = req.body;

        let connection;

        console.log("teste");

        try {
            // Estabeleça a conexão com o Oracle
            connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
                host: process.env.HOST,
                dialect: process.env.DIALECT || 'oracle',
            });    

            // Criação da empresa
            const storeEmpresa = await outsourceds.create({
                STATUS: status,
                CNPJ: cnpj,
                NOME_TERCEIRO: nomeTerceiro,
                ENDEREÇO: endereco,
                ST_EMAIL: email,
                OBS_STATUS: observacoes,
                NM_USUARIO: usuario,
                CIDADE: cidade,
                UF: uf,
                TELEFONE: telefone,
                ID_USUARIO_INTERNO: "N",
                COLABORADOR_TERCEIRO: "N",                
                ID_USUARIO: id_usuario,
                CATEGORIA_PRINCIPAL: principal,
            });

            // Criação dos documentos apenas se a empresa for criada com sucesso
            if (storeEmpresa) {
                const category = await categoria_terceiros.findOne({
                    where: {
                        CATEGORIA: principal
                    },
                });

                const tipoDocumentos = category.TIPO_DOCUMENTO.split(', ');

                for (const categoria of tipoDocumentos) {
                    const storeDocumentos = await documents.create({
                        STATUS: "Pendente",
                        TIPO_DOCUMENTO: categoria,
                        TERCEIRO: nomeTerceiro,
                    });
                }

                res.status(200).json({ success: true, message: 'Terceiro criado.' });
            } else {
                console.log('Falha ao criar usuário Terceiro.');
                res.status(400).json({ success: false, message: 'Falha ao criar usuário Terceiro.' });
            }
        } catch (error) {
            console.error('Erro ao salvar o usuário Terceiro:', error);
            res.status(500).json({ success: false, message: 'Erro ao salvar o usuário Terceiro.' });
        } finally {
            // Certifique-se de fechar a conexão no bloco finally para garantir que a conexão seja fechada, independentemente do resultado
            if (connection) {
                await connection.close();
            }
        }
    } else {
        res.status(405).json({ success: false, message: 'Método não permitido.' });
    }
}
