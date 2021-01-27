FROM node:12

WORKDIR /var/www

COPY chime-server/ .

RUN chmod +x /var/www/server.js

RUN yarn install --network-concurrency 1

CMD [ "node",  "/var/www/server.js" ]

