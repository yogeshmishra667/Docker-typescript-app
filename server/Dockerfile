FROM node:alpine
RUN npm install -g nodemon dotenv

RUN mkdir -p /app/server
WORKDIR /app/server

COPY package*.json /app/server/

RUN npm install

COPY . /app/server/

EXPOSE 8080

CMD ["nodemon", "server.js"]