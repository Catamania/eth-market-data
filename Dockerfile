FROM node:alpine

MAINTAINER Adrián García Espinosa "age.apps.dev@gmail.com"

# Create app directory
RUN mkdir /server

#VOLUME ./app:/server
WORKDIR /server

#RUN npm install ccxt --save-dev