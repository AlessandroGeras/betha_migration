import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const prisma = new PrismaClient();

export default authMiddleware(async (req, res) => {
    if (req.method === 'POST') {
        const {
            perfil,
            checkboxesData
        } = req.body;

        try {
            // Mapear os dados das checkboxes para os campos correspondentes no modelo perfis
            const checkboxes = {
                layoutsIncluir: checkboxesData.layouts.incluir,
                layoutsAlterar: checkboxesData.layouts.alterar,
                layoutsExcluir: checkboxesData.layouts.excluir,
                parceirosIncluir: checkboxesData.parceiros.incluir,
                parceirosAlterar: checkboxesData.parceiros.alterar,
                parceirosExcluir: checkboxesData.parceiros.excluir,
                perfisIncluir: checkboxesData.perfis.incluir,
                perfisAlterar: checkboxesData.perfis.alterar,
                perfisExcluir: checkboxesData.perfis.excluir,
                prefeiturasIncluir: checkboxesData.prefeituras.incluir,
                prefeiturasAlterar: checkboxesData.prefeituras.alterar,
                prefeiturasExcluir: checkboxesData.prefeituras.excluir,
                remessasIncluir: checkboxesData.remessas.incluir,
                remessasAlterar: checkboxesData.remessas.alterar,
                remessasExcluir: checkboxesData.remessas.excluir,
                usuariosIncluir: checkboxesData.usuarios.incluir,
                usuariosAlterar: checkboxesData.usuarios.alterar,
                usuariosExcluir: checkboxesData.usuarios.excluir,
            };

            // Inserir os dados usando Prisma
            await prisma.perfis.create({
                data: {                    
                    perfil,
                    ...checkboxes // Adicionar os valores das checkboxes ao objeto de dados
                },
            });

            return res.status(200).json({ success: "Dados inseridos com sucesso." });
        } catch (error) {
            console.error('Erro ao inserir dados:', error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    } else {
        return res.status(405).json({ error: "Método não permitido" });
    }
});
