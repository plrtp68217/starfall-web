FROM node:23.4-alpine3.21

WORKDIR /usr/src/web

COPY . .

EXPOSE 3000

CMD ["node", "scripts/main.js"]