FROM node:13-alpine

COPY client.html \
     favicon.ico \
     package.json \
     package-lock.json \
     server.js \
     ./

RUN npm install

EXPOSE 3333
CMD [ "npm", "run", "start" ]

