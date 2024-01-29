# Use a imagem oficial do Node.js versão 20 como base
FROM node:21-alpine

# Crie e defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json (se existir)
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie os arquivos da aplicação para o diretório de trabalho
COPY . .

# Construa o projeto Next.js
RUN npm run build

# Exponha a porta em que a aplicação irá escutar (geralmente 3000 por padrão)
EXPOSE 3333

# Comando para iniciar a aplicação em modo de produção
CMD ["npm", "start"]