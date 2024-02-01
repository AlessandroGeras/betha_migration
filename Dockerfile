# Use a imagem oficial do Node.js versão 20 como base
FROM node:18

# Crie e defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app


WORKDIR /tmp
RUN apt-get update && apt-get -y upgrade && apt-get -y dist-upgrade && apt-get install -y alien libaio1 cifs-utils
RUN wget https://yum.oracle.com/repo/OracleLinux/OL7/oracle/instantclient/x86_64/getPackage/oracle-instantclient19.3-ba>RUN alien -i --scripts oracle-instantclient*.rpm
RUN rm -f oracle-instantclient19.3*.rpm && apt-get -y autoremove && apt-get -y clean

# Copie o package.json e o package-lock.json (se existir)
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie os arquivos da aplicação para o diretório de trabalho
COPY . .

# Construa o projeto Next.js
RUN npm run build

# Exponha a porta em que a aplicação irá escutar (geralmente 3000 por padrão)
EXPOSE 5051

# Comando para iniciar a aplicação em modo de produção
CMD ["npm", "start"]