# faas

[![Netlify Status](https://api.netlify.com/api/v1/badges/b014bcab-d716-46a2-879d-34e6a95ff5b9/deploy-status)](https://app.netlify.com/sites/u96/deploys)

## Web client

```
cd packages/web
npm i -g yarn
yarn install
yarn start
```

## Deploy backend with docker

```
docker build -t jabro86/faas:0.1.0 .
docker run -p 3001:4000 --net="host" -d jabro86/faas:0.1.0
```

## Deploy to backend heroku with docker

Install heroku cli: https://devcenter.heroku.com/articles/heroku-cli

```
heroku container:login
```

https://devcenter.heroku.com/articles/container-registry-and-runtime

### DEPRECATED

#### Access to digital ocean droplet

More infos on https://cloud.digitalocean.com/

```
ssh root@157.230.29.143
```

#### Inital setup dokku on digital ocean

```
dokku apps:create faas
```

Use postgres dokku plugin

```
sudo dokku plugin:install https://github.com/dokku/dokku-postgres.git postgres
dokku postgres:create pg
dokku postgres:link pg faas
```

Use dokku redis plugin

```
sudo dokku plugin:install https://github.com/dokku/dokku-redis.git redis
dokku redis:create red
dokku redis:link red faas
```

Put REDIS_URL and DATABASE_URL into .env.production file in server package. Copy the urls from dokku image

#### Deploy docker image

Some docs: http://dokku.viewdocs.io/dokku~v0.5.6/deployment/images/

Or deploy it via docker hub:

```
docker login
docker push jabro86/faas:0.1.0
```

And on digital ocean image

```
docker login
docker pull jabro86/faas:0.1.0
docker tag jabro86/faas:0.1.0 dokku/faas:latest
dokku tags:deploy faas latest
```

If app is not reachable, check proxy settings

```
dokku proxy:ports faas
dokku proxy:ports-add faas http:80:4000
```

Open app http://157.230.29.143/
