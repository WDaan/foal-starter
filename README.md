# Foal starter

> Nodejs, Typescript, TypeOrm, Vuejs

The Foal Ts Todo starter but with JWT auth && full frontend written in Vuejs.

//TODO fix docker & docker-compose

## About Project

- Typescript

- Nodejs

- SQL (TypeOrm)

- Vue

- JWT


## Configuration

- frontend/nginx.conf => to change the backend location (production)
- backend/config => database credentials


## Installation

#### - installing and running the project

- backend

```
1) npm i

2) npm run develop

```

- frontend

```
1) npm i

2) npm run serve

```

## Production - backend

#### - regular

```
npm run build:app
```

#### - docker

```
docker build . -t api
```

#### - docker-compose

```
docker-compose up --build
```

## Production - frontend

#### - docker

```
docker build . -t web

```
#### - docker-compose

```
docker-compose up --build

```