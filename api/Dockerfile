FROM node:8.11.2

RUN yarn global add nodemon babel-cli
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#COPY package.json /usr/src/app/
#COPY yarn.lock /usr/src/app/
COPY ./ /usr/src/app
RUN yarn install

#COPY ./ /usr/src/app
