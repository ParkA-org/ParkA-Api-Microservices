FROM node:12

WORKDIR /usr/src/app

COPY package.json .

RUN npm i 

CMD ["npm","run","start:dev"]

COPY . . 