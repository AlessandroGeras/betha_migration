const sql = require('mssql');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const fs = require('fs');

dotenv.config();

async function connectToSqlServer() {
    try {
        const server = process.env.SERVER;
        const database = process.env.DATABASE;
        const username = process.env.USERNAME_SQLSERVER;
        const password = process.env.PASSWORD;

        const config = {
            user: username,
            password: password,
            server: server,
            database: database,
            options: {
                encrypt: false
            }
        };

        const pool = await sql.connect(config);
        console.log("Conectado ao SQL Server");
        return pool;
    } catch (error) {
        console.error('Erro ao conectar ao SQL Server:', error);
        throw error;
    }
}

async function main() {
    // Lista de IDs para exclusão
    const idsParaExcluir = [
        76769720, 76773641, 76773640, 76773648, 76773647, 76773643, 76773644, 76773642,
        76773645, 76773654, 76773646, 76464540, 76773657, 76773649, 76773656, 76773650,
        76773664, 76773652, 76773651, 76773669, 76773679, 76773659, 76773658, 76773666,
        76773653, 76773655, 76773661, 76773667, 76773677, 76773662, 76773660, 76773670,
        76773673, 76773687, 76773681, 76773672, 76773674, 76773663, 76773693, 76773665,
        76773698, 76773690, 76773668, 76773702, 76773671, 76773680, 76773688, 76773701,
        76773708, 76773675, 76773713, 76773676, 76773691, 76773678, 76773685, 76773682,
        76773686, 76773705, 76773712, 76773726, 76773694, 76773684, 76773723, 76773728,
        76773689, 76773683, 76773692, 76773696, 76773750, 76773703, 76773742, 76773695,
        76773700, 76773697, 76773709, 76773734, 76773710, 76773699, 76773706, 76773716,
        76773718, 76773725, 76773756, 76773749, 76773762, 76773719, 76773724, 76773730,
        76773714, 76773711, 76773720, 76773733, 76773704, 76773707, 76773715, 76773717,
        76773774, 76773735, 76773731, 76773721, 76773755, 76773759, 76773727, 76773729,
        76773732, 76773737, 76773741, 76773722, 76773770, 76773743, 76773769, 76773761,
        76773736, 76773748, 76773781, 76773787, 76773751, 76773738, 76773740, 76773758,
        76773744, 76773746, 76773812, 76773757, 76773747, 76773739, 76773802, 76773776,
        76773745, 76773754, 76773813, 76773765, 76773763, 76773796, 76773772, 76773783,
        76773764, 76773760, 76773784, 76773768, 76773777, 76773782, 76773786, 76773816,
        76773779, 76773788, 76773834, 76773790, 76773752, 76773767, 76773780, 76773789,
        76773753, 76773836, 76773773, 76773766, 76773775, 76773771, 76773792, 76773798,
        76773794, 76773799, 76773808, 76773797, 76773868, 76773803, 76773818, 76773811,
        76773864, 76773805, 76773795, 76773809, 76773821, 76773810, 76773869, 76773872,
        76773879, 76773785, 76773791, 76773875, 76773778, 76773807, 76773884, 76773873,
        76773800, 76773806, 76773891, 76773895, 76773819, 76773820, 76773871, 76773881,
        76773815, 76773832, 76773903, 76773902, 76773906, 76773827, 76773904, 76773915,
        76773887, 76773804, 76773793, 76773922, 76773905, 76773822, 76773926, 76773829,
        76773898, 76773925, 76773826, 76773930, 76773801, 76773914, 76773862, 76773911,
        76773825, 76773916, 76773892, 76773828, 76773824, 76773830, 76773817, 76773814,
        76773877, 76773831, 76773837, 76773941, 76773835, 76773838, 76773861, 76773867,
        76773823, 76773870, 76773946, 76773921, 76773876, 76773839, 76773949, 76773933,
        76773886, 76773943, 76773833, 76773866, 76773860, 76773955, 76773863, 76773874,
        76773931, 76773882, 76773958, 76773880, 76773956, 76773918, 76773893, 76773910,
        76773907, 76773878, 76773889, 76773890, 76773897, 76773899, 76773929, 76773934,
        76773919, 76773896, 76773865, 76773959, 76773966, 76773885, 76773883, 76773900,
        76773953, 76773940, 76773957, 76773936, 76773924, 76773928, 76773894, 76773938,
        76773901, 76773908, 76773963, 76773965, 76773937, 76773932, 76773967, 76773952,
        76773888, 76773975, 76773917, 76773927, 76773962, 76773970, 76773971, 76773972,
        76773978, 76773960, 76773950, 76773976, 76773974, 76773920, 76773973, 76773951,
        76773982, 76773939, 76773987, 76773985, 76773979, 76773964, 76773981, 76773954,
        76773969, 76773945, 76773909, 76773961, 76773912, 76773935, 76773913, 76773984,
        76773989, 76773947, 76773986, 76773980, 76773923, 76773977, 76773944, 76773991,
        76773942, 76773968, 76773990, 76773948, 76773988, 76773983
    ];

    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "TRIBUTOS2024"
        const selectDatabaseQuery = 'USE TRIBUTOS2024';
        await masterConnection.query(selectDatabaseQuery);

        // Iterar sobre a lista de IDs e enviar uma solicitação de exclusão para cada um
        for (const id of idsParaExcluir) {
            const deletePayload = {
                idIntegracao: `INTEGRACAO${id}`,
                pessoas: {
                    idGerado: {
                        id: id
                    }
                }
            };

            const response = await fetch('https://tributos.betha.cloud/service-layer-tributos/api/pessoas', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                },
                body: JSON.stringify(deletePayload)
            });

            if (response.ok) {
                console.log(`Registro com ID ${id} excluído com sucesso.`);
            } else {
                console.error(`Erro ao excluir o registro com ID ${id}:`, response.statusText);
            }
        }

    } catch (error) {
        // Lidar com erros de conexão ou consulta aqui
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        await sql.close();
    }
}

// Chamar a função principal
main();
