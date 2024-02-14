FROM node:18-buster-slim

ENV TZ=America/Sao_Paulo

WORKDIR /opt/oracle

RUN apt-get update && \
    apt-get install -y libaio1 unzip wget
RUN wget https://download.oracle.com/otn_software/linux/instantclient/instantclient-basiclite-linuxx64.zip && \
    unzip instantclient-basiclite-linuxx64.zip && \
    rm -f instantclient-basiclite-linuxx64.zip && \
    cd instantclient* && \
    rm -f *jdbc* *occi* *mysql* *jar uidrvci genezi adrci && \
    echo /opt/oracle/instantclient* > /etc/ld.so.conf.d/oracle-instantclient.conf && \
    ldconfig

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

VOLUME /projeto_portal_terceiro/Miner/uploads

# Comando para iniciar a aplicação em modo de produção
CMD ["npm", "start"]