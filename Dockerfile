FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json .
COPY yarn.lock .
COPY prisma ./prisma

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

CMD ["npm", "run", "start" ]