FROM node:20 AS build-stage

WORKDIR /usr/src/app

COPY package*.json ./

# Change npm ci to npm install since we are going to be in development mode
# RUN rm -fr node_modules
RUN npm ci

COPY . .

RUN npm run test

RUN npm run build

FROM nginx:1.25-alpine

# npm run dev is the command to start the application in development mode
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html