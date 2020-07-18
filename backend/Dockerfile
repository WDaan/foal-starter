# build
FROM node:lts-alpine as build-stage

WORKDIR /app
COPY . .
RUN npm i
RUN npm run build:app

# production
FROM node:lts-alpine  as production-stage

WORKDIR /app
COPY --from=build-stage ./app/build ./build
COPY package* ./
RUN npm i --production

EXPOSE 3001

CMD npm start