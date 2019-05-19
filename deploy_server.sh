#! /bin/bash
yarn build:server
heroku container:push --app=satay-server web
heroku container:release --app=satay-server web