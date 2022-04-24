FROM node:14.5.0-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm install pm2 -g

RUN npm run build

COPY ./dist .

EXPOSE 80

CMD ["pm2-runtime","server.js"]