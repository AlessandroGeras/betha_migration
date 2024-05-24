import { testDatabaseConnection } from '../../config/database.mjs';
import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Criar uma conexão com o banco de dados
            const masterConnection = await testDatabaseConnection();

            // Selecionar o banco de dados "Scripts"
            await masterConnection.query('USE Scripts');

            // Consultar a tabela "script" para retornar todos os registros
            const userQuery = 'SELECT * FROM script';
            const request = new sql.Request(masterConnection);
            const remessasResult = await request.query(userQuery);

            // Verificação de resultado da consulta
            if (!remessasResult || !remessasResult.recordset || remessasResult.recordset.length === 0) {
                throw new Error("Nenhum registro encontrado na tabela script");
            }

            const remessas = remessasResult.recordset;

            for (let remessa of remessas) {
                if (remessa.status !== 'Concluído' && remessa.query && remessa.api) {
                    console.log(`Executando script no banco: ${remessa.banco}`);

                    // Selecionar o banco especificado em remessa.banco
                    const useBankQuery = `USE ${remessa.banco}`;
                    await masterConnection.query(useBankQuery);

                    // Executar a query especificada em remessa.query
                    const queryResult = await masterConnection.query(remessa.query);

                    try {
                        // Enviar as informações coletadas para a API especificada em remessa.api
                        const response = await fetch(remessa.api, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ data: queryResult.recordset })
                        });

                        if (response.ok) {
                            // Atualizar o status para "Concluído" se o envio for bem-sucedido
                            await updateScriptStatus(masterConnection, remessa.id, 'Concluído', null);
                        } else {
                            // Atualizar o status para "Falha ao enviar os dados" se o envio falhar
                            const errorText = await response.text();
                            await updateScriptStatus(masterConnection, remessa.id, 'Falha ao enviar os dados', errorText);
                        }
                    } catch (error) {
                        // Atualizar o status para "Falha ao enviar os dados" se houver um erro na requisição
                        await updateScriptStatus(masterConnection, remessa.id, 'Falha ao enviar os dados', error.message);
                    }
                }
            }

            // Selecionar o banco de dados "Bancos"
            await masterConnection.query('USE Bancos');

            // Consultar a tabela de bancos para listar todos os bancos
            const banksQuery = 'SELECT * FROM banco';
            const banksResult = await masterConnection.query(banksQuery);

            const bancos = banksResult.recordset;

            for (let banco of bancos) {
                if (!banco.banco) {
                    console.error('Nome do banco não definido:', banco);
                    continue;
                }

                console.log(`Verificando status dos scripts no banco: ${banco.banco}`);

                // Selecionar o banco "Scripts" para consultar os scripts
                await masterConnection.query('USE Scripts');

                // Consultar os scripts correspondentes ao banco atual
                const scriptsStatusQuery = 'SELECT status FROM script WHERE banco = @banco';
                const request = new sql.Request(masterConnection);
                request.input('banco', sql.NVarChar, banco.banco);
                const scriptsStatusResult = await request.query(scriptsStatusQuery);
                console.log(scriptsStatusResult);

                const scriptsStatus = scriptsStatusResult.recordset.map(record => record.status);

                // Verificar se há scripts para este banco
                if (scriptsStatus.length === 0) {
                    console.log(`Nenhum script encontrado para o banco: ${banco.banco}`);
                    continue;
                }

                // Verificar os status dos scripts
                let bankStatus;
                if (scriptsStatus.every(status => status === 'Concluído')) {
                    bankStatus = 'Concluído';
                } else if (scriptsStatus.every(status => status === 'Não executado')) {
                    bankStatus = 'Não executado';
                } else {
                    bankStatus = 'Em execução';
                }

                // Atualizar o status do banco
                await masterConnection.query('USE Bancos');
                await updateBankStatus(masterConnection, banco.id, bankStatus);
            }

            // Retornar todos os registros da tabela "script" como resposta
            setTimeout(() => {
                res.status(200).json({ success: remessas });
            }, 0);
        } catch (error) {
            console.error('Erro ao executar o banco de dados:', error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    } else {
        return res.status(405).json({ error: "Método não permitido" });
    }
}

async function updateScriptStatus(connection, id, status, observacao) {
    await connection.query('USE Scripts');

    const updateQuery = `UPDATE script SET status = @status, observacao = @observacao WHERE id = @id`;
    const request = new sql.Request(connection);
    request.input('status', sql.NVarChar, status);
    request.input('observacao', sql.NVarChar, observacao);
    request.input('id', sql.Int, id);
    await request.query(updateQuery);
}

async function updateBankStatus(connection, id, status) {
    await connection.query('USE Bancos');

    const updateQuery = `UPDATE banco SET status = @status WHERE id = @id`;
    const request = new sql.Request(connection);
    request.input('status', sql.NVarChar, status);
    request.input('id', sql.Int, id);
    await request.query(updateQuery);
}
