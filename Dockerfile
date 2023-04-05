# Base Image
FROM node:18-alpine

# Çalışma dizinini oluştur
WORKDIR /usr/src/app

# package.json ve yarn.lock'u kopyala
COPY package*.json ./
COPY yarn.lock ./

# Bağımlılıkları yükle
RUN yarn install --frozen-lockfile

# Uygulama kaynak kodunu kopyala
COPY . .

CMD [ "yarn", "start" ]