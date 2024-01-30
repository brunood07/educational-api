FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json .
COPY prisma ./prisma

RUN npm ci --quiet

COPY . .

RUN npm run build

RUN npm ci --only=production --quiet

CMD ["npm", "run", "start" ]