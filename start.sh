#!/usr/bin/env bash

docker-compose down

npm run build --prefix product-service
npm run build --prefix product-app

docker-compose up
