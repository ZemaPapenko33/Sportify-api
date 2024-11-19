FROM node:20.18-alpine

WORKDIR /app-api 

COPY package*.json ./

RUN npm install 

COPY . . 

EXPOSE 3000

CMD ["npm","run","start:dev"]

