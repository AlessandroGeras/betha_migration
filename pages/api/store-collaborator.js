import outsourceds from '../../models/outsourceds';
import documents from '../../models/documents';
import categoria_colaboradores from '../../models/categoryCollaborators';
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
        let categorias = Array.isArray(principal) ? principal : [principal];

        try {
            jwt.verify(token, process.env.SECRET);

            if (role == 'external') {
                const findOutsourced = await outsourceds.findOne({
                    where: {
                        ID_USUARIO: id,
                        ID_USUARIO_INTERNO: 'N',
                    },
                });
                nome_empresa = findOutsourced.NOME_TERCEIRO;
            }
            else {
                nome_empresa = nome_terceiro;
            }

            const generateUserId = (name) => {
                // Converter o nome para minúsculas e remover acentos
                const normalized = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                // Dividir o nome em partes
                const parts = normalized.split(" ");
                // Pegar o primeiro nome e o segundo nome (se existir)
                const firstName = parts[0];
                const lastName = parts.length > 1 ? parts[1] : "";
                // Concatenar o primeiro nome e o último nome com um ponto entre eles
                let newId = `${firstName}.${lastName}`;

                return newId;
            };

            const isUserIdExist = async (userId) => {
                const user = await outsourceds.findOne({
                    where: {
                        ID_USUARIO: userId,
                        COLABORADOR_TERCEIRO: 'S',
                    },
                });

                return user !== null;
            };

            const generateUniqueUserId = async (name) => {
                let userId = generateUserId(name);
                if (!(await isUserIdExist(userId))) {
                    // Se o ID do usuário não existir, retornar o ID sem alterações
                    return userId;
                }

                // Se o ID do usuário já existir, adicionar caracteres aleatórios e verificar novamente
                while (await isUserIdExist(userId)) {
                    userId = addRandomCharacters(userId);
                }
                return userId;
            };

            
            const new_id_usuario = await generateUniqueUserId(usuario);



            const Store = await outsourceds.create({
                STATUS: status,
                CPF: cpf,
                /* ENDEREÇO: endereco, */
                ST_EMAIL: email,
                OBS_STATUS: observacoes,
                NM_USUARIO: usuario,
                /* CIDADE: cidade, */
                /* UF: uf, */
                /* TELEFONE: telefone, */
                ID_USUARIO: new_id_usuario,
                CATEGORIA_PRINCIPAL: "N/A",
                NOME_TERCEIRO: nome_empresa,
                CNPJ: "N/A",
                FUNCAO: categorias.join(', '), // Use categorias em vez de principal
                COLABORADOR_TERCEIRO: "S",
                ID_USUARIO_INTERNO: "N",
            });

            // Criação dos documentos apenas se a empresa for criada com sucesso
            if (Store) {
                for (const categoria of categorias) {
                    const category = await categoria_colaboradores.findOne({
                        attributes: ['CATEGORIA', 'TIPO_DOCUMENTO'],
                        where: {
                            CATEGORIA: categoria
                        },
                    });
                    if (category) {
                        const tipoDocumentos = category.TIPO_DOCUMENTO.split(', ');
                        console.log(tipoDocumentos);

                        for (const tipoDocumento of tipoDocumentos) {
                            const storeDocumentos = await documents.create({
                                STATUS: "Pendente",
                                TIPO_DOCUMENTO: tipoDocumento,
                                TERCEIRO: nome_empresa,
                                COLABORADOR: usuario,
                            });
                        }
                    } else {
                        console.log('Falha ao criar Colaborador.');
                        res.status(400).json({ success: false, message: 'Falha ao criar Colaborador.' });
                        return; // Adicionado para sair da função em caso de falha
                    }
                }
                // Retorna sucesso apenas após o loop ter sido concluído com êxito
                res.status(200).json({ success: true, message: 'Colaborador criado.' });
            } else {
                console.log('Falha ao criar Colaborador.');
                res.status(400).json({ success: false, message: 'Falha ao criar Colaborador.' });
            }
        } catch (error) {
            console.error('Falha ao criar Colaborador: ', error);
            res.status(500).json({ success: false, message: 'Falha ao criar Colaborador.' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Método não permitido.' });
    }
}
