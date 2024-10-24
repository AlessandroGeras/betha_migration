const dotenv = require('dotenv');
const fetch = require('node-fetch');
const fs = require('fs');

dotenv.config();

async function fetchAllResourceData() {
    const apiUrl = 'https://pla-sl-rest.betha.cloud/planejamento/service-layer/v2/api/despesas-loa';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
    };

    let offset = 0;
    const limit = 100; // Quantidade de registros por página (ajuste conforme necessário)
    let allResourceData = [];
    let hasMoreData = true;

    try {
        while (hasMoreData) {
            // Fazer a requisição com o offset e limite
            const response = await fetch(`${apiUrl}?offset=${offset}&limit=${limit}`, { headers });

            // Verificar se a resposta está OK
            if (!response.ok) {
                throw new Error(`Erro ao acessar a API: ${response.statusText}`);
            }

            // Analisar a resposta como JSON
            const data = await response.json();

            // Extrair os dados de cada recurso
            const resourceData = data.content.map(resource => {
                return {
                    idGerado: resource.idGerado.id,
                    metaFinanceira: resource.content.metaFinanceira,
                    numero: resource.content.numero,
                    grupoId: resource.content.grupo.id,
                    naturezaId: resource.content.natureza.id,
                    loaId: resource.content.loa.id,
                    recursos: resource.content.recursos.map(rec => ({
                        recursoId: rec.recurso.id,
                        percentual: rec.percentual,
                        valor: rec.valor
                    }))
                };
            });

            // Adicionar os dados obtidos à lista geral
            allResourceData = allResourceData.concat(resourceData);

            // Atualizar o offset para buscar a próxima página
            offset += limit;

            // Verificar se ainda há mais registros para buscar
            hasMoreData = data.content.length === limit; // Se a quantidade de registros for igual ao limite, possivelmente há mais dados
        }

        // Salvar todos os dados em um arquivo JSON
        fs.writeFileSync('coleta.json', JSON.stringify(allResourceData, null, 2));
        console.log('Todos os dados foram salvos em coleta.json');

    } catch (error) {
        console.error('Erro ao buscar os dados dos recursos:', error);
    }
}

// Chamar a função principal
fetchAllResourceData();
