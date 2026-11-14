FROM node:22-alpine

RUN npm install --global npm@12.2.2

WORKDIR /app

COPY package.json server.js ./

EXPOSE 3000

CMD ["npm", "start"]