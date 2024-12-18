FROM node:16

WORKDIR /usr/src/web

COPY . .

EXPOSE 3000

CMD ["node", "scripts/main.js"]