#!/bin/bash

apt-get update
apt-get install graphicsmagick

cd backend
yarn install
yarn start
