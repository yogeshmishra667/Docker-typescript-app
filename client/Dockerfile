FROM node:alpine

RUN mkdir -p /app/client
WORKDIR  /app/client

COPY package*.json /app/client/

RUN npm install

COPY . /app/client/

RUN npm run build    

EXPOSE 3000

CMD [ "npm", "start" ]