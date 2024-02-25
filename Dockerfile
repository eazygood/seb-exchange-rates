FROM node:current-alpine

WORKDIR /app


COPY package.json .
COPY package-lock.json .
COPY tsconfig.json ./
COPY src ./src

RUN npm install
RUN ls -a
RUN npm run build

COPY . .

ENV PORT=5500

CMD [ "node","dist/index.js" ]