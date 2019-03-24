#! /bin/bash
yarn build:web
netlify deploy --dir ./packages/web/build --prod