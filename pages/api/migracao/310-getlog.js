const dotenv = require('dotenv');
const fetch = require('node-fetch');
const fs = require('fs');

dotenv.config();

const token = '1d12dec7-0720-4b34-a2e5-649610d10806';
const ids = ["671a5c2783bb750025980952"]

async function fetchAndSaveData(ids) {
    try {
        const apiUrlBase = 'https://tributos.betha.cloud/service-layer-tributos/api/imoveisInfComplemOp';
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        let results = [];

        for (let id of ids) {
            // Construir a URL dinamicamente com o ID
            const apiUrl = `${apiUrlBase}/${id}`;

            // Fazer a requisição para a API para cada ID
            const response = await fetch(apiUrl, { headers });

            if (!response.ok) {
                throw new Error(`Erro ao acessar a API para o ID ${id}: ${response.statusText}`);
            }

            const data = await response.json();

            // Verificar e extrair apenas o conteúdo necessário do campo "retorno"
            const retorno = data.retorno && data.retorno.length > 0 ? data.retorno[0] : null;

            if (retorno) {
                results.push(retorno);
            }
        }

        // Salvar os resultados filtrados no arquivo Folha.json
        fs.writeFileSync('Folha.json', JSON.stringify(results, null, 2));
        console.log('Dados filtrados e salvos em Folha.json');

    } catch (error) {
        console.error('Erro ao buscar os dados da API:', error);
    }
}

// Chamar a função passando o array de IDs
fetchAndSaveData(ids);
