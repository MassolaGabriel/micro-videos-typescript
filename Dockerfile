FROM node:26.9.0-slim

RUN npm install --global npm@12.0.2

USER node

WORKDIR /home/node/app

CMD [ "sh", "-c", "npm ci && tail -f /dev/null" ]
