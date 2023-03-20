
FROM node:14-alpine

WORKDIR /app

COPY package.json yarn.lock ./app/

RUN yarn

COPY . /app

EXPOSE 3000

# Avvia l'applicazione
CMD ["yarn", "dev"]



