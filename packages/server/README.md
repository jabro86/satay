# satay backend

A GraphQL Server boilerplate made with Typescript, PostgreSQL, and Redis

## Installation

Download dependencies 
```
yarn
```
Start PostgreSQL server
Create database called `satay` and `satay-test`
```
createdb -U postgres satay 
```
[Add a user](https://medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e) with the username `postgres` and and no password. (You can change what these values are in the [ormconfig.json](https://github.com/benawad/graphql-ts-server-boilerplate/blob/master/ormconfig.json))

Install and start Redis

## Usage

You can start the server with `yarn start` then navigate to `http://localhost:4000` to use GraphQL Playground.

## Features

* Register - Send confirmation email
* Login
* Forgot Password
* Logout  
* Cookies
* Authentication middleware
* Rate limiting
* Locking accounts
* Testing (probably Jest)

## Watch how it was made

Playlist: https://www.youtube.com/playlist?list=PLN3n1USn4xlky9uj6wOhfsPez7KZOqm2V


## Database Migrations

```
npx ts-node ./node_modules/.bin/typeorm migration:generate -n ${NameMigrationFile} -c development
```