FROM node:latest

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install

COPY . .

EXPOSE 9091

CMD ["node", "app.js"]