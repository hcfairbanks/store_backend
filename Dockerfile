FROM ubuntu:20.04
ENV NODE_ENV=development
WORKDIR /app
COPY . .

RUN rm /bin/sh && \
  ln -s /bin/bash /bin/sh && \
  mkdir -p /root/.nvm

ENV NVM_DIR /root/.nvm
ENV NODE_VERSION 12.8.1

RUN apt-get update --fix-missing && \
  apt-get install -y curl && \
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash && \
  source $NVM_DIR/nvm.sh && \
  nvm install $NODE_VERSION && \
  nvm cache clear && \
  apt-get remove -y curl && \
  rm -rf /var/lib/apt/lists/*

ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH
RUN npm i yarn -g
RUN yarn
EXPOSE 3000

# RUN chmod +x /app/make_user_deploy.sh
# RUN /app/make_user_deploy.sh

CMD ["yarn", "dev"]

################################################################################

# sudo docker container stop $(sudo docker ps -a -q)
# sudo docker container rm $(sudo docker ps -a -q)

# sudo docker image ls
# sudo docker image rm <image name:tag or number>

# sudo docker build --tag store_backend_img:1.0 .
# sudo docker run --name store_backend -p 3000:3000 -v /home/harry/git/store_backend/:/app -itd store_backend_img:1.0

# Login with root user
# sudo docker exec -it --user root store_backend_on_ubuntu1 bash

# systemctl stop postgresql
# systemctl start postgresql
# systemctl status postgresql

################################################################################

# Need to duplicate something like this for echo $PATH
# harry@bender ~/git/store_backend (main) $ echo $PATH
# /home/harry/.rbenv/plugins/ruby-build/bin:/home/harry/.rbenv/shims:/home/harry/.rbenv/bin:/home/harry/.nvm/versions/node/v12.8.1/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin

# RUN multiple services in docker from script
# https://docs.docker.com/config/containers/multi-service_container/

# In Docker use this host for the db
# "host": "192.168.2.16",

# to get the seed working
# make sure the ENV NODE_ENV=development
