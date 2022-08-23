#!/bin/bash
# A script to start React Native metro and the json graphql server with one command

osascript -e 'tell app "Terminal" to do script "cd '$(pwd)'/server && npx json-graphql-server db.json"'
osascript -e 'tell app "Terminal" to do script "cd '$(pwd)' && yarn start"'