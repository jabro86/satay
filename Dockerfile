FROM node

WORKDIR /satay

COPY ./package.json .
COPY ./packages/server/package.json ./packages/server/package.json
COPY ./packages/common/package.json ./packages/common/package.json

RUN npm i -g prisma
RUN npm i -g yarn
RUN yarn install

COPY ./packages/server/dist ./packages/server/dist
COPY ./packages/common/dist ./packages/common/dist
COPY ./packages/server/.env.production ./packages/server/
COPY ./ormconfig.json .

WORKDIR /satay/packages/server

ENV NODE_ENV production

EXPOSE 4000

CMD ["node", "dist/index.js"]