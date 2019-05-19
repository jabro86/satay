#! /bin/bash
yarn build:server
heroku container:push --app=satay web
heroku container:release --app=satay web