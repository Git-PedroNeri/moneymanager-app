FROM node:12 as node
WORKDIR /app-node
COPY  .  .
RUN npm install
RUN npm start
