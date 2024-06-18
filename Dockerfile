FROM node:16.13.2

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

CMD ["npx", "ts-node", "server.ts"]
