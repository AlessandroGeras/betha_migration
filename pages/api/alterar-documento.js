import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const prisma = new PrismaClient();

export default authMiddleware(async (req, res) => {
    if (req.method === 'POST') {
        const {
            id,
            status,
            modulo,
            nome,
            arquivo,
            remessa,
            periodo,
            gerada,
            usuario,
        } = req.body;

        try {

            const perfilId = parseInt(id);

            // Atualizar os dados usando Prisma
            await prisma.documentos.update({
                where: { id: perfilId }, // Condição para encontrar o perfil a ser atualizado
                data: {
                    status,
                    modulo,
                    nome,
                    arquivo,
                    remessa,
                    periodo,
                    gerada,
                    usuario,
                },
            });

            return res.status(200).json({ success: "Dados atualizados com sucesso." });
        } catch (error) {
            console.error('Erro ao atualizar dados:', error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    } else {
        return res.status(405).json({ error: "Método não permitido" });
    }
});
