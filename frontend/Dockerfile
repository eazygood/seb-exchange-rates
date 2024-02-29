# Stage 1: Build frontend
FROM node:20-alpine AS builder
WORKDIR ./app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
# RUN npm run build -- --output-path=./dist/out --output-hashing=all

FROM nginx:1.19-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/browser /usr/share/nginx/html

EXPOSE 80
EXPOSE 443