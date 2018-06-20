#!/bin/sh

while ! [ -f /server/package.json ];
do
    echo -n "#"
    sleep 1
done
echo "\> OK!"
#npm install
#npm install --save-dev mongoose
#npm start 