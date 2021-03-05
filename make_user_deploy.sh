#!/bin/sh
useradd -p password -m -s /bin/bash deploy
touch /home/deploy/somefile.txt
chown deploy:deploy /home/deploy/somefile.txt

# yarn
# npx sequelize-cli db:drop
# npx sequelize-cli db:create
# npx sequelize-cli db:migrate
# yarn seed