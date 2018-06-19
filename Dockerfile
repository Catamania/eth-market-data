FROM node:alpine

MAINTAINER Adrián García Espinosa "age.apps.dev@gmail.com"

# Create app directory
RUN mkdir /server

#VOLUME ./app:/server
WORKDIR /server

# Bundle app source
#COPY app/package.json /server/package.json

# Install npm and bower dependencies
#RUN npm install

#COPY app /server



ADD start.sh /

CMD ["/start.sh"]

#RUN npm install
#RUN npm install --save-dev mongoose
#CMD npm start
#RUN chmod +x /start.sh &
#CMD npm start 