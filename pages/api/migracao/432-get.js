const dotenv = require('dotenv');
const fetch = require('node-fetch');
const fs = require('fs');

dotenv.config();

async function fetchAllResourceIDs() {
    const apiUrl = 'https://pessoal.betha.cloud/service-layer/v1/api/classe-referencia';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
    };

    let allIds = [];
    let offset = 0;
    const limit = 20; // Limite por página, conforme o exemplo da API
    let hasNext = true;

    try {
        while (hasNext) {
            // Construir a URL com o offset e limit para paginação
            const paginatedUrl = `${apiUrl}?offset=${offset}&limit=${limit}`;
            
            // Fazer a requisição para a API
            const response = await fetch(paginatedUrl, { headers });

            // Verificar se a resposta está OK
            if (!response.ok) {
                throw new Error(`Erro ao acessar a API: ${response.statusText}`);
            }

            // Analisar a resposta como JSON
            const data = await response.json();

            // Extrair os IDs de `id`
            const ids = data.content.map(item => item.id);
            allIds = allIds.concat(ids); // Adicionar à lista total de IDs

            // Atualizar variáveis de controle
            hasNext = data.hasNext; // Verificar se há mais páginas
            offset += limit;        // Atualizar o offset para a próxima página
        }

        // Salvar os IDs em um arquivo JSON
        fs.writeFileSync('get.json', JSON.stringify(allIds, null, 2));
        console.log('Todos os IDs foram salvos em get.json');
        
    } catch (error) {
        console.error('Erro ao buscar os IDs:', error);
    }
}

// Chamar a função principal
fetchAllResourceIDs();
