FROM node:18.17.1-alpine3.18 as build

ENV PROJECT_WORKDIR=/api

RUN npm install -g pnpm

RUN mkdir -p $PROJECT_WORKDIR
WORKDIR $PROJECT_WORKDIR/

COPY package.json $PROJECT_WORKDIR/
RUN npm i

COPY tsconfig.json  $PROJECT_WORKDIR/
COPY /src $PROJECT_WORKDIR/src
COPY .env .env

HEALTHCHECK NONE
EXPOSE 8000

CMD ["npm", "start"]
