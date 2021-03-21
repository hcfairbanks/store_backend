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

CMD ["yarn", "dev"]