import outsourceds from '../../models/outsourceds';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {
            status,
            observacoes,
            cpf,
            usuario,
            sobrenome,
            endereco,
            cidade,
            email,
            token,
            telefone,
            uf,
            principal,
            nome_terceiro,
            id_usuario,
            id,
            role,
        } = req.body;
        let nome_empresa = '';

        try {
            jwt.verify(token, process.env.SECRET);

            if (userRole == 'external') {
                const findOutsourced = await outsourceds.findOne({
                    where: {
                        ID_USUARIO: id,
                        ID_USUARIO_INTERNO: 'N',
                    },
                });
                nome_empresa = findOutsourced.NOME_TERCEIRO;
            }

            nome_empresa = nome_terceiro;

            const Store = await outsourceds.create({
                STATUS: status,
                CPF: cpf,
                ENDEREÇO: endereco,
                /* ST_EMAIL: email, */
                OBS_STATUS: observacoes,
                NM_USUARIO: usuario,
                CIDADE: cidade,
                UF: uf,
                /* TELEFONE: telefone, */
                ID_USUARIO: id_usuario,
                CATEGORIA_PRINCIPAL: "N/A",
                NOME_TERCEIRO: nome_empresa,
                CNPJ: "N/A",
                FUNCAO: principal,
                COLABORADOR_TERCEIRO: "S",
                ID_USUARIO_INTERNO: "N",
            });


            if (Store) {
                res.status(200).json({ success: true, message: 'Usuário criado.' });
            }
            else {
                console.log('Falha ao criar usuário.');
                res.status(400).json({ success: false, message: 'Falha ao criar usuário.' });
            }
        } catch (error) {
            console.error('Erro ao salvar o usuário:', error);
            res.status(500).json({ success: false, message: 'Erro ao salvar o usuário.' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Método não permitido.' });
    }
}
