const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker/locale/pt_BR'); // Importe o pacote pt_BR diretamente

const prisma = new PrismaClient();

async function createFakeData() {
  try {
    // Gera 30 registros fictícios para a tabela remessas
    for (let i = 0; i < 30; i++) {
      await prisma.remessas.create({
        data: {
          status: faker.helpers.arrayElement(['Enviado', 'Processando', 'Concluído']), // Seleciona um status aleatório
          modulo: faker.helpers.arrayElement(['Módulo A', 'Módulo B', 'Módulo C']), // Seleciona um módulo aleatório
          arquivo: faker.system.fileName(),
          nome: faker.word.words(),
          remessa: faker.word.words()
        },
      });
    }

    console.log('Dados fictícios criados com sucesso.');
  } catch (error) {
    console.error('Erro ao criar dados fictícios:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Chama a função para criar os dados fictícios
createFakeData();
