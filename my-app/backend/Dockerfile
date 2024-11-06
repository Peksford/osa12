FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

# RUN rm -fr node_modules
RUN npm ci

COPY . .

# USER node

CMD npm start
