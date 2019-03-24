#! /bin/bash
yarn build:server
heroku container:push --app=u96-server web
heroku container:release --app=u96-server web