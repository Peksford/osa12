FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

# Change npm ci to npm install since we are going to be in development mode
# RUN rm -fr node_modules
RUN npm ci

COPY . .

RUN npm run test

# npm run dev is the command to start the application in development mode
CMD ["npm", "run", "dev"]