ARG NODE_VERSION=20.15.0

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV production

WORKDIR /app

COPY ./src ./src
COPY ./images ./images
COPY ./database ./database
COPY .env.production /app/.env

COPY package*.json ./
COPY nest*.json ./
COPY tsconfig*.json ./

RUN npm install -g npm@10.8.1
RUN npm install -g @nestjs/cli
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start:dev"]