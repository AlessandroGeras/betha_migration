const dotenv = require('dotenv');
const fetch = require('node-fetch');
const fs = require('fs');

dotenv.config();

const token = '1d12dec7-0720-4b34-a2e5-649610d10806';
const ids = [
    "67222f21806eee2ca15b2165",
    "67222f21a848d447e2778371",
    "67222f21806eee2ca15b2198",
    "67222f21a848d447e27783a4",
    "67222f21806eee2ca15b21cb",
    "67222f21a848d447e27783d7",
    "67222f22806eee2ca15b21fe",
    "67222f22a848d447e277840a",
    "67222f22806eee2ca15b2231",
    "67222f22a848d447e277843d",
    "67222f22806eee2ca15b2264",
    "67222f22a848d447e2778470",
    "67222f22806eee2ca15b2297",
    "67222f23a848d447e27784a3",
    "67222f23806eee2ca15b22ca",
    "67222f23806eee2ca15b22fd",
    "67222f23a848d447e27784d6",
    "67222f23806eee2ca15b2330",
    "67222f23a848d447e2778509",
    "67222f23806eee2ca15b2363",
    "67222f24a848d447e277853c",
    "67222f24806eee2ca15b2396",
    "67222f24a848d447e277856f",
    "67222f24806eee2ca15b23c9",
    "67222f24a848d447e27785a2",
    "67222f24806eee2ca15b23fc",
    "67222f24a848d447e27785d5",
    "67222f25806eee2ca15b242f",
    "67222f25a848d447e2778608",
    "67222f25806eee2ca15b2462",
    "67222f25a848d447e277863b",
    "67222f25806eee2ca15b2495",
    "67222f25a848d447e277866e",
    "67222f25806eee2ca15b24c8",
    "67222f26a848d447e27786a1",
    "67222f26806eee2ca15b24fb",
    "67222f26a848d447e27786d4",
    "67222f26806eee2ca15b252e",
    "67222f26a848d447e2778707",
    "67222f26806eee2ca15b2561",
    "67222f26a848d447e277873a",
    "67222f27806eee2ca15b2594",
    "67222f27a848d447e277876d",
    "67222f27806eee2ca15b25c7",
    "67222f27a848d447e27787a0",
    "67222f27806eee2ca15b25fa",
    "67222f27a848d447e27787d3",
    "67222f27806eee2ca15b262d",
    "67222f27a848d447e2778806",
    "67222f28806eee2ca15b2660",
    "67222f28a848d447e2778839",
    "67222f28806eee2ca15b2693",
    "67222f28a848d447e277886c",
    "67222f28806eee2ca15b26c6",
    "67222f28a848d447e277889f",
    "67222f28806eee2ca15b26f9",
    "67222f29a848d447e27788d2",
    "67222f29806eee2ca15b272c",
    "67222f29a848d447e2778905",
    "67222f29806eee2ca15b275f",
    "67222f29a848d447e2778938",
    "67222f29806eee2ca15b2792",
    "67222f29a848d447e277896b",
    "67222f2a806eee2ca15b27c5",
    "67222f2aa848d447e277899e",
    "67222f2a806eee2ca15b27f8",
    "67222f2aa848d447e27789d1",
    "67222f2a806eee2ca15b282b",
    "67222f2aa848d447e2778a04",
    "67222f2a806eee2ca15b285e",
    "67222f2ba848d447e2778a37",
    "67222f2b806eee2ca15b2891",
    "67222f2ba848d447e2778a6a",
    "67222f2b806eee2ca15b28c4",
    "67222f2ba848d447e2778a9d",
    "67222f2b806eee2ca15b28f7",
    "67222f2ba848d447e2778ad0",
    "67222f2c806eee2ca15b292a",
    "67222f2ca848d447e2778b03",
    "67222f2c806eee2ca15b295d",
    "67222f2ca848d447e2778b36",
    "67222f2c806eee2ca15b2990",
    "67222f2ca848d447e2778b69",
    "67222f2c806eee2ca15b29c3",
    "67222f2da848d447e2778b9c",
    "67222f2d806eee2ca15b29f6",
    "67222f2da848d447e2778bcf",
    "67222f2d806eee2ca15b2a2b",
    "67222f2da848d447e2778c02",
    "67222f2d806eee2ca15b2a5e",
    "67222f2da848d447e2778c35",
    "67222f2e806eee2ca15b2a91",
    "67222f2ea848d447e2778c68",
    "67222f2e806eee2ca15b2ac4",
    "67222f2ea848d447e2778c9b",
    "67222f2e806eee2ca15b2af7",
    "67222f2ea848d447e2778cce",
    "67222f2e806eee2ca15b2b2a",
    "67222f2fa848d447e2778d01",
    "67222f2f806eee2ca15b2b5d",
    "67222f2fa848d447e2778d34",
    "67222f2f806eee2ca15b2b90",
    "67222f2fa848d447e2778d67",
    "67222f2f806eee2ca15b2bc3",
    "67222f2fa848d447e2778d9a",
    "67222f30806eee2ca15b2bf6",
    "67222f30a848d447e2778dcd",
    "67222f30806eee2ca15b2c29",
    "67222f30a848d447e2778e00",
    "67222f30806eee2ca15b2c5c",
    "67222f30a848d447e2778e33",
    "67222f30806eee2ca15b2c8f",
    "67222f31a848d447e2778e66",
    "67222f31806eee2ca15b2cc2",
    "67222f31a848d447e2778e99",
    "67222f31806eee2ca15b2cf5",
    "67222f31a848d447e2778ecc",
    "67222f31806eee2ca15b2d28",
    "67222f31a848d447e2778eff",
    "67222f32806eee2ca15b2d5b",
    "67222f32a848d447e2778f32",
    "67222f32806eee2ca15b2d8e",
    "67222f32a848d447e2778f65",
    "67222f32806eee2ca15b2dc1",
    "67222f32a848d447e2778f98",
    "67222f33806eee2ca15b2df4",
    "67222f33a848d447e2778fcb",
    "67222f33806eee2ca15b2e27",
    "67222f33a848d447e2778ffe",
    "67222f33806eee2ca15b2e5a",
    "67222f33a848d447e2779031",
    "67222f33806eee2ca15b2e8d",
    "67222f34a848d447e2779064",
    "67222f34806eee2ca15b2ec0",
    "67222f34a848d447e2779097",
    "67222f34806eee2ca15b2ef3",
    "67222f34a848d447e27790ca",
    "67222f34806eee2ca15b2f26",
    "67222f35a848d447e27790fd",
    "67222f35806eee2ca15b2f59",
    "67222f35a848d447e2779130",
    "67222f35806eee2ca15b2f8c",
    "67222f35a848d447e2779163",
    "67222f35806eee2ca15b2fbf",
    "67222f36a848d447e2779196",
    "67222f36806eee2ca15b2ff2",
    "67222f36a848d447e27791c9",
    "67222f36806eee2ca15b3025",
    "67222f36a848d447e27791fc",
    "67222f36806eee2ca15b3058",
    "67222f37a848d447e277922f",
    "67222f37806eee2ca15b308b",
    "67222f37a848d447e2779262",
    "67222f37806eee2ca15b30be",
    "67222f37a848d447e2779295",
    "67222f37806eee2ca15b30f1",
    "67222f38a848d447e27792c8",
    "67222f38806eee2ca15b3124",
    "67222f38a848d447e27792fb",
    "67222f38806eee2ca15b3157",
    "67222f38a848d447e277932e",
    "67222f38806eee2ca15b318a",
    "67222f39a848d447e2779361",
    "67222f39806eee2ca15b31bd",
    "67222f39a848d447e2779394",
    "67222f39806eee2ca15b31f0",
    "67222f39a848d447e27793c7",
    "67222f39806eee2ca15b3223",
    "67222f39a848d447e27793fa",
    "67222f3a806eee2ca15b3256",
    "67222f3aa848d447e277942d",
    "67222f3a806eee2ca15b3289",
    "67222f3aa848d447e2779460",
    "67222f3a806eee2ca15b32bc",
    "67222f3aa848d447e2779493",
    "67222f3a806eee2ca15b32ef",
    "67222f3aa848d447e27794c6",
    "67222f3b806eee2ca15b3322",
    "67222f3ba848d447e27794f9",
    "67222f3b806eee2ca15b3355"
  ];

  async function fetchAndSaveData(ids) {
    try {
        const apiUrlBase = 'https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/lotes/';
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        let results = [];

        for (let id of ids) {
            // Construir a URL dinamicamente com o ID
            const apiUrl = `${apiUrlBase}${id}`;

            // Fazer a requisição para a API para cada ID
            const response = await fetch(apiUrl, { headers });

            if (!response.ok) {
                throw new Error(`Erro ao acessar a API para o ID ${id}: ${response.statusText}`);
            }

            const data = await response.json();

            // Verifica se há mensagens de erro e extrai o campo "mensagem" se existir
            const mensagens = data.retorno && data.retorno.length > 0
                ? data.retorno
                    .map(item => item.mensagem)
                    .filter(msg => 
                        msg !== "Já existe uma pessoa com este PIS" &&
                        msg !== "Já existe outra pessoa com este CPF" &&
                        msg !== null &&
                        msg !== "Já existe outra pessoa física com a identidade informada" // Nova exceção
                    )
                : [];

            // Apenas adicionar no log se houver outras mensagens
            if (mensagens.length > 0) {
                results.push({
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