# Use official Node.js image to build the app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* .
RUN npm install

COPY . .
RUN npm run build

# Use a lightweight web server to serve the built app
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

