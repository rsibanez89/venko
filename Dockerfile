FROM node:12.16.1-alpine

WORKDIR /source

COPY . .

RUN npm config set unsafe-perm true
RUN npm install -g @nestjs/cli
RUN yarn install
RUN yarn build

RUN CI=true yarn test;

WORKDIR /source/dist

EXPOSE 3000
CMD [ "node", "main.js" ]
