# Use official Node.js image to build and serve the app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* .
RUN npm install

COPY . .
RUN npm run build

# Production image, copy built assets and serve with npm (serve)
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package.json package-lock.json* .
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
