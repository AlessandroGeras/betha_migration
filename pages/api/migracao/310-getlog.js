const dotenv = require('dotenv');
const fetch = require('node-fetch');
const fs = require('fs');

dotenv.config();

const token = '1d12dec7-0720-4b34-a2e5-649610d10806';
const ids = [
    "673346c9cd65cc3ab88c5296",
    "673346c9070304267593f8b0",
    "673346c9cd65cc3ab88c52c9",
    "673346ca070304267593f8e3",
    "673346cacd65cc3ab88c5429",
    "673346ca070304267593f916",
    "673346cbcd65cc3ab88c545c",
    "673346cb070304267593f949",
    "673346cbcd65cc3ab88c548f",
    "673346cb070304267593f97c",
    "673346cccd65cc3ab88c54c2",
    "673346cc070304267593f9af",
    "673346cccd65cc3ab88c54f5",
    "673346cd070304267593f9e2",
    "673346cdcd65cc3ab88c5528",
    "673346cd070304267593fa15",
    "673346cdcd65cc3ab88c5530"
  ];

  async function fetchAndSaveData(ids) {
    try {
        const apiUrlBase = 'https://pessoal.betha.cloud/service-layer/v1/api/afastamento/lotes/';
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        let results = [];
        let recordNumber = 1; // Contador geral de registros para o log externo
        let messageCounter = 1; // Contador de mensagens que não é reiniciado entre IDs

        for (let id of ids) {
            const apiUrl = `${apiUrlBase}${id}`;

            // Fazer a requisição para a API para cada ID
            const response = await fetch(apiUrl, { headers });

            if (!response.ok) {
                throw new Error(`Erro ao acessar a API para o ID ${id}: ${response.statusText}`);
            }

            const data = await response.json();

            const mensagens = data.retorno && data.retorno.length > 0
                ? data.retorno
                    .map(item => item.mensagem)
                    //.filter(msg => 
                        //msg !== null
                        //msg !== "Já existe uma pessoa com este PIS" &&
                        //msg !== "Já existe outra pessoa com este CPF" &&
                        //msg !== "O grau de dependência do dependente é obrigatório" &&
                        //msg !== "Já existe outra pessoa física com a identidade informada"
                    //)
                    .map(msg => `Registro ${messageCounter++}: ${msg || 'null'}`) // Formatar com o número do registro que não reseta
                : [];

            // Adiciona o número do registro apenas se houver mensagens
            if (mensagens.length > 0) {
                results.push({
                    numeroRegistro: recordNumber++, // Número do registro geral, incrementado a cada registro
                    id: id,
                    mensagens: mensagens
                });
            }
        }

        // Salvar as mensagens filtradas no arquivo Folha.json
        fs.writeFileSync('Folha.json', JSON.stringify(results, null, 2));
        console.log('Mensagens filtradas e salvas em Folha.json');

    } catch (error) {
        console.error('Erro ao buscar os dados da API:', error);
    }
}

// Chamar a função passando o array de IDs
fetchAndSaveData(ids);