const dotenv = require('dotenv');
const fetch = require('node-fetch');
const fs = require('fs');

dotenv.config();

async function fetchResourceIDs() {
    try {
        // Definir a URL da API e o cabeçalho da requisição
        const apiUrl = 'https://pessoal.betha.cloud/service-layer/v1/api/lotacao-fisica';
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
        };

        // Fazer a requisição para a API
        const response = await fetch(apiUrl, { headers });

        // Verificar se a resposta está OK
        if (!response.ok) {
            throw new Error(`Erro ao acessar a API: ${response.statusText}`);
        }

        // Analisar a resposta como JSON
        const data = await response.json();

        console.log(data);

        // Extrair os IDs e especificacoes dos recursos
        const resourceDetails = data.content.map(resource => ({
            id: resource.id,
            especificacoes: resource.especificacoes
        }));

        // Salvar os detalhes dos recursos em um arquivo JSON
        fs.writeFileSync('get.json', JSON.stringify(resourceDetails, null, 2));
        console.log('Detalhes dos recursos salvos em get.json');

    } catch (error) {
        console.error('Erro ao buscar os IDs:', error);
    }
}

// Chamar a função principal
fetchResourceIDs();
