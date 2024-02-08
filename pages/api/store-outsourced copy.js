import outsourceds from '../../models/outsourceds';
import Sequelize from 'sequelize-oracle';
import dotenv from 'dotenv';

dotenv.config();

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

        try {
            jwt.verify(token, process.env.SECRET);

            const Store = await outsourceds.create({
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
                ID_USUARIO:id_usuario,
                CATEGORIA_PRINCIPAL: principal,
            });
            

            if (Store) {
                res.status(200).json({ success: true, message: 'Terceiro criado.' });
            }
            else {
                console.log('Falha ao criar usuário Terceiro.');
                res.status(400).json({ success: false, message: 'Falha ao criar usuário Terceiro.' });
            }
        } catch (error) {
            console.error('Erro ao salvar o usuário Terceiro:', error);
            res.status(500).json({ success: false, message: 'Erro ao salvar o usuário Terceiro.' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Método não permitido.' });
    }
}
