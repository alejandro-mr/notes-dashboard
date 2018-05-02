FROM node:latest

RUN npm install -g nodemon babel-cli
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#COPY package.json /usr/src/app/
#COPY yarn.lock /usr/src/app/
COPY ./ /usr/src/app
RUN npm install

#COPY ./ /usr/src/app
