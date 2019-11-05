FROM node:13-alpine

COPY favicon.ico \
     index.html \
     package.json \
     package-lock.json \
     server.js \
     ./

RUN npm install

EXPOSE 3333
CMD [ "npm", "run", "start" ]

